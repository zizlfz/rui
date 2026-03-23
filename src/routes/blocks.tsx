import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, Shield, Zap } from "lucide-react";
import { DrawerFormBlock } from "#/components/blocks/DrawerFormBlock";
import { FeatureCardBlock } from "#/components/blocks/FeatureCardBlock";
import { LoginFormBlock } from "#/components/blocks/LoginFormBlock";
import { NewsletterBlock } from "#/components/blocks/NewsletterBlock";
import { PricingCardBlock } from "#/components/blocks/PricingCardBlock";
import { StatsBlock } from "#/components/blocks/StatsBlock";
import { UserProfileBlock } from "#/components/blocks/UserProfileBlock";
import { DemoBox } from "../components/DemoBox";

export const Route = createFileRoute("/blocks")({ component: Blocks });

function Blocks() {
	return (
		<main className="flex justify-center grow px-4 lg:px-12">
			<div className="container min-h-full">
				<div className="border-l border-r min-h-full bg-surface">
					<div className="p-6 border-b">
						<h1 className="text-2xl font-bold">Blocks</h1>
						<p className="text-content-muted mt-2">
							Composed UI components built from our component library. Click on
							any block to see the code.
						</p>
					</div>
					<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-px">
						<DemoBox componentName="LoginFormBlock">
							<LoginFormBlock />
						</DemoBox>

						<DemoBox componentName="NewsletterBlock">
							<NewsletterBlock />
						</DemoBox>

						<DemoBox componentName="PricingCardBlock">
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
							/>
						</DemoBox>

						<DemoBox componentName="UserProfileBlock">
							<UserProfileBlock
								name="Sarah Johnson"
								email="sarah@example.com"
								isOnline
								onEdit={() => console.log("Edit clicked")}
								onMessage={() => console.log("Message clicked")}
							/>
						</DemoBox>

						<DemoBox componentName="FeatureCardBlock">
							<FeatureCardBlock
								title="Secure by Default"
								description="Enterprise-grade security features built into every component."
								icon={<Shield size={24} />}
								cta="Security Docs"
								onClick={() => console.log("Security clicked")}
							/>
						</DemoBox>

						<DemoBox componentName="StatsBlock">
							<StatsBlock
								stats={[
									{
										label: "Total Users",
										value: "24.5K",
										change: "+12%",
										isPositive: true,
									},
								]}
							/>
						</DemoBox>

						<DemoBox componentName="DrawerFormBlock">
							<DrawerFormBlock
								onSubmit={async (data) => {
									await new Promise((resolve) => setTimeout(resolve, 1500));
									console.log("Submitted:", data);
								}}
							/>
						</DemoBox>
					</div>
				</div>
			</div>
		</main>
	);
}
