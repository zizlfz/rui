const fs = require('fs');
const path = require('path');

// Base paths
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const componentsSrc = path.join(srcDir, 'components');
const utilsSrc = path.join(srcDir, 'utils');
const componentsDest = path.join(rootDir, 'components');
const utilsDest = path.join(rootDir, 'utils');
const distEntry = path.join(rootDir, 'dist', 'index.js');

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`  Source directory does not exist: ${src}`);
    return { files: 0, dirs: 0 };
  }

  // Create destination if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  let filesCopied = 0;
  let dirsCopied = 0;

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      const result = copyDirectory(srcPath, destPath);
      filesCopied += result.files;
      dirsCopied += result.dirs + 1;
    } else {
      fs.copyFileSync(srcPath, destPath);
      filesCopied++;
    }
  }

  return { files: filesCopied, dirs: dirsCopied };
}

function ensureExecutableAndShebang() {
  if (!fs.existsSync(distEntry)) {
    console.log('  Warning: dist/index.js does not exist yet');
    return;
  }

  // Make executable
  fs.chmodSync(distEntry, 0o755);
  console.log('  Made dist/index.js executable');

  // Check and prepend shebang if needed
  const content = fs.readFileSync(distEntry, 'utf8');
  const shebang = '#!/usr/bin/env node';

  if (!content.startsWith(shebang)) {
    const newContent = shebang + '\n' + content;
    fs.writeFileSync(distEntry, newContent);
    console.log('  Prepended shebang to dist/index.js');
  } else {
    console.log('  Shebang already present in dist/index.js');
  }
}

function main() {
  console.log('📦 Copying components and utilities...\n');

  // Copy components
  console.log('Copying components/');
  const componentsResult = copyDirectory(componentsSrc, componentsDest);
  console.log(`  → ${componentsResult.files} files, ${componentsResult.dirs} directories copied\n`);

  // Copy utils
  console.log('Copying utils/');
  const utilsResult = copyDirectory(utilsSrc, utilsDest);
  console.log(`  → ${utilsResult.files} files, ${utilsResult.dirs} directories copied\n`);

  // Make entry executable and ensure shebang
  console.log('Setting up entry point:');
  ensureExecutableAndShebang();
  console.log('\n✅ Copy complete!');
}

main();
