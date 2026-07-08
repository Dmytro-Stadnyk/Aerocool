# Aerocool Ukraine

Обновлено: 2026-07-08.

`Aerocool Ukraine` — двуязычный маркетинговый и каталоговый сайт на `Hugo` для кресел Aerocool в Украине. Основной язык — украинский (`uk`), второй язык — русский (`ru`). Сайт собирается статически, деплоится через `Netlify` и использует локальные Hugo overrides поверх темы `PaperMod`.

Если ты открыл проект впервые, читай так:

1. Этот `README.md` — общая карта проекта.
2. `AGENTS.md` — правила, как безопасно менять проект.
3. `docs/01-documentation-map.md` — оглавление всей документации.
4. `docs/content/05-front-matter-reference.md` — какие поля писать в `content/**/*.md`.
5. `docs/architecture/03-hugo-template-helpers.md` — какие шаблоны за что отвечают.
6. `docs/quality/13-pagespeed-insights-audit.md` — как проверять опубликованные URL через PageSpeed Insights.

Для текущих задач по Core Web Vitals читать `docs/quality/12-core-web-vitals-guide-2026.md` и актуальный полевой аудит `docs/audits/83-2026-06-21-netlify-rum-core-web-vitals-baseline.md`. Аудит `54` остается историческим лабораторным базовым снимком на 2026-05-26.

Для текущих задач по JSON-LD, schema.org, Entity Registry, `about_entities`, `mentions_entities`, `ProductGroup`, `sameAs` и graph-аудиту читать `docs/seo/23-entity-registry-2026.md`, `docs/seo/26-json-ld-graph-audit-roadmap-2026.md` и текущий сгенерированный отчет [docs/seo/59-entity-performance-report-2026.md](docs/seo/59-entity-performance-report-2026.md). Для ручной проверки через `validator.schema.org` использовать [docs/seo/60-schema-validator-url-checklist-2026.md](docs/seo/60-schema-validator-url-checklist-2026.md). Для WebMCP-аннотаций форм, PageSpeed Agentic Browsing и корневого `llms.txt` читать профильный аудит [docs/audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](docs/audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md). Полный schema/entity-аудит `57` оставлен как исторический снимок на 2026-05-31.

Для текущих задач по ключевым словам, семантике, каннибализации, планированию посадочных страниц и стратегии роста читать [docs/seo/18-seo-keyword-map-2026.md](docs/seo/18-seo-keyword-map-2026.md), [docs/seo/53-keyword-database-2026.md](docs/seo/53-keyword-database-2026.md), [docs/seo/72-semantic-core-keyword-strategy-2026.md](docs/seo/72-semantic-core-keyword-strategy-2026.md), [docs/seo/87-content-expansion-keyword-roadmap-2026.md](docs/seo/87-content-expansion-keyword-roadmap-2026.md) и [docs/seo/88-semantic-core-top1-growth-system-2026.md](docs/seo/88-semantic-core-top1-growth-system-2026.md). Для задач по `hugo.yaml`, индексации, sitemap, robots, canonical, hreflang, production gate и техническому SERP-фундаменту читать [docs/seo/76-hugo-yaml-serp-technical-contract-2026.md](docs/seo/76-hugo-yaml-serp-technical-contract-2026.md). Актуальная keyword-база содержит `389` строк, покрывает `100` markdown-страниц, включает support/legal URL `/image-license/` и `/ru/image-license/`, product-level `price` / `availability` / `specs` интенты для всех товаров, growth-кластеры расширения контента, а поля `gsc_*` заполняются только после импорта реальных данных Google Search Console.

Для задач по внутренней перелинковке, анкорам, breadcrumbs, related-блокам, пагинации и внешним ссылкам использовать [docs/seo/81-internal-linking-strategy-2026.md](docs/seo/81-internal-linking-strategy-2026.md), [docs/seo/85-content-linking-editorial-standard-2026.md](docs/seo/85-content-linking-editorial-standard-2026.md) и текущий аудит [docs/audits/84-2026-06-24-full-link-content-seo-audit.md](docs/audits/84-2026-06-24-full-link-content-seo-audit.md). Проверка ссылок остается ручной после production-сборки; текущая структурная оценка ссылочного графа — **9.5/10**. Практический SEO-эффект основного домена остается заблокирован, пока Netlify собирает опубликованный сайт с `--environment development` и возвращает `noindex,nofollow`.

Для текущих задач по UX/UI, Tailwind Plus секциям, визуальному слою Tailwind CSS 4.3, компонентам, каталогу, фильтрам и визуальной структуре страниц читать [docs/architecture/51-tailwind-plus-ui-section-map-2026.md](docs/architecture/51-tailwind-plus-ui-section-map-2026.md) и текущий аудит выполнения карты [docs/audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md](docs/audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md). Аудит [65](docs/audits/65-2026-06-05-full-ux-ui-revalidation-audit.md) использовать как историческую проверку кода, а для скриншот-доказательств — полный визуальный аудит [64](docs/audits/64-2026-06-04-full-ux-ui-tailwind-audit.md).

