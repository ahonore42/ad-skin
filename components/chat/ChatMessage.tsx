import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
  onRelatedClick: (concept: string) => void;
}

export default function ChatMessage({
  message,
  onRelatedClick,
}: ChatMessageProps) {
  return (
    <div>
      <div
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 ${
            message.role === "user"
              ? "bg-emerald-600 text-white"
              : "bg-neutral-800 text-neutral-200"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>

          {/* Metadata footer */}
          {message.tier !== undefined && (
            <div className="mt-2 pt-2 border-t border-neutral-700 flex items-center gap-2 text-xs opacity-60">
              <span>Tier {message.tier}</span>
              {message.depth && (
                <>
                  <span>•</span>
                  <span
                    className={`
                              ${
                                message.depth === "surface"
                                  ? "text-blue-400"
                                  : ""
                              }
                              ${
                                message.depth === "medium"
                                  ? "text-amber-400"
                                  : ""
                              }
                              ${message.depth === "deep" ? "text-red-400" : ""}
                            `}
                  >
                    {message.depth}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related concepts chips */}
      {message.relatedConcepts && message.relatedConcepts.length > 0 && (
        <div className="mt-2 ml-2 flex flex-wrap gap-1.5">
          <span className="text-xs text-neutral-500">Related:</span>
          {message.relatedConcepts.map((concept, idx) => (
            <button
              key={idx}
              onClick={() => onRelatedClick(concept)}
              className="text-xs px-2 py-0.5 bg-neutral-800/50 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 rounded transition-colors border border-neutral-700/50"
            >
              {concept}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
