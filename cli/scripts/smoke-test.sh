#!/bin/bash

set -e

# Get the absolute path to the CLI script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI_PATH="$SCRIPT_DIR/../dist/index.js"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create temp directory
TEMP_DIR=$(mktemp -d)
echo "Created temp directory: $TEMP_DIR"

# Cleanup function
cleanup() {
  cd /
  rm -rf "$TEMP_DIR"
  echo "Cleaned up temp directory"
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Create minimal package.json
cat > "$TEMP_DIR/package.json" << EOF
{
  "name": "test",
  "dependencies": {
    "react": "^18"
  }
}
EOF

# Change to temp directory
cd "$TEMP_DIR"

# Step 1: Run rui list
echo ""
echo "Step 1: Testing 'rui list'..."
if node "$CLI_PATH" list > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Step 1 passed: 'rui list' succeeded"
else
  echo -e "${RED}✗${NC} Step 1 failed: 'rui list' failed"
  exit 1
fi

# Step 2: Run rui init with defaults
echo ""
echo "Step 2: Testing 'rui init' with defaults..."
if echo -e "\n\n" | node "$CLI_PATH" init > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Step 2 passed: 'rui init' succeeded"
else
  echo -e "${RED}✗${NC} Step 2 failed: 'rui init' failed"
  exit 1
fi

# Step 3: Run rui add button
echo ""
echo "Step 3: Testing 'rui add button'..."
if node "$CLI_PATH" add button > /dev/null 2>&1; then
  if [ -f "src/components/rui/Button/Button.tsx" ]; then
    echo -e "${GREEN}✓${NC} Step 3 passed: 'rui add button' created Button.tsx"
  else
    echo -e "${RED}✗${NC} Step 3 failed: Button.tsx was not created"
    exit 1
  fi
else
  echo -e "${RED}✗${NC} Step 3 failed: 'rui add button' failed"
  exit 1
fi

# Step 4: Run rui add input --dry-run
echo ""
echo "Step 4: Testing 'rui add input --dry-run'..."
# Get the file count before dry-run
FILE_COUNT_BEFORE=$(find . -type f | wc -l)
if node "$CLI_PATH" add input --dry-run > /dev/null 2>&1; then
  FILE_COUNT_AFTER=$(find . -type f | wc -l)
  if [ "$FILE_COUNT_BEFORE" -eq "$FILE_COUNT_AFTER" ]; then
    echo -e "${GREEN}✓${NC} Step 4 passed: 'rui add input --dry-run' did not create files"
  else
    echo -e "${RED}✗${NC} Step 4 failed: dry-run created files"
    exit 1
  fi
else
  echo -e "${RED}✗${NC} Step 4 failed: 'rui add input --dry-run' failed"
  exit 1
fi

# Step 5: Run rui add button again (without --overwrite)
echo ""
echo "Step 5: Testing 'rui add button' without overwrite..."
# Get the modification time of Button.tsx
BUTTON_MTIME_BEFORE=$(stat -f "%m" src/components/rui/Button/Button.tsx 2>/dev/null || stat -c "%Y" src/components/rui/Button/Button.tsx 2>/dev/null)
if node "$CLI_PATH" add button > /dev/null 2>&1; then
  BUTTON_MTIME_AFTER=$(stat -f "%m" src/components/rui/Button/Button.tsx 2>/dev/null || stat -c "%Y" src/components/rui/Button/Button.tsx 2>/dev/null)
  if [ "$BUTTON_MTIME_BEFORE" -eq "$BUTTON_MTIME_AFTER" ]; then
    echo -e "${GREEN}✓${NC} Step 5 passed: Button.tsx was not overwritten"
  else
    echo -e "${RED}✗${NC} Step 5 failed: Button.tsx was overwritten"
    exit 1
  fi
else
  echo -e "${RED}✗${NC} Step 5 failed: 'rui add button' failed"
  exit 1
fi

# All tests passed
echo ""
echo -e "${GREEN}✓ All smoke tests passed${NC}"
