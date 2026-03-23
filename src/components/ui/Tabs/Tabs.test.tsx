import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "#/components/ui/Tabs";

beforeAll(() => {
	Element.prototype.getAnimations = vi.fn().mockReturnValue([]);
});

function BasicTabs(
	props: Omit<React.ComponentProps<typeof Tabs>, "children"> = {},
) {
	return (
		<Tabs {...props}>
			<TabList>
				<Tab id="overview">Overview</Tab>
				<Tab id="details">Details</Tab>
				<Tab id="settings">Settings</Tab>
			</TabList>
			<TabPanels>
				<TabPanel id="overview">Overview content</TabPanel>
				<TabPanel id="details">Details content</TabPanel>
				<TabPanel id="settings">Settings content</TabPanel>
			</TabPanels>
		</Tabs>
	);
}

function getTabList() {
	return screen.getByRole("tablist");
}

function getTabs() {
	return screen.getAllByRole("tab");
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
describe("Tabs — rendering", () => {
	it("renders a tab list with tabs", () => {
		render(<BasicTabs />);
		expect(getTabList()).toBeInTheDocument();
		expect(getTabs().length).toBe(3);
	});

	it("renders the selected tab panel", () => {
		render(<BasicTabs />);
		expect(screen.getByRole("tabpanel")).toBeInTheDocument();
	});

	it("renders tab text content", () => {
		render(<BasicTabs />);
		expect(screen.getByText("Overview")).toBeInTheDocument();
		expect(screen.getByText("Details")).toBeInTheDocument();
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	it("renders panel content for the selected tab", () => {
		render(<BasicTabs />);
		expect(screen.getByText("Overview content")).toBeInTheDocument();
	});

	it("applies the base .tabs class to the root element", () => {
		const { container } = render(<BasicTabs />);
		expect(container.querySelector(".tabs")).toBeInTheDocument();
	});

	it("merges a custom className on the root element", () => {
		const { container } = render(<BasicTabs className="custom-tabs" />);
		const tabs = container.querySelector(".tabs");
		expect(tabs).toHaveClass("tabs");
		expect(tabs).toHaveClass("custom-tabs");
	});

	it("applies the base .tab-list class to the tab list", () => {
		render(<BasicTabs />);
		expect(getTabList()).toHaveClass("tab-list");
	});

	it("applies the base .tab-item class to each tab", () => {
		const { container } = render(<BasicTabs />);
		const tabs = container.querySelectorAll(".tab-item");
		expect(tabs.length).toBe(3);
	});

	it("applies the base .tab-panels class to the panels container", () => {
		const { container } = render(<BasicTabs />);
		expect(container.querySelector(".tab-panels")).toBeInTheDocument();
	});

	it("applies the base .tab-panel class to the visible panel", () => {
		const { container } = render(<BasicTabs />);
		expect(container.querySelector(".tab-panel")).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Selection
// ---------------------------------------------------------------------------
describe("Tabs — selection", () => {
	it("selects the first tab by default", () => {
		render(<BasicTabs />);
		const tabs = getTabs();
		expect(tabs[0]).toHaveAttribute("aria-selected", "true");
		expect(tabs[1]).toHaveAttribute("aria-selected", "false");
		expect(tabs[2]).toHaveAttribute("aria-selected", "false");
	});

	it("selects the defaultSelectedKey tab when provided", () => {
		render(<BasicTabs defaultSelectedKey="details" />);
		const tabs = getTabs();
		expect(tabs[0]).toHaveAttribute("aria-selected", "false");
		expect(tabs[1]).toHaveAttribute("aria-selected", "true");
		expect(tabs[2]).toHaveAttribute("aria-selected", "false");
	});

	it("shows the correct panel content for selected tab", () => {
		render(<BasicTabs defaultSelectedKey="details" />);
		expect(screen.getByRole("tabpanel")).toHaveTextContent("Details content");
	});

	it("changes selection when a tab is clicked", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		const tabs = getTabs();
		await user.click(tabs[1]);
		expect(tabs[0]).toHaveAttribute("aria-selected", "false");
		expect(tabs[1]).toHaveAttribute("aria-selected", "true");
	});

	it("calls onSelectionChange when selection changes", async () => {
		const user = userEvent.setup();
		const onSelectionChange = vi.fn();
		render(<BasicTabs onSelectionChange={onSelectionChange} />);
		await user.click(screen.getByRole("tab", { name: "Details" }));
		expect(onSelectionChange).toHaveBeenCalledWith("details");
	});

	it("supports controlled selection with selectedKey", () => {
		function ControlledTabs() {
			const [selectedKey, setSelectedKey] = React.useState<string>("overview");
			return (
				<Tabs
					selectedKey={selectedKey}
					onSelectionChange={(key) => setSelectedKey(key as string)}
				>
					<TabList>
						<Tab id="overview">Overview</Tab>
						<Tab id="details">Details</Tab>
					</TabList>
					<TabPanels>
						<TabPanel id="overview">Overview content</TabPanel>
						<TabPanel id="details">Details content</TabPanel>
					</TabPanels>
				</Tabs>
			);
		}

		render(<ControlledTabs />);
		const tabs = getTabs();
		expect(tabs[0]).toHaveAttribute("aria-selected", "true");
	});
});

// ---------------------------------------------------------------------------
// Disabled tabs
// ---------------------------------------------------------------------------
describe("Tabs — disabled state", () => {
	it("renders a disabled tab with aria-disabled", () => {
		render(
			<Tabs>
				<TabList>
					<Tab id="overview">Overview</Tab>
					<Tab id="details" isDisabled>
						Details
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="overview">Overview content</TabPanel>
					<TabPanel id="details">Details content</TabPanel>
				</TabPanels>
			</Tabs>,
		);
		expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute(
			"aria-disabled",
			"true",
		);
	});

	it("does not change selection when clicking a disabled tab", async () => {
		const user = userEvent.setup();
		render(
			<Tabs>
				<TabList>
					<Tab id="overview">Overview</Tab>
					<Tab id="details" isDisabled>
						Details
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="overview">Overview content</TabPanel>
					<TabPanel id="details">Details content</TabPanel>
				</TabPanels>
			</Tabs>,
		);
		const tabs = getTabs();
		await user.click(screen.getByRole("tab", { name: "Details" }));
		expect(tabs[0]).toHaveAttribute("aria-selected", "true");
		expect(tabs[1]).toHaveAttribute("aria-selected", "false");
	});

	it("applies the data-disabled attribute to disabled tabs", () => {
		const { container } = render(
			<Tabs>
				<TabList>
					<Tab id="overview">Overview</Tab>
					<Tab id="details" isDisabled>
						Details
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="overview">Overview content</TabPanel>
					<TabPanel id="details">Details content</TabPanel>
				</TabPanels>
			</Tabs>,
		);
		const disabledTab = container.querySelectorAll(".tab-item")[1];
		expect(disabledTab).toHaveAttribute("data-disabled");
	});
});

// ---------------------------------------------------------------------------
// Focus
// ---------------------------------------------------------------------------
describe("Tabs — focus", () => {
	it("is focusable via Tab key", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		await user.tab();
		expect(getTabs()[0]).toHaveFocus();
	});

	it("moves focus between tabs with ArrowRight in horizontal orientation", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		await user.tab();
		await user.keyboard("{ArrowRight}");
		expect(getTabs()[1]).toHaveFocus();
		await user.keyboard("{ArrowRight}");
		expect(getTabs()[2]).toHaveFocus();
	});

	it("moves focus between tabs with ArrowLeft in horizontal orientation", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		await user.tab();
		await user.keyboard("{ArrowRight}");
		await user.keyboard("{ArrowRight}");
		await user.keyboard("{ArrowLeft}");
		expect(getTabs()[1]).toHaveFocus();
	});

	it("moves focus to the first tab with Home", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		await user.tab();
		await user.keyboard("{ArrowRight}");
		await user.keyboard("{ArrowRight}");
		await user.keyboard("{Home}");
		expect(getTabs()[0]).toHaveFocus();
	});

	it("moves focus to the last tab with End", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		await user.tab();
		await user.keyboard("{End}");
		expect(getTabs()[2]).toHaveFocus();
	});

	it("activates the focused tab with Enter", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		await user.tab();
		await user.keyboard("{ArrowRight}");
		await user.keyboard("{Enter}");
		expect(getTabs()[1]).toHaveAttribute("aria-selected", "true");
	});

	it("activates the focused tab with Space", async () => {
		const user = userEvent.setup();
		render(<BasicTabs />);
		await user.tab();
		await user.keyboard("{ArrowRight}");
		await user.keyboard(" ");
		expect(getTabs()[1]).toHaveAttribute("aria-selected", "true");
	});
});

