import fs from "fs";
import path from "path";
import log from "./logger";

export function validateProject(): void {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  // Check if package.json exists
  if (!fs.existsSync(packageJsonPath)) {
    log.error("No package.json found. Please run this command from your project root.");
    process.exit(1);
  }

  // Read and parse package.json
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    // Check if react is in dependencies
    const hasReact =
      packageJson.dependencies?.react ||
      packageJson.devDependencies?.react;

    if (!hasReact) {
      log.warn("React is not found in package.json dependencies. React is required to use RUI components.");
    }
  } catch (error) {
    log.error("Failed to parse package.json. Please ensure it is valid JSON.");
    process.exit(1);
  }
}
