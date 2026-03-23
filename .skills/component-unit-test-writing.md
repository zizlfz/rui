# Component Unit Test Writing Skill

Write unit tests for UI components in `src/components/ui/<ComponentName>/`.

## Workflow

### 1. Read the component source

Read `<ComponentName>.tsx` to understand:
- **Props interface** — what props the component accepts
- **Component logic** — how props affect rendering/behavior
- **CSS classes** — base class name for DOM assertions
- **React Aria usage** — if using `react-aria-components`, understand what role it renders as

### 2. Read existing tests for patterns

Read at least one existing test file in `src/components/ui/` to match:
- Testing framework (vitest + @testing-library/react + userEvent)
- Test structure patterns (grouped by describe blocks)
- Import patterns and helpers

### 3. Write the test file

**File location:** `src/components/ui/<ComponentName>/<ComponentName>.test.tsx`

**Critical parts to test:**
1. **Rendering** — renders with children/labels, merges className
2. **State** — checked/unchecked, selected/unselected (for selection controls)
3. **Interaction** — click, keyboard navigation, onChange callbacks
4. **Disabled** — prevents interaction when disabled
5. **Focus** — autoFocus, tab order
6. **Validation** (if applicable) — error states, descriptions

### 4. Run tests

Execute `pnpm test src/components/ui/<ComponentName>/<ComponentName>.test.tsx` to verify all tests pass.

## Test Structure

Use `describe` blocks to group related tests:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ComponentName } from "#/components/ui/ComponentName";

describe("ComponentName — rendering", () => {
  it("renders with children", () => {
    // ...
  });
});

describe("ComponentName — interaction", () => {
  it("calls handler on click", async () => {
    // ...
  });
});
```

## Common Patterns

### Querying Elements

**For accessible elements:**
```tsx
// Buttons, inputs with labels
screen.getByRole("button", { name: /click me/i });
screen.getByRole("checkbox", { name: /accept terms/i });
screen.getByRole("switch", { name: /enable notifications/i });
screen.getByRole("radio", { name: /small/i });
screen.getByRole("radiogroup", { name: /size/i });
screen.getByRole("listbox");
```

**For container elements:**
```tsx
// Query by CSS class for wrapper elements
const { container } = render(<Component className="custom" />);
container.querySelector(".component-class");
```

### Checking Classes

```tsx
// Class merging
expect(container.querySelector(".button")).toHaveClass("button");
expect(container.querySelector(".button")).toHaveClass("custom");
```

### Checking State

```tsx
// Checked/unchecked
expect(screen.getByRole("checkbox")).toBeChecked();
expect(screen.getByRole("checkbox")).not.toBeChecked();

// Disabled
expect(screen.getByRole("button")).toBeDisabled();
expect(screen.getByRole("button")).not.toBeDisabled();

// Focus
expect(screen.getByRole("button")).toHaveFocus();
```

### User Interactions

```tsx
it("calls onChange when clicked", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<Checkbox onChange={onChange}>Label</Checkbox>);
  await user.click(screen.getByRole("checkbox"));
  expect(onChange).toHaveBeenCalledWith(true);
});

