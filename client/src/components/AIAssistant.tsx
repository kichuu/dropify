import React from 'react';
import { Brain, Navigation, Coffee, Video, Play } from 'lucide-react';

export const AIAssistant: React.FC = () => (
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
        {[
          {
            message: "Based on current patterns, traffic should clear in about 25 minutes. Would you like me to suggest some productive activities while you wait?",
            type: "assistant"
          },
          {
            message: "Yes, please show me what I can do.",
            type: "user"
          },
          {
            message: "I've analyzed your calendar and preferences. Here are some suggestions:\n\n1. Join your upcoming team meeting (starts in 15 mins)\n2. Listen to your favorite podcast\n3. Order lunch to be delivered when you reach office",
            type: "assistant"
          }
        ].map((msg, index) => (
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
          placeholder="Ask me anything..."
          className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
        />
        <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
          Send
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Smart Suggestions</h3>
        <div className="space-y-3">
          {[
            {
              title: "Alternative Route Available",
              description: "15 minutes faster via 7th Avenue",
              icon: Navigation,
              color: "text-blue-400"
            },
            {
              title: "Nearby Coffee Shop",
              description: "4.8★ Urban Brew, 0.2 miles away",
              icon: Coffee,
              color: "text-amber-400"
            },
            {
              title: "Work Meeting Soon",
              description: "Team sync in 15 minutes",
              icon: Video,
              color: "text-green-400"
            }
          ].map((suggestion) => (
            <div key={suggestion.title} className="flex items-center space-x-4 p-3 hover:bg-zinc-800/50 rounded-lg transition-colors">
              <div className="p-2 bg-zinc-800 rounded-lg">
                <suggestion.icon className={suggestion.color} size={20} />
              </div>
              <div>
                <h4 className="font-medium">{suggestion.title}</h4>
                <p className="text-sm text-zinc-400">{suggestion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="text-xl font-bold mb-4">Traffic Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-zinc-800/50 rounded-lg">
            <h4 className="font-medium mb-2">Traffic Pattern Analysis</h4>
            <div className="h-32 bg-zinc-800 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800&q=80"
                alt="Traffic Pattern Graph"
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <h4 className="text-sm text-zinc-400">Average Speed</h4>
              <p className="text-xl font-bold">12 mph</p>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-lg">
              <h4 className="text-sm text-zinc-400">Congestion Level</h4>
              <p className="text-xl font-bold text-orange-400">High</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);