# Маршрутизация Netlify и принудительная 404

Обновлено: 2026-07-13.

Этот документ описывает, как в проекте устроены Netlify redirects, HTTP headers и кастомная `404`.

Правила сверены 2026-07-13 с официальной документацией [Netlify redirects](https://docs.netlify.com/manage/routing/redirects/overview/), [пользовательских заголовков](https://docs.netlify.com/manage/routing/headers/) и [кэширования](https://docs.netlify.com/build/caching/caching-overview/). Аудиты `50` и `69` сохраняют историю прежней синхронизации и отказа от локального браузерного плагина.

## 1. Где живут правила

В проекте есть два слоя routing-настроек:

- `static/_redirects` — plain text `_redirects` для Netlify. Hugo копирует его в `public/_redirects` как статический файл. Здесь живет явный root rewrite `/ -> /index.html` и forced `404!` для scanner URL.
- `static/llms.txt` — корневой Markdown-файл для LLM/AI-агентов. Hugo копирует его в `public/llms.txt`, а опубликованный сайт отдает его по `/llms.txt`.
- `netlify.toml` — основной Netlify config со сборкой и статическими headers. Общий fallback на `404` не нужен: Netlify автоматически использует `public/404.html`.

Netlify обрабатывает `_redirects` раньше правил из `netlify.toml`. Внутри файла первое совпавшее правило выигрывает, поэтому более конкретные правила должны стоять выше более общих.

## 2. Назначение `static/_redirects`

Текущий `static/_redirects` не является SEO-картой старых URL.

Его задачи:

- явно переписать корневой `/` на `/index.html` со статусом `200`;
- принудительно отдавать кастомную `404` для типовых bot/scanner запросов.

Основные группы scanner/sensitive правил:

- URL сканеров WordPress: `/wp-login.php`, `/wp-admin/*`, `/xmlrpc.php`;
- запросы к API WordPress: `/wp-json/*`;
- запросы WordPress с дублированным начальным слешем: `//blog/wp-includes/wlwmanifest.xml`;
- sensitive files: `/.env`, `/.git/*`, `/.aws/*`;
- запросы конфигурации фреймворков и облачных сервисов: `/_nuxt/*`, `/.vite/*`, `/__/firebase/*`, `/runtime-config.js`, `/openapi.json`;
- запросы Joomla и файловых менеджеров: `/media/system/js/*`, `/filemanager/*`, `/assets/plugins/filemanager/*`;
- запросы PHP, debug и резервных копий: `/info.php`, `/test.php`, `/dev/phpinfo.php`, `/wp-config.php.backup`, `/license.txt`;
- типовые запросы резервных копий и конфигурации: `/config.php`, `/database.sql`, `/backup.sql`;
- запросы cPanel и OpenID: `/cpanel/*`, `/openid_connect/*`.

Для таких правил используется статус `404!`.

## 3. Почему `404!`

В Netlify `404` показывает страницу ошибки без смены URL в адресной строке.

`!` делает правило forced. Это важно для scanner/sensitive URL: если файл с таким путем случайно окажется в publish-директории, forced rule все равно должен отдать кастомную `404`, а не содержимое файла.

Пример:

```text
/.env                                   /404.html  404!
/.git/*                                 /404.html  404!
```

Это не заменяет нормальную hygiene проекта: `.env`, `.git`, `.DS_Store`, дампы БД и backup-файлы не должны попадать в `static/` и `public/`.

## 4. Синтаксис Netlify

В `_redirects` нельзя использовать `*` как wildcard в середине пути.

Не делать так:

```text
/*/wp-login.php                         /404.html  404!
/*/.env                                 /404.html  404!
```

Для одного path segment использовать placeholder:

```text
/:prefix/wp-login.php                   /404.html  404!
/:prefix/.env                           /404.html  404!
```

Для остатка пути использовать splat в конце:

```text
/wp-admin/*                             /404.html  404!
/cpanel/*                               /404.html  404!
```

Для scanner URL с двойным начальным slash использовать явный двойной slash и placeholder:

```text
//:prefix/wp-includes/*                 /404.html  404!
```

Текущие `/:prefix/...` правила покрывают один уровень вложенности, например `/ru/wp-login.php`. Более глубокие scanner URL обычно доходят до автоматической Netlify `404`.

## 5. Контентные 301 и автоматическая 404

Если Netlify Analytics показывает старый или ошибочный пользовательский URL, который явно относится к существующему контентному intent, его можно вести `301` на новую страницу только при наличии реальной замены.

Если статья или страница удалена без замены и возвращаться не будет, оставляем обычную `404`. Не нужно отправлять такой URL на примерно похожую статью: это создает неверный SEO-сигнал и плохое ожидание для пользователя.

Если URL выглядит человекопохожим, но не является реальной старой страницей и не имеет подтвержденной точной замены, оставляем обычную `404`. Текущие parser/noise URL из логов `/aboutus`, `/about-us`, `/company`, `/company-profile`, `/profile` и `/contactus` не редиректим.

Такие правила живут в `netlify.toml`. Пример ниже — схема, а не текущий redirect проекта:

```toml
[[redirects]]
  from = "/ru/articles/old-guide/"
  to = "/ru/articles/new-guide/"
  status = 301
```

Не смешивать такие пользовательские redirects со scanner-noise в `static/_redirects`.

Для всех несуществующих URL Netlify сам использует корневой `public/404.html`. Отдельные правила в `static/_redirects` нужны только там, где важен forced `404!` или более явная обработка scanner-noise.

## 6. Шаблон `layouts/404.html`

HTML кастомной страницы ошибки задается в `layouts/404.html`.

Для нее обязательно:

- украинская и русская версии должны оставаться локализованными;
- `/404.html` и `/ru/404.html` должны оставаться `noindex,nofollow`;
- страница не должна рендерить JSON-LD;
- ссылка на главную должна вести на текущий язык: `/` для `uk`, `/ru/` для `ru`;
- после изменения 404-шаблона проверять главную, `/404.html` и `/ru/404.html`.

## 7. HTTP-заголовки

HTTP headers задаются в `netlify.toml`, в блоке:

```toml
[[headers]]
  for = "/*"
  [headers.values]
```

Текущий security baseline:

- `X-Frame-Options = "DENY"`;
- `X-Content-Type-Options = "nosniff"`;
- `Cross-Origin-Opener-Policy = "same-origin"`;
- `Referrer-Policy = "strict-origin-when-cross-origin"`;
- `Permissions-Policy = "geolocation=(), microphone=(), camera=()"`;
- `Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"`;
- `Content-Security-Policy` без inline scripts, с `trusted-types aerocool-service-worker` и `require-trusted-types-for 'script'`.

`Cross-Origin-Opener-Policy: same-origin` нужен для изоляции top-level окна от других browsing contexts. Он закрывает PageSpeed warning про отсутствующий COOP.

Trusted Types включены через CSP, поэтому DOM XSS sinks и некоторые script URL assignments становятся строже. В проекте это особенно касается регистрации service worker:

```text
assets/js/site.js
```

Функция `getServiceWorkerUrl()` создает policy `aerocool-service-worker` и разрешает только локальный `/sw.js`. Не заменять ее обратно на прямой `navigator.serviceWorker.register('/sw.js')`: при текущем CSP Chrome блокирует такую строку ошибкой `This document requires 'TrustedScriptURL' assignment`, а PageSpeed затем может показать PWA-проблему со service worker или `start_url`.

Не добавлять `Cross-Origin-Embedder-Policy` автоматически вместе с COOP. COEP может ломать кросс-ориджин ресурсы, если они не отдают нужные CORS/CORP headers. Для текущего PageSpeed warning достаточно COOP.

WebMCP в Chrome требует origin isolation и permissions policy, но это не означает, что в проект нужно автоматически добавлять COEP или широкий `Permissions-Policy`. Текущий WebMCP-слой реализован как declarative form annotations в HTML и проверяется через PageSpeed/Lighthouse Agentic Browsing. Если будущая версия Chrome или PageSpeed потребует новые headers для WebMCP, менять `netlify.toml` только после отдельной проверки на Deploy Preview, потому что headers могут повлиять на изображения, service worker и внешние ресурсы.

Для cache rules не использовать brace glob в `for`, например `/*.{css,js,woff2}`. Netlify CLI трактует такие значения как route pattern и может вернуть ошибку `invalid regular expression: incomplete {} quantifier`. Вместо этого держать явные правила вроде `/assets/*`, `/images/*`, `/*.svg`, `/*.webmanifest`.

Общие security headers должны оставаться в `for = "/*"`, а правила кэширования ресурсов должны стоять выше них. Если меняется кэширование, проверьте итоговые headers на Deploy Preview: локальный Netlify Dev может вести себя иначе, чем опубликованный CDN.

Текущий контракт:

| URL | Browser `Cache-Control` | Причина |
|---|---|---|
| `/assets/*` | `public, max-age=31536000, immutable` | Hugo создает URL с отпечатком содержимого; новый файл получает новый URL. |
| `/images/*`, `/*.ico`, `/*.png`, `/*.svg`, `/*.webmanifest` | `public, max-age=0, must-revalidate` | URL стабильны и могут получить новое содержимое при следующем deploy. |
| HTML и остальные статические файлы | базовое правило Netlify | Браузер перепроверяет свежесть; CDN Netlify автоматически инвалидирует измененные файлы при deploy. |

Атомарный deploy очищает или инвалидирует кэш Netlify CDN для изменившихся статических файлов, но не может очистить уже заполненный кэш браузера посетителя. Поэтому `immutable` разрешен только для content-hashed URL. Сам факт, что файл меняется через новый deploy, недостаточен.

Переходный статус 2026-07-13: Branch Deploy `dev` уже отдает для `/images/logo.svg` правильный `Cache-Control: public,max-age=0,must-revalidate`, а ресурс `/assets/*` с отпечатком содержимого сохраняет `public,max-age=31536000,immutable`. Основной домен `https://aerocool.ua/images/logo.svg` все еще отдает прежний `immutable`, потому что соответствующее изменение еще не перенесено в production-ветку. После следующего production-развертывания эту проверку нужно повторить для логотипа, favicon, SVG, webmanifest и ресурса `/assets/*` с отпечатком.

Custom headers из `netlify.toml` применяются только к файлам из backing store Netlify. Они не добавляются автоматически к ответам Netlify Functions, Edge Functions или proxy. Функция должна самостоятельно вернуть `Cache-Control`, CORS и другие необходимые заголовки. Текущая `netlify/functions/reviews.mjs` возвращает `Cache-Control: no-store` для всех своих ответов.

## 8. Проверка после правок

Минимальная проверка:

```bash
npm run build
nl -ba public/_redirects
find static public -name '.DS_Store' -print
```

Что проверить:

- `public/_redirects` содержит актуальные правила из `static/_redirects`;
- `public/llms.txt` существует, содержит H1 и Markdown-ссылки;
- нет mid-path splat вида `/*/something`;
- scanner/sensitive правила используют `404!`;
- файл заканчивается newline;
- `.DS_Store` не попал в `static/` и `public/`;
- `public/404.html` и `public/ru/404.html` содержат `noindex,nofollow`;
- после изменения `Content-Security-Policy` опубликованный Deploy Preview не пишет CSP/Trusted Types errors в console;
- service worker регистрируется и контролирует `start_url` из `manifest.webmanifest`.

Для полной проверки redirect engine и headers использовать Netlify Deploy Preview или Netlify CLI, потому что локальная Hugo-сборка проверяет генерацию файлов, но не полностью эмулирует Netlify routing и HTTP headers.

Локальная Netlify CLI проверка после `npm run build`:

```bash
npm exec --yes --package=netlify-cli netlify -- build --dry --offline
npm exec --yes --package=netlify-cli netlify -- dev -d public --offline --skip-gitignore --no-open --port 8899
```

В отдельном терминале проверить:

```bash
curl -sS -I http://localhost:8899/
curl -sS -I http://localhost:8899/about/
curl -sS -I http://localhost:8899/wp-login.php
curl -sS -I http://localhost:8899//blog/wp-includes/wlwmanifest.xml
curl -sS -I http://localhost:8899/ru/articles/how-to-choose-office-desk-2025/
curl -sS -I http://localhost:8899/ads.txt
```

Ожидаемый результат:

- `/` и реальные страницы вроде `/about/` отдают `200`;
- scanner/sensitive URL отдают `404`;
- удаленные без замены материалы, например `/ru/articles/how-to-choose-office-desk-2025/`, остаются `404`;
- несуществующие обычные URL, например `/ads.txt`, отдают автоматическую кастомную `404`.
- `/llms.txt` отдает `200` и plain text/Markdown-содержимое.

Netlify CLI может создать локальные артефакты `.netlify/` и `deno.lock`; они должны оставаться в `.gitignore` и не попадать в коммит.

## 9. PageSpeed Insights после Deploy

В `netlify.toml` нет post-deploy browser audit plugin. Это намеренно: Netlify должен собирать и публиковать сайт, а не блокировать deploy из-за внешнего browser runtime.

После важного Branch Deploy или production deploy проверять опубликованные URL через PageSpeed Insights:

```text
https://pagespeed.web.dev/
```

Минимальный набор URL и целевые ориентиры описаны в [quality/13-pagespeed-insights-audit.md](../quality/13-pagespeed-insights-audit.md). Если менялись `static/_redirects`, CSP, headers или 404, сначала выполнить routing-проверки из раздела 8, затем уже смотреть PageSpeed.

Если менялся `static/llms.txt` или WebMCP-разметка форм, в PageSpeed дополнительно смотреть Agentic Browsing-блоки: покрытие форм WebMCP, зарегистрированные инструменты WebMCP, валидность схем и рекомендации по `llms.txt`.
