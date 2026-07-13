# Отчет по эффективности сущностей 2026

Обновлено: 2026-07-13.

Этот отчет связывает реестр сущностей, front matter и собранный JSON-LD. Он показывает, какие сущности являются главными темами страниц, какие упоминаются как связанные и сколько раз их стабильные `@id` встречаются в готовом JSON-LD-графе.

Команда генерации:

```bash
npm run build
npm run entity:report
```

CSV-версия отчета: [32-entity-performance-report-2026.csv](32-entity-performance-report-2026.csv). Ручные метрики GSC, AI и бизнеса добавлять не в сгенерированный CSV, а в [32-entity-performance-overrides.csv](32-entity-performance-overrides.csv), чтобы следующий запуск не потерял данные.

## 1. Статус данных

| Источник | Статус |
| --- | --- |
| Реестр сущностей | заполнено из [data/entities.yaml](../../data/entities.yaml) |
| Front matter `about_entities` | заполнено из `content/**/*.md` |
| Front matter `mentions_entities` | заполнено из `content/**/*.md` |
| Front matter `product_group_id` | заполнено из `content/**/*.md` |
| Ссылки в собранном JSON-LD | заполнено из `public/**/*.html` после `npm run build` |
| GSC impressions/clicks/CTR | из `docs/seo/32-entity-performance-overrides.csv`, сейчас `pending-production` |
| AI citations | из `docs/seo/32-entity-performance-overrides.csv`, сейчас `pending-production` |
| Бизнес-сигнал | из `docs/seo/32-entity-performance-overrides.csv`, сейчас `pending-production` |

## 2. Сводка данных

| Метрика | Значение |
| --- | ---: |
| Сущности в реестре | `65` |
| Confirmed-сущности | `63` |
| Planned-сущности | `0` |
| Do-not-markup-сущности | `2` |
| Разобранные content-страницы | `102` |
| Разобранные JSON-LD scripts | `98` |
| Ошибки парсинга JSON-LD | `0` |
| Сущности с использованием в about | `47` |
| Сущности с использованием в mentions | `48` |
| Сущности со ссылками на `@id` в собранном графе | `63` |

Ошибки парсинга JSON-LD не найдены.

## 3. Сущности с наибольшим числом about-страниц

