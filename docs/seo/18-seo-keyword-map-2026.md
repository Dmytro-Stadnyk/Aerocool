# Карта ключевых слов 2026

Обновлено: 2026-07-13.

Базовая синхронизация документации с лучшими практиками 2026 зафиксирована в [50-2026-05-13-documentation-2026-best-practices-sync-audit.md](../audits/50-2026-05-13-documentation-2026-best-practices-sync-audit.md). Карта ключей остается редакционным инструментом: она помогает покрывать интенты, но не заменяет people-first content, Search Essentials, Core Web Vitals и production-мониторинг.

Этот документ фиксирует стратегию по ключевым словам для всего проекта `Aerocool` и распределение поисковых кластеров по страницам сайта. Рабочая CSV-база находится в [30-keyword-database-2026.md](30-keyword-database-2026.md), отдельный план развития семантического ядра на 2026 год — в [35-semantic-core-keyword-strategy-2026.md](35-semantic-core-keyword-strategy-2026.md), правила расширения контента под новые ключи — в [40-content-expansion-keyword-roadmap-2026.md](40-content-expansion-keyword-roadmap-2026.md), а операционная Top-1 growth system — в [41-semantic-core-top1-growth-system-2026.md](41-semantic-core-top1-growth-system-2026.md).

Порядок работы для новичка: карта не нужна для технической сборки сайта. Используйте ее при создании или переработке контента. Сначала найдите тип страницы, затем проверьте основной интент, ключевые фразы и соседние страницы, чтобы не создать две страницы под один запрос.

## Важное ограничение

Ни один набор ключевых слов не гарантирует `топ-1` в Google. Для первых позиций важны не только ключевые слова, но и:

- соответствие интенту страницы
- полезность и оригинальность контента
- качество `title` и сниппета
- внутренняя перелинковка
- сигналы доверия
- техническая корректность
- поведенческие сигналы и CTR

Поэтому задача этой карты — не “заспамить” страницы словами, а распределить спрос так, чтобы каждая URL закрывала свой реальный сценарий поиска.

## SEO основа для проекта

Слой ключевых слов в проекте строится на принципах Google Search Central:

- контент в первую очередь для людей
- полезный и надежный контент
- `title` и `description` под реальный интент, а не под переспам
- возможность держать SEO `title` и видимый `H1` отдельно через необязательный `h1`, если это помогает сниппету и пользовательскому восприятию, но без расхождения по интенту
- отсутствие переспама ключевыми словами
- одна основная поисковая задача на одну страницу
- отдельные URL под бренд, категорию, серию, товар, сравнение, гайд, новость и поддерживающий раздел

## Контентные стандарты для этой карты

Карта ключевых слов в проекте `Aerocool` теперь привязана не только к типу страницы, но и к глубине контента:

- постоянно актуальные статьи в `content/articles` обычно должны иметь `10000+` знаков основного текста на каждую языковую версию
- новости в `content/news`, если они используются как поддерживающие ранжирование посадочные страницы, обычно должны иметь `5000+` знаков тела на каждую языковую версию
- товарные страницы в `content/products/<series>/<model>/` обычно должны иметь `6000+` знаков основного текста на каждую языковую версию
- страницы серий в `content/products/<series>/_index.md` и `_index.ru.md` обычно должны иметь `6000+` знаков основного текста на каждую языковую версию
- хабы `/products/`, `/articles/` и `/news/` обычно должны иметь `7000+` знаков основного текста на каждую языковую версию
- страница `/about/` обычно должна иметь `10000+` знаков основного текста на каждую языковую версию
- объем набирается только через полезное расширение интента: сценарии выбора, сравнения, практические проверки, FAQ, внутренние переходы в каталог и объяснение коммерческой значимости
- SEO-посадочные страницы должны работать не только на брендовую видимость, но и на широкий коммерческий спрос
- служебные страницы вроде `/search/`, `404` и служебных alias-страниц не входят в карту целевых ключевых слов и не должны восприниматься как органические посадочные страницы

## Терминологический стандарт

- В keyword map, front matter, видимом контенте, FAQ, alt-текстах и внутренних ссылках механизм наклона пишется как `Synchronous Tilt`.
- Нижнерегистровое написание этого термина не использовать в редакционном тексте и метаданных.
- URL/slug остаются человекочитаемыми и нижнерегистровыми, если уже закреплены в структуре сайта: например, `/articles/what-is-synchronous-tilt/`.

## Архитектура интентов

### Главная

Главная страница закрывает брендовый и широкий коммерческий спрос:

- `aerocool`
- `aerocool украина`
- `игровые кресла aerocool`
- `офисные кресла aerocool`
- `компьютерные кресла aerocool`

### Каталог

Каталог закрывает общий выбор и сравнение внутри бренда:

- `игровые кресла aerocool`
- `офисные кресла aerocool`
- `компьютерные кресла aerocool`
- `каталог кресел aerocool`
- `какое кресло aerocool выбрать`

### Серии

Страницы серий закрывают средний коммерческий интент на уровне линейки:

- `Aerocool SKY` = офисные и компьютерные кресла
- `Aerocool WING` = игровые и офисные кресла
- `Aerocool XTAL` = игровые и компьютерные кресла

### Товары

Карточки товара закрывают SKU-интент плюс тип кресла:

- `купить aerocool sky light`
- `офисное кресло aerocool sky light`
- `цена aerocool sky light`
- `aerocool sky light в наличии`
- `характеристики aerocool sky light`
- `игровое кресло aerocool wing racer black`
- `компьютерное кресло aerocool xtal mesh black`

### Статьи

Статьи закрывают информационный интент и интент сравнения:

- `как выбрать кресло aerocool`
- `sky light или sky 360`
- `wing или xtal`
- `какое кресло для работы`
- `какое кресло для home office`
- `игровое кресло для длительных сессий`
- `офисное кресло для home office`
- `компьютерное кресло с регулировками`
- `как ухаживать за креслом aerocool`
- `кресло с хорошей вентиляцией`
- `wing mesh или wing loft air`
- `xtal racer или xtal mesh`
- `кресла для переговорной`
- `кресла для команды разработчиков`

### Новости

Новости закрывают брендовые запросы и запросы о запусках:

- `aerocool sky launch`
- `aerocool wing series`
- `aerocool xtal`
- `sky light 8d`
- `sky 360 11d`
- `aerocool sync5`
- `sync4 sync5 aerocool`
- `игровое кресло aerocool`
- `офисное кресло aerocool`
- `компьютерное кресло aerocool`

### Поддерживающие разделы

Поддерживающие страницы усиливают доверие и длинный хвост запросов:

- `faq aerocool`
- `контакты aerocool`
- `о бренде aerocool`
- `гарантия aerocool`
- `доставка aerocool`
- `права на использование изображений aerocool`

## Мастер-кластеры проекта

### 1. Брендовые запросы

- `aerocool`
- `aerocool ukraine`
- `aerocool украина`
- `aerocool официальный сайт`
- `aerocool офіційний сайт`
- `aerocool chairs`
- `кресла aerocool`
- `крісла aerocool`

### 2. Широкие коммерческие кластеры

Украинский слой:

- `ігрове крісло`
- `ігрові крісла`
- `офісне крісло`
- `офісні крісла`
- `комп'ютерне крісло`
- `комп'ютерні крісла`
- `ергономічне крісло`
- `крісло для роботи`
- `крісло для роботи за комп'ютером`
- `крісло для home office`
- `крісло для геймінгу`

Русский слой:

- `игровое кресло`
- `игровые кресла`
- `офисное кресло`
- `офисные кресла`
- `компьютерное кресло`
- `компьютерные кресла`
- `эргономичное кресло`
- `кресло для работы`
- `кресло для работы за компьютером`
- `кресло для home office`
- `кресло для гейминга`

### 3. Серийные кластеры

`SKY`

- `aerocool sky`
- `aerocool sky light`
- `aerocool sky 360`
- `sky light`
- `sky 360`
- `Synchronous Tilt`
- `3d x 360 armrest`
- `8d регулировка`
- `11d регулировка`

`WING`

- `aerocool wing`
- `wing racer black`
- `wing racer dark grey`
- `wing loft air`
- `wing mesh black`
- `dual backrest`
- `4d x 360 armrest`
- `11d регулировка`

`XTAL`

- `aerocool xtal`
- `xtal racer black`
- `xtal racer dark grey`
- `xtal loft air`
- `xtal mesh black`
- `fully replaceable design`
- `retail cushion replacement`
- `7d регулировка`

### 4. Материалы и форматы поверхности

- `leatherette`
- `breathable mesh`
- `mesh chair`
- `loft air`
- `racer`
- `mesh black`
- `dark grey`
- `light grey`
- `black chair`
- `уход за leatherette`
- `уход за mesh`
- `кресло с хорошей вентиляцией`
- `крісло з хорошою вентиляцією`
- `wing mesh или wing loft air`
- `xtal racer или xtal mesh`

### 5. Кластеры по сценариям использования

- `для работы`
- `для home office`
- `для гейминга`
- `для ежедневного использования`
- `для долгой работы`
- `для длительных игровых сессий`
- `для вентиляции`
- `для поддержки осанки`
- `для переговорной`
- `для команды разработчиков`
- `для офісної команди`
- `для команди розробників`

### 6. Кластеры по функциям и характеристикам

