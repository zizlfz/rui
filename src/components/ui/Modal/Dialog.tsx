import {
	Dialog as RACDialog,
	type DialogProps as RACDialogProps,
} from "react-aria-components";
import { cn } from "#/utils/classname";
import "./Dialog.css";

export interface DialogProps extends RACDialogProps {}

export function Dialog(props: DialogProps) {
	return <RACDialog {...props} className={cn("dialog", props.className)} />;
}
