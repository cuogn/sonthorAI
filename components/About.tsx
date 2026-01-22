import React, { useState, useRef } from 'react';
import { ShieldCheck, Cpu, Users, Globe, ChevronRight, Briefcase, Sparkles } from 'lucide-react';

const experts = [
  {
    id: 'henry',
    name: "Henry Swe",
    role: "Chief AI Analyst",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Increased resolution
    desc: "Built on Gemini 2.5, Henry processes 5M+ market signals daily.",
    bio: "Henry isn't just a chatbot; he's a fine-tuned persona built on top of the world's most advanced LLMs. Designed to emulate the decision-making process of a senior portfolio manager, Henry remembers your portfolio history, understands your risk tolerance, and adapts his communication style to your expertise level.",
    stats: { val1: "1M+", label1: "Conversations", val2: "24/7", label2: "Availability" }
  },
  {
    id: 'elena',
    name: "Dr. Elena Vostok",
    role: "Quant Risk Lead",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "PhD in Computational Finance. Specializes in volatility modeling.",
    bio: "Elena operates our core risk management engine. With a background in theoretical physics and computational finance, she runs Monte Carlo simulations on every trade suggestion to ensure your portfolio stays within your defined risk parameters, even during black swan events.",
    stats: { val1: "50k+", label1: "Simulations/Sec", val2: "99.9%", label2: "Accuracy" }
  },
  {
    id: 'marcus',
    name: "Marcus Chen",
    role: "Macro Strategist",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Former Hedge Fund Manager focusing on forex and geopolitical impacts.",
    bio: "Marcus synthesizes global macroeconomic data, from central bank interest rate decisions to geopolitical supply chain shifts. He provides the 'big picture' context that purely technical models often miss, helping you pivot before the market turns.",
    stats: { val1: "150+", label1: "Economies Tracked", val2: "15yr", label2: "Hist. Data" }
  },
  {
    id: 'sarah',
    name: "Sarah Jenks",
    role: "Crypto Specialist",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Expert in DeFi protocols and on-chain analytics.",
    bio: "Sarah lives on the blockchain. She monitors wallet movements of 'whales', analyzes smart contract audits in real-time, and tracks DeFi liquidity pools. If there is movement in the digital asset space, Sarah knows about it 3 blocks before the news breaks.",
    stats: { val1: "24/7", label1: "On-Chain Watch", val2: "500+", label2: "Protocols" }
  },
  {
    id: 'aris',
    name: "Aris Thorne",
    role: "Technical Analyst",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Specializes in algorithmic pattern recognition and momentum indicators.",
    bio: "Aris is a pure technician. He doesn't care about the news; he cares about price action. Using advanced computer vision and mathematical modeling, Aris identifies chart patterns, support/resistance levels, and momentum divergences with pixel-perfect precision.",
    stats: { val1: "200+", label1: "Patterns Recog.", val2: "ms", label2: "Latency" }
  },
  {
    id: 'sofia',
    name: "Sofia Kovač",
    role: "ESG Strategist",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Focuses on sustainable long-term growth opportunities.",
    bio: "Sofia ensures your investments align with the future. She analyzes corporate governance reports, carbon footprint data, and social impact metrics. Her philosophy is that sustainable companies are the profitable giants of tomorrow.",
    stats: { val1: "30TB", label1: "ESG Data Processed", val2: "A+", label2: "Rating" }
  },
  {
    id: 'kenji',
    name: "Kenji Tanaka",
    role: "Commodities Lead",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    desc: "Expertise in global supply chains and energy futures.",
    bio: "Kenji tracks the physical world. From oil tanker routes to crop yields and precious metal reserves, Kenji's models predict commodity price swings that affect the entire global market, providing a hedge against inflation and volatility.",
    stats: { val1: "Global", label1: "Supply Tracking", val2: "Real", label2: "Time Inventory" }
  }
];

