import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsRoot = path.join(root, "docs");
const errors = [];
let localLinkCount = 0;
const sourceArchiveNames = new Set(["XTAL", "SKY LITE", "SKY 360", "WING 360"]);

function collectFiles(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (
      dir === docsRoot &&
      entry.isDirectory() &&
      sourceArchiveNames.has(entry.name)
    ) {
      continue;
    }

    if (entry.isDirectory()) files.push(...collectFiles(fullPath));
    else files.push(fullPath);
  }

  return files;
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function linesOutsideCodeFences(source) {
  let inFence = false;

  return source.split(/\r?\n/).map((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return "";
    }

    return inFence ? "" : line;
  });
}

function checkLocalLinks(file, lines) {
  const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;

  for (const [index, line] of lines.entries()) {
    for (const match of line.matchAll(linkPattern)) {
      let target = match[1].trim();
      if (!target) continue;

      if (target.startsWith("<") && target.endsWith(">")) {
        target = target.slice(1, -1);
      }

      if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//")) {
        continue;
      }

      const [pathPart] = target.split("#", 1);
      if (!pathPart || pathPart.startsWith("/")) continue;

      const cleanPath = decodeURIComponent(pathPart.split("?", 1)[0]);
      const resolved = path.resolve(path.dirname(file), cleanPath);
      localLinkCount += 1;

      if (!fs.existsSync(resolved)) {
        errors.push(
          `${relative(file)}:${index + 1}: отсутствует цель ссылки ${target}`,
        );
      }
    }
  }
}

function checkHeadingOrder(file, lines) {
  let previousLevel = 0;

  for (const [index, line] of lines.entries()) {
    const match = line.match(/^(#{1,6})\s+\S/);
    if (!match) continue;

    const level = match[1].length;
    if (previousLevel > 0 && level > previousLevel + 1) {
      errors.push(
        `${relative(file)}:${index + 1}: пропущен уровень заголовка H${previousLevel + 1}`,
      );
    }
    previousLevel = level;
  }
}

function findServiceFiles(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findServiceFiles(fullPath));
    else if (entry.name === ".DS_Store") files.push(fullPath);
  }

  return files;
}

const allDocumentationFiles = collectFiles(docsRoot);
const markdownFiles = allDocumentationFiles
  .filter((file) => file.endsWith(".md"))
  .sort();
const csvFiles = allDocumentationFiles.filter((file) => file.endsWith(".csv"));
const entryFiles = [path.join(root, "README.md"), path.join(root, "AGENTS.md")];
const mapSource = fs.readFileSync(path.join(docsRoot, "01-documentation-map.md"), "utf8");
const numbers = new Map();

for (const archiveName of sourceArchiveNames) {
  const archivePath = path.join(docsRoot, archiveName);
  if (!fs.existsSync(archivePath) || !fs.statSync(archivePath).isDirectory()) {
    errors.push(`docs/${archiveName}/: отсутствует архив исходников производителя`);
  }
  if (!mapSource.includes(`docs/${archiveName}/`)) {
    errors.push(`docs/${archiveName}/: архив не описан в карте документации`);
  }
}

for (const file of findServiceFiles(docsRoot)) {
  errors.push(`${relative(file)}: служебный файл .DS_Store должен быть удален`);
}

for (const file of markdownFiles) {
  const name = path.basename(file);
  const numberMatch = name.match(/^(\d+)-/);

  if (!numberMatch) {
    errors.push(`${relative(file)}: нет числового префикса`);
    continue;
  }

  const rawNumber = numberMatch[1];
  const number = Number(rawNumber);
  if (number < 10 && rawNumber.length < 2) {
    errors.push(`${relative(file)}: номер меньше 10 должен содержать ведущий ноль`);
  }

  if (numbers.has(number)) {
    errors.push(
      `${relative(file)}: номер ${number} уже занят файлом ${relative(numbers.get(number))}`,
    );
  } else {
    numbers.set(number, file);
  }

  if (!mapSource.includes(relative(file))) {
    errors.push(`${relative(file)}: файл не перечислен в карте документации`);
  }
}

