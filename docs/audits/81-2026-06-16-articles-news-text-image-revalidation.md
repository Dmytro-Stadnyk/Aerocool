# Итоговый аудит текстов и изображений Articles/News 2026-06-16

Дата аудита: 2026-06-16.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Статус: исторический snapshot. Текущее состояние после более глубокого анализа структуры текстов и визуальной повторяемости зафиксировано в [82-2026-06-18-articles-news-content-image-audit.md](82-2026-06-18-articles-news-content-image-audit.md).

Этот документ фиксирует итоговую повторную проверку `content/articles` и `content/news` после закрытия backlog по inline-изображениям. Он отвечает на три практических вопроса:

1. Нужны ли еще обязательные картинки внутри статей и новостей.
2. Нужны ли дополнительные тексты внутри тела материалов.
3. Какие правила применять дальше, чтобы изображения и текст работали на SEO, SERP, Google Images, structured data и Core Web Vitals в текущем стеке проекта.

## 1. Проверенные источники

Внутренние источники:

- `content/articles`;
- `content/news`;
- `docs/content/34-image-design-playbook-2026.md`;
- `docs/audits/80-2026-06-15-articles-news-inline-image-serp-audit.md`;
- `docs/content/06-seo-image-shortcode.md`;
- `docs/content/07-content-seo-checklist-2026.md`;
- `docs/quality/12-core-web-vitals-guide-2026.md`;
- `docs/seo/20-schema-markup-quality-checklist-2026.md`.

Внешние источники для сверки:

- Google Image SEO best practices: https://developers.google.com/search/docs/appearance/google-images
- Google Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google helpful people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- web.dev Image performance: https://web.dev/learn/performance/image-performance
- web.dev Responsive images: https://web.dev/learn/design/responsive-images
- web.dev Fetch Priority API: https://web.dev/articles/fetch-priority

Практический вывод: top-1 в SERP нельзя гарантировать картинками или объемом текста. Но можно убрать слабые места: нерелевантные visuals, тяжелые файлы, отсутствие representative image variants, текст внутри bitmap вместо HTML, плохие `alt`, слабый LCP и разрыв между изображением, заголовком и соседним абзацем.

## 2. Метод проверки

Проверялись:

- `16` статей в `content/articles`;
- `9` новостей в `content/news`;
- украинские `index.md` и русские `index.ru.md`;
- объем тела без shortcode;
- количество вызовов `seo-image`;
- наличие `01-front.webp`;
- наличие schema crops `01-front-16x9.webp`, `01-front-4x3.webp`, `01-front-1x1.webp`;
- наличие inline-файлов `02-*` / `03-*`;
- размеры и вес production WebP;
- соответствие правилам `34-image-design-playbook-2026.md`.

## 3. Текущее состояние

### Статьи

- Все `16 / 16` статей имеют `01-front.webp` **1536x1024**.
- Все `16 / 16` статей имеют schema crops **16:9**, **4:3**, **1:1**.
- Все `16 / 16` статей имеют по `2` inline-изображения в теле материала.
- Всего в articles используется `32` inline WebP-файла **1200x800**.
- Все украинские и русские версии находятся выше редакционного ориентира **10000+** знаков тела.
- Обязательные дополнительные картинки сейчас не нужны.
- Обязательный добор текста сейчас не нужен.

### Новости

- Все `9 / 9` новостей имеют `01-front.webp` **1536x1024**.
- Все `9 / 9` новостей имеют schema crops **16:9**, **4:3**, **1:1**.
- Все `9 / 9` новостей имеют `1-2` inline-изображения в теле материала.
- Всего в news используется `12` inline WebP-файлов **1200x800**.
- Все украинские и русские версии находятся выше редакционного ориентира **5000+** знаков тела.
- Обязательные дополнительные картинки сейчас не нужны.
- Обязательный добор текста сейчас не нужен.

### Техническое состояние

- Primary cover: **1536x1024** WebP.
- Article/news schema crops: **1600x900**, **1200x900**, **1200x1200** WebP.
- Inline editorial images: **1200x800** WebP.
- Inline images выводятся через `seo-image`, а не через сырой HTML.
- Inline images используют lazy-режим и не конкурируют с LCP.
- Главный production-риск: ручная визуальная приемка AI-assisted изображений, а не отсутствие файлов.

## 4. Поштучные рекомендации по Articles

