"use client";

import {
	TimeField as AriaTimeField,
	type TimeFieldProps as AriaTimeFieldProps,
	type TimeValue,
	type ValidationResult,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import { DateInput, DateSegment } from "../DateField";
import { Description, FieldError, Label } from "../Form";

import "./TimeField.css";

export interface TimeFieldProps<T extends TimeValue>
	extends AriaTimeFieldProps<T> {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	className?: string;
}

export function TimeField<T extends TimeValue>({
	label,
	description,
	errorMessage,
	className,
	...props
}: TimeFieldProps<T>) {
	return (
		<AriaTimeField {...props} className={cn("timefield", className)}>
			<Label>{label}</Label>
			<DateInput className="timeinput">
				{(segment) => <DateSegment segment={segment} />}
			</DateInput>
			{description && <Description>{description}</Description>}
			<FieldError>{errorMessage}</FieldError>
		</AriaTimeField>
	);
}
