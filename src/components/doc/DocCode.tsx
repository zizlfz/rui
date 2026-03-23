import type { ReactNode } from "react";
import "./DocCode.css";

interface DocCodeProps {
	children: ReactNode;
}

export function DocCode({ children }: DocCodeProps) {
	return <div className="doc-code">{children}</div>;
}
