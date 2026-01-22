import React, { useRef, useState } from 'react';
import { ArrowUp, ArrowDown, Filter, Download, Activity, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area, CartesianGrid, Brush } from 'recharts';

const marketTrendData = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return {
        name: `${hour < 10 ? '0' + hour : hour}:${minute}`,
        value: 4100 + Math.random() * 150 + (Math.sin(i * 0.2) * 50),
        vol: 20 + Math.random() * 10
    };
});

const trendingStocks = [
  { sym: 'NVDA', name: 'NVIDIA Corp', price: 485.09, change: 4.52, vol: '45M', graph: [30, 40, 35, 50, 48, 60] },
  { sym: 'AMD', name: 'Adv. Micro Devices', price: 112.30, change: 2.15, vol: '22M', graph: [20, 25, 22, 28, 30, 32] },
  { sym: 'PLTR', name: 'Palantir Tech', price: 18.20, change: -1.20, vol: '30M', graph: [18, 17, 18, 16, 15, 16] },
  { sym: 'COIN', name: 'Coinbase Global', price: 154.00, change: 8.40, vol: '12M', graph: [100, 110, 130, 125, 140, 154] },
  { sym: 'MSFT', name: 'Microsoft Corp', price: 375.00, change: 0.90, vol: '18M', graph: [360, 365, 370, 368, 372, 375] },
  { sym: 'GOOGL', name: 'Alphabet Inc.', price: 138.00, change: -0.40, vol: '15M', graph: [140, 139, 138, 138.5, 137, 138] },
];