// ---------------------------------------------------------------------------
// Orientation
// ---------------------------------------------------------------------------
describe("Tabs — orientation", () => {
	it("sets horizontal orientation by default", () => {
		const { container } = render(<BasicTabs />);
		expect(container.querySelector(".tabs")).toHaveAttribute(
			"data-orientation",
			"horizontal",
		);
	});

	it("sets vertical orientation when prop is provided", () => {
		const { container } = render(<BasicTabs orientation="vertical" />);
		expect(container.querySelector(".tabs")).toHaveAttribute(
			"data-orientation",
			"vertical",
		);
	});
});

// ---------------------------------------------------------------------------
// Custom className
// ---------------------------------------------------------------------------
describe("Tabs — custom className", () => {
	it("merges custom className on TabList", () => {
		render(
			<Tabs>
				<TabList className="custom-list">
					<Tab id="overview">Overview</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="overview">Content</TabPanel>
				</TabPanels>
			</Tabs>,
		);
		expect(getTabList()).toHaveClass("tab-list");
		expect(getTabList()).toHaveClass("custom-list");
	});

	it("merges custom className on Tab", () => {
		const { container } = render(
			<Tabs>
				<TabList>
					<Tab id="overview" className="custom-tab">
						Overview
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="overview">Content</TabPanel>
				</TabPanels>
			</Tabs>,
		);
		const tab = container.querySelector(".tab-item");
		expect(tab).toHaveClass("tab-item");
		expect(tab).toHaveClass("custom-tab");
	});

	it("merges custom className on TabPanels", () => {
		const { container } = render(
			<Tabs>
				<TabList>
					<Tab id="overview">Overview</Tab>
				</TabList>
				<TabPanels className="custom-panels">
					<TabPanel id="overview">Content</TabPanel>
				</TabPanels>
			</Tabs>,
		);
		expect(container.querySelector(".tab-panels")).toHaveClass("custom-panels");
	});

	it("merges custom className on TabPanel", () => {
		const { container } = render(
			<Tabs>
				<TabList>
					<Tab id="overview">Overview</Tab>
				</TabList>
				<TabPanels>
					<TabPanel id="overview" className="custom-panel">
						Content
					</TabPanel>
				</TabPanels>
			</Tabs>,
		);
		expect(container.querySelector(".tab-panel")).toHaveClass("custom-panel");
	});
});
