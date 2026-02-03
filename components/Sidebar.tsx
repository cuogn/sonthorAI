import React from 'react';
import { NavLink, UserRole } from '../types';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Brain, 
  Users, 
  FileText, 
  ShieldCheck, 
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavLink;
  onNavigate: (tab: NavLink) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  userRole?: UserRole;
}

interface NavItem {
  link: NavLink;
  label: string;
  icon: React.ReactNode;
  roles?: UserRole[]; // if undefined, visible to all
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onNavigate, 
  isCollapsed, 
  onToggleCollapse,
  userRole = UserRole.USER 
}) => {
  const navItems: NavItem[] = [
    { link: NavLink.HOME, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { link: NavLink.MARKET_TRENDS, label: 'Markets', icon: <TrendingUp className="w-5 h-5" /> },
    { link: NavLink.AI_INSIGHTS, label: 'AI Insights', icon: <Brain className="w-5 h-5" /> },
    { link: NavLink.EXPERTS, label: 'Experts', icon: <Users className="w-5 h-5" /> },
    { link: NavLink.REPORTS, label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { link: NavLink.ADMIN, label: 'Admin', icon: <ShieldCheck className="w-5 h-5" />, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  });

  return (
    <aside 
      className={`fixed left-0 top-0 h-full z-40 bg-[#0A1224]/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      {/* Logo */}
      <div className="h-[72px] flex items-center px-4 border-b border-white/5">
        <div className="flex items-center gap-2 overflow-hidden">
          <Zap className="text-cyan-400 w-6 h-6 fill-current flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          {!isCollapsed && (
            <span className="text-lg font-display font-bold tracking-[0.15em] text-white whitespace-nowrap">
              SONTHOR
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-hide">
        {filteredNavItems.map((item) => {
          const isActive = activeTab === item.link;
          return (
            <button
              key={item.link}
              onClick={() => onNavigate(item.link)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-500/20 text-white shadow-[inset_0_0_15px_rgba(59,130,246,0.15)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`flex-shrink-0 transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-blue-400'}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {isActive && !isCollapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="h-12 flex items-center justify-center border-t border-white/5 text-gray-500 hover:text-white transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  );
};

export default Sidebar;
