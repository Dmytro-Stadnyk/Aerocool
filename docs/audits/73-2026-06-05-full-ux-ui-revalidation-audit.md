# Повторный полный UX/UI-аудит Tailwind 4.3

Дата аудита: 2026-06-05.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Обновление статуса: 2026-06-13.

Этот документ фиксирует повторную проверку UX/UI-состояния проекта `Aerocool Ukraine` после полного аудита `64`. Цель проверки — подтвердить, какие выводы полного visual audit остаются актуальными, какие риски все еще открыты и какой порядок работ считать текущим.

Исторический полный аудит [72-2026-06-04-full-ux-ui-tailwind-audit.md](72-2026-06-04-full-ux-ui-tailwind-audit.md) не переписывается задним числом. Этот документ является свежим revalidation-снимком на 2026-06-05.

Статусное уточнение от 2026-06-13: файлы `content/products/sky/light/light.png` и `content/products/sky/360/360.png` оставлены в проекте как тестовые product gallery assets по решению владельца проекта. Исторические цифры сборки ниже не пересчитывались.

## Короткий вывод

Текущая UX/UI-оценка проекта после исправления root catalog titles: **7.9/10**.

Сборка Hugo проходит без ошибок. Значимых новых UX/UI-регрессий по сравнению с audit `64` не найдено. P1-проблема с неоднозначными product titles в root-каталоге закрыта: `/products/` и `/ru/products/` теперь выводят названия с серией, например `WING Mesh Black` и `XTAL Mesh Black`, при этом страницы конкретных серий сохраняют короткие названия внутри своего контекста.

Проект уже имеет хорошую основу для e-commerce/catalog UX:

- главная страница стала товарной, а не блоговой;
- каталог использует отдельный product listing, фильтры, сортировку и товарные карточки;
- root-каталог показывает серию в названиях товаров, чтобы одинаковые материалы и цвета не выглядели как дубликаты;
- PDP имеет gallery, цену, наличие, CTA, product facts, incentives и tabs;
- FAQ, contact, articles, news и about переведены в управляемые UI-блоки;
- Tailwind 4.3 visual layer уже построен вокруг `@theme`, `:root` и `.ui-*` semantic-классов.

Главный следующий слой работы — **product finding**: ясные category previews, comparison table, applied filter chips, улучшенный search UI и доступные состояния фильтров.

## Что проверялось

Проверялись:

- актуальная карта Tailwind Plus UI-секций [29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md);
- полный аудит [72-2026-06-04-full-ux-ui-tailwind-audit.md](72-2026-06-04-full-ux-ui-tailwind-audit.md);
- `layouts/search.html`;
- `layouts/products/list.html`;
- `layouts/_partials/products/card.html`;
- `layouts/_partials/products/filters.html`;
- `layouts/_partials/products/sort.html`;
- `layouts/_partials/products/gallery.html`;
- `layouts/_shortcodes/contact.html`;
- `assets/js/site.js`;
- `assets/css/main.css`;
- front matter ключевых товаров и страниц серий в `content/products`;
- локальная сборка Hugo.

## Проверка сборки

Запускалась команда:

```bash
mise exec -- hugo --environment development --gc --minify --cacheDir /Users/stadnyk/MEGA/Aerocool/resources/_gen --noBuildLock
```

Результат:

| Метрика | Значение |
|---|---:|
| UK pages | 62 |
| RU pages | 60 |
| Paginator pages | 9 на язык |
| Non-page files | 49 UK, 0 RU |
| Static files | 17 на язык |
| Processed images | 793 |

Вывод: сборка проходит, текущие UX/UI-риски не являются build-breaking ошибками. Это именно проблемы качества интерфейса, product finding, визуальной ясности и поддержки Tailwind 4.3 слоя.

## P1-задачи и статус

