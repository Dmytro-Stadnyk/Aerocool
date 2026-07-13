# Руководство по Shortcode `seo-image`

Обновлено: 2026-07-13.

Короткое руководство по shortcode `seo-image` в текущем проекте `Aerocool`.

Shortcode `seo-image` находится в [layouts/_shortcodes/seo-image.html](../../layouts/_shortcodes/seo-image.html) и работает только с изображениями, которые лежат внутри папки страницы (`page bundle` в терминологии Hugo). Если файла нет рядом со страницей, сборка упадет с ошибкой.

`seo-image` отвечает только за видимое HTML-изображение в теле обычной контентной страницы: responsive `srcset`, WebP-версии, fallback-изображение, `width` / `height`, `sizes`, `loading`, `decoding`, `fetchpriority` и стабильный `aspect-ratio`. Он не рендерит `H1`, не меняет SEO `title`, не управляет `og:image` и не выводит JSON-LD.

В Hugo `0.164.0` shortcode проверяет processable image resources через `reflect.IsImageResourceProcessable` перед вызовами image pipeline. Это актуальный Hugo-подход вместо ручного списка расширений. Для processable-изображений проект выводит `<picture>` с WebP `srcset` и fallback `<img>` в исходном формате. SVG не является processable resource, поэтому выводится как обычный `<img>` с обязательными размерами.

Hero-изображение главной страницы — отдельное исключение: оно живет в shortcode [home-hero.html](../../layouts/_shortcodes/home-hero.html), не проходит через `seo-image`, но использует Hugo global image resource из `assets/images/home-hero85.webp`. Shortcode выводит responsive `srcset`, `sizes`, `loading="eager"` и `fetchpriority="high"`, а matching preload для главной страницы выводится в `<head>` через [lcp-image-preload.html](../../layouts/_partials/_seo/lcp-image-preload.html).

Главное изображение товарной страницы — тоже отдельный сценарий. Оно не должно вставляться через `seo-image` в markdown. На товарных страницах первый видимый кадр выводит [products/gallery.html](../../layouts/_partials/products/gallery.html) из front matter `image`, а responsive preload для этого кадра выводится в `<head>` через [lcp-image-preload.html](../../layouts/_partials/_seo/lcp-image-preload.html) с тем же `sizes`, что и gallery.

