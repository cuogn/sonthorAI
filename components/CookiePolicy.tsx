import React from 'react';
import { Cookie, Settings, ToggleRight } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="max-w-[1000px] mx-auto space-y-10 animate-fade-in pb-16 pt-8">
      {/* Header */}
      <div className="text-center space-y-4">
         <div className="inline-flex items-center justify-center p-4 rounded-full bg-orange-500/10 border border-orange-500/30 mb-2">
            <Cookie className="w-8 h-8 text-orange-400" />
         </div>
         <h2 className="text-4xl font-display font-bold text-white tracking-tight">Cookie Policy</h2>
         <p className="text-gray-400">Manage your preferences</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-[32px] border border-white/10 space-y-8 text-gray-300 font-light leading-relaxed">
        
        <p>
            This Cookie Policy explains how SONTHOR uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <section className="space-y-6">
            <h3 className="text-xl font-bold text-white font-display">Types of Cookies We Use</h3>
            
            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
                        <ToggleRight className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Essential Cookies</h4>
                        <p className="text-sm">Strictly necessary for the platform to function (e.g., authentication, security, session management). These cannot be disabled.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400 mt-1">
                        <Settings className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Performance & Analytics</h4>
                        <p className="text-sm">Help us understand how you use the site (e.g., which AI analysts are most popular, load times) so we can improve performance.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 mt-1">
                        <Cookie className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Personalization</h4>
                        <p className="text-sm">Allow us to remember choices you make (such as your preferred risk level or dashboard layout) to provide a more tailored experience.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl font-bold text-white font-display">Managing Cookies</h3>
            <p>
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            <button className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-bold border border-white/10">
                Open Cookie Preferences
            </button>
        </section>

      </div>
    </div>
  );
};

export default CookiePolicy;