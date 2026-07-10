# Полный аудит JSON-LD и Entity Graph после новых PDF Schema App

Дата аудита: 2026-05-17.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Контекст: аудит выполнен после анализа 4 PDF Schema App:

- `Guide-to-Connected-Schema-Markup.pdf`;
- `How-to-Drive-Your-Content-Marketing-Strategy-Using-Content-Knowledge-Graphs.pdf`;
- `Impact-of-Schema-Markup.pdf`;
- `How-Marketers-Can-Prepare-Their-Organization-for-the-Agentic-Web.pdf`.

Базовый PDF-анализ зафиксирован в [57-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](57-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md).

Этот документ отвечает на вопрос: что изменилось в оценке проекта после новых данных и какие проблемы сейчас актуальны.

## 1. Главный вывод

Новые PDF не требуют срочно добавлять новые schema-типы. Они подтверждают текущий курс проекта:

- централизованный JSON-LD graph через Hugo partials;
- стабильные `@id`;
- Entity Registry;
- `about_entities` и `mentions_entities`;
- Product facts из front matter;
- ProductGroup только после видимой variant navigation;
- Agentic Web как P3, а не текущая разработка.

Реальное изменение после новых данных: проект нужно оценивать не только как набор rich-result разметки, а как начальный `Content Knowledge Graph` и reusable data layer.

Оценка после аудита: `8.8 / 10`.

Сильная сторона: технический graph чистый и управляемый.

Главные ограничения: production gate, источник `aggregateRating`, ProductGroup/variant navigation, отсутствие post-production entity-level reporting.

## 2. Метод проверки

Проверено:

- [data/entities.yaml](../../data/entities.yaml);
- content front matter в `content/**/*.md`;
- schema partials в `layouts/_partials/_schema`;
- JSON-LD partial [jsonld.html](../../layouts/_partials/_seo/jsonld.html);
- rendered HTML в `public/**/*.html` после `npm run build`;
- актуальные SEO/entity документы в `docs/seo`;
- предыдущие аудиты в `docs/audits`.

Команды:

```bash
npm run build
git diff --check
```

## 3. Снимок сгенерированного графа

После сборки:

| Метрика | Значение |
| --- | ---: |
| HTML files | `108` |
| Pages with JSON-LD | `86` |
| JSON-LD scripts | `86` |
| JSON parse errors | `0` |
| JSON-LD nodes | `1390` |
| Duplicate `@id` внутри страницы | `0` |
| Broken internal Aerocool URL refs | `0` |
| Breadcrumb issues | `0` |
| JSON-LD на `contact-success` | `0` |
| JSON-LD на `search` | `0` |
| JSON-LD pages with `noindex` | `86` |

`noindex` сейчас ожидаем, потому что проект собирается в `HUGO_ENVIRONMENT = "development"`. Для production это остается gate.

## 4. Типы узлов в JSON-LD

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

Вывод: graph стал не просто набором page schema, а реально связанным набором сущностей. Высокое количество `DefinedTerm` и `Thing` объясняется registry-based nodes для материалов, механизмов, сценариев и политик.

## 5. Реестр сущностей

| Метрика | Значение |
| --- | ---: |
| Total entities | `67` |
| `confirmed` | `48` |
| `planned` | `17` |
| `do-not-markup` | `2` |
| Registry URL issues | `0` |

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

Состояние хорошее: битых `entity_home`, `current_jsonld_id` и `future_jsonld_id` не найдено.

## 6. Front Matter и Entity Fields

| Метрика | Значение |
| --- | ---: |
| Markdown content files | `76` |
| Front matter parse errors | `0` |
| `about_entities` total | `234` |
| `mentions_entities` total | `632` |
| Unique entity refs in content | `43` |
| Unknown entity refs | `0` |
| Non-confirmed refs in `about_entities` / `mentions_entities` | `0` |
| `product_group_id` total | `24` |
| `product_group_id` status | `24 planned` |

Вывод: новые правила Schema App support и PDF-гайдов соблюдены. Сильные `about` / `mentions` сейчас используют только `confirmed` сущности. `ProductGroup` подготовлен как staged field, но не выводится в JSON-LD.

## 7. Связанная Schema-разметка

Что хорошо:

