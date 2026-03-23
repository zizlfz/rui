"use client";

import {
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  TagList,
  type TagProps as AriaTagProps,
  Tag as AriaTag,
  Button,
  type ValidationResult,
  composeRenderProps,
} from "react-aria-components";
import { Label, FieldError, Description } from "#/components/ui/Form";
import { X } from "lucide-react";
import { cn } from "#/utils/classname";
import "./Tag.css";

export interface TagGroupProps<T extends object> extends Omit<
  AriaTagGroupProps,
  "children"
> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  renderEmptyState?: (props: unknown) => React.ReactNode;
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup {...props} className={cn("tag-group", props.className)}>
      {label && <Label>{label}</Label>}
      <TagList
        items={items}
        renderEmptyState={renderEmptyState}
        className="tag-list"
      >
        {children}
      </TagList>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTagGroup>
  );
}

export interface TagProps extends Omit<AriaTagProps, "children"> {
  children?: React.ReactNode;
}

export function Tag({ children, ...props }: TagProps) {
  return (
    <AriaTag
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("tag", className),
      )}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {children}
          {renderProps.allowsRemoving && (
            <Button slot="remove" className="tag-remove-button">
              <X aria-hidden className="tag-remove-icon" />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  );
}
