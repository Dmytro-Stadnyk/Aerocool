# Аудит синхронизации документации с Hugo 0.163.0

> Исторический документ. Текущий Hugo/tooling target после обновления 2026-07-07 — Hugo `0.164.0`; актуальный аудит перехода находится в [93-2026-07-07-hugo-0-164-update-audit.md](93-2026-07-07-hugo-0-164-update-audit.md).

Дата аудита: 2026-06-11.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).
Повторная проверка: 2026-06-12.

Этот документ фиксирует историческую синхронизацию документации проекта после перехода project pin на `Hugo 0.163.0`.

## 1. Текущий Target проекта

Актуальные версии проекта:

- `Hugo 0.163.0`
- `Node 24.16.0`
- `Tailwind CSS 4.3`
- `tailwindcss 4.3.0`
- `@tailwindcss/cli 4.3.0`
- `@netlify/database 1.0.0`

Важно: системная команда `node --version` может показать не проектную версию. Для проверки project pin использовать `mise exec -- node --version`.

## 2. Источники правды

Версии инструментов должны совпадать в этих файлах:

- `mise.toml`
- `netlify.toml`
- `README.md`
- `AGENTS.md`
- `docs/deploy/15-local-tooling-mise.md`
- `layouts/baseof.html`
- `scripts/script_setup.sh`

На момент аудита:

- `mise.toml` фиксирует `hugo = "0.163.0"` и `node = "24.16.0"`;
- `netlify.toml` фиксирует `HUGO_VERSION = "0.163.0"` и `NODE_VERSION = "24.16.0"`;
- `package.json` фиксирует Tailwind CLI как npm-зависимость проекта.
- `layouts/baseof.html` требует минимум `hugo.Version "0.163.0"`;
- `scripts/script_setup.sh` в fallback-сообщении указывает `Hugo 0.163.0` и `Node 24.16.0`.

## 3. Что обновлено в документации

Активные onboarding/tooling-документы переведены с `Hugo 0.162.0` на `Hugo 0.163.0`.

Обновлены:

- `README.md`;
- `AGENTS.md`;
- `docs/01-documentation-map.md`;
- `docs/deploy/15-local-tooling-mise.md`;
- `docs/architecture/03-hugo-template-helpers.md`;
- `docs/architecture/29-tailwind-plus-ui-section-map-2026.md`;
- `docs/content/06-seo-image-shortcode.md`;
- `layouts/baseof.html`;
- `scripts/script_setup.sh`;
- архивная пометка в `docs/audits/42-2026-04-29-hugo-0-161-compliance-audit.md`.

Аудиты `30`, `34`, `37`, `39`, `56`, `57` и `66` остаются историческими снимками своего времени. Если внутри них встречается Hugo `0.162.0` или старые JSON-LD счетчики, это не текущая инструкция по версиям.

Schema/entity-аудит `57` остается историческим полным snapshot на 2026-05-31. Текущие машинные счетчики schema/entity после сборки смотреть в `docs/seo/32-entity-performance-report-2026.md`, а текущий список URL для ручной проверки — в `docs/seo/33-schema-validator-url-checklist-2026.md`.

## 4. Tailwind и Hugo 0.163.0

Текущий принцип не изменился: Tailwind CSS собирается через Hugo `css.TailwindCSS`, но Tailwind CLI должен оставаться npm-зависимостью проекта.

В проекте сохраняются:

- `tailwindcss`;
- `@tailwindcss/cli`;
- `package-lock.json`.

Standalone Tailwind CLI не использовать.

## 5. Проверки для подтверждения

Контрольные команды:

```bash
git ls-remote --tags https://github.com/gohugoio/hugo.git refs/tags/v0.163.0
mise exec -- hugo version
mise exec -- node --version
npm ls tailwindcss @tailwindcss/cli @netlify/database --depth=0
mise exec -- npm run build
./scripts/script_check.sh
npm run entity:report
npm run build:production
```

Дополнительно проверить rendered JSON-LD в `public/**/*.html`: все `application/ld+json` scripts должны парситься без ошибок.

Фактически выполнено 2026-06-12:

- upstream tag: `refs/tags/v0.163.0`;
- Hugo: `v0.163.0-4a9485336a3ff2cea07ab88e2a17ec34d5baaa6e`;
- Node: `v24.16.0`;
- npm: `11.13.0`;
- `tailwindcss`: `4.3.0`;
- `@tailwindcss/cli`: `4.3.0`;
- `@netlify/database`: `1.0.0`;
- `mise exec -- npm run build`: success;
- `./scripts/script_check.sh`: success.

Результаты development-сборки:

- Pages: `62` UK, `60` RU;
- Paginator pages: `9` UK, `9` RU;
- Non-page files: `124` UK;
- Static files: `17` UK, `17` RU;
- Processed images: `834` UK;
- Aliases: `8` UK, `7` RU.

## 6. Вывод

Documentation target на дату аудита: `Hugo 0.163.0` и `Node 24.16.0`.

Если в активных onboarding/tooling-документах встречается `Hugo 0.162.0`, это ошибка. В старых audit snapshot такие значения допустимы только рядом с явной исторической пометкой.