| ID | Статус | Что проверено | Где подтверждено | Почему важно | Следующее действие |
|---|---|---|---|---|---|
| UX-65-01 | Принято как test fixture | В PDP-галерею могут попадать тестовые image assets `light.png` и `360.png`. | `content/products/sky/light/light.png`, `content/products/sky/360/360.png`; `layouts/_partials/products/gallery.html` автоматически добавляет все images из page bundle. | Для production-UX товарная галерея должна показывать только реальные фото товара, но эти файлы сознательно оставлены для локального тестирования. | Не удалять эти файлы без отдельного решения владельца проекта. Если нужно скрыть их с PDP, решать это шаблонно или вручную перед production-проверкой. |
| UX-65-02 | Открыто | Верхние карточки серий в root-каталоге используют слабые `cover.webp` preview. | `content/products/sky/_index.md`, `content/products/wing/_index.md`, `content/products/xtal/_index.md`. | Category preview должен помогать выбрать `SKY`, `WING`, `XTAL`, а не быть декоративным блоком. | Заменить cover серий на реальные product/series preview images или сделать отдельный category-preview partial. |
| UX-65-03 | Закрыто | Root-каталог больше не показывает неоднозначные короткие titles. | `layouts/products/list.html` передает `showSeriesInTitle`; `layouts/_partials/products/card.html` выводит `WING Mesh Black`, `XTAL Mesh Black`, `WING Racer Black`, `XTAL Racer Black` только в root-каталоге. | Пользователь в `/products/` сразу видит серию и не воспринимает одинаковые материалы/цвета как дубликаты. | Поддерживать правило: в `/products/` title = серия + короткое название, на страницах серий можно оставлять короткий `linkTitle`. |
| UX-65-04 | Открыто | Search page все еще не соответствует Application UI `Input Groups`. | `layouts/search.html` использует старый `page-header`, `#searchbox` и input без `.ui-field`. | Поиск должен помогать находить модели, серии, материалы, `11D`, `Mesh`, доставку, гарантию и статьи. Сейчас он выглядит как техническая страница. | Пересобрать `/search/` как Application UI search/input group: label, `.ui-field`, подсказки, quick links, empty state и result cards. |
| UX-65-05 | Открыто | Comparison table для каталога и серий не реализована. | В активных layout-файлах нет таблицы сравнения моделей. | Для кресел сравнение серии, материала, регулировок, механизма, цены и наличия является ключевым e-commerce UX. | Добавить Application UI `Tables / With stacked columns on mobile`, сначала для `/products/`. |
| UX-65-06 | Открыто | Applied filter chips отсутствуют. | `products/filters.html` выводит count и reset; `site.js` считает active filters, но UI chips нет. | Пользователь не видит компактно, какие условия применены, и не может снять одно условие отдельно. | Добавить область `[data-product-filter-active]`, chip на каждый выбранный checkbox и remove action. |

## Подтвержденные P2-задачи

| ID | Что открыто | Где подтверждено | Почему важно | Следующее действие |
|---|---|---|---|---|
| UX-65-07 | Contact form не имеет placeholders внутри полей. | `layouts/_shortcodes/contact.html`. | По принятому решению проекта подсказки должны быть в самом поле, при сохранении labels и native validation. | Добавить локализованные placeholders: имя, фамилия, email, телефон `+380...`, пример сообщения. |
| UX-65-08 | Sort UI не показывает выбранную сортировку в кнопке. | `assets/js/site.js` ищет `[data-product-sort-current]`, но `layouts/_partials/products/sort.html` его не выводит. | После выбора сортировки пользователь должен видеть текущее состояние без повторного открытия меню. | Добавить `<span data-product-sort-current>` в кнопку сортировки. |
| UX-65-09 | Filter count и empty state не объявляются как live region. | `products/filters.html` меняет count/empty state через JS без `aria-live`. | Для assistive technology изменение количества результатов может быть незаметным. | Добавить `aria-live="polite"` и понятный status text. |
| UX-65-10 | Часть важных product facts спрятана в hover-details. | `products/card.html` выводит series/material/adjustment/mechanism в `.products-list__hover-details`. | На touch-устройствах hover может быть недоступен или непредсказуем. | Сделать series + ключевую характеристику видимыми без hover, особенно в root-каталоге. |
| UX-65-11 | Tailwind 4.3 token debt остается. | `assets/css/main.css` использует `var(--accent-border)`; встречаются `bg-white`, `divide-gray-*`, `outline-red/green`. | Проект хочет максимально CSS-first Tailwind 4.3 подход. Разрозненные utilities усложняют поддержку визуальной системы. | Добавить/заменить token и перевести повторяющиеся цвета/focus/divider/surface на semantic hooks. |
| UX-65-12 | Footer еще не полный Tailwind Plus `4-column with company mission`. | Статус уже зафиксирован в карте `51` и audit `64`. | Footer может лучше поддерживать e-commerce navigation: серии, каталог, статьи, FAQ, контакты, условия. | Пересобрать footer компактно в 4 колонки без перегруза. |
| UX-65-13 | На страницах серий не хватает отдельного material block. | Материалы объясняются в тексте, но не как сканируемый UI-блок. | `Racer`, `Loft Air`, `Mesh` — важный критерий выбора кресла. | Добавить `Category Previews / Three-column with description` или feature-grid на страницах WING/XTAL. |
| UX-65-14 | Series-specific FAQ отсутствует. | Есть общий FAQ, но нет FAQ внутри каждой серии. | Вопросы по конкретной серии лучше закрывать прямо на странице серии. | Добавить FAQ для `SKY`, `WING`, `XTAL` с видимым контентом и синхронизацией schema только там, где нужно. |
| UX-65-15 | PDP alternatives/features не закрыты. | PDP имеет overview/facts/tabs/incentives, но нет related alternatives и визуальных feature sections. | После просмотра товара пользователь должен легко перейти к соседнему материалу, серии или уровню регулировок. | Добавить related products и product feature blocks только на основе реальных данных и изображений. |

