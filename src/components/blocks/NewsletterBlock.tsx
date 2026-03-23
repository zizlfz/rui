import { Button } from "#/components/ui/Button";
import { Input } from "#/components/ui/Input/Input";

interface NewsletterBlockProps {
	onSubmit?: (e: React.FormEvent) => void;
	description?: string;
}

export function NewsletterBlock({
	onSubmit,
	description = "Subscribe to our newsletter for updates",
}: NewsletterBlockProps) {
	return (
		<form className="flex flex-col gap-4" onSubmit={onSubmit}>
			<p className="text-sm text-muted-foreground">{description}</p>
			<div className="flex gap-2">
				<Input placeholder="Enter your email" className="flex-1" />
				<Button type="submit">Subscribe</Button>
			</div>
		</form>
	);
}
