# AGENTS.md

Обновлено: 2026-07-07.

## Обзор Проекта

- `Aerocool Ukraine` — маркетинговый и каталоговый сайт на `Hugo`.
- Основной язык сайта — украинский (`uk`), второй язык — русский (`ru`).
- Активная тема — `themes/PaperMod`, подключенная как git-подмодуль.
- Развертывание настроено через `Netlify`.
- Рабочая ветка для ежедневной разработки — `dev`; тестовый Netlify Branch Deploy — `https://dev--hugo-aerocool.netlify.app/`. `main` использовать только для production-релизов основного домена `https://aerocool.ua/`.

## Стек

- В `Netlify` зафиксирована версия `Hugo 0.164.0`.
- В `Netlify` зафиксирована версия `Node 24.16.0`.
- Локальные версии инструментов зафиксированы в `mise.toml`.
- Для стилизации используется `Tailwind CSS 4.3` через npm-пакеты `tailwindcss` и `@tailwindcss/cli` версии `4.3.0`.
- Для будущей review-системы подключены `Netlify Functions` и `Netlify Database` / `PostgreSQL`.
- Для проверки опубликованных URL используется ручной процесс PageSpeed Insights. Локальный браузерный аудит-плагин в Netlify не используется.
- Начиная с Hugo 0.161.0, `css.TailwindCSS` использует Tailwind CSS CLI из npm-зависимостей проекта; в текущем Hugo 0.164.0 Tailwind должен оставаться npm-зависимостью проекта, standalone Tailwind CLI не использовать.
- Локальные SEO-шаблоны и шаблоны schema.org-разметки находятся в `layouts/_partials/_seo` и `layouts/_partials/_schema`.

## Структура Репозитория

- `content/` — весь контент сайта.
- `content/_index.md` и `content/_index.ru.md` — локализованные главные страницы.
- `content/about`, `content/contact`, `content/faq`, `content/image-license` — локализованные статичные страницы.
- `content/articles`, `content/news` — материалы в формате папок страниц Hugo (`page bundle`) со структурами `index.md` и `index.ru.md`.
- `content/products` — каталог товаров. Для серий используются `_index.md` / `_index.ru.md`, а варианты товаров лежат во вложенных папках как самостоятельные папки страниц.
- `data/entities.yaml` — структурированный реестр entity IDs для safe resolver schema.org-связей.
- `layouts/` — локальные Hugo-переопределения. По умолчанию правки вносятся сюда, а не в тему.
- `layouts/single.html` и `layouts/list.html` — общие базовые шаблоны для большинства типов страниц.
- `layouts/articles/list.html` — специализированный листинг статей с управляемой сеткой карточек.
- `layouts/_partials/articles/card-image.html` — helper responsive-изображения для карточек статей.
- `layouts/_partials/home-final-cta.html` — финальный CTA главной страницы после товарно-информационных блоков.
- `layouts/products/list.html` — специализированный листинг каталога и страниц серий: page heading, быстрые ссылки между сериями, фильтры, сортировка, счетчик и сетка товаров.
- `layouts/_partials/products/card.html` — товарная карточка с product facts и `data-product-*` атрибутами для фильтров и сортировки. Видимый CTA `Подробнее` / `Детальніше` сохраняется коротким, но его доступное имя обязательно дополняется полным `$page.Title` через `sr-only`; не возвращать неинформативный анкор без названия модели.
- `layouts/_partials/products/filters.html` — static-first фильтры каталога и страниц серий без изменения URL и без индексируемых filter pages.
- `layouts/_partials/products/sort.html` — сортировка товаров по названию, рейтингу и цене.
- `layouts/404.html`, `layouts/alias.html` и `layouts/search.html` — служебные шаблоны страниц, которые не должны попадать в SEO-индекс.
- `layouts/rss.xml` — локальный RSS-шаблон.
- `layouts/sitemap.xml` — шаблон языковых sitemap-файлов.
- `layouts/sitemapindex.xml` — шаблон корневого мультиязычного sitemap index.
- `layouts/_partials/breadcrumbs.html` — видимые хлебные крошки для обычных страниц и листингов.
- `layouts/_partials/breadcrumb-label.html` — единый helper короткого названия страницы для видимых breadcrumbs и schema.org `BreadcrumbList`.
- `layouts/_partials/page-meta.html` — единый helper видимой meta-строки под `H1` и в карточках листингов: статьи получают дату и время чтения, новости — только дату, остальные типы страниц не получают блоговую meta-строку.
- Папки `layouts/_default` в локальном слое больше нет; не возвращать туда новые overrides без отдельной причины.
- Partial списка переводов — `layouts/_partials/translation-list.html`; старое имя `translation_list.html` не использовать. Обычные страницы сейчас не выводят список переводов в контентной зоне под `H1`; переключение языка остается в шапке сайта.
- `assets/css/main.css` — главный источник Tailwind и кастомного CSS; здесь же живут локальные design tokens, белый page canvas, базовый текстовый слой и component-layer проекта.
- `static/` — статические файлы, которые копируются как есть.
- `static/_redirects` — Netlify `_redirects` для явного root rewrite `/ -> /index.html 200` и forced `404!` по bot/scanner и sensitive URL: WordPress, `.env`, `.git`, framework manifests, filemanager, PHP/debug probes вроде `/phpinfo.php`, `/test.php` и `/:prefix/phpinfo.php`. SEO-переадресации сюда не добавлять; общий fallback `/* -> /404.html 404` не использовать, потому что Netlify автоматически берет `public/404.html`.
- `hugo.yaml` — основная конфигурация сайта: языки, постоянные ссылки, меню и настройки сборки.
- `netlify.toml` — сборка и заголовки ответа; временно используется `HUGO_ENVIRONMENT = "development"`, production включать только после финальной проверки.
- `netlify/database/migrations` — SQL-миграции Netlify Database. Появляется после первой миграции; для review-системы использовать Direct SQL, а не Drizzle ORM.
- `mise.toml` — локальные версии `Hugo 0.164.0` и `Node 24.16.0` для `mise`.

