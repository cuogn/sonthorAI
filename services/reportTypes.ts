// Report Analysis Types
// TypeScript interfaces for the Report Trend Predictor feature

export interface ParsedPage {
  pageNumber: number;
  text: string;
  startIndex: number;
  endIndex: number;
}

export interface ParsedReport {
  fileName: string;
  totalPages: number;
  pages: ParsedPage[];
  fullText: string;
  parseDate: string;
}

export interface KeywordMatch {
  keyword: string;
  count: number;
  category: KeywordCategory;
  positions: number[];
}

export type KeywordCategory = 
  | 'growth' 
  | 'profitability' 
  | 'cashFlow' 
  | 'balanceSheet' 
  | 'guidance' 
  | 'risks';

export interface ExtractedKeywords {
  growth: KeywordMatch[];
  profitability: KeywordMatch[];
  cashFlow: KeywordMatch[];
  balanceSheet: KeywordMatch[];
  guidance: KeywordMatch[];
  risks: KeywordMatch[];
  topKeywords: KeywordMatch[];
}

export interface MetricValue {
  value: number | null;
  unit: 'percent' | 'currency' | 'ratio' | 'number';
  direction: 'up' | 'down' | 'flat' | 'unknown';
  context: string;
  citation?: Citation;
}

export interface ExtractedMetrics {
  revenueChange: MetricValue | null;
  grossMargin: MetricValue | null;
  operatingMargin: MetricValue | null;
  netMargin: MetricValue | null;
  netIncome: MetricValue | null;
  operatingCashFlow: MetricValue | null;
  freeCashFlow: MetricValue | null;
  debtLevel: MetricValue | null;
  currentRatio: MetricValue | null;
  eps: MetricValue | null;
}

export interface Signal {
  id: string;
  type: 'positive' | 'negative';
  category: KeywordCategory;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  citation: Citation;
}

export interface Citation {
  id: string;
  pageNumber: number;
  snippet: string;
  startIndex: number;
  endIndex: number;
  claimType: 'metric' | 'guidance' | 'risk' | 'general';
}

export interface ComponentScore {
  name: string;
  score: number;
  maxScore: number;
  signals: string[];
}

export interface TrendResult {
  label: 'Bullish' | 'Neutral' | 'Bearish';
  score: number; // -100 to +100
  confidence: number; // 0 to 100
  components: ComponentScore[];
  summary: string;
  keyDrivers: string[];
  keyRisks: string[];
  watchlist: string[];
}

export interface AnalysisResult {
  report: ParsedReport;
  keywords: ExtractedKeywords;
  metrics: ExtractedMetrics;
  signals: Signal[];
  trend: TrendResult;
  citations: Citation[];
  disclaimer: string;
  analyzedAt: string;
}

// Analysis state for UI
export type AnalysisStatus = 
  | 'idle' 
  | 'uploading' 
  | 'parsing' 
  | 'extracting' 
  | 'scoring' 
  | 'complete' 
  | 'error';

export interface AnalysisState {
  status: AnalysisStatus;
  progress: number;
  error: string | null;
  result: AnalysisResult | null;
}
