# Аудит Support-статей Schema App по Schema.org связям

Дата аудита: 2026-05-17.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Источник: 9 статей из `support.schemaapp.com`, предоставленных пользователем. Все 9 URL были открыты, прочитаны и сопоставлены с текущей документацией и JSON-LD архитектурой проекта `Aerocool Ukraine`.

Этот аудит не заменяет большой corpus-анализ 126 статей SchemaApp за 2016-2026. Его задача узкая: проверить прикладные support-правила Schema App по `sameAs`, `additionalType`, primary entity, `about`, `mentions`, `@id`, breadcrumbs и image license metadata.

## 1. Статус проверки URL

| # | Статья | Статус | Польза для проекта |
| ---: | --- | --- | --- |
| 1 | [Best Practices: Using the sameAs Property](https://support.schemaapp.com/support/solutions/articles/33000314438-best-practices-using-the-sameas-property) | прочитана | Высокая |
| 2 | [Strategy: Determining the Primary Entity of a Page](https://support.schemaapp.com/support/solutions/articles/33000287578-strategy-determining-the-primary-entity-of-a-page) | прочитана | Высокая |
| 3 | [Common Schema.org Properties for Connecting and Disambiguating Data Items](https://support.schemaapp.com/support/solutions/articles/33000278032-common-schema-org-properties-for-connecting-and-disambiguating-data-items) | прочитана | Высокая |
| 4 | [How To: Use additionalType and sameAs to link to Wikipedia](https://support.schemaapp.com/support/solutions/articles/33000277321-how-to-use-additionaltype-and-sameas-to-link-to-wikipedia) | прочитана | Высокая |
| 5 | [Why aren't Schema.org links secure (https)](https://support.schemaapp.com/support/solutions/articles/33000254385-why-aren-t-schema-org-links-secure-https-) | прочитана | Низкая, но полезна для контекста |
| 6 | [Optimizing for Google's Image License Metadata Feature](https://support.schemaapp.com/support/solutions/articles/33000264847-optimizing-for-google-s-image-license-metadata-feature) | прочитана | Средняя, открывает P2-gap |
| 7 | [How To: Create Breadcrumb List Markup](https://support.schemaapp.com/support/solutions/articles/33000254745-how-to-create-breadcrumb-list-markup) | прочитана | Средняя |
| 8 | [Can you help me get started?](https://support.schemaapp.com/support/solutions/articles/33000214106-can-you-help-me-get-started-) | прочитана | Средняя |
| 9 | [How to Develop a Schema Markup Strategy](https://support.schemaapp.com/support/solutions/articles/33000258751-how-to-develop-a-schema-markup-strategy) | прочитана | Средняя |

Результат: список полный, пропущенных статей нет.

## 2. Главный вывод

Статьи подтверждают текущий курс проекта:

- `sameAs` использовать только для точного совпадения сущности;
- `about` и `mentions` разделять по силе связи;
- у каждой важной страницы должна быть понятная primary entity;
- `@id` должен быть стабильным машинным идентификатором;
- `url` должен указывать на официальную страницу сущности;
- `BreadcrumbList` должен отражать реальную иерархию;
- schema strategy должна строиться от целей бизнеса и видимого контента, а не от желания добавить больше JSON-LD.

Главный новый практический gap: `ImageObject` уже есть, но image license metadata пока не описана. Это не P0, потому что сначала нужны подтвержденные права на изображения, лицензия и страница условий использования.

## 3. Что уже покрыто в Aerocool

### `sameAs`

Текущая модель корректная:

- глобальные официальные профили Aerocool живут у `https://aerocool.io/#brand` и `https://aerocool.io/#organization`;
- локальная организация `https://aerocool.ua/#organization` не получает global social `sameAs`;
- local organization связана с глобальной сущностью через `parentOrganization` и с брендом через `brand`.

Это соответствует правилу Schema App: `sameAs` означает exact identity, а не тематическую близость.

### `about`, `mentions`, `mainEntity`

Текущий проект уже использует:

- `about_entities` для главных сущностей страницы;
- `mentions_entities` для заметных вторичных сущностей;
- `WebPage.mainEntity` для связи страницы с главным node;
- `Article.mainEntityOfPage`, `Product.mainEntityOfPage`, `FAQPage.mainEntityOfPage`;
- registry-based nodes для confirmed dictionary/policy entities.

Текущая архитектура соответствует support-статьям Schema App: не заменять точные свойства общим `mentions`, если можно использовать `brand`, `seller`, `publisher`, `author`, `mainEntity`, `parentOrganization` или `isVariantOf`.

### Хлебные крошки

В проекте есть централизованный `BreadcrumbList` partial. Он строит `ListItem`, `item`, `name` и последовательный `position`. Главная страница не получает одноэлементный breadcrumb, что остается корректным локальным решением.

## 4. Что нужно добавить в правила проекта

### 4.1. Матрица выбора основной сущности

Для каждой новой страницы перед schema-разметкой определить primary entity:

| Тип страницы | Primary Entity | Основная связь |
| --- | --- | --- |
| Главная | `Organization` / `Brand` / `WebSite` | site-level graph |
| О бренде | `AboutPage` -> `Organization` | `mainEntity` |
| Контакты | `ContactPage` -> `Organization` / contact points | `mainEntity` |
| Каталог | `CollectionPage` -> catalog/list | `mainEntity` |
| Серия | `CollectionPage`, позже `ProductGroup` где оправдано | `mainEntity`, `hasPart` планируется |
| Товар | `Product` | `mainEntity`, `mainEntityOfPage` |
| Статья | `Article` + главный topic/entity | `about`, `mainEntityOfPage` |
| Новость | `NewsArticle` + событие/серия/товар | `about`, `mainEntityOfPage` |
| FAQ | `FAQPage` | `mainEntity` questions |
| Неясная или слабая страница | сначала улучшить контент | schema не усиливать |

Правило: если нельзя одним предложением объяснить, о какой сущности страница, сначала доработать контент.

### 4.2. `additionalType`

`additionalType` допустим только когда внешний термин является более узким типом для текущей schema.org сущности.

Использовать можно:

- для уточнения типа, если Schema.org слишком общий;
- с Wikidata/Wikipedia только после ручной проверки;
- только когда внешний термин не противоречит базовому `@type`.

Не использовать:

- как замену `sameAs`;
- для связанных, но не идентичных сущностей;
- для keyword-тем;
- для случайного усиления коммерческих страниц.

Для текущего проекта `additionalType` не является срочной задачей. Сначала нужны сильные собственные entity homes для `gaming-chair`, `office-chair`, `Synchronous Tilt`, материалов и механизмов.

### 4.3. Квартальная проверка `sameAs`

Раз в квартал проверять:

- все URL из официального реестра `sameAs`;
- что профиль все еще принадлежит global Aerocool;
- что URL не редиректит на неофициальную или временную страницу;
- что новые внешние ссылки не были добавлены как `sameAs` без проверки.

Если ссылка перестала быть точной identity-связью, ее удалить из JSON-LD и registry.

### 4.4. Метаданные лицензии изображений

Текущий `ImageObject` описывает primary image, но не содержит:

- `license`;
- `acquireLicensePage`;
- `creator`;
- `creditText`;
- `copyrightNotice`.

Google поддерживает image license metadata через structured data или IPTC metadata: [Google Image License Metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata).

Для Aerocool это P2, а не P0:

1. Сначала подтвердить владельца изображений и право использования.
2. Затем определить единую страницу лицензии или условий использования изображений.
3. После этого добавить документированные поля в front matter или data layer.
4. Только потом расширять `page-image-object.html`.

Не добавлять license metadata, если права на изображение или условия использования не подтверждены.

## 5. Обновленные приоритеты

### P1

1. Зафиксировать primary entity decision matrix в schema QA-документации.
2. Добавить правило `additionalType` vs `sameAs`.
3. Добавить quarterly review для `sameAs`.
4. Усилить QA breadcrumbs: последовательный `position`, абсолютный `item`, корректный `name`, соответствие видимой иерархии.

### P2

1. Подтвердить права на product/brand images.
2. Спроектировать image license metadata.
3. Добавить `license` / `acquireLicensePage` только после появления понятной страницы прав.
4. Рассмотреть IPTC metadata для исходных изображений, если команда будет поддерживать media workflow.

## 6. Итоговая оценка полезности

Полезность корпуса для текущего проекта: `8.5 / 10`.

Причина: статьи не меняют архитектуру проекта, но усиливают governance:

- подтверждают текущий строгий подход к `sameAs`;
- подтверждают safe resolver и entity registry;
- уточняют разницу `about` / `mentions` / `mainEntity`;
- добавляют отдельный P2-блок по image license metadata;
- помогают формализовать регулярный QA-процесс.