## Локальные Гайды

Перед тем как придумывать новые метаданные страницы, SEO-паттерн или контентную структуру, сначала сверяйтесь с локальными документами:

- `README.md`
- `docs/01-documentation-map.md`
- `docs/architecture/02-documentation-style-guide.md`
- `docs/architecture/03-hugo-template-helpers.md`
- `docs/architecture/04-browser-view-transitions.md`
- `docs/content/05-front-matter-reference.md`
- `docs/content/06-seo-image-shortcode.md`
- `docs/content/07-content-seo-checklist-2026.md`
- `docs/content/templates/08-article-template.md`
- `docs/content/templates/09-news-template.md`
- `docs/content/templates/10-product-template.md`
- `docs/content/templates/11-series-template.md`
- `docs/quality/12-core-web-vitals-guide-2026.md`
- `docs/quality/13-pagespeed-insights-audit.md`
- `docs/quality/14-production-quality-gate-2026.md`
- `docs/deploy/15-local-tooling-mise.md`
- `docs/deploy/16-netlify-routing.md`
- `docs/deploy/17-netlify-database-reviews.md`
- `docs/seo/18-seo-keyword-map-2026.md`
- `docs/seo/19-schema-types-reference.md`
- `docs/seo/20-schema-markup-quality-checklist-2026.md`
- `docs/seo/21-ecommerce-structured-data-playbook-2026.md`
- `docs/seo/22-entity-registry-beginner-guide-2026.md`
- `docs/seo/23-entity-registry-2026.md`
- `docs/seo/24-entities-knowledge-graph-playbook-2026.md`
- `docs/seo/25-ai-search-entity-map-2026.md`
- `docs/seo/26-json-ld-graph-audit-roadmap-2026.md`
- `docs/seo/27-google-seo-audit-checklist-2026.md`
- `docs/seo/28-ssg-seo-checklist-2026.md`
- `docs/audits/29-2026-04-29-hugo-0-161-compliance-audit.md`
- `docs/audits/30-2026-04-29-google-rich-results-quality-audit.md`
- `docs/audits/31-2026-05-06-content-depth-literary-audit.md`
- `docs/audits/32-2026-05-06-schemaapp-pdf-documentation-integration-audit.md`
- `docs/audits/33-2026-05-06-project-readiness-assessment.md`
- `docs/audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md`
- `docs/audits/35-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md`
- `docs/audits/36-2026-05-13-content-image-cover-alt-audit.md`
- `docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md`
- `docs/audits/38-2026-05-14-seo-image-documentation-cleanup.md`
- `docs/audits/39-2026-05-15-documentation-full-audit.md`
- `docs/audits/40-2026-05-17-documentation-current-audit.md`
- `docs/audits/41-2026-05-17-core-web-vitals-project-audit.md`
- `docs/audits/42-2026-05-17-schemaapp-support-knowledge-base-audit.md`
- `docs/audits/43-2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md`
- `docs/audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md`
- `docs/audits/45-2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md`
- `docs/audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md`
- `docs/audits/47-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md`
- `docs/audits/48-2026-05-18-documentation-current-audit.md`
- `docs/audits/49-2026-05-19-documentation-current-audit.md`
- `docs/audits/50-2026-05-19-visible-page-meta-policy-audit.md`
- `docs/architecture/51-tailwind-plus-ui-section-map-2026.md`
- `docs/audits/52-2026-05-20-json-ld-entity-full-audit-current.md`
- `docs/seo/53-keyword-database-2026.md`
- `docs/audits/54-2026-05-26-core-web-vitals-current-audit.md`
- `docs/audits/55-2026-05-26-schema-entity-full-audit.md`
- `docs/audits/56-2026-05-26-hugo-0-162-compliance-audit.md`
- `docs/audits/57-2026-05-31-schema-entity-full-audit-current.md`
- `docs/seo/58-product-facts-maintenance-process-2026.md`
- `docs/seo/59-entity-performance-report-2026.md`
- `docs/seo/60-schema-validator-url-checklist-2026.md`
- `docs/audits/61-2026-06-02-pagespeed-insights-quality-simplification.md`
- `docs/audits/62-2026-06-03-ux-ui-tailwind-current-audit.md`
- `docs/audits/63-2026-06-04-ux-ui-tailwind-current-audit.md`
- `docs/audits/64-2026-06-04-full-ux-ui-tailwind-audit.md`
- `docs/audits/65-2026-06-05-full-ux-ui-revalidation-audit.md`
- `docs/audits/66-2026-06-05-hugo-0-162-documentation-full-audit.md`
- `docs/content/67-image-design-playbook-2026.md`
- `docs/audits/68-2026-06-11-hugo-0-163-documentation-sync-audit.md`
- `docs/audits/69-2026-06-12-seo-image-product-gallery-documentation-audit.md`
- `docs/audits/70-2026-06-12-content-articles-news-image-home-hero-audit.md`
- `docs/audits/71-2026-06-13-full-project-image-audit.md`
- `docs/seo/72-semantic-core-keyword-strategy-2026.md`
- `docs/audits/73-2026-06-14-articles-news-inline-image-plan.md`
- `docs/audits/74-2026-06-15-articles-news-inline-image-serp-audit.md`
- `docs/audits/75-2026-06-16-articles-news-text-image-revalidation.md`
- `docs/seo/76-hugo-yaml-serp-technical-contract-2026.md`
- `docs/audits/77-2026-06-18-articles-news-content-image-audit.md`
- `docs/audits/78-2026-06-19-full-documentation-project-sync-audit.md`
- `docs/content/79-page-content-design-dna-2026.md`
- `docs/audits/80-2026-06-19-full-site-content-image-audit.md`
- `docs/seo/81-internal-linking-strategy-2026.md`
- `docs/audits/82-2026-06-21-full-documentation-project-sync-audit.md`
- `docs/audits/83-2026-06-21-netlify-rum-core-web-vitals-baseline.md`
- `docs/audits/84-2026-06-24-full-link-content-seo-audit.md`
- `docs/seo/85-content-linking-editorial-standard-2026.md`
- `docs/audits/86-2026-06-24-full-documentation-project-sync-audit.md`
- `docs/seo/87-content-expansion-keyword-roadmap-2026.md`
- `docs/seo/88-semantic-core-top1-growth-system-2026.md`
- `docs/audits/89-2026-06-24-cover-block-image-seo-audit.md`
- `docs/audits/90-2026-06-24-full-documentation-project-sync-audit-after-87-89.md`
- `docs/audits/91-2026-06-26-full-documentation-project-sync-audit-current.md`
- `docs/audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md`
- `docs/audits/93-2026-07-07-hugo-0-164-update-audit.md`

