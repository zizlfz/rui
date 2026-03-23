import {
  Button as RACButton,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import "./Button.css";
import { cn } from "#/utils/classname";

interface ButtonProps extends RACButtonProps {
  /**
   * The visual style of the button (Vanilla CSS implementation specific).
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "quiet" | "danger" | "success";
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={cn("button", className)}
      data-variant={props.variant}
    >
      {composeRenderProps(props.children, (children, { isPending }) => (
        <>
          {isPending && (
            <span className="button-spinner">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9.5"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animateTransform>
                  <animate
                    attributeName="stroke-dasharray"
                    values="0 150;42 150;42 150"
                    keyTimes="0;0.5;1"
                    dur="1.5s"
                    repeatCount="indefinite"
                  ></animate>
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-16;-59"
                    keyTimes="0;0.5;1"
                    dur="1.5s"
                    repeatCount="indefinite"
                  ></animate>
                </circle>
                <circle
                  cx="12"
                  cy="12"
                  r="9.5"
                  fill="none"
                  opacity="0.1"
                  stroke-width="2"
                  stroke-linecap="round"
                ></circle>
              </svg>
            </span>
          )}
          {children}
        </>
      ))}
    </RACButton>
  );
}
