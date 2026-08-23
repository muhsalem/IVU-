import React, { useState, useMemo } from 'react';
import { calculateIvuContractValue, SUPPORTED_CURRENCIES } from '../utils/ivuMath';
import { exportCalculationToPdf, exportCalculationToExcel } from '../utils/exportPdfExcel';
import { ContractType } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Calculator, Download, FileSpreadsheet, Scale, ArrowLeftRight, CheckCircle2, ShieldAlert, Globe } from 'lucide-react';

export const IvuCalculator: React.FC = () => {
  const [startDateYear, setStartDateYear] = useState<number>(2010);
  const [endDateYear, setEndDateYear] = useState<number>(2026);
  const [nominalAmount, setNominalAmount] = useState<number>(100000);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('SAR');
  const [contractType, setContractType] = useState<ContractType>('qard_hasan');

  const selectedCurrency = SUPPORTED_CURRENCIES.find(c => c.code === selectedCurrencyCode) || SUPPORTED_CURRENCIES[0];

  // Perform calculation
  const result = useMemo(() => {
    return calculateIvuContractValue({
      startDateYear,
      endDateYear,
      nominalAmount,
      currencyCode: selectedCurrency.code,
      contractType
    });
  }, [startDateYear, endDateYear, nominalAmount, selectedCurrency, contractType]);

  const chartData = [
    { name: 'الاسمية الأصلية', amount: result.nominalAmount, fill: '#64748b' },
    { name: 'معدلة بـ IVU', amount: result.ivuValue, fill: '#f59e0b' },
    { name: 'معيار الذهب', amount: result.goldValue, fill: '#eab308' },
    { name: 'مؤشر CPI', amount: result.cpiValue, fill: '#10b981' },
    { name: 'سلة SDR', amount: result.currencyBasketValue, fill: '#3b82f6' }
  ];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <Calculator className="w-4 h-4" />
          <span>المحرك الحسابي الشامل والتفاعلي</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          حاسبة وحدة القيمة الإسلامية (IVU Calculator)
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          أدخل بيانات عقدك أو دينك لتحديد القيمة المستحقة المعتدلة وفق معايير IVU، مقارنة بالذهب والتضخم وسلة العملات مع توصية الفتوى الشرعية المعتمَدة وتقرير قابل للتنزيل.
        </p>
      </div>

      {/* Input Panel Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-base font-bold text-amber-300 border-b border-slate-800 pb-3">
          1. تحديد بيانات العقد والالتزام المالي
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Contract Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">نوع العقد / المعاملة:</label>
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value as ContractType)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            >
              <option value="qard_hasan">قرض حسن (Qard Hasan)</option>
              <option value="debt">دين مؤجل / بيع آجل (Debt Settlement)</option>
              <option value="salary">عقد عمل / راتب (Employment Contract)</option>
              <option value="rent">إيجار طويل الأجل / وقف (Rent & Lease)</option>
              <option value="construction">عقد مقاولات / استصناع (Construction)</option>
              <option value="waqf">حفظ وتقييم أصول الأوقاف (Waqf Assets)</option>
              <option value="zakat">تقييم الأموال والأنصبة للزكاة (Zakat Evaluation)</option>
              <option value="compensation">تعويضات وتركات (Compensations)</option>
              <option value="international_trade">عقد تجارة دولية (International Trade)</option>
            </select>
          </div>

          {/* Nominal Amount */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">المبلغ الاسمي للعقد:</label>
            <input
              type="number"
              min="1"
              value={nominalAmount}
              onChange={(e) => setNominalAmount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {/* Currency Choice */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">العملة الأصلية للعقد:</label>
            <select
              value={selectedCurrencyCode}
              onChange={(e) => setSelectedCurrencyCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            >
              {SUPPORTED_CURRENCIES.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.nameAr} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Selectors */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-300">سنة البداية:</label>
              <select
                value={startDateYear}
                onChange={(e) => setStartDateYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
              >
                {[1970, 1973, 1980, 1990, 1997, 2000, 2008, 2010, 2012, 2015, 2018, 2020, 2022, 2024].map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-300">سنة السداد/التقييم:</label>
              <select
                value={endDateYear}
                onChange={(e) => setEndDateYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
              >
                {[1980, 1990, 2000, 2008, 2012, 2015, 2020, 2022, 2024, 2026].map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/50 rounded-2xl p-6 space-y-4 shadow-xl">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block">
              ★ القيمة التعديلية العادلة بـ IVU
            </span>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono">
                {result.ivuValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} {selectedCurrency.symbol}
              </p>
              <p className="text-xs text-slate-300">
                مبلغ التعديل المستحق: <span className="text-emerald-400 font-bold font-mono">+{result.ivuDifferenceAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {selectedCurrency.symbol}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">تغير القوة الشرائية:</span>
                <span className="font-bold text-amber-400 font-mono">+{result.ivuChangePercent.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">تآكل القيمة الاسمية بالدولار:</span>
                <span className="font-bold text-rose-400 font-mono">-{result.inflationLossPercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Export Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => exportCalculationToPdf(result)}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 py-3 rounded-xl text-xs font-semibold transition-all shadow"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>تقرير PDF</span>
            </button>

            <button
              onClick={() => exportCalculationToExcel(result)}
              className="flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80 py-3 rounded-xl text-xs font-semibold transition-all shadow"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>ملف Excel</span>
            </button>
          </div>
        </div>

        {/* Right Side: Detailed Comparison Table & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
              مقارنة نتائج التقييم بين النماذج المرجعية المختلفة
            </h3>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-slate-200 text-right">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">النموذج المرجعي</th>
                    <th className="p-3">القيمة المستحقة المعدلة</th>
                    <th className="p-3">نسبة التغير</th>
                    <th className="p-3">الفرق الاسمي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="bg-amber-500/10 font-bold">
                    <td className="p-3 text-amber-300">وحدة IVU الهجينة (النموذج الأعدل)</td>
                    <td className="p-3 font-mono text-amber-300">{result.ivuValue.toLocaleString(undefined, {maximumFractionDigits:2})} {selectedCurrency.symbol}</td>
                    <td className="p-3 font-mono text-amber-300">+{result.ivuChangePercent.toFixed(2)}%</td>
                    <td className="p-3 font-mono text-emerald-400">+{result.ivuDifferenceAmount.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">معيار الذهب (Physical Gold)</td>
                    <td className="p-3 font-mono">{result.goldValue.toLocaleString(undefined, {maximumFractionDigits:2})} {selectedCurrency.symbol}</td>
                    <td className="p-3 font-mono">+{result.goldChangePercent.toFixed(2)}%</td>
                    <td className="p-3 font-mono text-slate-300">+{result.goldDifferenceAmount.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">مؤشر أسعار المستهلك (CPI Inflation)</td>
                    <td className="p-3 font-mono">{result.cpiValue.toLocaleString(undefined, {maximumFractionDigits:2})} {selectedCurrency.symbol}</td>
                    <td className="p-3 font-mono">+{(result.cpiValue / result.nominalAmount * 100 - 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono text-slate-300">+{result.cpiDifferenceAmount.toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">سلة حقوق السحب (SDR Currency Basket)</td>
                    <td className="p-3 font-mono">{result.currencyBasketValue.toLocaleString(undefined, {maximumFractionDigits:2})} {selectedCurrency.symbol}</td>
                    <td className="p-3 font-mono">+{(result.currencyBasketValue / result.nominalAmount * 100 - 100).toFixed(2)}%</td>
                    <td className="p-3 font-mono text-slate-300">+{(result.currencyBasketValue - result.nominalAmount).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recharts Bar Comparison */}
            <div className="h-64 w-full pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-2">رسم بياني مقارن للقيم المستحقة:</p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(value: any) => [`${Number(value).toLocaleString()} ${selectedCurrency.symbol}`, 'المبلغ']}
                  />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Shariah Recommendation Guidance Box */}
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5" />
          <span>التوجيه الشرعي المعتمد والمعيار الفقهي (AAOIFI Standard Guidance)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          {result.shariahGuidanceAr}
        </p>
        <p className="text-[11px] text-emerald-400/90 font-mono">
          المرجع الموثوق: {result.aaoifiReferenceAr}
        </p>
      </div>

      {/* Offshore FX Special Notice */}
      <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-white">هل تواجه فرقاً في سعر الصرف خارج الدولة (Offshore FX)؟</h4>
            <p className="text-xs text-slate-400">
              يمكنك استخدام قسم «سعر الصرف خارج الدولة» لمقارنة السعر الرسمي للبنك المركزي بسعر الصرف الحقيقي في أسواق الصرف الخارجية والتحويلات لحفظ حقوق الدائنين والمغتربين.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
