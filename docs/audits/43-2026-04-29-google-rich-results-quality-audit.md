# Аудит качества Google Rich Results

Дата аудита: 2026-04-29.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).
Актуализировано: 2026-05-17.
Проект: `Aerocool Ukraine` / Hugo / двуязычный сайт `uk` + `ru`

> Исторический audit snapshot. Версии Hugo и текущие tooling-правила после обновления проекта смотреть в [75-2026-06-11-hugo-0-163-documentation-sync-audit.md](75-2026-06-11-hugo-0-163-documentation-sync-audit.md); текущие schema/entity-счетчики — в [32-entity-performance-report-2026.md](../seo/32-entity-performance-report-2026.md) и [33-schema-validator-url-checklist-2026.md](../seo/33-schema-validator-url-checklist-2026.md).

## Область проверки

Проверено:

- сборка через `npm run build` в текущем окружении `development`;
- фактический HTML в `public/`, а не только Hugo-шаблоны;
- все `application/ld+json` блоки;
- соответствие основным Google rich result features, которые реально затрагивает проект:
  - Product snippet;
  - Merchant listing;
  - Review snippet / AggregateRating;
  - Breadcrumb;
  - FAQ;
  - Article / NewsArticle;
  - Organization;
  - WebSite / SearchAction;
  - поддерживающие nodes: Brand, ImageObject, WebPage, CollectionPage, AboutPage, ContactPage.

Официальные источники Google:

- Общие правила structured data: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Product snippet: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- Merchant listing: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Review snippet: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- FAQPage: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Article: https://developers.google.com/search/docs/appearance/structured-data/article
- Breadcrumb: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Organization: https://developers.google.com/search/docs/appearance/structured-data/organization
- Удаление sitelinks search box: https://developers.google.com/search/blog/2024/10/sitelinks-search-box

## Результат сборки

Примечание: проект временно собирается с `HUGO_ENVIRONMENT = "development"`, поэтому текущий generated HTML получает `noindex,nofollow`. Rich Results eligibility нужно перепроверить после включения production-режима, когда индексируемые страницы снова будут отдавать `index,follow`.

Простыми словами для новичка: этот аудит проверяет не “красоту текста”, а то, совпадает ли JSON-LD разметка с реальным видимым содержимым страниц. Google может игнорировать rich results, если в schema есть цена, наличие или рейтинг, которых пользователь не видит на странице.

Команда:

```bash
npm run build
```

Результат:

- Hugo: `v0.162.0`
- Pages: `62` UK, `60` RU
- Paginator pages: `9` UK, `9` RU
- Aliases: `8` UK, `7` RU
- Processed images: `793`
- Build: успешный

## Инвентаризация

Фактически найдено 88 HTML-страниц с JSON-LD.

| Тип | Количество | Роль для Google Rich Result |
|---|---:|---|
| `Product` | 24 | Да: Product snippet / Merchant listing |
| `BreadcrumbList` | 76 | Да: Breadcrumb rich result |
| `Article` | 14 | Да, как Article structured data / enhanced understanding |
| `NewsArticle` | 14 | Да, как Article structured data / enhanced understanding |
| `FAQPage` | 2 | Не Google rich result цель после `2026-05-07`; полезно как семантика и видимый FAQ |
| `Organization` | 172 | Да, organization information / logo / knowledge signals |
| `WebSite` | 86 | Поддерживающая сущность; SearchAction больше не дает sitelinks search box |
| `Brand` | 86 | Поддерживающая сущность |
| `ImageObject` | 174 | Поддерживающая сущность |
| `WebPage` | 84 | Поддерживающая сущность |
| `CollectionPage` | 16 | Не отдельный Google rich result, но полезная семантика |
| `AboutPage` | 2 | Поддерживающая сущность |
| `ContactPage` | 2 | Поддерживающая сущность |

Так как сборка сейчас намеренно идет в `development`, все 88 HTML-страниц с JSON-LD получают `noindex,nofollow`. Это временное состояние проекта. Служебные `search`, `404` и alias-страницы JSON-LD не рендерят.

## Краткое резюме

