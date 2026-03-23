# Components Documentation

This document provides detailed documentation for all UI components available in RUI.

## Alert

Dismissible alert messages for displaying important information.

### Variants
- `info` (default)
- `success`
- `warning`
- `error`

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Alert visual variant |
| `title` | `ReactNode` | - | Alert title |
| `children` | `ReactNode` | - | Alert description/content |
| `dismissible` | `boolean` | `false` | Whether the alert can be dismissed |
| `onDismiss` | `() => void` | - | Callback when alert is dismissed |
| `className` | `string` | - | Additional CSS classes |

### Example
```tsx
<Alert variant="info" title="Information" dismissible>
  This is an informational alert message that provides context.
</Alert>

<Alert variant="success" title="Success">
  Your changes have been saved successfully.
</Alert>

<Alert variant="error" title="Error" dismissible onDismiss={() => console.log('dismissed')}>
  An error occurred while processing your request.
</Alert>
```

---

## Avatar

User avatar component for displaying profile images or initials with online status indicator.

### Variants
- `sm` - Small avatar (24px)
- `md` (default) - Medium avatar (40px)
- `lg` - Large avatar (56px)

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Avatar image source URL |
| `alt` | `string` | - | Alt text for accessibility |
| `fallback` | `string` | - | Text to display when no image is provided (e.g., initials) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Avatar size variant |
| `isOnline` | `boolean` | `false` | Show online status indicator |
| `className` | `string` | - | Additional CSS classes |

### Example
```tsx
<Avatar src="https://example.com/avatar.jpg" alt="John Doe" />

<Avatar fallback="JD" size="sm" />

<Avatar fallback="AB" size="lg" isOnline />

<Avatar src="/path/to/image.jpg" fallback="XX" isOnline={false} />
```

---

## Breadcrumbs

Navigation breadcrumb component for showing the user's location in a hierarchy.

### Components
- `Breadcrumbs` - Container for breadcrumb items
- `Breadcrumb` - Individual breadcrumb item with href

### Props

#### Breadcrumbs
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Breadcrumbs props | - | Standard breadcrumbs properties |

#### Breadcrumb
| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | Link URL |
| All React Aria Link props | - | Standard link properties |

### Example
```tsx
<Breadcrumbs>
  <Breadcrumb href="#">Home</Breadcrumb>
  <Breadcrumb href="#">Components</Breadcrumb>
  <Breadcrumb>Breadcrumbs</Breadcrumb>
</Breadcrumbs>
```

---

## Button

Interactive button component with multiple variants and loading states.

### Variants
- `primary` (default)
- `secondary`
- `quiet`
- `danger`
- `success`

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "quiet" \| "danger" \| "success"` | `"primary"` | Button visual style |
| `isPending` | `boolean` | - | Show loading spinner |
| All React Aria Button props | - | - | Standard button properties |

### Example
```tsx
<Button>Default Button</Button>
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Save</Button>
<Button isPending>Loading...</Button>
```

---

## Box

Simple container component for layout and grouping.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `children` | `ReactNode` | Child elements |

### Example
```tsx
<Box>Box content</Box>
<Box className="custom-class">Styled box</Box>
```

---

## Card

Card component with optional image, header, body, and footer sections.

### Components
- `Card` - Main card container
- `CardImage` - Image section with aspect ratio support
- `CardHeader` - Header section
- `CardBody` - Main content section
- `CardFooter` - Footer section

### Props

#### Card
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `children` | `ReactNode` | Card content |
| `as` | `ElementType` | HTML element type (default: `div`) |

#### CardImage
| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | Image source URL |
| `alt` | `string` | Alt text for accessibility |
| `aspectRatio` | `string` | Aspect ratio (default: `16/9`) |
| `position` | `string` | Image position (default: `center`) |
| `className` | `string` | Additional CSS classes |

#### CardHeader, CardBody, CardFooter
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `children` | `ReactNode` | Section content |

### Example
```tsx
<Card>
  <CardImage src="/image.jpg" alt="Description" />
  <CardBody>
    <Text>Card content goes here</Text>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## Checkbox

