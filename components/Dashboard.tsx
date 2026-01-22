import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Brush } from 'recharts';
import { ArrowUpRight, TrendingUp, Zap, ChevronRight } from 'lucide-react';

const sentimentData = [
  { name: '09:30', value: 42 },
  { name: '10:00', value: 45 },
  { name: '10:30', value: 48 },
  { name: '11:00', value: 52 },
  { name: '11:30', value: 49 },
  { name: '12:00', value: 62 },
  { name: '12:30', value: 58 },
  { name: '13:00', value: 75 },
  { name: '13:30', value: 80 },
  { name: '14:00', value: 85 },
  { name: '14:30', value: 82 },
  { name: '15:00', value: 88 },
  { name: '15:30', value: 92 },
  { name: '16:00', value: 89 },
];

const smallChartData = [
    { v: 10 }, { v: 15 }, { v: 13 }, { v: 20 }, { v: 18 }, { v: 25 }, { v: 22 }, { v: 30 }
];

const insights = [
    { ticker: 'TSLA', name: 'Tesla Inc', change: '+33.17%', signal: 'Growth', color: 'text-green-400' },
    { ticker: 'NVDA', name: 'Nvidia', change: '+23.79%', signal: 'Momentum', color: 'text-green-400' },
    { ticker: 'AAPL', name: 'Apple Inc', change: '+1.45%', signal: 'Stable', color: 'text-blue-400' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 lg:px-0 mb-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Col 1: Market Sentiment (3 columns wide) */}
        <div className="lg:col-span-3 glass-panel rounded-[20px] p-6 flex flex-col justify-between relative group border-t border-white/10 hover:border-blue-500/30 transition-colors">
           <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl -z-10"></div>
           <div>
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" /> Market Sentiment
              </h3>
              <div className="mb-4">
                  <span className="text-4xl font-display font-bold text-white tracking-wide block mb-1">+21.81%</span>
                  <span className="text-[10px] text-green-400 uppercase tracking-widest font-bold bg-green-900/20 px-2 py-1 rounded border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]">Bullish Trend</span>
              </div>
           </div>

           <div className="h-[180px] w-full relative z-10 mb-4 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={sentimentData}>
                    <defs>
                       <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#64748b', fontSize: 10}} 
                       interval="preserveStartEnd"
                    />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#070B1A', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', color: '#fff' }}
                       itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="value" 
                       stroke="#60A5FA" 
                       strokeWidth={2}
                       fillOpacity={1} 
                       fill="url(#colorSentiment)" 
                       dot={{ r: 3, fill: '#050714', stroke: '#60A5FA', strokeWidth: 1.5 }}
                    />
                    <Brush 
                       dataKey="name" 
                       height={20} 
                       stroke="#3B82F6" 
                       fill="#0A1224" 
                       tickFormatter={() => ''}
                       travellerWidth={10}
                       startIndex={4}
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           <button className="w-full text-xs font-bold text-blue-300 border border-blue-500/30 py-3 rounded-xl hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              Show Recommendations <ChevronRight className="w-3 h-3" />
           </button>
        </div>

        {/* Col 2: AI Insights (5 columns wide) */}
        <div className="lg:col-span-6 glass-panel rounded-[20px] p-6 flex flex-col relative border-t border-white/10">
           <div className="flex justify-between items-start mb-6">
              <div>
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400 fill-current" /> AI Insights
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-sm">
                     AI prediction suggests an <span className="text-white font-medium">upward trend</span> in technology stocks over the next week based on recent earnings reports.
                  </p>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {insights.map((stock) => (
                 <div key={stock.ticker} className="p-4 rounded-[16px] bg-[#0A1224]/80 border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/10 text-xs font-bold text-white group-hover:border-blue-500/50 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all">
                            {stock.ticker[0]}
                        </div>
                        <span className={`text-[10px] font-bold ${stock.color} bg-white/5 px-1.5 py-0.5 rounded`}>{stock.change}</span>
                    </div>
                    
                    <div className="h-8 w-full mb-1 opacity-50 group-hover:opacity-100 transition-opacity">
                         <ResponsiveContainer width="100%" height="100%">
                             <LineChart data={smallChartData}>
                                 <Line type="monotone" dataKey="v" stroke="#60A5FA" strokeWidth={1.5} dot={false} />
                             </LineChart>
                         </ResponsiveContainer>
                    </div>
                    
                    <div>
                        <h4 className="text-white text-xs font-bold">{stock.ticker}</h4>
                        <p className="text-[10px] text-gray-500">{stock.name}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Col 3: Compact Recommendations (3 columns wide) */}
        <div className="lg:col-span-3 glass-panel-dark rounded-[20px] p-6 border border-blue-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[50px] pointer-events-none"></div>
           
           <div className="flex justify-between items-center mb-5">
               <h3 className="text-white font-bold text-sm">Top Picks</h3>
               <span className="text-[10px] text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-500/20">AI Updated</span>
           </div>

           <div className="space-y-3">
               {[
                   { t: 'TSLA', v: '+33.17%', n: 'Tesla' },
                   { t: 'NVDA', v: '+23.79%', n: 'Nvidia' },
                   { t: 'AMD', v: '+12.40%', n: 'AMD' }
               ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-[12px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-colors group">
                       <div className="flex items-center gap-3">
                           <div className="w-1.5 h-8 bg-green-500/50 rounded-full group-hover:bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)] transition-colors"></div>
                           <div>
                               <p className="text-white font-bold text-sm">{item.t}</p>
                               <p className="text-[10px] text-gray-500">{item.n}</p>
                           </div>
                       </div>
                       <div className="text-right">
                           <p className="text-green-400 font-mono text-xs font-bold">{item.v}</p>
                           <ArrowUpRight className="w-3 h-3 text-green-500 ml-auto opacity-70" />
                       </div>
                   </div>
               ))}
           </div>
           
           <button className="w-full mt-4 text-[10px] text-gray-400 hover:text-white transition-colors">View All Analysis</button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;