# Анализ 4 PDF Schema App: Connected Markup, Content Knowledge Graphs, Impact и Agentic Web

Дата аудита: 2026-05-17.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Источник: 4 PDF-файла, предоставленные пользователем:

- `Guide-to-Connected-Schema-Markup.pdf`
- `How-to-Drive-Your-Content-Marketing-Strategy-Using-Content-Knowledge-Graphs.pdf`
- `Impact-of-Schema-Markup.pdf`
- `How-Marketers-Can-Prepare-Their-Organization-for-the-Agentic-Web.pdf`

Все 4 файла были прочитаны и сопоставлены с текущим состоянием проекта `Aerocool Ukraine`: `data/entities.yaml`, `about_entities`, `mentions_entities`, Product schema, ProductGroup roadmap, AI Search-документация и schema governance.

## 1. Проверка файлов

| Файл | Страниц | Дата PDF metadata | Значимость для проекта |
| --- | ---: | --- | --- |
| `Guide-to-Connected-Schema-Markup.pdf` | `12` | `2023-02-25` | Высокая, подтверждает connected graph |
| `How-to-Drive-Your-Content-Marketing-Strategy-Using-Content-Knowledge-Graphs.pdf` | `16` | `2024-10-15` | Высокая, добавляет lifecycle knowledge graph |
| `Impact-of-Schema-Markup.pdf` | `17` | `2026-01-14` | Очень высокая, добавляет performance/ROI акцент |
| `How-Marketers-Can-Prepare-Their-Organization-for-the-Agentic-Web.pdf` | `16` | `2026-04-01` | Очень высокая, добавляет agentic readiness |

## 2. Главный вывод

Эти PDF не отменяют текущую стратегию проекта. Они подтверждают, что выбранный путь правильный:

- centralized JSON-LD через Hugo partials;
- стабильные `@id`;
- Entity Registry;
- `about_entities` и `mentions_entities`;
- `ProductGroup` только после видимой навигации вариантов;
- product front matter как source of truth;
- schema drift governance;
- осторожное отношение к `sameAs`, `additionalType`, reviews и agentic features.

Реально новое после этих файлов:

1. Сильнее выделить Content Knowledge Graph как reusable/queryable data layer, а не только SEO-разметку.
2. После production-запуска измерять schema не только validator/rich results, но и CTR, qualified traffic, non-branded visibility, AI citations и entity-level performance.
3. Для Agentic Web ввести будущий P3-объект: registry of callable actions.
4. Не внедрять MCP/NLWeb/action endpoints сейчас, но заранее проектировать product facts, policies и entity registry так, чтобы их можно было переиспользовать.

## 3. Файл 1: Guide To Connected Schema Markup

Полезность: `8 / 10`.

Главная идея: connected schema описывает отношения между сущностями внутри страницы, между страницами сайта и с внешними knowledge bases.

Что уже покрыто в проекте:

- есть Entity Registry;
- есть стабильные `@id`;
- есть `about_entities` / `mentions_entities`;
- есть registry-based nodes для confirmed materials, mechanisms, features, use cases, topics и policies;
- global `sameAs` уже отделен от local organization;
- Product, Article, News, Collection, FAQ и WebPage связаны через `mainEntity` / `mainEntityOfPage`.

Что полезно добавить в будущие задачи:

- точнее использовать `subjectOf` там, где главная сущность страницы поддерживается FAQ, policy или другим объясняющим node;
- не ограничиваться rich results: связность нужна для дезамбигуации и AI-понимания;
- для внешних definitions использовать только проверенные exact или strongly authoritative links.

Вывод для Aerocool: этот PDF подтверждает текущую модель `Entity Registry -> safe resolver -> connected graph`. Срочных изменений не требуется.

## 4. Файл 2: Content Knowledge Graphs для Content Strategy

Полезность: `8.5 / 10`.

Главная идея: schema markup может стать основой Content Knowledge Graph, который помогает не только поиску, но и content inventory, gap analysis, AI grounding и повторному использованию данных.

Самое полезное для проекта:

- рассматривать `data/entities.yaml` и rendered JSON-LD как начальный data layer;
- анализировать контент не только по URL, а по сущностям;
- отслеживать, какие entities покрыты слишком слабо или слишком насыщены;
- использовать graph для content gap audit: серии, материалы, механизмы, сценарии, service policies;
- в будущем рассмотреть экспорт или отчетность по graph, но не внедрять triplestore без необходимости.

Что уже есть:

- entity registry;
- page-by-page mapping в `about_entities` / `mentions_entities`;
- audit-документы по JSON-LD graph;
- priority pages уже размечены;
- planned ProductGroup удерживается до visible navigation.

Что добавить в roadmap:

- P1/P2: entity coverage report по `content/**/*.md` и `data/entities.yaml`;
- P2: простая graph inventory таблица: entity -> pages about -> pages mentions -> entity home -> status;
- P3: RDF/triplestore/SPARQL только если появится задача queryable graph вне сайта.

Вывод для Aerocool: нужен не новый schema type, а регулярная аналитика entity coverage.

## 5. Файл 3: Impact Of Schema Markup

Полезность: `9 / 10`.

