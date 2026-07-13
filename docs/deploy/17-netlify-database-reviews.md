# Netlify Database для отзывов с безопасной SEO-архитектурой

Обновлено: 2026-07-13.

Этот документ объясняет, как в проекте `Aerocool Ukraine` использовать `Netlify Database` для собственной системы отзывов к товарам и статьям.

Главная цель: не просто сохранять отзывы, а поддерживать безопасный процесс, в котором `Product` JSON-LD получает рейтинг только из реальных публичных approved-отзывов, видимых пользователю на той же странице.

## Как пользоваться новичку

Если опыта работы с Netlify Database нет, читайте документ в таком порядке:

1. Раздел 1 объясняет, что уже подключено.
2. Раздел 2 дает актуальный алгоритм работ.
3. Раздел 3 объясняет, зачем нужна база.
4. Раздел 4 показывает команды запуска.
5. Раздел 5 объясняет миграции.
6. Раздел 6 фиксирует целевую таблицу отзывов.
7. Раздел 7 объясняет `review_target_id`.
8. Раздел 8 объясняет SEO-first pipeline.
9. Раздел 11 показывает, что проверять после изменений.

Не начинайте с формы на сайте. Сначала нужно зафиксировать структуру данных, модерацию и экспорт approved-отзывов во время сборки.

## 1. Текущий статус

Проверено 2026-07-13:

- `Netlify CLI` установлен через `brew`;
- версия CLI: `netlify-cli/26.2.0` локально проверена через `netlify --version`;
- локальная копия репозитория связана с Netlify-проектом `hugo-aerocool`;
- production URL проекта: `https://aerocool.ua`;
- `Netlify Database` включена для проекта;
- пакет `@netlify/database` установлен в корневой `package.json`;
- выбран режим `Direct SQL`;
- sample data не создавались;
- создана первая миграция `20260526171923_create-reviews-table`;
- добавлена отдельная миграция `20260713120000_add-review-privacy-consent`, которая не переписывает уже примененную первую миграцию и добавляет доказательство согласия;
- миграция локально применена через `netlify database migrations apply`;
- добавлена функция `netlify/functions/reviews.mjs` для `POST /api/reviews`; другие методы получают `405 Method Not Allowed`;
- все текущие товарные страницы в украинской и русской версии получили стабильный `review_target_id` и `reviews_enabled: true`;
- форма отзывов выводится только для товаров с явными `review_target_id` и `reviews_enabled: true`, содержит локализованную ссылку на `/privacy/` и обязательный checkbox без предварительной отметки;
- локально и на Netlify branch `dev` проверено, что `POST /api/reviews` создает запись в `reviews` со статусом `pending`;
- добавлен build-time export `scripts/export_reviews.mjs`, который пишет approved отзывы в `data/generated/reviews.json`;
- товарный шаблон и карточки товаров умеют показывать approved-отзывы и средний рейтинг из сгенерированного снимка;
- `Product.aggregateRating` строится из того же снимка и не выводится, если у товара нет approved-отзывов;
- на `https://dev--hugo-aerocool.netlify.app/products/sky/light/#reviews` проверен полный цикл: отправка отзыва, ручная модерация `pending -> approved`, новый deploy `dev`, появление видимого отзыва на странице.

Netlify Database доступна только на credit-based plans и расходует credits на compute и bandwidth. Официальная страница указывала бесплатное хранение данных только до 2026-07-01; эта дата уже прошла. Перед production-нагрузкой обязательно проверять актуальные тарифы, расход credits и лимиты именно в Netlify Dashboard. Документация проекта не считает базу безусловно бесплатной.

### Обязательная переменная `REVIEW_EMAIL_HASH_SALT`

Функция хэширует email автора с секретной солью из `REVIEW_EMAIL_HASH_SALT`. Production и branch deploy нельзя считать корректно настроенными без этой переменной.

1. Откройте Netlify Dashboard -> Project configuration -> Environment variables.
2. Создайте случайное секретное значение достаточной длины, например вывод `openssl rand -hex 32`.
3. Сохраните его как `REVIEW_EMAIL_HASH_SALT`.
4. Убедитесь, что scope включает `Functions` или все scopes.
5. Создайте новый deploy: Functions получают значения, действовавшие в момент deploy.

