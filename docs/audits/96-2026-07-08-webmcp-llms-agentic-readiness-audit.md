# WebMCP И `llms.txt`: Agentic Readiness Audit

Обновлено: 2026-07-08.

Этот документ объясняет, что было добавлено для PageSpeed Agentic Browsing, зачем это нужно и как проверять результат. Он написан для новичка: если ты впервые видишь `toolname`, `tooldescription`, `toolparamdescription` или `llms.txt`, начни отсюда.

## 1. Краткий Вывод

Оценка текущего состояния: **9 / 10**.

Почему высоко:

- формы контакта, отзывов и фильтров каталога имеют WebMCP declarative annotations;
- PageSpeed/Lighthouse локально видит зарегистрированные WebMCP-инструменты;
- WebMCP-схемы валидны на проверенных страницах `/contact/`, `/products/` и `/products/sky/360/`;
- корневой `llms.txt` существует, написан как Markdown, имеет H1 и ссылки на ключевые страницы;
- изменения не меняют видимый интерфейс для пользователя.

Почему не `10 / 10`:

- WebMCP остается экспериментальным web/API-слоем Chrome;
- финальный сигнал нужно повторить на опубликованном Netlify URL через PageSpeed Insights после deploy;
- production-сайт все еще зависит от общего production gate проекта.

## 2. Объяснение Для Новичка

Есть три разных машинных слоя, и их нельзя путать:

| Слой | Для чего нужен | Где живет |
|---|---|---|
| schema.org JSON-LD | Объясняет поисковикам сущности, товары, хлебные крошки, статьи и FAQ | `layouts/_partials/_schema`, `layouts/_partials/_seo` |
| WebMCP | Объясняет браузеру и AI-агентам, как распознать и заполнить конкретную форму | HTML-формы в `layouts/` |
| `llms.txt` | Дает LLM/AI-агенту краткую карту сайта и ссылки на ключевые страницы | `static/llms.txt` |

Простая аналогия:

- JSON-LD говорит: “это товар, у него есть цена, изображение, серия и условия”.
- WebMCP говорит: “это форма контакта, сюда нужно ввести имя, email, телефон и сообщение”.
- `llms.txt` говорит: “если ты AI-агент, начни с этих страниц: каталог, FAQ, контакты, sitemap”.

## 3. Что Было Изменено

### 3.1. Contact Form

Файл: [layouts/_shortcodes/contact.html](../../layouts/_shortcodes/contact.html)

Добавлено:

- `toolname="contact_aerocool_ukraine"`;
- локализованный `tooldescription`;
- технические `title` для hidden-полей и honeypot;
- `title` для textarea сообщения.

Назначение: AI-агент может понять, что форма отправляет обращение в Aerocool Украина по подбору кресла, покупке, доставке, гарантии или сервису.

### 3.2. Product Review Form

Файл: [layouts/_partials/reviews/form.html](../../layouts/_partials/reviews/form.html)

Добавлено:

- `toolname="submit_product_review"`;
- локализованный `tooldescription`;
- `title` для hidden-полей, email, имени и текста отзыва;
- описание rating-группы через `fieldset`, `legend`, `aria-description` и `toolparamdescription`;
- `title`, `aria-label` и `toolparamdescription` для radio-кнопок рейтинга.

Назначение: AI-агент видит, что форма отправляет отзыв на модерацию, а email нужен только для проверки и не публикуется.

### 3.3. Product Filters

Файл: [layouts/_partials/products/filters.html](../../layouts/_partials/products/filters.html)

Добавлено:

- `toolname="filter_aerocool_products"`;
- локализованный `tooldescription`;
- описания групп `series`, `material`, `adjustment`, `mechanism`, `availability`;
- `fieldset` для каждой группы checkbox;
- `title`, `aria-label` и `toolparamdescription` для checkbox.

Важно: фильтры остаются static-first. Они не меняют URL, не создают индексируемые filter pages и не отправляют данные на сервер.

### 3.4. CSS Reset Для `fieldset`

Файл: [assets/css/main.css](../../assets/css/main.css)

Добавлено:

- `min-inline-size: 0`;
- `margin: 0`;
- `border: 0`;

Зачем: `fieldset` нужен WebMCP и accessibility-слою, но браузер по умолчанию может добавить рамку и отступы. Reset сохраняет прежний внешний вид фильтров.

### 3.5. `llms.txt`

Файл: [static/llms.txt](../../static/llms.txt)

Добавлено:

- H1 `Aerocool Ukraine`;
- краткое описание сайта;
- ссылки на главную, каталог, FAQ, контакты, about, серии, статьи, новости, русские версии, sitemap, robots и image license.

Файл не должен дублировать весь sitemap и не должен становиться рекламной страницей. Его задача - коротко направить AI-агента к источникам правды.

## 4. Почему Использован `fieldset`

Chrome строит WebMCP input schema не только по отдельным `input`, но и по параметрам формы.

Для обычного поля все просто:

```html
<input name="email">
```

Это один параметр `email`.

Для checkbox-группы ситуация другая:

```html
<input type="checkbox" name="material" value="mesh">
<input type="checkbox" name="material" value="loft-air">
```

Это не два независимых параметра, а один параметр `material` со списком вариантов. Поэтому описывать нужно не только каждый checkbox, но и группу. В проекте для этого используется `fieldset`.

То же относится к рейтингу отзывов:

```html
<input type="radio" name="rating" value="5">
<input type="radio" name="rating" value="4">
```

Это один параметр `rating`, а не пять отдельных полей.

## 5. Что Не Делать

- Не добавлять `toolautosubmit` к контактной форме и форме отзывов без отдельного UX/security-решения.
- Не убирать обычные видимые `label`: WebMCP не заменяет accessibility.
- Не превращать `llms.txt` во второй sitemap.
- Не дублировать в `llms.txt` цены, наличие, гарантию и delivery facts: их источник правды - товарные страницы, FAQ, JSON-LD, canonical URL и sitemap.
- Не добавлять Lighthouse или Chrome-аудит как постоянную root-зависимость проекта без отдельного решения.
- Не менять `Cross-Origin-Embedder-Policy` только ради WebMCP без проверки на Deploy Preview.

## 6. Как Проверять

Минимальная локальная проверка:

```bash
npm run build
git diff --check
```

После сборки проверить:

```text
public/llms.txt
public/contact/index.html
public/products/index.html
public/products/sky/360/index.html
```

Ожидаемый результат:

- во всех формах есть `toolname` и `tooldescription`;
- у значимых полей есть `name` и понятное описание;
- checkbox/radio-группы описаны через `fieldset`;
- `public/llms.txt` содержит H1 и Markdown-ссылки.

Финальная проверка после deploy:

1. Открыть PageSpeed Insights.
2. Проверить `/contact/`.
3. Проверить `/products/`.
4. Проверить одну товарную страницу с формой отзывов.
5. В Agentic Browsing/WebMCP-блоках убедиться, что нет schema warnings.
6. Проверить, что `llms.txt` проходит рекомендации.

## 7. Проверенные URL

Локально были проверены:

- `http://127.0.0.1:8899/contact/`;
- `http://127.0.0.1:8899/products/`;
- `http://127.0.0.1:8899/products/sky/360/`.

Результат локального Lighthouse 13.4.0 с `agentic-browsing` config:

| URL | WebMCP form coverage | WebMCP registered tools | WebMCP schema validity | `llms.txt` |
|---|---|---|---|---|
| `/contact/` | без missing forms | `1` | `1` | `1` |
| `/products/` | без missing forms | `1` | `1` | `1` |
| `/products/sky/360/` | без missing forms | `1` | `1` | `1` |

## 8. Связанные Документы

- [README.md](../../README.md) - общий вход в проект.
- [AGENTS.md](../../AGENTS.md) - рабочие правила для агентов.
- [docs/architecture/03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) - где живут формы и helpers.
- [docs/quality/13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md) - как проверять PageSpeed.
- [docs/quality/14-production-quality-gate-2026.md](../quality/14-production-quality-gate-2026.md) - production gate.
- [docs/deploy/16-netlify-routing.md](../deploy/16-netlify-routing.md) - `static/`, headers, routing.
- [docs/seo/76-hugo-yaml-serp-technical-contract-2026.md](../seo/76-hugo-yaml-serp-technical-contract-2026.md) - общий SERP-технический контракт.

## 9. Источники

- Chrome WebMCP: `https://developer.chrome.com/docs/ai/webmcp`
- Chrome WebMCP Declarative API: `https://developer.chrome.com/docs/ai/webmcp/declarative-api`
- `llms.txt` proposal: `https://llmstxt.org/`
