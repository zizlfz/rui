"use client";

import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
  Group,
  type ValidationResult,
} from "react-aria-components";
import { DateInput, DateSegment } from "#/components/ui/DateField";
import { Calendar } from "#/components/ui/Calendar";
import { Label, FieldError, Description } from "#/components/ui/Form";
import { Button } from "react-aria-components";
import { Popover } from "#/components/ui/Popover";
import { ChevronDown } from "lucide-react";
import { cn } from "#/utils/classname";

import "./Datepicker.css";

export interface DatePickerProps<
  T extends DateValue,
> extends AriaDatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  className,
  ...props
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker {...props} className={cn("datepicker", className)}>
      {label && <Label>{label}</Label>}
      <Group className="datepicker-group">
        <DateInput className="datepicker-input">
          {(segment: any) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="datepicker-button">
          <ChevronDown aria-hidden="true" className="datepicker-chevron" />
        </Button>
      </Group>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="datepicker-popover">
        <Calendar />
      </Popover>
    </AriaDatePicker>
  );
}
