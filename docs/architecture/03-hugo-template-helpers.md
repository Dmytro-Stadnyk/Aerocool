# Руководство по вспомогательным шаблонам Hugo

Обновлено: 2026-07-13.

## Зачем нужен этот документ

Этот документ объясняет логику локальных вспомогательных шаблонов `partial` проекта Aerocool так, чтобы в ней мог быстро разобраться новичок.

Текущая синхронизация документации с Hugo 0.164.0, Tailwind CSS 4.3, SEO/schema и CWV-практиками 2026 зафиксирована в [93-2026-07-07-hugo-0-164-update-audit.md](../audits/93-2026-07-07-hugo-0-164-update-audit.md). Историческая синхронизация лучших практик 2026 остается в [50-2026-05-13-documentation-2026-best-practices-sync-audit.md](../audits/50-2026-05-13-documentation-2026-best-practices-sync-audit.md).

Главная цель:

- понять, **что такое вспомогательный шаблон в Hugo**;
- понять, **какие вспомогательные шаблоны есть в проекте**;
- понять, **какой шаблон за что отвечает**;
- понимать, **в какой файл идти, если нужно изменить конкретное поведение сайта**;
- не ломать архитектуру проекта случайными правками в неправильном месте.

## Что такое вспомогательный шаблон

В проекте Aerocool вспомогательный шаблон — это небольшой `partial` в папке `layouts/_partials`, который выполняет одну понятную задачу:

- либо **возвращает значение**;
- либо **рендерит HTML-блок**;
- либо **рендерит SEO-мета-теги**;
- либо **рендерит schema.org JSON-LD**.

Проще говоря:

- `single.html` и `list.html` — это большие шаблоны страницы;
- `partials` — это небольшие переиспользуемые части логики, которые вызывают крупные шаблоны.

## Почему это вообще хорошо

Без вспомогательных шаблонов код быстро обрастает дублированием:

- один и тот же `<title>` собирается в трех местах;
- один и тот же `description` пишется в разных шаблонах;
- один и тот же `Organization` JSON-LD дублируется вручную;
- шапка и подвал становятся слишком длинными.

Вспомогательные шаблоны дают проекту:

- меньше дублирования;
- понятную архитектуру;
- более безопасные изменения;
- более предсказуемый SEO-слой.

## Как вызвать вспомогательный шаблон

Обычно `partial` вызывается так:

```gohtml
{{ partial "page-title.html" . }}
```

Здесь:

- `partial` — функция Hugo;
- `"page-title.html"` — имя partial-файла;
- `.` — текущий контекст страницы.

Если `partial` возвращает строку, результат можно использовать внутри другого шаблона:

```gohtml
<title>{{ partial "page-title.html" . }}</title>
```

Если `partial` формирует готовый HTML-блок, его вставляют как есть:

```gohtml
{{ partial "header.html" . }}
```

## Главная идея архитектуры

Вспомогательные шаблоны проекта условно делятся на четыре группы:

1. `page-*` — возвращают данные текущей страницы.
2. Структурные шаблоны — формируют части страницы.
3. `_seo/*` — формируют метатеги.
4. `_schema/*` — формируют schema.org JSON-LD.

## Цепочка рендера простыми словами

Вот как это работает сверху вниз:

1. `layouts/baseof.html` собирает каркас HTML-документа.
2. Внутри `<head>` вызывается `layouts/_partials/head.html`.
3. `head.html` уже вызывает helpers вроде:
   - `page-title.html`
   - `page-description.html`
   - `_seo/opengraph.html`
   - `_seo/twitter_cards.html`
4. В теле страницы рендерятся:
   - `header.html`
   - `breadcrumbs.html`
   - основной контент
   - `footer.html`
5. В `footer.html` после основного контента вызывается `_seo/jsonld.html`, чтобы JSON-LD не задерживал первый экран.
6. В `jsonld.html` собирается `@graph` из schema helpers:
   - `website.html`
   - `webpage.html`
   - `about-page.html`
   - `contact-page.html`
   - `logo.html`
   - `page-image-object.html`
   - `page-image-list.html`
   - `product.html`
   - `product-group.html`
   - `article.html`
   - `news.html`
   - `faq.html`
   - `breadcrumbs.html`
   - и других

Верхнеуровневые шаблоны `layouts/search.html`, `layouts/rss.xml`, `layouts/sitemap.xml`, `layouts/sitemapindex.xml`, `layouts/404.html`, `layouts/alias.html`, `layouts/list.html` и `layouts/single.html` тоже считаются локальными overrides проекта. Папки `layouts/_default` в текущей структуре нет.

## Быстрая карта макетов верхнего уровня

Эта карта нужна новичку, чтобы не искать точку входа по всему проекту.

- [layouts/baseof.html](../../layouts/baseof.html) — общий HTML-каркас.
- [layouts/single.html](../../layouts/single.html) — обычная детальная страница.
- [layouts/list.html](../../layouts/list.html) — списковые страницы и хабы.
- [layouts/products/list.html](../../layouts/products/list.html) — специализированный листинг каталога и серий товаров: breadcrumbs, page heading, быстрые ссылки между сериями, `products/filters.html`, `products/sort.html`, счетчик результатов, empty state и каталоговая сетка карточек.
- [layouts/products/single.html](../../layouts/products/single.html) — детальная товарная страница: галерея, характеристики, варианты, коммерческие данные, отзывы и основной markdown-текст.
- [layouts/articles/list.html](../../layouts/articles/list.html) — специализированный листинг статей: заголовок, breadcrumbs, карточки, изображения, meta-строка, пагинация и контент первой страницы листинга.
- [layouts/news/list.html](../../layouts/news/list.html) — специализированный листинг новостей с тем же общим контрактом заголовка, breadcrumbs, карточек, пагинации и контента первой страницы.
- [layouts/search.html](../../layouts/search.html) — страница поиска; должна оставаться `noindex,nofollow`.
- [layouts/404.html](../../layouts/404.html) — кастомная 404; должна оставаться `noindex,nofollow`.
- [layouts/alias.html](../../layouts/alias.html) — служебные alias-страницы; не использовать как SEO-посадочные.
- [layouts/rss.xml](../../layouts/rss.xml) — RSS.
- [layouts/sitemap.xml](../../layouts/sitemap.xml) — языковые sitemap-файлы.
- [layouts/sitemapindex.xml](../../layouts/sitemapindex.xml) — корневой sitemap index.
- [layouts/faq/single.html](../../layouts/faq/single.html) — детальная страница FAQ с видимым выводом вопросов.

## Быстрая карта shortcode-файлов

