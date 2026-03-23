import {
  type ListBoxProps,
  type ListBoxItemProps,
  composeRenderProps,
} from "react-aria-components";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import "./ListBox.css";

export function DropdownListBox<T extends object>(props: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("listbox", className),
      )}
    />
  );
}

export function DropdownItem(props: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("listbox-item", className),
      )}
    />
  );
}
