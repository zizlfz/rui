import { useDragAndDrop, useListData } from "react-aria-components";
import { ListBox, ListBoxItem } from "./ListBox";

interface Item {
	id: number;
	name: string;
}

export function ListBoxDragDropExample() {
	const list = useListData<Item>({
		initialItems: [
			{ id: 1, name: "Adobe Photoshop" },
			{ id: 2, name: "Adobe XD" },
			{ id: 3, name: "Adobe Dreamweaver" },
			{ id: 4, name: "Adobe InDesign" },
			{ id: 5, name: "Adobe Connect" },
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
		<ListBox
			aria-label="Reorderable list"
			selectionMode="multiple"
			items={list.items}
			dragAndDropHooks={dragAndDropHooks}
			style={{ width: "200px" }}
		>
			{(item) => <ListBoxItem>{item.name}</ListBoxItem>}
		</ListBox>
	);
}
