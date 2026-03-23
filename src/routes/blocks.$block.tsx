import { createFileRoute } from "@tanstack/react-router";
import { DrawerFormBlock } from "#/components/blocks/DrawerFormBlock";
import { FeatureCardBlock } from "#/components/blocks/FeatureCardBlock";
import { LoginFormBlock } from "#/components/blocks/LoginFormBlock";
import { NewsletterBlock } from "#/components/blocks/NewsletterBlock";
import { PricingCardBlock } from "#/components/blocks/PricingCardBlock";
import { StatsBlock } from "#/components/blocks/StatsBlock";
import { UserProfileBlock } from "#/components/blocks/UserProfileBlock";
import { Box } from "#/components/ui/Box";
import { Button } from "#/components/ui/Button";

export const Route = createFileRoute("/blocks/$block")({
	component: BlockDetail,
});

// biome-ignore lint/suspicious/noExplicitAny: Component types vary by block
const blockComponents: Record<string, React.ComponentType<any>> = {
	LoginFormBlock,
	NewsletterBlock,
	PricingCardBlock,
	UserProfileBlock,
	FeatureCardBlock,
	StatsBlock,
	DrawerFormBlock,
};

const blockCodeExamples: Record<string, string> = {
	LoginFormBlock: `import { LoginFormBlock } from "#/components/blocks/LoginFormBlock";

function App() {
  return (
    <LoginFormBlock
      onSubmit={async (data) => {
        console.log("Login submitted:", data);
        // Handle authentication
      }}
    />
  );
}`,
	NewsletterBlock: `import { NewsletterBlock } from "#/components/blocks/NewsletterBlock";

function App() {
  return (
    <NewsletterBlock
      description="Subscribe to our newsletter"
      onSubmit={(e) => {
        e.preventDefault();
        // Handle subscription
      }} />
  );
}`,
	PricingCardBlock: `import { PricingCardBlock } from "#/components/blocks/PricingCardBlock";

function App() {
  return (
    <PricingCardBlock
      title="Pro Plan"
      price="$19/mo"
      description="Perfect for growing teams"
      features={[
        "Unlimited projects",
        "Priority support",
        "Advanced analytics",
        "Team collaboration",
      ]}
      isPopular
      buttonText="Get Started"
      buttonVariant="primary"
      onClick={() => console.log("Get Started")}
    />
  );
}`,
	UserProfileBlock: `import { UserProfileBlock } from "#/components/blocks/UserProfileBlock";

function App() {
  return (
    <UserProfileBlock
      name="Sarah Johnson"
      email="sarah@example.com"
      avatar="/avatar.jpg"
      isOnline
      onEdit={() => console.log("Edit")}
      onMessage={() => console.log("Message")}
    />
  );
}`,
	ContactFormBlock: `import { ContactFormBlock } from "#/components/blocks/ContactFormBlock";

function App() {
  return (
    <ContactFormBlock
      onSubmit={(e) => {
        e.preventDefault();
        // Handle form submission
      }} />
  );
}`,
	FeatureCardBlock: `import { FeatureCardBlock } from "#/components/blocks/FeatureCardBlock";
import { Zap } from "lucide-react";

function App() {
  return (
    <FeatureCardBlock
      title="Lightning Fast"
      description="Built with performance in mind"
      icon={<Zap size={24} />}
      cta="Learn More"
      onClick={() => console.log("Learn More")}
    />
  );
}`,
	StatsBlock: `import { StatsBlock } from "#/components/blocks/StatsBlock";

function App() {
  return (
    <StatsBlock
      stats={[
        { label: "Total Users", value: "24.5K", change: "+12%", isPositive: true },
        { label: "Revenue", value: "$48.2K", change: "+8%", isPositive: true },
        { label: "Bounce Rate", value: "32.4%", change: "-3%", isPositive: true },
      ]}
    />
  );
}`,
	DrawerFormBlock: `import { DrawerFormBlock } from "#/components/blocks/DrawerFormBlock";

function App() {
  return (
    <DrawerFormBlock
      triggerText="Contact Us"
      title="Get in Touch"
      onSubmit={async (data) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", data);
      }}
    />
  );
}`,
};

function BlockDetail() {
	const { block } = Route.useParams();
	const Component = blockComponents[block];

	if (!Component) {
		return (
			<main className="flex justify-center grow px-4 lg:px-12">
				<div className="container min-h-full">
					<Box className="p-6">
						<h1 className="text-2xl font-bold">Block Not Found</h1>
						<p className="text-content-muted mt-2">
							The block "{block}" does not exist.
						</p>
					</Box>
				</div>
			</main>
		);
	}

	return (
		<main className="flex justify-center grow px-4 lg:px-12">
			<div className="container min-h-full">
				<div className="border-l border-r min-h-full bg-border">
					<div className="p-6 border-b">
						<h1 className="text-3xl font-bold">{block}</h1>
						<p className="text-content-muted mt-2">
							A composed UI component built from the RUI component library.
						</p>
					</div>

					<div className="p-6">
						<h2 className="text-xl font-semibold mb-4">Live Demo</h2>
						<Box className="p-8 mb-8 bg-surface">
							<Component />
						</Box>

						<h2 className="text-xl font-semibold mb-4">Code Example</h2>
						<Box className="p-4 mb-8 overflow-x-auto bg-surface">
							<pre className="text-sm">
								<code className="text-content-muted">
									{blockCodeExamples[block] || "// Code example not available"}
								</code>
							</pre>
						</Box>

						<div className="flex gap-2">
							<Button variant="secondary" onClick={() => window.history.back()}>
								Go Back
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
