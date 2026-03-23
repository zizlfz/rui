import {
	Dialog,
	type DialogRenderProps,
	ModalOverlay,
	type ModalOverlayProps,
	Modal as RACModal,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import "./Drawer.css";

export type DrawerPosition = "right" | "left" | "bottom";

export interface DrawerProps extends Omit<ModalOverlayProps, "children"> {
	position?: DrawerPosition;
	noOverlay?: boolean;
	children?: React.ReactNode | ((props: DialogRenderProps) => React.ReactNode);
}

export function Drawer({
	position = "right",
	noOverlay,
	className,
	children,
	...props
}: DrawerProps) {
	const renderChildren =
		typeof children === "function" ? children : () => children;

	const drawer = (
		<RACModal
			{...props}
			className={cn(`drawer drawer--${position}`, className)}
		>
			<Dialog>
				{(dialogProps) => renderChildren(dialogProps as DialogRenderProps)}
			</Dialog>
		</RACModal>
	);

	if (noOverlay) {
		return drawer;
	}

	return (
		<ModalOverlay {...props} className="drawer-overlay">
			{drawer}
		</ModalOverlay>
	);
}
