# Регламент поддержки Product Facts 2026

Обновлено: 2026-07-10.

Этот документ описывает операционный процесс поддержки товарных фактов для каталога `Aerocool Ukraine`: кто подтверждает данные, где их менять, что проверять после изменения и как не допустить schema drift между front matter, видимой страницей, JSON-LD и `/faq/`.

Простыми словами: если цена, наличие, гарантия, доставка, возврат или оплата изменились в бизнесе, они должны измениться не в одном случайном месте, а пройти один понятный маршрут. Главный источник правды для товарных фактов — front matter конкретной товарной страницы.

## 1. Что считается Product Facts

Product facts — это факты о товаре и условиях покупки, которые влияют на пользователя, `Product` JSON-LD, rich results, AI Search и доверие к сайту.

В проекте к ним относятся:

| Группа | Поля и источники | Где видно пользователю |
| --- | --- | --- |
| Цена и наличие | `price`, `availability`, `priceValidUntil` | товарная страница |
| Идентификаторы | `sku`, `mpn`, `gtin13` | товарная страница, характеристики или коммерческий блок |
| Гарантия | `warranty` | товарная страница, `/faq/` |
| Доставка | `shipping_country`, `shipping_rate`, `shipping_currency`, `shipping_handling_min`, `shipping_handling_max`, `shipping_transit_min`, `shipping_transit_max` | товарная страница, `/faq/` |
| Возврат | `return_days`, `return_method`, `return_fees` | товарная страница, `/faq/` |
| Оплата | `payment_methods` | товарная страница, `/faq/` |
| Характеристики | `characteristics` | вкладка или блок характеристик товара |
| Цвет | `color` в `data/entities.yaml` + видимая характеристика цвета | товарная страница, color dots в карточках, swatches для вариантов |
| Варианты | `product_group_id`, entity registry | swatches и соседние variant pages |
| Отзывы | `review_target_id`, `reviews_enabled`, `data/generated/reviews.json` | видимый блок отзывов |

Не смешивать эти группы. Например, доставка и оплата не должны попадать в `characteristics`, а рейтинг не должен возвращаться в ручные поля `rating.value` и `rating.count`.

## 2. Единый источник правды

Для merchant product facts источник правды такой:

```text
Команда Aerocool Украина
-> подтвержденное бизнес-значение
-> product front matter
-> видимый товарный блок
-> Product JSON-LD
-> /faq/, если факт относится ко всему магазину или политике сервиса
```

Главное правило: сначала обновляется front matter товара, потом видимый контент и проверки. Шаблон [layouts/_partials/_schema/product.html](../../layouts/_partials/_schema/product.html) читает данные из front matter и registry. Его не нужно менять ради одной новой цены, срока доставки или способа оплаты.

Если меняется цвет товара, источник правды для schema-цвета — [data/entities.yaml](../../data/entities.yaml), а видимая характеристика цвета должна быть обновлена в той же задаче. В листингах [layouts/_partials/products/color-dots.html](../../layouts/_partials/products/color-dots.html) сначала использует цвета реальной группы из `product_group_id`; для одиночного товара без группы берет `color` из главной product entity через `about_entities`.

Если меняется rating/review слой, источник правды — approved отзывы в `Netlify Database` и build-time export `data/generated/reviews.json`, а не product front matter. Этот JSON-файл генерируется перед сборкой и не хранится в Git.

## 3. Роли

В каждой задаче по product facts нужно явно назвать роли. В маленькой команде один человек может закрывать несколько ролей, но роль все равно должна быть понятна.

| Роль | Ответственность |
| --- | --- |
| Product Facts Owner | Подтверждает цену, наличие, SKU, MPN, GTIN, цвет, модель и товарные характеристики от имени Aerocool Украина |
| Commercial Policy Owner | Подтверждает гарантию, доставку, возврат, оплату и `priceValidUntil` |
| Content/Schema Editor | Вносит подтвержденные значения в front matter, `data/entities.yaml`, видимый текст и `/faq/` |
| QA Reviewer | Проверяет HTML, JSON-LD, `/faq/`, локализованные версии и отсутствие schema drift |
| Release Owner | Запускает сборку, деплой на `dev`, post-deploy проверку и переносит изменение дальше по release-процессу |

Если задача выполняется через Codex, Codex может быть `Content/Schema Editor` и техническим помощником для `QA Reviewer`, но бизнес-подтверждение остается за командой Aerocool Украина.