Checkbox input component with support for indeterminate state.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `isSelected` | `boolean` | Checked state |
| `isIndeterminate` | `boolean` | Indeterminate state |
| `isDisabled` | `boolean` | Disabled state |
| All React Aria Checkbox props | - | Standard checkbox properties |

### Example
```tsx
<Checkbox>Default checkbox</Checkbox>
<Checkbox isSelected>Selected checkbox</Checkbox>
<Checkbox isIndeterminate>Indeterminate checkbox</Checkbox>
<Checkbox isDisabled>Disabled checkbox</Checkbox>
</Checkbox>
```

---

## Calendar

A calendar component for selecting dates, built on React Aria Calendar.

### Components
- `Calendar` - Main calendar component

### Props

#### Calendar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `defaultValue` | `DateValue` | - | Default selected date |
| `value` | `DateValue` | - | Controlled selected date |
| `onChange` | `(value: DateValue) => void` | - | Callback when date changes |
| `isDisabled` | `boolean` | `false` | Whether the calendar is disabled |
| `minValue` | `DateValue` | - | Minimum selectable date |
| `maxValue` | `DateValue` | - | Maximum selectable date |

### Example
```tsx
<Calendar />

<Calendar defaultValue={new CalendarDate(2024, 1, 15)} />

<Calendar minValue={new CalendarDate(2024, 1, 1)} maxValue={new CalendarDate(2024, 12, 31)} />
```

---

## Combobox

A searchable dropdown that combines an input field with a list of options.

### Components
- `ComboBox` - Main combobox component
- `ComboBoxListBox` - List of options container
- `ComboBoxItem` - Individual option item

### Props

#### ComboBox
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Form label |
| `description` | `string` | - | Helper text |
| `errorMessage` | `string` | - | Validation error message |
| `children` | `ReactNode \| ((item: T) => ReactNode)` | - | Options or render function |
| `placeholder` | `string` | - | Input placeholder text |
| `selectionMode` | `"single" \| "multiple"` | `"single"` | Selection mode |

### Example
```tsx
<ComboBox label="Select a fruit">
  <ComboBoxItem id="apple">Apple</ComboBoxItem>
  <ComboBoxItem id="banana">Banana</ComboBoxItem>
  <ComboBoxItem id="orange">Orange</ComboBoxItem>
</ComboBox>

<ComboBox 
  label="Select users" 
  selectionMode="multiple"
  placeholder="Search users..."
>
  {users.map(user => (
    <ComboBoxItem key={user.id} id={user.id}>{user.name}</ComboBoxItem>
  ))}
</ComboBox>
```

---

## DateField

An input field for entering dates with segmented inputs.

### Components
- `DateField` - Main date field container
- `DateInput` - Input container for date segments
- `DateSegment` - Individual date segment (day, month, year)

### Props

#### DateField
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `defaultValue` | `DateValue` | - | Default date value |
| `value` | `DateValue` | - | Controlled date value |
| `onChange` | `(value: DateValue) => void` | - | Callback when date changes |

### Example
```tsx
<DateField />

<DateField defaultValue={new CalendarDate(2024, 1, 15)} />
```

---

## Datepicker

A date picker component that combines a date input with a calendar popup.

### Components
- `DatePicker` - Main date picker component

### Props

#### DatePicker
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Form label |
| `description` | `string` | - | Helper text |
| `errorMessage` | `string` | - | Validation error message |
| `className` | `string` | - | Additional CSS classes |
| `defaultValue` | `DateValue` | - | Default selected date |
| `value` | `DateValue` | - | Controlled selected date |
| `onChange` | `(value: DateValue) => void` | - | Callback when date changes |

