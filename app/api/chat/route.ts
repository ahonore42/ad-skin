import { NextRequest } from "next/server";
import { runPipeline } from "@/lib/rag/pipeline";
import { withQueue } from "@/lib/queue";
import { isQueueFull } from "@/lib/errors";

// ── Incoming message shapes ───────────────────────────────────────────────────
// v2 AI SDK: { role, content: string }
// v3 AI SDK: { role, parts: Array<{ type: string; text?: string }> }

interface MessagePart {
  type: string;
  text?: string;
}

interface IncomingMessage {
  role: string;
  content?: string;
  parts?: MessagePart[];
}

/** Extracts plain text from either a v2 content string or v3 parts array. */
function extractText(message: IncomingMessage): string {
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter(
        (p): p is MessagePart & { type: "text"; text: string } =>
          p.type === "text" && typeof p.text === "string",
      )
      .map((p) => p.text)
      .join("");
  }
  return message.content ?? "";
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Parse body separately so JSON errors are surfaced clearly.
  let body: unknown;
  try {
    body = await req.json();
  } catch (e) {
    console.error("[/api/chat] Failed to parse request body:", e);
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const raw = body as Record<string, unknown>;

    if (!Array.isArray(raw.messages) || raw.messages.length === 0) {
      console.error(
        "[/api/chat] 400 — messages missing or empty. Received body:",
        JSON.stringify(body),
      );
      return Response.json(
        { error: "messages array is required" },
        { status: 400 },
      );
    }

    // Normalise to { role, content } so the pipeline works regardless of SDK version.
    const messages = (raw.messages as IncomingMessage[]).map((m) => ({
      role: m.role,
      content: extractText(m),
    }));

    const query = messages[messages.length - 1].content;
    if (!query.trim()) {
      console.error(
        "[/api/chat] 400 — last message has no text content. Parts:",
        JSON.stringify(raw.messages[raw.messages.length - 1]),
      );
      return Response.json(
        { error: "Last message has no content" },
        { status: 400 },
      );
    }

    const { stream } = await withQueue(() => runPipeline({ query, messages }));

    const encoder = new TextEncoder();
    const responseStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    });

    return new Response(responseStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (e) {
    if (isQueueFull(e)) {
      console.error("[/api/chat] Queue full:", e);
      return Response.json(
        { error: "Server busy, please try again later" },
        { status: 429 },
      );
    }
    console.error("[/api/chat] Unhandled error:", e);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
