import { ChevronDown } from "lucide-react";
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  Button,
  type DateValue,
  Group,
  type ValidationResult,
} from "react-aria-components";
import { Calendar } from "#/components/ui/Calendar";
import { DateInput, DateSegment } from "#/components/ui/DateField";
import { Description, Field, FieldError, Label } from "#/components/ui/Form";
import { Popover } from "#/components/ui/Popover";

import "./DatePicker.css";

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
}: DatePickerProps<T> & { className?: string }) {
  return (
    <Field className={className}>
      {label && <Label>{label}</Label>}
      <AriaDatePicker aria-label={label} {...props} className="datepicker">
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
    </Field>
  );
}