Не записывайте secret в `netlify.toml`, `.env` под Git или Markdown. Netlify прямо указывает, что переменные из `netlify.toml` недоступны Functions во время выполнения; используйте UI, CLI или API. Текущий код имеет пустой fallback, поэтому отсутствие секрета не останавливает функцию автоматически, но является запрещенным операционным состоянием и должно выявляться перед deploy.

Управление базой в Netlify находится здесь:

```text
https://app.netlify.com/projects/hugo-aerocool/database
```

## 2. Актуальный алгоритм работ

Это текущий порядок работы системы отзывов после подключения Netlify Database.

### Уже сделано

1. Установлен `Netlify CLI`.
2. Выполнен `netlify login`.
3. Выполнен `netlify link`.
4. Локальная папка связана с проектом `hugo-aerocool`.
5. Выполнен `netlify database init`.
6. Выбран режим `Direct SQL`.
7. Sample data не создавались.
8. Установлен пакет `@netlify/database`.
9. Создана SQL-миграция `reviews`.
10. Миграция локально применена и проверена через `SELECT COUNT(*) AS review_count FROM reviews;`.
11. В `SKY Light` добавлены `review_target_id` и `reviews_enabled` в `uk` и `ru`; после проверки эти поля масштабированы на все текущие товары.
12. Вкладка и форма отзывов ограничены товарами с включенным `reviews_enabled`.
13. Добавлен `POST /api/reviews`, который сохраняет только `pending` отзывы.
14. Локально проверена отправка тестового отзыва: запись появилась в `reviews` со статусом `pending`.

### Текущий рабочий шаг

После изменения статуса отзыва на `approved` нужно запустить новый deploy/rebuild:

```text
approved review в Netlify Database
-> новый build
-> scripts/export_reviews.mjs
-> data/generated/reviews.json
-> Hugo renders visible review
```

На ветке `dev` этот сценарий уже подтвержден на `SKY Light`. `Product.aggregateRating` подключен к тому же снимку и появляется только при наличии видимых approved-отзывов. После масштабирования на каталог устаревшие `rating.value` и `rating.count` удалены из товарного front matter; следующий операционный шаг — поддерживать модерацию, пересборку после одобрения и проверку отчетов rich results на branch/production.

### Полный алгоритм V1

1. Создать миграцию `reviews`. Готово: `20260526171923_create-reviews-table`.
2. Вставить SQL таблицы отзывов. Готово.
3. Запустить локальное окружение. Проверено:

   ```bash
   netlify dev
   ```

4. В другом терминале применить миграции. Проверено:

   ```bash
   netlify database migrations apply
   ```

5. Проверить состояние базы. Проверено:

   ```bash
   netlify database status
   ```

6. Добавить `review_target_id` и `reviews_enabled` сначала в один тестовый товар, например `SKY Light`, в обе языковые версии. Готово.
7. Сделать `POST /api/reviews`, который создает только `pending` отзыв. Готово локально.
8. Проверить `POST /api/reviews` на Netlify branch-сайте `dev`. Готово на `https://dev--hugo-aerocool.netlify.app/`.
9. Сделать минимальный admin endpoint или временный SQL-flow для перевода отзыва в `approved`, `rejected` или `spam`. Временно проверяется ручным редактированием статуса в Netlify Dashboard.
10. Сделать build-time export approved отзывов в `data/generated/reviews.json`. Готово через `scripts/export_reviews.mjs`.
11. Подключить Hugo partial для вывода реальных approved отзывов сначала на тестовом товаре. Готово через `layouts/_partials/reviews/list.html`.
12. Проверить после rebuild, что approved отзыв виден на `SKY Light`. Готово на branch `dev`.
13. Переключить `Product.aggregateRating` на сгенерированный снимок отзывов. Готово.
14. Проверить два состояния:

    ```text
    нет approved отзывов -> нет AggregateRating
    есть approved отзыв -> visible review block + AggregateRating
    ```

15. После успешной проверки масштабировать `review_target_id` на остальные товары. Готово для текущего каталога.
16. Статьи подключать вторым этапом, без `AggregateRating` в `Article` JSON-LD.

### Что не делать в первом проходе

Не делать:

- не начинать с красивой админки;
- не подключать отзывы сразу ко всем товарам;
- не подключать статьи до проверки товарного pipeline;
- не добавлять `Review` JSON-LD раньше visible approved отзывов;
- не возвращать front matter `rating.value` / `rating.count` как источник `Product.aggregateRating`.