const sortedNumbers = [...numbers.keys()].sort((left, right) => left - right);
const maxNumber = sortedNumbers.at(-1) || 0;
const currentAuditFile = numbers.get(maxNumber);
const currentAuditPath = currentAuditFile ? relative(currentAuditFile) : "";

if (!currentAuditPath.startsWith("docs/audits/")) {
  errors.push("docs/: последний номер должен принадлежать текущему аудиту");
}

for (const file of entryFiles) {
  const source = fs.readFileSync(file, "utf8");
  if (currentAuditPath && !source.includes(currentAuditPath)) {
    errors.push(
      `${relative(file)}: нет ссылки на текущий полный аудит ${currentAuditPath}`,
    );
  }
}

for (let number = 1; number <= maxNumber; number += 1) {
  if (!numbers.has(number)) {
    errors.push(`docs/: отсутствует Markdown-документ с номером ${number}`);
  }
}

for (const file of csvFiles) {
  const match = path.basename(file).match(/^(\d+)-/);
  if (!match) {
    errors.push(`${relative(file)}: CSV-приложение не имеет числового префикса`);
  } else if (!numbers.has(Number(match[1]))) {
    errors.push(`${relative(file)}: нет родительского Markdown-документа с тем же номером`);
  }

  if (!mapSource.includes(relative(file))) {
    errors.push(`${relative(file)}: CSV-приложение не перечислено в карте документации`);
  }
}

for (const file of [...entryFiles, ...markdownFiles]) {
  const source = fs.readFileSync(file, "utf8");
  const lines = linesOutsideCodeFences(source);
  const h1Count = lines.filter((line) => /^#\s+\S/.test(line)).length;

  if (h1Count !== 1) {
    errors.push(`${relative(file)}: ожидался один H1, найдено ${h1Count}`);
  }

  const top = source.split(/\r?\n/).slice(0, 12).join("\n");
  const hasDate = /^(Обновлено|Дата проверки|Дата аудита|Актуально|Проверено):\s*\d{4}-\d{2}-\d{2}\.?$/m.test(top);
  if (!hasDate) {
    errors.push(`${relative(file)}: в начале файла нет даты в формате YYYY-MM-DD`);
  }

  const name = path.basename(file);
  const number = Number(name.match(/^(\d+)-/)?.[1] || 0);
  const isActiveDocument = entryFiles.includes(file) || number <= 41;

  if (isActiveDocument && source.includes("/Users/stadnyk/")) {
    errors.push(`${relative(file)}: найден машинно-зависимый путь /Users/stadnyk/`);
  }

  if (relative(file).startsWith("docs/audits/") && number < maxNumber) {
    if (!/Архивная оговорка \d{4}-\d{2}-\d{2}/.test(source)) {
      errors.push(`${relative(file)}: исторический аудит не имеет архивной оговорки`);
    }
    if (/^Статус: текущий полный аудит\.$/m.test(source)) {
      errors.push(`${relative(file)}: исторический аудит все еще помечен как текущий`);
    }
  }

  if (relative(file).startsWith("docs/audits/") && number === maxNumber) {
    if (!/^Статус: текущий полный аудит\.$/m.test(source)) {
      errors.push(`${relative(file)}: последний аудит не помечен как текущий полный`);
    }
  }

  checkHeadingOrder(file, lines);
  checkLocalLinks(file, lines);
}

if (fs.existsSync(path.join(root, "CHEETLIST-MAIN-DEV.md"))) {
  errors.push("CHEETLIST-MAIN-DEV.md: legacy-шпаргалка должна быть удалена");
}

if (errors.length > 0) {
  console.error(`Проверка документации: найдено ошибок ${errors.length}.`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Проверка документации пройдена: ${markdownFiles.length} Markdown, ${csvFiles.length} CSV, ${sourceArchiveNames.size} архива исходников, ${localLinkCount} локальных ссылок, номера 01-${maxNumber}.`,
  );
}
