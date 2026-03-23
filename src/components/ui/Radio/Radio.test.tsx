import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "#/components/ui/Radio";

describe("Radio — rendering", () => {
  it("renders with label", () => {
    render(
      <RadioGroup label="Color">
        <Radio value="red">Red</Radio>
      </RadioGroup>,
    );
    expect(
      screen.getByRole("radiogroup", { name: /color/i }),
    ).toBeInTheDocument();
  });

  it("renders multiple radio options", () => {
    render(
      <RadioGroup label="Size">
        <Radio value="sm">Small</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="lg">Large</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /small/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /large/i })).toBeInTheDocument();
  });

  it("merges custom className on RadioGroup", () => {
    const { container } = render(
      <RadioGroup className="custom-group">
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    expect(container.querySelector(".form-field")).toHaveClass("custom-group");
  });

  it("merges custom className on Radio", () => {
    const { container } = render(
      <RadioGroup>
        <Radio value="a" className="custom-radio">
          A
        </Radio>
      </RadioGroup>,
    );
    expect(container.querySelector(".radio")).toHaveClass("custom-radio");
  });
});

describe("Radio — selection", () => {
  it("is unchecked by default", () => {
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it("is checked when selected", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="b">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /b/i })).toBeChecked();
    await user.click(screen.getByRole("radio", { name: /a/i }));
    expect(screen.getByRole("radio", { name: /a/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /b/i })).not.toBeChecked();
  });

  it("calls onChange when selection changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup onChange={onChange}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio", { name: /b/i }));
    expect(onChange).toHaveBeenCalledWith("b");
  });
});

describe("Radio — disabled", () => {
  it("is not disabled by default", () => {
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio")).not.toBeDisabled();
  });

  it("disables entire group when isDisabled is true", () => {
    render(
      <RadioGroup isDisabled>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /a/i })).toBeDisabled();
    expect(screen.getByRole("radio", { name: /b/i })).toBeDisabled();
  });

  it("disables individual radio when isDisabled is true", () => {
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
        <Radio value="b" isDisabled>
          B
        </Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /a/i })).not.toBeDisabled();
    expect(screen.getByRole("radio", { name: /b/i })).toBeDisabled();
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup isDisabled onChange={onChange}>
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Radio — focus", () => {
  it("receives focus on render when autoFocus is set", () => {
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
        <Radio value="b" autoFocus>
          B
        </Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /b/i })).toHaveFocus();
  });

  it("is reachable via Tab by default", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    await user.tab();
    expect(screen.getByRole("radio")).toHaveFocus();
  });
});

describe("Radio — validation", () => {
  it("shows description when provided", () => {
    render(
      <RadioGroup description="Pick a size">
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    expect(screen.getByText("Pick a size")).toBeInTheDocument();
  });

  it("shows error message when isInvalid and errorMessage provided", () => {
    render(
      <RadioGroup isInvalid errorMessage="Required field">
        <Radio value="a">A</Radio>
      </RadioGroup>,
    );
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
});
