import type { ReactNode } from "react";
import "./DocAlert.css";

interface DocAlertProps {
	title?: string;
	variant?: "info" | "success" | "warning" | "error";
	children: ReactNode;
}

export function DocAlert({ title, variant = "info", children }: DocAlertProps) {
	return (
		<div className="doc-alert" data-variant={variant}>
			{title && <div className="doc-alert__title">{title}</div>}
			<div className="doc-alert__content">{children}</div>
		</div>
	);
}
