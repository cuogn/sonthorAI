import React, { useState } from 'react';
import { BrainCircuit, Sparkles, TrendingUp, AlertTriangle, FileText, Zap, Globe, Send, MessageSquare, BarChart3, Newspaper } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const AIInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'briefing' | 'chat' | 'political'>('briefing');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'ai', text: 'Xin chào! Tôi là SONTHOR AI - trợ lý phân tích đầu tư của bạn. Tôi có thể giúp bạn phân tích thị trường vàng, chứng khoán, dầu khí và kim loại hiếm. Hãy hỏi tôi bất cứ điều gì!' }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: chatInput
    };
    
    // Simulate AI response
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: `Cảm ơn câu hỏi của bạn về "${chatInput}". Dựa trên phân tích dữ liệu thị trường, tôi nhận thấy xu hướng tích cực trong ngắn hạn. Khuyến nghị: Theo dõi sát biến động trong 24-48h tới trước khi ra quyết định.`
    };
    
    setChatMessages(prev => [...prev, userMessage, aiResponse]);
    setChatInput('');
  };

  // Political events data
  const politicalEvents = [
    { 
      title: 'Fed duy trì lãi suất', 
      date: '02/02/2026', 
      impact: 'positive',
      sectors: ['Vàng', 'Chứng khoán'],
      summary: 'Fed quyết định giữ nguyên lãi suất, tạo điều kiện thuận lợi cho thị trường rủi ro và kim loại quý.'
    },
    { 
      title: 'Căng thẳng Trung Đông leo thang', 
      date: '01/02/2026', 
      impact: 'mixed',
      sectors: ['Dầu khí', 'Vàng'],
      summary: 'Bất ổn địa chính trị đẩy giá dầu tăng, vàng được hưởng lợi như tài sản trú ẩn an toàn.'
    },
    { 
      title: 'EU thông qua gói hỗ trợ năng lượng xanh', 
      date: '30/01/2026', 
      impact: 'positive',
      sectors: ['Kim loại hiếm'],
      summary: 'Nhu cầu lithium, cobalt tăng mạnh nhờ chính sách thúc đẩy xe điện và năng lượng tái tạo.'
    },
  ];

  const tabs = [
    { id: 'briefing' as const, label: 'Báo cáo hàng ngày', icon: <FileText className="w-4 h-4" /> },
    { id: 'chat' as const, label: 'Chat với AI', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'political' as const, label: 'Phân tích chính trị', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
         <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-500/10 border border-blue-500/30 mb-2 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <BrainCircuit className="w-10 h-10 text-blue-400" />
         </div>
         <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Trung Tâm AI</h2>
         <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Phân tích deep learning xử lý hàng triệu điểm dữ liệu để đưa ra thông tin đầu tư hành động.
         </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'briefing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Featured Insight */}
           <div className="col-span-1 md:col-span-2 lg:col-span-2 glass-panel p-8 md:p-10 rounded-[24px] relative overflow-hidden group border-blue-500/30 transition-all hover:border-blue-500/50">
              <div className="absolute top-0 right-0 p-6 z-20">
                 <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                   <Zap className="w-3 h-3 fill-current" /> Phân tích nổi bật
                 </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#070B1A]/80 to-transparent pointer-events-none z-0" />
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display leading-tight drop-shadow-lg">Xu hướng vàng <br/>đầu năm 2026</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                          <span className="px-3 py-1 rounded bg-amber-500/20 border border-amber-500/30 text-xs text-amber-400">#Vàng</span>
                          <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">#Fed</span>
                          <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-300">#Lạm phát</span>
                      </div>
                      <p className="text-white/70 mb-8 text-lg max-w-xl leading-relaxed font-light">
                      Mô hình AI của chúng tôi dự đoán giá vàng có thể đạt mức $2,150/oz trong Q1/2026, được hỗ trợ bởi chính sách tiền tệ nới lỏng và nhu cầu trú ẩn an toàn gia tăng.
                      </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6">
                      <button className="flex items-center gap-3 bg-white text-[#0A1224] font-bold px-8 py-3.5 rounded-[12px] hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20 group/btn">
                          <FileText className="w-4 h-4" /> Xem báo cáo đầy đủ
                          <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                      </button>
                      <div className="flex items-center gap-2 text-xs text-blue-300/80 bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-500/20">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Cập nhật 2 giờ trước
                      </div>
                  </div>
              </div>
           </div>

           {/* Risk Alert Card */}
           <div className="glass-panel p-8 rounded-[24px] border border-yellow-500/30 bg-gradient-to-b from-yellow-500/5 to-transparent hover:bg-yellow-500/10 transition-colors relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent" />
              
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2.5 bg-yellow-500/20 rounded-lg text-yellow-500">
                   <AlertTriangle className="w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold text-white tracking-wide">Cảnh báo rủi ro</h3>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                 Phát hiện hoạt động bất thường trong ngành bất động sản. Thanh khoản suy giảm có thể dẫn đến biến động <span className="text-white font-bold">5-8%</span> trong 48 giờ tới.
              </p>
              
              <div className="mt-auto space-y-3 p-4 rounded-xl bg-black/20 border border-white/5">
                  <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest font-bold">
                      <span>Độ tin cậy AI</span>
                      <span className="text-yellow-500">88%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-500 w-[88%] h-full shadow-[0_0_15px_rgba(234,179,8,0.6)]" />
                  </div>
              </div>
           </div>

           {/* Standard Insight Cards */}
           {[
               { title: "Dòng tiền chuyển dịch", type: "Chứng khoán", desc: "Vốn đang dịch chuyển từ cổ phiếu công nghệ lớn sang nhóm ngân hàng và bất động sản khu công nghiệp." },
               { title: "Dầu thô phục hồi", type: "Dầu khí", desc: "OPEC+ cắt giảm sản lượng hỗ trợ giá dầu. Khuyến nghị theo dõi PVD và GAS trong tuần tới." },
               { title: "Lithium tăng mạnh", type: "Kim loại hiếm", desc: "Nhu cầu pin xe điện đẩy giá lithium lên mức cao nhất 6 tháng. Rhodium tiếp tục xu hướng tích lũy." }
           ].map((item, i) => (
              <div key={i} className="glass-panel p-8 rounded-[24px] hover:-translate-y-2 hover:border-blue-500/40 transition-all duration-300 group cursor-pointer flex flex-col">
                 <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors border border-blue-500/10">
                       <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full font-bold">{item.type}</span>
                 </div>
                 <h4 className="font-bold text-white mb-3 text-xl group-hover:text-blue-300 transition-colors">{item.title}</h4>
                 <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">
                    {item.desc}
                 </p>
                 <button className="text-blue-400 text-sm font-bold hover:text-white flex items-center gap-2 group-hover:translate-x-1 transition-all mt-auto pt-4 border-t border-white/5">
                    Xem phân tích chi tiết <Sparkles className="w-3 h-3" />
                 </button>
              </div>
           ))}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="glass-panel rounded-[24px] overflow-hidden max-w-3xl mx-auto">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">SONTHOR AI</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Đang hoạt động
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4 scrollbar-hide">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Hỏi về thị trường vàng, chứng khoán, dầu khí..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'political' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="glass-panel p-6 rounded-[20px] border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Globe className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Phân tích tác động chính trị</h3>
            </div>
            <p className="text-gray-400 text-sm">
              AI phân tích các sự kiện chính trị toàn cầu và đánh giá tác động lên các lĩnh vực đầu tư.
            </p>
          </div>

          {politicalEvents.map((event, i) => (
            <div key={i} className="glass-panel p-6 rounded-[20px] hover:border-white/20 transition-all">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Newspaper className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-white text-lg">{event.title}</h4>
                    <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                      event.impact === 'positive' ? 'bg-green-500/20 text-green-400' :
                      event.impact === 'negative' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {event.impact === 'positive' ? 'Tích cực' : event.impact === 'negative' ? 'Tiêu cực' : 'Hỗn hợp'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{event.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.sectors.map(sector => (
                      <span key={sector} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIInsights;