import fs from "fs";
import path from "path";
import { ComponentEntry } from "../registry";

export interface CopyComponentOptions {
  component: ComponentEntry;
  srcBase: string;
  utilsBase: string;
  destDir: string;
  destUtilsDir: string;
  overwrite: boolean;
}

export interface CopyComponentResult {
  copied: string[];
  skipped: string[];
}

export async function copyComponent(
  options: CopyComponentOptions,
): Promise<CopyComponentResult> {
  const { component, srcBase, utilsBase, destDir, destUtilsDir, overwrite } =
    options;
  const copied: string[] = [];
  const skipped: string[] = [];

  // Ensure destination directories exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  if (!fs.existsSync(destUtilsDir)) {
    fs.mkdirSync(destUtilsDir, { recursive: true });
  }

  // Copy component files
  for (const file of component.files) {
    const srcPath = path.join(srcBase, file);
    // Preserve directory structure by removing 'ui/' prefix
    const relativePath = file.replace(/^ui\//, "");
    const destPath = path.join(destDir, relativePath);

    if (fs.existsSync(destPath) && !overwrite) {
      skipped.push(destPath);
      continue;
    }

    // Ensure destination directory exists for nested files
    const destFileDir = path.dirname(destPath);
    if (!fs.existsSync(destFileDir)) {
      fs.mkdirSync(destFileDir, { recursive: true });
    }

    fs.copyFileSync(srcPath, destPath);
    copied.push(destPath);
  }

  // Copy required utility files
  if (component.requires) {
    for (const utilName of component.requires) {
      const srcPath = path.join(utilsBase, `${utilName}.ts`);
      const destPath = path.join(destUtilsDir, `${utilName}.ts`);

      if (fs.existsSync(destPath) && !overwrite) {
        skipped.push(destPath);
        continue;
      }

      fs.copyFileSync(srcPath, destPath);
      copied.push(destPath);
    }
  }

  return { copied, skipped };
}
