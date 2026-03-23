import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import {
	Dropdown,
	DropdownItem,
	DropdownSection,
	DropdownTitle,
	DropdownTrigger,
	SubdropdownTrigger,
} from "#/components/ui/Dropdown";
import { Button } from "../Button";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function EditMenu(
	props: Omit<React.ComponentProps<typeof Dropdown>, "children"> = {},
) {
	return (
		<DropdownTrigger>
			<Button>Open Menu</Button>
			<Dropdown {...props}>
				<DropdownItem id="cut">Cut</DropdownItem>
				<DropdownItem id="copy">Copy</DropdownItem>
				<DropdownItem id="paste">Paste</DropdownItem>
			</Dropdown>
		</DropdownTrigger>
	);
}

/** Opens the dropdown and returns the menu element. */
async function openMenu(user: ReturnType<typeof userEvent.setup>) {
	await user.click(screen.getByRole("button"));
	return screen.getByRole("menu");
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
describe("Dropdown — rendering", () => {
	it("renders the trigger button", () => {
		render(<EditMenu />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("does not show the menu initially", () => {
		render(<EditMenu />);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("applies the base dropdown-menu class", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		const menu = await openMenu(user);
		expect(menu).toHaveClass("dropdown-menu");
	});

	it("merges a custom className onto the menu", async () => {
		const user = userEvent.setup();
		render(<EditMenu className="custom-menu" />);
		const menu = await openMenu(user);
		expect(menu).toHaveClass("dropdown-menu");
		expect(menu).toHaveClass("custom-menu");
	});
});

// ---------------------------------------------------------------------------
// Opening & closing
// ---------------------------------------------------------------------------
describe("Dropdown — open / close", () => {
	it("opens the menu when the trigger is clicked", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		await user.click(screen.getByRole("button"));
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	it("renders all items inside the menu after opening", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		const menu = await openMenu(user);
		expect(
			within(menu).getByRole("menuitem", { name: "Cut" }),
		).toBeInTheDocument();
		expect(
			within(menu).getByRole("menuitem", { name: "Copy" }),
		).toBeInTheDocument();
		expect(
			within(menu).getByRole("menuitem", { name: "Paste" }),
		).toBeInTheDocument();
	});

	it("closes the menu after clicking an item", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		const menu = await openMenu(user);
		await user.click(within(menu).getByRole("menuitem", { name: "Cut" }));
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("closes the menu when Escape is pressed", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		await openMenu(user);
		await user.keyboard("{Escape}");
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Actions (onAction)
// ---------------------------------------------------------------------------
describe("Dropdown — onAction", () => {
	it("calls onAction with the item key when an item is clicked", async () => {
		const user = userEvent.setup();
		const onAction = vi.fn();
		render(<EditMenu onAction={onAction} />);
		const menu = await openMenu(user);
		await user.click(within(menu).getByRole("menuitem", { name: "Copy" }));
		expect(onAction).toHaveBeenCalledTimes(1);
		expect(onAction).toHaveBeenCalledWith("copy");
	});

	it("does not call onAction when a disabled item is clicked", async () => {
		const user = userEvent.setup();
		const onAction = vi.fn();
		render(
			<DropdownTrigger>
				<Button>Open</Button>
				<Dropdown onAction={onAction}>
					<DropdownItem id="save">Save</DropdownItem>
					<DropdownItem id="delete" isDisabled>
						Delete
					</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		await user.click(within(menu).getByRole("menuitem", { name: "Delete" }));
		expect(onAction).not.toHaveBeenCalled();
	});
});

// ---------------------------------------------------------------------------
// Disabled items
// ---------------------------------------------------------------------------
describe("Dropdown — disabled items", () => {
	it("marks an item as disabled via isDisabled prop", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Open</Button>
				<Dropdown>
					<DropdownItem id="save">Save</DropdownItem>
					<DropdownItem id="delete" isDisabled>
						Delete
					</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(
			within(menu).getByRole("menuitem", { name: "Delete" }),
		).toHaveAttribute("aria-disabled", "true");
	});

	it("marks items disabled via disabledKeys on the Dropdown", async () => {
		const user = userEvent.setup();
		render(<EditMenu disabledKeys={["cut", "paste"]} />);
		const menu = await openMenu(user);
		expect(within(menu).getByRole("menuitem", { name: "Cut" })).toHaveAttribute(
			"aria-disabled",
			"true",
		);
		expect(
			within(menu).getByRole("menuitem", { name: "Paste" }),
		).toHaveAttribute("aria-disabled", "true");
		expect(
			within(menu).getByRole("menuitem", { name: "Copy" }),
		).not.toHaveAttribute("aria-disabled");
	});
});

// ---------------------------------------------------------------------------
// Single selection
// ---------------------------------------------------------------------------
describe("Dropdown — single selection", () => {
	it("renders menuitemradio items in single selection mode", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Select Color</Button>
				<Dropdown selectionMode="single">
					<DropdownItem id="red">Red</DropdownItem>
					<DropdownItem id="green">Green</DropdownItem>
					<DropdownItem id="blue">Blue</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(within(menu).getAllByRole("menuitemradio").length).toBe(3);
	});

	it("calls onSelectionChange with the selected key", async () => {
		const user = userEvent.setup();
		const onSelectionChange = vi.fn();
		render(
			<DropdownTrigger>
				<Button>Select Color</Button>
				<Dropdown selectionMode="single" onSelectionChange={onSelectionChange}>
					<DropdownItem id="red">Red</DropdownItem>
					<DropdownItem id="green">Green</DropdownItem>
					<DropdownItem id="blue">Blue</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		await user.click(
			within(menu).getByRole("menuitemradio", { name: "Green" }),
		);
		expect(onSelectionChange).toHaveBeenCalledTimes(1);
	});

	it("marks an item as checked after selection with controlled state", async () => {
		const user = userEvent.setup();

		function ControlledDropdown() {
			const [selection, setSelection] = React.useState<Set<string>>(new Set());
			return (
				<DropdownTrigger>
					<Button>Select Color</Button>
					<Dropdown
						selectionMode="single"
						selectedKeys={selection}
						onSelectionChange={(keys) => setSelection(keys as Set<string>)}
					>
						<DropdownItem id="red">Red</DropdownItem>
						<DropdownItem id="green">Green</DropdownItem>
						<DropdownItem id="blue">Blue</DropdownItem>
					</Dropdown>
				</DropdownTrigger>
			);
		}

		render(<ControlledDropdown />);
		const menu = await openMenu(user);
		await user.click(within(menu).getByRole("menuitemradio", { name: "Red" }));
		await user.keyboard("{Escape}");
		const reopenedMenu = await openMenu(user);
		expect(
			within(reopenedMenu).getByRole("menuitemradio", { name: "Red" }),
		).toHaveAttribute("aria-checked", "true");
	});

	it("reflects defaultSelectedKeys on first open", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Select Color</Button>
				<Dropdown selectionMode="single" defaultSelectedKeys={["blue"]}>
					<DropdownItem id="red">Red</DropdownItem>
					<DropdownItem id="green">Green</DropdownItem>
					<DropdownItem id="blue">Blue</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(
			within(menu).getByRole("menuitemradio", { name: "Blue" }),
		).toHaveAttribute("aria-checked", "true");
	});
});

// ---------------------------------------------------------------------------
// Multiple selection
// ---------------------------------------------------------------------------
describe("Dropdown — multiple selection", () => {
	it("renders menuitemcheckbox items in multiple selection mode", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Select Options</Button>
				<Dropdown selectionMode="multiple">
					<DropdownItem id="bold">Bold</DropdownItem>
					<DropdownItem id="italic">Italic</DropdownItem>
					<DropdownItem id="underline">Underline</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(within(menu).getAllByRole("menuitemcheckbox").length).toBe(3);
	});

	it("allows selecting multiple items independently", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Select Options</Button>
				<Dropdown selectionMode="multiple">
					<DropdownItem id="bold">Bold</DropdownItem>
					<DropdownItem id="italic">Italic</DropdownItem>
					<DropdownItem id="underline">Underline</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		await user.click(
			within(menu).getByRole("menuitemcheckbox", { name: "Bold" }),
		);
		await user.click(
			within(menu).getByRole("menuitemcheckbox", { name: "Italic" }),
		);

		expect(
			within(menu).getByRole("menuitemcheckbox", { name: "Bold" }),
		).toHaveAttribute("aria-checked", "true");
		expect(
			within(menu).getByRole("menuitemcheckbox", { name: "Italic" }),
		).toHaveAttribute("aria-checked", "true");
		expect(
			within(menu).getByRole("menuitemcheckbox", { name: "Underline" }),
		).toHaveAttribute("aria-checked", "false");
	});

	it("calls onSelectionChange when items are toggled", async () => {
		const user = userEvent.setup();
		const onSelectionChange = vi.fn();
		render(
			<DropdownTrigger>
				<Button>Select Options</Button>
				<Dropdown
					selectionMode="multiple"
					onSelectionChange={onSelectionChange}
				>
					<DropdownItem id="bold">Bold</DropdownItem>
					<DropdownItem id="italic">Italic</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		await user.click(
			within(menu).getByRole("menuitemcheckbox", { name: "Bold" }),
		);
		expect(onSelectionChange).toHaveBeenCalledTimes(1);
	});
});

// ---------------------------------------------------------------------------
// Controlled selection
// ---------------------------------------------------------------------------
describe("Dropdown — controlled selection", () => {
	it("reflects selectedKeys from props", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Select Color</Button>
				<Dropdown selectionMode="single" selectedKeys={["green"]}>
					<DropdownItem id="red">Red</DropdownItem>
					<DropdownItem id="green">Green</DropdownItem>
					<DropdownItem id="blue">Blue</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(
			within(menu).getByRole("menuitemradio", { name: "Green" }),
		).toHaveAttribute("aria-checked", "true");
		expect(
			within(menu).getByRole("menuitemradio", { name: "Red" }),
		).toHaveAttribute("aria-checked", "false");
	});
});

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------
describe("Dropdown — sections", () => {
	it("renders section headers via DropdownTitle", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>View Options</Button>
				<Dropdown>
					<DropdownSection>
						<DropdownTitle>Appearance</DropdownTitle>
						<DropdownItem id="zoom-in">Zoom In</DropdownItem>
						<DropdownItem id="zoom-out">Zoom Out</DropdownItem>
					</DropdownSection>
					<DropdownSection>
						<DropdownTitle>Mode</DropdownTitle>
						<DropdownItem id="light">Light Mode</DropdownItem>
						<DropdownItem id="dark">Dark Mode</DropdownItem>
					</DropdownSection>
				</Dropdown>
			</DropdownTrigger>,
		);
		await openMenu(user);
		expect(screen.getByText("Appearance")).toBeInTheDocument();
		expect(screen.getByText("Mode")).toBeInTheDocument();
	});

	it("renders all items across multiple sections", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>View Options</Button>
				<Dropdown>
					<DropdownSection>
						<DropdownTitle>Appearance</DropdownTitle>
						<DropdownItem id="zoom-in">Zoom In</DropdownItem>
						<DropdownItem id="zoom-out">Zoom Out</DropdownItem>
					</DropdownSection>
					<DropdownSection>
						<DropdownTitle>Mode</DropdownTitle>
						<DropdownItem id="light">Light Mode</DropdownItem>
						<DropdownItem id="dark">Dark Mode</DropdownItem>
					</DropdownSection>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(
			within(menu).getByRole("menuitem", { name: "Zoom In" }),
		).toBeInTheDocument();
		expect(
			within(menu).getByRole("menuitem", { name: "Zoom Out" }),
		).toBeInTheDocument();
		expect(
			within(menu).getByRole("menuitem", { name: "Light Mode" }),
		).toBeInTheDocument();
		expect(
			within(menu).getByRole("menuitem", { name: "Dark Mode" }),
		).toBeInTheDocument();
	});

	it("applies the dropdown-section class to each section", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Options</Button>
				<Dropdown>
					<DropdownSection className="my-section">
						<DropdownTitle>Group</DropdownTitle>
						<DropdownItem id="item-a">Item A</DropdownItem>
					</DropdownSection>
				</Dropdown>
			</DropdownTrigger>,
		);
		await openMenu(user);
		const section = document.querySelector(".dropdown-section");
		expect(section).toBeInTheDocument();
		expect(section).toHaveClass("my-section");
	});

	it("applies the dropdown-header class to DropdownTitle", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Options</Button>
				<Dropdown>
					<DropdownSection>
						<DropdownTitle>My Header</DropdownTitle>
						<DropdownItem id="item">Item</DropdownItem>
					</DropdownSection>
				</Dropdown>
			</DropdownTrigger>,
		);
		await openMenu(user);
		expect(document.querySelector(".dropdown-header")).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Link items
// ---------------------------------------------------------------------------
describe("Dropdown — link items", () => {
	it("renders a link item with the correct href", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Navigation</Button>
				<Dropdown>
					<DropdownItem href="/">Home</DropdownItem>
					<DropdownItem href="/about">About</DropdownItem>
					<DropdownItem href="/contact">Contact</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		await openMenu(user);
		const homeLink = screen.getByRole("menuitem", { name: "Home" });
		expect(homeLink.tagName.toLowerCase()).toBe("a");
		expect(homeLink).toHaveAttribute("href", "/");
	});

	it("renders all link items", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Navigation</Button>
				<Dropdown>
					<DropdownItem href="/">Home</DropdownItem>
					<DropdownItem href="/about">About</DropdownItem>
					<DropdownItem href="/contact">Contact</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(within(menu).getAllByRole("menuitem").length).toBe(3);
	});
});

// ---------------------------------------------------------------------------
// DropdownItem class
// ---------------------------------------------------------------------------
describe("Dropdown — DropdownItem className", () => {
	it("applies the base dropdown-item class to each item", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		await openMenu(user);
		const items = document.querySelectorAll(".dropdown-item");
		expect(items.length).toBe(3);
	});

	it("merges a custom className on DropdownItem", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Open</Button>
				<Dropdown>
					<DropdownItem id="cut" className="my-item">
						Cut
					</DropdownItem>
				</Dropdown>
			</DropdownTrigger>,
		);
		await openMenu(user);
		expect(
			document.querySelector(".dropdown-item.my-item"),
		).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Submenus
// ---------------------------------------------------------------------------
describe("Dropdown — submenus", () => {
	it("renders the submenu trigger item in the parent menu", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Edit</Button>
				<Dropdown>
					<DropdownItem id="undo">Undo</DropdownItem>
					<SubdropdownTrigger>
						<DropdownItem id="find">Find</DropdownItem>
						<Dropdown>
							<DropdownItem id="find-next">Find Next</DropdownItem>
							<DropdownItem id="find-prev">Find Previous</DropdownItem>
						</Dropdown>
					</SubdropdownTrigger>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		expect(
			within(menu).getByRole("menuitem", { name: /find/i }),
		).toBeInTheDocument();
	});

	it("shows the submenu after hovering over the submenu trigger", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Edit</Button>
				<Dropdown>
					<DropdownItem id="undo">Undo</DropdownItem>
					<SubdropdownTrigger>
						<DropdownItem id="find">Find</DropdownItem>
						<Dropdown>
							<DropdownItem id="find-next">Find Next</DropdownItem>
							<DropdownItem id="find-prev">Find Previous</DropdownItem>
						</Dropdown>
					</SubdropdownTrigger>
				</Dropdown>
			</DropdownTrigger>,
		);
		const menu = await openMenu(user);
		const findItem = within(menu).getByRole("menuitem", { name: /find/i });
		await user.pointer({ target: findItem });
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 300));
		});
		expect(
			screen.getByRole("menuitem", { name: "Find Next" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("menuitem", { name: "Find Previous" }),
		).toBeInTheDocument();
	});

	it.skip("shows the submenu after pressing ArrowRight on the submenu trigger", async () => {
		const user = userEvent.setup();
		render(
			<DropdownTrigger>
				<Button>Edit</Button>
				<Dropdown>
					<DropdownItem id="undo">Undo</DropdownItem>
					<SubdropdownTrigger>
						<DropdownItem id="find">Find</DropdownItem>
						<Dropdown>
							<DropdownItem id="find-next">Find Next</DropdownItem>
							<DropdownItem id="find-prev">Find Previous</DropdownItem>
						</Dropdown>
					</SubdropdownTrigger>
				</Dropdown>
			</DropdownTrigger>,
		);
		await openMenu(user);
		await user.keyboard("{ArrowDown}{ArrowDown}");
		await user.keyboard("{ArrowRight}");
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
		});
		expect(
			screen.getByRole("menuitem", { name: "Find Next" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("menuitem", { name: "Find Previous" }),
		).toBeInTheDocument();
	});
});

