# Полный аудит документации 2026-05-15

Дата аудита: 2026-05-15.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

> Исторический full-audit snapshot. Он фиксирует состояние документации на 2026-05-15; текущий tooling target и свежие правила синхронизации смотреть в [75-2026-06-11-hugo-0-163-documentation-sync-audit.md](75-2026-06-11-hugo-0-163-documentation-sync-audit.md).

Этот документ фиксирует полный аудит документационного слоя проекта `Aerocool Ukraine`: `README.md`, `AGENTS.md`, `docs/`, связанные references/playbooks, audit-снимки, а также соответствие документации фактическим файлам проекта.

Задача аудита - не переписать исторические документы задним числом, а понять текущее состояние документации, найти рассинхроны, закрыть безопасные документационные правки и оставить понятный план следующих действий.

## 1. Область проверки

Проверены:

- корневые входные документы: `README.md`, `AGENTS.md`;
- оглавление и маршруты чтения: `docs/01-documentation-map.md`;
- active guides в `docs/content`, `docs/architecture`, `docs/deploy`, `docs/quality`, `docs/seo`;
- audit-снимки в `docs/audits`;
- шаблоны контента в `docs/content/templates`;
- фактическая структура проекта: `content/`, `layouts/`, `assets/`, `static/`, `data/`;
- конфиги: `hugo.yaml`, `netlify.toml`, `mise.toml`, `package.json`;
- entity data source: `data/entities.yaml`.

Исторические audit-файлы сохраняются как снимки своего времени. Если в них встречаются старые промежуточные оценки, они не считаются текущим source of truth, пока свежие docs и этот audit фиксируют более актуальное состояние.

## 2. Проверки

Выполнены локальные проверки:

- карта файлов через `rg --files`;
- `git status --short`: рабочее дерево было чистым до документационных правок;
- проверка абсолютных markdown-ссылок в `README.md`, `AGENTS.md` и `docs/**/*.md`;
- сверка всех файлов `docs/**/*.md` с `docs/01-documentation-map.md`;
- сверка документации с `hugo.yaml`, `netlify.toml`, `mise.toml`, root `package.json`, `static/_redirects`, `layouts/_partials`, `layouts/_shortcodes` и quality workflow;
- поиск устаревших паттернов: `schema_type`, `translation_list`, `layouts/_default`, `jsonld` в `seo-image`, старые fallback-формулировки по изображениям;
- проверка контентного слоя на markdown `# H1`, backtick inline-code, `schema_type` и `jsonld=` в `content/`;
- сверка entity URL в `docs/seo/23-entity-registry-2026.md` с фактическими `slug` и `data/entities.yaml`.

Результат link check до добавления этого файла:

```text
md_files: 38
broken_absolute_links: 0
docs_not_linked_from_docs_README: 2
```

Два неучтенных файла: сам `docs/01-documentation-map.md` и `docs/audits/49-2026-05-13-content-image-cover-alt-audit.md`. Второй пункт закрыт в этом проходе.

Контроль после правок:

```text
md_files: 39
broken_absolute_links: 0
docs_not_linked_from_docs_README: 0
npm run build: passed
```

Сборка Hugo `development` завершилась успешно: `50` pages UK, `48` pages RU, `7` paginator pages на язык, `554` processed images.

## 3. Общая оценка

Текущее состояние после правок:

```text
Документационный слой: 9.6 / 10
```

Сильные стороны:

- документация хорошо покрывает Hugo 0.162.0, Node 24.16.0, Tailwind CSS 4.3, Netlify, PageSpeed quality workflow, SEO, schema.org, entity registry, AI Search и Core Web Vitals;
- есть понятный путь новичка: `README.md` -> `docs/01-documentation-map.md` -> front matter -> template helpers -> PageSpeed quality workflow;
- active guides в основном совпадают с фактической структурой `layouts/`, `content/`, `static/_redirects` и quality workflow;
- правила `schema_types`, `image + cover`, `seo-image`, no markdown H1 и no inline-code backticks в `content/` согласованы между root docs, content docs и AGENTS;
- production/noindex gate описан честно и не маскируется как завершенный SEO-аудит;
- product facts ownership и rating/review risk зафиксированы в нескольких профильных документах;
- entity strategy имеет и narrative-документ, и структурированный source of truth в `data/entities.yaml`.

Оставшиеся `0.4` - это не одна большая проблема, а несколько управляемых рисков: production gate, источник рейтингов, ProductGroup/variant navigation и будущий post-production monitoring.

## 4. Замечания, закрытые в этом проходе

### P1. реестр сущностей содержал неканонические URL

В `docs/seo/23-entity-registry-2026.md` часть строк в section 16/17 использовала folder names page bundle вместо публичных slugs:

- `/articles/sky-light-vs-sky-360-guide/`;
- `/articles/wing-vs-xtal-comparison/`;
- `/news/2026-04-15-aerocool-sky-series-launch/` и аналогичные dated folder paths.

Фактические публичные URL задаются через `slug` в front matter и совпадают с `data/entities.yaml`:

- `/articles/sky-light-vs-sky-360/`;
- `/articles/wing-vs-xtal/`;
- `/news/sky-series-launch/`;
- `/news/wing-series-launch/`;
- `/news/xtal-series-launch/`;
- `/news/sky-360-launch/`;
- `/news/sky-light-launch/`;
- `/news/loft-air-and-mesh-focus/`;
- `/news/sync4-sync5-mechanism-update/`.