Последний полный аудит всей проектной документации: `docs/audits/91-2026-06-26-full-documentation-project-sync-audit-current.md`. Текущий Hugo/tooling target после обновления до Hugo `0.164.0` зафиксирован в `docs/audits/93-2026-07-07-hugo-0-164-update-audit.md`. Документы `87` и `88` — профильные документы по расширению ключевых слов, контента, развитию семантического ядра и стратегии роста; аудит `89` — профильная проверка `image` + `cover`, размеров, форматов, crop-наборов статей/новостей и дублей главных товарных изображений. Аудиты `78`, `82`, `86` и `90` использовать как исторические снимки.

Текущий профильный UX/UI-аудит выполнения карты Tailwind Plus: `docs/audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md`. Он фиксирует общую готовность **7.8/10**, P0 по одинаковым и тестовым товарным изображениям и актуальный порядок работ. Аудит `65` использовать как историческую code revalidation, аудит `64` — как screenshot evidence.

Текущий полный постраничный аудит текстов и изображений всего сайта: `docs/audits/80-2026-06-19-full-site-content-image-audit.md`. Текущая проверка служебного `image` + `cover`-контракта, размеров, форматов, crop-наборов и дублей главных товарных изображений: `docs/audits/89-2026-06-24-cover-block-image-seo-audit.md`. Постоянный контракт тональности, правил против AI-штампов, доказательности, визуальной ДНК, размеров и контрольных ограничений товарных изображений: `docs/content/79-page-content-design-dna-2026.md`. Текущий объединенный аудит ссылок, сниппетов, keyword target URL и SEO-контента: `docs/audits/84-2026-06-24-full-link-content-seo-audit.md`.

