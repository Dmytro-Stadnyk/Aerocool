# Документация Aerocool

Обновлено: 2026-07-13.

Эта карта задает единый порядок чтения всей документации проекта. Новичку не нужно открывать все файлы сразу: сначала изучите постоянные руководства, относящиеся к задаче, и только затем обращайтесь к историческим аудитам.

## 1. С чего начать

До нумерованной документации прочитайте:

1. `README.md` — назначение проекта, стек, первый запуск и основные команды.
2. `AGENTS.md` — обязательные правила изменения кода, контента и инфраструктуры.
3. Этот файл — полный маршрут по документации.
4. `docs/architecture/02-documentation-style-guide.md` — правила поддержки самих документов.

Минимальный технический маршрут новичка после этого:

1. `03` — как Hugo выбирает локальные шаблоны и helpers.
2. `05` — какие поля разрешены во front matter.
3. `13` — как проверять опубликованные страницы через PageSpeed Insights.
4. `14` — что обязательно проверить перед production.

## 2. Как устроена нумерация

- Числовой префикс задает глобальную очередность чтения.
- Префикс содержит минимум две цифры: `01`, `02`, ..., `99`; после `99` допустимы `100`, `101` и далее.
- Документы `01–41` — действующие руководства и регламенты.
- Документы `42–100` — исторические аудиты. Их выводы верны для указанной в имени даты и не описывают автоматически текущее состояние.
- Документ `101` — единственный текущий полный аудит на 2026-07-13.
- CSV-файлы `30` и `32` являются приложениями к одноименным Markdown-документам и наследуют их номер.
- `docs/XTAL/`, `docs/SKY LITE/`, `docs/SKY 360/` и `docs/WING 360/` содержат исходные изображения производителя. Это архивы ресурсов, а не документация, поэтому их папки и изображения не получают номера маршрута чтения.

Если текущий регламент противоречит старому аудиту, действует регламент. Если фактический код противоречит регламенту, нужно проверить код и обновить документацию вместе с исправлением.

## 3. Действующие руководства: 01–41

### Основа и архитектура

1. `docs/01-documentation-map.md` — карта, которую вы читаете сейчас.
2. `docs/architecture/02-documentation-style-guide.md` — язык, структура, статусы и процесс обновления документации.
3. `docs/architecture/03-hugo-template-helpers.md` — Hugo lookup order, локальные partials, shortcodes и template helpers.
4. `docs/architecture/04-browser-view-transitions.md` — правила View Transitions и совместимость браузеров.

### Контент и шаблоны страниц

5. `docs/content/05-front-matter-reference.md` — единый справочник полей front matter.
6. `docs/content/06-seo-image-shortcode.md` — применение responsive shortcode `seo-image`.
7. `docs/content/07-content-seo-checklist-2026.md` — редакционный и SEO-контроль страницы.
8. `docs/content/templates/08-article-template.md` — шаблон статьи.
9. `docs/content/templates/09-news-template.md` — шаблон новости.
10. `docs/content/templates/10-product-template.md` — шаблон товарной страницы.
11. `docs/content/templates/11-series-template.md` — шаблон страницы серии.

### Качество и выпуск

12. `docs/quality/12-core-web-vitals-guide-2026.md` — LCP, INP, CLS и проектные правила производительности.
13. `docs/quality/13-pagespeed-insights-audit.md` — ручная проверка опубликованных URL.
14. `docs/quality/14-production-quality-gate-2026.md` — обязательный контроль перед включением production.

### Инструменты и Netlify

15. `docs/deploy/15-local-tooling-mise.md` — установка и проверка зафиксированных версий.
16. `docs/deploy/16-netlify-routing.md` — redirects, 404, статические headers и кэширование.
17. `docs/deploy/17-netlify-database-reviews.md` — база, Functions, модерация и build-time экспорт отзывов.

### SEO, schema.org и сущности

