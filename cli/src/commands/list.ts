import { registry, ComponentEntry } from "../registry";

const categoryOrder = ["forms", "layout", "overlays", "data-display"] as const;

export async function list(): Promise<void> {
  // Group entries by category
  const grouped: Record<
    string,
    Array<{ key: string; entry: ComponentEntry }>
  > = {};

  for (const [key, entry] of Object.entries(registry)) {
    if (!grouped[entry.category]) {
      grouped[entry.category] = [];
    }
    grouped[entry.category].push({ key, entry });
  }

  // Print each category
  for (const category of categoryOrder) {
    const entries = grouped[category];

    if (!entries || entries.length === 0) {
      continue;
    }

    // Print category header
    console.log(`\n${category.toUpperCase()}`);

    // Print each component
    for (const { entry } of entries) {
      const fileCount = entry.files.length;
      const externalDeps = entry.dependencies
        .filter((dep) => dep !== "react")
        .join(", ");

      // Format: name (lowercase), file count, external deps
      const name = entry.name.toLowerCase();
      const depsStr = externalDeps || "none";

      console.log(`  ${name.padEnd(14)} ${fileCount} files    ${depsStr}`);
    }
  }

  console.log();
}
