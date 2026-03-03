"use client";

import { useState } from "react";
import { Message } from "./types";
import ChatToggleButton from "./ChatToggleButton";
import ChatWindow from "./ChatWindow";

interface ChatbotProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export default function Chatbot({ isExpanded, setIsExpanded }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ask me about the Ad Skin project, surveillance capitalism, or digital consumerism.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Optimistically add an empty assistant message that will be filled as
    // the stream arrives.
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const currentMessages = [
        ...messages,
        { role: "user" as const, content: userMessage },
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content:
            err instanceof Error
              ? err.message
              : "Sorry, I encountered an error. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedClick = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {isOpen && (
        <ChatWindow
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          messages={messages}
          isLoading={isLoading}
          input={input}
          onInputChange={setInput}
          onSend={() => handleSend()}
          onKeyPress={handleKeyPress}
          onSuggestedClick={handleSuggestedClick}
        />
      )}
    </>
  );
}