Статус: исправлено.

### P1. `docs/01-documentation-map.md` не ссылался на один существующий аудит

Файл `docs/audits/49-2026-05-13-content-image-cover-alt-audit.md` существовал и был полезен как контрольный снимок по `image`, `cover`, `cover.alt`, markdown H1, inline-code и content image consistency, но отсутствовал в разделе `Audits`.

Статус: исправлено.

### P2. Root `README.md` не перечислял два audit-снимка

В root documentation map отсутствовали:

- `docs/audits/44-2026-05-06-content-depth-literary-audit.md`;
- `docs/audits/49-2026-05-13-content-image-cover-alt-audit.md`.

Это не ломало маршрут новичка, но снижало полноту главной карты документации.

Статус: исправлено.

### P2. в content checklist были устаревшие подписи ссылок

В `docs/content/07-content-seo-checklist-2026.md` ссылки вели на правильные файлы, но видимый текст называл их `front-matter.md` и `helpers.md`, хотя актуальные имена:

- `05-front-matter-reference.md`;
- `03-hugo-template-helpers.md`.

Статус: исправлено.

## 5. Замечания без правок

### P0. граница Production-перехода остается открытой намеренно

`netlify.toml` все еще использует:

```toml
HUGO_ENVIRONMENT = "development"
```

Это означает `noindex,nofollow` для HTML-страниц. Документация корректно объясняет, что финальный SEO-indexability, Search Console, rich results eligibility и AI Search baseline нельзя считать завершенными до production-перехода.

Статус: не документационный баг; это сознательный pre-production режим.

### P0. источник рейтингов все еще требует бизнес-решения

Product pages имеют `rating.value` и `rating.count`, а видимый текст показывает рейтинг и количество оценок. Документация правильно помечает это как риск, пока источник рейтингов/отзывов не подтвержден отдельным видимым или операционным слоем.

Следующее решение:

- подтвердить реальный источник рейтингов и описать его;
- либо удалить `rating` из product front matter, чтобы не выводить `aggregateRating`.

Статус: открыто, но задокументировано.

### P1. `ProductGroup` подготовлен, но не подтвержден

`product_group_id` подготовлен во front matter и registry, а `product.html` выводит `isVariantOf` только после confirmed entity resolver. Это правильная безопасная стратегия.

Следующий шаг:

- добавить видимую навигацию вариантов;
- подтвердить ProductGroup entities;
- затем включать связи вариантов в JSON-LD.

Статус: открыто как roadmap-задача, не как рассинхрон.

### P2. исторические аудиты не нужно переписывать задним числом

В старых audit-документах могут быть значения, которые были актуальны на дату проверки: количество страниц, старые P2-заметки, промежуточные оценки. Их не нужно массово редактировать, если свежие active docs и новые audit-снимки задают текущий статус.

Статус: оставить как исторические артефакты.

## 6. Что не найдено

Не найдено:

- битых абсолютных ссылок в markdown-документации;
- использования `schema_type` как активного поля;
- старого локального partial имени `translation_list.html` в локальном `layouts/`;
- локального `layouts/_default`;
- markdown `# H1` в `content/`;
- backtick inline-code в `content/`;
- `jsonld=` в content shortcodes;
- устаревшего общего social fallback на `images/logo.svg` в active image docs;
- конфликта между root `package.json`, `mise.toml`, `netlify.toml` и tooling docs по Hugo 0.162.0 / Node 24.16.0 / Tailwind CSS 4.3.

## 7. Рекомендации

### P0

1. Перед production-переходом выполнить `npm run build:production`, проверить robots meta, sitemap index, `/uk/sitemap.xml`, `/ru/sitemap.xml`, `search`, `404` и alias pages.
2. Принять решение по рейтингу: подтвержденный source или удаление `aggregateRating`.

### P1

1. Добавить легкую автоматическую проверку документации: broken local links, docs not linked from `docs/01-documentation-map.md`, stale route aliases in entity docs.
2. После добавления variant navigation обновить `23-entity-registry-2026.md`, `21-ecommerce-structured-data-playbook-2026.md` и `26-json-ld-graph-audit-roadmap-2026.md`.
3. При любом изменении `data/entities.yaml` сверять narrative registry и structured registry в одном изменении.

### P2

1. После production и индексации создать отдельный Search Console / AI Search baseline audit.
2. Если появятся реальные авторы, отзывы, видео или HowTo-контент, обновлять docs только после появления видимого контента и source of truth.
3. Рассмотреть отдельный docs QA script в будущем, но не превращать documentation workflow в тяжелый CI без необходимости.

## 8. Итог

Документация проекта находится в хорошем рабочем состоянии: она не просто описывает файлы, а задает правила безопасной работы с SEO, schema.org, content, images, Netlify, PageSpeed quality workflow и entity graph.

Главная зона внимания теперь не расширение документации ради объема, а дисциплина синхронизации:

- фактический код и `docs/` должны меняться вместе;
- `data/entities.yaml` и `23-entity-registry-2026.md` должны оставаться согласованными;
- production gate и rating source нужно закрывать как отдельные решения;
- historical audits не переписывать, а перекрывать свежими audit-снимками.
