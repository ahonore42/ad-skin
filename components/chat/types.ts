export interface Message {
  role: "user" | "assistant";
  content: string;
  tier?: number;
  depth?: string;
  relatedConcepts?: string[];
}
