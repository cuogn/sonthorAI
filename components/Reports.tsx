import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Filter, Search, Eye, Trash2, Plus, BarChart3, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'weekly' | 'monthly' | 'custom';
  sector: string;
  createdAt: string;
  status: 'ready' | 'generating' | 'scheduled';
  summary: string;
  performance: number;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Báo cáo Vàng Tuần 05/2026',
    type: 'weekly',
    sector: 'Vàng',
    createdAt: '2026-02-03',
    status: 'ready',
    summary: 'Phân tích xu hướng vàng tuần qua với dự báo ngắn hạn dựa trên dữ liệu Fed và CPI.',
    performance: 2.3
  },
  {
    id: '2',
    title: 'Báo cáo Chứng khoán Tháng 01/2026',
    type: 'monthly',
    sector: 'Chứng khoán',
    createdAt: '2026-02-01',
    status: 'ready',
    summary: 'Tổng quan thị trường chứng khoán Việt Nam tháng 1/2026. VN-Index tăng 5.2%.',
    performance: 5.2
  },
  {
    id: '3',
    title: 'Phân tích Dầu khí Q1/2026',
    type: 'custom',
    sector: 'Dầu khí',
    createdAt: '2026-01-28',
    status: 'generating',
    summary: 'Báo cáo chi tiết về thị trường dầu khí quý 1 và tác động của OPEC+.',
    performance: -1.5
  },
  {
    id: '4',
    title: 'Xu hướng Kim loại hiếm 2026',
    type: 'custom',
    sector: 'Kim loại hiếm',
    createdAt: '2026-01-20',
    status: 'ready',
    summary: 'Phân tích dài hạn về nhu cầu lithium, cobalt cho ngành xe điện.',
    performance: 8.7
  },
];

const Reports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || report.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 font-medium">Sẵn sàng</span>;
      case 'generating':
        return <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 font-medium animate-pulse">Đang tạo...</span>;
      case 'scheduled':
        return <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 font-medium">Đã lên lịch</span>;
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'Vàng': return 'text-amber-400 bg-amber-500/20';
      case 'Chứng khoán': return 'text-green-400 bg-green-500/20';
      case 'Dầu khí': return 'text-red-400 bg-red-500/20';
      case 'Kim loại hiếm': return 'text-violet-400 bg-violet-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
        <div className="space-y-2">
           <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">Báo Cáo Đầu Tư</h2>
           <p className="text-sm md:text-base text-white/60 max-w-xl">Báo cáo phân tích AI tự động tạo theo tuần, tháng hoặc tùy chỉnh.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.3)]">
           <Plus className="w-4 h-4" /> Tạo báo cáo mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tổng báo cáo', value: '24', icon: <FileText className="w-5 h-5" />, color: 'text-blue-400' },
          { label: 'Tuần này', value: '3', icon: <Calendar className="w-5 h-5" />, color: 'text-green-400' },
          { label: 'Đang tạo', value: '1', icon: <BarChart3 className="w-5 h-5" />, color: 'text-yellow-400' },
          { label: 'Hiệu suất TB', value: '+4.2%', icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className={`${stat.color}`}>{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm báo cáo..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['Tất cả', 'weekly', 'monthly', 'custom'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type === 'Tất cả' ? null : type)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                (type === 'Tất cả' && !filterType) || filterType === type
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {type === 'Tất cả' ? 'Tất cả' : type === 'weekly' ? 'Hàng tuần' : type === 'monthly' ? 'Hàng tháng' : 'Tùy chỉnh'}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map(report => (
          <div key={report.id} className="glass-panel p-5 rounded-xl hover:border-white/20 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <PieChart className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">{report.title}</h3>
                    {getStatusBadge(report.status)}
                  </div>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-1">{report.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded ${getSectorColor(report.sector)}`}>{report.sector}</span>
                    <span>{report.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-1 text-sm font-bold ${report.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {report.performance >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {Math.abs(report.performance)}%
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-blue-500/20 rounded-lg text-gray-400 hover:text-blue-400 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
