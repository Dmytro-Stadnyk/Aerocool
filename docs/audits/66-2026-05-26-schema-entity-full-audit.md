# Полный Schema/Entity аудит проекта на 2026-05-26

Дата аудита: 2026-05-26.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Контекст: это актуальный полный срез всего schema/entity-слоя проекта `Aerocool Ukraine` после обновления документации до `01-55`, Core Web Vitals-аудита и текущей сборки Hugo. Аудит проверяет rendered JSON-LD, [data/entities.yaml](../../data/entities.yaml), front matter `content/**/*.md`, Entity Registry, Product graph, `about_entities`, `mentions_entities`, `product_group_id`, breadcrumbs, `sameAs`, review/rating policy и текущий список проблем.

Базовые документы:

- [19-schema-types-reference.md](../seo/19-schema-types-reference.md);
- [20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md);
- [21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md);
- [22-entity-registry-beginner-guide-2026.md](../seo/22-entity-registry-beginner-guide-2026.md);
- [23-entity-registry-2026.md](../seo/23-entity-registry-2026.md);
- [24-entities-knowledge-graph-playbook-2026.md](../seo/24-entities-knowledge-graph-playbook-2026.md);
- [25-ai-search-entity-map-2026.md](../seo/25-ai-search-entity-map-2026.md);
- [26-json-ld-graph-audit-roadmap-2026.md](../seo/26-json-ld-graph-audit-roadmap-2026.md);
- [30-keyword-database-2026.md](../seo/30-keyword-database-2026.md).

## 1. Главный вывод

Schema/entity-система проекта сейчас сильная и управляемая. JSON-LD парсится без ошибок, внутренние ссылки в graph не биты, Entity Registry не содержит машинных ошибок, `about_entities` и `mentions_entities` ссылаются только на `confirmed` сущности, а `sameAs` не смешивает локальную Aerocool Ukraine с глобальными соцпрофилями.

Общая оценка: `9.1 / 10`.

Оценка не `10 / 10` по пяти причинам:

1. сайт все еще собирается в `development`, поэтому все JSON-LD страницы получают `noindex,nofollow`;
2. `ProductGroup` подготовлен только для реальных WING/XTAL цветовых вариантов, остается `planned` и не выводится в graph;
3. `SKY 360` и `SKY Light` не имеют подтвержденных `mpn` и `gtin13`;
4. нет регулярного Entity Performance Report, который связывает registry, страницы, GSC, AI Search и бизнес-сигналы;
5. production review/rich-results сигналы еще нужно контролировать на опубликованном URL после переключения окружения.

Актуализация `2026-05-28`: review pipeline внедрен. Товарные страницы получили `review_target_id` и `reviews_enabled`, approved отзывы выгружаются через `scripts/export_reviews.mjs` в `data/generated/reviews.json`, видимые review-блоки и `Product.aggregateRating` используют один и тот же generated snapshot. Legacy `rating.value` и `rating.count` удалены из товарного front matter.

## 2. Метод проверки

Проверено:

- `npm run build`;
- rendered HTML в `public/**/*.html`;
- все JSON-LD scripts `application/ld+json`;
- внутренние `@id` и ссылки внутри graph;
- наличие JSON-LD на служебных URL;
- [data/entities.yaml](../../data/entities.yaml);
- front matter в `content/**/*.md`;
- product facts, `rating`, `product_group_id`, `about_entities`, `mentions_entities`;
- schema partials в [layouts/_partials/_schema](../../layouts/_partials/_schema);
- документация schema/entity-слоя.

Команды проверки:

```bash
npm run build
```

Дополнительно выполнен локальный audit script по `public/**/*.html`, `content/**/*.md`, `data/entities.yaml` и keyword database.

## 3. Снимок сгенерированного JSON-LD

| Метрика | Значение |
| --- | ---: |
| HTML files | `134` |
| Pages with JSON-LD | `112` |
| JSON-LD scripts | `112` |
| JSON parse errors | `0` |
| JSON-LD top-level nodes | `1920` |
| Duplicate `@id` внутри страницы | `0` |
| Empty `@id` | `0` |
| Broken internal Aerocool refs | `0` |
| JSON-LD на `contact/success` | `0` |
| JSON-LD на `search` | `0` |
| BreadcrumbList nodes | `98` |
| Breadcrumb issues | `0` |
| Visible breadcrumb pages | `100` |
| JSON-LD pages with `noindex` | `112` |