Техническая база хорошая: JSON-LD валиден, граф централизован, обязательные поля основных типов в целом присутствуют. После обновлений `2026-05-06` основной риск hidden product facts заметно снижен: price, availability, SKU, warranty, merchant facts и rating value/count выводятся видимо там, где эти поля есть во front matter. Главный оставшийся риск — не синтаксис, а quality evidence для рейтингов/отзывов и финальная проверка на production URL.

Самые важные риски:

1. Все 24 `Product` nodes содержат `price`, `availability`, `aggregateRating`, `sku`, часто `mpn` и `gtin13`; после обновлений `2026-05-06` эти данные в целом подтверждены видимым product facts block. Оставшийся риск — источник рейтингов и review evidence.
2. Все 24 `aggregateRating` nodes теперь имеют видимое значение/count на странице, но источник рейтинга и индивидуальные отзывы пока не оформлены как полноценный пользовательский слой.
3. Merchant listing eligibility под вопросом, если товар нельзя купить прямо на странице. После появления visible facts и коммерческого CTA риск ниже, но страницы всё ещё нужно проверять как каталог/маркетинговые карточки, а не полноценный checkout-ready merchant flow.
4. `FAQPage` технически корректен и видим, но после официального обновления Google от `2026-05-08` FAQ rich results больше не показываются в Google Search. Для коммерческого сайта это не SERP-цель, а вспомогательная семантика и пользовательский FAQ.
5. Все `Article` и `NewsArticle` используют одно primary image `1536x1024` с ratio `1.5`. Google рекомендует несколько high-resolution images в ratio `16x9`, `4x3`, `1x1`.
6. `WebSite.SearchAction` больше не дает sitelinks search box: Google удалил этот визуальный элемент с 2024-11-21.
7. `Organization` размечается на каждой странице. Google рекомендует размещать organization information на главной или отдельной странице об организации; это не критично, но можно упростить.

## Возможность получения Rich Results по типам разметки

| Тип разметки | Текущее состояние | Eligibility | Риск качества |
|---|---|---|---|
| Product snippet | Есть на 24 товарных URL | Технически близко к eligible | Средний: visible facts добавлены, rating evidence еще нужно подтвердить |
| Merchant listing | Есть Offer, shipping, return policy | Условно, если страница реально продает товар | Средний: есть visible facts/CTA, но нет checkout flow |
| Review snippet | Есть `aggregateRating` на 24 товарах | Сомнительно | Средний/высокий: rating виден, источник отзывов не ясен |
| Breadcrumb | 76 nodes, positions/items ok | Хорошая eligible-зона | Низкий |
| FAQ rich result | 2 pages, 33 Q/A видимы | Не использовать как Google SERP-цель после `2026-05-07` | Низкий технически, высокий ожиданиями |
| Article | 14 nodes | Хорошая семантика | Средний: image ratios, author inline data |
| NewsArticle | 14 nodes | Хорошая семантика | Средний: image ratios, author inline data |
| Organization | 172 nodes | Поддерживающая eligible-зона | Средний: слишком широко дублируется |
| WebSite/SearchAction | 86 nodes | Не дает sitelinks search box | Низкий |
| CollectionPage | 16 nodes | Не отдельный Google rich result | Низкий |

## Критические замечания

### P1: коммерческие данные товара не видны

Обновление статуса `2026-05-06`: риск снижен на уровне контента. Все товарные страницы теперь содержат видимый коммерческий блок с ценой, SKU, гарантией, формулировкой наличия и значением/количеством рейтинга, если рейтинг есть во front matter. MPN и GTIN также видны там, где они существуют.

Затронуто:

- 24/24 `Product` nodes.

Затронутые поля:

- `offers.price`
- `offers.availability`
- `sku`
- `mpn`
- `gtin13`
- `offers.warranty`
- `aggregateRating`

Источник шаблона:

- `layouts/_partials/_schema/product.html`

Почему это важно:

Правила качества Google требуют, чтобы structured data описывала видимый контент страницы. Примеры Product и Review могут быть синтаксически приняты Rich Results Test, но скрытые или неподтвержденные цена/рейтинг могут подавить rich results или создать риск manual action, если данные будут восприняты как вводящие в заблуждение.