### Example
```tsx
<DatePicker label="Date of birth" />

<DatePicker 
  label="Start date"
  description="Select when you want to start"
  defaultValue={new CalendarDate(2024, 2, 1)}
/>
```

---

## Dropdown

Dropdown menu component with support for items, sections, and submenus.

### Components
- `DropdownTrigger` - Trigger wrapper
- `Dropdown` - Menu container
- `DropdownItem` - Individual menu item
- `DropdownSection` - Grouped menu items
- `SubdropdownTrigger` - Nested submenu trigger

### Props

#### DropdownTrigger
| Prop | Type | Description |
|------|------|-------------|
| All React Aria MenuTrigger props | - | Standard trigger properties |

#### Dropdown
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Menu props | - | Standard menu properties |

#### DropdownItem
| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `children` | `ReactNode` | Item content |
| `className` | `string` | Additional CSS classes |
| `textValue` | `string` | Text value for search |

### Example
```tsx
<DropdownTrigger>
  <Button>Actions</Button>
  <Dropdown>
    <DropdownItem id="new">New</DropdownItem>
    <DropdownItem id="open">Open...</DropdownItem>
    <DropdownItem id="rename">Rename...</DropdownItem>
    <DropdownSection>
      <Text slot="header">Edit</Text>
      <DropdownItem id="cut">Cut</DropdownItem>
      <DropdownItem id="copy">Copy</DropdownItem>
      <DropdownItem id="paste">Paste</DropdownItem>
    </DropdownSection>
    <SubdropdownTrigger>
      <DropdownItem id="share">Share</DropdownItem>
      <Dropdown>
        <DropdownItem id="twitter">Twitter</DropdownItem>
        <DropdownItem id="facebook">Facebook</DropdownItem>
        <DropdownItem id="email">Email</DropdownItem>
      </Dropdown>
    </SubdropdownTrigger>
    <DropdownItem id="delete">Delete</DropdownItem>
  </Dropdown>
</DropdownTrigger>
```

---

## Form Components

Form utilities for labels, errors, and descriptions.

### Components
- `Label` - Form field label
- `FieldError` - Validation error message
- `Description` - Helper/description text

### Props

#### Label
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Label props | - | Standard label properties |

#### FieldError
| Prop | Type | Description |
|------|------|-------------|
| All React Aria FieldError props | - | Standard error properties |

#### Description
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Text props | - | Standard text properties |

### Example
```tsx
<div>
  <Label>Name</Label>
  <Input placeholder="Enter your name" />
  <Description>Enter your full name</Description>
  <FieldError>This field is required</FieldError>
</div>
```

---

#### FieldButton
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Button props | - | Standard button properties |

### Example
```tsx
<div>
  <Label>Name</Label>
  <Input placeholder="Enter your name" />
  <Description>Enter your full name</Description>
  <FieldError>This field is required</FieldError>
</div>

<div>
  <Label>Upload</Label>
  <FieldButton>Choose File</FieldButton>
  <Description>Supported formats: JPG, PNG</Description>
</div>
```

---

## FileTrigger

A button component that triggers a file selection dialog.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | - | Accepted file types (e.g., "image/*") |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `children` | `ReactNode` | - | Button content |
| `onSelect` | `(files: File[]) => void` | - | Callback when files are selected |

### Example
```tsx
<FileTrigger onSelect={(files) => console.log(files)}>
  <Button>Upload File</Button>
</FileTrigger>

<FileTrigger accept="image/*" multiple>
  <Button>Upload Images</Button>
</FileTrigger>
```

---

## Input

Text input component with error state support.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `error` | `string` | Error message string |
| `className` | `string` | Additional CSS classes |
| All React Aria Input props | - | Standard input properties |

### Example
```tsx
<Input placeholder="Placeholder" />
<Input value="Filled with words" />
<Input value="Invalid" error="Invalid input" />
<Input type="email" placeholder="Enter email" />
```

---

## ListBox

Selectable list component for dropdown menus and lists.

