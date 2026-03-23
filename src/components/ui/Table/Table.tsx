import { ChevronDown, ChevronUp } from "lucide-react";
import type {
	ColumnProps as AriaColumnProps,
	CellProps,
	RowProps,
	TableBodyProps,
	TableHeaderProps,
	TableProps,
} from "react-aria-components";
import {
	Cell as AriaCell,
	Column as AriaColumn,
	Row as AriaRow,
	Table as AriaTable,
	TableBody as AriaTableBody,
	TableHeader as AriaTableHeader,
	Button,
	Collection,
	ColumnResizer,
	useTableOptions,
} from "react-aria-components";
import { Checkbox } from "../Checkbox";

import "./Table.css";

export function Table(props: TableProps) {
	return <AriaTable {...props} className="table" />;
}

interface ColumnProps extends AriaColumnProps {
	allowsResizing?: boolean;
	children?: React.ReactNode;
}

export function Column({ allowsResizing, children, ...props }: ColumnProps) {
	return (
		<AriaColumn {...props}>
			{({ allowsSorting, sortDirection }) => (
				<div className="col-header">
					<span className="col-name">{children}</span>

					{allowsSorting && sortDirection && (
						<span aria-hidden="true" className="col-sort-indicator">
							{sortDirection === "ascending" ? (
								<ChevronUp size={16} />
							) : (
								<ChevronDown size={16} />
							)}
						</span>
					)}

					{allowsResizing && <ColumnResizer className="col-resizer" />}
				</div>
			)}
		</AriaColumn>
	);
}

export function TableHeader<T extends object>({
	columns,
	children,
	...props
}: TableHeaderProps<T>) {
	const { selectionBehavior, selectionMode, allowsDragging } =
		useTableOptions();

	return (
		<AriaTableHeader {...props}>
			{allowsDragging && (
				<AriaColumn
					width={42}
					minWidth={42}
					maxWidth={42}
					className="drag-column"
				/>
			)}

			{selectionBehavior === "toggle" && (
				<AriaColumn
					width={42}
					minWidth={42}
					maxWidth={42}
					className="selection-column"
				>
					{selectionMode === "multiple" && <Checkbox slot="selection" />}
				</AriaColumn>
			)}

			<Collection items={columns}>{children}</Collection>
		</AriaTableHeader>
	);
}

export function Row<T extends object>({
	id,
	columns,
	children,
	...props
}: RowProps<T>) {
	const { selectionBehavior, allowsDragging } = useTableOptions();

	return (
		<AriaRow id={id} {...props}>
			{allowsDragging && (
				<Cell className="drag-cell">
					<Button slot="drag" className="row-drag-handle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m6-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
							></path>
						</svg>
					</Button>
				</Cell>
			)}

			{selectionBehavior === "toggle" && (
				<Cell className="selection-cell">
					<Checkbox slot="selection" />
				</Cell>
			)}

			<Collection items={columns}>{children}</Collection>
		</AriaRow>
	);
}

/* ── TableBody ───────────────────────────────────────────── */

export function TableBody<T extends object>(props: TableBodyProps<T>) {
	return <AriaTableBody {...props} />;
}

/* ── Cell ────────────────────────────────────────────────── */

export function Cell(props: CellProps) {
	return <AriaCell {...props} />;
}
