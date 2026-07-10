# Обновление документации и план действий 2026-05-07

Дата аудита: 2026-05-07.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

> Исторический action-plan snapshot. Он показывает состояние проекта на 2026-05-07; текущие версии Hugo/Node/Tailwind и актуальные маршруты проверки смотреть в [93-2026-07-07-hugo-0-164-update-audit.md](93-2026-07-07-hugo-0-164-update-audit.md) и [01-documentation-map.md](../01-documentation-map.md).

Этот документ фиксирует актуальное состояние документации после интеграции материалов SchemaApp и переводит обновленные знания в практический план для текущего проекта `Aerocool Ukraine`.

Главная идея: документация уже описывает сильный SEO/schema/AI Search-фундамент. Следующий этап — не добавлять новые schema-типы “для красоты”, а закрыть реальные риски перед production, затем последовательно развивать entity graph, ProductGroup, AI Search-аудит и reusable content components.

Текущая синхронизация всей документации с лучшими практиками 2026 от `2026-05-13` хранится в [50-2026-05-13-documentation-2026-best-practices-sync-audit.md](50-2026-05-13-documentation-2026-best-practices-sync-audit.md). Этот файл остается практическим action plan, а новый audit — свежим контрольным снимком документации.

Дополнительный corpus-анализ 126 статей SchemaApp за `2016-2026` хранится в [48-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md](48-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md). Он подтверждает этот порядок работ.

## 1. Текущее состояние

Проект уже имеет сильную базу:

- Hugo `0.162.0`, Node `24.16.0`, Tailwind CSS 4.3 и Netlify зафиксированы в локальных и deploy-настройках.
- Основной сайт двуязычный: `uk` как основной язык и `ru` как второй.
- Контентная структура через page bundles уже подходит для SEO, изображений и локализации.
- В `layouts/_partials/_schema` есть централизованный JSON-LD слой для `Website`, `Organization`, `Brand`, `CollectionPage`, `Product`, `Article`, `NewsArticle`, `FAQPage`, `BreadcrumbList`, `WebPage` и изображений.
- Документация теперь покрывает classic SEO, AI Search, entity SEO, knowledge graph, schema QA, e-commerce structured data и PageSpeed quality workflow.

Главные открытые ограничения:

- Netlify всё ещё намеренно работает в `development/noindex` режиме.
- У всех product pages есть `rating.value` и `rating.count`, но источник рейтингов/отзывов нужно подтвердить или убрать `aggregateRating`.
- Template support для `about_entities`, `mentions_entities` и `product_group_id` уже добавлен, priority pages уже заполнены. Открытая часть — QA связей, visible variant navigation и подтверждение ProductGroup перед выводом `isVariantOf`.
- AI Search baseline нельзя честно снять до production-запуска и индексации.

## 2. P0 перед Production-переходом

### P0.1. закрыть границу Production-перехода

Что сделать:

1. Оставить `netlify.toml` в `development` до финального решения об индексации.
2. Перед запуском production локально выполнить `npm run build:production`.
3. Проверить, что индексируемые страницы получают `index,follow`.
4. Проверить, что `/search/`, `404` и alias-страницы остаются `noindex,nofollow`.
5. После Deploy Preview проверить critical URLs через PageSpeed Insights.
6. Только после этого переключать Netlify command и `HUGO_ENVIRONMENT` на production.

Где смотреть:

- `netlify.toml`
- `README.md`
- `docs/quality/13-pagespeed-insights-audit.md`
- `docs/deploy/16-netlify-routing.md`
- `docs/audits/46-2026-05-06-project-readiness-assessment.md`

Критерий готовности:

- production build проходит;
- sitemap содержит только индексируемые URL;
- technical noindex URL не попадают в SEO-индекс;
- PageSpeed Insights не показывает критических SEO/performance/accessibility проблем.

### P0.2. подтвердить или убрать `aggregateRating`

Сейчас `layouts/_partials/_schema/product.html` добавляет `aggregateRating`, если во front matter есть:

```yaml
rating:
  value: 4.8
  count: 10
```

В product content рейтинг уже выводится видимо как значение и количество оценок. Но для Google и AI Search этого недостаточно, если источник оценок неясен.

Что сделать:

1. Определить источник рейтингов: реальные покупатели, внешняя платформа, внутренний review-сбор, редакционная оценка или временные маркетинговые данные.
2. Если источник реальный — добавить видимый блок с объяснением источника рейтинга и, желательно, отдельными отзывами или summary отзывов.
3. Если источник нельзя доказать — удалить `rating` из product front matter и подавить `aggregateRating`.
4. Добавить в `docs/content/05-front-matter-reference.md` правило для будущего поля `rating_source`, но только после решения о реальном источнике.

