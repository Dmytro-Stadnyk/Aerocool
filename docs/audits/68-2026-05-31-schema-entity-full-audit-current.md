# Полный Schema/Entity аудит проекта на 2026-05-31

Дата аудита: 2026-05-31.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

> Исторический full-audit snapshot. На 2026-06-11 текущие машинные счетчики schema/entity смотреть в [32-entity-performance-report-2026.md](../seo/32-entity-performance-report-2026.md), список URL для ручной проверки — в [33-schema-validator-url-checklist-2026.md](../seo/33-schema-validator-url-checklist-2026.md), текущий tooling target — в [75-2026-06-11-hugo-0-163-documentation-sync-audit.md](75-2026-06-11-hugo-0-163-documentation-sync-audit.md). Числа `114` и упоминание Hugo `0.162.0` ниже относятся к состоянию на 2026-05-31.

Контекст: это полный срез schema/entity-слоя проекта `Aerocool Ukraine` на 2026-05-31 после обновления Entity Registry, активации `ProductGroup` для реальных WING/XTAL цветовых вариантов, добавления `Product.color` / `Product.additionalProperty`, формализации Product Facts process, создания Entity Performance Report, внедрения Image License Metadata и повторной сборки Hugo 0.162.0. Аудит проверяет rendered JSON-LD, [data/entities.yaml](../../data/entities.yaml), front matter `content/**/*.md`, Product graph, `about_entities`, `mentions_entities`, `product_group_id`, `sameAs`, ImageObject metadata, reviews pipeline, breadcrumbs и список проблем на дату аудита.

Обновление `2026-06-01`: после этого аудита изменена production-политика пагинации. URL `/page/2+`, `/articles/page/2+`, `/news/page/2+` и русские аналоги остаются доступными навигационными страницами, но получают `noindex,follow` в production и не выводят JSON-LD. Актуальные machine-generated counts теперь смотреть в [32-entity-performance-report-2026.md](../seo/32-entity-performance-report-2026.md), а список URL для ручного validator.schema.org — в [33-schema-validator-url-checklist-2026.md](../seo/33-schema-validator-url-checklist-2026.md).

Базовые документы:

- [19-schema-types-reference.md](../seo/19-schema-types-reference.md);
- [20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md);
- [21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md);
- [22-entity-registry-beginner-guide-2026.md](../seo/22-entity-registry-beginner-guide-2026.md);
- [23-entity-registry-2026.md](../seo/23-entity-registry-2026.md);
- [24-entities-knowledge-graph-playbook-2026.md](../seo/24-entities-knowledge-graph-playbook-2026.md);
- [25-ai-search-entity-map-2026.md](../seo/25-ai-search-entity-map-2026.md);
- [26-json-ld-graph-audit-roadmap-2026.md](../seo/26-json-ld-graph-audit-roadmap-2026.md);
- [30-keyword-database-2026.md](../seo/30-keyword-database-2026.md);
- [32-entity-performance-report-2026.md](../seo/32-entity-performance-report-2026.md).

## 1. Главный вывод

Schema/entity-система проекта сейчас сильная и технически чистая. JSON-LD парсится без ошибок, внутренних битых graph URL нет, служебные страницы `search` и `contact/success` не получают JSON-LD, `about_entities` и `mentions_entities` используют только `confirmed` сущности, локальная `Aerocool Ukraine` не получает global social `sameAs`, а `ProductGroup` включен только для реальных цветовых вариантов WING/XTAL.

Общая оценка: `9.7 / 10`.

Оценка не `10 / 10` по трем причинам:

1. published branch build все еще собирается в `development`, поэтому содержательные JSON-LD страницы получают `noindex,nofollow` до production-перехода;
2. `SKY 360` и `SKY Light` не имеют подтвержденных `mpn` и `gtin13`;
3. внешние performance-поля Entity Performance Report и AI Search baseline остаются `pending-production`, потому что GSC, AI citations и business signals можно честно заполнить только после production/indexability gate.

Закрыто в текущем обновлении:

