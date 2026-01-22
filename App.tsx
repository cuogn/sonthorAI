import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import MarketTrends from './components/MarketTrends';
import AIInsights from './components/AIInsights';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import Footer from './components/Footer';
import { NavLink } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavLink>(NavLink.HOME);
  const [showChat, setShowChat] = useState(true);

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
      case NavLink.HOME:
      default:
        return <Home showChat={showChat} onNavigate={setCurrentView} />;
    }
  };

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
      </div>
    </div>
  );
};

export default App;