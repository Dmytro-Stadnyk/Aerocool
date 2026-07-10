# Текущий UX/UI-аудит Tailwind 4.3 после обновлений

Дата аудита: 2026-06-03.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот документ фиксирует текущее состояние UX/UI проекта `Aerocool Ukraine` после обновления FAQ, contact, success alert, recommended links, section highlights, about-компонентов, product cards и product detail layout. Он дополняет активную карту [docs/architecture/29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md) и нужен как свежий audit-снимок для следующих UX/UI-итераций.

## Короткий вывод

Текущее состояние UX/UI: **8/10**.

Проект уже заметно ушел от блоговой структуры PaperMod к управляемому каталоговому интерфейсу на базе `Hugo`, `Tailwind CSS 4.3`, локальных shortcodes/partials и semantic CSS-хуков `.ui-*`. Критических визуальных блокеров по проверенным страницам не найдено: сборка проходит, основные страницы открываются на `uk` и `ru`, горизонтального переполнения на проверенных desktop/mobile экранах не обнаружено, товарные табы и галерея работают.

Главный остаточный долг — не визуальная поломка, а e-commerce product finding: mobile menu не показывает быстрые входы `SKY`, `WING`, `XTAL`; каталог еще не имеет фильтров, applied filters, сортировки и сравнительной таблицы.

## Что проверялось

Проверялись текущие файлы и страницы:

| Зона | Что проверялось |
|---|---|
| Документация | `docs/architecture/29-tailwind-plus-ui-section-map-2026.md`, `docs/architecture/03-hugo-template-helpers.md`, правила Tailwind 4.3 и локальных overrides. |
| CSS-система | `assets/css/main.css`: `@theme`, проектные токены, `.ui-section-title`, `.ui-page-title`, `.ui-body`, `.ui-card-title`, `.ui-badge`, `.ui-alert`, `.ui-button`, `.ui-footer-title`, `.ui-form-label`, `.ui-field`. |
| Главная | `/`, `/ru/`: hero, series previews, choice benefits, article cards, отсутствие horizontal overflow. |
| Каталог и серии | `/products/`, `/ru/products/`, `/products/sky/`, `/products/wing/`: product cards, series cards, product facts. |
| Товарная страница | `/products/sky/light/`, `/ru/products/sky/light/`: gallery, tabs, price, availability, CTA, product facts, review form. |
| FAQ | `/faq/`, `/ru/faq/`: grouped FAQ, side-by-side layout, recommended links. |
| Contact | `/contact/`, `/ru/contact/`: side-by-side grid, quick links, schedule, Netlify form, native validation. |
| Success state | `/contact/success/`, `/ru/contact/success/`: alert block, success text, action links. |
| Articles и News | `/articles/`, `/ru/articles/`, `/news/`, `/ru/news/`: section highlights, recommended links, cards. |
| About | `/about/`, `/ru/about/`: intro, series preview, feature grids, product facts, CTA. |
| Search | `/search/`: базовая search page и соответствие Application UI Input Group. |

## Проверка сборки

Команда `npm run build` прошла успешно.

Во время локальной сборки `Netlify Database` был недоступен, поэтому `scripts/export_reviews.mjs` записал пустой snapshot отзывов. Это ожидаемо для локальной среды без подключенной базы и не является UX/UI-блокером. Важно: блоки, завязанные на реальные approved отзывы, могут не отображаться локально, пока нет данных в `data/generated/reviews.json`.

## Текущие оценки

| Направление | Оценка | Пояснение |
|---|---:|---|
| Tailwind 4.3 CSS-first архитектура | 8.5/10 | Есть `@theme`, project tokens и semantic `.ui-*` слой. Остался точечный token debt в шаблонах. |
| UI consistency | 8/10 | Основные новые блоки используют близкую типографику, карточки и spacing. Search page и часть PDP еще требуют унификации. |
| Соответствие Tailwind Plus карте | 8/10 | FAQ, contact, alerts, about, articles/news, PDP и product cards в основном соответствуют выбранным секциям. Filters, sorting и mobile series navigation еще не реализованы. |
| E-commerce UX | 7/10 | PDP стал сильнее, но каталог еще не помогает быстро отбирать товары по материалу, серии, регулировкам и сценарию. |
| Responsive и базовая accessibility | 8.5/10 | Проверенные страницы не ломают ширину; labels, roles и native validation есть. Нужны точечные улучшения tap targets и placeholders. |

## Что уже выполнено хорошо

| Блок | Статус | Комментарий |
|---|---|---|
| FAQ / Side-by-side grouped FAQ | Выполнено | `faq_groups` в front matter рендерятся группами, а schema flatten-ит вопросы в единый `FAQPage`. |
| Contact / Side-by-side grid | Выполнено | Контактный блок и форма находятся в одной управляемой сетке, быстрые ссылки встроены в блок. |
| Success alert | Выполнено | `/contact/success/` и `/ru/contact/success/` используют alert-паттерн с действиями. |
| Articles recommended links | Выполнено | Markdown-список заменен управляемым Stacked Lists shortcode. |
| News recommended links | Выполнено | Список рекомендаций оформлен аналогично articles, но с отдельным CSS-хуком. |
| Section highlights для articles/news | Выполнено | Обычные списки заменены feature-grid блоками без лишнего JS. |
| About-компоненты | Выполнено | Страница `/about/` стала управляемой брендово-каталоговой структурой, а не длинным markdown-текстом. |
| Product cards | Выполнено | Карточки товаров используют product facts, изображения, цену, наличие и бейджи. |
| Product detail overview | Выполнено | Галерея, цена, наличие, CTA, product facts, условия покупки и табы находятся рядом с решением о покупке. |
| Reviews policy | Выполнено корректно | Fake ratings не выводятся; `AggregateRating` должен появляться только при approved отзывах. |

