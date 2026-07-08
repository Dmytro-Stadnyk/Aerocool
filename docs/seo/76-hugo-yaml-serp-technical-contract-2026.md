# `hugo.yaml` Как SERP-Технический Контракт 2026

Обновлено: 2026-07-08.

Этот документ объясняет, как текущий [hugo.yaml](../../hugo.yaml) влияет на SEO, индексацию, мультиязычность, Core Web Vitals, structured data, Agentic Browsing и готовность проекта `Aerocool Ukraine` к борьбе за сильные позиции в Google Search.

Важно: никакой конфиг, schema.org-разметка, PageSpeed score или объем текста не гарантируют `топ-1`. Цель этого документа - убрать технические причины проигрыша, зафиксировать лучшие практики стека `Hugo 0.164.0`, `Tailwind CSS 4.3`, `Netlify`, `PaperMod`, `Netlify Database` и дать понятный порядок проверки перед production.

## 1. Официальная База

Сверяться с первичными источниками:

- Google Search Essentials: `https://developers.google.com/search/docs/essentials`
- Google SEO Starter Guide: `https://developers.google.com/search/docs/fundamentals/seo-starter-guide`
- Helpful, reliable, people-first content: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Google localized versions / hreflang: `https://developers.google.com/search/docs/specialty/international/localized-versions`
- Google Image SEO: `https://developers.google.com/search/docs/appearance/google-images`
- Google structured data policies: `https://developers.google.com/search/docs/appearance/structured-data/sd-policies`
- Google Product structured data: `https://developers.google.com/search/docs/appearance/structured-data/product`
- Google e-commerce SEO: `https://developers.google.com/search/docs/specialty/ecommerce`
- Hugo configuration: `https://gohugo.io/configuration/all/`
- Hugo Tailwind CSS function: `https://gohugo.io/functions/css/tailwindcss/`
- Netlify Hugo docs: `https://docs.netlify.com/frameworks/hugo/`
- Netlify build environment variables: `https://docs.netlify.com/build/configure-builds/environment-variables/`
- Chrome WebMCP: `https://developer.chrome.com/docs/ai/webmcp`
- Chrome WebMCP Declarative API: `https://developer.chrome.com/docs/ai/webmcp/declarative-api`
- `llms.txt` proposal: `https://llmstxt.org/`

Практический вывод для новичка: документация проекта может быть жестче общих Google/Hugo правил, но не должна им противоречить.

## 2. Краткая Оценка Текущего `hugo.yaml`

Оценка текущего состояния: **9.4 / 10**.

Почему высоко:

- конфиг валиден для `Hugo 0.164.0`;
- `baseURL` совпадает с production-доменом `https://aerocool.ua/`;
- украинская версия живет в корне сайта, русская - в `/ru/`;
- `locale`, `languages.*.locale` и `direction` заданы явно;
- чистые URL включены, taxonomy/term архивы отключены;
- `pagination.pagerSize` стал единым источником правды для листингов;
- `build.buildStats` и `module.mounts` поддерживают Tailwind CSS 4.3 через Hugo pipeline;
- `robots.txt`, canonical, hreflang, sitemap index и языковые sitemap генерируются;
- JSON-LD не включается ложным флагом в конфиге, а управляется локальными partials и `schema_types`;
- Agentic Browsing слой не требует новых индексируемых URL: WebMCP живет в HTML-формах, а `llms.txt` отдается как статический корневой Markdown-файл;
- Netlify development/noindex gate сохранен до отдельного production-решения.

Почему не `10 / 10`:

- production-индексация все еще заблокирована в Netlify через `--environment development`;
- в `head` и sitemap нет `x-default`, это не P0, но для мультиязычного проекта можно рассмотреть как P2-улучшение;
- `Goldmark unsafe: true` оправдан, но требует дисциплины по сырому HTML в `content/**/*.md`;
- `params.keywords` остается только внутренним/theme-compatible fallback и не должен восприниматься как Google ranking lever;
- финальная оценка SERP-готовности невозможна без опубликованного production URL, Google Search Console, PageSpeed Insights и проверки реальных запросов.

## 3. Блоки `hugo.yaml` И Их SEO-Роль