Для работы с текстами и изображениями любой страницы сначала читать [docs/content/79-page-content-design-dna-2026.md](docs/content/79-page-content-design-dna-2026.md): это единый контракт тональности, правил против AI-штампов, доказательности, визуальной ДНК, размеров и контрольных ограничений товарных изображений. Для вопроса “где какой контент должен быть, какие ссылки нужны и как делать литературную обработку” читать [docs/seo/85-content-linking-editorial-standard-2026.md](docs/seo/85-content-linking-editorial-standard-2026.md), а для текущего состояния контента и ссылок — [docs/audits/84-2026-06-24-full-link-content-seo-audit.md](docs/audits/84-2026-06-24-full-link-content-seo-audit.md). Подробные промпты для изображений и технический регламент находятся в [docs/content/67-image-design-playbook-2026.md](docs/content/67-image-design-playbook-2026.md), текущая проверка `image` + служебного `cover`-блока — в [docs/audits/89-2026-06-24-cover-block-image-seo-audit.md](docs/audits/89-2026-06-24-cover-block-image-seo-audit.md), а постраничное состояние слоя изображений — в [docs/audits/80-2026-06-19-full-site-content-image-audit.md](docs/audits/80-2026-06-19-full-site-content-image-audit.md). Аудиты `69`, `70`, `71`, `74` и `77` остаются профильными или историческими детализациями.

Для текущих задач по Hugo, Node, Tailwind и локальным инструментам читать [docs/deploy/15-local-tooling-mise.md](docs/deploy/15-local-tooling-mise.md), актуальный tooling-аудит [docs/audits/93-2026-07-07-hugo-0-164-update-audit.md](docs/audits/93-2026-07-07-hugo-0-164-update-audit.md) и SERP-контракт [docs/seo/76-hugo-yaml-serp-technical-contract-2026.md](docs/seo/76-hugo-yaml-serp-technical-contract-2026.md), если меняется `hugo.yaml`.

Проще говоря: `content/` отвечает за текст и данные страниц, `layouts/` отвечает за HTML/SEO/schema/WebMCP-логику, `assets/` отвечает за CSS/JS, `static/` отдает служебные файлы вроде `_redirects` и `llms.txt`, а PageSpeed Insights используется для ручной проверки качества опубликованных URL.

Вся документация проекта должна быть русскоязычной, понятной новичку и структурированной. Единый стандарт стиля описан в [docs/architecture/02-documentation-style-guide.md](docs/architecture/02-documentation-style-guide.md).

Последний полный аудит документации, синхронизации с кодом и официальными практиками 2026 года находится в [docs/audits/97-2026-07-08-full-documentation-project-sync-audit-current.md](docs/audits/97-2026-07-08-full-documentation-project-sync-audit-current.md). Итоговая оценка после проверки: **9.8/10**. Документ `96` — профильный снимок по WebMCP, `llms.txt` и PageSpeed Agentic Browsing; он не заменяет полный аудит `97`. Документ `92` является профильным UX/UI-аудитом, документ `93` — профильным tooling-аудитом перехода на Hugo `0.164.0`. Документы `87` и `88` — профильные документы по расширению ключевых слов, контента и стратегии роста; аудит `89` — профильная проверка `image` + `cover`, размеров, форматов, crop-наборов и дублей главных товарных изображений. Аудиты `78`, `82`, `86`, `90`, `91`, `94` и `95` остаются историческими снимками.

## 1. Главная идея проекта

Проект должен решать четыре задачи:

1. Быстро и корректно показывать каталог кресел Aerocool.
2. Давать поисковикам чистую структуру: canonical, hreflang, sitemap, schema.org, robots meta.
3. Поддерживать SEO-контент под брендовые и коммерческие запросы: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.
4. Готовить контент и structured data к AI Search: сущности, knowledge graph, цитируемые блоки, prompt-аудит и e-commerce rich results без фейковых сигналов доверия.

## 2. Стек

- `Hugo 0.164.0`
- `Node 24.16.0`
- `Tailwind CSS 4.3` через npm-пакеты `tailwindcss` и `@tailwindcss/cli` версии `4.3.0`
- `themes/PaperMod` как git-подмодуль
- `Netlify` для сборки и публикации
- `Netlify Functions` для API-эндпоинтов отзывов
- `Netlify Database` / `PostgreSQL` для SEO-first review-системы
- WebMCP declarative form annotations для contact/review/filter форм как progressive enhancement для AI-агентов
- PageSpeed Insights для ручной проверки опубликованных URL

Локальные версии инструментов фиксируются в `mise.toml`. В Netlify версии фиксируются в `netlify.toml`.

## 3. Важное про Netlify, dev И production

Рабочая ветка проекта — `dev`.

Для ежедневной разработки используется Netlify Branch Deploy:

```text
ветка dev -> https://dev--hugo-aerocool.netlify.app/
```

