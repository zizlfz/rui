import {
	Dialog,
	ModalOverlay,
	type ModalOverlayProps,
	Modal as RACModal,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import "./Modal.css";

export interface ModalProps extends ModalOverlayProps {}

export function Modal({ className, children, ...props }: ModalProps) {
	return (
		<ModalOverlay {...props} className="modal-overlay">
			<RACModal {...props} className={cn("modal", className)}>
				<Dialog>{children as React.ReactNode}</Dialog>
			</RACModal>
		</ModalOverlay>
	);
}
