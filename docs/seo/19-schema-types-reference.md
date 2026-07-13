# Руководство по `schema_types`

Обновлено: 2026-07-13.

В проекте `Aerocool` используется только поле `schema_types`.

`schema_types` — это список флагов в front matter, который говорит шаблонам, какие schema.org сущности нужно добавить в JSON-LD граф страницы.

Простыми словами:

```yaml
schema_types: ["website", "product", "organization", "breadcrumbs"]
```

означает: “эта страница относится к сайту, описывает товар, связана с организацией и должна иметь хлебные крошки”.

Не нужно придумывать новое поле `schema_type`: проект его не читает.

Важно:

- `schema_types` определяет, какие schema.org-сущности включает шаблонный слой.
- `schema_types` также используется локальным helper [page-meta.html](../../layouts/_partials/page-meta.html) для видимой meta-строки: `article` показывает дату и время чтения, `news` показывает только дату, остальные типы страниц meta-строку не получают.
- `website`, `organization`, `brand`, `collection`, `article`, `news`, `product`, `faq`, `breadcrumbs`, `about-page`, `contact-page` являются рабочими флагами.
- Опорные узлы вроде `logo` и `brand` могут подключаться автоматически как зависимости выбранных сущностей, чтобы в графе не было висячих `@id`-ссылок.
- Registry-based узлы для `confirmed` materials, mechanisms, features, use cases, topics и policies подключаются автоматически из `about_entities` и `mentions_entities`. Они усиливают graph как `DefinedTerm` или объяснительные `Thing` nodes и не заменяют основные Product/Offer/Article/Page partials.
- `schema_types` не управляет индексацией страницы. Для служебных страниц вроде `search` это решается через `robotsNoIndex` и `layouts/_partials/head.html`.
- `schema_types` не заменяет `date` и `lastmod`: даты все равно должны быть во front matter, даже если page meta скрыта в интерфейсе.
- Для страниц с `layout: "search"` JSON-LD не рендерится, даже если в front matter есть `schema_types`.
- `404` и служебные alias-страницы не описываются через метаданные в `content/`; для них используются отдельные шаблонные файлы.
- Основное изображение страницы теперь описывается через единый `ImageObject` в общем `@graph`, а не через отдельный JSON-LD-скрипт из `seo-image`.
- `breadcrumbs` не используется на главной странице, потому что home не нуждается в одноэлементном `BreadcrumbList`.
- `BreadcrumbList` должен отражать реальную иерархию страницы: последовательные `position`, абсолютные `item`, понятные `name`. После изменения slug, section или меню проверять breadcrumbs отдельно.
- `sameAs` не управляется через `schema_types`; это governance-решение entity layer. Использовать только для точного совпадения сущности.
- `additionalType` пока не является рабочим front matter полем проекта. Если оно понадобится, сначала документировать источник, внешний термин и причину, почему базового Schema.org типа недостаточно.
- Image license metadata (`license`, `acquireLicensePage`, `creator`, `creditText`, `copyrightNotice`) внедрена централизованно для `ImageObject`: основное изображение страницы и логотип получают эти поля через schema partials, а видимая страница условий находится по `/image-license/` и `/ru/image-license/`.
- Чистый Schema Validator не равен гарантии rich results: для Google данные в JSON-LD должны совпадать с видимым контентом страницы.
- Для `product` источник правды по коммерческим фактам — front matter товарной страницы; schema partial читает эти поля, а видимый товарный блок и `/faq/` должны их подтверждать. Операционный процесс описан в [31-product-facts-maintenance-process-2026.md](31-product-facts-maintenance-process-2026.md).
- Для `product` поля `color` и `material` формируются из главной подтвержденной товарной сущности в `data/entities.yaml`. `material` должен ссылаться на существующую подтвержденную сущность материала; шаблон берет ее локализованное название и выводит `Product.material`.
- Текущий план усиления графа и качества rich results хранится в [26-json-ld-graph-audit-roadmap-2026.md](26-json-ld-graph-audit-roadmap-2026.md).
- QA-правила schema.org-графа, schema drift и ownership описаны в [20-schema-markup-quality-checklist-2026.md](20-schema-markup-quality-checklist-2026.md).
- Entity strategy, `@id`, `sameAs`, `about` и `mentions` проектируются через [23-entity-registry-2026.md](23-entity-registry-2026.md), [22-entity-registry-beginner-guide-2026.md](22-entity-registry-beginner-guide-2026.md), [24-entities-knowledge-graph-playbook-2026.md](24-entities-knowledge-graph-playbook-2026.md) и [25-ai-search-entity-map-2026.md](25-ai-search-entity-map-2026.md).
- Product/Offer/rating/variant/image policy для каталога описана в [21-ecommerce-structured-data-playbook-2026.md](21-ecommerce-structured-data-playbook-2026.md).
- Базовая синхронизация документации с лучшими практиками 2026 описана в [50-2026-05-13-documentation-2026-best-practices-sync-audit.md](../audits/50-2026-05-13-documentation-2026-best-practices-sync-audit.md).

Главная `content/_index.md`
`schema_types: ["website", "organization", "brand"]`

Товар `content/products/<series>/<model>/index.md`
`schema_types: ["website", "product", "organization", "breadcrumbs"]`

Видимая meta-строка товара не выводится.

Серия и каталоги `content/products/_index.md`, `content/products/<series>/_index.md`
`schema_types: ["website", "collection", "organization", "breadcrumbs"]`

Видимая meta-строка серии или каталога не выводится.

Новости `content/news/<slug>/index.md`
`schema_types: ["website", "news", "organization", "breadcrumbs"]`

Видимая meta-строка новости: только дата публикации.

Листинг новостей `content/news/_index.md`
`schema_types: ["website", "collection", "organization", "breadcrumbs"]`

Статьи `content/articles/<slug>/index.md`
`schema_types: ["website", "article", "organization", "breadcrumbs"]`

Видимая meta-строка статьи: дата публикации и время чтения.

Листинг статей `content/articles/_index.md`
`schema_types: ["website", "collection", "organization", "breadcrumbs"]`

FAQ `content/faq/index.md`
`schema_types: ["website", "faq", "organization", "breadcrumbs"]`

Видимая meta-строка FAQ не выводится.

Страница о бренде `content/about/index.md`
`schema_types: ["website", "organization", "brand", "about-page", "breadcrumbs"]`

Видимая meta-строка страницы о бренде не выводится.

Контакты `content/contact/index.md`
`schema_types: ["website", "organization", "contact-page", "breadcrumbs"]`

Видимая meta-строка контактов не выводится.
Видимые контактные факты страницы `/contact/` рендерятся через `layouts/_shortcodes/contact.html`, а JSON-LD `ContactPage` ссылается на локальную `Organization`. Адрес, телефон, email и график работы в `local-organization.html` должны совпадать с видимым contact-блоком.

Поиск `content/search.md`
`schema_types: ["website", "organization", "breadcrumbs"]`

Видимая meta-строка поиска не выводится.
