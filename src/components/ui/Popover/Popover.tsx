import { type PopoverProps, composeRenderProps } from "react-aria-components";
import { Popover as AriaPopover } from "react-aria-components";
import { cn } from "#/utils/classname";
import "./Popover.css";

export function Popover(props: PopoverProps) {
  return (
    <AriaPopover
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("popover", className),
      )}
    />
  );
}