Главная идея: в 2026 Schema Markup нужно измерять как performance infrastructure для AI Search, rich results и entity trust, а не как декоративный SEO-чеклист.

Самое актуальное:

- AI Search снижает клики и CTR, но well-implemented schema помогает удерживать релевантность и visibility;
- для eCommerce наиболее важны Product snippets и Merchant listings;
- rich results остаются полезными, но не должны быть единственной целью;
- entity linking и Content Knowledge Graph повышают точность AI-ответов и уменьшают риск hallucinations;
- schema нужно измерять через бизнес-метрики: CTR, qualified traffic, conversions, AI citations.

Что уже покрыто:

- Product schema, Offer, price, availability, shipping, returns, payment methods;
- BreadcrumbList;
- FAQ как semantic/user layer;
- Product facts source of truth;
- AI Search docs и entity map;
- Google rich results QA.

Что становится важнее:

- P0: решить `aggregateRating`, потому что product/review snippets могут быть ценными, но fake/неподтвержденные ratings опасны;
- P1: после production снять baseline Search Console по product pages;
- P1: отдельно смотреть non-branded queries для широких коммерческих интентов;
- P1: отслеживать AI citations и brand/entity representation;
- P2: расширять Product schema через реальные visible attributes и `additionalProperty`.

Вывод для Aerocool: schema уже достаточно сильная технически, но performance measurement начнется только после production и индексации.

## 6. Файл 4: Agentic Web

Полезность: `9 / 10`.

Главная идея: Agentic Web требует, чтобы AI agents могли не только читать данные, но и сравнивать, выбирать и выполнять действия. Для этого нужны structured data, knowledge graph, callable actions, governance и traceability.

Что реально новое:

- будущий слой должен включать registry of callable actions;
- actions должны иметь required inputs, validation rules, success/failure outcomes, entry points и governance;
- website постепенно становится data source и execution endpoint, а не только страницей для человека;
- entity source of truth должен быть consistent across website, structured data, APIs and external channels;
- traceability и auditability становятся частью AI readiness.

Для Aerocool это не P0. Сейчас не внедрять MCP, NLWeb, UCP, chatbot или agentic commerce без бизнес-задачи.

Но нужно проектировать P3-направление:

- `compare chairs` / подбор кресла;
- `check availability`;
- `request consultation`;
- `submit contact form`;
- `buy product` только если появится реальный checkout или официальный purchase endpoint;
- `schedule consultation` только если есть реальное расписание и владелец процесса.

Перед любыми action-сущностями должны быть:

- production indexing;
- актуальные product facts;
- подтвержденные ratings или их удаление;
- visible variant navigation;
- стабильный ProductGroup;
- понятные policy facts;
- владелец бизнес-ответов в команде Aerocool Украина.

Вывод для Aerocool: Agentic Web подтверждает важность текущего graph/governance слоя, но action registry должен оставаться P3.

## 7. Что нужно обновить в документации

### P0

1. Не менять: production gate и `aggregateRating` остаются главными блокерами.
2. Не добавлять новых schema/actions до подтверждения текущих product facts и ratings.

### P1

1. В [20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md) усилить измерение schema как performance layer.
2. В [25-ai-search-entity-map-2026.md](../seo/25-ai-search-entity-map-2026.md) добавить entity-level performance и AI citation monitoring как post-production baseline.
3. В [24-entities-knowledge-graph-playbook-2026.md](../seo/24-entities-knowledge-graph-playbook-2026.md) добавить lifecycle: creation, hosting, curation, deployment/reuse.
4. В [23-entity-registry-2026.md](../seo/23-entity-registry-2026.md) добавить будущую секцию `Callable Actions Registry` как P3, без текущего JSON-LD вывода.

### P2

1. Добавить entity coverage report как регулярный аудит.
2. Подготовить graph inventory: entity -> entity home -> pages about -> pages mentions -> status.
3. Расширять Product schema через visible specs и `additionalProperty`.

### P3

1. Вернуться к MCP/NLWeb/action endpoints только при реальной бизнес-задаче.
2. Проектировать action registry только после стабильного product/policy graph.
3. Рассмотреть queryable graph/export только если он нужен для AI, internal tools или analytics.

## 8. Что не делать

- Не внедрять agentic commerce “на всякий случай”.
- Не добавлять `BuyAction`, если на сайте нет реальной покупки или checkout endpoint.
- Не добавлять `ScheduleAction`, если нет реального расписания и процесса записи.
- Не подключать внешние knowledge bases автоматически.
- Не использовать AI-generated schema без governance.
- Не считать rich results гарантией трафика.
- Не оставлять `aggregateRating`, если источник рейтинга нельзя подтвердить.

## 9. Итог

Все 4 файла полезны, но по-разному:

- Connected Schema Markup подтверждает текущую connected graph architecture.
- Content Knowledge Graphs добавляет направление для entity coverage analytics.
- Impact of Schema Markup усиливает аргумент за production measurement и product rich-result quality.
- Agentic Web добавляет P3-направление: callable actions registry и governed access layer.

Главный практический вывод: текущий проект уже идет в правильном направлении. Следующий прирост качества будет не от количества новых schema-типов, а от production-перехода, подтвержденных ratings, ProductGroup/variant navigation, регулярного schema drift процесса и entity-level reporting.