- [layouts/_shortcodes/home-hero.html](../../layouts/_shortcodes/home-hero.html) — hero главной страницы и ее H1.
- [layouts/_shortcodes/home-product-lines.html](../../layouts/_shortcodes/home-product-lines.html) — три входа в серии `SKY`, `WING`, `XTAL` на главной.
- [layouts/_shortcodes/home-top-rated-products.html](../../layouts/_shortcodes/home-top-rated-products.html) — товарный блок главной на базе approved отзывов: до 10 товаров на desktop и 6 на mobile.
- [layouts/_shortcodes/home-choice-benefits.html](../../layouts/_shortcodes/home-choice-benefits.html) — блок преимуществ выбора: механика, регулировки, материалы и сценарии.
- [layouts/_shortcodes/seo-image.html](../../layouts/_shortcodes/seo-image.html) — контентные изображения с контролем LCP/lazy loading.
- [layouts/_shortcodes/faq-list.html](../../layouts/_shortcodes/faq-list.html) — видимый список FAQ из front matter.
- [layouts/_shortcodes/contact.html](../../layouts/_shortcodes/contact.html) — контактная `side-by-side` секция для `/contact/` и `/ru/contact/`; содержит Netlify form и WebMCP-аннотации `contact_aerocool_ukraine`.
- [layouts/_shortcodes/contact-success-alert.html](../../layouts/_shortcodes/contact-success-alert.html) — success alert после отправки контактной формы на `/contact/success/` и `/ru/contact/success/`.
- [layouts/_shortcodes/about-intro.html](../../layouts/_shortcodes/about-intro.html) — верхний two-column description блок на `/about/` и `/ru/about/`.
- [layouts/_shortcodes/about-series-preview.html](../../layouts/_shortcodes/about-series-preview.html) — три входа в серии `SKY`, `WING`, `XTAL` на about-странице.
- [layouts/_shortcodes/about-ergonomics-features.html](../../layouts/_shortcodes/about-ergonomics-features.html) — feature-блок подхода к эргономике на about-странице.
- [layouts/_shortcodes/about-service-features.html](../../layouts/_shortcodes/about-service-features.html) — feature-блок причин работать с Aerocool на about-странице.
- [layouts/_shortcodes/about-product-facts.html](../../layouts/_shortcodes/about-product-facts.html) — description list ключевых терминов и характеристик Aerocool.
- [layouts/_shortcodes/about-next-steps.html](../../layouts/_shortcodes/about-next-steps.html) — финальный CTA на about-странице.
- [layouts/_shortcodes/section-highlights-articles.html](../../layouts/_shortcodes/section-highlights-articles.html) — краткий feature-блок “Что вы найдете в этом разделе” на `/articles/` и `/ru/articles/`.
- [layouts/_shortcodes/section-highlights-news.html](../../layouts/_shortcodes/section-highlights-news.html) — краткий feature-блок “Что уже обновлено” на `/news/` и `/ru/news/`.
- [layouts/_shortcodes/recommended-links-articles.html](../../layouts/_shortcodes/recommended-links-articles.html) — управляемый блок стартовых материалов на `/articles/` и `/ru/articles/`.
- [layouts/_shortcodes/recommended-links-news.html](../../layouts/_shortcodes/recommended-links-news.html) — управляемый блок рекомендованных новостей на `/news/` и `/ru/news/`.
- [layouts/_shortcodes/recommended-links-faq.html](../../layouts/_shortcodes/recommended-links-faq.html) — блок следующих шагов после FAQ на `/faq/` и `/ru/faq/`.

## Быстрая карта шаблонов статей

- [layouts/_partials/articles/card-image.html](../../layouts/_partials/articles/card-image.html) — responsive-изображение для карточек на листинге статей; берет `cover.image` или `image` из page bundle, строит WebP `srcset`, задает стабильные размеры и использует `lazy` loading.

## Быстрая карта шаблонов главной страницы

- [layouts/_partials/home-final-cta.html](../../layouts/_partials/home-final-cta.html) — финальный CTA главной страницы. Подключается в `layouts/list.html` после блока материалов, ведет в каталог и контакты, не имитирует checkout-flow.

## Быстрая карта общих шаблонов

- [layouts/_partials/pagination.html](../../layouts/_partials/pagination.html) — единый интерфейс перехода между страницами листинга. Используется там, где Hugo создает paginator, и не должен дублироваться отдельной разметкой в каждом list-шаблоне.

## Быстрая карта товарных шаблонов

- [layouts/_partials/products/card.html](../../layouts/_partials/products/card.html) — товарная карточка для `/products/`, страниц серий, home-блоков и related-блоков. Выводит изображение, название, цену, наличие, rating summary при approved отзывах, color dots и product facts. Для фильтров и сортировки добавляет `data-product-*`: title, price, rating, order, series, material, adjustment, mechanism и availability. Поддерживает флаг `showSeriesInTitle`: в root-каталоге карточка показывает серию в названии товара, например `WING Mesh Black` и `XTAL Mesh Black`, а на страницах конкретных серий сохраняет короткий `linkTitle`, например `Mesh Black`. Видимый CTA остается компактным `Подробнее` / `Детальніше`, а его полное доступное имя формируется через `sr-only` и `$page.Title`, например `Подробнее о модели Aerocool WING Racer Black`.
- [layouts/_partials/products/color-dots.html](../../layouts/_partials/products/color-dots.html) — компактные цветовые точки в карточках товаров. Для товаров с реальными вариантами главный источник — `product_group_id` и `data/entities.yaml`; если группы нет, helper берет `color` из главной product entity через `about_entities`. Это визуальный сигнал цвета в листинге, а не замена отдельным variant URL и не причина добавлять искусственный `product_group_id` одиночным товарам.
- [layouts/_partials/products/filters.html](../../layouts/_partials/products/filters.html) — static-first фильтры каталога. На `/products/` показывает группы серии, материала, регулировок, механизма и наличия; на страницах конкретной серии скрывает группу серии. Фильтры не меняют URL и не создают индексируемые filter pages. Форма размечена как WebMCP-инструмент `filter_aerocool_products`; группы checkbox описаны через `fieldset`, чтобы Chrome строил валидную схему параметров.
- [layouts/_partials/products/sort.html](../../layouts/_partials/products/sort.html) — сортировка каталога: по названию, рейтингу, цене от дешевых и цене от дорогих. Работает вместе с фильтрами через `assets/js/site.js`.
- [layouts/_partials/products/gallery.html](../../layouts/_partials/products/gallery.html) — товарная галерея на детальной странице. Первый кадр берет из `image` во front matter и использует как видимый кандидат на LCP; остальные обрабатываемые растровые изображения page bundle выводит миниатюрами. Большие изображения получают адаптивный WebP `srcset`; первый кадр загружается с `eager` и `fetchpriority="high"`, дополнительные кадры и миниатюры — с `lazy`. Главное изображение товара не вставляется через `seo-image` в Markdown.
- [layouts/_partials/products/gallery-image-meta.html](../../layouts/_partials/products/gallery-image-meta.html) — сопоставляет разрешенные смысловые имена дополнительных кадров с локализованными подписями и `alt`. Неизвестное имя растрового изображения останавливает сборку; SVG не является обрабатываемым ресурсом и автоматически в галерею не входит.
- [layouts/_partials/products/variant-swatches.html](../../layouts/_partials/products/variant-swatches.html) — видимый выбор цвета/варианта товара. Список вариантов строит из `product_group_id` и `data/entities.yaml` только для реальных ProductGroup с несколькими вариантами, находит страницы текущего языка и выводит swatches как ссылки на соседние variant URL. Одиночные товары без соседних вариантов не получают `product_group_id`.

## Быстрая карта шаблонов отзывов

- [layouts/_partials/reviews/form.html](../../layouts/_partials/reviews/form.html) — форма отправки отзыва в `POST /api/reviews`; выводится только для товара с включенными отзывами. Форма размечена как WebMCP-инструмент `submit_product_review`; шкала рейтинга описана через `fieldset`, потому что это один параметр `rating`, состоящий из radio-кнопок.
- [layouts/_partials/reviews/list.html](../../layouts/_partials/reviews/list.html) — список approved-отзывов текущего товара и языка из снимка, созданного во время сборки.
- [layouts/_partials/reviews/stars.html](../../layouts/_partials/reviews/stars.html) — единый визуальный вывод шкалы рейтинга без собственной логики источника данных.
- [layouts/_partials/reviews/summary-data.html](../../layouts/_partials/reviews/summary-data.html) — получает агрегированные данные рейтинга по `review_target_id` из `data/generated/reviews.json`.
- [layouts/_partials/reviews/summary-inline.html](../../layouts/_partials/reviews/summary-inline.html) — компактный рейтинг для строк и небольших интерфейсных блоков.
- [layouts/_partials/reviews/summary-card.html](../../layouts/_partials/reviews/summary-card.html) — вариант рейтинга для карточек товара.

