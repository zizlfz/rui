import { Time } from "@internationalized/date";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TimeField } from "#/components/ui/TimeField";

function TimeFieldFixture(
	props: Omit<React.ComponentProps<typeof TimeField>, "children"> = {},
) {
	return <TimeField {...props} />;
}

describe("TimeField — rendering", () => {
	it("renders with label", () => {
		render(<TimeFieldFixture label="Start time" />);
		expect(
			screen.getByRole("group", { name: /start time/i }),
		).toBeInTheDocument();
	});

	it("renders without label", () => {
		const { container } = render(<TimeFieldFixture />);
		expect(container.querySelector(".timefield")).toBeInTheDocument();
	});

	it("merges custom className on the field wrapper", () => {
		const { container } = render(
			<TimeFieldFixture className="custom" label="Time" />,
		);
		expect(container.querySelector(".timefield")).toHaveClass("custom");
	});

	it("retains base .timefield class with custom className", () => {
		const { container } = render(
			<TimeFieldFixture className="extra" label="Time" />,
		);
		const field = container.querySelector(".timefield");
		expect(field).toHaveClass("timefield");
		expect(field).toHaveClass("extra");
	});

	it("renders time segments", () => {
		render(<TimeFieldFixture label="Time" />);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments.length).toBeGreaterThan(0);
	});

	it("renders description when provided", () => {
		render(<TimeFieldFixture label="Time" description="Select a time" />);
		expect(screen.getByText("Select a time")).toBeInTheDocument();
	});
});

describe("TimeField — value", () => {
	it("renders with default value", () => {
		render(<TimeFieldFixture label="Time" defaultValue={new Time(9, 30)} />);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveTextContent("9");
	});

	it("renders controlled value", () => {
		render(<TimeFieldFixture label="Time" value={new Time(14, 45)} />);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveTextContent("2");
	});
});

describe("TimeField — disabled", () => {
	it("is not disabled by default", () => {
		render(<TimeFieldFixture label="Time" />);
		const group = screen.getByRole("group", { name: /time/i });
		expect(group).not.toHaveAttribute("aria-disabled", "true");
	});

	it("is disabled when isDisabled is true", () => {
		render(<TimeFieldFixture label="Time" isDisabled />);
		const group = screen.getByRole("group", { name: /time/i });
		expect(group).toHaveAttribute("aria-disabled", "true");
	});

	it("prevents input when disabled", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<TimeFieldFixture label="Time" isDisabled onChange={onChange} />);

		const segments = screen.getAllByRole("spinbutton");
		await user.type(segments[0], "1");

		expect(onChange).not.toHaveBeenCalled();
	});
});

describe("TimeField — focus", () => {
	it("receives focus on render when autoFocus is set", () => {
		render(<TimeFieldFixture label="Time" autoFocus />);
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveFocus();
	});

	it("is reachable via Tab by default", async () => {
		const user = userEvent.setup();
		render(<TimeFieldFixture label="Time" />);
		await user.tab();
		const segments = screen.getAllByRole("spinbutton");
		expect(segments[0]).toHaveFocus();
	});
});

describe("TimeField — readonly", () => {
	it("is not readonly by default", () => {
		const { container } = render(<TimeFieldFixture label="Time" />);
		const input = container.querySelector(".timeinput");
		expect(input).not.toHaveAttribute("data-readonly");
	});

	it("is readonly when isReadOnly is true", () => {
		const { container } = render(<TimeFieldFixture label="Time" isReadOnly />);
		const input = container.querySelector(".timeinput");
		expect(input).toHaveAttribute("data-readonly", "true");
	});
});

describe("TimeField — validation", () => {
	it("renders error message when provided and invalid", () => {
		render(
			<TimeFieldFixture
				label="Time"
				errorMessage="Time is required"
				isInvalid
			/>,
		);
		expect(screen.getByText("Time is required")).toBeInTheDocument();
	});

	it("does not render error message when valid", () => {
		const { container } = render(
			<TimeFieldFixture label="Time" errorMessage="Time is required" />,
		);
		expect(container.querySelector(".form-error")).not.toBeInTheDocument();
	});
});
