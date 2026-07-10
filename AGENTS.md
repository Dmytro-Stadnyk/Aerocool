# AGENTS.md

Обновлено: 2026-07-10.

Этот файл задает обязательные правила для разработчиков и автоматизированных помощников, которые изменяют репозиторий Aerocool Ukraine.

## 1. Проект и окружения

- Проект — двуязычный маркетинговый и каталоговый сайт на Hugo.
- Основной язык — украинский (`uk`), второй — русский (`ru`).
- Рабочая ветка — `dev`.
- Branch Deploy — `https://dev--hugo-aerocool.netlify.app/`.
- `main` используется только для production-релизов `https://aerocool.ua/`.
- В `netlify.toml` пока зафиксировано `HUGO_ENVIRONMENT = "development"`; это намеренно удерживает все HTML-страницы в `noindex,nofollow`.
- Не включать production-индексацию без прохождения `docs/quality/14-production-quality-gate-2026.md`.

## 2. Зафиксированный стек

- Hugo `0.164.0`.
- Node.js `24.16.0`.
- Tailwind CSS и `@tailwindcss/cli` `4.3.0`.
- PaperMod как Git-подмодуль в `themes/PaperMod`.
- Netlify для сборки, deploy и Functions.
- Netlify Database / PostgreSQL для системы отзывов.
- mise для локальных версий инструментов.

Hugo `0.164.0` запускает Tailwind через `css.TailwindCSS` и npm-пакет `@tailwindcss/cli`. Не удалять Tailwind из `package.json` и не вводить standalone Tailwind CLI.

## 3. Источники правды

- `hugo.yaml` — языки, меню, permalink, sitemap и общие параметры Hugo.
- `mise.toml` — локальные версии Hugo и Node.js.
- `package.json` и `package-lock.json` — npm-зависимости и команды.
- `netlify.toml` — параметры Netlify build, окружение и статические headers.
- `content/` — видимый контент сайта.
- Front matter товарной страницы — цена, наличие, SKU, MPN, GTIN, гарантия, доставка, возврат и способы оплаты конкретного товара.
- `data/entities.yaml` — допустимые идентификаторы сущностей.
- Netlify Database — целевой источник approved-отзывов.
- `data/generated/reviews.json` — build-time снимок approved-отзывов для Hugo.

Не дублировать изменяемые коммерческие факты в `static/llms.txt` или документации.

## 4. Структура и границы изменений

- `content/` содержит весь публичный контент.
- `layouts/` содержит локальные шаблоны и имеет приоритет над темой.
- `assets/css/main.css` — главный источник Tailwind и проектного CSS.
- `layouts/_partials/_seo/` содержит локальные SEO partials.
- `layouts/_partials/_schema/` содержит schema.org partials.
- `static/` копируется без обработки.
- `scripts/` содержит сборочные и контрольные сценарии.
- `docs/` содержит рабочие руководства и исторические аудиты.
- `docs/XTAL/` — Git-архив исходных изображений производителя, не публичная папка Hugo и не часть нумерованной документации.

Сначала расширять или переопределять шаблон в `layouts/`. Тему `themes/PaperMod` менять только тогда, когда локальный override не решает задачу. Не восстанавливать `layouts/_default/` без отдельной архитектурной причины.

Не редактировать `public/`, `resources/` и другие сгенерированные артефакты вручную.

## 5. Контент и локализация

- Украинский файл страницы: `index.md` или `_index.md`.
- Русский файл страницы: `index.ru.md` или `_index.ru.md`.
- Оба языка одной страницы хранятся в общем page bundle.
- Изменение смысла, характеристик, ссылок или изображений обычно требует синхронной правки обеих языковых версий.
- При содержательной правке сохранять `date` и обновлять `lastmod`.
- Не добавлять Markdown `# H1` в `content/`; H1 создает шаблон через `layouts/_partials/page-h1.html`.
- Поле `h1` использовать только при намеренном отличии видимого заголовка от `title`.
- `linkTitle` использовать для короткого навигационного имени.
- Во front matter использовать только `schema_types`, не `schema_type`.
- В видимом Markdown-контенте не использовать обратные кавычки для характеристик и коммерческих фраз; технические значения выделять обычным текстом или жирным начертанием.

