# Текущий аудит документации 2026-05-17

Дата аудита: 2026-05-17.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).
Актуализировано: 2026-05-21.

Примечание от 2026-05-21: это исторический audit-снимок состояния на 2026-05-17. Текущий порядок документации, актуальные счетчики файлов и последнюю оценку нужно смотреть в [01-documentation-map.md](../01-documentation-map.md), [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md), [64-2026-05-20-json-ld-entity-full-audit-current.md](64-2026-05-20-json-ld-entity-full-audit-current.md) и [30-keyword-database-2026.md](../seo/30-keyword-database-2026.md). Старые счетчики ниже оставлены как значение исторического среза, а не как текущая инструкция.

Этот документ фиксирует проверку текущей документации проекта `Aerocool Ukraine` на понятность для новичка, русский язык, строгую структуру, полноту оглавления, актуальность по фактическим файлам проекта и внешним SEO/Hugo/Netlify/Tailwind правилам.

## 1. Область проверки

Проверены:

- корневые документы: [README.md](../../README.md) и [AGENTS.md](../../AGENTS.md);
- оглавление [docs/01-documentation-map.md](../01-documentation-map.md);
- все markdown-файлы в `docs/`;
- активные гайды в `docs/content`, `docs/architecture`, `docs/deploy`, `docs/quality`, `docs/seo`;
- audit-снимки в `docs/audits`;
- фактические файлы проекта: `layouts/`, `hugo.yaml`, `netlify.toml`, `mise.toml`, `package.json`;
- внешние первичные источники для актуальности SEO, structured data, Hugo, Netlify и Tailwind CSS.

## 2. Проверенные внешние источники

Использованы только первичные источники:

- Google FAQ structured data: `https://developers.google.com/search/docs/appearance/structured-data/faqpage`
- Google Product snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/product-snippet`
- Google Review Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/review-snippet`
- Hugo `css.TailwindCSS`: `https://gohugo.io/functions/css/tailwindcss/`
- Netlify build environment variables: `https://docs.netlify.com/build/configure-builds/environment-variables/`
- Netlify Hugo framework docs: `https://docs.netlify.com/frameworks/hugo/`
- Netlify Database CLI: `https://docs.netlify.com/build/data-and-storage/netlify-database/cli/`
- Netlify Database API: `https://docs.netlify.com/build/data-and-storage/netlify-database/api/`
- Tailwind CSS v4.0: `https://tailwindcss.com/blog/tailwindcss-v4`

## 3. Что проверено машинно

Проверки:

- `47` markdown-файлов в `README.md`, `AGENTS.md` и `docs/`;
- `45` markdown-файлов внутри `docs/`;
- покрытие `docs/01-documentation-map.md`: все документы из `docs/` перечислены в оглавлении;
- отсутствие служебных англоязычных заголовков вроде `Scope`, `Findings`, `Current Status`, `Implementation Backlog`, `Executive Summary`, `Prioritized Fix Plan`;
- явные даты есть у всех рабочих документов и audit-снимков, кроме шаблонов в `docs/content/templates/`, где дата не нужна;
- [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) упоминает все `55` текущих файлов из `layouts/`;
- root [README.md](../../README.md) и [AGENTS.md](../../AGENTS.md) синхронизированы с новыми audit-снимками `2026-05-17`;
- review-документация синхронизирована с текущим Netlify Database и Google Review Snippet слоем;
- актуальный алгоритм полного обновления документации закреплен в [02-documentation-style-guide.md](../architecture/02-documentation-style-guide.md);
- локальные markdown-ссылки на файлы проекта;
- сборка Hugo через `npm run build`.

## 4. Текущий итог

Документация в целом соответствует требованию:

- основной язык документации — русский;
- структура входа для новичка есть: `README.md` -> `docs/01-documentation-map.md` -> профильные гайды;
- в `docs/01-documentation-map.md` перечислены все текущие документы;
- технические английские слова остаются только там, где это точные названия технологий, команд, полей, schema.org-типов или официальных терминов;
- контентные, SEO, schema, deploy и quality-гайды связаны с реальными файлами проекта;
- текущий статус `Netlify development/noindex` отражен в документации и не маскируется как production-готовность.

