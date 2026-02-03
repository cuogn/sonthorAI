import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, TrendingUp, BarChart2, PieChart, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { streamChatResponse } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";
import { Expert } from '../services/experts';

interface AdvisorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  advisor: Expert;
}

// Mock chart data for suggestions
const performanceData = [
  { name: 'T8', value: 100 },
  { name: 'T9', value: 108 },
  { name: 'T10', value: 105 },
  { name: 'T11', value: 118 },
  { name: 'T12', value: 125 },
  { name: 'T1', value: 122 },
  { name: 'T2', value: 135 },
];

const allocationData = [
  { name: 'Vàng', value: 40, color: '#F59E0B' },
  { name: 'Chứng khoán', value: 30, color: '#22C55E' },
  { name: 'Dầu khí', value: 20, color: '#EF4444' },
  { name: 'Tiền mặt', value: 10, color: '#3B82F6' },
];

const suggestions = [
  { icon: TrendingUp, title: 'Phân tích xu hướng vàng tuần này', color: 'text-amber-400' },
  { icon: BarChart2, title: 'So sánh hiệu suất VN-Index vs S&P500', color: 'text-blue-400' },
  { icon: PieChart, title: 'Đề xuất phân bổ danh mục tối ưu', color: 'text-green-400' },
  { icon: Activity, title: 'Tác động địa chính trị lên dầu WTI', color: 'text-red-400' },
];

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const AdvisorChatModal: React.FC<AdvisorChatModalProps> = ({ isOpen, onClose, advisor }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showChart, setShowChart] = useState<'performance' | 'allocation' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simulate chart suggestion based on keywords
    if (userMessage.toLowerCase().includes('biểu đồ') || userMessage.toLowerCase().includes('chart')) {
      setShowChart('performance');
    } else if (userMessage.toLowerCase().includes('phân bổ') || userMessage.toLowerCase().includes('allocation')) {
      setShowChart('allocation');
    }

    try {
      let fullResponse = '';
      const streamResult = await streamChatResponse([], userMessage);
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        fullResponse += c.text || '';
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
          return newMessages;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSubmit(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl h-[85vh] bg-[#0A1224] rounded-[24px] border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side - Chat */}
        <div className="flex-1 flex flex-col border-r border-white/10 min-w-0">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center gap-4">
            <div className="relative">
              <img 
                src={advisor.image} 
                alt={advisor.name}
                className="w-14 h-14 rounded-xl object-cover border border-white/20"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0A1224]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{advisor.name}</h2>
              <p className="text-sm text-blue-400">{advisor.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Powered by Gemini 2.5</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                  <Sparkles className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hỏi {advisor.name.split(' ')[0]} bất cứ điều gì</h3>
                <p className="text-gray-400 text-sm max-w-md mb-8">
                  Nhận phân tích thị trường, đề xuất đầu tư, và dự báo xu hướng dựa trên AI.
                </p>
                
                {/* Quick Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(s.title)}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                    >
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/5 border border-white/10 text-gray-200'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex items-end gap-3">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-blue-500/50 transition-colors">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Hỏi ${advisor.name.split(' ')[0]}...`}
                  rows={1}
                  className="w-full bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none text-sm"
                  style={{ maxHeight: '120px' }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Visual Suggestions */}
        <div className="w-full lg:w-[400px] flex flex-col bg-[#050714]/50 hidden lg:flex">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-400" />
              Visual Insights
            </h3>
            <p className="text-xs text-gray-500 mt-1">Biểu đồ và phân tích trực quan</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Performance Chart */}
            <div className={`glass-panel p-4 rounded-xl border transition-all ${showChart === 'performance' ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-white/10'}`}>
              <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Hiệu suất danh mục
              </h4>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                    <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A1224', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorPerf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-gray-500">6 tháng qua</span>
                <span className="text-green-400 font-bold">+35%</span>
              </div>
            </div>

            {/* Allocation Chart */}
            <div className={`glass-panel p-4 rounded-xl border transition-all ${showChart === 'allocation' ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-white/10'}`}>
              <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                Đề xuất phân bổ
              </h4>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A1224', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                      formatter={(value: number) => [`${value}%`, 'Tỷ lệ']}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-400">{item.name}</span>
                    <span className="text-white font-bold ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white mb-3">Hành động nhanh</h4>
              {[
                { label: 'Tạo báo cáo PDF', icon: ChevronRight },
                { label: 'Đặt lịch tư vấn 1:1', icon: ChevronRight },
                { label: 'Xem lịch sử tư vấn', icon: ChevronRight },
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs text-gray-300 hover:text-white"
                >
                  {action.label}
                  <action.icon className="w-4 h-4 text-gray-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorChatModal;