- `products-collection` удален как дублирующий registry ID; каноническая сущность каталога теперь `aerocool-catalog`;
- `wing-racer-product-group`, `wing-loft-air-product-group`, `xtal-racer-product-group`, `xtal-loft-air-product-group` переведены в `confirmed` и выводятся в JSON-LD;
- `lumbar-support`, `armrests-4d-x-360`, `armrests-3d-x-360`, `hot-room`, `leatherette-material`, `fabric-material` переведены в `confirmed` и подключены к релевантным страницам через `mentions_entities`.
- `Product.color` выводится для всех `24` Product nodes из registry;
- `Product.additionalProperty` выводится для всех `24` Product nodes из видимой вкладки `characteristics`.
- операционный процесс поддержки product facts формализован в [31-product-facts-maintenance-process-2026.md](../seo/31-product-facts-maintenance-process-2026.md): роли, владельцы, front matter source of truth, `/faq/`, JSON-LD QA и post-deploy проверка.
- Entity Performance Report создан как воспроизводимый процесс: `npm run entity:report` генерирует [32-entity-performance-report-2026.md](../seo/32-entity-performance-report-2026.md) и [32-entity-performance-report-2026.csv](../seo/32-entity-performance-report-2026.csv) из registry, front matter и rendered JSON-LD; внешние GSC/AI/business-метрики будут добавляться через [32-entity-performance-overrides.csv](../seo/32-entity-performance-overrides.csv).
- Image License Metadata внедрена: добавлены страницы `/image-license/` и `/ru/image-license/`, registry-сущность `image-license-policy`, общий helper [image-license-metadata.html](../../layouts/_partials/_schema/image-license-metadata.html), а все `228` rendered `ImageObject` nodes получили `license`, `acquireLicensePage`, `creator`, `creditText` и `copyrightNotice`.

Review/rating governance не является открытым P0/P1: legacy `rating.value` и `rating.count` удалены из product front matter, все товарные страницы имеют `review_target_id` и `reviews_enabled`, а `Product.aggregateRating` выводится только из approved reviews snapshot. В локальной сборке Netlify Database недоступна, поэтому сгенерированный `data/generated/reviews.json` пустой и `AggregateRating` не выводится. Это корректно.

## 2. Метод проверки

Проверено:

- `npm run build`;
- rendered HTML в `public/**/*.html`;
- все JSON-LD scripts `application/ld+json`;
- внутренние `@id` и `url` внутри graph;
- отсутствие JSON-LD на служебных URL;
- [data/entities.yaml](../../data/entities.yaml);
- front matter в `content/**/*.md`;
- product facts, reviews fields, `product_group_id`, `about_entities`, `mentions_entities`;
- schema partials в [layouts/_partials/_schema](../../layouts/_partials/_schema);
- image license pages и `ImageObject` metadata;
- product variant swatches.

Команда проверки:

```bash
npm run build
```

## 3. Снимок сгенерированного JSON-LD

| Метрика | Значение |
| --- | ---: |
| HTML files | `136` |
| Pages with JSON-LD | `114` |
| JSON-LD scripts | `114` |
| JSON parse errors | `0` |
| JSON-LD top-level nodes | `2026` |
| Duplicate node `@id` внутри одной страницы | `0` |
| Empty `@id` | `0` |
| Internal Aerocool graph URL refs | `9030` |
| Broken internal Aerocool graph URL refs | `0` |
| JSON-LD на `contact/success` | `0` |
| JSON-LD на `search` | `0` |
| BreadcrumbList nodes | `100` |
| Breadcrumb position issues | `0` |
| Visible breadcrumb pages | `102` |
| JSON-LD pages with `noindex` | `114` |

Вывод: rendered graph технически чистый. Главный blocker перед SEO-запуском не JSON-LD, а production/indexability gate.

## 4. Типы узлов в Rendered Graph

| Type | Count |
| --- | ---: |
| `AboutPage` | `2` |
| `Article` | `32` |
| `Brand` | `114` |
| `BreadcrumbList` | `100` |
| `CollectionPage` | `18` |
| `ContactPage` | `2` |
| `DefinedTerm` | `902` |
| `FAQPage` | `2` |
| `ImageObject` | `228` |
| `NewsArticle` | `18` |
| `Organization` | `228` |
| `Product` | `24` |
| `ProductGroup` | `16` |
| `Thing` | `116` |
| `WebPage` | `110` |
| `WebSite` | `114` |

