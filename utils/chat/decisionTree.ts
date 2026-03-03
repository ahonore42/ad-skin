// utils/chat/decisionTree.ts
//
// Two-phase decision tree for chat message routing:
//   Phase 1 — Detect category branch (fast keyword classification)
//   Phase 2 — Match specific concept within that branch
//   Fallthrough — LLM call, enriched with detected category + concepts
//
// Why a tree instead of a flat regex list?
//   A flat list tests every pattern against every message.
//   The tree first narrows to a category (cheap), then only tests
//   patterns in that subtree (cheap), so LLM is reached with context
//   instead of just "no match".

import { tier0Responses, keywordMap, type Tier0Response } from "./tier0Responses";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Category =
  | "greeting"
  | "clarification"
  | "basics"
  | "simulacra"
  | "spectacle"
  | "surveillance"
  | "consumer"
  | "culture"
  | "manipulation"
  | "ideology"
  | "alienation"
  | "resistance"
  | "technology"
  | "epistemology"
  | "social_structure"
  | "aesthetics"
  | "contemporary"
  | "meta"
  | "unknown";

export type Depth = "surface" | "medium" | "deep";

export type TreeResult =
  | {
      matched: true;
      response: string;
      depth: Depth;
      category: Category;
      relatedConcepts?: string[];
    }
  | {
      matched: false;
      category: Category;
      relevantConcepts: string[];
      suggestedDepth: Depth;
    };

// ─── Category detection signals ───────────────────────────────────────────────
// Each entry is a list of patterns/strings that, when found in the message,
// route it into the corresponding category branch.  Order matters only within
// each entry; detection stops at the first category match.

const CATEGORY_SIGNALS: Record<Exclude<Category, "unknown">, (RegExp | string)[]> = {
  greeting: [
    /^(hello|hi|hey|greetings|yo)\b/i,
  ],
  clarification: [
    /confused/i,
    /don't understand/i,
    /unclear/i,
    /what do you mean/i,
  ],
  basics: [
    /what is (this|ad skin)/i,
    /what am i looking at/i,
    /why (david|michelangelo)/i,
    /how many (ads|phrases)/i,
    /number of ads/i,
    /why.*made/i,
    /can i interact/i,
  ],
  simulacra: [
    /simulacr/i,
    /hyperreal/i,
    /more real than real/i,
    /simulation/i,
    /map.*territory/i,
    /precession/i,
  ],
  spectacle: [
    /spectacle/i,
    /\bmediat(ion|ed)\b/i,
    /debord/i,
    /separation.*spectacle|spectacle.*separation/i,
  ],
  surveillance: [
    /surveillance capitalism/i,
    /panopticon/i,
    /biopower/i,
    /biopolitic/i,
    /control societ/i,
    /societies of control/i,
    /behavioral surplus/i,
    /menticide/i,
    /thought control/i,
  ],
  consumer: [
    /consumerism/i,
    /false needs/i,
    /repressive desublimation/i,
    /sign value/i,
    /symbolic value/i,
    /amour.propre/i,
    /social vanity/i,
  ],
  culture: [
    /culture industry/i,
    /standardization/i,
    /pseudo.individuality/i,
    /false individuality/i,
  ],
  manipulation: [
    /how.*ads manipulat/i,
    /engineering consent/i,
    /propaganda/i,
    /corporate language/i,
    /management speak/i,
    /\bjargon\b/i,
    /newspeak/i,
    /doublethink/i,
    /necessary illusions/i,
    /democratic thought control/i,
  ],
  ideology: [
    /\bideolog/i,
    /\bhegemony\b/i,
    /hegemonic/i,
    /we know but/i,
    /false consciousness/i,
    /symbolic order/i,
    /\bthe real\b/i,
    /disavowal/i,
  ],
  alienation: [
    /\balienation\b/i,
    /mirror stage/i,
    /misrecognition/i,
    /master.slave/i,
    /master slave/i,
  ],
  resistance: [
    /anti.capitalist/i,
    /against capitalism/i,
    /how.*resist/i,
    /what.*solution/i,
    /can we escape/i,
    /escape.*advertising|escape.*capitalism|escape.*commodif/i,
    /outside.*system|outside.*capitalism|outside.*spectacle/i,
    /alternative.*capitalism|alternative.*system/i,
    /ethical consumption/i,
    /\bboycott\b/i,
    /civil disobedience/i,
    /is art enough/i,
  ],
  technology: [
    /what technology/i,
    /tech stack/i,
    /why 3d/i,
    /\b3d\b/i,
    /mechanical reproduction/i,
    /\baura\b.*art|\bart\b.*\baura\b/i,
  ],
  epistemology: [
    /cave allegory/i,
    /plato.*cave/i,
    /allegory of the cave/i,
    /evil demon/i,
    /cogito/i,
    /radical doubt/i,
    /reducing valve/i,
    /doors of perception/i,
  ],
  social_structure: [
    /elite overproduction/i,
    /\basabiya\b/i,
    /secular cycles/i,
    /bullshit jobs/i,
    /social cohesion/i,
  ],
  aesthetics: [
    /\baesthetic\b/i,
    /\bis (this |it )?art\b/i,
    /why.*ugly/i,
    /why.*bright/i,
    /\bgarish\b/i,
    /alienation effect/i,
    /defamiliariz/i,
  ],
  contemporary: [
    /social media/i,
    /artificial intelligence/i,
    /\bai\b.*(capitalism|society|surveillance|control|behavior|predict)/i,
    /(capitalism|surveillance|society|control).*\bai\b/i,
    /big tech/i,
    /platform capitalism/i,
  ],
  meta: [
    /why.*care/i,
    /\bobvious\b/i,
    /\bpretentious\b/i,
  ],
};

