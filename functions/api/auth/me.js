import { hasSession, json } from "../../../server/auth.js";

export async function onRequestGet({ request, env }) {
  return (await hasSession(request, env)) ? json({ ok: true }) : json({ ok: false }, 401);
}
