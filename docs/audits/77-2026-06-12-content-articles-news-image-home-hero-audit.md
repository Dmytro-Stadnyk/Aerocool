# Аудит Content Articles/News и Home Hero 2026-06-12

Дата аудита: 2026-06-12.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот документ фиксирует полный текущий аудит `content/articles`, `content/news` и связанного image-слоя после приведения обложек, schema crops и `assets/images/home-hero85.webp` к регламенту [34-image-design-playbook-2026.md](../content/34-image-design-playbook-2026.md).

## 1. Область проверки

Проверены:

- все markdown-файлы `content/articles/**/index.md` и `content/articles/**/index.ru.md`;
- все markdown-файлы `content/news/**/index.md` и `content/news/**/index.ru.md`;
- все page bundle изображения `content/articles/**/01-front*.webp` и `content/news/**/01-front*.webp`;
- section covers `content/articles/cover.webp` и `content/news/cover.webp`;
- Tailwind Plus split hero image главной `assets/images/home-hero85.webp`;
- соответствие front matter, `seo-image`, schema crop-наборов, размеров, форматов и визуального lockup-стандарта.

## 2. Методика

Аудит выполнен по проектным документам:

- [05-front-matter-reference.md](../content/05-front-matter-reference.md);
- [07-content-seo-checklist-2026.md](../content/07-content-seo-checklist-2026.md);
- [34-image-design-playbook-2026.md](../content/34-image-design-playbook-2026.md);
- [20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md);
- [12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md).

Проверка включала:

- машинную проверку обязательных front matter полей;
- проверку парности `uk` / `ru`;
- проверку отсутствия markdown `# H1` в теле страниц;
- проверку отсутствия видимых inline-code обратных кавычек в контенте;
- проверку наличия первого `seo-image` в статьях и новостях;
- проверку минимальной глубины текста;
- проверку WebP-only состава изображений в `content/articles` и `content/news`;
- проверку размеров `01-front.webp`, `01-front-16x9.webp`, `01-front-4x3.webp`, `01-front-1x1.webp`;
- визуальную проверку контакт-листов по логотипам, crop-дефектам, однотипности и смысловой релевантности изображений.

## 3. Итог по текстам

Статус: **PASS**.

Фактические счетчики:

| Метрика | Значение |
|---|---:|
| Проверено markdown-файлов | 50 |
| Проверено page bundles | 25 |
| Файлов статей | 32 |
| Файлов новостей | 18 |
| Минимальная длина статьи | 11118 знаков |
| Средняя длина статьи | 13069 знаков |
| Минимальная длина новости | 6144 знака |
| Средняя длина новости | 6475 знаков |

Нарушений не найдено:

- `title`, `description`, `date`, `lastmod`, `image`, `cover.image`, `cover.alt`, `cover.relative`, `cover.hiddenInSingle`, `schema_types` заполнены;
- украинские и русские версии присутствуют для всех проверенных материалов;
- markdown `# H1` в теле страниц не найден;
- видимые inline-code обратные кавычки в `content/articles` и `content/news` не найдены;
- первый `seo-image` присутствует;
- тексты превышают текущие редакционные ориентиры: статьи **10000+** знаков, новости **5000+** знаков.

## 4. Итог по изображениям Articles/News

Статус: **PASS**.

Фактическая размерная матрица:

| Тип | Размер | Количество |
|---|---:|---:|
| Main article/news covers и section covers | **1536x1024** | 27 |
| Schema crops 16:9 | **1600x900** | 25 |
| Schema crops 4:3 | **1200x900** | 25 |
| Schema crops 1:1 | **1200x1200** | 25 |

Нарушений не найдено:

- PNG/JPG/JPEG/AVIF в `content/articles` и `content/news` не осталось;
- все page bundle обложки используют WebP;
- все article/news bundles имеют полный набор `01-front.webp`, `01-front-16x9.webp`, `01-front-4x3.webp`, `01-front-1x1.webp`;
- `content/articles/cover.webp` и `content/news/cover.webp` имеют размер **1536x1024**;
- официальный logo lockup визуально стоит в одном верхнем левом safe area;
- дубли логотипа снизу, справа, по центру или в случайных местах не обнаружены;
- явных UI-like панелей, случайного текста, заголовков внутри изображения, cropped logo или cropped top edge не обнаружено.