- `WebPage.mainEntity` связан с основным `Product`, `Article`, `NewsArticle`, `FAQPage`, `CollectionPage`, `AboutPage` или `ContactPage`;
- `Product.brand` ссылается на global `Brand`;
- local organization связана с global organization через `parentOrganization`;
- global social profiles находятся у global `Brand` и global `Organization`;
- registry nodes создаются для confirmed dictionary/policy сущностей;
- `about` и `mentions` не содержат неизвестных ID.

Что еще не сделано:

- нет регулярного `Entity Coverage Report`;
- нет регулярной `Graph Inventory` таблицы `entity -> entity home -> pages about -> pages mentions -> rendered node -> performance signal`;
- нет post-production entity-level performance baseline.

Это не ошибка JSON-LD. Это следующий уровень управления Content Knowledge Graph.

## 8. Граф товаров

| Метрика | Значение |
| --- | ---: |
| Product nodes | `24` |
| Product front matter pages | `24` |
| Missing required product facts in front matter | `0` |
| `priceValidUntil` | `2027-12-31` на всех `24` Product nodes |
| `aggregateRating` nodes | `24` |
| `ProductGroup` nodes | `0` |
| `isVariantOf` nodes | `0` |
| `inProductGroupWithID` nodes | `0` |

Product facts заполнены системно: цена, наличие, SKU, гарантия, доставка, возврат, оплата и `priceValidUntil` есть в front matter и выводятся в JSON-LD.

### Главный риск: `aggregateRating`

`aggregateRating` есть на всех `24` product nodes. Значение рейтинга и количество оценок видны на товарных страницах, но источник рейтингов все еще должен быть бизнесово подтвержден и объяснен.

Решение:

- если рейтинги реальные, добавить видимый источник рейтинга и операционное правило обновления;
- если рейтинги маркетинговые или временные, удалить `rating` из product front matter и подавить `aggregateRating`.

После новых PDF это стало важнее, а не менее важно: `Impact of Schema Markup` показывает ценность Product/review snippets, но риск fake или неподтвержденных ratings остается высоким.

## 9. ProductGroup и варианты

Текущее состояние корректное:

- `product_group_id` есть в `24` product files;
- все `product_group_id` указывают на `planned` ProductGroup entities;
- `ProductGroup`, `isVariantOf` и `inProductGroupWithID` не выводятся.

Это правильное поведение. ProductGroup не должен появиться в rendered graph, пока пользователь не видит явную variant navigation между вариантами.

Следующее действие:

1. Добавить видимую навигацию вариантов на product pages и series pages.
2. Перевести соответствующие ProductGroup entities из `planned` в `confirmed`.
3. Только после этого включать `ProductGroup` / `isVariantOf`.

## 10. `sameAs` и `additionalType`

| Метрика | Значение |
| --- | ---: |
| `sameAs` refs total | `860` |
| Local organization `sameAs` | `0` |
| Brand `sameAs` refs | `430` |
| Global organization `sameAs` refs | `430` |

`sameAs` используется корректно: global social profiles находятся у global `Brand` и global `Organization`, а local `Aerocool Ukraine` не получает global social `sameAs`.

`additionalType` сейчас используется только для policy-like registry nodes:

| additionalType | Count |
| --- | ---: |
| `https://schema.org/MerchantReturnPolicy` | `28` |
| `https://schema.org/OfferShippingDetails` | `28` |
| `https://schema.org/WarrantyPromise` | `28` |

Это допустимо, потому что `additionalType` уточняет тип policy node и не подменяет `sameAs`.

Операционный риск: нужен квартальный review official `sameAs` URL.

## 11. ImageObject и Image License Metadata

| Метрика | Значение |
| --- | ---: |
| `ImageObject` nodes | `172` |
| Image license nodes | `0` |

Текущий слой изображений достаточен для базового JSON-LD: `contentUrl`, `url`, `width`, `height`, `name`, `description`, `inLanguage`.

Image license metadata остается P2. Добавлять `license`, `creator`, `creditText`, `copyrightNotice` или `acquireLicensePage` нельзя без юридически подтвержденного владельца и страницы условий.

## 12. Agentic Web после новых PDF

Текущее состояние правильное:

- нет `BuyAction`;
- нет `ScheduleAction`;
- нет MCP/NLWeb/chatbot entities;
- нет agentic commerce разметки;
- `Callable Actions Registry` описан только как P3-документация.

После новых PDF это правильная архитектурная граница. Agentic Web требует real business actions, endpoints, validation, owner и traceability. Сейчас проект еще не прошел production gate, не решил ratings и не включил ProductGroup, поэтому action layer преждевременен.

