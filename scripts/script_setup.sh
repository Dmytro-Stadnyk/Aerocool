#!/bin/bash

# Назначение:
#   Подготовить проект к работе после первого клонирования или переноса на
#   новую машину.
#
# Когда использовать:
#   - сразу после git clone;
#   - если тема PaperMod не подтянулась;
#   - если локальные версии Hugo или Node не установлены через mise;
#   - если нужно заново поставить npm-зависимости проекта.
#
# Как использовать:
#   ./scripts/script_setup.sh
#
# Что делает:
#   Обновляет git-подмодули, запускает mise install при наличии mise, ставит
#   npm-зависимости корневого проекта.
#
# Важно:
#   Скрипт может занять время и может обращаться к npm registry. Если сети нет,
#   npm install завершится ошибкой.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Updating git submodules"
git submodule update --init --recursive

if command -v mise >/dev/null 2>&1; then
  echo "Installing local tool versions through mise"
  mise install
else
  echo "mise was not found. Install Hugo 0.164.0 and Node 24.16.0 manually, or install mise."
fi

echo "Installing root npm dependencies"
npm install

echo "Setup complete. Run ./scripts/script_start.sh to start local development."
