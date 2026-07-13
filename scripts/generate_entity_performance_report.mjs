import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const registryPath = resolve("data/entities.yaml");
const overridesPath = resolve("docs/seo/32-entity-performance-overrides.csv");
const contentDir = resolve("content");
const publicDir = resolve("public");
const reportPath = resolve("docs/seo/32-entity-performance-report-2026.md");
const csvPath = resolve("docs/seo/32-entity-performance-report-2026.csv");

async function main() {
  const registry = parseRegistry(await readFile(registryPath, "utf8"));
  const overrides = existsSync(overridesPath) ? parseOverrides(await readFile(overridesPath, "utf8")) : new Map();
  const contentPages = await collectContentPages(contentDir);
  const renderedGraph = existsSync(publicDir) ? await collectRenderedGraph(publicDir) : emptyRenderedGraph();
  const rows = buildRows(registry, contentPages, renderedGraph, overrides);

  await writeText(reportPath, buildMarkdownReport(rows, contentPages, renderedGraph));
  await writeText(csvPath, buildCsvReport(rows));

  console.log(`Entity performance report written: ${relative(process.cwd(), reportPath)}`);
  console.log(`Entity performance CSV written: ${relative(process.cwd(), csvPath)}`);
}

function parseRegistry(source) {
  const entities = new Map();
  let currentID = "";
  let currentKey = "";

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, "");

    if (!line.trim() || line.trimStart().startsWith("#")) {
      continue;
    }

    const entityMatch = line.match(/^([a-z0-9][a-z0-9-]*):$/);
    if (entityMatch) {
      currentID = entityMatch[1];
      currentKey = "";
      entities.set(currentID, { entity_id: currentID });
      continue;
    }

    if (!currentID) {
      continue;
    }

    const entity = entities.get(currentID);
    const keyMatch = line.match(/^  ([a-zA-Z0-9_]+):(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const rawValue = keyMatch[2].trim();
      if (!rawValue) {
        entity[currentKey] = currentKey === "name" ? {} : [];
      } else {
        entity[currentKey] = parseScalar(rawValue);
      }
      continue;
    }

    const nameMatch = line.match(/^    ([a-z]{2}):\s*(.*)$/);
    if (nameMatch && currentKey === "name") {
      entity.name[nameMatch[1]] = parseScalar(nameMatch[2].trim());
      continue;
    }

    const listMatch = line.match(/^    -\s*(.*)$/);
    if (listMatch && Array.isArray(entity[currentKey])) {
      entity[currentKey].push(parseScalar(listMatch[1].trim()));
    }
  }

  return entities;
}

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function parseOverrides(source) {
  const rows = parseCsv(source);
  const [header, ...records] = rows;
  const overrides = new Map();

  if (!header) {
    return overrides;
  }

  for (const record of records) {
    const row = Object.fromEntries(header.map((key, index) => [key, record[index] || ""]));
    if (row.entity_id) {
      overrides.set(row.entity_id, row);
    }
  }

  return overrides;
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const nextChar = source[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(cell);
      if (row.some((value) => value !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

async function collectContentPages(root) {
  const files = await walk(root, [".md"]);
  const pages = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const frontMatter = extractFrontMatter(source);
    if (!frontMatter) {
      continue;
    }

    const fields = parseFrontMatterFields(frontMatter);
    pages.push({
      file,
      rel: relative(process.cwd(), file),
      title: fields.title || "",
      about: fields.about_entities || [],
      mentions: fields.mentions_entities || [],
      productGroupID: fields.product_group_id || "",
    });
  }

  return pages;
}

function extractFrontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] || "";
}

function parseFrontMatterFields(source) {
  const fields = {};
  const lines = source.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const scalarMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);

    if (!scalarMatch) {
      continue;
    }

    const key = scalarMatch[1];
    const rawValue = scalarMatch[2].trim();

    if (["about_entities", "mentions_entities"].includes(key)) {
      const list = [];
      let cursor = index + 1;
      while (cursor < lines.length) {
        const listMatch = lines[cursor].match(/^  -\s*(.*)$/);
        if (!listMatch) break;
        list.push(parseScalar(listMatch[1].trim()));
        cursor += 1;
      }
      fields[key] = list;
      continue;
    }

    if (["title", "product_group_id"].includes(key)) {
      fields[key] = parseScalar(rawValue);
    }
  }

  return fields;
}

