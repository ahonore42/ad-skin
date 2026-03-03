import { SendIcon } from "@/components/icons";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onKeyDown,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="p-4 border-t border-neutral-800">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask a question..."
          className="flex-1 bg-neutral-800 text-neutral-200 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={isLoading}
        />
        <button
          onClick={onSend}
          disabled={isLoading || !value.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
