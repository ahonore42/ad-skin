import { XIcon, ChatBubbleIcon } from "@/components/icons";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatToggleButton({
  isOpen,
  onClick,
}: ChatToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg flex items-center justify-center"
      aria-label="Toggle chat"
    >
      {isOpen ? (
        <XIcon className="w-6 h-6 text-white" />
      ) : (
        <ChatBubbleIcon className="w-6 h-6 text-white" />
      )}
    </button>
  );
}
