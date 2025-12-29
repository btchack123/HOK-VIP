
import React, { useState, useRef, useEffect } from 'react';
import { getVIPSupportResponse } from '../geminiService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to VIP Elite Support. I am your HOK specialized assistant. How can I help you dominate the arena today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botText = await getVIPSupportResponse(input);
    
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: botText || "I'm having trouble connecting to the strategy database. Please stand by.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] space-y-4">
      <div className="flex-1 overflow-y-auto p-2 space-y-4 custom-scrollbar" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-lg ${
              msg.isBot 
                ? 'bg-[#1f2937] border border-[#D4AF37]/20 text-gray-200 rounded-tl-none' 
                : 'bg-gradient-to-br from-[#D4AF37] to-amber-600 text-[#0a0e17] font-medium rounded-tr-none'
            }`}>
              {msg.text}
              <div className={`text-[10px] mt-1 opacity-60 ${msg.isBot ? 'text-gray-400' : 'text-[#0a0e17]'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1f2937] p-3 rounded-2xl rounded-tl-none border border-[#D4AF37]/20">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative mt-auto">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for VIP strategies..."
          className="w-full bg-[#111827] border border-gray-700 rounded-full py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-[#D4AF37] transition-all text-gray-200"
        />
        <button 
          onClick={handleSend}
          className="absolute right-2 top-2 p-2 bg-[#D4AF37] text-[#0a0e17] rounded-full hover:bg-amber-400 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
