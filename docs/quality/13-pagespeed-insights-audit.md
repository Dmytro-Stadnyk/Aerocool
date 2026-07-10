# Проверка через PageSpeed Insights

Обновлено: 2026-07-10.

Этот документ фиксирует текущий стандарт проекта `Aerocool Ukraine`: автоматический браузерный performance-аудит внутри репозитория больше не используется. Для оценки скорости, Core Web Vitals, Accessibility, Best Practices, SEO, PWA и Agentic Browsing использовать внешний сервис [PageSpeed Insights](https://pagespeed.web.dev/).

## 1. Зачем это нужно

PageSpeed Insights проще для проекта и владельца сайта:

- не требует локального Chrome в Netlify build environment;
- не добавляет тяжелые npm-зависимости в корневой проект;
- не ломает deploy из-за ошибки внешнего браузерного runtime;
- показывает и лабораторную проверку конкретного URL, и реальные field data, когда они накопятся;
- подходит для ручной production-проверки после каждого важного deploy.

Для новичка: PageSpeed Insights — это не один общий балл. В нем есть разные блоки. Блоки Agentic Browsing/WebMCP помогают проверить, распознает ли совместимый AI-агент формы и служебный `llms.txt`. Они не заменяют SEO, schema.org, Core Web Vitals и ручную проверку сайта человеком. Google Search не требует `llms.txt` и не использует его как положительный или отрицательный сигнал видимости и ранжирования.

## 2. Что удалено из проекта

В проекте больше нет:

- локального Netlify build plugin для браузерной сводки после deploy;
- отдельной папки массового браузерного аудита;
- npm-зависимостей корневого проекта для запуска Chrome-аудита;
- helper-скрипта для запуска старого URL-аудита.

Netlify теперь должен только собрать и опубликовать Hugo-сайт. Проверка качества опубликованного URL выполняется отдельно через PageSpeed Insights.

## 3. Какие URL проверять

Минимальный набор после важных правок:

| Тип страницы | URL |
|---|---|
| Главная | `https://aerocool.ua/` и `https://aerocool.ua/ru/` |
| Каталог | `https://aerocool.ua/products/` и `https://aerocool.ua/ru/products/` |
| Серия | одна актуальная серия в `uk` и `ru` |
| Товар | один товар в `uk` и `ru` |
| Статья | одна статья в `uk` и `ru` |
| Новость | одна новость в `uk` и `ru` |
| FAQ | `https://aerocool.ua/faq/` и `https://aerocool.ua/ru/faq/` |
| Contact | `https://aerocool.ua/contact/` и `https://aerocool.ua/ru/contact/` |
| Search | `https://aerocool.ua/search/` и `https://aerocool.ua/ru/search/` |
| 404 | `https://aerocool.ua/404.html` |

Для Branch Deploy проверять тот же набор, но на URL вида `https://dev--hugo-aerocool.netlify.app/`.

## 4. Как проверять

1. Открыть [https://pagespeed.web.dev/](https://pagespeed.web.dev/).
2. Вставить опубликованный URL страницы.
3. Сначала смотреть mobile-результат.
4. Затем сравнить desktop-результат.
5. Проверить, нет ли console errors, CSP errors, missing resources и явных regressions.
6. Если страница в `development/noindex`, не считать SEO score финальным для indexability.
7. После production-переключения отдельно проверить `index,follow`, sitemap, canonical, hreflang и schema.
8. Если менялись формы, `static/llms.txt`, headers или Agentic Browsing-подсказки, дополнительно открыть блоки WebMCP и `llms.txt`.

## 4.1. Что смотреть в Agentic Browsing

PageSpeed может показывать отдельные проверки для WebMCP и `llms.txt`. В проекте они нужны для трех вещей:

- чтобы AI-агент нашел форму контакта, форму отзыва или фильтр каталога;
- чтобы браузер получил понятную схему полей формы;
- чтобы LLM/AI-агент нашел краткую карту сайта в `/llms.txt`.

Проверки и практический смысл:

| Проверка | Что означает для новичка | Где править |
|---|---|---|
| Покрытие форм WebMCP | Форма найдена, но ей может не хватать `toolname` / `tooldescription` | `layouts/_shortcodes/contact.html`, `layouts/_partials/reviews/form.html`, `layouts/_partials/products/filters.html` |
| Зарегистрированные инструменты WebMCP | Браузер видит список форм-инструментов | те же шаблоны форм |
| Схемы WebMCP действительны | У полей и групп полей есть понятные имена и описания | `toolparamdescription`, `title`, `aria-label`, `aria-description`, `fieldset` |
| `llms.txt` соответствует рекомендациям | Корневой файл `/llms.txt` существует, написан как Markdown и имеет H1 | `static/llms.txt` |

Важно: для checkbox и radio-групп одного описания на каждом `input` может быть недостаточно. В текущем проекте группы фильтров и рейтинг отзывов описаны через `fieldset`, потому что Chrome строит WebMCP-схему на уровне параметра-группы.

Текущий профильный снимок и пример локальной проверки зафиксированы в [96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](../audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md).

## 5. Целевые ориентиры

Для проекта считать сильным результатом:

| Блок | Цель |
|---|---|
| Performance | `95+`, лучше `99-100` |
| Accessibility | `100` |
| Best Practices | `100` |
| SEO | `100` на production-indexable страницах |
| PWA | `100`, если страница участвует в PWA-контуре |
| Agentic Browsing | без WebMCP schema issues на страницах с формами |
| LCP | ≤ `2.0 s`, лучше ≤ `1.5 s` |
| INP | ≤ `150 ms`, лучше ≤ `100 ms` |
| CLS | `0` или почти `0` |

Если PageSpeed показывает SEO ниже `100` на `dev` Branch Deploy из-за `noindex`, это ожидаемо. Финальную SEO-оценку считать только после production-переключения.

## 6. Что делать при просадке

Если просел `LCP`, сначала проверить:

- какое изображение или блок стал главным элементом первого экрана;
- не включен ли lazy loading для главного изображения;
- есть ли `fetchpriority="high"` у единственного LCP-изображения;
- корректны ли `srcset`, `sizes`, `width`, `height`;
- нет ли лишнего prefetch/preload;
- не блокирует ли CSS или JS первый рендер.

Если просел `INP`, проверить:

- поиск;
- меню;
- view transitions;
- регистрация service worker;
- тяжелые обработчики клика;
- лишнюю JS-работу до первого взаимодействия.

Если просел `CLS`, проверить:

- размеры изображений;
- aspect ratio карточек;
- header/nav;
- web fonts;
- поздно вставляемые блоки.

Если PageSpeed показывает WebMCP warning:

- у формы проверить `toolname` и `tooldescription`;
- у обычных полей проверить `name`, связанный `label`, `title` или `toolparamdescription`;
- у checkbox/radio-групп проверить `fieldset`, `legend`, `aria-description` и `toolparamdescription` на группе;
- не добавлять `toolautosubmit` к contact/review формам без отдельного решения: пользователь должен видеть и подтверждать отправку.

Если PageSpeed показывает проблему `llms.txt`:

- проверить, что файл доступен по `/llms.txt`;
- проверить, что он написан в Markdown;
- проверить наличие одного H1;
- проверить, что есть обычные Markdown-ссылки на ключевые страницы;
- не превращать файл в рекламную страницу или второй sitemap.

Такая проблема относится к совместимости с отдельными AI-инструментами, а не к ранжированию Google. Не ухудшайте sitemap, canonical, robots или видимый контент ради прохождения экспериментальной проверки.

## 7. Локальные проверки до PageSpeed

Перед ручной проверкой опубликованного URL запускать:

```bash
npm run build
npm run build:production
./scripts/script_check.sh
```

Если менялись redirects, headers, CSP или 404:

```bash
./scripts/script_netlify_dev.sh
./scripts/script_check_routes.sh
```

PageSpeed Insights проверяет опубликованный URL, поэтому локальная Hugo-сборка не заменяет ручную проверку.

Если нужно предварительно проверить Agentic Browsing локально, использовать временный Lighthouse/Chrome-прогон вне root-зависимостей проекта. Не добавлять Lighthouse как постоянную зависимость в `package.json` без отдельного решения.

## 8. Чего не делать

- Не возвращать браузерный audit plugin в `netlify.toml` без отдельного решения.
- Не добавлять тяжелые Chrome-аудит зависимости в root `package.json`.
- Не считать `dev` Branch Deploy финальной SEO-indexability проверкой, пока Netlify собирает сайт в `development`.
- Не гнаться за числом `100`, если правка ухудшает контент, UX или конверсию.
- Не использовать WebMCP как способ скрыть или заменить обычные видимые подписи формы.
- Не дублировать в `llms.txt` коммерческие product facts, если источником правды уже являются видимые страницы и JSON-LD.
