# Реестр сущностей Aerocool 2026

Обновлено: 2026-07-13.

Реестр остается документом управления сущностями: `confirmed` сущности можно использовать в JSON-LD, а новые `staged` или `planned` сущности не должны становиться сильными связями без видимого подтверждения на странице. Аудиты `50`, `57` и `68` сохраняют историю формирования реестра; текущее состояние сверяется с `data/entities.yaml`, [отчетом по сущностям](32-entity-performance-report-2026.md) и актуальным аудитом из [карты документации](../01-documentation-map.md#5-текущий-аудит).

Этот документ — канонический реестр сущностей проекта `Aerocool Ukraine`. Он нужен для управляемого Entity SEO, AI Search, `about_entities`, `mentions_entities`, `ProductGroup`, `Product.color`, `additionalProperty`, `llms.txt`, будущего `Callable Actions Registry` и структурированного [data/entities.yaml](../../data/entities.yaml).

Если вы впервые работаете с entity-полями, сначала прочитайте [Entity Registry: гайд для новичка](22-entity-registry-beginner-guide-2026.md).

Реестр не заменяет `schema_types`. Поле `schema_types` по-прежнему выбирает типы JSON-LD, а registry фиксирует стабильные сущности, `@id`, entity home, связи, владельца фактов и условия внедрения.

## Проверенный снимок реестра

Повторно проверено 2026-07-10: в `data/entities.yaml` зафиксировано `63` сущности — `61 confirmed`, `0 planned` и `2 do-not-markup`. Неизвестных ссылок из front matter нет; `about_entities` и `mentions_entities` используют только `confirmed` сущности; `product_group_id` остается только у реальных цветовых вариантов WING/XTAL и указывает на `confirmed` ProductGroup.

Оценка Entity Registry: `9.7 / 10`.

Активация `2026-05-26`: `dual-backrest`, `replaceable-elements` и `long-sitting` переведены в `confirmed`, потому что для них уже есть сильный видимый контент, стабильные entity homes и точечное использование в front matter.

Активация `2026-05-31`: четыре реальные ProductGroup для WING/XTAL цветовых вариантов переведены в `confirmed`, duplicate registry ID `products-collection` удален в пользу канонического `aerocool-catalog`, а `lumbar-support`, `armrests-4d-x-360`, `armrests-3d-x-360`, `hot-room`, `leatherette-material` и `fabric-material` включены как `confirmed` сущности. Дополнительно добавлена `image-license-policy`: она описывает видимую страницу условий использования изображений и поддерживает `ImageObject.license` / `ImageObject.acquireLicensePage`.

Главные открытые задачи registry-слоя:

- не создавать ProductGroup для одиночных товаров без соседних вариантов;
- добавлять новые `planned` feature/use case/material entities только после видимого объяснения и entity home;
- поддерживать регулярный [отчет по эффективности сущностей (Entity Performance Report)](32-entity-performance-report-2026.md) через `npm run entity:report`;
- исполнять операционный процесс поддержки product front matter из [31-product-facts-maintenance-process-2026.md](31-product-facts-maintenance-process-2026.md);
- поддерживать страницу `/image-license/` и `/ru/image-license/`, если меняются права на изображения, владелец или порядок запроса разрешения;
- поддерживать review governance через approved reviews pipeline и не возвращать ручные rating-поля во front matter.

## 1. Как использовать этот документ

- При создании новой страницы сначала определить главную сущность страницы в registry.
- При добавлении `about_entities` или `mentions_entities` использовать только `entity_id` из registry.
- Если сущности нет в registry, сначала добавить ее сюда, затем использовать в контенте или шаблонах.
- Если сущность имеет статус `planned`, ее можно использовать для планирования контента, но не стоит выводить как сильный JSON-LD relationship без видимого объяснения.
- Если сущность имеет статус `do-not-markup`, ее не размечать и не использовать как `sameAs`.

## 2. Основные правила

- `entity_id` должен быть стабильным, коротким, lower-case и `kebab-case`.
- `entity_home` — собственный URL сайта, который лучше всего объясняет сущность человеку.
- `@id` — машинный стабильный идентификатор в JSON-LD graph.
- `sameAs` — только для точного совпадения сущности, не для “похожих” или “связанных” ссылок.
- Local organization `Aerocool Ukraine` не получает global social `sameAs`; она связана с global organization через `parentOrganization` и с global brand через `brand`.
- Внешние профили Aerocool остаются у `https://aerocool.io/#brand` и `https://aerocool.io/#organization`.
- Официальный реестр `sameAs` проверять раз в квартал: URL должен быть живым, стабильным и по-прежнему представлять ту же global Aerocool entity.
- `additionalType` не является заменой `sameAs`. Его можно рассматривать только для уточнения типа через внешний словарь, если внешний термин является более узким типом текущей сущности.
- Product facts canonical source — product front matter; владелец business values — команда Aerocool Украина; процесс подтверждения, внесения и QA описан в [31-product-facts-maintenance-process-2026.md](31-product-facts-maintenance-process-2026.md).
- Не добавлять entity fields в `content/`, пока Hugo templates не умеют безопасно читать эти поля.
- Не создавать новые schema nodes, если человек не видит соответствующий факт на странице.
- Hugo генерирует отдельные registry-based JSON-LD nodes для `confirmed` сущностей классов `Material`, `Mechanism`, `Feature`, `UseCase`, `ContentTopic` и `Policy`, если они используются в `about_entities` или `mentions_entities`. Product, Organization, Brand, WebPage и Collection nodes не дублируются, потому что для них уже есть отдельные schema partials.
- Registry-based nodes должны оставаться объяснительными: они называют сущность, дают стабильный `@id`, `entity_home`, localized `name`, `alternateName`, `identifier`, `termCode` для `DefinedTerm`, `url` и `subjectOf`, но не заменяют Product/Offer/FAQ/Article schema. Не добавлять в `DefinedTerm` свойства, которые Schema.org Validator не принимает для этого типа, например `inLanguage` или `isRelatedTo`.
- Registry refs в `about`, `mentions`, `hasVariant` и похожих связях должны передавать не только `@id`, но и `@type` из `schema_candidate`. Это защищает от ситуации, когда валидатор видит ссылку на `CollectionPage`, `Product`, `DefinedTerm` или `Policy` как объект без типа.
- Agentic actions не добавлять в JSON-LD, пока нет реального business endpoint, owner, input validation, success/failure states и видимого процесса для пользователя.

## 3. Статусы сущностей

| Статус | Значение | Можно использовать в планировании | Можно использовать в JSON-LD сейчас |
| --- | --- | --- | --- |
| `confirmed` | Сущность имеет entity home, факты подтверждены, связана с видимым контентом | Да | Да, если шаблон поддерживает |
| `planned` | Сущность важна, но нужен блок глоссария, видимые характеристики, навигация вариантов или mapping | Да | Пока нет |
| `needs-review` | Сущность есть в контенте, но факты, `@id` или entity home нужно уточнить | Да | Нет |
| `do-not-markup` | Сущность не стоит размечать отдельно на текущем этапе | Нет | Нет |

## 4. Справочник полей

| Поле | Значение |
| --- | --- |
| `entity_id` | Стабильный внутренний ID, который используют future front matter и resolver |
| `name_uk` / `name_ru` / `name_en` | Локализованные названия для редакторов и будущих UI/schema helpers |
| `entity_class` | Класс сущности: Brand, Organization, ProductSeries, ProductGroup, Product, ProductVariant, Material, Mechanism, UseCase, Policy, ContentHub |
| `schema_candidate` | Возможный тип Schema.org; не всегда активен прямо сейчас |
| `current_jsonld_id` | Текущий `@id`, который уже выводят Hugo-шаблоны |
| `future_jsonld_id` | Стабильный `@id` для registry-managed nodes, которые не выводятся базовыми Product/Organization/Page partials |
| `entity_home` | Лучший URL на `aerocool.ua`, который объясняет сущность |
| `owner` | Ответственный за фактическую точность |
| `status` | Статус сущности в registry |
| `sameAs` | Только внешние ссылки на точное совпадение сущности |
| `parent` | Родительская сущность в графе |
| `related` | Полезные связанные сущности для будущих `mentions` |

## 5. Правила для ID

| Класс сущности | Шаблон `entity_id` | Текущий / будущий шаблон `@id` |
| --- | --- | --- |
| Brand | `aerocool-brand` | `https://aerocool.io/#brand` |
| Локальная организация | `aerocool-ukraine` | `https://aerocool.ua/#organization` |
| WebSite | `aerocool-website` | `https://aerocool.ua/#website` |
| Коллекция | `<section>-collection` | `https://aerocool.ua/<section>/#collection` |
| Товарная серия | `<series>-series` | `https://aerocool.ua/products/<series>/#collection` |
| Группа вариантов товара | `<series>-<model>-product-group` | `https://aerocool.ua/products/<series>/#<series>-<model>-product-group` |
| Вариант товара | `<series>-<variant>` | `https://aerocool.ua/products/<series>/<variant>/#product` |
| Материал | `<name>-material` | Будущий glossary/entity node |
| Механизм | `<name>-mechanism` | Будущий glossary/entity node |
| Сценарий использования | `<intent-name>` | Будущий glossary/entity node или content hub |
| Политика | `<policy>-policy` | `/faq/`, `/image-license/` или будущая отдельная policy page |

## 6. Базовые сущности бренда, сайта и организации

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | current_jsonld_id | entity_home | owner | status | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `aerocool-brand` | Aerocool | Aerocool | Aerocool | Brand | `Brand` | `https://aerocool.io/#brand` | `/about/` | Global Aerocool + Aerocool Ukraine | `confirmed` | Глобальный бренд. Официальные глобальные социальные профили находятся здесь как `sameAs`. |
| `aerocool-global-organization` | Aerocool Advanced Technologies Corp. | Aerocool Advanced Technologies Corp. | Aerocool Advanced Technologies Corp. | Organization | `Organization` | `https://aerocool.io/#organization` | `https://aerocool.io/` | Global Aerocool | `confirmed` | Глобальная родительская организация. |
| `aerocool-ukraine` | Aerocool Ukraine | Aerocool Україна | Aerocool Украина | Organization | `Organization` | `https://aerocool.ua/#organization` | `/about/` + `/contact/` | Aerocool Ukraine | `confirmed` | Локальные факты подтверждены `2026-05-07`; локальный `sameAs` для глобальных social profiles не используется. |
| `aerocool-website` | Aerocool Ukraine website | Сайт Aerocool Україна | Сайт Aerocool Украина | WebSite | `WebSite` | `https://aerocool.ua/#website` | `/` | Aerocool Ukraine | `confirmed` | Site-level сущность для поиска, publisher-связей и графа страниц. |
| `aerocool-logo` | Aerocool logo | Логотип Aerocool | Логотип Aerocool | ImageObject | `ImageObject` | `https://aerocool.ua/#logo` | `/` | Aerocool Ukraine | `confirmed` | Общий визуальный identity node. |

## 7. Официальный реестр `sameAs`

Сейчас только эти глобальные профили подтверждены как ссылки точного совпадения для глобальных сущностей Aerocool.

| Целевая сущность | sameAs URL | Статус | Примечания |
| --- | --- | --- | --- |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.facebook.com/AeroCoolGlobal/` | `confirmed` | Официальный глобальный профиль. |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.instagram.com/aerocool_global` | `confirmed` | Официальный глобальный профиль. |
| `aerocool-brand`, `aerocool-global-organization` | `https://x.com/AerocoolGlobal` | `confirmed` | Официальный глобальный профиль. |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.linkedin.com/company/aerocool-advanced-technologies-corp./` | `confirmed` | Официальный глобальный профиль. |
| `aerocool-brand`, `aerocool-global-organization` | `https://www.youtube.com/@AeroCoolGlobal` | `confirmed` | Официальный глобальный профиль. |
| `aerocool-ukraine` | отсутствует | `confirmed` | Локальная сущность использует `parentOrganization` и `brand`, а не локальный `sameAs`. |

## 8. Сущности страниц и контентных хабов

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | current_jsonld_id | entity_home | status | Рекомендуемые `about_entities` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `home-page` | Homepage | Головна | Главная | WebPage | `WebPage` | `https://aerocool.ua/#webpage` | `/` | `confirmed` | `aerocool-brand`, `aerocool-ukraine`, `aerocool-catalog` |
| `about-page` | About Aerocool Ukraine | Про Aerocool Україна | Об Aerocool Украина | AboutPage | `AboutPage` | `https://aerocool.ua/about/#webpage` | `/about/` | `confirmed` | `aerocool-brand`, `aerocool-ukraine`, `aerocool-global-organization` |
| `contact-page` | Contacts | Контакти | Контакты | ContactPage | `ContactPage` | `https://aerocool.ua/contact/#webpage` | `/contact/` | `confirmed` | `aerocool-ukraine` |
| `faq-page` | FAQ | FAQ | FAQ | FAQPage | `FAQPage` | `https://aerocool.ua/faq/#faq` | `/faq/` | `confirmed` | `delivery-policy`, `payment-policy`, `return-policy`, `warranty-policy` |
| `aerocool-catalog` | Aerocool chairs catalog | Каталог крісел Aerocool | Каталог кресел Aerocool | Collection | `CollectionPage` | `https://aerocool.ua/products/#collection` | `/products/` | `confirmed` | `gaming-chair`, `office-chair`, `computer-chair`, `sky-series`, `wing-series`, `xtal-series` |
| `articles-collection` | Aerocool articles | Статті Aerocool | Статьи Aerocool | Collection | `CollectionPage` | `https://aerocool.ua/articles/#collection` | `/articles/` | `confirmed` | `chair-selection`, `ergonomic-chair`, `aerocool-catalog` |
| `news-collection` | Aerocool news | Новини Aerocool | Новости Aerocool | Collection | `CollectionPage` | `https://aerocool.ua/news/#collection` | `/news/` | `confirmed` | `aerocool-brand`, `aerocool-catalog` |

## 9. Сущности товарных серий

| entity_id | name_en | name_uk | name_ru | entity_class | current_schema | future_schema | current_jsonld_id | entity_home | status | Главные связи |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `sky-series` | Aerocool SKY | Aerocool SKY | Aerocool SKY | ProductSeries | `CollectionPage` | Коллекция списка товаров/серии | `https://aerocool.ua/products/sky/#collection` | `/products/sky/` | `confirmed` | parent `aerocool-catalog`; товары `sky-light`, `sky-360`; mentions `mesh-material`, `sync4-mechanism`, `sync5-mechanism` |
| `wing-series` | Aerocool WING | Aerocool WING | Aerocool WING | ProductSeries | `CollectionPage` | Коллекция списка товаров/серии | `https://aerocool.ua/products/wing/#collection` | `/products/wing/` | `confirmed` | parent `aerocool-catalog`; товары WING; ProductGroup только для цветовых вариантов моделей; mentions `racer-material`, `loft-air-material`, `mesh-material`, `11d-adjustment`, `dual-backrest` |
| `xtal-series` | Aerocool XTAL | Aerocool XTAL | Aerocool XTAL | ProductSeries | `CollectionPage` | Коллекция списка товаров/серии | `https://aerocool.ua/products/xtal/#collection` | `/products/xtal/` | `confirmed` | parent `aerocool-catalog`; товары XTAL; ProductGroup только для цветовых вариантов моделей; mentions `racer-material`, `loft-air-material`, `mesh-material`, `7d-adjustment`, `replaceable-elements` |

## 10. Сущности `ProductGroup`, активные для вариантов

`ProductGroup` выводится только для реальных вариантов одной модели, где есть видимая навигация между вариантами. Одиночные товары не получают ProductGroup. На 2026-05-31 активны только четыре цветовые группы WING/XTAL.

Validator-safe правило для `ProductGroup`: выводить `@type`, `@id`, `name`, `productGroupID`, `url`, `brand`, `hasVariant` и `variesBy`; не добавлять `inLanguage` и `isPartOf`, потому что Schema.org Validator не принимает эти свойства для `ProductGroup`.

| entity_id | name_en | future_jsonld_id | entity_home | varies_by | variants | status | Условие поддержки |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `wing-racer-product-group` | Aerocool WING Racer | `https://aerocool.ua/products/wing/#wing-racer-product-group` | `/products/wing/` | цвет | `wing-racer-black`, `wing-racer-dark-grey` | `confirmed` | Поддерживать swatches-ссылки и факты конкретного варианта. |
| `wing-loft-air-product-group` | Aerocool WING Loft Air | `https://aerocool.ua/products/wing/#wing-loft-air-product-group` | `/products/wing/` | цвет | `wing-loft-air-light-grey`, `wing-loft-air-dark-grey` | `confirmed` | Поддерживать swatches-ссылки и факты конкретного варианта. |
| `xtal-racer-product-group` | Aerocool XTAL Racer | `https://aerocool.ua/products/xtal/#xtal-racer-product-group` | `/products/xtal/` | цвет | `xtal-racer-black`, `xtal-racer-dark-grey` | `confirmed` | Поддерживать swatches-ссылки и факты конкретного варианта. |
| `xtal-loft-air-product-group` | Aerocool XTAL Loft Air | `https://aerocool.ua/products/xtal/#xtal-loft-air-product-group` | `/products/xtal/` | цвет | `xtal-loft-air-light-grey`, `xtal-loft-air-dark-grey` | `confirmed` | Поддерживать swatches-ссылки и факты конкретного варианта. |

## 11. Сущности товаров и товарных вариантов

| entity_id | entity_class | name_en | SKU | MPN | GTIN-13 | series | material | color | adjustability | mechanism | current_jsonld_id | entity_home | product_group |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `sky-360` | Product | Aerocool SKY 360 | `SKY-360-001` | `TEGC-3105101.11` | `4711530967553` | `sky-series` | `mesh-material` | black | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/sky/360/#product` | `/products/sky/360/` |  |
| `sky-light` | Product | Aerocool SKY Light | `SKY-LIGHT-001` | `TEGC-3106101.11` | `4711530967577` | `sky-series` | `mesh-material` | black | `8d-adjustment` | `sync4-mechanism` | `https://aerocool.ua/products/sky/light/#product` | `/products/sky/light/` |  |
| `wing-loft-air-dark-grey` | ProductVariant | Aerocool WING Loft Air Dark Grey | `WING-LADG-001` | `TEGC-309700Z.Z1` | `4711530966501` | `wing-series` | `loft-air-material` | dark-grey | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/loft-air-dark-grey/#product` | `/products/wing/loft-air-dark-grey/` | `wing-loft-air-product-group` |
| `wing-loft-air-light-grey` | ProductVariant | Aerocool WING Loft Air Light Grey | `WING-LALG-001` | `TEGC-3097004.41` | `4711530966518` | `wing-series` | `loft-air-material` | light-grey | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/loft-air-light-grey/#product` | `/products/wing/loft-air-light-grey/` | `wing-loft-air-product-group` |
| `wing-mesh-black` | Product | Aerocool WING Mesh Black | `WING-MB-001` | `TEGC-3098001.11` | `4711530966525` | `wing-series` | `mesh-material` | black | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/mesh-black/#product` | `/products/wing/mesh-black/` |  |
| `wing-racer-black` | ProductVariant | Aerocool WING Racer Black | `WING-RB-001` | `TEGC-3096001.11` | `4711530966488` | `wing-series` | `racer-material` | black | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/racer-black/#product` | `/products/wing/racer-black/` | `wing-racer-product-group` |
| `wing-racer-dark-grey` | ProductVariant | Aerocool WING Racer Dark Grey | `WING-RDG-001` | `TEGC-309600Z.Z1` | `4711530966495` | `wing-series` | `racer-material` | dark-grey | `11d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/wing/racer-dark-grey/#product` | `/products/wing/racer-dark-grey/` | `wing-racer-product-group` |
| `xtal-loft-air-dark-grey` | ProductVariant | Aerocool XTAL Loft Air Dark Grey | `XTAL-LADG-001` | `TEGC-210010Z.Z1` | `4711530966792` | `xtal-series` | `loft-air-material` | dark-grey | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/loft-air-dark-grey/#product` | `/products/xtal/loft-air-dark-grey/` | `xtal-loft-air-product-group` |
| `xtal-loft-air-light-grey` | ProductVariant | Aerocool XTAL Loft Air Light Grey | `XTAL-LALG-001` | `TEGC-2100104.41` | `4711530966808` | `xtal-series` | `loft-air-material` | light-grey | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/loft-air-light-grey/#product` | `/products/xtal/loft-air-light-grey/` | `xtal-loft-air-product-group` |
| `xtal-mesh-black` | Product | Aerocool XTAL Mesh Black | `XTAL-MB-001` | `TEGC-2101101.11` | `4711530966815` | `xtal-series` | `mesh-material` | black | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/mesh-black/#product` | `/products/xtal/mesh-black/` |  |
| `xtal-racer-black` | ProductVariant | Aerocool XTAL Racer Black | `XTAL-RB-001` | `TEGC-2099101.11` | `4711530966778` | `xtal-series` | `racer-material` | black | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/racer-black/#product` | `/products/xtal/racer-black/` | `xtal-racer-product-group` |
| `xtal-racer-dark-grey` | ProductVariant | Aerocool XTAL Racer Dark Grey | `XTAL-RDG-001` | `TEGC-209910Z.Z` | `4711530966785` | `xtal-series` | `racer-material` | dark-grey | `7d-adjustment` | `sync5-mechanism` | `https://aerocool.ua/products/xtal/racer-dark-grey/#product` | `/products/xtal/racer-dark-grey/` | `xtal-racer-product-group` |

## 12. Сущности материалов и поверхностей

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | entity_home | status | Текущие сильные страницы | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `racer-material` | Racer | Racer | Racer | Material | `DefinedTerm` или `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | статья о сравнении материалов; товарные страницы Racer | Плотная поверхность, похожая на leatherette, и более простой уход. |
| `loft-air-material` | Loft Air | Loft Air | Loft Air | Material | `DefinedTerm` или `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | статья о сравнении материалов; товарные страницы Loft Air | Ощущение вентилируемого многослойного текстиля. |
| `mesh-material` | Mesh | Mesh / сітка | Mesh / сетка | Material | `DefinedTerm` или `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | статья о сравнении материалов; страницы SKY и Mesh | Сущность для максимальной вентиляции. |
| `leatherette-material` | Leatherette | екошкіра / Leatherette | экокожа / Leatherette | Material | `DefinedTerm` или `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | страницы Racer | Активировано `2026-05-31`; использовать там, где видимо обсуждается leatherette-поверхность Racer. |
| `fabric-material` | Fabric | тканина | ткань | Material | `DefinedTerm` или `Thing` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | страницы Loft Air | Активировано `2026-05-31`; использовать там, где видимо обсуждается тканевая поверхность Loft Air. |

## 13. Сущности механизмов и функций

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | entity_home | status | Сильные страницы | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `synchronous-tilt` | Synchronous Tilt | Synchronous Tilt | Synchronous Tilt | Mechanism | `DefinedTerm` или `Thing` | `/articles/what-is-synchronous-tilt/` | `confirmed` | гайд по sync tilt; товарные страницы | Главная сущность синхронного наклона. |
| `sync4-mechanism` | SYNC4 | SYNC4 | SYNC4 | Mechanism | `DefinedTerm` или `Thing` | `/articles/sync4-sync5-mechanism-guide/` | `confirmed` | гайд SYNC4/SYNC5; SKY Light | Использовать там, где в видимом товарном контенте указан SYNC4. |
| `sync5-mechanism` | SYNC5 | SYNC5 | SYNC5 | Mechanism | `DefinedTerm` или `Thing` | `/articles/sync4-sync5-mechanism-guide/` | `confirmed` | гайд SYNC4/SYNC5; SKY 360, WING, XTAL | Использовать там, где в видимом товарном контенте указан SYNC5. |
| `7d-adjustment` | 7D adjustment | 7D регулювання | 7D регулировка | Feature | `DefinedTerm` или `Thing` | `/articles/how-to-choose-chair-by-adjustability/` | `confirmed` | гайд по регулировкам; страницы XTAL | Раскрывается через видимые товарные `characteristics` / `additionalProperty`, если они есть. |
| `8d-adjustment` | 8D adjustment | 8D регулювання | 8D регулировка | Feature | `DefinedTerm` или `Thing` | `/articles/how-to-choose-chair-by-adjustability/` | `confirmed` | гайд по регулировкам; SKY Light | Раскрывается через видимые товарные `characteristics` / `additionalProperty`, если они есть. |
| `11d-adjustment` | 11D adjustment | 11D регулювання | 11D регулировка | Feature | `DefinedTerm` или `Thing` | `/articles/how-to-choose-chair-by-adjustability/` | `confirmed` | гайд по регулировкам; SKY 360, WING | Раскрывается через видимые товарные `characteristics` / `additionalProperty`, если они есть. |
| `dual-backrest` | Dual backrest | подвійна спинка | двойная спинка | Feature | `DefinedTerm` или `Thing` | `/articles/what-is-dual-backrest/` | `confirmed` | страницы WING; отдельная статья про Dual backrest | Активировано `2026-05-26`; использовать только там, где видимо обсуждается двойная спинка WING. |
| `replaceable-elements` | Replaceable elements | змінні елементи | сменные элементы | Feature | `DefinedTerm` или `Thing` | `/articles/what-is-fully-replaceable-design/` | `confirmed` | страницы XTAL; отдельная статья про replaceable design | Активировано `2026-05-26`; использовать только там, где видимо обсуждаются сменные элементы XTAL. |
| `lumbar-support` | Lumbar support | поперекова підтримка | поясничная поддержка | Feature | `DefinedTerm` или `Thing` | `/products/` | `confirmed` | товарные страницы и страницы серий | Активировано `2026-05-31`; раскрывается через видимые товарные `characteristics` / `additionalProperty`, если они есть. |
| `armrests-4d-x-360` | 4D X 360 armrests | підлокітники 4D X 360 | подлокотники 4D X 360 | Feature | `DefinedTerm` или `Thing` | `/products/wing/` | `confirmed` | страницы WING | Активировано `2026-05-31`; раскрывается через видимые товарные `characteristics` / `additionalProperty`, если они есть. |
| `armrests-3d-x-360` | 3D X 360 armrests | підлокітники 3D X 360 | подлокотники 3D X 360 | Feature | `DefinedTerm` или `Thing` | `/products/sky/` | `confirmed` | страницы SKY 360 | Активировано `2026-05-31`; раскрывается через видимые товарные `characteristics` / `additionalProperty`, если они есть. |

## 14. Сущности сценариев использования и поисковых интентов

| entity_id | name_en | name_uk | name_ru | entity_class | schema_candidate | entity_home | status | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `gaming-chair` | gaming chair | ігрове крісло | игровое кресло | UseCase / ProductCategory | `Thing` или `DefinedTerm` | `/products/` | `confirmed` | Широкий коммерческий intent; сильно представлен в каталоге и товарах. |
| `office-chair` | office chair | офісне крісло | офисное кресло | UseCase / ProductCategory | `Thing` или `DefinedTerm` | `/products/` | `confirmed` | Широкий коммерческий intent; страницы SKY, Loft Air и Mesh. |
| `computer-chair` | computer chair | комп'ютерне крісло | компьютерное кресло | UseCase / ProductCategory | `Thing` или `DefinedTerm` | `/products/` | `confirmed` | Широкий коммерческий intent по всему каталогу. |
| `ergonomic-chair` | ergonomic chair | ергономічне крісло | эргономичное кресло | UseCase / ProductCategory | `Thing` или `DefinedTerm` | `/products/` | `confirmed` | Родительское понятие для статей о выборе кресла. |
| `home-office` | home office | home office | home office | UseCase | `Thing` или `DefinedTerm` | `/articles/how-to-choose-aerocool-chair/` | `confirmed` | Важно для AI Search prompts и товарного текста. |
| `long-sitting` | long sitting | довгі сесії | долгие сессии | UseCase | `Thing` или `DefinedTerm` | `/articles/chair-for-posture-and-long-work/` | `confirmed` | Статьи о долгой работе и долгих игровых сессиях. Активировано `2026-05-26`. |
| `hot-room` | hot room | жарке приміщення | жаркое помещение | UseCase | `Thing` или `DefinedTerm` | `/articles/racer-vs-loft-air-vs-mesh/` | `confirmed` | Активировано `2026-05-31`; связано с выбором Mesh и Loft Air без медицинских claims. |
| `chair-selection` | chair selection | вибір крісла | выбор кресла | ContentTopic | `Thing` или `DefinedTerm` | `/articles/how-to-choose-aerocool-chair/` | `confirmed` | Главная редакционная support-тема. |

## 15. Сущности сервисных политик

Текущий entity home для сервисных политик — `/faq/`. Не создавать отдельную policy schema, пока видимые страницы политик или anchors не стали стабильными.

| entity_id | name_en | name_uk | name_ru | schema_candidate | entity_home | source_of_truth | owner | status | Примечания |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `delivery-policy` | Delivery | Доставка | Доставка | `OfferShippingDetails` / policy reference | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | FAQ отражает product front matter. |
| `payment-policy` | Payment | Оплата | Оплата | payment policy reference | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | Использует `payment_methods`. |
| `return-policy` | Returns | Повернення | Возврат | `MerchantReturnPolicy` | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | Использует `return_days`, `return_method`, `return_fees`. |
| `warranty-policy` | Warranty | Гарантія | Гарантия | `WarrantyPromise` / policy reference | `/faq/` | product front matter | Aerocool Ukraine | `confirmed` | Использует `warranty`. |
| `price-validity-policy` | Price validity | Актуальність ціни | Актуальность цены | Offer validity reference | product front matter | product front matter | Aerocool Ukraine | `confirmed` | `priceValidUntil: 2027-12-31` подтверждено `2026-05-07`. |
| `image-license-policy` | Image usage rights | Права на використання зображень | Права на использование изображений | `Thing` / image policy reference | `/image-license/` | image license page | Aerocool Ukraine + Global Aerocool | `confirmed` | Источник для `ImageObject.license` и `ImageObject.acquireLicensePage`. |

## 16. Карта сущностей для редакционного контента

Этот раздел связывает существующие статьи с основными и вторичными сущностями. Он служит источником планирования для постраничных `about_entities` и `mentions_entities`.

| Страница | Основные `about_entities` | Кандидаты `mentions_entities` | Статус |
| --- | --- | --- | --- |
| `/articles/how-to-choose-aerocool-chair/` | `chair-selection`, `aerocool-catalog` | `sky-series`, `wing-series`, `xtal-series`, `gaming-chair`, `office-chair`, `computer-chair`, `home-office`, `racer-material`, `loft-air-material`, `mesh-material` | `confirmed` |
| `/articles/how-to-choose-chair-by-adjustability/` | `7d-adjustment`, `8d-adjustment`, `11d-adjustment` | `sky-series`, `wing-series`, `xtal-series`, `sky-light`, `sky-360`, `synchronous-tilt` | `confirmed` |
| `/articles/racer-vs-loft-air-vs-mesh/` | `racer-material`, `loft-air-material`, `mesh-material` | `leatherette-material`, `fabric-material`, `hot-room`, `gaming-chair`, `office-chair`, `home-office` | `confirmed` |
| `/articles/sky-light-vs-sky-360/` | `sky-series` | `sky-light`, `sky-360`, `8d-adjustment`, `11d-adjustment`, `sync4-mechanism`, `sync5-mechanism`, `home-office` | `confirmed` |
| `/articles/sync4-sync5-mechanism-guide/` | `sync4-mechanism`, `sync5-mechanism` | `synchronous-tilt`, `sky-light`, `sky-360`, `wing-series`, `xtal-series` | `confirmed` |
| `/articles/what-is-synchronous-tilt/` | `synchronous-tilt` | `sync4-mechanism`, `sync5-mechanism`, `office-chair`, `home-office`, `long-sitting` | `confirmed` |
| `/articles/wing-vs-xtal/` | `wing-series`, `xtal-series` | `11d-adjustment`, `7d-adjustment`, `dual-backrest`, `replaceable-elements`, `racer-material`, `loft-air-material`, `mesh-material`, `gaming-chair`, `computer-chair`, `home-office` | `confirmed` |
| `/articles/what-is-dual-backrest/` | `dual-backrest`, `wing-series` | `long-sitting`, `gaming-chair`, `office-chair`, `home-office`, `sync5-mechanism`, `11d-adjustment`, товары и варианты WING | `confirmed` |
| `/articles/what-is-fully-replaceable-design/` | `replaceable-elements`, `xtal-series` | `long-sitting`, `gaming-chair`, `office-chair`, `home-office`, `sync5-mechanism`, `7d-adjustment`, товары и варианты XTAL | `confirmed` |
| `/articles/chair-for-posture-and-long-work/` | `chair-selection`, `long-sitting`, `ergonomic-chair`, `office-chair` | `dual-backrest`, `replaceable-elements`, `sky-series`, `wing-series`, `xtal-series`, mechanisms, materials | `confirmed` |
| `/articles/gaming-chair-long-sessions/` | `gaming-chair`, `long-sitting`, `chair-selection` | `dual-backrest`, `replaceable-elements`, `wing-series`, `xtal-series`, `sky-series`, materials | `confirmed` |

## 17. Карта сущностей для новостей

| Страница | Основные `about_entities` | Кандидаты `mentions_entities` | Статус |
| --- | --- | --- | --- |
| `/news/sky-series-launch/` | `sky-series` | `sky-light`, `sky-360`, `office-chair`, `computer-chair`, `home-office` | `confirmed` |
| `/news/wing-series-launch/` | `wing-series` | `wing-racer-product-group`, `wing-loft-air-product-group`, `wing-mesh-black`, `11d-adjustment`, `dual-backrest` | `confirmed` |
| `/news/xtal-series-launch/` | `xtal-series` | `xtal-racer-product-group`, `xtal-loft-air-product-group`, `xtal-mesh-black`, `7d-adjustment`, `replaceable-elements` | `confirmed` |
| `/news/sky-360-launch/` | `sky-360` | `sky-series`, `11d-adjustment`, `sync5-mechanism`, `synchronous-tilt`, `home-office` | `confirmed` |
| `/news/sky-light-launch/` | `sky-light` | `sky-series`, `8d-adjustment`, `sync4-mechanism`, `synchronous-tilt`, `office-chair` | `confirmed` |
| `/news/loft-air-and-mesh-focus/` | `loft-air-material`, `mesh-material` | `wing-loft-air-product-group`, `xtal-loft-air-product-group`, `wing-mesh-black`, `xtal-mesh-black`, `hot-room` | `confirmed` |
| `/news/sync4-sync5-mechanism-update/` | `sync4-mechanism`, `sync5-mechanism` | `synchronous-tilt`, `sky-series`, `wing-series`, `xtal-series` | `confirmed` |

## 18. Тройки связей между сущностями

Использовать эти тройки как семантический каркас для будущих JSON-LD-связей.

| Субъект | Предикат | Объект | Доказательство |
| --- | --- | --- | --- |
| `aerocool-ukraine` | `brand` | `aerocool-brand` | schema локальной организации |
| `aerocool-ukraine` | `parentOrganization` | `aerocool-global-organization` | schema локальной организации |
| `aerocool-catalog` | `hasPart` | `sky-series`, `wing-series`, `xtal-series` | `/products/` |
| `sky-series` | `hasProduct` | `sky-light`, `sky-360` | `/products/sky/` |
| `wing-series` | `hasProduct` | товары и варианты WING | `/products/wing/` |
| `xtal-series` | `hasProduct` | товары и варианты XTAL | `/products/xtal/` |
| `wing-racer-product-group` | `hasVariant` | `wing-racer-black`, `wing-racer-dark-grey` | видимая навигация вариантов |
| `wing-loft-air-product-group` | `hasVariant` | `wing-loft-air-light-grey`, `wing-loft-air-dark-grey` | видимая навигация вариантов |
| `xtal-racer-product-group` | `hasVariant` | `xtal-racer-black`, `xtal-racer-dark-grey` | видимая навигация вариантов |
| `xtal-loft-air-product-group` | `hasVariant` | `xtal-loft-air-light-grey`, `xtal-loft-air-dark-grey` | видимая навигация вариантов |
| `racer-material` | `isMaterialOf` | варианты товаров Racer | товарные страницы |
| `loft-air-material` | `isMaterialOf` | варианты товаров Loft Air | товарные страницы |
| `mesh-material` | `isMaterialOf` | товары SKY и Mesh | товарные страницы |
| `sync4-mechanism` | `usedIn` | `sky-light` | товарная страница |
| `sync5-mechanism` | `usedIn` | `sky-360`, товары/варианты WING, товары/варианты XTAL | товарные страницы |
| `delivery-policy` | `appliesTo` | Product offers | product front matter и `/faq/` |
| `return-policy` | `appliesTo` | Product offers | product front matter и `/faq/` |
| `warranty-policy` | `appliesTo` | Product offers | product front matter и `/faq/` |

## 19. Связь с метаданными страницы

Шаблоны поддерживают `about_entities`, `mentions_entities` и `product_group_id`. На `2026-05-07` эти поля заполнены на приоритетных страницах: главной, about, contact, FAQ, product/article/news hubs, страницах серий, актуальных статьях, актуальных новостях и товарных страницах. На `2026-05-31` одиночные ProductGroup-записи удалены, `product_group_id` остался только у реальных групп моделей с несколькими вариантами, а четыре ProductGroup-сущности WING/XTAL стали активны в JSON-LD.

Будущие добавления по-прежнему нужно делать постранично после проверки этого registry и видимого контента страницы.

Пример товара:

```yaml
about_entities:
  - wing-racer-black
  - wing-series
  - gaming-chair
mentions_entities:
  - racer-material
  - 11d-adjustment
  - sync5-mechanism
  - synchronous-tilt
  - delivery-policy
  - warranty-policy
product_group_id: "wing-racer-product-group"
variant_attributes:
  material: "racer-material"
  color: "black"
```

Пример статьи:

```yaml
about_entities:
  - racer-material
  - loft-air-material
  - mesh-material
mentions_entities:
  - home-office
  - office-chair
  - gaming-chair
```

Правила:

- `about_entities` должны содержать главную тему страницы.
- `mentions_entities` должны содержать видимо обсуждаемые связанные товары, серии, материалы, механизмы, сценарии использования и политики.
- `product_group_id` должен указывать на реальную multi-variant сущность из раздела 10; сейчас подходят и выводятся в JSON-LD только четыре группы WING/XTAL.
- `variant_attributes` должны содержать только видимые атрибуты.
- Неизвестные значения `entity_id` должны ломать QA до production.
- Значения сущностей должны быть стабильными ID, а не отображаемыми названиями.

## 20. Структура `data/entities.yaml`

Структурированный источник resolver теперь находится в [data/entities.yaml](../../data/entities.yaml). Его форма соответствует такому паттерну:

```yaml
wing-racer-black:
  name:
    en: "Aerocool WING Racer Black"
    uk: "Aerocool WING Racer Black"
    ru: "Aerocool WING Racer Black"
  entity_class: "ProductVariant"
  schema_candidate: "Product"
  current_jsonld_id: "https://aerocool.ua/products/wing/racer-black/#product"
  entity_home: "/products/wing/racer-black/"
  parent: "wing-racer-product-group"
  related:
    - "wing-series"
    - "racer-material"
    - "11d-adjustment"
    - "sync5-mechanism"
  status: "confirmed"
```

Требования к механизму разрешения сущностей:

- возвращать локализованное отображаемое название;
- возвращать `@id`;
- падать или предупреждать при неизвестном ID;
- по умолчанию фильтровать будущие `planned`, `needs-review` и `do-not-markup` сущности из JSON-LD;
- поддерживать `about`, `mentions`, `isVariantOf` и `inProductGroupWithID`;
- генерировать registry-based nodes для confirmed dictionary/policy entities, используемых в `about_entities` и `mentions_entities`;
- выводить `Product.color` из product-сущностей registry;
- выводить локализованный `Product.material` по ссылке `material` только для подтвержденной сущности материала;
- выводить `Product.additionalProperty` из видимых `characteristics`.

## 21. Будущий реестр вызываемых действий

`How Marketers Can Prepare Their Organization for the Agentic Web` добавляет будущий слой: AI agents должны понимать не только сущности, но и допустимые действия. Для Aerocool это P3-документация, а не текущий JSON-LD/API-вывод.

Action нельзя создавать как “идею”. Он должен соответствовать реальному бизнес-процессу.

| Action ID | Человеческое действие | Возможная сущность/Endpoint | Минимальные входные данные | Владелец | Статус | Блокер |
| --- | --- | --- | --- | --- | --- | --- |
| `compare-chairs` | Сравнить кресла | страница сравнения товаров/серий | ID серии/модели, язык, сценарий | Aerocool Ukraine + content owner | `planned` | Нужны стабильные правила сравнения и видимые страницы сравнения |
| `check-availability` | Проверить наличие | product front matter или будущий inventory endpoint | product ID, регион при необходимости | Aerocool Ukraine | `planned` | Процесс обновления наличия описан; action останется planned до появления реального endpoint |
| `request-consultation` | Запросить консультацию | contact form | имя, контакт, интересующий товар/сценарий, язык | Aerocool Ukraine | `planned` | Нужен подтвержденный процесс обработки заявок |
| `submit-contact-form` | Отправить форму контакта | contact form | имя, email/phone, сообщение, consent где нужно | Aerocool Ukraine | `planned` | Нужны validation, anti-spam и success/failure states |
| `buy-product` | Купить товар | checkout или официальный purchase endpoint | product ID, цена, доставка, оплата, контакт | Aerocool Ukraine | `do-not-markup` | Нет подтвержденного checkout/purchase endpoint |
| `schedule-consultation` | Записаться на консультацию | календарь/слоты | тема, контакт, дата/время, язык | Aerocool Ukraine | `do-not-markup` | Нет подтвержденного расписания и владельца слотов |

Правила для будущих actions:

- action должен опираться на `confirmed` entities и актуальные product facts;
- действие должно иметь понятный источник правды;
- action должен иметь владельца в команде;
- action должен иметь обязательные поля, правила валидации и состояния ошибки;
- action нельзя публиковать, если пользователь не может выполнить его на сайте или через официальный процесс;
- `BuyAction` и `ScheduleAction` запрещены до появления реального checkout или расписания.

До production-стабилизации этот раздел использовать только как roadmap.

## 22. Правила проверки качества

- Каждое значение `about_entities` должно существовать в этом registry.
- Каждое значение `mentions_entities` должно существовать в этом registry.
- Страница не должна ссылаться на product group, если группа не связана или не объяснена видимо.
- Одиночный товар не должен использовать `product_group_id`; вместо этого использовать связь с серией.
- Не выводить новые сущности `ProductGroup`, пока навигация вариантов не видима.
- Не выводить `additionalProperty`, пока характеристики товара не видимы в таблице или сопоставимом блоке.
- Не выводить standalone `Review` или reviewer entities из registry. Product-level review/rating schema может использовать только approved и видимые отзывы из `data/generated/reviews.json`.
- Не добавлять `OnlineStore`, пока сайт остается каталогом без подтвержденного checkout flow.
- Не добавлять `sameAs` на marketplace-страницы, случайные отзывы или неофициальные страницы.
- Если у сущности меняется entity home, обновить внутренние ссылки, registry, будущий front matter и schema tests в одном изменении.

## 23. Что пока не размечать

| Кандидат | Статус | Причина |
| --- | --- | --- |
| `OnlineStore` | `do-not-markup` | Требует подтвержденного merchant/checkout-сценария. |
| `Review` | `do-not-markup` | Отзывы обрабатываются по товарам через снимки approved-отзывов, а не как отдельная сущность реестра. |
| Люди-авторы/reviewer people | `do-not-markup` | Пока нет реальной editorial person model. |
| Marketplace-страницы как `sameAs` | `do-not-markup` | Не являются точным совпадением сущности. |
| Случайные product reviews как `sameAs` | `do-not-markup` | Не являются точным совпадением сущности. |
| MCP/NLWeb/chatbot entities | `do-not-markup` | Только P3 после production и стабильного knowledge graph. |
| `BuyAction` / `ScheduleAction` | `do-not-markup` | Требует реального checkout, официального purchase endpoint или scheduling workflow. |

## 24. План внедрения

1. Держать этот markdown-файл как канонический registry во время первого прохода внедрения.
2. Добавить видимую навигацию вариантов для product groups с несколькими вариантами.
3. Добавить видимые таблицы характеристик товара.
4. Выполнено `2026-05-07`: добавить структурированный [data/entities.yaml](../../data/entities.yaml).
5. Выполнено `2026-05-07`: внедрить safe entity resolver partials.
6. Выполнено `2026-05-07`: выводить optional `about` и `mentions` из resolver, когда поля есть во front matter.
7. Выполнено `2026-05-07`: добавить [22-entity-registry-beginner-guide-2026.md](22-entity-registry-beginner-guide-2026.md).
8. Выполнено `2026-05-07`: заполнить `about_entities`, `mentions_entities` и staged `product_group_id` на приоритетных страницах.
9. Выполнено `2026-05-31`: удалить одиночные ProductGroup-записи и оставить `product_group_id` только для реальных цветовых групп вариантов WING/XTAL.
10. Выполнено `2026-05-31`: удалить дубликат `products-collection` и оставить `aerocool-catalog` как единственную каноническую сущность каталога.
11. Выполнено `2026-05-31`: выводить `ProductGroup`, `isVariantOf` и `inProductGroupWithID` для четырех подтвержденных цветовых групп вариантов WING/XTAL.
12. Выполнено `2026-05-31`: выводить `Product.color` из реестра и `Product.additionalProperty` из видимых `characteristics`.
13. Выполнено `2026-07-08`: использовать registry и карту ключевых URL как input для минимального `static/llms.txt`; дальше поддерживать файл как краткую карту сайта, а не как дубликат Entity Registry.
14. Выполнено `2026-07-12`: выводить локализованный `Product.material` по подтвержденной ссылке `material` главной товарной сущности.
15. Держать `Callable Actions Registry` как P3-документацию, пока не появятся реальные business endpoints и владельцы.
