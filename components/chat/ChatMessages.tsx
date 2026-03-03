import { useRef, useEffect } from "react";
import { Message } from "./types";
import ChatMessage from "./ChatMessage";
import LoadingIndicator from "./LoadingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onRelatedClick: (concept: string) => void;
}

export default function ChatMessages({
  messages,
  isLoading,
  onRelatedClick,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          onRelatedClick={onRelatedClick}
        />
      ))}

      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
