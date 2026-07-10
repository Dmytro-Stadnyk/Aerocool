# Полный аудит JSON-LD и Entity Graph на 2026-05-20

Дата аудита: 2026-05-20.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).
Актуализировано: 2026-05-22.

Контекст: это свежий контрольный аудит после предыдущих данных Schema App, customer stories, синхронизации документации до глобального диапазона `01-53`, внедрения правила `linkTitle`, синхронизации видимых breadcrumbs с schema.org `BreadcrumbList`, фиксации политики видимой meta-строки страниц и добавления keyword database.

Базовые документы, на которые опирается этот срез:

- [60-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md](60-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md);
- [62-2026-05-19-documentation-current-audit.md](62-2026-05-19-documentation-current-audit.md);
- [63-2026-05-19-visible-page-meta-policy-audit.md](63-2026-05-19-visible-page-meta-policy-audit.md);
- [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md);
- [26-json-ld-graph-audit-roadmap-2026.md](../seo/26-json-ld-graph-audit-roadmap-2026.md).

## 1. Главный вывод

Состояние JSON-LD и Entity Graph стабильное. После новых данных и правок документационного слоя не найдено деградации:

- JSON-LD продолжает парситься без ошибок;
- битых внутренних Aerocool URL в graph нет;
- дублирующихся `@id` внутри страниц нет;
- `about_entities` и `mentions_entities` используют только `confirmed` сущности;
- `sameAs` остается у global Brand/Organization, local Aerocool Ukraine не получает global social `sameAs`;
- `ProductGroup` остается правильно staged, без преждевременного вывода в rendered graph.

Оценка остается `8.6 / 10`.

Оценка не повышается, потому что главные production-ограничения не закрыты: `development/noindex`, ratings/reviews source of truth, отсутствие `Entity Performance Report`, staged `ProductGroup`, отсутствие `additionalProperty` и post-production AI Search baseline.

## 2. Что изменилось после предыдущего Full Audit

После расширения контента и добавления keyword database rendered graph вырос, но архитектурные правила не изменились. Реальное изменение в project governance:

1. Документация получила глобальную нумерацию и главный вход [01-documentation-map.md](../01-documentation-map.md).
2. Видимые breadcrumbs и schema.org `BreadcrumbList` используют общий helper [breadcrumb-label.html](../../layouts/_partials/breadcrumb-label.html).
3. Поле `linkTitle` стало официальным способом задавать короткое имя страницы для навигации и breadcrumbs.
4. Видимая meta-строка страниц отделена от head/schema-слоя и описана как отдельная policy.
5. Документация синхронизирована до документа `53`, поэтому карта документации, `README.md` и `AGENTS.md` должны учитывать диапазон `01-53`.

Для JSON-LD это значит: риск расхождения видимых breadcrumbs и `BreadcrumbList` стал ниже, но Product/review/entity reporting задачи остаются открытыми.

## 3. Метод проверки

Проверено:

- [data/entities.yaml](../../data/entities.yaml);
- content front matter в `content/**/*.md`;
- rendered HTML в `public/**/*.html` после `npm run build`;
- schema partials в `layouts/_partials/_schema`;
- breadcrumb helpers в `layouts/_partials/breadcrumbs.html`, `layouts/_partials/breadcrumb-label.html` и `layouts/_partials/_schema/breadcrumbs.html`;
- product JSON-LD partial [product.html](../../layouts/_partials/_schema/product.html);
- review roadmap [17-netlify-database-reviews.md](../deploy/17-netlify-database-reviews.md);
- документационная карта [01-documentation-map.md](../01-documentation-map.md).

Команды проверки:

```bash
npm run build
git diff --check
```

## 4. Снимок сгенерированного графа

После сборки:

| Метрика | Значение |
| --- | ---: |
| HTML files | `138` |
| Pages with JSON-LD | `116` |
| JSON-LD scripts | `116` |
| JSON parse errors | `0` |
| JSON-LD top-level nodes | `1962` |
| Duplicate `@id` внутри страницы | `0` |
| Empty `@id` | `0` |
| Broken internal Aerocool URL refs | `0` |
| BreadcrumbList nodes | `100` |
| Breadcrumb issues | `0` |
| Visible breadcrumb pages | `102` |
| JSON-LD на `contact-success` | `0` |
| JSON-LD на `search` | `0` |
| JSON-LD pages with `noindex` | `116` |

