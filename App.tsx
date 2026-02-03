import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import MarketTrends from './components/MarketTrends';
import AIInsights from './components/AIInsights';
import ExpertNetwork from './components/ExpertNetwork';
import Reports from './components/Reports';
import ReportTrendPredictor from './components/ReportTrendPredictor';
import AdminPanel from './components/AdminPanel';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import BuyMeCoffee from './components/BuyMeCoffee';
import FloatingActionButton from './components/FloatingActionButton';
import Footer from './components/Footer';
import { NavLink, UserRole } from './types';
import { authService, User } from './services/auth';
import { Menu } from 'lucide-react';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavLink>(NavLink.HOME);
  const [showChat, setShowChat] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);

  // Restore auth state on mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setUserRole(user.role === 'admin' ? UserRole.ADMIN : user.role === 'analyst' ? UserRole.ANALYST : UserRole.USER);
    }
  }, []);

  // Handle login success
  const handleLoginSuccess = (user: Omit<User, 'password'>) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setUserRole(user.role === 'admin' ? UserRole.ADMIN : user.role === 'analyst' ? UserRole.ANALYST : UserRole.USER);
    setCurrentView(NavLink.HOME);
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserRole(UserRole.USER);
    setCurrentView(NavLink.HOME);
  };

  // Views that should use the Dashboard layout (Sidebar)
  const dashboardViews = [
    NavLink.MARKET_TRENDS,
    NavLink.AI_INSIGHTS,
    NavLink.EXPERTS,
    NavLink.REPORTS,
    NavLink.REPORT_ANALYZER,
    NavLink.ADMIN,
  ];

  const isDashboardView = dashboardViews.includes(currentView);

  // Automatically scroll to top when navigation changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case NavLink.MARKET_TRENDS:
        return <MarketTrends />;
      case NavLink.AI_INSIGHTS:
        return <AIInsights />;
      case NavLink.EXPERTS:
        return <ExpertNetwork />;
      case NavLink.REPORTS:
        return <Reports />;
      case NavLink.REPORT_ANALYZER:
        return <ReportTrendPredictor />;
      case NavLink.ADMIN:
        return <AdminPanel />;
      case NavLink.ABOUT:
        return <About />;
      case NavLink.CONTACT:
        return <Contact />;
      case NavLink.LOGIN:
        return <Login onLoginSuccess={handleLoginSuccess} />;
      case NavLink.SIGNUP:
        return <SignUp onNavigate={setCurrentView} />;
      case NavLink.TERMS:
        return <TermsOfService />;
      case NavLink.PRIVACY:
        return <PrivacyPolicy />;
      case NavLink.COOKIES:
        return <CookiePolicy />;
      case NavLink.BUY_ME_COFFEE:
        return <BuyMeCoffee onNavigate={setCurrentView} />;
      case NavLink.HOME:
      default:
        return <Home showChat={showChat} onNavigate={setCurrentView} />;
    }
  };

  // Dashboard Layout
  if (isDashboardView) {
    return (
      <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-black overflow-x-hidden">
        {/* Background Ambience */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        {/* Sidebar */}
        <Sidebar 
          activeTab={currentView} 
          onNavigate={setCurrentView}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          userRole={userRole}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div 
          className={`relative z-10 min-h-screen transition-all duration-300 
            lg:${isSidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'}
            ml-0
          `}
        >
          {/* Top Bar for Dashboard */}
          <header className="sticky top-0 z-30 h-[72px] bg-[#050714]/80 backdrop-blur-xl border-b border-white/10 flex items-center px-4 lg:px-6 gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-base lg:text-lg font-display font-bold text-white tracking-wide truncate">
              {currentView}
            </h1>
            {/* Future: Add search, notifications, user menu here */}
          </header>

          <main className="p-4 lg:p-6 flex flex-col min-h-[calc(100vh-72px)]">
            {renderView()}
          </main>
        </div>
      </div>
    );
  }

  // Public Layout (Landing, About, Contact, Auth pages)
  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-black overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header activeTab={currentView} onNavigate={setCurrentView} user={currentUser} onLogout={handleLogout} />
        
        <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex flex-col">
          {renderView()}
        </main>

        <Footer onNavigate={setCurrentView} />
        <FloatingActionButton onNavigate={setCurrentView} currentView={currentView} />
      </div>
    </div>
  );
};

export default App;