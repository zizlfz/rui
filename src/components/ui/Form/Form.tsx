import {
	Button as AriaButton,
	FieldError as AriaFieldError,
	Label as AriaLabel,
	Text as AriaText,
	type ButtonProps,
	type FieldErrorProps,
	type LabelProps,
	type TextProps,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import "./Form.css";

export function Label(props: LabelProps) {
	return <AriaLabel {...props} className={cn("form-label", props.className)} />;
}

export function FieldError(props: FieldErrorProps) {
	return (
		<AriaFieldError {...props} className={cn("form-error", props.className)} />
	);
}

export function Description(props: TextProps) {
	return (
		<AriaText
			{...props}
			slot="description"
			className={cn("form-description", props.className)}
		/>
	);
}

export function FieldButton(props: ButtonProps) {
	return (
		<AriaButton {...props} className={cn("form-button", props.className)} />
	);
}
