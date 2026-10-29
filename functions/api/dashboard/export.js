import { buildFilter } from "./queries/index.js";

const COLUMNS = ["id", "created_at", "status", "name", "email", "phone", "subject", "message", "country"];

const cell = (v) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function onRequestGet({ request, env }) {
  const { sql, args } = buildFilter(new URL(request.url).searchParams);
  const { results } = await env.DB.prepare(`SELECT ${COLUMNS.join(", ")} FROM queries ${sql} ORDER BY created_at DESC, id DESC`).bind(...args).all();

  const csv = [COLUMNS.join(","), ...results.map((r) => COLUMNS.map((c) => cell(r[c])).join(","))].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(`\uFEFF${csv}`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="himachaliway-queries-${date}.csv"`,
    },
  });
}