Вывод: graph технически чистый. `noindex` ожидаем для текущего режима сборки, но перед production это P0-gate.

## 4. Типы узлов в Rendered Graph

| Type | Count |
| --- | ---: |
| `AboutPage` | `2` |
| `Article` | `32` |
| `Brand` | `112` |
| `BreadcrumbList` | `98` |
| `CollectionPage` | `18` |
| `ContactPage` | `2` |
| `DefinedTerm` | `830` |
| `FAQPage` | `2` |
| `ImageObject` | `224` |
| `NewsArticle` | `18` |
| `Organization` | `224` |
| `Product` | `24` |
| `Thing` | `114` |
| `WebPage` | `108` |
| `WebSite` | `112` |

Вывод: проект уже работает как Content Knowledge Graph, а не просто набор отдельных rich result-разметок. Основной объем graph дают `DefinedTerm`, `Thing`, `Product`, `Article`, `NewsArticle`, `CollectionPage`, `Organization`, `Brand`, `ImageObject` и `WebPage`.

## 5. Снимок реестра сущностей

| Метрика | Значение |
| --- | ---: |
| Total entities | `63` |
| Markupable entities | `61` |
| `confirmed` | `51` |
| `planned` | `10` |
| `do-not-markup` | `2` |
| Entities with audit issues | `0` |
| Unknown front matter entity refs | `0` |
| Non-confirmed refs in `about_entities` / `mentions_entities` | `0` |
| Unique entity refs used in `about` / `mentions` | `43` |
| `product_group_id` refs | `16` |
| `product_group_id` status | `16 planned` |

Классы сущностей:

| Class | Count |
| --- | ---: |
| `ProductVariant` | `8` |
| `ProductGroup` | `4` |
| `Feature` | `8` |
| `UseCase` | `7` |
| `Material` | `5` |
| `Policy` | `5` |
| `Collection` | `4` |
| `Product` | `4` |
| `ProductSeries` | `3` |
| `Mechanism` | `3` |
| Остальные классы | `12` |

Оценка Entity Registry: `9.5 / 10`.

Активация `2026-05-26`: `dual-backrest`, `replaceable-elements` и `long-sitting` переведены из `planned` в `confirmed` и точечно добавлены в front matter страниц, где эти сущности уже явно раскрыты. После сборки они появились в rendered graph как `DefinedTerm`: `dual-backrest` — `6` раз, `replaceable-elements` — `6` раз, `long-sitting` — `8` раз.

Registry силен, потому что:

- все ключевые сущности имеют стабильный ID;
- есть разделение `confirmed`, `planned`, `do-not-markup`;
- global Brand/Organization и local Organization разделены корректно;
- ProductGroup подготовлены, но не включены преждевременно;
- `about_entities` и `mentions_entities` не используют неподтвержденные сущности;
- policy-сущности уже выводятся как отдельные registry-based nodes, где это уместно.

Минус остается за отсутствующий регулярный performance/reporting layer и за то, что часть полезных сущностей пока `planned`, потому что им нужны видимые блоки, variant navigation или более сильные entity homes.

## 6. Полный аудит всех сущностей

Колонки:

- `about` — сколько раз сущность используется как главный предмет страницы;
- `mentions` — сколько раз сущность используется как связанная сущность;
- `group refs` — сколько раз сущность указана как `product_group_id`;
- `rendered` — сколько раз соответствующая node/ref встречается в rendered JSON-LD;
- `Аудит` — результат проверки ID, статуса, entity home, JSON-LD ID и front matter-ссылок.