| Блок | Текущее состояние | SEO-роль | Оценка |
|---|---|---|---:|
| `baseURL` | `https://aerocool.ua/` | Абсолютные canonical, sitemap, RSS, OG и JSON-LD URL | 10 |
| `locale` и `languages.*.locale` | `uk-UA`, `ru-UA` | `html lang`, schema `inLanguage`, RSS, даты | 10 |
| `theme: PaperMod` | тема подключена как override-base | Локальные `layouts/` имеют приоритет, тема остается обновляемой | 9 |
| URL-настройки | `disablePathToLower: false`, `uglyURLs: false`, `canonifyURLs: false` | Чистые стабильные URL без лишней канонизации | 10 |
| `disableKinds` | taxonomy/term отключены | Нет пустых `/tags/` и `/categories/` без стратегии | 10 |
| `minify` | включена | Меньше HTML/CSS/JS, лучше delivery | 9 |
| `pagination` | `pagerSize: 6` | Единый размер страниц листингов, без template hardcode | 10 |
| `enableRobotsTXT` | включен | Корневой `robots.txt` генерируется по environment | 9 |
| `build.buildStats` | включен | Tailwind видит классы из Hugo-шаблонов и контента | 10 |
| `module.mounts` | `assets` + `hugo_stats.json` | Связка Hugo 0.164 + Tailwind 4.3 | 10 |
| `Goldmark unsafe` | включен | Нужен для контролируемого HTML, но несет риск при плохом контенте | 8 |
| `params.env` | `development` | Безопасный fallback, но Netlify production нужно переключать отдельно | 8 |
| `params.assets.inlineCSS` | `true` | Убирает render-blocking CSS request, требует PSI-контроля размера head | 9 |
| `outputs.home` | HTML/RSS/JSON | RSS и search JSON для локального поиска | 10 |
| `mainSections` | `articles`, `news` | Главная берет editorial-поток из нужных разделов | 9 |
| `permalinks` | products/articles/news | Чистая URL-структура под интенты | 10 |
| `defaultContentLanguageInSubdir` | `false` | Украинский root, русский `/ru/` | 10 |
| `languages.menu` | синхронные identifiers | Стабильное меню и language switch | 9 |

## 4. Рекомендации По Приоритету

### P1. Перед Production

1. Переключать Netlify на production только отдельным релизом:
   - `hugo --environment production --gc --minify`;
   - `HUGO_ENVIRONMENT = "production"`;
   - проверить, что `params.env` не маскирует production-поведение локальных partials.
2. После deploy проверить на опубликованном URL:
   - главная `/` и `/ru/`;
   - `/products/`, серия, товар, статья, новость в двух языках;
   - `robots.txt`;
   - `sitemap.xml`, `/uk/sitemap.xml`, `/ru/sitemap.xml`;
- canonical, hreflang и meta-тег robots;
   - служебные страницы `noindex`;
   - пагинация `noindex,follow`.
3. Подключить Google Search Console и отправить sitemap index `https://aerocool.ua/sitemap.xml`.
4. Проверить ключевые URL через PageSpeed Insights после Netlify deploy, а не только локально.

### P2. Для Усиления SERP-Готовности

1. Рассмотреть `x-default` для главной и языковых пар, если нужен явный fallback для пользователей без украинского/русского предпочтения.
2. Сделать контрольный crawler-аудит production-сайта после переключения:
   - нет дублей;
   - нет индексируемых `/page/2+`;
   - нет служебных `search`, `404`, alias URL в sitemap;
   - все важные страницы доступны внутренними ссылками.
3. Для `params.keywords` оставить только роль internal/theme-compatible fallback; не расширять его как SEO-мета-стратегию.
4. Следить за размером inline CSS в `<head>`:
   - если PageSpeed покажет высокий HTML transfer или плохой FCP, сравнить `inlineCSS: true` против fingerprinted external CSS;
   - решение принимать только по опубликованным URL.
5. Для `Goldmark unsafe: true` поддерживать правило: повторяемые HTML-блоки выносить в shortcode/partial, а не копировать сырой HTML в `content/`.

### P3. Для Ростовой SEO-Стратегии

1. Развивать отдельные посадочные страницы только по validated intent из `docs/seo/53-keyword-database-2026.md` и `docs/seo/72-semantic-core-keyword-strategy-2026.md`.
2. После появления реальных данных Search Console обновлять:
   - `docs/seo/59-entity-performance-overrides.csv`;
   - keyword priority;