Где смотреть:

- `content/products/**/index.md`
- `content/products/**/index.ru.md`
- `layouts/_partials/_schema/product.html`
- `docs/seo/26-json-ld-graph-audit-roadmap-2026.md`
- `docs/seo/21-ecommerce-structured-data-playbook-2026.md`

Критерий готовности:

- либо rating/review source виден пользователю и совпадает с JSON-LD;
- либо `aggregateRating` не выводится в JSON-LD.

### P0.3. локальная организация, адрес и размещение `sameAs`

Статус `2026-05-07`: подтверждено пользователем проекта. Адрес, телефон, support/sales email и часы работы считаются актуальными публичными business facts для `Aerocool Ukraine`.

В `layouts/_partials/_schema/local-organization.html` локальная сущность `Aerocool Ukraine` использует адрес, телефон, email, часы работы, `parentOrganization` и `brand`. Глобальные социальные профили Aerocool официальные и единые для всех представительств, поэтому они должны оставаться на глобальных сущностях `https://aerocool.io/#organization` и `https://aerocool.io/#brand`, а не на локальной `Aerocool Ukraine`.

Что сделать:

1. Держать глобальные `sameAs` только в `global-organization.html` и `brand.html`.
2. Для local organization оставлять связь через `parentOrganization` и `brand`; добавлять local `sameAs` только если появятся отдельные официальные профили именно `Aerocool Ukraine`.
3. При изменении адреса, телефона, email или часов работы синхронно обновлять local organization schema, contact shortcode и `content/contact` в `uk`/`ru`.

Где смотреть:

- `layouts/_partials/_schema/local-organization.html`
- `layouts/_partials/_schema/global-organization.html`
- `content/about/index.md`
- `content/contact/index.md`

Критерий готовности:

- локальная organization schema утверждает только подтвержденные business facts;
- `sameAs` используется только для точного совпадения сущности, а глобальные соцсети не размечены как идентичность локального представительства.

### P0.4. зафиксировать источник правды для товарных фактов

Статус `2026-05-07`: source of truth, owner и `priceValidUntil` зафиксированы. Владелец бизнес-значений — команда Aerocool Украина; техническая точка внесения — product front matter в `content/products/**/index*.md`; `priceValidUntil: 2027-12-31` подтвержден как актуальный срок действия товарных цен.

Product schema уже содержит price, availability, SKU, MPN, GTIN, delivery, returns, warranty и payment methods. Это сильный e-commerce слой, но он становится риском, если данные устаревают.

Что сделать:

1. Source of truth зафиксирован: product front matter.
2. Owner зафиксирован: команда Aerocool Украина подтверждает цену, наличие, гарантию, доставку, возврат, оплату, SKU, MPN и GTIN.
3. Выполнено `2026-05-07`: `priceValidUntil: 2027-12-31` подтвержден командой Aerocool Украина.
4. При изменении доставки/возврата/оплаты сначала обновлять product front matter, затем синхронизировать видимый product copy, `/faq/` и `Product` JSON-LD.

Где смотреть:

- `content/products/**/index.md`
- `content/products/**/index.ru.md`
- `content/faq/index.md`
- `content/faq/index.ru.md`
- `layouts/_partials/_schema/product.html`
- `docs/content/05-front-matter-reference.md`

Критерий готовности:

- front matter, видимый product facts block, `/faq/` и JSON-LD говорят одно и то же;
- нет поля в JSON-LD, которое невозможно поддерживать операционно;
- команда Aerocool Украина является владельцем актуальности product facts;
- `priceValidUntil` в product front matter является подтвержденным бизнес-сроком, а не технической заглушкой.

## 3. P1 после закрытия P0

### P1.1. создать реестр сущностей

Статус `2026-05-07`: initial entity registry создан в [23-entity-registry-2026.md](../seo/23-entity-registry-2026.md), beginner-гайд добавлен в [22-entity-registry-beginner-guide-2026.md](../seo/22-entity-registry-beginner-guide-2026.md), структурированный слой добавлен в [data/entities.yaml](../../data/entities.yaml), а safe resolver подключен к schema partials. Пункт “нет entity registry” закрыт на уровне документации, шаблонной инфраструктуры и priority content.

Отдельный реестр сущностей нужен прежде, чем добавлять новые entity front matter поля. Initial registry уже создан и подключен к шаблонам; priority pages уже получили `about_entities`, `mentions_entities` и staged `product_group_id`. Новые страницы должны следовать тому же правилу: поле добавляется только когда сущность есть в registry и видимо раскрыта на странице.

Что включить:

- бренд `Aerocool`;
- локальная организация `Aerocool Ukraine`;
- серии `SKY`, `WING`, `XTAL`;
- модели и варианты;
- материалы `Racer`, `Loft Air`, `Mesh`;
- механизмы `Synchronous Tilt`, `SYNC4`, `SYNC5`;
- сценарии `home office`, gaming, office work, long sitting;
- service policies: доставка, оплата, возврат, гарантия.

Рекомендуемый новый документ:

- [docs/seo/23-entity-registry-2026.md](../seo/23-entity-registry-2026.md)

Критерий готовности:

- у каждой важной сущности есть `entity home`;
- понятно, какие страницы могут использовать `about` и `mentions`;
- нет конкуренции между страницами за одну и ту же entity home.

### P1.2. спроектировать Front Matter для сущностей

Статус `2026-05-07`: template support для `about_entities`, `mentions_entities` и `product_group_id` добавлена. Priority pages заполнены точечно: home, about, contact, FAQ, hubs, series, articles, news and product pages. Массово для будущего контента поля не добавлять; сначала использовать registry и visible content QA.

Кандидаты:

```yaml
about_entities:
  - wing-series
  - gaming-chair
mentions_entities:
  - synchronous-tilt
  - mesh-material
  - warranty-policy
product_group_id: "wing-racer-product-group"
variant_attributes:
  material: "racer-material"
  color: "black"
rating_source: ""
```

Что сделать:

1. Описать поля в `docs/content/05-front-matter-reference.md`.
2. Добавить поддержку в Hugo partials только после документации.
3. Не ломать текущее правило: `schema_types` остается единственным полем выбора schema.org типов.

Критерий готовности:

- новые поля не являются свободным текстовым мусором;
- каждое значение связано с entity registry;
- шаблоны игнорируют пустые или неизвестные значения безопасно.

### P1.3. спроектировать `ProductGroup`

У проекта есть отдельные product URL для вариантов по серии, модели, материалу и цвету. Это хороший кандидат для `ProductGroup`, но внедрять его нужно после видимой навигации вариантов.

Что сделать:

1. Определить группы: например `SKY Light`, `SKY 360`, `WING Racer`, `WING Loft Air`, `WING Mesh`, `XTAL Racer`, `XTAL Loft Air`, `XTAL Mesh`.
2. Для каждого варианта определить `color`, `material`, `sku`, `gtin13`, `mpn`.
3. Добавить видимую навигацию между вариантами на product pages.
4. `product_group_id` уже подготовлен во front matter товарных страниц, но `isVariantOf` и `inProductGroupWithID` не выводятся, пока ProductGroup entity остается `planned`.
5. После видимой навигации перевести нужные ProductGroup entities в `confirmed`.

Где смотреть:

- `content/products/<series>/_index.md`
- `content/products/<series>/<model>/index.md`
- `layouts/_partials/_schema/product.html`
- optional future partial `layouts/_partials/_schema/product-group.html`, если ProductGroup начнет рендериться отдельным graph node

Критерий готовности:

- пользователь видит, что это варианты одной группы;
- JSON-LD отражает видимую структуру, а не придумывает ее скрыто.

### P1.4. точечно заполнить `about` и `mentions`

Статус `2026-05-07`: `layouts/_partials/_schema/webpage.html` и профильные partials уже читают `about_entities` и `mentions_entities` через safe resolver из `data/entities.yaml`. Priority pages уже заполнены; дальнейшая задача — поддерживать тот же стандарт для новых страниц и периодически проверять связи после изменений контента.

Что сделать:

1. Добавлять или менять `about_entities` и `mentions_entities` только page-by-page.
2. Для страницы товара `about` должен вести к product entity, series/product group и бренду.
3. Для статей `about` должен указывать главную тему, а `mentions` — связанные модели, материалы, механизмы и сценарии.
4. Для FAQ `about` должен покрывать service policies и ключевые entity.

Критерий готовности:

- AI Search и Google получают понятный graph отношений;
- не создаются случайные новые `@id`;
- связи совпадают с видимыми ссылками и текстом.

### P1.5. компонентный контент для поиска с AI

Тексты уже достаточно объемные. Следующий рост — не просто добавлять символы, а улучшать извлекаемость.

На ключевых страницах добавить/усилить:

- короткий ответ в начале раздела;
- блок “кому подходит”;
- сравнение с соседними сериями/моделями;
- таблицу характеристик;
- блок фактов для покупки;
- FAQ;
- внутренние ссылки на entity home;
- CTA, который соответствует интенту страницы.

Критерий готовности:

- фрагмент страницы можно цитировать в AI-ответе без потери смысла;
- каждый блок отвечает на отдельный пользовательский вопрос;
- структура повторяется между страницами одного типа.

## 4. P2 после Production-перехода и индексации

