/**
 * RAG Pipeline Configuration
 *
 * All tuneable inputs in one place. Override via environment variables where noted.
 *
 * Stages:
 *   model      — LLM provider settings
 *   retrieval  — document fetching and scoring
 *   generation — context window and history management
 */
export const RAG_CONFIG = {
  model: {
    name: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
    apiKey: process.env.GROQ_API_KEY ?? "",
    baseURL: process.env.GROQ_BASE_URL ?? "https://api.groq.com/openai/v1",
    temperature: Number(process.env.RAG_TEMPERATURE ?? 0.8),
    streaming: true,
  },

  retrieval: {
    /** Maximum number of blog posts to include alongside the static profile. */
    topK: Number(process.env.RAG_TOP_K ?? 3),
    /** Minimum term-overlap score (0–1) for a blog post to be retrieved. */
    minScore: Number(process.env.RAG_MIN_SCORE ?? 0.05),
  },

  generation: {
    /** Character budget for the assembled context block. */
    maxContextChars: Number(process.env.RAG_MAX_CONTEXT_CHARS ?? 6000),
    /** Number of prior user/assistant turns to include as conversation history. */
    maxHistoryTurns: Number(process.env.RAG_MAX_HISTORY_TURNS ?? 6),
  },
} as const;

export type RagConfig = typeof RAG_CONFIG;