## Оценка по направлениям

| Направление | Оценка | Текущий комментарий |
|---|---:|---|
| Tailwind 4.3 CSS-first architecture | 8.0/10 | База правильная: `@theme`, `:root`, `.ui-*`. Минус — остаточные `gray/white/red/green` utilities и `--accent-border`. |
| Visual consistency | 7.7/10 | Основные страницы уже едины. Root catalog titles исправлены; search page и series preview cards все еще выбиваются. |
| Tailwind Plus map execution | 8.1/10 | Много блоков реализовано, но applied chips, comparison table и search UI все еще backlog. |
| E-commerce product finding | 7.5/10 | Фильтры и сортировка есть, но не хватает видимых активных условий, сравнения и сильного поиска. |
| Product list UX | 7.5/10 | Root titles стали однозначными. Открытый риск — часть важных facts все еще частично завязана на hover. |
| PDP UX | 8.0/10 | Первый экран сильный. Product gallery содержит осознанные test fixtures; alternatives/features и реальные разные product primary images еще нужно довести. |
| Forms and feedback | 7.8/10 | Contact layout и success alert есть. Нужно добавить placeholders и доступнее оформить состояния. |
| Accessibility basics | 8.0/10 | Labels, native controls, keyboard tabs/gallery есть. Нужны live regions и ручная mobile/focus проверка. |
| Search UX | 5.5/10 | Самая слабая зона из основных пользовательских маршрутов. |

## Текущий приоритет работ

1. Заменить series/category previews в `/products/` на реальные product/series visuals.
2. Добавить comparison table для `/products/`.
3. Добавить applied filter chips и `aria-live` для count/empty state.
4. Переделать `/search/` под Application UI Input Group.
5. Добавить placeholders в contact form.
6. Добавить `data-product-sort-current` в sort button.
7. Дочистить Tailwind 4.3 token debt.
8. Добавить material blocks и series-specific FAQ.
9. Добавить PDP alternatives/features.
10. Заменить одинаковые product primary images официальными разными product assets по SKU/MPN/GTIN.
11. Довести footer до компактного 4-column pattern.

## Что считать готовностью к следующей оценке 8.5/10

Чтобы проект поднялся с **7.9/10** примерно до **8.5/10**, нужно закрыть минимум следующие ключевые пункты:

- PDP gallery без служебных/test images;
- реальные preview изображений серий;
- comparison table;
- applied filter chips;
- новый search UI.

Это даст самый большой практический эффект, потому что улучшит именно путь выбора товара: пользователь быстрее поймет серии, сравнит модели, увидит активные условия фильтра, найдет нужный товар или справочный материал.

## Ограничения проверки

- Это не полная WCAG-сертификация и не screen reader audit.
- Внешние источники Tailwind Plus и Baymard в этом revalidation-прогоне повторно не открывались; проверка опирается на уже зафиксированную карту `51`, локальную документацию и фактический код.
- Визуальные screenshots заново не сохранялись в репозиторий. Основной screenshot/evidence-пакет остается в audit `64`, а этот документ подтверждает актуальность выводов по коду и сборке.

## Связанные документы

- [docs/architecture/29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md) — активная карта Tailwind Plus UI-секций.
- [docs/audits/72-2026-06-04-full-ux-ui-tailwind-audit.md](72-2026-06-04-full-ux-ui-tailwind-audit.md) — предыдущий полный visual audit с screenshots/evidence.
- [docs/audits/71-2026-06-04-ux-ui-tailwind-current-audit.md](71-2026-06-04-ux-ui-tailwind-current-audit.md) — быстрый snapshot после каталоговых обновлений.
- [docs/architecture/03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) — карта локальных Hugo partials, shortcodes и helpers.
- [docs/quality/14-production-quality-gate-2026.md](../quality/14-production-quality-gate-2026.md) — финальные quality gates перед релизом.
