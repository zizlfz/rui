import type {
  ColumnProps as AriaColumnProps,
  RowProps,
  TableHeaderProps,
  TableProps,
  TableBodyProps,
  CellProps,
} from "react-aria-components";
import {
  Button,
  Collection,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  useTableOptions,
  TableBody as AriaTableBody,
  Cell as AriaCell,
  ColumnResizer,
} from "react-aria-components";
import { Checkbox } from "../Checkbox";
import { ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import "./Table.css";

/* ── Table ─────────────────────────────────────────────── */

export function Table(props: TableProps) {
  return <AriaTable {...props} className="table" />;
}

/* ── Column ─────────────────────────────────────────────── */

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

          {allowsSorting && (
            <span aria-hidden="true" className="col-sort-indicator">
              {sortDirection === "ascending" ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </span>
          )}

          {allowsResizing && <ColumnResizer className="col-resizer" />}
        </div>
      )}
    </AriaColumn>
  );
}

/* ── TableHeader ─────────────────────────────────────────── */

export function TableHeader<T extends object>({
  columns,
  children,
  ...props
}: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <AriaTableHeader {...props}>
      {allowsDragging && <AriaColumn width={28} minWidth={28} />}

      {selectionBehavior === "toggle" && (
        <AriaColumn width={36} minWidth={36}>
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </AriaColumn>
      )}

      <Collection items={columns}>{children}</Collection>
    </AriaTableHeader>
  );
}

/* ── Row ─────────────────────────────────────────────────── */

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
        <Cell>
          <Button slot="drag" className="row-drag-handle">
            <GripVertical />
          </Button>
        </Cell>
      )}

      {selectionBehavior === "toggle" && (
        <Cell>
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
