import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, Zap, ChevronRight, 
  Wallet, Activity, Clock, MessageSquare, Briefcase 
} from 'lucide-react';
import { experts } from '../services/experts';

// Portfolio allocation data
const portfolioAllocation = [
  { name: 'Vàng', value: 35, color: '#F59E0B' },
  { name: 'Chứng khoán', value: 30, color: '#22C55E' },
  { name: 'Dầu khí', value: 20, color: '#EF4444' },
  { name: 'Kim loại hiếm', value: 15, color: '#A855F7' },
];

// Performance trend data
const performanceData = [
  { month: 'T8', value: 100 },
  { month: 'T9', value: 108 },
  { month: 'T10', value: 105 },
  { month: 'T11', value: 115 },
  { month: 'T12', value: 122 },
  { month: 'T1', value: 118 },
  { month: 'T2', value: 128 },
];

// Recent activity
const recentActivity = [
  { type: 'buy', asset: 'Vàng SJC', amount: '+50 lượng', time: '2 phút trước', change: '+1.2%' },
  { type: 'signal', asset: 'VN-Index', amount: 'Tín hiệu mua', time: '15 phút trước', change: '+0.8%' },
  { type: 'sell', asset: 'Dầu WTI', amount: '-10 barrels', time: '1 giờ trước', change: '-0.5%' },
  { type: 'alert', asset: 'Lithium', amount: 'Giá tăng mạnh', time: '3 giờ trước', change: '+5.2%' },
];

// Market sentiment data
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
];

const Dashboard: React.FC = () => {
  const advisor = experts[0]; // Henry as default advisor

  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 lg:px-0 mb-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Portfolio Overview - 4 columns */}
        <div className="lg:col-span-4 glass-panel rounded-[20px] p-6 relative overflow-hidden border-t border-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <Wallet className="w-4 h-4 text-amber-400" /> Danh Mục Đầu Tư
            </h3>
            <span className="text-[10px] text-amber-400 bg-amber-900/20 px-2 py-0.5 rounded border border-amber-500/20">
              Hôm nay
            </span>
          </div>

          {/* Pie Chart */}
          <div className="h-[160px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {portfolioAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A1224', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Tỷ lệ']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {portfolioAllocation.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400">{item.name}</span>
                <span className="text-white font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>

          {/* Total Value */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-gray-500 mb-1">Tổng giá trị</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-display">2.45B</span>
              <span className="text-xs text-gray-500">VNĐ</span>
              <span className="text-xs text-green-400 flex items-center gap-0.5 ml-auto">
                <ArrowUpRight className="w-3 h-3" /> +12.5%
              </span>
            </div>
          </div>
        </div>

        {/* Market Sentiment & Performance - 5 columns */}
        <div className="lg:col-span-5 glass-panel rounded-[20px] p-6 relative border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" /> Hiệu Suất & Sentiment
            </h3>
            <div className="flex gap-2">
              <span className="text-[10px] text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-500/20">
                +21.81% tháng này
              </span>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="h-[200px] w-full -ml-2 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10}}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A1224', 
                    border: '1px solid rgba(34,197,94,0.2)', 
                    borderRadius: '8px', 
                    color: '#fff' 
                  }}
                  formatter={(value: number) => [`${value}%`, 'Hiệu suất']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22C55E" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPerformance)" 
                  dot={{ r: 3, fill: '#050714', stroke: '#22C55E', strokeWidth: 1.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Lợi nhuận hôm nay', value: '+1.2%', color: 'text-green-400' },
              { label: 'Tổng giao dịch', value: '24', color: 'text-blue-400' },
              { label: 'Win Rate', value: '78%', color: 'text-amber-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] rounded-xl p-3 text-center">
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Advisor + Recent Activity - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Your Advisor Card */}
          <div className="glass-panel rounded-[20px] p-5 border-t border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-colors cursor-pointer">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-3">
              <div className="relative">
                <img 
                  src={advisor.image} 
                  alt={advisor.name}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0A1224]" />
              </div>
              <div>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-0.5">
                  Cố vấn của bạn
                </p>
                <h4 className="text-white font-bold">{advisor.name}</h4>
                <p className="text-xs text-gray-500">{advisor.role}</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" /> Hỏi ngay
            </button>
          </div>

          {/* Recent Activity */}
          <div className="glass-panel rounded-[20px] p-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" /> Hoạt Động
              </h3>
            </div>

            <div className="space-y-3">
              {recentActivity.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.type === 'buy' ? 'bg-green-500/10 text-green-400' :
                    item.type === 'sell' ? 'bg-red-500/10 text-red-400' :
                    item.type === 'signal' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    {item.type === 'buy' && <ArrowUpRight className="w-4 h-4" />}
                    {item.type === 'sell' && <ArrowDownRight className="w-4 h-4" />}
                    {item.type === 'signal' && <Zap className="w-4 h-4" />}
                    {item.type === 'alert' && <Activity className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{item.asset}</p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {item.time}
                    </p>
                  </div>
                  <span className={`text-xs font-bold ${
                    item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-3 text-[10px] text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
              Xem tất cả <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;