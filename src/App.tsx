import React, { useState } from "react";
import Messages from "./components/Messages/Messages";
import Input from "./components/Input/Input";
import "./App.css";
import Header from "./components/Header/Header";
import BotMessageService from "./services/bot-message/bot-message.service";

interface Message {
  user: boolean;
  text: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageService = new BotMessageService();

  const handleSend = async (message: string) => {
    if (message.trim()) {      
      setMessages((prev) => [{ user: true, text: message }, ...prev]);
      
      setTimeout(async () => {
        const aiResponse = await messageService.handleMessage(message);
        setMessages((prev) => [{ user: false, text: aiResponse }, ...prev]);
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      <Header />
      <Messages messages={messages} />
      <Input onSend={handleSend} />
    </div>
  );
};

export default App;