Текущий полный аудит и постоянный контракт внутренней перелинковки, анкоров, глубины, breadcrumbs, related-блоков, пагинации и внешних ссылок: `docs/seo/81-internal-linking-strategy-2026.md`. Постоянный стандарт того, где какой контент должен быть, как делать литературную обработку и как связывать страницы: `docs/seo/85-content-linking-editorial-standard-2026.md`.

Для новичка порядок чтения такой: сначала `README.md`, затем `AGENTS.md`, затем `docs/01-documentation-map.md`, затем `docs/architecture/02-documentation-style-guide.md`, затем `docs/architecture/03-hugo-template-helpers.md`, затем `docs/content/05-front-matter-reference.md`, затем `docs/quality/13-pagespeed-insights-audit.md`, затем `docs/quality/14-production-quality-gate-2026.md`. Для SEO/schema-задач после этого читать `docs/seo/19-schema-types-reference.md`, `docs/seo/20-schema-markup-quality-checklist-2026.md`, `docs/seo/24-entities-knowledge-graph-playbook-2026.md`, `docs/seo/26-json-ld-graph-audit-roadmap-2026.md`, текущий generated report `docs/seo/59-entity-performance-report-2026.md` и checklist `docs/seo/60-schema-validator-url-checklist-2026.md`; аудит `docs/audits/57-2026-05-31-schema-entity-full-audit-current.md` использовать как исторический полный snapshot на 2026-05-31. Для задач по `hugo.yaml`, индексации, sitemap, robots, canonical, hreflang, production gate и техническому SERP-фундаменту читать `docs/seo/76-hugo-yaml-serp-technical-contract-2026.md`. Для задач по внутренней перелинковке, анкорам, breadcrumbs, related-блокам, пагинации и внешним ссылкам читать `docs/seo/81-internal-linking-strategy-2026.md`, `docs/seo/85-content-linking-editorial-standard-2026.md` и `docs/audits/84-2026-06-24-full-link-content-seo-audit.md`; после production-сборки выполнять ручную проверку ссылок, sitemap, canonical, `hreflang`, локальных якорей и целевых страниц. Для задач по product facts читать `docs/seo/58-product-facts-maintenance-process-2026.md`. Для задач по entity performance читать `docs/seo/59-entity-performance-report-2026.md` и запускать `npm run entity:report` после `npm run build`; внешние метрики добавлять в `docs/seo/59-entity-performance-overrides.csv`. Для задач по ключевым словам, семантическому ядру и стратегии роста читать `docs/seo/18-seo-keyword-map-2026.md`, `docs/seo/53-keyword-database-2026.md`, `docs/seo/72-semantic-core-keyword-strategy-2026.md`, `docs/seo/87-content-expansion-keyword-roadmap-2026.md` и `docs/seo/88-semantic-core-top1-growth-system-2026.md`. Для любых текстов, литературной обработки, сниппетов, контентной архитектуры и изображений сначала читать `docs/content/79-page-content-design-dna-2026.md`, затем `docs/seo/85-content-linking-editorial-standard-2026.md`, затем `docs/content/67-image-design-playbook-2026.md`; текущее состояние content + links находится в `docs/audits/84-2026-06-24-full-link-content-seo-audit.md`, текущая проверка `image` + `cover` — в `docs/audits/89-2026-06-24-cover-block-image-seo-audit.md`, а page-level image backlog — в `docs/audits/80-2026-06-19-full-site-content-image-audit.md`. Аудиты `69`, `70`, `71`, `74` и `77` использовать для профильной или исторической детализации. Для performance/Core Web Vitals читать `docs/quality/12-core-web-vitals-guide-2026.md`, `docs/quality/13-pagespeed-insights-audit.md`, `docs/quality/14-production-quality-gate-2026.md` и текущий полевой аудит `83`; аудит `54` использовать как исторический lab baseline. Для UX/UI читать `docs/architecture/51-tailwind-plus-ui-section-map-2026.md` и текущий аудит `92`; audit `65` использовать как историческую code revalidation, а audit `64` — как screenshot evidence. Для tooling читать `docs/deploy/15-local-tooling-mise.md`, аудит `93` и `docs/seo/76-hugo-yaml-serp-technical-contract-2026.md`; аудиты `56`, `66` и `68` являются историческими.