Вывод: проект работает как связанный Content Knowledge Graph. После активации полезных сущностей и ProductGroup вырос слой `DefinedTerm`, а для вариантов WING/XTAL появился отдельный `ProductGroup`.

## 5. Снимок реестра сущностей

| Метрика | Значение |
| --- | ---: |
| Total entities | `63` |
| Markupable entities | `61` |
| `confirmed` | `61` |
| `planned` | `0` |
| `do-not-markup` | `2` |
| Unknown front matter entity refs | `0` |
| Non-confirmed refs in `about_entities` / `mentions_entities` | `0` |
| `about_entities` refs | `302` |
| `mentions_entities` refs | `1014` |
| `product_group_id` refs | `16` |
| `product_group_id` status | `16 confirmed` |
| Confirmed entities with zero usage/rendered refs | `0` |
| Duplicate registry `@id` targets | `0` |

Классы сущностей:

| Class | Count |
| --- | ---: |
| `ProductVariant` | `8` |
| `Feature` | `8` |
| `UseCase` | `7` |
| `Material` | `5` |
| `Policy` | `6` |
| `Product` | `4` |
| `ProductGroup` | `4` |
| `Collection` | `3` |
| `ProductSeries` | `3` |
| `Mechanism` | `3` |
| Остальные классы | `12` |

Оценка Entity Registry: `9.7 / 10`.

Минус к оценке остается только за governance-процесс: registry технически чистый, но его нужно поддерживать при каждом изменении front matter, ассортимента, коммерческих условий и контентных хабов.

## 6. Полный аудит всех сущностей

Колонки:

- `about` — сколько раз сущность используется как главный предмет страницы;
- `mentions` — сколько раз сущность используется как связанная сущность;
- `group` — сколько раз сущность указана как `product_group_id`;
- `@id refs` — сколько раз точный `current_jsonld_id` или `future_jsonld_id` встречается как `@id`-ссылка в rendered JSON-LD;
- `node defs` — сколько раз точный `@id` встречается как собственная node definition;
- `Аудит` — результат проверки статуса, ID, entity home и front matter-ссылок.

