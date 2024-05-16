import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { logger } from "hono/logger";
import { charactersRoute } from "~/routes/characters";
import { factionsRoute } from "./routes/factions";
import { foldersRoute } from "./routes/folders";
import { locationsRoute } from "./routes/locations";
import { notesRoute } from "./routes/notes";
import { racesRoute } from "./routes/races";
import { sessionsRoute } from "./routes/sessions";

export type Bindings = {
	TURSO_CONNECTION_URL: string;
	TURSO_AUTH_TOKEN: string;
	AUTH_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(logger());
app.use(async (c, next) => {
	const auth = bearerAuth({ token: c.env.AUTH_KEY });
	await auth(c, next);
});

app.get("/", (c) => {
	return c.text("YOU DID IT");
});

app.route("/notes", notesRoute);
app.route("/characters", charactersRoute);
app.route("/factions", factionsRoute);
app.route("/sessions", sessionsRoute);
app.route("/locations", locationsRoute);
app.route("/folders", foldersRoute);
app.route("/races", racesRoute);

export default app;
