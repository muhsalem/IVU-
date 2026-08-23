import React from 'react';
import { THEORY_SECTIONS } from '../data/theoryData';
import { TrendingDown, Coins, BarChart3, AlertTriangle, ShieldCheck, Scale, Info } from 'lucide-react';

export const TheoreticalDiagnosis: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingDown': return <TrendingDown className="w-6 h-6 text-rose-400" />;
      case 'Coins': return <Coins className="w-6 h-6 text-amber-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-blue-400" />;
      default: return <AlertTriangle className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Scale className="w-4 h-4" />
            <span>التشخيص الاقتصادي والنظري الشامل</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            لماذا يفشل النظام النقدي الحالي في حفظ القوة الشرائية؟
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            دراسة تشخيصية عميقة أعدها فريق متعدد التخصصات من خبراء الاقتصاد الكلي، التمويل الإسلامي، وأعضاء هيئات المعايير الشرعية لتبيان أسباب تآكل الثروات وعجز الحلول التقليدية المنفردة.
          </p>
        </div>
      </div>

      {/* Grid of Theory Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {THEORY_SECTIONS.map((section) => (
          <div 
            key={section.id} 
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700/60 shadow-inner">
                  {getIcon(section.iconName)}
                </div>
                <h3 className="text-lg font-bold text-slate-100">{section.titleAr}</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                {section.summaryAr}
              </p>

              <div className="space-y-3 pt-2">
                {section.pointsAr.map((pt, idx) => (
                  <div key={idx} className="space-y-1 bg-slate-950/30 p-3 rounded-xl border border-slate-800/40">
                    <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-amber-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{pt.headingAr}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pr-3">{pt.detailAr}</p>
                    <div className="mt-1.5 text-[11px] text-rose-300/90 bg-rose-950/20 border border-rose-900/30 px-2.5 py-1 rounded-lg">
                      <strong className="text-rose-400">الأثر الحقيقي: </strong>
                      {pt.impactAr}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Matrix Box */}
      <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 text-amber-400">
          <Info className="w-6 h-6" />
          <h3 className="text-lg font-bold">الخلاصة الاقتصادية والشرعية للمشكلة</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          إن الاعتماد على النقود الورقية المنفردة يعرّض المعاملات لتضخم هيكلي دائم، والاعتماد على الذهب وحده يعرضها لتقلبات مضاربية حادة، بينما تعاني مؤشرات التضخم الرسمية من تحيزات حسابية. من هنا تبرز الحاجة الملحة لبناء <strong className="text-amber-400 font-semibold">وحدة القيمة الإسلامية (IVU)</strong> كسلة أصول مادية ونقدية هجينة ومتوازنة تجمع بين ثبات الأصول الحقيقية وسهولة المعاملات النقدية.
        </p>
      </div>
    </div>
  );
};
