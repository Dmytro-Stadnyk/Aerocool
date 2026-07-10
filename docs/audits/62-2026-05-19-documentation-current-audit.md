# Текущий аудит документации 2026-05-19

Дата аудита: 2026-05-19.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).
Актуализировано: 2026-05-21.

Примечание от 2026-05-21: это исторический audit-снимок состояния на 2026-05-19. Текущий порядок документации, актуальные счетчики файлов и последнюю оценку нужно смотреть в [01-documentation-map.md](../01-documentation-map.md), [64-2026-05-20-json-ld-entity-full-audit-current.md](64-2026-05-20-json-ld-entity-full-audit-current.md) и [30-keyword-database-2026.md](../seo/30-keyword-database-2026.md). Числа `01-51`, `51` docs и `76` content-файлов ниже оставлены как значение исторического среза, а не как текущая инструкция.

Этот аудит-снимок фиксирует состояние документации проекта `Aerocool Ukraine` после синхронизации правил `linkTitle`, видимых хлебных крошек, `BreadcrumbList`, политики видимой meta-строки страниц, карты Tailwind Plus UI-секций и обновленной карты чтения `01-51`.

## 1. Область проверки

Проверены:

- [README.md](../../README.md);
- [AGENTS.md](../../AGENTS.md);
- [docs/01-documentation-map.md](../01-documentation-map.md);
- все документы внутри `docs/`;
- все audit-снимки внутри `docs/audits/`;
- соответствие [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) текущим файлам `layouts/`;
- соответствие [05-front-matter-reference.md](../content/05-front-matter-reference.md) текущему front matter полю `linkTitle`;
- синхронизация видимых breadcrumbs и schema.org `BreadcrumbList`;
- открытые project gates: `development/noindex`, `AggregateRating`, `ProductGroup`, production monitoring.

## 2. Проверенные официальные источники

Использованы первичные источники:

- Google Product structured data: `https://developers.google.com/search/docs/appearance/structured-data/product-snippet`
- Google Review Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/review-snippet`
- Google FAQ structured data: `https://developers.google.com/search/docs/appearance/structured-data/faqpage`
- Hugo `css.TailwindCSS`: `https://gohugo.io/functions/css/tailwindcss/`
- Netlify Database: `https://docs.netlify.com/build/data-and-storage/netlify-database/`
- Netlify Database CLI: `https://docs.netlify.com/build/data-and-storage/netlify-database/cli/`
- Netlify Database API: `https://docs.netlify.com/build/data-and-storage/netlify-database/api/`
- Tailwind CSS v4.0: `https://tailwindcss.com/blog/tailwindcss-v4`

## 3. Машинные проверки

Проверено:

- `53` markdown-файла в `README.md`, `AGENTS.md` и `docs/`;
- `51` markdown-файл внутри `docs/`;
- `22` audit-файла внутри `docs/audits/`;
- `60` layout-файлов внутри `layouts/`;
- `76` content markdown-файлов внутри `content/`.

Контроль:

- все файлы внутри `docs/` имеют глобальный числовой префикс `01-51`;
- [docs/01-documentation-map.md](../01-documentation-map.md) перечисляет все документы внутри `docs/` в порядке чтения `01-51`;
- [README.md](../../README.md) ведет к полной карте документации, а [AGENTS.md](../../AGENTS.md) перечисляет все `51` файлов из `docs/`;
- [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) упоминает все `60` текущих layout-файлов;
- локальные markdown-ссылки проверены;
- активные англоязычные служебные заголовки не найдены;
- ссылочные заглушки с троеточием вместо URL не найдены;
- лишние активные `# H1` вне code block не найдены;
- `git diff --check` проходит;
- `npm run build` проходит.

## 4. Что синхронизировано в этом проходе

### P1. карта чтения обновлена до `01-51`

В документацию добавлены документы текущего прохода:

- [62-2026-05-19-documentation-current-audit.md](62-2026-05-19-documentation-current-audit.md).
- [63-2026-05-19-visible-page-meta-policy-audit.md](63-2026-05-19-visible-page-meta-policy-audit.md).
- [29-tailwind-plus-ui-section-map-2026.md](../architecture/29-tailwind-plus-ui-section-map-2026.md).

Диапазон audit-документов изменен с `29-48` на `29-50`, а прикладные UI/UX-карты начинаются с `51+`. Главная карта документации, `README.md` и `AGENTS.md` должны вести новичка к актуальному порядку чтения.

### P1. Breadcrumbs и `linkTitle` сведены в единое правило

Текущий шаблонный слой использует:

- [breadcrumb-label.html](../../layouts/_partials/breadcrumb-label.html) — единый helper для короткого имени страницы;
- [breadcrumbs.html](../../layouts/_partials/breadcrumbs.html) — видимые хлебные крошки;
- [_schema/breadcrumbs.html](../../layouts/_partials/_schema/breadcrumbs.html) — schema.org `BreadcrumbList`.

Правило для новичка: если `title` длинный и плохо выглядит в навигации, нужно добавить короткий `linkTitle`. Видимые breadcrumbs и `BreadcrumbList` используют один и тот же helper, поэтому HTML и JSON-LD не расходятся по названиям.

### P2. шаблоны контента обновлены под `linkTitle`

В шаблоны добавлено необязательное поле `linkTitle`, чтобы новые страницы не расходились с [05-front-matter-reference.md](../content/05-front-matter-reference.md):

- [08-article-template.md](../content/templates/08-article-template.md);
- [09-news-template.md](../content/templates/09-news-template.md);
- [10-product-template.md](../content/templates/10-product-template.md);
- [11-series-template.md](../content/templates/11-series-template.md).

## 5. Текущий вывод

На `2026-05-19` документация проекта синхронизирована:

- структура понятна новичку;
- основная документация написана на русском языке;
- порядок чтения обновлен до `01-51`;
- новые правила `linkTitle` и breadcrumbs описаны в справочнике front matter, helper-документации и шаблонах контента;
- внешние правила по Google structured data, Hugo Tailwind pipeline, Netlify Database и Tailwind CSS v4 сверены с официальными источниками;
- открытые риски явно зафиксированы.

Текущая оценка качества документации: `9.7/10`.

Открытые project gates не закрывались в этом проходе:

- `Netlify` все еще собирает сайт в `development/noindex`;
- `AggregateRating` остается риском до перехода на approved reviews snapshot из `Netlify Database`;
- `ProductGroup` остается staged до появления видимой variant navigation;
- production Search Console / rich results / entity baseline возможны только после production-перехода.
