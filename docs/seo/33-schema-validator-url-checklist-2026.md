# Список URL для проверки в Schema.org Validator 2026

Обновлено: 2026-07-15.

Этот документ содержит полный список публичных URL для ручной проверки через [validator.schema.org](https://validator.schema.org/). Список собран из rendered HTML в `public/**/*.html`: сюда попали только страницы, где реально есть `application/ld+json`.

Для последовательной проверки production-страниц без Markdown-разметки используйте [простой список из 98 URL](33-schema-validator-urls-production.txt). В нем каждый адрес `https://aerocool.ua/` находится на отдельной строке.

Текущий base URL для ручной проверки:

```text
https://dev--hugo-aerocool.netlify.app
```

После production-перехода этот же список нужно повторно проверить, заменив base URL на:

```text
https://aerocool.ua
```

Важно: `validator.schema.org` в режиме `Fetch URL` должен видеть публичный URL. Локальный `localhost` обычно не подходит для URL-проверки; для локальной сборки использовать вставку HTML-кода вручную.

## 1. Сводка

| Группа | Количество URL |
| --- | ---: |
| Украинские страницы | `49` |
| Русские страницы | `49` |
| Всего URL с JSON-LD | `98` |

Что не входит в список:

- `/search/` и `/ru/search/`, потому что search должен оставаться `noindex,nofollow` и без JSON-LD;
- `/contact/success/` и `/ru/contact/success/`, потому что success page не должна получать JSON-LD;
- `/page/2+`, `/articles/page/2+`, `/news/page/2+` и русские paginated URL, потому что pagination pages остаются навигационными `noindex,follow` страницами без JSON-LD;
- `404` и alias/service pages.

## 2. Как проверять

1. Открыть [validator.schema.org](https://validator.schema.org/).
2. Выбрать вкладку `Fetch URL`.
3. Вставить один URL из списка.
4. Проверить, что JSON-LD парсится без синтаксических ошибок.
5. Зафиксировать предупреждения, если они есть.
6. После production-перехода повторить проверку на `https://aerocool.ua`.

Schema.org Validator проверяет синтаксис и распознавание типов. Он не заменяет Google Rich Results Test, Search Console и QA соответствия видимому контенту.

## 3. Приоритет проверки

Сначала проверять:

1. Главные страницы: `/`, `/ru/`.
2. Каталог и серии: `/products/`, `/products/sky/`, `/products/wing-360/`, `/products/xtal/` и русские версии.
3. Все product pages.
4. `/faq/`, `/contact/`, `/about/`, `/image-license/`, `/privacy/` и русские версии.
5. Статьи и новости.

## 4. Украинские URL

### 4.1. Главная и статичные страницы

- [ ] https://dev--hugo-aerocool.netlify.app/
- [ ] https://dev--hugo-aerocool.netlify.app/about/
- [ ] https://dev--hugo-aerocool.netlify.app/contact/
- [ ] https://dev--hugo-aerocool.netlify.app/faq/
- [ ] https://dev--hugo-aerocool.netlify.app/image-license/
- [ ] https://dev--hugo-aerocool.netlify.app/privacy/

### 4.2. Каталог, серии и товары

- [ ] https://dev--hugo-aerocool.netlify.app/products/
- [ ] https://dev--hugo-aerocool.netlify.app/products/sky/
- [ ] https://dev--hugo-aerocool.netlify.app/products/sky/360/
- [ ] https://dev--hugo-aerocool.netlify.app/products/sky/lite/
- [ ] https://dev--hugo-aerocool.netlify.app/products/wing-360/
- [ ] https://dev--hugo-aerocool.netlify.app/products/wing-360/loft-air-dark-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/products/wing-360/loft-air-light-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/products/wing-360/mesh-black/
- [ ] https://dev--hugo-aerocool.netlify.app/products/wing-360/racer-black/
- [ ] https://dev--hugo-aerocool.netlify.app/products/wing-360/racer-dark-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/products/xtal/
- [ ] https://dev--hugo-aerocool.netlify.app/products/xtal/loft-air-dark-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/products/xtal/loft-air-light-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/products/xtal/mesh-black/
- [ ] https://dev--hugo-aerocool.netlify.app/products/xtal/racer-black/
- [ ] https://dev--hugo-aerocool.netlify.app/products/xtal/racer-dark-grey/

### 4.3. Статьи

- [ ] https://dev--hugo-aerocool.netlify.app/articles/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/best-chair-for-home-office/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/chair-for-computer-work/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/chair-for-posture-and-long-work/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/chair-setup-after-purchase/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/chairs-for-office-team/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/gaming-chair-long-sessions/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/how-to-choose-aerocool-chair/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/how-to-choose-chair-by-adjustability/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/racer-vs-loft-air-vs-mesh/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/sky-lite-vs-sky-360/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/sky-vs-wing-360-vs-xtal/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/sync4-sync5-mechanism-guide/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/what-is-dual-backrest/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/what-is-fully-replaceable-design/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/what-is-synchronous-tilt/
- [ ] https://dev--hugo-aerocool.netlify.app/articles/wing-360-vs-xtal/

### 4.4. Новости

- [ ] https://dev--hugo-aerocool.netlify.app/news/
- [ ] https://dev--hugo-aerocool.netlify.app/news/aerocool-chair-selection-guides-update/
- [ ] https://dev--hugo-aerocool.netlify.app/news/aerocool-practical-chair-guides-update/
- [ ] https://dev--hugo-aerocool.netlify.app/news/loft-air-and-mesh-focus/
- [ ] https://dev--hugo-aerocool.netlify.app/news/sky-360-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/news/sky-lite-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/news/sky-series-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/news/sync4-sync5-mechanism-update/
- [ ] https://dev--hugo-aerocool.netlify.app/news/wing-360-series-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/news/xtal-series-launch/

## 5. Русские URL

### 5.1. Главная и статичные страницы

- [ ] https://dev--hugo-aerocool.netlify.app/ru/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/about/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/contact/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/faq/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/image-license/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/privacy/

### 5.2. Каталог, серии и товары

- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/sky/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/sky/360/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/sky/lite/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/wing-360/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/wing-360/loft-air-dark-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/wing-360/loft-air-light-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/wing-360/mesh-black/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/wing-360/racer-black/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/wing-360/racer-dark-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/xtal/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/xtal/loft-air-dark-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/xtal/loft-air-light-grey/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/xtal/mesh-black/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/xtal/racer-black/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/products/xtal/racer-dark-grey/

### 5.3. Статьи

- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/best-chair-for-home-office/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/chair-for-computer-work/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/chair-for-posture-and-long-work/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/chair-setup-after-purchase/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/chairs-for-office-team/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/gaming-chair-long-sessions/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/how-to-choose-aerocool-chair/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/how-to-choose-chair-by-adjustability/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/racer-vs-loft-air-vs-mesh/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/sky-lite-vs-sky-360/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/sky-vs-wing-360-vs-xtal/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/sync4-sync5-mechanism-guide/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/what-is-dual-backrest/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/what-is-fully-replaceable-design/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/what-is-synchronous-tilt/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/articles/wing-360-vs-xtal/

### 5.4. Новости

- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/aerocool-chair-selection-guides-update/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/aerocool-practical-chair-guides-update/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/loft-air-and-mesh-focus/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/sky-360-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/sky-lite-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/sky-series-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/sync4-sync5-mechanism-update/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/wing-360-series-launch/
- [ ] https://dev--hugo-aerocool.netlify.app/ru/news/xtal-series-launch/

## 6. Что фиксировать после проверки

Для каждой страницы записывать:

- есть ли syntax error;
- какие типы распознаны;
- есть ли предупреждения по `Product`, `Offer`, `ProductGroup`, `BreadcrumbList`, `ImageObject`, `Article`, `NewsArticle`, `FAQPage`;
- отличается ли результат между `uk` и `ru`;
- нужно ли обновить front matter, schema partial или документацию.

Если найдена проблема, сначала проверить локальный rendered HTML, затем source partial в `layouts/_partials/_schema`, затем front matter страницы.
