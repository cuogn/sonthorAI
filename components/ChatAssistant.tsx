import React, { useState, useRef, useEffect } from 'react';
import { streamChatResponse } from '../services/geminiService';
import { Send, Loader2, Bot, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface ChatAssistantProps {
  isOpen: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm Henry SWE, your AI investment assistant. Let's explore market trends and make smart investment decisions. Ask me about a stock symbol.",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert internal message format to Gemini history format
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const streamResult = await streamChatResponse(history, userMessage.text);
      
      let fullResponseText = "";
      const modelMessageId = (Date.now() + 1).toString();
      
      // Initialize empty model message
      setMessages(prev => [...prev, {
          id: modelMessageId,
          role: 'model',
          text: '',
          timestamp: new Date()
      }]);

      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || "";
        fullResponseText += textChunk;
        
        setMessages(prev => prev.map(msg => 
            msg.id === modelMessageId ? { ...msg, text: fullResponseText } : msg
        ));
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm having trouble connecting to the market data server right now. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-[600px] border border-blue-500/20 shadow-2xl relative">
       {/* Header */}
       <div className="p-4 border-b border-white/10 bg-blue-900/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px]">
             <img 
               src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
               alt="Henry" 
               className="w-full h-full rounded-full object-cover border-2 border-[#0B1221]"
             />
          </div>
          <div>
             <h3 className="font-bold text-white text-sm">Henry SWE</h3>
             <p className="text-xs text-blue-400 flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
             </p>
          </div>
       </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'}
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span className="text-xs text-gray-400">Analyzing...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-[#080c17]">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What can I help you with today?"
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
           <Sparkles className="w-3 h-3 text-cyan-500" />
           <p className="text-[10px] text-center text-gray-600">AI-generated content. Not financial advice.</p>
        </div>
      </form>
    </div>
  );
};

export default ChatAssistant;