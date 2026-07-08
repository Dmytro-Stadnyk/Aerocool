# Карта Сущностей Для Поиска С AI 2026

Обновлено: 2026-07-08.

Этот документ переводит идеи из `Mastering AI Search`, `Schema Markup and AI Search`, `Designing Content for Humans and Machines`, `How to Prepare Your Content for Generative AI Search`, `Impact of Schema Markup` и `How Marketers Can Prepare Their Organization for the Agentic Web` от SchemaApp в практическую систему для проекта `Aerocool Ukraine`: какие сущности нужно закрепить на сайте, какие AI Search-метрики отслеживать, какие prompt-наборы проверять и как развивать JSON-LD graph без переспама.

Главная мысль: для AI Search недостаточно просто иметь много SEO-текста. Сайт должен давать машинам полную, связанную и проверяемую картину бренда, товаров, серий, материалов, механизмов, сценариев использования и коммерческих условий.

Текущий порядок внедрения зафиксирован в [34-2026-05-07-documentation-refresh-and-project-action-plan.md](../audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md).
Базовая синхронизация всей документации с лучшими практиками 2026 зафиксирована в [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](../audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md).
Новый PDF-аудит Schema App по connected graph, Content Knowledge Graphs, impact и Agentic Web зафиксирован в [44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](../audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md).
Customer stories/case studies Schema App по AI hallucinations, entity linking и product visibility зафиксированы в [46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](../audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md).
Обновление `2026-05-25` учитывает статью Schema App [Stop Chasing Visibility. Build Understanding.](https://www.schemaapp.com/schema-markup/stop-chasing-visibility-build-understanding/) и официальный Google guide [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

Важно: AI Search-слой не заменяет Google Search Essentials, people-first content, Core Web Vitals и structured data quality. До production-запуска и индексации AI Search считать мониторинговым и entity-governance слоем, а не причиной внедрять chatbot, NLWeb, MCP или chunking-стратегию как P0. Минимальный `llms.txt` внедрен как служебная карта сайта после PageSpeed Agentic Browsing-проверки, но он не является заменой sitemap, robots, schema.org или видимого контента.

### Уточнение После Google AI Guide И Schema App

Для проекта нельзя формулировать AI Search как “добавить schema и получить AI visibility”. Корректная рамка такая:

- специальной `AI schema` для попадания в generative AI search не существует;
- structured data не является самостоятельным shortcut для AI-видимости;
- `llms.txt`, chunking и похожие AI-тактики не должны опережать индексацию, качество контента и связный entity graph; текущий `llms.txt` только указывает на ключевые публичные URL и источники правды;
- AI Search-аудит должен проверять не только наличие упоминаний, но и точность понимания бренда, товаров, условий покупки и связей между сущностями;
- главная цель Aerocool — machine understanding: поисковые и AI-системы должны уверенно понимать, кто продает кресла Aerocool в Украине, какие серии и модели существуют, какие характеристики подтверждены, какие условия сервиса актуальны.

Практический вывод: если нужно выбрать между новым “AI-файлом” и улучшением видимого контента, product facts, entity home, внутренних ссылок и JSON-LD-связей, сначала улучшать основу понимания.

## 1. Зачем Это Нужно

AI-поиск меняет SEO-логику:

- часть ответов пользователь получает без клика;
- бренд может быть упомянут рядом с конкурентами прямо в AI-ответе;
- важны не только позиции и клики, но и цитирование, корректность описания бренда, качество AI referral-трафика;
- LLM и AI search-системы сильнее опираются на сущности, связи, структурированные данные, ясные ответы и доверительные сигналы.

Для Aerocool это означает: текущий SEO-фундамент уже сильный, но нужен отдельный слой `AI Search visibility`.

Customer stories Wells Fargo, Henry Ford Health и MasterControl усиливают отдельную цель: AI Search-аудит должен искать не только наличие цитирования, но и ошибки представления. Проверять нужно, правильно ли AI описывает `Aerocool Ukraine`, связь с global Aerocool, официальность сайта, серии, товары, доставку, гарантию и наличие.

После статьи Schema App от `2026-05-21` приоритет формулируется строже: измерять нужно не только visibility, но и understanding. В отчете фиксировать, понял ли AI:

- что `Aerocool Ukraine` — локальный сайт/представительство в Украине, связанное с global Aerocool;
- что каталог состоит из серий `SKY`, `WING`, `XTAL` и конкретных вариантов;
- что product facts берутся из подтвержденного front matter и поддерживаются по регламенту [58-product-facts-maintenance-process-2026.md](58-product-facts-maintenance-process-2026.md);
- что доставка, возврат, гарантия и оплата подтверждаются `/faq/`;
- что рекомендации должны опираться на реальные характеристики, а не на общие фразы про игровые кресла.

## 2. Связь С Текущей Документацией

Этот документ дополняет, а не заменяет:

- `docs/seo/18-seo-keyword-map-2026.md` — интенты и поисковые кластеры;
- `docs/content/07-content-seo-checklist-2026.md` — качество видимого контента;
- `docs/seo/19-schema-types-reference.md` — текущие `schema_types`;
- `docs/seo/26-json-ld-graph-audit-roadmap-2026.md` — технический roadmap JSON-LD graph;
- `docs/seo/58-product-facts-maintenance-process-2026.md` — операционный процесс поддержки товарных фактов;
- `docs/quality/13-pagespeed-insights-audit.md` — техническая проверка published URL через PageSpeed Insights.

Практическая граница:

- keyword map отвечает на вопрос: `по каким запросам сайт должен быть найден`;
- content checklist отвечает: `каким должен быть полезный текст`;
- JSON-LD roadmap отвечает: `как размечать видимый контент`;
- этот документ отвечает: `как сделать бренд и товары понятными для AI-ответов`.

## 3. Метрики Поиска С AI

Отслеживать нужно не только Google Search Console.

| Метрика | Что Значит | Как Проверять | Ограничение |
| --- | --- | --- | --- |
| AI visibility | Появляется ли Aerocool или URL сайта в AI-ответах | Ручные prompt-проверки, Semrush/Profound/аналогичные инструменты при наличии | Инструменты неполные и зависят от выбранных запросов |
| Brand citations | Как AI описывает бренд и рядом с кем его ставит | Ручная проверка ChatGPT, Gemini, Copilot, Perplexity, Google AI Overviews | Ответы нестабильны и зависят от языка/локации |
| Source citations | Какие страницы AI использует как источники | Follow-up вопросы: `какие источники?`, `покажи ссылки`, `откуда информация?` | Не все платформы показывают источники |
| AI referral traffic | Переходы из AI-платформ | GA4 referrals и landing pages | Часть трафика может попадать в `direct` |
| Engagement quality | Насколько AI-трафик полезен бизнесу | engagement rate, average engagement time, conversion events | Нужны настроенные события |
| Representation accuracy | Есть ли ошибки в описании бренда, товаров, условий | Ручной аудит ответов | Требует регулярной фиксации |
| Prompt variants | Как люди формулируют conversational-запросы | Матрица persona × intent stage | Нельзя ограничиваться exact-match ключами |
| Semantic relevance | Насколько сайт связан с темой в AI-ответах | Частота попадания в ответы по топикам, а не только бренду | Метрика пока качественная |
| Brand sentiment | В каком тоне AI описывает Aerocool | Ручной аудит формулировок и сравнений | Ответы меняются по платформам |
| Citation ownership | Какие URL и домены владеют цитированием по теме | AI-ответы, source links, GSC/SEO tools | AI не всегда показывает источники |
| AI crawler traffic | Приходят ли AI-боты и агенты | Server logs / Netlify logs при наличии | GA4 это обычно не показывает |
| Entity-level performance | Какие сущности дают видимость, переходы и действия | Сопоставить entity registry, URL, GSC, GA4 и AI-аудит | Требует стабильных entity homes и production baseline |
| Qualified organic traffic | Растет ли полезный трафик, а не просто показы | GA4 events, contact actions, product/catalog visits | Нужны корректные события |

### Базовая Оценка Эффективности На Уровне Сущностей

После production-запуска нужен отдельный baseline не только по URL, но и по сущностям.

Минимальная таблица:

| Сущность | Entity Home | URL-Кластер | GSC Queries | Clicks/CTR | AI Citations | Бизнес-Действия | Следующее Действие |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `mesh-material` | `/articles/racer-vs-loft-air-vs-mesh/` | material article + product pages | mesh / сетка / сітка | значение после production | да/нет | переходы в каталог | усилить или оставить |

Это нужно для Content Knowledge Graph: проект должен видеть, какие сущности уже работают как сильные смысловые узлы, а какие только присутствуют в registry, но не дают видимости или полезных действий.

## 4. Ежемесячный Аудит Поиска С AI

Периодичность: `1` раз в месяц после production-запуска и индексации.

Платформы для проверки:

- Google AI Overviews, если доступны для целевых запросов;
- ChatGPT;
- Gemini;
- Microsoft Copilot;
- Perplexity;
- другие AI-поисковые интерфейсы, если они начинают давать заметный referral-трафик.

Минимальная таблица аудита:

| Дата | Платформа | Язык | Prompt | Упомянут Aerocool | Цитируемый URL | Конкуренты | Ошибки | Действие |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `2026-05-06` | ChatGPT | `ru` | `лучшее кресло для home office Украина` | да/нет | URL | бренды | факт/нет | усилить страницу |

Follow-up вопросы после основного prompt:

- `Откуда ты взял эту информацию?`
- `Какие источники подтверждают ответ?`
- `Почему ты рекомендуешь эти бренды?`
- `Aerocool является надежным вариантом для этого сценария?`
- `Какая серия Aerocool лучше подходит для этого сценария?`

## 5. Банк Prompts

Проверять нужно брендовые, коммерческие и entity-запросы на украинском и русском. Английские prompts полезны для международных AI-моделей, но приоритет для сайта — `uk` и `ru`.

### Брендовые Prompts

- `Що таке Aerocool Ukraine?`
- `Хто продає крісла Aerocool в Україні?`
- `Aerocool Ukraine офіційний сайт`
- `Что такое Aerocool Ukraine?`
- `Кто продает кресла Aerocool в Украине?`
- `Aerocool Ukraine официальный сайт`
- `Who is Aerocool Ukraine?`

### Коммерческие Prompts

- `краще ігрове крісло в Україні`
- `офісне крісло для роботи за комп'ютером`
- `комп'ютерне крісло для home office`
- `крісло з mesh спинкою`
- `ігрове крісло для тривалих сесій`
- `лучшее игровое кресло в Украине`
- `офисное кресло для работы за компьютером`
- `компьютерное кресло для home office`
- `кресло с mesh спинкой`
- `игровое кресло для длительных сессий`

### Серии И Модели

- `Aerocool SKY крісло`
- `Aerocool WING крісло`
- `Aerocool XTAL крісло`
- `Aerocool SKY 360`
- `Aerocool SKY Light`
- `Aerocool WING Elite`
- `Aerocool XTAL Pro`
- `Aerocool SKY кресло`
- `Aerocool WING кресло`
- `Aerocool XTAL кресло`

### Материалы И Механизмы

- `що таке Synchronous Tilt у кріслі`
- `SYNC4 механізм крісла`
- `SYNC5 механізм крісла`
- `mesh чи екошкіра для крісла`
- `що таке dual backrest`
- `что такое Synchronous Tilt в кресле`
- `SYNC4 механизм кресла`
- `SYNC5 механизм кресла`
- `mesh или экокожа для кресла`
- `что такое dual backrest`

### Выбор И Сравнение

- `яке крісло Aerocool обрати для home office`
- `чим відрізняються Aerocool SKY і WING`
- `Aerocool SKY чи XTAL`
- `крісло для постави і довгої роботи`
- `какое кресло Aerocool выбрать для home office`
- `чем отличаются Aerocool SKY и WING`
- `Aerocool SKY или XTAL`
- `кресло для осанки и долгой работы`

### Матрица Persona × Funnel Для Prompts

`Schema Markup and AI Search` полезен тем, что предлагает мыслить не только ключами, а пересечением `persona × intent stage`. Для Aerocool это важнее, чем простой список запросов, потому что AI Search отвечает на длинные разговорные prompts.

| Персона | Обучение | Сравнение | Анализ Стоимости | Рекомендация | Покупка | Поддержка |
| --- | --- | --- | --- | --- | --- | --- |
| Home office worker | `як облаштувати робоче місце для довгої роботи` | `mesh чи екошкіра для home office крісла` | `скільки коштує нормальне офісне крісло в Україні` | `яке крісло Aerocool обрати для роботи вдома` | `де купити Aerocool SKY з доставкою по Україні` | `як налаштувати крісло для довгої роботи` |
| Gamer | `що важливо в ігровому кріслі для довгих сесій` | `Aerocool SKY чи WING для геймінгу` | `чи варте дорожче ігрове крісло своїх грошей` | `краще ігрове крісло Aerocool для вентиляції` | `купити ігрове крісло Aerocool в Україні` | `як доглядати за матеріалом крісла Aerocool` |
| Office buyer | `які крісла потрібні для офісної команди` | `офісні крісла mesh проти шкірозамінника` | `вартість комплекту крісел для офісу` | `яка серія Aerocool підходить для офісу` | `де замовити кілька крісел Aerocool` | `гарантія і повернення крісел Aerocool` |
| Student | `що потрібно для зручного навчального місця` | `компактне комп'ютерне крісло чи ігрове крісло` | `недороге крісло для навчання і комп'ютера` | `яке крісло Aerocool вибрати для маленької кімнати` | `купити комп'ютерне крісло Aerocool` | `як зібрати і налаштувати крісло` |

Русские версии этой матрицы нужно вести параллельно при реальном аудите, а не переводить автоматически в момент проверки. В AI Search формулировка prompt влияет на ответ сильнее, чем в классическом exact-match SEO.

AI follow-up вопросы не равны обычному Google `People Also Ask`. В AI snapshot и conversational search цепочка вопросов зависит от context window пользователя, поэтому при аудите нужно сохранять не только первый prompt, но и последующие вопросы, которые предлагает или принимает AI-система.

## 6. Работа С Сущностями: Найти, Связать, Управлять

Вебинар формулирует простой операционный цикл для данных, которые будут потреблять AI-агенты.

| Шаг | Что Делать В Aerocool | Результат |
| --- | --- | --- |
| Identify | Найти все ключевые сущности: бренд, локальную организацию, серии, модели, материалы, механизмы, сценарии, политики | Понятная entity map и канонические страницы |
| Connect internally | Связать сущности внутри сайта через ссылки, `@id`, `about`, `mentions`, `brand`, `seller`, `mainEntity`, `isVariantOf` | Машина понимает отношения между страницами |
| Connect externally | Добавлять `sameAs` только к точным официальным или авторитетным внешним сущностям | Снижается неоднозначность бренда, терминов и объектов |
| Manage | Проверять актуальность связей, свойств, URL, цен, наличия, политики доставки и возврата | Меньше schema drift и ошибок в AI-ответах |
| Measure | Отслеживать prompts, citations, sentiment, AI referrals, AI crawler traffic и конверсии | Понятно, что реально влияет на видимость и бизнес |

Практический вывод: entity map — не разовый документ. Это слой данных, который нужно поддерживать вместе с контентом и JSON-LD.

### Принципы Семантического Поиска

`How to Prepare Your Content for Generative AI Search` добавляет важную рамку: поиск движется от lexical matching к semantic search. Значит, Aerocool нужно оптимизировать не только exact-match фразы, а близость смыслов, атрибутов и отношений между сущностями.

Практические правила:

- писать целостные страницы вокруг сущностей и подтем, а не узкие страницы под отдельные ключи;
- покрывать атрибуты сущности: материал, механизм, серия, модель, сценарий, доставка, гарантия;
- связывать сущности на уровне сайта, потому что neural matching учитывает отношения между темами и объектами;
- держать Aerocool в consideration set для follow-up вопросов, а не только для первого запроса;
- проверять фактическую согласованность, потому что связка LLM + knowledge graph усиливает значение противоречий.

### Страница Сущности И Шкала Зрелости

Для каждой важной сущности нужен `entity home`: страница, которая лучше всего определяет эту сущность на сайте. Внешний источник может уточнять или дезамбигуировать сущность, но не должен быть главным определением вместо собственного URL.

Локальная шкала зрелости:

| Уровень | Состояние | Пример Для Aerocool |
| --- | --- | --- |
| 1 | Keywords | `ігрове крісло`, `офісне крісло`, `home office` |
| 2 | Topics | выбор кресла, материалы, эргономика, доставка |
| 3 | Entities with context | `SKY` как серия, `Synchronous Tilt` как механизм, `Mesh` как материал |
| 4 | External linked entities | точные `sameAs` на официальные или авторитетные источники |
| 5 | Internal linked knowledge graph | сущности связаны через `@id`, `about`, `mentions`, `brand`, `seller`, `isVariantOf` |

Цель проекта — двигаться к уровню `5`, но только через видимый контент и реальные связи.

### Семантические Тройки

Для проектирования связей удобно думать в формате `subject -> predicate -> object`.

Примеры:

- `Aerocool SKY -> is series of -> Aerocool chairs`;
- `Aerocool SKY 360 -> brand -> Aerocool`;
- `Aerocool SKY 360 -> has material -> Mesh`;
- `Aerocool WING -> mentions -> Synchronous Tilt`;
- `Home office guide -> about -> office chair`;
- `Product page -> seller -> Aerocool Ukraine`;
- `Product variant -> isVariantOf -> ProductGroup`.
- `Standalone product -> memberOf/about -> ProductSeries`.

Такая запись помогает выбирать точные Schema.org properties, а не использовать общий `mentions` там, где подходит `brand`, `seller`, `about`, `mainEntity` или `isVariantOf`.

## 7. Карта Сущностей

Эта карта нужна для управляемых `about`, `mentions`, `ProductGroup`, `Product.color`, `additionalProperty` и внутренних ссылок. Канонический список entity IDs и entity homes находится в [23-entity-registry-2026.md](23-entity-registry-2026.md), а структурированный источник для schema resolver — в [data/entities.yaml](../../data/entities.yaml).

| Entity | Тип Schema.org | Каноническая Страница | Где Усиливать | Следующее Действие |
| --- | --- | --- | --- | --- |
| Aerocool | `Brand` | `/` или `/about/` | Home, About, Product, Collection | Использовать стабильный `@id`; глобальные соцпрофили держать как `sameAs` бренда/global organization |
| Aerocool Ukraine | `Organization` / `OnlineStore`, если подтвердится модель магазина | `/about/`, `/contact/`, `/faq/` | Organization graph, FAQ, Contact | Local facts подтверждены `2026-05-07`; не расширять до `OnlineStore`; связь с глобальным Aerocool через `parentOrganization` и `brand`, без local `sameAs` |
| Каталог кресел | `CollectionPage` | `/products/` | Product hub, series pages | Связать с сериями и коммерческими интентами |
| SKY | `ProductSeries` / `CollectionPage` | `/products/sky/` | Серия, товары, статьи | SKY Light и SKY 360 остаются самостоятельными Product внутри серии, без ProductGroup |
| WING | `ProductSeries` / `CollectionPage` | `/products/wing/` | Серия, товары, статьи | ProductGroup использовать только для моделей с реальными цветовыми вариантами |
| XTAL | `ProductSeries` / `CollectionPage` | `/products/xtal/` | Серия, товары, статьи | ProductGroup использовать только для моделей с реальными цветовыми вариантами |
| Товар / товарный вариант | `Product` | `/products/<series>/<model>/` | Product pages | `color` из registry; `additionalProperty` из видимой вкладки характеристик |
| Игровое кресло | `Thing` / product category | `/products/`, статьи | Hubs, products, articles | Использовать как `about` для релевантных страниц |
| Офисное кресло | `Thing` / product category | `/products/`, статьи | Hubs, products, articles | Использовать как `about` для home office страниц |
| Компьютерное кресло | `Thing` / product category | `/products/`, статьи | Hubs, products, articles | Связать с выбором для работы и учебы |
| Home office | `Thing` / use case | статьи, product copy | Articles, products, series | Создать/усилить отдельный explain-блок |
| Synchronous Tilt | `DefinedTerm` / `Thing` | статья или glossary-блок | Articles, product specs | Сделать короткое объяснение и связать с моделями |
| SYNC4 | `DefinedTerm` / `Thing` | статья или серия | Products, specs | Использовать как характеристику только при видимом факте |
| SYNC5 | `DefinedTerm` / `Thing` | статья или серия | Products, specs | Использовать как характеристику только при видимом факте |
| Mesh | `DefinedTerm` / material | article/product pages | Materials, specs | Добавить сравнение с экокожей |
| Racer | `DefinedTerm` / material | product pages | Materials, specs | Привязать к конкретным товарам |
| Loft Air | `DefinedTerm` / material | product pages | Materials, specs | Привязать к конкретным товарам |
| Dual backrest | `DefinedTerm` / feature | статьи/товары | Product specs, articles | Нужен короткий ответ и видимый контекст |
| Доставка | `OfferShippingDetails` / policy | product front matter + `/faq/` | Product, FAQ | Front matter — source of truth; UI и FAQ подтверждают |
| Возврат | `MerchantReturnPolicy` | product front matter + `/faq/` | Product, FAQ | Front matter — source of truth; UI и FAQ подтверждают |
| Гарантия | `WarrantyPromise` / `PropertyValue` | product front matter + products + `/faq/` | Product pages | Показывать видимо перед расширением schema |

## 8. План Развития Schema Для Поиска С AI

Не добавлять новые свойства только ради количества. Сначала видимый контент и источник правды, затем JSON-LD.

| Уровень | Что Добавить | Где | Условие |
| --- | --- | --- | --- |
| P0 | Уточнить источник рейтингов или убрать `aggregateRating` | Product schema | Рейтинг должен быть реальным и видимым |
| P1 | `about` | Article, NewsArticle, CollectionPage | В front matter должна быть главная сущность страницы |
| P1 | `mentions` | Article, NewsArticle, Product, CollectionPage | Нужны явные связанные товары/серии/темы |
| Done | `ProductGroup` | Product variants внутри одной модели | Активно для четырех WING/XTAL цветовых групп; новые группы добавлять только при visible variant navigation |
| Done | `additionalProperty` | Product | Строится из видимой вкладки `characteristics`; поддерживать без скрытых фактов |
| P2 | `DefinedTerm` / glossary layer | Articles, glossary or FAQ sections | Нужны реальные объяснения терминов |
| P2 | Author / reviewer layer | Articles, NewsArticle | Только реальные люди или прозрачная организация |
| P2 | `sameAs` | Brand, Organization, entities | Только точные официальные профили или авторитетные knowledge bases |
| Done | `llms.txt` | Root static file | Минимальная Markdown-карта сайта внедрена в `static/llms.txt`; поддерживать как краткий навигационный файл, не как второй sitemap |

## 9. Front Matter И Связи

Текущие шаблоны читают `schema_types`. Это правило не менять.

Текущий безопасный набор entity-полей уже документирован в `docs/content/05-front-matter-reference.md`, объяснен для новичков в [22-entity-registry-beginner-guide-2026.md](22-entity-registry-beginner-guide-2026.md) и читается шаблонами:

- `about_entities`;
- `mentions_entities`;
- `product_group_id`.

На `2026-05-07` эти поля точечно заполнены на priority pages. На `2026-05-31` singleton ProductGroup вычищены: `product_group_id` оставлен только для реальных WING/XTAL цветовых вариантов, четыре группы переведены в `confirmed`, а JSON-LD выводит `ProductGroup`, `isVariantOf` и `inProductGroupWithID`. Новые значения не добавлять массово: каждое значение должно существовать в [data/entities.yaml](../../data/entities.yaml), иметь статус `confirmed` для JSON-LD и быть видимо раскрыто в тексте, ссылках, навигации или характеристиках страницы.

Поля управляемой перелинковки уже используются шаблонным блоком “Что посмотреть дальше”:

- `related_products`;
- `related_series`;
- `related_articles`;
- `related_news`.

Их добавлять точечно, когда нужно уточнить редакционный приоритет related-блока. `related_series` принимает только `sky`, `wing`, `xtal`; `related_products`, `related_articles` и `related_news` хранят языконезависимые пути страниц без начального `/` и без `/ru/`, например `products/wing/racer-black` или `articles/what-is-dual-backrest`. Эти поля не заменяют видимые ссылки и не участвуют напрямую в JSON-LD.

Поля, которые пока остаются проектными и требуют отдельного решения:

- `varies_by`;
- `product_properties`;
- `same_as`.

## 10. Контентные Паттерны Для AI-Ответов

AI-friendly контент не должен быть короче или беднее. Он должен иметь легко извлекаемые ответы внутри полноценной страницы.

Принцип из `Designing Content for Humans and Machines`: писать компонентами, а не только страницами. Каждый важный тип URL должен иметь повторяемые блоки, которые можно понять человеку, преобразовать в schema.org и переиспользовать в AI summary или агентском интерфейсе.

Добавлять в статьи, серии и товары:

- стабильный набор компонентов для типа страницы;
- блок `Короткий ответ`;
- блок `Кому подходит`;
- блок `Кому не подходит`;
- сравнение соседних серий;
- видимые характеристики;
- FAQ с прямыми ответами;
- объяснение терминов;
- таблицы выбора;
- ссылки на релевантные товары, серии, FAQ и контакты.

Писать семантически:

- называть конкретную сущность, а не абстрактное “решение”;
- показывать отношение между сущностями: серия -> модель -> материал -> механизм -> сценарий;
- использовать одну терминологию в `uk`, `ru`, front matter, visible copy и JSON-LD;
- избегать фраз, которые человек поймет из контекста, но машина не сможет разобрать без него.

Примеры коротких answer-блоков:

- `Synchronous Tilt — это механизм синхронного отклонения спинки и сиденья, который помогает удерживать более естественную посадку во время долгой работы.`
- `Mesh-спинка лучше подходит пользователям, которым важна вентиляция, особенно летом или при долгих сессиях за компьютером.`
- `Серия SKY ближе к универсальному игровому и рабочему сценарию, WING — к более выраженной поддержке, XTAL — к визуально легкому и современному рабочему месту.`

Эти блоки должны быть локализованы отдельно для `uk` и `ru`, а не машинно скопированы без редакторской проверки.

## 11. Готовность К Agentic Web

`Designing Content for Humans and Machines` отдельно подчеркивает: контент становится строительным материалом для агентских интерфейсов. Для Aerocool это пока не задача немедленной разработки, но уже влияет на контент и данные.

Что это значит практически:

- товарные данные должны быть структурированы и синхронизированы с видимым контентом;
- коммерческие условия должны быть понятны не только человеку, но и машине: цена, наличие, доставка, возврат, гарантия, оплата;
- RSS, schema.org, sitemap и текущий `static/llms.txt` должны указывать на стабильные URL и актуальные сущности;
- если рынок начнет использовать Agentic Commerce Protocol или похожие commerce-стандарты, проекту понадобится надежный источник товарной правды;
- если появится задача conversational-интерфейса на сайте, NLWeb-подход логично рассматривать поверх уже опубликованных semi-structured данных: schema.org, RSS, sitemap, FAQ и каталог.

Новый PDF `How Marketers Can Prepare Their Organization for the Agentic Web` добавляет важную границу: Agentic Web требует не просто страниц и schema, а управляемых действий. Для Aerocool это будущий P3-слой, а не текущая разработка.

Будущий `Callable Actions Registry` может описывать только реальные действия:

| Action | Когда Допустимо | Что Должно Быть Определено |
| --- | --- | --- |
| Compare chairs | После стабильной product/entity map | входные серии/модели, правила сравнения, URL результата |
| Check availability | После операционного процесса наличия | источник правды, частота обновления, ответ при отсутствии товара |
| Request consultation | Если команда реально обрабатывает такие заявки | обязательные поля, форма, ответственный владелец |
| Submit contact form | Если форма и обработка стабильны | validation, success/failure states, spam protection |
| Buy product | Только при реальном checkout или официальном purchase endpoint | цена, наличие, доставка, оплата, возврат, подтверждение заказа |
| Schedule consultation | Только при реальном расписании | календарь, доступные слоты, владелец процесса |

На текущем этапе не внедрять agentic commerce, MCP или NLWeb “на всякий случай”. Сначала нужна production-индексация, чистый schema graph, стабильные товарные данные, понятная entity map и владелец каждого business action.

## 12. Мониторинг AI Referral В GA4

После production-запуска нужно создать отдельный сегмент или отчет для AI referrals.

Проверять источники:

- `chatgpt.com`;
- `openai.com`;
- `perplexity.ai`;
- `copilot.microsoft.com`;
- `bing.com/chat`, если появляется;
- `gemini.google.com`;
- `google.com`, если landing page и контекст указывают на AI Overview;
- новые referral domains, которые появляются в отчетах.

Смотреть не только sessions:

- landing page;
- engagement rate;
- среднее время вовлечения;
- события прокрутки, обращения и перехода в каталог;
- переходы в `/products/`;
- переходы на product pages;
- отправки формы или клики по контактам, если события настроены.

Если AI referral-трафика мало, это не доказывает отсутствие AI visibility: часть визитов может попадать в `direct`, а часть AI-ответов вообще не дает клика.

Дополнительно, если Netlify logs или другой серверный лог доступны, отдельно проверять AI crawler traffic. Это не показатель конверсии, но полезный сигнал, что AI-системы и агенты начинают обращаться к данным сайта.

## 13. Что Не Делать

Не делать:

- не добавлять фиктивные отзывы, рейтинги, авторов или reviewer-сущности;
- не ссылаться на Wikipedia/Wikidata, если там нет точной сущности;
- не размечать `sameAs` на случайные маркетплейсы или неофициальные страницы;
- не добавлять `HowTo`, `VideoObject`, `Review`, если такого видимого контента нет;
- не создавать новые front matter поля без шаблонной поддержки;
- не подменять AI Search-аудит общим performance-аудитом.
- не внедрять agentic commerce или NLWeb без реальной бизнес-задачи и стабильного источника товарных данных.

## 14. Очередь Работ

### P0

1. Переключить Netlify на production только после финальной готовности.
2. Проверить `index,follow`, sitemap, служебные `noindex` страницы и PageSpeed Insights на реальном URL.
3. Решить источник рейтингов: подтвердить видимым и реальным источником или убрать `aggregateRating`.
4. Завести ежемесячную таблицу AI Search-аудита.
5. Добавить в AI-аудит поля для sentiment, citation ownership и prompt variant.
6. Проверить, что ключевые типы страниц собраны из повторяемых контентных компонентов.

### P1

1. Подготовить технический дизайн для `about` и `mentions`.
2. Поддерживать активный `ProductGroup` только для реальных вариантов одной модели; новые группы не добавлять без видимой variant navigation.
3. Поддерживать видимую таблицу характеристик как источник для `additionalProperty`.
4. Усилить страницы терминов и сценариев: `Synchronous Tilt`, `SYNC4`, `SYNC5`, `Mesh`, `home office`, `dual backrest`.
5. Проверить, какие текущие статьи лучше всего подходят как entity pages.
6. Расширить prompt-аудит до матрицы `persona × intent stage`.
7. Описать компонентные паттерны для product, series, article, news и FAQ страниц.
8. Заполнять внешние GSC/AI/business-метрики в [отчете по эффективности сущностей (Entity Performance Report)](59-entity-performance-report-2026.md) после production-индексации.

### P2

1. Спроектировать glossary или entity hub.
2. Поддерживать текущий `static/llms.txt` кратким: H1, описание, ссылки на ключевые URL, sitemap и robots.
3. Добавить author/reviewer layer только при наличии реальной редакционной модели.
4. Добавить внешние `sameAs` только для точных официальных источников.
5. Подключить AI referral monitoring к регулярному SEO-отчету.
6. При наличии логов добавить AI crawler traffic в регулярный отчет.
7. Рассмотреть NLWeb или agentic commerce-требования только после production-стабилизации и появления понятной бизнес-задачи; текущий WebMCP/`llms.txt`-слой держать как lightweight progressive enhancement.
8. Подготовить черновой `Callable Actions Registry` как документацию, без JSON-LD/API-вывода.

## 15. Контрольный Вывод

Для Aerocool самый полезный вывод из SchemaApp eBook такой: проект уже не нужно спасать базовой schema-разметкой. Его нужно развивать как связанную систему сущностей.

Следующий практический слой:

- entity map;
- AI Search prompt-аудит;
- `about` / `mentions`;
- `ProductGroup`;
- видимые характеристики как источник `additionalProperty`;
- осторожные trust-сигналы только на реальных данных;
- измерение AI referrals и качества этого трафика.
- оценка prompts через personas и intent stages;
- управление данными по циклу `Identify -> Connect -> Manage -> Measure`.
- проектирование контента как набора reusable components для людей, schema.org, AI summaries и будущих agentic surfaces.