## 4. Кто за что отвечает

| Факт | Кто подтверждает | Кто меняет | Кто проверяет |
| --- | --- | --- | --- |
| Цена | Product Facts Owner | Content/Schema Editor | QA Reviewer |
| Наличие | Product Facts Owner | Content/Schema Editor | QA Reviewer |
| `priceValidUntil` | владелец коммерческих условий | редактор контента/schema | специалист QA |
| SKU | владелец товарных фактов | редактор контента/schema | специалист QA |
| MPN | владелец товарных фактов | редактор контента/schema | специалист QA |
| GTIN | владелец товарных фактов | редактор контента/schema | специалист QA |
| Гарантия | Commercial Policy Owner | Content/Schema Editor | QA Reviewer |
| Доставка | Commercial Policy Owner | Content/Schema Editor | QA Reviewer |
| Возврат | Commercial Policy Owner | Content/Schema Editor | QA Reviewer |
| Оплата | Commercial Policy Owner | Content/Schema Editor | QA Reviewer |
| Цвет | Product Facts Owner | Content/Schema Editor | QA Reviewer |
| Характеристики | Product Facts Owner | Content/Schema Editor | QA Reviewer |
| Варианты товара | Product Facts Owner | Content/Schema Editor | QA Reviewer |
| Отзывы и рейтинг | Review Moderator / Release Owner | не через ручной rating front matter | QA Reviewer |

`priceValidUntil: 2027-12-31` подтверждено командой Aerocool Украина как сознательное бизнес-значение для текущих цен. Если дата меняется, это должно быть отдельное подтверждение Commercial Policy Owner, а не техническая правка “чтобы validator был доволен”.

## 5. Типы изменений

### Изменение одного товара

Пример: изменилась цена `SKY Light`, добавился GTIN, уточнен цвет или характеристика.

Нужно обновить:

- украинский front matter `content/products/<series>/<model>/index.md`;
- русский front matter `content/products/<series>/<model>/index.ru.md`;
- видимый товарный текст или характеристики в обеих языковых версиях;
- `data/entities.yaml`, если меняется registry-факт, например `color`;
- цветовую точку в карточках `/products/`, страницы серии и обоих языков;
- `lastmod` в измененных content-файлах.

`/faq/` менять не нужно, если изменение касается только одного товара и не меняет общую политику магазина.

### Изменение политики сервиса

Пример: изменилась гарантия, доставка, срок отправки, условия возврата или способы оплаты.

Нужно обновить:

- product front matter всех затронутых товаров;
- видимые коммерческие блоки товаров;
- `/faq/` и `/ru/faq/`, если пользователь там видит ту же политику;
- entity registry только если меняется сама policy-сущность или ее статус;
- audit/roadmap документацию, если изменение закрывает или создает schema-risk.

### Изменение вариантов

Пример: появилась новая цветовая пара, новый variant URL или новая ProductGroup.

Нужно обновить:

- product front matter каждого варианта;
- `data/entities.yaml`;
- `product_group_id` только если это реальная группа вариантов одной модели;
- видимую variant-навигацию через swatches;
- color dots карточек: для группы они должны отражать цвета вариантов, для одиночного товара — цвет его product entity;
- `about_entities` и `mentions_entities`, если новая сущность уже `confirmed`.

Одиночный товар не получает `product_group_id`. Он связывается с серией через `about_entities`, `series` в registry и страницу серии.

## 6. Порядок работы

1. Зафиксировать запрос на изменение: какие товары, какие поля, какая дата вступления в силу, кто подтверждает бизнес-значение.
2. Проверить, что новое значение публично допустимо и не противоречит видимому контенту, `/faq/`, прайсу, складу или сервисной политике.
3. Обновить product front matter в `uk` и `ru`.
4. Обновить видимый товарный текст, характеристики, коммерческий блок или variant-навигацию.
5. Обновить `/faq/` и `/ru/faq/`, если изменение относится к общей политике доставки, оплаты, возврата или гарантии.
6. Обновить `data/entities.yaml`, если изменился registry-факт: цвет, ProductGroup, entity home, статус или связи.
7. Запустить локальные проверки.
8. Проверить rendered HTML и JSON-LD на измененных страницах.
9. Проверить `dev` branch deploy после публикации.
10. Зафиксировать результат в описании изменения, issue, PR или внутреннем журнале команды.