По подтверждению поддержки Netlify для этого проекта тестовый branch-сайт `dev--hugo-aerocool.netlify.app` можно использовать для частых автодеплоев и проверок без расходования production-лимитов основного домена. Поэтому все обычные изменения сначала делаются в `dev`, проверяются на тестовом URL и только потом переносятся в `main`.

`main` — это production-ветка для основного домена:

```text
ветка main -> https://aerocool.ua/
```

В `main` не пушить случайные ежедневные правки. Перенос `dev -> main` делать осознанно, например раз в неделю или перед готовым релизом.

Сейчас `netlify.toml` намеренно собирает сайт в `development`:

```toml
command = "git submodule update --init --recursive && node scripts/export_reviews.mjs && hugo --environment development --gc --minify"
HUGO_ENVIRONMENT = "development"
```

Это значит:

- HTML-страницы получают `noindex,nofollow`;
- это безопасный режим для доработки сайта;
- финальный SEO-аудит indexability нельзя считать полным, пока Netlify не переведен на `production`.

Когда сайт готов к индексации, нужно отдельно поменять Netlify на:

```toml
command = "git submodule update --init --recursive && node scripts/export_reviews.mjs && hugo --environment production --gc --minify"
HUGO_ENVIRONMENT = "production"
```

Локально production можно проверить командой:

```bash
npm run build:production
```

## 4. Основной pipeline проекта Netlify

`Netlify` уже умеет:

- забирать код из Git;
- ставить зависимости;
- собирать Hugo;
- публиковать сайт;
- создавать Branch Deploy для `dev`.

Для системы отзывов подключен `Netlify Database`. Целевая архитектура описана в [docs/deploy/17-netlify-database-reviews.md](docs/deploy/17-netlify-database-reviews.md): отзывы хранятся в PostgreSQL, проходят модерацию, выгружаются в `data/generated/reviews.json` на этапе build и только после этого попадают в видимый HTML и `Product` JSON-LD. На текущем этапе создана первая миграция `reviews`, добавлен `POST /api/reviews`, полный цикл проверен на ветке `dev`, а все текущие товарные страницы получили `review_target_id` и `reviews_enabled: true`. Рейтинг в HTML, карточках товаров и `Product.aggregateRating` строится только из одобренных отзывов, выгруженных в Hugo-снимок перед сборкой.

Текущий правильный рабочий процесс такой:

1. Перейти в `dev` и подтянуть свежую ветку.
2. Сделать изменения и закоммитить их в `dev`.
3. Запушить `dev` в GitHub.
4. Netlify автоматически собирает `https://dev--hugo-aerocool.netlify.app/`.
5. Проверить тестовый сайт вручную и через PageSpeed Insights.
6. Если все готово к релизу, отдельно перенести `dev` в `main`.
7. После финального решения переводить Netlify в `production`, если сайт должен индексироваться.

## 5. Основная структура

```text
content/                        контент сайта
content/products/               каталог, серии и варианты товаров
content/articles/               evergreen-статьи
content/news/                   новости и запусковые материалы
data/                           структурированные данные Hugo
data/entities.yaml              реестр сущностей для schema.org-связей
data/generated/                 экспорты на этапе сборки, например не хранящийся в git снимок одобренных отзывов
docs/                           проектная документация и ненумерованные служебные архивы
docs/XTAL/                      исходные изображения производителя для линейки XTAL; не часть порядка чтения
layouts/                        локальные Hugo-шаблоны и overrides
layouts/_partials/              локальные partials
layouts/_shortcodes/            локальные shortcodes
assets/css/main.css             Tailwind CSS и локальный визуальный слой
assets/js/site.js               общий внешний JS сайта без inline-скриптов
static/                         статические файлы
static/_redirects               root rewrite и forced 404 для scanner/sensitive URL на Netlify
static/llms.txt                 Markdown-карта сайта для LLM/AI-агентов, включая все товарные URL в uk/ru
netlify/database/migrations/    SQL-миграции Netlify Database
netlify/functions/              Netlify Functions, включая прием отзывов
hugo.yaml                       конфигурация Hugo
netlify.toml                    сборка Netlify и HTTP headers
mise.toml                       локальные версии Hugo и Node для mise
package.json                    npm-команды корневого Hugo-проекта
```

Что не нужно редактировать вручную:

- `public/` — результат сборки Hugo;
- `resources/` — временные Hugo-кэши;
- `node_modules/` — установленные npm-пакеты;
Если нужно изменить страницу, почти всегда начинай с `content/`, `layouts/`, `assets/` или `data/`, а не с `public/`.

Папка `netlify/database/migrations/` уже используется для review-системы: первая миграция создает таблицу `reviews`. Файл `data/generated/reviews.json` создается build-time скриптом `scripts/export_reviews.mjs` и не хранится в git, потому что это сгенерированный снимок одобренных отзывов.

## 6. Контент и языки

Текущий паттерн локализации:

```text
index.md      украинская версия
index.ru.md   русская версия
```