- `Synchronous Tilt`
- `sync4`
- `sync5`
- `dual backrest design`
- `3d adjustable headrest`
- `4d x 360 armrest`
- `3d x 360 armrest`
- `2d lumbar support`
- `replaceable design`
- `multi-angle lock`
- `weight sensitive`
- `bifma tested class 4`
- `характеристики aerocool sky light`
- `характеристики aerocool wing mesh black`
- `характеристики aerocool xtal loft air dark grey`

## Распределение по страницам

### Главная и хабы

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/_index.md` | бренд + широкий коммерческий | `aerocool`, `ігрові крісла aerocool`, `офісні крісла aerocool` | `комп'ютерні крісла`, `home office`, `ергономічні крісла` |
| `content/_index.ru.md` | бренд + широкий коммерческий | `aerocool`, `игровые кресла aerocool`, `офисные кресла aerocool` | `компьютерные кресла`, `home office`, `эргономичные кресла` |
| `content/products/_index.md` | каталог и выбор | `ігрові крісла aerocool`, `офісні крісла aerocool`, `комп'ютерні крісла aerocool` | `каталог крісел`, `порівняння моделей`, `яке крісло обрати` |
| `content/products/_index.ru.md` | каталог и выбор | `игровые кресла aerocool`, `офисные кресла aerocool`, `компьютерные кресла aerocool` | `каталог кресел`, `сравнение моделей`, `какое кресло выбрать` |

### Серии

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/products/sky/_index.md` | офисная линейка | `aerocool sky`, `офісне крісло aerocool sky`, `комп'ютерне крісло aerocool sky` | `sky light`, `sky 360`, `Synchronous Tilt` |
| `content/products/sky/_index.ru.md` | офисная линейка | `aerocool sky`, `офисное кресло aerocool sky`, `компьютерное кресло aerocool sky` | `sky light`, `sky 360`, `Synchronous Tilt` |
| `content/products/wing/_index.md` | игровая и офисная линейка | `aerocool wing`, `ігрове крісло aerocool wing`, `офісне крісло aerocool wing` | `dual backrest`, `11d`, `racer`, `loft air`, `mesh` |
| `content/products/wing/_index.ru.md` | игровая и офисная линейка | `aerocool wing`, `игровое кресло aerocool wing`, `офисное кресло aerocool wing` | `dual backrest`, `11d`, `racer`, `loft air`, `mesh` |
| `content/products/xtal/_index.md` | игровая и компьютерная линейка | `aerocool xtal`, `ігрове крісло aerocool xtal`, `комп'ютерне крісло aerocool xtal` | `fully replaceable design`, `7d`, `racer`, `loft air`, `mesh` |
| `content/products/xtal/_index.ru.md` | игровая и компьютерная линейка | `aerocool xtal`, `игровое кресло aerocool xtal`, `компьютерное кресло aerocool xtal` | `fully replaceable design`, `7d`, `racer`, `loft air`, `mesh` |

### Товары SKY

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/products/sky/light/index.md` | офисный товар | `офісне крісло aerocool sky light`, `комп'ютерне крісло sky light` | `8d`, `Synchronous Tilt`, `home office`, `breathable mesh` |
| `content/products/sky/light/index.ru.md` | офисный товар | `офисное кресло aerocool sky light`, `компьютерное кресло sky light` | `8d`, `Synchronous Tilt`, `home office`, `breathable mesh` |
| `content/products/sky/360/index.md` | компьютерный товар | `комп'ютерне крісло aerocool sky 360`, `офісне крісло sky 360` | `11d`, `3d x 360 armrest`, `home office`, `breathable mesh` |
| `content/products/sky/360/index.ru.md` | компьютерный товар | `компьютерное кресло aerocool sky 360`, `офисное кресло sky 360` | `11d`, `3d x 360 armrest`, `home office`, `breathable mesh` |

### Товары WING

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/products/wing/racer-black/index.md` | игровой товар | `ігрове крісло aerocool wing racer black` | `комп'ютерне крісло`, `leatherette`, `dual backrest`, `11d` |
| `content/products/wing/racer-black/index.ru.md` | игровой товар | `игровое кресло aerocool wing racer black` | `компьютерное кресло`, `leatherette`, `dual backrest`, `11d` |
| `content/products/wing/racer-dark-grey/index.md` | игровой товар | `ігрове крісло aerocool wing racer dark grey` | `комп'ютерне крісло`, `leatherette`, `dual backrest`, `11d` |
| `content/products/wing/racer-dark-grey/index.ru.md` | игровой товар | `игровое кресло aerocool wing racer dark grey` | `компьютерное кресло`, `leatherette`, `dual backrest`, `11d` |
| `content/products/wing/loft-air-dark-grey/index.md` | офисный товар | `офісне крісло aerocool wing loft air dark grey` | `комп'ютерне крісло`, `home office`, `multi-layer breathable mesh fabric`, `11d` |
| `content/products/wing/loft-air-dark-grey/index.ru.md` | офисный товар | `офисное кресло aerocool wing loft air dark grey` | `компьютерное кресло`, `home office`, `multi-layer breathable mesh fabric`, `11d` |
| `content/products/wing/loft-air-light-grey/index.md` | офисный товар | `офісне крісло aerocool wing loft air light grey` | `комп'ютерне крісло`, `home office`, `multi-layer breathable mesh fabric`, `11d` |
| `content/products/wing/loft-air-light-grey/index.ru.md` | офисный товар | `офисное кресло aerocool wing loft air light grey` | `компьютерное кресло`, `home office`, `multi-layer breathable mesh fabric`, `11d` |
| `content/products/wing/mesh-black/index.md` | компьютерный товар | `комп'ютерне крісло aerocool wing mesh black` | `офісне крісло`, `breathable mesh`, `dual backrest`, `11d` |
| `content/products/wing/mesh-black/index.ru.md` | компьютерный товар | `компьютерное кресло aerocool wing mesh black` | `офисное кресло`, `breathable mesh`, `dual backrest`, `11d` |

