import { CalendarDate } from "@internationalized/date";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "#/components/ui/DatePicker";

function DatePickerWithLabel(
	props: Omit<
		React.ComponentProps<typeof DatePicker<CalendarDate>>,
		"label"
	> = {},
) {
	return <DatePicker label="Date" {...props} />;
}

async function openPopover(user: ReturnType<typeof userEvent.setup>) {
	await user.click(screen.getByRole("button"));
	return screen.getByRole("dialog");
}

describe("DatePicker — rendering", () => {
	it("renders the label", () => {
		render(<DatePickerWithLabel />);
		expect(screen.getByText("Date")).toBeInTheDocument();
	});

	it("renders the date input group", () => {
		render(<DatePickerWithLabel />);
		expect(screen.getByRole("group")).toBeInTheDocument();
	});

	it("renders the trigger button", () => {
		render(<DatePickerWithLabel />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("renders the description when provided", () => {
		render(<DatePicker label="Date" description="Pick a date." />);
		expect(screen.getByText("Pick a date.")).toBeInTheDocument();
	});

	it("associates the description with the input via aria", () => {
		render(<DatePicker label="Date" description="Pick a date." />);
		const group = screen.getByRole("group");
		const desc = screen.getByText("Pick a date.");
		expect(group).toHaveAttribute(
			"aria-describedby",
			expect.stringContaining(desc.id),
		);
	});

	it("merges a custom className", () => {
		const { container } = render(
			<DatePickerWithLabel className="custom-picker" />,
		);
		expect(container.querySelector(".form-field")).toHaveClass("custom-picker");
	});

	it("retains the base class when a custom className is provided", () => {
		const { container } = render(<DatePickerWithLabel className="extra" />);
		expect(container.querySelector(".form-field")).toHaveClass("form-field");
		expect(container.querySelector(".form-field")).toHaveClass("extra");
	});
});

describe("DatePicker — open / close", () => {
	it("does not show the popover initially", () => {
		render(<DatePickerWithLabel />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("opens the popover when the trigger button is clicked", async () => {
		const user = userEvent.setup();
		render(<DatePickerWithLabel />);
		await user.click(screen.getByRole("button"));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("renders the calendar inside the popover", async () => {
		const user = userEvent.setup();
		render(<DatePickerWithLabel />);
		await openPopover(user);
		expect(screen.getByRole("application")).toBeInTheDocument();
	});

	it("closes the popover when Escape is pressed", async () => {
		const user = userEvent.setup();
		render(<DatePickerWithLabel />);
		await openPopover(user);
		await user.keyboard("{Escape}");
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});

describe("DatePicker — selection", () => {
	it("shows the selected date in the input after selection", async () => {
		const user = userEvent.setup();
		render(<DatePickerWithLabel />);
		await openPopover(user);
		const calendar = screen.getByRole("application");
		await user.click(within(calendar).getByText("15"));
		expect(screen.getByRole("group")).toHaveTextContent(/15/);
	});

	it("calls onChange with the selected date", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<DatePickerWithLabel onChange={onChange} />);
		await openPopover(user);
		const calendar = screen.getByRole("application");
		await user.click(within(calendar).getByText("10"));
		expect(onChange).toHaveBeenCalled();
		const selectedDate = onChange.mock.calls[0][0];
		expect(selectedDate.day).toBe(10);
	});
});

function ControlledDatePicker() {
	const [value, setValue] = useState<CalendarDate | null>(
		new CalendarDate(2024, 1, 15),
	);
	return (
		<DatePicker<CalendarDate>
			label="Date"
			value={value}
			onChange={(v) => setValue(v)}
		/>
	);
}

describe("DatePicker — controlled value", () => {
	it("displays the controlled value", () => {
		render(<ControlledDatePicker />);
		expect(screen.getByRole("group")).toHaveTextContent(/15/);
	});
});

describe("DatePicker — defaultValue (uncontrolled)", () => {
	it("shows the date matching defaultValue on first render", () => {
		render(
			<DatePicker<CalendarDate>
				label="Date"
				defaultValue={new CalendarDate(2024, 6, 20)}
			/>,
		);
		expect(screen.getByRole("group")).toHaveTextContent(/20/);
	});
});

describe("DatePicker — disabled", () => {
	it("disables the input when isDisabled is true", () => {
		render(<DatePickerWithLabel isDisabled />);
		const group = screen.getByRole("group");
		expect(group).toHaveAttribute("aria-disabled", "true");
		expect(group).toHaveAttribute("data-disabled", "true");
	});

	it("does not open the popover when disabled", async () => {
		const user = userEvent.setup();
		render(<DatePickerWithLabel isDisabled />);
		await user.click(screen.getByRole("button"));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});

describe("DatePicker — validation", () => {
	it("shows a static errorMessage when provided and the field is invalid", () => {
		render(<DatePickerWithLabel isInvalid errorMessage="Required field." />);
		expect(screen.getByText("Required field.")).toBeInTheDocument();
	});

	it("supports a function errorMessage", () => {
		render(
			<DatePickerWithLabel isInvalid errorMessage={() => "Custom error."} />,
		);
		expect(screen.getByText("Custom error.")).toBeInTheDocument();
	});
});

describe("DatePicker — focus", () => {
	it("focuses the first date segment when autoFocus is set", () => {
		render(<DatePickerWithLabel autoFocus />);
		const monthSegment = screen.getByRole("spinbutton", { name: /month/i });
		expect(monthSegment).toHaveFocus();
	});

	it("is reachable via Tab", async () => {
		const user = userEvent.setup();
		render(<DatePickerWithLabel />);
		await user.tab();
		const monthSegment = screen.getByRole("spinbutton", { name: /month/i });
		expect(monthSegment).toHaveFocus();
	});
});
