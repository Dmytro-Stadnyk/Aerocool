# Проверка через PageSpeed Insights и Agentic Browsing

Обновлено: 2026-07-13.

Этот документ фиксирует текущий стандарт проекта `Aerocool Ukraine`: автоматический браузерный performance-аудит внутри репозитория больше не используется. Для оценки скорости, Core Web Vitals, Accessibility, Best Practices и SEO использовать внешний сервис [PageSpeed Insights](https://pagespeed.web.dev/). Экспериментальные проверки Agentic Browsing/WebMCP выполнять отдельно в совместимой версии Chrome/Lighthouse; они не являются стабильной стандартной категорией PageSpeed Insights.

Важно: отдельная категория PWA удалена из Lighthouse 12 и PageSpeed Insights еще в 2024 году. Наличие service worker и manifest по-прежнему проверяется функционально, но проект не требует несуществующий `PWA score 100`.

## 1. Зачем это нужно

PageSpeed Insights проще для проекта и владельца сайта:

- не требует локального Chrome в Netlify build environment;
- не добавляет тяжелые npm-зависимости в корневой проект;
- не ломает deploy из-за ошибки внешнего браузерного runtime;
- показывает и лабораторную проверку конкретного URL, и реальные field data, когда они накопятся;
- подходит для ручной production-проверки после каждого важного deploy.

Для новичка: PageSpeed Insights — это не один общий балл. Он показывает лабораторные Lighthouse-данные конкретного запуска и, когда доступны, полевые CrUX-данные за скользящий период 28 дней. Экспериментальные Agentic Browsing/WebMCP-аудиты помогают проверить, распознает ли совместимый AI-агент формы и служебный `llms.txt`, но запускаются и оцениваются отдельно. Они не заменяют SEO, schema.org, Core Web Vitals и ручную проверку сайта человеком. Google Search не требует `llms.txt` и не использует его как положительный или отрицательный сигнал видимости и ранжирования.

## 2. Что удалено из проекта

В проекте больше нет:

- локального Netlify build plugin для браузерной сводки после deploy;
- отдельной папки массового браузерного аудита;
- npm-зависимостей корневого проекта для запуска Chrome-аудита;
- helper-скрипта для запуска старого URL-аудита.

Netlify теперь должен только собрать и опубликовать Hugo-сайт. Проверка качества опубликованного URL выполняется отдельно через PageSpeed Insights.

## 3. Какие URL проверять

Минимальный набор после важных правок:

| Тип страницы | URL |
|---|---|
| Главная | `https://aerocool.ua/` и `https://aerocool.ua/ru/` |
| Каталог | `https://aerocool.ua/products/` и `https://aerocool.ua/ru/products/` |
| Серия | одна актуальная серия в `uk` и `ru` |
| Товар | один товар в `uk` и `ru` |
| Статья | одна статья в `uk` и `ru` |
| Новость | одна новость в `uk` и `ru` |
| FAQ | `https://aerocool.ua/faq/` и `https://aerocool.ua/ru/faq/` |
| Контакты | `https://aerocool.ua/contact/` и `https://aerocool.ua/ru/contact/` |
| Конфиденциальность | `https://aerocool.ua/privacy/` и `https://aerocool.ua/ru/privacy/` |
| Поиск | `https://aerocool.ua/search/` и `https://aerocool.ua/ru/search/` |
| 404 | `https://aerocool.ua/404.html` |

Для Branch Deploy проверять тот же набор, но на URL вида `https://dev--hugo-aerocool.netlify.app/`.

## 4. Как проверять

1. Открыть [https://pagespeed.web.dev/](https://pagespeed.web.dev/).
2. Вставить опубликованный URL страницы.
3. Сначала смотреть mobile-результат.
4. Затем сравнить desktop-результат.
5. Проверить, нет ли console errors, CSP errors, missing resources и явных regressions.
6. Если страница в `development/noindex`, не считать SEO score финальным для indexability.
7. После production-переключения отдельно проверить `index,follow`, sitemap, canonical, hreflang и schema.
8. Если менялись формы, `static/llms.txt`, headers или Agentic Browsing-подсказки, отдельно запустить совместимый экспериментальный Agentic Browsing-аудит.

### 4.1. Что смотреть в экспериментальном Agentic Browsing

По состоянию на 2026-07-13 Agentic Browsing остается экспериментальным направлением Lighthouse для Chrome 150+ и WebMCP origin trial. Он может быть недоступен в обычном PageSpeed Insights или стабильном браузере. В отличие от четырех основных Lighthouse-категорий, этот аудит не формирует обычный взвешенный балл `0–100`: отдельные проверки могут быть fractional, pass/fail или informational.

В проекте эти проверки нужны для трех вещей:

- чтобы AI-агент нашел форму контакта, форму отзыва или фильтр каталога;
- чтобы браузер получил понятную схему полей формы;
- чтобы LLM/AI-агент нашел краткую карту сайта в `/llms.txt`.

Проверки и практический смысл:

| Проверка | Что означает для новичка | Где править |
|---|---|---|
| Покрытие форм WebMCP | Форма найдена, но ей может не хватать `toolname` / `tooldescription` | `layouts/_shortcodes/contact.html`, `layouts/_partials/reviews/form.html`, `layouts/_partials/products/filters.html` |
| Зарегистрированные инструменты WebMCP | Браузер видит список форм-инструментов | те же шаблоны форм |
| Схемы WebMCP действительны | У полей и групп полей есть понятные имена и описания | `toolparamdescription`, `title`, `aria-label`, `aria-description`, `fieldset` |
| `llms.txt` соответствует рекомендациям | Корневой файл `/llms.txt` существует, написан как Markdown и имеет H1 | `static/llms.txt` |

Важно: для checkbox и radio-групп одного описания на каждом `input` может быть недостаточно. В текущем проекте группы фильтров и рейтинг отзывов описаны через `fieldset`, потому что Chrome строит WebMCP-схему на уровне параметра-группы.

Текущий профильный снимок и пример локальной проверки зафиксированы в [96-2026-07-08-webmcp-llms-agentic-readiness-audit.md](../audits/96-2026-07-08-webmcp-llms-agentic-readiness-audit.md).

## 5. Критерии результата

PageSpeed и Lighthouse используются для диагностики, а не для выполнения произвольной числовой нормы:

| Блок | Цель |
|---|---|
| Performance | Нет обязательного score; сравнить несколько запусков, найти конкретный bottleneck и не допустить регрессии |
| Accessibility | Нет необъясненных серьезных ошибок; дополнительно пройти клавиатурную и ручную проверку |
| Best Practices | Нет необъясненных ошибок браузера, безопасности или загрузки ресурсов |
| SEO | Нет критических технических ошибок на production-indexable страницах; индексацию отдельно подтвердить в Search Console |
| Agentic Browsing, отдельно | Нет ошибок схем WebMCP на страницах с формами; не сводить к баллу `0–100` |
| Service worker и manifest, отдельно | Регистрация без ошибок console, корректные `start_url` и manifest |
| Полевой LCP | ≤ `2.5 s` на 75-м процентиле |
| Полевой INP | ≤ `200 ms` на 75-м процентиле |
| Полевой CLS | ≤ `0.1` на 75-м процентиле |

Если PageSpeed снижает SEO-score на `dev` Branch Deploy из-за `noindex`, это ожидаемо. Финальную индексируемость проверяют только после production-переключения и по реальному URL.

## 6. Что делать при просадке

Если просел `LCP`, сначала проверить:

- какое изображение или блок стал главным элементом первого экрана;
- не включен ли lazy loading для главного изображения;
- есть ли `fetchpriority="high"` у единственного LCP-изображения;
- корректны ли `srcset`, `sizes`, `width`, `height`;
- нет ли лишнего prefetch/preload;
- не блокирует ли CSS или JS первый рендер.

Если просел `INP`, проверить:

- поиск;
- меню;
- view transitions;
- регистрация service worker;
- тяжелые обработчики клика;
- лишнюю JS-работу до первого взаимодействия.

Если просел `CLS`, проверить:

- размеры изображений;
- aspect ratio карточек;
- header/nav;
- web fonts;
- поздно вставляемые блоки.

Если экспериментальный Agentic Browsing-аудит показывает WebMCP warning:

- у формы проверить `toolname` и `tooldescription`;
- у обычных полей проверить `name`, связанный `label`, `title` или `toolparamdescription`;
- у checkbox/radio-групп проверить `fieldset`, `legend`, `aria-description` и `toolparamdescription` на группе;
- не добавлять `toolautosubmit` к contact/review формам без отдельного решения: пользователь должен видеть и подтверждать отправку.

Если экспериментальный Agentic Browsing-аудит показывает проблему `llms.txt`:

- проверить, что файл доступен по `/llms.txt`;
- проверить, что он написан в Markdown;
- проверить наличие одного H1;
- проверить, что есть обычные Markdown-ссылки на ключевые страницы;
- не превращать файл в рекламную страницу или второй sitemap.

Такая проблема относится к совместимости с отдельными AI-инструментами, а не к ранжированию Google. Не ухудшайте sitemap, canonical, robots или видимый контент ради прохождения экспериментальной проверки.

## 7. Локальные проверки до PageSpeed

Перед ручной проверкой опубликованного URL запускать:

```bash
npm run docs:check
./scripts/script_check.sh
npm run build:production
```

Если менялись redirects, headers, CSP или 404:

```bash
./scripts/script_netlify_dev.sh
./scripts/script_check_routes.sh
```

PageSpeed Insights проверяет опубликованный URL, поэтому локальная Hugo-сборка не заменяет ручную проверку. Agentic Browsing проверять отдельным совместимым Chrome/Lighthouse-прогоном.

Если нужно предварительно проверить Agentic Browsing локально, использовать временный Lighthouse/Chrome-прогон вне root-зависимостей проекта. Не добавлять Lighthouse как постоянную зависимость в `package.json` без отдельного решения.

## 8. Чего не делать

- Не возвращать браузерный audit plugin в `netlify.toml` без отдельного решения.
- Не добавлять тяжелые Chrome-аудит зависимости в root `package.json`.
- Не искать или не требовать отдельный PWA score: этой категории больше нет в актуальном Lighthouse/PSI.
- Не считать `dev` Branch Deploy финальной SEO-indexability проверкой, пока Netlify собирает сайт в `development`.
- Не гнаться за числом `100`, если правка ухудшает контент, UX или конверсию.
- Не использовать WebMCP как способ скрыть или заменить обычные видимые подписи формы.
- Не дублировать в `llms.txt` коммерческие product facts, если источником правды уже являются видимые страницы и JSON-LD.

## 9. Официальные источники

- [PageSpeed Insights: лабораторные и полевые данные](https://developers.google.com/speed/docs/insights/v5/about).
- [PageSpeed Insights release notes: удаление PWA-категории](https://developers.google.com/speed/docs/insights/release_notes).
- [Agentic Browsing scoring в Lighthouse](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring).
- [Google AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
