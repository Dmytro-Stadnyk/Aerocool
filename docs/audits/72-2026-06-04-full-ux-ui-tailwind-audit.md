# Полный глубокий UX/UI-аудит Tailwind 4.3

Дата аудита: 2026-06-04.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот документ фиксирует полный UX/UI-аудит проекта `Aerocool Ukraine` после обновлений Tailwind 4.3 visual layer, главной страницы, каталога, фильтров, сортировки, PDP, FAQ, contact, articles, news и about-блоков.

Audit `63` остается быстрым snapshot по карте `51`. Этот audit `64` является более строгим текущим документом: он добавляет проверку по screenshots, rendered HTML, CSS-токенам, JS-поведению и конкретным визуальным дефектам.

## Область проверки

Проверялись:

- главная страница `/` и `/ru/`;
- каталог `/products/` и `/ru/products/`;
- страницы серий `/products/sky/`, `/products/wing/`, `/products/xtal/`;
- товарная страница на примере `/products/sky/light/`;
- `/search/`;
- `/faq/`;
- `/contact/`;
- `/articles/`, `/news/`, `/about/`;
- `assets/css/main.css`;
- `assets/js/site.js`;
- product helpers в `layouts/_partials/products/`;
- UX/UI-карта `docs/architecture/29-tailwind-plus-ui-section-map-2026.md`;
- текущий snapshot `docs/audits/71-2026-06-04-ux-ui-tailwind-current-audit.md`.

Скриншоты текущего прогона сохранены локально вне репозитория:

- `/private/tmp/aerocool-ux-audit/01-home-desktop.png`;
- `/private/tmp/aerocool-ux-audit/02-products-desktop.png`;
- `/private/tmp/aerocool-ux-audit/03-product-desktop.png`;
- `/private/tmp/aerocool-ux-audit/04-search-desktop.png`;
- `/private/tmp/aerocool-ux-audit/05-contact-desktop.png`;
- `/private/tmp/aerocool-ux-audit/06-faq-desktop.png`;
- `/private/tmp/aerocool-ux-audit/07-home-mobile.png`;
- `/private/tmp/aerocool-ux-audit/08-products-mobile.png`.

## Короткий вывод

Текущая UX/UI-оценка после глубокого аудита: **7.8/10**.

Проект уже перешел от блогового PaperMod-интерфейса к управляемой e-commerce/catalog структуре: главная стала товарной, каталог содержит фильтры и сортировку, PDP имеет product overview, gallery, facts, incentives и tabs, FAQ/contact/about/articles/news переведены в управляемые UI-компоненты.

Но полный визуальный аудит снизил оценку относительно snapshot `63`, потому что обнаружены видимые пользовательские дефекты:

- в PDP-галерею попал тестовый image asset `TEST`;
- верхние карточки серий в каталоге используют огромные фрагменты логотипа вместо product/series preview;
- root-каталог показывает неоднозначные короткие названия вроде `Mesh Black` и `Racer Black` без серии;
- search page визуально осталась старым PaperMod-паттерном;
- applied filter chips и comparison table все еще отсутствуют;
- contact form не имеет placeholders, хотя подсказки по решению должны быть внутри полей;
- Tailwind 4.3 token layer еще не полностью очищен от дефолтных `gray`, `white`, `outline-red/green` и одного несуществующего CSS-токена.

## Оценка по направлениям

| Направление | Оценка | Объяснение |
|---|---:|---|
| Tailwind 4.3 CSS-first architecture | 8.0/10 | `@theme`, `:root` и `.ui-*` semantic layer есть. Остались прямые hex/white/gray classes, `outline-red/green`, `divide-gray-*`, а также несуществующий `var(--accent-border)`. |
| Visual consistency | 7.6/10 | Home, FAQ, contact, about, articles/news и PDP выглядят едино. Каталог серий и search page выбиваются сильнее всего. |
| E-commerce product finding | 7.5/10 | Фильтры и сортировка работают, но нет applied chips, comparison table, search UI и ясных карточек серий. |
| Product list UX | 7.2/10 | Product cards стали товарными, но root-каталог имеет неоднозначные title для WING/XTAL вариантов и слабые series preview images. |
| PDP UX | 8.0/10 | Структура сильная: gallery, title, price, availability, CTA, product facts, incentives, tabs. Оценку снижает тестовый asset в галерее и недостающие alternatives/features. |
| Forms and feedback | 7.8/10 | Contact side-by-side и success alert есть. Нет placeholders в полях и нет собственного error alert, используется native validation. |
| Accessibility basics | 8.0/10 | Labels, roles, tabs keyboard support, gallery keyboard support и native controls есть. Нужно добавить live regions для filter count/empty state, проверить real mobile focus и увеличить часть action targets. |
| Search UX | 5.5/10 | Поиск функционально подключен, но визуально и структурно не соответствует Application UI Input Group и не помогает product discovery. |

