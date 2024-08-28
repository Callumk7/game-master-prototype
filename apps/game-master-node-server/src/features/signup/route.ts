import { Hono } from "hono";
import { generateId } from "lucia";
import { Context } from "~/index";
import { hash } from "@node-rs/argon2";
import { db } from "~/db";
import { users } from "~/db/schema/users";
import { lucia } from "../auth";
import { renderHTMLTemplate } from "~/lib/html";


export const signupRouter = new Hono<Context>();

signupRouter.get("/", async (c) => {
	const session = c.get("session");
	if (session) {
		return c.redirect("/");
	}
	const html = await renderPage();
	return c.html(html, 200);
});

signupRouter.post("/", async (c) => {
	const body = await c.req.parseBody<{
		email: string;
		password: string;
	}>();
	const email: string | null = body.email ?? null;
	if (!email || email.length < 3 || email.length > 31 ) {
		const html = await renderPage({
			username_value: email ?? "",
			error: "Invalid password"
		});
		return c.html(html, 200);
	}
	const password: string | null = body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		const html = await renderPage({
			username_value: email,
			error: "Invalid password"
		});
		return c.html(html, 200);
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateId(15);

	try {
		await db.insert(users).values({
			id: userId,
			email,
			passwordHash
		})
		const session = await lucia.createSession(userId, {});
		c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), { append: true });

		return c.redirect("/");

	} catch (e) {
		console.error(e)
		const html = await renderPage({
			username_value: email,
			error: "An unknown error occurred"
		});
		return c.html(html, 200);
	}
});

async function renderPage(args?: { username_value?: string; error?: string }): Promise<string> {
	return await renderHTMLTemplate("src/features/signup/signup.template.html", {
		username_value: args?.username_value ?? "",
		error: args?.error ?? ""
	});
}