## 5. Исправлено в этом проходе

### P1. FAQ Rich Results были описаны слишком мягко

Официальная документация Google сообщает, что с `2026-05-07` FAQ rich results больше не показываются в Google Search. Поэтому FAQ больше нельзя описывать как ограниченную, но потенциальную Google SERP-цель.

Обновлены:

- [content/07-content-seo-checklist-2026.md](../content/07-content-seo-checklist-2026.md);
- [seo/21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md);
- [seo/26-json-ld-graph-audit-roadmap-2026.md](../seo/26-json-ld-graph-audit-roadmap-2026.md);
- [seo/20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md);
- [seo/27-google-seo-audit-checklist-2026.md](../seo/27-google-seo-audit-checklist-2026.md);
- [seo/28-ssg-seo-checklist-2026.md](../seo/28-ssg-seo-checklist-2026.md);
- [audits/43-2026-04-29-google-rich-results-quality-audit.md](43-2026-04-29-google-rich-results-quality-audit.md).

Текущий стандарт: `FAQPage` можно оставлять для видимого FAQ, структуры страницы, AI/search-понимания и подтверждения сервисных фактов. Нельзя планировать SEO-результат вокруг Google FAQ rich result.

### P2. Helper-гайд не покрывал все важные Layout-файлы

Проверка `layouts/` показала, что [03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md) не называл часть верхнеуровневых layout-файлов и shortcode-файлов.

Добавлены понятные для новичка карты:

- верхнеуровневые layout-файлы;
- служебные страницы `404`, `search`, `alias`;
- sitemap и RSS;
- shortcode-файлы `home-hero`, `seo-image`, `faq-list`, `contact`.

### P2. исторические Audit-файлы имели неодинаковую дату

Часть audit-снимков имела дату только в имени файла или в заголовке. Для строгой структуры добавлены явные строки даты сразу после заголовка.

### P2. оглавления нужно было обновить под новый снимок

Новый audit-снимок добавлен в:

- [README.md](../../README.md);
- [docs/01-documentation-map.md](../01-documentation-map.md);
- [AGENTS.md](../../AGENTS.md).

### P2. Review-слой требовал синхронизации с новым Netlify Database документом

После добавления [17-netlify-database-reviews.md](../deploy/17-netlify-database-reviews.md) проверены связанные документы по `AggregateRating`, `Review`, `review_target_id`, `data/generated/reviews.json` и moderation flow.

Текущий стандарт: `rating.value` и `rating.count` во front matter считать legacy-риском. Целевая схема — `Netlify Database` -> approved reviews -> build-time export -> видимые отзывы -> `Product` JSON-LD.

## 6. Что осталось намеренно

Не менялось:

- `Netlify` остается в `development/noindex`, потому что это осознанный project gate до production-перехода;
- `ProductGroup` остается staged, пока не будет подтвержден как `confirmed` в entity registry;
- рейтинг и отзывы остаются открытым бизнес-риском, пока источник ratings/reviews не будет явно подтвержден;
- исторические audit-оценки не переписывались как новые, кроме добавления текущих уточнений и дат.

## 7. Контрольный вывод

На `2026-05-17` текущая документация проекта соответствует требованию: она русскоязычная, структурированная, связана с реальными файлами, ориентирована на новичка и актуализирована по найденному внешнему изменению Google FAQ rich results.

Следующий обязательный пересмотр нужен при любом из событий:

- перевод Netlify из `development` в `production`;
- изменение `schema_types`, entity registry или product front matter;
- изменение Hugo/Tailwind pipeline;
- появление подтвержденного источника отзывов и рейтингов;
- изменение Google/Netlify/Hugo/Tailwind официальной документации, влияющее на текущие правила проекта.