const About: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState(experts[0]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [moved, setMoved] = useState(false);

  // Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setMoved(false);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (sliderRef.current) {
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1.5; 
      if (Math.abs(walk) > 5) setMoved(true);
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleItemClick = (expert: typeof experts[0]) => {
      if (!moved) {
          setSelectedExpert(expert);
      }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 md:space-y-20 animate-fade-in pb-16 w-full">
       {/* Mission Section */}
       <div className="text-center space-y-4 md:space-y-8 pt-6 md:pt-12 relative px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-500/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-tight relative z-10">
             Democratizing <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">Institutional Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed relative z-10">
             SONTHOR was built on a simple premise: Retail investors deserve the same quality of data analysis, speed, and precision as Wall Street hedge funds.
          </p>
       </div>

       {/* Features Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 lg:px-0">
          <div className="glass-panel p-6 md:p-10 rounded-[24px] border-t-2 border-t-blue-500 hover:bg-white/[0.03] transition-colors group">
             <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <Cpu className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />
             </div>
             <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">Powered by Gemini 2.5</h3>
             <p className="text-gray-400 leading-relaxed text-sm md:text-base lg:text-lg">
                Our core engine utilizes the latest Google Gemini models to process natural language queries and massive datasets in milliseconds. We synthesize millions of news articles, earnings reports, and social signals into real-time, actionable insights.
             </p>
          </div>
          <div className="glass-panel p-6 md:p-10 rounded-[24px] border-t-2 border-t-cyan-500 hover:bg-white/[0.03] transition-colors group">
             <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                 <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-cyan-500" />
             </div>
             <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-display">Zero-Hallucination Policy</h3>
             <p className="text-gray-400 leading-relaxed text-sm md:text-base lg:text-lg">
                We verify every insight against real-time exchange data. Our RAG (Retrieval-Augmented Generation) pipeline ensures no hallucinations—just hard numbers backed by statistical probability and rigorous historical backtesting.
             </p>
          </div>
       </div>

       {/* Expert Committee Section - Draggable */}
       <div className="space-y-6 md:space-y-10 overflow-hidden w-full">
          <div className="flex items-center justify-between px-4 lg:px-0">
             <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-white/5 rounded-xl border border-white/10">
                   <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <h3 className="text-xl md:text-3xl font-display font-bold text-white">Investment Committee</h3>
             </div>
             <p className="text-xs text-white/30 hidden sm:block">Drag to select analyst</p>
          </div>
          
          <div 
             ref={sliderRef}
             onMouseDown={handleMouseDown}
             onMouseLeave={handleMouseLeave}
             onMouseUp={handleMouseUp}
             onMouseMove={handleMouseMove}
             className={`flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-2 px-4 lg:px-0 scrollbar-hide select-none w-full ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
             {experts.map((expert) => (
                <div 
                    key={expert.id} 
                    onClick={() => handleItemClick(expert)}
                    className={`glass-panel p-5 md:p-6 rounded-[24px] min-w-[260px] w-[260px] md:min-w-[280px] md:w-[280px] group transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden cursor-pointer ${selectedExpert.id === expert.id ? 'border-blue-500/60 bg-blue-900/10 scale-105 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.03]'}`}
                >
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                   
                   <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br mb-6 relative transition-all duration-500 ${selectedExpert.id === expert.id ? 'from-blue-400 to-cyan-400 rotate-12' : 'from-white/10 to-transparent'}`}>
                      <img 
                        src={expert.img} 
                        alt={expert.name} 
                        className="w-full h-full rounded-full object-cover border-4 border-[#070B1A] pointer-events-none" 
                      />
                      {expert.role.includes("AI") && (
                         <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#070B1A] rounded-full flex items-center justify-center border border-blue-500/50">
                            <Cpu className="w-3 h-3 text-blue-400" />
                         </div>
                      )}
                   </div>
                   
                   <h4 className={`text-lg md:text-xl font-bold mb-1 transition-colors ${selectedExpert.id === expert.id ? 'text-white' : 'text-gray-300'}`}>{expert.name}</h4>
                   <p className="text-[10px] md:text-xs text-blue-400 font-bold uppercase tracking-widest mb-4">{expert.role}</p>
                   <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">{expert.desc}</p>
                   
                   {selectedExpert.id === expert.id && (
                       <div className="mt-4 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mx-auto"></div>
                   )}
                </div>
             ))}
          </div>
       </div>

       {/* Team/Persona Highlight - Responsive Layout */}
       <div className="glass-panel mx-4 lg:mx-0 p-6 md:p-8 lg:p-12 rounded-[24px] md:rounded-[32px] border border-white/10 relative overflow-hidden min-h-auto flex items-stretch">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-12 relative z-10">
             
             {/* Image Column */}
             <div className="w-full lg:w-5/12 relative flex-shrink-0">
                 <div key={selectedExpert.id} className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[480px] w-full relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in group">
                     <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10" />
                     <img 
                        src={selectedExpert.img} 
                        alt={selectedExpert.name}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                     />
                 </div>
                 {/* Decorative elements - Hidden on mobile/tablet to reduce clutter */}
                 <div className="hidden lg:block absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-full blur-[60px] opacity-50 pointer-events-none" />
                 <div className="hidden lg:block absolute -top-6 -left-6 w-24 h-24 bg-cyan-500 rounded-full blur-[60px] opacity-50 pointer-events-none" />
             </div>

             {/* Content Column */}
             <div className="w-full lg:w-7/12 flex flex-col justify-center">
                <div key={selectedExpert.id} className="animate-fade-in space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-6 md:w-8 h-[1px] bg-cyan-400"></span>
                            <p className="text-cyan-400 text-xs md:text-sm font-bold uppercase tracking-widest">{selectedExpert.role}</p>
                        </div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display">Meet {selectedExpert.name.split(' ')[0]}</h3>
                    </div>
                    
                    <div className="min-h-auto">
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                        {selectedExpert.bio}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2">
                        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-base md:text-lg">{selectedExpert.stats.val1}</p>
                                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{selectedExpert.stats.label1}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Globe className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-base md:text-lg">{selectedExpert.stats.val2}</p>
                                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">{selectedExpert.stats.label2}</p>
                            </div>
                        </div>
                    </div>

                    <button className="text-white font-bold flex items-center gap-2 hover:gap-4 transition-all group w-fit text-sm md:text-base mt-2">
                        Start a conversation with {selectedExpert.name.split(' ')[0]} <ChevronRight className="w-4 h-4 text-blue-400" />
                    </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default About;