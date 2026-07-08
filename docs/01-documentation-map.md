# Документация Aerocool

Обновлено: 2026-07-08.

Этот файл — главная карта всей документации проекта. Его задача простая: показать новичку, что читать сначала, что читать потом и какие документы нужны только для профильных задач.

Корневые файлы остаются со стандартными именами и не получают цифровой префикс:

- [README.md](../README.md) — краткая карта проекта, стека, структуры и основных команд.
- [AGENTS.md](../AGENTS.md) — правила безопасной работы для Codex/агентов.

Основные документационные позиции внутри `docs/` пронумерованы глобально от `01` до `97`. Номер в начале имени показывает рекомендуемый порядок чтения. Сопутствующие CSV-файлы используют номера своих основных документов `53` и `59`.

## Как Пользоваться Новичку

Если ты впервые открыл проект, не читай все сразу. Начни с базового маршрута:

1. [README.md](../README.md)
2. [AGENTS.md](../AGENTS.md)
3. [docs/01-documentation-map.md](01-documentation-map.md)
4. [docs/architecture/02-documentation-style-guide.md](architecture/02-documentation-style-guide.md)
5. [docs/architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md)
6. [docs/content/05-front-matter-reference.md](content/05-front-matter-reference.md)
7. [docs/quality/13-pagespeed-insights-audit.md](quality/13-pagespeed-insights-audit.md)

Этого достаточно, чтобы понять структуру сайта, правила правки контента, шаблонный слой и базовую проверку качества.

## Правило Нумерации

Внутри `docs/` используется единая глобальная нумерация:

- `01-...` — главный вход в документацию;
- `02-04` — архитектура и шаблонный слой;
- `05-11` — контент, front matter, изображения и шаблоны материалов;
- `12-14` — качество, Core Web Vitals, PageSpeed Insights и контроль перед production-релизом;
- `15-17` — локальные инструменты, Netlify routing и Netlify Database reviews;
- `18-28` — SEO, schema.org, entity registry и structured data;
- `29-50` — исторические и текущие audit-снимки до UI-карты;
- `51` — прикладная карта UI/UX-внедрения;
- `52+` — новые audit-снимки, SEO-базы и последующие проектные документы.

Для новых файлов выбирать следующий свободный номер и сразу обновлять эту карту, `README.md`, `AGENTS.md` и все локальные ссылки.

## Полная Последовательность Чтения

### База Проекта

1. [01-documentation-map.md](01-documentation-map.md) — эта карта документации и полный порядок чтения.

### Архитектура

2. [architecture/02-documentation-style-guide.md](architecture/02-documentation-style-guide.md) — правила языка, структуры, обновления и проверки документации.
3. [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md) — локальные Hugo partials/helpers, SEO helpers и schema helpers.
4. [architecture/04-browser-view-transitions.md](architecture/04-browser-view-transitions.md) — View Transitions и внешний `assets/js/site.js`.

### Контент

5. [content/05-front-matter-reference.md](content/05-front-matter-reference.md) — все front matter поля для страниц.
6. [content/06-seo-image-shortcode.md](content/06-seo-image-shortcode.md) — shortcode `seo-image` и правила изображений.
7. [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md) — редакционный SEO-чеклист для контентных правок.
8. [content/templates/08-article-template.md](content/templates/08-article-template.md) — шаблон новой статьи.
9. [content/templates/09-news-template.md](content/templates/09-news-template.md) — шаблон новости.
10. [content/templates/10-product-template.md](content/templates/10-product-template.md) — шаблон товарной страницы.
11. [content/templates/11-series-template.md](content/templates/11-series-template.md) — шаблон страницы серии.

### Качество

12. [quality/12-core-web-vitals-guide-2026.md](quality/12-core-web-vitals-guide-2026.md) — полный Core Web Vitals playbook для Hugo/Netlify/Tailwind сайта.
13. [quality/13-pagespeed-insights-audit.md](quality/13-pagespeed-insights-audit.md) — ручная проверка опубликованных URL через PageSpeed Insights.
14. [quality/14-production-quality-gate-2026.md](quality/14-production-quality-gate-2026.md) — финальный контроль качества перед production-релизом.

### Деплой И Инфраструктура

15. [deploy/15-local-tooling-mise.md](deploy/15-local-tooling-mise.md) — локальные версии Hugo/Node через `mise`.
16. [deploy/16-netlify-routing.md](deploy/16-netlify-routing.md) — Netlify `_redirects`, forced 404 и служебная 404-страница.
17. [deploy/17-netlify-database-reviews.md](deploy/17-netlify-database-reviews.md) — Netlify Database, Direct SQL, миграции, Functions, branch `dev` и SEO-first pipeline для отзывов.

### SEO, Schema.org И Сущности

18. [seo/18-seo-keyword-map-2026.md](seo/18-seo-keyword-map-2026.md) — карта ключевых слов и коммерческих интентов.
19. [seo/19-schema-types-reference.md](seo/19-schema-types-reference.md) — поле `schema_types` и соответствие типов страниц schema.org-разметке.
20. [seo/20-schema-markup-quality-checklist-2026.md](seo/20-schema-markup-quality-checklist-2026.md) — QA-чеклист schema.org-графа.
21. [seo/21-ecommerce-structured-data-playbook-2026.md](seo/21-ecommerce-structured-data-playbook-2026.md) — Product/Offer/rating/variant/images policy для каталога.
22. [seo/22-entity-registry-beginner-guide-2026.md](seo/22-entity-registry-beginner-guide-2026.md) — объяснение Entity Registry для новичка.
23. [seo/23-entity-registry-2026.md](seo/23-entity-registry-2026.md) — реестр сущностей, entity home, `@id`, статусы и управляемые связи.
24. [seo/24-entities-knowledge-graph-playbook-2026.md](seo/24-entities-knowledge-graph-playbook-2026.md) — правила entities, semantic triples и knowledge graph.
25. [seo/25-ai-search-entity-map-2026.md](seo/25-ai-search-entity-map-2026.md) — AI Search-аудит, prompt matrix, entity map и agentic readiness.
26. [seo/26-json-ld-graph-audit-roadmap-2026.md](seo/26-json-ld-graph-audit-roadmap-2026.md) — аудит и roadmap JSON-LD graph.
27. [seo/27-google-seo-audit-checklist-2026.md](seo/27-google-seo-audit-checklist-2026.md) — полный SEO-аудит для сильного ранжирования в Google.
28. [seo/28-ssg-seo-checklist-2026.md](seo/28-ssg-seo-checklist-2026.md) — общий SSG SEO-чеклист.

