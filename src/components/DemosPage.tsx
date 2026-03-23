import { type CalendarDate, parseDate, Time } from "@internationalized/date";
import { Edit, Info, Save } from "lucide-react";
import { useState } from "react";
import {
	DialogTrigger,
	Form,
	Heading,
	type Selection,
	Text,
	useListData,
} from "react-aria-components";
import { Alert } from "#/components/ui/Alert";
import { Avatar } from "#/components/ui/Avatar";
import { Box } from "#/components/ui/Box";
import { Breadcrumb, Breadcrumbs } from "#/components/ui/Breadcrumbs";
import { Button } from "#/components/ui/Button";
import { Calendar } from "#/components/ui/Calendar";
import { Card, CardBody, CardFooter, CardImage } from "#/components/ui/Card";
import { Checkbox } from "#/components/ui/Checkbox/Checkbox";
import { ComboBox, ComboBoxItem } from "#/components/ui/Combobox";
import { DateField, DateInput, DateSegment } from "#/components/ui/DateField";
import { DatePicker } from "#/components/ui/Datepicker";
import { Drawer } from "#/components/ui/Drawer";
import {
	Dropdown,
	DropdownItem,
	DropdownSection,
	DropdownTrigger,
	SubdropdownTrigger,
} from "#/components/ui/Dropdown";
import { FileTrigger } from "#/components/ui/FileTrigger";
import { Label } from "#/components/ui/Form";
import { Input } from "#/components/ui/Input";
import { Modal } from "#/components/ui/Modal";
import { Pagination } from "#/components/ui/Pagination";
import { Progress } from "#/components/ui/Progress";
import { Radio, RadioGroup } from "#/components/ui/Radio";
import { Select, SelectItem } from "#/components/ui/Select";
import {
	SkeletonCircle,
	SkeletonRect,
	SkeletonText,
} from "#/components/ui/Skeleton";
import { Switch } from "#/components/ui/Switch";
import {
	Cell,
	Column,
	Row,
	Table,
	TableBody,
	TableHeader,
} from "#/components/ui/Table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "#/components/ui/Tabs";
import { Tag, TagGroup } from "#/components/ui/Tag";
import { Textarea } from "#/components/ui/Textarea";
import { TimeField } from "#/components/ui/TimeField";
import { MyToastRegion, queue } from "#/components/ui/Toast";

import { Tooltip, TooltipTrigger } from "#/components/ui/Tooltip";
import { DemoBox } from "./DemoBox";

