# Полный ручной аудит изображений проекта — 2026-06-13

Дата аудита: 2026-06-13.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

Этот документ фиксирует текущий ручной аудит всех проектных изображений `Aerocool Ukraine` и связанных правил вывода: content covers, article/news bundles, schema crops, fallback, home hero, product gallery, favicon/logo assets и build hygiene.

## 1. Принятые решения владельца проекта

1. Автоматический npm-аудит изображений не используется.
2. Автоочистка publishDir в `npm run build`, `npm run build:production` и Netlify build command не используется.
3. Локальный `public/` при необходимости очищается вручную владельцем проекта.
4. Файлы `content/products/sky/light/light.png` и `content/products/sky/360/360.png` остаются в проекте как тестовые product gallery assets и не удаляются автоматически.

Эти решения важны для интерпретации аудита: тестовые product gallery assets считаются осознанным test fixture, а не случайно забытым файлом.

## 2. Область проверки

Проверены вручную:

- `assets/images/home-hero85.webp`;
- все изображения в `content/`;
- все изображения в `static/`;
- fallback-файлы `static/images/default-*.webp`;
- favicon, touch icons, pinned tab SVG и `static/images/logo.svg`;
- front matter связки `image` + `cover.image` + `cover.alt`;
- первые `seo-image` в `content/articles` и `content/news`;
- product primary images и дополнительные image-файлы в product page bundles;
- локальный build output после `npm run build`.

Не считаются source image-контентом:

- `public/` — build output, который может чиститься вручную;
- `resources/` — Hugo image cache;
- `themes/PaperMod/images/` — upstream theme assets.

## 3. Что исправлено

### P1. Section/Series/Root Covers были 1200x630

Приведены к стандарту **1536x1024 WebP**:

- `content/cover.webp`;
- `content/about/cover.webp`;
- `content/contact/cover.webp`;
- `content/faq/cover.webp`;
- `content/products/cover.webp`;
- `content/products/sky/cover.webp`;
- `content/products/wing/cover.webp`;
- `content/products/xtal/cover.webp`.

Также сохранены уже корректные:

- `content/articles/cover.webp`;
- `content/news/cover.webp`.

Для исправленных cover-файлов использована текущая high-tech сцена, full-bleed crop под **1536x1024**, мягкая dark vignette-зона в левом верхнем углу и официальный logo lockup из `static/images/logo.svg` в позиции **x=34**, **y=34**.

### P2. Hygiene-файлы

Удалены лишние `.DS_Store`:

- `.DS_Store`;
- `assets/.DS_Store`;
- `content/.DS_Store`;
- `content/articles/.DS_Store`.

Такие файлы не нужны проекту и не должны попадать в build hygiene-аудит.

### P2. документация синхронизирована с ручным Workflow

Обновлены:

- `README.md`;
- `AGENTS.md`;
- `docs/01-documentation-map.md`;
- `docs/content/34-image-design-playbook-2026.md`;
- `docs/audits/73-2026-06-05-full-ux-ui-revalidation-audit.md`;
- `docs/audits/76-2026-06-12-seo-image-product-gallery-documentation-audit.md`;
- `docs/deploy/17-netlify-database-reviews.md`.

Документация больше не требует отдельного image-audit script и не рекомендует автоочистку publishDir.

## 4. Текущий статус по типам изображений

| Тип | Статус | Комментарий |
|---|---|---|
| Article covers | **PASS** | `01-front.webp` **1536x1024**, WebP. |
| Article schema crops | **PASS** | `16:9`, `4:3`, `1:1` присутствуют для всех bundles. |
| News covers | **PASS** | `01-front.webp` **1536x1024**, WebP. |
| News schema crops | **PASS** | `16:9`, `4:3`, `1:1` присутствуют для всех bundles. |
| Section/root/series covers | **PASS** | Все приведены к **1536x1024**. |
| Fallback images | **PASS** | `static/images/default-*.webp` **1536x1024**. |
| Home hero | **PASS** | `assets/images/home-hero85.webp` **2102x1401**, без corner logo, с brand mark на кресле. |
| Product gallery test fixtures | **ACCEPTED** | `light.png` и `360.png` остаются намеренно как тестовые assets. |
| Product primary uniqueness | **WARN** | Все 12 товаров сейчас используют одинаковый `01-front.png`; нужны официальные разные product assets. |
| Favicon/logo/service icons | **PASS** | Служебный слой оставлен без AI-стилизации. |
| Build output hygiene | **MANUAL** | `public/` чистится вручную владельцем проекта при необходимости. |
| Visual density | **P3 WATCH** | Явных дефектов обрезки или дублей логотипа нет; часть hub/section сцен остается плотной по UI-like панелям и может быть упрощена в следующем дизайн-проходе. |

### 4.1. Последняя проверка сборки

Команда:

```bash
npm run build
```

Результат текущей обычной сборки без автоочистки publishDir:

| Метрика | UK | RU |
|---|---:|---:|
| Pages | 62 | 60 |
| Paginator pages | 9 | 9 |
| Non-page files | 124 | 0 |
| Static files | 17 | 17 |
| Processed images | 618 | 0 |
| Aliases | 8 | 7 |

`content/products/sky/light/light.png` и `content/products/sky/360/360.png` присутствуют в source и после сборки в `public/`, что соответствует принятому решению оставить их как тестовые product gallery assets.

## 5. Оценка

Текущая оценка image-системы проекта: **9.0 / 10**.

Почему не **10/10**:

- product primary images пока не подтверждают конкретную модель, цвет и материал: все 12 товарных страниц используют один и тот же `01-front.png`;
- product gallery содержит осознанные test fixtures `light.png` и `360.png`;
- product gallery пока не закрывает полный набор ракурсов: front, side, back, material close-up, mechanism close-up, in-scale context;
- часть hub/section изображений визуально плотная по UI-like панелям;
- проверка изображений остается ручной и требует внимательного QA после каждого изменения.

## 6. Следующие действия до 9.5+

P1:

- заменить `content/products/**/01-front.png` на официальные разные product images по каждому SKU/MPN/GTIN;
- после замены вручную проверить product gallery, LCP image, `cover.image`, `image` и видимые карточки товаров.

P2:

- добавить реальные gallery images для ключевых товаров: side, back, material, mechanism, in-scale;
- решить, должны ли `light.png` и `360.png` попадать в видимую PDP-галерею, или их нужно исключать шаблонно, не удаляя из проекта;
- после deploy проверить опубликованные product/article/news URL через PageSpeed Insights и schema validators.

P3:

- в следующем visual refresh упростить самые плотные hub/section scenes: меньше UI-like панелей, больше product-led композиции и tactile material focus.

## 7. Обязательная проверка после Image-правок

После любых изменений изображений:

```bash
npm run build
```

Затем вручную проверить:

- размеры и формат измененных файлов;
- отсутствие случайных `.DS_Store`;
- видимый crop в карточках и hero;
- наличие `alt` и `cover.alt`;
- корректность первого `seo-image` в article/news;
- product gallery, если менялись файлы в `content/products/**`;
- `public/`, если локальный build output нужно очистить вручную.
