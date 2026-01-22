import React, { useState } from 'react';
import { NavLink } from '../types';
import { User, Mail, Lock, ArrowRight, Loader2, Zap } from 'lucide-react';

interface SignUpProps {
  onNavigate: (tab: NavLink) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup delay
    setTimeout(() => {
        setIsLoading(false);
        onNavigate(NavLink.HOME);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[600px] animate-fade-in w-full relative">
        <div className="glass-panel w-full max-w-md p-8 md:p-10 rounded-[32px] border border-white/10 shadow-2xl relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                    <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-400 font-light">Join the future of institutional-grade AI investment.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2 group">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors pl-1">Full Name</label>
                   <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                       <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-[#070B1A]/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/10 transition-all placeholder:text-gray-700 font-medium" 
                            placeholder="John Doe" 
                        />
                   </div>
                </div>

                <div className="space-y-2 group">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors pl-1">Email Address</label>
                   <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                       <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-[#070B1A]/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/10 transition-all placeholder:text-gray-700 font-medium" 
                            placeholder="you@example.com" 
                        />
                   </div>
                </div>

                <div className="space-y-2 group">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors pl-1">Password</label>
                   <div className="relative">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                       <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[#070B1A]/60 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/10 transition-all placeholder:text-gray-700 font-medium" 
                            placeholder="••••••••" 
                        />
                   </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all flex items-center justify-center gap-2 mt-4 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <button 
                        onClick={() => onNavigate(NavLink.LOGIN)} 
                        className="text-white font-bold hover:text-cyan-400 transition-colors"
                    >
                        Log In
                    </button>
                </p>
            </div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default SignUp;