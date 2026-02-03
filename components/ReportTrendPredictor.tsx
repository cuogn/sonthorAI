import React, { useState, useRef, useCallback } from 'react';
import {
  Upload,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Loader2,
  X,
  Zap,
  Target,
  Shield,
  DollarSign,
  BarChart3,
  FileWarning,
  Sparkles
} from 'lucide-react';
import {
  AnalysisResult,
  AnalysisState,
  Signal,
  KeywordMatch,
  ComponentScore,
  ExtractedMetrics,
  Citation
} from '../services/reportTypes';
import { analyzeReport } from '../services/reportAnalysis';

// ============================================
// MAIN COMPONENT
// ============================================

const ReportTrendPredictor: React.FC = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    status: 'idle',
    progress: 0,
    error: null,
    result: null
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    metrics: true,
    signals: true,
    evidence: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.includes('pdf')) {
      setAnalysisState(prev => ({
        ...prev,
        status: 'error',
        error: 'Please upload a PDF file'
      }));
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setAnalysisState(prev => ({
        ...prev,
        status: 'error',
        error: 'File size must be less than 20MB'
      }));
      return;
    }

    try {
      // Start analysis
      setAnalysisState({ status: 'uploading', progress: 10, error: null, result: null });
      
      // Simulate upload progress
      await new Promise(r => setTimeout(r, 300));
      setAnalysisState(prev => ({ ...prev, status: 'parsing', progress: 30 }));
      
      await new Promise(r => setTimeout(r, 500));
      setAnalysisState(prev => ({ ...prev, status: 'extracting', progress: 50 }));
      
      // Run actual analysis
      const result = await analyzeReport(file);
      
      setAnalysisState(prev => ({ ...prev, status: 'scoring', progress: 80 }));
      await new Promise(r => setTimeout(r, 300));
      
      setAnalysisState({
        status: 'complete',
        progress: 100,
        error: null,
        result
      });
    } catch (error) {
      setAnalysisState({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Analysis failed',
        result: null
      });
    }
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const resetAnalysis = useCallback(() => {
    setAnalysisState({ status: 'idle', progress: 0, error: null, result: null });
    setSelectedCitation(null);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const { status, progress, error, result } = analysisState;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-fade-in">
      {/* Header */}
      <header className="text-center pt-6 sm:pt-8 pb-6 md:pb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-3">
          Report Trend Predictor
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
          Upload a financial report (PDF) to analyze key metrics, extract signals, and predict trend outlook.
        </p>
      </header>

      {/* Upload Section - Show when idle or error */}
      {(status === 'idle' || status === 'error') && (
        <div className="max-w-2xl mx-auto mb-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/20 bg-white/[0.02] hover:border-blue-500/50 hover:bg-white/[0.04]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? 'text-blue-400' : 'text-gray-500'}`} />
            <p className="text-white font-medium mb-2">
              {isDragOver ? 'Drop your PDF here' : 'Drag & drop your financial report'}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              or click to browse (PDF only, max 20MB)
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-white/5 rounded">Annual Reports</span>
              <span className="px-2 py-1 bg-white/5 rounded">10-K / 10-Q</span>
              <span className="px-2 py-1 bg-white/5 rounded">Earnings Transcripts</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium">Upload Error</p>
                <p className="text-red-300/80 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {['uploading', 'parsing', 'extracting', 'scoring'].includes(status) && (
        <div className="max-w-lg mx-auto text-center py-12">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-400 animate-spin" />
          <p className="text-white font-medium mb-2">
            {status === 'uploading' && 'Uploading document...'}
            {status === 'parsing' && 'Parsing PDF content...'}
            {status === 'extracting' && 'Extracting metrics & keywords...'}
            {status === 'scoring' && 'Calculating trend score...'}
          </p>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-500 text-sm mt-2">{progress}% complete</p>
        </div>
      )}

      {/* Results Section */}
      {status === 'complete' && result && (
        <div className="space-y-6">
          {/* Reset Button */}
          <div className="flex justify-end">
            <button
              onClick={resetAnalysis}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <X className="w-4 h-4" /> Analyze new report
            </button>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Analysis Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trend Summary Card */}
              <TrendSummaryCard trend={result.trend} />

              {/* Component Breakdown */}
              <ComponentBreakdown components={result.trend.components} />

              {/* Keywords */}
              <KeywordChips keywords={result.keywords} />

              {/* Metrics Table */}
              <CollapsibleSection
                title="Extracted Metrics"
                icon={<BarChart3 className="w-5 h-5" />}
                isExpanded={expandedSections.metrics}
                onToggle={() => toggleSection('metrics')}
              >
                <MetricsTable metrics={result.metrics} />
              </CollapsibleSection>

              {/* Signals List */}
              <CollapsibleSection
                title="Signals & Drivers"
                icon={<Zap className="w-5 h-5" />}
                isExpanded={expandedSections.signals}
                onToggle={() => toggleSection('signals')}
              >
                <SignalsList 
                  signals={result.signals} 
                  onCitationClick={setSelectedCitation}
                />
              </CollapsibleSection>
            </div>

            {/* Right Column - Evidence Viewer */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Quick Stats */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Analysis Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Document</span>
                      <span className="text-white truncate ml-2">{result.report.fileName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pages</span>
                      <span className="text-white">{result.report.totalPages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Keywords Found</span>
                      <span className="text-white">{result.keywords.topKeywords.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Signals</span>
                      <span className="text-white">{result.signals.length}</span>
                    </div>
                  </div>
                </div>

                {/* Evidence Viewer */}
                <CollapsibleSection
                  title="Evidence & Citations"
                  icon={<FileText className="w-5 h-5" />}
                  isExpanded={expandedSections.evidence}
                  onToggle={() => toggleSection('evidence')}
                  defaultExpanded
                >
                  <EvidenceViewer
                    citations={result.citations}
                    selectedCitation={selectedCitation}
                    fullText={result.report.fullText}
                    onCitationSelect={setSelectedCitation}
                  />
                </CollapsibleSection>

                {/* Key Risks */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-red-400 mb-3">
                    <AlertTriangle className="w-4 h-4" /> Key Risks
                  </h3>
                  <ul className="space-y-2">
                    {result.trend.keyRisks.map((risk, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Watchlist */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-blue-400 mb-3">
                    <Target className="w-4 h-4" /> What to Watch
                  </h3>
                  <ul className="space-y-2">
                    {result.trend.watchlist.map((item, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200/80">{result.disclaimer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// SUB-COMPONENTS
// ============================================

interface TrendSummaryCardProps {
  trend: AnalysisResult['trend'];
}

const TrendSummaryCard: React.FC<TrendSummaryCardProps> = ({ trend }) => {
  const getBadgeStyles = () => {
    switch (trend.label) {
      case 'Bullish':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Bearish':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const TrendIcon = trend.label === 'Bullish' ? TrendingUp : trend.label === 'Bearish' ? TrendingDown : Minus;

  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getBadgeStyles()}`}>
          <TrendIcon className="w-5 h-5" />
          <span className="font-bold text-lg">{trend.label}</span>
        </div>

        {/* Score & Confidence */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white">{trend.score > 0 ? '+' : ''}{trend.score}</p>
            <p className="text-xs text-gray-500">Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-blue-400">{trend.confidence}%</p>
            <p className="text-xs text-gray-500">Confidence</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{trend.summary}</p>

      {/* Key Drivers */}
      {trend.keyDrivers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Key Drivers
          </h4>
          <ul className="space-y-1">
            {trend.keyDrivers.map((driver, i) => (
              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-green-400">+</span> {driver}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface ComponentBreakdownProps {
  components: ComponentScore[];
}

const ComponentBreakdown: React.FC<ComponentBreakdownProps> = ({ components }) => {
  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 sm:p-6">
      <h3 className="text-white font-medium mb-4">Score Breakdown</h3>
      <div className="space-y-3">
        {components.map((comp, i) => {
          const percentage = comp.maxScore > 0 
            ? Math.abs(comp.score) / comp.maxScore * 100 
            : Math.abs(comp.score);
          const isPositive = comp.score >= 0;
          
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">{comp.name}</span>
                <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {comp.score > 0 ? '+' : ''}{comp.score}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, percentage)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface KeywordChipsProps {
  keywords: AnalysisResult['keywords'];
}

const KeywordChips: React.FC<KeywordChipsProps> = ({ keywords }) => {
  const categoryColors: Record<string, string> = {
    growth: 'bg-green-500/20 text-green-400 border-green-500/30',
    profitability: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    cashFlow: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    balanceSheet: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    guidance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    risks: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
      <h3 className="text-white font-medium mb-3">Detected Keywords</h3>
      <div 
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {keywords.topKeywords.slice(0, 15).map((kw, i) => (
          <span
            key={i}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${categoryColors[kw.category] || 'bg-white/10 text-gray-300'}`}
          >
            {kw.keyword} ({kw.count})
          </span>
        ))}
      </div>
    </div>
  );
};

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  children
}) => {
  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3 text-white">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isExpanded && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
};

interface MetricsTableProps {
  metrics: ExtractedMetrics;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ metrics }) => {
  const rows = [
    { label: 'Revenue Change', value: metrics.revenueChange },
    { label: 'Gross Margin', value: metrics.grossMargin },
    { label: 'Operating Margin', value: metrics.operatingMargin },
    { label: 'Net Income', value: metrics.netIncome },
    { label: 'EPS', value: metrics.eps },
    { label: 'Operating Cash Flow', value: metrics.operatingCashFlow },
    { label: 'Free Cash Flow', value: metrics.freeCashFlow }
  ].filter(r => r.value !== null);

  if (rows.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-4">
        No specific metrics detected in the document.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left py-2 text-gray-400 font-medium">Metric</th>
            <th className="text-right py-2 text-gray-400 font-medium">Value</th>
            <th className="text-right py-2 text-gray-400 font-medium">Direction</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const val = row.value!;
            const DirectionIcon = val.direction === 'up' ? TrendingUp : val.direction === 'down' ? TrendingDown : Minus;
            const dirColor = val.direction === 'up' ? 'text-green-400' : val.direction === 'down' ? 'text-red-400' : 'text-gray-400';
            
            return (
              <tr key={i} className="border-b border-white/5">
                <td className="py-3 text-white">{row.label}</td>
                <td className="py-3 text-right text-white font-medium">
                  {val.unit === 'percent' ? `${val.value}%` : 
                   val.unit === 'currency' ? `$${val.value?.toLocaleString()}M` : 
                   val.value}
                </td>
                <td className={`py-3 text-right ${dirColor}`}>
                  <DirectionIcon className="w-4 h-4 inline" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface SignalsListProps {
  signals: Signal[];
  onCitationClick: (citation: Citation) => void;
}

const SignalsList: React.FC<SignalsListProps> = ({ signals, onCitationClick }) => {
  if (signals.length === 0) {
    return <p className="text-gray-500 text-sm text-center py-4">No signals detected.</p>;
  }

  return (
    <div className="space-y-3">
      {signals.map(signal => (
        <div
          key={signal.id}
          className={`p-3 rounded-lg border ${
            signal.type === 'positive'
              ? 'bg-green-500/5 border-green-500/20'
              : 'bg-red-500/5 border-red-500/20'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 ${signal.type === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
              {signal.type === 'positive' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">{signal.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{signal.description}</p>
              <button
                onClick={() => onCitationClick(signal.citation)}
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" /> View evidence (p.{signal.citation.pageNumber})
              </button>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${
              signal.impact === 'high' ? 'bg-white/10 text-white' :
              signal.impact === 'medium' ? 'bg-white/5 text-gray-400' :
              'bg-white/5 text-gray-500'
            }`}>
              {signal.impact}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

interface EvidenceViewerProps {
  citations: Citation[];
  selectedCitation: Citation | null;
  fullText: string;
  onCitationSelect: (citation: Citation) => void;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  citations,
  selectedCitation,
  fullText,
  onCitationSelect
}) => {
  return (
    <div>
      {/* Citation List */}
      <div className="space-y-2 mb-4">
        {citations.slice(0, 6).map(citation => (
          <button
            key={citation.id}
            onClick={() => onCitationSelect(citation)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              selectedCitation?.id === citation.id
                ? 'bg-blue-500/10 border-blue-500/30'
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Page {citation.pageNumber}</p>
                <p className="text-sm text-gray-300 line-clamp-2">"{citation.snippet}"</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Citation Preview */}
      {selectedCitation && (
        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <h4 className="text-xs font-medium text-blue-400 mb-2">
            Selected Evidence (Page {selectedCitation.pageNumber})
          </h4>
          <p className="text-sm text-gray-300 italic">"{selectedCitation.snippet}"</p>
        </div>
      )}
    </div>
  );
};

export default ReportTrendPredictor;
