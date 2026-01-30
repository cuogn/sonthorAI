import React from 'react';
import { Coffee } from 'lucide-react';
import { NavLink } from '../types';

interface FloatingActionButtonProps {
  onNavigate: (tab: NavLink) => void;
  currentView: NavLink;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onNavigate, currentView }) => {
  // Hide FAB on the Buy Me a Coffee page itself
  if (currentView === NavLink.BUY_ME_COFFEE) {
    return null;
  }

  return (
    <button
      onClick={() => onNavigate(NavLink.BUY_ME_COFFEE)}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
      aria-label="Buy Me a Coffee"
    >
      <Coffee className="w-6 h-6" />
      <span className="font-semibold hidden sm:inline">Support</span>
    </button>
  );
};

export default FloatingActionButton;
