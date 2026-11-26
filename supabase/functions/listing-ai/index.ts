// Supabase Edge Function: listing-ai
// POST { image_base64, mime_type, hint_name?, hint_category? }
// -> { name, price, description, condition, summary }
// Wymaga secreta: GEMINI_API_KEY (supabase secrets set GEMINI_API_KEY=...)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const MODEL = "gemini-2.0-flash";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  if (!GEMINI_KEY) return json({ error: "GEMINI_API_KEY not configured" }, 500);

  let payload: { image_base64?: string; mime_type?: string; hint_name?: string; hint_category?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!payload.image_base64) return json({ error: "image_base64 required" }, 400);

  const prompt = `Jesteś ekspertem od wyceny technologii używanej i nowych. Na zdjęciu jest produkt do sprzedania w polskim e-sklepie technologicznym RECYKTRONIX.
${payload.hint_name ? `Podpowiedź nazwy: ${payload.hint_name}. ` : ""}${payload.hint_category ? `Kategoria: ${payload.hint_category}. ` : ""}
Odpowiedz WYŁĄCZNIE poprawnym JSON-em (bez markdown, bez komentarzy) w formacie:
{"name":"krótka nazwa produktu po polsku","price":liczba_w_EUR,"condition":"new" lub "used","description":"opis 2-3 zdania po polsku, co to jest i stan","summary":"jedno zdanie podsumowania wyceny"}
Cenę podaj realistycznie na podstawie stanu i modelu (jeśli rozpoznajesz model).`;

  try {
    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: payload.mime_type || "image/jpeg", data: payload.image_base64 } },
            ],
          }],
          generationConfig: { response_mime_type: "application/json", temperature: 0.4 },
        }),
      }
    );
    const gemini = await geminiResp.json();
    if (!geminiResp.ok) return json({ error: gemini.error?.message || "Gemini error" }, 502);
    const text = gemini.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const parsed = JSON.parse(text);
    return json({
      name: parsed.name || "",
      price: Number(parsed.price) || 0,
      condition: parsed.condition === "used" ? "used" : "new",
      description: parsed.description || "",
      summary: parsed.summary || "",
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