| entity_id | Статус | Класс | Schema | about | mentions | group refs | rendered | Аудит |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| `aerocool-brand` | `confirmed` | `Brand` | `Brand` | 6 | 34 | 0 | 112 | OK |
| `aerocool-global-organization` | `confirmed` | `Organization` | `Organization` | 2 | 0 | 0 | 112 | OK |
| `aerocool-ukraine` | `confirmed` | `Organization` | `Organization` | 6 | 2 | 0 | 112 | OK |
| `aerocool-website` | `confirmed` | `WebSite` | `WebSite` | 0 | 0 | 0 | 56 | OK |
| `aerocool-logo` | `confirmed` | `ImageObject` | `ImageObject` | 0 | 0 | 0 | 112 | OK |
| `home-page` | `confirmed` | `WebPage` | `WebPage` | 0 | 0 | 0 | 7 | OK |
| `about-page` | `confirmed` | `AboutPage` | `AboutPage` | 0 | 0 | 0 | 1 | OK |
| `contact-page` | `confirmed` | `ContactPage` | `ContactPage` | 0 | 0 | 0 | 1 | OK |
| `faq-page` | `confirmed` | `FAQPage` | `FAQPage` | 2 | 0 | 0 | 1 | OK |
| `products-collection` | `confirmed` | `Collection` | `CollectionPage` | 0 | 2 | 0 | 1 | OK |
| `aerocool-catalog` | `confirmed` | `Collection` | `CollectionPage` | 8 | 26 | 0 | 1 | OK |
| `articles-collection` | `confirmed` | `Collection` | `CollectionPage` | 6 | 0 | 0 | 3 | OK |
| `news-collection` | `confirmed` | `Collection` | `CollectionPage` | 2 | 0 | 0 | 2 | OK |
| `sky-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 12 | 40 | 0 | 1 | OK |
| `wing-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 20 | 36 | 0 | 1 | OK |
| `xtal-series` | `confirmed` | `ProductSeries` | `CollectionPage` | 20 | 36 | 0 | 1 | OK |
| `wing-racer-product-group` | `planned` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 0 | OK |
| `wing-loft-air-product-group` | `planned` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 0 | OK |
| `xtal-racer-product-group` | `planned` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 0 | OK |
| `xtal-loft-air-product-group` | `planned` | `ProductGroup` | `ProductGroup` | 0 | 0 | 4 | 0 | OK |
| `sky-360` | `confirmed` | `Product` | `Product` | 6 | 14 | 0 | 1 | OK |
| `sky-light` | `confirmed` | `Product` | `Product` | 6 | 14 | 0 | 1 | OK |
| `wing-loft-air-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 8 | 0 | 1 | OK |
| `wing-loft-air-light-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 1 | OK |
| `wing-mesh-black` | `confirmed` | `Product` | `Product` | 2 | 8 | 0 | 1 | OK |
| `wing-racer-black` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 1 | OK |
| `wing-racer-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 4 | 0 | 1 | OK |
| `xtal-loft-air-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 8 | 0 | 1 | OK |
| `xtal-loft-air-light-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 1 | OK |
| `xtal-mesh-black` | `confirmed` | `Product` | `Product` | 2 | 8 | 0 | 1 | OK |
| `xtal-racer-black` | `confirmed` | `ProductVariant` | `Product` | 2 | 4 | 0 | 1 | OK |
| `xtal-racer-dark-grey` | `confirmed` | `ProductVariant` | `Product` | 2 | 6 | 0 | 1 | OK |
| `racer-material` | `confirmed` | `Material` | `DefinedTerm` | 2 | 42 | 0 | 48 | OK |
| `loft-air-material` | `confirmed` | `Material` | `DefinedTerm` | 4 | 42 | 0 | 50 | OK |
| `mesh-material` | `confirmed` | `Material` | `DefinedTerm` | 4 | 44 | 0 | 52 | OK |
| `leatherette-material` | `planned` | `Material` | `DefinedTerm` | 0 | 0 | 0 | 0 | OK |
| `fabric-material` | `planned` | `Material` | `DefinedTerm` | 0 | 0 | 0 | 0 | OK |
| `synchronous-tilt` | `confirmed` | `Mechanism` | `DefinedTerm` | 6 | 64 | 0 | 74 | OK |
| `sync4-mechanism` | `confirmed` | `Mechanism` | `DefinedTerm` | 4 | 28 | 0 | 36 | OK |
| `sync5-mechanism` | `confirmed` | `Mechanism` | `DefinedTerm` | 4 | 48 | 0 | 56 | OK |
| `7d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 30 | 0 | 32 | OK |
| `8d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 22 | 0 | 24 | OK |
| `11d-adjustment` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 42 | 0 | 44 | OK |
| `dual-backrest` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 4 | 0 | 6 | OK |
| `replaceable-elements` | `confirmed` | `Feature` | `DefinedTerm` | 2 | 4 | 0 | 6 | OK |
| `lumbar-support` | `planned` | `Feature` | `DefinedTerm` | 0 | 0 | 0 | 0 | OK |
| `armrests-4d-x-360` | `planned` | `Feature` | `DefinedTerm` | 0 | 0 | 0 | 0 | OK |
| `armrests-3d-x-360` | `planned` | `Feature` | `DefinedTerm` | 0 | 0 | 0 | 0 | OK |
| `gaming-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 14 | 38 | 0 | 68 | OK |
| `office-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 30 | 44 | 0 | 90 | OK |
| `computer-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 36 | 42 | 0 | 94 | OK |
| `ergonomic-chair` | `confirmed` | `UseCase` | `DefinedTerm` | 4 | 16 | 0 | 20 | OK |
| `home-office` | `confirmed` | `UseCase` | `DefinedTerm` | 28 | 52 | 0 | 96 | OK |
| `long-sitting` | `confirmed` | `UseCase` | `DefinedTerm` | 4 | 4 | 0 | 8 | OK |
| `hot-room` | `planned` | `UseCase` | `DefinedTerm` | 0 | 0 | 0 | 0 | OK |
| `chair-selection` | `confirmed` | `ContentTopic` | `DefinedTerm` | 20 | 2 | 0 | 26 | OK |
| `delivery-policy` | `confirmed` | `Policy` | `OfferShippingDetails` | 2 | 26 | 0 | 28 | OK |
| `payment-policy` | `confirmed` | `Policy` | `Thing` | 2 | 26 | 0 | 28 | OK |
| `return-policy` | `confirmed` | `Policy` | `MerchantReturnPolicy` | 2 | 26 | 0 | 28 | OK |
| `warranty-policy` | `confirmed` | `Policy` | `WarrantyPromise` | 2 | 26 | 0 | 28 | OK |
| `price-validity-policy` | `confirmed` | `Policy` | `Thing` | 2 | 0 | 0 | 2 | OK |
| `online-store` | `do-not-markup` | `BusinessModel` | `OnlineStore` | 0 | 0 | 0 | 0 | OK |
| `review-layer` | `do-not-markup` | `Review` | `Review` | 0 | 0 | 0 | 0 | OK |

