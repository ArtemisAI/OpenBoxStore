"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000/api';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newUserMessage: ChatMessage = { type: 'user', text: message };
    setChatHistory(prevChatHistory => [...prevChatHistory, newUserMessage]);

    try {
      const response = await axios.post(`${aiServiceUrl}/chat`, {
        message: message,
      });
      const newBotMessage: ChatMessage = { type: 'bot', text: response.data.response };
      setChatHistory(prevChatHistory => [...prevChatHistory, newBotMessage]);
    } catch (error) {
      console.error('Error sending message to AI service:', error);
      const errorBotMessage: ChatMessage = { type: 'bot', text: 'Sorry, I encountered an error.' };
      setChatHistory(prevChatHistory => [...prevChatHistory, errorBotMessage]);
    }

    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
      <div className="h-80 overflow-y-auto mb-4 p-3 bg-gray-50 rounded">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`mb-2 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                chat.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {chat.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
