export interface ComponentEntry {
  name: string;
  category: string;
  files: string[];
  dependencies: string[];
  requires?: string[];
}

export const registry: Record<string, ComponentEntry> = {
  alert: {
    name: "Alert",
    category: "forms",
    files: ["ui/Alert/Alert.tsx", "ui/Alert/Alert.css", "ui/Alert/index.ts"],
    dependencies: ["react", "react-aria-components"],
  },
  breadcrumbs: {
    name: "Breadcrumbs",
    category: "layout",
    files: [
      "ui/Breadcrumbs/Breadcrumbs.tsx",
      "ui/Breadcrumbs/Breadcrumbs.css",
      "ui/Breadcrumbs/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  button: {
    name: "Button",
    category: "forms",
    files: [
      "ui/Button/Button.tsx",
      "ui/Button/Button.css",
      "ui/Button/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  box: {
    name: "Box",
    category: "layout",
    files: ["ui/Box/Box.tsx", "ui/Box/Box.css"],
    dependencies: ["react", "react-aria-components"],
  },
  checkbox: {
    name: "Checkbox",
    category: "forms",
    files: [
      "ui/Checkbox/Checkbox.tsx",
      "ui/Checkbox/Checkbox.css",
      "ui/Checkbox/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  dropdown: {
    name: "Dropdown",
    category: "data-display",
    files: [
      "ui/Dropdown/Dropdown.tsx",
      "ui/Dropdown/Dropdown.css",
      "ui/Dropdown/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  form: {
    name: "Form",
    category: "forms",
    files: ["ui/Form/Form.tsx", "ui/Form/Form.css", "ui/Form/index.ts"],
    dependencies: ["react", "react-aria-components"],
  },
  input: {
    name: "Input",
    category: "forms",
    files: ["ui/Input/Input.tsx", "ui/Input/Input.css", "ui/Input/index.ts"],
    dependencies: ["react", "react-aria-components"],
  },
  listbox: {
    name: "ListBox",
    category: "data-display",
    files: [
      "ui/ListBox/ListBox.tsx",
      "ui/ListBox/ListBox.css",
      "ui/ListBox/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  modal: {
    name: "Modal",
    category: "overlays",
    files: [
      "ui/Modal/Modal.tsx",
      "ui/Modal/Modal.css",
      "ui/Modal/Dialog.tsx",
      "ui/Modal/Dialog.css",
      "ui/Modal/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  popover: {
    name: "Popover",
    category: "overlays",
    files: [
      "ui/Popover/Popover.tsx",
      "ui/Popover/Popover.css",
      "ui/Popover/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  radio: {
    name: "Radio",
    category: "forms",
    files: ["ui/Radio/Radio.tsx", "ui/Radio/Radio.css", "ui/Radio/index.ts"],
    dependencies: ["react", "react-aria-components"],
  },
  select: {
    name: "Select",
    category: "forms",
    files: [
      "ui/Select/Select.tsx",
      "ui/Select/Select.css",
      "ui/Select/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  table: {
    name: "Table",
    category: "layout",
    files: ["ui/Table/Table.tsx", "ui/Table/Table.css", "ui/Table/index.ts"],
    dependencies: ["react", "react-aria-components"],
  },
  tabs: {
    name: "Tabs",
    category: "layout",
    files: ["ui/Tabs/Tabs.tsx", "ui/Tabs/Tabs.css", "ui/Tabs/index.ts"],
    dependencies: ["react", "react-aria-components"],
  },
  tag: {
    name: "Tag",
    category: "data-display",
    files: ["ui/Tag/Tag.tsx", "ui/Tag/Tag.css", "ui/Tag/index.ts"],
    dependencies: ["react", "react-aria-components"],
  },
  textarea: {
    name: "Textarea",
    category: "forms",
    files: [
      "ui/Textarea/Textarea.tsx",
      "ui/Textarea/Textarea.css",
      "ui/Textarea/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
  toast: {
    name: "Toast",
    category: "overlays",
    files: ["ui/Toast/Toast.tsx", "ui/Toast/Toast.css", "ui/Toast/index.ts"],
    dependencies: ["react", "react-aria-components", "lucide-react"],
  },
  tooltip: {
    name: "Tooltip",
    category: "overlays",
    files: [
      "ui/Tooltip/Tooltip.tsx",
      "ui/Tooltip/Tooltip.css",
      "ui/Tooltip/index.ts",
    ],
    dependencies: ["react", "react-aria-components"],
  },
};
