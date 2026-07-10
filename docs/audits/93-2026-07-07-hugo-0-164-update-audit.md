# Аудит перехода на Hugo 0.164.0

Дата аудита: 2026-07-07.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот документ фиксирует текущий Hugo/tooling target проекта после обновления с Hugo `0.163.0` на Hugo `0.164.0`.

## 1. Итог

Проект обновлен до Hugo `0.164.0` и успешно собирается в development и production режимах через `mise`.

Актуальные версии проекта:

- `Hugo 0.164.0`
- `Node 24.16.0`
- `Tailwind CSS 4.3`
- `tailwindcss 4.3.0`
- `@tailwindcss/cli 4.3.0`
- `@netlify/database 1.0.0`

Важно: Netlify build остается в безопасном режиме `HUGO_ENVIRONMENT = "development"`. Production environment не включался как основной deploy-режим.

## 2. Источники правды

Текущая версия Hugo закреплена в:

- `mise.toml`: `hugo = "0.164.0"`;
- `netlify.toml`: `HUGO_VERSION = "0.164.0"`;
- `scripts/script_setup.sh`: fallback-инструкция для ручной установки Hugo `0.164.0`;
- `README.md`;
- `AGENTS.md`;
- `docs/deploy/15-local-tooling-mise.md`;
- `docs/architecture/03-hugo-template-helpers.md`;
- `docs/content/06-seo-image-shortcode.md`;
- `docs/quality/12-core-web-vitals-guide-2026.md`;
- `docs/seo/36-hugo-yaml-serp-technical-contract-2026.md`;
- `docs/01-documentation-map.md`.

Примечание: `layouts/baseof.html` больше не используется как guard версии Hugo. Причина — строковое сравнение `hugo.Version` в шаблоне может вести себя хрупко для semver-версий. Минимальная версия контролируется через `mise.toml`, `netlify.toml`, tooling-документацию и локальные build checks.

Аудит `68` теперь является историческим snapshot по Hugo `0.163.0`.

## 3. Проверки

Фактически выполнено:

```bash
git ls-remote --tags https://github.com/gohugoio/hugo.git refs/tags/v0.164.0
mise exec -- hugo version
mise exec -- node --version
mise exec -- npm --version
npm ls tailwindcss @tailwindcss/cli @netlify/database --depth=0
mise exec -- npm run build
mise exec -- ./scripts/script_check.sh
mise exec -- npm run build:production
```

Результаты:

- upstream tag: `refs/tags/v0.164.0`;
- Hugo: `v0.164.0-ce2470e7012b5ab5fc4e10ebe4027e9f8d9e00dc`;
- Node: `v24.16.0`;
- npm: `11.13.0`;
- `tailwindcss`: `4.3.0`;
- `@tailwindcss/cli`: `4.3.0`;
- `@netlify/database`: `1.0.0`;
- development build: success;
- production build: success;
- `./scripts/script_check.sh`: success.

Результаты сборки Hugo `0.164.0`:

- Pages: `62` UK, `60` RU;
- Paginator pages: `7` UK, `7` RU;
- Non-page files: `168` UK;
- Static files: `17` UK, `17` RU;
- Processed images: `1110` UK;
- Aliases: `8` UK, `7` RU.

## 4. Совместимость

Локальные шаблоны продолжают использовать актуальные language API:

- `.Language.Name`;
- `.Language.Label`;
- `.Language.Direction`.

Deprecated local language API вроде `.Language.Lang`, `.Site.Language.Lang`, `LanguageCode`, `LanguageName`, `LanguageDirection`, `.Site.Author` в активном локальном слое не должен возвращаться.

Tailwind остается npm-зависимостью проекта. Standalone Tailwind CLI не использовать.

## 5. Открытые состояния

1. `HUGO_ENVIRONMENT = "development"` остается намеренно.
2. Netlify production mode включать только отдельным production-readiness изменением.
3. Старые audit snapshots с Hugo `0.163.0` не переписывать как текущие проверки; они остаются историческими документами.

## 6. Вердикт

Переход на Hugo `0.164.0` технически выполнен. Project pins, локальная сборка, production-сборка, tooling-документация и базовый quality gate согласованы с новым target.