it("toggles on click", async () => {
  const user = userEvent.setup();
  render(<Checkbox defaultSelected>Label</Checkbox>);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeChecked();
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

it("is reachable via Tab", async () => {
  const user = userEvent.setup();
  render(<Button>Click</Button>);
  await user.tab();
  expect(screen.getByRole("button")).toHaveFocus();
});
```

### React Aria Components

React Aria Components render differently in JSDOM (test environment):

1. **Input-based components** (Checkbox, Switch) render as `<input>` with `role="checkbox"` or `role="switch"`
2. **Button renders** as `<button>`
3. **Selection components** (Radio, Select) render as `<input type="radio">` or `<input type="checkbox">`

**Visual elements (SVG icons, custom markup)** are children:
```tsx
// Query visual elements via container
const { container } = render(<Checkbox>Label</Checkbox>);
container.querySelector("rect"); // indeterminate icon
container.querySelector("polyline"); // check icon
```

**Wrapper classes** on parent containers:
```tsx
// RadioGroup wraps in Field component
const { container } = render(<RadioGroup className="custom">...</RadioGroup>);
container.querySelector(".form-field"); // wrapper with custom class
container.querySelector(".radio-group"); // inner AriaRadioGroup
```

### Testing Custom ClassName

```tsx
it("merges custom className", () => {
  const { container } = render(<Button className="custom">Click</Button>);
  expect(container.querySelector(".button")).toHaveClass("custom");
});

it("retains base class with custom className", () => {
  const { container } = render(<Button className="extra">Click</Button>);
  const button = container.querySelector(".button");
  expect(button).toHaveClass("button");
  expect(button).toHaveClass("extra");
});
```

## Section Examples

### For Checkbox / Switch (binary controls)

```tsx
describe("Component — rendering", () => {
  it("renders with children", () => { /* ... */ });
  it("merges custom className", () => { /* ... */ });
});

describe("Component — selection", () => {
  it("is unchecked by default", () => { /* ... */ });
  it("is checked when isSelected is true", () => { /* ... */ });
  it("calls onChange when selection changes", async () => { /* ... */ });
});

describe("Component — disabled", () => {
  it("is not disabled by default", () => { /* ... */ });
  it("is disabled when isDisabled is true", () => { /* ... */ });
  it("does not fire onChange when disabled", async () => { /* ... */ });
});

describe("Component — focus", () => {
  it("receives focus on render when autoFocus is set", () => { /* ... */ });
  it("is reachable via Tab by default", async () => { /* ... */ });
});
```

### For RadioGroup (grouped selection)

```tsx
describe("RadioGroup — rendering", () => {
  it("renders with label", () => { /* ... */ });
  it("renders multiple radio options", () => { /* ... */ });
});

describe("RadioGroup — selection", () => {
  it("is unchecked by default", () => { /* ... */ });
  it("selects one option at a time", async () => { /* ... */ });
  it("calls onChange with selected value", async () => { /* ... */ });
});

describe("RadioGroup — disabled", () => {
  it("disables entire group when isDisabled is true", () => { /* ... */ });
  it("disables individual radio", () => { /* ... */ });
});

describe("RadioGroup — validation", () => {
  it("shows description when provided", () => { /* ... */ });
  it("shows error message when isInvalid", () => { /* ... */ });
});
```

### For Button (action controls)

```tsx
describe("Button — rendering", () => {
  it("renders children", () => { /* ... */ });
  it('renders with type="button" by default', () => { /* ... */ });
  it("merges custom className", () => { /* ... */ });
});

describe("Button — variants", () => {
  it("applies variant prop", () => { /* ... */ });
});

describe("Button — disabled state", () => {
  it("is not disabled by default", () => { /* ... */ });
  it("becomes disabled when isDisabled", () => { /* ... */ });
  it("does not fire onPress when disabled", async () => { /* ... */ });
});

describe("Button — press events", () => {
  it("calls onPress when clicked", async () => { /* ... */ });
  it("calls onPress on Enter key", async () => { /* ... */ });
  it("calls onPress on Space key", async () => { /* ... */ });
});
```

## Writing Guidelines

- **Use `userEvent.setup()`** for interactions. Never use `fireEvent` directly.
- **Await all user actions.** Use `async` test functions and `await` before assertions.
- **Mock callbacks with `vi.fn()`.** Verify call counts and arguments.
- **Test behavior, not implementation.** Focus on what users see and do.
- **Group by feature.** Use descriptive `describe` blocks (rendering, selection, disabled, focus).
- **Keep tests independent.** No shared state between tests.
- **No comments in test code.** Test names describe what's being tested.
- **Use semantic queries.** Prefer `getByRole`, `getByLabelText` over `getByTestId`.
- **Test critical paths.** Don't test every prop combination — focus on essential behavior.

## Existing Tests (reference)

| Component | File |
|-----------|------|
| Button | `src/components/ui/Button/Button.test.tsx` |
| Checkbox | `src/components/ui/Checkbox/Checkbox.test.tsx` |
| Radio | `src/components/ui/Radio/Radio.test.tsx` |
| Select | `src/components/ui/Select/Select.test.tsx` |
| Switch | `src/components/ui/Switch/Switch.test.tsx` |
| Dropdown | `src/components/ui/Dropdown/Dropdown.test.tsx` |