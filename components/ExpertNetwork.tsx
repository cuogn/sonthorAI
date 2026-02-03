import React, { useState } from 'react';
import { Users, Star, Clock, Award, Calendar, MessageSquare, Filter, Search, ChevronRight, Briefcase, GraduationCap, Globe } from 'lucide-react';
import { experts, Expert } from '../services/experts';

const ExpertNetwork: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const specialties = ['Tất cả', 'Equities', 'Crypto', 'Commodities', 'Risk Management', 'Macro'];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          expert.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || selectedSpecialty === 'Tất cả' || 
                             expert.specialty.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    return matchesSearch && matchesSpecialty;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
         <div className="inline-flex items-center justify-center p-4 rounded-full bg-purple-500/10 border border-purple-500/30 mb-2 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
            <Users className="w-10 h-10 text-purple-400" />
         </div>
         <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Mạng Lưới Chuyên Gia</h2>
         <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Kết nối với các chuyên gia tài chính hàng đầu. Nhận tư vấn cá nhân hóa với chi phí hợp lý.
         </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chuyên gia..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec === 'Tất cả' ? null : spec)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                (spec === 'Tất cả' && !selectedSpecialty) || selectedSpecialty === spec
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Expert Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExperts.map(expert => (
          <div 
            key={expert.id}
            onClick={() => setSelectedExpert(expert)}
            className="glass-panel p-6 rounded-[20px] hover:border-purple-500/30 transition-all cursor-pointer group"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="relative">
                <img 
                  src={expert.image} 
                  alt={expert.name}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-white/10 group-hover:border-purple-500/50 transition-colors"
                />
                <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0A1224] ${
                  expert.available ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">{expert.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{expert.rating}</span>
                    <span className="text-xs text-gray-500">({expert.reviews})</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">{expert.role}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {expert.specialty.slice(0, 3).map(spec => (
                    <span key={spec} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {expert.experience} năm
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {expert.languages.length} ngôn ngữ
                    </span>
                  </div>
                  <span className="text-purple-400 font-bold text-sm">
                    {formatPrice(expert.hourlyRate)}/giờ
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-xs text-gray-500 line-clamp-2 flex-1 mr-4">{expert.description}</p>
              <button className="flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-500 hover:text-white transition-all whitespace-nowrap">
                Đặt lịch <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Expert Detail Modal */}
      {selectedExpert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedExpert(null)}
        >
          <div 
            className="glass-panel max-w-2xl w-full rounded-[24px] p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex gap-6 mb-6">
              <img 
                src={selectedExpert.image} 
                alt={selectedExpert.name}
                className="w-28 h-28 rounded-xl object-cover border-2 border-purple-500/30"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{selectedExpert.name}</h2>
                <p className="text-purple-400 mb-2">{selectedExpert.role}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    {selectedExpert.rating} ({selectedExpert.reviews} đánh giá)
                  </span>
                  <span className={`flex items-center gap-1 ${selectedExpert.available ? 'text-green-400' : 'text-gray-400'}`}>
                    <Clock className="w-4 h-4" />
                    {selectedExpert.available ? 'Đang rảnh' : 'Đang bận'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{selectedExpert.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Kinh nghiệm</span>
                </div>
                <p className="text-white font-bold">{selectedExpert.experience} năm</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Ngôn ngữ</span>
                </div>
                <p className="text-white font-bold">{selectedExpert.languages.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 mb-6">
              <div>
                <p className="text-sm text-gray-400">Phí tư vấn</p>
                <p className="text-2xl font-bold text-white">{formatPrice(selectedExpert.hourlyRate)}<span className="text-sm text-gray-400">/giờ</span></p>
              </div>
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <Calendar className="w-5 h-5" />
                Đặt lịch ngay
              </button>
            </div>

            <button 
              onClick={() => setSelectedExpert(null)}
              className="w-full py-3 text-gray-400 hover:text-white transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertNetwork;
