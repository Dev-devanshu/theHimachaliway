const LIMITS = { name: 100, email: 200, phone: 20, subject: 200, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d]?[0-9\s-]{6,20}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export function validate(input) {
  const v = {};
  for (const k of Object.keys(LIMITS)) v[k] = typeof input?.[k] === "string" ? input[k].trim() : "";

  const errors = {};
  if (v.name.length < 2) errors.name = "Please enter at least 2 characters";
  if (!EMAIL.test(v.email)) errors.email = "Enter a valid email";
  if (v.phone && !PHONE.test(v.phone)) errors.phone = "Enter a valid phone number";
  if (v.subject.length < 2) errors.subject = "Please add a subject";
  if (v.message.length < 10) errors.message = "Please enter at least 10 characters";
  for (const [k, max] of Object.entries(LIMITS)) if (v[k].length > max) errors[k] = `Must be under ${max} characters`;

  return { values: v, errors };
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  if (body?.website) return json({ ok: true }, 201);

  const { values, errors } = validate(body);
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  try {
    const { meta } = await env.DB.prepare(
      "INSERT INTO queries (name, email, phone, subject, message, country) VALUES (?, ?, ?, ?, ?, ?)",
    )
      .bind(values.name, values.email, values.phone || null, values.subject, values.message, request.cf?.country || null)
      .run();
    return json({ ok: true, id: meta.last_row_id }, 201);
  } catch (err) {
    console.error("contact insert failed", err);
    return json({ ok: false, error: "Could not save your message" }, 500);
  }
}

export const onRequest = () => json({ ok: false, error: "Method not allowed" }, 405);
