# Аудит синхронизации документации с практиками 2026

Дата аудита: 2026-05-13.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

> Исторический sync snapshot. Он не является текущим source of truth по версиям инструментов после перехода на Hugo 0.164.0; актуальный tooling-аудит смотреть в [93-2026-07-07-hugo-0-164-update-audit.md](93-2026-07-07-hugo-0-164-update-audit.md).

Этот документ фиксирует проверку всей проектной документации `Aerocool Ukraine` на актуальность, взаимную согласованность и соответствие лучшим практикам 2026 года для Hugo / Netlify / Tailwind, Google SEO, Core Web Vitals, structured data, e-commerce, multilingual SEO и AI Search readiness.

## 1. Область проверки

Проверены:

- корневые входные документы: `README.md`, `AGENTS.md`;
- оглавление и маршруты чтения: `docs/01-documentation-map.md`;
- active reference/playbook документы в `docs/content`, `docs/architecture`, `docs/deploy`, `docs/quality`, `docs/seo`;
- исторические audit-снимки в `docs/audits`;
- соответствие документации текущим проектным файлам: `hugo.yaml`, `netlify.toml`, `mise.toml`, `package.json`, `layouts/`, `assets/`, `static/_redirects` и quality workflow.

Исторические audit-файлы не переписывались задним числом. Их даты оставлены как даты фактических проверок; текущий документ является свежим синхронизационным снимком.

## 2. Проверенные внешние источники

Официальные источники, с которыми сверены правила:

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Технические требования Google Search: https://developers.google.com/search/docs/essentials/technical
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Page experience в Google Search: https://developers.google.com/search/docs/appearance/page-experience
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Общие правила structured data: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Обзор Product structured data: https://developers.google.com/search/docs/appearance/structured-data/product
- Merchant listing structured data: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Product variants structured data: https://developers.google.com/search/docs/appearance/structured-data/product-variants
- Локализованные версии / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Лучшие практики Google Images SEO: https://developers.google.com/search/docs/appearance/google-images
- Hugo `css.TailwindCSS`: https://gohugo.io/functions/css/tailwindcss/
- Hugo security configuration: https://gohugo.io/configuration/security/
- Hugo security model: https://gohugo.io/about/security/
- Tailwind CSS source detection: https://tailwindcss.com/docs/detecting-classes-in-source-files
- Netlify redirects: https://docs.netlify.com/manage/routing/redirects/redirect-options/
- Netlify custom headers: https://docs.netlify.com/manage/routing/headers/
- Netlify caching: https://docs.netlify.com/build/caching/caching-overview/

## 3. Текущее состояние проекта

| Область | Текущее состояние | Статус |
|---|---|---|
| Hugo | `0.162.0` зафиксирован в `mise.toml` и `netlify.toml` | OK; держать pinned-версию до отдельной задачи обновления |
| Node | `24.16.0` зафиксирован локально и на Netlify | OK |
| Tailwind | Tailwind CSS 4 работает через npm-зависимость и Hugo `css.TailwindCSS` | OK |
| Netlify | Сборка намеренно остается в режиме `development/noindex` | OK для pre-production; production gate остается открытым |
| SEO docs | Документы по Google SEO, SSG SEO, контенту, schema, entity и e-commerce существуют | OK |
| Core Web Vitals | Добавлен и связан отдельный CWV-гайд | OK |
| Structured data | Документация локального JSON-LD graph сильная и консервативная | OK с оговоркой по источнику ratings/reviews |
| Multilingual | `uk` по умолчанию + `/ru/`, page bundles, hreflang/canonical задокументированы | OK |
| Redirects/404 | Netlify `_redirects` и forced `404!` правила задокументированы | OK |
| AI Search | Описан как monitoring/entity layer, а не как замена классического SEO | OK |

## 4. Замечания

### Исправлено в этой синхронизации

- Добавлен отдельный Core Web Vitals guide для Hugo / Netlify / Tailwind.
- CWV-гайд связан из `README.md`, `AGENTS.md`, `docs/01-documentation-map.md`, PageSpeed workflow и SEO checklists.
- Добавлен этот аудит синхронизации документации, чтобы сохранить единый snapshot на 2026-05-13.
- Обновлены даты активной документации и cross-links в затронутых файлах.
- Исправлены устаревшие ссылки на browser audit в quality docs.
- Добавлены заметки по актуальным источникам для Google Search Essentials, people-first content, page experience, structured data, product/merchant listing docs, Hugo Node security, Tailwind source detection и Netlify routing/cache/header behavior.

### Намеренно оставлено открытым

