# Аудит Совместимости С Hugo v0.161.0

> Архивный документ. Текущая версия проекта — Hugo `0.164.0`, Node `24.16.0`; актуальный аудит синхронизации находится в [93-2026-07-07-hugo-0-164-update-audit.md](93-2026-07-07-hugo-0-164-update-audit.md).

Дата аудита: 2026-04-29.
Актуализировано: 2026-05-05.
Проект: Aerocool Ukraine
Проверяемая версия: Hugo `v0.161.0`
Локальная связка проверки: Hugo `v0.161.0`, Node `v24.15.0`

## Итоговый вердикт

Проект технически совместим с Hugo `0.161.0`.

Сборка на Hugo `0.161.0` и Node `24` в текущем окружении `development` проходит без ошибок, с `--printI18nWarnings` без предупреждений, без path warnings и без предупреждений по deprecated language API. На актуальной проверке собрано `50` страниц UK, `48` страниц RU, по `7` paginator pages на язык и `296` processed images. Самое важное изменение `0.161.0` - запуск Node-инструментов Hugo через Node `--permission` - на проект не ломает сборку: Tailwind установлен как npm-пакет, `css.TailwindCSS` работает, Node версии `>= 22` доступен.

Переход на Hugo `0.161.0` можно считать безопасным по совместимости: pinned-версии в `mise.toml` и `netlify.toml` переведены на Hugo `0.161.0`. Окружение сборки временно оставлено `development`; production-режим включать только после финальной проверки.

Простыми словами для новичка: этот аудит подтверждает, что текущая версия Hugo подходит проекту, Tailwind собирается штатно, локальные overrides работают, а временный `development/noindex` режим является осознанной настройкой, а не поломкой.

## Источники документации Hugo

- Hugo release `v0.161.0`: https://github.com/gohugoio/hugo/releases/tag/v0.161.0
- Announcement: https://discourse.gohugo.io/t/hugo-v0-161-0-released/57060
- Security configuration: https://gohugo.io/configuration/security/
- Tailwind CSS integration: https://gohugo.io/functions/css/tailwindcss/
- Language configuration: https://gohugo.io/configuration/languages/
- `Site.Language`: https://gohugo.io/methods/site/language/
- `Page.Language`: https://gohugo.io/methods/page/language/
- `Site.Sites` deprecation: https://gohugo.io/methods/site/sites/
- New template system: https://gohugo.io/templates/new-templatesystem-overview/
- Permalinks configuration: https://gohugo.io/configuration/permalinks/

## Что изменилось в Hugo 0.161.0 и влияние на проект

### 1. Node-Инструменты Теперь Запускаются С Node `--permission`

В `0.161.0` Hugo hardened execution для Node-инструментов PostCSS, Babel и TailwindCSS. Теперь они запускаются через Node permission model, а разрешения берутся из `security.node.permissions`.

Проверка проекта:

- Локальный Node: `v24.15.0`, требование Node `>= 22` выполнено.
- `package.json` содержит `tailwindcss` и `@tailwindcss/cli`.
- `package-lock.json` содержит npm-пакеты Tailwind, включая `@tailwindcss/oxide`.
- Standalone Tailwind executable не используется.
- `layouts/_partials/css.html` использует Hugo `css.TailwindCSS`.
- `assets/css/main.css` содержит `@import "tailwindcss";` и `@source "hugo_stats.json";`.
- Сборка на `0.161.0` прошла, значит default Node permissions достаточны.

Вывод: риска блокировки Tailwind из-за Node permission model нет.

### 2. Новые Настройки Безопасности По Умолчанию

Эффективный конфиг Hugo `0.161.0` показал:

```toml
[security.exec]
allow = ['^(dart-)?sass(-embedded)?$', '^go$', '^git$', '^node$', '^postcss$', '^tailwindcss$']

[security.http]
urls = ['(?i)^https?://[a-z]', '! (?i)localhost', '! @']

[security.node.permissions]
allowaddons = ['tailwindcss']
allowread = ['.']
allowworker = ['tailwindcss']
```

В проекте нет локального override `security`, поэтому используются актуальные defaults Hugo `0.161.0`.

Проверка проекта:

