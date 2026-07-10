# Упрощение Quality-аудита до PageSpeed Insights

Дата аудита: 2026-06-02.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот audit-снимок фиксирует решение упростить quality-контур проекта `Aerocool Ukraine`: Netlify больше не запускает браузерный аудит после deploy, а ручная проверка опубликованных URL выполняется через [PageSpeed Insights](https://pagespeed.web.dev/).

## 1. Причина решения

Сайт уже имеет отдельные локальные проверки сборки, контента, schema.org, robots, redirects и routing. Дополнительный браузерный audit runtime внутри Netlify усложнял deploy и мог ломать публикацию по причинам, не связанным с Hugo, HTML или SEO-графом.

Более простой и устойчивый вариант:

- Netlify отвечает за build и publish;
- репозиторий хранит только нужные зависимости Hugo/Tailwind/Netlify Database;
- PageSpeed Insights используется вручную для опубликованных URL;
- production-gate остается в документации и ручном чек-листе.

## 2. Что изменено

Удалены:

- локальный Netlify build plugin для браузерной сводки;
- отдельная папка массового браузерного аудита;
- root npm-зависимости для запуска Chrome-аудита;
- helper-скрипт старого URL-аудита;
- устаревшие quality-документы под старый workflow.

Добавлен новый активный документ:

- [docs/quality/13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md)

## 3. Новый Production-Gate

Перед production-релизом использовать такой минимум:

1. `./scripts/script_check.sh`
2. `npm run build:production`
3. ручная проверка ключевых URL через PageSpeed Insights;
4. ручная проверка schema через `validator.schema.org`;
5. проверка sitemap, robots, canonical, hreflang, 404 и headers на опубликованном URL.

## 4. Текущий статус

Решение принято как постоянная базовая стратегия проекта, пока не появится отдельная потребность в автоматическом external monitoring или CI-gate. Если такой gate понадобится позже, его нужно проектировать отдельно и не возвращать старый Netlify post-deploy browser runtime по умолчанию.
