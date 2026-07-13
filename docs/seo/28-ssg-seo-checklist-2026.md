# Финальный SEO-чеклист для SSG-сайта в 2026 году

Обновлено: 2026-07-13.

Этот файл — финальный список элементов для построения технически сильного SSG-сайта: Hugo, техническое SEO, schema.org, Core Web Vitals, контентная стратегия, entity SEO, E-E-A-T, мониторинг и развитие сайта. Он не обещает конкретную позицию в Google; он фиксирует, что должно быть сделано, чтобы сайт не проигрывал по технической базе и качеству сигналов.

Синхронизировано 2026-07-13 с текущей проектной документацией и [техническим SERP-контрактом](36-hugo-yaml-serp-technical-contract-2026.md). Последняя полная проверка указана в [карте документации](../01-documentation-map.md#5-текущий-аудит), а аудит `50` хранит исторический снимок от 2026-05-13.

Примечание для новичка: это общий стратегический чек-лист, а не список файлов, которые нужно сразу менять. Фактические правила проекта находятся в [README.md](../../README.md), [AGENTS.md](../../AGENTS.md), [контентном чек-листе](../content/07-content-seo-checklist-2026.md), [справочнике front matter](../content/05-front-matter-reference.md), [schema-чек-листе](20-schema-markup-quality-checklist-2026.md), [knowledge graph playbook](24-entities-knowledge-graph-playbook-2026.md), [SERP-контракте](36-hugo-yaml-serp-technical-contract-2026.md), [стратегии перелинковки](38-internal-linking-strategy-2026.md) и [руководстве PageSpeed](../quality/13-pagespeed-insights-audit.md).

---

## 1. Платформа

| Элемент | Лучший вариант |
|---|---|
| SSG | **Hugo / Astro** |
| Хостинг | **Netlify / Cloudflare Pages / Vercel** |
| CDN | Netlify Edge / Cloudflare CDN |
| CSS | Tailwind CSS |
| Поиск | Для Aerocool сейчас локальная search-страница Hugo/PaperMod; Pagefind можно рассмотреть отдельно |
| Деплой | Git-репозиторий -> Netlify / Cloudflare Pages |
| Версионирование | Git + GitHub |
| CI-проверки | Для Aerocool сейчас локальная сборка и ручная PageSpeed-проверка опубликованных URL; отдельный GitHub Actions gate не используется |

---

## 2. Техническое SEO

| Элемент | Обязательно |
|---|---|
| Чистый HTML | Да |
| Semantic HTML | Да |
| Правильные `<title>` | Да |
| Уникальные meta description | Да |
| Canonical URL | Да |
| hreflang для мультиязычности | Да |
| sitemap.xml | Да |
| sitemap index | Да, если много страниц |
| robots.txt | Да |
| Чистые URL | Да |
| 301 / 308 redirects | Да |
| 404 page | Да |
| 410 для удалённых страниц | Да |
| noindex для мусорных страниц | Да |
| Pagination SEO | Да |
| Breadcrumbs | Да |
| Open Graph | Да |
| Twitter / X Cards | Да |

---

## 3. Структурированные данные и schema.org

| Schema | Для чего |
|---|---|
| WebSite | Весь сайт |
| WebPage | Каждая страница |
| Organization | Компания / официальный сайт |
| Brand | Бренд |
| Product | Товар |
| Offer | Цена / наличие |
| AggregateRating | Рейтинг |
| Review | Отзывы |
| FAQPage | FAQ-блоки; после `2026-05-07` не считать Google FAQ rich result целью |
| BreadcrumbList | Хлебные крошки |
| Article | Статьи блога |
| BlogPosting | Блоговые публикации |
| CollectionPage | Категории |
| ItemList | Списки товаров |
| LocalBusiness | Если есть локальное представительство |
| SearchAction | Поиск по сайту; с 2024-11-21 не дает отдельный sitelinks search box в Google |
| ImageObject | Важные изображения |
| VideoObject | Видео, если есть |
| Person | Автор / эксперт / reviewer |

---

## 4. Архитектура сайта

| Элемент | Обязательно |
|---|---|
| Главная страница | Да |
| Категории | Да |
| Подкатегории | Да, если нужно |
| Страницы товаров | Да |
| Страницы сравнения | Да |
| FAQ-раздел | Да |
| Блог | Да |
| Гайды | Да |
| Glossary / словарь терминов | Очень желательно |
| Страницы “как выбрать” | Да |
| Страницы “лучшие товары” | Да |
| Страницы “товар vs товар” | Да |
| Страницы “бренд vs бренд” | Да |
| About / О компании | Да |
| Contact | Да |
| Delivery / Payment / Warranty | Да |
| Privacy Policy | Да |
| Terms | Да |
| Returns / Refunds | Да |

---

## 5. Контентная SEO-система

| Элемент | Обязательно |
|---|---|
| Keyword research | Да |
| Keyword clustering | Да |
| Search intent mapping | Да |
| Topical map | Да |
| Content calendar | Да |
| Content briefs | Да |
| Unique product descriptions | Да |
| Category SEO text | Да |
| FAQ для каждой категории | Да |
| FAQ для каждого товара | Да |
| Сравнительный контент | Да |
| Buying guides | Да |
| Problem-solving articles | Да |
| Поддерживающие статьи | Да |
| Content refresh system | Да |
| Content pruning | Да |
| Проверка duplicate content | Да |
| Проверка cannibalization | Да |

---

## 6. SEO сущностей

| Entity | Что нужно сделать |
|---|---|
| Brand entity | Чётко описать бренд |
| Organization entity | Чётко описать компанию |
| Product entity | Связать товары с брендом |
| Author entity | Добавить автора / эксперта |
| Reviewer entity | Добавить проверяющего |
| Category entity | Описать категории как отдельные сущности |
| Country entity | Привязка к Украине / региону |
| Language entity | Украинский / русский |
| SameAs links | Соцсети, официальные профили, Wikidata, если есть |
| About / Mentions | Использовать `about`, `mentions`, `sameAs` в JSON-LD |
| Entity home | У каждой важной сущности должна быть каноническая страница или сильный блок |
| Semantic triples | Проектировать связи как `subject -> predicate -> object` |
| ProductGroup | Для вариантов товаров после появления видимой навигации |
| Entity registry | Вести список бренда, организации, серий, моделей, материалов, механизмов и сценариев |

---

## 7. Внутренняя перелинковка

| Элемент | Обязательно |
|---|---|
| Breadcrumbs | Да |
| Related products | Да |
| Related articles | Да |
| Category → product links | Да |
| Product → category links | Да |
| Article → product links | Да |
| Article → category links | Да |
| FAQ → guide links | Да |
| Guide → comparison links | Да |
| Ссылки из сравнений на товары | Да |
| Footer links | Да |
| Описательные contextual anchors | Да; неинформативный CTA дополняется названием страницы назначения в видимом или `sr-only` тексте |
| Прямые ссылки на canonical URL | Да; без alias и redirect |
| Валидные fragment links | Да; каждый `#fragment` существует в rendered HTML |
| Orphan indexable pages | Нет |
| Self-links текущего состояния | По возможности заменять неинтерактивным current-state элементом |
| HTML sitemap | Желательно |
| Hub pages | Да |
| Topic clusters | Да |

---

## 8. Производительность и Core Web Vitals

Подробный локальный playbook для проекта: [12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md).

| Элемент | Обязательно |
|---|---|
| LCP optimization | Да |
| INP optimization | Да |
| CLS optimization | Да |
| Lazy loading images | Да |
| Preload hero image | Да |
| Responsive images | Да |
| WebP output | Да |
| AVIF output | Да, если есть отдельный pipeline |
| Correct image dimensions | Да |
| Font optimization | Да |
| Font preload | Да |
| `font-display: swap` | Да |
| Critical CSS | Желательно |
| Minimal JavaScript | Да |
| CDN caching | Да |
| Brotli / gzip | Да |
| HTTP/2 или HTTP/3 | Да |
| PageSpeed Performance 95–100 | Да |
| Real field data monitoring | Да |

---

## 9. Изображения

| Элемент | Обязательно |
|---|---|
| Source images в хорошем качестве | Да |
| JPEG / PNG / WebP source | Да |
| WebP output | Да |
| AVIF output | Да, если есть отдельный pipeline |
| JPEG fallback | Да |
| Responsive sizes | Да |
| Width / height attributes | Да |
| Lazy loading | Да |
| Eager loading для hero | Да |
| Descriptive alt text | Да |
| ImageObject schema | Желательно |
| Image sitemap | Желательно |
| EXIF cleanup | Да |
| Уникальные изображения | Очень желательно |

---

## 10. Мультиязычность

| Элемент | Обязательно |
|---|---|
| Отдельные URL для языков | Да |
| hreflang | Да |
| `x-default` | Не обязателен; добавлять только при наличии подходящей fallback-страницы для пользователей без совпавшего языка |
| Canonical внутри своей языковой версии | Да |
| Переводы без машинного мусора | Да |
| Уникальные meta title/description | Да |
| Переведённые breadcrumbs | Да |
| Переведённые schema.org поля | Да |
| Переведённые alt-тексты | Да |
| Переведённый sitemap | Да |
| Правильный `lang` в HTML | Да |
| UA как основной язык | Да, для aerocool.ua |

---

## 11. E-Commerce и SEO товаров

| Элемент | Обязательно |
|---|---|
| Product pages | Да |
| Category pages | Да |
| Product schema | Да |
| Offer schema | Да |
| Цена | Да |
| Availability | Да |
| SKU / MPN / GTIN, если есть | Да |
| Brand | Да |
| Reviews | Да, если реальные |
| AggregateRating | Да, если реальные |
| Сравнительные таблицы | Да |
| Pros / cons | Да |
| FAQ | Да |
| Delivery info | Да |
| Warranty info | Да |
| Return policy | Да |
| Merchant Center | Да, если есть продажи |
| Product feed | Да, если есть продажи |
| Availability monitoring | Да |
| Система обновления цен | Да |

---

## 12. Доверие и E-E-A-T

| Элемент | Обязательно |
|---|---|
| About page | Да |
| Contact page | Да |
| Company details | Да |
| Real address, если есть | Да |
| Phone / email | Да |
| Author bio | Да |
| Reviewer bio | Желательно |
| Editorial policy | Желательно |
| Warranty policy | Да |
| Return policy | Да |
| Privacy Policy | Да |
| Terms of Service | Да |
| Real photos | Желательно |
| Real reviews | Да, если есть |
| Brand mentions | Да |
| External citations | Да, где уместно |
| Updated date | Да |
| Last reviewed date | Желательно |

---

## 13. Авторитетность и Authority SEO

| Элемент | Обязательно |
|---|---|
| Backlinks | Да |
| Brand mentions | Да |
| Digital PR | Да |
| Guest posts | Желательно |
| Product reviews на внешних сайтах | Да |
| Local directories | Да |
| Business citations | Да |
| Social profiles | Да |
| YouTube / video presence | Желательно |
| Google Business Profile | Если есть локальный бизнес |
| Partnerships | Желательно |
| Press page | Желательно |

---

## 14. UX и Conversion SEO

| Элемент | Обязательно |
|---|---|
| Mobile-first дизайн | Да |
| Простая навигация | Да |
| Sticky header | Желательно |
| Быстрый поиск | Да |
| Фильтры товаров | Да |
| Сравнительные таблицы | Да |
| Чёткие CTA | Да |
| Кнопка “Купить” / “Узнать цену” | Да |
| FAQ рядом с решением | Да |
| Trust badges | Желательно |
| Reviews block | Да |
| Delivery / warranty рядом с товаром | Да |
| No intrusive popups | Да |
| Accessibility | Да |

---

## 15. Мониторинг и аналитика

| Инструмент | Обязательно |
|---|---|
| Google Search Console | Да |
| Bing Webmaster Tools | Да |
| Google Analytics 4 | Да |
| Plausible / Umami | Альтернатива |
| PageSpeed Insights | Да |
| PageSpeed Insights | Да; в Aerocool используется ручная проверка опубликованных URL |
| CrUX monitoring | Да |
| Server logs analysis | Желательно |
| Broken link checker | Да |
| Redirect checker | Да |
| Sitemap checker | Да |
| Schema validator | Да |
| Rich Results Test | Да |
| Uptime monitoring | Да |
| SEO changelog | Да |
| Rank tracking | Желательно |
| Competitor monitoring | Да |

---

## 16. Безопасность и надежность

| Элемент | Обязательно |
|---|---|
| HTTPS | Да |
| HSTS | Да |
| Security headers | Да |
| CSP | Желательно |
| X-Content-Type-Options | Да |
| Referrer-Policy | Да |
| Permissions-Policy | Да |
| Clean redirects | Да |
| No mixed content | Да |
| Stable deployment | Да |
| Rollback system | Да |
| Backup контента | Да |

---

## 17. PWA и Modern Web

| Элемент | Нужно |
|---|---|
| manifest.webmanifest | Да |
| theme-color | Да |
| icons | Да |
| offline page | Желательно |
| service worker | Желательно |
| app shortcuts | Можно |
| installable PWA | Не всегда обязательно |
| View Transitions API | Желательно для UX |
| Speculation Rules API | Желательно осторожно |
| Search page | Да; в Aerocool сейчас локальная search-страница, Pagefind не установлен |

---

## 18. Видимость в AI и LLM

| Элемент | Желательно |
|---|---|
| Чёткие определения | Да |
| FAQ-структура | Да |
| Таблицы | Да |
| Списки характеристик | Да |
| Entity-rich контент | Да |
| Авторитетные страницы | Да |
| Цитируемые блоки | Да |
| `llms.txt` | Внедрен в `static/llms.txt`; поддерживать как краткую Markdown-карту сайта с ключевыми URL и всеми товарными страницами в `uk`/`ru`, не как P0 ranking lever и не как замену sitemap/schema.org |
| Хорошая структура headings | Да |
| Короткие summary-блоки | Да |
| Glossary | Да |
| Prompt-аудит | Да, через AI Search entity map |
| Citation ownership | Да, если AI-платформы показывают источники |
| Brand sentiment | Да, через ручной AI-аудит |

---

## 19. Финальная формула

```text
Top SEO SSG Website =
Hugo / Astro
+ Clean HTML
+ Perfect Technical SEO
+ Structured Data
+ Entity SEO
+ Topical Authority
+ Strong Internal Linking
+ Excellent Core Web Vitals
+ High-Quality Content
+ Trust / E-E-A-T
+ Backlinks / Mentions
+ Monitoring
+ Continuous Updates
```

---

## Абсолютный минимум для сильного SEO-проекта

```text
1. Hugo / Astro
2. CDN
3. Clean semantic HTML
4. Core Web Vitals
5. sitemap.xml
6. robots.txt
7. canonical
8. hreflang
9. schema.org
10. breadcrumbs
11. internal linking
12. keyword clustering
13. search intent mapping
14. topical map
15. product/category/blog architecture
16. unique content
17. content refresh
18. Search Console
19. analytics
20. backlinks / mentions
```

---

## Для Aerocool-сайта

```text
Hugo
+ Netlify
+ Tailwind CSS
+ локальная search-страница
+ WebP output
+ AVIF, если есть отдельный pipeline
+ PWA
+ schema.org @graph
+ hreflang UA/RU
+ canonical
+ breadcrumbs
+ product pages
+ category pages
+ buying guides
+ comparison pages
+ FAQ
+ topical clusters
+ internal linking
+ Search Console
+ Merchant Center
+ backlinks / brand mentions
```

---

## Итог

Для максимального SEO важен не просто SSG. Важна система:

```text
Техническая база
+ контентная стратегия
+ структура сайта
+ доверие
+ внешняя авторитетность
+ постоянное обновление
```

Для проекта на Hugo это особенно удобно, потому что Hugo даёт полный контроль над HTML, URL, шаблонами, schema.org, мультиязычностью, sitemap, robots.txt, производительностью и структурой сайта.
