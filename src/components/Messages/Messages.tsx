import React, { useRef, useEffect } from "react";
import "./Messages.css";

interface Message {
  user: boolean;
  text: string;
}

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messages-container" ref={messageContainerRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.user ? "user-message" : "bot-message"}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Messages;
