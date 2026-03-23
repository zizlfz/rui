# RUI CLI

A command-line interface for managing RUI React components in your projects.

> **Note:** This CLI is not yet published to npm. To use it, you need to clone the repository and link it locally.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rui
```

### 2. Build and Link the CLI

```bash
# Navigate to the CLI directory
cd cli

# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Link the CLI globally
npm link
```

Now the `rui` command is available globally on your system.

### 3. Use in Your Project

You can now use the `rui` command in any project:

```bash
# Navigate to your project directory
cd /path/to/your-project

# Initialize RUI configuration
rui init

# List available components
rui list

# Add a component
rui add button

# Add a component to a specific directory
rui add modal --dir src/ui
```

## Development

### Watch Mode

For development with automatic rebuilding:

```bash
cd cli
pnpm dev
```

### Rebuild After Changes

After making changes to the CLI source:

```bash
# From the project root
pnpm cli:build

# Or from the cli directory
cd cli && pnpm build
```

### Running Smoke Tests

To verify the CLI is working correctly, run the smoke test script:

```bash
cd cli
./scripts/smoke-test.sh
```

This script will:
1. Create a temporary test environment
2. Test `rui list` command
3. Test `rui init` command
4. Test `rui add button` command
5. Test `rui add input --dry-run` command
6. Verify that files aren't overwritten without the `--overwrite` flag
7. Clean up the test environment

If all tests pass, you'll see `✓ All smoke tests passed`.

## Usage Examples

### Initialize RUI in your project
```bash
rui init
```

### List available components
```bash
rui list
```

### Add a component to your project
```bash
rui add button
```

### Add a component to a specific directory
```bash
rui add modal --dir src/ui
```

### Add with overwrite flag
```bash
rui add button --overwrite
```

## Unlinking

To remove the global CLI link when you're done:

```bash
npm unlink -g rui-cli
```

## Root Convenience Scripts

From the project root, you can use these convenience scripts:

```bash
# Build the CLI
pnpm cli:build

# Link the CLI globally
pnpm cli:link

# Watch mode for development
pnpm cli:dev
```

## Troubleshooting

If you encounter issues with the `rui` command not being found after linking:

1. Verify the link was successful:
   ```bash
   npm ls -g rui-cli
   ```

2. Make sure your PATH includes npm's global bin directory:
   ```bash
   npm config get prefix
   ```

3. Try unlinking and relinking:
   ```bash
   npm unlink -g rui-cli
   cd cli && npm link
   ```