### Components
- `DropdownListBox` - List container
- `DropdownItem` - List item

### Props

#### DropdownListBox
| Prop | Type | Description |
|------|------|-------------|
| `items` | `Iterable<T>` | Items to render |
| All React Aria ListBox props | - | Standard listbox properties |

#### DropdownItem
| Prop | Type | Description |
|------|------|-------------|
| All React Aria ListBoxItem props | - | Standard item properties |

### Example
```tsx
<DropdownListBox items={items}>
  {(item) => <DropdownItem>{item.name}</DropdownItem>}
</DropdownListBox>
```

---

## Modal / Dialog

Modal dialog component for focused interactions.

### Components
- `Modal` - Modal overlay wrapper
- `Dialog` - Dialog content container

### Props

#### Modal
| Prop | Type | Description |
|------|------|-------------|
| `isDismissable` | `boolean` | Can be dismissed (default: true) |
| All React Aria ModalOverlay props | - | Standard modal properties |

#### Dialog
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Dialog props | - | Standard dialog properties |

### Example
```tsx
<DialogTrigger>
  <Button>Open Modal</Button>
  <Modal isDismissable>
    <Dialog>
      <Heading slot="title">Subscribe to our newsletter</Heading>
      <p>
        Enter your information to subscribe to our newsletter and receive
        updates about new features and announcements.
      </p>
      <Form className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label>Name</Label>
          <Input autoFocus placeholder="Enter your full name" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email" />
        </div>
        <div className="flex gap-2 self-end mt-2">
          <Button slot="close" variant="secondary">
            Cancel
          </Button>
          <Button slot="close">Subscribe</Button>
        </div>
      </Form>
    </Dialog>
  </Modal>
</DialogTrigger>
```

---

## Popover

Popover component for displaying floating content.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `offset` | `number` | Offset from trigger |
| `crossOffset` | `number` | Cross offset |
| `className` | `string` | Additional CSS classes |
| All React Aria Popover props | - | Standard popover properties |

### Example
```tsx
<PopoverTrigger>
  <Button>Click me</Button>
  <Popover>
    <div>Popover content</div>
  </Popover>
</PopoverTrigger>
```

---

## Pagination

Pagination component for navigating through large sets of data.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `totalItems` | `number` | Total number of items |
| `pageSize` | `number` | Number of items shown per page |
| `currentPage` | `number` | Currently active page (1-indexed) |
| `onPageChange` | `(page: number) => void` | Called when user navigates to a new page |
| `onPageSizeChange` | `(size: number) => void` | Called when user changes page size. Enables the per-page select. |
| `pageSizeOptions` | `number[]` | Available page size options (default: [10, 25, 50, 100]) |
| `siblingCount` | `number` | Max page buttons shown before collapsing with ellipsis (default: 1) |
| `className` | `string` | Additional Tailwind classes for the wrapper |

### Example
```tsx
function MyTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 150;

  return (
    <Pagination
      totalItems={totalItems}
      pageSize={pageSize}
      currentPage={page}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
  );
}
```

---

## Progress

Linear progress bar components for indicating loading states and completion.

### Components
- `Progress` - Linear progress bar for measurable progress

### Variants
- `default` (default)
- `success`
- `warning`
- `error`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| undefined` | `0` | Progress value (0-100), `undefined` for indeterminate |
| `max` | `number` | `100` | Maximum value for progress calculation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the progress bar (4px, 8px, 12px) |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Visual variant for progress color |
| `showLabel` | `boolean` | `false` | Show percentage label to the right of the bar |
| `aria-label` | `string` | - | Accessible label for the progress bar |

### Example
```tsx
// Linear progress with different variants
<Progress value={50} variant="default" />
<Progress value={75} variant="success" />
<Progress value={30} variant="warning" />
<Progress value={90} variant="error" />

// Different sizes
<Progress value={50} size="sm" />
<Progress value={50} size="md" />
<Progress value={50} size="lg" />