## Подтвержденные сильные стороны

| Зона | Что подтверждено |
|---|---|
| Главная | Desktop hero выглядит товарно: фото кресла, понятный H1, lead, CTA в каталог и about, следующий блок виден в первом viewport. |
| Header | Desktop catalog flyout и mobile catalog group отделяют товарные входы от FAQ/contact. Это соответствует e-commerce IA лучше, чем обычное плоское меню. |
| Каталог | `/products/` использует `layouts/products/list.html`, `products/filters.html`, `products/sort.html`, `products/card.html`; это уже не blog archive. |
| Фильтры | CDP-проверка подтвердила: старт **12** товаров, фильтр `SKY` оставляет **2**, `SKY + 11D` оставляет **SKY 360**, reset возвращает **12**. |
| Сортировка | CDP-проверка подтвердила, что сортировка по цене меняет порядок карточек без изменения URL. |
| PDP | `/products/sky/light/` имеет сильный первый товарный экран: фото, availability, warranty, title, description, price, CTA, key facts и purchase incentives. |
| Tabs и gallery | `assets/js/site.js` поддерживает ArrowLeft, ArrowRight, Home, End для product tabs и gallery thumbs. Это лучше, чем click-only поведение. |
| FAQ | `/faq/` визуально соответствует grouped side-by-side pattern; вопросы сгруппированы и читаются сканируемо. |
| Contact | `/contact/` соответствует side-by-side grid: слева контекст и контакты, справа форма. Labels, required, pattern/title, honeypot и success URL есть. |
| Success state | `/contact/success/` оформлен как alert with actions, а не как обычный markdown. |

## Находки P1

| ID | Finding | Evidence | Почему это важно | Рекомендация |
|---|---|---|---|---|
| UX-64-01 | В товарную галерею попал тестовый image asset `TEST`. | Screenshot `03-product-desktop.png`; файл `content/products/sky/light/light.png`; `layouts/_partials/products/gallery.html` строки 17-23 автоматически добавляют все images из page bundle. | Это видимый production-дефект на PDP. Пользователь видит служебную картинку вместо product evidence. | Удалить или заменить `content/products/sky/light/light.png`. Дополнительно решить архитектурно: либо явный front matter список галереи, либо правило исключения служебных файлов. |
| UX-64-02 | Верхние карточки серий в `/products/` используют огромные фрагменты логотипа вместо понятных preview кресел/серий. | Screenshot `02-products-desktop.png` и `08-products-mobile.png`; `content/products/*/_index.md` использует `cover.webp`; product card берет `cover.image`. | Первый каталоговый экран должен помогать выбрать `SKY`, `WING`, `XTAL`, а не показывать декоративный логотип. Это снижает product recognition. | Заменить `cover.webp` для серий на реальные series preview images или сделать отдельный category-preview partial, который берет 1-3 реальные товарные изображения серии. |
| UX-64-03 | Root-каталог показывает неоднозначные короткие product titles. | CDP-проверка вернула `Mesh Black`, `Racer Black`, `Racer Dark Grey`; front matter WING/XTAL имеет одинаковые `linkTitle`. | В root `/products/` пользователь не понимает, это `WING Mesh Black` или `XTAL Mesh Black`, пока не читает hover-details. На mobile hover ненадежен. | Для root-каталога выводить title с серией: `WING Mesh Black`, `XTAL Racer Black`. На страницах конкретной серии короткий title можно оставить. |
| UX-64-04 | Search page осталась слабым PaperMod-паттерном. | Screenshot `04-search-desktop.png`; `layouts/search.html` строки 3-22: старый header, отдельная иконка, `#searchbox`, input без `.ui-field`, без quick links и empty state. | Search является ключевым product finding каналом для запросов `SKY 360`, `Mesh`, `11D`, `гарантия`, `доставка`. Сейчас страница выглядит пустой и не помогает начать поиск. | Перевести `/search/` на Application UI `Input Groups / Input with label and help text`: `.ui-field`, видимые подсказки, быстрые ссылки на серии, empty state, result cards с типом страницы. |
| UX-64-05 | Нет comparison table для каталога и страниц серий. | В `51` и `63` стоит backlog; в rendered `/products/` таблицы нет. | Для кресел сравнение серии, материала, регулировок, механизма, цены и наличия критичнее, чем для простого блога. | Реализовать Application UI `Tables / With stacked columns on mobile`. Начать с `/products/`, затем повторить/сузить на страницах серий. |
| UX-64-06 | Нет applied filter chips. | `products/filters.html` выводит count и reset, `site.js` считает active filters, но UI для chips отсутствует. | Пользователь видит количество найденных товаров, но не видит компактный список активных условий и не может снять одно условие отдельно. | Добавить область `[data-product-filter-active]` над результатами, chip на каждый выбранный checkbox и remove action для каждого chip. |