async function collectRenderedGraph(root) {
  const files = await walk(root, [".html"]);
  const scripts = [];
  const parseErrors = [];

  for (const file of files) {
    const html = await readFile(file, "utf8");
    const regex = /<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = regex.exec(html))) {
      try {
        scripts.push({
          file,
          rel: relative(process.cwd(), file),
          data: JSON.parse(match[1]),
        });
      } catch (error) {
        parseErrors.push(`${relative(process.cwd(), file)}: ${error.message}`);
      }
    }
  }

  return { scripts, parseErrors };
}

function emptyRenderedGraph() {
  return { scripts: [], parseErrors: ["public/ is missing; run npm run build before generating rendered graph counts."] };
}

function buildRows(registry, contentPages, renderedGraph, overrides) {
  const rows = [];

  for (const [entityID, entity] of [...registry.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    const ids = [entity.current_jsonld_id, entity.future_jsonld_id].filter(Boolean);
    const aboutPages = contentPages.filter((page) => page.about.includes(entityID));
    const mentionPages = contentPages.filter((page) => page.mentions.includes(entityID));
    const groupPages = contentPages.filter((page) => page.productGroupID === entityID);
    const rendered = countRenderedIDs(renderedGraph.scripts, ids);
    const override = overrides.get(entityID) || {};

    rows.push({
      entityID,
      name: entity.name?.en || entity.name?.uk || entity.name?.ru || entityID,
      status: entity.status || "",
      entityClass: entity.entity_class || "",
      schemaCandidate: entity.schema_candidate || "",
      entityHome: entity.entity_home || "",
      owner: entity.owner || "",
      ids,
      aboutPages,
      mentionPages,
      groupPages,
      renderedIDRefs: rendered.idRefs,
      renderedNodeDefs: rendered.nodeDefs,
      gscImpressions: override.gsc_impressions || "pending-production",
      gscClicks: override.gsc_clicks || "pending-production",
      gscCtr: override.gsc_ctr || "pending-production",
      aiCitations: override.ai_citations || "pending-production",
      businessSignal: override.business_signal || "pending-production",
      notes: buildNotes(entity, aboutPages, mentionPages, groupPages, rendered, override.notes),
    });
  }

  return rows;
}

function countRenderedIDs(scripts, ids) {
  if (ids.length === 0) {
    return { idRefs: 0, nodeDefs: 0 };
  }

  let idRefs = 0;
  let nodeDefs = 0;
  const idSet = new Set(ids);

  for (const script of scripts) {
    const graph = Array.isArray(script.data?.["@graph"]) ? script.data["@graph"] : [script.data];
    for (const node of graph) {
      if (node && typeof node === "object" && idSet.has(node["@id"])) {
        nodeDefs += 1;
      }
    }
    idRefs += countIDRefs(script.data, idSet);
  }

  return { idRefs, nodeDefs };
}

function countIDRefs(value, idSet) {
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countIDRefs(item, idSet), 0);
  }

  if (!value || typeof value !== "object") {
    return 0;
  }

  let count = 0;
  for (const [key, child] of Object.entries(value)) {
    if (key === "@id" && typeof child === "string" && idSet.has(child)) {
      count += 1;
    }
    count += countIDRefs(child, idSet);
  }
  return count;
}

function buildNotes(entity, aboutPages, mentionPages, groupPages, rendered, overrideNotes = "") {
  const notes = [];

  if (entity.status === "do-not-markup") {
    notes.push("do-not-markup");
  }
  if (entity.status === "confirmed" && aboutPages.length === 0 && mentionPages.length === 0 && groupPages.length === 0 && rendered.idRefs === 0) {
    notes.push("нет текущего использования");
  }
  if (entity.entity_class === "ProductGroup" && groupPages.length > 0) {
    notes.push("активный ProductGroup");
  }
  if (rendered.nodeDefs === 0 && rendered.idRefs > 0) {
    notes.push("есть ссылки без собственного node definition");
  }
  if (notes.length === 0) {
    notes.push("OK");
  }
  if (overrideNotes) {
    notes.push(overrideNotes);
  }

  return notes.join("; ");
}