## 3. Что такое Netlify Database

`Netlify Database` — это управляемая `PostgreSQL`-база, встроенная в Netlify workflow.

В этом проекте она нужна для хранения:

- пользовательских отзывов;
- рейтинга 1-5;
- имени автора;
- email автора в приватном виде;
- статуса модерации;
- даты создания и публикации отзыва.

Проще говоря:

```text
форма отзыва
-> Netlify Function
-> Netlify Database
-> pending review
-> moderation
-> approved review
-> Hugo build
-> visible review + Product JSON-LD
```

## 3.1. Ветвление базы данных

`Netlify Database` использует ветки базы.

Для проекта это значит:

```text
production deploy -> production database branch
dev branch deploy -> dev database branch
Deploy Preview -> отдельная database branch, если используется PR/preview
local netlify dev -> локальная база на машине разработчика
```

Текущая рабочая ветка разработки — `dev`. Ее тестовый сайт:

```text
https://dev--hugo-aerocool.netlify.app/
```

По подтверждению поддержки Netlify для этого проекта branch-сайт `dev--hugo-aerocool.netlify.app` можно использовать для частых автодеплоев и тестирования без расходования production-лимитов основного домена.

Для отзывов это значит:

```text
dev-сайт -> database branch dev
production-сайт -> database branch production
local netlify dev -> локальная база
```

Важно: команда `netlify database connect --query "..."` в обычном локальном окружении подключается к локальной development database. Для проверки remote branch `dev` надежнее использовать Netlify Dashboard: `Database -> dev -> View and edit data` или SQL console внутри branch `dev`.

Тестовые отзывы, миграции и SQL-проверки в `dev` не должны вручную переноситься в `production`. Для production нужны реальные пользовательские отзывы, отправленные через production URL и прошедшие модерацию.

Практический порядок проверки после deploy:

1. Открыть `https://dev--hugo-aerocool.netlify.app/`.
2. Отправить отзыв на `SKY Light`.
3. Проверить Netlify Function logs для `/api/reviews`.
4. Проверить database branch `dev` в Netlify Dashboard.
5. Убедиться, что отзыв попал в `reviews` со статусом `pending`.
6. Изменить статус на `approved`.
7. Запустить новый deploy `dev`.
8. Проверить, что отзыв появился в HTML на `SKY Light`.

## 4. Базовые команды

Все команды выполнять из корня репозитория.

Проверить аккаунт и привязку проекта:

```bash
netlify status
```

Проверить состояние базы и миграций:

```bash
netlify database status
```

Запустить локальное Netlify-окружение:

```bash
netlify dev
```

Важно: локальная база стартует автоматически вместе с `netlify dev`. Если запустить `netlify database status` без `netlify dev`, CLI может написать, что local database не запущена. Это нормально.

Выполнить одноразовый SQL-запрос:

```bash
netlify database connect --query "SELECT 1"
```

Открыть интерактивную SQL-консоль:

```bash
netlify database connect
```

## 5. Миграции

Миграция — это SQL-файл, который меняет структуру базы.

Пример: создать таблицу `reviews`, добавить индекс, добавить новое поле.

В проекте используется `Direct SQL`, поэтому схему пишем руками в SQL. `Drizzle ORM` для v1 review-системы не нужен: таблица простая, а ручной SQL прозрачнее для проверки.

Создать миграцию:

```bash
netlify database migrations new --description "create reviews table" --scheme timestamp
```

Ожидаемое место для миграций:

```text
netlify/database/migrations/
```

Текущая первая миграция:

```text
netlify/database/migrations/20260526171923_create-reviews-table/migration.sql
```

Применить pending migrations локально:

```bash
netlify database migrations apply
```

На deploy Netlify применяет миграции автоматически в рамках deploy lifecycle. Локально `migrations apply` нужен, чтобы проверить SQL до pull request или синхронизировать локальную базу после получения новых миграций.

Проверить, какие миграции применены:

```bash
netlify database status
```

Важное правило: если миграция уже применена, ее нельзя редактировать задним числом. Новое изменение схемы нужно делать новой миграцией.

## 6. Целевая таблица `reviews`

Минимальная таблица для v1:

```sql
CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('product', 'article')),
  target_id TEXT NOT NULL,
  target_url TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('uk', 'ru')),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_email_hash TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  moderation_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  privacy_consent BOOLEAN NOT NULL DEFAULT FALSE,
  privacy_consent_at TIMESTAMPTZ,
  privacy_policy_version TEXT
);

CREATE INDEX reviews_target_status_idx
ON reviews (target_type, target_id, language, status, created_at DESC);

CREATE INDEX reviews_email_hash_idx
ON reviews (author_email_hash);
```

Поля:

- `target_type` говорит, к чему относится отзыв: товар или статья;
- `target_id` — стабильный ID объекта отзыва;
- `target_url` — URL страницы, с которой отправили отзыв;
- `language` — язык страницы;
- `rating` — оценка 1-5;
- `author_email` хранится приватно и не выводится в публичный HTML;
- `author_email_hash` нужен для дедупликации и антиспама без публичного email;
- `status` управляет модерацией;
- `privacy_consent` фиксирует факт обязательного согласия;
- `privacy_consent_at` хранит серверное время принятия формы;
- `privacy_policy_version` показывает, с какой редакцией политики согласился автор.

Первая фактическая миграция также добавляет триггер `reviews_set_updated_at`, который обновляет `updated_at` при изменении строки. Вторая миграция добавляет три privacy-поля и constraint: для записи с `privacy_consent=true` время и версия политики не могут быть пустыми. Старые записи получают `privacy_consent=false`; новые записи функция создает только после явного подтверждения пользователя.

## 7. `review_target_id` для товаров

Для товаров нельзя привязывать отзывы только к URL. У товара есть украинская и русская версии, а URL может измениться.

Целевой front matter:

```yaml
review_target_id: "stable-product-id"
reviews_enabled: true
```

На текущем этапе эти поля включены для всех текущих товарных страниц. Примеры:

```text
content/products/sky/light/index.md
content/products/sky/light/index.ru.md
content/products/wing/racer-black/index.md
content/products/xtal/mesh-black/index.ru.md
```

Шаблон `layouts/products/single.html` выводит вкладку и форму отзывов только если у товара есть оба поля: `review_target_id` и `reviews_enabled: true`. Шаблон `layouts/products/list.html` выводит средний рейтинг в карточке товара только если для этого `review_target_id` есть approved отзывы в `data/generated/reviews.json`.

Правило:

- украинская и русская версии одного товара используют одинаковый `review_target_id`;
- `language` хранится отдельно в базе;
- `Product` JSON-LD получает рейтинг только для текущего `review_target_id`;
- отзывы не агрегируются между разными моделями, сериями или категориями.

Для production SEO-режима лучше показывать на каждой языковой странице отзывы на языке этой страницы. До внедрения переводов на branch `dev` временно используется общий вывод approved отзывов для `uk` и `ru`, чтобы проверить интерфейс и расчет рейтинга на обеих версиях товара.

## 8. SEO-ориентированный процесс для отзывов

Для максимального SEO нельзя полагаться только на клиентский `fetch`.

Правильный поток:

```text
Netlify Database
-> approved reviews
-> scripts/export_reviews.mjs
-> data/generated/reviews.json
-> Hugo renders visible reviews
-> Hugo renders Product JSON-LD
```

Почему так:

- Google должен видеть отзывы в HTML;
- `AggregateRating` должен описывать видимый контент;
- `ratingValue` и `reviewCount` должны считаться из той же выборки, которая показана пользователю;
- hidden или runtime-only рейтинги повышают риск для rich results.

Целевой файл для Hugo:

```text
data/generated/reviews.json
```

Файл создается перед сборкой командой:

```bash
node scripts/export_reviews.mjs
```

В `package.json` этот шаг встроен в `npm run build` и `npm run build:production`. В `netlify.toml` он встроен в Netlify build command перед `hugo --environment development --gc --minify`. Поэтому `npm run build` — нормальная команда полной локальной проверки: она не считается рискованной для отзывов, а повторяет штатный dev pipeline проекта.

Текущий временный режим для `dev`: export сохраняет отзывы и по языкам (`uk`, `ru`), и в общей группе `all`. Шаблон видимых отзывов пока берет группу `all`, чтобы украинская и русская страницы товара показывали одинаковый набор approved отзывов до внедрения нормальных переводов. Это переходное решение для тестирования UI, рейтинга и будущей SEO-логики. Для production SEO-режима нужно вернуться к языковым текстам или добавить поля переводов, чтобы текст отзыва соответствовал языку страницы.

Если `NETLIFY_DB_URL` недоступен, например при обычной локальной сборке без `netlify dev`, скрипт пишет пустой снимок:

```json
{
  "product": {}
}
```

Это сохраняет локальную сборку рабочей. На Netlify Branch Deploy `dev` build видит database branch `dev`, поэтому approved отзывы появляются на dev-версии сайта после нового deploy/rebuild.

Пример структуры:

```json
{
  "product": {
    "sky-light": {
      "uk": {
        "ratingValue": 4.8,
        "reviewCount": 12,
        "reviews": []
      }
    }
  }
}
```

## 9. Netlify Functions для API отзывов

### 9.1. Что реализовано сейчас

```text
POST /api/reviews
```

`POST /api/reviews`:

- принимает отзыв;
- проверяет поля;
- очищает текст;
- требует `privacy_consent=accepted`;
- ставит статус `pending`;
- не публикует отзыв сразу.

Текущая реализация:

```text
netlify/functions/reviews.mjs
```

Функция принимает только `POST`, читает `application/x-www-form-urlencoded`, `multipart/form-data` или `application/json`, проверяет ловушку для ботов `bot-field`, валидирует поля и обязательное согласие, считает `author_email_hash` на сервере и записывает отзыв в `reviews` со статусом `pending`. Сервер, а не hidden-поле клиента, задает `privacy_policy_version=2026-07-13` и время согласия. Любой другой HTTP-метод, включая `GET`, получает `405 Method Not Allowed` с `Allow: POST`; функция не читает и не публикует approved-отзывы.

После успешной записи функция возвращает `303 See Other` на товарную страницу:

```text
/products/sky/light/?review=pending#reviews
```

Локальная проверка `2026-05-26`:

```text
POST /api/reviews -> 303 See Other
SELECT id, target_id, language, rating, author_name, status FROM reviews
-> target_id = sky-light, language = uk, rating = 5, status = pending
```

Важно: этот тестовый отзыв был создан в локальной базе, поднятой через `netlify dev`. В Netlify Dashboard он не виден. Для remote-проверки использовать branch-сайт `dev` и database branch `dev` в Netlify Dashboard.

Approved-записи читает [scripts/export_reviews.mjs](../../scripts/export_reviews.mjs) перед сборкой Hugo. Скрипт формирует `data/generated/reviews.json`; публичный HTML не запрашивает базу во время открытия страницы.

### 9.1.1. Согласие, публикация и сроки хранения

Форма заранее не отмечает checkbox. Текст рядом с ним отдельно объясняет две операции: приватную обработку имени и email для проверки, а после модерации — публичный вывод имени, оценки, текста и даты. Email, `privacy_consent_at` и `privacy_policy_version` не попадают в build-time export.

Операционный регламент хранения должен соответствовать опубликованной политике:

- `pending`, `rejected` и `spam` пересматривать и удалять не позднее 12 месяцев после создания или последней модерации;
- approved-отзыв и приватный email хранить, пока отзыв опубликован и нужен для подтверждения происхождения или обработки запроса автора;
- после удаления публичного отзыва удалить связанные приватные данные в течение 30 дней, если нет законной причины хранить их дольше;
- не использовать email автора для рассылки без отдельного добровольного согласия.

Автоматическая retention-задача пока не реализована. До ее появления ответственный за модерацию не реже одного раза в месяц проверяет старые строки в Netlify Database и фиксирует удаление. Нельзя обещать срок в публичной политике и одновременно оставлять старые записи без операционной проверки.

### 9.2. Что пока не реализовано

Следующие маршруты являются возможным будущим интерфейсом чтения и модерации, а не текущим API:

```text
GET /api/reviews?target_id=...
GET /api/admin/reviews
PATCH /api/admin/reviews/:id
```

Будущие административные маршруты должны:

- требовать надежную аутентификацию и авторизацию;
- показывать `pending`-отзывы без раскрытия приватных данных публичному API;
- переводить отзыв в `approved`, `rejected` или `spam`;
- после `approved` запускать Netlify build hook, чтобы Hugo пересобрал HTML и JSON-LD.

Пока эти маршруты отсутствуют, статус изменяется вручную в Netlify Dashboard, после чего запускается новый deploy.

