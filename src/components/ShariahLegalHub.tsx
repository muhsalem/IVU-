import React from 'react';
import { MAQASID_PRINCIPLES, SHARIAH_RULINGS } from '../data/shariahData';
import { ShieldCheck, Scale, BookOpen, FileCheck2, Building2, HelpCircle } from 'lucide-react';

export const ShariahLegalHub: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>التقييم الشرعي والمؤطِر القانوني والتنظيمي</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          التوافق الشرعي وملاءمة معايير AAOIFI ومقاصد الشريعة
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          دراسة تأصيلية فقهية وقانونية لضمان سلامة التعامل بوحدة القيمة الإسلامية (IVU) وخلوها من الربا والغرر والإضرار بصلب العقد.
        </p>
      </div>

      {/* Maqasid al-Shariah Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          المقاصد الشرعية الكبرى التي تحققها وحدة IVU
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MAQASID_PRINCIPLES.map((maqasid) => (
            <div key={maqasid.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-bold text-base text-amber-300">{maqasid.titleAr}</h4>
                <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/20 text-xs italic text-amber-200/90 font-serif">
                  {maqasid.quranHadithAr}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{maqasid.explanationAr}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-900/30">
                <strong className="text-emerald-300 font-semibold">تطبيق IVU: </strong>
                {maqasid.ivuApplicationAr}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Fiqh & AAOIFI Matrix */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          أحكام الفقه والمعايير الشرعية AAOIFI بحسب طبيعة العقود
        </h3>

        <div className="space-y-6">
          {SHARIAH_RULINGS.map((ruling, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/20">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-base text-amber-300">{ruling.topicAr}</h4>
              </div>

              {/* Fiqh Schools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">المذهب الحنفي:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{ruling.schoolViews.hanafi}</p>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">المذهب المالكي:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{ruling.schoolViews.maliki}</p>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">الشافعية والحنابلة:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{ruling.schoolViews.hanbali}</p>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">الفقهاء المعاصرون:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{ruling.schoolViews.contemporary}</p>
                </div>
              </div>

              {/* AAOIFI & Fiqh Council Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    معايير AAOIFI المعتمَدة:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{ruling.aaoifiStandard}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-blue-400 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    قرار مجمع الفقه الإسلامي الدولي:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{ruling.fiqhCouncilResolution}</p>
                </div>
              </div>

              {/* IVU Compliance Verdict */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs text-amber-200">
                <strong className="text-amber-400 font-bold">توافق وحدة IVU: </strong>
                {ruling.ivuAlignment}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Central Bank Classification */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          التكييف القانوني وموقف البنوك المركزية
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-400">التصنيف القانوني: وحدة حساب تعاقدية (Unit of Account)</h4>
            <p className="leading-relaxed text-xs">
              لا تُعد وحدة IVU عملة قانونية مستقلة تنافس العطاء الإجباري للدول، بل يُكيف وضعها القانوني كـ <strong className="text-slate-100">"معيار مرجعي لربط التزامات العقود الآجلة"</strong> (Contractual Indexation Index)، تماماً كما يتم استخدام مؤشر LIBOR أو SOFR أو CPI في القوانين التجارية الدولية بموجب قاعدة الحرية التعاقدية.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-emerald-400">موقف البنوك المركزية والسلطات النقدية</h4>
            <p className="leading-relaxed text-xs">
              تضمن IVU عدم التصادم مع اختصاصات البنوك المركزية لأن جميع التسويات والمدفوعات الفعليه تتم بالعملة الوطنية القانونية المعمول بها في الدولة، ولكن بقيمة اسمية معدلة توافق قوة القوة الشرائية لوحدة IVU يوم السداد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