## Открытые UX/UI проблемы

| Приоритет | Проблема | Где видно | Что сделать |
|---|---|---|---|
| P1 | Mobile menu не показывает быстрые входы `SKY`, `WING`, `XTAL`. | `layouts/_partials/header.html` | Добавить отдельную product group внутри mobile panel: каталог/серии выше secondary links. |
| P1 | В каталоге нет фильтров. | `/products/`, страницы серий | Начать с static-first фильтров по серии, материалу, регулировкам, сценарию и наличию без индексируемых мусорных URL. |
| P1 | Нет applied filters, счетчика результатов и сброса фильтров. | `/products/` | Добавить управляющий слой над product list после базовых фильтров. |
| P1 | Нет comparison table для моделей. | `/products/`, страницы серий | Реализовать responsive table или stacked mobile layout: серия, материал, регулировки, механизм, цена. |
| P1 | Главная не всегда показывает 4-6 популярных моделей. | `/`, `/ru/` | Текущий top-rated блок зависит от approved reviews. Если нужен постоянный коммерческий блок, добавить featured products из front matter или data-файла. |
| P2 | Contact form не имеет подсказок внутри полей. | `layouts/_shortcodes/contact.html` | Добавить `placeholder` для имени, email, телефона и сообщения, сохранив labels и native validation. |
| P2 | Search page не приведена к Application UI Input Group. | `layouts/search.html` | Унифицировать search input, title, description и results container через `.ui-*` и ведущую search-иконку. |
| P2 | Footer не полностью соответствует `4-column with company mission`. | `layouts/_partials/footer.html` | Текущий compact footer допустим, но для строгого соответствия Tailwind Plus можно расширить структуру до 4 колонок. |
| P2 | Success alert action targets меньше идеальных mobile tap targets. | `layouts/_shortcodes/contact-success-alert.html` | Увеличить высоту action links до минимум 44px, если делать следующий accessibility polish. |
| P2 | В шаблонах остались дефолтные Tailwind utilities. | `layouts/`, `assets/css/main.css` | Заменить `bg-white`, `divide-gray-*`, `outline-red-*`, `outline-green-*`, `border-white/10` на проектные tokens/classes. |

## Tailwind 4.3 долг

Проект уже использует правильное направление: tokens в `@theme`, CSS-first слой, semantic `.ui-*` классы и локальные component hooks. Но для максимального соответствия Tailwind 4.3 подходу нужно постепенно убрать остаточные прямые визуальные utilities из локальных templates.

Текущий список точечного долга:

- `bg-white` в `layouts/_shortcodes/home-hero.html`;
- `focus-visible:outline-red-700` в CTA-кнопках;
- `focus-visible:outline-green-600` в success alert actions;
- `divide-gray-100` в `recommended-links-*`;
- `divide-gray-900/10` в `faq-list.html`;
- `border-white/10` в footer bottom divider;
- прямые `text-2xl`, `text-3xl`, `tracking-normal` на PDP title/price.

Это не критические баги, но они мешают считать visual layer полностью semantic и project-token-driven.

## Что не считать проблемой

| Наблюдение | Почему это нормально |
|---|---|
| Нет `Shopping Carts`, `Checkout Forms`, `Order Summary`, `Order History`. | На сайте нет полноценного checkout-flow; добавление этих паттернов создало бы ложное ожидание покупки через корзину. |
| Нет fake ratings на карточках и товарах. | Reviews/rating должны выводиться только из approved отзывов, видимых на этой же товарной странице. |
| Top-rated блок может не показываться локально. | Локальная среда без Netlify Database получает пустой `reviews.json`; это корректное поведение. |
| Footer компактнее Tailwind Plus 4-column варианта. | Для маленького каталога compact footer допустим, если навигация понятна и не перегружает страницу. |

## Рекомендованный следующий порядок работ

1. Добавить `SKY`, `WING`, `XTAL` в mobile navigation.
2. Реализовать static-first фильтры каталога без индексируемых filter URL.
3. Добавить applied filters, счетчик результатов и reset.
4. Добавить comparison table для моделей/серий с mobile stacked layout.
5. Добавить постоянный featured-products блок на главной, если бизнесу нужен коммерческий блок независимо от отзывов.
6. Дочистить Tailwind 4.3 token debt в templates и component layer.
7. Привести search page к Application UI Input Group.
8. Добавить placeholders в contact form, если подсказки должны быть внутри полей.

## Проверка после следующих UX/UI правок

После каждого заметного UX/UI изменения проверять:

1. `npm run build`.
2. Главную `/` и `/ru/`.
3. Каталог `/products/` и `/ru/products/`.
4. Одну страницу серии, например `/products/wing/`.
5. Одну товарную страницу, например `/products/sky/light/`.
6. `/faq/` и `/ru/faq/`.
7. `/contact/`, `/ru/contact/`, `/contact/success/`, `/ru/contact/success/`.
8. Mobile viewport около `390x844` и desktop viewport около `1440x1000`.
9. Отсутствие horizontal overflow.
10. Работу табов, галереи, меню, форм и ссылок.

## Связанные документы

- [docs/architecture/29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md) — активная карта Tailwind Plus UI-секций.
- [docs/architecture/03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) — карта локальных Hugo partials, shortcodes и helpers.
- [docs/quality/14-production-quality-gate-2026.md](../quality/14-production-quality-gate-2026.md) — финальные quality-gates перед релизом.
- [docs/quality/13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md) — ручная PageSpeed Insights проверка опубликованных URL.
