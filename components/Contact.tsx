import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-6 md:py-12 animate-fade-in items-start">
       {/* Left Info Column */}
       <div className="space-y-8 md:space-y-12 order-2 lg:order-1">
          <div>
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6">Get in Touch</h2>
             <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md font-light">
                Have questions about our API, enterprise solutions, or just want to say hello? Our team is ready to assist you.
             </p>
          </div>

          <div className="space-y-4 md:space-y-6">
             {/* Contact Item */}
             <div className="glass-panel p-6 rounded-[20px] border border-white/5 hover:border-blue-500/30 transition-all group flex items-start gap-6">
                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                   <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                   <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                   <p className="text-gray-400 mb-1 text-sm md:text-base">General: sonthor.sdmas@gmail.com</p>
                   <p className="text-gray-400 text-sm md:text-base">Sales: sonthor.sdmas@gmail.com</p>
                </div>
             </div>
             
             {/* Contact Item */}
             <div className="glass-panel p-6 rounded-[20px] border border-white/5 hover:border-blue-500/30 transition-all group flex items-start gap-6">
                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                   <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                   <h3 className="text-white font-bold text-lg mb-1">Headquarters</h3>
                   <p className="text-gray-400 text-sm md:text-base">Cho Nham, Viet Yen</p>
                   <p className="text-gray-400 text-sm md:text-base">Bac Giang</p>
                </div>
             </div>

             {/* Contact Item */}
             <div className="glass-panel p-6 rounded-[20px] border border-white/5 hover:border-blue-500/30 transition-all group flex items-start gap-6">
                <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                   <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                   <h3 className="text-white font-bold text-lg mb-1">Call Us</h3>
                   <p className="text-gray-400 text-sm md:text-base">+84 (343) 819 113</p>
                   <p className="text-xs text-blue-400 mt-2 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Mon-Fri, 9am - 6pm PST
                   </p>
                </div>
             </div>
          </div>
       </div>

       {/* Right Form Column */}
       <div className="glass-panel p-6 md:p-10 rounded-[24px] md:rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden order-1 lg:order-2">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

          <div className="flex items-center gap-3 mb-6 md:mb-8 relative z-10">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-bold text-xl">Send a Message</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-10">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2 group">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">First Name</label>
                   <input type="text" className="w-full bg-[#070B1A]/60 border border-white/10 rounded-xl p-3 md:p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all placeholder:text-gray-700 font-medium" placeholder="John" />
                </div>
                <div className="space-y-2 group">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">Last Name</label>
                   <input type="text" className="w-full bg-[#070B1A]/60 border border-white/10 rounded-xl p-3 md:p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all placeholder:text-gray-700 font-medium" placeholder="Doe" />
                </div>
             </div>
             
             <div className="space-y-2 group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">Email Address</label>
                <input type="email" className="w-full bg-[#070B1A]/60 border border-white/10 rounded-xl p-3 md:p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all placeholder:text-gray-700 font-medium" placeholder="john@example.com" />
             </div>

             <div className="space-y-2 group">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-blue-400 transition-colors">Message</label>
                <textarea rows={5} className="w-full bg-[#070B1A]/60 border border-white/10 rounded-xl p-3 md:p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-900/10 transition-all placeholder:text-gray-700 font-medium resize-none" placeholder="How can we help you?"></textarea>
             </div>

             <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 md:py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all flex items-center justify-center gap-2 mt-2 transform active:scale-[0.98]"
             >
                {submitted ? 'Message Sent!' : (
                   <>Send Message <Send className="w-4 h-4" /></>
                )}
             </button>
          </form>
       </div>
    </div>
  );
};

export default Contact;