import { createSession, json, keyMatches, sessionCookie } from "../../../server/auth.js";

export async function onRequestPost({ request, env }) {
  if (!env.DASHBOARD_KEY) return json({ ok: false, error: "Dashboard access is not configured yet" }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
  if (!(await keyMatches(body?.key, env))) return json({ ok: false, error: "This dashboard link is not valid" }, 401);

  return json({ ok: true }, 200, { "set-cookie": sessionCookie(await createSession(env)) });
}
