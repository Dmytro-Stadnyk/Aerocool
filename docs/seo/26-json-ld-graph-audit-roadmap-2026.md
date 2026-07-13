# Аудит и план развития JSON-LD графа 2026

Обновлено: 2026-07-13.

Этот документ фиксирует постоянный план развития JSON-LD Graph проекта `Aerocool Ukraine` и правила усиления structured data без переспама, schema drift или несоответствия видимому контенту. Старые числовые оценки сохраняются ниже как датированные ориентиры, а не как гарантия текущего качества Google rich results.

Важно: JSON-LD не является кнопкой `топ-1`. Он помогает Google понять сущности, связи, товарные данные, организацию, хлебные крошки, FAQ и изображения, а также повышает eligibility для тех rich results, которые Google еще поддерживает. Но позиция в Google зависит от интента, качества страницы, доверия, внутренней архитектуры, ссылок, UX, индексации и конкуренции.

Актуализация `2026-05-17`: по официальной документации Google, с `2026-05-07` FAQ rich results больше не показываются в Google Search. Для Aerocool `FAQPage` остается полезным как структурированное описание видимого FAQ и сервисных условий, но не как SERP-enhancement цель.

Текущий практический порядок задают этот roadmap, [чек-лист качества schema](20-schema-markup-quality-checklist-2026.md), [регламент product facts](31-product-facts-maintenance-process-2026.md), [entity performance report](32-entity-performance-report-2026.md) и [список URL для валидаторов](33-schema-validator-url-checklist-2026.md). Аудиты `47`, `50` и `68` являются историческими снимками.

Простыми словами для новичка: JSON-LD — это машинное описание страницы для поисковика. Оно должно подтверждать то, что человек реально видит на странице. Если в JSON-LD указать цену, рейтинг или наличие, но не показать их пользователю, это становится риском для Google rich results.

## 1. Текущая оценка

### Граф schema.org и JSON-LD: `9.7/10`

Текущий граф технически чистый:

- один JSON-LD script на индексируемую страницу;
- единый `@graph`;
- стабильные top-level `@id`;
- нет дублей top-level `@id` внутри графа;
- нет висячих fragment-ссылок вида `#logo`, `#brand`, `#webpage`, `#primary-image`;
- `WebPage.url` совпадает с canonical;
- `search`, `404`, alias, `contact/success` и служебная пагинация остаются без JSON-LD;
- даты `Article` и `NewsArticle` сериализуются как `+03:00`, без `&#43;`.

Фактическая актуальная сборка содержит `96` HTML-страниц с JSON-LD и `1796` top-level nodes: `24` `Product`, `16` `ProductGroup`, `32` `Article`, `18` `NewsArticle`, `94` `BreadcrumbList`, `2` `FAQPage`, `12` `CollectionPage`, `2` `AboutPage`, `2` `ContactPage`, `192` `ImageObject`, а также registry-based nodes для подтвержденных сущностей: `DefinedTerm` и объяснительные `Thing` nodes из `about_entities` и `mentions_entities`. Paginated URL `/page/2+`, `/articles/page/2+`, `/news/page/2+` и русские аналоги остаются навигационными `noindex,follow` страницами без JSON-LD. Из-за временного `HUGO_ENVIRONMENT = "development"` published branch build все еще получает `noindex,nofollow`; rich-results eligibility нужно перепроверить после production-перехода.

### Качество Google Rich Results: `9.0/10`

Минус не за синтаксис и не за schema.org Validator. После контентных обновлений цена, SKU, гарантия, наличие и merchant facts выводятся видимо. Review-layer переведен на SEO-first pipeline: approved отзывы из `Netlify Database` выгружаются в `data/generated/reviews.json`, показываются на товарной странице и только после этого дают `Product.aggregateRating`. Legacy `rating.value` / `rating.count` удалены из товарного front matter.

Сейчас в `Product` JSON-LD есть:

- `offers.price`;
- `offers.availability`;
- доставка;
- возврат;
- гарантия.