### Товары XTAL

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/products/xtal/racer-black/index.md` | игровой товар | `ігрове крісло aerocool xtal racer black` | `комп'ютерне крісло`, `fully replaceable design`, `leatherette`, `7d` |
| `content/products/xtal/racer-black/index.ru.md` | игровой товар | `игровое кресло aerocool xtal racer black` | `компьютерное кресло`, `fully replaceable design`, `leatherette`, `7d` |
| `content/products/xtal/racer-dark-grey/index.md` | игровой товар | `ігрове крісло aerocool xtal racer dark grey` | `комп'ютерне крісло`, `fully replaceable design`, `leatherette`, `7d` |
| `content/products/xtal/racer-dark-grey/index.ru.md` | игровой товар | `игровое кресло aerocool xtal racer dark grey` | `компьютерное кресло`, `fully replaceable design`, `leatherette`, `7d` |
| `content/products/xtal/loft-air-dark-grey/index.md` | офисный товар | `офісне крісло aerocool xtal loft air dark grey` | `комп'ютерне крісло`, `home office`, `fully replaceable design`, `7d` |
| `content/products/xtal/loft-air-dark-grey/index.ru.md` | офисный товар | `офисное кресло aerocool xtal loft air dark grey` | `компьютерное кресло`, `home office`, `fully replaceable design`, `7d` |
| `content/products/xtal/loft-air-light-grey/index.md` | офисный товар | `офісне крісло aerocool xtal loft air light grey` | `комп'ютерне крісло`, `home office`, `fully replaceable design`, `7d` |
| `content/products/xtal/loft-air-light-grey/index.ru.md` | офисный товар | `офисное кресло aerocool xtal loft air light grey` | `компьютерное кресло`, `home office`, `fully replaceable design`, `7d` |
| `content/products/xtal/mesh-black/index.md` | компьютерный товар | `комп'ютерне крісло aerocool xtal mesh black` | `офісне крісло`, `breathable mesh`, `fully replaceable design`, `7d` |
| `content/products/xtal/mesh-black/index.ru.md` | компьютерный товар | `компьютерное кресло aerocool xtal mesh black` | `офисное кресло`, `breathable mesh`, `fully replaceable design`, `7d` |

