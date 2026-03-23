import type { ReactNode } from "react";
import "./DocApiTable.css";

interface DocApiTableProps {
	children: ReactNode;
}

interface DocApiTableRowProps {
	name: string;
	type: string;
	default?: string;
	description: string;
}

export function DocApiTable({ children }: DocApiTableProps) {
	return (
		<div className="doc-api-table-wrapper">
			<table className="doc-api-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
}

export function DocApiTableRow({
	name,
	type,
	default: defaultValue,
	description,
}: DocApiTableRowProps) {
	return (
		<tr>
			<td>
				<code className="doc-api-table__name">{name}</code>
			</td>
			<td>
				<code className="doc-api-table__type">{type}</code>
			</td>
			<td>
				{defaultValue ? (
					<code className="doc-api-table__default">{defaultValue}</code>
				) : (
					<span className="doc-api-table__empty">—</span>
				)}
			</td>
			<td className="doc-api-table__desc">{description}</td>
		</tr>
	);
}