### Аудиты

Аудиты читать после базовых документов. Они фиксируют историю решений и текущие риски.

29. [audits/29-2026-04-29-hugo-0-161-compliance-audit.md](audits/29-2026-04-29-hugo-0-161-compliance-audit.md) — архивный аудит совместимости с Hugo 0.161.0; текущий Hugo target см. в аудите 93.
30. [audits/30-2026-04-29-google-rich-results-quality-audit.md](audits/30-2026-04-29-google-rich-results-quality-audit.md) — аудит Google rich results качества.
31. [audits/31-2026-05-06-content-depth-literary-audit.md](audits/31-2026-05-06-content-depth-literary-audit.md) — аудит глубины и литературной обработки `content/`.
32. [audits/32-2026-05-06-schemaapp-pdf-documentation-integration-audit.md](audits/32-2026-05-06-schemaapp-pdf-documentation-integration-audit.md) — интеграция выводов из SchemaApp PDF.
33. [audits/33-2026-05-06-project-readiness-assessment.md](audits/33-2026-05-06-project-readiness-assessment.md) — оценка готовности проекта после обновления документации и аудита.
34. [audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md](audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md) — исторический P0/P1/P2/P3 action-plan snapshot на 2026-05-07.
35. [audits/35-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md](audits/35-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md) — corpus-анализ статей SchemaApp за 2016-2026.
36. [audits/36-2026-05-13-content-image-cover-alt-audit.md](audits/36-2026-05-13-content-image-cover-alt-audit.md) — аудит `image`, `cover`, `cover.alt` и content image consistency.
37. [audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md](audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md) — историческая синхронизация документации с практиками 2026 на 2026-05-13.
38. [audits/38-2026-05-14-seo-image-documentation-cleanup.md](audits/38-2026-05-14-seo-image-documentation-cleanup.md) — очистка документации по `seo-image`.
39. [audits/39-2026-05-15-documentation-full-audit.md](audits/39-2026-05-15-documentation-full-audit.md) — исторический полный аудит документационного слоя на 2026-05-15.
40. [audits/40-2026-05-17-documentation-current-audit.md](audits/40-2026-05-17-documentation-current-audit.md) — исторический аудит документации на 2026-05-17.
41. [audits/41-2026-05-17-core-web-vitals-project-audit.md](audits/41-2026-05-17-core-web-vitals-project-audit.md) — Core Web Vitals аудит проекта.
42. [audits/42-2026-05-17-schemaapp-support-knowledge-base-audit.md](audits/42-2026-05-17-schemaapp-support-knowledge-base-audit.md) — аудит support-статей Schema App.
43. [audits/43-2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md](audits/43-2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md) — контрольный аудит JSON-LD после support-данных Schema App.
44. [audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md) — анализ PDF Schema App про connected schema и Agentic Web.
45. [audits/45-2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md](audits/45-2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md) — контрольный аудит после PDF Schema App.
46. [audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md) — анализ Schema App customer stories/case studies.
47. [audits/47-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md](audits/47-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md) — контрольный JSON-LD/entity audit после customer stories.
48. [audits/48-2026-05-18-documentation-current-audit.md](audits/48-2026-05-18-documentation-current-audit.md) — аудит всей документации на 2026-05-18.
49. [audits/49-2026-05-19-documentation-current-audit.md](audits/49-2026-05-19-documentation-current-audit.md) — исторический аудит всей документации на 2026-05-19.
50. [audits/50-2026-05-19-visible-page-meta-policy-audit.md](audits/50-2026-05-19-visible-page-meta-policy-audit.md) — аудит новой политики видимой meta-строки страниц.

### UI/UX Карты

51. [architecture/51-tailwind-plus-ui-section-map-2026.md](architecture/51-tailwind-plus-ui-section-map-2026.md) — карта внедрения Tailwind Plus UI-секций для главной, каталога, серий, товаров, FAQ, контактов, форм и footer.

### Исторические Schema/Entity Аудиты После UI/UX Карты

52. [audits/52-2026-05-20-json-ld-entity-full-audit-current.md](audits/52-2026-05-20-json-ld-entity-full-audit-current.md) — исторический полный аудит JSON-LD, Entity Registry, Product graph, breadcrumbs, ratings/reviews и ProductGroup на 2026-05-20. Для текущих машинных счетчиков использовать документы `59` и `60`.

### SEO Базы После Аудитов

53. [seo/53-keyword-database-2026.md](seo/53-keyword-database-2026.md) — рабочая база ключевых слов проекта: `389` строк, покрытие `100` markdown-страниц, support/legal URL `/image-license/`, product-level `price` / `availability` / `specs` интенты для всех товаров, content-expansion growth-кластеры, CSV-поля для Google Search Console, аналитики, развития контента и проверки каннибализации.

### Актуальные CWV Аудиты

54. [audits/54-2026-05-26-core-web-vitals-current-audit.md](audits/54-2026-05-26-core-web-vitals-current-audit.md) — исторический lab baseline Core Web Vitals проекта на 2026-05-26.

### Schema/Entity Аудит 2026-05-26

55. [audits/55-2026-05-26-schema-entity-full-audit.md](audits/55-2026-05-26-schema-entity-full-audit.md) — полный аудит schema/entity-слоя, Entity Registry, всех сущностей, Product graph, connected schema, ratings/reviews governance и списка проблем на 2026-05-26.

### Исторические Hugo Аудиты

56. [audits/56-2026-05-26-hugo-0-162-compliance-audit.md](audits/56-2026-05-26-hugo-0-162-compliance-audit.md) — исторический аудит перехода проекта на Hugo 0.162.0, обновленных pins, сборки и deprecated language API cleanup.

### Schema/Entity Аудит 2026-05-31

57. [audits/57-2026-05-31-schema-entity-full-audit-current.md](audits/57-2026-05-31-schema-entity-full-audit-current.md) — исторический полный schema/entity-аудит на 2026-05-31: rendered JSON-LD, Entity Registry, все сущности, Product graph, ProductGroup, reviews pipeline и connected schema. Для текущих машинных счетчиков использовать документы `59` и `60`.