- `resources.GetRemote` не найден в локальных шаблонах и конфигурации.
- Сборка не обращается к remote resources.
- Более строгие `security.http.urls` не влияют на текущий build.
- `node` есть в `security.exec.allow`.

Вывод: security changes 0.161.0 совместимы с проектом.

### 3. Tailwind CSS через Hugo Pipes

Документация `css.TailwindCSS` требует Tailwind CLI v4 как npm dependency и build stats.

Проверка проекта:

- `hugo.yaml` включает `build.buildStats.enable: true`.
- `hugo.yaml` монтирует `hugo_stats.json` в `assets/notwatching/hugo_stats.json`.
- `assets/css/main.css` явно подключает `@source "hugo_stats.json";`.
- `layouts/_partials/css.html` вызывает `css.TailwindCSS`.
- `package.json` содержит `tailwindcss` и `@tailwindcss/cli`.
- CSS pipeline успешно собирается через Hugo `css.TailwindCSS`.

Вывод: CSS pipeline соответствует документации Hugo `0.161.0`.

### 4. Языки И Устаревший Language API

Актуальная документация Hugo считает deprecated:

- `.Language.Lang` -> использовать `.Language.Name`
- `.Language.LanguageCode` -> использовать `.Language.Locale`
- `.Language.LanguageDirection` -> использовать `.Language.Direction`
- `.Language.LanguageName` -> использовать `.Language.Label`

Проверка локальных шаблонов:

- Deprecated `.Language.Lang`, `.Language.LanguageCode`, `.Language.LanguageDirection`, `.Language.LanguageName` в локальных `layouts/` не найдены.
- Старые обращения к language API в `layouts/_shortcodes/contact.html`, `layouts/_shortcodes/home-hero.html`, `layouts/404.html` и `layouts/_partials/_schema/entity-node.html` заменены на `.Page.Language.Name` / `.Site.Language.Name`.
- `layouts/baseof.html` использует `.Language.Direction`.
- `layouts/_partials/page-language.html` использует `.Language.Locale` с fallback на `.Language.Name`.
- `layouts/rss.xml` использует `site.Language.Locale | default site.Language.Name`.
- OpenGraph использует `.Site.Language.Locale`.
- Переключатель языка и sitemap index используют `.Language.Name` для language key, что соответствует документации.
- `layouts/_partials/translation-list.html` использует `.Language.Name` и `.Language.Label`.

В теме PaperMod deprecated API еще есть:

- `themes/PaperMod/layouts/_default/baseof.html`
- `themes/PaperMod/layouts/_default/rss.xml`
- `themes/PaperMod/layouts/partials/header.html`
- `themes/PaperMod/layouts/partials/templates/opengraph.html`
- `themes/PaperMod/layouts/partials/templates/schema_json.html`
- `themes/PaperMod/layouts/partials/translation_list.html`

Но активные пути перекрыты локальными override в `layouts/`, включая `layouts/search.html`, и сборка на `0.161.0` не выдает deprecated warnings.

Вывод: локальная часть проекта соответствует актуальному language API. Theme debt остается только как неисполняемый риск при будущих обновлениях/удалении override.

### 5. I18n

Проверка:

- `i18n/uk.yaml` содержит `page_not_found` и pluralized `words`.
- `i18n/ru.yaml` содержит `page_not_found` и pluralized `words`.
- `hugo --printI18nWarnings` на `0.161.0` не вывел предупреждений.
- `public/404.html` содержит украинский текст `Сторінку не знайдено`.
- `public/ru/404.html` содержит русский текст `Страница не найдена`.
- RSS language выводится как `uk-UA` и `ru-UA`.

Вывод: i18n совместим, прошлые пропущенные переводы закрыты.

### 6. `hugo.Sites` вместо deprecated `.Site.Sites`

Проверка:

- Deprecated `.Site.Sites`, `.Page.Sites`, `site.Sites` в локальных шаблонах не найдены.
- `layouts/sitemapindex.xml` использует `hugo.Sites`.

Вывод: этот блок соответствует актуальной документации.

### 7. Постоянные Ссылки

В Hugo `0.161.0` появился slice-based internal representation для permalink config с PageMatcher target.

Проверка:

- Текущий YAML-синтаксис `permalinks.products/articles/news` принят без предупреждений.
- `hugo config` нормализует его в array-style target form.
- Фактические URL продуктов, новостей и статей собираются корректно.

Вывод: миграция синтаксиса permalinks не требуется.

### 8. Модель Контента

Проверка:

- Контент использует текущую двуязычную схему `index.md` / `index.ru.md`.
- Главные страницы: `content/_index.md`, `content/_index.ru.md`.
- Статичные страницы `about`, `contact`, `faq` синхронизированы по языкам.
- `articles`, `news`, `products` используют page bundle structure.
- Markdown `# H1` в `content/` не найден.
- `schema_types` используется в контенте и шаблонах.
- В `content/**/*.md` текущий редакционный стандарт не использует inline-code в видимом markdown-контенте; технические обозначения выделяются обычным жирным форматом.
- `date` и `lastmod` присутствуют у проверенных страниц.

Вывод: content model совместим с Hugo `0.161.0` и локальными правилами проекта.

### 9. SEO, schema.org И Robots

Проверка generated output:

- В текущем `development`-окружении `/` и `/ru/` намеренно имеют `noindex,nofollow`.
- После включения production-режима нужно отдельно подтвердить, что индексируемые URL снова получают `index,follow`.
- `/404.html`, `/ru/404.html`, `/search/`, alias `/page/1/` имеют `noindex,nofollow`.
- `og:locale` выводится как `uk_UA` и `ru_UA`.
- HTML lang/dir выводится как `uk-UA/ltr` и `ru-UA/ltr`.
- JSON-LD собирается на главных и внутренних страницах.
- Шаблоны schema читают `.Params.schema_types`.

Вывод: SEO/schema слой не конфликтует с Hugo `0.161.0`.

### 10. Sitemap и RSS

Проверка:

- Корневой `public/sitemap.xml` является sitemap index.
- В index есть:
  - `https://aerocool.ua/uk/sitemap.xml`
  - `https://aerocool.ua/ru/sitemap.xml`
- `public/uk/sitemap.xml` и `public/ru/sitemap.xml` генерируются.
- Активный локальный RSS-шаблон находится в `layouts/rss.xml`.
- RSS содержит `<generator>Hugo -- 0.161.0</generator>`.
- RSS language: `uk-UA`, `ru-UA`.

Вывод: sitemap/RSS слой совместим.

### 11. Тема PaperMod

Проверка:

- Hugo module graph: `project PaperMod`.
- У темы не найден `package.json` или `package.hugo.json`, значит Node package merge из Hugo modules не требуется.
- Deprecated language API в теме есть, но локально перекрыты активными шаблонами.
- Локальные overrides покрывают критичные `baseof`, `head`, `header`, `footer`, RSS, sitemap, 404, alias, search, SEO/schema partials.
- В локальном слое больше нет папки `layouts/_default`; RSS и search лежат как `layouts/rss.xml` и `layouts/search.html`.

Вывод: текущая тема не блокирует переход, но при обновлении PaperMod нужно повторно прогнать grep по deprecated language API.

### 12. Настройки Netlify

Текущее состояние:

- `netlify.toml` закрепляет `HUGO_VERSION = "0.161.0"`.
- `mise.toml` закрепляет `hugo = "0.161.0"`.
- `NODE_VERSION = "24"` соответствует требованиям Hugo `0.161.0`.
- Build command: `git submodule update --init --recursive && hugo --environment development --gc --minify`.
- `HUGO_ENVIRONMENT = "development"` оставляет сборку во временном development-режиме.

Вывод: runtime и deploy pin совместимы с Hugo `0.161.0`; production environment пока намеренно не включен.

## Команды проверки

```bash
mise x hugo@0.161.0 -- hugo version
mise x node@24 -- node --version
mise x hugo@0.161.0 node@24 -- hugo --environment development --gc --minify --printPathWarnings --printI18nWarnings
mise x hugo@0.161.0 node@24 -- hugo --environment development --gc --minify --templateMetrics --templateMetricsHints
mise x hugo@0.161.0 node@24 -- npm run build
mise x hugo@0.161.0 node@24 -- hugo config --format toml
mise x hugo@0.161.0 -- hugo mod graph
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang\b|\.Site\.Language\.Lang\b|site\.Language\.Lang\b|\.Page\.Lang\b|\.Lang\b|site\.Sites\b|\.Site\.Sites\b|\.Page\.Sites\b|site\.Data\b|\.Site\.Data\b|excludeFiles|includeFiles|:filename' layouts hugo.yaml netlify.toml package.json mise.toml
rg -n 'schema_type:' content layouts
rg -n '^# ' content
rg -n 'resources\.GetRemote|http\.Get|GetRemote|remoteResource' layouts assets hugo.yaml netlify.toml package.json
git diff --check
```

