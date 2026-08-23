import React, { useState } from 'react';
import { HISTORICAL_BACKTEST_DATA, BACKTEST_METRICS } from '../data/historicalData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { LineChart as LineChartIcon, ShieldCheck, AlertCircle, Award, TrendingUp } from 'lucide-react';

export const BacktestSimulator: React.FC = () => {
  const [visibleIndices, setVisibleIndices] = useState({
    ivu: true,
    usd: true,
    gold: true,
    cpi: true,
    sdr: true,
    btc: false
  });

  const toggleIndex = (key: keyof typeof visibleIndices) => {
    setVisibleIndices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <LineChartIcon className="w-4 h-4" />
          <span>المحاكاة والاختبار التاريخي الممتد (1970 - 2026)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          أداء وحدة IVU مقارنة بالعملات والذهب والتضخم خلال 56 عاماً
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          اختبار متأني لنموذج IVU مقابل أزمات الاقتصاد العالمي من إغلاق نافذة الذهب سنة 1971 حتى اليوم، مبرهناً أداءه الفريد في استقرار القوة الشرائية وتفادي التذبذب الشديد.
        </p>
      </div>

      {/* Metrics Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">انحراف تقلب IVU (Volatility)</span>
          <p className="text-2xl font-bold text-amber-400">{BACKTEST_METRICS.volatility.ivu}</p>
          <p className="text-[11px] text-slate-400">مقارنة بـ 22.8% للذهب و 14.2% للدولار</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">حفظ القوة الشرائية الحقيقية</span>
          <p className="text-2xl font-bold text-emerald-400">{BACKTEST_METRICS.purchasingPowerRetention.ivu}</p>
          <p className="text-[11px] text-slate-400">احتفاظ شبه كامل للقيمة الحقيقية للعقد</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">تآكل الدولار الأمريكي منذ 1970</span>
          <p className="text-2xl font-bold text-rose-400">-91.5%</p>
          <p className="text-[11px] text-slate-400">القوة الشرائية المتبقية للدولار: 8.5% فقط</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">درجة التكيف في الأزمات</span>
          <p className="text-2xl font-bold text-blue-400">{BACKTEST_METRICS.crisisResilienceScore.ivu}/100</p>
          <p className="text-[11px] text-slate-400">الأفضل بين جميع الأصول المقارنة</p>
        </div>
      </div>

      {/* Interactive Backtest Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              المسار التاريخي للمؤشرات (سنة الأساس 1970 = 100)
            </h3>
            <p className="text-xs text-slate-400">انقر على الأسماء لتفعيل أو إخفاء أي خط مرجعي</p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => toggleIndex('ivu')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                visibleIndices.ivu ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              وحدة IVU
            </button>
            <button
              onClick={() => toggleIndex('gold')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                visibleIndices.gold ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              الذهب
            </button>
            <button
              onClick={() => toggleIndex('usd')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                visibleIndices.usd ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              الدولار
            </button>
            <button
              onClick={() => toggleIndex('cpi')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                visibleIndices.cpi ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              مؤشر CPI
            </button>
            <button
              onClick={() => toggleIndex('sdr')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                visibleIndices.sdr ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              حقوق SDR
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-80 sm:h-96 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORICAL_BACKTEST_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px', color: '#f8fafc' }}
                formatter={(value: any) => [`${value} نقطة`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              {visibleIndices.ivu && (
                <Line type="monotone" dataKey="ivuIndex" name="وحدة IVU المتوازنة" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              )}
              {visibleIndices.gold && (
                <Line type="monotone" dataKey="goldIndex" name="الذهب (تذبذب حاد)" stroke="#eab308" strokeWidth={2} strokeDasharray="4 4" />
              )}
              {visibleIndices.cpi && (
                <Line type="monotone" dataKey="cpiIndex" name="مؤشر CPI التضخمي" stroke="#10b981" strokeWidth={2} />
              )}
              {visibleIndices.sdr && (
                <Line type="monotone" dataKey="sdrIndex" name="حقوق SDR" stroke="#3b82f6" strokeWidth={2} />
              )}
              {visibleIndices.usd && (
                <Line type="monotone" dataKey="usdIndex" name="القوة الشرائية للدولار" stroke="#f43f5e" strokeWidth={2} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Crisis Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          أداء IVU أثناء الأزمات المالية والاقتصادية الكبرى
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HISTORICAL_BACKTEST_DATA.filter(d => d.eventAr).map((item) => (
            <div key={item.year} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 font-mono">{item.year}</span>
                <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
                  IVU = {item.ivuIndex}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-semibold">{item.eventAr}</p>
              <p className="text-[11px] text-slate-400">
                امتص المؤشر الصدمة بمرونة عبر إعادة موازنة أوزان الذهب والسلع والعملات تلقائياً.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