| entity_id | status | class | schema | about | mentions | group | @id refs | node defs | Аудит |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `11d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 42 | 0 | 142 | 44 | OK |
| `7d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 30 | 0 | 92 | 32 | OK |
| `8d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 22 | 0 | 70 | 24 | OK |
| `about-page` | `confirmed` | `AboutPage` | `AboutPage` | 0 | 0 | 0 | 2 | 1 | OK |
| `aerocool-brand` | `confirmed` | `Brand` | `Brand` | 8 | 34 | 0 | 338 | 114 | OK |
| `aerocool-catalog` | `confirmed` | `Collection` | `CollectionPage` | 8 | 26 | 0 | 116 | 1 | OK, canonical catalog ID |
| `aerocool-global-organization` | `confirmed` | `Organization` | `Organization` | 2 | 2 | 0 | 460 | 114 | OK |
| `aerocool-logo` | `confirmed` | `ImageObject` | `ImageObject` | 0 | 0 | 0 | 456 | 114 | OK |
| `aerocool-ukraine` | `confirmed` | `Organization` | `Organization` | 8 | 2 | 0 | 514 | 114 | OK |
| `aerocool-website` | `confirmed` | `WebSite` | `WebSite` | 0 | 0 | 0 | 149 | 57 | OK |
| `armrests-3d-x-360` | `confirmed` | `Feature` | `DefinedTerm` | 0 | 4 | 0 | 10 | 4 | OK, newly activated |
| `armrests-4d-x-360` | `confirmed` | `Feature` | `DefinedTerm` | 0 | 12 | 0 | 26 | 12 | OK, newly activated |
| `articles-collection` | `confirmed` | `Collection` | `CollectionPage` | 6 | 0 | 0 | 26 | 3 | OK |
| `chair-selection` | `confirmed` | `ContentTopic` | `DefinedTerm` | 20 | 2 | 0 | 98 | 26 | OK |
| `computer-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 36 | 42 | 0 | 294 | 94 | OK |
| `contact-page` | `confirmed` | `ContactPage` | `ContactPage` | 0 | 2 | 0 | 4 | 1 | OK |
| `delivery-policy` | `confirmed` | `Policy` | `OfferShippingDetails` | 2 | 26 | 0 | 56 | 28 | OK |
| `dual-backrest` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 4 | 0 | 26 | 6 | OK |
| `ergonomic-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 4 | 16 | 0 | 124 | 20 | OK |
| `fabric-material` | `confirmed` | `Material` | `DefinedTerm` | 0 | 10 | 0 | 72 | 10 | OK, newly activated |
| `faq-page` | `confirmed` | `FAQPage` | `FAQPage` | 2 | 0 | 0 | 4 | 1 | OK |
| `gaming-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 14 | 38 | 0 | 224 | 68 | OK |
| `home-office` | `confirmed` | `UseCase` | `DefinedTerm` | 28 | 52 | 0 | 336 | 96 | OK |
| `home-page` | `confirmed` | `WebPage` | `WebPage` | 0 | 0 | 0 | 7 | 7 | OK |
| `hot-room` | `confirmed` | `UseCase` | `DefinedTerm` | 0 | 6 | 0 | 116 | 6 | OK, newly activated |
| `image-license-policy` | `confirmed` | `Policy` | `Thing` | 2 | 0 | 0 | 4 | 2 | OK, image license source |
| `leatherette-material` | `confirmed` | `Material` | `DefinedTerm` | 0 | 10 | 0 | 70 | 10 | OK, newly activated |
| `loft-air-material` | `confirmed` | `Material` | `DefinedTerm` | 4 | 42 | 0 | 246 | 50 | OK |
| `long-sitting` | `confirmed` | `UseCase` | `DefinedTerm` | 4 | 4 | 0 | 132 | 8 | OK |
| `lumbar-support` | `confirmed` | `Feature` | `DefinedTerm` | 0 | 30 | 0 | 66 | 30 | OK, newly activated |
| `mesh-material` | `confirmed` | `Material` | `DefinedTerm` | 4 | 44 | 0 | 242 | 52 | OK |
| `news-collection` | `confirmed` | `Collection` | `CollectionPage` | 2 | 0 | 0 | 12 | 2 | OK |
| `office-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 30 | 44 | 0 | 378 | 90 | OK |
| `online-store` | `do-not-markup` | `BusinessModel` | `OnlineStore` | 0 | 0 | 0 | 0 | 0 | OK, do not mark up |
| `payment-policy` | `confirmed` | `Policy` | `Thing` | 2 | 26 | 0 | 56 | 28 | OK |
| `price-validity-policy` | `confirmed` | `Policy` | `Thing` | 2 | 0 | 0 | 4 | 2 | OK |
| `racer-material` | `confirmed` | `Material` | `DefinedTerm` | 2 | 42 | 0 | 212 | 48 | OK |
| `replaceable-elements` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 4 | 0 | 26 | 6 | OK |
| `return-policy` | `confirmed` | `Policy` | `MerchantReturnPolicy` | 2 | 26 | 0 | 56 | 28 | OK |
| `review-layer` | `do-not-markup` | `Review` | `Review` | 0 | 0 | 0 | 0 | 0 | OK, handled through approved review snapshots |
| `sky-360` | `confirmed` | `Product` | `Product` | 6 | 14 | 0 | 144 | 1 | P1: missing MPN/GTIN |
| `sky-light` | `confirmed` | `Product` | `Product` | 6 | 14 | 0 | 100 | 1 | P1: missing MPN/GTIN |
| `sky-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 12 | 40 | 0 | 304 | 1 | OK |
| `sync4-mechanism` | `confirmed` | `Mechanism` | `DefinedTerm` | 4 | 28 | 0 | 178 | 36 | OK |
| `sync5-mechanism` | `confirmed` | `Mechanism` | `DefinedTerm` | 4 | 48 | 0 | 240 | 56 | OK |
| `synchronous-tilt` | `confirmed` | `Mechanism` | `DefinedTerm` | 6 | 64 | 0 | 288 | 74 | OK |
| `warranty-policy` | `confirmed` | `Policy` | `WarrantyPromise` | 2 | 26 | 0 | 56 | 28 | OK |
| `wing-loft-air-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 8 | 0 | 24 | 1 | OK |
| `wing-loft-air-light-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `wing-loft-air-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, активный ProductGroup |
| `wing-mesh-black` | `confirmed` | `Product` | `Product` | 2 | 8 | 0 | 20 | 1 | OK |
| `wing-racer-black` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `wing-racer-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 4 | 0 | 16 | 1 | OK |
| `wing-racer-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, активный ProductGroup |
| `wing-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 20 | 36 | 0 | 410 | 1 | OK |
| `xtal-loft-air-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 8 | 0 | 24 | 1 | OK |
| `xtal-loft-air-light-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `xtal-loft-air-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, активный ProductGroup |
| `xtal-mesh-black` | `confirmed` | `Product` | `Product` | 2 | 8 | 0 | 20 | 1 | OK |
| `xtal-racer-black` | `confirmed` | `ProductVariant` | `Product` | 2 | 4 | 0 | 16 | 1 | OK |
| `xtal-racer-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 20 | 1 | OK |
| `xtal-racer-product-group` | `confirmed` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 8 | 4 | OK, активный ProductGroup |
| `xtal-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 20 | 36 | 0 | 386 | 1 | OK |

## 7. Что сейчас `planned`

Сейчас в [data/entities.yaml](../../data/entities.yaml) нет сущностей со статусом `planned`.

Это не значит, что новые сущности больше нельзя добавлять. Это значит, что текущий registry очищен: все сущности, которые используются в `about_entities`, `mentions_entities` и `product_group_id`, либо `confirmed`, либо сознательно `do-not-markup`.

Правило остается прежним: новая сущность сначала появляется как `planned`, если для нее еще нет видимого подтверждения, entity home, владельца фактов или шаблонной поддержки.

## 8. Front Matter и Entity Fields

| Метрика | Значение |
| --- | ---: |
| Content markdown files | `98` |
| `schema_types` refs | `98` |
| Product front matter pages | `24` |
| Products with `review_target_id` | `24` |
| Products with `reviews_enabled` | `24` |
| Products missing `priceValidUntil` | `0` |
| Products with legacy `rating` front matter | `0` |
| Products missing MPN | `4` files |
| Products missing GTIN | `4` files |

Файлы без `mpn` и `gtin13`:

- [content/products/sky/360/index.md](../../content/products/sky/360/index.md);
- [content/products/sky/360/index.ru.md](../../content/products/sky/360/index.ru.md);
- [content/products/sky/light/index.md](../../content/products/sky/light/index.md);
- [content/products/sky/light/index.ru.md](../../content/products/sky/light/index.ru.md).

Вывод: front matter дисциплинирован. Source of truth для product facts остается product front matter, владелец бизнес-значений — команда Aerocool Украина.

## 9. Connected Schema, `sameAs` и Local Organization

| Метрика | Значение |
| --- | ---: |
| `WebPage` nodes | `110` |
| `WebPage.mainEntity` | `94` |
| `WebPage.about` | `110` |
| `WebPage.mentions` | `110` |
| Global Brand/Organization nodes with `sameAs` | `228` |
| Global `sameAs` refs | `1140` |
| Local Organization nodes | `114` |
| Local Organization nodes with `sameAs` | `0` |
| Local Organization nodes with `parentOrganization` | `114` |

Вывод: `sameAs` используется корректно. Глобальные официальные соцсети Aerocool принадлежат global Brand/Organization. Локальная Aerocool Ukraine связана с ними через `parentOrganization` и `brand`, а не через локальный `sameAs`.

## 10. Граф товаров

| Метрика | Значение |
| --- | ---: |
| Product nodes | `24` |
| Product front matter pages | `24` |
| Product nodes without `Offer` | `0` |
| `priceValidUntil` | `2027-12-31` на всех `24` Product nodes |
| Availability | `https://schema.org/InStock` на всех `24` Product nodes |
| Product nodes with `aggregateRating` | `0` в локальной сборке без approved reviews snapshot |
| Product nodes with `review` | `0` |
| Product nodes without `mpn` | `4` rendered pages |
| Product nodes without `gtin13` | `4` rendered pages |
| Product nodes with `color` | `24` |
| Rendered `ProductGroup` nodes | `16` |
| Rendered `isVariantOf` | `16` |
| Rendered `inProductGroupWithID` | `16` |
| Product nodes with `additionalProperty` | `24` |

