# Полный аудит JSON-LD и Entity Graph после Customer Stories Schema App

Дата аудита: 2026-05-18.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Контекст: аудит выполнен после анализа `21` Schema App customer stories/case studies. Базовый разбор источников зафиксирован в [59-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](59-2026-05-18-schemaapp-customer-stories-case-studies-audit.md).

Этот документ отвечает на практический вопрос: что изменилось в оценке JSON-LD, Entity Registry, Product graph и AI Search readiness проекта после новых данных из реальных внедрений Schema App.

## 1. Главный вывод

Новые customer stories не требуют срочно добавлять новые schema-типы. Они подтверждают, что текущий технический фундамент выбран правильно:

- единый JSON-LD graph через Hugo partials;
- стабильные `@id`;
- Entity Registry в [data/entities.yaml](../../data/entities.yaml);
- `about_entities` и `mentions_entities`;
- Product facts из product front matter;
- `ProductGroup` только после видимой навигации вариантов;
- отказ от agentic actions без реального бизнес-процесса.

Реальное изменение после customer stories: проект нужно оценивать строже как управляемую систему знаний, а не только как набор валидной schema-разметки.

Оценка после аудита: `8.6 / 10`.

Техническая часть сильная: JSON-LD валиден, внутренние ссылки в graph не биты, `sameAs` разделен корректно, Entity Registry работает.

Главные ограничения: production gate, источник ratings/reviews, отсутствие `Entity Performance Report`, staged `ProductGroup`, отсутствие `additionalProperty` для product specs и отсутствие post-production AI Search baseline.

## 2. Что реально нового после Customer Stories

Customer stories усилили несколько задач, которые раньше были roadmap, а теперь стали частью production-readiness:

1. Нужен регулярный `Entity Performance Report`, а не только разовый аудит JSON-LD.
2. `Product.aggregateRating` должен быть связан с реальными, видимыми и approved отзывами, иначе product rich result benefit превращается в quality risk.
3. Для AI hallucination defense важны authoritative entity facts: бренд, локальная организация, delivery, warranty, return, payment, product facts.
4. При production-переходе, redesign, миграции URL или изменении каталога schema graph должен проверяться отдельно.
5. Product visibility зависит не от количества schema-типов, а от качества Product/Offer facts, identifiers, variants и видимого контента.

## 3. Метод проверки

Проверено:

- [data/entities.yaml](../../data/entities.yaml);
- content front matter в `content/**/*.md`;
- schema partials в `layouts/_partials/_schema`;
- JSON-LD partial [jsonld.html](../../layouts/_partials/_seo/jsonld.html);
- rendered HTML в `public/**/*.html` после `npm run build`;
- текущие SEO/entity документы в `docs/seo`;
- review-процесс в [17-netlify-database-reviews.md](../deploy/17-netlify-database-reviews.md);
- предыдущие full audits в `docs/audits`.

Команды проверки:

```bash
npm run build
git diff --check
```

## 4. Снимок сгенерированного графа

После сборки:

| Метрика | Значение |
| --- | ---: |
| HTML files | `108` |
| Pages with JSON-LD | `86` |
| JSON-LD scripts | `86` |
| JSON parse errors | `0` |
| JSON-LD top-level nodes | `1390` |
| Duplicate `@id` внутри страницы | `0` |
| Empty `@id` | `0` |
| Broken internal Aerocool URL refs | `0` |
| Breadcrumb issues | `0` |
| JSON-LD на `contact-success` | `0` |
| JSON-LD на `search` | `0` |
| JSON-LD pages with `noindex` | `86` |

`noindex` сейчас ожидаем, потому что `npm run build` и `netlify.toml` используют `hugo --environment development`. Для production это остается отдельный gate.

## 5. Типы узлов в JSON-LD