Временные контакт-листы для визуального QA созданы в `/private/tmp/aerocool-content-image-audit-2026-06-12/`.

## 5. Исправление Hero главной страницы

Статус после исправления: **PASS**.

Было:

- `assets/images/home-hero85.webp` имел размер **1023x1537**;
- визуально это был factual product кадр на белом фоне, а не high-tech/tactile hero главной;
- изображение не соответствовало роли `Home hero` в playbook.

Стало:

- `assets/images/home-hero85.webp` имеет размер из hero-кода **2102x1401**;
- формат: WebP;
- вес после финальной оптимизации: около **61 KB**;
- визуальный слой: утвержденный dark article-cover direction на основе обложки `content/articles/how-to-choose-aerocool-chair/01-front.webp`: темный graphite high-tech studio, cold cyan light, центральная продуктовая композиция;
- верхний, нижний и боковые края визуально согласованы для темного cover-derived hero;
- бренд Aerocool виден на самом кресле как интегрированная печать/тиснение на материале;
- corner logo отсутствует: бренд остается только на самом кресле, чтобы не дублировать логотип сайта в шапке;
- заголовков, бейджей, случайного текста и рекламных плашек нет.
- `layouts/_shortcodes/home-hero.html` и `layouts/_partials/_seo/lcp-image-preload.html` используют одинаковые `sizes` и `srcset` под Tailwind Plus hero image: **320**, **480**, **640**, **768**, **1024**, **1280**, **1600**, **2102**.
- Дополнительная проверка **2026-06-13**: browser-аудит локальной главной показал, что глобальное правило темы `.post-content img` добавляло hero-картинке `margin: 1rem 0`; на desktop изображение выходило ниже hero-секции на **16 px**, а секция с `overflow-hidden` визуально подрезала низ. В `assets/css/main.css` добавлена более специфичная защита `.post-content .home-hero__image` с `margin: 0`, `border-radius: 0.375rem` и `object-position: center bottom`.
- В `public/images` удалены stale generated variants `home-hero85_hu_*.webp` от прошлых hero-версий; после сборки должны остаться только актуальные 8 responsive-файлов.

## 6. Текущая оценка

Оценка `content/articles` и `content/news` по текстам, изображениям и связанным SEO/image требованиям: **9.4 / 10**.

Почему не **10/10**:

- часть визуального QA по логотипам и бренду на креслах остается ручной, потому что автоматический image-дефект-чекер пока не реализован;
- schema crops сейчас технически корректны, но для самых важных URL в будущем можно делать отдельную art-direction версию, а не только crop от основного кадра;
- редакционная глубина текстов соответствует текущим ориентирам, но после появления реальных данных Google Search Console стоит отдельно проверить CTR, интенты и каннибализацию.

## 7. Открытые рекомендации

P2:

- добавить проектный QA-скрипт для `content/articles` и `content/news`, который проверяет обязательные front matter поля, WebP-only, размеры cover/crop-файлов, наличие `seo-image`, длину текста и парность локализаций;
- для топовых URL после первых реальных GSC-данных пересмотреть `title`, `description`, интро и визуальный первый экран по фактическому CTR.

P3:

- хранить утвержденные contact sheets или reject examples для будущей визуальной QA-сверки;
- постепенно делать ручную art-direction для schema crops самых коммерчески важных статей и новостей.

## 8. Проверка

После исправлений нужно запускать:

```bash
npm run build
```

Ожидаемый результат: сборка проходит, `Static files` остается **17** для текущего чистого состава `static/`, article/news images проходят через Hugo image pipeline, а `assets/images/home-hero85.webp` рендерится как global image resource через `layouts/_shortcodes/home-hero.html` с `width=2102`, `height=1401`, responsive `srcset` и `fetchpriority="high"`.