Рекомендованное исправление:

- Добавить видимый блок фактов о товаре на каждую товарную страницу:
  - цена в UAH;
  - наличие;
  - SKU;
  - MPN / GTIN, если доступны;
  - гарантия;
  - краткие условия доставки и возврата;
  - рейтинг только если реальные отзывы существуют и показаны пользователю.

### P1: `AggregateRating` имеет высокий риск

Обновление статуса `2026-05-06`: риск частично снижен. Значение рейтинга и количество отзывов теперь видны на товарных страницах, но источник рейтинга и доказательство отдельных отзывов все еще не описаны в теле страницы.

Затронуто:

- 24/24 `Product` nodes.

Почему это важно:

Документация Google Review Snippet требует, чтобы пользователи могли видеть aggregate rating на размеченной странице. Также рекомендуется, чтобы рейтинги приходили от пользователей, а не агрегировались с других сайтов.

Рекомендованное исправление:

- Если рейтинги реальные: показать рейтинг, количество, источник и по возможности отдельные отзывы или summary отзывов на товарной странице.
- Если рейтинги являются placeholder/editorial данными: убрать `rating` из front matter и не выводить `aggregateRating`.

### P1: Merchant Listing может обещать больше, чем видно на странице

Затронуто:

- 24/24 product pages.

Текущая schema включает:

- `Offer`
- `price`
- `priceCurrency`
- `availability`
- `shippingDetails`
- `hasMerchantReturnPolicy`

Риск:

Документация Merchant listing рассчитана на товарные страницы, где покупатель может купить товар. Если это страницы каталога без прямой покупки, Google может воспринимать их как более слабые product snippets, а не как полноценные merchant listings.

Рекомендованное исправление:

- Либо сделать товарные страницы merchant-ready: видимая цена, наличие, purchase/contact CTA, доставка, возврат и способы оплаты;
- либо держать schema консервативной и фокусироваться на Product snippet, а не на полноценном Merchant listing.

### P2: качество изображений `Article` и `NewsArticle` можно улучшить

Затронуто:

- 14 `Article` nodes.
- 14 `NewsArticle` nodes.

Текущее состояние:

- один связанный `ImageObject`;
- размеры в основном `1536x1024`;
- соотношение сторон `1.5`;
- нет массива изображений `16x9`, `4x3`, `1x1`.

Рекомендованное исправление:

- Сгенерировать и отдавать три варианта изображения статьи:
  - `1x1`;
  - `4x3`;
  - `16x9`;
- обновить `Article.image` / `NewsArticle.image` до массива crawlable absolute URLs или `ImageObject`.

### P2: узел автора определяется косвенно

Затронуто:

- 28 article/news nodes.

Текущее состояние:

- `author` задан как `{"@id": "https://aerocool.ua/#organization"}`;
- узел Organization существует в том же графе, поэтому структура валидна.

Улучшение качества:

- Вывести author inline:

```json
{
  "@type": "Organization",
  "@id": "https://aerocool.ua/#organization",
  "name": "Aerocool Ukraine",
  "url": "https://aerocool.ua/"
}
```

Это ближе к лучшим практикам Google author markup.

### P2: узлы Organization дублируются на многих страницах

Затронуто:

- 86 страниц с локальной `Organization`;
- 86 страниц с глобальной parent `Organization`.

Google рекомендует размещать информацию об организации на главной странице или на отдельной странице, которая описывает организацию. Текущее дублирование не является синтаксической ошибкой, но утяжеляет каждую страницу и повышает риск повторения устаревших данных.

Рекомендованное исправление:

- Оставить полный граф `Organization` на home/about/contact.
- На остальных страницах ссылаться на `publisher` только через `@id` или держать меньший стабильный узел.

### P3: `SearchAction` устарел как рычаг Rich Results

Затронуто:

- 86 `WebSite` nodes.

Google удалил визуальный элемент sitelinks search box с 2024-11-21. Узел `SearchAction` не вреден, но его не нужно считать возможностью для rich result.

## Аудит элементов Product

Легенда:

- `Visible commercial fields`: видны ли цена, наличие, рейтинг и SKU-подобные факты в отрендеренном тексте страницы.
- `ID completeness`: покрытие MPN и GTIN.