## Контентные Правила

- Вся проектная документация должна быть написана на русском языке, с пояснениями для новичка и строгой структурой. Английские термины оставлять только для названий технологий, файлов, команд, полей и официальных SEO/schema/CWV-терминов. Подробный стандарт — `docs/architecture/02-documentation-style-guide.md`.

- Украинская и русская версии должны оставаться синхронными, если задача явно не ограничена одним языком.
- Текущий локализационный паттерн: `index.md` для украинской версии и `index.ru.md` для русской внутри одной папки страницы (`page bundle`).
- Изображения и другие файлы страницы хранятся рядом с теми контентными файлами, которые их используют.
- Для статей, новостей и товарных вариантов используйте явные `slug`, если важен контроль URL.
- Варианты товаров сознательно разделены по модели и цвету. Для каждого варианта — отдельная папка и отдельный `slug`.
- Во front matter использовать только `schema_types`. Шаблоны читают `.Params.schema_types`; не переходить на `schema_type`.
- Entity-поля `about_entities`, `mentions_entities` и `product_group_id` можно добавлять только точечно: каждое значение должно существовать в `data/entities.yaml` и быть раскрыто видимым контентом страницы. Для `about_entities` и `mentions_entities` использовать только `confirmed` сущности. `product_group_id` использовать только для реальных групп вариантов одной модели; одиночные товары связывать с линейкой через `about_entities`, `series` и страницу серии.
- Цветовые точки в товарных карточках выводит `layouts/_partials/products/color-dots.html`: для реальных групп вариантов главным источником остается `product_group_id`, а для одиночного товара без группы цвет берется из главной product entity через `about_entities` и `data/entities.yaml`. Не добавлять одиночному товару искусственный `product_group_id` только ради color dot.
- Для товарных страниц единый источник правды по merchant product facts — front matter конкретного `content/products/<series>/<model>/index*.md`: цена, наличие, SKU, MPN, GTIN, гарантия, доставка, возврат и способы оплаты. Владелец бизнес-значений — команда Aerocool Украина. Видимый товарный текст и `/faq/` должны подтверждать эти значения, а не заменять их. Операционный процесс ролей, подтверждений и QA описан в `docs/seo/58-product-facts-maintenance-process-2026.md`.
- Для отзывов и рейтингов целевой источник правды — `Netlify Database` с approved отзывами и build-time export в `data/generated/reviews.json`. Ручные поля `rating.value` и `rating.count` в товарный front matter не добавлять. `AggregateRating` и `Review` в `Product` JSON-LD можно выводить только если отзывы реальные, approved, публично видимые на этой же товарной странице и относятся к ее `review_target_id`.
- Для большинства страниц видимый `H1` рендерится шаблонным слоем через `layouts/_partials/page-h1.html` по правилу `.Params.h1 | default .Title`.
- Текущая главная страница — исключение: ее hero и видимый `H1` задаются единым shortcode `layouts/_shortcodes/home-hero.html`, который сам переключает украинский/русский текст по языку страницы.
- Home hero использует namespaced CSS-хуки `home-hero__*`; их визуальный слой держим в `assets/css/main.css`, а не размазываем по теме.
- Не добавлять markdown `# H1` внутрь `content/`. Тело страницы должно начинаться с вводного абзаца или с `##`.
- Поле `h1` в метаданных страницы использовать только тогда, когда видимый заголовок должен отличаться от SEO-заголовка документа `title`.
- Поле `linkTitle` использовать для короткого навигационного имени, если `title` слишком длинный для хлебных крошек или внутренних списков. Видимые breadcrumbs и `BreadcrumbList` должны получать одно и то же имя через `layouts/_partials/breadcrumb-label.html`.
- При редактировании сохранять `date` и `lastmod`. `lastmod` обновлять при любом содержательном изменении.
- Видимая meta-строка управляется `layouts/_partials/page-meta.html`: для статей выводятся дата публикации и время чтения, для новостей — только дата публикации, для contact, FAQ, about, products, серий, товаров, поиска и служебных страниц meta-строка скрыта. Количество слов, автор организации и список переводов под `H1` не возвращать без отдельного решения.
- В видимом markdown-контенте `content/**/*.md` не использовать обратные кавычки для inline-code. Точные технические обозначения, характеристики, SKU/MPN/GTIN, размеры, рейтинги и значения из таблиц выделять обычным жирным форматом: `**11D**`, `**SYNC5 multi-adjustable**`, `**75 мм**`. Широкие коммерческие SEO-фразы вроде `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office` писать обычным текстом или, если нужен акцент, обычным жирным выделением. Это правило не относится к Hugo/JS-коду в `layouts/` и к документационным примерам вне `content/`.
- Сайт должен покрывать не только брендовые запросы, но и широкие коммерческие кластеры: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `кресло для работы`, `home office`.
- Постоянно актуальные статьи в `content/articles` обычно должны целиться минимум в `10000` знаков основного текста на каждую языковую версию.
- Брендовые и запусковые новости в `content/news`, если они поддерживают органическую видимость, обычно должны целиться минимум в `5000` знаков тела на каждую языковую версию.
- Товарные страницы в `content/products/<series>/<model>/` обычно должны целиться минимум в `6000` знаков основного текста на каждую языковую версию.
- Страницы серий в `content/products/<series>/_index.md` и `_index.ru.md` обычно должны целиться минимум в `6000` знаков основного текста на каждую языковую версию.
- Хабы `/products/`, `/articles/` и `/news/` обычно должны целиться минимум в `7000` знаков основного текста на каждую языковую версию.
- Страница `/about/` обычно должна целиться минимум в `10000` знаков основного текста на каждую языковую версию.
- Статьи и новости должны вести пользователя в каталог через прямые внутренние ссылки на серии, товары, FAQ и контакты.

