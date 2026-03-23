import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
} from "react-aria-components";

import "./Input.css";
import { cn } from "#/utils/classname";

export interface InputProps extends AriaInputProps {
  error?: string;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <AriaInput
      className={cn("input", error && "input-invalid", className)}
      {...props}
    />
  );
}
