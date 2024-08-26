import {
	json,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { createDrizzleForTurso, getCompleteSession, methodNotAllowed } from "@repo/db";
import { redirect, typedjson, useTypedRouteLoaderData } from "remix-typedjson";
import { extractParam } from "~/lib/zx-util";
import { SessionLayout } from "./session-layout";
import { handleBulkLinkToSession } from "./queries.server";
import { patch } from "~/lib/game-master";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
	const sessionId = extractParam("sessionId", params);

	const db = createDrizzleForTurso(context.cloudflare.env);
	const completeSession = await getCompleteSession(db, sessionId);

	if (!completeSession) {
		return redirect("/sessions");
	}

	return typedjson({ session: completeSession });
};

export const action = async ({ request, params, context }: ActionFunctionArgs) => {
	const sessionId = extractParam("sessionId", params);
	if (request.method === "PUT") {
		return await handleBulkLinkToSession(request, context, sessionId);
	}
	if (request.method === "PATCH") {
		const form = await request.formData();
		await patch(context, `sessions/${sessionId}`, form);
		return json({ sessionId, success: true });
	}
	return methodNotAllowed();
};

export const useSessionRouteData = () => {
	const data = useTypedRouteLoaderData<typeof loader>("routes/_app.sessions.$sessionId");
	if (data === undefined) {
		throw new Error(
			"useSessionRouteData must be used within the _app.sessions.$sessionsId route or it's children",
		);
	}
	return data;
};

export { SessionLayout as default };