18. `docs/seo/18-seo-keyword-map-2026.md` — соответствие кластеров целевым URL.
19. `docs/seo/19-schema-types-reference.md` — допустимые типы schema.org по типам страниц.
20. `docs/seo/20-schema-markup-quality-checklist-2026.md` — проверка качества JSON-LD.
21. `docs/seo/21-ecommerce-structured-data-playbook-2026.md` — Product, Offer, Review и merchant facts.
22. `docs/seo/22-entity-registry-beginner-guide-2026.md` — вводное руководство по реестру сущностей.
23. `docs/seo/23-entity-registry-2026.md` — операционный регламент `data/entities.yaml`.
24. `docs/seo/24-entities-knowledge-graph-playbook-2026.md` — проектирование связного графа сущностей.
25. `docs/seo/25-ai-search-entity-map-2026.md` — доступность сущностей для AI-поиска без обещаний ранжирования.
26. `docs/seo/26-json-ld-graph-audit-roadmap-2026.md` — план развития и контроля JSON-LD-графа.
27. `docs/seo/27-google-seo-audit-checklist-2026.md` — технический и контентный SEO-контроль Google.
28. `docs/seo/28-ssg-seo-checklist-2026.md` — SEO-проверка статически собранного сайта.

### Специализированные постоянные регламенты

29. `docs/architecture/29-tailwind-plus-ui-section-map-2026.md` — карта UX/UI-секций и реализации Tailwind Plus.
30. `docs/seo/30-keyword-database-2026.md` — правила ведения базы запросов; приложение: `docs/seo/30-keyword-database-2026.csv`.
31. `docs/seo/31-product-facts-maintenance-process-2026.md` — владельцы и подтверждение товарных фактов.
32. `docs/seo/32-entity-performance-report-2026.md` — текущий генерируемый отчет; приложения: `docs/seo/32-entity-performance-report-2026.csv` и `docs/seo/32-entity-performance-overrides.csv`.
33. `docs/seo/33-schema-validator-url-checklist-2026.md` — список URL для ручной проверки валидаторами.
34. `docs/content/34-image-design-playbook-2026.md` — форматы, размеры, композиция и QA изображений.
35. `docs/seo/35-semantic-core-keyword-strategy-2026.md` — архитектура семантического ядра.
36. `docs/seo/36-hugo-yaml-serp-technical-contract-2026.md` — canonical, hreflang, sitemap, robots и production SEO.
37. `docs/content/37-page-content-design-dna-2026.md` — тональность, доказательность и визуальная ДНК страниц.
38. `docs/seo/38-internal-linking-strategy-2026.md` — breadcrumbs, анкоры, related-блоки и глубина переходов.
39. `docs/seo/39-content-linking-editorial-standard-2026.md` — литературная обработка, размещение текста и ссылок.
40. `docs/seo/40-content-expansion-keyword-roadmap-2026.md` — план расширения страниц и поисковых кластеров.
41. `docs/seo/41-semantic-core-top1-growth-system-2026.md` — система измеримого развития семантического покрытия.

## 4. Исторические аудиты: 42–100

Эти документы сохраняют ход решений и доказательства на конкретную дату. Не используйте слово `current` в старом английском имени как гарантию актуальности: текущим считается только аудит `101`.

