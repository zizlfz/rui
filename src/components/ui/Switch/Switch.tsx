import {
  Switch as AriaSwitch,
  composeRenderProps,
  type SwitchProps,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import "./Switch.css";

export function Switch(props: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("switch", className),
      )}
    >
      {composeRenderProps(props.children, (children, _renderProps) => (
        <>
          <div className="switch-track">
            <span className="switch-handle" />
          </div>
          {children}
        </>
      ))}
    </AriaSwitch>
  );
}
