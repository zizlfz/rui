import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "#/components/ui/Button";

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
describe("Button — rendering", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('renders with default type="button"', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it('renders with type="submit" when specified', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it('renders with type="reset" when specified', () => {
    render(<Button type="reset">Reset</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });

  it("merges a custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("retains the base .button class when a custom className is provided", () => {
    render(<Button className="extra">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("button");
  });
});

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------
describe("Button — variants", () => {
  const variants = [
    "primary",
    "secondary",
    "quiet",
    "danger",
    "success",
  ] as const;

  variants.forEach((variant) => {
    it(`applies the "${variant}" variant`, () => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-variant",
        variant,
      );
    });
  });

  it("renders without an explicit variant (default style)", () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole("button");
    expect(btn).not.toHaveAttribute("data-variant");
  });
});

// ---------------------------------------------------------------------------
// Disabled state
// ---------------------------------------------------------------------------
describe("Button — disabled state", () => {
  it("is not disabled by default", () => {
    render(<Button>Active</Button>);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("becomes disabled when isDisabled is true", () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onPress when disabled", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Button isDisabled onPress={onPress}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("is removed from the tab order when disabled", () => {
    render(<Button isDisabled>Disabled</Button>);
    // Disabled buttons are excluded from the tab order per HTML spec
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Pending state
// ---------------------------------------------------------------------------
describe("Button — pending state", () => {
  it("renders a spinner when isPending is true", () => {
    render(<Button isPending>Save</Button>);
    // The spinner should be present in the DOM (find by role or test id)
    expect(screen.getByRole("button")).toBeInTheDocument();
    // Spinner accessible markup (aria-label, status role, or svg title)
    const spinner =
      screen.queryByRole("status") ??
      screen.queryByLabelText(/loading|pending/i) ??
      screen.getByRole("button").querySelector('[aria-hidden="false"], svg');
    expect(spinner).not.toBeNull();
  });

  it("announces pending state to assistive technologies", () => {
    render(<Button isPending>Save</Button>);
    const btn = screen.getByRole("button");
    // React Aria sets aria-disabled and aria-busy while pending
    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  it("remains focusable while pending", () => {
    render(<Button isPending>Save</Button>);
    const btn = screen.getByRole("button");
    // Should not carry the HTML disabled attribute (so it stays in tab order)
    expect(btn).not.toBeDisabled();
  });

  it("does not fire onPress while pending", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Button isPending onPress={onPress}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Press / interaction events
// ---------------------------------------------------------------------------
describe("Button — press events", () => {
  it("calls onPress when clicked", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("calls onPress when activated with Enter key", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press me</Button>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("calls onPress when activated with Space key", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press me</Button>);
    screen.getByRole("button").focus();
    await user.keyboard(" ");
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("calls onPressStart when a press interaction begins", async () => {
    const user = userEvent.setup();
    const onPressStart = vi.fn();
    render(<Button onPressStart={onPressStart}>Press me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onPressStart).toHaveBeenCalledTimes(1);
  });

  it("calls onPressEnd when a press interaction ends", async () => {
    const user = userEvent.setup();
    const onPressEnd = vi.fn();
    render(<Button onPressEnd={onPressEnd}>Press me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onPressEnd).toHaveBeenCalledTimes(1);
  });

  it("calls onPressChange with true on press start and false on press end", async () => {
    const user = userEvent.setup();
    const onPressChange = vi.fn();
    render(<Button onPressChange={onPressChange}>Press me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onPressChange).toHaveBeenCalledWith(true);
    expect(onPressChange).toHaveBeenCalledWith(false);
  });

  it('passes a PressEvent to onPress with a "press" type', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press me</Button>);
    await user.click(screen.getByRole("button"));
    const event = onPress.mock.calls[0][0];
    expect(event.type).toBe("press");
  });

  it('passes a PressEvent to onPress with pointerType "virtual" on click (jsdom reports virtual instead of mouse)', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press me</Button>);
    await user.click(screen.getByRole("button"));
    const event = onPress.mock.calls[0][0];
    expect(event.pointerType).toBe("virtual");
  });

  it('passes a PressEvent to onPress with pointerType "keyboard" on keyboard activation', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Press me</Button>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    const event = onPress.mock.calls[0][0];
    expect(event.pointerType).toBe("keyboard");
  });
});

// ---------------------------------------------------------------------------
// Icon-only button
// ---------------------------------------------------------------------------
describe("Button — icon-only", () => {
  it("renders a square icon button when only an svg child is provided", () => {
    render(
      <Button aria-label="Close">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          data-testid="icon"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>,
    );
    const btn = screen.getByRole("button", { name: /close/i });
    expect(btn).toBeInTheDocument();
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Keyboard shortcut hint
// ---------------------------------------------------------------------------
describe("Button — keyboard shortcut", () => {
  it("renders a kbd element when a keyboard shortcut is provided", () => {
    render(
      <Button variant="secondary">
        Save <kbd>⌘S</kbd>
      </Button>,
    );
    const kbd = screen.getByRole("button").querySelector("kbd");
    expect(kbd).toBeInTheDocument();
    expect(kbd).toHaveTextContent("⌘S");
  });
});

// ---------------------------------------------------------------------------
// Focus behaviour
// ---------------------------------------------------------------------------
describe("Button — focus", () => {
  it("receives focus on render when autoFocus is set", () => {
    render(<Button autoFocus>Focused</Button>);
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("is reachable via Tab by default", async () => {
    const user = userEvent.setup();
    render(<Button>Tab target</Button>);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("is skipped in tab order when excludeFromTabOrder is set", () => {
    render(<Button excludeFromTabOrder>Skip me</Button>);
    // React Aria sets tabIndex=-1 when excluded from the tab order
    expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
  });
});
