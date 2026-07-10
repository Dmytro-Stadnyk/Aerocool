# Аудит совместимости с Hugo v0.162.0

Дата аудита: 2026-05-26.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).
Проект: Aerocool Ukraine
Проверяемая версия: Hugo `v0.162.0`
Локальная связка проверки: Hugo `v0.162.0`, Node `v24.16.0`

## Итоговый вердикт

Проект обновлен до Hugo `0.162.0` и технически совместим с этой версией.

Сборка в текущем окружении `development` проходит без ошибок, без `--printI18nWarnings`, без path warnings и без deprecated language API в локальном `layouts/`. Основной Netlify environment намеренно остается `development`; production-режим не включался.

## Источники и подтверждения версии

- Upstream tag: `refs/tags/v0.162.0`
- Release/tag URL: https://github.com/gohugoio/hugo/releases/tag/v0.162.0
- Локальная проверка: `hugo v0.162.0-076dfe13d0f789e3d9586b192f8f7f3329c26990 darwin/arm64`
- Node: `v24.16.0`

## Обновленные Project Pins

Файлы:

- `mise.toml`
- `netlify.toml`
- `layouts/baseof.html`
- `scripts/script_setup.sh`
- `README.md`
- `AGENTS.md`
- `docs/deploy/15-local-tooling-mise.md`
- `docs/architecture/29-tailwind-plus-ui-section-map-2026.md`
- `docs/content/06-seo-image-shortcode.md`

Текущие значения:

```toml
# mise.toml
[tools]
hugo = "0.162.0"
node = "24.16.0"
```

```toml
# netlify.toml
HUGO_VERSION = "0.162.0"
HUGO_ENVIRONMENT = "development"
NODE_VERSION = "24.16.0"
```

## Проверки

Команды:

```bash
git ls-remote --tags https://github.com/gohugoio/hugo.git refs/tags/v0.162.0
mise x hugo@0.162.0 node@24 -- hugo version
mise x hugo@0.162.0 node@24 -- hugo env
mise x node@24 -- node --version
mise x hugo@0.162.0 node@24 -- hugo --environment development --gc --minify --printI18nWarnings --printPathWarnings --templateMetrics
mise x hugo@0.162.0 node@24 -- npm run build
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' '\.Page\.Lang\b|\.Language\.Lang\b|\.Site\.Language\.Lang\b|site\.Language\.Lang\b|LanguageCode\b|LanguageName\b|LanguageDirection\b|languageCode\b|languageName\b|languageDirection\b|site\.Author\b|\.Site\.Author\b' layouts hugo.yaml netlify.toml package.json mise.toml i18n
git diff --check
```

Результаты:

- Hugo version: `v0.162.0`.
- Node version: `v24.16.0`.
- Development build: success.
- `npm run build`: success.
- Pages: `61` UK, `59` RU.
- Paginator pages: `9` UK, `9` RU.
- Non-page files: `49` UK.
- Static files: `18` UK, `18` RU.
- Processed images: `781` UK.
- Aliases: `8` UK, `7` RU.
- I18n warnings: none.
- Path warnings: none.
- Deprecated local language API: none after cleanup.
- `git diff --check`: clean.
- Generated RSS uses `<generator>Hugo -- 0.162.0</generator>`.
- Development HTML output keeps `noindex,nofollow` for `/`, `/ru/`, `/search/` and `404`.

## Исправления во время апгрейда

После первого build-аудита на Hugo `0.162.0` в локальных `layouts/` были найдены старые обращения к `.Language.Lang`.

Исправлено механически:

- `.Language.Lang` -> `.Language.Name`
- `.Site.Language.Lang` -> `.Site.Language.Name`
- `.Page.Language.Lang` -> `.Page.Language.Name`

Это затронуло локальные list/single templates, breadcrumbs, review partials и несколько shortcodes. После замены повторный поиск deprecated language API в локальном коде пустой.

## Открытые состояния

1. `HUGO_ENVIRONMENT = "development"` остается намеренно.
2. `params.env = development` остается намеренно.
3. Production build не становится основным build command.
4. Tailwind CSS, Node и npm-зависимости в этой задаче не обновлялись.
5. Исторический аудит `42-2026-04-29-hugo-0-161-compliance-audit.md` остается историческим документом и не должен считаться текущим Hugo target.

## Итог

Hugo `0.162.0` принят как текущая project pin-версия в локальном tooling и Netlify-конфигурации. Сайт собирается на `0.162.0`, локальные шаблоны очищены от deprecated language API, а development/noindex режим сохранен до отдельной production-readiness задачи.
