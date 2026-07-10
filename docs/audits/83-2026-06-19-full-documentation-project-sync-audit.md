# Полный аудит и синхронизация документации проекта

Дата аудита: 2026-06-19.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Статус: исторический снимок. Следующей точкой отсчета на тот момент стал [аудит 85](85-2026-06-21-full-documentation-project-sync-audit.md); текущее состояние смотрите в карте документации.

Этот документ фиксирует тотальную проверку проектной документации после изменений до 2026-06-19. Он нужен, чтобы новичок мог отличить действующие правила от исторических снимков и понимать, насколько документация соответствует текущему коду, стеку и официальным практикам 2026 года.

## 1. Что проверено

Проверены:

- `README.md`, `AGENTS.md` и все `77` существовавших файлов в `docs/`;
- последовательность номеров `01-77` до создания этого аудита;
- структура заголовков, даты, язык, локальные ссылки и навигационная карта;
- `100` файлов `content/**/*.md` и реально используемые front matter поля;
- `95` файлов локального слоя `layouts/`;
- `package.json`, `package-lock.json`, `mise.toml`, `netlify.toml` и `hugo.yaml`;
- `netlify/functions/reviews.mjs`, `scripts/export_reviews.mjs` и `scripts/generate_entity_performance_report.mjs`;
- keyword-база из `277` строк и generated entity report из `63` сущностей;
- development- и production-сборки Hugo;
- сгенерированные sitemap, robots meta и JSON-LD.

После добавления этого файла в `docs/` находится `78` пронумерованных Markdown-документов без пропусков и повторов.

## 2. Подтвержденный стек

| Компонент | Зафиксированная версия | Источник правды |
|---|---:|---|
| Hugo | `0.163.0` | `mise.toml`, `netlify.toml`, `layouts/baseof.html` |
| Node.js | `24.16.0` | `mise.toml`, `netlify.toml` |
| Tailwind CSS | `4.3.0` | `package.json`, `package-lock.json` |
| Tailwind CSS CLI | `4.3.0` | `package.json`, `package-lock.json` |
| Netlify Database SDK | `1.0.0` | `package.json`, `package-lock.json` |

Команда `npm outdated` на дату аудита показывает доступный patch-релиз `4.3.1` для `tailwindcss` и `@tailwindcss/cli`. Это не расхождение документации: проект намеренно фиксирует точные версии `4.3.0`. Обновление зависимостей должно выполняться отдельной задачей со сборкой и визуальной проверкой.

## 3. Официальная база 2026

Проверка выполнена по первичным источникам:

- [Hugo: css.TailwindCSS](https://gohugo.io/functions/css/tailwindcss/);
- [Google Search Essentials](https://developers.google.com/search/docs/essentials);
- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals);
- [Google: общие правила structured data](https://developers.google.com/search/docs/appearance/structured-data/sd-policies);
- [Google: оптимизация для generative AI в поиске](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide);
- [Netlify Database](https://docs.netlify.com/build/data-and-storage/netlify-database/).

Текущая архитектура соответствует этим требованиям:

- Hugo вызывает Tailwind CSS CLI через `css.TailwindCSS`;
- `tailwindcss` и `@tailwindcss/cli` установлены через npm;
- standalone Tailwind binary не используется;
- `hugo_stats.json` подключен к Tailwind через `@source` и module mount;
- Core Web Vitals ориентиры остаются `LCP <= 2.5 s`, `INP < 200 ms`, `CLS < 0.1`;
- structured data описывает видимый контент и не использует вымышленные отзывы;
- AI Search не выделен в отдельную магическую оптимизацию: применяются обычные SEO, people-first content, индексируемость и проверяемые факты;
- review-система использует Netlify Database как Postgres-источник и отделяет ветки данных от production.

## 4. Найденные дефекты и исправления

### P1. непереносимые локальные ссылки

Найдено `832` Markdown-ссылки в `64` файлах, привязанных к абсолютному пути рабочей машины.

Исправлено:

- все ссылки заменены на относительные пути репозитория;
- персональные пути к PDF и локальной копии проекта удалены из исторических документов;
- правило переносимых ссылок добавлено в [руководство по стилю](../architecture/02-documentation-style-guide.md);
- генератор entity report исправлен, чтобы не возвращать абсолютные пути при следующем запуске.

### P1. неполный справочник шаблонов

[Руководство по Hugo helpers](../architecture/03-hugo-template-helpers.md) не описывало `10` текущих файлов:

- `layouts/products/single.html`;
- `layouts/news/list.html`;
- `layouts/_partials/pagination.html`;
- шесть partial-файлов `layouts/_partials/reviews/`;
- `layouts/_partials/_schema/product-group.html`.

Все точки входа добавлены с пояснением роли, источника данных и момента, когда новичку нужно открывать файл.

### P1. неполный справочник Front Matter

В контенте использовались, но отдельно не объяснялись поля `url`, `searchHidden` и `disableShare` служебной страницы contact-success.

В [справочник front matter](../content/05-front-matter-reference.md) добавлены назначение полей, ограничения и локализованные URL.

### P2. англоязычные служебные заголовки

Переведено `85` заголовков со словами `Findings`, `Snapshot`, `Production Gate`, `Source Of Truth`, `Governance`, `Articles`, `News`, `Images` и похожими формулировками.

На английском оставлены только:

- название проекта `Aerocool Ukraine`;
- имя файла `AGENTS.md`;
- официальные названия технологий, типов, полей и метрик;
- названия компаний в историческом анализе customer stories.

### P2. непоследовательные даты аудитов

У `18` исторических файлов были разные подписи: `Дата`, `Дата анализа`, `Дата оценки`, `Актуально на` или строка без завершающей точки.

Все audit-файлы теперь используют единый обязательный формат `Дата аудита: YYYY-MM-DD.`. Если документ обновлялся позже даты исходного снимка, отдельная строка `Обновлено` сохранена.

## 5. Результаты автоматических проверок

| Проверка | Результат |
|---|---:|
| Документы в `docs/` после аудита | `78` |
| Диапазон номеров | `01-78` |
| Пропуски и повторяющиеся номера | `0` |
| Битые локальные Markdown-ссылки | `0` |
| Абсолютные пути рабочей машины | `0` |
| Файлы без единственного H1 | `0` |
| Неописанные текущие layout-файлы | `0` |
| Неописанные используемые front matter поля | `0` |
| Строки keyword CSV | `277`, без дубликатов и поврежденных строк |
| Строки entity report CSV | `63`, без дубликатов и поврежденных строк |
| Ошибки парсинга JSON-LD | `0` |
| JSON-LD на `noindex` страницах production-сборки | `0` |

Штатный `./scripts/script_check.sh` прошел полностью. Development-сборка создала `62` украинские и `60` русских страниц, `1110` обработанных изображений и завершила basic project checks без ошибок.

`npm run build:production` также прошел. В production-выводе разобрано `132` HTML-файла и `96` JSON-LD scripts без ошибок JSON.

## 6. Что остается внешним контролем

Это не дефекты документации, но они не могут быть закрыты локальной сборкой:

1. Netlify пока намеренно собирает branch deploy в `development`, поэтому финальная индексируемость основного домена остается отдельным production gate.
2. PageSpeed Insights, Search Console, Rich Results Test и `validator.schema.org` требуют проверки опубликованных URL.
3. Локально нет подключения к Netlify Database, поэтому `scripts/export_reviews.mjs` корректно создает пустой generated snapshot.
4. Реальные GSC, AI citation и business-метрики остаются `pending-production` в entity performance report.
5. Доступные patch-обновления Hugo или Tailwind нужно внедрять отдельной задачей, а не менять только в документации.

## 7. Итоговая оценка

| Направление | Оценка |
|---|---:|
| Понятность для новичка | **9.8 / 10** |
| Русский язык и терминология | **9.8 / 10** |
| Структура и маршрут чтения | **10 / 10** |
| Синхронизация с кодом и стеком | **9.8 / 10** |
| Переносимость и ссылки | **10 / 10** |
| Проверяемость | **9.8 / 10** |

Итоговая оценка документации проекта: **9.8 / 10**.

До `10/10` не хватает не новых объемных документов, а внешнего production-подтверждения: опубликованной индексируемой сборки, PageSpeed/Search Console evidence и реальных данных review/entity performance. Текущая документация уже пригодна как основной русскоязычный источник для новичка и как рабочий контракт проекта.