### Операционные SEO/Schema Регламенты

58. [seo/58-product-facts-maintenance-process-2026.md](seo/58-product-facts-maintenance-process-2026.md) — регламент поддержки product facts: роли команды Aerocool Украина, порядок обновления front matter, HTML, JSON-LD, `/faq/`, Entity Registry и post-deploy QA.

### Отчеты По Entity Performance

59. [seo/59-entity-performance-report-2026.md](seo/59-entity-performance-report-2026.md) — текущий отчет по эффективности сущностей (Entity Performance Report): registry, `about_entities`, `mentions_entities`, `product_group_id`, rendered JSON-LD refs, generated CSV и `59-entity-performance-overrides.csv` для будущих GSC/AI/business-метрик.

### Чеклисты Schema Validator

60. [seo/60-schema-validator-url-checklist-2026.md](seo/60-schema-validator-url-checklist-2026.md) — полный список `96` dev URL с JSON-LD для ручной проверки через `https://validator.schema.org`, с приоритетом проверки и исключениями.

### Упрощение Quality-Аудита

61. [audits/61-2026-06-02-pagespeed-insights-quality-simplification.md](audits/61-2026-06-02-pagespeed-insights-quality-simplification.md) — решение убрать локальный browser-аудит из Netlify и перейти на ручную проверку опубликованных URL через PageSpeed Insights.

### Текущие UX/UI Аудиты

62. [audits/62-2026-06-03-ux-ui-tailwind-current-audit.md](audits/62-2026-06-03-ux-ui-tailwind-current-audit.md) — исторический UX/UI-аудит после первых обновлений визуального слоя Tailwind 4.3, FAQ, контактов, success alert, recommended links для статей/новостей, about-компонентов, product cards и product detail layout. Для текущего состояния использовать audit `92`.

63. [audits/63-2026-06-04-ux-ui-tailwind-current-audit.md](audits/63-2026-06-04-ux-ui-tailwind-current-audit.md) — исторический быстрый UX/UI snapshot после каталоговых обновлений: 1440px site width, desktop/mobile catalog navigation, product filters, sort, product cards, PDP purchase-блоки и backlog по comparison table, applied filter chips и search UI. Для текущего полного аудита использовать audit `92`.

64. [audits/64-2026-06-04-full-ux-ui-tailwind-audit.md](audits/64-2026-06-04-full-ux-ui-tailwind-audit.md) — исторический полный UX/UI-аудит Tailwind 4.3: screenshots, rendered HTML, CDP-проверка filters/sort, PDP gallery, search UI, root catalog titles, series previews, contact placeholders, Tailwind token debt и практический порядок исправлений. Использовать как screenshot evidence; для текущего состояния читать audit `92`.

65. [audits/65-2026-06-05-full-ux-ui-revalidation-audit.md](audits/65-2026-06-05-full-ux-ui-revalidation-audit.md) — исторический повторный UX/UI-аудит Tailwind 4.3 на 2026-06-05: фиксирует оценку **7.9/10** после исправления root catalog titles, успешную Hugo-сборку и открытые на ту дату P1/P2 задачи. Для текущего состояния и порядка работ использовать audit `92`.

### Исторические Tooling-Аудиты

66. [audits/66-2026-06-05-hugo-0-162-documentation-full-audit.md](audits/66-2026-06-05-hugo-0-162-documentation-full-audit.md) — исторический полный аудит документации по Hugo 0.162.0 на 2026-06-05. Для текущего target использовать аудит `93`.

### Регламент Обложек И AI-Промптов

67. [content/67-image-design-playbook-2026.md](content/67-image-design-playbook-2026.md) — общий регламент изображений проекта: визуальная ДНК, high-tech/tactile стиль, единое расположение логотипа на обложках, товарный слой с приоритетом фактов, повторно используемые AI-промпты, negative prompt, дефект-чеклист, технические параметры WebP и сравнение с Google/web.dev/Baymard/Adobe/Canva практиками 2026.

### Исторические Tooling-Аудиты

68. [audits/68-2026-06-11-hugo-0-163-documentation-sync-audit.md](audits/68-2026-06-11-hugo-0-163-documentation-sync-audit.md) — исторический аудит синхронизации документации с Hugo 0.163.0, Node 24.16.0, Tailwind CSS 4.3, `mise.toml`, `netlify.toml`, README, AGENTS и tooling-гайдом. Для текущего target использовать аудит `93`.

### Текущие Image/SEO-Аудиты

69. [audits/69-2026-06-12-seo-image-product-gallery-documentation-audit.md](audits/69-2026-06-12-seo-image-product-gallery-documentation-audit.md) — текущий аудит документации по `seo-image`, product gallery, LCP preload и front matter изображениям; фиксирует объяснение “что за что отвечает” для новичка и оценку **9.0/10**.

70. [audits/70-2026-06-12-content-articles-news-image-home-hero-audit.md](audits/70-2026-06-12-content-articles-news-image-home-hero-audit.md) — текущий полный аудит `content/articles`, `content/news`, article/news обложек, schema crops и `assets/images/home-hero85.webp`; фиксирует результат **9.4/10**, отсутствие активных P1-дефектов в articles/news и обновление landscape home hero.

71. [audits/71-2026-06-13-full-project-image-audit.md](audits/71-2026-06-13-full-project-image-audit.md) — исторический ручной аудит изображений на 2026-06-13. Для текущего полного состояния, где test product assets переведены в P1, использовать аудит `80`.

### Стратегия Семантического Ядра

72. [seo/72-semantic-core-keyword-strategy-2026.md](seo/72-semantic-core-keyword-strategy-2026.md) — текущая стратегия семантического ядра и ключевых слов на 2026 год: оценка **9.5/10**, правила развития keyword-базы, product-level price/availability/specs слой, GSC-план, anti-cannibalization matrix и roadmap расширения посадочных страниц.

### Inline-Изображения Статей И Новостей