Product/Offer слой сильный: цена, валюта, наличие, SKU, seller, доставка, возврат, оплата, гарантия и `priceValidUntil` собираются из front matter. ProductGroup activation закрыт для реальных WING/XTAL вариантов. `color` берется из registry, а `additionalProperty` строится из видимой вкладки характеристик. Открытый product gap: SKY identifiers.

## 11. Ratings и Reviews

Состояние на 2026-05-31:

- `review_target_id` есть у всех `24` товарных front matter файлов;
- `reviews_enabled: true` есть у всех `24` товарных front matter файлов;
- legacy `rating.value` и `rating.count` отсутствуют;
- `Product.aggregateRating` выводится только при наличии approved отзывов в generated snapshot;
- локальный build без Netlify Database создает пустой snapshot, поэтому `AggregateRating` в локальном rendered graph не появляется.

Практический вывод: review governance закрыт архитектурно, но остается операционный процесс: модерация, rebuild после approval, контроль visible reviews и rich-results reports на published URL.

## 12. ProductGroup и варианты

| Метрика | Значение |
| --- | ---: |
| `ProductGroup` entities | `4 confirmed` |
| `product_group_id` refs | `16` |
| Rendered pages with variant swatches | `16` |
| Singleton ProductGroup refs | `0` |
| Rendered `ProductGroup` nodes | `16` |
| Rendered `isVariantOf` | `16` |
| Rendered `inProductGroupWithID` | `16` |

