import {
	CheckboxGroup as AriaCheckboxGroup,
	type CheckboxGroupProps as AriaCheckboxGroupProps,
	type ValidationResult,
} from "react-aria-components";
import { Description, FieldError, Label } from "#/components/ui/Form";
import { cn } from "#/utils/classname";
import "./CheckboxGroup.css";

export interface CheckboxGroupProps
	extends Omit<AriaCheckboxGroupProps, "children"> {
	children?: React.ReactNode;
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	orientation?: "horizontal" | "vertical";
}

export function CheckboxGroup({
	label,
	description,
	errorMessage,
	children,
	orientation = "vertical",
	className,
	...props
}: CheckboxGroupProps) {
	return (
		<AriaCheckboxGroup
			{...props}
			data-orientation={orientation}
			className={cn("checkbox-group", className)}
		>
			{label && <Label>{label}</Label>}
			<div className="checkbox-items">{children}</div>
			{description && <Description>{description}</Description>}
			<FieldError>{errorMessage}</FieldError>
		</AriaCheckboxGroup>
	);
}