73. [audits/73-2026-06-14-articles-news-inline-image-plan.md](audits/73-2026-06-14-articles-news-inline-image-plan.md) — исторический snapshot плана inline-изображений на 2026-06-14. Для текущего состояния использовать аудит `77`, а для поштучной исторической матрицы — аудит `74`.
74. [audits/74-2026-06-15-articles-news-inline-image-serp-audit.md](audits/74-2026-06-15-articles-news-inline-image-serp-audit.md) — подробная матрица всех текстов `content/articles` и `content/news` по inline-изображениям: фактическое состояние, рекомендации по каждому материалу, SERP-стандарт размеров/форматов/веса, shortcode-правила и закрытый backlog внедрения.
75. [audits/75-2026-06-16-articles-news-text-image-revalidation.md](audits/75-2026-06-16-articles-news-text-image-revalidation.md) — исторический snapshot текстов и изображений после закрытия inline backlog. Для текущего состояния использовать аудит `77`.

### Hugo.yaml И SERP-Технический Контракт

76. [seo/76-hugo-yaml-serp-technical-contract-2026.md](seo/76-hugo-yaml-serp-technical-contract-2026.md) — текущий полный аудит `hugo.yaml` как технического SERP-фундамента проекта на `Hugo 0.164.0`, `Tailwind CSS 4.3` и `Netlify`; фиксирует оценку **9.4/10**, production gate, рекомендации по sitemap, robots, canonical, hreflang, Tailwind build stats и правила проверки после любых правок конфига.

### Текущий Глубокий Аудит Articles/News

77. [audits/77-2026-06-18-articles-news-content-image-audit.md](audits/77-2026-06-18-articles-news-content-image-audit.md) — текущий полный аудит `content/articles` и `content/news`: тексты двух языков, выполненная реструктуризация шести статей, 146 WebP-файлов, визуальное разнообразие, фактическая доказательность, технические правила и итоговая оценка **9.1/10**.

### Исторический Полный Аудит Документации

78. [audits/78-2026-06-19-full-documentation-project-sync-audit.md](audits/78-2026-06-19-full-documentation-project-sync-audit.md) — исторический снимок полной проверки документации на 2026-06-19. Для текущего состояния использовать аудит `82`.

### Единый DNA Контента И Текущий Полный Content/Image Аудит

79. [content/79-page-content-design-dna-2026.md](content/79-page-content-design-dna-2026.md) — постоянный контракт текстов и изображений всех типов страниц: тональность, правила против AI-штампов, доказательность, визуальная ДНК, размеры, форматы, контрольные ограничения товарных изображений и рабочий процесс.
80. [audits/80-2026-06-19-full-site-content-image-audit.md](audits/80-2026-06-19-full-site-content-image-audit.md) — текущий постраничный аудит всех **50** логических URL и **181** файла изображений проекта: рекомендации для каждой страницы, P1 по одинаковым главным товарным изображениям и SKY `TEST`-файлам, техническая матрица и итоговая оценка **7.8/10**.

### Текущий Контракт Перелинковки И Ссылок

81. [seo/81-internal-linking-strategy-2026.md](seo/81-internal-linking-strategy-2026.md) — полный аудит и постоянный контракт внутренней перелинковки, анкоров, глубины, breadcrumbs, related-блоков, пагинации и внешних ссылок; структурная оценка **9.5/10**, ручной контроль ссылок после production-сборки, текущие метрики двух языков и P0-P3 roadmap.

### Исторический Полный Аудит Документации 2026-06-21

82. [audits/82-2026-06-21-full-documentation-project-sync-audit.md](audits/82-2026-06-21-full-documentation-project-sync-audit.md) — историческая полная проверка документационного слоя на 2026-06-21: русский язык, порядок чтения, ссылки, стек, development/production-сборки, JSON-LD и официальные практики 2026 года. Использовать как исторический baseline, а текущий полный аудит документации брать из `97`.

### Текущий Полевой CWV Аудит

83. [audits/83-2026-06-21-netlify-rum-core-web-vitals-baseline.md](audits/83-2026-06-21-netlify-rum-core-web-vitals-baseline.md) — текущий Netlify Real User Monitoring baseline: `Good` по p75 для `LCP`, `INP`, `CLS` и оценка CWV field readiness **9.5/10**.

### Текущий Аудит Ссылок И SEO-Контента

84. [audits/84-2026-06-24-full-link-content-seo-audit.md](audits/84-2026-06-24-full-link-content-seo-audit.md) — текущий объединенный аудит ссылок, keyword target URL, title/description, редакционных ориентиров объема и контентных P0-P3 проблем; фиксирует ручной baseline проверки ссылок, 0 битых ссылок, 0 orphan URL, 0 sitemap/canonical расхождений, 0 `hreflang` ошибок и итоговую content + links SEO readiness **8.8/10**.

### Постоянный SERP-Стандарт Контента И Ссылок

85. [seo/85-content-linking-editorial-standard-2026.md](seo/85-content-linking-editorial-standard-2026.md) — постоянный контракт контентной архитектуры, литературной обработки, SERP-сниппетов, ссылок, объема, фактической доказательности и условий создания новых страниц.

### Исторический Полный Аудит Документации После Документов 84-85

86. [audits/86-2026-06-24-full-documentation-project-sync-audit.md](audits/86-2026-06-24-full-documentation-project-sync-audit.md) — исторический полный снимок документации на 2026-06-24 после добавления документов `84` и `85`: русский язык, порядок чтения `01-86`, ссылки, стек, Hugo/Tailwind/Netlify, лучшие практики изображений, schema.org и CWV, синхронизация с проектом и итоговая оценка **9.8/10**. Для текущего полного аудита использовать документ `97`.

### Расширение Контента И Ключевых Слов

87. [seo/87-content-expansion-keyword-roadmap-2026.md](seo/87-content-expansion-keyword-roadmap-2026.md) — тактическая стратегия расширения контента под новые ключевые слова: growth-кластеры, правила использования ключей в `title`, `description`, `H1`, `H2`, FAQ и внутренних ссылках, roadmap усиления существующих страниц и условия создания новых URL.
88. [seo/88-semantic-core-top1-growth-system-2026.md](seo/88-semantic-core-top1-growth-system-2026.md) — операционная система развития семантического ядра и Top-1 growth strategy: оценка **9.5/10**, направления роста, сценарии работ, GSC-цикл, инструменты, 90-дневный план и правила без гарантий `топ-1`.

### Текущий Аудит Cover/Image SEO