| Материал | Текст | Картинки | Рекомендация |
|---|---|---|---|
| `best-chair-for-home-office` | Объем и интент закрыты. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. В будущем можно добавить factual room-fit фото только при наличии официального asset. |
| `chair-for-computer-work` | Объем и коммерческий интент закрыты. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Возможный future asset: крупный desk/armrest/workday detail. |
| `chair-for-posture-and-long-work` | Объем закрыт, medical claims не используются. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Сохранять осторожный ergonomic language без лечебных обещаний. |
| `chair-setup-after-purchase` | Пошаговая структура закрыта. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: короткая схема сборки только если появится официальный setup asset. |
| `chairs-for-office-team` | B2B-сценарии закрыты. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: реальный office fleet/in-scale visual при наличии официальной съемки. |
| `gaming-chair-long-sessions` | Gaming-интент закрыт через практику, а не только дизайн. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: material close-up из official gallery. |
| `how-to-choose-aerocool-chair` | Центральный guide закрыт. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: обновлять только при изменении состава серий. |
| `how-to-choose-chair-by-adjustability` | Регулировки раскрыты достаточно. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: factual close-up механизмов **7D/8D/11D**. |
| `racer-vs-loft-air-vs-mesh-materials` | Материальный интент закрыт. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: заменить AI macro на официальные material macro при появлении. |
| `sky-light-vs-sky-360-guide` | Сравнение моделей закрыто. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: side/back official comparison. |
| `sky-vs-wing-vs-xtal` | Hub-сравнение закрыто. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: обновлять при изменении линейки. |
| `sync4-sync5-mechanism-guide` | Механизм раскрыт хорошо. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: factual underside/mechanism photo. |
| `what-is-dual-backrest` | Feature-интент закрыт. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: реальный close-up разделенной спинки. |
| `what-is-fully-replaceable-design` | Модульная логика закрыта. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: official exploded/detail asset, если он появится. |
| `what-is-synchronous-tilt-guide` | Термин объяснен через движение и сравнение. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: factual mechanism close-up. |
| `wing-vs-xtal-comparison` | Сравнение платформ закрыто. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: official side-by-side by exact SKU. |

## 5. Поштучные рекомендации по News

| Материал | Текст | Картинки | Рекомендация |
|---|---|---|---|
| `2026-04-15-aerocool-sky-series-launch` | Новостной объем и состав серии закрыты. | Cover + 1 inline есть. | Новые обязательные картинки не нужны. Future: обновлять при новом SKU/поставке. |
| `2026-04-16-aerocool-wing-series-launch` | Инфоповод раскрыт через feature и материалы. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: official material variants. |
| `2026-04-17-aerocool-xtal-series-launch` | Инфоповод раскрыт через replaceable design и варианты. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. Future: official replaceable component detail. |
| `2026-04-18-aerocool-sky-360-launch` | Модельный запуск закрыт. | Cover + 1 inline есть. | Новые обязательные картинки не нужны. Future: mechanism close-up. |
| `2026-04-19-aerocool-sky-light-launch` | Модельный запуск закрыт. | Cover + 1 inline есть. | Новые обязательные картинки не нужны. Future: compact workplace/in-scale photo. |
| `2026-04-20-aerocool-loft-air-and-mesh-focus` | Материальная новость закрыта. | Cover + 2 inline есть. | Новые обязательные картинки не нужны. P3: переэкспортировать cover легче, если можно сохранить качество. |
| `2026-04-30-aerocool-sync4-sync5-mechanism-update` | Уточнение механизмов закрыто. | Cover + 1 inline есть. | Новые обязательные картинки не нужны. Future: official mechanism photo. |
| `2026-05-21-aerocool-chair-selection-guides-update` | Content update закрыт через карту гайдов. | Cover + 1 inline есть. | Новые обязательные картинки не нужны. Future: обновлять при добавлении новых гайдов. |
| `2026-05-21-aerocool-practical-chair-guides-update` | Content update закрыт через практический маршрут. | Cover + 1 inline есть. | Новые обязательные картинки не нужны. Future: обновлять при добавлении новых практических материалов. |

## 6. Единые правила для будущих текстов