## Находки P2

| ID | Finding | Evidence | Почему это важно | Рекомендация |
|---|---|---|---|---|
| UX-64-07 | Contact form не имеет placeholders. | `layouts/_shortcodes/contact.html` строки 136, 145, 152, 161, 170. | По текущему решению проекта подсказки должны быть внутри поля, а не отдельным help text под ним. | Добавить локализованные placeholders: имя, фамилия, email, телефон `+380...`, сообщение с примером запроса. |
| UX-64-08 | Sort UI не показывает выбранное значение в кнопке. | `assets/js/site.js` ищет `[data-product-sort-current]` на строке 384, но `layouts/_partials/products/sort.html` не содержит такого элемента. | После выбора сортировки пользователь не видит текущее состояние, кроме открытия меню. | Добавить `<span data-product-sort-current>` в кнопку сортировки и начальное значение `за назвою / по названию`. |
| UX-64-09 | Filter count и empty state не объявляются как live region. | `products/filters.html` выводит `data-product-filter-count` и `data-product-filter-empty`; `site.js` меняет их без `aria-live`. | Для assistive technology изменение количества результатов может быть незаметным. | Добавить `aria-live="polite"` для count/status и аккуратный status text для empty state. |
| UX-64-10 | Product cards прячут часть важных facts в hover-details. | `products/card.html` выводит series/material/adjustment/mechanism в `.products-list__hover-details`; CSS показывает блок на hover/focus. | На touch-устройствах hover непредсказуем. В root-каталоге это особенно важно из-за неоднозначных title. | На mobile или во всех состояниях показывать минимум series + adjustment/mechanism компактными facts, а hover оставить только для вторичных деталей. |
| UX-64-11 | Tailwind 4.3 token debt еще заметен. | `rg` нашел `divide-gray-*`, `bg-white`, `outline-red-700`, `outline-green-600`; CSS line 2932 использует несуществующий `--accent-border`. | Проект хочет максимально Tailwind 4.3 CSS-first подход. Дефолтные utilities и несуществующий token затрудняют поддержку. | Добавить недостающий token или заменить на `--link-underline`; перевести recurring focus/outline/divide/surface цвета на semantic hooks. |
| UX-64-12 | Footer формально еще не полный Tailwind Plus `4-column with company mission`. | Статус уже отмечен в `51/63`. | Footer рабочий, но может лучше помогать e-commerce navigation: серии, каталог, статьи, FAQ, контакты, условия. | Пересобрать footer по 4 колонкам без перегруза: бренд/миссия, каталог, помощь, материалы. |
| UX-64-13 | Series pages не имеют отдельного visual material block. | `51/63` отмечают backlog; в текущих `_index.md` материалы объясняются markdown-текстом. | Для `Racer`, `Loft Air`, `Mesh` нужен сканируемый выбор внутри серии. | Добавить `Category Previews / Three-column with description` или feature-grid на страницах WING/XTAL. |
| UX-64-14 | Series-specific FAQ отсутствует. | В `51/63` отмечено как P2. | Общий FAQ есть, но сомнения по конкретной серии лучше закрывать прямо на series page. | Добавить `faq_groups` или отдельный shortcode/partial для FAQ конкретной серии. |
| UX-64-15 | PDP alternatives/features еще не закрыты. | В `layouts/products/single.html` есть overview/facts/tabs/incentives, но нет related alternatives и visual feature sections. | После просмотра товара пользователь должен легко перейти к соседнему материалу/серии/ценовому уровню. | Добавить related products внутри серии и product feature blocks только там, где есть реальные изображения и данные. |

## Находки P3

| ID | Finding | Evidence | Почему это важно | Рекомендация |
|---|---|---|---|---|
| UX-64-16 | Reviews остаются инфраструктурно отложенными. | Reviews выводятся только при approved данных, fake rating не используется. | Это правильно для schema.org и доверия, но коммерческий trust пока неполный. | Не ускорять через ручные fake ratings. Вернуться после стабильного Netlify Database moderation/export. |
| UX-64-17 | Quickviews, cart и checkout не нужны сейчас. | Карта `51` правильно исключает эти Tailwind Plus блоки. | Без реального checkout-flow они создадут ложные ожидания. | Оставить вне текущего этапа. |