89. [audits/89-2026-06-24-cover-block-image-seo-audit.md](audits/89-2026-06-24-cover-block-image-seo-audit.md) — текущая машинная и визуальная проверка `image` + служебного `cover`-блока по всем `100` markdown-файлам: `100/100` полных cover-блоков, `0` отсутствующих файлов, `25/25` article/news bundles с полным crop-набором, P1 по `12` одинаковым главным товарным PNG и итоговая оценка SEO-слоя изображений **8.8/10**.

### Исторический Полный Аудит Документации После Документов 87-89

90. [audits/90-2026-06-24-full-documentation-project-sync-audit-after-87-89.md](audits/90-2026-06-24-full-documentation-project-sync-audit-after-87-89.md) — исторический полный аудит документации после добавления документов `87`, `88` и `89`: порядок чтения `01-90`, русский язык, стек Hugo/Node/Tailwind/Netlify, ссылки, image/cover-стандарт, SEO/schema/CWV, синхронизация с проектом и итоговая оценка **9.8/10**. Для текущего полного аудита использовать документ `97`.

### Исторический Полный Аудит Документации 2026-06-26

91. [audits/91-2026-06-26-full-documentation-project-sync-audit-current.md](audits/91-2026-06-26-full-documentation-project-sync-audit-current.md) — исторический полный аудит документации на 2026-06-26: порядок чтения `01-91`, русский язык, стек на дату аудита Hugo `0.163.0` / Node `24.16.0` / Tailwind CSS `4.3.0`, ссылки, image/cover-стандарт, SEO/schema/CWV, проверка production-сборки и итоговая оценка **9.8/10**. Для текущего полного аудита использовать документ `97`, а tooling-аудит Hugo `0.164.0` брать из документа `93`.

### Текущий UX/UI Аудит Tailwind Plus

92. [audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md](audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md) — текущая проверка выполнения карты `51`: структура Tailwind Plus **8.1/10**, фактический e-commerce UX **7.6/10**, общая готовность **7.8/10**, закрытые UI-задачи, P0 по одинаковым и тестовым товарным изображениям и актуальный порядок работ по featured products, filters, comparison, search, series и PDP.

### Текущий Hugo/Tooling Аудит

93. [audits/93-2026-07-07-hugo-0-164-update-audit.md](audits/93-2026-07-07-hugo-0-164-update-audit.md) — текущий аудит перехода проекта на Hugo 0.164.0: pins в `mise.toml` и `netlify.toml`, отказ от хрупкого template-guard в `layouts/baseof.html`, tooling-документация, Tailwind 4.3, Node 24.16.0, сборка и базовые проверки.

### Исторический Полный Аудит Документации После Hugo 0.164.0

94. [audits/94-2026-07-07-full-documentation-project-sync-audit-current.md](audits/94-2026-07-07-full-documentation-project-sync-audit-current.md) — исторический полный аудит всей проектной документации на 2026-07-07 после перехода на Hugo `0.164.0`: порядок чтения `01-94`, русский язык, новичковая структура, ссылки, `image` + `cover`, schema.org, Entity Registry, Core Web Vitals, Netlify, pinned stack, официальные практики 2026 года и итоговая оценка **9.8/10**. Для текущего полного аудита использовать документ `97`.

### Исторический Полный Аудит Документации 2026-07-08

95. [audits/95-2026-07-08-full-documentation-project-sync-audit-current.md](audits/95-2026-07-08-full-documentation-project-sync-audit-current.md) — исторический полный аудит всей проектной документации на 2026-07-08 до добавления профильного WebMCP-документа `96`: порядок чтения `01-95`, русский язык, новичковая структура, ссылки, `image` + `cover`, schema.org, Entity Registry, Core Web Vitals, Netlify, pinned stack, официальные практики 2026 года и итоговая оценка **9.8/10**. Для текущего полного аудита использовать документ `97`.

### Текущий Agentic Browsing Аудит

96. [audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md) — профильный audit WebMCP-аннотаций форм, `static/llms.txt` и PageSpeed Agentic Browsing. Фиксирует, какие формы зарегистрированы как инструменты, как устроены `toolname`, `tooldescription`, `toolparamdescription`, почему `fieldset` нужен для checkbox/radio-групп и как проверять результат новичку.

### Текущий Полный Аудит Документации После WebMCP

97. [audits/97-2026-07-08-full-documentation-project-sync-audit-current.md](audits/97-2026-07-08-full-documentation-project-sync-audit-current.md) — текущий полный аудит всей проектной документации на 2026-07-08 после добавления WebMCP, `static/llms.txt` и профильного документа `96`: порядок чтения `01-97`, русский язык, новичковая структура, ссылки, `image` + `cover`, schema.org, Entity Registry, Core Web Vitals, WebMCP, Netlify, pinned stack, официальные практики 2026 года и итоговая оценка **9.8/10**.

## Маршруты По Задачам

Для проверки или обновления всей документации читать:

1. [architecture/02-documentation-style-guide.md](architecture/02-documentation-style-guide.md)
2. [audits/97-2026-07-08-full-documentation-project-sync-audit-current.md](audits/97-2026-07-08-full-documentation-project-sync-audit-current.md)
3. текущий профильный гайд или аудит из разделов ниже

Для контентной правки читать:

1. [content/05-front-matter-reference.md](content/05-front-matter-reference.md)
2. [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md)
3. нужный шаблон из `content/templates/`
4. [content/79-page-content-design-dna-2026.md](content/79-page-content-design-dna-2026.md), если задача касается текста страницы, тональности, правил против AI-штампов, доказательности или совместной работы текста и изображения.
5. [seo/85-content-linking-editorial-standard-2026.md](seo/85-content-linking-editorial-standard-2026.md), если задача касается того, где какой контент должен быть, как делать литературную обработку, какие ссылки нужны странице и когда создавать новый URL.
6. [audits/84-2026-06-24-full-link-content-seo-audit.md](audits/84-2026-06-24-full-link-content-seo-audit.md), если нужен текущий объединенный аудит ссылок, контента, сниппетов и P0-P3 проблем.
7. [content/67-image-design-playbook-2026.md](content/67-image-design-playbook-2026.md), если задача касается обложек, AI-промптов, fallback-картинок, product gallery, inline-иллюстраций, технических схем или визуального стиля.
8. [audits/89-2026-06-24-cover-block-image-seo-audit.md](audits/89-2026-06-24-cover-block-image-seo-audit.md), если нужно проверить наличие `image` / `cover`, размеры, форматы, crop-наборы и текущий P1 по главным товарным изображениям.
9. [audits/80-2026-06-19-full-site-content-image-audit.md](audits/80-2026-06-19-full-site-content-image-audit.md), если нужно состояние изображений и page-level backlog всего сайта.
10. [audits/77-2026-06-18-articles-news-content-image-audit.md](audits/77-2026-06-18-articles-news-content-image-audit.md), если нужна специализированная детализация `content/articles` / `content/news`.
11. [audits/74-2026-06-15-articles-news-inline-image-serp-audit.md](audits/74-2026-06-15-articles-news-inline-image-serp-audit.md), если нужна историческая матрица inline-изображений.
12. [audits/70-2026-06-12-content-articles-news-image-home-hero-audit.md](audits/70-2026-06-12-content-articles-news-image-home-hero-audit.md), если нужна специализированная проверка обложек, crops и home hero.

