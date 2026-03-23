"use client";
import {
	Input as AriaInput,
	TextArea as AriaTextArea,
	TextField as AriaTextField,
	type TextFieldProps as AriaTextFieldProps,
	type ValidationResult,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import { Description, FieldError, Label } from "../Form/Form";
import "./Input.css";

export interface InputProps extends AriaTextFieldProps {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	placeholder?: string;
	inputClassName?: string;
}

export function Input({
	label,
	description,
	errorMessage,
	placeholder,
	inputClassName,
	...props
}: InputProps) {
	return (
		<AriaTextField {...props}>
			{label && <Label>{label}</Label>}
			<AriaInput
				className={cn("input", inputClassName)}
				placeholder={placeholder}
			/>
			{description && <Description>{description}</Description>}
			<FieldError>{errorMessage}</FieldError>
		</AriaTextField>
	);
}

export interface TextAreaProps extends AriaTextFieldProps {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	placeholder?: string;
	inputClassName?: string;
}

export function TextArea({
	label,
	description,
	errorMessage,
	placeholder,
	inputClassName,
	...props
}: TextAreaProps) {
	return (
		<AriaTextField {...props}>
			{label && <Label>{label}</Label>}
			<AriaTextArea
				className={cn("input", inputClassName)}
				placeholder={placeholder}
			/>
			{description && <Description>{description}</Description>}
			<FieldError>{errorMessage}</FieldError>
		</AriaTextField>
	);
}
