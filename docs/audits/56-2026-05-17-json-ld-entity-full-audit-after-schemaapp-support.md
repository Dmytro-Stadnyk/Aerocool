# Полный аудит JSON-LD, Entity Registry и Knowledge Graph после новых данных Schema App

Дата аудита: 2026-05-17.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот документ фиксирует контрольный снимок состояния `JSON-LD`, `Entity Registry`, `sameAs`, `additionalType`, breadcrumbs, image metadata, product facts и ProductGroup после анализа 9 support-статей Schema App.

Связанный источник: [55-2026-05-17-schemaapp-support-knowledge-base-audit.md](55-2026-05-17-schemaapp-support-knowledge-base-audit.md).

## 1. Итоговая оценка

Текущая оценка schema/entity слоя: `8.8 / 10`.

Техническая валидность JSON-LD высокая: сборка проходит, JSON-LD парсится, дублей `@id` нет, `BreadcrumbList` технически корректен, `sameAs` не используется на local organization.

Оценку удерживают открытые операционные и стратегические риски:

- production все еще работает в `development/noindex` режиме;
- `aggregateRating` есть на всех product pages, но источник рейтингов должен быть подтвержден;
- `ProductGroup` подготовлен во front matter, но остается `planned` и не выводится в graph;
- image license metadata зафиксирована как P2-gap и не должна внедряться без подтвержденных прав;
- `additionalType` используется только для service policy explanatory nodes, но должен оставаться под строгим governance.

## 2. Машинная проверка Rendered Graph

Команда проверки:

```bash
npm run build
```

Результат: сборка успешна.

Rendered HTML:

| Метрика | Значение |
| --- | ---: |
| HTML-файлов | `108` |
| Страниц с JSON-LD | `86` |
| JSON parse errors | `0` |
| Дубли top-level `@id` внутри страницы | `0` |
| Service pages `contact/success` с JSON-LD | `0` |
| Страниц с JSON-LD и `noindex,nofollow` в development build | `86` |

Типы в rendered graph:

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

Вывод: техническая структура graph стабильна. Риск сейчас не в синтаксисе, а в governance: источники фактов, planned-сущности, production gate и подтверждение image rights.

## 3. Entity Registry и Front Matter

`data/entities.yaml` содержит `67` сущностей:

| Статус | Количество |
| --- | ---: |
| `confirmed` | `48` |
| `planned` | `17` |
| `do-not-markup` | `2` |
| `needs-review` | `0` |

Поля в `content/**/*.md`:

| Поле | Count |
| --- | ---: |
| `about_entities` | `234` |
| `mentions_entities` | `632` |
| `product_group_id` | `24` |

Проверка ссылок на registry:

- неизвестных entity IDs в `about_entities` / `mentions_entities` / `product_group_id`: `0`;
- non-confirmed значения в `about_entities` и `mentions_entities`: `0`;
- non-confirmed значения в `product_group_id`: `24`, все являются planned ProductGroup и сознательно не выводятся в JSON-LD.

Вывод: front matter использует registry корректно. Planned ProductGroup остается ожидаемым staged-состоянием, а не ошибкой.

## 4. `sameAs`

Результат rendered graph:

- `sameAs` nodes: `172`;
- local organization `https://aerocool.ua/#organization` с `sameAs`: `0`;
- `sameAs` присутствует только у global `https://aerocool.io/#organization` и `https://aerocool.io/#brand`.

Вывод: новая support-статья Schema App про `sameAs` полностью подтверждает текущую модель. Local organization не должна получать global social profiles как собственный `sameAs`.

Открытая задача: раз в квартал проверять официальный реестр `sameAs`, потому что внешние профили могут измениться.

## 5. `additionalType`

Rendered graph содержит `84` `additionalType`:

| additionalType | Count |
| --- | ---: |
| `https://schema.org/MerchantReturnPolicy` | `28` |
| `https://schema.org/OfferShippingDetails` | `28` |
| `https://schema.org/WarrantyPromise` | `28` |

Где используется: только на explanatory policy nodes вроде `delivery-policy`, `return-policy`, `warranty-policy`.

Вывод: это допустимое текущее применение, потому что оно уточняет service policy nodes и не используется как замена `sameAs`. Но добавлять `additionalType` для Wikipedia/Wikidata или общих терминов нельзя без ручной проверки.

## 6. Хлебные крошки

Rendered graph:

- `BreadcrumbList`: `74`;
- технических проблем с `position`, absolute `item` или `name`: `0`.

Вывод: breadcrumbs технически корректны. После новых данных Schema App правило усилено: проверять breadcrumbs после изменения slug, section, permalink или навигационной иерархии.

## 7. Primary Entity и `mainEntity`

Core pages уже имеют корректную primary entity модель:

- product pages -> `Product`;
- article pages -> `Article`;
- news pages -> `NewsArticle`;
- collection pages -> `CollectionPage`;
- FAQ -> `FAQPage`;
- about/contact -> organization-related page nodes.

Автоматическая проверка нашла `12` `WebPage` без `mainEntity`: это home и paginated index pages (`/page/2/` и локализованные аналоги). Это не P0, но для home можно рассмотреть явный `mainEntity` на `Organization` или `WebSite`.

## 8. Product Facts и Schema Drift

Проверка product front matter:

- product files: `24`;
- обязательные product facts отсутствуют: `0`;
- `priceValidUntil: 2027-12-31` стоит во всех `24` product files;
- `rating` есть во всех `24` product files;
- `aggregateRating` выводится во всех `24` rendered Product nodes.

Вывод: product facts заполнены системно, но `aggregateRating` остается главным P0/P1 quality risk, пока источник рейтингов не подтвержден видимо и операционно.

## 9. Тип ProductGroup

`product_group_id` заполнен на всех `24` товарных языковых страницах. Все ProductGroup-сущности имеют статус `planned`.

Rendered graph:

- `isVariantOf`: `0`;
- `inProductGroupWithID`: `0`;
- ProductGroup refs: `0`.

Вывод: поведение корректное. Шаблон не выводит ProductGroup, пока нет confirmed ProductGroup и видимой variant navigation. Следующий шаг — visible variant navigation между вариантами WING/XTAL и только после этого перевод нужных ProductGroup в `confirmed`.

## 10. ImageObject и Image License Metadata

Rendered graph:

- `ImageObject`: `172`;
- image license metadata nodes: `0`.

Вывод: это ожидаемое состояние после новых данных. Google и Schema App подтверждают пользу `license` / `acquireLicensePage`, но для Aerocool это P2. Нельзя добавлять `license`, `creator`, `creditText`, `copyrightNotice` или `acquireLicensePage`, пока команда не подтвердила права на изображения и страницу условий использования.

## 11. Актуальный список проблем

### P0

1. Production gate: сайт собирается в `development`, все JSON-LD страницы остаются `noindex,nofollow`.
2. `aggregateRating`: источник рейтингов должен быть подтвержден или рейтинг нужно убрать из front matter/schema.

### P1

1. ProductGroup: добавить видимую навигацию вариантов и только потом подтверждать ProductGroup.
2. Primary entity для home: рассмотреть явный `WebPage.mainEntity` на `Organization` или `WebSite`.
3. Quarterly `sameAs` review: добавить в операционный процесс.
4. Schema drift process: формально поддерживать front matter -> visible product block -> FAQ -> JSON-LD как единую цепочку.

### P2

1. Image license metadata: подтвердить права и страницу лицензии до внедрения.
2. `additionalType` для внешних knowledge bases: рассматривать только после entity home и ручной проверки.
3. Gallery/ImageObject expansion: добавить дополнительные product images только если они видимы и crawlable.
4. `additionalProperty`: добавлять после видимых таблиц характеристик.

## 12. Что не делать

- Не добавлять `sameAs` на маркетплейсы, обзоры, Wikipedia/Wikidata без exact identity.
- Не добавлять image license metadata без подтвержденных прав.
- Не переводить ProductGroup в `confirmed` без видимой навигации вариантов.
- Не использовать `additionalType` как SEO-ключ или как замену `mentions`.
- Не оставлять `aggregateRating`, если источник рейтинга нельзя показать пользователю.

## 13. Вывод

После новых данных Schema App архитектура проекта подтверждена. Слабые места не в базовой JSON-LD реализации, а в зрелости процессов:

- production readiness;
- подтверждение rating/reviews;
- регулярная поддержка product facts;
- governance для `sameAs` и `additionalType`;
- будущая image license metadata только после legal/business подтверждения.

Текущий правильный курс: не расширять graph хаотично, а закрыть P0, затем ProductGroup/variant navigation, затем image license и более глубокие product properties.