Для изображений, AI-промптов и визуального стиля читать:

1. [content/79-page-content-design-dna-2026.md](content/79-page-content-design-dna-2026.md)
2. [content/67-image-design-playbook-2026.md](content/67-image-design-playbook-2026.md)
3. [content/06-seo-image-shortcode.md](content/06-seo-image-shortcode.md)
4. [content/05-front-matter-reference.md](content/05-front-matter-reference.md)
5. [content/templates/10-product-template.md](content/templates/10-product-template.md), если задача касается главного товарного изображения или gallery
6. [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md)
7. [quality/12-core-web-vitals-guide-2026.md](quality/12-core-web-vitals-guide-2026.md)
8. [audits/89-2026-06-24-cover-block-image-seo-audit.md](audits/89-2026-06-24-cover-block-image-seo-audit.md), если задача касается `image`, служебного `cover`-блока, размеров, форматов, schema crops или дублей главных товарных изображений.
9. [audits/80-2026-06-19-full-site-content-image-audit.md](audits/80-2026-06-19-full-site-content-image-audit.md), если нужна текущая ручная проверка всех изображений и page-level backlog.
10. [audits/77-2026-06-18-articles-news-content-image-audit.md](audits/77-2026-06-18-articles-news-content-image-audit.md), если задача касается `content/articles` / `content/news`.
11. [audits/74-2026-06-15-articles-news-inline-image-serp-audit.md](audits/74-2026-06-15-articles-news-inline-image-serp-audit.md), если нужна историческая матрица inline-иллюстраций.
12. [audits/70-2026-06-12-content-articles-news-image-home-hero-audit.md](audits/70-2026-06-12-content-articles-news-image-home-hero-audit.md), если задача касается только covers, schema crops или `assets/images/home-hero85.webp`.

Для schema.org или rich results читать:

1. [seo/19-schema-types-reference.md](seo/19-schema-types-reference.md)
2. [seo/20-schema-markup-quality-checklist-2026.md](seo/20-schema-markup-quality-checklist-2026.md)
3. [seo/26-json-ld-graph-audit-roadmap-2026.md](seo/26-json-ld-graph-audit-roadmap-2026.md)
4. [seo/21-ecommerce-structured-data-playbook-2026.md](seo/21-ecommerce-structured-data-playbook-2026.md), если задача касается каталога или товаров
5. [deploy/17-netlify-database-reviews.md](deploy/17-netlify-database-reviews.md), если задача касается отзывов, рейтингов или `AggregateRating`
6. [seo/58-product-facts-maintenance-process-2026.md](seo/58-product-facts-maintenance-process-2026.md), если задача касается цены, наличия, гарантии, доставки, возврата, оплаты, `priceValidUntil`, цвета или характеристик товара
7. [seo/59-entity-performance-report-2026.md](seo/59-entity-performance-report-2026.md), если нужны текущие машинные счетчики entity/rendered refs
8. [seo/60-schema-validator-url-checklist-2026.md](seo/60-schema-validator-url-checklist-2026.md), если нужна ручная проверка страниц через `validator.schema.org`
9. [audits/57-2026-05-31-schema-entity-full-audit-current.md](audits/57-2026-05-31-schema-entity-full-audit-current.md), если нужен исторический полный baseline schema/entity-состояния на 2026-05-31

Для AI Search и entity SEO читать:

1. [seo/22-entity-registry-beginner-guide-2026.md](seo/22-entity-registry-beginner-guide-2026.md)
2. [seo/23-entity-registry-2026.md](seo/23-entity-registry-2026.md)
3. [seo/24-entities-knowledge-graph-playbook-2026.md](seo/24-entities-knowledge-graph-playbook-2026.md)
4. [seo/25-ai-search-entity-map-2026.md](seo/25-ai-search-entity-map-2026.md)
5. [seo/59-entity-performance-report-2026.md](seo/59-entity-performance-report-2026.md)
6. [audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md), если задача касается WebMCP, Agentic Browsing, форм или `llms.txt`
7. [audits/57-2026-05-31-schema-entity-full-audit-current.md](audits/57-2026-05-31-schema-entity-full-audit-current.md), если нужен исторический полный baseline на 2026-05-31

Для WebMCP, `llms.txt` и PageSpeed Agentic Browsing читать:

1. [audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md)
2. [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md), если меняются `contact.html`, `reviews/form.html` или `products/filters.html`
3. [quality/13-pagespeed-insights-audit.md](quality/13-pagespeed-insights-audit.md), если нужна ручная проверка опубликованного URL через PageSpeed Insights
4. [quality/14-production-quality-gate-2026.md](quality/14-production-quality-gate-2026.md), если это часть production-релиза
5. [deploy/16-netlify-routing.md](deploy/16-netlify-routing.md), если меняются `static/llms.txt`, headers или опубликованные служебные файлы
6. [seo/76-hugo-yaml-serp-technical-contract-2026.md](seo/76-hugo-yaml-serp-technical-contract-2026.md), если нужно понять связь с sitemap, robots, canonical, hreflang и общей SERP-технической базой

Для SEO-ключей, семантики и планирования новых посадочных страниц читать:

