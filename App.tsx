import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import MarketTrends from './components/MarketTrends';
import AIInsights from './components/AIInsights';
import ExpertNetwork from './components/ExpertNetwork';
import Reports from './components/Reports';
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


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavLink>(NavLink.HOME);
  const [showChat, setShowChat] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Simulated logged-in state and role (in real app, this would come from auth context)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);

  // Views that should use the Dashboard layout (Sidebar)
  const dashboardViews = [
    NavLink.MARKET_TRENDS,
    NavLink.AI_INSIGHTS,
    NavLink.EXPERTS,
    NavLink.REPORTS,
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
      case NavLink.ADMIN:
        return <AdminPanel />;
      case NavLink.ABOUT:
        return <About />;
      case NavLink.CONTACT:
        return <Contact />;
      case NavLink.LOGIN:
        return <Login onNavigate={setCurrentView} />;
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
        />

        {/* Main Content Area */}
        <div 
          className={`relative z-10 min-h-screen transition-all duration-300 ${
            isSidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'
          }`}
        >
          {/* Top Bar for Dashboard */}
          <header className="sticky top-0 z-30 h-[72px] bg-[#050714]/80 backdrop-blur-xl border-b border-white/10 flex items-center px-6">
            <h1 className="text-lg font-display font-bold text-white tracking-wide">
              {currentView}
            </h1>
            {/* Future: Add search, notifications, user menu here */}
          </header>

          <main className="p-6 flex flex-col min-h-[calc(100vh-72px)]">
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
        <Header activeTab={currentView} onNavigate={setCurrentView} />
        
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