// Indeterminate state
<Progress value={undefined} />

// With percentage label
<Progress value={65} showLabel aria-label="Upload progress" />

// Interactive progress
function UploadProgress() {
  const [progress, setProgress] = useState(0);
  
  return (
    <Progress value={progress} showLabel aria-label="Upload progress" />
  );
}
```

---

## Radio / RadioGroup

Radio button group component for single selection.

### Components
- `RadioGroup` - Group container with label and validation
- `Radio` - Individual radio button

### Props

#### RadioGroup
| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Group label |
| `description` | `string` | Helper text |
| `errorMessage` | `string \| (validation: ValidationResult) => string` | Error message |
| `className` | `string` | Additional CSS classes |
| All React Aria RadioGroup props | - | Standard radiogroup properties |

#### Radio
| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Radio value |
| All React Aria Radio props | - | Standard radio properties |

### Example
```tsx
<RadioGroup label="Favorite pet">
  <Radio value="cat">Cat</Radio>
  <Radio value="dragon">Dragon</Radio>
</RadioGroup>

<RadioGroup 
  label="Disabled" 
  isDisabled
  description="This group is disabled"
>
  <Radio value="option1">Option 1</Radio>
  <Radio value="option2">Option 2</Radio>
</RadioGroup>

<RadioGroup 
  label="With validation" 
  errorMessage="Please select an option"
>
  <Radio value="option1">Option 1</Radio>
  <Radio value="option2">Option 2</Radio>
</RadioGroup>
```

---

## Select

Select dropdown component for single and multiple selection.

### Components
- `Select` - Select container with label and validation
- `SelectListBox` - Options list
- `SelectItem` - Individual option

### Props

#### Select
| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Select label |
| `description` | `string` | Helper text |
| `errorMessage` | `string \| (validation: ValidationResult) => string` | Error message |
| `items` | `Iterable<T>` | Items to render |
| `children` | `ReactNode \| ((item: T) => ReactNode)` | Items renderer |
| All React Aria Select props | - | Standard select properties |

#### SelectListBox
| Prop | Type | Description |
|------|------|-------------|
| `items` | `Iterable<T>` | Items to render |
| All React Aria ListBox props | - | Standard listbox properties |

#### SelectItem
| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `children` | `ReactNode` | Item content |
| All React Aria ListBoxItem props | - | Standard item properties |

### Example
```tsx
<Select label="Animal" placeholder="Select an animal">
  <SelectItem id="aardvark">Aardvark</SelectItem>
  <SelectItem id="cat">Cat</SelectItem>
  <SelectItem id="dog">Dog</SelectItem>
  <SelectItem id="kangaroo">Kangaroo</SelectItem>
  <SelectItem id="panda">Panda</SelectItem>
  <SelectItem id="snake">Snake</SelectItem>
</Select>

<Select 
  label="Disabled" 
  isDisabled 
  placeholder="Disabled select"
>
  <SelectItem id="option1">Option 1</SelectItem>
  <SelectItem id="option2">Option 2</SelectItem>
</Select>

<Select 
  label="Multiple" 
  selectionMode="multiple"
  placeholder="Select multiple"
>
  <SelectItem id="option1">Option 1</SelectItem>
  <SelectItem id="option2">Option 2</SelectItem>
  <SelectItem id="option3">Option 3</SelectItem>
</Select>
```

---

## Skeleton

Loading placeholder components with shimmer animation. Used to indicate content is being loaded.

### Components
- `Skeleton` - Base skeleton component with configurable shape and size
- `SkeletonText` - Multi-line text placeholder with staggered line widths
- `SkeletonCircle` - Circular placeholder for avatars and icons
- `SkeletonRect` - Rectangular placeholder for cards and blocks

### Props

#### Skeleton
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | - | Width (numbers are treated as px) |
| `height` | `string \| number` | - | Height (numbers are treated as px) |
| `variant` | `'text' \| 'circle' \| 'rect'` | `'rect'` | Shape variant |
| `animate` | `boolean` | `true` | Enable shimmer animation |
| `className` | `string` | - | Additional CSS classes |

#### SkeletonText
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `3` | Number of text lines |
| `animate` | `boolean` | `true` | Enable shimmer animation |
| `className` | `string` | - | Additional CSS classes |

#### SkeletonCircle
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string \| number` | `40` | Diameter (numbers treated as px) |
| `animate` | `boolean` | `true` | Enable shimmer animation |
| `className` | `string` | - | Additional CSS classes |

