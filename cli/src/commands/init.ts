import readline from "readline";
import { writeConfig, defaultConfig } from "../utils/config";
import { validateProject } from "../utils/validate";

export async function init(): Promise<void> {
  validateProject();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer.trim());
      });
    });
  };

  console.log("Welcome to RUI!\n");

  const componentsDir = await question(
    `Where should components be copied? (${defaultConfig.componentsDir}) `,
  );
  const utilsDir = await question(
    `Where is your utils directory? (${defaultConfig.utilsDir}) `,
  );

  rl.close();

  const config = {
    componentsDir: componentsDir || defaultConfig.componentsDir,
    utilsDir: utilsDir || defaultConfig.utilsDir,
  };

  writeConfig(config);

  console.log("\n✅ Configuration saved to rui.json");
  console.log(`  componentsDir: ${config.componentsDir}`);
  console.log(`  utilsDir: ${config.utilsDir}`);
}
