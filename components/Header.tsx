import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from '../types';
import { User } from '../services/auth';
import { Menu, Zap, Settings, LogOut, UserCircle, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: NavLink;
  onNavigate: (tab: NavLink) => void;
  user?: Omit<User, 'password'> | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate, user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter out pages that shouldn't appear in the main nav menu
  const hiddenNavItems = [
    NavLink.LOGIN, 
    NavLink.SIGNUP, 
    NavLink.TERMS, 
    NavLink.PRIVACY, 
    NavLink.COOKIES,
    NavLink.EXPERTS,
    NavLink.REPORTS,
    NavLink.ADMIN,
    NavLink.BUY_ME_COFFEE
  ];

  const handleMobileNavigate = (link: NavLink) => {
      onNavigate(link);
      setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-[#050714]/80 backdrop-blur-xl border-b border-transparent relative">
      {/* Bottom gradient border glow - strongest in center */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      <div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-[2px]" />
      
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate(NavLink.HOME)}
          >
            <div className="relative">
                <Zap className="text-cyan-400 w-5 h-5 fill-current relative z-10 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>
            <div className="flex flex-col relative">
                <span className="text-xl font-display font-bold tracking-[0.2em] text-white neon-text">
                SONTHOR
                </span>
                {/* Underline swoosh glow */}
                <div className="absolute -bottom-2 left-0 w-full h-[6px] bg-[url('https://raw.githubusercontent.com/google/fonts/main/ofl/orbitron/Orbitron-Bold.ttf')] bg-contain bg-no-repeat opacity-0" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] opacity-80"></div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {Object.values(NavLink)
              .filter(link => !hiddenNavItems.includes(link))
              .map((link) => (
              <button
                key={link}
                onClick={() => onNavigate(link)}
                className={`text-[15px] font-medium transition-all duration-300 relative group py-2 ${
                  activeTab === link 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link}
                {activeTab === link && (
                  <>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="absolute bottom-0 left-[10%] w-[80%] h-[2px] bg-white blur-[2px] opacity-70" />
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              /* Logged In - Show User Profile */
              <div className="relative hidden sm:block" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all ${
                    isProfileOpen 
                      ? 'bg-white/10 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{user.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-56 rounded-xl bg-[#0A1224] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in origin-top-right backdrop-blur-xl">
                      <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                          <p className="text-sm font-bold text-white">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="p-1.5 space-y-0.5">
                          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left group">
                              <UserCircle className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" /> 
                              Profile
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left group">
                              <Settings className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" /> 
                              Settings
                          </button>
                      </div>
                      <div className="p-1.5 border-t border-white/5 mt-0.5">
                          <button 
                            onClick={() => {
                                setIsProfileOpen(false);
                                onLogout?.();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                          >
                              <LogOut className="w-4 h-4" /> 
                              Đăng xuất
                          </button>
                      </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not Logged In - Show Login/GetStart */
              <>
                <button 
                  onClick={() => onNavigate(NavLink.LOGIN)}
                  className="hidden sm:block text-[14px] font-medium text-white px-5 py-2 rounded-lg border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm"
                >
                  Log In
                </button>
                <button 
                  onClick={() => onNavigate(NavLink.SIGNUP)}
                  className="hidden sm:block bg-[#2563EB] hover:bg-[#3B82F6] text-white text-[14px] font-bold py-2 px-6 rounded-[10px] transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30"
                >
                  Get Started
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Rendered via Portal to escape Header stacking context */}
      {isMobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[100] bg-[#050714] flex flex-col animate-fade-in">
           <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                 <Zap className="text-cyan-400 w-5 h-5 fill-current" />
                 <span className="text-xl font-display font-bold text-white tracking-[0.2em]">SONTHOR</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white"
              >
                 <X className="w-6 h-6" />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <nav className="flex flex-col gap-4">
                  {Object.values(NavLink)
                    .filter(link => !hiddenNavItems.includes(link))
                    .map((link) => (
                    <button
                        key={link}
                        onClick={() => handleMobileNavigate(link)}
                        className={`text-2xl font-display font-bold text-left py-2 ${
                        activeTab === link 
                            ? 'text-white' 
                            : 'text-white/50'
                        }`}
                    >
                        {link}
                    </button>
                  ))}
               </nav>

               <div className="border-t border-white/10 pt-6 space-y-4 pb-20">
                  {user ? (
                    /* Logged In - Show User Info */
                    <>
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <img 
                          src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'} 
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border border-white/20"
                        />
                        <div>
                          <p className="text-white font-bold">{user.name}</p>
                          <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onLogout?.();
                        }}
                        className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-medium hover:bg-red-500/10 flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Đăng xuất
                      </button>
                    </>
                  ) : (
                    /* Not Logged In */
                    <>
                      <button 
                        onClick={() => handleMobileNavigate(NavLink.LOGIN)}
                        className="w-full py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5"
                      >
                        Log In
                      </button>
                      <button 
                        onClick={() => handleMobileNavigate(NavLink.SIGNUP)}
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      >
                        Get Started
                      </button>
                    </>
                  )}
               </div>
           </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;