`noindex` ожидаем: `npm run build` использует `hugo --environment development`. Для production это остается gate, а не ошибка текущей сборки.

## 5. Типы узлов в JSON-LD

| Type | Count |
| --- | ---: |
| `AboutPage` | `2` |
| `Article` | `32` |
| `Brand` | `116` |
| `BreadcrumbList` | `100` |
| `CollectionPage` | `20` |
| `ContactPage` | `2` |
| `DefinedTerm` | `840` |
| `FAQPage` | `2` |
| `ImageObject` | `232` |
| `NewsArticle` | `18` |
| `Organization` | `232` |
| `Product` | `24` |
| `Thing` | `114` |
| `WebPage` | `112` |
| `WebSite` | `116` |

Вывод: graph расширился вместе с контентом, но остается тем же типом Content Knowledge Graph, который был зафиксирован после customer stories.

## 6. Реестр сущностей

| Метрика | Значение |
| --- | ---: |
| Total entities | `67` |
| Markupable entities | `65` |
| `confirmed` | `48` |
| `planned` | `17` |
| `do-not-markup` | `2` |
| Missing `current_jsonld_id` или `future_jsonld_id` у markupable entities | `0` |
| Missing `entity_home` у markupable entities | `0` |

Классы сущностей:

| Class | Count |
| --- | ---: |
| `ProductVariant` | `12` |
| `ProductGroup` | `8` |
| `Feature` | `8` |
| `UseCase` | `7` |
| `Material` | `5` |
| `Policy` | `5` |
| `Collection` | `4` |
| `ProductSeries` | `3` |
| `Mechanism` | `3` |
| Остальные классы | `12` |

Состояние корректное: все сущности, которые можно размечать, имеют стабильный `@id` через `current_jsonld_id` или `future_jsonld_id`, а также `entity_home`.

## 7. Front Matter и Entity Fields

| Метрика | Значение |
| --- | ---: |
| Content markdown files | `98` |
| Front matter parse errors | `0` |
| Missing `lastmod` | `0` |
| `schema_types` refs | `98` content files |
| `linkTitle` fields | `94` |
| `about_entities` refs | `288` |
| `mentions_entities` refs | `928` |
| Unique entity refs in `about`/`mentions` | `43` |
| Unknown entity refs | `0` |
| Non-confirmed refs in `about_entities` / `mentions_entities` | `0` |
| `product_group_id` refs | `24` |
| `product_group_id` status | `24 planned` |

Вывод: entity-поля заполнены безопасно. Массового добавления неподтвержденных сущностей не обнаружено.

## 8. Breadcrumbs, `linkTitle` и `BreadcrumbList`

Новые данные от `2026-05-19` важны для schema-слоя, потому что видимые breadcrumbs и JSON-LD `BreadcrumbList` теперь должны называть страницы одинаково.

Текущее состояние:

- visible breadcrumbs найдены на `102` rendered pages;
- `BreadcrumbList` nodes есть на `100` JSON-LD pages;
- `BreadcrumbList` position issues: `0`;
- видимый helper и schema helper используют [breadcrumb-label.html](../../layouts/_partials/breadcrumb-label.html);
- `breadcrumb-label.html` берет `.LinkTitle`, а если его нет, `.Title`.

Разница между `102` visible breadcrumb pages и `100` `BreadcrumbList` nodes ожидаема: служебные страницы вроде search/contact-success не должны получать JSON-LD, даже если видимая навигация на странице может существовать.

Вывод: текущая архитектура снижает риск schema drift между видимой навигацией и `BreadcrumbList`.

## 9. Связанная Schema-разметка

Что работает:

- `WebPage.about`: `112`;
- `WebPage.mentions`: `112`;
- `WebPage.mainEntity`: `96`;
- `Product.brand` указывает на global `Brand`;
- local organization `sameAs`: `0`;
- `sameAs` nodes: `232`;
- `sameAs` refs: `1160`;
- `additionalType` используется только для policy-like nodes.

`additionalType` counts:

| additionalType | Count |
| --- | ---: |
| `https://schema.org/MerchantReturnPolicy` | `28` |
| `https://schema.org/OfferShippingDetails` | `28` |
| `https://schema.org/WarrantyPromise` | `28` |

Вывод: структура связей остается правильной. Local Aerocool Ukraine не смешивается с global social profiles через `sameAs`; связь с глобальной сущностью идет через `parentOrganization` и `brand`.

## 10. Граф товаров

| Метрика | Значение |
| --- | ---: |
| Product nodes | `24` |
| Product front matter pages | `24` |
| Required operational product facts missing in front matter | `0` |
| Offer issues in rendered JSON-LD | `0` |
| `priceValidUntil` | `2027-12-31` на всех `24` Product nodes |
| Product nodes with nested `aggregateRating` | `24` |
| Product nodes with `review` | `0` |
| `review_target_id` in front matter | `0` |
| `reviews_enabled` in front matter | `0` |
| `data/generated/reviews.json` | отсутствует |
| Product nodes without `mpn` | `4` rendered pages |
| Product nodes without `gtin13` | `4` rendered pages |

Product/Offer facts стабильны: цена, валюта, наличие, URL, seller, delivery, return, payment, warranty и `priceValidUntil` есть в rendered JSON-LD.

Открытый product identifier gap остается прежним: `SKY 360` и `SKY Light` в обеих языковых версиях не имеют `mpn` и `gtin13`. Нужно бизнесово подтвердить, что официальных идентификаторов нет, или добавить их во front matter.

## 11. Ratings и Reviews

Текущее состояние не изменилось:

- `rating` есть в front matter всех `24` product pages;
- видимая строка рейтинга есть на всех `24` product pages;
- `Product.aggregateRating` выводится на всех `24` Product nodes;
- `Product.review` не выводится;
- `review_target_id` и `reviews_enabled` отсутствуют;
- `data/generated/reviews.json` отсутствует.

Это главный quality risk перед production. Документация уже зафиксировала целевую модель: `Netlify Database -> approved reviews -> data/generated/reviews.json -> visible reviews -> Product JSON-LD`.

До внедрения этой модели есть два допустимых решения:

1. Подтвердить рейтинги как реальные, внедрить approved reviews pipeline и переключить `Product.aggregateRating` на generated snapshot.
2. Убрать `rating` из product front matter и подавить `aggregateRating`, если источник нельзя подтвердить.

## 12. ProductGroup и варианты

Текущее состояние:

- `product_group_id`: `24`;
- все `product_group_id`: `planned`;
- `ProductGroup` nodes: `0`;
- `isVariantOf`: `0`;
- `inProductGroupWithID`: `0`.

Это правильное поведение. `ProductGroup` нельзя включать в rendered graph, пока:

1. пользователь не видит понятную навигацию вариантов;
2. соответствующие ProductGroup entities не переведены из `planned` в `confirmed`.

## 13. `additionalProperty` для Product Specs

Текущее состояние:

- product pages имеют видимые характеристики;
- `additionalProperty` на Product nodes: `0`;
- mapping характеристик в `PropertyValue` еще не спроектирован.

Это не синтаксическая ошибка. Но это следующий сильный P1/P2 шаг после ratings/reviews и ProductGroup.

## 14. ImageObject и Image License Metadata

| Метрика | Значение |
| --- | ---: |
| `ImageObject` nodes | `232` |
| Image license nodes | `0` |

Базовая image schema работает. License metadata не добавлять без подтвержденных прав, license page и юридически корректных формулировок.

## 15. Управление документацией

В `docs/` сейчас `53` markdown-файла, все с глобальным числовым префиксом. Ненумерованных файлов внутри `docs/` не найдено.

Карта документации, `README.md` и `AGENTS.md` должны отражать диапазон `01-53`.