| Type | Count |
| --- | ---: |
| `AboutPage` | `2` |
| `Article` | `14` |
| `Brand` | `86` |
| `BreadcrumbList` | `74` |
| `CollectionPage` | `16` |
| `ContactPage` | `2` |
| `DefinedTerm` | `530` |
| `FAQPage` | `2` |
| `ImageObject` | `172` |
| `NewsArticle` | `14` |
| `Organization` | `172` |
| `Product` | `24` |
| `Thing` | `114` |
| `WebPage` | `82` |
| `WebSite` | `86` |

Вывод: graph уже выглядит как начальный Content Knowledge Graph. `DefinedTerm` и `Thing` nodes создаются из Entity Registry для материалов, механизмов, сценариев, тем и политик.

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

Состояние хорошее: у сущностей, которые можно размечать, есть стабильный `@id` через `current_jsonld_id` или `future_jsonld_id`, а также `entity_home`.

## 7. Front Matter и Entity Fields

| Метрика | Значение |
| --- | ---: |
| Markdown content files | `76` |
| Front matter parse errors | `0` |
| Missing `lastmod` | `0` |
| `about_entities` refs | `234` |
| `mentions_entities` refs | `632` |
| Unique entity refs in `about`/`mentions` | `43` |
| Unknown entity refs | `0` |
| Non-confirmed refs in `about_entities` / `mentions_entities` | `0` |
| `product_group_id` refs | `24` |
| `product_group_id` status | `24 planned` |

Вывод: правила Entity Registry соблюдены. Сильные `about` и `mentions` используют только `confirmed` сущности. `ProductGroup` подготовлен как staged data, но не выводится в JSON-LD.

## 8. Связанная Schema-разметка

Что работает хорошо:

- `WebPage.about` есть на `82` WebPage nodes;
- `WebPage.mentions` есть на `82` WebPage nodes;
- `WebPage.mainEntity` есть на `70` WebPage nodes;
- `Product.brand` указывает на global `Brand`;
- local organization не получает global social `sameAs`;
- global social profiles закреплены за global `Brand` и global `Organization`;
- `sameAs` refs: `860`;
- local organization `sameAs`: `0`;
- `additionalType` используется только для policy-like nodes.

`additionalType` counts:

| additionalType | Count |
| --- | ---: |
| `https://schema.org/MerchantReturnPolicy` | `28` |
| `https://schema.org/OfferShippingDetails` | `28` |
| `https://schema.org/WarrantyPromise` | `28` |

Вывод: после support-статей и customer stories структура `sameAs`, `about`, `mentions`, `additionalType` и entity refs выглядит корректно.

## 9. Граф товаров

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

Operational product facts заполнены: цена, валюта, наличие, URL, seller, delivery, return, payment, warranty и `priceValidUntil` выводятся в JSON-LD.

Отдельное замечание: `SKY 360` и `SKY Light` в обеих языковых версиях сейчас не имеют `mpn` и `gtin13`. Это не синтаксическая ошибка, но для product rich results и AI Search лучше подтвердить бизнесово: если официальных MPN/GTIN нет, зафиксировать это как осознанное исключение; если есть, добавить в front matter.

## 10. Главный Product риск: Ratings и Reviews

Текущее состояние:

- `rating` есть в front matter всех `24` product pages;
- видимая строка рейтинга есть на всех `24` product pages;
- rendered Product JSON-LD содержит nested `aggregateRating` на всех `24` product nodes;
- `Product.review` не выводится;
- `review_target_id` и `reviews_enabled` отсутствуют;
- `data/generated/reviews.json` отсутствует.

Это важнее после customer stories. InSinkErator, Home Hardware, Avid и другие e-commerce кейсы показывают, что product rich result качество зависит от доверенного product data layer. Для Aerocool текущий слой рейтингов видим пользователю, но пока не связан с целевым approved reviews pipeline из Netlify Database.

Правильное production-решение:

1. Если рейтинги реальные и могут быть подтверждены, внедрить review pipeline: Netlify Database -> approved reviews -> `data/generated/reviews.json` -> visible review block -> `Product.aggregateRating`.
2. Если рейтинги временные, маркетинговые или без подтверждаемого источника, убрать `rating` из product front matter и подавить `aggregateRating`.
3. Не добавлять `Product.review`, пока нет реальных approved отзывов, видимых на той же странице.