## Проверка Tailwind Plus карты 51

| Блок карты 51 | Текущий статус после глубокого аудита |
|---|---|
| Главная hero | Выполнено. Desktop выглядит хорошо, mobile требует ручной проверки в реальном браузере из-за особенностей headless crop, но подтвержденного horizontal overflow нет. |
| Главная серии | Структура выполнена, но качество изображений/preview нужно проверить отдельно от root catalog issue. |
| Главная популярные модели | Выполнено, если approved review source стабилен. Если блок должен быть независим от отзывов, нужен featured-products source. |
| `/products/` page heading | Выполнено. |
| `/products/` quick series entry | Частично: блок есть, но preview images плохие. |
| `/products/` filters | Выполнено функционально, частично по UX из-за отсутствия applied chips/live region. |
| `/products/` product cards | Частично: карточки товарные, но root titles неоднозначны. |
| `/products/` comparison table | Не выполнено. |
| Series pages | Частично: есть product listing и quick series links, но materials block и series FAQ еще не закрыты. |
| PDP overview | Выполнено структурно, но есть visible gallery asset bug. |
| PDP incentives/facts/tabs | Выполнено. |
| PDP alternatives/features | Не выполнено. |
| FAQ | Выполнено. |
| Contact | Выполнено по layout, частично по form hints/placeholders. |
| Search | Не выполнено по Application UI уровню. |
| Footer | Частично. |

## Практический приоритет исправлений

1. Убрать `TEST` из PDP-галереи и решить правило включения images в gallery.
2. Заменить series/category preview images в `/products/` на реальные product/series visuals.
3. Сделать root product titles однозначными: серия + материал + цвет.
4. Добавить comparison table.
5. Добавить applied filter chips и `aria-live` для count/empty state.
6. Переделать `/search/` под Application UI Input Group.
7. Добавить placeholders в contact form.
8. Добавить `data-product-sort-current` в sort button.
9. Исправить `--accent-border` и пройтись по `divide-gray`, `bg-white`, `outline-red/green`.
10. Добавить material blocks и series-specific FAQ на страницы серий.
11. Доработать PDP alternatives/features.
12. Довести footer до компактного 4-column pattern.

## Acceptance Checklist для следующего UX/UI прогона

| Проверка | Ожидаемый результат |
|---|---|
| `/products/` desktop | Вверху видны реальные series previews, не фрагменты логотипа. |
| `/products/` mobile | Нет horizontal overflow, preview images не обрезают смысловую часть. |
| Root product cards | Все повторяющиеся материалы/цвета имеют series context в title или visible facts. |
| Filters | Видно активные chips, каждое условие можно снять отдельно. |
| Comparison table | Модель, серия, материал, регулировки, механизм, цена и наличие читаются на desktop и mobile. |
| PDP gallery | Нет служебных/test images; все thumbnails относятся к товару. |
| Search | Есть `.ui-field`, label/help, quick suggestions, empty state и понятные result cards. |
| Contact | Поля имеют placeholders и сохраняют labels/native validation. |
| Sort | После выбора сортировки кнопка показывает текущее значение. |
| Tailwind tokens | Нет случайных `gray`/`white`/`outline-red/green` в новых локальных UI-компонентах, если это не осознанно описано. |

## Ограничения аудита

- Это не полная WCAG-сертификация. Скриншоты, код и CDP-проверки не заменяют screen reader audit.
- Mobile screenshots были сняты headless Chrome в viewport `390x844`, но CDP показал, что один layout viewport в headless окружении был шире. Поэтому mobile visual нужно дополнительно проверить вручную в обычном браузере или Browser tool, когда он доступен.
- Внешние источники Baymard/Tailwind Plus повторно не просматривались в этом прогоне; аудит опирается на уже зафиксированную карту `51`, локальную документацию и текущую реализацию.
- Скриншоты лежат в `/private/tmp/aerocool-ux-audit/` и не являются versioned-документацией проекта.

## Связанные документы

- [docs/architecture/29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md) — активная карта Tailwind Plus UI-секций.
- [docs/audits/71-2026-06-04-ux-ui-tailwind-current-audit.md](71-2026-06-04-ux-ui-tailwind-current-audit.md) — предыдущий быстрый snapshot после каталоговых обновлений.
- [docs/architecture/03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) — карта локальных Hugo partials, shortcodes и helpers.
- [docs/quality/14-production-quality-gate-2026.md](../quality/14-production-quality-gate-2026.md) — финальные quality gates перед релизом.