| URL | Язык | Цена | Полнота ID | Видимые коммерческие поля | Риск |
|---|---|---:|---|---|---|
| `/products/sky/360/` | uk | 12400 | нет MPN, GTIN | нет | P1 |
| `/products/sky/light/` | uk | 8500 | нет MPN, GTIN | нет | P1 |
| `/products/wing/loft-air-dark-grey/` | uk | 12000 | OK | нет | P1 |
| `/products/wing/loft-air-light-grey/` | uk | 12000 | OK | нет | P1 |
| `/products/wing/mesh-black/` | uk | 11000 | OK | нет | P1 |
| `/products/wing/racer-black/` | uk | 11500 | OK | нет | P1 |
| `/products/wing/racer-dark-grey/` | uk | 11500 | OK | нет | P1 |
| `/products/xtal/loft-air-dark-grey/` | uk | 12500 | OK | нет | P1 |
| `/products/xtal/loft-air-light-grey/` | uk | 12500 | OK | нет | P1 |
| `/products/xtal/mesh-black/` | uk | 12000 | OK | нет | P1 |
| `/products/xtal/racer-black/` | uk | 12000 | OK | нет | P1 |
| `/products/xtal/racer-dark-grey/` | uk | 12000 | OK | нет | P1 |
| `/ru/products/sky/360/` | ru | 12400 | нет MPN, GTIN | нет | P1 |
| `/ru/products/sky/light/` | ru | 8500 | нет MPN, GTIN | нет | P1 |
| `/ru/products/wing/loft-air-dark-grey/` | ru | 12000 | OK | нет | P1 |
| `/ru/products/wing/loft-air-light-grey/` | ru | 12000 | OK | нет | P1 |
| `/ru/products/wing/mesh-black/` | ru | 11000 | OK | нет | P1 |
| `/ru/products/wing/racer-black/` | ru | 11500 | OK | нет | P1 |
| `/ru/products/wing/racer-dark-grey/` | ru | 11500 | OK | нет | P1 |
| `/ru/products/xtal/loft-air-dark-grey/` | ru | 12500 | OK | нет | P1 |
| `/ru/products/xtal/loft-air-light-grey/` | ru | 12500 | OK | нет | P1 |
| `/ru/products/xtal/mesh-black/` | ru | 12000 | OK | нет | P1 |
| `/ru/products/xtal/racer-black/` | ru | 12000 | OK | нет | P1 |
| `/ru/products/xtal/racer-dark-grey/` | ru | 12000 | OK | нет | P1 |

### Узел Product

Текущие поля:

- `@type`
- `@id`
- `mainEntityOfPage`
- `name`
- `image`
- `description`
- `sku`
- `category`
- `brand`
- `offers`
- optional `mpn`
- optional `gtin13`
- `aggregateRating`

Статус:

- Обязательная структура для Product snippet: ок.
- Рекомендованные идентификаторы товара: частично.
- Качество: нужен видимый блок фактов.

Улучшение:

- Изменить `brand` с одного `{"@id": "https://aerocool.io/#brand"}` на объект с `@type` и `name` или убедиться, что Rich Results Test корректно разрешает ссылку на Brand.

### Узел Offer

Текущие поля:

- `price`
- `priceCurrency`
- `priceValidUntil`
- `availability`
- `itemCondition`
- `priceSpecification`
- `seller`
- `shippingDetails`
- `hasMerchantReturnPolicy`
- `acceptedPaymentMethod`
- `areaServed`
- optional `warranty`

Статус:

- Обязательные merchant-поля: технически сильные.
- Качество: price/availability/shipping/returns/payment facts теперь видны пользователям.

Обновление статуса `2026-05-07`:

- Product front matter теперь является источником правды для merchant facts; `/faq/` видимо подтверждает доставку через `Нова Пошта`, стоимость доставки `0 грн`, передачу в отправку `0-1 день`, транзит `1-3 дня`, срок возврата `14 дней`, `FreeReturn` и поддержку оплаты наличными/картой.
- Если эти бизнес-правила изменятся, сначала обновить product front matter, затем синхронизировать текст товарной страницы, `/faq/` и отрендеренный `Product` JSON-LD.