Это относится к статьям, новостям, страницам товаров и статичным страницам. Украинская и русская версии должны оставаться синхронными, если задача явно не ограничена одним языком.

В `content/**/*.md` не добавляем markdown `# H1`. Видимый H1 обычно рендерится шаблоном через `layouts/_partials/page-h1.html`, а тело страницы начинается с вводного абзаца или `##`.

В видимом контенте `content/**/*.md` не используем обратные кавычки для inline-code. Точные технические обозначения, SKU/MPN/GTIN, размеры, рейтинги и значения характеристик выделяются обычным жирным форматом: `**11D**`, `**SYNC5 multi-adjustable**`, `**75 мм**`.

Во front matter использовать `schema_types`.

Видимая meta-строка управляется локальным helper [layouts/_partials/page-meta.html](layouts/_partials/page-meta.html), а не прямым выводом PaperMod `post_meta.html`.

Текущая политика:

- статьи показывают дату публикации и время чтения;
- новости показывают только дату публикации;
- `/contact/`, `/faq/`, `/about/`, `/products/`, серии, товары, поиск и служебные страницы не показывают блоговую meta-строку под `H1`;
- количество слов, автор организации и список переводов не выводятся в контентной meta-строке;
- переключатель языка остается в шапке сайта.

`date` и `lastmod` при этом не удаляются из front matter: они нужны для сортировки, RSS, head/schema-слоя и редакционного блока статей/новостей.

Для товарных страниц product facts хранятся в front matter конкретного `content/products/<series>/<model>/index*.md`. Это единый источник правды для цены, наличия, SKU, MPN, GTIN, гарантии, доставки, возврата и способов оплаты. Владелец бизнес-значений — команда Aerocool Украина; `Product` JSON-LD, видимый товарный блок и `/faq/` должны быть синхронизированы с front matter. Операционный процесс ролей, подтверждений и QA описан в [docs/seo/58-product-facts-maintenance-process-2026.md](docs/seo/58-product-facts-maintenance-process-2026.md).

Для отзывов и рейтингов целевой источник правды другой: `Netlify Database` с approved отзывами и build-time export в Hugo data. Поля `rating.value` и `rating.count` удалены из товарного front matter; рейтинг в HTML, карточках товаров и `Product.aggregateRating` строится только из approved отзывов, выгруженных в `data/generated/reviews.json`.

Редакционные ориентиры объема для SEO-посадочных страниц:

- статьи в `content/articles` — обычно `10000+` знаков основного текста на каждую языковую версию;
- новости в `content/news`, если они поддерживают органическую видимость, — обычно `5000+` знаков тела на каждую языковую версию;
- товарные страницы `content/products/<series>/<model>/` — обычно `6000+` знаков основного текста на каждую языковую версию;
- страницы серий `content/products/<series>/_index.md` и `_index.ru.md` — обычно `6000+` знаков основного текста на каждую языковую версию;
- хабы `/products/`, `/articles/` и `/news/` — обычно `7000+` знаков основного текста на каждую языковую версию;
- страница `/about/` — обычно `10000+` знаков основного текста на каждую языковую версию.

Добор до этих ориентиров должен быть редакционным: сценарии выбора, сравнения, FAQ, доказательства, коммерческая польза и внутренние ссылки, а не абзацы ради объема.

## 7. Шаблоны

Главные локальные шаблоны:

- `layouts/baseof.html` — общий HTML-каркас.
- `layouts/_partials/head.html` — SEO/meta-теги, canonical, OG/Twitter, подключение CSS и поискового JS.
- `layouts/_partials/header.html` — шапка, логотип, меню, переключатель языка.
- `layouts/_partials/page-meta.html` — видимая meta-строка для статей и новостей.
- `layouts/_partials/footer.html` — footer, JSON-LD внизу body, внешний `site.js`.
- `layouts/single.html` — одиночные страницы.
- `layouts/list.html` — листинги.
- `layouts/products/list.html` — специализированный листинг каталога и страниц серий с фильтрами, сортировкой, счетчиком и товарной сеткой.
- `layouts/articles/list.html` — специализированный листинг статей с сеткой карточек.
- `layouts/_partials/articles/card-image.html` — responsive-изображение карточки статьи в листинге.
- `layouts/_partials/products/card.html` — товарная карточка с product facts и `data-product-*` атрибутами.
- `layouts/_partials/products/filters.html` — static-first фильтры каталога и страниц серий без изменения URL.
- `layouts/_partials/products/sort.html` — сортировка товаров по названию, рейтингу и цене.
- `layouts/404.html`, `layouts/search.html`, `layouts/alias.html` — служебные страницы.
- `layouts/sitemap.xml` и `layouts/sitemapindex.xml` — мультиязычные sitemap-файлы.

Локальные изменения делаем в `layouts/`, а не в `themes/PaperMod`, чтобы тема оставалась обновляемым подмодулем.

## 8. Что делает `layouts/_partials/cover.html`

`layouts/_partials/cover.html` — это локальный override стандартного PaperMod cover partial.