42. `docs/audits/42-2026-04-29-hugo-0-161-compliance-audit.md` — переход на Hugo 0.161.
43. `docs/audits/43-2026-04-29-google-rich-results-quality-audit.md` — качество Google rich results на 2026-04-29.
44. `docs/audits/44-2026-05-06-content-depth-literary-audit.md` — глубина и литературное качество контента.
45. `docs/audits/45-2026-05-06-schemaapp-pdf-documentation-integration-audit.md` — интеграция выводов Schema App PDF.
46. `docs/audits/46-2026-05-06-project-readiness-assessment.md` — оценка готовности проекта.
47. `docs/audits/47-2026-05-07-documentation-refresh-and-project-action-plan.md` — прежний план обновления документации.
48. `docs/audits/48-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md` — анализ корпуса Schema App.
49. `docs/audits/49-2026-05-13-content-image-cover-alt-audit.md` — ранняя проверка `image`, `cover` и `alt`.
50. `docs/audits/50-2026-05-13-documentation-2026-best-practices-sync-audit.md` — синхронизация с практиками 2026 на указанную дату.
51. `docs/audits/51-2026-05-14-seo-image-documentation-cleanup.md` — очистка image-документации.
52. `docs/audits/52-2026-05-15-documentation-full-audit.md` — полный аудит документации 2026-05-15.
53. `docs/audits/53-2026-05-17-documentation-current-audit.md` — снимок документации 2026-05-17.
54. `docs/audits/54-2026-05-17-core-web-vitals-project-audit.md` — ранний проектный CWV-аудит.
55. `docs/audits/55-2026-05-17-schemaapp-support-knowledge-base-audit.md` — анализ базы знаний Schema App.
56. `docs/audits/56-2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md` — JSON-LD после анализа поддержки Schema App.
57. `docs/audits/57-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md` — влияние agentic graph-подхода.
58. `docs/audits/58-2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md` — повторная JSON-LD-проверка.
59. `docs/audits/59-2026-05-18-schemaapp-customer-stories-case-studies-audit.md` — разбор кейсов Schema App.
60. `docs/audits/60-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md` — JSON-LD после разбора кейсов.
61. `docs/audits/61-2026-05-18-documentation-current-audit.md` — снимок документации 2026-05-18.
62. `docs/audits/62-2026-05-19-documentation-current-audit.md` — снимок документации 2026-05-19.
63. `docs/audits/63-2026-05-19-visible-page-meta-policy-audit.md` — политика видимой meta-строки.
64. `docs/audits/64-2026-05-20-json-ld-entity-full-audit-current.md` — JSON-LD-снимок 2026-05-20.
65. `docs/audits/65-2026-05-26-core-web-vitals-current-audit.md` — лабораторный CWV-снимок.
66. `docs/audits/66-2026-05-26-schema-entity-full-audit.md` — schema/entity-снимок 2026-05-26.
67. `docs/audits/67-2026-05-26-hugo-0-162-compliance-audit.md` — переход на Hugo 0.162.
68. `docs/audits/68-2026-05-31-schema-entity-full-audit-current.md` — schema/entity-снимок 2026-05-31.
69. `docs/audits/69-2026-06-02-pagespeed-insights-quality-simplification.md` — упрощение PageSpeed-процесса.
70. `docs/audits/70-2026-06-03-ux-ui-tailwind-current-audit.md` — UX/UI-снимок 2026-06-03.
71. `docs/audits/71-2026-06-04-ux-ui-tailwind-current-audit.md` — UX/UI-снимок 2026-06-04.
72. `docs/audits/72-2026-06-04-full-ux-ui-tailwind-audit.md` — полный UX/UI-аудит со свидетельствами.
73. `docs/audits/73-2026-06-05-full-ux-ui-revalidation-audit.md` — повторная проверка UX/UI.
74. `docs/audits/74-2026-06-05-hugo-0-162-documentation-full-audit.md` — документация для Hugo 0.162.
75. `docs/audits/75-2026-06-11-hugo-0-163-documentation-sync-audit.md` — переход документации на Hugo 0.163.
76. `docs/audits/76-2026-06-12-seo-image-product-gallery-documentation-audit.md` — SEO изображений и товарной галереи.
77. `docs/audits/77-2026-06-12-content-articles-news-image-home-hero-audit.md` — изображения контента и главной.
78. `docs/audits/78-2026-06-13-full-project-image-audit.md` — полный снимок изображений проекта.
79. `docs/audits/79-2026-06-14-articles-news-inline-image-plan.md` — план inline-изображений.
80. `docs/audits/80-2026-06-15-articles-news-inline-image-serp-audit.md` — SERP-проверка inline-изображений.
81. `docs/audits/81-2026-06-16-articles-news-text-image-revalidation.md` — повторная проверка текста и изображений.
82. `docs/audits/82-2026-06-18-articles-news-content-image-audit.md` — глубокий снимок articles/news.
83. `docs/audits/83-2026-06-19-full-documentation-project-sync-audit.md` — полный снимок документации 2026-06-19.
84. `docs/audits/84-2026-06-19-full-site-content-image-audit.md` — исторический постраничный список задач по контенту и изображениям.
85. `docs/audits/85-2026-06-21-full-documentation-project-sync-audit.md` — полный снимок документации 2026-06-21.
86. `docs/audits/86-2026-06-21-netlify-rum-core-web-vitals-baseline.md` — полевой baseline Netlify RUM.
87. `docs/audits/87-2026-06-24-full-link-content-seo-audit.md` — ссылки, сниппеты и SEO-контент на 2026-06-24.
88. `docs/audits/88-2026-06-24-full-documentation-project-sync-audit.md` — полный снимок документации после аудита ссылок.
89. `docs/audits/89-2026-06-24-cover-block-image-seo-audit.md` — историческая проверка `image` и `cover`.
90. `docs/audits/90-2026-06-24-full-documentation-project-sync-audit-after-87-89.md` — синхронизация после документов 87–89 старой нумерации.
91. `docs/audits/91-2026-06-26-full-documentation-project-sync-audit-current.md` — полный снимок документации 2026-06-26.
92. `docs/audits/92-2026-06-28-tailwind-plus-ui-map-current-audit.md` — UX/UI-снимок 2026-06-28; PNG/P0-выводы больше не являются текущими.
93. `docs/audits/93-2026-07-07-hugo-0-164-update-audit.md` — подтверждение перехода на Hugo 0.164.
94. `docs/audits/94-2026-07-07-full-documentation-project-sync-audit-current.md` — полный снимок документации 2026-07-07.
95. `docs/audits/95-2026-07-08-full-documentation-project-sync-audit-current.md` — полный снимок документации 2026-07-08.
96. `docs/audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md` — профильный снимок WebMCP и `llms.txt`, дополненный уточнениями 2026-07-10 и 2026-07-13.
97. `docs/audits/97-2026-07-08-full-documentation-project-sync-audit-current.md` — снимок после добавления WebMCP и XTAL.
98. `docs/audits/98-2026-07-09-full-documentation-project-sync-audit-current.md` — предыдущий полный аудит; оценка `9.8/10` опровергнута повторной проверкой 2026-07-10.
99. `docs/audits/99-2026-07-10-full-documentation-project-sync-audit-current.md` — исторический полный аудит 2026-07-10; в нем еще не учтены последующие изменения товарных галерей, schema.org и архивов производителя.
100. `docs/audits/100-2026-07-13-full-documentation-project-sync-audit-current.md` — исторический снимок до повторной проверки Netlify Database, privacy-потока, PageSpeed/WebMCP и текущей production-сборки.