## Изображения И SEO

- Для article/news и вторичных контентных изображений по возможности использовать shortcode `seo-image`, а не сырые `<img>`.
- Для каждого файла `content/**/*.md` поддерживать связку `image` + полный служебный `cover`-блок: `cover.image`, `cover.alt`, `cover.relative`, `cover.hiddenInSingle`.
- Текущая проверка `docs/audits/89-2026-06-24-cover-block-image-seo-audit.md` фиксирует `100/100` markdown-страниц с полным `image` + `cover`-блоком, `0` отсутствующих файлов и `25/25` article/news bundles с полным crop-набором; при новых правках не ухудшать этот контракт.
- Для товарных страниц текущий стандарт такой: `image` во front matter для SEO/OG/schema и первого кадра product gallery, `cover.image` для preview в листингах, `layouts/_partials/products/gallery.html` для основного видимого изображения товара. Стартовый `seo-image` в markdown товара не добавлять.
- Главное изображение товара обязано точно соответствовать конкретным модели, цвету и материалу. Нельзя использовать один побайтно одинаковый файл для разных SKU; аудит `89` фиксирует image/SEO P1 для `12` товарных PNG, а текущий UX/UI-аудит `92` классифицирует это как P0 для товарного выбора. `TEST`, placeholder, mockup label, watermark и случайный AI-текст в product gallery запрещены. Целевой gallery-набор: front, front three-quarter, side/back, material, controls/mechanism и in-scale. Для новых и заменяемых product assets использовать единые имена во всех папках товаров: `01-front.webp`, `02-front-3q.webp`, `03-side.webp`, `04-back-3q.webp`, `05-back.webp`, `06-material.webp`, `07-controls.webp`, `08-mechanism.webp`, `09-in-scale.webp`, `10-dimensions.webp` или `10-dimensions.svg`.
- Товарная галерея на `layouts/products/single.html` собирается partial `layouts/_partials/products/gallery.html`: первым кадром идет `image` из front matter, остальные изображения из page bundle товара становятся миниатюрами. Для дополнительных фото не добавлять отдельные front matter поля; класть файлы рядом с `index.md` / `index.ru.md`. Product LCP preload выводится в `<head>` через `layouts/_partials/_seo/lcp-image-preload.html` и должен совпадать с gallery `sizes`. Если primary product image отсутствует или не является processable Hugo image resource, сборка должна падать.
- Выбор цвета на товарной странице выводит partial `layouts/_partials/products/variant-swatches.html`: swatches строятся из `product_group_id` и `data/entities.yaml` только для реальных ProductGroup с несколькими вариантами, являются ссылками на соседние variant URL текущего языка и не заменяют отдельные страницы вариантов.
- Для главных изображений первого экрана (LCP) обычно нужен `eager loading`; для второстепенных изображений — `lazy loading`.
- Hero-изображение главной страницы живет в `assets/images/home-hero85.webp`, имеет размер **2102x1401** по Tailwind Plus hero-коду и выводится через `layouts/_shortcodes/home-hero.html` как Hugo global image resource с responsive `srcset`; там сохранять `loading="eager"` и `fetchpriority="high"`.
- Параметр `jsonld` в shortcode `seo-image` больше не использовать: schema для главного изображения собирается централизованно из `image` во front matter.
- `alt` и `cover.alt` должны быть описательными и соответствовать языку страницы. Для `cover.alt` лучше называть сущность или тему изображения, а не начинать с общей формулы вроде `Обложка` / `Обкладинка`.
- В проекте уже есть шаблоны schema.org-разметки для `website`, `organization`, `brand`, `collection`, `article`, `news`, `product`, `faq` и `breadcrumbs`.
- Для текстов и изображений использовать общий контракт `docs/content/79-page-content-design-dna-2026.md`, затем профильный регламент `docs/content/67-image-design-playbook-2026.md`: товарный стандарт с приоритетом фактов, контролируемый high-tech редакционный слой, композиционное разнообразие, размеры, форматы и QA.
- Для inline-изображений в `content/articles` и `content/news` использовать текущий аудит `docs/audits/77-2026-06-18-articles-news-content-image-audit.md`, playbook `docs/content/67-image-design-playbook-2026.md` и историческую матрицу `docs/audits/74-2026-06-15-articles-news-inline-image-serp-audit.md`: production-файлы обычно **1200x800** WebP с именами `02-<topic>.webp`, `03-<topic>.webp`, вывод через `seo-image`, `loading="lazy"`, `preload=false`, `fetchpriority=auto`, локализованный `alt`.
- Для горизонтальных брендово-редакционных обложек **1536x1024** (`content/articles/**/01-front.webp`, `content/news/**/01-front.webp`, section covers и fallback) официальный логотип брать из `static/images/logo.svg` и держать единым lockup: **205x112 px**, позиция **x=34**, **y=34**. AI-сгенерированный логотип, другой размер/позиция и нижний дубль логотипа не допускаются.