### Узел AggregateRating

Текущее состояние:

- `ratingValue`
- `reviewCount`

Статус:

- Структурно валидно.
- Риск качества: нет видимого источника отзывов.

Рекомендация:

- Показывать ratings или удалить их.

## Аудит Article и NewsArticle

Все articles/news имеют:

- `headline`;
- `description`;
- `datePublished`;
- `dateModified`;
- `author`;
- `publisher`;
- `wordCount`;
- `timeRequired`;
- `mainEntityOfPage`;
- `image` reference.

Общие предупреждения:

- одна ссылка на изображение;
- primary image ratio `1.5`, а не рекомендуемые `1:1`, `4:3`, `16:9`;
- author указан через `@id`, а не inline с `name` / `url`.

| URL | Тип | Слова | Изображение | Опубликовано | Изменено | Риск |
|---|---|---:|---|---|---|---|
| `/articles/how-to-choose-aerocool-chair/` | Article | 1833 | 1536x1024 | 2026-04-14 | 2026-04-30 | P2 image/author |
| `/articles/how-to-choose-chair-by-adjustability/` | Article | 1789 | 1536x1024 | 2026-04-12 | 2026-04-30 | P2 image/author |
| `/articles/racer-vs-loft-air-vs-mesh/` | Article | 1715 | 1536x1024 | 2026-04-08 | 2026-04-30 | P2 image/author |
| `/articles/sky-light-vs-sky-360/` | Article | 1772 | 1536x1024 | 2026-04-04 | 2026-04-30 | P2 image/author |
| `/articles/sync4-sync5-mechanism-guide/` | Article | 1997 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/articles/what-is-synchronous-tilt/` | Article | 1722 | 1536x1024 | 2026-04-10 | 2026-04-30 | P2 image/author |
| `/articles/wing-vs-xtal/` | Article | 1705 | 1536x1024 | 2026-04-06 | 2026-04-30 | P2 image/author |
| `/news/loft-air-and-mesh-focus/` | NewsArticle | 805 | 1536x1024 | 2026-04-20 | 2026-04-30 | P2 image/author |
| `/news/sky-360-launch/` | NewsArticle | 843 | 1536x1024 | 2026-04-18 | 2026-04-30 | P2 image/author |
| `/news/sky-light-launch/` | NewsArticle | 796 | 1536x1024 | 2026-04-19 | 2026-04-30 | P2 image/author |
| `/news/sky-series-launch/` | NewsArticle | 816 | 1536x1024 | 2026-04-15 | 2026-04-30 | P2 image/author |
| `/news/sync4-sync5-mechanism-update/` | NewsArticle | 787 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/news/wing-series-launch/` | NewsArticle | 811 | 1536x1024 | 2026-04-16 | 2026-04-30 | P2 image/author |
| `/news/xtal-series-launch/` | NewsArticle | 789 | 1536x1024 | 2026-04-17 | 2026-04-30 | P2 image/author |
| `/ru/articles/how-to-choose-aerocool-chair/` | Article | 1878 | 1536x1024 | 2026-04-14 | 2026-04-30 | P2 image/author |
| `/ru/articles/how-to-choose-chair-by-adjustability/` | Article | 1787 | 1536x1024 | 2026-04-12 | 2026-04-30 | P2 image/author |
| `/ru/articles/racer-vs-loft-air-vs-mesh/` | Article | 1745 | 1536x1024 | 2026-04-08 | 2026-04-30 | P2 image/author |
| `/ru/articles/sky-light-vs-sky-360/` | Article | 1786 | 1536x1024 | 2026-04-04 | 2026-04-30 | P2 image/author |
| `/ru/articles/sync4-sync5-mechanism-guide/` | Article | 2023 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/ru/articles/what-is-synchronous-tilt/` | Article | 1726 | 1536x1024 | 2026-04-10 | 2026-04-30 | P2 image/author |
| `/ru/articles/wing-vs-xtal/` | Article | 1716 | 1536x1024 | 2026-04-06 | 2026-04-30 | P2 image/author |
| `/ru/news/loft-air-and-mesh-focus/` | NewsArticle | 809 | 1536x1024 | 2026-04-20 | 2026-04-30 | P2 image/author |
| `/ru/news/sky-360-launch/` | NewsArticle | 816 | 1536x1024 | 2026-04-18 | 2026-04-30 | P2 image/author |
| `/ru/news/sky-light-launch/` | NewsArticle | 799 | 1536x1024 | 2026-04-19 | 2026-04-30 | P2 image/author |
| `/ru/news/sky-series-launch/` | NewsArticle | 809 | 1536x1024 | 2026-04-15 | 2026-04-30 | P2 image/author |
| `/ru/news/sync4-sync5-mechanism-update/` | NewsArticle | 792 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/ru/news/wing-series-launch/` | NewsArticle | 835 | 1536x1024 | 2026-04-16 | 2026-04-30 | P2 image/author |
| `/ru/news/xtal-series-launch/` | NewsArticle | 804 | 1536x1024 | 2026-04-17 | 2026-04-30 | P2 image/author |