function buildMarkdownReport(rows, contentPages, renderedGraph) {
  const date = new Date().toISOString().slice(0, 10);
  const confirmed = rows.filter((row) => row.status === "confirmed").length;
  const planned = rows.filter((row) => row.status === "planned").length;
  const doNotMarkup = rows.filter((row) => row.status === "do-not-markup").length;
  const rowsWithAbout = rows.filter((row) => row.aboutPages.length > 0).length;
  const rowsWithMentions = rows.filter((row) => row.mentionPages.length > 0).length;
  const rowsWithRenderedRefs = rows.filter((row) => row.renderedIDRefs > 0).length;

  const topAbout = topRows(rows, (row) => row.aboutPages.length);
  const topMentions = topRows(rows, (row) => row.mentionPages.length);
  const topRendered = topRows(rows, (row) => row.renderedIDRefs);

  return `# Отчет по эффективности сущностей 2026

Обновлено: ${date}.

Этот отчет связывает реестр сущностей, front matter и собранный JSON-LD. Он показывает, какие сущности являются главными темами страниц, какие упоминаются как связанные и сколько раз их стабильные \`@id\` встречаются в готовом JSON-LD-графе.

Команда генерации:

\`\`\`bash
npm run build
npm run entity:report
\`\`\`

CSV-версия отчета: [32-entity-performance-report-2026.csv](32-entity-performance-report-2026.csv). Ручные метрики GSC, AI и бизнеса добавлять не в сгенерированный CSV, а в [32-entity-performance-overrides.csv](32-entity-performance-overrides.csv), чтобы следующий запуск не потерял данные.

## 1. Статус данных

| Источник | Статус |
| --- | --- |
| Реестр сущностей | заполнено из [data/entities.yaml](../../data/entities.yaml) |
| Front matter \`about_entities\` | заполнено из \`content/**/*.md\` |
| Front matter \`mentions_entities\` | заполнено из \`content/**/*.md\` |
| Front matter \`product_group_id\` | заполнено из \`content/**/*.md\` |
| Ссылки в собранном JSON-LD | заполнено из \`public/**/*.html\` после \`npm run build\` |
| GSC impressions/clicks/CTR | из \`docs/seo/32-entity-performance-overrides.csv\`, сейчас \`pending-production\` |
| AI citations | из \`docs/seo/32-entity-performance-overrides.csv\`, сейчас \`pending-production\` |
| Бизнес-сигнал | из \`docs/seo/32-entity-performance-overrides.csv\`, сейчас \`pending-production\` |

## 2. Сводка данных

| Метрика | Значение |
| --- | ---: |
| Сущности в реестре | \`${rows.length}\` |
| Confirmed-сущности | \`${confirmed}\` |
| Planned-сущности | \`${planned}\` |
| Do-not-markup-сущности | \`${doNotMarkup}\` |
| Разобранные content-страницы | \`${contentPages.length}\` |
| Разобранные JSON-LD scripts | \`${renderedGraph.scripts.length}\` |
| Ошибки парсинга JSON-LD | \`${renderedGraph.parseErrors.length}\` |
| Сущности с использованием в about | \`${rowsWithAbout}\` |
| Сущности с использованием в mentions | \`${rowsWithMentions}\` |
| Сущности со ссылками на \`@id\` в собранном графе | \`${rowsWithRenderedRefs}\` |

${renderedGraph.parseErrors.length > 0 ? buildParseErrorBlock(renderedGraph.parseErrors) : "Ошибки парсинга JSON-LD не найдены."}

## 3. Сущности с наибольшим числом about-страниц

${buildSmallTable(topAbout, "about")}

## 4. Сущности с наибольшим числом mentions-страниц

${buildSmallTable(topMentions, "mentions")}

## 5. Сущности с наибольшим числом ссылок на \`@id\`

${buildSmallTable(topRendered, "rendered")}

## 6. Полная таблица сущностей

| Сущность | Статус | Класс | URL сущности | About | Mentions | Группы | Ссылки в графе | Определения узлов | GSC | AI | Бизнес | Заметки |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
${rows.map((row) => [
    md(row.entityID),
    md(row.status),
    md(row.entityClass),
    formatEntityHome(row.entityHome),
    row.aboutPages.length,
    row.mentionPages.length,
    row.groupPages.length,
    row.renderedIDRefs,
    row.renderedNodeDefs,
    md(row.gscImpressions),
    md(row.aiCitations),
    md(row.businessSignal),
    md(row.notes),
  ].join(" | ")).map((line) => `| ${line} |`).join("\n")}

## 7. Как использовать отчет

1. После каждого крупного schema/entity/content изменения запускать \`npm run build\`, затем \`npm run entity:report\`.
2. Проверять, что важные confirmed-сущности не потеряли \`about\`, \`mentions\` или ссылки в собранном графе.
3. После production-перехода добавить показы, клики и CTR из GSC в \`docs/seo/32-entity-performance-overrides.csv\`.
4. После исходного замера AI-поиска добавить AI-цитирования и ошибки представления бренда/товаров в \`docs/seo/32-entity-performance-overrides.csv\`.
5. После появления бизнес-событий добавить бизнес-сигнал: консультации, заявки, покупки или другие подтвержденные действия в \`docs/seo/32-entity-performance-overrides.csv\`.

## 8. Текущий вывод

Локальная отчетность по сущностям работает: реестр, использование front matter и ссылки в собранном JSON-LD измеряются автоматически. Внешние поля эффективности остаются \`pending-production\`, потому что до production и открытия индексации данные GSC, AI-цитирования и бизнес-сигналы нельзя считать полноценными метриками.
`;
}

