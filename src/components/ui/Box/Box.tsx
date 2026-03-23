import { cn } from "#/utils/classname";
import "./Box.css";

interface BoxProps {
	className?: string;
	children: React.ReactNode;
}

export const Box = ({ children, className }: BoxProps) => {
	return <div className={cn("box", className)}>{children}</div>;
};
