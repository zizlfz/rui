import fs from "fs";
import path from "path";

export interface RuiConfig {
  componentsDir: string;
  utilsDir: string;
}

export const defaultConfig: RuiConfig = {
  componentsDir: "src/components/rui",
  utilsDir: "src/utils",
};

export function readConfig(): RuiConfig {
  const configPath = path.join(process.cwd(), "rui.json");

  if (!fs.existsSync(configPath)) {
    return defaultConfig;
  }

  try {
    const fileContent = fs.readFileSync(configPath, "utf-8");
    const userConfig = JSON.parse(fileContent);

    return {
      ...defaultConfig,
      ...userConfig,
    };
  } catch (error) {
    return defaultConfig;
  }
}

export function writeConfig(config: RuiConfig): void {
  const configPath = path.join(process.cwd(), "rui.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
