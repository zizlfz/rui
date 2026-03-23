import { ChevronDown } from "lucide-react";
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue,
  Input,
  type ListBoxItemProps,
  type ListBoxProps,
  type ValidationResult,
} from "react-aria-components";
import { Description, Field, FieldButton, FieldError, Label } from "../Form";
import { ListBox, ListBoxItem } from "../ListBox";
import { Popover } from "../Popover";
import "./ComboBox.css";

export interface ComboBoxProps<
  T extends object,
  M extends "single" | "multiple",
> extends Omit<AriaComboBoxProps<T, M>, "children"> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
  placeholder?: string;
  className?: string;
}

export function ComboBox<
  T extends object,
  M extends "single" | "multiple" = "single",
>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  className,
  ...props
}: ComboBoxProps<T, M>) {
  return (
    <Field className={className}>
      {label && <Label>{label}</Label>}
      <AriaComboBox {...props}>
        <div className="combobox-field">
          <Input className="input inset" placeholder={placeholder} />
          <FieldButton className="combobox-field-button">
            <ChevronDown />
          </FieldButton>
        </div>
        {props.selectionMode === "multiple" && (
          <ComboBoxValue placeholder="No items selected" />
        )}
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
        <Popover className="combobox-popover">
          <ComboBoxListBox>{children}</ComboBoxListBox>
        </Popover>
      </AriaComboBox>
    </Field>
  );
}

export function ComboBoxListBox<T extends object>(props: ListBoxProps<T>) {
  return <ListBox {...props} />;
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <ListBoxItem {...props} />;
}