### Статьи

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/articles/_index.md` | хаб статей | `статті та гіди aerocool`, `як вибрати ігрове крісло`, `як вибрати офісне крісло`, `як вибрати комп'ютерне крісло` | `aerocool sky`, `aerocool wing`, `aerocool xtal` |
| `content/articles/_index.ru.md` | хаб статей | `статьи и гиды aerocool`, `как выбрать игровое кресло`, `как выбрать офисное кресло`, `как выбрать компьютерное кресло` | `aerocool sky`, `aerocool wing`, `aerocool xtal` |
| `content/articles/how-to-choose-aerocool-chair/index.md` | общий гайд | `як вибрати крісло aerocool`, `крісло для роботи`, `крісло для home office` | `ігрове крісло`, `офісне крісло`, `комп'ютерне крісло` |
| `content/articles/how-to-choose-aerocool-chair/index.ru.md` | общий гайд | `как выбрать кресло aerocool`, `кресло для работы`, `кресло для home office` | `игровое кресло`, `офисное кресло`, `компьютерное кресло` |
| `content/articles/how-to-choose-chair-by-adjustability/index.md` | гайд по регулировкам | `регулювання крісла`, `7D 8D 11D`, `як вибрати ергономічне крісло` | `підлокітники`, `сидіння`, `поперекова підтримка`, `Synchronous Tilt` |
| `content/articles/how-to-choose-chair-by-adjustability/index.ru.md` | гайд по регулировкам | `регулировки кресла`, `7D 8D 11D`, `как выбрать эргономичное кресло` | `подлокотники`, `сиденье`, `поясничная поддержка`, `Synchronous Tilt` |
| `content/articles/racer-vs-loft-air-vs-mesh-materials/index.md` | сравнение материалов | `Racer Loft Air Mesh`, `матеріали крісла Aerocool`, `яку поверхню обрати` | `leatherette`, `вентильована тканина`, `сітка`, `догляд за leatherette`, `догляд за mesh`, `крісло з хорошою вентиляцією`, `wing mesh чи wing loft air`, `xtal racer чи xtal mesh` |
| `content/articles/racer-vs-loft-air-vs-mesh-materials/index.ru.md` | сравнение материалов | `Racer Loft Air Mesh`, `материалы кресла Aerocool`, `какую поверхность выбрать` | `leatherette`, `вентилируемая ткань`, `сетка`, `уход за leatherette`, `уход за mesh`, `кресло с хорошей вентиляцией`, `wing mesh или wing loft air`, `xtal racer или xtal mesh` |
| `content/articles/sky-light-vs-sky-360-guide/index.md` | сравнение | `sky light чи sky 360`, `яке крісло для роботи обрати` | `8d`, `11d`, `office`, `home office` |
| `content/articles/sky-light-vs-sky-360-guide/index.ru.md` | сравнение | `sky light или sky 360`, `какое кресло для работы выбрать` | `8d`, `11d`, `office`, `home office` |
| `content/articles/what-is-synchronous-tilt-guide/index.md` | объяснение механизма | `що таке Synchronous Tilt`, `синхронний нахил крісла`, `механізм крісла Aerocool` | `ергономіка`, `Multi-angle`, `Weight sensitive`, `SYNC5` |
| `content/articles/what-is-synchronous-tilt-guide/index.ru.md` | объяснение механизма | `что такое Synchronous Tilt`, `синхронный наклон кресла`, `механизм кресла Aerocool` | `эргономика`, `Multi-angle`, `Weight sensitive`, `SYNC5` |
| `content/articles/wing-vs-xtal-comparison/index.md` | сравнение | `wing чи xtal`, `яке ігрове крісло обрати` | `gaming`, `dual backrest`, `fully replaceable design` |
| `content/articles/wing-vs-xtal-comparison/index.ru.md` | сравнение | `wing или xtal`, `какое игровое кресло выбрать` | `gaming`, `dual backrest`, `fully replaceable design` |
| `content/articles/sync4-sync5-mechanism-guide/index.md` | информационный / коммерческий | `SYNC4`, `SYNC5`, `SYNC5 multi-adjustable`, `механізм крісла Aerocool` | `Synchronous Tilt`, `XTAL`, `WING`, `SKY 360`, `SKY Light`, `регулювання сидіння` |
| `content/articles/sync4-sync5-mechanism-guide/index.ru.md` | информационный / коммерческий | `SYNC4`, `SYNC5`, `SYNC5 multi-adjustable`, `механизм кресла Aerocool` | `Synchronous Tilt`, `XTAL`, `WING`, `SKY 360`, `SKY Light`, `регулировка сиденья` |
| `content/articles/chair-for-computer-work/index.md` | рабочий сценарий | `крісло для роботи за комп'ютером`, `офісне крісло для повного дня` | `SKY`, `WING`, `XTAL`, `підлокітники`, `матеріал` |
| `content/articles/chair-for-computer-work/index.ru.md` | рабочий сценарий | `кресло для работы за компьютером`, `офисное кресло для полного дня` | `SKY`, `WING`, `XTAL`, `подлокотники`, `материал` |
| `content/articles/best-chair-for-home-office/index.md` | home office | `крісло для home office`, `найкраще крісло для home office` | `SKY Light`, `SKY 360`, `WING`, `XTAL`, `відеодзвінки` |
| `content/articles/best-chair-for-home-office/index.ru.md` | home office | `кресло для home office`, `лучшее кресло для home office` | `SKY Light`, `SKY 360`, `WING`, `XTAL`, `видеозвонки` |
| `content/articles/gaming-chair-long-sessions/index.md` | длительные игровые сессии | `ігрове крісло для тривалих сесій`, `крісло для геймінгу` | `WING`, `XTAL`, `Racer`, `Mesh`, `Synchronous Tilt` |
| `content/articles/gaming-chair-long-sessions/index.ru.md` | длительные игровые сессии | `игровое кресло для длительных сессий`, `кресло для гейминга` | `WING`, `XTAL`, `Racer`, `Mesh`, `Synchronous Tilt` |
| `content/articles/sky-vs-wing-vs-xtal/index.md` | сравнение всех серий | `SKY WING чи XTAL`, `яку серію Aerocool обрати` | `офісне крісло`, `ігрове крісло`, `home office`, `регулювання` |
| `content/articles/sky-vs-wing-vs-xtal/index.ru.md` | сравнение всех серий | `SKY WING или XTAL`, `какую серию Aerocool выбрать` | `офисное кресло`, `игровое кресло`, `home office`, `регулировки` |
| `content/articles/what-is-dual-backrest/index.md` | объяснение WING | `що таке dual backrest`, `подвійна спинка WING` | `WING`, `підтримка спини`, `11D`, `4D X 360` |
| `content/articles/what-is-dual-backrest/index.ru.md` | объяснение WING | `dual backrest что это`, `двойная спинка WING` | `WING`, `поддержка спины`, `11D`, `4D X 360` |
| `content/articles/what-is-fully-replaceable-design/index.md` | объяснение XTAL | `fully replaceable design`, `крісло зі змінними елементами` | `XTAL`, `змінні подушки`, `Racer`, `Loft Air`, `Mesh` |
| `content/articles/what-is-fully-replaceable-design/index.ru.md` | объяснение XTAL | `fully replaceable design chair`, `кресло со сменными элементами` | `XTAL`, `сменные подушки`, `Racer`, `Loft Air`, `Mesh` |
| `content/articles/chair-for-posture-and-long-work/index.md` | посадка и долгая работа | `крісло для постави`, `крісло для довгої роботи` | `спинка`, `підлокітники`, `Synchronous Tilt`, `без медичних обіцянок` |
| `content/articles/chair-for-posture-and-long-work/index.ru.md` | посадка и долгая работа | `кресло для осанки`, `кресло для долгой работы` | `спинка`, `подлокотники`, `Synchronous Tilt`, `без медицинских обещаний` |
| `content/articles/chair-setup-after-purchase/index.md` | post-purchase инструкция | `як налаштувати крісло`, `налаштування крісла після покупки` | `висота`, `сидіння`, `підлокітники`, `нахил` |
| `content/articles/chair-setup-after-purchase/index.ru.md` | post-purchase инструкция | `как настроить кресло`, `настройка кресла после покупки` | `высота`, `сиденье`, `подлокотники`, `наклон` |
| `content/articles/chairs-for-office-team/index.md` | офисная команда | `крісла для офісної команди`, `як вибрати крісла для офісу` | `робочі місця`, `закупка`, `SKY`, `WING`, `XTAL`, `крісла для переговорної`, `крісла для команди розробників` |
| `content/articles/chairs-for-office-team/index.ru.md` | офисная команда | `кресла для офисной команды`, `как выбрать кресла для офиса` | `рабочие места`, `закупка`, `SKY`, `WING`, `XTAL`, `кресла для переговорной`, `кресла для команды разработчиков` |