## 11. ProductGroup и варианты

Текущее состояние:

- `product_group_id` есть в `24` product front matter files;
- все `product_group_id` указывают на `planned` ProductGroup entities;
- `ProductGroup` nodes: `0`;
- `isVariantOf`: `0`;
- `inProductGroupWithID`: `0`.

Это корректно. `ProductGroup` не должен появиться в rendered graph, пока пользователь не видит явную навигацию вариантов и пока соответствующие ProductGroup entities не переведены в `confirmed`.

После customer stories это становится P1, потому что e-commerce кейсы показывают важность управляемой продуктовой модели, вариантов и consistent product visibility.

## 12. `additionalProperty` для характеристик

Текущее состояние:

- Product pages содержат видимые характеристики: материал, механизм, регулировки, база, ролики, вес, подлокотники;
- Product JSON-LD пока не содержит `additionalProperty`;
- в Entity Registry уже есть кандидаты для будущего mapping: материалы, механизмы, 7D/8D/11D, support, policies.

Это не ошибка. Но после customer stories `additionalProperty` становится важным P1/P2 усилением для product clarity, AI Search и product comparison.

Правило внедрения: сначала стабилизировать видимый блок характеристик и front matter mapping, затем добавлять `PropertyValue` в Product JSON-LD.

## 13. AI Search и Hallucination Defense

Что уже помогает:

- global brand, global organization и local Aerocool Ukraine разделены;
- local organization связан через `parentOrganization` и `brand`, а не через ошибочный local `sameAs`;
- `about` и `mentions` связывают страницы с сущностями;
- delivery, payment, return, warranty и price validity имеют policy nodes;
- Product facts выводятся централизованно из front matter.

Что еще не хватает:

- post-production prompt-аудит по AI Search;
- baseline по AI citations;
- проверка AI-ответов на ошибки о бренде, официальности, доставке, гарантии, наличии и товарах;
- регулярная фиксация entity visibility.

Customer story Wells Fargo усиливает этот блок: structured data полезна не только для rich results, но и для снижения ошибок в AI-ответах.

## 14. ImageObject и Image License Metadata

| Метрика | Значение |
| --- | ---: |
| `ImageObject` nodes | `172` |
| Image license nodes | `0` |

Базовая image schema есть. Image license metadata пока правильно не внедрять без подтвержденных прав, license page, owner и юридически корректных формулировок.

## 15. Актуальные проблемы

### P0. контроль перед Production

Все `86` страниц с JSON-LD сейчас имеют `noindex,nofollow`, потому что сборка идет в `development`. Перед production нужно переключить окружение, проверить `index,follow`, sitemap, robots, canonical, hreflang, headers, кастомную 404 и опубликованный URL.

### P0/P1. источник правды для рейтингов и отзывов

`Product.aggregateRating` выводится из legacy `rating` front matter на всех `24` товарах. При этом целевой approved reviews pipeline еще не внедрен.

Это главный quality risk перед production. Его нужно закрыть бизнесово и технически: либо подтвердить рейтинги и связать их с approved reviews, либо убрать `aggregateRating`.

### P1. отчет об эффективности сущностей

Нужен регулярный отчет:

- entity ID;
- entity home;
- где сущность стоит в `about`;
- где сущность стоит в `mentions`;
- есть ли rendered node;
- какие URL дают GSC/AI citation/business signal;
- где есть entity gaps.

Без этого graph валиден, но управляется вручную и не доказывает бизнес-эффект.

### P1. ProductGroup и Visible Variant Navigation

`ProductGroup` подготовлен, но не активирован. Нужно добавить видимую навигацию вариантов, перевести подтвержденные группы в `confirmed` и только потом включать `isVariantOf`.

### P1/P2. Product Identifiers для SKY

`SKY 360` и `SKY Light` не имеют `mpn` и `gtin13` в rendered Product JSON-LD. Нужно подтвердить, это реальное отсутствие официальных идентификаторов или незаполненные product facts.

