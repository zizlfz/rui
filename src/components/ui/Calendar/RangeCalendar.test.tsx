import { parseDate } from "@internationalized/date";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RangeCalendar } from "#/components/ui/Calendar";

describe("RangeCalendar — rendering", () => {
	it("renders with aria-label", () => {
		render(<RangeCalendar aria-label="Trip dates" />);
		expect(
			screen.getByRole("application", { name: /trip dates/i }),
		).toBeInTheDocument();
	});

	it("renders navigation buttons", () => {
		const { container } = render(<RangeCalendar aria-label="Dates" />);
		const buttons = container.querySelectorAll(".calendar-nav-button");
		expect(buttons).toHaveLength(2);
	});

	it("renders month heading", () => {
		render(
			<RangeCalendar
				aria-label="Dates"
				defaultValue={{
					start: parseDate("2024-01-15"),
					end: parseDate("2024-01-20"),
				}}
			/>,
		);
		expect(screen.getByRole("heading")).toBeInTheDocument();
	});

	it("renders calendar grid", () => {
		const { container } = render(<RangeCalendar aria-label="Dates" />);
		expect(container.querySelector(".calendar-grid")).toBeInTheDocument();
	});

	it("renders day cells", () => {
		render(
			<RangeCalendar
				aria-label="Dates"
				defaultValue={{
					start: parseDate("2024-01-15"),
					end: parseDate("2024-01-20"),
				}}
			/>,
		);
		const cells = screen.getAllByRole("gridcell");
		expect(cells.length).toBeGreaterThan(0);
	});

	it("merges custom className", () => {
		const { container } = render(
			<RangeCalendar aria-label="Dates" className="custom" />,
		);
		expect(container.querySelector(".range-calendar")).toHaveClass("custom");
	});

	it("retains base class with custom className", () => {
		const { container } = render(
			<RangeCalendar aria-label="Dates" className="extra" />,
		);
		expect(container.querySelector(".range-calendar")).toHaveClass(
			"range-calendar",
		);
		expect(container.querySelector(".range-calendar")).toHaveClass("extra");
	});
});

describe("RangeCalendar — navigation", () => {
	it("navigates to previous month", async () => {
		const user = userEvent.setup();
		const { container } = render(
			<RangeCalendar
				aria-label="Dates"
				defaultValue={{
					start: parseDate("2024-02-15"),
					end: parseDate("2024-02-20"),
				}}
			/>,
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
			<RangeCalendar
				aria-label="Dates"
				defaultValue={{
					start: parseDate("2024-02-15"),
					end: parseDate("2024-02-20"),
				}}
			/>,
		);

		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent("February 2024");

		const nextButton = container.querySelector('[slot="next"]');
		await user.click(nextButton!);

		expect(heading).toHaveTextContent("March 2024");
	});
});

describe("RangeCalendar — disabled", () => {
	it("is not disabled by default", () => {
		const { container } = render(<RangeCalendar aria-label="Dates" />);
		expect(container.querySelector(".range-calendar")).not.toHaveAttribute(
			"data-disabled",
		);
	});

	it("is disabled when isDisabled is true", () => {
		const { container } = render(
			<RangeCalendar aria-label="Dates" isDisabled />,
		);
		expect(container.querySelector(".range-calendar")).toHaveAttribute(
			"data-disabled",
			"true",
		);
	});
});
