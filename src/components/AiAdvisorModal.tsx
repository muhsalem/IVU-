import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, ShieldCheck, Scale, Loader2 } from 'lucide-react';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'أهلاً بك! أنا خبير IVU الشريعي والاقتصادي الآلي المدعوم بتقنية Gemini. يسعدني الإجابة عن أي استفسار يتعلق بحفظ القوة الشرائية للديون، معايير AAOIFI، أو تكييف أجور العقارات والأوقاف.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!question.trim() || loading) return;

    const userText = question;
    setQuestion('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText })
      });

      const data = await response.json();
      if (data.success && data.answer) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'حدث خطأ أثناء التواصل مع الخبير الآلي. يرجى إعادة المحاولة.' }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'تعذر الاتصال بالخبير الآلي حالياً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                الخبير الآلي الشرعي والاقتصادي (Gemini AI Expert)
              </h3>
              <p className="text-[11px] text-slate-400">استشارات معايير AAOIFI وفقه المعاملات وحفظ القوة الشرائية</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-none shadow' 
                  : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none whitespace-pre-wrap shadow-inner'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-amber-400 text-xs italic">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري صياغة الاستشارة الشرعية والاقتصادية...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            placeholder="اكتب سؤالك الشرعي أو الاقتصادي (مثال: هل يجوز ربط أجور الأوقاف بـ IVU؟)..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />

          <button
            onClick={handleSend}
            disabled={loading || !question.trim()}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors text-xs"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">إرسال</span>
          </button>
        </div>
      </div>
    </div>
  );
};