export function DemosPage() {
	return (
		<>
			<MyToastRegion />
			<main className="flex justify-center grow px-4 lg:px-12">
				<div className="container min-h-full">
					<div className="border-l border-r min-h-full bg-border">
						<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-px">
							<DemoBox componentName="Alert">
								<AlertDemo />
							</DemoBox>
							<DemoBox componentName="Avatar">
								<AvatarDemo />
							</DemoBox>
							<DemoBox componentName="Box">
								<Box>Box</Box>
							</DemoBox>
							<DemoBox componentName="Card">
								<CardDemo />
							</DemoBox>
							<DemoBox componentName="Breadcrumbs">
								<div className="flex flex-col gap-4">
									<Breadcrumbs>
										<Breadcrumb href="#">Home</Breadcrumb>
										<Breadcrumb href="#">Components</Breadcrumb>
										<Breadcrumb>Breadcrumbs</Breadcrumb>
									</Breadcrumbs>
								</div>
							</DemoBox>
							<DemoBox componentName="Button">
								<div className="flex flex-col items-center gap-2">
									<Button>Default Button</Button>
									<Button variant="primary">Primary Button</Button>
									<Button isPending>Pending</Button>
								</div>
							</DemoBox>
							<DemoBox componentName="Calendar">
								<CalendarDemo />
							</DemoBox>
							<DemoBox componentName="Checkbox">
								<div className="flex flex-col gap-2">
									<Checkbox>Default checkbox</Checkbox>
									<Checkbox isSelected>Selected checkbox</Checkbox>
									<Checkbox isIndeterminate>Indeterminate checkbox</Checkbox>
									<Checkbox isDisabled>Disabled checkbox</Checkbox>
									<Checkbox aria-invalid="true">Invalid checkbox</Checkbox>
								</div>
							</DemoBox>
							<DemoBox componentName="ComboBox">
								<div className="flex flex-col gap-2" style={{ width: "200px" }}>
									<ComboBox label="Animal" placeholder="Select an animal">
										<ComboBoxItem id="aardvark">Aardvark</ComboBoxItem>
										<ComboBoxItem id="cat">Cat</ComboBoxItem>
										<ComboBoxItem id="dog">Dog</ComboBoxItem>
										<ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
										<ComboBoxItem id="panda">Panda</ComboBoxItem>
										<ComboBoxItem id="snake">Snake</ComboBoxItem>
									</ComboBox>
									<ComboBox
										label="Disabled"
										isDisabled
										placeholder="Disabled combobox"
									>
										<ComboBoxItem id="option1">Option 1</ComboBoxItem>
										<ComboBoxItem id="option2">Option 2</ComboBoxItem>
									</ComboBox>
								</div>
							</DemoBox>
							<DemoBox componentName="DatePicker">
								<DatepickerDemo />
							</DemoBox>
							<DemoBox componentName="DateField">
								<DateFieldDemo />
							</DemoBox>
							<DemoBox componentName="TimeField">
								<TimeFieldDemo />
							</DemoBox>
							<DemoBox componentName="Dropdown">
								<DropdownDemo />
							</DemoBox>
							<DemoBox componentName="FileTrigger">
								<FileTriggerDemo />
							</DemoBox>
							<DemoBox componentName="Pagination">
								<PaginationDemo />
							</DemoBox>
							<DemoBox componentName="Progress">
								<ProgressDemo />
							</DemoBox>
							<DemoBox componentName="Input">
								<div className="flex flex-col gap-2" style={{ width: "200px" }}>
									<Input placeholder="Placeholder" />
									<Input value="Filled with words" />
									<Input value="Invalid" aria-invalid="true" />
								</div>
							</DemoBox>
							<DemoBox componentName="Modal">
								<ModalDemo />
							</DemoBox>
							<DemoBox componentName="Drawer">
								<DrawerDemo />
							</DemoBox>
							<DemoBox componentName="Radio">
								<div className="flex flex-col gap-4">
									<RadioGroup label="Favorite pet">
										<Radio value="cat">Cat</Radio>
										<Radio value="dragon">Dragon</Radio>
									</RadioGroup>
									<RadioGroup label="Disabled" isDisabled>
										<Radio value="option1">Option 1</Radio>
										<Radio value="option2">Option 2</Radio>
									</RadioGroup>
								</div>
							</DemoBox>
							<DemoBox componentName="Select">
								<div className="flex flex-col gap-2" style={{ width: "200px" }}>
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
								</div>
							</DemoBox>
							<DemoBox componentName="Switch">
								<SwitchDemo />
							</DemoBox>
							<DemoBox componentName="Skeleton">
								<SkeletonDemo />
							</DemoBox>
							<DemoBox componentName="Table">
								<TableDemo />
							</DemoBox>
							<DemoBox componentName="Tabs">
								<TabsDemo />
							</DemoBox>
							<DemoBox componentName="Tag">
								<TagGroupDemo />
							</DemoBox>
							<DemoBox componentName="Textarea">
								<div className="flex flex-col gap-2" style={{ width: "200px" }}>
									<Textarea placeholder="Write something..." />
									<Textarea value="This is a filled textarea with some content." />
									<Textarea value="This is invalid" aria-invalid="true" />
								</div>
							</DemoBox>
							<DemoBox componentName="Toast">
								<ToastDemo />
							</DemoBox>

							<DemoBox componentName="Tooltip">
								<div className="flex flex-col gap-4">
									<div className="flex gap-4">
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
												This is a longer tooltip with more information about the
												action.
											</Tooltip>
										</TooltipTrigger>
									</div>
									<TooltipTrigger delay={0} closeDelay={0}>
										<Button variant="secondary">Quick tooltip</Button>
										<Tooltip>Appears immediately</Tooltip>
									</TooltipTrigger>
								</div>
							</DemoBox>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

function AlertDemo() {
	return (
		<div className="flex flex-col gap-3">
			<Alert variant="info" title="Information" dismissible>
				This is an informational alert message that provides context.
			</Alert>
		</div>
	);
}

function AvatarDemo() {
	return (
		<div className="flex flex-col gap-4 items-center">
			<div className="flex items-center gap-4">
				<Avatar
					src="https://i.pravatar.cc/150?img=12"
					fallback="JD"
					size="sm"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=12"
					fallback="JD"
					size="md"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=12"
					fallback="JD"
					size="lg"
				/>
			</div>
		</div>
	);
}

function CalendarDemo() {
	const [date, setDate] = useState<CalendarDate | null>(
		parseDate("2025-02-03"),
	);

	return (
		<div className="flex flex-col gap-4">
			<Calendar value={date} onChange={setDate} />
		</div>
	);
}

function DatepickerDemo() {
	const [date, setDate] = useState<CalendarDate | null>(
		parseDate("2025-02-03"),
	);

	return (
		<div className="flex flex-col gap-2" style={{ width: "240px" }}>
			<DatePicker label="With value" value={date} onChange={setDate} />
			<DatePicker
				label="Error state"
				errorMessage="Please select a valid date"
				isInvalid
			/>
			<DatePicker label="Disabled" isDisabled />
		</div>
	);
}

function DateFieldDemo() {
	const [date, setDate] = useState<CalendarDate | null>(
		parseDate("2025-02-03"),
	);

	return (
		<div className="flex flex-col gap-4">
			<DateField
				value={date}
				onChange={(v) => setDate(v as CalendarDate | null)}
			>
				<Label>Birth date</Label>
				<DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
			</DateField>
			<div className="flex flex-col gap-1">
				<Label>Disabled</Label>
				<DateField isDisabled defaultValue={parseDate("2025-02-03")}>
					<DateInput>
						{(segment) => <DateSegment segment={segment} />}
					</DateInput>
				</DateField>
			</div>
		</div>
	);
}

function TimeFieldDemo() {
	const [time, setTime] = useState<Time | null>(new Time(11, 45));

	return (
		<div className="flex flex-col gap-4">
			<TimeField label="Appointment time" value={time} onChange={setTime} />
			<TimeField label="Disabled" isDisabled defaultValue={new Time(9, 30)} />
		</div>
	);
}

function DropdownDemo() {
	return (
		<div className="flex flex-col gap-4 pb-32 pr-10">
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
					<DropdownItem id="delete" style={{ color: "var(--color-danger)" }}>
						Delete
					</DropdownItem>
				</Dropdown>
			</DropdownTrigger>
		</div>
	);
}

function FileTriggerDemo() {
	const [files, setFiles] = useState<string[]>([]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-center">
				<FileTrigger
					onSelect={(e) => {
						const selectedFiles = e ? Array.from(e) : [];
						const filenames = selectedFiles.map((file) => file.name);
						setFiles(filenames);
					}}
				>
					<Button>Select a file</Button>
				</FileTrigger>
			</div>
			{files.length > 0 && (
				<div className="text-sm text-foreground/60">
					Selected: {files.join(", ")}
				</div>
			)}
		</div>
	);
}

function ModalDemo() {
	return (
		<DialogTrigger>
			<Button>Open Modal</Button>
			<Modal isDismissable>
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
			</Modal>
		</DialogTrigger>
	);
}

function DrawerDemo() {
	return (
		<DialogTrigger>
			<Button>Open Drawer</Button>
			<Drawer noOverlay>
				<Heading slot="title">Drawer Title</Heading>
				<p>
					This is a drawer component that slides in from the right side of the
					screen. It can contain any content you want.
				</p>
				<div className="flex gap-2">
					<Button slot="close" variant="secondary">
						Cancel
					</Button>
					<Button slot="close">Confirm</Button>
				</div>
			</Drawer>
		</DialogTrigger>
	);
}

function SwitchDemo() {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className="flex flex-col gap-3">
			<Switch>Default switch</Switch>
			<Switch isSelected>Selected switch</Switch>
			<Switch isDisabled>Disabled switch</Switch>
			<Switch isSelected={enabled} onChange={setEnabled}>
				Controlled: {enabled ? "On" : "Off"}
			</Switch>
		</div>
	);
}

function SkeletonDemo() {
	return (
		<Box>
			<div className="flex gap-3 min-w-3xs">
				<SkeletonCircle size={40} />
				<div className="flex flex-col gap-2 flex-1">
					<SkeletonRect width="100%" height={16} />
					<SkeletonText lines={2} />
				</div>
			</div>
		</Box>
	);
}

function TableDemo() {
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
	] as const;

	return (
		<div className="flex flex-col gap-4" style={{ width: "100%" }}>
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
		</div>
	);
}

