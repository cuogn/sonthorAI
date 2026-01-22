import React from 'react';
import { Lock, Eye, Database, Globe } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-[1000px] mx-auto space-y-10 animate-fade-in pb-16 pt-8">
      {/* Header */}
      <div className="text-center space-y-4">
         <div className="inline-flex items-center justify-center p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-2">
            <Lock className="w-8 h-8 text-cyan-400" />
         </div>
         <h2 className="text-4xl font-display font-bold text-white tracking-tight">Privacy Policy</h2>
         <p className="text-gray-400">Effective Date: March 15, 2026</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-[32px] border border-white/10 space-y-10 text-gray-300 font-light leading-relaxed">
        
        <p className="text-lg">
            At SONTHOR, we take the privacy of your financial data seriously. This policy outlines how we collect, process, and secure your information while using our AI-driven investment platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-white font-bold text-lg">Information We Collect</h3>
                </div>
                <ul className="space-y-3 text-sm">
                    <li>• <span className="text-white font-medium">Account Info:</span> Email, name, and encrypted password hash.</li>
                    <li>• <span className="text-white font-medium">Portfolio Data:</span> Tickers, transaction history (if connected), and risk preferences.</li>
                    <li>• <span className="text-white font-medium">Usage Data:</span> Interactions with Henry SWE and other AI analysts.</li>
                </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-white font-bold text-lg">How We Use Data</h3>
                </div>
                <ul className="space-y-3 text-sm">
                    <li>• To personalize AI recommendations and risk assessments.</li>
                    <li>• To improve our Gemini-based fine-tuning models (anonymized only).</li>
                    <li>• To prevent fraud and ensure platform security.</li>
                </ul>
            </div>
        </div>

        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display border-b border-white/10 pb-2">AI Data Processing</h3>
            <p>
                User queries sent to our AI assistants (e.g., Henry SWE) are processed via Google Gemini API. While we do not use your personal identifiable information (PII) to train public models, conversation history is stored to maintain context within your session. We employ strict sanitization protocols before sending data to third-party inference providers.
            </p>
        </section>

        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display border-b border-white/10 pb-2">Data Security</h3>
            <p>
                We utilize AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your financial portfolio details are stored in isolated containers, separate from your identity profile.
            </p>
        </section>

        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white font-display border-b border-white/10 pb-2">Third-Party Sharing</h3>
            <p>
                We do not sell your data. We may share anonymized, aggregated market sentiment data with institutional partners. We disclose data to law enforcement only when compelled by valid legal process.
            </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;