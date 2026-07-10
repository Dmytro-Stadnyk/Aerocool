# Очистка документации по SEO-изображениям — 2026-05-14

Дата аудита: 2026-05-14.

> Архивная оговорка 2026-07-10: документ фиксирует состояние на дату в имени файла. Номера документов внутри исторического текста могут отражать прежнюю нумерацию до перестройки маршрута; актуальные имена и статусы смотрите в [карте документации](../01-documentation-map.md).

## Что обновлено

Этот документ фиксирует точечную синхронизацию документации после обновления `seo-image`, LCP preload и image delivery слоя.

Внимание: это исторический audit snapshot на 2026-05-14. С 2026-06-12 текущий product primary image больше не вставляется через `seo-image` в markdown: его выводит `layouts/_partials/products/gallery.html`, а product preload синхронизируется с gallery `sizes` через `layouts/_partials/_seo/lcp-image-preload.html`. Актуальные правила смотреть в [docs/content/06-seo-image-shortcode.md](../content/06-seo-image-shortcode.md), [docs/content/templates/10-product-template.md](../content/templates/10-product-template.md) и [docs/content/05-front-matter-reference.md](../content/05-front-matter-reference.md).

Обновлены основные рабочие документы:

- [README.md](../../README.md)
- [docs/01-documentation-map.md](../01-documentation-map.md)
- [docs/content/06-seo-image-shortcode.md](../content/06-seo-image-shortcode.md)
- [docs/content/05-front-matter-reference.md](../content/05-front-matter-reference.md)
- [docs/content/07-content-seo-checklist-2026.md](../content/07-content-seo-checklist-2026.md)
- [docs/content/templates/08-article-template.md](../content/templates/08-article-template.md)
- [docs/content/templates/09-news-template.md](../content/templates/09-news-template.md)
- [docs/content/templates/10-product-template.md](../content/templates/10-product-template.md)
- [docs/architecture/03-hugo-template-helpers.md](../architecture/03-hugo-template-helpers.md)
- [docs/quality/12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md)
- [docs/quality/13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md)
- [docs/seo/27-google-seo-audit-checklist-2026.md](../seo/27-google-seo-audit-checklist-2026.md)
- [docs/seo/28-ssg-seo-checklist-2026.md](../seo/28-ssg-seo-checklist-2026.md)

## Что считалось устаревшим

1. Документация местами описывала `jsonld` как параметр shortcode. В текущей архитектуре это устарело: `seo-image` не управляет JSON-LD, а `ImageObject` собирается централизованно из front matter `image`.
2. Формулировки про AVIF могли читаться как текущая возможность проекта. Это уточнено: текущий Hugo image pipeline проекта генерирует WebP + fallback, а AVIF возможен только отдельным pipeline.
3. Старые примеры с `sizes="100vw"` для контентной колонки были заменены на реальные размеры текущего `.main`.
4. Формулировки про "ТОП-1" были смягчены там, где они звучали как обещание. Новая формула: документация повышает шансы на сильное ранжирование, но не гарантирует позицию.
5. Head preload был описан недостаточно точно. На момент этого аудита было зафиксировано, что он выводится через [lcp-image-preload.html](../../layouts/_partials/_seo/lcp-image-preload.html) для типовых `article`, `news` и `product` страниц при совпадении `image`, `cover.image`, первого `seo-image src` и `cover.hiddenInSingle: true`. Для текущего product pipeline эта формулировка устарела: product preload теперь связан с `products/gallery.html`, а не с markdown `seo-image`.

## Исторический стандарт на 2026-05-14

Этот раздел оставлен как исторический контекст. Для текущих товарных страниц не использовать пример ниже как product-инструкцию. Для статей и новостей общий принцип `image + cover.image + seo-image` остается актуальным.

На 2026-05-14 для статей, новостей и товаров с локальным главным изображением использовался такой пример:

```yaml
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Описательное локализованное описание"
  relative: true
  hiddenInSingle: true
```

В начале тела страницы:

```md
{{< seo-image
  src="01-front.png"
  width="2000"
  height="2000"
  alt="Описательное локализованное описание"
  title="Короткий локализованный title"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl"
  sizes="(min-width: 1198px) 1150px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
/>}}
```

Если первое видимое изображение использует нестандартный `sizes`, во front matter нужно добавить такое же значение:

```yaml
seo_image_sizes: "(min-width: 848px) 800px, (max-width: 768px) calc(100vw - 28px), calc(100vw - 48px)"
```

## Что не нужно делать

- Не добавлять `jsonld` в `seo-image`.
- Не ставить `preload=true` на вторичные изображения.
- Не использовать `fetchpriority=high` вместе с `loading="lazy"`.
- Не использовать `sizes="100vw"` для изображения внутри контентной колонки, если оно не занимает всю ширину viewport.
- Не обещать автоматический ТОП-1 из-за PageSpeed score, schema или Core Web Vitals.
- Не переименовывать массово опубликованные image URLs без отдельного SEO/redirect-плана.

## Официальная база

- Google Image SEO: https://developers.google.com/search/docs/appearance/google-images
- web.dev Fetch Priority: https://web.dev/articles/fetch-priority
- web.dev responsive image preload: https://web.dev/articles/preload-responsive-images
- Hugo image processing: https://gohugo.io/content-management/image-processing/
- Hugo page resources: https://gohugo.io/content-management/page-resources/
