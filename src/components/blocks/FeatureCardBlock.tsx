import { Box } from "#/components/ui/Box";
import { Button } from "#/components/ui/Button";

interface FeatureCardBlockProps {
	title: string;
	description: string;
	icon?: React.ReactNode;
	cta?: string;
	onClick?: () => void;
}

export function FeatureCardBlock({
	title,
	description,
	icon,
	cta = "Learn More",
	onClick,
}: FeatureCardBlockProps) {
	return (
		<Box className="flex flex-col gap-4 h-full">
			{icon && <div className="text-primary">{icon}</div>}
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-sm text-content-muted flex-1">{description}</p>
			{onClick && (
				<Button variant="secondary" onClick={onClick}>
					{cta}
				</Button>
			)}
		</Box>
	);
}
