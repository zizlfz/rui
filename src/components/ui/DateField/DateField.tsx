"use client";

import {
  DateField as AriaDateField,
  type DateFieldProps as AriaDateFieldProps,
  DateInput as AriaDateInput,
  type DateInputProps as AriaDateInputProps,
  DateSegment as AriaDateSegment,
  type DateSegmentProps as AriaDateSegmentProps,
} from "react-aria-components";
import { type DateValue } from "react-aria-components";
import { Field, Label } from "#/components/ui/Form";
import { cn } from "#/utils/classname";

import "./DateField.css";

export interface DateFieldProps extends AriaDateFieldProps<DateValue> {
  label?: string;
  className?: string;
}

export function DateField({ className, label, ...props }: DateFieldProps) {
  return (
    <Field className={className}>
      {label && <Label>{label}</Label>}
      <AriaDateField aria-label={label} {...props} className="datefield" />
    </Field>
  );
}

export interface DateInputProps extends AriaDateInputProps {
  className?: string;
}

export function DateInput({ className, ...props }: DateInputProps) {
  return <AriaDateInput {...props} className={cn("dateinput", className)} />;
}

export interface DateSegmentProps extends AriaDateSegmentProps {
  segment: any;
}

export function DateSegment({ segment, ...props }: DateSegmentProps) {
  return <AriaDateSegment {...props} segment={segment} />;
}
