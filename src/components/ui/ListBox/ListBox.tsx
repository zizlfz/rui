import {
	ListBox as AriaListBox,
	ListBoxItem as AriaListBoxItem,
	composeRenderProps,
	type ListBoxItemProps,
	type ListBoxProps,
} from "react-aria-components";
import { cn } from "#/utils/classname";

import "./ListBox.css";

export function ListBox<T extends object>(props: ListBoxProps<T>) {
	return (
		<AriaListBox
			{...props}
			className={composeRenderProps(props.className, (className) =>
				cn("listbox", className),
			)}
		/>
	);
}

export function ListBoxItem(props: ListBoxItemProps) {
	return (
		<AriaListBoxItem
			{...props}
			className={composeRenderProps(props.className, (className) =>
				cn("listbox-item", className),
			)}
		/>
	);
}