function TabsDemo() {
	return (
		<Tabs>
			<TabList aria-label="Settings">
				<Tab id="general">General</Tab>
				<Tab id="appearance">Appearance</Tab>
				<Tab id="notifications">Notifications</Tab>
			</TabList>
			<TabPanels>
				<TabPanel id="general">General</TabPanel>
				<TabPanel id="appearance">Appearance</TabPanel>
				<TabPanel id="notifications">Notification</TabPanel>
			</TabPanels>
		</Tabs>
	);
}

function TagGroupDemo() {
	const removableTags = useListData({
		initialItems: [
			{ id: 1, name: "Removable 1" },
			{ id: 2, name: "Removable 2" },
			{ id: 3, name: "Removable 3" },
		],
	});

	const [selected, setSelected] = useState<Selection>(new Set());

	return (
		<div className="flex flex-col gap-6">
			<TagGroup label="Categories">
				<Tag>News</Tag>
				<Tag>Travel</Tag>
				<Tag>Gaming</Tag>
				<Tag>Shopping</Tag>
			</TagGroup>

			<TagGroup
				label="With removal"
				items={removableTags.items}
				onRemove={(keys) => removableTags.remove(...keys)}
				renderEmptyState={() => (
					<div className="text-muted-foreground text-sm">No tags</div>
				)}
			>
				{(item) => <Tag>{item.name}</Tag>}
			</TagGroup>

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
		</div>
	);
}