Шаблоны отзывов не читают ручные `rating.value` или `rating.count` из front matter. Их единственный источник опубликованного рейтинга — approved-отзывы, выгруженные скриптом `scripts/export_reviews.mjs`.

Важно по единому UI-слою:

- базовая типографика, accent-цвет, радиус кнопок и общие UI-классы задаются в [assets/css/main.css](../../assets/css/main.css), а не разрозненно в каждом shortcode;
- проектный подход соответствует `Tailwind CSS 4.3`: дизайн-токены сначала задаются через `@theme`, а затем совместимо пробрасываются в `:root` для PaperMod-переменных и локальных semantic-классов;
- в шаблонах использовать utilities, сгенерированные из `@theme`: `text-aero-*`, `bg-aero-*`, `border-aero-*`, `ring-aero-*`, `stroke-aero-*`, `fill-aero-*`; дефолтные `text-gray-*`, `bg-red-*`, `border-gray-*` и похожие цветовые классы не добавлять в локальные shortcodes/partials без отдельной причины;
- для новых управляемых блоков сначала использовать классы `.ui-page-title`, `.ui-eyebrow`, `.ui-section-title`, `.ui-group-title`, `.ui-section-lead`, `.ui-body`, `.ui-card-title`, `.ui-card-text`, `.ui-meta`, `.ui-link`, `.ui-icon`, `.ui-surface`, `.ui-badge`, `.ui-alert`, `.ui-button`, `.ui-button-primary`, `.ui-button-secondary`, `.ui-footer-title`, `.ui-footer-text`, `.ui-footer-link`, `.ui-form-label` и `.ui-field`;
- блоки `recommended-links-*` и `section-highlights-*` должны брать бейджи, заголовки карточек, описания и meta-текст из `.ui-badge`, `.ui-card-title`, `.ui-card-text` и `.ui-meta`;
- `footer.html` должен использовать `.ui-footer-title`, `.ui-footer-text` и `.ui-footer-link`, чтобы footer не держал собственную типографику в Tailwind-классах;
- контактная форма должна использовать `.ui-form-label` и `.ui-field`, а success-состояние — `.ui-alert` и дочерние `.ui-alert__*` классы;
- точечные сбросы PaperMod внутри UI-компонентов должны быть привязаны к namespaced-контейнеру, например `.contact-section`, а не к общему набору utility-классов вроде `.relative.isolate.bg-white`;
- Tailwind-классы в shortcode лучше оставлять для сетки, spacing, responsive-поведения, иконок и локальной композиции;
- не возвращать `tracking-tight`, `tracking-wide` или отрицательный `letter-spacing`: в проекте закреплен `letter-spacing: 0`;
- обычные текстовые ссылки используют стабильный accent-цвет и подчеркивание; многоцветная анимация ссылок больше не является базовым паттерном проекта.

Важно по ширине UX/UI-слоя:

- широкий e-commerce контейнер проекта — `--site-width: 1440px`;
- информационные разделы используют `--content-section-width: 1200px`;
- `--nav-width` и `--main-width` завязаны на `--site-width`;
- `--gap` задает единый боковой отступ примерно от **20 px** до **40 px**;
- длинный текст не растягивать на всю ширину каталога: для него используется `--text-width: 720px`;
- если Tailwind Plus-блок уже находится внутри общего контейнера, не добавлять второй горизонтальный padding через случайные `px-*`.

Важно по каталогу и фильтрам:

- `layouts/products/list.html` отвечает за каталоговую структуру, а не обычный blog archive;
- root `/products/` выводит карточки серий, затем все товары;
- root `/products/` передает в `products/card.html` флаг `showSeriesInTitle`, чтобы одинаковые короткие `linkTitle` вроде `Mesh Black` и `Racer Black` не выглядели как дубликаты между сериями `WING` и `XTAL`;
- страницы серий выводят быстрые бейдж-ссылки `SKY`, `WING`, `XTAL` и вторичный бейдж `Весь каталог`;
- `products/filters.html` и `products/sort.html` подключаются из `layouts/products/list.html`;
- фильтры должны оставаться static-first: без URL-параметров, без индексируемых filter pages, без canonical/noindex-сюрпризов;
- активные фильтры, счетчик, reset, сортировка и empty state управляются внешним JS в `assets/js/site.js`;
- следующим UX/UI-слоем остаются метки примененных фильтров и таблица сравнения.

Важно по `about-*`:

- эти shortcodes заменяют верхние повторяющиеся markdown-разделы `/about/` на управляемые UI-компоненты;
- каждый shortcode сам переключает украинский и русский текст по языку страницы;
- `about-intro.html` соответствует Tailwind Plus `Marketing -> About Pages -> With two column description`;
- `about-series-preview.html` соответствует Tailwind Plus `Ecommerce -> Category Previews -> Three-column with description`;
- `about-ergonomics-features.html` соответствует Tailwind Plus `Marketing -> Feature Sections -> Centered 2x2 grid`;
- `about-service-features.html` соответствует Tailwind Plus `Marketing -> Feature Sections -> Simple three column with small icons`;
- `about-product-facts.html` соответствует Tailwind Plus `Application UI -> Description Lists -> Two-column`;
- `about-next-steps.html` соответствует Tailwind Plus `Marketing -> CTA Sections -> Simple justified`;
- CSS-хуки `.about-intro`, `.about-series-preview`, `.about-ergonomics-features`, `.about-service-features`, `.about-product-facts` и `.about-next-steps` сбрасываются в [assets/css/main.css](../../assets/css/main.css);
- длинные доверительные SEO-разделы ниже компонентов остаются в markdown, чтобы не превращать `/about/` в декоративный лендинг.

Важно по `section-highlights-*`:

- эти shortcodes заменяют вводные markdown-списки на компактные feature-блоки;
- каждый shortcode сам переключает украинский и русский текст по языку страницы;
- `section-highlights-news.html` соответствует Tailwind Plus `Marketing -> Feature Sections -> Simple 3x2 grid`;
- `section-highlights-articles.html` соответствует Tailwind Plus `Marketing -> Feature Sections -> Simple three column with small icons`;
- визуальные сбросы для списков держатся в [assets/css/main.css](../../assets/css/main.css) через CSS-хуки `.section-highlights-news` и `.section-highlights-articles`;
- если нужно изменить состав пунктов “Что уже обновлено” или “Что вы найдете в этом разделе”, сначала идти в соответствующий shortcode, а не возвращать markdown-список в content-файл.

Важно по `recommended-links-*`:

- эти shortcodes заменяют длинные markdown-списки на управляемые UI-блоки;
- каждый shortcode сам переключает украинский и русский текст по языку страницы;
- URL внутри shortcode должны оставаться локализованными: обычные страницы ведут на `/.../`, русские страницы — на `/ru/.../`;
- визуальные стили этих блоков держатся в [assets/css/main.css](../../assets/css/main.css) через CSS-хуки `.recommended-links-articles`, `.recommended-links-news` и `.recommended-links-faq`;
- если нужно изменить состав ссылок на хабе статей, новостей или FAQ, сначала идти в соответствующий shortcode, а не возвращать большой markdown-список в content-файл.

Важно по `contact.html`:

- shortcode сам переключает украинский и русский текст по языку страницы;
- левая колонка содержит заголовок, краткое объяснение, блок “когда обращаться”, адрес, телефон, `support@aerocool.ua`, `sales@aerocool.ua`, быстрые ссылки на каталог, FAQ и серии, а также график `09:00 — 18:00` с понедельника по воскресенье;
- правая колонка содержит Netlify form с honeypot, обязательными полями и локализованным success URL;
- форма имеет WebMCP-атрибуты `toolname="contact_aerocool_ukraine"` и локализованный `tooldescription`, чтобы PageSpeed Agentic Browsing видел ее как понятный инструмент;
- hidden-поля и honeypot получают технические `title`, а видимые поля сохраняют обычные `label`;
- markdown-файлы `content/contact/index.md` и `content/contact/index.ru.md` обычно должны содержать только вызов `{{< contact >}}`, чтобы не дублировать контактные данные ниже формы;
- отдельный markdown-раздел соцсетей на `/contact/` не используется; глобальные социальные ссылки остаются в footer и в schema global organization/brand.

Важно по WebMCP в формах:

- `toolname` — короткое техническое имя действия, например `submit_product_review`;
- `tooldescription` — человекочитаемое объяснение действия для AI-агента;
- `toolparamdescription` — описание отдельного параметра или группы параметров;
- для checkbox/radio-групп использовать `fieldset` и `legend`, а не набор несвязанных `input`;
- не добавлять `toolautosubmit` к контактной форме и форме отзывов без отдельного UX/security-решения.

Важно по `contact-success-alert.html`:

- shortcode сам переключает украинский и русский текст по языку страницы;
- используется в `content/contact-success/index.md` и `content/contact-success/index.ru.md`;
- показывает подтверждение отправки формы, ожидаемое время ответа и быстрые ссылки назад к контактам и в каталог;
- не должен заменять native validation формы: ошибки заполнения остаются на стороне браузера и Netlify form flow.

## Группа 1. Шаблоны данных страницы

Это самые важные helper-файлы для понимания логики страницы.

### `page-title.html`

Файл: [page-title.html](../../layouts/_partials/page-title.html)

Что делает:

- собирает итоговый `<title>` страницы;
- учитывает пагинацию;
- для главной берет `title` из front matter;
- для обычной страницы собирает формат `Title | Site.Title`.

Когда идти сюда:

- если у страницы неправильный `<title>`;
- если нужно изменить общую формулу заголовка документа;
- если нужно изменить поведение `title` для home, pagination или detail pages.

### `page-description.html`

Файл: [page-description.html](../../layouts/_partials/page-description.html)

Что делает:

- выбирает лучшее описание страницы;
- в первую очередь берет `description`;
- если его нет, использует `summary`;
- если и этого нет, строит fallback-описание по типу страницы.

Когда идти сюда:

- если `<meta name="description">` пустой или слабый;
- если листинги или служебные страницы получают плохой description;
- если нужно улучшить fallback-логику.

### `page-h1.html`

Файл: [page-h1.html](../../layouts/_partials/page-h1.html)

Что делает:

- возвращает видимый `H1` страницы;
- работает по правилу:

```gohtml
.Params.h1 | default .Title
```

Это означает:

- если в front matter задан `h1`, берем его;
- если `h1` не задан, берем `title`.
- Для большинства страниц проекта это и есть основной источник видимого `H1`.
- Текущее исключение — главная страница: ее hero и видимый `H1` сейчас живут в едином [home-hero.html](../../layouts/_shortcodes/home-hero.html), который сам переключает украинский/русский текст по языку страницы.

Когда идти сюда:

- если нужно поменять общую стратегию `H1`;
- если нужно изменить правило fallback;
- если команда хочет по-другому разделять `title` и `h1`.

### `breadcrumb-label.html`

Файл: [breadcrumb-label.html](../../layouts/_partials/breadcrumb-label.html)

Что делает:

- возвращает короткое имя страницы для хлебных крошек;
- сначала берет `.LinkTitle`, если поле `linkTitle` задано во front matter;
- если `linkTitle` не задан, использует `.Title`;
- применяется и в видимых breadcrumbs, и в `BreadcrumbList`, чтобы HTML и JSON-LD не расходились по названиям.

Когда идти сюда:

- если нужно изменить единое правило выбора названия для хлебных крошек;
- если нужно добавить дополнительную очистку или fallback для breadcrumb label.

### `page-meta.html`

Файл: [page-meta.html](../../layouts/_partials/page-meta.html)

Что делает:

- формирует фрагмент видимой meta-строки с датой и временем чтения под `H1` и в карточках листингов;
- читает `.Params.schema_types`, `.Date`, `.ReadingTime`, `.Param "ShowReadingTime"` и `.Param "hideMeta"`;
- для страниц со `schema_types: ["article", ...]` выводит дату публикации и время чтения;
- для страниц со `schema_types: ["news", ...]` выводит только дату публикации;
- для контактов, FAQ, страницы о бренде, каталога, серий, товаров, хабов, поиска и служебных страниц ничего не выводит;
- не выводит количество слов, автора и список переводов: автор детальной статьи добавляется отдельно через [article-author.html](../../layouts/_partials/article-author.html).

Где используется:

- [layouts/single.html](../../layouts/single.html) — обычные одиночные страницы;
- [layouts/faq/single.html](../../layouts/faq/single.html) — FAQ-страница;
- [layouts/list.html](../../layouts/list.html) — footer карточек в листингах.

Текущая политика видимого вывода:

| Тип страницы | Условие | Что видно пользователю |
|---|---|---|
| Детальная статья | `schema_types` содержит `article` | автор-организация + дата публикации + время чтения; автор добавляется в `single.html` |
| Карточка статьи | `schema_types` содержит `article` | дата публикации + время чтения |
| Новость | `schema_types` содержит `news` | дата публикации |
| Контакты | `schema_types` содержит `contact-page` | ничего |
| FAQ | `schema_types` содержит `faq` | ничего |
| About | `schema_types` содержит `about-page` | ничего |
| Каталог, серия, товар | `collection` или `product` без `article/news` | ничего |
| Поиск и служебные страницы | `layout: "search"` или отдельный служебный шаблон | ничего |

Важно:

- `date` и `lastmod` остаются во front matter и используются SEO/schema-слоем, даже если дата не показана в интерфейсе;
- `lastmod` для статей и новостей видимо выводится редакционным блоком [editorial-note.html](../../layouts/_partials/editorial-note.html), а не `page-meta.html`;
- `ShowWordCount: true` может оставаться в [hugo.yaml](../../hugo.yaml), но локальный `page-meta.html` намеренно не показывает количество слов;
- автор детальной статьи централизованно берется из [editorial-author.html](../../layouts/_partials/editorial-author.html), ведет на редакционную политику и не повторяется во front matter каждой статьи;
- переключатель языка остается в шапке сайта через [header.html](../../layouts/_partials/header.html), а не в контентной meta-строке;
- `hideMeta: true` остается ручным override для страниц, где нужно принудительно скрыть meta-строку.

Что не делать:

- не возвращать `post_meta.html` в [layouts/single.html](../../layouts/single.html) и [layouts/list.html](../../layouts/list.html), потому что он снова выведет глобальные PaperMod-поля вроде автора, времени чтения и количества слов;
- не вставлять [translation-list.html](../../layouts/_partials/translation-list.html) под `H1`;
- не решать задачу через массовое `hideMeta: true` в контенте, если поведение относится к типу страницы.

Как проверять после изменения:

- `npm run build`;
- проверить `/contact/`, `/faq/`, `/about/`, `/products/` и товарную страницу: видимой `post-meta` быть не должно;
- проверить детальную статью: должны быть связанный автор-организация, дата публикации и время чтения, без количества слов и списка переводов;
- проверить карточку статьи: должны быть только дата публикации и время чтения;
- проверить новость: в основной meta-строке должна быть только дата публикации, а автор-организация должен быть виден в редакционном блоке;
- проверить `/ru/`-версии тех же URL.

