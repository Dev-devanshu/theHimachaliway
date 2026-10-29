const STATUSES = ["new", "replied", "closed"];
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export async function onRequestPatch({ request, env, params }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id < 1) return json({ ok: false, error: "Invalid id" }, 400);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
  if (!STATUSES.includes(body?.status)) return json({ ok: false, error: "Invalid status" }, 422);

  const { meta } = await env.DB.prepare("UPDATE queries SET status = ? WHERE id = ?").bind(body.status, id).run();
  if (!meta.changes) return json({ ok: false, error: "Not found" }, 404);
  return json({ ok: true, id, status: body.status });
}
