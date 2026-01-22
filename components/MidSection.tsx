import React, { useRef, useState } from 'react';
import { Shield, TrendingUp, Globe, Coins, ChevronRight, BarChart2, Leaf, Layers } from 'lucide-react';
import { Expert, NavLink } from '../types';

export const experts: Expert[] = [
  {
    id: 'henry',
    name: "Henry Swe",
    role: "Chief AI Analyst",
    specialty: "Equities & Market Trends",
    icon: TrendingUp,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'elena',
    name: "Dr. Elena Vostok",
    role: "Quant Risk Lead",
    specialty: "Derivatives & Volatility",
    icon: Shield,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'marcus',
    name: "Marcus Chen",
    role: "Macro Strategist",
    specialty: "Forex & Global Econ",
    icon: Globe,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'sarah',
    name: "Sarah Jenks",
    role: "Crypto Specialist",
    specialty: "DeFi & Blockchain",
    icon: Coins,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'aris',
    name: "Aris Thorne",
    role: "Technical Analyst",
    specialty: "Chart Patterns & TA",
    icon: BarChart2,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'sofia',
    name: "Sofia Kovač",
    role: "ESG Strategist",
    specialty: "Sustainable Investing",
    icon: Leaf,
    color: "text-lime-400",
    bgColor: "bg-lime-500/10",
    borderColor: "border-lime-500/20",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'kenji',
    name: "Kenji Tanaka",
    role: "Commodities Lead",
    specialty: "Metals & Futures",
    icon: Layers,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

interface MidSectionProps {
    onSelect: (expert: Expert) => void;
    selectedId: string;
    onNavigate: (tab: NavLink) => void;
}

const MidSection: React.FC<MidSectionProps> = ({ onSelect, selectedId, onNavigate }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [moved, setMoved] = useState(false);

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
      const walk = (x - startX) * 1.5; // Scroll-fast factor
      if (Math.abs(walk) > 5) setMoved(true); // Flag as moved to prevent click event
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleItemClick = (expert: Expert) => {
      // Only select if not dragged (simple click)
      if (!moved) {
          onSelect(expert);
      }
  };

  return (
    <div className="w-full mb-8 md:mb-16 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 max-w-[1200px] mx-auto px-4 lg:px-0 gap-4 md:gap-0">
        <div>
           <h3 className="text-xl md:text-2xl font-display font-bold text-white">Select Your Analyst</h3>
           <p className="text-white/60 text-sm font-light">Swipe or drag to choose an AI specialist.</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs text-white/30 hidden md:block">Drag to explore</span>
            <button 
                onClick={() => onNavigate(NavLink.ABOUT)}
                className="text-sm text-blue-400 hover:text-white flex items-center gap-1 transition-colors"
            >
                View All <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Draggable Scroll Container - Constrained to 1200px for alignment */}
      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full max-w-[1200px] mx-auto overflow-x-auto pb-8 pt-4 px-4 lg:px-0 scrollbar-hide select-none ${isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
        style={{ touchAction: 'pan-x' }}
      >
        <div className="flex gap-4 md:gap-10 w-max mx-auto lg:mx-0">
            {experts.map((expert) => (
                <div 
                    key={expert.id} 
                    onClick={() => handleItemClick(expert)}
                    className={`group relative h-[380px] w-[260px] md:h-[450px] md:w-[300px] flex-none snap-center rounded-[24px] overflow-hidden border transition-all duration-500 bg-[#070B1A] ${selectedId === expert.id ? `${expert.borderColor} ring-2 ring-offset-2 ring-offset-[#050714] ring-opacity-50 ` + expert.color.replace('text', 'ring') : 'border-white/10 hover:border-blue-500/30'}`}
                >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10`} />
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t ${expert.color.replace('text', 'from')} to-transparent`} />

                    {/* Character Image */}
                    <div className="absolute inset-0 z-0 flex items-end justify-center transform group-hover:scale-105 transition-transform duration-700">
                        <img 
                            src={expert.image} 
                            alt={expert.name}
                            className="w-full h-full object-cover object-top pointer-events-none select-none"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                filter: 'contrast(1.1) brightness(0.9) saturate(0.9)'
                            }} 
                        />
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full pointer-events-none">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className={`w-fit px-3 py-1.5 rounded-md ${expert.bgColor} ${expert.borderColor} border backdrop-blur-md mb-3 flex items-center gap-2`}>
                                <expert.icon className={`w-4 h-4 ${expert.color}`} />
                                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${expert.color}`}>{expert.specialty}</span>
                            </div>
                            <h4 className={`text-xl md:text-2xl font-bold mb-1 ${selectedId === expert.id ? 'text-white' : 'text-gray-200'}`}>{expert.name}</h4>
                            <p className="text-sm md:text-base text-gray-400 font-light group-hover:text-white/80 transition-colors">{expert.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
      
      {/* Fade Gradients for visual cue of scrolling - Hidden on small mobile */}
      <div className="absolute top-20 right-0 h-[450px] w-20 bg-gradient-to-l from-[#050714] to-transparent pointer-events-none z-20 hidden lg:block" />
      <div className="absolute top-20 left-0 h-[450px] w-20 bg-gradient-to-r from-[#050714] to-transparent pointer-events-none z-20 hidden lg:block" />
    </div>
  );
};

export default MidSection;