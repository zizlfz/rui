import { createFileRoute, Link } from "@tanstack/react-router";
import { DialogTrigger, Heading, Text } from "react-aria-components";
import {
	DocAlert,
	DocApiTable,
	DocApiTableRow,
	DocCode,
	DocDemo,
} from "#/components/doc";
import { Alert } from "#/components/ui/Alert";
import { Avatar } from "#/components/ui/Avatar";
import { Box } from "#/components/ui/Box";
import { Breadcrumb, Breadcrumbs } from "#/components/ui/Breadcrumbs";
import { Button } from "#/components/ui/Button";
import {
	Calendar,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridHeader,
	CalendarHeaderCell,
	RangeCalendar,
} from "#/components/ui/Calendar";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardImage,
} from "#/components/ui/Card";
import { Checkbox } from "#/components/ui/Checkbox";
import { CheckboxGroup } from "#/components/ui/CheckboxGroup";
import { ComboBox, ComboBoxItem } from "#/components/ui/ComboBox";
import { DateField, DateInput, DateSegment } from "#/components/ui/DateField";
import { DatePicker } from "#/components/ui/DatePicker";
import { Drawer } from "#/components/ui/Drawer";
import {
	Dropdown,
	DropdownItem,
	DropdownSection,
	DropdownTitle,
	DropdownTrigger,
	SubdropdownTrigger,
} from "#/components/ui/Dropdown";
import { FileTrigger } from "#/components/ui/FileTrigger";
import { Input, TextArea } from "#/components/ui/Input";
import {
	ListBox,
	ListBoxDragDropExample,
	ListBoxItem,
} from "#/components/ui/ListBox";
import { Dialog, Modal } from "#/components/ui/Modal";
import { Pagination } from "#/components/ui/Pagination";
import { Radio, RadioGroup } from "#/components/ui/Radio";
import { Select, SelectItem, SelectListBox } from "#/components/ui/Select";
import { Switch } from "#/components/ui/Switch";
import {
	Cell,
	Column,
	Row,
	Table,
	TableBody,
	TableDragDropExample,
	TableHeader,
} from "#/components/ui/Table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "#/components/ui/Tabs";
import { TimeField } from "#/components/ui/TimeField";

interface MdxModule {
	default: React.ComponentType<{
		components?: Record<string, React.ComponentType<any>>;
	}>;
}

const mdxModules = import.meta.glob<MdxModule>("../components/ui/**/*.mdx", {
	eager: true,
});

function getMdxModule(componentName: string) {
	const key = `../components/ui/${componentName}/${componentName}.mdx`;
	return mdxModules[key]?.default ?? null;
}

const docComponents = {
	DocDemo,
	DocCode,
	DocApiTable,
	DocApiTableRow,
	DocAlert,
	Drawer,
	Modal,
	Dialog,
	Button,
	Breadcrumbs,
	Breadcrumb,
	Alert,
	Avatar,
	Calendar,
	Card,
	Checkbox,
	CheckboxGroup,
	ComboBox,
	ComboBoxItem,
	DatePicker,
	DateField,
	DateInput,
	DateSegment,
	CardImage,
	CardHeader,
	CardBody,
	CardFooter,
	Box,
	Dropdown,
	DropdownItem,
	DropdownSection,
	DropdownTitle,
	DropdownTrigger,
	SubdropdownTrigger,
	FileTrigger,
	Input,
	TextArea,
	Pagination,
	Select,
	SelectItem,
	SelectListBox,
	ListBox,
	ListBoxItem,
	ListBoxDragDropExample,
	Radio,
	RadioGroup,
	RangeCalendar,
	CalendarGrid,
	CalendarGridBody,
	CalendarGridHeader,
	CalendarHeaderCell,
	Switch,
	Table,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	TimeField,
	Column,
	TableDragDropExample,
	TableHeader,
	TableBody,
	Row,
	Cell,
	DialogTrigger,
	Heading,
	Text,
};

export const Route = createFileRoute("/ui/$component")({
	component: ComponentDoc,
});

function ComponentDoc() {
	const { component } = Route.useParams();
	const MdxContent = getMdxModule(component);

	if (!MdxContent) {
		return (
			<main className="flex justify-center grow px-4 lg:px-12">
				<div className="container min-h-full flex items-center justify-center">
					<Box className="p-8 text-center max-w-md">
						<h1 className="text-xl font-semibold mb-2">
							{component} has no documentation
						</h1>
						<p className="text-content-muted mb-6">
							Documentation for this component has not been written yet.
						</p>
						<Link to="/">
							<Button variant="secondary">Back to home</Button>
						</Link>
					</Box>
				</div>
			</main>
		);
	}

	return (
		<main className="flex justify-center grow px-4 lg:px-12">
			<div className="container min-h-full">
				<div className="border-l border-r min-h-full bg-surface">
					<article className="prose prose-sm max-w-none p-6 lg:p-10">
						<MdxContent components={docComponents} />
					</article>
				</div>
			</div>
		</main>
	);
}