## 7. Что означают `planned` сущности в текущем реестре

`planned` не означает ошибку. Это значит: сущность признана важной для будущего графа, у нее есть стабильный ID и место в стратегии, но пока не хватает одного из условий для сильного JSON-LD вывода:

- отдельного видимого объяснения на странице;
- стабильного entity home;
- видимой variant navigation;
- таблицы характеристик;
- business source of truth;
- подтвержденного action/process owner.

Сейчас `planned` группы:

| Группа | Сущности | Почему пока не Confirmed |
| --- | --- | --- |
| ProductGroup | 4 product group entities | Нужна видимая навигация вариантов и подтверждение групп как самостоятельных сущностей; singleton-группы удалены |
| Материалы | `leatherette-material`, `fabric-material` | Лучше держать как объяснение внутри Racer/Loft Air, пока нет сильного glossary/entity block |
| Функции | `lumbar-support`, `armrests-4d-x-360`, `armrests-3d-x-360` | Нужны устойчивые видимые характеристики и mapping в `additionalProperty` |
| Use cases | `hot-room` | Нужны более сильные visible sections и AI/entity prompts |

Уже активированы `2026-05-26`: `dual-backrest`, `replaceable-elements`, `long-sitting`.

Корректное поведение сейчас: planned сущности могут жить в registry и roadmap, но не должны попадать в `about_entities` / `mentions_entities` как сильные JSON-LD связи.

## 8. Front Matter и Entity Fields