function ToastDemo() {
	return (
		<div className="flex flex-col gap-2">
			<Button
				onPress={() =>
					queue.add({
						title: "Files uploaded",
						description: "3 files uploaded successfully.",
					})
				}
			>
				Show Toast
			</Button>
			<Button
				variant="secondary"
				onPress={() =>
					queue.add(
						{
							title: "Update available",
							description: "A new version is ready to install.",
						},
						{ timeout: 5000 },
					)
				}
			>
				With Timeout
			</Button>
			<Button
				variant="secondary"
				onPress={() =>
					queue.add({
						title: "Update available",
					})
				}
			>
				Title Only
			</Button>
		</div>
	);
}

function PaginationDemo() {
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const totalItems = 243;

	return (
		<div className="flex flex-col gap-6 py-8">
			<Pagination
				totalItems={totalItems}
				pageSize={pageSize}
				currentPage={page}
				onPageChange={setPage}
				pageSizeOptions={[10, 25, 50, 100]}
			/>
		</div>
	);
}

function ProgressDemo() {
	return (
		<div className="flex flex-col gap-2 min-w-3xs">
			<Progress value={50} variant="default" />
			<Progress value={60} variant="success" />
			<Progress value={70} variant="warning" />
			<Progress value={80} variant="error" />
		</div>
	);
}

function CardDemo() {
	return (
		<div className="max-w-2xs">
			<Card>
				<CardImage
					src="/card-image.jpg"
					alt="Mountain landscape"
					aspectRatio="16/9"
				/>
				<CardBody>
					<Text>
						This card shows an image at the top that bleeds to the card edges.
					</Text>
				</CardBody>
				<CardFooter>
					<Button>Learn More</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