1. [seo/18-seo-keyword-map-2026.md](seo/18-seo-keyword-map-2026.md)
2. [seo/53-keyword-database-2026.md](seo/53-keyword-database-2026.md)
3. [seo/72-semantic-core-keyword-strategy-2026.md](seo/72-semantic-core-keyword-strategy-2026.md)
4. [seo/87-content-expansion-keyword-roadmap-2026.md](seo/87-content-expansion-keyword-roadmap-2026.md)
5. [seo/88-semantic-core-top1-growth-system-2026.md](seo/88-semantic-core-top1-growth-system-2026.md)
6. [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md)
7. [seo/76-hugo-yaml-serp-technical-contract-2026.md](seo/76-hugo-yaml-serp-technical-contract-2026.md), если меняются URL, индексация, sitemap, canonical, hreflang или `hugo.yaml`

После добавления, удаления или переименования любой индексируемой страницы в `content/` нужно проверить, есть ли у нее строка в keyword-базе или явное объяснение, почему страница не является SEO-посадочной.

Для внутренней перелинковки, анкоров, breadcrumbs, related-блоков, пагинации и внешних ссылок читать:

1. [seo/81-internal-linking-strategy-2026.md](seo/81-internal-linking-strategy-2026.md)
2. [seo/85-content-linking-editorial-standard-2026.md](seo/85-content-linking-editorial-standard-2026.md)
3. [audits/84-2026-06-24-full-link-content-seo-audit.md](audits/84-2026-06-24-full-link-content-seo-audit.md)
4. [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md)
5. [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md)
6. [seo/76-hugo-yaml-serp-technical-contract-2026.md](seo/76-hugo-yaml-serp-technical-contract-2026.md), если меняются URL, canonical, hreflang, sitemap, robots или индексируемость

Для performance/Core Web Vitals читать:

1. [quality/12-core-web-vitals-guide-2026.md](quality/12-core-web-vitals-guide-2026.md)
2. [quality/13-pagespeed-insights-audit.md](quality/13-pagespeed-insights-audit.md)
3. [quality/14-production-quality-gate-2026.md](quality/14-production-quality-gate-2026.md)
4. [audits/83-2026-06-21-netlify-rum-core-web-vitals-baseline.md](audits/83-2026-06-21-netlify-rum-core-web-vitals-baseline.md)
5. [audits/54-2026-05-26-core-web-vitals-current-audit.md](audits/54-2026-05-26-core-web-vitals-current-audit.md), если нужен исторический lab baseline
6. [audits/61-2026-06-02-pagespeed-insights-quality-simplification.md](audits/61-2026-06-02-pagespeed-insights-quality-simplification.md), если задача касается текущего процесса качества только через PageSpeed Insights

Для `hugo.yaml`, production gate и технического SERP-фундамента читать:

1. [seo/76-hugo-yaml-serp-technical-contract-2026.md](seo/76-hugo-yaml-serp-technical-contract-2026.md)
2. [deploy/15-local-tooling-mise.md](deploy/15-local-tooling-mise.md)
3. [audits/93-2026-07-07-hugo-0-164-update-audit.md](audits/93-2026-07-07-hugo-0-164-update-audit.md)
4. [quality/14-production-quality-gate-2026.md](quality/14-production-quality-gate-2026.md)
5. [seo/27-google-seo-audit-checklist-2026.md](seo/27-google-seo-audit-checklist-2026.md)

Для UI-блоков, Tailwind Plus и визуальной структуры страниц читать:

1. [architecture/51-tailwind-plus-ui-section-map-2026.md](architecture/51-tailwind-plus-ui-section-map-2026.md)
2. [audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md](audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md)
3. [audits/65-2026-06-05-full-ux-ui-revalidation-audit.md](audits/65-2026-06-05-full-ux-ui-revalidation-audit.md), если нужен исторический code-level snapshot до последующих изменений
4. [audits/64-2026-06-04-full-ux-ui-tailwind-audit.md](audits/64-2026-06-04-full-ux-ui-tailwind-audit.md), если нужны скриншоты и подробные визуальные доказательства
5. [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md)
6. [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md)

## Правило Поддержки

Если меняется код, который описан в документации, документацию нужно обновлять в том же изменении.

Примеры:

