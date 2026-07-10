# Анализ корпуса статей SchemaApp 2016-2026

Дата аудита: 2026-05-07.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Источник: 126 статей из раздела `https://www.schemaapp.com/schema-markup/`, опубликованных или обновлявшихся с `2016` по `2026`.

Результат загрузки corpus: `126 / 126` URL успешно получены. Для анализа использовались title, meta description, publish/modified dates, headings и первые смысловые фрагменты текста. Этот документ не пересказывает статьи полностью, а вычленяет самое новое, полезное и применимое для проекта `Aerocool Ukraine`.

## 1. Главный вывод

Новые статьи SchemaApp `2025-2026` резко смещают фокус:

- от `Schema Markup ради rich results` к `Schema Markup как управляемый data layer`;
- от отдельных страниц к `Content Knowledge Graph`;
- от keyword/topic clusters к `entity-based topic management`;
- от синтаксической валидности JSON-LD к governance, freshness, ownership и AI trust;
- от “как попасть в сниппет” к “как контролировать, что AI-системы понимают и цитируют о бренде”.

Для `Aerocool Ukraine` это подтверждает уже выбранный порядок:

1. Не расширять schema хаотично.
2. Сначала закрыть P0-риски: production gate, `aggregateRating`, product facts; local organization facts подтверждены `2026-05-07`.
3. Entity registry, entity home map и safe resolver созданы `2026-05-07`.
4. Priority pages получили `about_entities`, `mentions_entities` и staged `product_group_id` `2026-05-07`; дальше поддерживать visible entity linking, ProductGroup QA и AI Search baseline.
5. `llms.txt`, MCP, NLWeb, agentic commerce и chatbot рассматривать только после production-стабилизации и готового knowledge graph.

Практический план уже зафиксирован в [47-2026-05-07-documentation-refresh-and-project-action-plan.md](47-2026-05-07-documentation-refresh-and-project-action-plan.md).

## 2. Самое новое и важное для Aerocool

### 2.1. Поиск с AI требует четкости, уникальности и структуры

