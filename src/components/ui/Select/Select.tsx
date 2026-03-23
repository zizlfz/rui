import {
	Select as AriaSelect,
	type SelectProps as AriaSelectProps,
	Button,
	composeRenderProps,
	type ListBoxItemProps,
	type ListBoxProps,
	SelectValue,
	type ValidationResult,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import { Description, Field, FieldError, Label } from "../Form";
import { ListBox, ListBoxItem } from "../ListBox";
import { Popover } from "../Popover";

import "./Select.css";

export interface SelectProps<T extends object>
	extends Omit<AriaSelectProps<T>, "children" | "mode"> {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	items?: Iterable<T>;
	children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>({
	label,
	description,
	errorMessage,
	children,
	items,
	...props
}: SelectProps<T>) {
	return (
		<Field>
			{label && <Label>{label}</Label>}
			<AriaSelect
				{...props}
				aria-label={label}
				className={composeRenderProps(props.className, (className) =>
					cn("select", className),
				)}
			>
				<Button className="select-button">
					<SelectValue className="select-value" />
					<svg
						aria-hidden="true"
						className="select-chevron"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 20 20"
					>
						<path
							fill="currentColor"
							d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0c.436.445.408 1.197 0 1.615c-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163s-.436-1.17 0-1.615"
						></path>
					</svg>
				</Button>
				{description && <Description>{description}</Description>}
				<FieldError>{errorMessage}</FieldError>
				<Popover className="select-popover">
					<SelectListBox items={items}>{children}</SelectListBox>
				</Popover>
			</AriaSelect>
		</Field>
	);
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
	return <ListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
	return <ListBoxItem {...props} />;
}
