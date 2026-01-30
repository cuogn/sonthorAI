import React from 'react';
import { Coffee, ArrowLeft, Heart } from 'lucide-react';
import { NavLink } from '../types';

interface BuyMeCoffeeProps {
  onNavigate: (tab: NavLink) => void;
}

const BuyMeCoffee: React.FC<BuyMeCoffeeProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-12 px-4">
      {/* Back Button */}
      <button
        onClick={() => onNavigate(NavLink.HOME)}
        className="self-start mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
          <Coffee className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">Buy Me a Coffee</h1>
        <p className="text-white/60 mb-8">
          Your support helps us keep building amazing tools. Scan the QR code below to contribute.
        </p>

        {/* QR Code Placeholder */}
        <div className="bg-white rounded-2xl p-4 mx-auto w-fit mb-6">
          {/* 
            Replace the src below with your actual QR code image.
            For example: src="/assets/img/qr-bank.png" 
          */}
          <img
            src="/assets/img/buymeacoffe.png"
            alt="Bank QR Code"
            className="w-48 h-48 object-contain"
          />
        </div>

        <p className="text-sm text-white/40 mb-6">
          Scan with your banking app
        </p>

        {/* Thank you message */}
        <div className="flex items-center justify-center gap-2 text-pink-400">
          <Heart className="w-5 h-5 fill-current" />
          <span className="font-medium">Thank you for your support!</span>
        </div>
      </div>
    </div>
  );
};

export default BuyMeCoffee;