Примечание:

- На момент этого аудита локальные content rules задавали цель 10000 знаков для evergreen articles и 5000 знаков для news. Текущая документация на 2026-05-06 также задает 6000 знаков для товарных страниц, 6000 для страниц серий, 7000 для hubs `/products/`, `/articles/` и `/news/`, а также 10000 для `/about/`. Это content-depth SEO targets, а не требования eligibility для structured data.

## Аудит Breadcrumb

Текущее состояние:

- 76 `BreadcrumbList` nodes.
- 0 плохих проверок position/item.
- У всех есть минимум два элемента.

Статус:

- Хорошо.

Рекомендация:

- Оставить текущую логику.
- При необходимости сократить очень длинные breadcrumb names для качества отображения в поиске, особенно названия разделов.

## Аудит FAQ

| URL | Вопросы | Видимые Q/A | Ожидание Google FAQ Rich Result |
|---|---:|---|---|
| `/faq/` | 33 | да | очень низкое |
| `/ru/faq/` | 33 | да | очень низкое |

Статус:

- Технически: OK.
- Видимость контента: OK.
- Rich result: не считать целью для Google Search; с `2026-05-07` FAQ rich results больше не показываются.

Рекомендация:

- Оставить FAQPage, если это помогает semantic clarity.
- Не считать FAQPage рычагом Google traffic/rich-result.

## Аудит CollectionPage

Текущее состояние:

| URL | Элементы |
|---|---:|
| `/articles/` | 5 |
| `/articles/page/2/` | 1 |
| `/news/` | 5 |
| `/news/page/2/` | 1 |
| `/products/` | 3 |
| `/products/sky/` | 2 |
| `/products/wing/` | 5 |
| `/products/xtal/` | 5 |
| `/ru/articles/` | 5 |
| `/ru/articles/page/2/` | 1 |
| `/ru/news/` | 5 |
| `/ru/news/page/2/` | 1 |
| `/ru/products/` | 3 |
| `/ru/products/sky/` | 2 |
| `/ru/products/wing/` | 5 |
| `/ru/products/xtal/` | 5 |

Статус:

- Семантически ок.
- Не является прямым Google rich result.

Рекомендация:

- Оставить как вспомогательный граф.
- Для страниц серий можно добавить более сильный видимый вводный текст и внутренние ссылки, но это не требование rich results.

## Аудит Organization, Brand и Logo

Текущее состояние:

- Local organization: `https://aerocool.ua/#organization`
- Global parent organization: `https://aerocool.io/#organization`
- Brand: `https://aerocool.io/#brand`
- Logo: `https://aerocool.ua/#logo`

Сильные стороны:

- Стабильные ID.
- Связь parent/brand задана явно.
- Глобальный `sameAs` есть у global organization/brand, а локальная организация связана через `parentOrganization` и `brand`.
- Contact points присутствуют.
- Локальный адрес, телефон, email и часы работы присутствуют и подтверждены как актуальные business facts на `2026-05-07`.

Риски / улучшения:

- Полный граф Organization повторяется на каждой странице. Google рекомендует organization markup на home/about-style страницах; повторение не требуется.
- Если сайт фактически является онлайн-каталогом/магазином, можно рассмотреть `OnlineStore` для локальной сущности, но только если merchant facts видимы и точны.