### P2.1. завести базовый замер для поиска с AI

После production-запуска и индексации нужно один раз в месяц проверять AI Search visibility.

Что отслеживать:

- появляется ли `aerocool.ua` в ответах;
- кого цитируют AI-системы: сайт, маркетплейсы, конкурентов, обзоры;
- корректно ли описаны серии и модели;
- есть ли искажения по цене, наличию, доставке, гарантии;
- тональность ответа: нейтральная, положительная, сомнительная, негативная.

Платформы для ручного baseline:

- Google AI Overviews, если доступно по запросу;
- ChatGPT;
- Perplexity;
- Gemini;
- Bing/Copilot.

Критерий готовности:

- есть таблица prompts и результатов;
- есть список missing citations;
- есть backlog страниц, которые нужно усилить.

### P2.2. улучшить изображения статей и новостей

Rich results audit фиксирует, что `Article` и `NewsArticle` сейчас в основном используют один primary image. Для Google лучше иметь варианты `1x1`, `4x3`, `16x9`.

Что сделать:

1. Определить, нужно ли генерировать несколько image crops для статей и новостей.
2. Спроектировать front matter или Hugo image processing для image array.
3. Обновить `Article.image` и `NewsArticle.image`, если это не усложнит поддержку.

Критерий готовности:

- изображения crawlable;
- размеры и aspect ratio подходят для Google recommendations;
- контентная команда понимает, какие изображения готовить.

### P2.3. рассмотреть `llms.txt`

`llms.txt` не является заменой sitemap, robots или schema.org. Его стоит добавлять только после production-стабилизации.

Что сделать:

1. Выбрать 10-30 ключевых URL: home, about, products, серии, FAQ, главные статьи.
2. Дать короткое описание сайта и основных сущностей.
3. Не включать неиндексируемые, тонкие или временные страницы.

Критерий готовности:

- карта ключевых URL уже стабильна;
- entity registry готов;
- production URL индексируется.

## 5. P3 только после появления бизнес-задачи

Не делать сейчас:

- NLWeb или agentic commerce “на всякий случай”;
- chatbot без стабильной product facts базы;
- `OnlineStore` без реального merchant/checkout сценария;
- `Review` без реальных видимых отзывов;
- author/reviewer entities без реальной редакционной модели;
- external `sameAs` на маркетплейсы, обзоры или случайные страницы;
- healthcare, recipe, job posting или другие vertical-specific schema без соответствующего видимого раздела.

## 6. Рекомендуемый порядок работ

### Неделя 1

1. Принять решение по `aggregateRating`.
2. Выполнено `2026-05-07`: local organization facts и размещение глобальных `sameAs` подтверждены.
3. Выполнено `2026-05-07`: source of truth и owner для product facts зафиксированы.
4. Обновить документацию по rating/source, если решение принято.

### Неделя 2

1. Выполнить локальный `npm run build:production`.
2. Проверить robots meta для indexable и technical pages.
3. Проверить sitemap index и языковые sitemap.
4. Проверить critical URLs через PageSpeed Insights.
5. Подготовить production switch plan для Netlify.

### Неделя 3

1. Выполнено `2026-05-07`: initial entity registry создан.
2. Выполнено `2026-05-07`: entity homes для серий, материалов, механизмов, сценариев и policy entities зафиксированы.
3. Выполнено `2026-05-07`: `about_entities`, `mentions_entities` и `product_group_id` спроектированы и подключены к safe resolver.
4. Выполнено `2026-05-07`: `docs/content/05-front-matter-reference.md` обновлен.

### Неделя 4

1. Спроектировать visible variant navigation.
2. Подтвердить ProductGroup entities и перевести нужные группы из `planned` в `confirmed`.
3. Выполнено `2026-05-07`: priority pages получили `about_entities`, `mentions_entities` и staged `product_group_id`; дальше поддерживать это правило для новых страниц.
4. Обновить schema QA checklist по фактической реализации.

### После Production-перехода

1. Снять baseline Search Console.
2. Снять baseline AI Search prompts.
3. Проверить rich result reports.
4. Проверить AI citations и brand sentiment.
5. Обновить roadmap по фактическим данным, а не предположениям.

## 7. Главный вывод

Проект уже не нуждается в хаотичном расширении документации. Следующая ценность — дисциплина исполнения:

- сначала P0-риск рейтингов и production gate;
- затем точечное заполнение entity links, ProductGroup и about/mentions;
- затем AI Search baseline;
- затем llms.txt/agentic-направления только при реальной пользе.

Такой порядок сохраняет сильную сторону проекта: Hugo остается простым и контролируемым, schema.org граф развивается без schema drift, а AI Search-подготовка опирается на реальные сущности и видимые факты.