Он нужен для `cover.image` в front matter:

```yaml
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

Что делает override:

- ищет картинку в page bundle рядом с `index.md` / `index.ru.md`;
- если может обработать изображение, генерирует WebP-версии;
- выводит `srcset` и `sizes` под фактическую ширину cover/listing-блока, без завышенного `100vw` для страниц с внутренними отступами;
- добавляет `width` и `height`, чтобы не было CLS;
- для одиночной страницы ставит `loading="eager"` и `fetchpriority="high"`;
- для карточек в списках ставит `loading="lazy"`;
- предотвращает старую проблему с пустым `src=""` в листингах.

Когда его трогать:

- если меняется логика cover-картинок;
- если меняются размеры карточек в списках;
- если PageSpeed Insights снова показывает `unsized images`, `empty src` или проблемы image delivery.

Когда не трогать:

- при обычном добавлении страницы в `content/`. Там достаточно правильно заполнить `image`, `cover.image`, `cover.alt`, `cover.relative` и `cover.hiddenInSingle`.

## 9. Изображения

Есть четыре разных сценария:

1. `seo-image` — изображение внутри тела статьи, новости или обычной контентной страницы.
2. `cover.image` — обложка для листингов и одиночной страницы.
3. `image` — основная картинка для SEO/OG/Twitter/schema.
4. Товарная галерея — автоматический visible UI на `layouts/products/single.html`, который берет первый кадр из `image`, а остальные изображения из page bundle товара показывает как миниатюры.

Если коротко для новичка:

| Что | За Что Отвечает | Где Заполнять Или Править |
|---|---|---|
| `image` | SEO-картинка страницы: `og:image`, Twitter image, schema.org `ImageObject`, product gallery primary frame | front matter страницы |
| `cover.image` | Картинка preview в карточках, листингах и cover-логике темы | front matter `cover` |
| `cover.alt` | Текстовое описание картинки для доступности и понятного preview | front matter `cover` |
| `seo-image` | Видимая картинка внутри текста статьи/новости/обычной страницы: `<picture>`, WebP, `srcset`, `sizes`, lazy/eager | markdown-тело страницы |
| `products/gallery.html` | Первый видимый кадр товара и дополнительные миниатюры товара | шаблон + файлы изображений в product page bundle |
| `lcp-image-preload.html` | Ранний preload главной картинки первого экрана в `<head>` | SEO partial, обычно не трогать в контенте |
| `seo_image_sizes` | Синхронизация нестандартного `sizes` между первым article/news `seo-image` и head preload | front matter статьи или новости |

Для главного изображения статьи или новости в markdown использовать shortcode:

```go-html-template
{{</* seo-image
  src="01-front.webp"
  width="1536"
  height="1024"
  alt="Тема изображения на языке страницы"
  title="Короткий title изображения"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl"
  sizes="(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
*/>}}
```

Для карточки/cover использовать front matter:

```yaml
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

`image` идет в SEO/OG/schema, `cover.image` — в визуальный preview.
`seo-image` в Hugo `0.164.0` проверяет processable image resource через `reflect.IsImageResourceProcessable`, выводит WebP `srcset` через `<picture>`, fallback `<img>`, размеры и приоритет загрузки. Для типовых статей и новостей главный `preload=true` попадает в `<head>`, если `image` совпадает с `src` shortcode и `cover.hiddenInSingle: true`.
Если первое article/news контентное изображение использует нестандартный `sizes`, такое же значение нужно задать во front matter как `seo_image_sizes`, иначе head preload и `<picture>` могут выбрать разные responsive candidates.
На товарной странице главное изображение не вставляется через `seo-image`. `layouts/_partials/products/gallery.html` берет первый кадр из `image`, выводит его как eager/fetchpriority high LCP-кандидат и дополнительно собирает галерею из файлов изображений рядом с товаром. Product preload в `<head>` использует те же responsive candidates и `sizes`, что gallery. Если главное изображение отсутствует в page bundle или Hugo не может обработать его как processable image resource, сборка должна упасть. Если в page bundle есть только основной файл `image`, лента миниатюр не выводится. Если добавить второе и последующие изображения, они автоматически появятся как компактные миниатюры с lazy loading.
Для всех `content/**/*.md` в проекте нужен служебный `cover`-блок. `cover.alt` должен описывать тему или объект изображения на языке страницы; не оставляйте пустой `alt` и не превращайте его в список ключевых слов.
Для служебных, taxonomy и других страниц без собственного `image` fallback теперь идет в root `cover.webp`, а не в `images/logo.svg`.

## 9.1. Цветовые Варианты Товара

Цвет на товарной странице — это не декоративный radio button, а ссылка на отдельный URL товарного варианта. Например, `WING Racer Black` и `WING Racer Dark Grey` остаются отдельными страницами, а видимый swatch переводит пользователя между ними.