Активные группы:

- WING Racer: black / dark grey;
- WING Loft Air: light grey / dark grey;
- XTAL Racer: black / dark grey;
- XTAL Loft Air: light grey / dark grey.

Одиночные товары `SKY 360`, `SKY Light`, `WING Mesh Black` и `XTAL Mesh Black` не получают `product_group_id`; они остаются самостоятельными Product внутри своей серии.

## 13. Breadcrumbs и `linkTitle`

| Метрика | Значение |
| --- | ---: |
| BreadcrumbList nodes | `100` |
| Breadcrumb issues | `0` |
| Visible breadcrumb pages | `102` |
| Duplicate breadcrumb positions | `0` |

Видимые breadcrumbs и schema.org `BreadcrumbList` используют общий helper [breadcrumb-label.html](../../layouts/_partials/breadcrumb-label.html). Это снижает риск schema drift между UI и JSON-LD.

## 14. ImageObject и Image License Metadata

| Метрика | Значение |
| --- | ---: |
| `ImageObject` nodes | `228` |
| `ImageObject` with complete license metadata | `228` |

Image schema layer работает полноценно: у primary image каждой JSON-LD страницы и у logo node есть `license`, `acquireLicensePage`, `creator`, `creditText` и `copyrightNotice`. Эти поля ведут на видимую страницу условий `/image-license/` или `/ru/image-license/`.

Важно: это не открытая лицензия и не Creative Commons. Текущая модель - restricted permission request: изображения можно использовать только по условиям правообладателя или после письменного разрешения.

## 15. Keyword Database и Entity Coverage

Keyword database содержит `255` строк. Target URL issues после split по `|` не найдены.

Сильные entity-кластеры:

- `computer-chair`: `36` about, `42` mentions;
- `office-chair`: `30` about, `44` mentions;
- `home-office`: `28` about, `52` mentions;
- `synchronous-tilt`: `6` about, `64` mentions;
- `sync5-mechanism`: `4` about, `48` mentions;
- `mesh-material`: `4` about, `44` mentions;
- `loft-air-material`: `4` about, `42` mentions;
- `racer-material`: `2` about, `42` mentions.

Новое усиление:

- `lumbar-support`: `30` mentions;
- `armrests-4d-x-360`: `12` mentions;
- `armrests-3d-x-360`: `4` mentions;
- `leatherette-material`: `10` mentions;
- `fabric-material`: `10` mentions;
- `hot-room`: `6` mentions.

Вывод: проект хорошо покрывает широкие коммерческие интенты, материалы, механизмы, функции и реальные варианты. Следующий уровень — измерять, какие сущности дают impressions, clicks, AI citations и конверсии.

## 16. Актуальные проблемы

### P0. контроль перед Production: `development/noindex`