- поменял `layouts/_partials/head.html` — проверь [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md);
- поменял `hugo.yaml`, languages, menus, permalinks, sitemap, robots, canonical, hreflang или `params.env` — проверь [seo/76-hugo-yaml-serp-technical-contract-2026.md](seo/76-hugo-yaml-serp-technical-contract-2026.md), [quality/14-production-quality-gate-2026.md](quality/14-production-quality-gate-2026.md) и [deploy/15-local-tooling-mise.md](deploy/15-local-tooling-mise.md);
- поменял front matter поля — проверь [content/05-front-matter-reference.md](content/05-front-matter-reference.md);
- поменял видимую meta-строку, `post_meta`, `translation-list`, `single`, `faq/single`, `list` или `search` — проверь [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md), [content/05-front-matter-reference.md](content/05-front-matter-reference.md), [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md) и [seo/19-schema-types-reference.md](seo/19-schema-types-reference.md);
- поменял `seo-image` — проверь [content/06-seo-image-shortcode.md](content/06-seo-image-shortcode.md), [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md), [quality/12-core-web-vitals-guide-2026.md](quality/12-core-web-vitals-guide-2026.md), [content/05-front-matter-reference.md](content/05-front-matter-reference.md) и [audits/89-2026-06-24-cover-block-image-seo-audit.md](audits/89-2026-06-24-cover-block-image-seo-audit.md), если менялись `image`, `cover` или `seo_image_sizes`;
- поменял product gallery, главное товарное изображение или LCP preload — проверь [content/05-front-matter-reference.md](content/05-front-matter-reference.md), [content/templates/10-product-template.md](content/templates/10-product-template.md), [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md), [quality/12-core-web-vitals-guide-2026.md](quality/12-core-web-vitals-guide-2026.md), [seo/21-ecommerce-structured-data-playbook-2026.md](seo/21-ecommerce-structured-data-playbook-2026.md) и [audits/89-2026-06-24-cover-block-image-seo-audit.md](audits/89-2026-06-24-cover-block-image-seo-audit.md);
- поменял тексты, литературную обработку, сниппеты, контентную архитектуру, изображения, AI-промпты, fallback-картинки, product gallery, inline-иллюстрации, технические схемы или визуальную ДНК — проверь [content/79-page-content-design-dna-2026.md](content/79-page-content-design-dna-2026.md), [seo/85-content-linking-editorial-standard-2026.md](seo/85-content-linking-editorial-standard-2026.md), [content/67-image-design-playbook-2026.md](content/67-image-design-playbook-2026.md), [content/06-seo-image-shortcode.md](content/06-seo-image-shortcode.md), [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md), [audits/84-2026-06-24-full-link-content-seo-audit.md](audits/84-2026-06-24-full-link-content-seo-audit.md), [audits/89-2026-06-24-cover-block-image-seo-audit.md](audits/89-2026-06-24-cover-block-image-seo-audit.md) и [audits/80-2026-06-19-full-site-content-image-audit.md](audits/80-2026-06-19-full-site-content-image-audit.md);
- поменял keyword-базу, карту интентов, новую посадочную страницу, slug, canonical URL или статус индексируемости страницы — проверь [seo/18-seo-keyword-map-2026.md](seo/18-seo-keyword-map-2026.md), [seo/53-keyword-database-2026.md](seo/53-keyword-database-2026.md), [seo/72-semantic-core-keyword-strategy-2026.md](seo/72-semantic-core-keyword-strategy-2026.md), [seo/87-content-expansion-keyword-roadmap-2026.md](seo/87-content-expansion-keyword-roadmap-2026.md), [seo/88-semantic-core-top1-growth-system-2026.md](seo/88-semantic-core-top1-growth-system-2026.md), [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md) и убедись, что не появились битые `target_url`, дубликаты ключей или новая каннибализация;
- поменял внутренние или внешние ссылки, анкоры, header/footer navigation, breadcrumbs, related-блок, пагинацию, product cards или variant swatches — проверь [seo/81-internal-linking-strategy-2026.md](seo/81-internal-linking-strategy-2026.md), [seo/85-content-linking-editorial-standard-2026.md](seo/85-content-linking-editorial-standard-2026.md), [audits/84-2026-06-24-full-link-content-seo-audit.md](audits/84-2026-06-24-full-link-content-seo-audit.md), [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md) и [content/07-content-seo-checklist-2026.md](content/07-content-seo-checklist-2026.md); после production-сборки вручную проверь ключевые URL, sitemap, canonical, `hreflang`, локальные якоря и целевые страницы;
- поменял schema.org partials — проверь [seo/19-schema-types-reference.md](seo/19-schema-types-reference.md), [seo/20-schema-markup-quality-checklist-2026.md](seo/20-schema-markup-quality-checklist-2026.md), [seo/26-json-ld-graph-audit-roadmap-2026.md](seo/26-json-ld-graph-audit-roadmap-2026.md) и после сборки обнови [seo/59-entity-performance-report-2026.md](seo/59-entity-performance-report-2026.md);
- поменял product facts, товарный front matter, цвет, характеристики, гарантию, доставку, возврат, оплату или `priceValidUntil` — проверь [seo/58-product-facts-maintenance-process-2026.md](seo/58-product-facts-maintenance-process-2026.md), [content/05-front-matter-reference.md](content/05-front-matter-reference.md), [seo/21-ecommerce-structured-data-playbook-2026.md](seo/21-ecommerce-structured-data-playbook-2026.md) и после сборки обнови [seo/59-entity-performance-report-2026.md](seo/59-entity-performance-report-2026.md);
- поменял review-систему, Netlify Database migrations, `review_target_id`, moderation flow или build-time export отзывов — проверь [deploy/17-netlify-database-reviews.md](deploy/17-netlify-database-reviews.md), [content/05-front-matter-reference.md](content/05-front-matter-reference.md), [seo/21-ecommerce-structured-data-playbook-2026.md](seo/21-ecommerce-structured-data-playbook-2026.md) и [seo/20-schema-markup-quality-checklist-2026.md](seo/20-schema-markup-quality-checklist-2026.md);
- поменял контактную форму, форму отзывов, фильтры каталога, WebMCP-атрибуты или `static/llms.txt` — проверь [audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md), [architecture/03-hugo-template-helpers.md](architecture/03-hugo-template-helpers.md), [quality/13-pagespeed-insights-audit.md](quality/13-pagespeed-insights-audit.md), [quality/14-production-quality-gate-2026.md](quality/14-production-quality-gate-2026.md) и [deploy/16-netlify-routing.md](deploy/16-netlify-routing.md);
- поменял entity strategy, `about`, `mentions`, `sameAs` или `@id` — проверь [seo/24-entities-knowledge-graph-playbook-2026.md](seo/24-entities-knowledge-graph-playbook-2026.md), [seo/25-ai-search-entity-map-2026.md](seo/25-ai-search-entity-map-2026.md) и после сборки обнови [seo/59-entity-performance-report-2026.md](seo/59-entity-performance-report-2026.md);
- поменял entity registry, `about_entities`, `mentions_entities`, `product_group_id` или rendered JSON-LD graph — после `npm run build` запусти `npm run entity:report` и проверь [seo/59-entity-performance-report-2026.md](seo/59-entity-performance-report-2026.md);
- поменял hero, изображения первого экрана, CSS, JS или performance-sensitive layout — проверь [quality/12-core-web-vitals-guide-2026.md](quality/12-core-web-vitals-guide-2026.md), [quality/13-pagespeed-insights-audit.md](quality/13-pagespeed-insights-audit.md) и [quality/14-production-quality-gate-2026.md](quality/14-production-quality-gate-2026.md);
- поменял процесс качества только через PageSpeed Insights — проверь [quality/13-pagespeed-insights-audit.md](quality/13-pagespeed-insights-audit.md), [deploy/16-netlify-routing.md](deploy/16-netlify-routing.md) и [audits/61-2026-06-02-pagespeed-insights-quality-simplification.md](audits/61-2026-06-02-pagespeed-insights-quality-simplification.md);
- поменял версии Hugo/Node — проверь [deploy/15-local-tooling-mise.md](deploy/15-local-tooling-mise.md), [seo/76-hugo-yaml-serp-technical-contract-2026.md](seo/76-hugo-yaml-serp-technical-contract-2026.md), [README.md](../README.md) и `netlify.toml`;
- поменял `static/_redirects`, `layouts/404.html` или routing/headers в `netlify.toml` — проверь [deploy/16-netlify-routing.md](deploy/16-netlify-routing.md), [README.md](../README.md) и [AGENTS.md](../AGENTS.md).
