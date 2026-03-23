import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input, TextArea } from "#/components/ui/Input";

describe("Input — rendering", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter email" />);
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(<Input description="We'll never share your email" />);
    expect(
      screen.getByText("We'll never share your email"),
    ).toBeInTheDocument();
  });

  it("merges inputClassName on the input element", () => {
    const { container } = render(<Input inputClassName="custom-input" />);
    expect(container.querySelector(".input")).toHaveClass("custom-input");
  });

  it("retains base .input class with inputClassName", () => {
    const { container } = render(<Input inputClassName="extra" />);
    const input = container.querySelector(".input");
    expect(input).toHaveClass("input");
    expect(input).toHaveClass("extra");
  });
});

describe("Input — value", () => {
  it("is empty by default", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("accepts a controlled value", () => {
    render(<Input value="test@example.com" />);
    expect(screen.getByRole("textbox")).toHaveValue("test@example.com");
  });

  it("accepts a defaultValue", () => {
    render(<Input defaultValue="prefilled" />);
    expect(screen.getByRole("textbox")).toHaveValue("prefilled");
  });

  it("updates value on user input", async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("calls onChange with new value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });
});

describe("Input — disabled", () => {
  it("is not disabled by default", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });

  it("is disabled when isDisabled is true", () => {
    render(<Input isDisabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("does not accept input when disabled", async () => {
    const user = userEvent.setup();
    render(<Input isDisabled />);
    const input = screen.getByRole("textbox");
    await user.type(input, "text");
    expect(input).toHaveValue("");
  });
});

describe("Input — validation", () => {
  it("shows error message when isInvalid is true", () => {
    render(<Input isInvalid errorMessage="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("does not show error message when isInvalid is false", () => {
    render(<Input errorMessage="Invalid email" />);
    expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
  });

  it("marks input as required when isRequired is true", () => {
    render(<Input isRequired label="Email" />);
    expect(screen.getByRole("textbox", { name: /email/i })).toBeRequired();
  });

  it("is not required by default", () => {
    render(<Input label="Email" />);
    expect(screen.getByRole("textbox", { name: /email/i })).not.toBeRequired();
  });
});

describe("Input — focus", () => {
  it("receives focus on render when autoFocus is set", () => {
    render(<Input autoFocus />);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("is reachable via Tab by default", async () => {
    const user = userEvent.setup();
    render(<Input />);
    await user.tab();
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

describe("TextArea — rendering", () => {
  it("renders with label", () => {
    render(<TextArea label="Message" />);
    expect(
      screen.getByRole("textbox", { name: /message/i }),
    ).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<TextArea placeholder="Write your message" />);
    expect(
      screen.getByPlaceholderText("Write your message"),
    ).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(<TextArea description="Max 500 characters" />);
    expect(screen.getByText("Max 500 characters")).toBeInTheDocument();
  });

  it("merges inputClassName on the textarea element", () => {
    const { container } = render(<TextArea inputClassName="custom-textarea" />);
    expect(container.querySelector(".input")).toHaveClass("custom-textarea");
  });
});

describe("TextArea — value", () => {
  it("is empty by default", () => {
    render(<TextArea />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("accepts a controlled value", () => {
    render(<TextArea value="hello world" />);
    expect(screen.getByRole("textbox")).toHaveValue("hello world");
  });

  it("accepts multiline input", async () => {
    const user = userEvent.setup();
    render(<TextArea />);
    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "line 1{enter}line 2");
    expect(textarea).toHaveValue("line 1\nline 2");
  });
});

describe("TextArea — disabled", () => {
  it("is disabled when isDisabled is true", () => {
    render(<TextArea isDisabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("is not disabled by default", () => {
    render(<TextArea />);
    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });
});

describe("TextArea — validation", () => {
  it("shows error message when isInvalid is true", () => {
    render(<TextArea isInvalid errorMessage="Message required" />);
    expect(screen.getByText("Message required")).toBeInTheDocument();
  });

  it("marks textarea as required when isRequired is true", () => {
    render(<TextArea isRequired label="Message" />);
    expect(screen.getByRole("textbox", { name: /message/i })).toBeRequired();
  });
});

describe("TextArea — focus", () => {
  it("receives focus on render when autoFocus is set", () => {
    render(<TextArea autoFocus />);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
