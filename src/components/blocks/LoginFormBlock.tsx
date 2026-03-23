import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { Form } from "#/components/ui/Form";
import { Input } from "#/components/ui/Input/Input";

interface LoginFormBlockProps {
	onSubmit?: (data: {
		email: string;
		password: string;
	}) => Promise<void> | void;
}

export function LoginFormBlock({ onSubmit }: LoginFormBlockProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		const formData = new FormData(e.currentTarget);
		const data = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		setIsLoading(true);
		try {
			await onSubmit?.(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Form
			className="flex flex-col gap-4 w-full max-w-sm"
			onSubmit={handleSubmit}
		>
			<Input
				label="Email"
				name="email"
				type="email"
				placeholder="you@example.com"
				autoComplete="email"
				isRequired
				errorMessage="Please enter a valid email address."
			/>
			<Input
				label="Password"
				name="password"
				type="password"
				placeholder="Enter your password"
				autoComplete="current-password"
				isRequired
				minLength={8}
				errorMessage="Password must be at least 8 characters."
			/>
			{error && <p className="text-sm text-danger">{error}</p>}
			<Button type="submit" isPending={isLoading}>
				Sign In
			</Button>
		</Form>
	);
}
