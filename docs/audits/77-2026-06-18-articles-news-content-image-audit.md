# Полный Аудит Текстов И Изображений Articles/News 2026-06-18

Дата аудита: 2026-06-18.

Этот документ заменяет аудит `75` как текущий итоговый источник по `content/articles` и `content/news`. Аудит охватывает тексты двух языков, структуру аргумента, внутренние ссылки, front matter, обложки, schema crops, inline-изображения, Hugo shortcodes, performance и соответствие визуальному ДНК проекта.

## 1. Проверенный Объем

- `16` evergreen-статей и `9` новостей;
- `50` локализованных markdown-файлов: украинский `index.md` и русский `index.ru.md`;
- `25` primary covers `01-front.webp`;
- `75` schema crops: по одному **16:9**, **4:3**, **1:1** на материал;
- `44` inline-изображения `02-*` / `03-*`;
- `2` section covers;
- всего `146` WebP-файлов объемом около **14.78 MiB**.

Проверялись размеры, вес, формат, ссылки на файлы, параметры `seo-image`, loading priority, локализация, точные дубликаты, logo lockup, композиционное разнообразие и соответствие изображения соседнему тексту.

## 2. Сверка С Актуальными Источниками

Проверены официальные рекомендации:

- Google Image SEO: https://developers.google.com/search/docs/appearance/google-images
- Google Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google helpful people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Google guidance on generative AI content: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- web.dev Image performance: https://web.dev/learn/performance/image-performance
- web.dev Responsive images: https://web.dev/learn/design/responsive-images
- Hugo Image processing: https://gohugo.io/content-management/image-processing/

Вывод для проекта:

- top-1 нельзя гарантировать длиной текста, количеством картинок или schema.org;
- Google не устанавливает предпочтительный объем текста и прямо предостерегает от написания ради word count;
- для AI Overviews и AI Mode не нужны специальные AI-файлы или отдельная schema-разметка;
- важны people-first текст, доступный HTML, внутренние ссылки, качественные изображения, согласованная structured data и хороший page experience;
- изображения должны находиться в HTML через `<img>` / `<picture>`, иметь `src` fallback, descriptive `alt` и быть рядом с релевантным текстом;
- для `Article` / `NewsArticle` полезен набор representative images **16:9**, **4:3**, **1:1**;
- WebP полностью поддерживается Google и является processable image resource в Hugo `0.164.0`.

## 3. Текущее Состояние Текстов

### Статьи

- Украинские версии: примерно **10811-17157** знаков тела с учетом shortcode-разметки.
- Русские версии: примерно **11011-17750** знаков тела с учетом shortcode-разметки.
- Все статьи имеют FAQ, внутренние ссылки, переходы в каталог и по два inline-изображения.
- Точных дублированных длинных абзацев не найдено.
- Базовая полнота интента высокая; массово дописывать новые абзацы не нужно.
- В шести ранее проблемных статьях удалены ранние краткие дубли, inline-изображения перенесены к релевантным таблицам и оставлен один финальный вывод.

### Новости

- Украинские версии: примерно **6936-7633** знаков тела с учетом shortcode-разметки.
- Русские версии: примерно **7078-7945** знаков тела с учетом shortcode-разметки.
- Все новости имеют реальный заявленный инфоповод, внутренние ссылки и один-два inline-визуала.
- Сильной массовой каннибализации не найдено.
- Наиболее близкая пара: `sync4-sync5-mechanism-guide` и `2026-04-30-aerocool-sync4-sync5-mechanism-update`; новость должна оставаться кратким обновлением, а evergreen-объяснение принадлежит статье.

### Изображения

- Все `25` covers имеют **1536x1024** и единый official logo lockup в верхнем левом углу.
- Все `75` schema crops имеют правильные размеры: **1600x900**, **1200x900**, **1200x1200**.
- Ручной contact-sheet review crops не выявил обрезанного логотипа, критически обрезанного кресла или потерянного главного объекта.
- Все `44` inline-файла имеют **1200x800**, корректно существуют рядом с markdown и используют lazy policy.
- Битых image refs, raw `<img>`, markdown image syntax, ошибочных loading parameters и точных дубликатов не найдено.

## 4. Исправления По Итогам Аудита

### P1. Ранние Выводы И Склеенные Версии Статей Исправлены