#### SkeletonRect
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | - | Width (numbers converted to px) |
| `height` | `string \| number` | - | Height (numbers converted to px) |
| `animate` | `boolean` | `true` | Enable shimmer animation |
| `className` | `string` | - | Additional CSS classes |

### Example
```tsx
// Card loading state
<div className="border p-4 rounded-md">
  <div className="flex gap-3">
    <SkeletonCircle size={40} />
    <div className="flex flex-col gap-2 flex-1">
      <SkeletonRect width="100%" height={16} />
      <SkeletonText lines={2} />
    </div>
  </div>
</div>

// Form loading state
<div className="flex flex-col gap-2">
  <SkeletonText lines={1} />
  <SkeletonRect width="100%" height="var(--height-field)" />
</div>

// Feed loading state
<div className="flex gap-3">
  <SkeletonCircle size={40} />
  <SkeletonText lines={2} />
</div>

// Static skeleton (no animation)
<SkeletonRect width="100%" height={32} animate={false} />
```

---

## Switch

A toggle switch component for binary on/off states.

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Label or children content |
| `isSelected` | `boolean` | - | Controlled selected state |
| `defaultSelected` | `boolean` | `false` | Default selected state |
| `onChange` | `(isSelected: boolean) => void` | - | Callback when state changes |
| `isDisabled` | `boolean` | `false` | Whether the switch is disabled |

### Example
```tsx
<Switch>Enable notifications</Switch>

<Switch defaultSelected>Dark mode</Switch>

<Switch 
  isSelected={enabled} 
  onChange={setEnabled}
>
  Enable feature
</Switch>
```

---

## Table

Data table component with sorting, resizing, and selection support.

### Components
- `Table` - Table container
- `TableHeader` - Header row
- `TableBody` - Body rows
- `Column` - Table column (supports sorting and resizing)
- `Row` - Table row (supports dragging and selection)
- `Cell` - Table cell

### Features
- Column sorting
- Column resizing
- Row dragging
- Multi-select and single-select
- Accessible keyboard navigation

### Props

#### Table
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Table props | - | Standard table properties |

#### TableHeader
| Prop | Type | Description |
|------|------|-------------|
| `columns` | `T[]` | Column definitions |
| All React Aria TableHeader props | - | Standard header properties |

#### TableBody
| Prop | Type | Description |
|------|------|-------------|
| `items` | `T[]` | Row data |
| All React Aria TableBody props | - | Standard body properties |

#### Column
| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Column name |
| `isRowHeader` | `boolean` | Whether column is a row header |
| `allowsResizing` | `boolean` | Allow column resizing |
| All React Aria Column props | - | Standard column properties |

#### Row
| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Row identifier |
| `columns` | `T[]` | Column definitions |
| All React Aria Row props | - | Standard row properties |

#### Cell
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Cell props | - | Standard cell properties |