| Метрика | Значение |
| --- | ---: |
| Content markdown files | `98` |
| Front matter parse errors | `0` |
| Missing `lastmod` | `0` |
| `schema_types` refs | `98` content files |
| `linkTitle` fields | `94` |
| `about_entities` refs | `296` |
| `mentions_entities` refs | `940` |
| Unknown entity refs | `0` |
| Non-confirmed `about` / `mentions` refs | `0` |

Вывод: front matter сейчас дисциплинирован. Главные страницы, хабы, статьи, новости, серии и товары уже связаны с registry. Массового использования planned-сущностей в сильных полях нет.

## 9. Connected Schema, `sameAs` и Local Organization

| Метрика | Значение |
| --- | ---: |
| `WebPage` nodes | `108` |
| `WebPage.mainEntity` | `94` |
| `WebPage.about` | `108` |
| `WebPage.mentions` | `108` |
| `sameAs` nodes | `224` |
| `sameAs` refs | `1120` |
| Local organization nodes with `sameAs` | `0` |

Вывод: `sameAs` используется корректно. Глобальные официальные соцсети Aerocool принадлежат global Brand/Organization. Локальная Aerocool Ukraine связана с ними через `parentOrganization` и `brand`, а не через локальный `sameAs`. Это правильная модель, потому что `sameAs` означает точное тождество сущности.

## 10. Граф товаров

| Метрика | Значение |
| --- | ---: |
| Product nodes | `24` |
| Product front matter pages | `24` |
| Product offer issues | `0` |
| Required operational product facts missing in front matter | `0` |
| `priceValidUntil` | `2027-12-31` на всех `24` Product nodes |
| Product nodes with `aggregateRating` | зависит от approved отзывов в `data/generated/reviews.json` |
| Product nodes with `review` | `0` |
| `rating` in product front matter | `0` |
| Visible rating lines | только из approved reviews snapshot |
| `review_target_id` | `24` |
| `reviews_enabled` | `24` |
| `data/generated/reviews.json` | build-time snapshot approved отзывов |
| Product nodes without `mpn` | `4` rendered pages |
| Product nodes without `gtin13` | `4` rendered pages |
| `additionalProperty` on Product nodes | `0` |

Product/Offer слой сильный: цена, валюта, наличие, SKU, seller, доставка, возврат, оплата, гарантия и `priceValidUntil` собираются из front matter. Source of truth для этих business facts — product front matter, владелец — команда Aerocool Украина.

Открытые product gaps:

- `SKY 360` и `SKY Light` в украинской и русской версиях не имеют `mpn` и `gtin13`;
- характеристики видны в контентной модели, но еще не размечены как `additionalProperty`;
- ProductGroup подготовлены в front matter, но не активированы;
- рейтинги теперь должны поддерживаться только через approved reviews snapshot; ручные rating-поля во front matter не возвращать.

## 11. Ratings и Reviews

Текущий факт: `AggregateRating` выводится в `Product` JSON-LD только из approved reviews snapshot.

Review pipeline закрыт на уровне v1:

- `POST /api/reviews` создает `pending` отзывы в Netlify Database;
- модерация переводит реальные отзывы в `approved`;
- `scripts/export_reviews.mjs` выгружает approved отзывы в `data/generated/reviews.json`;
- товарные страницы показывают approved отзывы и средний рейтинг из того же snapshot;
- `Product.aggregateRating` не выводится без approved отзывов;
- legacy `rating.value` и `rating.count` удалены из product front matter.

Практический вывод: rating/reviews governance больше не является открытым P0/P1. Дальше нужно поддерживать модерацию, rebuild после approval и production monitoring rich results.

## 12. ProductGroup и варианты

| Метрика | Значение |
| --- | ---: |
| `ProductGroup` entities | `4 planned` |
| `product_group_id` refs | `16` |
| Rendered `ProductGroup` nodes | `0` |
| Rendered `isVariantOf` | `0` |
| Rendered `inProductGroupWithID` | `0` |

