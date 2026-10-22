export async function onRequestPost({ request }) {
  const origin = request.headers.get("Origin");
  if (!origin) return json({ error: "Missing origin" }, 403);
  let originUrl;
  try { originUrl = new URL(origin); } catch { return json({ error: "Invalid origin" }, 403); }
  if (originUrl.protocol !== "https:" || !(originUrl.hostname === "foss-time.pages.dev" || originUrl.hostname.endsWith(".foss-time.pages.dev"))) {
    return json({ error: "Origin not allowed" }, 403);
  }
  if (!(request.headers.get("Content-Type") || "").toLowerCase().includes("application/json")) {
    return json({ error: "Content-Type must be application/json" }, 415);
  }
  const length = Number(request.headers.get("Content-Length") || 0);
  if (length > 1_000_000) return json({ error: "Payload too large" }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  if (!body || typeof body.url !== "string" || !body.payload || typeof body.payload !== "object") {
    return json({ error: "Expected url and payload" }, 400);
  }
  let target;
  try { target = new URL(body.url); } catch { return json({ error: "Invalid webhook URL" }, 400); }
  if (target.protocol !== "https:" || !["hook.us2.make.com", "hook.make.com"].includes(target.hostname) || target.username || target.password) {
    return json({ error: "Only official Make.com webhook URLs are allowed" }, 400);
  }
  try {
    const upstream = await fetch(target.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body.payload)
    });
    if (!upstream.ok) return json({ error: "Make.com returned HTTP " + upstream.status }, 502);
    return json({ ok: true, status: upstream.status });
  } catch {
    return json({ error: "Could not reach Make.com" }, 502);
  }
}
export async function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}
function json(value, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
