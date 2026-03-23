import { ChevronDown } from "lucide-react";
import type { Key } from "react";
import React from "react";
import {
	Select as AriaSelect,
	type SelectProps as AriaSelectProps,
	Button,
	composeRenderProps,
	Group,
	type ListBoxProps,
	SelectValue,
	type ValidationResult,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import { Description, Field, FieldError, Label } from "../Form";
import { ListBox } from "../ListBox";
import { Popover } from "../Popover";
import { Tag, TagGroup } from "../Tag";

import "./SelectWithTagGroup.css";

export interface SelectWithTagGroupProps<T extends object>
	extends Omit<AriaSelectProps<T, "multiple">, "children"> {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	items: Iterable<T>;
	children: (item: T) => React.ReactNode;
	getKey?: (item: T) => Key;
	getName?: (item: T) => string;
	placeholder?: string;
}

export function SelectWithTagGroup<T extends object>({
	label,
	description,
	errorMessage,
	items,
	children,
	getKey,
	getName,
	placeholder,
	...props
}: SelectWithTagGroupProps<T>) {
	const triggerRef = React.useRef<HTMLDivElement>(null);
	const itemArray = React.useMemo(() => Array.from(items), [items]);

	const getItemKey =
		getKey ?? ((item) => (item as Record<string, unknown>).id as Key);
	const getItemName = getName ?? ((item) => String(item));

	return (
		<Field>
			{label && <Label>{label}</Label>}
			<AriaSelect
				{...props}
				selectionMode="multiple"
				placeholder={placeholder}
				className={composeRenderProps(props.className, (className) =>
					cn("select-with-tag-group", className),
				)}
			>
				<Group
					aria-label="Selected items"
					ref={triggerRef}
					className="select-tag-group-wrapper"
				>
					<SelectValue<T> className="select-tag-value">
						{({ selectedItems, state }: any) => (
							<TagGroup
								aria-label="Selected items"
								items={selectedItems.filter(
									(item: T | null): item is T => item != null,
								)}
								onRemove={(keys) => {
									const currentValue = state.selectedKeys;
									if (currentValue) {
										const keysToRemove = Array.from(keys) as string[];
										const currentArray = Array.from(currentValue) as string[];
										const newValue = currentArray.filter(
											(k) => !keysToRemove.includes(k),
										);
										if (props.onChange) {
											props.onChange(newValue);
										} else {
											state.setSelectedKeys(new Set(newValue));
										}
									}
								}}
								renderEmptyState={() => (
									<span className="select-tag-placeholder">{placeholder}</span>
								)}
							>
								{(item: T) => {
									const key = getItemKey(item);
									const foundItem = itemArray.find(
										(i) => getItemKey(i) === key,
									);
									return (
										<Tag>
											{foundItem ? getItemName(foundItem) : getItemName(item)}
										</Tag>
									);
								}}
							</TagGroup>
						)}
					</SelectValue>
					<Button className="select-add-button">
						<ChevronDown aria-hidden="true" className="select-chevron" />
					</Button>
				</Group>
				{description && <Description>{description}</Description>}
				<FieldError>{errorMessage}</FieldError>
				<Popover triggerRef={triggerRef} className="select-tag-popover">
					<SelectListBox<T> items={items}>{children}</SelectListBox>
				</Popover>
			</AriaSelect>
		</Field>
	);
}

function SelectListBox<T extends object>(props: ListBoxProps<T>) {
	return <ListBox {...props} />;
}