### `editorial-author.html`

Файл: [editorial-author.html](../../layouts/_partials/editorial-author.html)

Что делает:

- читает подтвержденную сущность `aerocool-editorial-team` из [data/entities.yaml](../../data/entities.yaml);
- возвращает локализованное имя «Редакція/Редакция Aerocool Ukraine»;
- возвращает стабильный JSON-LD `@id` и ссылку на раздел редакционной политики текущей языковой версии About;
- останавливает сборку, если сущность отсутствует, не подтверждена или локализованная About-страница не найдена;
- служит единым источником для видимого автора, `<meta name="author">`, `Article` и `NewsArticle`.

### `article-author.html`

Файл: [article-author.html](../../layouts/_partials/article-author.html)

Что делает:

- выводит связанного автора-организацию только на детальной странице статьи;
- не добавляет подпись в карточки листинга и не меняет компактную meta-строку новостей;
- использует `rel="author"` и ведет на публичную редакционную политику в About.

### `page-image.html`

Файл: [page-image.html](../../layouts/_partials/page-image.html)

Что делает:

- возвращает главную картинку страницы;
- сначала ищет `image` во front matter;
- если `image` указывает на файл внутри page bundle, берет bundle-ресурс;
- если это внешний URL, использует его;
- если изображения нет, выбирает дефолт по типу страницы.

Где используется:

- `og:image`
- `twitter:image`
- `primaryImageOfPage`
- `Product.image`
- другие schema-сущности

Когда идти сюда:

- если на странице неправильная социальная картинка;
- если OG/Twitter/schema берут не то изображение;
- если нужно изменить дефолтные fallback-картинки.

### `cover.html`

Файл: [cover.html](../../layouts/_partials/cover.html)

Что делает:

- переопределяет стандартный PaperMod cover partial локально;
- берет `cover.image` из front matter;
- корректно ищет изображения внутри page bundle;
- генерирует WebP-версии, `srcset`, `sizes`, `width` и `height`;
- помогает снижать CLS и контролировать LCP для главного изображения страницы.

Когда идти сюда:

- если preview-картинка в листинге или cover одиночной страницы рендерится неправильно;
- если нужно изменить стратегию responsive images для cover;
- если меняется стандарт `cover.image`, `cover.relative` или `cover.hiddenInSingle`.

### `page-language.html`

Файл: [page-language.html](../../layouts/_partials/page-language.html)

Что делает:

- переводит внутренний язык Hugo в нормальный языковой код для SEO и schema;
- например:
  - `uk` -> `uk-UA`
  - `ru` -> `ru-UA`

Когда идти сюда:

- если `hreflang`, `inLanguage`, `og:locale` или schema language ведут себя неправильно.

### `page-website-id.html`

Файл: [page-website-id.html](../../layouts/_partials/page-website-id.html)

Что делает:

- собирает `@id` сущности `WebSite`;
- используется в schema-графе как точка связи между `WebSite`, `WebPage`, `Article`, `Product`, `FAQPage` и другими сущностями.

Когда идти сюда:

- если ломается связность schema-графа;
- если `@id` у `WebSite` должен измениться;
- если нужно проверить multilingual-логику для `WebSite`.

### `page-series-slugs.html`

Файл: [page-series-slugs.html](../../layouts/_partials/page-series-slugs.html)

Что делает:

- определяет, к каким сериям относится текущая страница:
  - `sky`
  - `wing`
  - `xtal`
- берет данные из:
  - `related_series`
  - `category`
  - `categories`
  - `tags`
  - `product_group_id`
  - `about_entities`
  - `mentions_entities`
  - `title`
  - `description`
  - `summary`
  - `slug`
  - `RelPermalink`
- сначала использует сильные сигналы: `related_series`, категорию, теги, `product_group_id` и `about_entities`;
- `mentions_entities` и текстовые поля использует как fallback, если сильных сигналов серии нет.

Зачем нужен:

- для более точной перелинковки;
- чтобы related-блоки не сканировали весь `.Plain` текст и не тянули шумные материалы.
- чтобы статья, которая тематически относится к одной серии, не получала лишние товары другой серии только из-за сравнительного упоминания в `summary`.

Когда идти сюда:

- если “похожие материалы” подбираются не по той серии;
- если нужно улучшить связь между контентом и каталогом.

## Группа 2. Структурные шаблоны

Эти helpers рендерят большие части страницы.

### `head.html`

Файл: [head.html](../../layouts/_partials/head.html)

Что делает:

- собирает весь `<head>`;
- выводит:
  - `robots`
  - `<title>`
  - `description`
  - `canonical`
  - Open Graph
  - Twitter Cards
  - favicon
  - CSS
  - hreflang
  - prefetch
  - verification-теги

Это один из самых важных partial-файлов во всем проекте.

Когда идти сюда:

- если проблема в `<head>`;
- если страница индексируется неправильно;
- если `canonical`, `robots`, `hreflang`, CSS или SEO meta работают не так.

### `header.html`

Файл: [header.html](../../layouts/_partials/header.html)

Что делает:

- рендерит шапку сайта;
- логотип;
- переключатель языков;
- desktop menu;
- desktop catalog flyout для `Весь каталог`, `SKY`, `WING`, `XTAL`;
- mobile menu с отдельной catalog group;
- отделяет товарные входы от secondary links вроде FAQ и контактов.

Когда идти сюда:

- если нужно менять навигацию;
- если ломается логотип;
- если меню работает не так на мобильных;
- если нужно изменить ARIA/alt/языковой switcher;
- если нужно изменить быстрые входы в серии или поведение `details[data-close-on-outside]`.

### `footer.html`

Файл: [footer.html](../../layouts/_partials/footer.html)

Что делает:

- рендерит footer;
- подключает footer-links;
- рендерит copyright;
- выводит JSON-LD через `_seo/jsonld.html` для обычных страниц;
- регистрирует клиентские скрипты;
- подключает scroll-to-top и другие client-side сценарии.

Когда идти сюда:

- если проблема внизу сайта;
- если нужно убрать или добавить глобальный клиентский скрипт;
- если нужно изменить поведение service worker, scroll-to-top или footer-разметки.

### `footer-links.html`

Файл: [footer-links.html](../../layouts/_partials/footer-links.html)

Что делает:

- выводит SEO/sitewide блок ссылок в footer;
- собирает основные разделы и ключевые серии.

Когда идти сюда:

- если нужно усилить sitewide-перелинковку;
- если нужно добавить или убрать важные ссылки из footer.

### `translation-list.html`

Файл: [translation-list.html](../../layouts/_partials/translation-list.html)

Что делает:

- выводит список переводов текущей страницы;
- использует актуальные Hugo language fields `.Language.Name` и `.Language.Label`;
- оставлен как локальный helper для совместимости, но обычные страницы сейчас используют языковой переключатель в [header.html](../../layouts/_partials/header.html), а не список переводов под `H1`.

Важно:

- старое имя `translation_list.html` не использовать в локальных шаблонах;
- в теме PaperMod оно еще встречается, поэтому локальный `search.html` нужен как override;
- на `2026-05-19` обычные локальные шаблоны `single`, `faq/single`, `list` и `search` не вызывают этот helper в контентной зоне.

### `post-footer-navigation.html`

Файл: [post-footer-navigation.html](../../layouts/_partials/post-footer-navigation.html)

Что делает:

- строит блок “Что посмотреть дальше”;
- показывает:
  - ключевые разделы
  - похожие модели
  - полезные материалы
