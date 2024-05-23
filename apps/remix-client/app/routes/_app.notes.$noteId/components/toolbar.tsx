import { BookmarkIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ToggleButton } from "~/components/ui/toggle-button";
import { Toolbar } from "~/components/ui/toolbar";
import { Form, useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Popover } from "~/components/ui/popover";
import { DialogTrigger } from "react-aria-components";
import { Dialog } from "~/components/ui/dialog";
import { ComboBox, ComboBoxItem } from "~/components/ui/combobox";
import type { BasicEntity } from "@repo/db";
import { NoteLinksSlideOver } from "./links-slideover";

interface EditNoteToolbarProps {
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
	noteId: string;
	folders: BasicEntity[];
}

export function EditNoteToolbar({
	isEditing,
	setIsEditing,
	noteId,
	folders,
}: EditNoteToolbarProps) {
	const fetcher = useFetcher();
	// remap entities from many-to-many structure
	return (
		<Toolbar aria-label="Edit note controls">
			<ToggleButton isSelected={isEditing} onChange={setIsEditing} size="icon">
				<Pencil1Icon />
			</ToggleButton>
			<DialogTrigger>
				<Button variant="ghost" size="icon">
					<BookmarkIcon />
				</Button>
				<Popover>
					<Dialog>
						<fetcher.Form method="POST" className="flex gap-2 items-end">
							<ComboBox
								label="Select Folder"
								name="folderName"
								allowsCustomValue
								items={folders}
							>
								{(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
							</ComboBox>
							<Button size="sm" type="submit">
								Move
							</Button>
						</fetcher.Form>
					</Dialog>
				</Popover>
			</DialogTrigger>
			<NoteLinksSlideOver />
			<Form method="DELETE" action={`/notes/${noteId}`}>
				<Button
					variant="ghost"
					size="icon"
					type="submit"
					className={"hover:text-destructive-10"}
				>
					<TrashIcon />
				</Button>
			</Form>
		</Toolbar>
	);
}