Ориентиры объема на каждую языковую версию:

| Тип страницы | Обычно не менее |
|---|---:|
| Статья | `10000` знаков |
| Новость с органическим потенциалом | `5000` знаков |
| Товар | `6000` знаков |
| Серия | `6000` знаков |
| Хаб `/products/`, `/articles/`, `/news/` | `7000` знаков |
| `/about/` | `10000` знаков |

Это ориентиры полноты, а не разрешение раздувать текст. Каждый блок должен помогать пользователю выбрать, понять или проверить продукт.

## 6. Изображения

- Текущий опубликованный контент использует WebP: на 2026-07-10 в `content/` проверено `188` WebP и `0` PNG/JPEG.
- Все `12` главных товарных изображений `01-front.webp` имеют размер `2000x2000` и уникальны по SHA-256.
- Не возвращать утверждения о текущих одинаковых товарных PNG: они относятся к историческим аудитам.
- Обложка статьи или новости: `1536x1024` WebP.
- Изображение в теле статьи или новости: обычно `1200x800` WebP.
- Главное изображение товара: `2000x2000` WebP, точное соответствие модели, цвету и материалу.
- Для article/news и вторичных контентных изображений использовать shortcode `seo-image`, а не сырой `<img>`.
- Во front matter каждой страницы поддерживать `image` и полный блок `cover`.
- Для товара `image` является первым кадром галереи; не дублировать его стартовым `seo-image` в Markdown.
- Запрещены `TEST`, placeholder, watermark, mockup label и случайный AI-текст.
- `alt` и `cover.alt` должны описывать конкретную сущность или сцену на языке страницы.

Постоянные правила: `docs/content/34-image-design-playbook-2026.md` и `docs/content/37-page-content-design-dna-2026.md`.

## 7. SEO, schema.org и сущности

- Создавать schema.org только для фактов, видимых на той же странице.
- Entity-поля `about_entities`, `mentions_entities` и `product_group_id` добавлять только для существующих записей `data/entities.yaml`.
- Для `about_entities` и `mentions_entities` использовать только подтвержденные сущности.
- `product_group_id` применять только к реальной группе вариантов одной модели.
- Не добавлять ручные `rating.value` и `rating.count` в front matter.
- `Review` и `AggregateRating` допустимы только для реальных approved-отзывов, публично видимых на той же товарной странице.
- Canonical, hreflang, sitemap, видимый контент и JSON-LD важнее вспомогательных AI-файлов.
- `llms.txt` не является фактором ранжирования Google и не заменяет sitemap или robots.txt.

Перед изменением `hugo.yaml`, индексации, sitemap, robots, canonical или hreflang читать `docs/seo/36-hugo-yaml-serp-technical-contract-2026.md`.

## 8. Видимые шаблонные правила

- Статьи показывают дату и время чтения.
- Новости показывают только дату.
- Contact, FAQ, about, products, серии, товары, поиск и служебные страницы не получают блоговую meta-строку.
- Переключение языка находится в шапке; список переводов под H1 не выводится.
- Видимый короткий CTA товарной карточки должен иметь полное доступное имя модели через `sr-only`.
- Видимые breadcrumbs и schema.org `BreadcrumbList` используют общий helper `layouts/_partials/breadcrumb-label.html`.

## 9. Netlify routing и кэш

