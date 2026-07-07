# Полный Аудит Документации По Hugo 0.162.0

> Исторический документ. Текущий project pin после обновления — `Hugo 0.164.0`; актуальный аудит синхронизации находится в [93-2026-07-07-hugo-0-164-update-audit.md](93-2026-07-07-hugo-0-164-update-audit.md).

Дата аудита: 2026-06-05.
Проект: Aerocool Ukraine  
Текущий Hugo target: `0.162.0`  
Текущий Node target: `24.16.0`

## Итог

Актуальная документация проекта зафиксирована на Hugo `0.162.0`.

Текущие operational-файлы, onboarding-документы, tooling docs, Netlify config, `mise` config и актуальный Hugo audit согласованы с фактическим стеком:

- Hugo `0.162.0`
- Node `24.16.0`
- Tailwind CSS `4.3.0`
- `@tailwindcss/cli` `4.3.0`
- `@netlify/database` `1.0.0`

Архивный аудит `29-2026-04-29-hugo-0-161-compliance-audit.md` оставлен как исторический документ и помечен как superseded. Его нельзя использовать как текущую инструкцию по версиям.

## Проверенные Файлы

Текущие version/pin источники:

- `mise.toml`
- `netlify.toml`
- `package.json`
- `package-lock.json`
- `layouts/baseof.html`
- `scripts/script_setup.sh`
- `README.md`
- `AGENTS.md`
- `docs/01-documentation-map.md`
- `docs/deploy/15-local-tooling-mise.md`
- `docs/architecture/03-hugo-template-helpers.md`
- `docs/architecture/51-tailwind-plus-ui-section-map-2026.md`
- `docs/content/06-seo-image-shortcode.md`
- `docs/audits/56-2026-05-26-hugo-0-162-compliance-audit.md`

Сводные audits, где старые текущие формулировки были обновлены:

- `docs/audits/30-2026-04-29-google-rich-results-quality-audit.md`
- `docs/audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md`
- `docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md`
- `docs/audits/39-2026-05-15-documentation-full-audit.md`

## Фактические Pins

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

```json
// package.json
"@tailwindcss/cli": "4.3.0",
"tailwindcss": "4.3.0",
"@netlify/database": "1.0.0"
```

## Проверки

Команды:

```bash
mise exec -- hugo version
mise exec -- node --version
mise exec -- npm --version
mise exec -- npm run build
rg -n --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' --glob '!themes/**' '0\.161\.0|0\.161\.1|0\.161-era|Hugo 0\.161|Hugo `0\.161|v0\.161|HUGO_VERSION = "0\.161|hugo = "0\.161|v24\.15\.0|node = "24"|NODE_VERSION = "24"' README.md AGENTS.md docs scripts layouts mise.toml netlify.toml package.json package-lock.json hugo.yaml
git diff --check
```

Результаты сборки:

- Hugo: `v0.162.0`
- Node: `v24.16.0`
- npm: `11.13.0`
- Build: success
- Pages: `62` UK, `60` RU
- Paginator pages: `9` UK, `9` RU
- Non-page files: `49` UK
- Static files: `17` UK, `17` RU
- Processed images: `793` UK
- Aliases: `8` UK, `7` RU
- Deprecated local language API in active `layouts/`: none after cleanup.

## Оставшиеся Упоминания 0.161

Допустимы только архивные/исторические упоминания:

- `docs/audits/29-2026-04-29-hugo-0-161-compliance-audit.md`
- описание этого архивного аудита в `docs/01-documentation-map.md`
- контрольная grep-команда и пояснение в этом audit-файле

Во всех актуальных документах текущая версия проекта должна быть `Hugo 0.162.0`.

## Исправления Во Время Этого Аудита

- `layouts/baseof.html`: `.Language.Lang` заменен на `.Language.Name`.

## Открытые Состояния

1. `HUGO_ENVIRONMENT = "development"` остается намеренно.
2. Production build не включается как основной Netlify build.
3. Следующие обновления Hugo делать только отдельной задачей с повторной сборкой и обновлением этого audit trail.

## Вердикт

Проектная документация на текущем уровне согласована: рабочий Hugo target — `0.162.0`, рабочий Node target — `24.16.0`. Старый Hugo `0.161.0` остается только в архивном audit trail и не является активной инструкцией.