Шаблон `layouts/_partials/products/variant-swatches.html` берет список вариантов из `product_group_id` и `data/entities.yaml`, фильтрует страницы по текущему языку и выводит swatches только если в реальной ProductGroup больше одного варианта. Одиночные товары не получают `product_group_id`; они связаны с линейкой через `about_entities`, `series` в registry и страницу серии. Ручной список цветов в front matter не нужен. На 2026-05-31 `ProductGroup`, `isVariantOf` и `inProductGroupWithID` активны только для четырех confirmed WING/XTAL цветовых групп.

Отдельно для карточек товаров `layouts/_partials/products/color-dots.html` выводит компактные цветовые точки. Главный источник для товаров с несколькими вариантами — тот же `product_group_id` и `data/entities.yaml`. Если товар одиночный и не имеет `product_group_id`, color dots берут `color` из главной product entity через `about_entities`. Это не создает искусственный `ProductGroup` и не выводит выбор варианта на товарной странице.

## 10. JavaScript и CSP

Inline JS убран из footer и offline-страницы. Общая логика сайта живет в:

```text
assets/js/site.js
static/offline.js
```

`assets/js/site.js` отвечает за:

- scroll memory меню;
- плавные якорные переходы;
- кнопку scroll-to-top;
- закрытие мобильного меню;
- закрытие desktop catalog flyout и language dropdown по клику вне меню и по `Escape`;
- sanitizing телефона в contact-форме;
- табы и галерею товарной страницы;
- фильтры каталога и страниц серий;
- сортировку товаров;
- закрытие групп фильтра на mobile при загрузке;
- view transitions;
- code copy buttons, если они включены;
- регистрация service worker.

Это сделано, чтобы `Content-Security-Policy` мог быть строже и чтобы внешние quality-проверки не ругались на inline scripts.

Формы, которые PageSpeed видит в Agentic Browsing/WebMCP-аудите, размечены прямо в HTML-шаблонах:

- [layouts/_shortcodes/contact.html](layouts/_shortcodes/contact.html) — инструмент `contact_aerocool_ukraine`;
- [layouts/_partials/reviews/form.html](layouts/_partials/reviews/form.html) — инструмент `submit_product_review`;
- [layouts/_partials/products/filters.html](layouts/_partials/products/filters.html) — инструмент `filter_aerocool_products`.

Для новичка: `toolname` — это короткое техническое имя действия, `tooldescription` — объяснение действия для AI-агента, `toolparamdescription` — пояснение отдельного поля или группы полей. Это не меняет вид формы для пользователя и не заменяет schema.org JSON-LD. Это помогает браузеру понять, какую форму можно заполнить и какие параметры у нее есть.

Дополнительно в `netlify.toml` включены security headers для PageSpeed Insights:

- `Cross-Origin-Opener-Policy: same-origin`;
- `Content-Security-Policy` с `trusted-types aerocool-service-worker`;
- `require-trusted-types-for 'script'`.

Из-за `require-trusted-types-for 'script'` регистрацию service worker нельзя возвращать к простому строковому вызову:

```js
navigator.serviceWorker.register('/sw.js')
```

Текущий стандарт — получать URL через `getServiceWorkerUrl()` в `assets/js/site.js`. Эта функция создает Trusted Types policy `aerocool-service-worker` и разрешает только локальный `/sw.js`. Если PageSpeed показывает `This document requires 'TrustedScriptURL' assignment`, сначала проверить именно этот участок.

## 11. SEO и robots

В `development` все HTML-страницы получают:

```html
<meta name="robots" content="noindex,nofollow">
```

В `production` индексируемые страницы получают:

```html
<meta name="robots" content="index,follow">
```

Служебные страницы всегда должны оставаться `noindex,nofollow`:

```text
/404.html
/search/
/ru/search/
alias-страницы
```

JSON-LD генерируется централизованно через `layouts/_partials/_seo/jsonld.html` и выводится ближе к концу `body`, чтобы не задерживать первый экран.

## 12. Netlify routing и 404

`static/_redirects` копируется Hugo в `public/_redirects` и обрабатывается Netlify раньше правил из `netlify.toml`.

В текущем проекте этот файл не используется для SEO-переадресаций. Он явно переписывает корневой `/` на `/index.html` со статусом `200` и принудительно отдает кастомную `404` для типовых bot/scanner URL вроде `/wp-login.php`, `/wp-json/*`, `//blog/wp-includes/*`, `/.env`, `/.git/*`, `/.docker/*`, `/_nuxt/*`, `/.vite/*`, `/filemanager/*`, `/phpinfo.php`, `/test.php`, `/cpanel/*`.

Правила поддержки:

- корневое правило `/ -> /index.html 200` не убирать без проверки через Netlify CLI: оно защищает `/` от ложной `404` в Netlify routing/dev-сценариях;
- для таких scanner/sensitive путей использовать статус `404!`, чтобы правило сработало даже при случайном наличии файла;
- не использовать `*` в середине path, например `/*/wp-login.php`; для одного сегмента использовать placeholder `/:prefix/wp-login.php`;
- для подтвержденных старых пользовательских URL использовать `301` в `netlify.toml` только если есть реальная замена; удаленный без замены контент должен оставаться обычной `404`;
- человекопохожие parser URL из логов без подтвержденной замены (`/aboutus`, `/about-us`, `/company`, `/company-profile`, `/profile`, `/contactus`) не редиректить; они должны оставаться обычной `404`;
- общий fallback `/* -> /404.html 404` не нужен: Netlify автоматически использует `public/404.html` для несуществующих URL;
- после правок проверять, что `public/_redirects` обновился после сборки, `/` отдает `200`, scanner URL отдают `404`, а `/404.html` остается `noindex,nofollow`.

Подробно смотри [docs/deploy/16-netlify-routing.md](docs/deploy/16-netlify-routing.md).

## 13. Проверка Через PageSpeed Insights

В проекте больше нет локального браузерного quality-аудита и Netlify post-deploy browser plugin. Это осознанное упрощение: Netlify собирает и публикует Hugo-сайт, а качество опубликованных URL проверяется вручную через [PageSpeed Insights](https://pagespeed.web.dev/).

Минимальный порядок после важных правок:

1. Запустить `./scripts/script_check.sh`.
2. Запустить `npm run build:production`.
3. Если менялись ссылки, сниппеты, контентные маршруты, URL, breadcrumbs, related-блоки, меню или карточки, вручную проверить ключевые URL, sitemap, canonical, `hreflang`, локальные якоря и доступность целевых страниц в собранном сайте.
4. Дождаться Netlify Branch Deploy или production deploy.
5. Проверить ключевые URL в PageSpeed Insights, сначала mobile, затем desktop.
6. Если менялись schema.org, дополнительно проверить URL через `validator.schema.org`.
7. Если менялись формы, `static/llms.txt`, headers или Agentic Browsing-подсказки, дополнительно смотреть блоки PageSpeed про WebMCP и `llms.txt`: покрытие форм, зарегистрированные инструменты, валидность WebMCP-схем и соответствие `llms.txt` рекомендациям.

Подробно смотри [docs/quality/13-pagespeed-insights-audit.md](docs/quality/13-pagespeed-insights-audit.md).

## 14. Контроль Перед Production-Релизом

Перед переносом в `main` и включением production-индексации вручную проверить:

- PageSpeed Insights для главной, каталога, серии, товара, статьи, новости, FAQ, contact, search и 404;
- `validator.schema.org` для страниц с JSON-LD;
- PageSpeed Agentic Browsing/WebMCP для contact, catalog filters и review form, если менялись формы или `llms.txt`;
- sitemap index и языковые sitemap;
- robots meta, canonical и hreflang;
- Netlify routing, headers и forced 404, если менялись `static/_redirects`, `netlify.toml` или 404-шаблон.

## 15. Основные команды и helper-скрипты

```bash
mise install
npm install
npm run dev
npm run build
npm run entity:report
npm run build:production
```

Что они делают:

- `mise install` — читает `mise.toml` и ставит нужные версии Hugo/Node.
- `npm install` — ставит npm-зависимости проекта.
- `npm run dev` — запускает `hugo server`.
- `npm run build` — сначала запускает `node scripts/export_reviews.mjs`, затем development-сборку Hugo, безопасную для noindex.
- `npm run entity:report` — запускает `node scripts/generate_entity_performance_report.mjs`; после сборки обновляет [docs/seo/59-entity-performance-report-2026.md](docs/seo/59-entity-performance-report-2026.md) и generated CSV по Entity Registry, `about_entities`, `mentions_entities`, `product_group_id` и rendered JSON-LD refs; будущие GSC/AI/business-метрики вносить в [docs/seo/59-entity-performance-overrides.csv](docs/seo/59-entity-performance-overrides.csv).
- `npm run build:production` — сначала запускает `node scripts/export_reviews.mjs`, затем локальную production-сборку Hugo для финальной проверки index/follow.

Для ежедневной работы удобнее использовать helper-скрипты из папки `scripts/`. Они запускаются из корня проекта и содержат комментарии с назначением и инструкцией.

Карта всех скриптов:

```bash
./scripts/script_help.sh
```

Основной набор:

| Скрипт | Когда запускать | Что делает |
| --- | --- | --- |
| `./scripts/script_setup.sh` | После первого клонирования или переноса проекта | Подтягивает git-подмодули, запускает `mise install`, ставит npm-зависимости корня. |
| `./scripts/script_start.sh` | Для ежедневной разработки | Запускает `hugo server` со встроенным Hugo/Tailwind pipeline. |
| `./scripts/script_build.sh` | После правок и перед ручной проверкой | Запускает `npm run build`. |
| `./scripts/script_build_production.sh` | Перед финальной SEO/indexability-проверкой | Запускает `npm run build:production`. |
| `./scripts/script_check.sh` | Перед коммитом | Собирает сайт и проверяет `_redirects`, `.DS_Store` в `static/` и `public/`, markdown `# H1`, inline-code в `content/`, `schema_type` и noindex для служебных страниц. |
| `./scripts/script_netlify_dev.sh` | После правок `static/_redirects`, `netlify.toml`, 404, headers или CSP | Собирает `public/` и запускает Netlify Dev на `http://localhost:8899`. |
| `./scripts/script_check_routes.sh` | После запуска `script_netlify_dev.sh` | Проверяет ключевые `200` и scanner/sensitive `404` через `curl`. |
| `./scripts/script_clean.sh` | Когда нужна безопасная очистка Hugo-кэша | Удаляет только `public`, `resources`, `.hugo_build.lock`, `hugo_stats.json`. |
| `./scripts/script_reset_full.sh` | Когда сломались зависимости и мягкой очистки недостаточно | Удаляет Hugo-артефакты, `node_modules` и `.cache`, затем запускает `npm install`, сохраняя `package-lock.json`. |
| `./scripts/script_reset_full.sh --with-lockfile` | Только если lock-файл действительно нужно пересоздать | Дополнительно удаляет `package-lock.json` перед `npm install`. |

Обычный короткий цикл:

```bash
./scripts/script_start.sh
./scripts/script_check.sh
```

После изменений Netlify routing или headers:

```bash
./scripts/script_netlify_dev.sh
./scripts/script_check_routes.sh
```

## 16. Перед Важным Deploy

### Перед Push В `dev`

`dev` — рабочая ветка для частых тестовых автодеплоев.

Минимальный цикл:

```bash
git checkout dev
git pull origin dev
git status
git add .
git commit -m "короткое описание изменения"
git push origin dev
```

После push проверить тестовый сайт:

```text
https://dev--hugo-aerocool.netlify.app/
```

Для отзывов важный порядок такой:

```text
отзыв отправлен на dev-сайте
-> запись появилась в database branch dev со статусом pending
-> статус вручную изменен на approved в Netlify Dashboard
-> новый deploy dev
-> approved отзыв появился в HTML
```

### Перед Переносом В `main`

Минимальный чек:

```bash
./scripts/script_check.sh
./scripts/script_build_production.sh
```

Перед переносом `dev -> main` и включением production в Netlify дополнительно проверить:

- главную `/`;
- русскую главную `/ru/`;
- каталог `/products/` и `/ru/products/`;
- одну серию;
- одну карточку товара;
- одну статью;
- одну новость;
- `/search/` и `/ru/search/`;
- `/404.html`;
- `public/_redirects`, если менялись `static/_redirects` или 404/routing;
- Netlify CLI routing check, если менялись `static/_redirects`, `netlify.toml` headers или 404/routing;
- sitemap index и языковые sitemap.

Переносить в `main` только после проверки `dev`:

```bash
git checkout main
git pull origin main
git merge dev
git push origin main
git checkout dev
```

## 17. Карта документации

Документация теперь имеет явную последовательность чтения. Корневые файлы остаются со стандартными именами, а все файлы внутри `docs/` имеют глобальный номер в начале имени.

Базовый маршрут новичка:

1. `README.md` — главный вход в проект.
2. `AGENTS.md` — правила безопасной работы для Codex/агентов.
3. [docs/01-documentation-map.md](docs/01-documentation-map.md) — полная карта документации и порядок чтения `01-97`.
4. [docs/architecture/02-documentation-style-guide.md](docs/architecture/02-documentation-style-guide.md) — стандарт русскоязычной, понятной и структурированной документации.
5. [docs/architecture/03-hugo-template-helpers.md](docs/architecture/03-hugo-template-helpers.md) — локальные Hugo helpers и partials.
6. [docs/content/05-front-matter-reference.md](docs/content/05-front-matter-reference.md) — поля front matter для страниц.
7. [docs/quality/13-pagespeed-insights-audit.md](docs/quality/13-pagespeed-insights-audit.md) — ручная проверка опубликованных URL через PageSpeed Insights.
8. [docs/quality/14-production-quality-gate-2026.md](docs/quality/14-production-quality-gate-2026.md) — финальный контроль качества перед production-релизом.

Диапазоны нумерации внутри `docs/`:

- `01` — карта документации.
- `02-04` — архитектура и шаблонный слой.
- `05-11` и `67` — контент, изображения, обложки, AI-промпты и шаблоны материалов.
- `12-14` — Core Web Vitals, PageSpeed Insights и контроль качества перед production-релизом.
- `15-17` — локальные инструменты, Netlify routing и review-инфраструктура.
- `18-28` — SEO, schema.org, Entity Registry и structured data.
- `29-50` — аудит-снимки и исторические оценки до UI-карты.
- `51` — прикладная карта UI/UX-внедрения Tailwind Plus.
- `52+` — новые аудит-снимки, SEO-базы и последующие проектные документы.

Весь полный список файлов и их порядок чтения поддерживается в [docs/01-documentation-map.md](docs/01-documentation-map.md). Если добавляется новый документ, сначала выбирается следующий свободный номер, затем обновляются `docs/01-documentation-map.md`, `README.md`, `AGENTS.md` и локальные ссылки.