Сейчас `Product.aggregateRating` появляется только при наличии approved-отзывов в снимке, созданном во время сборки. Если у товара нет approved-отзывов или локальная сборка запущена без подключения `Netlify Database`, `aggregateRating` не выводится.

Статус `2026-05-07`: product front matter зафиксирован как единый источник правды для price, `priceValidUntil`, availability, SKU, MPN, GTIN, warranty, shipping, returns и payment methods; владелец бизнес-значений — команда Aerocool Украина. Значение `priceValidUntil: 2027-12-31` подтверждено как актуальный срок действия товарных цен. Видимый коммерческий блок на product pages и merchant-факты в `/faq/` теперь должны служить синхронным подтверждением этих значений.

Статус `2026-05-28`: pipeline рейтингов внедрен: `Netlify Database -> approved reviews -> build-time export -> data/generated/reviews.json -> visible reviews -> Product JSON-LD`. Legacy rating во front matter удален.

## 2. Почему это важно для Google

Google отличает технически валидную structured data от качественной structured data.

Ключевое правило: размечать нужно то, что реально представляет содержимое страницы и доступно пользователю. Нельзя размечать скрытый, несуществующий, нерелевантный или вводящий в заблуждение контент.

Практический вывод для проекта:

- `price` в JSON-LD должен соответствовать видимой цене на товарной странице;
- `availability` должен соответствовать видимому статусу наличия;
- `ratingValue` и `reviewCount` должны быть подкреплены approved отзывами, которые видны на этой же товарной странице;
- `shippingDetails` и `hasMerchantReturnPolicy` должны совпадать с видимыми условиями доставки и возврата;
- `FAQPage` должен совпадать с видимым FAQ; при этом FAQ не считать Google rich result целью после обновления Google от `2026-05-08`;
- `Article` и `NewsArticle` должны соответствовать видимому материалу, авторству, датам и изображению.

Статус `2026-05-07`: merchant-условия `Product` JSON-LD читаются из product front matter и подтверждаются видимым FAQ: доставка по Украине `Новой Почтой`, доставка `0 грн`, передача в отправку `0-1 день`, транзит `1-3 дня`, возврат `14 дней`, бесплатный возврат, оплата наличными/картой.

Статус `2026-05-26`: источником рейтингов должен быть не front matter, а снимок approved-отзывов из `Netlify Database`. Документ внедрения: [17-netlify-database-reviews.md](../deploy/17-netlify-database-reviews.md).

## 3. Что нужно доделать для `10/10` по Google Rich Results

### P0. видимый коммерческий блок на товарных страницах

Статус `2026-05-07`: базовый видимый блок товарных фактов добавлен в контент, а front matter товара зафиксирован как источник правды для тех же фактов, которые есть в JSON-LD:

- цена;
- валюта `UAH`;
- наличие;
- SKU;
- гарантия;
- доставка;
- возврат;
- способы оплаты;
- рейтинг и количество отзывов, только если они реальные и подтверждены.

Если рейтинг и отзывы пока не являются реальным пользовательским сигналом, не выводить `aggregateRating` и не усиливать слой отзывов. Текущий шаблон уже следует этому правилу: `AggregateRating` выводится только из снимка approved-отзывов.

### P0. Синхронизация видимого интерфейса и schema.org-разметки

Любое быстро меняющееся поле должно обновляться одновременно в UI и JSON-LD:

- `price`;
- `availability`;
- `priceValidUntil`;
- `shippingRate`;
- сроки доставки;
- условия возврата;
- рейтинг;
- количество отзывов.

Если меняются цена, наличие, доставка, возврат, гарантия, способы оплаты, `priceValidUntil`, цвет или характеристики, проходить регламент [31-product-facts-maintenance-process-2026.md](31-product-facts-maintenance-process-2026.md): бизнес-подтверждение, product front matter или registry, видимый HTML, `/faq/` при policy-wide изменении, JSON-LD QA и post-deploy проверка. [layouts/_partials/_schema/product.html](../../layouts/_partials/_schema/product.html) менять нужно только при изменении mapping или добавлении новых полей.

### Выполнено. ProductGroup для вариантов

