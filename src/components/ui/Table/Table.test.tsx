import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
	Cell,
	Column,
	Row,
	Table,
	TableBody,
	TableHeader,
} from "#/components/ui/Table";

interface Person {
	id: string;
	name: string;
	email: string;
	role: string;
}

function BasicTable(
	props: Omit<React.ComponentProps<typeof Table>, "children"> = {},
) {
	return (
		<Table {...props}>
			<TableHeader>
				<Column isRowHeader>Name</Column>
				<Column>Email</Column>
				<Column>Role</Column>
			</TableHeader>
			<TableBody>
				<Row id="1">
					<Cell>John Doe</Cell>
					<Cell>john@example.com</Cell>
					<Cell>Admin</Cell>
				</Row>
				<Row id="2">
					<Cell>Jane Smith</Cell>
					<Cell>jane@example.com</Cell>
					<Cell>User</Cell>
				</Row>
			</TableBody>
		</Table>
	);
}

describe("Table — rendering", () => {
	it("renders a table with rows", () => {
		render(<BasicTable aria-label="Users" />);
		expect(screen.getByRole("grid")).toBeInTheDocument();
		expect(
			screen.getByRole("columnheader", { name: "Name" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("columnheader", { name: "Email" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("columnheader", { name: "Role" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("rowheader", { name: "John Doe" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("gridcell", { name: "john@example.com" }),
		).toBeInTheDocument();
	});

	it("renders all rows in the table body", () => {
		render(<BasicTable aria-label="Users" />);
		const rows = screen.getAllByRole("row");
		expect(rows).toHaveLength(3);
	});

	it("renders a table element with the base class", () => {
		const { container } = render(<BasicTable aria-label="Users" />);
		const table = container.querySelector("table");
		expect(table).toHaveClass("table");
	});
});

describe("Table — dynamic items", () => {
	it("renders rows with IDs from items prop", () => {
		const users: Person[] = [
			{ id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
			{ id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
		];
		const columns = [
			{ id: "name", name: "Name" },
			{ id: "email", name: "Email" },
			{ id: "role", name: "Role" },
		];

		render(
			<Table aria-label="Users">
				<TableHeader columns={columns}>
					{(col) => <Column isRowHeader={col.id === "name"}>{col.name}</Column>}
				</TableHeader>
				<TableBody items={users}>
					{(item) => (
						<Row id={item.id}>
							<Cell>{item.name}</Cell>
							<Cell>{item.email}</Cell>
							<Cell>{item.role}</Cell>
						</Row>
					)}
				</TableBody>
			</Table>,
		);

		expect(
			screen.getByRole("rowheader", { name: "John Doe" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("rowheader", { name: "Jane Smith" }),
		).toBeInTheDocument();
	});
});

describe("Table — column headers", () => {
	it("marks row header columns with isRowHeader", () => {
		render(<BasicTable aria-label="Users" />);
		const nameHeader = screen.getByRole("columnheader", { name: "Name" });
		expect(nameHeader).toBeInTheDocument();
	});

	it("renders column headers with proper accessibility roles", () => {
		render(<BasicTable aria-label="Users" />);
		const headers = screen.getAllByRole("columnheader");
		expect(headers).toHaveLength(3);
	});
});

describe("Table — sorting", () => {
	it("does not show sort indicator on non-sortable columns", () => {
		const { container } = render(<BasicTable aria-label="Users" />);
		const sortIndicator = container.querySelector(".col-sort-indicator");
		expect(sortIndicator).toBeNull();
	});

	it("does not show sort indicator on sortable columns that are not sorted", () => {
		const { container } = render(
			<Table aria-label="Users">
				<TableHeader>
					<Column isRowHeader allowsSorting id="name">
						Name
					</Column>
					<Column allowsSorting id="email">
						Email
					</Column>
				</TableHeader>
				<TableBody>
					<Row id="1">
						<Cell>John Doe</Cell>
						<Cell>john@example.com</Cell>
					</Row>
				</TableBody>
			</Table>,
		);
		const sortIndicator = container.querySelector(".col-sort-indicator");
		expect(sortIndicator).toBeNull();
	});

	it("calls onSortChange when column header is clicked", async () => {
		const user = userEvent.setup();
		const onSortChange = vi.fn();
		render(
			<Table aria-label="Users" onSortChange={onSortChange}>
				<TableHeader>
					<Column isRowHeader allowsSorting id="name">
						Name
					</Column>
					<Column allowsSorting id="email">
						Email
					</Column>
				</TableHeader>
				<TableBody>
					<Row id="1">
						<Cell>John Doe</Cell>
						<Cell>john@example.com</Cell>
					</Row>
				</TableBody>
			</Table>,
		);

		const nameHeader = screen.getByRole("columnheader", { name: "Name" });
		await user.click(nameHeader);

		expect(onSortChange).toHaveBeenCalled();
	});

	it("shows ascending sort indicator when sorted ascending", () => {
		const { container } = render(
			<Table
				aria-label="Users"
				sortDescriptor={{ column: "name", direction: "ascending" }}
			>
				<TableHeader>
					<Column isRowHeader allowsSorting id="name">
						Name
					</Column>
				</TableHeader>
				<TableBody>
					<Row id="1">
						<Cell>John Doe</Cell>
					</Row>
				</TableBody>
			</Table>,
		);

		const sortIndicator = container.querySelector(".col-sort-indicator");
		expect(sortIndicator).toBeInTheDocument();
		const chevronUp = sortIndicator?.querySelector("svg");
		expect(chevronUp).toBeInTheDocument();
	});

	it("shows descending sort indicator when sorted descending", () => {
		const { container } = render(
			<Table
				aria-label="Users"
				sortDescriptor={{ column: "name", direction: "descending" }}
			>
				<TableHeader>
					<Column isRowHeader allowsSorting id="name">
						Name
					</Column>
				</TableHeader>
				<TableBody>
					<Row id="1">
						<Cell>John Doe</Cell>
					</Row>
				</TableBody>
			</Table>,
		);

		const sortIndicator = container.querySelector(".col-sort-indicator");
		expect(sortIndicator).toBeInTheDocument();
		const chevronDown = sortIndicator?.querySelector("svg");
		expect(chevronDown).toBeInTheDocument();
	});
});

describe("Table — selection", () => {
	it("renders checkboxes for multi-select mode", () => {
		render(<BasicTable selectionMode="multiple" aria-label="Users" />);
		const checkboxes = screen.getAllByRole("checkbox");
		expect(checkboxes.length).toBeGreaterThan(0);
	});

	it("selects a row on click in selection mode", async () => {
		const user = userEvent.setup();
		const onSelectionChange = vi.fn();
		render(
			<BasicTable
				selectionMode="single"
				onSelectionChange={onSelectionChange}
				aria-label="Users"
			/>,
		);

		const row = screen.getByRole("row", { name: /john doe/i });
		await user.click(row);

		expect(onSelectionChange).toHaveBeenCalled();
	});

	it("toggles row selection in multi-select mode", async () => {
		const user = userEvent.setup();
		function SelectableTable() {
			const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
			return (
				<BasicTable
					selectionMode="multiple"
					selectedKeys={selectedKeys}
					onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
					aria-label="Users"
				/>
			);
		}

		render(<SelectableTable />);
		const checkbox = screen.getAllByRole("checkbox")[1];

		await user.click(checkbox);
		expect(checkbox).toBeChecked();
	});
});

describe("Table — disabled state", () => {
	it("disables rows when isDisabled is true on a row", () => {
		render(
			<Table aria-label="Users">
				<TableHeader>
					<Column isRowHeader>Name</Column>
				</TableHeader>
				<TableBody>
					<Row id="1">
						<Cell>Active User</Cell>
					</Row>
					<Row id="2" isDisabled>
						<Cell>Disabled User</Cell>
					</Row>
				</TableBody>
			</Table>,
		);

		const rows = screen.getAllByRole("row");
		const disabledRow = rows[2];
		expect(disabledRow).toHaveAttribute("data-disabled", "true");
	});
});

describe("Table — column sizing", () => {
	it("applies width to columns", () => {
		render(
			<Table aria-label="Users">
				<TableHeader>
					<Column isRowHeader width={100}>
						Name
					</Column>
					<Column width={200}>Email</Column>
				</TableHeader>
				<TableBody>
					<Row id="1">
						<Cell>John Doe</Cell>
						<Cell>john@example.com</Cell>
					</Row>
				</TableBody>
			</Table>,
		);

		const nameHeader = screen.getByRole("columnheader", { name: "Name" });
		const emailHeader = screen.getByRole("columnheader", { name: "Email" });

		expect(nameHeader).toBeInTheDocument();
		expect(emailHeader).toBeInTheDocument();
	});
});

describe("Table — accessibility", () => {
	it("has proper grid role semantics", () => {
		render(<BasicTable aria-label="Users" />);
		const grid = screen.getByRole("grid");
		expect(grid).toBeInTheDocument();
	});

	it("marks row headers with isRowHeader for screen readers", () => {
		render(<BasicTable aria-label="Users" />);
		const rowheader = screen.getByRole("rowheader", { name: "John Doe" });
		expect(rowheader).toBeInTheDocument();
	});

	it("focuses on rows with keyboard navigation", async () => {
		const user = userEvent.setup();
		render(<BasicTable selectionMode="single" aria-label="Users" />);

		const firstRow = screen.getAllByRole("row")[1];
		firstRow.focus();

		expect(firstRow).toHaveFocus();

		await user.keyboard("{ArrowDown}");
		await new Promise((resolve) => setTimeout(resolve, 100));
		const secondRow = screen.getAllByRole("row")[2];
		expect(secondRow).toHaveFocus();
	});
});
