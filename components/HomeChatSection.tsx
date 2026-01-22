import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";
import { experts } from './MidSection'; 
import { Expert } from '../types';

interface HomeChatSectionProps {
    expert: Expert;
    onSelect: (expert: Expert) => void;
}

const HomeChatSection: React.FC<HomeChatSectionProps> = ({ expert: selectedExpert, onSelect: setSelectedExpert }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Drag scroll logic
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setIsDragging(false);
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // Small timeout to reset dragging state so click events can fire if it wasn't a drag
    setTimeout(() => setIsDragging(false), 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      if (Math.abs(walk) > 5) setIsDragging(true);
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleExpertClick = (expert: Expert) => {
    if (!isDragging) {
        setSelectedExpert(expert);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(""); 
    
    // Reset height
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
    }

    try {
        const streamResult = await streamChatResponse([], input); 
        for await (const chunk of streamResult) {
            const c = chunk as GenerateContentResponse;
            setResponse(prev => (prev || "") + (c.text || ""));
        }
    } catch (error) {
        setResponse("System offline. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto mb-24 relative z-20">
       
       {/* Expert Selector Tabs - Draggable & Mobile Optimized */}
       <div 
         ref={scrollContainerRef}
         onMouseDown={handleMouseDown}
         onMouseLeave={handleMouseLeave}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         className={`w-full overflow-x-auto pb-6 mb-2 scrollbar-hide px-1 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
       >
           <div className="flex justify-start md:justify-center gap-3 w-max md:w-full md:flex-wrap lg:flex-nowrap">
              {experts.map(expert => (
                  <button
                    key={expert.id}
                    onClick={() => handleExpertClick(expert)}
                    className={`
                        group flex items-center gap-3 pr-4 pl-1.5 py-1.5 md:pr-5 md:pl-2 md:py-2 rounded-full border transition-all duration-300 flex-shrink-0 select-none
                        w-[42vw] sm:w-[180px] md:w-auto justify-start md:justify-start
                        ${selectedExpert.id === expert.id 
                        ? `bg-[#0A1224] ${expert.borderColor} border-opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.4)] ring-1 ring-white/10` 
                        : 'bg-transparent border-transparent hover:bg-white/5 opacity-50 hover:opacity-100'}
                    `}
                  >
                     <div className={`relative w-8 h-8 md:w-11 md:h-11 flex-shrink-0 rounded-full overflow-hidden border-2 pointer-events-none ${selectedExpert.id === expert.id ? expert.color.replace('text', 'border') : 'border-transparent'}`}>
                        <img src={expert.image} alt={expert.name} className="w-full h-full object-cover object-top" />
                     </div>
                     <div className="flex flex-col items-start text-left min-w-0 overflow-hidden pointer-events-none">
                         <span className={`text-sm font-bold leading-none mb-1 truncate w-full ${selectedExpert.id === expert.id ? 'text-white' : 'text-gray-400'}`}>
                            {expert.name.split(' ')[0]}
                         </span>
                         <span className={`text-[10px] uppercase tracking-wider font-bold ${expert.color} truncate w-full`}>
                            {expert.role.split(' ')[0]}
                         </span>
                     </div>
                  </button>
              ))}
           </div>
       </div>

       {/* Chat Input Container */}
       {/* Use w-full inside the parent padding constraints to avoid overflow */}
       <div className="glass-panel rounded-[24px] p-2 md:p-3 relative border-t border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#0A1224]/80 backdrop-blur-xl w-full mx-auto md:max-w-4xl">
          
          <div className="flex items-end gap-2 md:gap-4">
              
              {/* Desktop Avatar */}
              <div className="hidden md:block relative flex-shrink-0 ml-2 mb-2">
                 <div className={`w-14 h-14 rounded-[18px] overflow-hidden border border-white/10 ${selectedExpert.bgColor}`}>
                    <img 
                       src={selectedExpert.image} 
                       alt={selectedExpert.name} 
                       className="w-full h-full object-cover object-top"
                    />
                 </div>
                 <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-[#0A1224] shadow-sm"></div>
              </div>

              {/* Input Area */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} 
                className="flex-1 bg-[#050714]/60 rounded-[20px] border border-white/5 flex flex-col px-4 py-3 md:px-5 md:py-3 relative focus-within:border-blue-500/30 transition-colors min-w-0"
              >
                 {/* Header inside input */}
                 <div className="flex items-center gap-2 mb-1.5 overflow-hidden">
                     <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${selectedExpert.color} flex items-center gap-1.5 truncate`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_5px_currentColor] flex-shrink-0"></span>
                        <span className="truncate">{selectedExpert.role}</span>
                     </span>
                 </div>

                 <div className="flex items-end gap-2">
                     <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Ask ${selectedExpert.name.split(' ')[0]}...`}
                        rows={1}
                        className="w-full bg-transparent border-none text-white placeholder-gray-500/60 focus:ring-0 focus:outline-none p-0 text-base font-light min-w-0 resize-none overflow-hidden leading-relaxed py-1"
                        style={{ fontSize: '16px', maxHeight: '120px' }}
                     />
                     <button 
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`flex-shrink-0 p-2 rounded-xl transition-all duration-300 mb-0.5 ${
                            input.trim() 
                            ? `text-white ${selectedExpert.color.replace('text', 'bg').replace('400', '600')} shadow-lg hover:scale-105` 
                            : 'text-gray-600 bg-white/5'
                        }`}
                    >
                       {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                 </div>
              </form>
          </div>

          {/* Result Pop-up */}
          {response && (
              <div className="absolute bottom-full left-0 right-0 mb-4 px-0 z-50">
                  <div className="glass-panel p-5 md:p-8 rounded-[24px] bg-[#0A1224]/95 border border-white/10 shadow-2xl relative animate-fade-in-up">
                      
                      {/* Response Header */}
                      <div className="flex items-start gap-4 mb-3">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-lg`}>
                             <img src={selectedExpert.image} className="w-full h-full object-cover object-top" />
                          </div>
                          <div className="min-w-0 pt-1">
                              <h4 className={`text-xs font-bold ${selectedExpert.color} uppercase tracking-widest mb-0.5`}>
                                {selectedExpert.name}
                              </h4>
                              <p className="text-[10px] text-gray-500">AI Analysis • Real-time</p>
                          </div>
                      </div>

                      {/* Response Body */}
                      <div className="pl-14">
                          <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-light">{response}</p>
                      </div>

                      <button 
                        onClick={() => setResponse(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white p-2 transition-colors"
                      >
                        ✕
                      </button>
                  </div>
              </div>
          )}
       </div>
    </div>
  );
};

export default HomeChatSection;