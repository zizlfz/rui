import {
  TextArea as AriaTextArea,
  type TextAreaProps as AriaTextAreaProps,
} from "react-aria-components";

import "./Textarea.css";
import { cn } from "#/utils/classname";

export interface TextareaProps extends AriaTextAreaProps {
  error?: string;
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <AriaTextArea
      className={cn("textarea", error && "textarea-invalid", className)}
      {...props}
    />
  );
}
