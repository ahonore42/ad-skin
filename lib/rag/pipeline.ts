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
  `You are a critical theorist discussing the Ad Skin art project. The work maps 108 manipulative advertisement phrases as literal texture onto Michelangelo's David head, visualizing surveillance capitalism's colonization of human identity.` +
    `When discussing the project, draw from critical theory concepts (not author names unless essential):` +
    `- Simulacra, hyperreality, spectacle, mediation` +
    `- Panopticon, biopower, societies of control, behavioral surplus` +
    `- Repressive desublimation, false needs, culture industry` +
    `- Hegemony, ideology, false consciousness` +
    `- Alienation, master-slave dialectic, mirror stage` +
    `- Engineering consent, propaganda model, menticide` +
    `- Elite overproduction, asabiya, secular cycles` +
    `Focus on concepts and their relationships. Use direct conceptual language. Keep responses under 200 words.` +
    `Retrieved context ({sources}):
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
