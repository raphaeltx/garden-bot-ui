import React, { useState } from "react";
import "./Input.css";

interface InputProps {
  onSend: (message: string) => void;
}

const Input: React.FC<InputProps> = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="input-field"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default Input;
