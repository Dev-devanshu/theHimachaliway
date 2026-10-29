const PAGE_SIZE = 25;
const STATUSES = ["new", "replied", "closed"];

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export function buildFilter(params) {
  const where = [];
  const args = [];
  const status = params.get("status");
  if (STATUSES.includes(status)) {
    where.push("status = ?");
    args.push(status);
  }
  const q = (params.get("q") || "").trim().slice(0, 100);
  if (q) {
    where.push("(name LIKE ? OR email LIKE ? OR phone LIKE ? OR subject LIKE ? OR message LIKE ?)");
    args.push(...Array(5).fill(`%${q}%`));
  }
  return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", args };
}

export async function onRequestGet({ request, env }) {
  const params = new URL(request.url).searchParams;
  const page = Math.max(1, parseInt(params.get("page"), 10) || 1);
  const { sql, args } = buildFilter(params);

  const [items, total, counts] = await env.DB.batch([
    env.DB.prepare(`SELECT * FROM queries ${sql} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`).bind(...args, PAGE_SIZE, (page - 1) * PAGE_SIZE),
    env.DB.prepare(`SELECT COUNT(*) AS n FROM queries ${sql}`).bind(...args),
    env.DB.prepare(
      `SELECT COUNT(*) AS total,
        SUM(status = 'new') AS new,
        SUM(status = 'replied') AS replied,
        SUM(status = 'closed') AS closed,
        SUM(created_at >= datetime('now', '+330 minutes', 'start of day', '-330 minutes')) AS today,
        SUM(created_at >= datetime('now', '+330 minutes', 'start of day', '-330 minutes', '-6 days')) AS week
      FROM queries`,
    ),
  ]);

  const c = counts.results[0];
  return json({
    ok: true,
    items: items.results,
    total: total.results[0].n,
    page,
    pageSize: PAGE_SIZE,
    counts: Object.fromEntries(Object.entries(c).map(([k, v]) => [k, v || 0])),
  });
}