// ─── Category → LLM context hints ─────────────────────────────────────────────
// When the tree finds a category but no specific concept, these concepts are
// injected into the LLM system prompt so the response stays on-topic.

const CATEGORY_CONCEPTS: Record<Exclude<Category, "unknown">, string[]> = {
  greeting:        ["ad skin project", "surveillance capitalism", "conceptual art"],
  clarification:   ["defamiliarization", "conceptual framework", "visual form"],
  basics:          ["108 ad phrases", "Michelangelo's David", "commodification of identity", "3D web art"],
  simulacra:       ["simulacra", "hyperreality", "simulation", "map vs territory", "precession of simulacra"],
  spectacle:       ["spectacle", "mediation", "separation", "image-mediated social relations"],
  surveillance:    ["surveillance capitalism", "panopticon", "biopower", "societies of control", "behavioral surplus", "menticide"],
  consumer:        ["consumerism", "false needs", "repressive desublimation", "sign value", "amour-propre"],
  culture:         ["culture industry", "standardization", "pseudo-individuality", "mass culture"],
  manipulation:    ["engineering consent", "propaganda model", "corporate jargon", "newspeak", "doublethink", "necessary illusions"],
  ideology:        ["ideology", "hegemony", "false consciousness", "disavowal", "symbolic order", "the Real"],
  alienation:      ["alienation", "mirror stage", "misrecognition", "master-slave dialectic"],
  resistance:      ["capitalist realism", "defamiliarization", "ethical consumption", "civil disobedience", "artistic negation"],
  technology:      ["Next.js", "Three.js", "mechanical reproduction", "aura", "digital simulation"],
  epistemology:    ["Plato's cave", "evil demon hypothesis", "cogito", "reducing valve", "consciousness filters"],
  social_structure:["elite overproduction", "asabiya", "secular cycles", "bullshit jobs", "atomization"],
  aesthetics:      ["dissonance", "defamiliarization", "alienation effect", "commodity aesthetics", "negation"],
  contemporary:    ["surveillance capitalism", "social media", "AI automation", "platform capitalism"],
  meta:            ["ideology", "disavowal", "aesthetic experience", "anti-intellectualism"],
};

// Maps keyword-map keys to their category so Phase 0 can return full context
const KEYWORD_CATEGORIES: Partial<Record<string, Category>> = {
  simulacra:   "simulacra",
  spectacle:   "spectacle",
  panopticon:  "surveillance",
  biopower:    "surveillance",
  hegemony:    "ideology",
  ideology:    "ideology",
  alienation:  "alienation",
  consumerism: "consumer",
};

// ─── Tree traversal ────────────────────────────────────────────────────────────

/**
 * Phase 1 — Classify message into a category branch.
 * Returns "unknown" when no signals fire.
 */
function detectCategory(message: string): Category {
  for (const [cat, signals] of Object.entries(CATEGORY_SIGNALS) as [
    Exclude<Category, "unknown">,
    (RegExp | string)[]
  ][]) {
    for (const signal of signals) {
      const hit =
        signal instanceof RegExp
          ? signal.test(message)
          : message.toLowerCase().includes(signal.toLowerCase());
      if (hit) return cat;
    }
  }
  return "unknown";
}

/**
 * Phase 2 — Match a specific concept node within the detected category branch.
 * Only tests patterns whose category matches — avoids the full flat scan.
 */
function matchConceptInCategory(
  message: string,
  category: Category
): Tier0Response | null {
  const candidates = tier0Responses.filter((r) => r.category === category);
  for (const item of candidates) {
    if (item.pattern instanceof RegExp && item.pattern.test(message)) {
      return item;
    }
  }
  return null;
}

/**
 * Main entry point.  Returns either a matched leaf (use response directly)
 * or a miss with category + concept hints for the LLM call.
 */
export function traverseDecisionTree(message: string): TreeResult {
  const normalized = message.toLowerCase().trim();

  // ── Phase 0: exact keyword-map hits (cheapest possible check) ──────────────
  for (const [keyword, response] of Object.entries(keywordMap)) {
    if (
      normalized === keyword ||
      normalized === `what is ${keyword}` ||
      normalized === `what are ${keyword}`
    ) {
      const category: Category = KEYWORD_CATEGORIES[keyword] ?? "unknown";
      return { matched: true, response, depth: "deep", category };
    }
  }

  // ── Phase 1: category branch detection ────────────────────────────────────
  const category = detectCategory(message);

  // ── Phase 2: concept matching within branch ────────────────────────────────
  if (category !== "unknown") {
    const conceptMatch = matchConceptInCategory(message, category);
    if (conceptMatch) {
      return {
        matched: true,
        response: conceptMatch.response,
        depth: conceptMatch.depth,
        category,
        relatedConcepts: conceptMatch.relatedConcepts,
      };
    }

    // Category branch detected but no leaf matched → partial hit.
    // LLM will receive the category context.
    return {
      matched: false,
      category,
      relevantConcepts: CATEGORY_CONCEPTS[category] ?? [],
      suggestedDepth: "medium",
    };
  }

  // ── Total miss → LLM with no category context ─────────────────────────────
  return {
    matched: false,
    category: "unknown",
    relevantConcepts: [],
    suggestedDepth: "medium",
  };
}

/**
 * Build the category-context fragment injected into the LLM system prompt
 * when the tree doesn't match a leaf.
 */
export function buildLLMContext(
  treeResult: Extract<TreeResult, { matched: false }>
): string {
  if (treeResult.category === "unknown" || treeResult.relevantConcepts.length === 0) {
    return "";
  }
  const concepts = treeResult.relevantConcepts.slice(0, 5).join(", ");
  return `The question relates to the "${treeResult.category}" domain. Prioritise these concepts in your response: ${concepts}.`;
}