### Новости

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/news/_index.md` | хаб новостей | `новини aerocool`, `анонси aerocool`, `оновлення каталогу aerocool` | `SKY`, `WING`, `XTAL`, `Loft Air`, `Mesh`, `SYNC4`, `SYNC5` |
| `content/news/_index.ru.md` | хаб новостей | `новости aerocool`, `анонсы aerocool`, `обновления каталога aerocool` | `SKY`, `WING`, `XTAL`, `Loft Air`, `Mesh`, `SYNC4`, `SYNC5` |
| `content/news/2026-04-15-aerocool-sky-series-launch/index.md` | запуск серии | `Aerocool SKY`, `SKY Light`, `SKY 360` | `офісне крісло`, `комп'ютерне крісло`, `Synchronous Tilt` |
| `content/news/2026-04-15-aerocool-sky-series-launch/index.ru.md` | запуск серии | `Aerocool SKY`, `SKY Light`, `SKY 360` | `офисное кресло`, `компьютерное кресло`, `Synchronous Tilt` |
| `content/news/2026-04-16-aerocool-wing-series-launch/index.md` | запуск серии | `Aerocool WING`, `WING Racer`, `WING Loft Air`, `WING Mesh` | `ігрове крісло`, `офісне крісло`, `11D`, `dual backrest` |
| `content/news/2026-04-16-aerocool-wing-series-launch/index.ru.md` | запуск серии | `Aerocool WING`, `WING Racer`, `WING Loft Air`, `WING Mesh` | `игровое кресло`, `офисное кресло`, `11D`, `dual backrest` |
| `content/news/2026-04-17-aerocool-xtal-series-launch/index.md` | запуск серии | `Aerocool XTAL`, `XTAL Racer`, `XTAL Loft Air`, `XTAL Mesh` | `7D`, `Synchronous Tilt`, `fully replaceable design` |
| `content/news/2026-04-17-aerocool-xtal-series-launch/index.ru.md` | запуск серии | `Aerocool XTAL`, `XTAL Racer`, `XTAL Loft Air`, `XTAL Mesh` | `7D`, `Synchronous Tilt`, `fully replaceable design` |
| `content/news/2026-04-18-aerocool-sky-360-launch/index.md` | запуск модели | `Aerocool SKY 360`, `SKY 360 11D`, `комп'ютерне крісло SKY 360` | `3D X 360`, `2D сидіння`, `SYNC5`, `home office` |
| `content/news/2026-04-18-aerocool-sky-360-launch/index.ru.md` | запуск модели | `Aerocool SKY 360`, `SKY 360 11D`, `компьютерное кресло SKY 360` | `3D X 360`, `2D сиденье`, `SYNC5`, `home office` |
| `content/news/2026-04-19-aerocool-sky-light-launch/index.md` | запуск модели | `Aerocool SKY Light`, `SKY Light 8D`, `офісне крісло SKY Light` | `SYNC4`, `Synchronous Tilt`, `вентильована сітка`, `home office` |
| `content/news/2026-04-19-aerocool-sky-light-launch/index.ru.md` | запуск модели | `Aerocool SKY Light`, `SKY Light 8D`, `офисное кресло SKY Light` | `SYNC4`, `Synchronous Tilt`, `вентилируемая сетка`, `home office` |
| `content/news/2026-04-20-aerocool-loft-air-and-mesh-focus/index.md` | материал и выбор | `Aerocool Loft Air`, `Aerocool Mesh`, `вентильована поверхня` | `WING`, `XTAL`, `офісне крісло`, `комп'ютерне крісло` |
| `content/news/2026-04-20-aerocool-loft-air-and-mesh-focus/index.ru.md` | материал и выбор | `Aerocool Loft Air`, `Aerocool Mesh`, `вентилируемая поверхность` | `WING`, `XTAL`, `офисное кресло`, `компьютерное кресло` |
| `content/news/2026-04-30-aerocool-sync4-sync5-mechanism-update/index.md` | новостное уточнение спецификаций | `Aerocool SYNC5`, `SYNC4 і SYNC5`, `механізм крісла Aerocool` | `XTAL`, `WING`, `SKY 360`, `SKY Light`, `Synchronous Tilt` |
| `content/news/2026-04-30-aerocool-sync4-sync5-mechanism-update/index.ru.md` | новостное уточнение спецификаций | `Aerocool SYNC5`, `SYNC4 и SYNC5`, `механизм кресла Aerocool` | `XTAL`, `WING`, `SKY 360`, `SKY Light`, `Synchronous Tilt` |
| `content/news/2026-05-21-aerocool-chair-selection-guides-update/index.md` | новость о гидах выбора | `Aerocool гіди з вибору крісел`, `робота`, `home office`, `геймінг` | `chair-for-computer-work`, `best-chair-for-home-office`, `gaming-chair-long-sessions`, `sky-vs-wing-vs-xtal` |
| `content/news/2026-05-21-aerocool-chair-selection-guides-update/index.ru.md` | новость о гидах выбора | `Aerocool гиды по выбору кресел`, `работа`, `home office`, `гейминг` | `chair-for-computer-work`, `best-chair-for-home-office`, `gaming-chair-long-sessions`, `sky-vs-wing-vs-xtal` |
| `content/news/2026-05-21-aerocool-practical-chair-guides-update/index.md` | новость о практических гайдах | `Aerocool практичні гіди про крісла`, `посадка`, `налаштування`, `офісна команда` | `chair-for-posture-and-long-work`, `chair-setup-after-purchase`, `chairs-for-office-team` |
| `content/news/2026-05-21-aerocool-practical-chair-guides-update/index.ru.md` | новость о практических гайдах | `Aerocool практические гиды по креслам`, `посадка`, `настройка`, `офисная команда` | `chair-for-posture-and-long-work`, `chair-setup-after-purchase`, `chairs-for-office-team` |

