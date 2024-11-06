import type { CharacterWithFaction } from "@repo/api";
import {
  type SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { characterHref, factionHref } from "~/util/generate-hrefs";
import { Toolbar } from "../ui/toolbar";
import { Button } from "../ui/button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useSubmit } from "@remix-run/react";
import { EditCharacterDialog } from "~/routes/_app.games.$gameId.characters.$charId/components/edit-character-dialog";

interface CharacterTableProps {
  characters: CharacterWithFaction[];
}
export function CharacterTable({ characters }: CharacterTableProps) {
  const [isEditCharacterDialogOpen, setIsEditCharacterDialogOpen] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const selectedChar = characters.find((char) => char.id === selectedCharId);
  const table = useCharacterTable({
    data: characters,
    setIsEditCharacterDialogOpen,
    setSelectedCharId,
  });

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {selectedChar && (
        <EditCharacterDialog
          character={selectedChar}
          isOpen={isEditCharacterDialogOpen}
          setIsOpen={setIsEditCharacterDialogOpen}
        />
      )}
    </>
  );
}

const h = createColumnHelper<CharacterWithFaction>();

const useCharacterTable = ({
  data,
  setIsEditCharacterDialogOpen,
  setSelectedCharId,
}: {
  data: CharacterWithFaction[];
  setIsEditCharacterDialogOpen: (isOpen: boolean) => void;
  setSelectedCharId: (charId: string) => void;
}) => {
  const submit = useSubmit();
  const handleEdit = (charId: string) => {
    setSelectedCharId(charId);
    setIsEditCharacterDialogOpen(true);
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: Stable reference
  const columns = useMemo(() => {
    return [
      h.accessor("name", {
        header: "Name",
        cell: ({ cell, row }) => (
          <Link
            href={characterHref(row.original.gameId, row.original.id)}
            variant={"link"}
          >
            {cell.getValue()}
          </Link>
        ),
      }),
      h.accessor("race", {
        header: "Race",
        cell: ({ cell }) => cell.getValue(),
      }),
      h.accessor("class", {
        header: "Class",
        cell: ({ cell }) => cell.getValue(),
      }),
      h.accessor("level", {
        header: "Level",
        cell: ({ cell }) => cell.getValue(),
      }),
      h.accessor("primaryFaction.name", {
        header: "Primary Faction",
        cell: ({ cell, row }) => {
          if (row.original.primaryFaction) {
            return (
              <Link
                variant={"link"}
                href={factionHref(row.original.gameId, row.original.primaryFaction?.id)}
              >
                {cell.getValue()}
              </Link>
            );
          }
        },
      }),
      h.display({
        id: "controls",
        header: "Controls",
        cell: ({ row }) => (
          <Toolbar>
            <Button
              variant={"outline"}
              size={"icon"}
              onPress={() => handleEdit(row.original.id)}
            >
              <Pencil2Icon />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              onPress={() => submit({ charId: row.original.id }, { method: "DELETE" })}
            >
              <TrashIcon />
            </Button>
          </Toolbar>
        ),
      }),
    ];
  }, []);

  const [sorting, setSorting] = useState<SortingState>([]);
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });
};