У Aerocool есть отдельные товарные URL, но не каждый товар является вариантом ProductGroup. На `2026-05-31` `ProductGroup` внедрен только там, где несколько URL представляют реальные варианты одной модели: цветовые пары WING Racer, WING Loft Air, XTAL Racer и XTAL Loft Air.

Собранный граф сейчас содержит:

- `ProductGroup`;
- `productGroupID`;
- `hasVariant`;
- `variesBy`;
- `isVariantOf` или `inProductGroupWithID`;
- variant-specific `color`, `material`, `sku`, `url`, `image`, `offers`.

Это поможет Google понять, что отдельные URL являются вариантами одной продуктовой группы, а не полностью независимыми товарами. Одиночные товары, такие как SKY Light, SKY 360, WING Mesh Black и XTAL Mesh Black, должны оставаться самостоятельными `Product` внутри своей серии, без `isVariantOf`.

Важное условие остается для будущих групп: на странице должен быть видимый variant selector или хотя бы понятные ссылки на другие варианты. На `2026-05-28` этот UI-слой добавлен: `variant-swatches.html` выводит цветовые swatches как ссылки на соседние variant URL на основе `product_group_id` и `data/entities.yaml`. На `2026-05-31` singleton ProductGroup удалены из registry/front matter, а четыре реальные группы переведены в `confirmed` и активированы в JSON-LD.

### Выполнено. свойства товара

Видимые характеристики уже есть в product content/front matter. На `2026-05-31` Product schema усилена двумя безопасными слоями:

- `color` берется из [data/entities.yaml](../../data/entities.yaml);
- `additionalProperty` через `PropertyValue` для видимых технических параметров:
  - механизм;
  - уровень регулировок;
  - тип подлокотников;
  - материал поверхности;
  - база;
  - ролики;
  - гарантия;
  - рекомендованный сценарий.

`mpn` и `gtin13` продолжают выводиться только если официальные значения есть во front matter.

`Product.additionalProperty` сейчас строится из видимой вкладки `characteristics`. Не переносить туда маркетинговые фразы, которые не являются стабильными характеристиками модели.

### P1. Merchant Policy на уровне Organization

Сейчас возврат и доставка описаны на уровне `Offer`. Это валидно, но если политика единая для большинства товаров, лучше позже вынести стандартную политику на уровень организации или отдельной policy-сущности:

- общий `MerchantReturnPolicy`;
- общие условия доставки;
- ссылки на видимые страницы доставки, оплаты, возврата и гарантии.

Не добавлять это заранее, если на сайте еще нет видимых страниц или блоков с этими условиями.

### Реализовано. Организационный слой авторства статей и новостей

С `2026-07-13` `Article` и `NewsArticle` используют отдельную подтвержденную организацию «Редакция Aerocool Ukraine» как `author`. Ее стабильный `@id` и `author.url` ведут на публичную редакционную политику в About. Основная локальная организация Aerocool Ukraine остается `publisher`.

Персональный слой можно добавить только после появления реальных публичных участников:

- реальные `Person`-авторы;
- страницы авторов;
- `reviewedBy`, если есть реальный экспертный ревью;
- `sameAs` для публичных профилей, если они реально существуют.

Не добавлять фиктивных авторов или reviewer-сущности только ради E-E-A-T.

### P2. поля `about` и `mentions` для контентных материалов

Для статей и новостей можно добавить более явные связи:

- `about` -> серия, бренд или основная тема;
- `mentions` -> связанные товары и серии;
- `mainEntity` только если материал действительно посвящен одной главной сущности.

Это имеет смысл после появления устойчивого front matter для связанных товаров/серий, чтобы не парсить связи из текста случайно.

### P2. галерея `ImageObject`

Сейчас есть единый `primaryImageOfPage`. Для товарных страниц позже можно расширить изображения:

- несколько product images;
- разные пропорции `1:1`, `4:3`, `16:9`;
- изображения деталей: механизм, спинка, подлокотники, материал;
- только crawlable/indexable URL.

Для Google это полезнее, если изображения реально присутствуют в HTML-странице, а не только в JSON-LD.

### Закрыто. Метаданные лицензии изображений

