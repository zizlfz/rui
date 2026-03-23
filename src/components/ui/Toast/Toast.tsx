"use client";
import { X } from "lucide-react";
import type { CSSProperties } from "react";
import {
	Button,
	Text,
	UNSTABLE_Toast as Toast,
	UNSTABLE_ToastContent as ToastContent,
	type ToastProps,
	UNSTABLE_ToastQueue as ToastQueue,
	UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";
import { flushSync } from "react-dom";
import "./Toast.css";

interface ToastContentType {
	title: string;
	description?: string;
}

export const queue = new ToastQueue<ToastContentType>({
	wrapUpdate(fn) {
		if ("startViewTransition" in document) {
			document.startViewTransition(() => {
				flushSync(fn);
			});
		} else {
			fn();
		}
	},
});

export function MyToastRegion() {
	return (
		<ToastRegion queue={queue} className="toast-region">
			{({ toast }: { toast: { key: string; content: ToastContentType } }) => (
				<Toast
					toast={toast}
					className="toast"
					style={{ viewTransitionName: toast.key } as CSSProperties}
				>
					<ToastContent className="toast-content">
						<Text slot="title" className="toast-title">
							{toast.content.title}
						</Text>
						{toast.content.description && (
							<Text slot="description" className="toast-description">
								{toast.content.description}
							</Text>
						)}
					</ToastContent>
					<Button slot="close" aria-label="Close" className="toast-close">
						<X size={16} />
					</Button>
				</Toast>
			)}
		</ToastRegion>
	);
}

export function MyToast(props: ToastProps<ToastContentType>) {
	return <Toast {...props} className="toast" />;
}

export type { ToastContentType };
