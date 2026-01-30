
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  data: { value: number }[];
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  insight: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum NavLink {
  HOME = 'Home',
  MARKET_TRENDS = 'Market Trends',
  AI_INSIGHTS = 'AI Insights',
  ABOUT = 'About',
  CONTACT = 'Contact',
  LOGIN = 'Log In',
  SIGNUP = 'Sign Up',
  TERMS = 'Terms of Service',
  PRIVACY = 'Privacy Policy',
  COOKIES = 'Cookie Policy',
  BUY_ME_COFFEE = 'Buy Me a Coffee'
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  specialty: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  image: string;
}
