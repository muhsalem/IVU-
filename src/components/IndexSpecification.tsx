import React, { useState } from 'react';
import { DEFAULT_BASKET_COMPONENTS } from '../utils/ivuMath';
import { Scale, Sliders, RefreshCw, Layers, ShieldAlert, Cpu } from 'lucide-react';

export const IndexSpecification: React.FC = () => {
  // Custom Slider weights state
  const [weights, setWeights] = useState({
    metals: 35,
    currencies: 30,
    commodities: 20,
    purchasing_power: 15
  });

  const totalWeight = weights.metals + weights.currencies + weights.commodities + weights.purchasing_power;

  // Calculate dynamic simulated scores
  const simulatedStability = Math.round(
    (weights.metals * 0.68 + weights.currencies * 0.85 + weights.commodities * 0.72 + weights.purchasing_power * 0.88) / (totalWeight / 100)
  );

  const simulatedHedging = Math.round(
    (weights.metals * 0.92 + weights.currencies * 0.50 + weights.commodities * 0.94 + weights.purchasing_power * 0.85) / (totalWeight / 100)
  );

  const resetWeights = () => {
    setWeights({ metals: 35, currencies: 30, commodities: 20, purchasing_power: 15 });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <Scale className="w-4 h-4" />
          <span>التصميم الهندسي والرياضي للمؤشر</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          المعادلة الرياضياتية والصيغة النهائية لمؤشر IVU
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          يعتمد مؤشر IVU على نموذج هجين مركب ينعم التذبذبات اليومية عبر أربعة محاور استراتيجية مادية ونقدية.
        </p>
      </div>

      {/* Mathematical Formulas Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">الصيغة الرياضياتية الرسمية (IVU Equation)</h3>
            <p className="text-xs text-slate-400">طريقة الحساب اليومي وسلسلة الربط التراكمي (Chain-Linking Normalization)</p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 space-y-3 overflow-x-auto">
          <p className="text-slate-400 text-[11px] font-sans"># المعادلة الأساسية لقيمة المؤشر في اليوم t:</p>
          <div className="text-base sm:text-lg font-bold text-amber-400 py-2 border-y border-slate-800">
            IVU_t = IVU_0 × ∑ [ w_i × ( P_(i,t) / P_(i,0) ) ] × Φ(t)
          </div>
          <div className="text-slate-300 text-xs space-y-1 font-sans pt-2">
            <p><strong className="text-amber-400">حيث:</strong></p>
            <p>• <code className="text-amber-300">IVU_0</code>: القيمة المرجعية الأساسية للمؤشر (Base = 100 سنة 1970 أو سنة الأساس المحدد للعقد).</p>
            <p>• <code className="text-amber-300">w_i</code>: وزن الأخير لكل مكون من مكونات السلة الأربعة (∑ w_i = 100%).</p>
            <p>• <code className="text-amber-300">P_(i,t) / P_(i,0)</code>: التغير النسبي في سعر الأصل i عند اليوم t مقارنة بيوم الأساس.</p>
            <p>• <code className="text-amber-300">Φ(t)</code>: معامل تنعيم الصدمات والحد من التذبذب الفجائي (Volatility Damping Factor).</p>
          </div>
        </div>

        {/* Normalization & Rebalancing Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
            <h4 className="font-bold text-xs text-amber-400">1. إعادة التوازن الدوري (Rebalancing)</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">تتم مراجعة أوزان المكونات ربع سنوياً للحد من طغيان أصل ارتفع بفقاعة مضاربية.</p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
            <h4 className="font-bold text-xs text-emerald-400">2. سقف المخاطر (Volatility Caps)</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">تقييد الوزن الأقصى لأي أصل منفرد عند 10%-15% لمنع الصدمات الجيوسياسية.</p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
            <h4 className="font-bold text-xs text-blue-400">3. التطبيع وسلسلة الربط (Chain-Linking)</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">تطبيع كافة قيم الأصول إلى 1.00 نقطة عند بداية العقد لضمان مقارنة رياضية عادلة.</p>
          </div>
        </div>
      </div>

      {/* Interactive Weight Tuning Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">محاكي ضبط أوزان سلة IVU (Interactive Weight Tuner)</h3>
              <p className="text-xs text-slate-400">قم بتعديل النسب لملاحظة تأثيرها على استقرار المؤشر والقدرة على تحوط التضخم</p>
            </div>
          </div>

          <button
            onClick={resetWeights}
            className="flex items-center gap-1.5 text-xs text-amber-400 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة للنسب المعتمدة</span>
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metals Slider */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-amber-400">المعادن النفيضة (ذهب وفضة)</span>
              <span className="font-mono text-slate-200">{weights.metals}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={weights.metals}
              onChange={(e) => setWeights({ ...weights, metals: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">تمنح ثباتاً مادياً وتطابقاً مع الفقه النفيضي الأصيل.</p>
          </div>

          {/* Currencies Slider */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-blue-400">سلة العملات العالمية (SDR)</span>
              <span className="font-mono text-slate-200">{weights.currencies}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={weights.currencies}
              onChange={(e) => setWeights({ ...weights, currencies: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">تضمن مرونة تسوية فورية وتداول نقد بنكي سلس.</p>
          </div>

          {/* Commodities Slider */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-400">السلع الأساسية والطاقة</span>
              <span className="font-mono text-slate-200">{weights.commodities}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={weights.commodities}
              onChange={(e) => setWeights({ ...weights, commodities: Number(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">تحمي القوة الشرائية المعيشية وتغطي تكاليف المقاولات والغذاء.</p>
          </div>

          {/* Purchasing Power Slider */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-purple-400">مؤشر أسعار المستهلك (CPI/PPP)</span>
              <span className="font-mono text-slate-200">{weights.purchasing_power}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              value={weights.purchasing_power}
              onChange={(e) => setWeights({ ...weights, purchasing_power: Number(e.target.value) })}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">تربط العقد مباشرة بمستوى غلاء المعيشة الفعلي للمستهلك.</p>
          </div>
        </div>

        {/* Live Simulation Output Box */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs text-amber-400 font-semibold">المجموع الكلي للأوزان: {totalWeight}%</span>
            <p className="text-xs text-slate-300">
              {totalWeight === 100 ? '✅ الأوزان متوازنة تماماً بنسبة 100%.' : '⚠️ الأوزان بحاجة لتعديل لتصل إلى 100%.'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block">درجة الاستقرار المحاكية</span>
              <span className="text-2xl font-bold text-amber-400">{simulatedStability}/100</span>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block">كفاءة تحوط التضخم</span>
              <span className="text-2xl font-bold text-emerald-400">{simulatedHedging}/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