В следующих статьях `Висновок` / `Вывод` стоит примерно после первой четверти текста, а затем начинается второй большой смысловой блок:

1. `how-to-choose-aerocool-chair`;
2. `how-to-choose-chair-by-adjustability`;
3. `racer-vs-loft-air-vs-mesh-materials`;
4. `sky-light-vs-sky-360-guide`;
5. `what-is-synchronous-tilt-guide`;
6. `wing-vs-xtal-comparison`.

В обеих локализациях удалены ранние краткие версии, повторявшие расширенную часть. Полезные inline-изображения не удалены: они перенесены к релевантным таблицам и decision-блокам. В каждой статье теперь остается один финальный `Висновок` / `Вывод`, а `lastmod` обновлен до `2026-06-18`.

После правки все шесть статей сохраняют по три визуала, внутренние ссылки, продуктовые факты и объем более **10000** знаков тела с учетом shortcode-разметки.

### P3. Вес Изображений Приведен К Warning-Порогам

Без изменения композиции, размеров и logo lockup переэкспортированы:

- `content/news/2026-04-20-aerocool-loft-air-and-mesh-focus/01-front.webp`: **365422 -> 298954 bytes**;
- его crop `01-front-16x9.webp`: **264540 -> 256856 bytes**;
- `content/articles/racer-vs-loft-air-vs-mesh-materials/01-front.webp`: **305432 -> 265878 bytes**.

После повторной проверки covers, schema crops и inline-файлы не превышают warning-пороги раздела 9.

### P3. OS Metadata Удалены

Локальный `content/articles/.DS_Store` удален. В `content/articles` и `content/news` служебных `.DS_Store` больше нет.

## 5. Оставшиеся Улучшения

### P2. Недостаточно Factual Evidence В Изображениях

Текущий editorial/high-tech слой сильный, но official product evidence пока ограничен. При появлении официальных assets приоритетно заменить, а не дополнить:

- AI material panels — реальными macro-фото Racer, Loft Air и Mesh;
- условные mechanism diagrams — реальными фото механизма, рычагов и нижней части сиденья;
- концептуальные lineups — точными side-by-side изображениями конкретных SKU;
- generic room scenes — реальными in-scale фотографиями кресла у рабочего стола.

### P2. Композиционная Повторяемость

Точных файловых и pixel-дубликатов нет. Но многие covers и inline-изображения используют одну схему: кресло по центру темной студии, cyan/violet линии, подсвеченная платформа. Это удерживает бренд, но снижает различимость карточек и editorial storytelling.

Для новых материалов нужно чередовать роли: room context, top-down, macro, side profile, exploded component view, mechanism close-up, lineup, before/after setup и factual product comparison.

Оба пункта являются направлениями дальнейшего улучшения, а не локальными техническими дефектами. Массово заменять уже утвержденные изображения без точных official assets нельзя.

## 6. Рекомендации По Каждой Статье