- учитывает `related_series` через [page-series-slugs.html](../../layouts/_partials/page-series-slugs.html);
- если в front matter есть `related_products`, ставит эти товары первыми в блоке похожих моделей;
- если в front matter есть `related_articles` или `related_news`, ставит эти материалы первыми в блоке полезных материалов;
- если страница связана сразу с несколькими сериями и ручных `related_products` нет, сначала старается показать по одной модели из каждой серии, а потом добавляет остальные.

Это helper для внутренней перелинковки между:

- каталогом;
- сериями;
- товарами;
- статьями;
- новостями.

Когда идти сюда:

- если related links ведут не туда;
- если нужно усилить связь `article -> product`;
- если нужно усилить связь `article -> article` внутри тематического кластера;
- если нужно изменить состав блока и правила подбора.
- если редакционно нужно поднять конкретные модели через `related_products` или конкретные гайды через `related_articles`, не меняя видимый текст статьи.

### `editorial-note.html`

Файл: [editorial-note.html](../../layouts/_partials/editorial-note.html)

Что делает:

- выводит видимый редакционный trust-блок на статьях и новостях;
- срабатывает для страниц, где `schema_types` содержит `article` или `news`;
- на статье ссылается на публичную редакционную политику, не дублируя подпись автора из основной meta-строки;
- на новости показывает связанного автора-организацию, потому что основная meta-строка новости содержит только дату;
- объясняет, что характеристики, цены, гарантия и наличие сверяются с карточками товаров и служебными страницами сайта;
- выводит дату последнего обновления из `.Lastmod`;
- локализуется по языку страницы.

Когда идти сюда:

- если нужно изменить формулировку редакционной ответственности;
- если появится подтвержденный публичный персональный автор или рецензент и будет принято отдельное архитектурное решение;
- если изменится публичная редакционная методика.

### `css.html`

Файл: [css.html](../../layouts/_partials/css.html)

Что делает:

- подключает Tailwind/CSS-слой, который должен собраться через Hugo pipeline;
- помогает Hugo увидеть классы и корректно собрать стили.

Когда идти сюда:

- если проблема в CSS pipeline;
- если новые классы не попадают в итоговую сборку;
- если нужно понять, как Hugo подключает CSS.

### `extend_footer.html`

Файл: [extend_footer.html](../../layouts/_partials/extend_footer.html)

Что делает:

- сейчас не добавляет видимый HTML и не содержит скриптов;
- оставлен как безопасная точка расширения footer-слоя;
- содержит комментарий, что поведение footer живет в `assets/js/site.js`.

Важно:

- не возвращать сюда inline scripts без отдельной причины;
- клиентское поведение сайта сейчас нужно менять в [assets/js/site.js](../../assets/js/site.js).

### `script-theme.html`

Файл: [script-theme.html](../../layouts/_partials/script-theme.html)

Что делает:

- служебный partial под theme-script слой;
- по сути это точка расширения.

Новичку этот файл почти наверняка не нужен: это пустая точка расширения для будущей логики темы.

## Группа 3. Вспомогательные SEO-шаблоны

Эти helpers не строят видимый UI, но отвечают за мета-слой.

### `_seo/opengraph.html`

Файл: [opengraph.html](../../layouts/_partials/_seo/opengraph.html)

Что делает:

- выводит `og:*` теги;
- использует:
  - `page-title`
  - `page-description`
  - `page-image`
  - URL страницы
  - тип страницы (`website`, `article`, `product`)

Когда идти сюда:

- если соцсети показывают неправильный заголовок;
- если `og:image` не совпадает с ожиданием;
- если нужно изменить `og:type`.

### `_seo/twitter_cards.html`

Файл: [twitter_cards.html](../../layouts/_partials/_seo/twitter_cards.html)

Что делает:

- рендерит `twitter:*` мета-теги;
- обычно использует те же базовые helpers, что и Open Graph.

Когда идти сюда:

- если Twitter/X показывает неправильную карточку страницы.

### `_seo/lcp-image-preload.html`

Файл: [lcp-image-preload.html](../../layouts/_partials/_seo/lcp-image-preload.html)

Что делает:

- выводит ранний responsive preload для главного изображения первого экрана;
- работает для home hero, типовых `article`, `news` и `product` страниц;
- для главной страницы использует Hugo global image resource `assets/images/home-hero85.webp` и те же `sizes`, что [home-hero.html](../../layouts/_shortcodes/home-hero.html);
- для статей и новостей использует `image` из front matter, если `cover.hiddenInSingle: true` и первое видимое `seo-image` использует тот же файл;
- для товаров использует `image` из front matter и синхронизируется с [products/gallery.html](../../layouts/_partials/products/gallery.html), а не с markdown `seo-image`;
- генерирует WebP `imagesrcset`, `imagesizes`, `type="image/webp"` и `fetchpriority="high"`;
- берет `imagesizes` из `seo_image_sizes` только для статей и новостей, если поле задано во front matter; для товаров используются gallery `sizes`;
- дополняет shortcode `seo-image` на article/news страницах, чтобы shortcode не дублировал body-level preload.

Когда идти сюда:

- если LCP-картинка не начинает грузиться из `<head>`;
- если нужно изменить общий `sizes` для первого article/news изображения;
- если у первого article/news `seo-image` нестандартный `sizes` и нужно синхронизировать его с `seo_image_sizes`;
- если меняется product gallery `sizes` или стандарт `image + cover.hiddenInSingle + products/gallery`;
- если меняется стандарт `image + cover.hiddenInSingle + seo-image` для статей и новостей.

### `_seo/jsonld.html`

Файл: [jsonld.html](../../layouts/_partials/_seo/jsonld.html)

Что делает:

- собирает итоговый schema.org `@graph`;
- включает сущности по `schema_types`:
  - `WebSite`
  - локальную `Organization`
  - глобальную `Organization`
  - `Brand`
- автоматически закрывает зависимости `logo` и `brand`, если выбранные сущности на них ссылаются;
- добавляет контентные сущности по типу страницы:
  - `Product`
  - `Article`
  - `NewsArticle`
  - `FAQPage`
  - `CollectionPage`
  - `WebPage`
  - `AboutPage`
  - `ContactPage`
  - `ImageObject`
  - `BreadcrumbList`

Это главный entrypoint для всего schema-слоя.
Для страниц с `layout: "search"` `footer.html` не вызывает `jsonld.html`, поэтому JSON-LD там не рендерится.
Для главной страницы `BreadcrumbList` не рендерится, потому что одноэлементные breadcrumbs на home не дают полезной структуры.
Техническая валидность графа не отменяет Google quality rules: значения, которые попадают в JSON-LD, должны соответствовать видимому контенту страницы.

Когда идти сюда:

- если нужно понять, почему schema вообще есть на странице;
- если нужно изменить состав графа;
- если какой-то schema-partial должен перестать включаться.

## Группа 4. Вспомогательные шаблоны schema.org

Это отдельные сущности внутри JSON-LD.

### `website.html`

Файл: [website.html](../../layouts/_partials/_schema/website.html)

Что делает:

- описывает сайт как `WebSite`;
- включает `SearchAction`;
- задает `@id`, `url`, `name`, `description`, `image`, `inLanguage`;
- добавляет `publisher`, если в `schema_types` включена `organization`.

### `webpage.html`

Файл: [webpage.html](../../layouts/_partials/_schema/webpage.html)

Что делает:

- описывает конкретную страницу как `WebPage`;
- связывает ее с `WebSite`;
- подключает `mainEntity`, `breadcrumb`, `publisher`, `primaryImageOfPage`;
- не добавляет `breadcrumb` на главной странице.

### `about-page.html`

