# Core Web Vitals аудит проекта

Дата аудита: 2026-05-17.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Цель: проверить текущее состояние Core Web Vitals-подготовки проекта `Aerocool Ukraine`, локальную документацию, шаблоны, изображения, CSS/JS и browser lab baseline для ключевых типов страниц.

## Проверенные источники

- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google Page Experience: https://developers.google.com/search/docs/appearance/page-experience
- Локальный playbook: [12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md)
- PageSpeed workflow: [13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md)

Актуальные целевые метрики Google:

| Метрика | Хороший уровень |
|---|---:|
| `LCP` | ≤ 2.5 s |
| `INP` | < 200 ms |
| `CLS` | ≤ 0.1 |

`FID` не считать текущей основной Core Web Vitals метрикой. Для интерактивности использовать `INP`; `TBT` смотреть только как lab-подсказку.

## Что проверено в проекте

- `layouts/_partials/head.html` — CSS, search JS, preload/prefetch.
- `layouts/_shortcodes/home-hero.html` — главный hero и LCP-кандидат главной.
- `layouts/_shortcodes/seo-image.html` — content images, responsive `srcset`, `loading`, `fetchpriority`, `preload`.
- `layouts/_partials/_seo/lcp-image-preload.html` — head preload главного article/news/product изображения.
- `layouts/_partials/cover.html` — листинговые cover-картинки.
- `assets/css/main.css` — component-layer, view transitions, tap targets.
- `assets/js/site.js` — меню, hash links, view transitions, service worker registration.
- `netlify.toml` — cache/security headers и текущий build environment.
- `docs/quality/*` и связанные content/image документы.

## Найденные и исправленные риски

### 1. Глобальный prefetch меню

До правки `head.html` добавлял `rel="prefetch"` для всех пунктов главного меню на каждой странице. На главной это давало около `329 KB` лишних HTML-загрузок:

```text
/products/   ~46 KB
/about/      ~51 KB
/articles/   ~55 KB
/news/       ~47 KB
/faq/        ~87 KB
/contact/    ~43 KB
```

Эти запросы имели `VeryLow` priority, но попадали в browser load profile и ухудшали mobile lab LCP/Performance.

Решение: удалить глобальный menu prefetch из `layouts/_partials/head.html`.

### 2. Предзагрузка поискового индекса

До правки search-страница preloaded `index.json` в `<head>`. Размер локального search index — около `407 KB`. Это не нужно для первого рендера search-страницы и ухудшало LCP.

Решение: удалить `<link rel="preload" as="fetch" href="../index.json">`. Search JS остается `defer` и может загрузить индекс после первичного рендера.

### 3. Документация

Обновлен [12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md):

- дата обновления: `2026-05-17`;
- добавлено правило не prefetch-ить навигационные HTML-страницы из `<head>`;
- добавлено правило не preload-ить большой `index.json` для search до LCP.

## Browser Lab Baseline после правок

Методика:

```bash
npm run build:production
python3 -m http.server 1320 --bind 127.0.0.1 --directory public
browser-audit <url> --categories=performance,accessibility,best-practices,seo
```

Это чистый локальный стенд production output: без Hugo LiveReload, без development `noindex` для индексируемых страниц и без Netlify CDN-сжатия.

| URL | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 99 | 100 | 100 | 100 | 2.1 s | 0 | 0 ms |
| `/products/sky/360/` | 99 | 100 | 100 | 100 | 2.0 s | 0 | 0 ms |
| `/articles/how-to-choose-aerocool-chair/` | 99 | 100 | 100 | 100 | 2.0 s | 0 | 0 ms |
| `/search/` | 100 | 98 | 100 | 66 | 1.7 s | 0 | 0 ms |

Примечание: `/search/` намеренно `noindex,nofollow`, поэтому SEO score `66` для этой страницы не является production-проблемой индексируемых URL. Accessibility `98` связан с heading-order на служебной search-странице, это не CWV-риск.

## До и после ключевых правок

До удаления глобального menu prefetch на production-mode сервере:

| URL | Performance | LCP | Total byte weight |
|---|---:|---:|---:|
| `/` | 87 | 4.1 s | ~549 KB |
| `/products/sky/360/` | 87 | 4.0 s | ~509 KB |
| `/articles/how-to-choose-aerocool-chair/` | 86 | 4.1 s | ~520 KB |
| `/search/` | 78 | 5.9 s | ~857 KB |

После удаления menu prefetch и search preload на чистом static production output:

| URL | Performance | LCP | Total byte weight |
|---|---:|---:|---:|
| `/` | 99 | 2.1 s | ~206 KB |
| `/products/sky/360/` | 99 | 2.0 s | ~166 KB |
| `/articles/how-to-choose-aerocool-chair/` | 99 | 2.0 s | ~177 KB |
| `/search/` | 100 | 1.7 s | ~515 KB |

## Текущая оценка CWV-готовности

Lab readiness: `9 / 10`.

Сильные стороны:

- `CLS = 0` на проверенных URL.
- `TBT = 0 ms` на проверенных URL.
- Индексируемые production pages дают Performance `99`.
- Article/product главные изображения имеют head preload, responsive WebP `srcset`, `width`, `height`, `loading="eager"` и `fetchpriority="high"`.
- Search index больше не блокирует первый рендер через preload.

Оставшиеся ограничения:

- Нет field data из Search Console / CrUX, поэтому реальный `INP` подтвердить нельзя.
- `netlify.toml` все еще собирает сайт в `development/noindex`; финальный CWV/SEO gate надо повторить на Deploy Preview после production-переключения.
- Главная hero-картинка `/images/home-hero85.webp` пока статическая, без responsive variants; browser-аудит видел потенциальную экономию около `66 KB` на mobile. Текущий LCP главной — текстовый `H1`, поэтому это не блокер, но это следующий понятный image-optimization резерв.
- Локальный static server не имитирует Netlify Brotli/Gzip, поэтому warning `Enable text compression` в локальном browser-аудите не переносить напрямую на Netlify без Deploy Preview проверки.
- Search index уже не мешает LCP, но при росте сайта `index.json` нужно контролировать отдельно: размер, поля, debounce, лимит результатов и INP.

## Рекомендации

1. Перед production-переключением запустить `npm run build:production` и проверить Deploy Preview через PageSpeed Insights.
2. После production-публикации подключить Search Console Core Web Vitals report и ждать field data.
3. Не возвращать глобальный `prefetch` меню в `<head>`.
4. Не preload-ить крупные JSON/search ресурсы до LCP.
5. Следующая performance-задача при необходимости: перевести home hero image в Hugo image pipeline или подготовить responsive variants для mobile.