- `static/_redirects` содержит root rewrite и forced `404!` для scanner/sensitive URL.
- Не добавлять общий fallback `/* /404.html 404`: Netlify использует `public/404.html` автоматически.
- Не превращать неизвестные человекопохожие URL в SEO-redirect без подтвержденной замены.
- `immutable` допустим только для URL с отпечатком содержимого, например Hugo assets.
- Стабильные `/images/*`, favicon, SVG и webmanifest должны перепроверяться браузером; новый атомарный deploy не очищает браузерный кэш.
- Заголовки из `netlify.toml` применяются к статическим файлам Netlify. Function response обязан задавать необходимые headers самостоятельно.

Подробности: `docs/deploy/16-netlify-routing.md`.

## 10. Отзывы и Netlify Database

- `netlify/functions/reviews.mjs` принимает `POST`, валидирует данные и создает только `pending` отзывы; другие методы получают `405`.
- `scripts/export_reviews.mjs` выгружает approved-записи перед Hugo build.
- `scripts/generate_entity_performance_report.mjs` анализирует production HTML и обновляет отчет `32`.
- В Netlify обязательно задать секрет `REVIEW_EMAIL_HASH_SALT` для Functions; не хранить его в Git или `netlify.toml`.
- Биллинг Netlify Database зависит от текущего credit-based plan. Перед включением production-нагрузки проверять лимиты и стоимость в Dashboard, не считать базу безусловно бесплатной.
- Для database branch `dev` публикация нового approved-отзыва требует нового deploy, потому что видимый HTML создается во время сборки.

Основной регламент: `docs/deploy/17-netlify-database-reviews.md`.

## 11. WebMCP и AI-агенты

- Формы контакта, отзывов и фильтров используют declarative WebMCP annotations как progressive enhancement.
- WebMCP не заменяет HTML-доступность, серверную валидацию или schema.org.
- Для отправки контакта и отзыва сохранять явное подтверждение пользователя; `toolautosubmit` запрещен.
- Если появится imperative WebMCP API, учитывать indirect prompt injection, ограничивать длину описаний и результатов, ставить `readOnlyHint` только на действительно read-only инструменты и `untrustedContentHint` на результаты с внешним или пользовательским содержимым.
- `static/llms.txt` поддерживать как краткую Markdown-карту со ссылками, а не как второй sitemap или рекламный текст.

Текущая профильная проверка: `docs/audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md` с уточнением от 2026-07-10.

## 12. Сборка и рабочий процесс

```bash
npm install
npm run dev
npm run build
npm run build:production
./scripts/script_check.sh
```

- `npm run build` экспортирует отзывы и выполняет development-сборку.
- `npm run build:production` экспортирует отзывы и выполняет production-сборку для проверки.
- Обычные изменения делать в `dev`.
- Перед commit или push проверять `git status --short --branch`.
- `main` не изменять без явного решения о production-релизе.

## 13. Обязательные проверки

- После контентных правок собрать Hugo и проверить обе локализации.
- После изменений шаблонов или CSS проверить главную, листинг и детальную страницу в `uk` и `ru`.
- После изменений ссылок, URL или SEO-полей проверить canonical, hreflang, sitemap, breadcrumbs и локальные якоря.
- После изменений `static/_redirects` проверить root, обычную 404 и forced scanner 404 на Netlify Deploy Preview.
- После изменений форм проверить WebMCP-аннотации и обычную отправку без AI-агента.
- После изменений отзывов проверить `pending -> approved -> export -> visible HTML`.
- В development HTML должен оставаться `noindex,nofollow`; перед production отдельно подтвердить `index,follow` только на индексируемых URL.
- После изменений документации запустить `npm run docs:check`.
- Запустить `git diff --check` перед завершением работы.

## 14. Документация

Единый маршрут чтения находится в `docs/01-documentation-map.md`. Постоянные руководства имеют номера `01–41`; аудиты `42–98` являются историческими снимками. Последний полный аудит — `docs/audits/99-2026-07-10-full-documentation-project-sync-audit-current.md`.

При изменении документации соблюдать `docs/architecture/02-documentation-style-guide.md`: русский язык, пояснения для новичка, sentence case в заголовках, проверяемые утверждения и актуальная дата.
