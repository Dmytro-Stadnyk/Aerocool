# Практическое Руководство По Сущностям И Knowledge Graph 2026

Обновлено: 2026-05-25.

Базовая синхронизация документации с лучшими практиками 2026 зафиксирована в [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](../audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md). Дополнительный PDF-аудит Schema App по connected schema, Content Knowledge Graphs, impact и Agentic Web зафиксирован в [44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](../audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md). Customer stories/case studies Schema App по real-world entity linking, migrations и product visibility зафиксированы в [46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](../audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md). Обновление `2026-05-25` учитывает статью Schema App [Stop Chasing Visibility. Build Understanding.](https://www.schemaapp.com/schema-markup/stop-chasing-visibility-build-understanding/) и официальный Google guide [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

Этот документ переводит `Guide to Entities & Knowledge Graphs for SEO`, `Guide to Connected Schema Markup` и `How to Drive Your Content Marketing Strategy Using Content Knowledge Graphs` от SchemaApp в локальные правила для проекта `Aerocool Ukraine`.

Главная мысль: SEO больше не держится только на совпадении слов. Поиск и AI-системы пытаются понять сущности, их атрибуты и связи. Поэтому сайт Aerocool должен не просто покрывать ключевые слова, а строить понятный reusable knowledge graph из бренда, организации, серий, товаров, материалов, механизмов, сценариев и коммерческих условий.

Уточнение `2026-05-25`: structured data не считать магическим способом попасть в AI-ответы. Для Aerocool цель knowledge graph — не “поймать видимость”, а дать поиску и AI-системам управляемый, проверяемый слой понимания: кто такой бренд, что продает локальная организация, какие есть серии и модели, какие факты подтверждены, как связаны страницы и где находится источник правды.

Текущий порядок внедрения entity registry, entity home, `about`, `mentions` и `ProductGroup` описан в [34-2026-05-07-documentation-refresh-and-project-action-plan.md](../audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md). Актуальный реестр сущностей находится в [23-entity-registry-2026.md](23-entity-registry-2026.md).

## 1. Что Такое Сущность

Entity — это вещь или концепт, который является:

- единичным;
- уникальным;
- хорошо определенным;
- отличимым от других сущностей.

Для Aerocool entity может быть:

- бренд `Aerocool`;
- локальная организация `Aerocool Ukraine`;
- серия `SKY`, `WING`, `XTAL`;
- конкретная модель;
- материал `Mesh`, `Racer`, `Loft Air`;
- механизм `Synchronous Tilt`, `SYNC4`, `SYNC5`;
- сценарий `home office`, `gaming`, `long work session`;
- коммерческая политика: доставка, возврат, гарантия.

Ключевое отличие: keyword — это строка поиска, topic — группа связанных запросов, entity — объект с атрибутами и связями.

## 2. Зачем Knowledge Graph Нужен В SEO

Knowledge graph — это сеть отношений между сущностями, описанная контролируемым словарем. В проекте таким словарем выступает Schema.org, а формат вывода — JSON-LD.

Практическая польза:

- поисковики лучше понимают, что именно описывает страница;
- AI search получает более точный источник фактов;
- снижается риск неправильного описания бренда или товара;
- появляется единый semantic layer для бренда, каталога, product facts и сервисных условий;
- можно анализировать, какие сущности и темы уже покрыты, а где есть пробелы;
- тот же слой уже используется как ориентир для минимального `static/llms.txt` и может быть полезен для будущих AI-chatbot, NLWeb или agentic interfaces.

Важно: knowledge graph строится из видимого контента и подтвержденных источников правды. JSON-LD не должен описывать факты, которых нет на странице или в подтвержденной структуре сайта.

### Semantic Infrastructure, А Не Разрозненные Теги

Статья Schema App от `2026-05-21` полезна для локальной документации именно этим сдвигом: schema.org-разметка должна рассматриваться как инфраструктура понимания, а не как набор отдельных тегов на страницах.

Для Aerocool это значит:

- `data/entities.yaml` и `docs/seo/23-entity-registry-2026.md` являются governance-слоем сущностей, а не справочником “для красоты”;
- product front matter является источником правды для merchant facts, а не дублем JSON-LD; поддерживать его нужно по регламенту [58-product-facts-maintenance-process-2026.md](58-product-facts-maintenance-process-2026.md);
- `/faq/`, `/contact/`, `/about/`, серии, товары и статьи должны взаимно подтверждать факты, а не рассказывать разные версии;
- `about_entities`, `mentions_entities`, `product_group_id`, `related_*` и видимые внутренние ссылки должны усиливать одну и ту же карту связей;
- graph-аудит должен проверять не только валидность JSON, но и то, насколько уверенно машина может понять бренд, товар, серию, материал, механизм и условия покупки.

## 3. Три Шага Построения Knowledge Graph

| Шаг | Что Делать В Aerocool | Результат |
| --- | --- | --- |
| 1. Design content | Проектировать страницы вокруг конкретных entities и подтем | Сайт покрывает темы глубоко, без keyword-тонкости |
| 2. Describe with schema | Описывать сущности и их отношения через Schema.org | Машины получают явную структуру |
| 3. Link entities | Связывать внутренние entities и точные внешние knowledge bases | Снижается неоднозначность, появляется reusable graph |

Эти шаги должны быть частью редакционного процесса, а не только технического SEO.

Customer stories Schema App подтверждают практическую сторону этой модели: knowledge graph должен быть измеримым. Для Aerocool это означает регулярный [отчет по эффективности сущностей (Entity Performance Report)](59-entity-performance-report-2026.md) `entity -> entity home -> pages about -> pages mentions -> rendered node -> GSC/AI/business signal`, а не только наличие `data/entities.yaml`.

### Граф Знаний Контента Жизненного Цикла (Lifecycle Content Knowledge Graph)

Новые материалы Schema App уточняют: Content Knowledge Graph — это не только JSON-LD на страницах, а reusable data layer, который нужно создавать, размещать, поддерживать и переиспользовать.

Для Aerocool lifecycle такой:

| Этап | Что Значит В Проекте | Практический Результат |
| --- | --- | --- |
| Создание (Creation) | Определить сущности, entity home, `@id`, связи и видимый контент | `data/entities.yaml`, front matter, страницы сущностей |
| Публикация (Hosting) | Опубликовать graph в crawlable HTML через JSON-LD | централизованный `@graph` из Hugo partials |
| Поддержка (Curation) | Регулярно проверять факты, статусы, `sameAs`, product facts по регламенту и schema drift | меньше дублей, битых `@id` и устаревших коммерческих данных |
| Внедрение И Повторное Использование (Deployment / Reuse) | Использовать graph для SEO, AI Search, отчетности, текущего `llms.txt` и будущих agentic surfaces | entity coverage reports, AI citation audits, будущие data endpoints при необходимости |

Не внедрять triplestore, SPARQL или отдельный graph database сейчас. Для текущего масштаба проекта достаточно качественного registry, rendered JSON-LD и регулярной отчетности.

## 4. Страница Сущности

Для каждой важной сущности нужна главная страница-определение.

| Сущность | Entity Home | Комментарий |
| --- | --- | --- |
| Aerocool | `/about/` или `/` | Должна объяснять бренд и связь с Украиной |
| Aerocool Ukraine | `/about/`, `/contact/`, `/faq/` | Нужны организация, контакты, сервисная модель |
| Catalog | `/products/` | Главный вход в коммерческую структуру |
| SKY | `/products/sky/` | Entity home серии |
| WING | `/products/wing/` | Entity home серии |
| XTAL | `/products/xtal/` | Entity home серии |
| Product / Product variant | `/products/<series>/<model>/` | Entity home конкретного товара или варианта |
| FAQ/service policies | `/faq/` | Главный источник доставки, оплаты, возврата, гарантии |
| Synchronous Tilt | статья, FAQ-блок или glossary | Нужна отдельная объясняющая сущность |
| Mesh | статья, product block или glossary | Нужна связь с товарами и сценариями |

Правило: если сущность важна для выбора или AI-ответа, но на сайте нет страницы или сильного блока, который ее определяет, это контентный gap.

## 5. Семантические Тройки

Knowledge graph можно проектировать через тройки:

`subject -> predicate -> object`

Примеры для Aerocool:

- `Aerocool SKY 360 -> brand -> Aerocool`;
- `Aerocool SKY 360 -> seller -> Aerocool Ukraine`;
- `Aerocool SKY 360 -> memberOf/about -> Aerocool SKY series`;
- `Aerocool WING Racer Black -> isVariantOf -> WING Racer ProductGroup`;
- `Aerocool WING -> has material -> Mesh`;
- `Synchronous Tilt -> used in -> Aerocool chair models`;
- `Home office guide -> about -> office chair`;
- `Product page -> mentions -> warranty policy`;
- `FAQ -> mainEntity -> delivery and return questions`.

Такой формат помогает выбирать точные свойства Schema.org. Не использовать общий `mentions`, если связь точнее описывается через `brand`, `seller`, `author`, `publisher`, `mainEntity`, `about`, `isVariantOf`, `parentOrganization` или другое конкретное свойство. Для одиночных товаров без соседних вариантов не использовать `isVariantOf`: связь с линейкой должна идти через серию, URL, breadcrumbs, `about_entities` и страницу серии.

## 6. URI И `@id`

Каждая важная сущность должна иметь стабильный URI через `@id`.

Текущий паттерн проекта:

- `https://aerocool.ua/#organization`;
- `https://aerocool.io/#brand`;
- `https://aerocool.io/#organization`;
- `<page-url>#webpage`;
- `<page-url>#product`;
- `<page-url>#article`;
- `<page-url>#news`;
- `<page-url>#collection`;
- `<page-url>#faq`;
- `<page-url>#breadcrumbs`;
- `<page-url>#primary-image`.

Правила:

- не создавать новый `@id` для сущности, если она уже определена;
- ссылаться на существующий `@id` при повторном упоминании сущности;
- не менять `@id` без миграционной причины;
- не строить связи на текстовом парсинге, если можно использовать явные front matter поля;
- перед добавлением массовых entity-полей обновить `docs/content/05-front-matter-reference.md`.

## 7. Внутренняя Связь Сущностей

Внутренняя связность должна существовать в двух слоях:

- видимые HTML-ссылки для пользователей;
- JSON-LD связи через `@id` и точные Schema.org properties.

Минимальные связи:

- product -> brand;
- product -> seller;
- товар -> изображение страницы;
- product -> collection/series через visible links; только реальные варианты одной модели дополнительно связывать через `ProductGroup`;
- статья или новость -> издатель;
- article/news -> related series/products через visible links и точечные `about` / `mentions`;
- FAQ -> организация или сервисная политика;
- локальная организация -> глобальная организация или бренд.

Если связь важна для SEO или AI Search, она должна быть понятна не только из текста, но и из структуры страницы.

## 8. Внешняя Связь Сущностей

Внешние knowledge bases полезны для disambiguation, но они не должны заменять собственное определение сущности.

Можно использовать:

- официальный глобальный сайт Aerocool;
- официальные социальные профили Aerocool на глобальных сущностях `Brand` и global `Organization`;
- точные Wikidata/Wikipedia/Google KG сущности, если совпадение не вызывает сомнений;
- authoritative источники для общих терминов, если они действительно помогают уточнить смысл.

Не использовать:

- `sameAs` на маркетплейсы;
- `sameAs` на случайные обзоры;
- внешнюю страницу, где сущность отличается от нашей;
- Wikipedia/Wikidata только ради количества ссылок;
- автоматическое external linking без ручной проверки для ключевых коммерческих сущностей.

Особенно осторожно с `sameAs`: это утверждение “это та же самая сущность”, а не просто “связано с темой”.

Для текущего проекта: глобальные соцпрофили Aerocool официальные и единые для всех представительств. Поэтому `sameAs` остается у `https://aerocool.io/#brand` и `https://aerocool.io/#organization`; локальная сущность `https://aerocool.ua/#organization` связывается с ними через `brand` и `parentOrganization`, а не через собственный `sameAs`. Local organization facts для `Aerocool Ukraine` подтверждены пользователем проекта `2026-05-07`: адрес, телефон, support/sales email и часы работы считаются актуальными публичными business facts.

`additionalType` использовать только для уточнения типа сущности через внешний словарь. Это не identity-связь. Если внешний URL описывает более узкий тип, можно рассмотреть `additionalType`; если внешний URL описывает ту же самую сущность, это кандидат на `sameAs`; если внешний URL просто связан с темой, не использовать ни то, ни другое.

Официальные `sameAs` URL проверять раз в квартал. Проверка должна подтверждать, что ссылка остается живой, официальной и идентичной global Aerocool entity.

## 9. Шкала Зрелости Сущностей

| Уровень | Состояние | Что Делать |
| --- | --- | --- |
| 1 | Keywords | Зафиксировать поисковые фразы |
| 2 | Topics | Сгруппировать фразы в темы |
| 3 | Entities | Определить объекты, атрибуты и entity home |
| 4 | External linked entities | Добавить точные внешние идентификаторы |
| 5 | Internal knowledge graph | Связать entities через `@id`, видимые ссылки и Schema.org properties |

Aerocool уже находится выше уровня keyword/topics благодаря хабам, сериям, товарам и JSON-LD graph. Следующий рост — не больше ключей, а явнее entity home, `about`, `mentions`, поддержка активного `ProductGroup` только для реальных вариантов, `Product.color`, `additionalProperty` и registry governance.

## 10. Аудит Пробелов Контента Через Knowledge Graph

Использовать knowledge graph как инструмент анализа контента.

Вопросы аудита:

- Какие Schema.org types используются чаще всего?
- Какие entities есть на каждой странице?
- Какие важные entities не имеют entity home?
- Какие product properties видны пользователю, но не представлены в schema?
- Какие schema properties есть в JSON-LD, но не видны пользователю?
- Какие серии или материалы слабо связаны со статьями?
- Какие темы покрыты только keywords, но не entity-страницами?
- Какие внешние `sameAs` есть и все ли они точные?
- Какие сущности нужны для AI prompt-аудита, но отсутствуют в контенте?
- Где есть риск cannibalization между entity home и статьей?

Результат аудита должен превращаться в контентные задачи, а не только в schema-задачи.

### Отчет Покрытия Сущностей (Entity Coverage Report)

Раз в месяц после production-запуска готовить простую таблицу покрытия сущностей.

Минимальная структура:

| Сущность | Статус | Entity Home | Страницы About | Страницы Mentions | Отрендеренный Узел | AI/GSC Сигнал | Пробел |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sync5-mechanism` | `confirmed` | `/articles/sync4-sync5-mechanism-guide/` | URL count | URL count | yes/no | есть/нет | усилить product specs |

Как читать отчет:

- если entity `confirmed`, но нет `Pages About`, статус завышен или не хватает entity home;
- если entity часто попадает в `mentions`, но редко в `about`, возможно нужен сильный объясняющий материал;
- если важная коммерческая сущность не имеет AI/GSC signal после индексации, нужен контентный или внутренний linking-аудит;
- если rendered node отсутствует для confirmed dictionary/policy entity, проверить resolver и статус в [data/entities.yaml](../../data/entities.yaml).

## 11. Что Дает Knowledge Graph Кроме SEO

Knowledge graph может быть переиспользован за пределами классического SEO:

- grounding для будущего AI-chatbot;
- проверка фактов о товарах и условиях сервиса;
- анализ контентной библиотеки;
- подготовка к AI Search;
- подготовка к `llms.txt`, NLWeb или agentic interfaces;
- внутренняя база знаний для команды.

Но это P2/P3-направление. До production-стабилизации не внедрять chatbot, NLWeb или agentic commerce только ради тренда.

## 12. Очередь Работ

### P0

1. Поддерживать текущие стабильные `@id` без случайных изменений.
2. Не добавлять external `sameAs` без ручной проверки точности.
3. Решить риск `aggregateRating`: подтвердить реальным источником или убрать.
4. Считать `/faq/` главным entity home для текущих service policies.
5. Не использовать `additionalType`, пока не подтвержден внешний термин и его отношение к базовому Schema.org типу.

### P1

1. Выполнено `2026-05-07`: initial entity registry создан в [23-entity-registry-2026.md](23-entity-registry-2026.md).
2. Выполнено `2026-05-07`: entity home для `Synchronous Tilt`, `SYNC4`, `SYNC5`, `Mesh`, `Racer`, `Loft Air`, `Dual backrest` зафиксированы.
3. Выполнено `2026-05-07`: front matter для `about_entities` и `mentions_entities` спроектирован и подключен к safe resolver.
4. Выполнено `2026-05-07`: `ProductGroup` и `product_group_id` спроектированы; ProductGroup выводится только для confirmed entity.
5. Выполнено `2026-05-07`: beginner-гайд по Entity Registry добавлен.
6. Выполнено `2026-05-07`: priority pages получили `about_entities`, `mentions_entities` и staged `product_group_id`.
7. Выполнено `2026-05-31`: singleton ProductGroup удалены; `product_group_id` оставлен только для реальных WING/XTAL цветовых вариантов.
8. Выполнено `2026-05-31`: четыре WING/XTAL ProductGroup переведены в `confirmed` и активированы в JSON-LD через `ProductGroup`, `isVariantOf` и `inProductGroupWithID`.
9. Выполнено `2026-05-31`: `Product.color` выводится из registry, а `Product.additionalProperty` строится из видимой вкладки `characteristics`.
10. Провести content gap audit по entity map.
11. Добавить entity coverage report и graph inventory после production-запуска.

### P2

1. Рассмотреть glossary или entity hub.
2. Рассмотреть author/reviewer entities только при реальной редакционной модели.
3. Поддерживать `static/llms.txt` как краткий reuse-слой knowledge graph и карты ключевых URL.
4. Подготовить данные для AI-chatbot только после production-стабилизации и актуализации product facts.
5. Рассмотреть queryable graph или export только если появится реальная задача для internal tools, AI grounding или аналитики.

## 13. Что Не Делать

Не делать:

- не подменять entity strategy списком keywords;
- не создавать страницы под каждую микросущность без полезного контента;
- не добавлять фиктивные Person/Reviewer entities;
- не добавлять `sameAs`, если сущности не идентичны;
- не создавать дубли `@id`;
- не использовать JSON-LD для фактов, которых нет в видимом контенте;
- не запускать AI-chatbot на неактуальных товарных данных.

## 14. Контрольный Вывод

Для Aerocool самый полезный вывод из `Guide to Entities & Knowledge Graphs for SEO`: проекту нужен управляемый слой сущностей поверх уже сильной SEO-структуры.

Следующий уровень:

- entity registry;
- entity home для каждой важной сущности;
- стабильные URI / `@id`;
- semantic triples для проектирования связей;
- внутренняя и внешняя перелинковка сущностей;
- content gap audit по entities;
- reusable knowledge graph для SEO и будущих AI-сценариев.
- lifecycle поддержки graph: creation, hosting, curation, deployment/reuse.