### Поддерживающие разделы

| URL / файл | Основной интент | Основные ключи | Дополнительные ключи |
| --- | --- | --- | --- |
| `content/faq/index.md` | FAQ | `faq aerocool`, `питання про крісла aerocool` | `гарантія`, `доставка`, `оплата`, `повернення`, `складання`, `Synchronous Tilt`, `7d 8d 11d`, `sky wing xtal`, `racer loft air mesh` |
| `content/faq/index.ru.md` | FAQ | `faq aerocool`, `вопросы о креслах aerocool` | `гарантия`, `доставка`, `оплата`, `возврат`, `сборка`, `Synchronous Tilt`, `7d 8d 11d`, `sky wing xtal`, `racer loft air mesh` |
| `content/about/index.md` | доверие | `про бренд aerocool`, `крісла aerocool україна` | `sky`, `wing`, `xtal`, `ергономіка` |
| `content/about/index.ru.md` | доверие | `о бренде aerocool`, `кресла aerocool украина` | `sky`, `wing`, `xtal`, `эргономика` |
| `content/contact/index.md` | контакты | `контакти aerocool`, `купити крісло aerocool` | `консультація`, `доставка`, `гарантія` |
| `content/contact/index.ru.md` | контакты | `контакты aerocool`, `купить кресло aerocool` | `консультация`, `доставка`, `гарантия` |
| `content/image-license/index.md` | права на изображения | `права на використання зображень aerocool` | `ImageObject license`, `acquireLicensePage`, `Aerocool Ukraine`, `письмовий дозвіл` |
| `content/image-license/index.ru.md` | права на изображения | `права на использование изображений aerocool` | `ImageObject license`, `acquireLicensePage`, `Aerocool Ukraine`, `письменное разрешение` |

