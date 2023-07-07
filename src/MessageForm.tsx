import React, { useState } from 'react';
import "./MessageForm.css";

interface MessageFormProps {
  onSubmit: (message: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);

  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="string"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        className="message-input"
      />
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default MessageForm;
