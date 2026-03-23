import { Button } from "#/components/ui/Button";
import { Label } from "#/components/ui/Form";
import { Input } from "#/components/ui/Input/Input";

interface LoginFormBlockProps {
	onSubmit?: (e: React.FormEvent) => void;
}

export function LoginFormBlock({ onSubmit }: LoginFormBlockProps) {
	return (
		<form className="flex flex-col gap-4" onSubmit={onSubmit}>
			<div className="flex flex-col gap-1">
				<Label>Email</Label>
				<Input type="email" placeholder="Enter your email" />
			</div>
			<div className="flex flex-col gap-1">
				<Label>Password</Label>
				<Input type="password" placeholder="Enter your password" />
			</div>
			<Button className="w-full">Sign In</Button>
		</form>
	);
}
