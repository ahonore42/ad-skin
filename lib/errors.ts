/**
 * Utility helpers for classifying runtime errors.
 */

/**
 * Returns true when the error indicates a downstream service is overloaded
 * (e.g. LangChain / Mistral rate-limit or concurrency queue full).
 */
export function isQueueFull(e: unknown): boolean {
  if (!(e instanceof Error)) return false;
  const msg = e.message.toLowerCase();
  return (
    msg.includes("queue") ||
    msg.includes("rate limit") ||
    msg.includes("too many requests") ||
    msg.includes("overloaded") ||
    (e as NodeJS.ErrnoException).code === "ECONNREFUSED"
  );
}
