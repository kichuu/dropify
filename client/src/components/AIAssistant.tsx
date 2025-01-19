"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Brain } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      message: "How can I help you today?",
      type: "assistant",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle the API request for Gemini content generation
  const generateContent = async (text: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDPaz76UWGXrT-38kCWPLBvVbysdwr9cUk',
        {
          contents: [
            {
              parts: [
                { 
                  text: text,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extracting the assistant's message from the response
      const assistantMessage = response.data.candidates[0]?.content?.parts[0]?.text || 'No response from Gemini API.';
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: assistantMessage, type: 'assistant' },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: 'Error fetching content from Gemini API.', type: 'assistant' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending user input
  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Get the user's coordinates
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          // Send the user input along with the coordinates
          setMessages((prevMessages) => [
            ...prevMessages,
            { message: userInput, type: 'user', coordinates: { latitude, longitude } },
          ]);
          console.log(userInput)
          generateContent(userInput); // Send the user input and coordinates to Gemini API
          setUserInput('');
        },
        (error) => {
          console.error('Error getting location:', error);
          // Handle the error (e.g., use default location or show a message)
        }
      );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Brain className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Traffic Assistant</h2>
            <p className="text-zinc-400">How can I help you today?</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-lg ${msg.type === 'user' ? 'bg-purple-500/20 text-purple-100' : 'bg-zinc-800/50'}`}>
                <p className="whitespace-pre-line">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
          >
            {loading ? 'Loading...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};
