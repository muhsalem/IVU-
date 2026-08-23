import React, { useState } from 'react';
import { FileCode, Play, Copy, Check, Terminal, Cpu } from 'lucide-react';

export const ApiDocs: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState<'calculate' | 'historical' | 'basket'>('calculate');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const testCalculateApi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ivu/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDateYear: 2010,
          endDateYear: 2026,
          nominalAmount: 100000,
          currencyCode: 'SAR',
          contractType: 'qard_hasan'
        })
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const testHistoricalApi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ivu/historical');
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const testBasketApi = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ivu/basket');
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const curlSnippet = `curl -X POST "https://ivu-standard.org/api/ivu/calculate" \\
  -H "Content-Type: application/json" \\
  -d '{
    "startDateYear": 2010,
    "endDateYear": 2026,
    "nominalAmount": 100000,
    "currencyCode": "SAR",
    "contractType": "qard_hasan"
  }'`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <FileCode className="w-4 h-4" />
          <span>منصة المطورين والربط البرمجي (Developer API Portal)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          واجهات API للربط المباشر مع البنوك والأنظمة المصرفية
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          قم بدمج محرك حسابات وحدة القيمة الإسلامية (IVU) مباشرة في تطبيقات البنوك والمؤسسات الوقفية والمنصات المصرفية عبر واجهات برمجية عالية السرعة والأمان.
        </p>
      </div>

      {/* Interactive API Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoints Selector & Snippet */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="font-bold text-sm text-amber-300 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            اختبار نقاط الاتصال البرمجية (API Playground)
          </h3>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveEndpoint('calculate'); testCalculateApi(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                activeEndpoint === 'calculate' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              POST /api/ivu/calculate
            </button>

            <button
              onClick={() => { setActiveEndpoint('historical'); testHistoricalApi(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                activeEndpoint === 'historical' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              GET /api/ivu/historical
            </button>

            <button
              onClick={() => { setActiveEndpoint('basket'); testBasketApi(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                activeEndpoint === 'basket' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              GET /api/ivu/basket
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">كود cURL التجريبي:</span>
              <button
                onClick={() => handleCopyCode(curlSnippet)}
                className="text-[11px] text-amber-400 flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>نسخ الكود</span>
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
              {curlSnippet}
            </pre>
          </div>

          <button
            onClick={() => {
              if (activeEndpoint === 'calculate') testCalculateApi();
              else if (activeEndpoint === 'historical') testHistoricalApi();
              else testBasketApi();
            }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{loading ? 'جاري تنفيذ الطلب...' : 'تشغيل الاختبار الحي'}</span>
          </button>
        </div>

        {/* JSON Response Output Viewer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Cpu className="w-4 h-4 text-emerald-400" />
              الاستجابة البرمجية الحية (Live JSON Response)
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300 max-h-96 overflow-y-auto">
              {apiResponse ? (
                <pre className="whitespace-pre-wrap">{apiResponse}</pre>
              ) : (
                <p className="text-slate-500 text-xs italic">انقر على "تشغيل الاختبار الحي" لرؤية النتيجة المباشرة محلياً...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
