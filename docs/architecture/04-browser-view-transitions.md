# Руководство по View Transitions

Обновлено: 2026-07-13.

View Transitions — это мягкая анимация между страницами при переходе по внутренним ссылкам. В проекте `Aerocool` эта логика вынесена во внешний JavaScript-файл, чтобы не использовать inline scripts и не ослаблять `Content-Security-Policy`.

Так как view transitions могут влиять на `INP`, любые изменения этого слоя дополнительно проверять по [12-core-web-vitals-guide-2026.md](../quality/12-core-web-vitals-guide-2026.md).

Проще говоря:

```text
assets/js/site.js отвечает за поведение в браузере.
assets/css/main.css отвечает за визуальные стили и анимации.
layouts/_partials/footer.html подключает собранный site.js.
```

## 1. Где находится основной скрипт

Актуальное место:

```text
assets/js/site.js
```

Внутри этого файла есть функция:

```js
setupViewTransitions()
```

Она:

- проверяет, поддерживает ли браузер `document.startViewTransition`;
- перехватывает клики по внутренним ссылкам;
- игнорирует внешние ссылки;
- игнорирует `mailto:` и `tel:`;
- игнорирует ссылки на скачивание;
- игнорирует клики с `Cmd`, `Ctrl`, `Shift`, `Alt`;
- не вмешивается в якорные переходы на той же странице;
- если что-то пошло не так, делает обычный переход без анимации.

## 2. Почему скрипт больше не в `extend_footer.html`

Раньше подобную логику можно было вставлять inline-скриптом в footer.

Сейчас в проекте выбран более безопасный вариант:

```text
никаких inline scripts для этой логики
```

Причина:

- так проще держать строгий CSP;
- внешние quality-проверки меньше ругаются;
- весь клиентский JS лежит в одном понятном файле;
- footer-шаблон не превращается в склад скриптов.

Файл `layouts/_partials/extend_footer.html` сейчас содержит только комментарий:

```go-html-template
{{- /* Footer behavior lives in assets/js/site.js so production CSP can avoid inline scripts. */ -}}
```

Это намеренно.

## 3. Где подключается `site.js`

Файл подключается в:

```text
layouts/_partials/footer.html
```

Там Hugo:

- берет `assets/js/site.js`;
- собирает его через Hugo Pipes;
- минифицирует;
- добавляет fingerprint;
- подключает через внешний `<script defer ...>`.

Это значит, что браузер получает не исходный `assets/js/site.js`, а оптимизированный файл в `public/assets/js/...`.

## 4. Что еще делает `assets/js/site.js`

Кроме View Transitions, этот файл отвечает за:

- запоминание scroll-позиции меню;
- плавные переходы по якорям;
- кнопку “наверх”;
- переключатель темы, если он есть;
- закрытие мобильного меню;
- очистку телефона в contact-форме;
- кнопки копирования кода;
- регистрацию service worker.

Регистрация service worker совместима с текущим CSP и Trusted Types:

- `netlify.toml` включает `require-trusted-types-for 'script'`;
- CSP разрешает policy `aerocool-service-worker`;
- `assets/js/site.js` получает `/sw.js` через `getServiceWorkerUrl()`;
- policy разрешает только локальный `/sw.js`.

Не заменять этот код на прямой `navigator.serviceWorker.register('/sw.js')`. В Chrome при включенных Trusted Types такая строка блокирует регистрацию service worker и дает console error `This document requires 'TrustedScriptURL' assignment`. Отдельного PWA-балла в актуальном PageSpeed Insights больше нет, поэтому проверять нужно саму регистрацию, управление `start_url`, manifest и ошибки консоли.

Поэтому новичку важно помнить:

```text
если это поведение в браузере, сначала проверяйте assets/js/site.js
```

## 5. Где находится основной контейнер страницы

Основной контейнер страницы находится в:

```text
layouts/baseof.html
```

Пример:

```go-html-template
<main class="main">
  {{ block "main" . }}{{ end }}
</main>
```

View Transitions работают на уровне перехода между документами. Основной контейнер важен для общей структуры страницы, но текущая логика не требует отдельного inline-скрипта в `baseof.html`.

## 6. Где подключен prefetch

Prefetch основных страниц меню подключается в:

```text
layouts/_partials/head.html
```

Он помогает браузеру заранее подготовить некоторые внутренние страницы.

## 7. Куда добавлять CSS для анимаций

Если нужно усилить или изменить визуальную анимацию, CSS добавлять в:

```text
assets/css/main.css
```

Пример:

```css
@layer components {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

Важно: в проекте нужно уважать `prefers-reduced-motion`. Если пользователь просит меньше анимаций на уровне системы, сайт не должен навязывать движение.

## 8. Что проверять после изменений

После правки View Transitions проверить:

1. Переход с главной в каталог.
2. Переход из каталога в товар.
3. Переход из статьи в связанную модель.
4. Переключение языка `uk` / `ru`.
5. Внешнюю ссылку: она не должна перехватываться.
6. `mailto:` и `tel:`: они не должны перехватываться.
7. Якорную ссылку на той же странице.
8. Настройку `prefers-reduced-motion`.

Минимальная техническая проверка из корня репозитория:

```bash
npm run build
npm run build:production
```

## 9. Что не делать

- Не возвращать inline script в `extend_footer.html`.
- Не переносить логику в тему `themes/PaperMod`.
- Не создавать `layouts/_default/baseof.html` ради этой задачи.
- Не ломать обычную навигацию ради анимации.
- Не перехватывать внешние ссылки, скачивания, `mailto:` и `tel:`.

## 10. Самая короткая памятка

Если нужно поменять поведение:

```text
assets/js/site.js
```

Если нужно поменять внешний вид анимации:

```text
assets/css/main.css
```

Если нужно понять, как JS попадает на страницу:

```text
layouts/_partials/footer.html
```
