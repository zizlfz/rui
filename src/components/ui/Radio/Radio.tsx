import {
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  type ValidationResult,
  type RadioProps,
  Radio as AriaRadio,
  composeRenderProps,
} from "react-aria-components";
import { Label, FieldError, Description } from "#/components/ui/Form";
import { cn } from "#/utils/classname";
import "./Radio.css";

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children"> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("radio-group", className),
      )}
    >
      {label && <Label>{label}</Label>}
      <div className="radio-items">{children}</div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaRadioGroup>
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
