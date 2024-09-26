import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { characters, charactersInFactions } from "./characters";
import { games } from "./games";
import { notes } from "./notes";
import { users } from "./users";

export const factions = pgTable("factions", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	content: text("content"),
	htmlContent: text("html_content"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull(),
	coverImageUrl: text("cover_image_url"),
	gameId: text("game_id")
		.references(() => games.id)
		.notNull(),
	ownerId: text("owner_id")
		.references(() => users.id)
		.notNull(),
	leaderId: text("leader_id").references(() => characters.id),
});

export const databaseSelectFactionSchema = createSelectSchema(factions);
export type DatabaseFaction = z.infer<typeof databaseSelectFactionSchema>;

export const databaseInsertFactionSchema = createInsertSchema(factions);
export type InsertDatabaseFaction = z.infer<typeof databaseInsertFactionSchema>;

export const factionRelations = relations(factions, ({ one, many }) => ({
	notes: many(notesOnFactions),
	game: one(games, {
		fields: [factions.gameId],
		references: [games.id],
	}),
	owner: one(users, {
		fields: [factions.ownerId],
		references: [users.id],
	}),
	members: many(charactersInFactions)
}));

export const notesOnFactions = pgTable(
	"notes_on_factions",
	{
		noteId: text("note_id")
			.references(() => notes.id)
			.notNull(),
		factionId: text("faction_id")
			.references(() => factions.id)
			.notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.noteId, t.factionId] }),
	}),
);

export const notesOnFactionsRelations = relations(notesOnFactions, ({one}) => ({
	note: one(notes, {
		fields: [notesOnFactions.noteId],
		references: [notes.id]
	}),
	faction: one(factions, {
		fields: [notesOnFactions.factionId],
		references: [factions.id]
	})
}))