function buildParseErrorBlock(errors) {
  return `Ошибки парсинга JSON-LD:\n\n${errors.map((error) => `- ${error}`).join("\n")}`;
}

function buildSmallTable(rows, metricName) {
  if (rows.length === 0) {
    return "Нет данных.";
  }

  return `| Сущность | Количество | URL сущности |
| --- | ---: | --- |
${rows.map((row) => {
    const count = metricName === "about"
      ? row.aboutPages.length
      : metricName === "mentions"
        ? row.mentionPages.length
        : row.renderedIDRefs;
    const home = formatEntityHome(row.entityHome);
    return `| ${md(row.entityID)} | ${count} | ${home} |`;
  }).join("\n")}`;
}

function formatEntityHome(entityHome) {
  if (!entityHome) {
    return "";
  }

  if (/^https?:\/\//.test(entityHome)) {
    return `[${md(entityHome)}](${entityHome})`;
  }

  if (entityHome.startsWith("/")) {
    return `[${md(entityHome)}](https://aerocool.ua${entityHome})`;
  }

  return md(entityHome);
}

function topRows(rows, getValue) {
  return rows
    .filter((row) => getValue(row) > 0)
    .sort((left, right) => getValue(right) - getValue(left) || left.entityID.localeCompare(right.entityID))
    .slice(0, 12);
}

function buildCsvReport(rows) {
  const header = [
    "entity_id",
    "name",
    "status",
    "entity_class",
    "schema_candidate",
    "entity_home",
    "owner",
    "jsonld_ids",
    "about_pages_count",
    "about_pages",
    "mentions_pages_count",
    "mentions_pages",
    "product_group_refs",
    "product_group_pages",
    "rendered_id_refs",
    "rendered_node_defs",
    "gsc_impressions",
    "gsc_clicks",
    "gsc_ctr",
    "ai_citations",
    "business_signal",
    "notes",
  ];

  const lines = rows.map((row) => [
    row.entityID,
    row.name,
    row.status,
    row.entityClass,
    row.schemaCandidate,
    row.entityHome,
    row.owner,
    row.ids.join("; "),
    row.aboutPages.length,
    row.aboutPages.map((page) => page.rel).join("; "),
    row.mentionPages.length,
    row.mentionPages.map((page) => page.rel).join("; "),
    row.groupPages.length,
    row.groupPages.map((page) => page.rel).join("; "),
    row.renderedIDRefs,
    row.renderedNodeDefs,
    row.gscImpressions,
    row.gscClicks,
    row.gscCtr,
    row.aiCitations,
    row.businessSignal,
    row.notes,
  ]);

  return [header, ...lines].map((line) => line.map(csv).join(",")).join("\n") + "\n";
}

function md(value) {
  return String(value ?? "").replace(/\|/g, "\\|");
}

function csv(value) {
  const string = String(value ?? "");
  if (/[",\n]/.test(string)) {
    return `"${string.replace(/"/g, '""')}"`;
  }
  return string;
}

async function walk(root, extensions) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath, extensions));
    } else if (entry.isFile() && extensions.includes(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

async function writeText(path, text) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, text, "utf8");
}

main().catch((error) => {
  console.error("Failed to generate entity performance report.", error);
  globalThis.process.exitCode = 1;
});
