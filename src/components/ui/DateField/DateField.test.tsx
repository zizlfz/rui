import { parseDate } from "@internationalized/date";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateField, DateInput, DateSegment } from "#/components/ui/DateField";

function DateFieldFixture(
	props: Omit<React.ComponentProps<typeof DateField>, "children"> = {},
) {
	return (
		<DateField {...props}>
			<DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
		</DateField>
	);
}

describe("DateField — rendering", () => {
	it("renders with label", () => {
		render(<DateFieldFixture label="Birth date" />);
		expect(
			screen.getByRole("group", { name: /birth date/i }),
		).toBeInTheDocument();
	});

	it("renders without label", () => {
		const { container } = render(<DateFieldFixture />);
		expect(container.querySelector(".datefield")).toBeInTheDocument();
	});

	it("merges custom className on the field wrapper", () => {
		const { container } = render(
			<DateFieldFixture className="custom" label="Date" />,
		);
		expect(container.querySelector(".form-field")).toHaveClass("custom");
	});

	it("retains base .form-field class with custom className", () => {
		const { container } = render(
			<DateFieldFixture className="extra" label="Date" />,
		);
		const field = container.querySelector(".form-field");
		expect(field).toHaveClass("form-field");
		expect(field).toHaveClass("extra");
	});

	it("renders date segments", () => {
		render(<DateFieldFixture label="Date" />);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments.length).toBeGreaterThan(0);
	});
});

describe("DateField — value", () => {
	it("renders with default value", () => {
		render(
			<DateFieldFixture label="Date" defaultValue={parseDate("2024-01-15")} />,
		);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveTextContent("1");
	});

	it("renders controlled value", () => {
		render(<DateFieldFixture label="Date" value={parseDate("2024-12-25")} />);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveTextContent("12");
	});
});

describe("DateField — disabled", () => {
	it("is not disabled by default", () => {
		render(<DateFieldFixture label="Date" />);
		const group = screen.getByRole("group", { name: /date/i });
		expect(group).not.toHaveAttribute("aria-disabled", "true");
	});

	it("is disabled when isDisabled is true", () => {
		render(<DateFieldFixture label="Date" isDisabled />);
		const group = screen.getByRole("group", { name: /date/i });
		expect(group).toHaveAttribute("aria-disabled", "true");
	});

	it("prevents input when disabled", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<DateFieldFixture label="Date" isDisabled onChange={onChange} />);

		const segments = screen.getAllByRole("spinbutton");
		await user.type(segments[0], "1");

		expect(onChange).not.toHaveBeenCalled();
	});
});

describe("DateField — focus", () => {
	it("receives focus on render when autoFocus is set", () => {
		render(<DateFieldFixture label="Date" autoFocus />);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveFocus();
	});

	it("is reachable via Tab by default", async () => {
		const user = userEvent.setup();
		render(<DateFieldFixture label="Date" />);
		await user.tab();
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveFocus();
	});
});

describe("DateField — readonly", () => {
	it("is not readonly by default", () => {
		const { container } = render(<DateFieldFixture label="Date" />);
		const input = container.querySelector(".dateinput");
		expect(input).not.toHaveAttribute("data-readonly");
	});

	it("is readonly when isReadOnly is true", () => {
		const { container } = render(<DateFieldFixture label="Date" isReadOnly />);
		const input = container.querySelector(".dateinput");
		expect(input).toHaveAttribute("data-readonly", "true");
	});
});

describe("DateInput — className", () => {
	it("merges custom className", () => {
		const { container } = render(
			<DateField label="Date">
				<DateInput className="custom">
					{(segment) => <DateSegment segment={segment} />}
				</DateInput>
			</DateField>,
		);
		expect(container.querySelector(".dateinput")).toHaveClass("custom");
	});
});
