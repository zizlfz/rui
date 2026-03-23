import { useState } from "react";
import { DialogTrigger, Heading } from "react-aria-components";
import { Button } from "#/components/ui/Button";
import { Drawer } from "#/components/ui/Drawer/Drawer";
import { Label } from "#/components/ui/Form";
import { Input } from "#/components/ui/Input/Input";
import { Textarea } from "#/components/ui/Textarea/Textarea";

interface DrawerFormBlockProps {
	onSubmit?: (data: {
		name: string;
		email: string;
		message: string;
	}) => Promise<void> | void;
	triggerText?: string;
	title?: string;
}

export function DrawerFormBlock({
	onSubmit,
	triggerText = "Open Contact Form",
	title = "Contact Us",
}: DrawerFormBlockProps) {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<DialogTrigger>
			<Button>{triggerText}</Button>
			<Drawer>
				{({ close }) => (
					<>
						<Heading slot="title">{title}</Heading>
						<form
							className="flex flex-col gap-4"
							onSubmit={async (e) => {
								e.preventDefault();
								const formData = new FormData(e.currentTarget);
								const data = {
									name: formData.get("name") as string,
									email: formData.get("email") as string,
									message: formData.get("message") as string,
								};
								setIsLoading(true);
								try {
									await onSubmit?.(data);
									close();
								} finally {
									setIsLoading(false);
								}
							}}
						>
							<div className="flex flex-col gap-1">
								<Label htmlFor="name">Name</Label>
								<Input id="name" name="name" placeholder="Your name" required />
							</div>
							<div className="flex flex-col gap-1">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="your@email.com"
									required
								/>
							</div>
							<div className="flex flex-col gap-1">
								<Label htmlFor="message">Message</Label>
								<Textarea
									id="message"
									name="message"
									placeholder="How can we help?"
									rows={4}
									required
								/>
							</div>
							<div className="flex gap-2 self-end mt-2">
								<Button
									type="button"
									slot="close"
									variant="secondary"
									isDisabled={isLoading}
								>
									Cancel
								</Button>
								<Button type="submit" isPending={isLoading}>
									Send Message
								</Button>
							</div>
						</form>
					</>
				)}
			</Drawer>
		</DialogTrigger>
	);
}