Результаты:

- Hugo version: `v0.161.0`.
- Node version: `v24.15.0`.
- Development-environment build: success.
- `npm run build`: success.
- Pages: `50` UK, `48` RU.
- Paginator pages: `7` UK, `7` RU.
- Non-page files: `38` UK.
- Static files: `19` UK, `19` RU.
- Processed images: `296`.
- Aliases: `8` UK, `7` RU.
- I18n warnings: none.
- Path warnings: none.
- Подсказки template metrics: нет actionable warnings.
- `git diff --check`: clean.
- Template metrics подтверждают использование `rss.xml`, `search.html` и `_partials/translation-list.html`.

## Замечания

### Закрыто: Версии Hugo Указывают На 0.161.0

Files:

- `mise.toml:2`
- `netlify.toml:10`

Текущие значения:

```toml
hugo = "0.161.0"
HUGO_VERSION = "0.161.0"
```

Влияние: локальный/default tooling и Netlify build используют Hugo `0.161.0`.

### Намеренно: Сборка Netlify Пока Использует Development-Окружение

File: `netlify.toml:12`

Текущее значение:

```toml
HUGO_ENVIRONMENT = "development"
```

Влияние: Netlify build использует официальную переменную окружения Hugo, но намеренно остается в `development`, пока production mode не утвержден.

Build command:

```toml
command = "git submodule update --init --recursive && hugo --environment development --gc --minify"
```

### Намеренно: `params.env` Остается `development`

File: `hugo.yaml:110`

Текущее значение:

```yaml
params:
  env: development
```

Влияние: это theme/project parameter, а не build environment Hugo. Для текущей фазы проекта он намеренно остается `development`, совпадает с `HUGO_ENVIRONMENT = "development"` и временным noindex-поведением. Не переключать его в `production`, пока не утверждена отдельная проверка production-readiness.

### Закрыто: RSS Больше Не Использует Устаревший `site.Author`

File: `layouts/rss.xml`

Локальный RSS-шаблон использует только `site.Params.author` для author metadata. Fallback-ветки для устаревших `site.Author.email` и `site.Author.name` удалены.

Влияние: локальный RSS output больше не зависит от устаревших author configuration keys.

### P3: Подмодуль PaperMod Все Еще Содержит Устаревший Language API

Файлы в `themes/PaperMod/layouts/` все еще ссылаются на deprecated language fields. Active project output безопасен, потому что локальные overrides заменяют эти пути. Оставить это в чек-листе для будущих theme updates.

## Текущий Чек-Лист Hugo 0.161.0

1. Expected `mise.toml`:

```toml
[tools]
hugo = "0.161.0"
node = "24"
```

2. Expected `netlify.toml`:

```toml
[build]
  command = "git submodule update --init --recursive && hugo --environment development --gc --minify"

[build.environment]
  HUGO_VERSION = "0.161.0"
  HUGO_ENVIRONMENT = "development"
  NODE_VERSION = "24"
```

3. Держать `HUGO_ENVIRONMENT = "development"`, пока production mode не утвержден.

4. Держать `params.env = development`, пока не утверждена отдельная production-readiness check.

5. Re-run:

```bash
mise trust
mise install
mise x hugo@0.161.0 node@24 -- hugo --environment development --gc --minify --printPathWarnings --printI18nWarnings
mise x hugo@0.161.0 node@24 -- npm run build
```

## Итоговая Оценка

Hugo `0.161.0` принят в project tooling и Netlify configuration. Код проекта, локальные шаблоны, i18n, Tailwind pipeline, SEO/schema templates, sitemap/RSS output и multilingual content model совместимы. Build environment намеренно остается `development`, пока production mode не утвержден.