| Статья | Текст | Изображения |
|---|---|---|
| `best-chair-for-home-office` | Новые блоки не нужны. При наличии данных добавить только реальные размеры помещения/стола как проверяемый checklist. | Не добавлять третью AI-сцену. Future replacement: factual in-scale home-office photo. |
| `chair-for-computer-work` | Текст полный. Усиливать только официальными размерами и control mapping конкретных моделей. | Future replacement: armrest/desk-height close-up из official asset. |
| `chair-for-posture-and-long-work` | Не расширять medical language. При новых утверждениях нужны авторитетные источники и четкие границы рекомендаций. | Текущих двух visuals достаточно; future replacement — factual seat/backrest support close-up. |
| `chair-setup-after-purchase` | Добавлять только model-specific действия из официальных инструкций. | Future replacement: реальные controls и механизм; не добавлять еще одну общую workstation-сцену. |
| `chairs-for-office-team` | Полнота высокая. Future value: procurement matrix с подтвержденными ограничениями и процессом тестовой посадки. | Future replacement: реальная fleet/in-scale съемка. |
| `gaming-chair-long-sessions` | Новые абзацы не нужны. Усиливать только factual seat/material data. | Future replacement: official material macro или side profile. |
| `how-to-choose-aerocool-chair` | Исправлено: одна последовательная аргументация и один финальный вывод. | Текущих двух visuals достаточно; обновлять только при изменении линейки. |
| `how-to-choose-chair-by-adjustability` | Исправлено: ранний дубль удален, объяснение **7D/8D/11D** собрано в одной последовательности. | Future replacement: реальные control close-ups для каждого уровня. |
| `racer-vs-loft-air-vs-mesh-materials` | Исправлено: повторяющиеся material sections объединены, один вывод оставлен в конце. | Priority replacement: official macro Racer/Loft Air/Mesh; новых AI-картинок не добавлять. |
| `sky-light-vs-sky-360-guide` | Исправлено: ранний итог удален, decision path ведет к одному финальному выводу. | Future replacement: exact SKU side/back comparison. |
| `sky-vs-wing-vs-xtal` | Текст логичный и полный. Обновлять при изменении состава серий. | Текущих двух visuals достаточно; future exact lineup предпочтительнее новой иллюстрации. |
| `sync4-sync5-mechanism-guide` | Не расширять. Добавить visible source/provenance только при наличии официальной инструкции или product sheet. | Priority replacement: factual underside/mechanism photos. |
| `what-is-dual-backrest` | Текст полный. Усиливать только проверяемым описанием конструкции. | Future replacement: official close-up dual backrest. |
| `what-is-fully-replaceable-design` | Текст полный. Не обещать доступность сменных деталей без подтверждения. | Future replacement: official exploded component view. |
| `what-is-synchronous-tilt-guide` | Исправлено: ранний дубль удален, техническое объяснение и практический выбор образуют одну дугу. | Future replacement: real mechanism sequence; текущих двух visuals достаточно. |
| `wing-vs-xtal-comparison` | Исправлено: ранний вывод удален, две схемы разведены по смысловым блокам, финальный вывод один. | Future replacement: exact WING/XTAL SKU side-by-side. |

## 7. Рекомендации По Каждой Новости

| Новость | Текст | Изображения |
|---|---|---|
| `2026-04-15-aerocool-sky-series-launch` | Новые блоки не нужны; обновлять только при реальном изменении линейки или поставки. | Future replacement: official SKY Light/360 lineup. |
| `2026-04-16-aerocool-wing-series-launch` | Не расширять evergreen-объяснения; вести в WING guide/product pages. | Future replacement: official dual-backrest и material variants. |
| `2026-04-17-aerocool-xtal-series-launch` | Не добавлять обещания о сменных деталях без подтвержденной доступности. | Future replacement: official replaceable component detail. |
| `2026-04-18-aerocool-sky-360-launch` | Добавлять только подтвержденные изменения товара, availability или specification. | Future replacement: official adjustment controls/mechanism close-up. |
| `2026-04-19-aerocool-sky-light-launch` | Текст достаточен; не превращать новость в второй evergreen guide. | Future replacement: real compact workplace photo. |
| `2026-04-20-aerocool-loft-air-and-mesh-focus` | Не расширять: evergreen material intent принадлежит статье. | Cover и 16:9 crop оптимизированы; future official material macro. |
| `2026-04-30-aerocool-sync4-sync5-mechanism-update` | Сократить повтор evergreen-объяснения при будущей редактуре; новость фиксирует изменение, статья объясняет механизм. | Future replacement: official SYNC4/SYNC5 product evidence. |
| `2026-05-21-aerocool-chair-selection-guides-update` | Обновлять список только при выпуске новых guides. | Текущего одного inline visual достаточно. |
| `2026-05-21-aerocool-practical-chair-guides-update` | Обновлять только при реальном расширении practical cluster. | Текущего одного inline visual достаточно. |

## 8. Текстовый Регламент 2026

1. Один URL — один основной интент и одна последовательная аргументационная дуга.
2. Один итог — в конце материала. После `Вывод/Висновок` нельзя начинать новый крупный смысловой блок.
3. Word count — редакционный ориентир, не цель. Нельзя дописывать материал ради числа знаков.
4. Каждый новый раздел должен добавлять факт, сценарий, критерий, доказательство, сравнение или следующий шаг.
5. Для factual claims указывать происхождение: product page, official product sheet, инструкция, подтвержденное бизнес-значение.
6. Who/How/Why должны быть понятны через editorial note, About, видимый текст и реальную причину публикации.
7. Важные факты остаются HTML-текстом; bitmap не заменяет таблицу, FAQ, цену, спецификацию или условия.
8. Украинская и русская версии синхронны по структуре, фактам, изображениям и внутренним ссылкам.
9. `lastmod` меняется только при содержательном обновлении.
10. Для Google AI features не создавать специальные `llms.txt`, AI schema или скрытые summaries ради ранжирования: применяются обычные SEO fundamentals.

