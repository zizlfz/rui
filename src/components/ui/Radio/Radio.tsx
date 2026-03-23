import {
	Radio as AriaRadio,
	RadioGroup as AriaRadioGroup,
	type RadioGroupProps as AriaRadioGroupProps,
	composeRenderProps,
	type RadioProps,
	type ValidationResult,
} from "react-aria-components";
import { Description, Field, FieldError, Label } from "#/components/ui/Form";
import { cn } from "#/utils/classname";
import "./Radio.css";

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children"> {
	children?: React.ReactNode;
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	className?: string;
}

export function RadioGroup({
	label,
	description,
	errorMessage,
	children,
	className,
	...props
}: RadioGroupProps) {
	return (
		<Field className={className}>
			<AriaRadioGroup {...props} className="radio-group">
				{label && <Label>{label}</Label>}
				<div className="radio-items">{children}</div>
				{description && <Description>{description}</Description>}
				<FieldError>{errorMessage}</FieldError>
			</AriaRadioGroup>
		</Field>
	);
}

export function Radio(props: RadioProps) {
	return (
		<AriaRadio
			{...props}
			className={composeRenderProps(props.className, (className) =>
				cn("radio", className),
			)}
		>
			{composeRenderProps(props.children, (children) => (
				<>
					<div className="radio-indicator" />
					{children}
				</>
			))}
		</AriaRadio>
	);
}