| Пункт | Почему открыто | Следующий шаг |
|---|---|---|
| Netlify production switch | Сайт намеренно остается в `development/noindex` | Переключать только после финального production approval |
| Search Console field data | Требует production-индексации и трафика | Мониторить после production |
| Источник product ratings | Риск для Google rich result, если источник рейтинга не реальный/видимый | Подтвердить источник или убрать/не выводить `aggregateRating` |
| ProductGroup | Сущности находятся в staged/planned состоянии | Добавить видимую навигацию вариантов перед подтверждением |
| AI Search baseline | Нужен production index и реальный prompt monitoring | Запустить ежемесячный baseline после launch |
| Future Hugo releases | Проект фиксирует `0.162.0` для воспроизводимости | Оценивать upgrades отдельно, без тихого version drift |

## 5. Соответствие лучшим практикам

### Проверка Google SEO

Документация соответствует рекомендациям Google 2026 года:

- нет гарантии crawl/index/rank даже при выполнении требований;
- people-first content важнее search-engine-first content;
- у Google нет фиксированного требования к количеству слов;
- Search Essentials и техническая доступность остаются базой;
- page experience и CWV важны, но не являются единственным “магическим” ranking switch;
- после production обязателен monitoring в Search Console.

### Структурированные данные

Документация соответствует текущим правилам Google structured data:

- JSON-LD остается предпочтительным локальным форматом реализации;
- structured data должна отражать видимый контент страницы;
- скрытые или вводящие в заблуждение product/rating/review facts остаются риском;
- Product/Offer/merchant facts должны быть синхронизированы с front matter, видимым товарным контентом и `/faq/`;
- Product variants должны ждать видимой навигации вариантов и стабильных ProductGroup-сущностей.

### Проверка Core Web Vitals

Текущий CWV-слой соответствует метрикам 2026 года:

- основные метрики: `LCP`, `INP`, `CLS`;
- `FID` больше не считается текущей core target;
- field data из Search Console и PageSpeed отделены от быстрых lab/browser diagnostics;
- риски image, CSS, JS, font и TTFB описаны для текущей реализации Hugo/Netlify.

### Связка Hugo и Tailwind

Документация соответствует поведению Hugo 0.162-era:

- Tailwind остается npm-зависимостью;
- standalone Tailwind CLI не используется как project workflow;
- Hugo `css.TailwindCSS` и `hugo_stats.json` являются проектным путем;
- Tailwind classes должны оставаться статически обнаруживаемыми;
- Node permission model рассматривается как часть build contract.

### Настройки Netlify

Документация соответствует поведению Netlify:

- зоны ответственности `_redirects` и `netlify.toml` разделены;
- forced `404!` зарезервирован для scanner/sensitive URL handling;
- широкий fallback `/* -> /404.html 404` не используется;
- правила headers и cache описаны как deploy-level behavior, который нужно проверять на Deploy Preview или production.

## 6. Рекомендуемый порядок чтения после этой синхронизации

Для нового участника проекта:

1. [README.md](../../README.md)
2. [docs/01-documentation-map.md](../01-documentation-map.md)
3. [docs/content/05-front-matter-reference.md](../content/05-front-matter-reference.md)
4. [docs/architecture/03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md)
5. [docs/quality/13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md)

Для SEO/schema-задач:

1. [docs/content/07-content-seo-checklist-2026.md](../content/07-content-seo-checklist-2026.md)
2. [docs/seo/27-google-seo-audit-checklist-2026.md](../seo/27-google-seo-audit-checklist-2026.md)
3. [docs/seo/19-schema-types-reference.md](../seo/19-schema-types-reference.md)
4. [docs/seo/20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md)
5. [docs/seo/21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md)

Для performance/CWV-задач:

1. [docs/quality/12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md)
2. [docs/quality/13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md)
3. [docs/quality/12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md)
4. [docs/content/06-seo-image-shortcode.md](../content/06-seo-image-shortcode.md)

## 7. Итоговая оценка

Состояние документации после этой синхронизации:

```text
Документация проекта: 9.5 / 10
```

Оставшиеся `0.5` балла — не пробел документации, а граница pre-production:

- production mode еще не включен;
- Search Console field data еще нельзя финализировать;
- rich result eligibility нужно перепроверить на production URL;
- источник rating/review все еще требует бизнес-решения.

Текущий вывод:

> Документация актуальна на 13 мая 2026 года и соответствует практикам 2026 для статического SEO-сайта на Hugo / Netlify / Tailwind. Следующий решающий шаг — не новая документация, а контролируемое переключение production и post-launch monitoring через Search Console / PageSpeed / rich results.