## 13. Актуальные проблемы

### P0. контроль перед Production

Все `86` страниц с JSON-LD сейчас имеют `noindex`, потому что сборка идет в development environment. Для production нужно отдельно переключить режим, проверить `index,follow`, sitemap, robots, служебные `noindex` URL и published headers.

### P0. источник `aggregateRating`

`aggregateRating` есть на всех `24` product pages. Видимое значение есть, но источник рейтингов нужно подтвердить или убрать ratings из front matter.

### P1. ProductGroup и Variant Navigation

`product_group_id` подготовлен, но все группы остаются `planned`. Нужна видимая навигация вариантов перед JSON-LD `ProductGroup`.

### P1. отчет о покрытии сущностей

Новые PDF усиливают эту задачу. Нужно регулярно видеть:

- какие сущности имеют `entity_home`;
- где они стоят в `about`;
- где они стоят в `mentions`;
- какие rendered nodes появляются;
- какие сущности дают GSC/AI citation/business signal после production.

### P1. базовые показатели после Production

После индексации нужно измерять не только validator pass:

- GSC impressions/clicks/CTR;
- non-branded commercial queries;
- Product rich result reports;
- AI citations;
- AI referral traffic;
- entity-level performance;
- contact/catalog/product actions.

### P1/P2. `additionalProperty` для Product

На product pages есть видимые характеристики: материал, механизм, регулировки, база, ролики, вес, подлокотники. Сейчас они не выводятся как `additionalProperty`.

Добавлять можно только после проектирования стабильного mapping из видимых specs/front matter.

### P2. метаданные лицензии изображений

Полезно для Google Images, но только после подтверждения прав и license page.

### P2. ежеквартальная проверка `sameAs`

Нужно ввести регулярную проверку official global social URLs.

### P3. агентские действия, MCP, NLWeb и `llms.txt`

Не внедрять сейчас. Вернуться после production, ratings/ProductGroup и появления реальной business-задачи.

## 14. Что не делать

- Не добавлять `BuyAction`, если нет реального checkout или purchase endpoint.
- Не добавлять `ScheduleAction`, если нет реального расписания.
- Не добавлять MCP/NLWeb только потому, что это есть в новых материалах Schema App.
- Не переводить `ProductGroup` в `confirmed` без видимой variant navigation.
- Не добавлять external `sameAs` для маркетплейсов, обзоров или тематически похожих страниц.
- Не добавлять image license metadata без подтвержденных прав.
- Не оставлять `aggregateRating`, если источник рейтингов нельзя объяснить пользователю.

## 15. Рекомендуемая очередь работ

1. Закрыть production gate: environment, indexability, sitemap, robots, headers, PageSpeed Insights на published URL.
2. Принять бизнес-решение по ratings: подтвердить источник или убрать `rating` из front matter.
3. Добавить visible variant navigation для WING/XTAL цветовых групп и решить, нужны ли single-variant ProductGroup для SKY.
4. Перевести подтвержденные ProductGroup entities в `confirmed` и включить `ProductGroup` / `isVariantOf`.
5. Спроектировать `additionalProperty` для product specs на основе видимого блока характеристик.
6. Завести Entity Coverage Report и Graph Inventory.
7. После production собрать baseline по GSC, rich results, AI citations и entity-level performance.
8. Только после этого вернуться к `llms.txt`, MCP/NLWeb или action endpoints.

## 16. Итоговая оценка

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Техническая валидность JSON-LD | `9.7 / 10` | JSON parse errors, duplicate IDs и broken URL refs не найдены |
| Entity Registry | `9.2 / 10` | Структура сильная; нужен coverage/reporting процесс |
| Connected Schema | `9.0 / 10` | `about`, `mentions`, policy nodes и stable IDs работают |
| Product structured data | `8.2 / 10` | Сильные Product/Offer facts, но ratings и ProductGroup остаются открытыми |
| AI Search readiness | `8.5 / 10` | Хорошая база; нужен post-production baseline |
| Agentic Web readiness | `7.5 / 10` | Правильно удержано в P3; actions пока не готовы бизнесово |

Общая оценка: `8.8 / 10`.

Проект находится в сильном состоянии. После новых данных главный фокус не “добавить больше schema”, а сделать graph измеримым, поддерживаемым и безопасным для production.