Файл: [about-page.html](../../layouts/_partials/_schema/about-page.html)

Что делает:

- описывает страницу `/about/` как `AboutPage`;
- связывает страницу с `Brand`, локальной `Organization`, `WebSite`, breadcrumbs и primary image;
- добавляет `lastReviewed` и ключевые `significantLink`.

### `contact-page.html`

Файл: [contact-page.html](../../layouts/_partials/_schema/contact-page.html)

Что делает:

- описывает страницу `/contact/` как `ContactPage`;
- связывает страницу с локальной `Organization`;
- добавляет `lastReviewed`, `significantLink` для `tel:` / `mailto:` и `relatedLink` на каталог и FAQ.

### `page-image-object.html`

Файл: [page-image-object.html](../../layouts/_partials/_schema/page-image-object.html)

Что делает:

- строит единый `ImageObject` для основного изображения страницы;
- использует `image` во front matter через `page-image.html`;
- добавляет image license metadata через [image-license-metadata.html](../../layouts/_partials/_schema/image-license-metadata.html): `license`, `acquireLicensePage`, `creator`, `creditText`, `copyrightNotice`;
- дает стабильный `@id` вида `#primary-image`, на который ссылаются `WebPage`, `Product`, `Article` и `NewsArticle`.

### `page-image-list.html`

Файл: [page-image-list.html](../../layouts/_partials/_schema/page-image-list.html)

Что делает:

- возвращает список изображений для `Article.image` и `NewsArticle.image`;
- первым элементом оставляет ссылку на основной `ImageObject` через `#primary-image`;
- для статей и новостей с `image: "01-front.webp"` автоматически добавляет page resources `01-front-16x9.webp`, `01-front-4x3.webp`, `01-front-1x1.webp`, если они существуют;
- не требует новых front matter полей и не рассинхронизирует `index.md` / `index.ru.md`.

### `image-license-metadata.html`

Файл: [image-license-metadata.html](../../layouts/_partials/_schema/image-license-metadata.html)

Что делает:

- возвращает единый набор правовых/кредитных полей для `ImageObject`;
- выбирает локализованный URL страницы условий: `/image-license/` для украинского языка и `/ru/image-license/` для русского;
- фиксирует `creator` как global Aerocool organization и `creditText` как `Aerocool`;
- не читает данные из content, чтобы не размножать юридические утверждения по страницам.

### `logo.html`

Файл: [logo.html](../../layouts/_partials/_schema/logo.html)

Что делает:

- строит отдельный top-level `ImageObject` для логотипа;
- дает стабильный `@id` вида `#logo`;
- добавляет тот же набор image license metadata, что и primary image;
- используется как `WebSite.image`, `Organization.logo` и `Organization.image`;
- подключается как зависимый top-level узел, если в графе есть `website` или `organization`.

### `local-organization.html`

Файл: [local-organization.html](../../layouts/_partials/_schema/local-organization.html)

Что делает:

- описывает `Aerocool Ukraine` как локальную организацию/представительство;
- связывает локальную сущность с глобальной компанией через `parentOrganization` и с глобальным брендом через `brand`;
- хранит публичные контактные факты: адрес, телефон, `support@aerocool.ua`, `sales@aerocool.ua` и часы работы `Monday-Sunday 09:00-18:00`;
- не содержит `sameAs` на глобальные соцсети, потому что эти профили едины для всех представительств и принадлежат глобальным сущностям.

### `global-organization.html`

Файл: [global-organization.html](../../layouts/_partials/_schema/global-organization.html)

Что делает:

- описывает глобальную компанию `Aerocool`;
- содержит официальные глобальные `sameAs` профили Aerocool.

### `brand.html`

Файл: [brand.html](../../layouts/_partials/_schema/brand.html)

Что делает:

- описывает глобальный бренд `Aerocool`;
- содержит официальные глобальные `sameAs` профили Aerocool.

### `product.html`

Файл: [product.html](../../layouts/_partials/_schema/product.html)

Что делает:

- строит `Product` schema;
- использует:
  - `price`
  - `sku`
  - `availability`
  - `priceValidUntil`
  - `shippingDetails`
  - `hasMerchantReturnPolicy`
  - `acceptedPaymentMethod`
  - `warranty`
  - `aggregateRating`
  - `brand`
- берет `color` и ссылку `material` из главной товарной сущности `data/entities.yaml`;
- выводит `Product.material` только по подтвержденной сущности материала и использует ее локализованное название;
- для product facts источником правды является front matter конкретной товарной страницы;
- merchant-условия из `shippingDetails`, `hasMerchantReturnPolicy` и `acceptedPaymentMethod` читаются из front matter и должны оставаться синхронизированными с видимым товарным текстом и `/faq/` как policy-зеркалом.

Когда идти сюда:

- если product schema неверная;
- если в rich results у товара странные данные;
- если front matter заполнен верно, но цена, наличие, доставка, возврат, payment methods или seller schema рендерятся не так.

### `product-group.html`

Файл: [product-group.html](../../layouts/_partials/_schema/product-group.html)

Что делает:

- описывает реальную группу вариантов одной модели как `ProductGroup`;
- связывает варианты через стабильный `product_group_id` из `data/entities.yaml`;
- не создает группу для одиночного товара без соседних вариантов.

Когда идти сюда:

- если `Product.isVariantOf` или узел `ProductGroup` собраны неверно;
- если добавляется подтвержденная группа цветовых вариантов одной модели;
- если нужно проверить согласованность schema-графа и видимых ссылок `variant-swatches.html`.

### `entity-ref.html`

Файл: [entity-ref.html](../../layouts/_partials/_schema/entity-ref.html)

Что делает:

- безопасно резолвит один `entity_id` из [data/entities.yaml](../../data/entities.yaml);
- возвращает JSON-LD reference вида `{"@id": "...", "@type": "..."}`, если у сущности есть `schema_candidate`;
- по умолчанию выводит только сущности со статусом `confirmed`;
- игнорирует неизвестные, `planned`, `needs-review` и `do-not-markup` сущности, чтобы front matter не ломал сборку;
- нужен для validator-safe ссылок в `about`, `mentions`, `hasVariant` и других местах, где Schema.org Validator должен понимать тип целевого `@id`.

### `entity-node.html`

Файл: [entity-node.html](../../layouts/_partials/_schema/entity-node.html)

Что делает:

- строит полноценный JSON-LD узел сущности из [data/entities.yaml](../../data/entities.yaml);
- используется для подтвержденных сущностей, которые нужно вывести как часть общего graph;
- для `DefinedTerm` выводит только validator-safe поля: `@id`, `name`, `alternateName`, `identifier`, `termCode`, `url`, `subjectOf`;
- не заменяет видимый контент страницы: сущность должна быть раскрыта на странице или в связанном контенте.

### `entity-node-list.html`

Файл: [entity-node-list.html](../../layouts/_partials/_schema/entity-node-list.html)

Что делает:

- собирает список JSON-LD узлов сущностей;
- удаляет дубли;
- помогает держать `about_entities`, `mentions_entities` и registry-based nodes управляемыми через один источник данных.

### `entity-ref-list.html`

Файл: [entity-ref-list.html](../../layouts/_partials/_schema/entity-ref-list.html)

Что делает:

- безопасно резолвит список `about_entities` или `mentions_entities`;
- удаляет повторяющиеся `entity_id`;
- используется в `webpage`, `about-page`, `contact-page`, `collection`, `article` и `news` schema partials. Для товарных страниц `about_entities` и `mentions_entities` попадают в `WebPage`, а `Product` остается основным товарным узлом с `brand`, `offers`, `seller` и, только для реальных групп вариантов, staged `product_group_id`.