Содержательные страницы с JSON-LD сейчас получают `noindex,nofollow` на published branch build, потому что Netlify/Hugo намеренно настроены на `development`. Paginated URL `/page/2+`, `/articles/page/2+`, `/news/page/2+` и русские аналоги уже выведены из graph и в production должны оставаться `noindex,follow`. Перед SEO-запуском нужно переключить production и проверить `index,follow`, canonical, hreflang, sitemap, robots, headers, 404, paginated `noindex,follow` и rich results eligibility на published URL.

### P1. идентификаторы SKY

`SKY 360` и `SKY Light` не имеют `mpn` и `gtin13` в обеих языковых версиях. Нужно подтвердить, что официальных MPN/GTIN нет, либо добавить их во front matter.

### P1. метрики сущностей после Production

Entity Performance Report уже создан и автоматически покрывает:

- entity ID;
- entity home;
- pages where entity is `about`;
- pages where entity is `mentions`;
- rendered node count;

Открытым остается внешний performance-слой, который нельзя честно заполнить до production:

- GSC impressions/clicks/query match;
- AI Search visibility/citations;
- бизнес-сигнал: заявка, переход, консультация, покупка, если появится.

### P2. базовые метрики поиска с AI после Production

После production нужна baseline-проверка AI Search: бренд, локальная организация, серии, модели, материалы, механизмы, политики доставки/возврата/гарантии, запросы сравнения и выбора кресла.

### P3. агентские действия, MCP, NLWeb и `llms.txt`

Не внедрять сейчас. Вернуться после production, entity reporting и появления реальных бизнес-процессов/API.

## 17. Рекомендуемая очередь работ

1. Закрыть production gate и проверить published URL.
2. Подтвердить MPN/GTIN для `SKY 360` и `SKY Light`.
3. Поддерживать `npm run entity:report`; после production заполнить GSC, AI citations и business signal в Entity Performance Report.
4. Исполнять регламент product facts при каждом изменении цены, наличия, гарантии, доставки, возврата, оплаты, `priceValidUntil`, цвета или характеристик.
5. После production собрать GSC, Product rich results, AI citations и entity-level baseline.
6. Поддерживать image license page и централизованный metadata helper при изменении прав на изображения.
7. Вернуться к agentic actions только после появления реальных action endpoints и владельцев процесса.

## 18. Оценка по областям

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Техническая валидность JSON-LD | `9.8 / 10` | Parse errors, duplicate node IDs внутри страниц, empty IDs и broken refs не найдены |
| Entity Registry | `9.7 / 10` | Реестр стабилен: `61 confirmed`, `0 planned`, duplicate `@id` нет |
| Connected Schema | `9.5 / 10` | `about`, `mentions`, policy nodes, stable IDs, `sameAs`, `parentOrganization` и image policy работают корректно |
| ProductGroup / Variant Graph | `9.4 / 10` | 4 реальные группы активированы; singleton-групп нет |
| Breadcrumbs / `BreadcrumbList` | `9.4 / 10` | Общий helper, position issues нет |
| Product structured data | `9.4 / 10` | Offer facts, ProductGroup, `color` и `additionalProperty` сильные; открыт SKY identifiers |
| Reviews / ratings governance | `9.2 / 10` | Архитектура правильная; нужен production moderation/rebuild/reporting process |
| ImageObject / Google Images readiness | `9.5 / 10` | Primary image и logo имеют complete license metadata; следующая задача - расширение product gallery |
| AI Search readiness | `8.8 / 10` | Entity foundation сильная; нужен post-production baseline |
| Documentation governance | `9.8 / 10` | Документация актуальна; schema/entity audit, product facts process и entity performance report имеют отдельные source of truth |
| Agentic Web readiness | `7.5 / 10` | Правильно удержано в P3 до появления реальных бизнес-процессов |

Общая оценка: `9.7 / 10`.

Главный вывод: больше не нужно решать `ProductGroup`, duplicate registry ID, planned-activation, базовый `additionalProperty`, описание процесса product facts, создание Entity Performance Report или Image License Metadata. Эти задачи закрыты. Следующие реальные задачи: production/indexability gate, SKY identifiers, заполнение внешних GSC/AI/business-метрик после production и post-production AI Search baseline.
