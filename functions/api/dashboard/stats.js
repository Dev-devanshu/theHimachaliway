const IST = "'+330 minutes'";
const IST_TODAY = "datetime('now', '+330 minutes', 'start of day', '-330 minutes')";

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export async function onRequestGet({ env }) {
  const [daily, totals] = await env.DB.batch([
    env.DB.prepare(
      `SELECT date(created_at, ${IST}) AS day, COUNT(*) AS n
       FROM queries
       WHERE created_at >= datetime(${IST_TODAY}, '-29 days')
       GROUP BY day ORDER BY day`,
    ),
    env.DB.prepare(
      `SELECT
        SUM(created_at >= ${IST_TODAY}) AS today,
        SUM(created_at >= datetime(${IST_TODAY}, '-1 day') AND created_at < ${IST_TODAY}) AS yesterday,
        SUM(created_at >= datetime(${IST_TODAY}, '-6 days')) AS week,
        SUM(created_at >= datetime(${IST_TODAY}, '-13 days') AND created_at < datetime(${IST_TODAY}, '-6 days')) AS prevWeek
      FROM queries`,
    ),
  ]);

  const t = totals.results[0];
  return json({
    ok: true,
    daily: daily.results,
    today: t.today || 0,
    yesterday: t.yesterday || 0,
    week: t.week || 0,
    prevWeek: t.prevWeek || 0,
  });
}
