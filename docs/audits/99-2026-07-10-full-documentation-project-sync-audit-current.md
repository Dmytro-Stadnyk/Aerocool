# Полный аудит документации и синхронизации проекта 2026-07-10

Дата проверки: 2026-07-10.
Статус: исторический полный аудит.

> Архивная оговорка 2026-07-13: документ фиксирует состояние на 2026-07-10 и больше не является текущим. Актуальные выводы находятся в [полном аудите 100](100-2026-07-13-full-documentation-project-sync-audit-current.md).

Этот документ фиксирует результат полной переработки проектной документации после повторной проверки структуры, языка, ссылок, стека, изображений, schema.org, Netlify, WebMCP, `llms.txt`, сборок и готового HTML.

Предыдущий аудит `98` больше не является текущим. Его оценка `9.8/10` отозвана, потому что повторная проверка обнаружила в действующих руководствах устаревшие утверждения о товарных PNG, ложный порядок чтения и неточное объяснение browser cache Netlify.

## 1. Итоговая оценка

**Качество проектной документации: 9.7/10.**

| Направление | Оценка | Основание |
|---|---:|---|
| Понятность для новичка | `9.8/10` | README сокращен до практического входа, AGENTS отделен от учебного руководства, карта дает маршруты по задачам. |
| Структура и порядок чтения | `10/10` | Все Markdown-документы имеют уникальную непрерывную последовательность `01–99`; постоянные регламенты находятся перед аудитами. |
| Русский язык и литературная обработка | `9.7/10` | Заголовки и таблицы приведены к sentence case, самостоятельные английские инструкции и AI-промпты переведены; точные имена технологий, полей и команд сохранены. |
| Синхронизация с репозиторием | `9.8/10` | Версии, изображения, сущности, front matter, сборки и готовый HTML проверены повторно. |
| Практики Google, Chrome и Netlify | `9.6/10` | Правила обновлены по официальным источникам 2026 года; post-deploy подтверждение новых cache headers еще не выполнено. |
| Поддерживаемость | `9.9/10` | Добавлена автоматическая команда `npm run docs:check`; карта стала единственным полным реестром. |

Оценка не `10/10` по трем причинам:

1. Локальное исправление cache headers еще не опубликовано: живой `/images/logo.svg` продолжает отдавать старый `immutable` до следующего deploy.
2. Production и `dev` пока намеренно отдают `noindex,nofollow`; финальная индексируемость зависит от отдельного production gate.
3. Наличие секрета `REVIEW_EMAIL_HASH_SALT`, расход credits и текущий billing Netlify Database нельзя подтвердить из Git-репозитория; это проверяется в Dashboard.

## 2. Что исправлено

### 2.1. Порядок чтения

- Действующие руководства перенесены в последовательность `01–41`.
- Исторические аудиты перенесены в последовательность `42–98` по дате.
- Этот аудит получил номер `99`.
- CSV-приложения `30` и `32` наследуют номера своих Markdown-документов.
- `docs/XTAL/` явно отделен как архив исходников производителя, а не документация.
- Все точные ссылки на переименованные файлы обновлены в README, AGENTS, документах и генераторе отчета.

Полный список находится в [карте документации](../01-documentation-map.md).

### 2.2. Legacy и дублирование

- Удалена корневая `CHEETLIST-MAIN-DEV.md`: файл дублировал README и review-регламент, не имел корректных H1/даты и содержал неоднозначные команды.
- README больше не копирует полный архив аудитов.
- AGENTS больше не хранит вторую полную карту из десятков исторических файлов.
- Единственным полным маршрутом является документ `01`.

### 2.3. Изображения

Из действующих руководств удалены ложные утверждения, что каталог сейчас использует `12` одинаковых `01-front.png` и тестовые SKY-файлы.

Проверено по рабочему дереву:

- `188` WebP в `content/`;
- `0` PNG/JPEG в `content/`;
- `38` WebP в `content/products/`;
- `12` главных товарных `01-front.webp`;
- все главные товарные файлы имеют размер `2000x2000`;
- все `12` файлов имеют разные SHA-256;
- имен `test`, `candidate`, `placeholder`, `final-v` и `mockup` в `content/` не обнаружено;
- `100/100` Markdown-страниц имеют `image` и полный `cover`-блок;
- `25/25` article/news bundles имеют обложку и crop-варианты `16:9`, `4:3`, `1:1`.

Текущий стандарт закреплен в [справочнике front matter](../content/05-front-matter-reference.md), [руководстве `seo-image`](../content/06-seo-image-shortcode.md), [руководстве по изображениям](../content/34-image-design-playbook-2026.md) и [ДНК страниц](../content/37-page-content-design-dna-2026.md).

### 2.4. Netlify caching и Functions

Исправлена неверная логика «атомарный deploy делает долгий browser cache безопасным».

