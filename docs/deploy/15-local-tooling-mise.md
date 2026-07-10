# Локальные инструменты через `mise`

Обновлено: 2026-07-10.

`mise` — это менеджер версий инструментов. В этом проекте он нужен, чтобы локально запускать те же версии `Hugo` и `Node`, которые используются в `Netlify`.

Текущая синхронизация tooling-документации с Hugo 0.164.0, Node 24.16.0 и Tailwind CSS 4.3 зафиксирована в [93-2026-07-07-hugo-0-164-update-audit.md](../audits/93-2026-07-07-hugo-0-164-update-audit.md).

Проще говоря:

```text
mise.toml говорит компьютеру:
"для этого проекта используй Hugo 0.164.0 и Node 24.16.0".
```

## 1. Актуальные версии проекта

В проекте используются:

- `Hugo 0.164.0`
- `Node 24.16.0`
- `Tailwind CSS 4.3`

`Hugo` и `Node` зафиксированы в двух местах:

- `mise.toml` — для локальной разработки;
- `netlify.toml` — для сборки на Netlify.

`Tailwind CSS 4.3` зафиксирован как npm-зависимость в `package.json` и точной версией `4.3.0` в `package-lock.json`. Начиная с Hugo `0.161.0`, Tailwind CSS CLI должен устанавливаться через npm; в текущем Hugo `0.164.0` это правило остается актуальным.

Важно: актуальный файл называется `mise.toml`, без точки в начале. Если где-то встретилось старое имя `.mise.toml`, его нужно считать устаревшим.

Текущий `mise.toml`:

```toml
[tools]
hugo = "0.164.0"
node = "24.16.0"
```

## 2. Зачем это нужно новичку

Без фиксированных версий может быть так:

- локально сайт собирается одной версией Hugo;
- Netlify собирает другой версией Hugo;
- Tailwind работает у тебя, но не работает в deploy;
- ошибка появляется только после публикации.

`mise` снижает этот риск: локальная среда и Netlify становятся максимально похожими.

## 3. Базовая диагностика

Проверить, что `mise` установлен и видит проект:

```bash
mise version
mise doctor
mise current hugo
mise current node
mise which hugo
mise ls --installed
```

Если команды показывают `Hugo 0.164.0` и `Node 24.16.0`, всё хорошо.

Примечание на 2026-07-07: проект обновлен до pinned-версии `0.164.0` в `mise.toml` и `netlify.toml`. Node target остается `24.16.0`. Следующие обновления Hugo делать только отдельной задачей с повторной сборкой, Tailwind/CWV/SEO-проверками и обновлением этого документа.

Примечание: если `mise current` показывает предупреждение вида `hugo@0.164.0 is specified ... but not installed` или `node@24.16.0 is specified ... but not installed`, обычная команда `hugo version` может взять глобальную системную версию Hugo. Для этого проекта так делать нельзя: сначала запусти `mise install` или любую проверочную команду через `mise exec --`, чтобы `mise` установил pinned-версии.

## 4. Установка версий проекта

Из корня проекта:

```bash
cd /Users/stadnyk/MEGA/Aerocool
mise install
```

Что делает команда:

- читает `mise.toml`;
- ставит `Hugo 0.164.0`;
- ставит `Node 24.16.0`;
- подготавливает локальную оболочку к запуску проекта.

Если `mise` попросит доверять конфигу:

```bash
mise trust
```

После этого снова:

```bash
mise install
```

## 5. Проверка после установки

```bash
hugo version
node -v
npm -v
```

Ожидаемо:

- Hugo должен быть `0.164.0`;
- Node должен быть `24.x`.

Если текущая оболочка не подхватила версии, запускай команды через `mise exec --`:

```bash
mise exec -- hugo version
mise exec -- node -v
mise exec -- npm run build
```

После установки pinned-версий ожидаемая проверка такая:

```bash
mise current
mise exec -- hugo version
mise exec -- node -v
```

Ожидаемо:

- `mise current` показывает `hugo 0.164.0` и `node 24.16.0` без предупреждений `not installed`;
- `mise exec -- hugo version` показывает Hugo `0.164.0`;
- `mise exec -- node -v` показывает `v24.16.0`.

## 6. Как запускать проект

Первый раз:

```bash
cd /Users/stadnyk/MEGA/Aerocool
mise install
npm install
```

Локальный сервер:

```bash
npm run dev
```

Обычная development-сборка:

```bash
npm run build
```

Если проверяешь синхронизацию с pinned-окружением проекта, используй:

```bash
mise exec -- ./scripts/script_check.sh
```

После schema/entity изменений можно обновить отчет по эффективности сущностей (Entity Performance Report):

```bash
npm run entity:report
```

Generated CSV отчета не редактировать вручную: внешние GSC/AI/business-метрики добавлять в [32-entity-performance-overrides.csv](../seo/32-entity-performance-overrides.csv).

Локальная production-сборка:

```bash
npm run build:production
```

Для финального контроля перед релизом лучше запускать production-сборку через `mise`, чтобы точно использовать Hugo и Node из `mise.toml`:

```bash
mise exec -- npm run build:production
```

## 7. Почему важен Node 24.16.0

Hugo `css.TailwindCSS` запускает Tailwind CSS CLI как Node-инструмент. Поэтому проект должен использовать предсказуемую Node-версию и локальные npm-зависимости, а не случайный глобальный Tailwind binary.

Для этого проекта важно:

- держать `Node 24.16.0`;
- держать `tailwindcss` и `@tailwindcss/cli` версии `4.3.0` как npm-зависимости проекта;
- не переходить на standalone Tailwind CLI;
- не удалять `package-lock.json` без причины.

Tailwind в проекте собирается через Hugo `css.TailwindCSS`, а не отдельным `tailwind --watch`.

## 8. Частые проблемы

| Проблема | Что значит | Что делать |
| --- | --- | --- |
| `hugo: command not found` | Hugo не установлен или оболочка не видит mise | Запустить `mise install`, затем открыть новый терминал. |
| Версия Hugo не `0.164.0` | Подхватилась системная версия | Запустить через `mise exec -- hugo version`. |
| Netlify собирает иначе, чем локально | Разные версии инструментов или environment | Сверить `mise.toml`, `netlify.toml`, `package-lock.json`. |
| Tailwind не собирается | Node/Tailwind окружение сломано | Проверить `Node 24.16.0`, `npm install`, `assets/css/main.css`, `layouts/_partials/css.html`. |

## 9. Самая короткая памятка

```bash
cd /Users/stadnyk/MEGA/Aerocool
mise install
npm install
npm run build
npm run build:production
```

Если эти команды проходят, локальная среда проекта в порядке.