// ---------------------------------------------------------------------------
// Keyboard navigation
// ---------------------------------------------------------------------------
describe("Dropdown — keyboard navigation", () => {
	it("opens the menu with Enter when the trigger is focused", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		screen.getByRole("button").focus();
		await user.keyboard("{Enter}");
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	it("opens the menu with Space when the trigger is focused", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		screen.getByRole("button").focus();
		await user.keyboard(" ");
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	it("moves focus through items with ArrowDown", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		await openMenu(user);
		await user.keyboard("{ArrowDown}");
		expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
	});

	it("moves focus through items with ArrowUp", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		await openMenu(user);
		// Focus last item first, then go up
		await user.keyboard("{End}");
		await user.keyboard("{ArrowUp}");
		expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
	});

	it("focuses the first item with Home", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		await openMenu(user);
		await user.keyboard("{End}");
		await user.keyboard("{Home}");
		expect(screen.getByRole("menuitem", { name: "Cut" })).toHaveFocus();
	});

	it("focuses the last item with End", async () => {
		const user = userEvent.setup();
		render(<EditMenu />);
		await openMenu(user);
		await user.keyboard("{End}");
		expect(screen.getByRole("menuitem", { name: "Paste" })).toHaveFocus();
	});

	it("activates the focused item with Enter", async () => {
		const user = userEvent.setup();
		const onAction = vi.fn();
		render(<EditMenu onAction={onAction} />);
		await openMenu(user);
		await user.keyboard("{ArrowDown}{Enter}");
		expect(onAction).toHaveBeenCalledTimes(1);
	});
});
