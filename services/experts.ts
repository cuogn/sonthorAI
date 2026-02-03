import { TrendingUp, Shield, Globe, Coins, BarChart2, Leaf, Layers, Cpu, ShieldCheck } from 'lucide-react';

export interface ExpertStats {
  label1: string;
  val1: string;
  label2: string;
  val2: string;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  specialty: string[]; // Unifying to array for ExpertNetwork
  description: string;
  bio: string;
  image: string;
  
  // Styling (MidSection)
  icon: any; 
  color: string;
  bgColor: string;
  borderColor: string;

  // Booking/Human-like stats (ExpertNetwork)
  rating: number;
  reviews: number;
  hourlyRate: number;
  experience: number;
  languages: string[];
  available: boolean;

  // AI/About stats (About)
  stats: ExpertStats;
}

export const experts: Expert[] = [
  {
    id: 'henry',
    name: "Henry Swe",
    role: "Chief AI Analyst",
    specialty: ["Equities", "Market Trends", "AI Analysis"],
    description: "Built on Gemini 2.5, Henry processes 5M+ market signals daily.",
    bio: "Henry isn't just a chatbot; he's a fine-tuned persona built on top of the world's most advanced LLMs. Designed to emulate the decision-making process of a senior portfolio manager, Henry remembers your portfolio history, understands your risk tolerance, and adapts his communication style to your expertise level.",
    image: "/assets/img/henryswe.png", // Using local path if available, or fallback
    icon: TrendingUp,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    rating: 4.9,
    reviews: 1240,
    hourlyRate: 5000000,
    experience: 15,
    languages: ["English", "Tiếng Việt", "Mandarin"],
    available: true,
    stats: { val1: "1M+", label1: "Conversations", val2: "24/7", label2: "Availability" }
  },
  {
    id: 'elena',
    name: "Dr. Elena Vostok",
    role: "Quant Risk Lead",
    specialty: ["Derivatives", "Volatility", "Risk Management"],
    description: "PhD in Computational Finance. Specializes in volatility modeling.",
    bio: "Elena operates our core risk management engine. With a background in theoretical physics and computational finance, she runs Monte Carlo simulations on every trade suggestion to ensure your portfolio stays within your defined risk parameters, even during black swan events.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Shield,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    rating: 5.0,
    reviews: 850,
    hourlyRate: 4500000,
    experience: 12,
    languages: ["English", "Russian", "Tiếng Việt"],
    available: true,
    stats: { val1: "50k+", label1: "Simulations/Sec", val2: "99.9%", label2: "Accuracy" }
  },
  {
    id: 'marcus',
    name: "Marcus Chen",
    role: "Macro Strategist",
    specialty: ["Forex", "Global Economy", "Geopolitics"],
    description: "Former Hedge Fund Manager focusing on forex and geopolitical impacts.",
    bio: "Marcus synthesizes global macroeconomic data, from central bank interest rate decisions to geopolitical supply chain shifts. He provides the 'big picture' context that purely technical models often miss, helping you pivot before the market turns.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Globe,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    rating: 4.8,
    reviews: 620,
    hourlyRate: 3800000,
    experience: 18,
    languages: ["English", "Tiếng Việt", "Cantonese"],
    available: false,
    stats: { val1: "150+", label1: "Economies Tracked", val2: "15yr", label2: "Hist. Data" }
  },
  {
    id: 'sarah',
    name: "Sarah Jenks",
    role: "Crypto Specialist",
    specialty: ["DeFi", "Blockchain", "On-Chain Analytics"],
    description: "Expert in DeFi protocols and on-chain analytics.",
    bio: "Sarah lives on the blockchain. She monitors wallet movements of 'whales', analyzes smart contract audits in real-time, and tracks DeFi liquidity pools. If there is movement in the digital asset space, Sarah knows about it 3 blocks before the news breaks.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Coins,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    rating: 4.9,
    reviews: 940,
    hourlyRate: 3000000,
    experience: 6,
    languages: ["English", "Tiếng Việt"],
    available: true,
    stats: { val1: "24/7", label1: "On-Chain Watch", val2: "500+", label2: "Protocols" }
  },
  {
    id: 'aris',
    name: "Aris Thorne",
    role: "Technical Analyst",
    specialty: ["Chart Patterns", "Technical Analysis", "Momentum"],
    description: "Specializes in algorithmic pattern recognition and momentum indicators.",
    bio: "Aris is a pure technician. He doesn't care about the news; he cares about price action. Using advanced computer vision and mathematical modeling, Aris identifies chart patterns, support/resistance levels, and momentum divergences with pixel-perfect precision.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: BarChart2,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    rating: 4.7,
    reviews: 410,
    hourlyRate: 2500000,
    experience: 9,
    languages: ["English", "Tiếng Việt", "Greek"],
    available: true,
    stats: { val1: "200+", label1: "Patterns Recog.", val2: "12ms", label2: "Latency" }
  },
  {
    id: 'sofia',
    name: "Sofia Kovač",
    role: "ESG Strategist",
    specialty: ["Sustainable Investing", "ESG", "Green Tech"],
    description: "Focuses on sustainable long-term growth opportunities.",
    bio: "Sofia ensures your investments align with the future. She analyzes corporate governance reports, carbon footprint data, and social impact metrics. Her philosophy is that sustainable companies are the profitable giants of tomorrow.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Leaf,
    color: "text-lime-400",
    bgColor: "bg-lime-500/10",
    borderColor: "border-lime-500/20",
    rating: 4.9,
    reviews: 320,
    hourlyRate: 2800000,
    experience: 8,
    languages: ["English", "Tiếng Việt", "German"],
    available: true,
    stats: { val1: "30TB", label1: "ESG Data Processed", val2: "A+", label2: "Rating" }
  },
  {
    id: 'kenji',
    name: "Kenji Tanaka",
    role: "Commodities Lead",
    specialty: ["Metals", "Futures", "Supply Chain"],
    description: "Expertise in global supply chains and energy futures.",
    bio: "Kenji tracks the physical world. From oil tanker routes to crop yields and precious metal reserves, Kenji's models predict commodity price swings that affect the entire global market, providing a hedge against inflation and volatility.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Layers,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    rating: 4.8,
    reviews: 550,
    hourlyRate: 4000000,
    experience: 20,
    languages: ["English", "Japanese", "Tiếng Việt"],
    available: true,
    stats: { val1: "Global", label1: "Supply Tracking", val2: "Real", label2: "Time Inventory" }
  }
];