Самый свежий материал: [Google Search Central Live: What Actually Matters in AI Search](https://www.schemaapp.com/schema-markup/google-search-central-live-toronto-what-actually-matters-in-ai-search/) от `2026-05-04`.

Полезно для проекта:

- Google/AI-поиск становится более избирательным не только в ранжировании, но и в индексации.
- Больше контента не равно лучше. Нужны distinct, structured, accurate и machine-trustworthy страницы.
- Structured data остается полезной не как “магия”, а как способ дать машинам precision, detail, focus и cost efficiency.

Что делать в Aerocool:

- не добавлять новые SEO-тексты ради объема;
- усиливать существующие страницы ясными блоками: короткий ответ, факты выбора, таблицы, FAQ, сравнения, product facts;
- каждый новый блок сверять с schema.org и entity map.

### 2.2. Структурированные данные должны стать системой, а не тактикой на уровне одной страницы

Ключевые статьи:

- [From Structured Data to Knowledge Graphs: Why Most Brands Are Still at Step One](https://www.schemaapp.com/schema-markup/from-structured-data-to-knowledge-graphs-why-most-brands-are-still-at-step-one/)
- [How Schema Markup Helps Enterprises With Their AI Journey](https://www.schemaapp.com/schema-markup/how-schema-markup-helps-enterprises-with-their-ai-journey/)
- [What 2025 Revealed About AI Search and the Future of Schema Markup](https://www.schemaapp.com/schema-markup/what-2025-revealed-about-ai-search-and-the-future-of-schema-markup/)

Полезно для проекта:

- JSON-LD на отдельных страницах — только шаг 1.
- Следующий уровень — связанный, управляемый и обновляемый Content Knowledge Graph.
- Для AI важно не просто найти страницу, а понять сущности, связи, свежесть и источник правды.

Что делать в Aerocool:

- использовать созданные [23-entity-registry-2026.md](../seo/23-entity-registry-2026.md) и [data/entities.yaml](../../data/entities.yaml) как канонический список entity IDs;
- поддерживать `entity home` для бренда, локальной организации, серий, моделей, материалов, механизмов и service policies;
- поддерживать `about_entities`, `mentions_entities`, `product_group_id` только там, где связь подтверждена видимым контентом.

### 2.3. Сгенерированной AI Schema-разметки недостаточно

Ключевые статьи:

- [Schema Markup for Enterprises: Schema App vs. AI-Generated Markup](https://www.schemaapp.com/schema-markup/schema-markup-for-enterprises-schema-app-vs-ai-generated-markup/)
- [How Enterprises Can Maintain Data Ownership in the Age of AI](https://www.schemaapp.com/schema-markup/how-enterprises-can-maintain-data-ownership-in-the-age-of-ai/)
- [How Schema App’s Dynamic Markup Solution Ensures Long-Term Success](https://www.schemaapp.com/schema-markup/how-schema-apps-dynamic-schema-markup-solution-ensures-long-term-success/)

Полезно для проекта:

- AI может быстро сгенерировать JSON-LD, но не гарантирует consistency, freshness, ownership и long-term governance.
- Для Aerocool правильнее держать schema в локальных Hugo partials, а данные — в front matter и видимом контенте.

Что делать в Aerocool:

- не вставлять AI-generated JSON-LD вручную в markdown;
- сохранять централизованный слой `layouts/_partials/_schema`;
- не добавлять поля без документации в `05-front-matter-reference.md`;
- контролировать schema drift при каждом изменении product facts.

### 2.4. Темы на основе сущностей лучше простых тематических кластеров

Ключевые статьи:

- [The Problem With Topic Clusters: Why Organizing By Page Is Insufficient](https://www.schemaapp.com/schema-markup/the-problem-with-topic-clusters-why-organizing-by-page-is-insufficient/)
- [How to Use Entity-Based Topics to Prove Market Authority and Mitigate Risk](https://www.schemaapp.com/schema-markup/how-to-use-entity-based-topics-to-prove-market-authority-and-mitigate-risk/)
- [What is Entity SEO and How Do I Implement It?](https://www.schemaapp.com/schema-markup/what-is-entity-seo/)

Полезно для проекта:

- кластер “страница + поддерживающие статьи” уже недостаточен;
- нужно управлять не только URL, а бизнес-сущностями и темами;
- SEO-отчетность должна отвечать не только “какая страница выросла”, а “какая сущность стала понятнее и сильнее”.

Что делать в Aerocool:

- сгруппировать контент вокруг сущностей: `SKY`, `WING`, `XTAL`, `Synchronous Tilt`, `Mesh`, `Racer`, `Loft Air`, `home office`, `gaming chair`;
- для каждой сущности определить главную страницу, поддерживающие статьи и товарные связи;
- не создавать новую статью, если она конкурирует с существующим entity home.

### 2.5. Связывание сущностей повышает видимость в AIO и поиске с AI

Ключевые статьи:

- [Case Study: Entity Linking Increases AIO Visibility by 19.72%](https://www.schemaapp.com/schema-markup/case-study-entity-linking-increases-aio-visibility/)
- [What is Entity Linking?](https://www.schemaapp.com/schema-markup/what-is-entity-linking/)
- [Measurable Impact of Scaling Entity Linking for Entity Disambiguation](https://www.schemaapp.com/schema-markup/measurable-impact-of-scaling-entity-linking-for-entity-disambiguation/)

Полезно для проекта:

- internal entity linking и external entity disambiguation становятся практическим AI Search рычагом;
- но `sameAs` нельзя использовать как обычную ссылку;
- внешняя связь должна точно обозначать ту же сущность или авторитетное определение.

Что делать в Aerocool:

- использовать internal entity registry как source of truth для entity IDs;
- использовать `sameAs` только для точных официальных профилей или авторитетных knowledge bases;
- держать глобальные соцсети Aerocool как `sameAs` глобального бренда/global organization, а local organization связывать через `parentOrganization` и `brand`;
- добавлять `about` и `mentions` через safe resolver только для confirmed entities.

### 2.6. Agentic Web, MCP, NLWeb и Graph-Vector RAG — приоритет P3, не P0

Ключевые статьи:

- [Maintaining Brand Sovereignty in the Agentic Web](https://www.schemaapp.com/schema-markup/maintaining-brand-sovereignty-in-the-agentic-web/)
- [Your Brand’s AI Concierge: How to Be Discoverable in the Agentic Web](https://www.schemaapp.com/schema-markup/your-brands-ai-concierge-how-to-be-discoverable-in-the-agentic-web/)
- [What is Model Context Protocol?](https://www.schemaapp.com/schema-markup/what-is-model-context-protocol-and-how-does-structured-data-play-a-role/)
- [What is NLWeb? Consuming Schema Markup for AI Applications](https://www.schemaapp.com/schema-markup/nlweb-consuming-schema-markup-for-ai-applications/)
- [Why Hybrid Graph-Vector RAG Is the Future of Enterprise AI](https://www.schemaapp.com/schema-markup/why-hybrid-graph-vector-rag-is-the-future-of-enterprise-ai/)

Полезно для проекта:

- AI agents требуют проверенных structured data, а не расплывчатого website copy;
- MCP/NLWeb/RAG полезны только тогда, когда базовый data layer заслуживает доверия;
- для Aerocool это будущая инфраструктура, а не срочная SEO-задача.

Что делать в Aerocool:

- сейчас не внедрять MCP/NLWeb/chatbot;
- сначала production, точечно подтвержденные ProductGroup/about/mentions и AI Search baseline;
- вернуться к agentic layer только если появится бизнес-задача: консультация, подбор кресла, сравнение моделей, проверка наличия.

## 3. Самое полезное из 2024-2023 Evergreen

### 3.1. Варианты товаров и `ProductGroup`

Ключевые статьи:

- [Google Expands Product Variant Structured Data Support](https://www.schemaapp.com/schema-markup/google-expands-structured-data-support-for-product-variants/)
- [How to do Schema Markup for Product Model Variants](https://www.schemaapp.com/schema-markup/schema-org-variable-products-productmodels-offers/)
- [6 Product Rich Result Mistakes You Might Be Making](https://www.schemaapp.com/schema-markup/6-common-product-rich-result-mistakes-you-might-be-making/)
- [Creating Product Schema Markup](https://www.schemaapp.com/schema-markup/creating-product-schema-markup-using-the-schema-app-highlighter/)

Что делать в Aerocool:

- `ProductGroup` нужен, потому что текущий каталог уже разделяет варианты по серии, модели, материалу и цвету;
- внедрять только после видимой навигации вариантов;
- не размечать скрытую вариантность, которую пользователь не видит.

### 3.2. `@id`, вложенность, RDF и связи

Ключевые статьи:

- [What is an @id in Structured Data?](https://www.schemaapp.com/schema-markup/what-is-an-id-in-structured-data/)
- [What is Nesting in Schema Markup?](https://www.schemaapp.com/schema-markup/what-is-nesting-in-schema-markup/)
- [RDF and Schema Markup](https://www.schemaapp.com/schema-markup/rdf-and-schema-markup-the-power-of-relationships-in-the-age-of-intelligent-systems/)
- [Linked Data in SEO](https://www.schemaapp.com/schema-markup/linked-data-in-seo-what-you-need-to-know/)

Что делать в Aerocool:

- сохранять стабильные `@id`;
- не плодить новые сущности на каждой странице;
- связывать `WebPage.mainEntity`, `Product.brand`, `Article.author`, `BreadcrumbList`, `ImageObject`;
- добавлять `about` и `mentions` через registry только после visible content QA.

### 3.3. Мультиязычная Schema-разметка

Ключевая статья:

- [Implementing Schema Markup on Multilingual Sites](https://www.schemaapp.com/schema-markup/how-to-implement-schema-markup-for-multilingual-or-multi-regional-sites/)

Что делать в Aerocool:

- сохранить текущую структуру `index.md` + `index.ru.md`;
- проверять, что `schema_types`, product facts и visible facts синхронны в `uk` и `ru`;
- не создавать разные сущности для одного товара только из-за языка;
- `@id` должен быть стабилен и понятен в языковом URL-контексте.

### 3.4. Sitelinks Search Box больше не цель

Ключевая статья:

- [Google Deprecates Sitelinks Search Box](https://www.schemaapp.com/schema-markup/google-deprecates-sitelinks-search-box-what-it-means-for-your-website/)

Что делать в Aerocool:

- не считать `WebSite.SearchAction` источником отдельного rich result;
- можно оставить как поддерживающую семантику;
- не инвестировать время в “оптимизацию sitelinks search box”.

## 4. Старые статьи, которые остаются полезными

Полезны как evergreen-поддержка:

- [What is Schema Drift?](https://www.schemaapp.com/schema-markup/schema-drift-the-divergent-schema-markup/) — подтверждает необходимость регулярной синхронизации visible content и JSON-LD.
- [How to Measure the Impact of Structured Data](https://www.schemaapp.com/schema-markup/how-to-measure-the-impact-of-structured-data/) — полезно для Search Console/rich result monitoring.
- [How Schema Markup Helps You Gain or Enhance a Google Knowledge Panel](https://www.schemaapp.com/schema-markup/how-schema-markup-helps-you-gain-or-enhance-a-google-knowledge-panel/) — применимо к brand/entity authority, но не как быстрый KPI.
- [Why Structured Data Should Inform Your Content Strategy](https://www.schemaapp.com/schema-markup/why-structured-data-should-inform-your-content-strategy/) — подтверждает связку content + schema.
- [How To Implement Schema Markup To Increase E-E-A-T](https://www.schemaapp.com/schema-markup/how-to-implement-schema-markup-to-increase-e-e-a-t/) — полезно только при реальных trust signals.
- [eCommerce Strategies for Successful Brands in Search](https://www.schemaapp.com/schema-markup/ecommerce-strategies-for-successful-brands-in-search/) — применимо к product, offer, shipping, return, review policy.
- [Required Schema.org Fields](https://www.schemaapp.com/schema-markup/required-schema-org-fields/) — важно как принцип: Schema.org сам не задает “required fields”; требования зависят от data consumer и цели.

## 5. Что не переносить в Aerocool

Низкий приоритет или не применимо сейчас:

- healthcare/physician/medical schema статьи;
- vacation rental rich results;
- COVID structured data;
- AEM/Sitecore/headless CMS enterprise implementation guides;
- Schema App Highlighter/editor-specific tutorials;
- QAPage/HowTo/Review tutorials без реального видимого контента;
- `LocalBusiness` как тип, если нет публичной customer-facing локальной бизнес-модели;
- `OnlineStore`, если сайт остается каталогом без checkout flow;
- third-party reviews без подтвержденного источника и соответствия Google policy;
- agentic commerce, MCP, NLWeb, chatbot — до production, подтвержденных ProductGroup/about/mentions и AI Search baseline.

## 6. Обновления для документации Aerocool

Corpus подтверждает текущие документы:

- [25-ai-search-entity-map-2026.md](../seo/25-ai-search-entity-map-2026.md) — оставить AI Search baseline, prompt matrix, citation ownership, AI referrals.
- [24-entities-knowledge-graph-playbook-2026.md](../seo/24-entities-knowledge-graph-playbook-2026.md) — entity registry и entity home уже заложены; следующий шаг — точечное заполнение связей.
- [20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md) — усилить governance, freshness, ownership.
- [21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md) — `ProductGroup`, reviews/rating policy и product facts остаются P0/P1.
- [26-json-ld-graph-audit-roadmap-2026.md](../seo/26-json-ld-graph-audit-roadmap-2026.md) — roadmap правильный, но его нужно выполнять в порядке P0 -> P1 -> P2.
- [47-2026-05-07-documentation-refresh-and-project-action-plan.md](47-2026-05-07-documentation-refresh-and-project-action-plan.md) — остается главным practical execution документом.

## 7. Итоговые приоритеты

### Сделать сначала

1. Production gate.
2. Источник rating или удаление `aggregateRating`.
3. Выполнено `2026-05-07`: local organization facts и `sameAs`.
4. Выполнено `2026-05-07`: product facts source of truth, owner и `priceValidUntil` зафиксированы; product front matter является каноническим источником, команда Aerocool Украина владеет business values, `priceValidUntil: 2027-12-31` подтвержден, UI, `/faq/` и `Product` JSON-LD отражают эти данные.
5. Выполнено `2026-05-07`: entity registry, entity homes, `data/entities.yaml` и safe resolver.

### Сделать далее

1. Видимая навигация вариантов и подтверждение ProductGroup.
2. QA видимого контента для существующих постраничных `about_entities` / `mentions_entities`.
3. Видимая навигация ProductGroup и подтверждение.
4. AI Search prompt baseline.
5. Соотношения изображений Article/News.

### Отложить

1. `llms.txt`.
2. MCP.
3. NLWeb.
4. Graph-vector RAG.
5. Chatbot/agentic commerce.

Главный практический вывод: самый ценный слой из всего corpus SchemaApp для Aerocool — не новый schema type, а управляемая система сущностей, отношений, источников правды и измерения AI visibility.