## 5. Текущий аудит

101. `docs/audits/101-2026-07-13-full-documentation-project-sync-audit-current.md` — текущая полная проверка структуры, языка, ссылок, фактов, сборки и синхронизации с проектом.

## 6. Маршруты по задачам

### Новая статья или новость

Читайте `05 -> 06 -> 07 -> 08 или 09 -> 34 -> 37 -> 39`.

### Новый товар или серия

Читайте `05 -> 07 -> 10 или 11 -> 21 -> 31 -> 34 -> 37`.

### Изображения

Читайте `06 -> 12 -> 34 -> 37`. Для контекста прежних дефектов можно открыть `76–84` и `89`, но их числовые снимки не считать текущими.

### Schema.org и сущности

Читайте `19 -> 20 -> 21 -> 22 -> 23 -> 24 -> 26 -> 31 -> 32 -> 33`.

### Ключевые слова и контентный рост

Читайте `18 -> 30 -> 35 -> 38 -> 39 -> 40 -> 41`.

### Core Web Vitals и выпуск

Читайте `12 -> 13 -> 14 -> 16 -> 36`. Для полевого контекста используйте исторический baseline `86`.

### Netlify и отзывы

Читайте `15 -> 16 -> 17 -> 20 -> 21 -> 31`.

### Пользовательский интерфейс (UX/UI)

Читайте `03 -> 04 -> 12 -> 29 -> 34 -> 37`. Аудиты `70–73` и `92` нужны только для истории решений.

### WebMCP, `llms.txt` и AI-поиск

Читайте `20 -> 25 -> 27 -> 28 -> 36`, затем профильный аудит `96` с уточнениями от 2026-07-10 и 2026-07-13.

## 7. Правило поддержки

При любом изменении поведения проекта:

1. Найдите постоянный документ `01–41`, который описывает это поведение.
2. Обновите его в том же изменении, что и код или конфигурацию.
3. Поставьте фактическую дату `Обновлено: YYYY-MM-DD`.
4. Проверьте все локальные Markdown-ссылки.
5. Не называйте старый аудит текущим.
6. Добавляйте новый полный аудит только после фактической проверки сборки, ссылок и ключевых утверждений.
