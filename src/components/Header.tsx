import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="border-b px-4 lg:px-12">
			<div className="container mx-auto">
				<nav className="text-base page-wrap flex items-center justify-between h-12 border-r border-l px-4 relative">
					<h2 className="font-semibold tracking-tight">
						<Link to="/" className="no-underline">
							RUI
						</Link>
					</h2>
					<div className="absolute left-1/2 -translate-x-1/2 flex gap-x-6">
						<Link to="/why">Why?</Link>
						<Link to="/installation">Installation</Link>
						<Link to="/components">Components</Link>
						<Link to="/blocks">Blocks</Link>
					</div>
					<div className="flex items-center gap-x-3">
						<a
							className="flex gap-1 items-center"
							href="https://github.com/zizlfz/rui"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.1em"
								height="1.1em"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
								></path>
							</svg>{" "}
							@zizlfz/rui
						</a>
						<span>v0.10.0</span>
					</div>
				</nav>
			</div>
		</header>
	);
}
