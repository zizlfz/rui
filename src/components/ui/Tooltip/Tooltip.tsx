import type {
	TooltipProps as AriaTooltipProps,
	TooltipTriggerComponentProps,
} from "react-aria-components";
import {
	Tooltip as AriaTooltip,
	TooltipTrigger as AriaTooltipTrigger,
	composeRenderProps,
	OverlayArrow,
} from "react-aria-components";
import { cn } from "#/utils/classname";

import "./Tooltip.css";

export interface TooltipProps extends Omit<AriaTooltipProps, "children"> {
	children: React.ReactNode;
}

export function Tooltip({ children, ...props }: TooltipProps) {
	return (
		<AriaTooltip
			{...props}
			className={composeRenderProps(props.className, (className) =>
				cn("tooltip", className),
			)}
		>
			<OverlayArrow className="tooltip-arrow">
				<svg width={8} height={8} viewBox="0 0 8 8">
					<title>Tooltip arrow</title>
					<path d="M0 0 L4 4 L8 0" />
				</svg>
			</OverlayArrow>
			{children}
		</AriaTooltip>
	);
}

export function TooltipTrigger(props: TooltipTriggerComponentProps) {
	return <AriaTooltipTrigger {...props} />;
}
