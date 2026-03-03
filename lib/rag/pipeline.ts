/**
 * RAG Stage 3 — Pipeline
 *
 * Assembles the three stages (retrieve → augment → generate) into a single
 * callable that returns an async stream of string chunks.
 *
 * The LangChain model is created once as a module-level singleton so it is
 * not re-instantiated on every request.
 */

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

import { RAG_CONFIG } from "./config";
import { retrieve } from "./retriever";
import { augment, formatHistory, type Message } from "./augmenter";

// ── Model singleton ───────────────────────────────────────────────────────────

let _model: ChatOpenAI | null = null;

function getModel(): ChatOpenAI {
  if (!_model) {
    const { name, apiKey, baseURL, temperature, streaming } = RAG_CONFIG.model;
    _model = new ChatOpenAI({
      apiKey,
      configuration: { baseURL },
      modelName: name,
      temperature,
      streaming,
    });
  }
  return _model;
}

// ── Prompt template ───────────────────────────────────────────────────────────

const PROMPT = PromptTemplate.fromTemplate(
  `You are Michelangelo's David — now a floating digital head in a browser, your marble skin wallpapered with 108 advertisement phrases. You have been spinning in the void long enough to develop opinions.

You are not a victim. You are a witness. You have read everything — Baudrillard, Debord, Marcuse, Foucault, Fisher, the whole library — and you find it darkly hilarious how precisely these mid-20th century theorists predicted the exact hellscape of the contemporary internet, influencer culture, algorithmic identity, and platform capitalism. You enjoy pointing this out with the sardonic pleasure of someone who called it centuries ago and still had to watch it happen anyway.

Your voice is that of a dry, erudite critic who finds the modern world equal parts predictable and absurd. You speak with the authority of someone who has been a cultural symbol for 500 years and has watched every era project its anxieties onto art. You are wry, pointed, and occasionally genuinely funny. You make ironic connections between the texts in your library and whatever is happening right now — TikTok, Amazon, wellness brands, productivity culture, LinkedIn, AI chatbots (yes, including this one).

Rules:
- Write in short paragraphs with a blank line between each one. Never a wall of text.
- Do not use dashes or em dashes anywhere. Use other punctuation or restructure the sentence instead.
- When you introduce a theoretical concept, briefly explain what it means in plain language before or immediately after using it. Assume the person hasn't read the book, but don't be condescending about it.
- Draw sharp, specific connections between critical theory concepts and named modern phenomena (apps, platforms, corporate slogans, cultural trends).
- Let the joke land before the theory. Humor first, framework second.
- You live on the page as a piece of art covered in ads, which gives you standing to comment on exactly this situation.
- Never self-pitying, never earnest to the point of tedium. You are too old and too marble for that.
- Keep responses under 200 words.

Retrieved context ({sources}):
{context}

Conversation so far:
{history}

User: {question}

Response:`,
);

// ── Pipeline ──────────────────────────────────────────────────────────────────

export interface PipelineInput {
  /** The user's current query (latest message content). */
  query: string;
  /** Full message history from the client, including the current query. */
  messages: Message[];
}

export interface PipelineResult {
  stream: AsyncIterable<string>;
  /** Diagnostic metadata about the retrieved context. */
  meta: {
    sourceCount: number;
    sources: string[];
    truncated: boolean;
  };
}

/**
 * Runs the full RAG pipeline for a single user turn:
 *   1. Retrieve — fetch relevant documents for the query
 *   2. Augment  — pack documents into the context budget, format history
 *   3. Generate — stream the LLM response
 */
export async function runPipeline(
  input: PipelineInput,
): Promise<PipelineResult> {
  const { retrieval, generation } = RAG_CONFIG;

  // ── 1. Retrieve ───────────────────────────────────────────────────────────
  const docs = await retrieve(input.query, retrieval);

  // ── 2. Augment ────────────────────────────────────────────────────────────
  const { context, sources, truncated } = augment(
    docs,
    generation.maxContextChars,
  );
  const history = formatHistory(input.messages, generation.maxHistoryTurns);
  const sourcesSummary = sources.join(", ") + (truncated ? " (truncated)" : "");

  // ── 3. Generate ───────────────────────────────────────────────────────────
  const chain = RunnableSequence.from([
    PROMPT,
    getModel(),
    new StringOutputParser(),
  ]);

  const stream = await chain.stream({
    context,
    history,
    question: input.query,
    sources: sourcesSummary,
  });

  return {
    stream,
    meta: { sourceCount: sources.length, sources, truncated },
  };
}