- карта внутренней перелинковки;
   - title/description для страниц с высоким impression, но низким CTR.
3. Для товаров поддерживать `priceValidUntil`, наличие, гарантию, доставку и возврат через `docs/seo/58-product-facts-maintenance-process-2026.md`.
4. Не добавлять fake reviews или ручные рейтинги: `AggregateRating` должен идти только из approved reviews snapshot.

## 5. SERP-Контракт Для Всего Проекта

Чтобы проект реально претендовал на сильные позиции, один `hugo.yaml` недостаточен. Контракт такой:

| Слой | Где живет | Что должно быть выполнено |
|---|---|---|
| Техническая индексация | `hugo.yaml`, `netlify.toml`, `layouts/_partials/head.html`, `layouts/sitemap*.xml` | `index,follow` для полезных страниц, `noindex` для служебных, корректные sitemap/canonical/hreflang |
| Контент | `content/**/*.md` | Интент закрыт лучше конкурентов, есть структура, доказательства, сравнения, внутренние ссылки |
| Entity graph | `data/entities.yaml`, `schema_types`, `_seo` partials | Сущности видимы в тексте и связаны в JSON-LD без выдуманных фактов |
| Товары | product front matter, product templates, review export | Реальные product facts, approved reviews, `Product`/`Offer` без fake data |
| Изображения | page bundles, `seo-image`, gallery partials | Уникальные WebP, `alt`, размеры, LCP preload, schema image set |
| Agentic Browsing | `static/llms.txt`, WebMCP-атрибуты форм | Краткая карта сайта для LLM/AI-агентов и валидные схемы contact/review/filter форм |
| Производительность | Hugo Pipes, Tailwind 4.3, Netlify headers | Хорошие CWV на published URL, минимум JS, стабильные размеры изображений |
| Мониторинг | PageSpeed Insights, Google Search Console, Schema Validator | Регулярная проверка реальных URL и реальных запросов |

## 6. Практический Чек После Любой Правки `hugo.yaml`

Выполнить локально:

```bash
mise exec -- hugo config --format json --lang uk
mise exec -- hugo config --format json --lang ru
./scripts/script_check.sh
npm run build:production
git diff --check
```

После сборки проверить:

```bash
public/robots.txt
public/sitemap.xml
public/uk/sitemap.xml
public/ru/sitemap.xml
public/index.html
public/ru/index.html
public/index.json
public/ru/index.json
```

Минимальные ожидания:

- production-сборка индексируемых страниц дает `index,follow`;
- service pages остаются `noindex,nofollow`;
- пагинация получает `noindex,follow`;
- canonical указывает на текущий language URL;
- hreflang пары взаимные;
- sitemap содержит только canonical URL;
- search JSON парсится;
- Tailwind CSS не теряет классы после правок шаблонов.
- `public/llms.txt` существует, содержит H1 и Markdown-ссылки;
- страницы с формами сохраняют `toolname`, `tooldescription` и валидные WebMCP-параметры.

## 6.1. WebMCP И `llms.txt` Простыми Словами

WebMCP и `llms.txt` не являются классическим SEO-фактором и не заменяют schema.org. Их задача другая: помочь браузеру и AI-агенту понять, какие действия можно выполнить на странице.

В текущем проекте:

- `static/llms.txt` копируется Hugo в `public/llms.txt` и становится доступен по `/llms.txt`;
- контактная форма, форма отзыва и фильтры каталога имеют WebMCP-атрибуты в локальных шаблонах;
- `fieldset` используется там, где один параметр формы состоит из группы checkbox или radio controls;
- `toolautosubmit` не включен, потому что отправка контакта и отзыва должна оставаться видимой и контролируемой пользователем.

При изменении этого слоя читать [96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](../audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md), а результат проверять через PageSpeed Insights на опубликованном URL.

## 7. Итог

Текущий `hugo.yaml` уже сильный для проекта на `Hugo 0.164.0` и `Tailwind CSS 4.3`. Главная оставшаяся работа для перехода от сильной технической базы к реальной SERP-конкуренции - production gate, Search Console, PageSpeed Insights на опубликованных URL, конкурентный анализ по кластерам и постоянное обновление контента по реальным данным.

Итоговая оценка `hugo.yaml` как технического SERP-фундамента: **9.4 / 10**.