### Example
```tsx
const columns = [
  { name: "Name", id: "name", isRowHeader: true },
  { name: "Type", id: "type" },
  { name: "Date Modified", id: "date" },
];

const rows = [
  { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
  { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
  { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
  { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
];

<Table aria-label="Files">
  <TableHeader columns={columns}>
    {(column) => (
      <Column isRowHeader={column.isRowHeader}>{column.name}</Column>
    )}
  </TableHeader>
  <TableBody items={rows}>
    {(item) => (
      <Row columns={columns}>
        {(column) => <Cell>{item[column.id as keyof typeof item]}</Cell>}
      </Row>
    )}
  </TableBody>
</Table>

// With sorting and resizing
<Table aria-label="Files">
  <TableHeader columns={columns}>
    {(column) => (
      <Column 
        isRowHeader={column.isRowHeader}
        allowsResizing
      >
        {column.name}
      </Column>
    )}
  </TableHeader>
  <TableBody items={rows}>
    {(item) => (
      <Row columns={columns}>
        {(column) => <Cell>{item[column.id as keyof typeof item]}</Cell>}
      </Row>
    )}
  </TableBody>
</Table>
```

---

## Tabs

Tabbed interface component for organizing content.

### Components
- `Tabs` - Tab container
- `TabList` - List of tab buttons
- `Tab` - Individual tab button
- `TabPanels` - Container for panels
- `TabPanel` - Tab content panel

### Props

#### Tabs
| Prop | Type | Description |
|------|------|-------------|
| `defaultSelectedKey` | `string` | Default selected tab |
| `selectedKey` | `string` | Controlled selected tab |
| `onSelectionChange` | `(key: string) => void` | Selection change handler |
| All React Aria Tabs props | - | Standard tabs properties |

#### TabList
| Prop | Type | Description |
|------|------|-------------|
| `aria-label` | `string` | Accessibility label |
| All React Aria TabList props | - | Standard tablist properties |

#### Tab
| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Tab identifier |
| All React Aria Tab props | - | Standard tab properties |

#### TabPanels
| Prop | Type | Description |
|------|------|-------------|
| All React Aria TabPanels props | - | Standard panels properties |

#### TabPanel
| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Panel identifier |
| All React Aria TabPanel props | - | Standard panel properties |

### Example
```tsx
<Tabs>
  <TabList aria-label="Settings">
    <Tab id="general">General</Tab>
    <Tab id="appearance">Appearance</Tab>
    <Tab id="notifications">Notifications</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="general">General settings</TabPanel>
    <TabPanel id="appearance">Appearance settings</TabPanel>
    <TabPanel id="notifications">Notification settings</TabPanel>
  </TabPanels>
</Tabs>

// Controlled tabs
<Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
  <TabList aria-label="Settings">
    <Tab id="general">General</Tab>
    <Tab id="appearance">Appearance</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="general">General settings</TabPanel>
    <TabPanel id="appearance">Appearance settings</TabPanel>
  </TabPanels>
</Tabs>
```

---

## Tag / TagGroup

Tag component for displaying categories and labels.

### Components
- `TagGroup` - Tag container with label and validation
- `Tag` - Individual tag

### Props

#### TagGroup
| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Group label |
| `description` | `string` | Helper text |
| `errorMessage` | `string \| (validation: ValidationResult) => string` | Error message |
| `items` | `Iterable<T>` | Items to render |
| `children` | `ReactNode \| ((item: T) => ReactNode)` | Items renderer |
| `selectionMode` | `"none" \| "single" \| "multiple"` | Selection mode |
| `selectedKeys` | `Selection` | Selected keys |
| `onSelectionChange` | `(keys: Selection) => void` | Selection change handler |
| `onRemove` | `(keys: Set<string>) => void` | Remove callback |
| `renderEmptyState` | `(props) => ReactNode` | Custom empty state |
| All React Aria TagGroup props | - | Standard taggroup properties |

#### Tag
| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Tag identifier |
| `children` | `ReactNode` | Tag content |
| All React Aria Tag props | - | Standard tag properties |

