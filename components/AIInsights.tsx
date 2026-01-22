import React from 'react';
import { BrainCircuit, Sparkles, TrendingUp, AlertTriangle, FileText, Zap } from 'lucide-react';

const AIInsights: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto space-y-10 animate-fade-in pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
         <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-500/10 border border-blue-500/30 mb-2 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <BrainCircuit className="w-10 h-10 text-blue-400" />
         </div>
         <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Henry's Daily Briefing</h2>
         <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Proprietary deep learning analysis processing millions of data points to bring you actionable intelligence.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
         {/* Featured Insight - Spans 2 columns */}
         <div className="col-span-1 md:col-span-2 lg:col-span-2 glass-panel p-8 md:p-10 rounded-[24px] relative overflow-hidden group border-blue-500/30 transition-all hover:border-blue-500/50">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 p-6 z-20">
               <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                 <Zap className="w-3 h-3 fill-current" /> Featured Analysis
               </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#070B1A]/80 to-transparent pointer-events-none z-0" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display leading-tight drop-shadow-lg">Semiconductor <br/>Supercycle</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">#Hardware</span>
                        <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">#AI</span>
                        <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">#Growth</span>
                    </div>
                    <p className="text-white/70 mb-8 text-lg max-w-xl leading-relaxed font-light">
                    Our models indicate a sustained growth period for semiconductor manufacturing equipment suppliers, driven by sovereign AI initiatives. The correlation between data center expansion and GPU demand remains at 0.92, suggesting continued upside.
                    </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-6">
                    <button className="flex items-center gap-3 bg-white text-[#0A1224] font-bold px-8 py-3.5 rounded-[12px] hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20 group/btn">
                        <FileText className="w-4 h-4" /> Read Full Report
                        <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                    </button>
                    <div className="flex items-center gap-2 text-xs text-blue-300/80 bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-500/20">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Generated 2 hours ago
                    </div>
                </div>
            </div>
         </div>

         {/* Risk Alert Card */}
         <div className="glass-panel p-8 rounded-[24px] border border-yellow-500/30 bg-gradient-to-b from-yellow-500/5 to-transparent hover:bg-yellow-500/10 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent" />
            
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2.5 bg-yellow-500/20 rounded-lg text-yellow-500">
                 <AlertTriangle className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-white tracking-wide">Risk Alert</h3>
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
               Detecting unusual options activity in the Retail sector. Implied volatility suggests a potential <span className="text-white font-bold">5-8% swing</span> in the coming 48 hours.
            </p>
            
            <div className="mt-auto space-y-3 p-4 rounded-xl bg-black/20 border border-white/5">
                <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest font-bold">
                    <span>AI Confidence</span>
                    <span className="text-yellow-500">88%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 w-[88%] h-full shadow-[0_0_15px_rgba(234,179,8,0.6)]" />
                </div>
            </div>
         </div>

         {/* Standard Insight Cards */}
         {[
             { title: "Emerging Market Rotation", type: "Equity Market", desc: "Capital flows suggest a rotation from large-cap tech into emerging market ETFs as the dollar index (DXY) softens." },
             { title: "Crypto Liquidity Spike", type: "Digital Assets", desc: "Significant inflow into L2 protocols observed. On-chain analysis indicates accumulation by institutional wallets." },
             { title: "Energy Sector Pivot", type: "Commodities", desc: "Geopolitical tensions driving a short-term rally in oil futures. Recommendation to hedge long transport positions." }
         ].map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-[24px] hover:-translate-y-2 hover:border-blue-500/40 transition-all duration-300 group cursor-pointer flex flex-col">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors border border-blue-500/10">
                     <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full font-bold">{item.type}</span>
               </div>
               <h4 className="font-bold text-white mb-3 text-xl group-hover:text-blue-300 transition-colors">{item.title}</h4>
               <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">
                  {item.desc}
               </p>
               <button className="text-blue-400 text-sm font-bold hover:text-white flex items-center gap-2 group-hover:translate-x-1 transition-all mt-auto pt-4 border-t border-white/5">
                  View Data Analysis <Sparkles className="w-3 h-3" />
               </button>
            </div>
         ))}
      </div>
    </div>
  );
};

export default AIInsights;