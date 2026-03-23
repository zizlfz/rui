# RUI - React UI Components Library

A modern, accessible React UI component library built with React Aria Components and Tailwind CSS.

## Getting Started

```bash
pnpm install
pnpm dev
```

## CLI Tool

RUI includes a command-line interface for managing components in your projects.

### Quick Start

```bash
# Build and link the CLI globally
cd cli
pnpm install
pnpm build
npm link

# Use in any project
rui init          # Initialize RUI configuration
rui list          # List available components
rui add button    # Add a component
rui add modal --dir src/ui  # Add to specific directory
```

For detailed CLI documentation, setup instructions, and troubleshooting, see [cli/README.md](./cli/README.md).

## Available Components

### Forms & Inputs
- **Alert** - Dismissible alert messages
- **Button** - Interactive buttons with variants
- **Checkbox** - Checkbox input with indeterminate state
- **Input** - Text input component
- **Radio** - Radio button groups
- **Select** - Select dropdowns
- **Textarea** - Multiline text input

### Layout & Navigation
- **Breadcrumbs** - Navigation breadcrumbs
- **Box** - Simple container
- **Tabs** - Tabbed interface
- **Table** - Data tables with sorting and selection

### Overlays & Popups
- **Modal/Dialog** - Modal dialogs
- **Popover** - Floating content
- **Tooltip** - Contextual tooltips
- **Toast** - Notification system

### Data Display
- **Tag/TagGroup** - Tag lists with removal and selection
- **ListBox** - Selectable lists
- **Dropdown** - Dropdown menus with submenus

### Utilities
- **Form** - Label, FieldError, and Description components

## Documentation

For detailed component documentation, see [COMPONENTS.md](./COMPONENTS.md)

## Styling

Built with Tailwind CSS. Each component has its own CSS file that can be customized.

All components follow WAI-ARIA best practices for accessibility.

## Live Demo

Visit the home page (`/`) to see all components in action.

## License

MIT