## Что уже усилено в этом проходе

В рамках текущей keyword-доработки обновлены:

- глобальные `description` и `keywords` в `hugo.yaml`
- главная страница `uk/ru`
- каталог `uk/ru`
- серии `SKY`, `WING`, `XTAL` в `uk/ru`
- карточки товаров `SKY`, `WING`, `XTAL` в `uk/ru`
- хаб статей `uk/ru`
- ключевые гайды и статьи-сравнения
- поддерживающие страницы `FAQ`, `About`, `Contact`, `Image License` в `uk/ru`

Дополнительно в этом проходе:

- все 16 основных постоянно актуальных статей заведены в карту ключей
- все 9 ключевых новостей и хаб новостей заведены в карту ключей
- слой статей и новостей усилен под широкое коммерческое покрытие, а не только под брендовые запросы о запусках
- CSV-база расширена до аналитического формата: добавлены `target_scope`, `funnel_stage`, `business_value` и поля для будущего импорта Google Search Console
- страницы `/image-license/` и `/ru/image-license/` заведены как support/legal URL, а не как коммерческие посадочные
- материаловый гайд получил дополнительные long-tail интенты по уходу, вентиляции и сравнению поверхностей внутри `WING` и `XTAL`
- B2B-гайд по офисной команде получил long-tail интенты для переговорной и команды разработчиков
- purchase-слой расширен запросами `купити/купить ігрове/офисное крісло Aerocool` без добавления неподтвержденных обещаний цены, наличия или доставки
- все товарные страницы получили отдельные CSV-строки для `ціна/цена + модель` и `модель + в наявності/в наличии`, потому что эти интенты должны сверяться с `price`, `availability`, `priceValidUntil` и `Offer` JSON-LD
- все товарные страницы получили отдельные CSV-строки для `характеристики + модель`, потому что эти интенты должны вести на конкретный товар с SKU, MPN, материалами, механикой и Product JSON-LD
- добавлен growth-слой для расширения контента: программист/IT, видеозвонки, небольшой кабинет, теплая комната, сетчатая спинка, поясничная поддержка, open space, сборка, сервис, гарантийный ремонт, локальная покупка и price-range запросы

Главная цель этого обновления: убрать перекос только в брендовые запросы и запросы по функциям, а также добавить системное покрытие широких коммерческих кластеров:

- `игровое кресло`
- `офисное кресло`
- `компьютерное кресло`
- `кресло для работы`
- `кресло для home office`
- `кресло для гейминга`

## Чего не нужно делать

- не добавлять `meta keywords` ради Google как главную стратегию ранжирования
- не вставлять одинаковые ключи на `home`, `catalog`, `series` и `product` без различия интента
- не делать переспам ключами в `title`, `H1` и первых абзацах
- не копировать украинские и русские формулировки дословно, если интент звучит иначе
- не плодить отдельные страницы под почти идентичные запросы без уникальной пользы

## Следующие возможности роста

Самые перспективные следующие кластеры для роста после текущего расширения:

- `доставка кресла Aerocool`
- `гарантия на кресло Aerocool`
- `оплата кресла Aerocool`
- `возврат кресла Aerocool`
- `гарантийный ремонт кресла Aerocool`
- `где посмотреть кресла Aerocool в Украине`
- `сравнение серий Aerocool по бюджету`
- `доставка конкретной модели Aerocool`
- `гарантия конкретной модели Aerocool`

Под эти кластеры лучше всего делать:

- FAQ-блоки на товарах и `/faq/`, если бизнес-условия подтверждены
- усиленные блоки на карточках товаров и сериях, если есть подтвержденные product facts
- отдельные страницы только после данных Google Search Console или рекламных кампаний
- короткие внутренние ссылки из статей к каталогу, сериям, FAQ и контактам

## Источники для подхода

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Creating Helpful, Reliable, People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search Console start guide](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Google ecommerce SEO best practices](https://developers.google.com/search/docs/specialty/ecommerce)
- [Google guide to optimizing for generative AI features on Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

Логика этого документа основана на лучших практиках SEO и на текущей архитектуре проекта `Aerocool`, а не на обещании автоматического `топ-1`.
