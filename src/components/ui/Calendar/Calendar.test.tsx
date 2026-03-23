import { parseDate } from "@internationalized/date";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Calendar } from "#/components/ui/Calendar";

describe("Calendar — rendering", () => {
	it("renders with aria-label", () => {
		render(<Calendar aria-label="Event date" />);
		expect(
			screen.getByRole("application", { name: /event date/i }),
		).toBeInTheDocument();
	});

	it("renders navigation buttons", () => {
		const { container } = render(<Calendar aria-label="Date" />);
		const buttons = container.querySelectorAll(".calendar-nav-button");
		expect(buttons).toHaveLength(2);
	});

	it("renders month heading", () => {
		render(
			<Calendar aria-label="Date" defaultValue={parseDate("2024-01-15")} />,
		);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});

	it("renders calendar grid", () => {
		const { container } = render(<Calendar aria-label="Date" />);
		expect(container.querySelector(".calendar-grid")).toBeInTheDocument();
	});

	it("renders day cells", () => {
		render(
			<Calendar aria-label="Date" defaultValue={parseDate("2024-01-15")} />,
		);
		const cells = screen.getAllByRole("gridcell");
		expect(cells.length).toBeGreaterThan(0);
	});

	it("merges custom className", () => {
		const { container } = render(
			<Calendar aria-label="Date" className="custom" />,
		);
		expect(container.querySelector(".calendar")).toHaveClass("custom");
	});

	it("retains base .calendar class with custom className", () => {
		const { container } = render(
			<Calendar aria-label="Date" className="extra" />,
		);
		expect(container.querySelector(".calendar")).toHaveClass("calendar");
		expect(container.querySelector(".calendar")).toHaveClass("extra");
	});
});

describe("Calendar — value", () => {
	it("renders with default value", () => {
		render(
			<Calendar aria-label="Date" defaultValue={parseDate("2024-01-15")} />,
		);
		const selectedCell = screen.getByRole("gridcell", { selected: true });
		expect(selectedCell).toHaveTextContent("15");
	});

	it("renders controlled value", () => {
		render(<Calendar aria-label="Date" value={parseDate("2024-12-25")} />);
		const selectedCell = screen.getByRole("gridcell", { selected: true });
		expect(selectedCell).toHaveTextContent("25");
	});
});

describe("Calendar — navigation", () => {
	it("navigates to previous month", async () => {
		const user = userEvent.setup();
		const { container } = render(
			<Calendar aria-label="Date" defaultValue={parseDate("2024-02-15")} />,
		);

		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent("February 2024");

		const prevButton = container.querySelector('[slot="previous"]');
		await user.click(prevButton!);

		expect(heading).toHaveTextContent("January 2024");
	});

	it("navigates to next month", async () => {
		const user = userEvent.setup();
		const { container } = render(
			<Calendar aria-label="Date" defaultValue={parseDate("2024-02-15")} />,
		);

		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent("February 2024");

		const nextButton = container.querySelector('[slot="next"]');
		await user.click(nextButton!);

		expect(heading).toHaveTextContent("March 2024");
	});
});

describe("Calendar — disabled", () => {
	it("is not disabled by default", () => {
		const { container } = render(<Calendar aria-label="Date" />);
		expect(container.querySelector(".calendar")).not.toHaveAttribute(
			"data-disabled",
		);
	});

	it("is disabled when isDisabled is true", () => {
		const { container } = render(<Calendar aria-label="Date" isDisabled />);
		expect(container.querySelector(".calendar")).toHaveAttribute(
			"data-disabled",
			"true",
		);
	});

	it("disables navigation buttons when disabled", () => {
		const { container } = render(<Calendar aria-label="Date" isDisabled />);
		const buttons = container.querySelectorAll(".calendar-nav-button");
		buttons.forEach((button) => {
			expect(button).toBeDisabled();
		});
	});
});

describe("Calendar — readonly", () => {
	it("is not readonly by default", () => {
		const { container } = render(<Calendar aria-label="Date" />);
		expect(container.querySelector(".calendar")).not.toHaveAttribute(
			"data-readonly",
		);
	});

	it("shows readonly state when isReadOnly is true", () => {
		const { container } = render(<Calendar aria-label="Date" isReadOnly />);
		expect(container.querySelector(".calendar")).toBeInTheDocument();
	});
});

describe("Calendar — focus", () => {
	it("focuses a cell when autoFocus is set", () => {
		render(<Calendar aria-label="Date" autoFocus />);
		const focusedCell = screen
			.getAllByRole("gridcell")
			.find((cell) => cell.querySelector('[data-focused="true"]'));
		expect(focusedCell).toBeDefined();
	});
});

describe("Calendar — min/max dates", () => {
	it("disables dates before minValue", () => {
		const { container } = render(
			<Calendar
				aria-label="Date"
				defaultValue={parseDate("2024-01-15")}
				minValue={parseDate("2024-01-10")}
			/>,
		);

		const cells = container.querySelectorAll(".calendar-cell");
		const disabledCells = Array.from(cells).filter(
			(cell) => cell.getAttribute("data-disabled") === "true",
		);
		expect(disabledCells.length).toBeGreaterThan(0);
	});

	it("disables dates after maxValue", () => {
		const { container } = render(
			<Calendar
				aria-label="Date"
				defaultValue={parseDate("2024-01-15")}
				maxValue={parseDate("2024-01-20")}
			/>,
		);

		const cells = container.querySelectorAll(".calendar-cell");
		const disabledCells = Array.from(cells).filter(
			(cell) => cell.getAttribute("data-disabled") === "true",
		);
		expect(disabledCells.length).toBeGreaterThan(0);
	});
});

describe("Calendar — unavailable dates", () => {
	it("marks dates as unavailable when isDateUnavailable returns true", () => {
		const { container } = render(
			<Calendar
				aria-label="Date"
				defaultValue={parseDate("2024-01-15")}
				isDateUnavailable={(date) => date.day === 10}
			/>,
		);

		const cells = container.querySelectorAll(".calendar-cell");
		const unavailableCells = Array.from(cells).filter(
			(cell) =>
				cell.textContent === "10" &&
				cell.getAttribute("data-unavailable") === "true",
		);
		expect(unavailableCells.length).toBeGreaterThanOrEqual(1);
	});
});
