import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "#/components/ui/Checkbox";

describe("Checkbox — rendering", () => {
  it("renders with children as accessible name", () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(
      screen.getByRole("checkbox", { name: /accept terms/i }),
    ).toBeInTheDocument();
  });

  it("merges custom className on the container", () => {
    const { container } = render(<Checkbox className="custom">Label</Checkbox>);
    expect(container.querySelector(".checkbox")).toHaveClass("custom");
  });

  it("retains base .checkbox class with custom className", () => {
    const { container } = render(<Checkbox className="extra">Label</Checkbox>);
    const checkbox = container.querySelector(".checkbox");
    expect(checkbox).toHaveClass("checkbox");
    expect(checkbox).toHaveClass("extra");
  });
});

describe("Checkbox — selection", () => {
  it("is unchecked by default", () => {
    render(<Checkbox>Label</Checkbox>);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("is checked when isSelected is true", () => {
    render(<Checkbox isSelected>Label</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("toggles selection on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox defaultSelected>Label</Checkbox>);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("calls onChange when selection changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Label</Checkbox>);
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("Checkbox — indeterminate", () => {
  it("renders indeterminate icon when isIndeterminate is true", () => {
    const { container } = render(<Checkbox isIndeterminate>Label</Checkbox>);
    const rect = container.querySelector("rect");
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute("x", "1");
  });

  it("renders check icon when not indeterminate", () => {
    const { container } = render(<Checkbox>Label</Checkbox>);
    const polyline = container.querySelector("polyline");
    expect(polyline).toBeInTheDocument();
  });
});

describe("Checkbox — disabled", () => {
  it("is not disabled by default", () => {
    render(<Checkbox>Label</Checkbox>);
    expect(screen.getByRole("checkbox")).not.toBeDisabled();
  });

  it("is disabled when isDisabled is true", () => {
    render(<Checkbox isDisabled>Label</Checkbox>);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Checkbox isDisabled onChange={onChange}>
        Label
      </Checkbox>,
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Checkbox — focus", () => {
  it("receives focus on render when autoFocus is set", () => {
    render(<Checkbox autoFocus>Label</Checkbox>);
    expect(screen.getByRole("checkbox")).toHaveFocus();
  });

  it("is reachable via Tab by default", async () => {
    const user = userEvent.setup();
    render(<Checkbox>Label</Checkbox>);
    await user.tab();
    expect(screen.getByRole("checkbox")).toHaveFocus();
  });
});
