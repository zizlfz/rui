import { Link } from "@tanstack/react-router";

interface DemoBoxProps {
	componentName: string;
	children: React.ReactNode;
	to?: string;
}

export function DemoBox({ componentName, children, to }: DemoBoxProps) {
	const linkTo =
		to ||
		(componentName.startsWith("LoginForm") ||
		componentName.startsWith("Newsletter") ||
		componentName.startsWith("PricingCard") ||
		componentName.startsWith("UserProfile") ||
		componentName.startsWith("ContactForm") ||
		componentName.startsWith("FeatureCard") ||
		componentName.startsWith("Stats")
			? `/blocks/${componentName.split("-")[0]}Block`
			: `/ui/${componentName}`);

	return (
		<div className="aspect-square bg-background relative flex items-center justify-center">
			<div className="absolute top-0 left-0 w-full h-12 flex items-center justify-start px-4">
				<Link to={linkTo}>{componentName}</Link>
			</div>
			<div className="px-4 py-12">{children}</div>
		</div>
	);
}