- Не добирать объем ради числа знаков: добавлять только новые сценарии, сравнения, FAQ, product facts, внутренние ссылки или уточнения, которые помогают выбору кресла.
- Все важные характеристики, сравнения, FAQ, цены, условия, размеры и маршруты выбора должны оставаться HTML-текстом, а не текстом внутри bitmap.
- Украинская и русская версии должны оставаться синхронными по смыслу, структуре и набору изображений.
- `lastmod` обновлять при каждом содержательном изменении.
- Для новых статей целиться в **10000+** знаков тела на каждую языковую версию.
- Для новостей с органической задачей целиться в **5000+** знаков тела на каждую языковую версию.
- Не создавать новые статьи и новости без отдельного интента из keyword/semantic strategy или реального инфоповода.

## 7. Единые правила для будущих изображений

### Размеры и форматы

| Тип | Размер | Формат | Приоритет |
|---|---:|---|---|
| Article/news cover | **1536x1024** | WebP | LCP/primary |
| Article/news 16:9 crop | **1600x900** | WebP | schema/Search |
| Article/news 4:3 crop | **1200x900** | WebP | schema/Search |
| Article/news 1:1 crop | **1200x1200** | WebP | schema/Search |
| Inline article/news | **1200x800** | WebP | lazy |
| Wide inline comparison | **1200x675** | WebP | lazy, только при явной нужде |
| Section/root/fallback cover | **1536x1024** | WebP | listing/fallback |
| Home hero | **2102x1401** | WebP | LCP |

### Loading и Hugo

- Article/news cover: первый `seo-image`, `loading="eager"`, `preload=true`, `fetchpriority=high`.
- Inline `02-*` / `03-*`: `loading="lazy"`, `preload=false`, `fetchpriority=auto`.
- Все видимые контентные изображения выводить через `seo-image`.
- Для product gallery не использовать стартовый `seo-image`; товарный слой идет через gallery partial.
- Не использовать CSS background для SEO-critical images.
- `width`, `height`, `alt`, `sizes` обязательны.

### Визуальный ДНК

- Обложки, fallback, section covers и hero: tactile/high-tech/AI-assisted storytelling, graphite/glass/cyan/violet, реальная продуктовая геометрия Aerocool.
- Inline-изображения: смысловой explainer, material close-up, mechanism detail, scenario map или model lineup.
- Product primary/gallery: factual product standard важнее художественности.
- Corner logo нужен только на cover/category/fallback по правилам `34-image-design-playbook-2026.md`; inline и home hero его не используют.
- Бренд на кресле должен выглядеть как печать, тиснение или вышивка на материале, а не наклейка.
- Не публиковать изображения со случайным текстом, fake UI, лишними колесами, сломанной базой, медицинскими символами или fantasy-chair формой.

## 8. Остаточные рекомендации

P2:

1. Провести ручную визуальную приемку всех новых inline-файлов `02-*` / `03-*` после деплоя.
2. На самых важных URL сверить mobile crop и desktop rendering в реальном браузере.

P3:

1. Точечно переэкспортировать `content/news/2026-04-20-aerocool-loft-air-and-mesh-focus/01-front.webp`, если можно снизить вес без видимой деградации.
2. После появления данных Google Search Console проверить CTR/Images impressions по статьям и новостям.
3. При появлении официальных material/mechanism/product gallery assets заменить часть AI-assisted inline-изображений на factual close-ups.

Новые обязательные тексты или изображения сейчас не рекомендуются: сначала нужно получить production-данные, ручную визуальную приемку и новые реальные инфоповоды.

## 9. Оценка

| Направление | Оценка |
|---|---:|
| Глубина текстов articles | **9.3 / 10** |
| Глубина текстов news | **9.1 / 10** |
| Покрытие изображениями | **9.2 / 10** |
| Техническое SEO изображений | **9.1 / 10** |
| Визуальное разнообразие и ручной QA | **8.7 / 10** |
| Performance-профиль изображений | **8.9 / 10** |

Итоговая оценка `content/articles` и `content/news`: **9.1 / 10**.

Почему не **10 / 10**:

- нет внешней валидации по Google Search Console, PageSpeed Insights и production CTR;
- часть AI-assisted изображений требует ручной визуальной приемки после деплоя;
- один cover-файл немного тяжелее целевого диапазона;
- product gallery assets проекта пока не дают достаточно реальных material/mechanism close-ups, чтобы полностью заменить AI-assisted explainers.

Что поднимет оценку до **9.4-9.5 / 10**:

1. Ручное утверждение всех новых inline-изображений без дефектов.
2. Точечная оптимизация тяжелого cover.
3. Подтверждение через production PageSpeed Insights и Google Search Console.
4. Постепенная замена AI-assisted details официальными factual product close-ups там, где они появятся.
