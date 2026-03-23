# Component Doc Writing Skill

Write `.mdx` documentation for UI components in `src/components/ui/`.

## Workflow

### 1. Read the component source

Read every file in the component directory:

```
src/components/ui/<ComponentName>/
  <ComponentName>.tsx    ← props interface + component logic
  <ComponentName>.css    ← class names, variants, layout
  index.ts               ← exports
```

Key things to extract:
- **Props interface** — names, types, defaults, JSDoc descriptions
- **Variants** — visual modes (e.g. `variant`, `size`)
- **Sub-components** — exported siblings (e.g. `CardImage`, `CardBody`)
- **Event handlers** — callback props and their signatures
- **Behavioral props** — `isDisabled`, `dismissible`, `isPending`, etc.
- **CSS classes** — the base class name and variant selectors

### 2. Read existing docs for conventions

Read at least one existing `.mdx` file (e.g. `Button.mdx`, `Card.mdx`) before writing. Match the tone, structure, and component usage exactly.

### 3. Write the `.mdx` file

**File location:** `src/components/ui/<ComponentName>/<ComponentName>.mdx`

**No imports.** The MDX files do not contain import statements. All components used in the doc are available via the `docComponents` map in `src/routes/ui.$component.tsx`.

### 4. Register the component in `docComponents`

Edit `src/routes/ui.$component.tsx`:

1. Add an import for the component (and any sub-components) from its module.
2. Add the component(s) to the `docComponents` object so they are available inside MDX.

Example:
```tsx
import { Card, CardBody, CardFooter, CardHeader, CardImage } from "#/components/ui/Card";

const docComponents = {
  // ...existing entries...
  Card,
  CardImage,
  CardHeader,
  CardBody,
  CardFooter,
};
```

## MDX Structure

Follow this section order. Omit sections that do not apply.

```mdx
# ComponentName

One-sentence description of what the component does.

## Installation

```bash
rui add <component-slug>
```

## Usage

```tsx
import { ComponentName } from '@/components/ui/ComponentName';

<ComponentName>...</ComponentName>
```

## Variants            ← if applicable
## Sizes               ← if applicable
## Events              ← if applicable
## Disabled            ← if applicable
## Dismissible         ← if applicable
## ...custom sections  ← component-specific features

## API

<DocApiTable>
  <DocApiTableRow ... />
</DocApiTable>

## Related Types       ← if applicable (e.g. PressEvent)
```

## Doc Components

All available in MDX without imports (registered in `docComponents`).

### `<DocDemo>`

Renders a live interactive preview with optional controls.

**Static children — simple demo:**
```mdx
<DocDemo>
  <Button>Click me</Button>
  <Button variant="primary">Primary</Button>
</DocDemo>
```

**Render function — pass toggled props:**
```mdx
<DocDemo props={{ isDisabled: true, variant: "primary" }} propsForm={{ isDisabled: Boolean }}>
  {(props) => <Button {...props}>Disabled</Button>}
</DocDemo>
```

- `props` — initial prop values
- `propsForm` — defines toggle controls. Use `Boolean` for switches, anything else for text inputs.

**Event logging:**
```mdx
<DocDemo eventProps={(log) => ({ onPressStart: log("onPress"), onPressEnd: log("onPressEnd") })}>
  {(props) => <Button {...props}>Press Me</Button>}
</DocDemo>
```

- `eventProps` — a function that receives a `log(eventName)` helper and returns an event handler map.

### `<DocCode>`

Wraps a fenced code block when you want to show code separately from a demo (e.g. icon-only patterns, complex compositions).

```mdx
<DocCode>
```tsx
<Button>
  <svg ...>...</svg>
</Button>
```
</DocCode>
```

### `<DocApiTable>` / `<DocApiTableRow>`

Renders a props table. `DocApiTableRow` fields:

| Prop | Required | Description |
|------|----------|-------------|
| `name` | yes | Prop name |
| `type` | yes | TypeScript type string |
| `default` | no | Default value, or `"—"` for no default |
| `description` | yes | Human-readable description |

```mdx
<DocApiTable>
  <DocApiTableRow
    name="variant"
    type="'primary' | 'secondary'"
    default="'primary'"
    description="The visual style."
  />
</DocApiTable>
```