### `editorial-organization.html`

Файл: [editorial-organization.html](../../layouts/_partials/_schema/editorial-organization.html)

Что делает:

- добавляет в общий `@graph` самостоятельный узел автора-организации для статей и новостей;
- берет имя, стабильный `@id` и локализованный публичный URL из [editorial-author.html](../../layouts/_partials/editorial-author.html);
- связывает редакцию с основной Aerocool Ukraine через `parentOrganization`;
- позволяет `Article.author` и `NewsArticle.author` использовать короткую ссылку по `@id` без дублирования полного объекта на каждой странице.

### `article.html`

Файл: [article.html](../../layouts/_partials/_schema/article.html)

Что делает:

- строит `Article` schema для evergreen-материалов;
- ссылается на отдельный узел «Редакция Aerocool Ukraine» как `author`, а основную локальную организацию сохраняет как `publisher`;
- берет `image` через [page-image-list.html](../../layouts/_partials/_schema/page-image-list.html), чтобы основной `ImageObject` и дополнительные crops **16:9**, **4:3**, **1:1** попадали в JSON-LD одним списком.

### `news.html`

Файл: [news.html](../../layouts/_partials/_schema/news.html)

Что делает:

- строит `NewsArticle` schema для новостей;
- ссылается на отдельный узел «Редакция Aerocool Ukraine» как `author`, а основную локальную организацию сохраняет как `publisher`;
- берет `image` через [page-image-list.html](../../layouts/_partials/_schema/page-image-list.html), чтобы основной `ImageObject` и дополнительные crops **16:9**, **4:3**, **1:1** попадали в JSON-LD одним списком.

### `faq.html`

Файл: [faq.html](../../layouts/_partials/_schema/faq.html)

Что делает:

- рендерит `FAQPage` на основе `.Params.faq_groups` или fallback `.Params.faq`, если в `schema_types` есть `faq`.
- Предпочтительный источник для страницы `/faq/` — `.Params.faq_groups`: видимый FAQ выводится тематическими группами через shortcode [layouts/_shortcodes/faq-list.html](../../layouts/_shortcodes/faq-list.html), а schema flatten-ит все `items` в единый `FAQPage.mainEntity`. Старый `.Params.faq` остается fallback для плоских FAQ-массивов.

### `collection.html`

Файл: [collection.html](../../layouts/_partials/_schema/collection.html)

Что делает:

- описывает списковые страницы как `CollectionPage`;
- добавляет `ItemList`.

### `breadcrumbs.html`

Файл видимых хлебных крошек: [breadcrumbs.html](../../layouts/_partials/breadcrumbs.html)

Что делает:

- рендерит видимый навигационный блок `<nav>` с классом `site-breadcrumbs`;
- не рендерится на главной странице;
- строит путь через `.CurrentSection` и добавляет текущую страницу последней крошкой;
- использует `breadcrumb-label.html` для коротких названий;
- задает локализованный `aria-label`: `Хлібні крихти` для `uk` и `Хлебные крошки` для `ru`;
- защищает длинные названия через Tailwind-классы `min-w-0`, `overflow-hidden` и `truncate`.

Файл schema-разметки: [breadcrumbs.html](../../layouts/_partials/_schema/breadcrumbs.html)

Что делает:

- строит `BreadcrumbList` для schema-графа;
- использует `breadcrumb-label.html` для тех же коротких названий, что и видимый HTML;
- не рендерится на главной странице, чтобы не создавать одноэлементную хлебную крошку.

## Как быстро понять, куда идти

Если проблема такая:

- неправильный `<title>` -> [page-title.html](../../layouts/_partials/page-title.html)
- плохой `description` -> [page-description.html](../../layouts/_partials/page-description.html)
- странный `H1` на большинстве страниц -> [page-h1.html](../../layouts/_partials/page-h1.html)
- странный `H1` или hero на главной -> [home-hero.html](../../layouts/_shortcodes/home-hero.html)
- лишняя дата, время чтения или количество слов под `H1` -> [page-meta.html](../../layouts/_partials/page-meta.html)
- неправильный автор детальной статьи -> [article-author.html](../../layouts/_partials/article-author.html) и [editorial-author.html](../../layouts/_partials/editorial-author.html)
- проблема с видимым FAQ на `/faq/` -> [layouts/faq/single.html](../../layouts/faq/single.html) и [faq-list.html](../../layouts/_shortcodes/faq-list.html)
- проблема с feature-блоком “Что вы найдете” на `/articles/` -> [section-highlights-articles.html](../../layouts/_shortcodes/section-highlights-articles.html)
- проблема с feature-блоком “Что уже обновлено” на `/news/` -> [section-highlights-news.html](../../layouts/_shortcodes/section-highlights-news.html)
- проблема с блоком стартовых статей на `/articles/` -> [recommended-links-articles.html](../../layouts/_shortcodes/recommended-links-articles.html)
- проблема с блоком рекомендованных новостей на `/news/` -> [recommended-links-news.html](../../layouts/_shortcodes/recommended-links-news.html)
- проблема с блоком следующих шагов на `/faq/` -> [recommended-links-faq.html](../../layouts/_shortcodes/recommended-links-faq.html)
- проблема с success-сообщением после контактной формы -> [contact-success-alert.html](../../layouts/_shortcodes/contact-success-alert.html)
- нет редакционного trust-блока на статье или новости -> [editorial-note.html](../../layouts/_partials/editorial-note.html) и вызов в [single.html](../../layouts/single.html)
- не та картинка в соцсетях -> [page-image.html](../../layouts/_partials/page-image.html), [opengraph.html](../../layouts/_partials/_seo/opengraph.html), [twitter_cards.html](../../layouts/_partials/_seo/twitter_cards.html)
- проблема с canonical, robots или hreflang -> [head.html](../../layouts/_partials/head.html)
- schema не та -> [jsonld.html](../../layouts/_partials/_seo/jsonld.html) и нужный файл в `_schema`
- шапка сайта -> [header.html](../../layouts/_partials/header.html)
- footer -> [footer.html](../../layouts/_partials/footer.html)
- “похожие материалы” -> [post-footer-navigation.html](../../layouts/_partials/post-footer-navigation.html)

## Что лучше не делать новичку

- не править тему `themes/PaperMod`, если это можно решить локальным override в `layouts/`
- не вставлять SEO-логику в `single.html`, если для нее уже есть helper
- не дублировать вычисление `title`, `description`, `image` в нескольких местах
- не добавлять вручную `# H1` в markdown-контент
- не создавать новый helper, если уже есть подходящий существующий

## Хороший подход к правкам

Если нужно что-то изменить:

1. Сначала понять, это **данные страницы**, **HTML-блок**, **meta-слой** или **schema**.
2. Найти helper нужной группы.
3. Изменить логику в одном месте.
4. Пересобрать сайт.
5. Проверить:
   - главную;
   - одну списковую страницу;
   - одну детальную страницу;
   - `uk` и `ru`.

## Короткая формула для запоминания

- `page-*` -> данные страницы
- `head/header/footer` -> структура HTML
- `_seo/*` -> meta-теги
- `_schema/*` -> JSON-LD

Если точка входа неясна, обычно следует начать с этих файлов:

1. [head.html](../../layouts/_partials/head.html)
2. [page-title.html](../../layouts/_partials/page-title.html)
3. [page-description.html](../../layouts/_partials/page-description.html)
4. [page-image.html](../../layouts/_partials/page-image.html)
5. [jsonld.html](../../layouts/_partials/_seo/jsonld.html)

Этого обычно достаточно, чтобы новичок уже начал уверенно ориентироваться в helper-слое проекта.