Выполнено `2026-05-31`: для `ImageObject` внедрены `license`, `acquireLicensePage`, `creator`, `creditText` и `copyrightNotice`. Поля добавляются централизованно через [image-license-metadata.html](../../layouts/_partials/_schema/image-license-metadata.html), а видимые условия находятся на `/image-license/` и `/ru/image-license/`.

Порядок поддержки:

1. Не добавлять эти поля в front matter или shortcode.
2. Если меняются права, владелец или порядок запроса разрешения, сначала обновить видимые страницы условий.
3. После изменения проверить rendered `ImageObject` в `public/**/*.html`.
4. При production-переходе проверить доступность страниц условий для Googlebot.

Не превращать страницу лицензии в обещание открытого использования. Текущая модель - restricted permission request: изображения можно использовать только по условиям правообладателя или после письменного разрешения.

## 4. Что не нужно добавлять сейчас

Не добавлять:

- `Review`, если нет реальных видимых отзывов;
- дополнительные `AggregateRating`, если рейтинг не подтвержден approved отзывами из единого review source;
- `HowTo`, если на странице нет полноценной пошаговой инструкции;
- `VideoObject`, если нет реального видео;
- `LocalBusiness` только ради `openingHours`, если бизнес-модель не описана как физическая точка обслуживания;
- фиктивных авторов, экспертов, reviewer и профили;
- свойства, которых нет в контенте или front matter.

Правило простое: сначала видимый контент и бизнес-источник правды, потом schema.

## 5. Приоритеты на следующий цикл

1. Закрыть production gate: переключить окружение только после финальной проверки `index,follow`, sitemap, canonical, hreflang и published URL.
2. Подтвердить MPN/GTIN для `SKY 360` и `SKY Light`.
3. Поддерживать регулярный [отчет по эффективности сущностей (Entity Performance Report)](32-entity-performance-report-2026.md) через `npm run entity:report`; GSC/AI/business-поля заполнить после production.
4. Исполнять регламент product facts при каждом изменении коммерческих и товарных данных.
5. После production-перехода контролировать снимок approved-отзывов, товарные отчеты GSC и доступность rich results на опубликованных URL.
6. Поддерживать image license metadata через видимую страницу условий и централизованный schema helper.
7. Вести entity/schema изменения через [20-schema-markup-quality-checklist-2026.md](20-schema-markup-quality-checklist-2026.md), [24-entities-knowledge-graph-playbook-2026.md](24-entities-knowledge-graph-playbook-2026.md), [21-ecommerce-structured-data-playbook-2026.md](21-ecommerce-structured-data-playbook-2026.md), [31-product-facts-maintenance-process-2026.md](31-product-facts-maintenance-process-2026.md) и [68-2026-05-31-schema-entity-full-audit-current.md](../audits/68-2026-05-31-schema-entity-full-audit-current.md).

## 6. Контроль перед деплоем

Минимальная проверка:

```bash
npm run build
```

После деплоя вручную проверить ключевые URL:

- `https://aerocool.ua/`
- `https://aerocool.ua/about/`
- `https://aerocool.ua/contact/`
- `https://aerocool.ua/products/`
- `https://aerocool.ua/products/sky/360/`
- `https://aerocool.ua/articles/how-to-choose-aerocool-chair/`
- `https://aerocool.ua/news/sky-series-launch/`
- `https://aerocool.ua/faq/`
- `https://aerocool.ua/ru/about/`
- `https://aerocool.ua/ru/products/sky/360/`
- `https://aerocool.ua/search/`

Инструменты:

- Schema Markup Validator: `https://validator.schema.org/`
- Google Rich Results Test: `https://search.google.com/test/rich-results`
- Search Console rich results reports после индексации.

## 7. Официальные источники

- Google General Structured Data Guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Product Snippet Structured Data: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- Google Merchant Listing Structured Data: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Google Product Variant Structured Data: https://developers.google.com/search/docs/appearance/structured-data/product-variants
- Google Organization Structured Data: https://developers.google.com/search/docs/appearance/structured-data/logo
- Google Article Structured Data: https://developers.google.com/search/docs/appearance/structured-data/article