### Example
```tsx
<TagGroup label="Categories">
  <Tag>News</Tag>
  <Tag>Travel</Tag>
  <Tag>Gaming</Tag>
  <Tag>Shopping</Tag>
</TagGroup>

// With removal
const [tags, setTags] = useState([
  { id: 1, name: "Tag 1" },
  { id: 2, name: "Tag 2" },
]);

<TagGroup
  label="With removal"
  items={tags}
  onRemove={(keys) => setTags(tags.filter(t => !keys.has(String(t.id))))}
>
  {(item) => <Tag>{item.name}</Tag>}
</TagGroup>

// Selectable tags
const [selected, setSelected] = useState(new Set());

<TagGroup
  label="Selectable"
  selectionMode="multiple"
  selectedKeys={selected}
  onSelectionChange={setSelected}
>
  <Tag id="option1">Option 1</Tag>
  <Tag id="option2">Option 2</Tag>
  <Tag id="option3">Option 3</Tag>
</TagGroup>

// With empty state
<TagGroup
  label="With empty state"
  items={emptyList}
  renderEmptyState={() => <div className="text-sm">No tags</div>}
>
  {(item) => <Tag>{item.name}</Tag>}
</TagGroup>
```

---

## Textarea

Multiline text input component with error state support.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `error` | `string` | Error message string |
| `className` | `string` | Additional CSS classes |
| All React Aria TextArea props | - | Standard textarea properties |

### Example
```tsx
<Textarea placeholder="Write something..." />
<Textarea value="This is a filled textarea with some content." />
<Textarea value="This is invalid" error="Invalid input" />
<Textarea rows={4} placeholder="Enter a longer message" />
```

---

## Toast

Toast notification system for displaying transient messages.

### Components
- `MyToastRegion` - Toast container (render once in app)
- `MyToast` - Individual toast

### API
- `queue` - Toast queue instance for adding toasts

### Methods

#### queue.add()
Adds a new toast to the queue.

**Parameters:**
- `content` - Toast content object
  - `title` (string) - Toast title
  - `description` (string, optional) - Toast description
- `options` (object, optional)
  - `timeout` (number) - Auto-dismiss timeout in ms

### Example
```tsx
// Render once in your app (e.g., in __root.tsx)
<MyToastRegion />

// Add toasts anywhere
queue.add({
  title: "Files uploaded",
  description: "3 files uploaded successfully.",
})

queue.add(
  { title: "Update available" },
  { timeout: 5000 }
)

queue.add({
  title: "Title only",
})
```

---

## Tooltip

Tooltip component for displaying contextual information.

### Components
- `TooltipTrigger` - Trigger wrapper
- `Tooltip` - Tooltip content

### Props

#### TooltipTrigger
| Prop | Type | Description |
|------|------|-------------|
| `delay` | `number` | Show delay in milliseconds |
| `closeDelay` | `number` | Close delay in milliseconds |
| All React Aria TooltipTrigger props | - | Standard trigger properties |

#### Tooltip
| Prop | Type | Description |
|------|------|-------------|
| All React Aria Tooltip props | - | Standard tooltip properties |

### Example
```tsx
<TooltipTrigger>
  <Button aria-label="Edit">
    <Edit size={18} />
  </Button>
  <Tooltip>Edit</Tooltip>
</TooltipTrigger>

<TooltipTrigger>
  <Button aria-label="Save">
    <Save size={18} />
  </Button>
  <Tooltip>Save changes</Tooltip>
</TooltipTrigger>

<TooltipTrigger>
  <Button aria-label="Info">
    <Info size={18} />
  </Button>
  <Tooltip>
    This is a longer tooltip with more information about the action.
  </Tooltip>
</TooltipTrigger>

<TooltipTrigger delay={0} closeDelay={0}>
  <Button variant="secondary">Quick tooltip</Button>
  <Tooltip>Appears immediately</Tooltip>
</TooltipTrigger>
```

---

## Utility Functions

### cn()

Utility function for merging Tailwind CSS classes with conditional classes.

```tsx
import { cn } from "#/utils/classname";

// Basic usage
className={cn("base-class", className)}

// Conditional classes
className={cn(
  "base-class",
  isActive && "active-class",
  isError && "error-class"
)}

// Multiple classes
className={cn("class1", "class2", "class3")}
```
