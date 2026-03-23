import React from "react";
import type {
  MenuItemProps,
  MenuProps,
  MenuSectionProps,
  MenuTriggerProps,
  SubmenuTriggerProps,
} from "react-aria-components";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  SubmenuTrigger as AriaSubmenuTrigger,
  Header,
  Text,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import { Popover } from "../Popover";

import "./Dropdown.css";

export function DropdownTrigger(props: MenuTriggerProps) {
  const [trigger, dropdown] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement,
  ];
  return (
    <AriaMenuTrigger {...props}>
      {trigger}
      <Popover>{dropdown}</Popover>
    </AriaMenuTrigger>
  );
}

export function Dropdown<T extends object>(props: MenuProps<T>) {
  return (
    <AriaMenu {...props} className={cn("dropdown-menu", props.className)} />
  );
}

export function DropdownItem(
  props: Omit<MenuItemProps, "children"> & {
    children?: React.ReactNode;
    className?: string;
  },
) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaMenuItem
      {...props}
      textValue={textValue}
      className={cn("dropdown-item", props.className)}
    >
      {({ hasSubmenu, isSelected, selectionMode }) => (
        <>
          {isSelected && selectionMode === "multiple" ? (
            <svg
              className="dropdown-check-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Check</title>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : null}
          {isSelected && selectionMode === "single" ? (
            <svg
              className="dropdown-dot-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Dot</title>
              <circle cx="12" cy="12" r="10" />
            </svg>
          ) : null}
          {typeof props.children === "string" ? (
            <Text slot="label" className="dropdown-item-text">
              {props.children}
            </Text>
          ) : (
            props.children
          )}
          {hasSubmenu && (
            <svg
              className="dropdown-submenu-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Chevron Right</title>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </>
      )}
    </AriaMenuItem>
  );
}

export function DropdownSection<T extends object>(props: MenuSectionProps<T>) {
  return (
    <AriaMenuSection
      {...props}
      className={cn("dropdown-section", props.className)}
    />
  );
}

export function DropdownTitle(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <Header {...props} className={cn("dropdown-header", props.className)} />
  );
}

export function SubdropdownTrigger(props: SubmenuTriggerProps) {
  const [trigger, dropdown] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement,
  ];
  return (
    <AriaSubmenuTrigger {...props}>
      {trigger}
      <Popover offset={-2} crossOffset={-4}>
        {dropdown}
      </Popover>
    </AriaSubmenuTrigger>
  );
}