## 9. Image DNA И Технический Стандарт

### Визуальная Иерархия

1. Factual evidence: официальное фото модели, материала, механизма или масштаба.
2. Factual composite: официальный cutout в контролируемой editorial-сцене.
3. AI-assisted explainer: только когда он объясняет идею, которую нельзя показать официальным asset.
4. Pure AI chair: последний вариант, требующий полного defect review.

### Размеры И Форматы

| Тип | Размер | Формат | Preferred вес |
|---|---:|---|---:|
| Article/news cover | **1536x1024** | WebP | **80-260 КБ**, warning после **300 КБ**, hard cap **400 КБ** |
| Article/news 16:9 | **1600x900** | WebP | **50-260 КБ** |
| Article/news 4:3 | **1200x900** | WebP | **50-240 КБ** |
| Article/news 1:1 | **1200x1200** | WebP | **60-280 КБ** |
| Inline editorial | **1200x800** | WebP | **60-220 КБ**, warning после **280 КБ**, hard cap **350 КБ** |
| Wide comparison | **1200x675** | WebP | **60-220 КБ** |
| Section/fallback | **1536x1024** | WebP | **80-280 КБ** |
| Home hero | **2102x1401** | WebP | **140-420 КБ** |
| Product factual | source-dependent | PNG/WebP/JPEG | без потери проверяемости товара |

Минимального обязательного веса нет: файл ниже preferred диапазона считается нормальным, если нет banding, blur, color blocking и потери фактуры.

### Delivery Для Hugo 0.164.0

- page bundle resources и `seo-image` остаются основным pipeline;
- primary cover: `eager`, `preload=true`, `fetchpriority=high`;
- secondary inline: `lazy`, `preload=false`, `fetchpriority=auto`;
- обязательны `width`, `height`, `sizes`, localized `alt` и `src` fallback;
- WebP остается production standard;
- AVIF допустим только как дополнительный Hugo-generated `<source>` после измерения build time и byte savings; AVIF-only delivery запрещен;
- один LCP-кандидат и один matching responsive preload на страницу;
- сохранять sRGB, применять auto-orient и удалять лишние EXIF/XMP/IPTC, если metadata не нужна для лицензии.

### Разнообразие

- не повторять одну композицию на соседних карточках листинга;
- не использовать новую dark-studio chair scene, если тот же смысл можно раскрыть macro, side profile, room context или mechanism detail;
- точных дубликатов между URL быть не должно;
- визуально близкий asset допустим только при другой доказуемой смысловой роли;
- corner logo используется только на cover/category/fallback; inline и home hero его не используют;
- бренд на кресле выглядит как печать, вышивка или тиснение, а не sticker overlay.

## 10. Оценка

| Направление | Оценка |
|---|---:|
| Полнота текстов | **9.2 / 10** |
| Редакционная структура | **9.4 / 10** |
| Интенты и внутренняя перелинковка | **9.1 / 10** |
| Покрытие изображениями | **9.5 / 10** |
| Техническое SEO изображений | **9.5 / 10** |
| Визуальное разнообразие | **8.2 / 10** |
| Factual product evidence | **8.0 / 10** |
| Performance | **9.5 / 10** |

Итоговая оценка `content/articles` и `content/news`: **9.1 / 10**.

Локальные P1/P3-дефекты, найденные этим аудитом, исправлены. Оценку ограничивают не объем текста и не техническая валидность файлов, а два содержательных фактора: недостаток официальных factual close-ups и композиционная повторяемость части уже утвержденного AI-assisted слоя.

До **9.4-9.6/10** нужны:

1. Замена ключевых AI material/mechanism visuals официальными close-ups после получения точных source assets.
2. Снижение композиционной повторяемости будущих covers и inline-assets.
3. Production-проверка через PageSpeed Insights, Search Console и реальные CTR/Images impressions.