For components with sub-components, use a separate `## API` subsection with `<DocApiTable>` for each:

```mdx
## API

### Card

<DocApiTable>...</DocApiTable>

### CardImage

<DocApiTable>...</DocApiTable>
```

## Writing Guidelines

- **Concise.** One to two sentences per description. No fluff.
- **Present tense.** "Displays...", not "This will display...".
- **Reference the CSS class.** Mention the base class in the `className` description (e.g. "merged with the base `.button` class via the `cn` utility").
- **Default variant.** If no explicit default in the props interface, use `"—"` in the API table.
- **Fenced code blocks.** Always use ` ```tsx ` for code examples.
- **Consistent import path.** Use `@/components/ui/<Component>` in usage examples. Match the directory casing exactly (e.g. `@/components/ui/DatePicker`, not `@/components/ui/Datepicker`).
- **Installation slug.** Lowercase component name (e.g. `rui add breadcrumbs`, `rui add card`).
- **Live demo first.** Every feature section should lead with a `<DocDemo>` before the code block. Readers see the component before reading the code.
- **Section naming.** Use `## Value` for controlled/uncontrolled state documentation (not "Controlled" or "Controlled Value"). Use `## Usage` for the first example section (not "Example").
- **Keyboard interactions.** Interactive components (dialogs, overlays, menus, selects, etc.) should include a `## Keyboard Interactions` table.
- **Accessibility notes.** Components with overlay behavior (Modal, Drawer, Tooltip, Popover) should include an `## Accessibility` section describing focus trap, aria attributes, and screen reader behavior.
- **Filenames.** The `.mdx` file must match the directory name exactly (e.g. `CheckboxGroup/CheckboxGroup.mdx`, not `CheckboxGroup/CheckboxGruop.mdx`).

## Component Patterns

### Simple single-component (e.g. Alert, Avatar, Box, Button)

One export, one `## API` table. Cover variants, events, states.

### Composable sub-components (e.g. Card, Breadcrumbs, Dropdown)

Multiple exports. Each sub-component gets its own `## API` subsection. Document the composition pattern in `## Usage`.

### Wrapper around react-aria-components (e.g. Tabs, Modal, Tooltip)

Props extend RAC types. Document only the custom props and styling. Link to RAC docs if needed. The `className` description should reference the custom CSS class. For overlay components, include `## Keyboard Interactions` and `## Accessibility`.

### Stateful / imperative (e.g. Toast)

Document the queue/region pattern. Show how to trigger from event handlers.

## Existing Docs (reference)

| Component | File |
|-----------|------|
| Alert | `src/components/ui/Alert/Alert.mdx` |
| Avatar | `src/components/ui/Avatar/Avatar.mdx` |
| Box | `src/components/ui/Box/Box.mdx` |
| Breadcrumbs | `src/components/ui/Breadcrumbs/Breadcrumbs.mdx` |
| Button | `src/components/ui/Button/Button.mdx` |
| Calendar | `src/components/ui/Calendar/Calendar.mdx` |
| Card | `src/components/ui/Card/Card.mdx` |
| Checkbox | `src/components/ui/Checkbox/Checkbox.mdx` |
| CheckboxGroup | `src/components/ui/CheckboxGroup/CheckboxGroup.mdx` |
| ComboBox | `src/components/ui/ComboBox/ComboBox.mdx` |
| DatePicker | `src/components/ui/DatePicker/DatePicker.mdx` |
| Drawer | `src/components/ui/Drawer/Drawer.mdx` |
| Dropdown | `src/components/ui/Dropdown/Dropdown.mdx` |
| FileTrigger | `src/components/ui/FileTrigger/FileTrigger.mdx` |
| ListBox | `src/components/ui/ListBox/ListBox.mdx` |
| Modal | `src/components/ui/Modal/Modal.mdx` |
| Pagination | `src/components/ui/Pagination/Pagination.mdx` |
| Select | `src/components/ui/Select/Select.mdx` |

## Components Without Docs

These components exist in `src/components/ui/` but have no `.mdx`:

DateField, Disclosure, Form, Input, MultiSelect, Popover, Progress, Radio, SelectWithTagGroup, Skeleton, Switch, Table, Tabs, Tag, TagGroup, Textarea, TimeField, Toast, Tooltip
