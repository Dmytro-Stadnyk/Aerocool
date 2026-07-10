# Финальный контроль качества перед Production-релизом

Обновлено: 2026-07-10.

Этот документ фиксирует короткий финальный чек перед production-релизом `Aerocool Ukraine`. Он дополняет [13-pagespeed-insights-audit.md](13-pagespeed-insights-audit.md), но не заменяет SEO/schema-проверки.

Если релиз затрагивает `hugo.yaml`, языки, URL, `params.env`, sitemap, robots, canonical, hreflang или production indexing, сначала читать [36-hugo-yaml-serp-technical-contract-2026.md](../seo/36-hugo-yaml-serp-technical-contract-2026.md).

## 1. Когда использовать

Использовать перед:

- переносом `dev` в `main`;
- переключением Netlify с `development` на `production`;
- крупным изменением `layouts/`, `assets/`, `static/_redirects`, `netlify.toml`, `hugo.yaml`;
- релизом новых товарных страниц, статей, новостей или серий.

## 2. Локальный минимум

Перед ручной проверкой опубликованного URL выполнить:

```bash
./scripts/script_check.sh
npm run build:production
mise exec -- hugo config --format json --lang uk
mise exec -- hugo config --format json --lang ru
```

Если менялись redirects, headers, CSP или 404:

```bash
./scripts/script_netlify_dev.sh
./scripts/script_check_routes.sh
```

## 3. Проверка Published URL

После Netlify deploy проверить:

- главную `/` и `/ru/`;
- `/products/` и `/ru/products/`;
- одну серию в двух языках;
- один товар в двух языках;
- одну статью в двух языках;
- одну новость в двух языках;
- `/faq/`, `/contact/`, `/search/`, `/404.html`;
- sitemap index и языковые sitemap;
- meta-тег robots, canonical и hreflang;
- JSON-LD через `validator.schema.org`;
- PageSpeed Insights для ключевых URL.
- PageSpeed Agentic Browsing/WebMCP для `/contact/`, `/products/` и одной товарной страницы с формой отзывов, если менялись формы, `static/llms.txt`, headers или CSS вокруг `fieldset`.

Если менялся `hugo.yaml`, дополнительно локально открыть после production-сборки:

- `public/robots.txt`;
- `public/sitemap.xml`;
- `public/uk/sitemap.xml`;
- `public/ru/sitemap.xml`;
- `public/index.html`;
- `public/ru/index.html`;
- `public/index.json`;
- `public/ru/index.json`.

## 4. Критерий готовности

Production-релиз можно считать технически готовым, если:

- локальные проверки проходят;
- Netlify deploy не падает;
- индексируемые страницы в production получают `index,follow`;
- служебные страницы остаются `noindex,nofollow`;
- schema.org validator не показывает ошибок;
- PageSpeed Insights не показывает критических регрессий;
- WebMCP-схемы форм и `llms.txt` не имеют предупреждений на затронутых опубликованных URL;
- routing и forced 404 работают на опубликованном URL.

## 5. Что не делать

- Не переносить `dev` в `main`, если опубликованный Branch Deploy не проверен вручную.
- Не включать production-индексацию, если sitemap, robots, canonical или hreflang не проверены.
- Не возвращать в проект локальный browser audit runtime без отдельного решения.
- Не считать локальный WebMCP/Lighthouse-прогон финальной проверкой: финальный сигнал дает опубликованный URL в PageSpeed Insights.
