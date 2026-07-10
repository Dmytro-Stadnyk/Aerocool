# Текущий аудит документации 2026-05-18

Дата аудита: 2026-05-18.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).
Актуализировано: 2026-05-21.

Примечание от 2026-05-21: это исторический audit-снимок состояния на 2026-05-18. Текущий порядок документации, актуальные счетчики файлов и последнюю оценку нужно смотреть в [01-documentation-map.md](../01-documentation-map.md), [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md), [64-2026-05-20-json-ld-entity-full-audit-current.md](64-2026-05-20-json-ld-entity-full-audit-current.md) и [30-keyword-database-2026.md](../seo/30-keyword-database-2026.md). Числа `01-48`, `48` docs, `55` layout-файлов и `76` content-файлов ниже оставлены как значение исторического среза, а не как текущая инструкция.

Этот audit-снимок фиксирует актуальное состояние документации проекта `Aerocool Ukraine` после добавления новых материалов `2026-05-18`, обновления порядка чтения `01-48`, контрольного JSON-LD/entity graph аудита и повторной проверки шаблонов документации.

## 1. Область проверки

Проверены:

- [README.md](../../README.md);
- [AGENTS.md](../../AGENTS.md);
- [docs/01-documentation-map.md](../01-documentation-map.md);
- все документы внутри `docs/`;
- все audit-снимки внутри `docs/audits/`;
- соответствие [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) текущим файлам `layouts/`;
- соответствие review/rating документации текущему `Netlify Database` и Google Review Snippet подходу;
- открытые project gates: `development/noindex`, `AggregateRating`, `ProductGroup`, production monitoring.

## 2. Проверенные официальные источники

Использованы первичные источники:

- Google FAQ structured data: `https://developers.google.com/search/docs/appearance/structured-data/faqpage`
- Google Product Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/product-snippet`
- Google Review Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/review-snippet`
- Hugo `css.TailwindCSS`: `https://gohugo.io/functions/css/tailwindcss/`
- Netlify Database CLI: `https://docs.netlify.com/build/data-and-storage/netlify-database/cli/`
- Netlify Database API: `https://docs.netlify.com/build/data-and-storage/netlify-database/api/`
- Netlify build environment variables: `https://docs.netlify.com/build/configure-builds/environment-variables/`
- Tailwind CSS v4.0: `https://tailwindcss.com/blog/tailwindcss-v4`

## 3. Машинные проверки

Проверено:

- `50` markdown-файлов в `README.md`, `AGENTS.md` и `docs/`;
- `48` markdown-файлов внутри `docs/`;
- `20` audit-файлов внутри `docs/audits/`;
- `55` layout-файлов внутри `layouts/`;
- `76` content markdown-файлов внутри `content/`.

Контроль:

- все рабочие документы имеют явную дату или явную дату аудита;
- [docs/01-documentation-map.md](../01-documentation-map.md) перечисляет все документы внутри `docs/` в порядке чтения `01-48`;
- [README.md](../../README.md) ведет к полной карте документации, а [AGENTS.md](../../AGENTS.md) перечисляет все `48` файлов из `docs/`;
- [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) упоминает все `55` текущих layout-файлов;
- служебные англоязычные заголовки вроде `Scope`, `Findings`, `Current Status`, `Implementation Backlog`, `Executive Summary`, `Prioritized Fix Plan` не найдены;
- локальные markdown-ссылки проверены;
- ссылочные заглушки с троеточием вместо URL не найдены;
- лишние активные `# H1` вне code block не найдены;
- `git diff --check` проходит;
- `npm run build` проходит.

## 4. Что обновлено в этом проходе

### P1. файлы документации получили порядок чтения `01-48`

Все файлы внутри `docs/` переименованы с глобальным двухзначным префиксом. Новичок теперь видит порядок чтения прямо в имени файла:

- `01` — карта документации;
- `02-04` — архитектура;
- `05-11` — контент;
- `12-14` — качество;
- `15-17` — деплой и инфраструктура;
- `18-28` — SEO/schema/entity слой;
- `29-48` — audit-снимки.

[docs/01-documentation-map.md](../01-documentation-map.md) стал главным источником порядка чтения и описывает назначение каждого файла.

### P1. новые Audit-снимки 2026-05-18 добавлены в главные карты

В [AGENTS.md](../../AGENTS.md) и [docs/01-documentation-map.md](../01-documentation-map.md) добавлены:

- [59-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](59-2026-05-18-schemaapp-customer-stories-case-studies-audit.md);
- [60-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md](60-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md);
- этот текущий documentation audit.

### P2. даты в новых Audit-файлах приведены к стандарту

В новых audit-файлах дата была оформлена в обратных кавычках. Для единого стандарта она приведена к виду:

```text
Дата аудита: 2026-05-18.
Дата анализа: 2026-05-18.
```

### P2. документация по Customer Stories синхронизирована

Активные SEO/entity документы уже ссылаются на новый customer stories audit:

- [25-ai-search-entity-map-2026.md](../seo/25-ai-search-entity-map-2026.md);
- [24-entities-knowledge-graph-playbook-2026.md](../seo/24-entities-knowledge-graph-playbook-2026.md);
- [20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md);
- [21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md).

### P2. шаблоны контента и финальный SEO-чеклист очищены

В повторной проверке исправлены мелкие дефекты структуры:

- в [08-article-template.md](../content/templates/08-article-template.md), [09-news-template.md](../content/templates/09-news-template.md), [10-product-template.md](../content/templates/10-product-template.md) и [11-series-template.md](../content/templates/11-series-template.md) добавлена явная дата обновления;
- ссылочные заглушки `(...)` в шаблонах статьи и новости заменены на понятные site-path примеры;
- в [28-ssg-seo-checklist-2026.md](../seo/28-ssg-seo-checklist-2026.md) второй активный `# H1` заменен на обычный раздел `## 19. Финальная Формула`.

## 5. Текущий вывод

На `2026-05-18` документация проекта синхронизирована:

- структура понятна новичку;
- основная документация написана на русском языке;
- новые audit-снимки включены в главные карты;
- внешние правила по Google structured data, Hugo Tailwind pipeline, Netlify Database и Tailwind CSS v4 сверены с официальными источниками;
- открытые риски явно зафиксированы.

Текущая оценка качества документации: `9.7/10`.

Открытые project gates не закрывались в этом проходе:

- `Netlify` все еще собирает сайт в `development/noindex`;
- `AggregateRating` остается риском до перехода на approved reviews snapshot из `Netlify Database`;
- `ProductGroup` остается staged до появления видимой variant navigation;
- production Search Console / rich results / entity baseline возможны только после production-перехода.
