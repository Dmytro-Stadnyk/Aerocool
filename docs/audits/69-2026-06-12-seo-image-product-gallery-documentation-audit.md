# Аудит Документации По `seo-image` И Product Gallery — 2026-06-12

Дата аудита: 2026-06-12.

Обновлено: 2026-06-13.

## Краткий Вывод

Текущая документация по `seo-image`, product gallery, LCP preload и front matter изображениям синхронизирована с Hugo `0.164.0` и текущим шаблонным слоем проекта.

Итоговая оценка: **9.0/10**.

Оценка не равна `10/10`, потому что остаются два практических ограничения:

1. Product gallery все еще автоматически добавляет все processable image-файлы из product page bundle. Это удобно, но требует дисциплины: тестовые файлы `light.png` и `360.png` сознательно оставлены владельцем проекта и не удаляются автоматически.
2. Локальная сборка подтверждает корректность Hugo/HTML pipeline, но финальная SEO/CWV-уверенность требует проверки опубликованных URL через PageSpeed Insights, Google Search Console и rich results validators.

## Что Сейчас Считается Актуальным

Для новичка короткая схема такая:

| Элемент | За Что Отвечает | Где Править |
|---|---|---|
| `image` | Главная SEO/social/schema-картинка страницы; у товара еще и первый кадр product gallery. | front matter страницы |
| `cover.image` | Preview-картинка для карточек, листингов и cover-логики. | front matter `cover` |
| `cover.alt` | Человеческое описание картинки на языке страницы. | front matter `cover` |
| `seo-image` | Видимая картинка внутри текста статьи, новости или обычной страницы. | markdown-тело страницы |
| `products/gallery.html` | Первый видимый кадр товара и дополнительные product photos. | шаблон + image-файлы в product page bundle |
| `lcp-image-preload.html` | Ранний preload главной картинки первого экрана в `<head>`. | SEO partial |
| `seo_image_sizes` | Синхронизация нестандартного `sizes` между первым article/news `seo-image` и head preload. | front matter article/news |

Главное правило: `seo-image` не управляет `og:image`, JSON-LD или product primary image. Для SEO/schema главным источником остается `image` во front matter.

## Что Было Обновлено

Актуальные рабочие документы:

- [README.md](../../README.md) — добавлена таблица для новичка по ролям `image`, `cover.image`, `seo-image`, gallery и preload.
- [docs/content/06-seo-image-shortcode.md](../content/06-seo-image-shortcode.md) — добавлен подробный раздел “Что За Что Отвечает”.
- [docs/content/05-front-matter-reference.md](../content/05-front-matter-reference.md) — добавлена простая схема ролей front matter полей.
- [docs/01-documentation-map.md](../01-documentation-map.md) — обновлены маршруты чтения для image/product gallery/LCP preload задач.
- [docs/audits/38-2026-05-14-seo-image-documentation-cleanup.md](38-2026-05-14-seo-image-documentation-cleanup.md) — помечен как исторический snapshot, чтобы старый product пример через `seo-image` не воспринимался как текущая инструкция.

## Проверенное Поведение

1. Для article/news первое видимое изображение может идти через `seo-image`, если файл лежит в page bundle.
2. Для article/news `preload=true` должен быть только у одного главного LCP-кандидата.
3. Для product page стартовый `seo-image` в markdown не используется.
4. Product primary image выводится через [products/gallery.html](../../layouts/_partials/products/gallery.html).
5. Product LCP preload выводится через [lcp-image-preload.html](../../layouts/_partials/_seo/lcp-image-preload.html) и должен совпадать с gallery `sizes`.
6. `jsonld` в shortcode не используется: JSON-LD image собирается централизованно из front matter `image`.
7. Для Hugo `0.164.0` актуальная проверка processable images — `reflect.IsImageResourceProcessable`.

## Оценка По Категориям

| Категория | Оценка | Почему |
|---|---:|---|
| Соответствие Hugo `0.164.0` | **9.5/10** | Документация описывает `reflect.IsImageResourceProcessable`, Hugo image processing и разделение page resources/global resources. |
| SEO/schema-ясность | **9.2/10** | Зафиксировано, что `image` отвечает за SEO/OG/schema, а `seo-image` — только за видимое HTML-изображение. |
| Core Web Vitals/LCP | **9.0/10** | Разделены article/news LCP, home hero и product gallery; описано требование совпадения visible `sizes` и preload `imagesizes`. |
| Понятность для новичка | **9.3/10** | Добавлены таблицы “что за что отвечает” в README, shortcode guide и front matter reference. |
| Product gallery governance | **8.0/10** | Auto-include удобен, но тестовые `light.png` и `360.png` остаются в product bundles по решению владельца проекта. |
| Практическая проверяемость | **8.8/10** | Локальная сборка проходит, но финальная валидация должна идти на опубликованных URL через PageSpeed/GSC/Rich Results. |

Итоговая оценка: **9.0/10**.

## Актуальные Остаточные Риски

1. **Product gallery auto-include**: шаблон по-прежнему автоматически берет processable image-файлы из product page bundle. Тестовые `light.png` и `360.png` оставлены намеренно, поэтому перед production-проверкой нужно вручную понимать, должны ли они быть видимыми на PDP.
2. **Нет live CWV-подтверждения в этом аудите**: локальный build не заменяет PageSpeed Insights по опубликованному URL.
3. **Нет гарантии позиции Google**: корректные изображения, schema и preload повышают техническое качество страницы, но не гарантируют `топ-1`; ранжирование зависит от контента, интента, ссылок, конкурентов, спроса и поведения пользователей.

## Следующие Действия Для Оценки 9.5+

1. Решить product gallery allowlist: либо явный front matter список галереи, либо сохранить auto-include и ручной контроль test fixtures.
2. Проверить опубликованные product/article/news URL через PageSpeed Insights после deploy.
3. Проверить rich results / schema image output для одной статьи, одной новости и одного товара.
4. Расширить реальные product gallery images: front, side, back, material close-up, mechanism, in-scale photo.
5. После live-проверок обновить этот audit или создать новый текущий snapshot.