| Сущность | Количество | URL сущности |
| --- | ---: | --- |
| computer-chair | 36 | [/products/](https://aerocool.ua/products/) |
| office-chair | 30 | [/products/](https://aerocool.ua/products/) |
| home-office | 28 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| chair-selection | 20 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| wing-series | 20 | [/products/wing/](https://aerocool.ua/products/wing/) |
| xtal-series | 20 | [/products/xtal/](https://aerocool.ua/products/xtal/) |
| gaming-chair | 14 | [/products/](https://aerocool.ua/products/) |
| sky-series | 12 | [/products/sky/](https://aerocool.ua/products/sky/) |
| aerocool-ukraine | 10 | [/about/](https://aerocool.ua/about/) |
| aerocool-brand | 8 | [/about/](https://aerocool.ua/about/) |
| aerocool-catalog | 8 | [/products/](https://aerocool.ua/products/) |
| articles-collection | 6 | [/articles/](https://aerocool.ua/articles/) |

## 4. Сущности с наибольшим числом mentions-страниц

| Сущность | Количество | URL сущности |
| --- | ---: | --- |
| synchronous-tilt | 64 | [/articles/what-is-synchronous-tilt/](https://aerocool.ua/articles/what-is-synchronous-tilt/) |
| home-office | 52 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| sync5-mechanism | 48 | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) |
| mesh-material | 44 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| office-chair | 44 | [/products/](https://aerocool.ua/products/) |
| 11d-adjustment | 42 | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) |
| computer-chair | 42 | [/products/](https://aerocool.ua/products/) |
| loft-air-material | 42 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| racer-material | 42 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| sky-series | 40 | [/products/sky/](https://aerocool.ua/products/sky/) |
| gaming-chair | 38 | [/products/](https://aerocool.ua/products/) |
| wing-series | 36 | [/products/wing/](https://aerocool.ua/products/wing/) |

## 5. Сущности с наибольшим числом ссылок на `@id`

| Сущность | Количество | URL сущности |
| --- | ---: | --- |
| aerocool-ukraine | 448 | [/about/](https://aerocool.ua/about/) |
| aerocool-global-organization | 396 | [https://aerocool.io/](https://aerocool.io/) |
| aerocool-logo | 392 | [/](https://aerocool.ua/) |
| aerocool-brand | 288 | [/about/](https://aerocool.ua/about/) |
| home-office | 212 | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) |
| computer-chair | 206 | [/products/](https://aerocool.ua/products/) |
| office-chair | 194 | [/products/](https://aerocool.ua/products/) |
| synchronous-tilt | 184 | [/articles/what-is-synchronous-tilt/](https://aerocool.ua/articles/what-is-synchronous-tilt/) |
| sync5-mechanism | 142 | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) |
| mesh-material | 134 | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) |
| gaming-chair | 132 | [/products/](https://aerocool.ua/products/) |
| aerocool-website | 130 | [/](https://aerocool.ua/) |

## 6. Полная таблица сущностей

| Сущность | Статус | Класс | URL сущности | About | Mentions | Группы | Ссылки в графе | Определения узлов | GSC | AI | Бизнес | Заметки |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| 11d-adjustment | confirmed | Feature | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) | 2 | 42 | 0 | 120 | 44 | pending-production | pending-production | pending-production | OK |
| 7d-adjustment | confirmed | Feature | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) | 2 | 30 | 0 | 86 | 32 | pending-production | pending-production | pending-production | OK |
| 8d-adjustment | confirmed | Feature | [/articles/how-to-choose-chair-by-adjustability/](https://aerocool.ua/articles/how-to-choose-chair-by-adjustability/) | 2 | 22 | 0 | 70 | 24 | pending-production | pending-production | pending-production | OK |
| about-page | confirmed | AboutPage | [/about/](https://aerocool.ua/about/) | 0 | 0 | 0 | 2 | 1 | pending-production | pending-production | pending-production | OK |
| aerocool-brand | confirmed | Brand | [/about/](https://aerocool.ua/about/) | 8 | 34 | 0 | 288 | 98 | pending-production | pending-production | pending-production | OK |
| aerocool-catalog | confirmed | Collection | [/products/](https://aerocool.ua/products/) | 8 | 26 | 0 | 66 | 1 | pending-production | pending-production | pending-production | OK |
| aerocool-editorial-team | confirmed | Organization | [/about/#editorial-policy](https://aerocool.ua/about/#editorial-policy) | 0 | 0 | 0 | 100 | 50 | pending-production | pending-production | pending-production | OK |
| aerocool-global-organization | confirmed | Organization | [https://aerocool.io/](https://aerocool.io/) | 2 | 2 | 0 | 396 | 98 | pending-production | pending-production | pending-production | OK |
| aerocool-logo | confirmed | ImageObject | [/](https://aerocool.ua/) | 0 | 0 | 0 | 392 | 98 | pending-production | pending-production | pending-production | OK |
| aerocool-ukraine | confirmed | Organization | [/about/](https://aerocool.ua/about/) | 10 | 2 | 0 | 448 | 98 | pending-production | pending-production | pending-production | OK |
| aerocool-website | confirmed | WebSite | [/](https://aerocool.ua/) | 0 | 0 | 0 | 130 | 49 | pending-production | pending-production | pending-production | OK |
| armrests-3d-x-360 | confirmed | Feature | [/products/sky/](https://aerocool.ua/products/sky/) | 0 | 4 | 0 | 10 | 4 | pending-production | pending-production | pending-production | OK |
| armrests-4d-x-360 | confirmed | Feature | [/products/wing/](https://aerocool.ua/products/wing/) | 0 | 12 | 0 | 26 | 12 | pending-production | pending-production | pending-production | OK |
| articles-collection | confirmed | Collection | [/articles/](https://aerocool.ua/articles/) | 6 | 0 | 0 | 14 | 1 | pending-production | pending-production | pending-production | OK |
| chair-selection | confirmed | ContentTopic | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) | 20 | 2 | 0 | 66 | 22 | pending-production | pending-production | pending-production | OK |
| computer-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 36 | 42 | 0 | 206 | 78 | pending-production | pending-production | pending-production | OK |
| contact-page | confirmed | ContactPage | [/contact/](https://aerocool.ua/contact/) | 0 | 4 | 0 | 6 | 1 | pending-production | pending-production | pending-production | OK |
| delivery-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | OK |
| dual-backrest | confirmed | Feature | [/articles/what-is-dual-backrest/](https://aerocool.ua/articles/what-is-dual-backrest/) | 2 | 4 | 0 | 18 | 6 | pending-production | pending-production | pending-production | OK |
| ergonomic-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 4 | 16 | 0 | 60 | 20 | pending-production | pending-production | pending-production | OK |
| fabric-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 0 | 10 | 0 | 22 | 10 | pending-production | pending-production | pending-production | OK |
| faq-page | confirmed | FAQPage | [/faq/](https://aerocool.ua/faq/) | 2 | 0 | 0 | 4 | 1 | pending-production | pending-production | pending-production | OK |
| gaming-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 14 | 38 | 0 | 132 | 52 | pending-production | pending-production | pending-production | OK |
| home-office | confirmed | UseCase | [/articles/how-to-choose-aerocool-chair/](https://aerocool.ua/articles/how-to-choose-aerocool-chair/) | 28 | 52 | 0 | 212 | 80 | pending-production | pending-production | pending-production | OK |
| home-page | confirmed | WebPage | [/](https://aerocool.ua/) | 0 | 0 | 0 | 1 | 1 | pending-production | pending-production | pending-production | OK |
| hot-room | confirmed | UseCase | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 0 | 6 | 0 | 14 | 6 | pending-production | pending-production | pending-production | OK |
| image-license-policy | confirmed | Policy | [/image-license/](https://aerocool.ua/image-license/) | 2 | 0 | 0 | 4 | 2 | pending-production | pending-production | pending-production | OK |
| leatherette-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 0 | 10 | 0 | 22 | 10 | pending-production | pending-production | pending-production | OK |
| loft-air-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 4 | 42 | 0 | 128 | 46 | pending-production | pending-production | pending-production | OK |
| long-sitting | confirmed | UseCase | [/articles/chair-for-posture-and-long-work/](https://aerocool.ua/articles/chair-for-posture-and-long-work/) | 4 | 4 | 0 | 24 | 8 | pending-production | pending-production | pending-production | OK |
| lumbar-support | confirmed | Feature | [/products/](https://aerocool.ua/products/) | 0 | 30 | 0 | 66 | 30 | pending-production | pending-production | pending-production | OK |
| mesh-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 4 | 44 | 0 | 134 | 48 | pending-production | pending-production | pending-production | OK |
| news-collection | confirmed | Collection | [/news/](https://aerocool.ua/news/) | 2 | 0 | 0 | 6 | 1 | pending-production | pending-production | pending-production | OK |
| office-chair | confirmed | UseCase | [/products/](https://aerocool.ua/products/) | 30 | 44 | 0 | 194 | 74 | pending-production | pending-production | pending-production | OK |
| online-store | do-not-markup | BusinessModel |  | 0 | 0 | 0 | 0 | 0 | pending-production | pending-production | pending-production | do-not-markup |
| payment-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | OK |
| price-validity-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 0 | 0 | 4 | 2 | pending-production | pending-production | pending-production | OK |
| privacy-policy | confirmed | Policy | [/privacy/](https://aerocool.ua/privacy/) | 2 | 0 | 0 | 4 | 2 | pending-production | pending-production | pending-production | OK |
| racer-material | confirmed | Material | [/articles/racer-vs-loft-air-vs-mesh/](https://aerocool.ua/articles/racer-vs-loft-air-vs-mesh/) | 2 | 42 | 0 | 122 | 44 | pending-production | pending-production | pending-production | OK |
| replaceable-elements | confirmed | Feature | [/articles/what-is-fully-replaceable-design/](https://aerocool.ua/articles/what-is-fully-replaceable-design/) | 2 | 4 | 0 | 18 | 6 | pending-production | pending-production | pending-production | OK |
| return-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | OK |
| review-layer | do-not-markup | Review |  | 0 | 0 | 0 | 0 | 0 | pending-production | pending-production | pending-production | do-not-markup |
| sky-360 | confirmed | Product | [/products/sky/360/](https://aerocool.ua/products/sky/360/) | 6 | 14 | 0 | 40 | 1 | pending-production | pending-production | pending-production | OK |
| sky-light | confirmed | Product | [/products/sky/light/](https://aerocool.ua/products/sky/light/) | 6 | 14 | 0 | 40 | 1 | pending-production | pending-production | pending-production | OK |
| sky-series | confirmed | ProductSeries | [/products/sky/](https://aerocool.ua/products/sky/) | 12 | 40 | 0 | 96 | 1 | pending-production | pending-production | pending-production | OK |
| sync4-mechanism | confirmed | Mechanism | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) | 4 | 28 | 0 | 92 | 32 | pending-production | pending-production | pending-production | OK |
| sync5-mechanism | confirmed | Mechanism | [/articles/sync4-sync5-mechanism-guide/](https://aerocool.ua/articles/sync4-sync5-mechanism-guide/) | 4 | 48 | 0 | 142 | 52 | pending-production | pending-production | pending-production | OK |
| synchronous-tilt | confirmed | Mechanism | [/articles/what-is-synchronous-tilt/](https://aerocool.ua/articles/what-is-synchronous-tilt/) | 6 | 64 | 0 | 184 | 70 | pending-production | pending-production | pending-production | OK |
| warranty-policy | confirmed | Policy | [/faq/](https://aerocool.ua/faq/) | 2 | 26 | 0 | 56 | 28 | pending-production | pending-production | pending-production | OK |
| wing-loft-air-dark-grey | confirmed | ProductVariant | [/products/wing/loft-air-dark-grey/](https://aerocool.ua/products/wing/loft-air-dark-grey/) | 2 | 8 | 0 | 24 | 1 | pending-production | pending-production | pending-production | OK |
| wing-loft-air-light-grey | confirmed | ProductVariant | [/products/wing/loft-air-light-grey/](https://aerocool.ua/products/wing/loft-air-light-grey/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | OK |
| wing-loft-air-product-group | confirmed | ProductGroup | [/products/wing/](https://aerocool.ua/products/wing/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | активный ProductGroup |
| wing-mesh-black | confirmed | Product | [/products/wing/mesh-black/](https://aerocool.ua/products/wing/mesh-black/) | 2 | 8 | 0 | 20 | 1 | pending-production | pending-production | pending-production | OK |
| wing-racer-black | confirmed | ProductVariant | [/products/wing/racer-black/](https://aerocool.ua/products/wing/racer-black/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | OK |
| wing-racer-dark-grey | confirmed | ProductVariant | [/products/wing/racer-dark-grey/](https://aerocool.ua/products/wing/racer-dark-grey/) | 2 | 4 | 0 | 16 | 1 | pending-production | pending-production | pending-production | OK |
| wing-racer-product-group | confirmed | ProductGroup | [/products/wing/](https://aerocool.ua/products/wing/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | активный ProductGroup |
| wing-series | confirmed | ProductSeries | [/products/wing/](https://aerocool.ua/products/wing/) | 20 | 36 | 0 | 98 | 1 | pending-production | pending-production | pending-production | OK |
| xtal-loft-air-dark-grey | confirmed | ProductVariant | [/products/xtal/loft-air-dark-grey/](https://aerocool.ua/products/xtal/loft-air-dark-grey/) | 2 | 8 | 0 | 24 | 1 | pending-production | pending-production | pending-production | OK |
| xtal-loft-air-light-grey | confirmed | ProductVariant | [/products/xtal/loft-air-light-grey/](https://aerocool.ua/products/xtal/loft-air-light-grey/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | OK |
| xtal-loft-air-product-group | confirmed | ProductGroup | [/products/xtal/](https://aerocool.ua/products/xtal/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | активный ProductGroup |
| xtal-mesh-black | confirmed | Product | [/products/xtal/mesh-black/](https://aerocool.ua/products/xtal/mesh-black/) | 2 | 8 | 0 | 20 | 1 | pending-production | pending-production | pending-production | OK |
| xtal-racer-black | confirmed | ProductVariant | [/products/xtal/racer-black/](https://aerocool.ua/products/xtal/racer-black/) | 2 | 4 | 0 | 16 | 1 | pending-production | pending-production | pending-production | OK |
| xtal-racer-dark-grey | confirmed | ProductVariant | [/products/xtal/racer-dark-grey/](https://aerocool.ua/products/xtal/racer-dark-grey/) | 2 | 6 | 0 | 20 | 1 | pending-production | pending-production | pending-production | OK |
| xtal-racer-product-group | confirmed | ProductGroup | [/products/xtal/](https://aerocool.ua/products/xtal/) | 0 | 0 | 4 | 8 | 4 | pending-production | pending-production | pending-production | активный ProductGroup |
| xtal-series | confirmed | ProductSeries | [/products/xtal/](https://aerocool.ua/products/xtal/) | 20 | 36 | 0 | 98 | 1 | pending-production | pending-production | pending-production | OK |

## 7. Как использовать отчет

1. После каждого крупного schema/entity/content изменения запускать `npm run build`, затем `npm run entity:report`.
2. Проверять, что важные confirmed-сущности не потеряли `about`, `mentions` или ссылки в собранном графе.
3. После production-перехода добавить показы, клики и CTR из GSC в `docs/seo/32-entity-performance-overrides.csv`.
4. После исходного замера AI-поиска добавить AI-цитирования и ошибки представления бренда/товаров в `docs/seo/32-entity-performance-overrides.csv`.
5. После появления бизнес-событий добавить бизнес-сигнал: консультации, заявки, покупки или другие подтвержденные действия в `docs/seo/32-entity-performance-overrides.csv`.

## 8. Текущий вывод

Локальная отчетность по сущностям работает: реестр, использование front matter и ссылки в собранном JSON-LD измеряются автоматически. Внешние поля эффективности остаются `pending-production`, потому что до production и открытия индексации данные GSC, AI-цитирования и бизнес-сигналы нельзя считать полноценными метриками.
