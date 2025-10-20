import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { askQuestion } from "../../services/chatService";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    const res = await askQuestion(text);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: res.answer, sources: res.sources },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} {...m} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
