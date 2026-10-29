export const COOKIE = "hw_session";
const SESSION_SECONDS = 30 * 24 * 60 * 60;

const enc = new TextEncoder();
const toB64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromB64url = (s) => {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
};

const sha256 = async (s) => new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(String(s))));

export async function keyMatches(given, env) {
  if (!env.DASHBOARD_KEY || typeof given !== "string" || !given) return false;
  const [a, b] = await Promise.all([sha256(given), sha256(env.DASHBOARD_KEY)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

const hmacKey = (secret) => crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

export async function createSession(env) {
  const body = toB64url(enc.encode(JSON.stringify({ exp: Date.now() + SESSION_SECONDS * 1000 })));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(env.DASHBOARD_KEY), enc.encode(body)));
  return `${body}.${toB64url(sig)}`;
}

export async function hasSession(request, env) {
  if (!env.DASHBOARD_KEY) return false;
  const raw = (request.headers.get("cookie") || "")
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  const [body, sig] = (raw || "").split(".");
  if (!body || !sig) return false;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(env.DASHBOARD_KEY), fromB64url(sig), enc.encode(body));
    return ok && JSON.parse(new TextDecoder().decode(fromB64url(body))).exp > Date.now();
  } catch {
    return false;
  }
}

export const sessionCookie = (value) => `${COOKIE}=${value}; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
export const clearCookie = () => `${COOKIE}=; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...headers } });