Это корректное состояние. `ProductGroup` нельзя включать только потому, что в registry уже есть ID. Актуализация `2026-05-28`: видимый selector между цветовыми вариантами уже добавлен через `variant-swatches.html`, но сами ProductGroup entities еще остаются `planned`. Актуализация `2026-05-31`: singleton ProductGroup для SKY Light, SKY 360, WING Mesh Black и XTAL Mesh Black удалены; эти страницы остаются самостоятельными `Product` внутри своих серий. Для `confirmed` статуса нужны:

1. видимые ссылки или variant selector между вариантами — UI-слой уже добавлен для групп с несколькими вариантами;
2. понятное объяснение, что это варианты одной модели;
3. стабильный `productGroupID`;
4. проверка, что каждая variant page имеет свой цвет/материал/SKU/GTIN/URL/image/Offer.

## 13. Breadcrumbs и `linkTitle`

| Метрика | Значение |
| --- | ---: |
| BreadcrumbList nodes | `98` |
| Breadcrumb issues | `0` |
| Visible breadcrumb pages | `100` |
| Duplicate breadcrumb positions | `0` |

Видимые breadcrumbs и schema.org `BreadcrumbList` используют общий helper [breadcrumb-label.html](../../layouts/_partials/breadcrumb-label.html). Это снижает риск, что человек видит одно название, а JSON-LD отдает другое.

Разница между `100` visible breadcrumb pages и `98` `BreadcrumbList` nodes ожидаема: служебные страницы могут иметь видимую навигацию, но не должны получать JSON-LD.

## 14. ImageObject и Image License Metadata

| Метрика | Значение |
| --- | ---: |
| `ImageObject` nodes | `224` |
| Image license nodes | `0` |

Базовый image schema layer работает. `license`, `acquireLicensePage`, `creator`, `creditText` и `copyrightNotice` не добавлены. Это правильно, пока нет подтвержденной license page и юридически корректных прав на product/brand images.

## 15. Keyword Database и Entity Coverage

Keyword database содержит `255` строк, target URL issues не найдены.

Сильные entity-кластеры:

- `computer-chair`: `36` about, `42` mentions, `94` rendered;
- `office-chair`: `30` about, `44` mentions, `90` rendered;
- `home-office`: `28` about, `52` mentions, `96` rendered;
- `synchronous-tilt`: `6` about, `64` mentions, `74` rendered;
- `sync5-mechanism`: `4` about, `48` mentions, `56` rendered;
- `mesh-material`: `4` about, `44` mentions, `52` rendered;
- `loft-air-material`: `4` about, `42` mentions, `50` rendered;
- `racer-material`: `2` about, `42` mentions, `48` rendered.

Вывод: проект хорошо покрывает широкие коммерческие интенты, материалы и механизмы. Следующий уровень — не просто добавлять больше сущностей, а измерять, какие сущности дают impressions, clicks, AI citations и конверсии.

## 16. Актуальные проблемы

### P0. контроль перед Production: `development/noindex`

Все `112` страниц с JSON-LD сейчас получают `noindex,nofollow`, потому что Netlify/Hugo намеренно настроены на `development`. Это безопасно для доработки, но перед реальным SEO-запуском нужно переключить production и проверить:

- `index,follow`;
- canonical;
- hreflang;
- sitemap index и языковые sitemap;
- robots;
- headers;
- 404;
- rich results eligibility на published URL.

### Закрыто. Ratings/Reviews Governance

Review pipeline внедрен: approved отзывы из Netlify Database попадают в build-time snapshot, видимый HTML и `Product.aggregateRating`. Legacy rating во front matter удален. Открытая часть теперь операционная: модерировать отзывы, запускать rebuild после approval и проверять production rich-results reports.

### P1. отчет об эффективности сущностей

Нужен регулярный отчет по сущностям:

- entity ID;
- entity home;
- pages where entity is `about`;
- pages where entity is `mentions`;
- rendered node count;
- GSC impressions/clicks/query match;
- AI Search visibility/citations;
- бизнес-сигнал: заявка, переход, консультация, покупка, если появится.

Без этого registry остается качественным graph-документом, но не становится измеримой системой роста.

### P1. ProductGroup и видимая навигация вариантов

