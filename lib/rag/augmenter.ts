/**
 * RAG Stage 2 — Augmentation
 *
 * Formats retrieved documents and conversation history into strings
 * that can be inserted into the generation prompt.
 *
 * Responsibilities:
 *   augment()        — packs documents into the context character budget,
 *                      truncating the last document if needed
 *   formatHistory()  — serialises prior turns as a plaintext transcript
 */

import { Document } from "@langchain/core/documents";

// ── Context assembly ──────────────────────────────────────────────────────────

export interface AugmentResult {
  /** Formatted context string ready for prompt insertion. */
  context: string;
  /** Human-readable list of included source labels. */
  sources: string[];
  /** True if the last document was truncated to fit the budget. */
  truncated: boolean;
}

/**
 * Packs documents into a context string within the given character budget.
 * Documents are included in order; the last one is truncated if it overflows.
 * A minimum of 300 remaining characters is required to include a truncated doc.
 */
export function augment(docs: Document[], maxChars: number): AugmentResult {
  const parts: string[] = [];
  const sources: string[] = [];
  let totalChars = 0;
  let truncated = false;

  for (const doc of docs) {
    const label =
      doc.metadata.author
        ? `[${doc.metadata.author} — "${doc.metadata.title}"]`
        : `["${doc.metadata.title}"]`;

    const block = `${label}\n${doc.pageContent}`;

    if (totalChars + block.length > maxChars) {
      const remaining = maxChars - totalChars;
      if (remaining > 300) {
        parts.push(block.slice(0, remaining).trimEnd() + "\n[…truncated]");
        sources.push(label);
        truncated = true;
      }
      break;
    }

    parts.push(block);
    sources.push(label);
    totalChars += block.length;
  }

  return {
    context: parts.join("\n\n---\n\n"),
    sources,
    truncated,
  };
}

// ── History formatting ────────────────────────────────────────────────────────

export interface Message {
  role: string;
  content: string;
}

/**
 * Formats the most recent N turns of conversation history as a plaintext
 * transcript. The current (last) message is excluded — it is passed separately
 * as the `question` variable in the prompt.
 */
export function formatHistory(messages: Message[], maxTurns: number): string {
  // Exclude the last message (the current query), take the prior N*2 messages
  const prior = messages.slice(-(maxTurns * 2 + 1), -1);
  if (prior.length === 0) return "(no prior conversation)";

  return prior
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}
