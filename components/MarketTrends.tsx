import React, { useRef, useState } from 'react';
import { ArrowUp, ArrowDown, Filter, Download, Activity, TrendingUp, Coins, BarChart3, Droplet, Gem } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area, CartesianGrid, Brush, LineChart, Line, Legend } from 'recharts';

// Sector Types
type MarketSector = 'all' | 'gold' | 'stocks' | 'oil' | 'metals';

interface SectorConfig {
  id: MarketSector;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const sectors: SectorConfig[] = [
  { id: 'all', label: 'Overview', icon: <BarChart3 className="w-4 h-4" />, color: '#3B82F6', bgColor: 'bg-blue-500/20' },
  { id: 'gold', label: 'Vàng', icon: <Coins className="w-4 h-4" />, color: '#F59E0B', bgColor: 'bg-amber-500/20' },
  { id: 'stocks', label: 'Chứng khoán', icon: <TrendingUp className="w-4 h-4" />, color: '#22C55E', bgColor: 'bg-green-500/20' },
  { id: 'oil', label: 'Dầu khí', icon: <Droplet className="w-4 h-4" />, color: '#EF4444', bgColor: 'bg-red-500/20' },
  { id: 'metals', label: 'Kim loại hiếm', icon: <Gem className="w-4 h-4" />, color: '#8B5CF6', bgColor: 'bg-violet-500/20' },
];

// Generate mock data for different sectors
const generateSectorData = (sector: MarketSector) => {
  const baseValue = sector === 'gold' ? 2050 : sector === 'oil' ? 78 : sector === 'stocks' ? 4200 : sector === 'metals' ? 1200 : 100;
  return Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return {
      name: `${hour < 10 ? '0' + hour : hour}:${minute}`,
      value: baseValue + Math.random() * (baseValue * 0.05) + (Math.sin(i * 0.2) * (baseValue * 0.02)),
      vol: 20 + Math.random() * 10
    };
  });
};

// Sector-specific assets
const sectorAssets: Record<MarketSector, {sym: string; name: string; price: number; change: number; vol: string; graph: number[]}[]> = {
  all: [
    { sym: 'XAU', name: 'Gold Spot', price: 2055.30, change: 0.85, vol: '120K', graph: [2040, 2045, 2050, 2048, 2052, 2055] },
    { sym: 'VNI', name: 'VN-Index', price: 1245.30, change: 1.20, vol: '800M', graph: [1220, 1230, 1225, 1240, 1242, 1245] },
    { sym: 'CL1', name: 'Crude Oil WTI', price: 78.50, change: -0.45, vol: '85K', graph: [79, 78.8, 78.5, 78.7, 78.4, 78.5] },
    { sym: 'PLD', name: 'Palladium', price: 985.00, change: 2.30, vol: '15K', graph: [960, 970, 975, 980, 982, 985] },
  ],
  gold: [
    { sym: 'XAU', name: 'Gold Spot (USD/oz)', price: 2055.30, change: 0.85, vol: '120K', graph: [2040, 2045, 2050, 2048, 2052, 2055] },
    { sym: 'SJC', name: 'Vàng SJC (VND/lượng)', price: 79500000, change: 0.12, vol: '5K', graph: [79200000, 79300000, 79350000, 79400000, 79450000, 79500000] },
    { sym: 'GLD', name: 'SPDR Gold Trust', price: 189.50, change: 0.65, vol: '8M', graph: [187, 188, 188.5, 189, 189.2, 189.5] },
    { sym: 'IAU', name: 'iShares Gold Trust', price: 38.20, change: 0.70, vol: '12M', graph: [37.8, 37.9, 38, 38.1, 38.15, 38.2] },
  ],
  stocks: [
    { sym: 'VNI', name: 'VN-Index', price: 1245.30, change: 1.20, vol: '800M', graph: [1220, 1230, 1225, 1240, 1242, 1245] },
    { sym: 'VCB', name: 'Vietcombank', price: 92500, change: 1.50, vol: '2.5M', graph: [90000, 91000, 91500, 92000, 92200, 92500] },
    { sym: 'FPT', name: 'FPT Corporation', price: 125000, change: 2.80, vol: '3.2M', graph: [120000, 121500, 123000, 124000, 124500, 125000] },
    { sym: 'VHM', name: 'Vinhomes', price: 45000, change: -0.50, vol: '4.1M', graph: [45500, 45300, 45200, 45100, 45050, 45000] },
  ],
  oil: [
    { sym: 'CL1', name: 'Crude Oil WTI', price: 78.50, change: -0.45, vol: '85K', graph: [79, 78.8, 78.5, 78.7, 78.4, 78.5] },
    { sym: 'BRT', name: 'Brent Crude', price: 82.30, change: -0.30, vol: '65K', graph: [83, 82.8, 82.5, 82.4, 82.35, 82.3] },
    { sym: 'NG1', name: 'Natural Gas', price: 2.85, change: 1.20, vol: '45K', graph: [2.75, 2.78, 2.80, 2.82, 2.84, 2.85] },
    { sym: 'PVD', name: 'PV Drilling', price: 28500, change: 1.80, vol: '1.2M', graph: [27500, 27800, 28000, 28200, 28400, 28500] },
  ],
  metals: [
    { sym: 'PLD', name: 'Palladium', price: 985.00, change: 2.30, vol: '15K', graph: [960, 970, 975, 980, 982, 985] },
    { sym: 'PLT', name: 'Platinum', price: 920.50, change: 1.10, vol: '22K', graph: [910, 915, 918, 920, 920.2, 920.5] },
    { sym: 'RHD', name: 'Rhodium', price: 4500.00, change: 3.50, vol: '2K', graph: [4300, 4350, 4400, 4450, 4480, 4500] },
    { sym: 'LIT', name: 'Lithium ETF', price: 42.80, change: 4.20, vol: '5M', graph: [40, 41, 41.5, 42, 42.5, 42.8] },
  ],
};