Это не влияет напрямую на JSON-LD, но важно для поддержки schema/entity процесса: если документация не ведет к актуальному audit-снимку, команда быстро теряет source of truth.

## 16. Актуальные проблемы

### P0. контроль перед Production

Все `116` страниц с JSON-LD имеют `noindex,nofollow`, потому что сборка идет в `development`. Перед production нужно переключить окружение, проверить `index,follow`, sitemap, robots, canonical, hreflang, headers, кастомную 404 и published URL.

### P0/P1. источник правды для рейтингов и отзывов

`Product.aggregateRating` выводится из legacy `rating` front matter, а целевой approved reviews pipeline еще не реализован. Это главный structured data risk.

### P1. отчет об эффективности сущностей

Нужен регулярный отчет: entity ID, entity home, pages about, pages mentions, rendered node, GSC signal, AI citation signal, business action signal.

### P1. ProductGroup и Visible Variant Navigation

`ProductGroup` подготовлен, но не активирован. Нужна видимая навигация вариантов и перевод подтвержденных ProductGroup entities в `confirmed`.

### P1/P2. Product Identifiers для SKY

`SKY 360` и `SKY Light` не имеют `mpn` и `gtin13`. Нужно подтвердить, это осознанное отсутствие или незаполненные данные.

### P1/P2. `additionalProperty`

Видимые характеристики есть, но еще не размечены как `PropertyValue`.

### P2. базовые метрики поиска с AI после Production

После индексации нужно измерить AI Search visibility и hallucination risk по бренду, локальной организации, сериям, моделям, материалам, механизмам и policies.

### P2. чек-лист Schema для миграции и ребрендинга

Перед любыми изменениями URL, структуры каталога, дизайна или production-переходом нужен отдельный schema migration checklist.

### P2. метаданные лицензии изображений

Внедрять только после подтверждения прав и license page.

### P3. агентские действия, MCP, NLWeb и `llms.txt`

Не внедрять сейчас. Вернуться после production, ratings/reviews, ProductGroup, entity reporting и появления реального бизнес-сценария.

## 17. Рекомендуемая очередь работ

1. Закрыть production gate.
2. Закрыть ratings/reviews: approved reviews pipeline или удаление `aggregateRating`.
3. Подтвердить MPN/GTIN для `SKY 360` и `SKY Light`.
4. Добавить visible variant navigation.
5. Перевести подтвержденные ProductGroup entities в `confirmed` и включить `ProductGroup` / `isVariantOf`.
6. Спроектировать `additionalProperty` из видимых характеристик.
7. Завести `Entity Performance Report`.
8. После production собрать GSC, Product rich results, AI citations и entity-level baseline.
9. Добавить schema migration checklist в production/release process.
10. Вернуться к agentic actions только после появления реальной бизнес-задачи.

## 18. Итоговая оценка

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Техническая валидность JSON-LD | `9.7 / 10` | JSON parse errors, duplicate IDs и broken refs не найдены |
| Entity Registry | `9.2 / 10` | Реестр стабилен; нужен performance/reporting layer |
| Breadcrumbs / `BreadcrumbList` consistency | `9.3 / 10` | Общий helper через `linkTitle`; position issues нет |
| Connected Schema | `9.0 / 10` | `about`, `mentions`, policy nodes, stable IDs и `sameAs` работают |
| Product structured data | `8.0 / 10` | Offer facts сильные; ratings/reviews, ProductGroup и SKY identifiers открыты |
| AI Search readiness | `8.4 / 10` | База сильная; baseline возможен только после production |
| Documentation governance | `9.6 / 10` | Нумерация, карта, `README.md` и `AGENTS.md` синхронизированы до `01-53` |
| Agentic Web readiness | `7.5 / 10` | Верно удержано в P3 |

Общая оценка: `8.6 / 10`.

Главный вывод: проект не нуждается в добавлении новых schema-типов прямо сейчас. Нужны production gate, review source of truth, ProductGroup через видимую навигацию, `additionalProperty` и измеримый entity reporting.
