import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "#/components/ui/Switch";

describe("Switch — rendering", () => {
  it("renders with children", () => {
    render(<Switch>Enable notifications</Switch>);
    expect(
      screen.getByRole("switch", { name: /enable notifications/i }),
    ).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(<Switch className="custom">Toggle</Switch>);
    expect(container.querySelector(".switch")).toHaveClass("custom");
  });

  it("retains base .switch class with custom className", () => {
    const { container } = render(<Switch className="extra">Toggle</Switch>);
    const switchEl = container.querySelector(".switch");
    expect(switchEl).toHaveClass("switch");
    expect(switchEl).toHaveClass("extra");
  });
});

describe("Switch — selection", () => {
  it("is unchecked by default", () => {
    render(<Switch>Toggle</Switch>);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("is checked when isSelected is true", () => {
    render(<Switch isSelected>Toggle</Switch>);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("toggles selection on click", async () => {
    const user = userEvent.setup();
    render(<Switch defaultSelected>Toggle</Switch>);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeChecked();
    await user.click(switchEl);
    expect(switchEl).not.toBeChecked();
  });

  it("calls onChange when selection changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch onChange={onChange}>Toggle</Switch>);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe("Switch — disabled", () => {
  it("is not disabled by default", () => {
    render(<Switch>Toggle</Switch>);
    expect(screen.getByRole("switch")).not.toBeDisabled();
  });

  it("is disabled when isDisabled is true", () => {
    render(<Switch isDisabled>Toggle</Switch>);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Switch isDisabled onChange={onChange}>
        Toggle
      </Switch>,
    );
    await user.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Switch — focus", () => {
  it("receives focus on render when autoFocus is set", () => {
    render(<Switch autoFocus>Toggle</Switch>);
    expect(screen.getByRole("switch")).toHaveFocus();
  });

  it("is reachable via Tab by default", async () => {
    const user = userEvent.setup();
    render(<Switch>Toggle</Switch>);
    await user.tab();
    expect(screen.getByRole("switch")).toHaveFocus();
  });
});

describe("Switch — value", () => {
  it("has default value of on", () => {
    render(<Switch name="toggle">Toggle</Switch>);
    const input = document.querySelector(
      'input[name="toggle"]',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("on");
  });

  it("accepts custom value prop", () => {
    const { container } = render(
      <Switch name="toggle" value="yes">
        Toggle
      </Switch>,
    );
    const input = container.querySelector(
      'input[name="toggle"]',
    ) as HTMLInputElement;
    expect(input.value).toBe("yes");
  });
});
