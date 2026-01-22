import React from 'react';
import { Github, Twitter, Linkedin, Facebook } from 'lucide-react';
import { NavLink } from '../types';

interface FooterProps {
    onNavigate: (tab: NavLink) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#050814] py-12 mt-auto">
      {/* Top Border with sparkly line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
         <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-shimmer" style={{animationDuration: '3s'}}></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mb-10">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <button onClick={() => onNavigate(NavLink.HOME)} className="text-xl font-display font-bold text-white mb-2 tracking-[0.2em] neon-text hover:text-blue-400 transition-colors">SONTHOR</button>
                <p className="font-light text-xs tracking-wide opacity-70">AI-Powered Investment Guidance.</p>
            </div>
            
            <div className="flex gap-8 text-xs font-medium uppercase tracking-wider">
                <button onClick={() => onNavigate(NavLink.MARKET_TRENDS)} className="hover:text-blue-400 transition-colors">Market Trends</button>
                <button onClick={() => onNavigate(NavLink.AI_INSIGHTS)} className="hover:text-blue-400 transition-colors">AI Insights</button>
                <button onClick={() => onNavigate(NavLink.ABOUT)} className="hover:text-blue-400 transition-colors">About</button>
                <button onClick={() => onNavigate(NavLink.CONTACT)} className="hover:text-blue-400 transition-colors">Contact</button>
            </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <div className="flex gap-6 mb-4 md:mb-0">
                <button onClick={() => onNavigate(NavLink.TERMS)} className="hover:text-white transition">Terms of Service</button>
                <button onClick={() => onNavigate(NavLink.PRIVACY)} className="hover:text-white transition">Privacy Policy</button>
                <button onClick={() => onNavigate(NavLink.COOKIES)} className="hover:text-white transition">Cookie Policy</button>
            </div>
            
            <div className="flex items-center gap-4">
                <span className="mr-4">© 2026 Sonthor Inc.</span>
                <div className="flex gap-3 pl-4 border-l border-white/10">
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all hover:scale-110"><Twitter className="w-3 h-3" /></a>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all hover:scale-110"><Linkedin className="w-3 h-3" /></a>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all hover:scale-110"><Github className="w-3 h-3" /></a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;