Новый локальный контракт `netlify.toml`:

- fingerprinted `/assets/*` сохраняют `public, max-age=31536000, immutable`;
- стабильные `/images/*`, favicon, PNG, SVG и webmanifest получают `public, max-age=0, must-revalidate`;
- HTML использует безопасное базовое поведение Netlify;
- ответы Functions задают собственные headers и не полагаются на статический `[[headers]]`.

Живая проверка 2026-07-10:

- `https://aerocool.ua/` отдает `Cache-Control: public,max-age=0,must-revalidate`;
- `https://aerocool.ua/images/logo.svg` пока отдает прежний `public,max-age=31536000,immutable`;
- `GET /api/reviews` корректно отдает `405`, `Allow: POST` и `Cache-Control: no-store`;
- Function response не получает полный набор статических CSP/COOP headers, что соответствует ограничению Netlify custom headers.

Переходный статус и обязательная проверка после deploy закреплены в [руководстве по Netlify routing](../deploy/16-netlify-routing.md).

### 2.5. Отзывы и Netlify Database

Документация теперь точно описывает текущую реализацию:

- `netlify/functions/reviews.mjs` принимает только `POST`;
- отзыв создается со статусом `pending`;
- `scripts/export_reviews.mjs` выгружает approved-отзывы во время сборки;
- `scripts/generate_entity_performance_report.mjs` обновляет документ и CSV `32`;
- Netlify CLI подтвержден в версии `26.2.0`;
- `@netlify/functions` не требуется текущему JavaScript-модулю, но понадобится для TypeScript-типов или helpers;
- `REVIEW_EMAIL_HASH_SALT` обязателен для Functions и не должен храниться в `netlify.toml`;
- Netlify Database работает только на credit-based plans, поэтому стоимость и лимиты проверяются в Dashboard.

Полный процесс находится в [руководстве по отзывам](../deploy/17-netlify-database-reviews.md).

### 2.6. Google `llms.txt`

По обновлению Google Search Central от 2026-06-15:

- `llms.txt` не нужен Google Search;
- файл не улучшает и не ухудшает видимость или ранжирование;
- его допустимо поддерживать для других сервисов, которые решили его читать.

Поэтому `static/llms.txt` остается дополнительной картой для совместимых AI-агентов, но не учитывается как SEO-преимущество и не заменяет sitemap, robots, canonical, hreflang, видимый контент или JSON-LD.

### 2.7. Chrome WebMCP

Добавлены рекомендации Chrome от 2026-07-01:

- учитывать indirect prompt injection;
- применять `untrustedContentHint` к внешнему и пользовательскому содержимому imperative tools;
- применять `readOnlyHint` только к инструментам без изменения состояния;
- ограничивать описание инструмента `500` символами, описание параметра `150`, имя `30`, отдельный результат `1.5K`;
- не использовать `toolautosubmit` для контакта и отзывов без отдельного security/UX-решения.

Текущие формы остаются declarative progressive enhancement и не заменяют доступный HTML, серверную валидацию или schema.org. Профильный [аудит 96](96-2026-07-08-webmcp-llms-agentic-readiness-audit.md) дополнен датированным уточнением.

### 2.8. Язык и стиль

- Все заголовки README, AGENTS и `docs/**/*.md` приведены к русскому sentence case.
- Заголовки таблиц обработаны тем же правилом.
- AI-промпты в документе `34` полностью переведены на русский язык.
- Слова `snapshot`, `backlog`, `source of truth`, `factual replacement`, `rendered graph`, `applied filters` и похожий канцелярский жаргон заменены русскими объяснениями в действующих руководствах.
- Английский сохранен только для точных имен технологий, файлов, команд, полей, статусов и официальных UI/SEO-терминов.
- Все `57` исторических аудитов получили архивную оговорку о дате и прежней нумерации.

## 3. Проверенный стек

| Компонент | Фактическое значение |
|---|---|
| Hugo | `0.164.0` |
| Node.js проекта | `24.16.0` |
| npm | `11.17.0` |
| Netlify CLI | `26.2.0` |
| Tailwind CSS | `4.3.0` |
| `@tailwindcss/cli` | `4.3.0` |
| `@netlify/database` | `1.0.0` |

`npm outdated` показывает доступные patch/minor-обновления: Tailwind `4.3.2` и `@netlify/database` `1.1.0`. Это не рассинхронизация документации: проект намеренно описывает зафиксированные версии. Обновлять зависимости нужно отдельным изменением с повторной сборкой и визуальной проверкой.

Hugo `0.164.0` продолжает использовать `css.TailwindCSS` через Tailwind CSS CLI из npm-зависимостей проекта. Standalone Tailwind CLI не нужен.

## 4. Структура документации

После создания этого аудита:

| Тип | Количество |
|---|---:|
| Постоянные Markdown-руководства `01–41` | `41` |
| Исторические аудиты `42–98` | `57` |
| Текущий аудит `99` | `1` |
| Все Markdown-файлы в `docs/` | `99` |
| CSV-приложения | `3` |
| Все Markdown/CSV-артефакты | `102` |

Каждый Markdown-файл имеет:

- ровно один H1;
- дату в начале;
- уникальный числовой префикс;
- запись в карте документации;
- рабочие локальные ссылки.

## 5. Автоматическая проверка документации

Добавлена команда:

```bash
npm run docs:check
```

Она проверяет:

- непрерывность номеров от `01` до максимального;
- отсутствие дубликатов номеров;
- один H1;
- дату в начале файла;
- архивную оговорку для аудитов `42–98`;
- наличие каждого Markdown/CSV-файла в карте;
- существование целей локальных Markdown-ссылок;
- отсутствие удаленной legacy-шпаргалки.

Эту команду нужно запускать после каждого изменения документации и до commit.

## 6. Результаты сборки

### Development

Команда:

```bash
./scripts/script_check.sh
```

Результат:

- `62` страницы `uk`;
- `60` страниц `ru`;
- `7 + 7` страниц пагинации;
- `188` non-page files;
- `1233` обработанных изображения;
- базовые проверки проекта пройдены.

### Production

Команда:

```bash
npm run build:production
```

Результат: сборка прошла без ошибок с теми же количественными показателями.

Локально Netlify Database не была подключена, поэтому `scripts/export_reviews.mjs` корректно создал пустой снимок отзывов. Это ожидаемое состояние обычной локальной сборки и не имитирует production-отзывы.

### Netlify config

Команда `netlify build --dry --offline` успешно разобрала `netlify.toml` через `@netlify/build 35.15.0` и показала ожидаемую последовательность build command, bundling Functions и сохранения config.

## 7. Проверка готового HTML

Production-вывод `public/` проверен отдельным анализатором:

| Проверка | Результат |
|---|---:|
| HTML-файлы | `132` |
| JSON-LD-блоки | `96`, все разбираются как JSON |
| Canonical | `129` |
| Hreflang | `232` |
| Внутренние ссылки | `8580`, битых целей нет |
| Локальные якоря | `1494`, битых нет |
| WebMCP-формы | `34` |
| URL в трех sitemap-файлах | `98` |

Production robots распределены ожидаемо:

- `96` страниц `index,follow`;
- `14` страниц пагинации `noindex,follow`;
- `22` служебные страницы `noindex,nofollow`.

При этом опубликованные production и `dev` 2026-07-10 продолжают отдавать `noindex,nofollow`, потому что Netlify пока собирает сайт с `HUGO_ENVIRONMENT = "development"`. Документация точно отражает этот gate.

## 8. Сущности и JSON-LD

Повторно измерено:

- `63` записи в `data/entities.yaml`;
- `61 confirmed`;
- `0 planned`;
- `2 do-not-markup`;
- `npm run entity:report` выполнен после production-сборки;
- отчет [32](../seo/32-entity-performance-report-2026.md) и CSV пересозданы;
- ошибок разбора JSON-LD нет.

## 9. Официальные источники

- [Google Search documentation updates](https://developers.google.com/search/updates)
- [Google guide for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Chrome WebMCP](https://developer.chrome.com/docs/ai/webmcp)
- [Chrome WebMCP tool security](https://developer.chrome.com/docs/ai/webmcp/secure-tools)
- [Chrome WebMCP Declarative API](https://developer.chrome.com/docs/ai/webmcp/declarative-api)
- [Netlify caching overview](https://docs.netlify.com/build/caching/caching-overview/)
- [Netlify custom headers](https://docs.netlify.com/manage/routing/headers/)
- [Netlify environment variables for Functions](https://docs.netlify.com/build/functions/environment-variables/)
- [Netlify Database](https://docs.netlify.com/build/data-and-storage/netlify-database/)
- [Hugo `css.TailwindCSS`](https://gohugo.io/functions/css/tailwindcss/)

## 10. Что осталось сделать вне документационного слоя

1. Выполнить Branch Deploy `dev` с новым `netlify.toml`.
2. Проверить, что стабильные изображения и иконки получают `max-age=0,must-revalidate`.
3. Проверить, что fingerprinted `/assets/*` сохраняют длительный `immutable`.
4. Подтвердить в Netlify Dashboard наличие `REVIEW_EMAIL_HASH_SALT` со scope Functions.
5. Проверить credits, лимиты и billing Netlify Database.
6. Повторить PageSpeed Insights для ключевых URL и WebMCP-форм.
7. После прохождения production gate отдельно переключить Netlify с development/noindex на production/indexable режим.

Эти пункты не являются дефектами документации. Они являются внешними действиями выпуска, которые документация теперь описывает явно и проверяемо.