## 7. Обязательные проверки

Минимальная локальная проверка:

```bash
npm run build
git diff --check
```

После сборки QA Reviewer проверяет:

| Проверка | Что должно быть верно |
| --- | --- |
| HTML товара и листингов | Цена, наличие, SKU, гарантия, доставка, возврат, оплата и характеристики видны пользователю, если они попадают в JSON-LD; color dots совпадают с registry-цветом и реальными вариантами |
| JSON-LD товара | `Product`, `Offer`, `price`, `availability`, `priceValidUntil`, `sku`, `mpn`, `gtin13`, `color`, `additionalProperty`, shipping, return, payment и warranty совпадают с front matter |
| Локализация | `index.md` и `index.ru.md` описывают одни и те же факты разными языками |
| `/faq/` | Политики доставки, оплаты, возврата и гарантии не противоречат товарным страницам |
| Entity Registry | Все `about_entities`, `mentions_entities`, `product_group_id` существуют и имеют допустимый статус |
| Отзывы | Нет ручных `rating.value` и `rating.count`; `AggregateRating` появляется только из снимка approved-отзывов |
| `lastmod` | Содержательно измененные content-файлы получили актуальный `lastmod` |

Если изменение касается только документации, сборка сайта может не менять rendered HTML. Если изменение касается content, schema partials, registry или product front matter, сборка обязательна.

## 8. Post-Deploy проверка

После deploy на `dev` Release Owner или QA Reviewer проверяет опубликованные URL:

- измененную товарную страницу на украинском;
- измененную товарную страницу на русском;
- `/faq/` и `/ru/faq/`, если менялись политики;
- `Product` JSON-LD на опубликованной странице;
- отсутствие неожиданных изменений в breadcrumbs, canonical, hreflang и robots meta.

Production-перенос делать только после проверки `dev`. Если проект все еще собирается с `HUGO_ENVIRONMENT = "development"`, `noindex,nofollow` на `dev` ожидаем и не считается ошибкой product facts.

## 9. Регулярный график

| Что проверять | Частота | Кто владелец |
| --- | --- | --- |
| Цена | при каждом изменении прайса и перед production-релизом | Product Facts Owner |
| Наличие | при каждом изменении склада и перед production-релизом | Product Facts Owner |
| `priceValidUntil` | при изменении ценовой политики и минимум за 60 дней до текущей даты окончания | Commercial Policy Owner |
| SKU/MPN/GTIN | при добавлении товара, изменении официальных данных и квартально для открытых gaps | Product Facts Owner |
| Гарантия, доставка, возврат, оплата | при изменении политики и квартально | Commercial Policy Owner |
| Registry color/ProductGroup | при добавлении вариантов и перед schema/entity audit | Product Facts Owner + Content/Schema Editor |
| Снимок отзывов | после модерации approved-отзывов и новой сборки | Модератор отзывов + ответственный за релиз |

## 10. Правила запрета

Нельзя:

- менять JSON-LD partial ради одного бизнес-значения, если поле уже читается из front matter;
- менять видимый текст без изменения front matter, если факт попадает в `Product` JSON-LD;
- менять front matter без проверки видимого HTML;
- менять `/faq/` так, чтобы он противоречил товарным страницам;
- добавлять `ProductGroup` одиночному товару без реальных вариантов;
- добавлять `AggregateRating` вручную;
- добавлять `mpn` или `gtin13`, если они не подтверждены официально;
- продлевать `priceValidUntil` без бизнес-подтверждения.

## 11. Критерий готовности (Definition Of Done)

Изменение product facts считается завершенным только если:

1. бизнес-значение подтверждено ролью Product Facts Owner или Commercial Policy Owner;
2. product front matter обновлен в обеих языковых версиях;
3. видимый товарный контент подтверждает те же значения;
4. `/faq/` обновлен, если изменение policy-wide;
5. `data/entities.yaml` обновлен, если менялся registry-факт;
6. `npm run build` завершился успешно;
7. `git diff --check` не показывает whitespace-ошибок;
8. rendered JSON-LD совпадает с front matter и HTML;
9. `dev` deploy проверен для затронутых URL;
10. результат зафиксирован в описании изменения.

Если хотя бы один пункт не выполнен, изменение остается незавершенным, даже если сайт технически собирается.