Общий визуальный стандарт изображений, включая обложки, резервные изображения, обложки разделов, главный экран, товарную галерею, встроенные иллюстрации, технические схемы и AI-промпты, описан в [34-image-design-playbook-2026.md](34-image-design-playbook-2026.md). Последняя полная проверка фактического состояния указана в [карте документации](../01-documentation-map.md#5-текущий-аудит). Аудиты [89](../audits/89-2026-06-24-cover-block-image-seo-audit.md), [82](../audits/82-2026-06-18-articles-news-content-image-audit.md) и [80](../audits/80-2026-06-15-articles-news-inline-image-serp-audit.md) сохраняются как исторические снимки внедрения. Этот документ отвечает за HTML, адаптивную доставку и производительность `seo-image`.

Простыми словами для новичка: `seo-image` нужен при вставке изображения прямо в текст статьи, новости или обычной страницы. Для главной и товарной страницы уже есть отдельные шаблоны первого экрана.

SVG поддерживается самим `seo-image` как обычный `<img>`, но это не распространяется на автоматическую товарную галерею. Галерея принимает только обрабатываемые Hugo растровые ресурсы и проверяет смысловое имя дополнительного кадра через `products/gallery-image-meta.html`.

## Что за что отвечает

Эта таблица нужна, чтобы не смешивать SEO-метаданные, preview-картинки и видимые изображения внутри страницы.

| Элемент | За что отвечает | Где используется | Что новичку важно помнить |
|---|---|---|---|
| `image` | Главный image URL страницы для SEO/OG/Twitter/schema. На product page это еще и первый кадр visible gallery. | front matter страницы, helpers `page-image.html`, JSON-LD, social previews, product gallery | Заполнять почти всегда. Для товара файл должен реально лежать в page bundle и быть processable image resource. |
| `cover.image` | Preview-изображение для карточек, списков и cover-логики. | front matter `cover`, листинги, карточки, fallback preview | Обычно совпадает с `image`, но отвечает за визуальное preview, а не за schema напрямую. |
| `cover.alt` | Описание изображения на языке страницы. | карточки, cover UI, product gallery primary alt fallback | Писать человеческое описание объекта или темы, не список ключевых слов. |
| `cover.relative` | Объясняет Hugo/PaperMod, что путь к cover лежит рядом со страницей. | front matter `cover` | Для page bundle обычно `true`; для root `/cover.webp` или `/images/...` использовать `false`. |
| `cover.hiddenInSingle` | Скрывает стандартный cover темы на одиночной странице, когда видимое изображение выводит другой слой. | front matter `cover` | Для article/news с первым `seo-image` и для product gallery обычно `true`, чтобы не получить дубль. |
| `seo-image` | Видимое изображение в markdown-теле: `<picture>`, WebP, fallback `<img>`, `srcset`, `sizes`, размеры и loading strategy. | markdown статей, новостей и обычных страниц | Не управляет SEO title, `og:image` или JSON-LD. Для primary product image не использовать. |
| `products/gallery.html` | Главное изображение товара и дополнительные фото. | `layouts/products/single.html` | Первый кадр берет из `image`; дополнительные кадры — из остальных изображений page bundle. |
| `lcp-image-preload.html` | Ранний preload главной картинки первого экрана в `<head>`. | SEO partial, вызывается шаблонным слоем | Для article/news синхронизируется с первым `seo-image`; для product синхронизируется с gallery. |
| `seo_image_sizes` | Override для `imagesizes` в head preload article/news. | front matter статьи или новости | Нужен только если первый `seo-image` использует нестандартный `sizes`; для product не нужен. |
| `alt` в `seo-image` | Описание конкретного видимого inline-изображения. | параметр shortcode | Должен быть на языке страницы и описывать картинку, а не SEO-фразу. |
| `title` в `seo-image` | Короткий дополнительный title для изображения. | параметр shortcode | Не обязан повторять `alt`; если нечего добавить, лучше не усложнять. |
| `loading` | Когда браузеру начинать загрузку изображения. | параметр shortcode или gallery | `eager` только для главной LCP-картинки, `lazy` для остальных. |
| `fetchpriority` | Насколько срочно браузеру загрузить изображение. | параметр shortcode или gallery | `high` только для одного главного LCP-кандидата; вторичные изображения держать `auto`. |
| `preload` | Добавляет раннюю подсказку загрузки для главной article/news картинки. | параметр shortcode и head partial | `true` только для главной LCP-картинки статьи/новости; на product page запрещен. |
| `sizes` | Подсказывает браузеру, какой реальный размер изображения будет на разных ширинах экрана. | параметр shortcode, gallery, preload | Должен совпадать у видимой картинки и preload; `100vw` не ставить для обычной контентной колонки. |
| `crop` | Разрешает намеренную обрезку через Hugo `Fill`, если ratio отличается. | параметр shortcode | По умолчанию сборка падает при неявной обрезке. Добавлять `crop=true` только осознанно. |

Самое короткое правило: `image` задает главный SEO-источник изображения, `cover.image` — превью, `seo-image` — видимую картинку в тексте, а главное изображение товара выводит товарная галерея.

Официальная база правил:

- Google Image SEO: https://developers.google.com/search/docs/appearance/google-images
- web.dev Fetch Priority: https://web.dev/articles/fetch-priority
- web.dev responsive preload: https://web.dev/articles/preload-responsive-images
- Hugo image processing: https://gohugo.io/content-management/image-processing/
- Hugo page resources: https://gohugo.io/content-management/page-resources/

## 1. Главное изображение статьи или новости

Сначала во front matter:

```yaml
image: "01-front.webp"
cover:
  image: "01-front.webp"
  alt: "Тема изображения на языке страницы"
  relative: true
  hiddenInSingle: true
```

Потом в начале markdown-тела:

```md
{{< seo-image
  src="01-front.webp"
  width="1536"
  height="1024"
  alt="Описательное alt-описание изображения на языке страницы"
  title="Короткий title изображения"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl"
  sizes="(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

Что делает эта связка:

- `seo-image` выводит видимый `<picture>` в теле страницы;
- [lcp-image-preload.html](../../layouts/_partials/_seo/lcp-image-preload.html) выводит один ранний responsive preload в `<head>`;
- shortcode не дублирует body-level preload, если `image`, `src` и `cover.hiddenInSingle: true` совпадают.

## 2. Товарная страница

Для товара первичное изображение задается только через front matter:

```yaml
image: "01-front.webp"
cover:
  image: "01-front.webp"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

В Markdown-теле товара не добавлять стартовый `seo-image` для `01-front.webp`. Товарный шаблон сам:

- берет первый кадр из `image`;
- выводит его через [products/gallery.html](../../layouts/_partials/products/gallery.html);
- ставит `loading="eager"` и `fetchpriority="high"` на первый gallery image;
- выводит дополнительные изображения page bundle как lazy-loaded миниатюры;
- получает matching head preload из [lcp-image-preload.html](../../layouts/_partials/_seo/lcp-image-preload.html).

Если `image` или `cover.image` товарной страницы указывает на отсутствующий файл либо на image resource, который Hugo не может обработать через `reflect.IsImageResourceProcessable`, сборка должна остановиться. Это намеренная защита от битой LCP-картинки и рассинхронизации SEO/OG/schema с видимой gallery.

Проверено 2026-07-10: все `12` главных товарных файлов называются `01-front.webp`, имеют размер **2000x2000** и разные SHA-256. В `content/products/` нет PNG/JPEG и файлов с именами `test`, `candidate` или `placeholder`. Для нового товара сохраняйте тот же стандарт и проверяйте соответствие конкретным SKU, цвету и материалу.

Если в товарной странице позже понадобится вторичная inline-иллюстрация внутри описания, ее можно вставить через `seo-image`, но только с `loading="lazy"`, `preload=false` и без `fetchpriority=high`.

## 3. Второстепенное контентное изображение

Для статей и новостей стандартный secondary inline image:

- файл лежит рядом с `index.md` и `index.ru.md`;
- размер обычно **1200x800**;
- формат WebP;
- filename `02-<topic>.webp`, `03-<topic>.webp`;
- `loading="lazy"`;
- `preload=false`;
- `fetchpriority=auto`;
- `width` и `height` указаны явно;
- `alt` локализован для каждой языковой версии;
- изображение стоит рядом с блоком текста, который оно объясняет.

```md
{{< seo-image
  src="02-material-macro-panels.webp"
  width="1200"
  height="800"
  alt="Порівняння поверхонь Racer, Loft Air і Mesh у кріслах Aerocool"
  title="Матеріали Racer, Loft Air і Mesh"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="mx-auto w-full rounded-xl"
  sizes="(min-width: 848px) 800px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

## Параметры

- `src`: имя файла внутри папки страницы.
- `alt`: обязательное описание изображения; пустой `alt` остановит сборку.
- `title`: необязательный короткий заголовок для интерфейса страницы; не дублировать `alt` слово в слово.
- `width` / `height`: обязательные размеры целевого рендера; shortcode остановит сборку, если их нет или они равны `0`.
- `loading`: `eager` для LCP-картинки статьи/новости, `lazy` для всего остального.
- `preload`: `true` только для главной LCP-картинки статьи/новости; на товарных страницах не использовать.
- `fetchpriority`: `high` только для главного LCP-кандидата; если параметр не задан, shortcode ставит `high` только при `preload=true`, иначе `auto`.
- `sizes`: media query для адаптивной загрузки; если не задан, используется проектный full-width default для `.main`.
- `crop`: необязательный `true`, только если нужно намеренно обрезать изображение через Hugo `Fill`.
- `class`: Tailwind-классы.

## Защитные правила

1. `src`, `alt`, `width` и `height` обязательны.
2. `preload=true` требует `loading="eager"` и `fetchpriority=high`.
3. На странице допускается только один уникальный shortcode-вызов с `preload=true`.
4. На типовой `article` или `news` странице `preload=true` должен совпадать с front matter `image`.
5. На `product` странице `preload=true` в `seo-image` запрещен: product LCP обслуживает gallery.
6. Если `width` / `height` не совпадают с ratio исходника, сборка остановится. Для намеренного crop нужно явно добавить `crop=true`.
7. Параметр `jsonld` не использовать: `ImageObject` собирается централизованно из front matter `image`.
8. `sizes="100vw"` не использовать для контентной колонки, если изображение не занимает весь viewport.

## Важно

1. Текущий рекомендуемый стандарт для всех content-страниц — `image + cover.image + cover.alt + cover.relative + cover.hiddenInSingle`.
2. Для статей и новостей с локальной обложкой первое видимое изображение выводить через `seo-image`.
3. Для товаров первичный кадр не вставлять через `seo-image`: его выводит product gallery.
4. Не вставлять через shortcode изображения, которых нет в папке страницы.
5. На переведенной странице локализовать `alt` и `title`, даже если используется тот же исходный файл изображения.
6. Для schema.org основным источником изображения остается front matter `image`, а не параметры shortcode.
7. `cover.alt` не должен быть пустым, шаблонным или набитым ключевыми словами. Лучше назвать сущность или тему: `Кресло Aerocool SKY 360`, `Серия Aerocool WING`, `FAQ Aerocool в Украине`.
8. Не переименовывать массово уже опубликованные изображения без отдельного SEO/redirect-плана: это меняет URL image resources.
9. Image license metadata не управляется shortcode: если меняются условия использования изображений, сначала обновить страницы `/image-license/` и `/ru/image-license/`, затем проверить rendered `ImageObject`.
10. Для `content/articles` и `content/news` не публиковать `candidate` / `test` / `final-v*` файлы и не ссылаться на них из markdown. Такие файлы допустимы только для визуального утверждения.
11. Для secondary inline image не использовать `preload=true` и `fetchpriority=high`: это резерв только для одного LCP-кандидата страницы.
12. Текущее состояние проверяется аудитом `99`. Числа из аудита `89` относятся к 2026-06-24; описанный там список задач по одинаковым товарным PNG уже закрыт.
