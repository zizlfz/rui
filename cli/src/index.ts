#!/usr/bin/env node

import { Command } from "commander";
import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";

const program = new Command();

program
  .name("rui")
  .version("1.0.0")
  .description("CLI tool for RUI React component library");

program
  .command("add")
  .description("Add a component to your project")
  .argument("[componentNames...]", "Names of the components to add")
  .option("-d, --dir <path>", "Destination directory", "src/components/rui")
  .option("--overwrite", "Overwrite existing files", false)
  .option(
    "--dry-run",
    "Show what would be copied without actually copying",
    false,
  )
  .action(add);

program
  .command("init")
  .description("Initialize RUI configuration")
  .action(init);

program.command("list").description("List available components").action(list);

program.addHelpText(
  "after",
  `

Examples:
  $ rui init
  $ rui list
  $ rui add button
  $ rui add button input modal
  $ rui add button --dir src/ui/components
  $ rui add button --dry-run
  $ rui add button --overwrite
`,
);

program.parse();
