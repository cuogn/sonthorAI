import React, { useState, useRef } from 'react';
import { Users, Star, Clock, Calendar, Search, ChevronRight, Briefcase, Globe, X } from 'lucide-react';
import { experts, Expert } from '../services/experts';

const ExpertNetwork: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

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
    <section className="w-full min-h-screen overflow-x-hidden">
      {/* Main Container - Responsive padding & max-width */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 pb-20 md:pb-16 animate-fade-in">
        
        {/* ===== HERO / INTRO AREA ===== */}
        <header className="text-center pt-6 sm:pt-8 md:pt-10 pb-6 md:pb-8">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4 md:mb-6 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
          </div>
          
          {/* Title - Responsive typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-3 md:mb-4 break-words">
            Mạng Lưới Chuyên Gia
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            Kết nối với các chuyên gia tài chính hàng đầu. Nhận tư vấn cá nhân hóa với chi phí hợp lý.
          </p>
        </header>

        {/* ===== SEARCH BAR ===== */}
        <div className="mb-4 md:mb-6">
          <div className="relative w-full max-w-2xl mx-auto md:mx-0 md:max-w-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm chuyên gia..."
              className="w-full min-h-[48px] bg-white/[0.04] border border-white/[0.08] rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
        </div>

        {/* ===== CATEGORY CHIPS - Horizontal scrollable on mobile ===== */}
        <div className="mb-6 md:mb-8 -mx-4 sm:-mx-5 md:mx-0">
          <div 
            ref={chipsRef}
            className="flex gap-2 sm:gap-3 overflow-x-auto px-4 sm:px-5 md:px-0 pb-2 scrollbar-hide snap-x snap-mandatory md:flex-wrap md:overflow-visible"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec === 'Tất cả' ? null : spec)}
                className={`flex-shrink-0 snap-start min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  (spec === 'Tất cả' && !selectedSpecialty) || selectedSpecialty === spec
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.15)]'
                    : 'bg-white/[0.04] text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/20 active:scale-95'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* ===== EXPERT CARDS GRID ===== */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {filteredExperts.map(expert => (
            <article 
              key={expert.id}
              onClick={() => setSelectedExpert(expert)}
              className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-2xl sm:rounded-[20px] p-4 sm:p-5 md:p-6 hover:border-purple-500/30 hover:bg-white/[0.06] transition-all cursor-pointer group"
            >
              {/* Card Content - Avatar + Info */}
              <div className="flex gap-3 sm:gap-4">
                {/* Avatar - Fixed sizes per breakpoint */}
                <div className="relative flex-shrink-0">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl object-cover border-2 border-white/10 group-hover:border-purple-500/50 transition-colors"
                    loading="lazy"
                  />
                  {/* Status dot */}
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#0A1224] ${
                    expert.available ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0">
                  {/* Name + Rating Row */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-purple-300 transition-colors truncate">
                      {expert.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      <span className="text-xs sm:text-sm font-bold">{expert.rating}</span>
                    </div>
                  </div>
                  
                  {/* Role */}
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 truncate">{expert.role}</p>
                  
                  {/* Tags - Flex wrap with safe overflow */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                    {expert.specialty.slice(0, 2).map(spec => (
                      <span 
                        key={spec} 
                        className="text-[10px] sm:text-xs px-2 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-gray-300"
                      >
                        {spec}
                      </span>
                    ))}
                    {expert.specialty.length > 2 && (
                      <span className="text-[10px] sm:text-xs px-2 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-gray-400">
                        +{expert.specialty.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Meta Info Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {expert.experience} năm
                      </span>
                      <span className="hidden sm:flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {expert.languages.length} ngôn ngữ
                      </span>
                    </div>
                    <span className="text-purple-400 font-bold text-xs sm:text-sm">
                      {formatPrice(expert.hourlyRate)}/giờ
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer - Description + CTA */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/[0.05] flex items-center gap-3">
                <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2 flex-1">
                  {expert.description}
                </p>
                <button className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 bg-purple-500/20 text-purple-400 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-500 hover:text-white active:scale-95 transition-all min-h-[40px] sm:min-h-[44px]">
                  Đặt lịch <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </article>
          ))}
        </main>

        {/* Empty State */}
        {filteredExperts.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Không tìm thấy chuyên gia phù hợp</p>
            <p className="text-gray-500 text-sm mt-2">Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>

      {/* ===== EXPERT DETAIL MODAL ===== */}
      {selectedExpert && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedExpert(null)}
        >
          <div 
            className="w-full sm:max-w-lg md:max-w-2xl bg-[#0A1224]/95 backdrop-blur-xl border border-white/[0.08] rounded-t-[24px] sm:rounded-[24px] p-5 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button - Mobile */}
            <button 
              onClick={() => setSelectedExpert(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors sm:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-6">
              <img 
                src={selectedExpert.image} 
                alt={selectedExpert.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl object-cover border-2 border-purple-500/30 mx-auto sm:mx-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{selectedExpert.name}</h2>
                <p className="text-purple-400 mb-3 text-sm sm:text-base">{selectedExpert.role}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    {selectedExpert.rating} ({selectedExpert.reviews})
                  </span>
                  <span className={`flex items-center gap-1.5 ${selectedExpert.available ? 'text-green-400' : 'text-gray-400'}`}>
                    <Clock className="w-4 h-4" />
                    {selectedExpert.available ? 'Đang rảnh' : 'Đang bận'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">{selectedExpert.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div className="bg-white/[0.04] rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Kinh nghiệm</span>
                </div>
                <p className="text-white font-bold text-lg">{selectedExpert.experience} năm</p>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Ngôn ngữ</span>
                </div>
                <p className="text-white font-bold text-sm sm:text-base">{selectedExpert.languages.join(', ')}</p>
              </div>
            </div>

            {/* Pricing CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 mb-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-400">Phí tư vấn</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {formatPrice(selectedExpert.hourlyRate)}
                  <span className="text-sm text-gray-400 font-normal">/giờ</span>
                </p>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] min-h-[48px]">
                <Calendar className="w-5 h-5" />
                Đặt lịch ngay
              </button>
            </div>

            {/* Close Button - Desktop */}
            <button 
              onClick={() => setSelectedExpert(null)}
              className="hidden sm:block w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpertNetwork;
