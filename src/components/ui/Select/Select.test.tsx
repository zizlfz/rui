import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select, SelectItem } from "#/components/ui/Select";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function AnimalSelect(
  props: Omit<React.ComponentProps<typeof Select>, "children"> = {},
) {
  return (
    <Select label="Animal" {...props}>
      <SelectItem id="cat">Cat</SelectItem>
      <SelectItem id="dog">Dog</SelectItem>
      <SelectItem id="snake">Snake</SelectItem>
    </Select>
  );
}

/** Opens the dropdown and returns the listbox element. */
async function openListbox(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button"));
  return screen.getByRole("listbox");
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
describe("Select — rendering", () => {
  it("renders the label", () => {
    render(<AnimalSelect />);
    expect(screen.getByText("Animal")).toBeInTheDocument();
  });

  it("renders the trigger button", () => {
    render(<AnimalSelect />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows the placeholder when nothing is selected", () => {
    render(<AnimalSelect placeholder="Pick one" />);
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("uses a default placeholder when none is specified", () => {
    render(<AnimalSelect />);
    // React Aria's default placeholder text
    expect(screen.getByRole("button")).toHaveTextContent(/select an item/i);
  });

  it("renders the description when provided", () => {
    render(<AnimalSelect description="Choose your animal." />);
    expect(screen.getByText("Choose your animal.")).toBeInTheDocument();
  });

  it("associates the description with the trigger via aria", () => {
    render(<AnimalSelect description="Choose your animal." />);
    const btn = screen.getByRole("button");
    const desc = screen.getByText("Choose your animal.");
    expect(btn).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining(desc.id),
    );
  });

  it("merges a custom className", () => {
    const { container } = render(<AnimalSelect className="custom-select" />);
    expect(container.querySelector(".select")).toHaveClass("custom-select");
  });

  it("retains the base .select class when a custom className is provided", () => {
    const { container } = render(<AnimalSelect className="extra" />);
    expect(container.querySelector(".select")).toHaveClass("select");
    expect(container.querySelector(".select")).toHaveClass("extra");
  });
});

// ---------------------------------------------------------------------------
// Opening & closing
// ---------------------------------------------------------------------------
describe("Select — open / close", () => {
  it("does not show the listbox initially", () => {
    render(<AnimalSelect />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens the listbox when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("renders all items inside the listbox", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect />);
    const listbox = await openListbox(user);
    expect(
      within(listbox).getByRole("option", { name: "Cat" }),
    ).toBeInTheDocument();
    expect(
      within(listbox).getByRole("option", { name: "Dog" }),
    ).toBeInTheDocument();
    expect(
      within(listbox).getByRole("option", { name: "Snake" }),
    ).toBeInTheDocument();
  });

  it("closes the listbox after selecting an item", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect />);
    const listbox = await openListbox(user);
    await user.click(within(listbox).getByRole("option", { name: "Cat" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes the listbox when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect />);
    await openListbox(user);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Selection
// ---------------------------------------------------------------------------
describe("Select — selection", () => {
  it("shows the selected item label in the trigger after selection", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect />);
    const listbox = await openListbox(user);
    await user.click(within(listbox).getByRole("option", { name: "Dog" }));
    expect(screen.getByRole("button")).toHaveTextContent("Dog");
  });

  it("calls onChange with the selected key", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AnimalSelect onChange={onChange} />);
    const listbox = await openListbox(user);
    await user.click(within(listbox).getByRole("option", { name: "Snake" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("snake");
  });

  it("does not call onChange when clicking a disabled item", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select label="Animal" onChange={onChange}>
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog" isDisabled>
          Dog
        </SelectItem>
      </Select>,
    );
    const listbox = await openListbox(user);
    await user.click(within(listbox).getByRole("option", { name: "Dog" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Controlled value
// ---------------------------------------------------------------------------
function ControlledSelect() {
  const [value, setValue] = useState("dog");
  return (
    <>
      <AnimalSelect value={value} onChange={(key) => setValue(key as string)} />
      <button onClick={() => setValue("snake")}>Switch to Cat</button>
    </>
  );
}

it("updates the displayed value when the controlled value changes", async () => {
  const user = userEvent.setup();

  render(<ControlledSelect />);

  // Initially shows "Dog"
  expect(screen.getByRole("button", { name: /dog/i })).toBeInTheDocument();

  // Trigger an external state change
  await user.click(screen.getByText("Switch to Cat"));

  // Now should show "Cat"
  expect(screen.getByRole("button", { name: /snake/i })).toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Default value (uncontrolled)
// ---------------------------------------------------------------------------
describe("Select — defaultValue (uncontrolled)", () => {
  it("shows the item matching defaultValue on first render", () => {
    render(<AnimalSelect defaultValue="snake" />);
    expect(screen.getByRole("button")).toHaveTextContent("Snake");
  });
});

// ---------------------------------------------------------------------------
// Disabled state
// ---------------------------------------------------------------------------
describe("Select — disabled", () => {
  it("disables the trigger button when isDisabled is true", () => {
    render(<AnimalSelect isDisabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not open the listbox when disabled", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect isDisabled />);
    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("marks individual items as disabled via isDisabled on SelectItem", async () => {
    const user = userEvent.setup();
    render(
      <Select label="Animal">
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog" isDisabled>
          Dog
        </SelectItem>
      </Select>,
    );
    const listbox = await openListbox(user);
    const dogOption = within(listbox).getByRole("option", { name: "Dog" });
    expect(dogOption).toHaveAttribute("aria-disabled", "true");
  });

  it("marks items disabled via disabledKeys on the Select", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect disabledKeys={["cat", "snake"]} />);
    const listbox = await openListbox(user);
    expect(
      within(listbox).getByRole("option", { name: "Cat" }),
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      within(listbox).getByRole("option", { name: "Snake" }),
    ).toHaveAttribute("aria-disabled", "true");
    expect(
      within(listbox).getByRole("option", { name: "Dog" }),
    ).not.toHaveAttribute("aria-disabled");
  });
});

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
describe("Select — validation", () => {
  it("marks the select container as required when isRequired is true", () => {
    const { container } = render(<AnimalSelect isRequired />);
    expect(container.querySelector(".select")).toHaveAttribute(
      "data-required",
      "true",
    );
  });

  it("shows a static errorMessage when provided and the field is invalid", () => {
    render(<AnimalSelect isInvalid errorMessage="Please select an animal." />);
    expect(screen.getByText("Please select an animal.")).toBeInTheDocument();
  });

  it("marks the select container as invalid when isInvalid is true", () => {
    const { container } = render(
      <AnimalSelect isInvalid errorMessage="Required." />,
    );
    expect(container.querySelector(".select")).toHaveAttribute(
      "data-invalid",
      "true",
    );
  });

  it("supports a function errorMessage", () => {
    render(
      <AnimalSelect
        isInvalid
        errorMessage={(_v) => "Custom validation error."}
      />,
    );
    expect(screen.getByText("Custom validation error.")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Form integration
// ---------------------------------------------------------------------------
describe("Select — form integration", () => {
  it("renders a hidden select element with the correct name", () => {
    const { container } = render(<AnimalSelect name="animal" />);
    const hiddenSelect = container.querySelector('select[name="animal"]');
    expect(hiddenSelect).toBeInTheDocument();
    expect(hiddenSelect).toHaveAttribute("tabindex", "-1");
  });

  it("sets the hidden select value to the selected item id", async () => {
    const user = userEvent.setup();
    const { container } = render(<AnimalSelect name="animal" />);
    const listbox = await openListbox(user);
    await user.click(within(listbox).getByRole("option", { name: "Cat" }));
    const hiddenSelect = container.querySelector(
      'select[name="animal"]',
    ) as HTMLSelectElement;
    expect(hiddenSelect.value).toBe("cat");
  });
});

// ---------------------------------------------------------------------------
// Dynamic items
// ---------------------------------------------------------------------------
describe("Select — dynamic items", () => {
  it("renders items from the items prop using a render function", async () => {
    const user = userEvent.setup();
    const fruits = [
      { id: "apple", name: "Apple" },
      { id: "banana", name: "Banana" },
      { id: "cherry", name: "Cherry" },
    ];
    render(
      <Select label="Fruit" items={fruits}>
        {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
      </Select>,
    );
    const listbox = await openListbox(user);
    expect(
      within(listbox).getByRole("option", { name: "Apple" }),
    ).toBeInTheDocument();
    expect(
      within(listbox).getByRole("option", { name: "Banana" }),
    ).toBeInTheDocument();
    expect(
      within(listbox).getByRole("option", { name: "Cherry" }),
    ).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Keyboard navigation
// ---------------------------------------------------------------------------
describe("Select — keyboard navigation", () => {
  it("opens the listbox with ArrowDown", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect />);
    screen.getByRole("button").focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("opens the listbox with Space", async () => {
    const user = userEvent.setup();
    render(<AnimalSelect />);
    screen.getByRole("button").focus();
    await user.keyboard(" ");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("selects the focused option with Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<AnimalSelect onChange={onChange} />);
    screen.getByRole("button").focus();
    await user.keyboard("{ArrowDown}");
    // Move focus to first item then confirm
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Focus
// ---------------------------------------------------------------------------
describe("Select — focus", () => {
  it("focuses the trigger button when autoFocus is set", () => {
    render(<AnimalSelect autoFocus />);
    expect(screen.getByRole("button")).toHaveFocus();
  });
});
