import { suggestedQuestions } from "@/utils/chat/suggestedQuestions";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
  isLoading: boolean;
}

export default function SuggestedQuestions({
  onQuestionClick,
  isLoading,
}: SuggestedQuestionsProps) {
  return (
    <div className="px-4 py-3 border-t border-neutral-800 bg-neutral-900/50">
      <p className="text-xs text-neutral-500 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick(q.text)}
            disabled={isLoading}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors border disabled:opacity-50 disabled:cursor-not-allowed
                    ${
                      q.depth === "surface"
                        ? "bg-blue-900/20 border-blue-800/50 text-blue-300 hover:bg-blue-900/40"
                        : q.depth === "medium"
                          ? "bg-amber-900/20 border-amber-800/50 text-amber-300 hover:bg-amber-900/40"
                          : "bg-red-900/20 border-red-800/50 text-red-300 hover:bg-red-900/40"
                    }
                  `}
          >
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}
