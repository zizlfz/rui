import { Button, composeRenderProps } from "react-aria-components";
import type {
  ListBoxItemProps,
  ListBoxProps,
  SelectProps as AriaSelectProps,
  ValidationResult,
} from "react-aria-components";
import { Select as AriaSelect, SelectValue } from "react-aria-components";
import { DropdownItem, DropdownListBox } from "#/components/ui/ListBox";
import { ChevronDown } from "lucide-react";
import { Popover } from "#/components/ui/Popover";
import { Label, FieldError, Description } from "#/components/ui/Form";
import { cn } from "#/utils/classname";

import "./Select.css";

export interface SelectProps<
  T extends object,
  M extends "single" | "multiple",
> extends Omit<AriaSelectProps<T, M>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<
  T extends object,
  M extends "single" | "multiple" = "single",
>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T, M>) {
  return (
    <AriaSelect
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("select", className),
      )}
    >
      {label && <Label>{label}</Label>}
      <Button className="select-button">
        <SelectValue className="select-value" />
        <ChevronDown aria-hidden="true" className="select-chevron" />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="select-popover">
        <SelectListBox items={items}>{children}</SelectListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}
