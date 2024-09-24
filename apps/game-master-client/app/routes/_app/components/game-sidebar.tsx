import { FilePlusIcon, PlusIcon } from "@radix-ui/react-icons";
import type { BasicEntity, EntityType, Game, GameWithData } from "@repo/api";
import { Group } from "react-aria-components";
import { SignoutButton } from "~/components/signout";
import { Link } from "~/components/ui/link";
import { JollyMenu, MenuItem } from "~/components/ui/menu";
import {
	Select,
	SelectItem,
	SelectListBox,
	SelectPopover,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useSyncSelectedGameWithParams } from "./sync-selected-game";
import { Text } from "~/components/ui/typeography";

interface GameSidebarProps {
	gamesWithAllEntities: GameWithData[];
}

export function GameSidebar({ gamesWithAllEntities }: GameSidebarProps) {
	const { selectedGame, updateSelection } = useSyncSelectedGameWithParams();

	const { gameNotes, gameChars, gameFactions } = findGameEntities(
		gamesWithAllEntities,
		selectedGame,
	);

	return (
		<aside className="w-64 border-r fixed h-full overflow-y-auto p-4 space-y-4">
			<SignoutButton />
			<SidebarTools
				games={gamesWithAllEntities}
				selectedGame={selectedGame}
				setSelectedGame={updateSelection}
			/>
			<div className="flex flex-col items-start space-y-4 divide-y w-full">
				<EntityGroup
					title="Notes"
					items={gameNotes}
					itemType="notes"
					selectedGame={selectedGame}
				/>
				<EntityGroup
					title="Characters"
					items={gameChars}
					itemType="characters"
					selectedGame={selectedGame}
				/>
				<EntityGroup
					title="Factions"
					items={gameFactions}
					itemType="factions"
					selectedGame={selectedGame}
				/>
			</div>
		</aside>
	);
}

const findGameEntities = (gamesWithAllEntities: GameWithData[], selectedGame: string) => {
	const gameNotes = gamesWithAllEntities.find((game) => game.id === selectedGame)?.notes;
	const gameChars = gamesWithAllEntities.find(
		(game) => game.id === selectedGame,
	)?.characters;
	const gameFactions = gamesWithAllEntities.find(
		(game) => game.id === selectedGame,
	)?.factions;

	return {
		gameNotes,
		gameChars,
		gameFactions,
	};
};

interface EntityGroupProps {
	title: string;
	items: BasicEntity[] | undefined;
	selectedGame: string;
	itemType: EntityType;
}

export function EntityGroup({ title, items, selectedGame, itemType }: EntityGroupProps) {
	return (
		<div className="w-full py-1">
			<Text variant={"label"} id="title">
				{title}
			</Text>
			<Group className={"flex flex-col gap-y-2 items-start"} aria-labelledby="title">
				{items?.map((note) => (
					<Link
						key={note.id}
						variant={"link"}
						href={`/games/${selectedGame}/${itemType}/${note.id}`}
						className={"text-wrap h-fit pl-0"}
					>
						{note.name}
					</Link>
				))}
			</Group>
		</div>
	);
}

interface SidebarToolsProps {
	selectedGame: string;
	setSelectedGame: (key: string) => void;
	games: Game[];
}

function SidebarTools({ selectedGame, setSelectedGame, games }: SidebarToolsProps) {
	return (
		<Group className={"flex gap-2 w-full"} aria-label="Game tools">
			<Select
				selectedKey={selectedGame}
				onSelectionChange={(key) => setSelectedGame(key.toString())}
				className={"flex-1 min-w-0"}
				aria-label="Game select dropdown"
			>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectPopover>
					<SelectListBox items={games}>
						{(item) => <SelectItem href={`/games/${item.id}`}>{item.name}</SelectItem>}
					</SelectListBox>
				</SelectPopover>
			</Select>
			<NewEntityMenu selectedGame={selectedGame} />
		</Group>
	);
}

interface NewEntityMenuProps {
	selectedGame: string;
}
function NewEntityMenu({ selectedGame }: NewEntityMenuProps) {
	return (
		<JollyMenu
			label={<FilePlusIcon />}
			size={"icon"}
			variant={"outline"}
			aria-label="New item menu"
		>
			<MenuItem href={"/games/new"}>Game</MenuItem>
			<MenuItem href={`/games/${selectedGame}/notes/new`}>Note</MenuItem>
			<MenuItem href={`/games/${selectedGame}/characters/new`}>Character</MenuItem>
			<MenuItem href={`/games/${selectedGame}/factions/new`}>Faction</MenuItem>
		</JollyMenu>
	);
}
