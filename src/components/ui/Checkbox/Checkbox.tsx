import {
  Checkbox as AriaCheckbox,
  composeRenderProps,
  type CheckboxProps,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import "./Checkbox.css";

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        cn("checkbox", className),
      )}
    >
      {composeRenderProps(props.children, (children, renderProps) => (
        <>
          <div className="checkbox-box">
            <svg
              viewBox="0 0 18 18"
              aria-hidden="true"
              className="checkbox-icon"
              key={renderProps.isIndeterminate ? "indeterminate" : "check"}
            >
              {renderProps.isIndeterminate ? (
                <rect x={1} y={7.5} width={16} height={3} />
              ) : (
                <polyline points="2 9 7 14 16 4" />
              )}
            </svg>
          </div>
          {children}
        </>
      ))}
    </AriaCheckbox>
  );
}