## Шаблоны И Стили

- Сначала расширяем или переопределяем `Hugo`-шаблоны в `layouts/`, и только потом рассматриваем правки в `themes/PaperMod`.
- Если кажется, что нужно менять тему, сначала подтвердите, что этого нельзя добиться локальным переопределением.
- Локальные шаблоны, partials и shortcodes держим в формате `.html`; не возвращать `.gohtml`.
- Для новых локальных overrides сначала использовать верхний уровень `layouts/` или профильную подпапку, а не восстанавливать `layouts/_default`.
- При изменении CSS правим `assets/css/main.css`.
- В `assets/css/main.css` сначала обновляем design tokens и component-layer, и только потом добавляем точечный override; избегать возврата к широким `!important`-хакам и случайным hardcode-правилам темы.
- Поиск Tailwind-классов зависит от статистики сборки Hugo и путей сканирования контента/шаблонов. Не переносить шаблоны или контент в новые директории без проверки конфигурации.

## Сборка И Запуск

- Установка зависимостей: `npm install`.
- Локальная разработка: `./scripts/script_start.sh` или `hugo server`.
- Tailwind компилируется через `css.TailwindCSS` внутри Hugo; отдельный watch-процесс Tailwind не нужен.
- `npm run dev` — это удобный алиас для `hugo server`.
- `npm run build` — штатная development-сборка: сначала запускает `node scripts/export_reviews.mjs`, затем `hugo --environment development --gc --minify`. Использовать ее для полной локальной проверки, когда после правок нужна именно сборка проекта; review export является частью нормального dev-процесса.
- Build в `Netlify`: `git submodule update --init --recursive && node scripts/export_reviews.mjs && hugo --environment development --gc --minify`.
- `scripts/script_clean.sh` — мягкая очистка Hugo-артефактов: удаляет `public`, `resources`, `.hugo_build.lock` и `hugo_stats.json`, но не трогает `node_modules`, `.cache` и `package-lock.json`.
- `scripts/script_reset_full.sh` — тяжелый reset зависимостей: удаляет Hugo-артефакты, `node_modules` и `.cache`, затем запускает `npm install`; `package-lock.json` удаляется только при явном флаге `--with-lockfile`.

## Git И Netlify Workflow

