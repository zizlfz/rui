import path from "path";
import { registry, ComponentEntry } from "../registry";
import log from "../utils/logger";
import { copyComponent } from "../utils/copy";
import { readConfig } from "../utils/config";
import { validateProject } from "../utils/validate";

export async function add(
  componentNames: string[],
  options: { dir: string; overwrite: boolean; dryRun: boolean },
): Promise<void> {
  // Validate project
  validateProject();

  // Check if any component names were provided
  if (componentNames.length === 0) {
    log.error("Please provide at least one component name");
    process.exit(1);
  }

  // Print dry-run message if applicable
  if (options.dryRun) {
    log.warn("DRY RUN — no files will be written\n");
  }

  // Resolve paths using __dirname
  const repoRoot = path.resolve(__dirname, "../../../");
  const srcBase = path.join(repoRoot, "src/components");
  const utilsBase = path.join(repoRoot, "src/utils");

  // Read config
  const config = readConfig();

  // Resolve destination paths relative to process.cwd()
  const destDir = path.resolve(
    process.cwd(),
    options.dir === "src/components/rui" ? config.componentsDir : options.dir,
  );
  const destUtilsDir = path.resolve(process.cwd(), config.utilsDir);

  const allExternalDeps = new Set<string>();
  const allCopied: string[] = [];
  const allSkipped: string[] = [];

  // Process each component
  for (const componentName of componentNames) {
    // Normalize component name to lowercase
    const normalizedName = componentName.toLowerCase();

    // Look up in registry
    const component = registry[normalizedName];

    if (!component) {
      // Find close matches
      const availableNames = Object.keys(registry);
      const matches = findCloseMatches(normalizedName, availableNames, 3);

      log.error(`Component "${componentName}" not found in registry`);

      if (matches.length > 0) {
        log.info("\nDid you mean?");
        matches.forEach((match) => log.info(`  - ${match}`));
      } else {
        log.info("\nAvailable components:");
        availableNames.forEach((name) => log.info(`  - ${name}`));
      }

      process.exit(1);
    }

    log.section(`Adding ${component.name}...`);

    if (options.dryRun) {
      // Dry-run mode: show what would be copied
      for (const file of component.files) {
        const destPath = path.join(destDir, path.basename(file));
        log.file(`→ ${destPath}`);
      }

      if (component.requires) {
        for (const utilName of component.requires) {
          const destPath = path.join(destUtilsDir, `${utilName}.ts`);
          log.file(`→ ${destPath}`);
        }
      }
    } else {
      // Actual copy mode
      const { copied, skipped } = await copyComponent({
        component,
        srcBase,
        utilsBase,
        destDir,
        destUtilsDir,
        overwrite: options.overwrite,
      });

      allCopied.push(...copied);
      allSkipped.push(...skipped);

      // Print results for this component
      if (copied.length > 0) {
        log.section("Copied files:");
        copied.forEach((file: string) => log.success(file));
      }

      if (skipped.length > 0) {
        log.section("Skipped files:");
        skipped.forEach((file: string) => {
          log.warn(file);
          log.file("  (use --overwrite to replace existing files)");
        });
      }
    }

    // Collect dependencies (deduplicated)
    const externalDeps = component.dependencies.filter(
      (dep) => dep !== "react",
    );
    externalDeps.forEach((dep) => allExternalDeps.add(dep));
  }

  // Show install dependencies section
  if (allExternalDeps.size > 0) {
    log.section("\nInstall dependencies:");
    log.file(`pnpm add ${Array.from(allExternalDeps).sort().join(" ")}`);
  }
}

function findCloseMatches(
  target: string,
  candidates: string[],
  maxResults: number = 3,
): string[] {
  const scored = candidates
    .map((candidate) => ({
      name: candidate,
      score: similarity(target, candidate),
    }))
    .filter((item) => item.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return scored.map((item) => item.name);
}

function similarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}
