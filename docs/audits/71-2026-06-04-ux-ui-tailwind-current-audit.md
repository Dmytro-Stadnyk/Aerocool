# Текущий UX/UI-аудит Tailwind 4.3 после каталоговых обновлений

Дата аудита: 2026-06-04.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот документ фиксирует быстрый snapshot UX/UI проекта `Aerocool Ukraine` после обновлений главной страницы, mobile navigation, desktop catalog flyout, ширины сайта, каталога, product cards, фильтров, сортировки, product detail purchase-блоков и документации Tailwind Plus. Он заменил audit `62` как snapshot состояния на 2026-06-04, но после полного visual audit текущим UX/UI-документом считается `docs/audits/72-2026-06-04-full-ux-ui-tailwind-audit.md`.

## Короткий вывод

Текущее состояние UX/UI: **8.3/10**.

Проект уже имеет рабочую каталоговую структуру вместо блогового интерфейса PaperMod: главная ведет в серии и товары, mobile menu показывает быстрые входы `SKY`, `WING`, `XTAL`, `/products/` содержит все 12 товаров, фильтры и сортировку, PDP показывает галерею, цену, наличие, условия покупки, product facts, табы и reviews-зону без fake rating.

Главный остаточный долг — не базовая визуальная система, а следующий слой product finding и сравнения: comparison table, applied filter chips, search UI, материалы/FAQ на страницах серий и дополнительные product alternatives/features на PDP.

## Текущий счет по карте 51

По активной карте [docs/architecture/29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md) на 2026-06-04:

| Статус | Количество |
|---|---:|
| Выполнено | 33 |
| Частично | 8 |
| Не выполнено | 4 |
| Отложено | 1 |
| Всего | 46 |

Это дает рабочую оценку **8.3/10**: базовые P0/P1-блоки в основном закрыты, но часть e-commerce UX еще не доведена до полного уровня Tailwind Plus / Baymard-подхода.

## Что проверялось документально

| Зона | Текущее состояние |
|---|---|
| Ширина сайта | В `assets/css/main.css` стандарт широкого контейнера зафиксирован как **1440 px** через `--site-width`, а информационные разделы ограничиваются `--content-section-width: 1200px`. |
| Header navigation | `layouts/_partials/header.html` содержит desktop catalog flyout и mobile catalog group с `Весь каталог`, `SKY`, `WING`, `XTAL`. |
| Global JS | `assets/js/site.js` управляет закрытием `details[data-close-on-outside]`, tabs, gallery, filters, sort menu, mobile filter defaults и form helpers. |
| Главная | `home-hero`, `home-product-lines`, `home-top-rated-products`, `home-choice-benefits` и `home-final-cta` формируют товарный маршрут. |
| Каталог | `layouts/products/list.html` использует `products/filters.html`, `products/sort.html`, product cards и общий `data-product-filter-root`. |
| Фильтры | Root `/products/` фильтруется по серии, материалу, регулировкам, механизму и наличию; страницы серий получают урезанные фильтры без группы серии. |
| Сортировка | Есть сортировка по названию, рейтингу, цене от дешевых и цене от дорогих; сортировка не меняет URL. |
| Product cards | `products/card.html` содержит product facts и `data-product-*` атрибуты для фильтров/сортировки. |
| PDP | `layouts/products/single.html` содержит gallery, tabs, purchase CTA, product facts, incentives, variants и reviews-зону. |
| FAQ/contact/articles/news/about | Блоки уже переведены в управляемые shortcodes/partials и описаны в карте `51`. |

## Что уже считается выполненным

| Блок | Статус |
|---|---|
| Главная: первый экран, серии, популярные товары, преимущества, статьи и финальный CTA | Выполнено |
| Desktop/mobile navigation с быстрыми входами в серии | Выполнено |
| `/products/` page heading, серии, product cards, бейджи | Выполнено |
| Root catalog filters без индексируемых URL | Выполнено |
| Filters на страницах серий без группы серии | Выполнено |
| Сортировка и счетчик результатов | Частично, потому что applied chips еще нет |
| About components | Выполнено |
| Articles/news highlights и recommended links | Выполнено |
| FAQ grouped side-by-side + related links | Выполнено |
| Contact side-by-side + success alert | Выполнено |
| Product Overview, incentives, characteristics, tabs | Выполнено |

## Открытые UX/UI задачи

| Приоритет | Задача | Почему важна |
|---|---|---|
| P1 | Comparison table для `/products/` и страниц серий | Пользователь должен сравнить модель, серию, материал, регулировки, механизм, цену и наличие без открытия каждой PDP. |
| P1 | Applied filter chips | После выбора фильтров пользователь должен видеть активные условия и уметь снять каждое условие отдельно. |
| P2 | Search page как Application UI Input Group | Текущий поиск работает базово, но визуально и структурно еще не соответствует UI-системе проекта. |
| P2 | Блок материалов на страницах серий | `Racer`, `Loft Air`, `Mesh` должны быть объяснены прямо внутри серии, а не только в статьях. |
| P2 | Series-specific FAQ | Вопросы по конкретной серии должны закрывать сомнения на уровне `SKY`, `WING`, `XTAL`, не дублируя общий FAQ. |
| P2 | Product alternatives/features на PDP | Нужны похожие модели и визуальные product feature sections, если есть реальные данные и изображения. |
| P2 | Contact placeholders и alert tap targets | Небольшой accessibility/form polish: подсказки внутри полей и action links минимум около 44px. |
| P2 | Footer refinement | Текущий footer рабочий, но формально не полный Tailwind Plus `4-column with company mission`. |
| P2 | Tailwind token cleanup | Остались точечные `bg-white`, `divide-gray-*`, `outline-red-*`, `outline-green-*`, `border-white/10`. |

## Следующий практичный порядок работ

1. Сделать comparison table.
2. Добавить applied filter chips.
3. Привести `/search/` к Application UI Input Group.
4. Добавить блок материалов на страницы серий.
5. Добавить series-specific FAQ.
6. Доработать PDP alternatives/features.
7. Дочистить form/accessibility polish.
8. Завершить Tailwind token cleanup.

## Что проверять после следующих UX/UI правок

1. Локальная Hugo-проверка через `hugo server` или полная сборка, если безопасно для review snapshot.
2. `/`, `/ru/`.
3. `/products/`, `/ru/products/`.
4. `/products/sky/`, `/products/wing/`, `/products/xtal/`.
5. Один PDP, например `/products/sky/light/`.
6. `/faq/`, `/contact/`, `/articles/`, `/news/`, `/about/` и русские версии.
7. Mobile viewport около `390x844`.
8. Desktop viewport около `1440x1000`.
9. Отсутствие horizontal overflow.
10. Работу filters, sort, reset, tabs, gallery, dropdown/flyout и mobile menu.

## Связанные документы

- [docs/architecture/29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md) — активная карта Tailwind Plus UI-секций.
- [docs/audits/72-2026-06-04-full-ux-ui-tailwind-audit.md](72-2026-06-04-full-ux-ui-tailwind-audit.md) — текущий полный глубокий UX/UI-аудит.
- [docs/architecture/03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) — карта локальных Hugo partials, shortcodes и helpers.
- [docs/audits/70-2026-06-03-ux-ui-tailwind-current-audit.md](70-2026-06-03-ux-ui-tailwind-current-audit.md) — предыдущий исторический UX/UI-снимок.
- [docs/quality/14-production-quality-gate-2026.md](../quality/14-production-quality-gate-2026.md) — финальные quality-gates перед релизом.
