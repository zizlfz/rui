import { useDragAndDrop, useListData } from "react-aria-components";
import { Cell, Column, Row, Table, TableBody, TableHeader } from "./Table";

interface Person {
	id: string;
	name: string;
	email: string;
	role: string;
}

export function TableDragDropExample() {
	const list = useListData<Person>({
		initialItems: [
			{ id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
			{ id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
			{ id: "3", name: "Bob Wilson", email: "bob@example.com", role: "User" },
		],
	});

	const { dragAndDropHooks } = useDragAndDrop({
		getItems: (keys) =>
			[...keys].map((key) => {
				const item = list.items.find((i) => i.id === key);
				return { "text/plain": item?.name ?? "" };
			}),
		onReorder(e) {
			if (e.target.dropPosition === "before") {
				list.moveBefore(e.target.key, e.keys);
			} else if (e.target.dropPosition === "after") {
				list.moveAfter(e.target.key, e.keys);
			}
		},
	});

	return (
		<Table aria-label="Reorderable table" dragAndDropHooks={dragAndDropHooks}>
			<TableHeader>
				<Column isRowHeader>Name</Column>
				<Column>Email</Column>
				<Column>Role</Column>
			</TableHeader>
			<TableBody items={list.items}>
				{(item) => (
					<Row id={item.id}>
						<Cell>{item.name}</Cell>
						<Cell>{item.email}</Cell>
						<Cell>{item.role}</Cell>
					</Row>
				)}
			</TableBody>
		</Table>
	);
}