При реализации административного API сначала выбирают механизм аутентификации и модель прав, затем ограничивают методы, поля ответа и журналируют изменения статуса. Нельзя копировать в production пример `SELECT *` без проверки администратора: такая функция способна раскрыть email и другие приватные данные.

Текущая функция использует современный Netlify-формат с `default export` и `config`, но написана как JavaScript-модуль `.mjs`. Она не импортирует типы `Context` или `Config`, поэтому пакет `@netlify/functions` ей не нужен. Добавляйте его как зависимость разработки только при переходе на TypeScript или использовании вспомогательных функций этого пакета.

## 10. Правила SEO для отзывов

`AggregateRating` в `Product` JSON-LD можно выводить только если:

- отзывы реальные;
- отзывы относятся именно к текущему товару;
- отзывы имеют статус `approved`;
- отзывы публично видны в HTML этой страницы;
- `ratingValue` и `reviewCount` посчитаны из approved отзывов;
- visible review block и JSON-LD используют один источник данных.

`Review` в JSON-LD можно добавлять только для тех отзывов, которые видны пользователю на странице.

Для статей в v1 отзывы можно показывать как публичный UGC-блок, но не добавлять `AggregateRating` в `Article` JSON-LD. Основной SEO-сценарий review rich results для проекта — товарные страницы.

## 11. Что проверять после изменений

После добавления миграции:

```bash
netlify dev
netlify database migrations apply
netlify database status
```

После добавления функций:

```bash
netlify dev
```

Проверить:

- `POST /api/reviews` создает только `pending`;
- запрос без `privacy_consent=accepted` получает `400` и не создает строку;
- принятая строка содержит `privacy_consent=true`, непустые `privacy_consent_at` и `privacy_policy_version`;
- публичная функция не отдает email;
- если добавлен административный endpoint, он защищен аутентификацией и авторизацией;
- `approved` отзыв попадает в build-time export;
- `data/generated/reviews.json` содержит только approved отзывы;
- Hugo не выводит `AggregateRating`, если approved отзывов нет;
- Hugo выводит `AggregateRating`, если approved отзывы есть и видны на странице;
- `npm run build` проходит без ошибок.

## 12. Чего не делать

Не делать:

- не создавать sample data в production-схеме;
- не использовать fake reviews;
- не возвращать front matter `rating.value` и `rating.count`;
- не показывать `AggregateRating` без видимых approved отзывов;
- не агрегировать отзывы серии в рейтинг отдельного товара;
- не публиковать отзыв без модерации;
- не принимать отзыв без явного согласия и не ставить checkbox заранее;
- не выводить email автора публично;
- не разрешать HTML в тексте отзыва без жесткой очистки;
- не хранить секреты в `netlify.toml`.
- не запускать production-функцию без `REVIEW_EMAIL_HASH_SALT`;

## 13. Официальная база

- Netlify Database: `https://docs.netlify.com/build/data-and-storage/netlify-database/`
- Netlify Database CLI: `https://docs.netlify.com/build/data-and-storage/netlify-database/cli/`
- Netlify Database API: `https://docs.netlify.com/build/data-and-storage/netlify-database/api/`
- Netlify environment variables for Functions: `https://docs.netlify.com/build/functions/environment-variables/`
- Netlify Forms submissions and PII management: `https://docs.netlify.com/manage/forms/submissions/`
- Netlify Privacy Statement: `https://www.netlify.com/privacy/`
- Netlify caching: `https://docs.netlify.com/build/caching/caching-overview/`
- Закон Украины «О защите персональных данных»: `https://zakon.rada.gov.ua/laws/show/2297-17#Text`
- Защита персональных данных у Уполномоченного Верховной Рады Украины по правам человека: `https://ombudsman.gov.ua/uk/zahist-personalnih-danih`
- Google Review Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/review-snippet`

## 14. Связанные документы

- [docs/content/05-front-matter-reference.md](../content/05-front-matter-reference.md)
- [docs/seo/21-ecommerce-structured-data-playbook-2026.md](../seo/21-ecommerce-structured-data-playbook-2026.md)
- [docs/seo/20-schema-markup-quality-checklist-2026.md](../seo/20-schema-markup-quality-checklist-2026.md)
- [docs/seo/26-json-ld-graph-audit-roadmap-2026.md](../seo/26-json-ld-graph-audit-roadmap-2026.md)
- [docs/deploy/16-netlify-routing.md](16-netlify-routing.md)
