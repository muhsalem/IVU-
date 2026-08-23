import React, { useState } from 'react';
import { VALUE_MODELS_COMPARISON } from '../data/comparisonData';
import { Layers, Search, Filter, ShieldCheck, CheckCircle2, XCircle, ArrowUpDown, Award } from 'lucide-react';

export const ModelComparison: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shariahFilter, setShariahFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'stabilityScore' | 'inflationHedging' | 'liquidity'>('stabilityScore');

  const filteredModels = VALUE_MODELS_COMPARISON
    .filter(m => {
      const matchesSearch = m.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            m.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesShariah = shariahFilter === 'All' || m.shariahRating === shariahFilter;
      return matchesSearch && matchesShariah;
    })
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <Layers className="w-4 h-4" />
          <span>مصفوفة المقارنة المرجعية المتقدمة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          مقارنة بين 21 نموذجاً عالمياً لقياس وحفظ القوة الشرائية
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          تحليل مقارن شامل يغطي الذهب، الفضة، SDR، CPI، PPI، سلة العملات، تعادل القوة الشرائية، الأصول الرقمية، والنماذج الهجينة للوصول إلى النموذج الأفضل (IVU).
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن نموذج (مثلاً: ذهب، CPI، SDR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pr-9 pl-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Shariah Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>التوافق الشرعي:</span>
            <select
              value={shariahFilter}
              onChange={(e) => setShariahFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">الكل</option>
              <option value="High">توافق عالٍ جداً</option>
              <option value="Medium">توافق متوسط/مشروط</option>
              <option value="Low">توافق منخفض/غير مطابق</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>ترتيب حسب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="stabilityScore">درجة الاستقرار (Stability)</option>
              <option value="inflationHedging">التحوط ضد التضخم (Hedging)</option>
              <option value="liquidity">درجة السيولة (Liquidity)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Models Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const isOptimal = model.id === 'ivu_hybrid';
          return (
            <div
              key={model.id}
              className={`rounded-2xl p-5 border transition-all space-y-4 flex flex-col justify-between ${
                isOptimal 
                  ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30' 
                  : 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                      {model.nameAr}
                      {isOptimal && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          النموذج الهجين الأفضل
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">{model.nameEn}</p>
                  </div>

                  <span className={`text-[10px] px-2 py-1 rounded-full font-semibold border ${
                    model.shariahRating === 'High' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    model.shariahRating === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {model.shariahRating === 'High' ? 'شرعي ممتاز' :
                     model.shariahRating === 'Medium' ? 'مقبول بملاحظات' : 'غير موصى به'}
                  </span>
                </div>

                {/* Metrics Progress */}
                <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 text-center text-[11px]">
                  <div>
                    <p className="text-slate-400 text-[10px]">الاستقرار</p>
                    <p className="font-bold text-amber-400">{model.stabilityScore}/100</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px]">تحوط التضخم</p>
                    <p className="font-bold text-emerald-400">{model.inflationHedging}/100</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px]">السيولة</p>
                    <p className="font-bold text-blue-400">{model.liquidity}/100</p>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-2 text-xs pt-1">
                  <div className="space-y-1">
                    <p className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      المميزات:
                    </p>
                    <ul className="text-slate-300 list-disc list-inside space-y-0.5 text-[11px]">
                      {model.prosAr.map((p, idx) => (
                        <li key={idx} className="line-clamp-2">{p}</li>
                      ))}
                    </ul>
                  </div>

                  {model.consAr.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <p className="text-rose-400 font-semibold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        السلبيات والقيود:
                      </p>
                      <ul className="text-slate-400 list-disc list-inside space-y-0.5 text-[11px]">
                        {model.consAr.map((c, idx) => (
                          <li key={idx} className="line-clamp-2">{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Verdict Footer */}
              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-300 italic">
                <strong className="text-amber-400 not-italic">التقييم النهائي: </strong>
                {model.verdictAr}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
