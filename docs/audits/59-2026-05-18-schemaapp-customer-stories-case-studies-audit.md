# Анализ Schema App Customer Stories и Case Studies

Дата аудита: 2026-05-18.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Источник: 21 customer story URL из списка пользователя. Все 21 страницы были открыты, прочитаны и сопоставлены с текущим состоянием проекта `Aerocool Ukraine`: JSON-LD graph, Entity Registry, Product schema, ProductGroup roadmap, AI Search readiness и schema governance.

Важно: это не рекламный вывод в пользу Schema App как сервиса. Для проекта важны не SaaS-части, а повторяющиеся паттерны из реальных внедрений: entity linking, source of truth, product rich result quality, schema drift control, migration safety, entity-level reporting и AI Search monitoring.

## 1. Проверка полноты списка

Финальный список пользователя содержит `21` URL. Все `21` URL прочитаны.

| # | URL | Статус | Практическая значимость для Aerocool |
| ---: | --- | --- | --- |
| 1 | [Henry Ford Health](https://www.schemaapp.com/customer-stories/how-henry-ford-health-outperforms-competitors-in-ai-search/) | прочитана | Очень высокая: Entity Hub, entity coverage, AI visibility |
| 2 | [MasterControl](https://www.schemaapp.com/customer-stories/how-mastercontrol-built-a-resilient-foundation-for-ai-search-with-schema-app/) | прочитана | Очень высокая: AI Search foundation, semantic schema, measurable visibility |
| 3 | [Wells Fargo](https://www.schemaapp.com/customer-stories/how-wells-fargo-used-schema-markup-to-solve-ai-search-hallucinations/) | прочитана | Очень высокая: борьба с AI hallucinations через authoritative data |
| 4 | [InSinkErator](https://www.schemaapp.com/customer-stories/how-insinkerator-took-control-of-its-brand-in-search-and-boosted-product-visibility/) | прочитана | Максимальная: Product visibility, source of truth, product facts, brand control |
| 5 | [Brightview Senior Living](https://www.schemaapp.com/customer-stories/how-brightview-senior-living-used-entity-linking-to-win-local-search-futureproof-seo/) | прочитана | Высокая: entity disambiguation, location/entity clarity |
| 6 | [SMART Technologies](https://www.schemaapp.com/customer-stories/why-smart-technologies-came-to-schema-app-for-tech-and-stayed-for-partnership/) | прочитана | Высокая: site restructure, entity linking, rich result performance |
| 7 | [Marshfield Clinic](https://www.schemaapp.com/customer-stories/how-marshfield-clinic-leveraged-schema-markup-to-improve-search-traffic-prepare-for-ai-search/) | прочитана | Средняя/высокая: entity linking, AI Search preparation; healthcare-specific parts not applicable |
| 8 | [Gusto](https://www.schemaapp.com/customer-stories/gusto/) | прочитана | Высокая: Content Knowledge Graph, semantic schema, structured content architecture |
| 9 | [Sharp Healthcare Site Migration](https://www.schemaapp.com/customer-stories/sharp-healthcare-site-migration/) | прочитана | Средняя/высокая: migration safety, content model, schema continuity |
| 10 | [Spectrum Group Online](https://www.schemaapp.com/customer-stories/spectrum-group-online/) | прочитана | Низкая/средняя: agency process, training and reporting |
| 11 | [Avid Technology](https://www.schemaapp.com/customer-stories/avid-technology/) | прочитана | Высокая: complex Product/Offer modeling, pricing, subscriptions |
| 12 | [Baptist Health](https://www.schemaapp.com/customer-stories/baptist-health/) | прочитана | Средняя: scale and drift control; healthcare-specific schema not applicable |
| 13 | [Excel](https://www.schemaapp.com/customer-stories/excel/) | прочитана | Высокая: connected schema, author/trust layer, competitive gap audit |
| 14 | [Connection Model](https://www.schemaapp.com/customer-stories/connection-model/) | прочитана | Низкая/средняя: implementation process and client reporting |
| 15 | [CAPREIT](https://www.schemaapp.com/customer-stories/canadian-apartment-properties-reit-capreit/) | прочитана | Высокая: product-like listings, stale availability, bilingual/format issues |
| 16 | [Sonova Audiological Care](https://www.schemaapp.com/customer-stories/sonova-audiological-care/) | прочитана | Высокая: multilingual rollout, FAQ/Product/HowTo performance |
| 17 | [SAP](https://www.schemaapp.com/customer-stories/sap/) | прочитана | Высокая: primary entity/type governance at enterprise scale |
| 18 | [KEEN Footwear](https://www.schemaapp.com/customer-stories/keen-footwear/) | прочитана | Высокая: e-commerce templates, entity linking, multi-site consistency |
| 19 | [Home Hardware](https://www.schemaapp.com/customer-stories/home-hardware/) | прочитана | Высокая: Product rich results, product data scale, dynamic markup |
| 20 | [Sharp HealthCare](https://www.schemaapp.com/customer-stories/sharp-healthcare/) | прочитана | Средняя: rich-result evidence; healthcare-specific schema not applicable |
| 21 | [AdventHealth](https://www.schemaapp.com/customer-stories/adventhealth/) | прочитана | Средняя/высокая: rebrand/migration graph continuity |

Вывод по полноте: среди URL из списка нет непрочитанных или пропущенных страниц.

## 2. Главный вывод для проекта

Customer stories подтверждают текущую стратегию Aerocool:

- не добавлять schema ради количества;
- строить связанный graph вокруг сущностей;
- держать product facts в одном источнике правды;
- измерять не только validator pass, но и visibility, CTR, qualified traffic, AI citations и business actions;
- не внедрять agentic actions без реального бизнес-процесса;
- не переводить ProductGroup в JSON-LD без видимой variant navigation;
- не оставлять ratings без понятного источника.

Реально новое после этих историй:

1. Нужен не просто audit JSON-LD, а регулярный `Entity Performance Report`.
2. Для product pages важнее всего согласованность `price`, `availability`, ratings/reviews, product identifiers, visible content и JSON-LD.
3. AI Search hallucinations лучше снижать через authoritative entity facts, а не через длинные маркетинговые тексты.
4. При любых redesign, migration, rebrand или URL changes schema graph должен быть отдельной частью migration checklist.
5. Case studies сильнее подтверждают необходимость operational owner: schema, content и product data должны поддерживаться как процесс.

## 3. Анализ каждой истории

### 1. Henry Ford Health

Источник: [Henry Ford Health customer story](https://www.schemaapp.com/customer-stories/how-henry-ford-health-outperforms-competitors-in-ai-search/).

Главная идея: организация использовала entity-based semantic content strategy и Entity Hub, чтобы усилить AI Search visibility и лучше связывать услуги, условия, локации и авторитетные источники.

Для Aerocool полезно:

- перейти от page-only SEO к entity coverage;
- сделать отчеты по сущностям: какие сущности имеют entity home, где они появляются как `about`, где как `mentions`;
- после production отслеживать не только URL, но и сущности: `Mesh`, `Synchronous Tilt`, `home office`, `gaming-chair`, серии SKY/WING/XTAL;
- не ждать, что AI Search сам правильно поймет бренд и товарную структуру без явного graph.

Неприменимо напрямую: healthcare service schema и medical entity modeling.

### 2. MasterControl

Источник: [MasterControl customer story](https://www.schemaapp.com/customer-stories/how-mastercontrol-built-a-resilient-foundation-for-ai-search-with-schema-app/).

Главная идея: семантическая schema и связанный graph рассматриваются как foundation для AI Search, а не только как rich result tactic.

Для Aerocool полезно:

- текущий Entity Registry нужно считать data foundation, а не разовой SEO-разметкой;
- `about_entities` и `mentions_entities` должны использоваться как управляемый слой знаний;
- после production нужно сравнивать не только branded queries, но и topic/entity visibility;
- AI Search readiness начинается с чистых product/entity facts.

Что добавить в процесс: регулярный baseline по entity visibility и AI citation ownership.

### 3. Wells Fargo

Источник: [Wells Fargo customer story](https://www.schemaapp.com/customer-stories/how-wells-fargo-used-schema-markup-to-solve-ai-search-hallucinations/).

Главная идея: structured data помогает снижать AI hallucinations, когда AI-системы неверно описывают организацию, услуги или локации.

Для Aerocool полезно:

- local organization facts должны быть authoritative: адрес, телефон, email, часы, связь с global Aerocool;
- sameAs не должен смешивать local и global entity;
- FAQ, contacts и product facts должны быть согласованы с JSON-LD;
- AI prompt-аудит должен проверять не только “цитирует ли Aerocool”, но и “правильно ли описывает Aerocool Ukraine”.

Практический вывод: после production нужно проверять AI-ответы на ошибки о бренде, официальности, доставке, гарантии и доступности товаров.

### 4. InSinkErator

Источник: [InSinkErator customer story](https://www.schemaapp.com/customer-stories/how-insinkerator-took-control-of-its-brand-in-search-and-boosted-product-visibility/).

Главная идея: для product visibility критичны согласованные product facts, dynamic markup, контроль brand entity и устранение schema drift между CMS, продуктами и schema.

Для Aerocool это самая применимая customer story:

- product front matter как source of truth подтвержден правильно;
- цена, наличие, SKU, MPN, GTIN, рейтинг, доставка и возврат должны обновляться операционно;
- Product rich results могут дать эффект только если данные видимы и надежны;
- если брендовая структура меняется, `parentOrganization`, `brand`, `sameAs` и entity IDs должны быть пересмотрены.

Практический вывод: текущий P0 по `aggregateRating` нужно закрыть до production, потому что product/review visibility полезна только при реальных данных.

### 5. Brightview Senior Living

Источник: [Brightview Senior Living customer story](https://www.schemaapp.com/customer-stories/how-brightview-senior-living-used-entity-linking-to-win-local-search-futureproof-seo/).

Главная идея: entity linking помогает поиску и AI отличать похожие сущности, особенно когда есть неоднозначность локаций или брендов.

Для Aerocool полезно:

- различать global `Aerocool`, global organization и local `Aerocool Ukraine`;
- закреплять широкие сущности `gaming-chair`, `office-chair`, `computer-chair`, `home-office` через собственные entity homes;
- не использовать `sameAs` для “похожих” сущностей;
- держать `parentOrganization` и `brand` как точные отношения.

Неприменимо напрямую: multi-location senior living schema.

### 6. SMART Technologies

Источник: [SMART Technologies customer story](https://www.schemaapp.com/customer-stories/why-smart-technologies-came-to-schema-app-for-tech-and-stayed-for-partnership/).

Главная идея: schema должна выдерживать redesign, site restructuring и разные page templates, а entity linking может давать измеримое усиление.

Для Aerocool полезно:

- при изменении структуры каталога или URL schema должна проверяться отдельно;
- Product, CollectionPage, Article и FAQ должны иметь устойчивые `@id`;
- entity linking нужно мерить как отдельный слой, а не растворять в общем organic traffic;
- текущий отказ от широких правок темы и выбор локальных Hugo partials правильный.

Практический вывод: при будущей переработке каталога добавить отдельный schema migration checklist.

### 7. Marshfield Clinic

Источник: [Marshfield Clinic customer story](https://www.schemaapp.com/customer-stories/how-marshfield-clinic-leveraged-schema-markup-to-improve-search-traffic-prepare-for-ai-search/).

Главная идея: entity linking и structured data повышают готовность к AI Search, особенно когда сайт содержит много сущностей и страниц.

Для Aerocool полезно:

- entity linking должен быть масштабируемым и проверяемым;
- performance нужно смотреть по типам страниц;
- FAQ/Review/Local schema дают пользу только при реальном видимом контенте.

Неприменимо напрямую: physician, medical organization и healthcare rich results.

### 8. Gusto

Источник: [Gusto customer story](https://www.schemaapp.com/customer-stories/gusto/).

Главная идея: Content Knowledge Graph строится через semantic schema, связанные сущности и управляемую архитектуру контента.

Для Aerocool полезно:

- текущий `data/entities.yaml` должен развиваться как Content Knowledge Graph seed;
- article, news, product и series pages должны поддерживать общую entity map;
- schema помогает не только Google, но и внутренней аналитике контента;
- нужна регулярная проверка entity gaps.

Практический вывод: добавить `Entity Coverage Report` как регулярный audit-output.

### 9. Миграция сайта Sharp Healthcare

Источник: [Sharp Healthcare site migration customer story](https://www.schemaapp.com/customer-stories/sharp-healthcare-site-migration/).

Главная идея: schema должна быть частью site migration, иначе graph, rich result eligibility и entity continuity могут просесть после переезда.

Для Aerocool полезно:

- если будет переход на production URL, redesign или изменение permalink, schema graph проверять отдельно;
- `@id` не менять без причины;
- старые и новые URL должны быть сопоставлены;
- `sitemap`, canonical, hreflang, breadcrumb и JSON-LD должны проверяться вместе.

Неприменимо напрямую: healthcare schema types.

### 10. Spectrum Group Online

Источник: [Spectrum Group Online customer story](https://www.schemaapp.com/customer-stories/spectrum-group-online/).

Главная идея: schema management требует процесса, знаний и отчетности, а не только технического внедрения.

Для Aerocool полезно:

- документация должна объяснять правила новичку;
- schema backlog должен быть связан с content backlog;
- изменения нужно проверять через build, rendered HTML и rich result tools;
- владелец product facts должен быть известен.

Практический вывод: текущая русскоязычная документация и audit-слой проекта нужны не “для красоты”, а как часть governance.

### 11. Avid Technology

Источник: [Avid Technology customer story](https://www.schemaapp.com/customer-stories/avid-technology/).

Главная идея: сложные Product/Offer сценарии требуют точного моделирования цены, вариантов и коммерческих условий.

Для Aerocool полезно:

- Product/Offer schema должна быть осторожной при цене, наличии и вариантах;
- если появятся скидки, подписки, bundles или разные seller scenarios, текущий Product partial нужно расширять осознанно;
- `priceSpecification` и `Offer` должны оставаться синхронными с видимым блоком покупки;
- Product rich results ценны, но только на надежных данных.

Практический вывод: до усложнения коммерческой модели держать текущий Product schema простым и проверяемым.

### 12. Baptist Health

Источник: [Baptist Health customer story](https://www.schemaapp.com/customer-stories/baptist-health/).

Главная идея: на большом сайте schema drift появляется быстро, если нет динамического процесса и QA.

Для Aerocool полезно:

- даже небольшой каталог может получить schema drift, если цены, наличие, гарантия и рейтинг меняются вручную;
- при добавлении новых товаров нужны одинаковые front matter fields;
- FAQ и reviews нельзя размечать без стабильного видимого контента;
- build-аудит должен оставаться обязательным после schema/content edits.

Неприменимо напрямую: healthcare-specific content models.

### 13. Excel

Источник: [Excel customer story](https://www.schemaapp.com/customer-stories/excel/).

Главная идея: connected schema, Linked Entity Recognition, author/trust layer и competitive analysis могут усиливать экспертность и органическую видимость.

Для Aerocool полезно:

- entity linking можно использовать для gap-аудита против конкурентов;
- author/reviewer layer не добавлять фиктивно, но при появлении реальной редакционной модели его стоит описать;
- schema performance нужно сравнивать по rich result types и entity clusters;
- если на странице есть review/rating, источник должен быть видимым.

Практический вывод: конкурентный schema audit для украинских e-commerce и брендовых сайтов стоит добавить как P2.

### 14. Connection Model

Источник: [Connection Model customer story](https://www.schemaapp.com/customer-stories/connection-model/).

Главная идея: агентства выигрывают, когда schema implementation повторяемый, объяснимый и измеримый.

Для Aerocool полезно:

- шаблоны Hugo уже дают повторяемость;
- документация должна объяснять, где добавлять поля и как проверять результат;
- нельзя полагаться только на plugin-like automation без понимания entity meaning.

Практическая значимость ниже, чем у e-commerce и AI Search историй.

### 15. CAPREIT

Источник: [CAPREIT customer story](https://www.schemaapp.com/customer-stories/canadian-apartment-properties-reit-capreit/).

Главная идея: product-like listings могут терять rich results из-за stale availability, неправильного price format или несоответствия видимому контенту.

Для Aerocool полезно:

- price format и currency должны быть стабильными;
- availability должен соответствовать реальному состоянию;
- bilingual pages должны иметь одинаковые product facts;
- schema drift по commercial facts может прямо ломать eligibility.

Практический вывод: текущий front matter source of truth правильный, но нужен регулярный процесс обновления.

### 16. Sonova Audiological Care

Источник: [Sonova Audiological Care customer story](https://www.schemaapp.com/customer-stories/sonova-audiological-care/).

Главная идея: multilingual/multi-site structured data требует единых шаблонов и локализованных фактов.

Для Aerocool полезно:

- украинская и русская версии должны иметь одинаковые product facts;
- `inLanguage`, canonical, hreflang и localized URL должны проверяться вместе;
- FAQ/Product/HowTo-like content полезен только при реальном видимом контенте;
- schema rollout должен быть шаблонным, но с локализационной проверкой.

Практический вывод: bilingual schema consistency audit нужно оставить в регулярной проверке.

### 17. SAP

Источник: [SAP customer story](https://www.schemaapp.com/customer-stories/sap/).

Главная идея: на большом сайте главная проблема часто не отсутствие schema, а неправильный type, неясная primary entity и невозможность масштабировать governance.

Для Aerocool полезно:

- текущая Primary Entity Matrix нужна и должна использоваться перед новыми schema changes;
- `schema_types` нельзя выбирать по аналогии, только по intent страницы;
- если страница не имеет ясной primary entity, сначала доработать контент;
- добавление нескольких типов без иерархии не делает graph сильнее.

Практический вывод: новые landing pages сначала проектировать по primary entity, затем по schema.

### 18. KEEN Footwear

Источник: [KEEN Footwear customer story](https://www.schemaapp.com/customer-stories/keen-footwear/).

Главная идея: e-commerce schema должна выдерживать разные templates, product catalog logic и content/entity linking.

Для Aerocool полезно:

- product templates должны быть едиными по fact fields;
- category/series pages должны быть связаны с products и editorial guides;
- entity linking с blog/articles помогает объяснить материалы, сценарии и товарные категории;
- если появится больше товарных вариантов, staged ProductGroup станет важнее.

Практический вывод: series pages и articles должны продолжать вести пользователя к товарам и обратно.

### 19. Home Hardware

Источник: [Home Hardware customer story](https://www.schemaapp.com/customer-stories/home-hardware/).

Главная идея: Product rich results на большом товарном каталоге требуют dynamic markup и согласованного product data layer.

Для Aerocool полезно:

- даже в маленьком каталоге нельзя допускать расхождения Product JSON-LD и видимого product block;
- product facts должны быть обновляемыми;
- special events или availability changes нельзя размечать без реальной бизнес-ситуации;
- Product schema является performance layer, а не только SEO-флажком.

Практический вывод: не расширять Product schema, пока source of truth и owner не закреплены.

### 20. Sharp HealthCare

Источник: [Sharp HealthCare customer story](https://www.schemaapp.com/customer-stories/sharp-healthcare/).

Главная идея: rich result performance зависит от видимого контента, page type и валидного graph.

Для Aerocool полезно:

- rich results нужно измерять по типам страниц;
- FAQ и Review не должны быть скрытыми;
- schema должна поддерживать пользовательский путь, а не только поисковый сниппет.

Неприменимо напрямую: physician/service healthcare schema.

### 21. AdventHealth

Источник: [AdventHealth customer story](https://www.schemaapp.com/customer-stories/adventhealth/).

Главная идея: rebrand и migration требуют сохранения entity identity, иначе search visibility может просесть из-за потери связи между старой и новой сущностью.

Для Aerocool полезно:

- если когда-нибудь изменится домен, брендовая структура или официальный представитель, нужно отдельно проектировать entity continuity;
- `sameAs`, `alternateName`, `legalName`, `parentOrganization`, redirects, sitemap и `@id` должны проверяться вместе;
- local/global brand relationship нужно держать документированным.

Практический вывод: текущий split global brand vs local organization правильный и должен сохраняться.

## 4. Самое полезное и новое для Aerocool

### 4.1. Отчет об эффективности сущностей

Нужно регулярно смотреть не только URL, но и сущности.

Минимальная таблица:

| Сущность | Entity Home | Страницы About | Страницы Mentions | Rendered Node | GSC-сигнал | AI Citation | Бизнес-действие | Следующий шаг |
| --- | --- | ---: | ---: | --- | --- | --- | --- | --- |
| `mesh-material` | `/articles/racer-vs-loft-air-vs-mesh/` | count | count | yes/no | impressions/clicks | yes/no | product visits | strengthen/hold |

Это подтверждено сразу несколькими историями: Henry Ford Health, MasterControl, Gusto, Excel, Brightview и SMART Technologies.

### 4.2. Управление товарными фактами

InSinkErator, Avid, CAPREIT, KEEN и Home Hardware подтверждают: Product rich results зависят от качества product data.

Для Aerocool это означает:

- front matter остается source of truth;
- `priceValidUntil: 2027-12-31` уже подтвержден;
- price, availability, SKU, MPN, GTIN, warranty, shipping, return и payment facts должны обновляться вместе;
- `aggregateRating` нельзя оставлять без источника;
- ProductGroup не включать без visible variant navigation.

### 4.3. Защита от галлюцинаций AI

Wells Fargo, Henry Ford Health и MasterControl показывают: AI Search readiness начинается с authoritative structured facts.

Для Aerocool проверять после production:

- кто такой `Aerocool Ukraine`;
- является ли сайт официальным;
- как AI описывает связь local organization и global Aerocool;
- какие серии и товары рекомендует;
- правильно ли описывает доставку, гарантию, возврат и наличие.

### 4.4. Чек-лист миграции и ребрендинга

Sharp migration, AdventHealth, SMART и SAP показывают: schema должна быть частью любого redesign или migration.

Для Aerocool добавить в будущие migration задачи:

- сохранить `@id`;
- проверить redirects;
- проверить canonical/hreflang;
- проверить sitemap;
- проверить `sameAs`, `parentOrganization`, `brand`;
- проверить Product/Collection/Breadcrumb graph после сборки.

### 4.5. Согласованность языковых версий

Sonova и CAPREIT подтверждают актуальность bilingual QA.

Для Aerocool:

- `uk` и `ru` product pages должны иметь одинаковые product facts;
- localized page text может отличаться, но цена, SKU, MPN, GTIN, доставка, возврат, гарантия и rating не должны расходиться;
- `inLanguage`, canonical, hreflang и breadcrumbs проверять в связке.

## 5. Актуальные проблемы после Customer Stories

### P0. контроль перед Production

Customer stories показывают performance effect только на индексируемых published pages. Текущий проект все еще собирается в development/noindex, поэтому business measurement невозможен до production switch.

### P0. источник `aggregateRating`

Многие customer stories показывают пользу review/rating rich results, но это усиливает риск. Рейтинг должен быть реальным, видимым и иметь понятный источник.

### P1. отчет об эффективности сущностей

Нужно добавить регулярный отчет `entity -> pages -> rendered node -> GSC/AI/business signal`.

### P1. навигация между вариантами ProductGroup

ProductGroup остается staged правильно. Следующий шаг: visible variant navigation.

### P1. свойство Product `additionalProperty`

На product pages уже есть характеристики. Следующий schema upgrade должен быть не новым типом, а `additionalProperty` для реальных visible specs.

### P2. аудит пробелов Schema у конкурентов

Excel и SMART подтверждают пользу сравнения с конкурентами. Для Aerocool это P2: проверить украинских конкурентов по Product, Offer, rating, FAQ, entity linking, breadcrumbs и catalog schema.

### P2. чек-лист Schema для миграции и ребрендинга

Не срочно, но нужно иметь checklist до будущего redesign, domain migration или изменения brand relationship.

### P3. агентские сценарии, MCP и NLWeb

Customer stories подтверждают: сначала trusted data layer, потом AI/agentic. Текущий P3-статус сохраняется.

## 6. Что обновить в документации

1. В [20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md) добавить ссылку на этот customer stories audit как evidence для performance measurement и source-of-truth governance.
2. В [25-ai-search-entity-map-2026.md](../seo/25-ai-search-entity-map-2026.md) усилить AI hallucination defense и entity-level reporting.
3. В [21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md) усилить Product facts governance, ratings source и ProductGroup condition.
4. В [24-entities-knowledge-graph-playbook-2026.md](../seo/24-entities-knowledge-graph-playbook-2026.md) добавить customer stories как практическое подтверждение Content Knowledge Graph lifecycle.

## 7. Что не делать

- Не внедрять healthcare-specific schema из Henry Ford, Brightview, Marshfield, Baptist, Sharp или AdventHealth.
- Не добавлять `LocalBusiness` или multi-location schema без реальной соответствующей бизнес-модели.
- Не копировать SaaS-подход Schema App, если текущий Hugo-layer решает задачу.
- Не добавлять author/reviewer entities без реальной редакционной модели.
- Не добавлять ProductGroup без visible variant navigation.
- Не добавлять rating/review schema без источника.
- Не добавлять agentic actions без реального endpoint и owner.

## 8. Итог

Все 21 customer stories полезны как evidence layer, но не все одинаково применимы.

Самые важные для Aerocool:

1. InSinkErator — product visibility, brand control, product facts governance.
2. Wells Fargo — AI hallucination defense через authoritative structured facts.
3. MasterControl — semantic schema как AI Search foundation.
4. Henry Ford Health — entity performance и AI visibility.
5. Gusto — Content Knowledge Graph как reusable data layer.
6. CAPREIT, Avid, KEEN, Home Hardware — e-commerce Product/Offer lessons.
7. Sonova — multilingual schema consistency.
8. SAP, SMART, Sharp migration, AdventHealth — governance, migration и primary entity discipline.

Главный практический вывод: текущий проект не нужно расширять новыми schema-типами немедленно. Нужно закрыть P0 по production и ratings, затем перейти к измеримому entity/product reporting.