// AI Insights per sector
const sectorInsights: Record<MarketSector, string> = {
  all: "Thị trường toàn cầu đang trong xu hướng tích lũy. Vàng duy trì đà tăng nhờ lo ngại lạm phát, chứng khoán Việt Nam hồi phục mạnh.",
  gold: "Vàng đang được hỗ trợ bởi chính sách tiền tệ nới lỏng của Fed và căng thẳng địa chính trị. Mục tiêu ngắn hạn: $2,080/oz.",
  stocks: "VN-Index vượt ngưỡng kháng cự 1,240. Nhóm ngân hàng và công nghệ dẫn dắt. Thanh khoản cải thiện rõ rệt.",
  oil: "Giá dầu chịu áp lực từ dự báo nhu cầu suy yếu. OPEC+ có thể cắt giảm sản lượng thêm để hỗ trợ giá.",
  metals: "Kim loại hiếm tăng mạnh nhờ nhu cầu xe điện và năng lượng tái tạo. Lithium và Rhodium dẫn đầu đà tăng.",
};

const MarketTrends: React.FC = () => {
  const [activeSector, setActiveSector] = useState<MarketSector>('all');
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const currentSector = sectors.find(s => s.id === activeSector)!;
  const chartData = generateSectorData(activeSector);
  const assets = sectorAssets[activeSector];
  const insight = sectorInsights[activeSector];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (tableContainerRef.current) {
      setStartX(e.pageX - tableContainerRef.current.offsetLeft);
      setScrollLeft(tableContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (tableContainerRef.current) {
      const x = e.pageX - tableContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      tableContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const formatPrice = (price: number, sym: string) => {
    if (sym === 'SJC' || sym.startsWith('V') && price > 1000) {
      return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
    }
    return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 md:space-y-8 animate-fade-in pb-20 md:pb-12 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
           <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">Thị Trường Tài Chính</h2>
           <p className="text-sm md:text-base text-white/60 max-w-xl">Phân tích AI theo thời gian thực cho các lĩnh vực: Vàng, Chứng khoán, Dầu khí, Kim loại hiếm.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2.5 bg-[#0A1224] border border-white/10 rounded-[10px] hover:border-blue-500/30 hover:text-white transition-all text-sm text-gray-400 whitespace-nowrap">
              <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Bộ lọc</span><span className="sm:hidden">Lọc</span>
           </button>
           <button className="flex-1 md:flex-none justify-center flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-[10px] transition-all text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)] whitespace-nowrap">
              <Download className="w-4 h-4" /> <span className="hidden sm:inline">Xuất báo cáo</span><span className="sm:hidden">Xuất</span>
           </button>
        </div>
      </div>

      {/* Sector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {sectors.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setActiveSector(sector.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeSector === sector.id
                ? `${sector.bgColor} border border-current shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
            style={{ color: activeSector === sector.id ? sector.color : undefined }}
          >
            {sector.icon}
            {sector.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
         {/* Main Chart */}
         <div className="glass-panel p-4 md:p-6 rounded-[16px] md:col-span-2 flex flex-col min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 md:w-5 md:h-5" style={{ color: currentSector.color }} />
                    {currentSector.label} - Xu hướng 24h
                </h3>
                <div className="flex gap-2">
                    <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded">{currentSector.label.toUpperCase()}</span>
                    <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">+1.2%</span>
                </div>
            </div>
            <div className="h-[250px] md:h-[280px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
                   <defs>
                     <linearGradient id={`color${activeSector}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentSector.color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={currentSector.color} stopOpacity={0}/>
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
                      contentStyle={{ backgroundColor: '#070B1A', border: `1px solid ${currentSector.color}40`, borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94a3b8' }}
                   />
                   <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={currentSector.color} 
                        strokeWidth={2}
                        fill={`url(#color${activeSector})`} 
                   />
                   <Brush 
                        dataKey="name" 
                        height={20} 
                        stroke={currentSector.color} 
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

         {/* Market Pulse / AI Insights */}
         <div className="glass-panel p-4 md:p-6 rounded-[16px] flex flex-col justify-between gap-4 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" /> Phân tích AI
            </h3>
            
            <div className="flex-1 flex flex-col justify-center">
               <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                  <p className="text-sm text-gray-300 leading-relaxed">{insight}</p>
               </div>
            </div>

            <div className="mt-2 pt-4 border-t border-white/10 space-y-2">
               <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-xs text-gray-400">Độ tin cậy AI</span>
                  <span className="font-mono text-green-400 font-bold">87%</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-xs text-gray-400">Khuyến nghị</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">HOLD</span>
               </div>
            </div>
         </div>
      </div>

      {/* Assets Table */}
      <div className="glass-panel rounded-[16px] overflow-hidden border border-white/10 flex flex-col w-full max-w-full">
         <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white/[0.02]">
            <h3 className="text-base md:text-lg font-bold text-white">Tài sản {currentSector.label}</h3>
            <span className="text-[10px] md:text-xs text-gray-500">Cập nhật: Thời gian thực</span>
         </div>
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
                     <th className="p-3 md:p-4 pl-4 md:pl-8 font-medium">Mã</th>
                     <th className="p-3 md:p-4 font-medium">Tên tài sản</th>
                     <th className="p-3 md:p-4 font-medium w-32 hidden lg:table-cell">Xu hướng (7d)</th>
                     <th className="p-3 md:p-4 font-medium text-right">Giá</th>
                     <th className="p-3 md:p-4 font-medium text-right">Thay đổi %</th>
                     <th className="p-3 md:p-4 font-medium text-right hidden md:table-cell">Khối lượng</th>
                     <th className="p-3 md:p-4 font-medium text-center pr-4 md:pr-8">Hành động</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5 pointer-events-auto">
                  {assets.map((stock) => (
                     <tr key={stock.sym} className="hover:bg-white/5 transition-colors group">
                        <td className="p-3 md:p-4 pl-4 md:pl-8">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-[10px] font-bold text-white border border-white/10 group-hover:border-blue-500/50 transition-colors shrink-0" style={{ backgroundColor: currentSector.color + '30' }}>
                                    {stock.sym[0]}
                                </div>
                                <span className="font-bold group-hover:text-blue-300 transition-colors" style={{ color: currentSector.color }}>{stock.sym}</span>
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
                        <td className="p-3 md:p-4 text-right font-mono text-gray-200 font-semibold">{formatPrice(stock.price, stock.sym)}</td>
                        <td className={`p-3 md:p-4 text-right font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                           <span className="flex items-center justify-end gap-1 bg-white/5 py-1 px-2 rounded ml-auto w-fit">
                              {stock.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                              {Math.abs(stock.change)}%
                           </span>
                        </td>
                        <td className="p-3 md:p-4 text-right text-gray-500 hidden md:table-cell">{stock.vol}</td>
                        <td className="p-3 md:p-4 text-center pr-4 md:pr-8">
                           <button className="text-[10px] md:text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all font-semibold hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] whitespace-nowrap">
                              Phân tích
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