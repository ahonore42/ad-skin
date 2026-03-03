/**
 * RAG Stage 1 — Retrieval
 *
 * Fetches documents relevant to a query from the critical theory library in
 * lib/sources.ts. Each book is scored with a simple term-frequency heuristic
 * (no embedding service required) and the top-K results above minScore are
 * returned, ordered by relevance descending.
 */

import { Document } from "@langchain/core/documents";
import { sources } from "@/lib/sources";

// ── Library documents ─────────────────────────────────────────────────────────

/**
 * Builds a flat array of LangChain Documents from every author/book entry in
 * lib/sources.ts. Called once at module load so the cost is paid upfront.
 */
function buildLibraryDocs(): Document[] {
  const docs: Document[] = [];

  for (const [author, books] of Object.entries(sources)) {
    for (const [title, meta] of Object.entries(books)) {
      docs.push(
        new Document({
          pageContent: `Author: ${author}\nTitle: ${title}\nYear: ${meta.year}\nTopic: ${meta.topic}\n\n${meta.description}`,
          metadata: {
            source: "library",
            author,
            title,
            year: meta.year,
            topic: meta.topic,
            url: meta.url,
          },
        }),
      );
    }
  }

  return docs;
}

const LIBRARY_DOCS = buildLibraryDocs();

// ── Relevance scoring ─────────────────────────────────────────────────────────

/**
 * Scores a document's relevance to a query using term overlap.
 * Returns a value in [0, 1]: proportion of query terms found in the text.
 * Terms shorter than 4 characters are excluded to reduce stopword noise.
 */
function scoreRelevance(query: string, text: string): number {
  const queryTerms = new Set(
    query
      .toLowerCase()
      .split(/\W+/)
      .filter((t) => t.length > 3),
  );
  if (queryTerms.size === 0) return 0;

  const textTerms = text.toLowerCase().split(/\W+/);
  const hits = textTerms.filter((t) => queryTerms.has(t)).length;
  return Math.min(hits / queryTerms.size, 1);
}

// ── Retriever ─────────────────────────────────────────────────────────────────

export interface RetrieverConfig {
  topK: number;
  minScore: number;
}

export interface RetrievedDoc {
  doc: Document;
  score: number;
}

/**
 * Returns an ordered list of library documents relevant to the query.
 * Documents are scored by term overlap, filtered by minScore, and truncated
 * to topK results. Returns all documents above the threshold when no match
 * is found below topK.
 */
export async function retrieve(
  query: string,
  config: RetrieverConfig,
): Promise<Document[]> {
  const ranked: RetrievedDoc[] = LIBRARY_DOCS.map((doc) => ({
    score: scoreRelevance(query, doc.pageContent),
    doc,
  }))
    .filter((r) => r.score >= config.minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, config.topK);

  return ranked.map((r) => r.doc);
}