- Все обычные изменения делать в ветке `dev`.
- Push в `dev` запускает Netlify Branch Deploy на `https://dev--hugo-aerocool.netlify.app/`.
- По подтверждению поддержки Netlify для этого проекта branch-сайт `dev--hugo-aerocool.netlify.app` можно использовать для частых автодеплоев и тестов без расходования production-лимитов основного домена.
- `main` — только production-релиз для `https://aerocool.ua/`. Не коммитить и не пушить в `main`, если пользователь явно не сказал переносить изменения в production.
- Перед любым commit/push сначала проверить `git status --short --branch`. Ожидаемая рабочая ветка по умолчанию: `dev`.
- Перенос `dev -> main` делать отдельным осознанным шагом после проверки тестового сайта, обычно раз в неделю или перед готовым релизом.
- Для отзывов на `dev`: отправка формы создает `pending` запись в database branch `dev`, ручное изменение статуса на `approved` в Netlify Dashboard требует нового deploy `dev`, потому что visible HTML и `data/generated/reviews.json` создаются на build-time.

## Правила Редактирования

- Не редактировать сгенерированный вывод в `public/` и временные Hugo-кэши в `resources/`.
- Не коммитить случайные `.DS_Store`.
- Предпочитать небольшие переопределения в `layouts/` и точечные правки контента вместо широких изменений темы.
- При добавлении новых разделов сохранять текущую двуязычную структуру папок и файлов.
- При изменении меню, языков, permalink-логики или SEO-дефолтов осторожно редактировать `hugo.yaml`, потому что это влияет на весь сайт; перед правкой читать `docs/seo/76-hugo-yaml-serp-technical-contract-2026.md`.
- При изменении `static/_redirects` использовать синтаксис Netlify: корневой rewrite держать выше scanner-правил, `*` применять только как splat в конце path segment, placeholder `/:prefix/...` использовать для одного сегмента, scanner/sensitive правила оставлять со статусом `404!`. Человекопохожие parser URL из логов без подтвержденной замены, например `/aboutus`, `/contactus`, `/company` или `/profile`, не редиректить; они должны оставаться обычной `404`.
- При изменении review-системы, `Netlify Database` migrations, `review_target_id`, moderation flow или build-time export отзывов проверять `docs/deploy/17-netlify-database-reviews.md`, `docs/content/05-front-matter-reference.md`, `docs/seo/21-ecommerce-structured-data-playbook-2026.md` и `docs/seo/20-schema-markup-quality-checklist-2026.md`.
- Не возвращать локальный браузерный audit plugin, Chrome-аудит зависимости или post-deploy browser runtime в `netlify.toml` без отдельного решения. Текущий стандарт проверки опубликованных URL — PageSpeed Insights.

## Проверки

- Для контентных правок запускать хотя бы сборку Hugo или локальный сервер.
- Для правок шаблонов или CSS проверять минимум главную страницу, одну страницу-листинг и одну детальную страницу в обоих языках.
- Проверять, что локализованные ссылки корректно работают и под `/`, и под `/ru/`.
- Проверять, что изображения из папок страниц берутся из правильной директории.
- Проверять, что метаданные страницы, связанные со schema.org, используют `schema_types` и соответствуют текущим шаблонам.
- Проверять видимую meta-строку после правок `layouts/single.html`, `layouts/list.html`, `layouts/faq/single.html`, `layouts/search.html` или `layouts/_partials/page-meta.html`: contact/FAQ/about/products без meta, article с датой и временем чтения, news только с датой, без списка переводов под `H1`.
- Проверять, что `search` остается `noindex,nofollow`. Пока проект намеренно собирается с `HUGO_ENVIRONMENT = "development"`, все HTML-страницы остаются `noindex,nofollow`; перед production-переходом отдельно проверить возврат `index,follow` для индексируемых URL.
- Проверять, что `404` и служебные alias-страницы остаются `noindex,nofollow`.
- При правках `static/_redirects` проверять, что `public/_redirects` обновился после сборки, `/` отдает `200`, а кастомная 404 продолжает отдаваться для scanner/sensitive URL. Для финальной проверки routing/headers использовать Netlify CLI или Deploy Preview.
- Проверять, что корневой `sitemap.xml` остается индексом карт сайта, а `/uk/sitemap.xml` и `/ru/sitemap.xml` содержат только индексируемые URL.
- После правок внутренних/внешних ссылок, `title`, `description`, URL, breadcrumbs, related-блоков, меню, карточек или контентных маршрутов запускать `npm run build:production`, затем вручную проверять ключевые URL, sitemap, canonical, `hreflang`, локальные якоря и целевые страницы.
- Для SEO-посадочных страниц дополнительно проверять целевые объемы текста и покрытие как брендовых, так и широких коммерческих интентов.