ProductGroup готов как staged data только для реальных цветовых вариантов: `16` `product_group_id` refs указывают на `4 planned` groups. Видимая swatches-навигация вариантов добавлена на product pages и работает как ссылки на соседние variant URL текущего языка. Graph пока не выводит `ProductGroup`, `isVariantOf` и `inProductGroupWithID`: следующий шаг — проверить группы и только потом переводить готовые ProductGroup entities в `confirmed`.

### P1. Product Identifiers для SKY

`SKY 360` и `SKY Light` не имеют `mpn` и `gtin13` в обеих языковых версиях. Нужно бизнесово подтвердить:

- официальных MPN/GTIN нет;
- или они есть и должны быть добавлены во front matter.

### P1/P2. `additionalProperty` для характеристик

Видимые характеристики есть, но `Product.additionalProperty` пока не выводится. Следующий шаг — mapping в `PropertyValue` для механизма, регулировок, материала, подлокотников, базы, роликов, гарантии и сценария использования.

### P2. активация запланированных сущностей

Не все полезные сущности активированы:

- `lumbar-support`;
- `armrests-4d-x-360`;
- `armrests-3d-x-360`;
- `hot-room`;
- `leatherette-material`;
- `fabric-material`.

Это не ошибка. Но если эти темы важны для SEO/AI Search, им нужны видимые блоки, entity homes и понятный mapping.

### P2. метаданные лицензии изображений

Не внедрять до подтверждения прав и license page. После подтверждения можно добавить `license` и `acquireLicensePage` в `ImageObject`.

### P2. базовые метрики поиска с AI после Production

После production нужна baseline-проверка AI Search:

- бренд;
- локальная организация;
- серии;
- модели;
- материалы;
- механизмы;
- политики доставки/возврата/гарантии;
- запросы сравнения и выбора кресла.

### P3. агентские действия, MCP, NLWeb и `llms.txt`

Не внедрять сейчас. Вернуться после production, ProductGroup, entity reporting и появления реальных бизнес-процессов/API.

## 17. Рекомендуемая очередь работ

1. Закрыть production gate: перевести сборку в production только после финальной проверки.
2. Подтвердить MPN/GTIN для `SKY 360` и `SKY Light`.
3. Проверить видимую swatches-навигацию вариантов на product pages после добавления новых товаров/цветов.
4. Перевести готовые ProductGroup entities из `planned` в `confirmed` и включить `ProductGroup` / `isVariantOf`.
6. Спроектировать `additionalProperty` на базе видимых характеристик.
7. Завести Entity Performance Report.
8. После production собрать GSC, Product rich results, AI citations и entity-level baseline.
9. Вернуться к image license metadata только после юридического подтверждения.
10. Вернуться к agentic actions только после появления реальных action endpoints и владельцев процесса.

## 18. Оценка по областям

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Техническая валидность JSON-LD | `9.7 / 10` | Parse errors, duplicate IDs, empty IDs и broken refs не найдены |
| Entity Registry | `9.5 / 10` | Реестр стабилен; три готовые сущности переведены в `confirmed`, но нужен performance/reporting layer |
| Connected Schema | `9.2 / 10` | `about`, `mentions`, policy nodes, stable IDs и `sameAs` работают корректно |
| Breadcrumbs / `BreadcrumbList` | `9.4 / 10` | Общий helper, position issues нет |
| Product structured data | `8.6 / 10` | Offer facts сильные; singleton ProductGroup вычищены; ratings governance, ProductGroup activation, SKY identifiers и `additionalProperty` открыты |
| AI Search readiness | `8.6 / 10` | Entity foundation сильная; нужен post-production baseline |
| Documentation governance | `9.5 / 10` | Документация обновлена до `01-55`; важно поддерживать текущий audit как source of truth |
| Agentic Web readiness | `7.5 / 10` | Правильно удержано в P3 до появления реальных бизнес-процессов |

Общая оценка: `9.1 / 10`.

Главный вывод: сейчас не нужно хаотично добавлять новые schema-типы. Нужно довести до production, решить review/rating governance, подтвердить SKY identifiers, активировать ProductGroup только для реальных вариантов через видимую навигацию, добавить `additionalProperty` из характеристик и начать регулярный entity performance reporting.
