// utils/chat/suggestedQuestions.ts

export interface SuggestedQuestion {
  text: string;
  category: string;
  depth: "surface" | "medium" | "deep";
}

export const suggestedQuestions: SuggestedQuestion[] = [
  // ===== BASIC (Surface) =====
  {
    text: "What is this?",
    category: "basic",
    depth: "surface",
  },
  {
    text: "Why David?",
    category: "basic",
    depth: "surface",
  },
  {
    text: "How many ads?",
    category: "basic",
    depth: "surface",
  },
  {
    text: "What's the purpose?",
    category: "basic",
    depth: "surface",
  },
  {
    text: "What technology?",
    category: "basic",
    depth: "surface",
  },
  {
    text: "Can I interact with it?",
    category: "basic",
    depth: "surface",
  },

  // ===== SURVEILLANCE & CONTROL (Medium-Deep) =====
  {
    text: "What is surveillance capitalism?",
    category: "surveillance",
    depth: "medium",
  },
  {
    text: "What is the panopticon?",
    category: "surveillance",
    depth: "medium",
  },
  {
    text: "Societies of control?",
    category: "surveillance",
    depth: "deep",
  },
  {
    text: "What is biopower?",
    category: "surveillance",
    depth: "deep",
  },
  {
    text: "Behavioral surplus?",
    category: "surveillance",
    depth: "deep",
  },

  // ===== REPRESENTATION & REALITY (Medium-Deep) =====
  {
    text: "What is the spectacle?",
    category: "spectacle",
    depth: "medium",
  },
  {
    text: "What is simulacra?",
    category: "simulacra",
    depth: "deep",
  },
  {
    text: "The cave allegory?",
    category: "epistemology",
    depth: "deep",
  },
  {
    text: "What is hyperreality?",
    category: "simulacra",
    depth: "deep",
  },
  {
    text: "What is mediation?",
    category: "spectacle",
    depth: "medium",
  },

  // ===== MANIPULATION & PROPAGANDA (Medium) =====
  {
    text: "How do ads manipulate?",
    category: "manipulation",
    depth: "medium",
  },
  {
    text: "Engineering consent?",
    category: "manipulation",
    depth: "medium",
  },
  {
    text: "Corporate language?",
    category: "manipulation",
    depth: "medium",
  },
  {
    text: "What is propaganda?",
    category: "manipulation",
    depth: "medium",
  },
  {
    text: "Newspeak?",
    category: "manipulation",
    depth: "deep",
  },

  // ===== CONSUMER CULTURE (Medium-Deep) =====
  {
    text: "What is consumerism?",
    category: "consumer",
    depth: "medium",
  },
  {
    text: "False needs?",
    category: "consumer",
    depth: "medium",
  },
  {
    text: "Repressive desublimation?",
    category: "consumer",
    depth: "deep",
  },
  {
    text: "Culture industry?",
    category: "culture",
    depth: "deep",
  },
  {
    text: "Sign value?",
    category: "consumer",
    depth: "deep",
  },

  // ===== IDEOLOGY & CONSCIOUSNESS (Medium-Deep) =====
  {
    text: "What is ideology?",
    category: "ideology",
    depth: "deep",
  },
  {
    text: "Hegemony?",
    category: "ideology",
    depth: "deep",
  },
  {
    text: "We know but act as if we don't?",
    category: "ideology",
    depth: "deep",
  },
  {
    text: "What is alienation?",
    category: "alienation",
    depth: "medium",
  },

  // ===== RESISTANCE (Medium) =====
  {
    text: "Can we escape advertising?",
    category: "resistance",
    depth: "deep",
  },
  {
    text: "Is this anti-capitalist?",
    category: "resistance",
    depth: "medium",
  },
  {
    text: "What's the solution?",
    category: "resistance",
    depth: "medium",
  },
  {
    text: "Is art enough?",
    category: "resistance",
    depth: "medium",
  },

  // ===== SOCIAL STRUCTURE (Medium-Deep) =====
  {
    text: "Elite overproduction?",
    category: "social_structure",
    depth: "deep",
  },
  {
    text: "Bullshit jobs?",
    category: "social_structure",
    depth: "deep",
  },

  // ===== CONTEMPORARY (Medium) =====
  {
    text: "What about social media?",
    category: "contemporary",
    depth: "medium",
  },
  {
    text: "What about AI?",
    category: "contemporary",
    depth: "deep",
  },
];

/**
 * Get questions by depth level
 */
export function getQuestionsByDepth(
  depth: "surface" | "medium" | "deep"
): SuggestedQuestion[] {
  return suggestedQuestions.filter((q) => q.depth === depth);
}

/**
 * Get questions by category
 */
export function getQuestionsByCategory(category: string): SuggestedQuestion[] {
  return suggestedQuestions.filter((q) => q.category === category);
}

/**
 * Get a random selection of questions
 */
export function getRandomQuestions(count: number): SuggestedQuestion[] {
  const shuffled = [...suggestedQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get questions prioritizing surface/medium for new users
 */
export function getIntroductoryQuestions(
  count: number = 6
): SuggestedQuestion[] {
  const surface = getQuestionsByDepth("surface");
  const medium = getQuestionsByDepth("medium");
  const combined = [...surface, ...medium.slice(0, 3)];
  return combined.slice(0, count);
}
