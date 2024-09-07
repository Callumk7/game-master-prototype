import { Id, Note } from "@repo/shared-types";
import { Client } from ".";

export class Notes {
	constructor(private client: Client) {}

	// GET REQUESTS
	async getNote(id: string): Promise<Note> {
		return this.client.get<Note>(`notes/${id}`);
	}

	async getAllGameNotes(gameId: string): Promise<Note[]> {
		return this.client.get<Note[]>(`games/${gameId}/notes`);
	}

	async getUserNotesForGame(gameId: Id, userId: Id): Promise<Note[]> {
		return this.client.get<Note[]>(`games/${gameId}/users/${userId}/notes`);
	}

	// POST REQUESTS
	async createNote(gameId: Id, ownerId: Id): Promise<CreateNoteResponse> {
		return this.client.post<CreateNoteResponse>("notes", { gameId, ownerId });
	}
}
