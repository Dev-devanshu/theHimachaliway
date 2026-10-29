import { hasSession, json } from "../../../server/auth.js";

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.DASHBOARD_KEY) return json({ ok: false, error: "Dashboard access is not configured yet" }, 503);
  if (!(await hasSession(request, env))) return json({ ok: false, error: "Please open your dashboard link" }, 401);

  const res = await context.next();
  res.headers.set("cache-control", "no-store");
  return res;
}