## Аудит WebSite / SearchAction

Текущее состояние:

- `WebSite` выводится на 86 из 88 JSON-LD страниц; две служебные contact-success страницы выводят только `BreadcrumbList`, `ImageObject` и `WebPage`.
- `SearchAction` указывает на локализованный URL поиска.

Статус:

- Технически валидно.
- Больше не является видимым Google rich result, потому что Google глобально удалил sitelinks search box с 2024-11-21.

Рекомендация:

- Опционально: оставить для семантической полноты.
- Не оптимизировать это как Search rich-result opportunity.

## Аудит ImageObject

Текущее состояние:

- 174 `ImageObject` nodes.
- Изображения товаров: в основном `2000x2000`, хорошо для презентации товара.
- Изображения статей/новостей: `1536x1024`, пикселей достаточно, но соотношение сторон не соответствует рекомендованным article ratios.
- Изображение логотипа — SVG.

Рекомендации:

- Product: сохранить квадратные primary images.
- Article/news: сгенерировать и вывести варианты 1:1, 4:3, 16:9.
- Organization logo: рассмотреть crawlable PNG fallback дополнительно к SVG, если Rich Results Test когда-либо предупредит по логотипу.

## Аудит WebPage / AboutPage / ContactPage

Текущее состояние:

- `WebPage`: 76 nodes.
- `AboutPage`: 2 nodes.
- `ContactPage`: 2 nodes.

Статус:

- Хороший вспомогательный граф.
- `mainEntity` корректно связывает product/article/news/faq/collection nodes.
- `primaryImageOfPage` ссылается на `ImageObject`.
- Breadcrumb references присутствуют там, где ожидаются.

Рекомендация:

- Оставить.
- Для contact/about убедиться, что все контактные данные organization в schema совпадают с видимым контентом страницы.

## Приоритетный план исправлений

### Этап 1: защитить Product Rich Results

1. Выполнено `2026-05-06`: добавлен видимый блок фактов о товаре в product content:
   - price;
   - наличие;
   - SKU;
   - MPN/GTIN там, где доступны;
   - гарантия;
   - значение/количество рейтинга там, где присутствуют.
2. Остается открытым: задокументировать источник рейтинга или убрать `aggregateRating`, если рейтинги не подтверждаются независимым источником.
3. Выполнено `2026-05-06`: видимо подтвердить условия доставки/возврата/оплаты в `/faq/`.
4. Добавить MPN/GTIN для SKY Light и SKY 360, если официальные идентификаторы существуют; иначе оставить пустыми.

### Этап 2: улучшить качество Rich Results для Article и News

1. Обновить вывод изображений `Article` и `NewsArticle`, добавив варианты 1:1, 4:3, 16:9.
2. Вывести данные author `Organization` inline с `@type`, `name`, `url`.
3. Держать `datePublished` и `dateModified` синхронными с фактическими редакционными изменениями.

### Этап 3: очистить вес глобального графа

1. Выводить полный граф `Organization` только на home/about/contact или держать сокращенную глобальную ссылку на остальных страницах.
2. Оставить `WebSite` на главной; на остальных страницах использовать ссылки при необходимости.
3. Оставить FAQ schema для семантики и соответствия видимому FAQ, но не рассчитывать на Google FAQ rich result.

## Текущая оценка рисков

| Область | Оценка |
|---|---|
| Валидность JSON-LD | Хорошо |
| Breadcrumb rich results | Хорошо |
| Синтаксис Product snippet | Хорошо |
| Качество Product rich-result | Улучшено; следить за доказательствами |
| Merchant listing eligibility | Улучшено; FAQ теперь подтверждает merchant conditions |
| Review snippet eligibility | Средний риск, пока источник рейтинга не задокументирован |
| Ожидание FAQ rich-result | Не является Google Search целью после 2026-05-07 |
| Качество Article/News schema | Среднее |
| Граф Organization | Средняя очистка |

Итог: schema-система структурно сильная, но качество Product rich-result нужно усилить до того, как полагаться на Google rich results в масштабе.
