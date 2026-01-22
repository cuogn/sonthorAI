import React from 'react';
import { Scale, ShieldAlert, CheckCircle, FileText } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-[1000px] mx-auto space-y-10 animate-fade-in pb-16 pt-8">
      {/* Header */}
      <div className="text-center space-y-4">
         <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-500/10 border border-blue-500/30 mb-2">
            <Scale className="w-8 h-8 text-blue-400" />
         </div>
         <h2 className="text-4xl font-display font-bold text-white tracking-tight">Terms of Service</h2>
         <p className="text-gray-400">Last updated: March 15, 2026</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-[32px] border border-white/10 space-y-8 text-gray-300 font-light leading-relaxed">
        
        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span className="text-blue-500">01.</span> Acceptance of Terms
            </h3>
            <p>
                By accessing and using SONTHOR ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
        </section>

        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span className="text-blue-500">02.</span> AI Investment Disclaimer
            </h3>
            <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex gap-4">
                <ShieldAlert className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                    <p className="text-white font-bold text-sm">NOT FINANCIAL ADVICE</p>
                    <p className="text-sm">
                        SONTHOR utilizes artificial intelligence (Google Gemini models) to provide market analysis and data synthesis. All content provided is for informational purposes only and does not constitute financial, investment, legal, or tax advice. 
                    </p>
                    <p className="text-sm">
                        AI predictions are probabilistic and may hallucinate or provide inaccurate data. You assume full responsibility for any trading decisions made based on this information.
                    </p>
                </div>
            </div>
        </section>

        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span className="text-blue-500">03.</span> User Accounts
            </h3>
            <ul className="space-y-2 list-none pl-4">
                <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1" />
                    You are responsible for maintaining the confidentiality of your account credentials.
                </li>
                <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1" />
                    You agree to provide accurate and current information during registration.
                </li>
                <li className="flex gap-3 items-start">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-1" />
                    We reserve the right to terminate accounts that violate our usage policies or manipulate our API.
                </li>
            </ul>
        </section>

        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span className="text-blue-500">04.</span> Intellectual Property
            </h3>
            <p>
                The proprietary algorithms, AI personas (including "Henry SWE"), and interface designs contained within SONTHOR are owned by Sonthor Inc. and protected by international copyright and trade secret laws.
            </p>
        </section>

        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span className="text-blue-500">05.</span> Limitation of Liability
            </h3>
            <p>
                In no event shall SONTHOR be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use our service, including but not limited to financial losses incurred from trading activities.
            </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;