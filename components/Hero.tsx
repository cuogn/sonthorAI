import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Expert } from '../types';

interface HeroProps {
  expert: Expert;
}

const Hero: React.FC<HeroProps> = ({ expert }) => {
  return (
    <section className="relative pt-8 md:pt-16 pb-12 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 min-h-auto lg:min-h-[600px] flex items-center transition-all duration-500 overflow-hidden lg:overflow-visible">
      
      {/* Background Holographic Chart & Sparkles */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden lg:overflow-visible">
          {/* Main Glowing Line - Scaled for mobile */}
          <svg className="w-[200%] md:w-full h-full absolute top-0 left-[-50%] md:left-0 z-10 opacity-90" viewBox="0 0 1600 600" preserveAspectRatio="none">
             <defs>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                 <feMerge>
                   <feMergeNode in="coloredBlur"/>
                   <feMergeNode in="SourceGraphic"/>
                 </feMerge>
               </filter>
               <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.2" />
               </linearGradient>
             </defs>
             {/* Grid Lines */}
             <path d="M0,450 L1600,450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
             <path d="M0,300 L1600,300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
             <path d="M0,150 L1600,150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
             
             {/* Chart Line */}
             <path d="M-50,500 Q 350,480 500,350 T 900,200 T 1650,50" 
                   fill="none" stroke="url(#lineGradient)" strokeWidth="3" 
                   filter="url(#glow)" className="animate-shimmer" />
             
             {/* Candlesticks - Hidden on very small screens to reduce noise */}
             <rect x="1250" y="100" width="6" height="60" fill="rgba(34, 197, 94, 0.2)" rx="2" className="hidden md:block" />
             <rect x="1300" y="80" width="6" height="90" fill="rgba(34, 197, 94, 0.15)" rx="2" className="hidden md:block" />
          </svg>

          {/* Glowing Nodes & Floating Labels - Repositioned for mobile */}
          <div className="hidden md:block absolute top-[58%] left-[28%] z-20 animate-float" style={{animationDelay: '0s'}}>
             <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_4px_rgba(59,130,246,0.8)] relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
             </div>
             <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#050714]/80 backdrop-blur border border-blue-500/30 px-2 py-1 rounded text-[10px] text-blue-300 font-mono whitespace-nowrap">
                +2.84%
             </div>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between relative w-full gap-12 lg:gap-0">
        {/* Left Content */}
        <div className="w-full lg:w-5/12 relative z-20 space-y-6 md:space-y-8 text-center lg:text-left">
          <div>
             <h1 className="text-4xl sm:text-5xl md:text-[64px] font-sans font-bold leading-[1.1] tracking-tight drop-shadow-2xl">
               <span className="text-white">AI-Powered</span><br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-white">Investment</span><br/>
               <span className="text-white">Guidance</span>
             </h1>
          </div>
          
          <p className="text-base md:text-lg text-white/70 max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
            Harness the power of AI to analyze market trends and make informed investment decisions with institutional-grade precision.
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <button className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-8 py-4 rounded-[12px] font-bold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:scale-105 transition-all border border-blue-400/20">
              START INVESTING <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Content / Character */}
        <div className="w-full lg:w-5/12 relative flex justify-center lg:justify-end items-end h-[400px] md:h-[500px] lg:h-[600px] pointer-events-none mt-8 lg:mt-0">
           <div className="relative w-full max-w-[650px] h-full flex items-end justify-center">
              
              {/* Character Image */}
              <div className="relative z-10 w-[300px] md:w-[400px] lg:w-[500px] h-[350px] md:h-[450px] lg:h-[550px] flex items-end justify-center">
                  <img 
                    key={expert.id} 
                    src={expert.image} 
                    alt={expert.name} 
                    className="w-full h-full object-cover object-top relative z-10 animate-fade-in"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                        mixBlendMode: 'normal',
                        filter: 'contrast(1.1) brightness(1.1) drop-shadow(0 0 30px rgba(0,0,0,0.8))'
                    }}
                  />
              </div>

              {/* Background Glows for Character */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:right-20 w-[280px] md:w-[400px] h-[280px] md:h-[400px] ${expert.id === 'elena' ? 'bg-purple-900/30' : expert.id === 'marcus' ? 'bg-emerald-900/30' : expert.id === 'sarah' ? 'bg-orange-900/30' : 'bg-blue-900/30'} rounded-full blur-[60px] md:blur-[80px] z-0 transition-colors duration-700`}></div>

              {/* Nameplate - Centered on mobile */}
              <div className="absolute bottom-[5%] lg:bottom-[10%] lg:right-[10%] z-30 glass-panel px-4 py-2 md:px-6 md:py-3 rounded-[12px] border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-fade-in-up">
                  <div className="flex flex-col items-center lg:items-end">
                      <span className={`text-[9px] md:text-[10px] ${expert.color} tracking-[0.2em] uppercase font-display font-bold mb-1`}>{expert.role}</span>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                         <span className="text-base md:text-xl font-bold text-white font-display tracking-wide uppercase">{expert.name}</span>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;