### P1/P2. `additionalProperty`

Видимые характеристики уже есть, но еще не размечены как `PropertyValue`. Это следующий логичный шаг после ratings и ProductGroup.

### P2. базовые метрики поиска с AI после Production

После индексации нужно измерить AI Search visibility: бренд, локальная организация, серии, модели, материалы, механизмы, delivery/warranty/return.

### P2. чек-лист Schema для миграции и ребрендинга

Перед любыми изменениями URL, структуры каталога, дизайна или production-переходом нужен отдельный schema migration checklist: `@id`, canonical, sitemap, breadcrumbs, redirects, hreflang, Product/Offer, entity homes.

### P2. метаданные лицензии изображений

Внедрять только после юридического подтверждения прав и страницы условий.

### P2. ежеквартальная проверка `sameAs`

Официальные social URLs нужно проверять регулярно. Сейчас модель корректная: global social profiles принадлежат global Brand/Organization, local Aerocool Ukraine не использует global social `sameAs`.

### P3. агентские действия, MCP, NLWeb и `llms.txt`

Не внедрять сейчас. Вернуться после production, ratings/reviews, ProductGroup, entity reporting и появления реального бизнес-сценария.

## 16. Что не делать

- Не добавлять новые schema-типы ради количества.
- Не оставлять `aggregateRating`, если источник рейтинга нельзя объяснить пользователю.
- Не добавлять `Product.review` без реальных approved отзывов, видимых на той же странице.
- Не переводить `ProductGroup` в `confirmed` без видимой навигации вариантов.
- Не использовать `sameAs` для маркетплейсов, обзоров, похожих страниц или неофициальных профилей.
- Не добавлять `BuyAction`, `ScheduleAction`, MCP/NLWeb или agentic commerce без реальных endpoints и владельца процесса.
- Не добавлять image license metadata без подтвержденных прав.

## 17. Рекомендуемая очередь работ

1. Закрыть production gate: production environment, `index,follow`, sitemap, robots, canonical, hreflang, headers, 404, PageSpeed/Google checks на published URL.
2. Закрыть ratings/reviews: внедрить approved reviews pipeline или убрать `aggregateRating`.
3. Подтвердить MPN/GTIN для `SKY 360` и `SKY Light`.
4. Добавить visible variant navigation на product/series pages.
5. Перевести подтвержденные ProductGroup entities в `confirmed` и включить `ProductGroup` / `isVariantOf`.
6. Спроектировать `additionalProperty` из видимых характеристик.
7. Завести `Entity Performance Report` и `Graph Inventory`.
8. После production собрать baseline по GSC, Product rich results, AI citations, AI referral traffic и entity-level performance.
9. Добавить migration/rebrand schema checklist в production процесс.
10. Вернуться к agentic actions, MCP/NLWeb или `llms.txt` только после появления реальной бизнес-задачи.

## 18. Итоговая оценка

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Техническая валидность JSON-LD | `9.7 / 10` | JSON parse errors, duplicate IDs и broken internal refs не найдены |
| Entity Registry | `9.2 / 10` | Реестр сильный; нужен регулярный performance/reporting слой |
| Connected Schema | `9.0 / 10` | `about`, `mentions`, policy nodes, stable IDs и `sameAs` работают |
| Product structured data | `8.0 / 10` | Offer facts сильные; ratings/reviews, ProductGroup и SKY identifiers требуют решения |
| AI Search readiness | `8.4 / 10` | Хорошая база; нужен post-production prompt/citation baseline |
| Enterprise governance | `8.0 / 10` | Документация сильная; не хватает регулярных отчетов и owner cadence |
| Agentic Web readiness | `7.5 / 10` | Верно удержано в P3; actions пока преждевременны |

Общая оценка: `8.6 / 10`.

Проект находится в сильном техническом состоянии. После customer stories главный фокус не в том, чтобы добавить больше JSON-LD, а в том, чтобы сделать graph измеримым, доказуемым и безопасным для production.
