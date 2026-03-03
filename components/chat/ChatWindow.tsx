import { Message } from "./types";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  messages: Message[];
  isLoading: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSuggestedClick: (question: string) => void;
}

export default function ChatWindow({
  isExpanded,
  onToggleExpand,
  messages,
  isLoading,
  input,
  onInputChange,
  onSend,
  onKeyPress,
  onSuggestedClick,
}: ChatWindowProps) {
  return (
    <div
      className={`fixed z-50 bg-neutral-900 bg-opacity-25 border border-neutral-800 rounded-lg shadow-2xl flex flex-col transition-all duration-300  ${
        isExpanded
          ? "top-4 bottom-4 right-4 w-[calc(50vw-2rem)] max-lg:left-4 max-lg:w-auto"
          : "bottom-24 right-6 w-96 h-[32rem] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]"
      }`}
    >
      <ChatHeader isExpanded={isExpanded} onToggleExpand={onToggleExpand} />

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        onRelatedClick={onSuggestedClick}
      />

      <SuggestedQuestions
        onQuestionClick={onSuggestedClick}
        isLoading={isLoading}
      />

      <ChatInput
        value={input}
        onChange={onInputChange}
        onSend={onSend}
        onKeyDown={onKeyPress}
        isLoading={isLoading}
      />
    </div>
  );
}