const MarketTrends: React.FC = () => {
  // Drag to scroll logic for table
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (tableContainerRef.current) {
      setStartX(e.pageX - tableContainerRef.current.offsetLeft);
      setScrollLeft(tableContainerRef.current.scrollLeft);
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
    if (tableContainerRef.current) {
      const x = e.pageX - tableContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      tableContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 md:space-y-8 animate-fade-in pb-20 md:pb-12 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
           <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">Global Market Trends</h2>
           <p className="text-sm md:text-base text-white/60 max-w-xl">Real-time AI analysis across major sectors, indices, and liquidity pools.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2.5 bg-[#0A1224] border border-white/10 rounded-[10px] hover:border-blue-500/30 hover:text-white transition-all text-sm text-gray-400 whitespace-nowrap">
              <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filter Views</span><span className="sm:hidden">Filter</span>
           </button>
           <button className="flex-1 md:flex-none justify-center flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-[10px] transition-all text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] whitespace-nowrap">
              <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export Report</span><span className="sm:hidden">Export</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
         {/* Market Index Trend (Interactive Zoom) */}
         <div className="glass-panel p-4 md:p-6 rounded-[16px] md:col-span-2 flex flex-col min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-blue-400" /> Market Index Trend (24h)
                </h3>
                <div className="flex gap-2">
                    <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded">SPX 500</span>
                    <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">+1.2%</span>
                </div>
            </div>
            <div className="h-[250px] md:h-[280px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketTrendData} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                   <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 10}} 
                        minTickGap={30}
                    />
                   <YAxis 
                        domain={['auto', 'auto']}
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 10}} 
                   />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#070B1A', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94a3b8' }}
                   />
                   <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        fill="url(#colorMarket)" 
                   />
                   <Brush 
                        dataKey="name" 
                        height={20} 
                        stroke="#3B82F6" 
                        fill="#0A1224"
                        tickFormatter={() => ''}
                        travellerWidth={10}
                        startIndex={20}
                        endIndex={40}
                   />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Market Pulse Indicators */}
         <div className="glass-panel p-4 md:p-6 rounded-[16px] flex flex-col justify-between gap-4 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" /> Market Pulse
            </h3>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between p-3 md:p-4 rounded-[12px] bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                 <span className="text-xs md:text-sm text-gray-400 font-medium">Volatility (VIX)</span>
                 <span className="font-mono text-yellow-400 font-bold text-base md:text-lg">14.20</span>
              </div>
              <div className="flex items-center justify-between p-3 md:p-4 rounded-[12px] bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                 <span className="text-xs md:text-sm text-gray-400 font-medium">Fear & Greed</span>
                 <div className="text-right">
                    <span className="font-mono text-green-400 font-bold text-base md:text-lg block leading-none">68</span>
                    <span className="text-[10px] text-green-400/70 uppercase">Greed</span>
                 </div>
              </div>
              <div className="flex items-center justify-between p-3 md:p-4 rounded-[12px] bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                 <span className="text-xs md:text-sm text-gray-400 font-medium">10Y Treasury</span>
                 <span className="font-mono text-red-400 font-bold text-base md:text-lg">4.12%</span>
              </div>
            </div>

            <div className="mt-2 pt-4 border-t border-white/10">
               <p className="text-[10px] text-blue-400 mb-2 font-bold uppercase tracking-widest flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span> AI Summary
               </p>
               <p className="text-xs md:text-sm text-gray-400 italic leading-relaxed">"Tech maintains leadership despite rate concerns. Energy sectors seeing a bounce back due to geopolitical shifts."</p>
            </div>
         </div>
      </div>

      {/* Top Movers Table */}
      <div className="glass-panel rounded-[16px] overflow-hidden border border-white/10 flex flex-col w-full max-w-full">
         <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white/[0.02]">
            <h3 className="text-base md:text-lg font-bold text-white">Most Active Equities</h3>
            <span className="text-[10px] md:text-xs text-gray-500">Last updated: Real-time</span>
         </div>
         {/* Draggable Table Container */}
         <div 
            ref={tableContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`w-full overflow-x-auto custom-scrollbar ${isDown ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
         >
            <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px] sm:min-w-full pointer-events-none">
               <thead className="bg-[#0A1224] text-gray-400 border-b border-white/5">
                  <tr>
                     <th className="p-3 md:p-4 pl-4 md:pl-8 font-medium">Symbol</th>
                     <th className="p-3 md:p-4 font-medium">Company</th>
                     <th className="p-3 md:p-4 font-medium w-32 hidden lg:table-cell">Trend (7d)</th>
                     <th className="p-3 md:p-4 font-medium text-right">Price</th>
                     <th className="p-3 md:p-4 font-medium text-right">Change %</th>
                     <th className="p-3 md:p-4 font-medium text-right hidden md:table-cell">Volume</th>
                     <th className="p-3 md:p-4 font-medium text-center pr-4 md:pr-8">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5 pointer-events-auto">
                  {trendingStocks.map((stock) => (
                     <tr key={stock.sym} className="hover:bg-white/5 transition-colors group">
                        <td className="p-3 md:p-4 pl-4 md:pl-8">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white border border-white/10 group-hover:border-blue-500/50 transition-colors shrink-0">
                                    {stock.sym[0]}
                                </div>
                                <span className="font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{stock.sym}</span>
                            </div>
                        </td>
                        <td className="p-3 md:p-4 text-white/80 font-medium max-w-[100px] sm:max-w-none truncate">{stock.name}</td>
                        <td className="p-3 md:p-4 hidden lg:table-cell">
                            <div className="h-8 w-24">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stock.graph.map((val, i) => ({i, val}))}>
                                        <Area type="monotone" dataKey="val" stroke={stock.change >= 0 ? "#22C55E" : "#EF4444"} fill="none" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </td>
                        <td className="p-3 md:p-4 text-right font-mono text-gray-200 font-semibold">${stock.price.toFixed(2)}</td>
                        <td className={`p-3 md:p-4 text-right font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                           <span className="flex items-center justify-end gap-1 bg-white/5 py-1 px-2 rounded ml-auto w-fit">
                              {stock.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                              {Math.abs(stock.change)}%
                           </span>
                        </td>
                        <td className="p-3 md:p-4 text-right text-gray-500 hidden md:table-cell">{stock.vol}</td>
                        <td className="p-3 md:p-4 text-center pr-4 md:pr-8">
                           <button className="text-[10px] md:text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all font-semibold hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] whitespace-nowrap">
                              Analyze
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default MarketTrends;