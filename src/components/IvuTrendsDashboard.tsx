import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Coins, 
  Scale, 
  Activity, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Layers, 
  Zap, 
  RefreshCw, 
  Award, 
  Info, 
  CheckCircle2 
} from 'lucide-react';

// Data simulation for historical index growth comparison
interface TimeframeData {
  timeframe: '1Y' | '5Y' | '10Y' | '20Y' | '50Y';
  labelAr: string;
  chartData: {
    period: string;
    IVU: number;
    USD: number;
    EUR: number;
    EGP: number;
    Gold: number;
  }[];
}

const HISTORICAL_DATA: Record<string, TimeframeData['chartData']> = {
  '1Y': [
    { period: 'الربع الأول 2025', IVU: 100, USD: 100, EUR: 100, EGP: 100, Gold: 100 },
    { period: 'الربع الثاني 2025', IVU: 103.2, USD: 98.8, EUR: 98.2, EGP: 91.5, Gold: 105.1 },
    { period: 'الربع الثالث 2025', IVU: 106.8, USD: 97.4, EUR: 96.9, EGP: 84.2, Gold: 111.4 },
    { period: 'الربع الرابع 2025', IVU: 109.5, USD: 96.1, EUR: 95.3, EGP: 78.0, Gold: 114.2 },
    { period: 'الربع الأول 2026', IVU: 112.4, USD: 94.8, EUR: 94.1, EGP: 72.4, Gold: 118.9 },
    { period: 'الحالي (يوليو 2026)', IVU: 115.8, USD: 93.5, EUR: 92.8, EGP: 68.1, Gold: 122.5 }
  ],
  '5Y': [
    { period: '2021', IVU: 100, USD: 100, EUR: 100, EGP: 100, Gold: 100 },
    { period: '2022', IVU: 112.5, USD: 92.0, EUR: 89.5, EGP: 74.0, Gold: 108.2 },
    { period: '2023', IVU: 124.8, USD: 86.5, EUR: 83.2, EGP: 48.5, Gold: 121.4 },
    { period: '2024', IVU: 138.2, USD: 82.1, EUR: 78.4, EGP: 32.1, Gold: 142.8 },
    { period: '2025', IVU: 151.6, USD: 78.4, EUR: 74.2, EGP: 25.8, Gold: 168.0 },
    { period: '2026 (الآن)', IVU: 165.2, USD: 75.2, EUR: 70.8, EGP: 21.5, Gold: 189.4 }
  ],
  '10Y': [
    { period: '2016', IVU: 100, USD: 100, EUR: 100, EGP: 100, Gold: 100 },
    { period: '2018', IVU: 118.4, USD: 93.2, EUR: 91.0, EGP: 49.2, Gold: 112.0 },
    { period: '2020', IVU: 142.1, USD: 87.5, EUR: 84.8, EGP: 42.1, Gold: 145.2 },
    { period: '2022', IVU: 168.5, USD: 80.2, EUR: 76.5, EGP: 31.0, Gold: 152.0 },
    { period: '2024', IVU: 201.2, USD: 72.8, EUR: 68.2, EGP: 16.5, Gold: 201.5 },
    { period: '2026', IVU: 234.8, USD: 67.1, EUR: 62.4, EGP: 11.2, Gold: 242.0 }
  ],
  '20Y': [
    { period: '2006', IVU: 100, USD: 100, EUR: 100, EGP: 100, Gold: 100 },
    { period: '2010', IVU: 135.2, USD: 91.0, EUR: 92.4, EGP: 78.2, Gold: 188.0 },
    { period: '2014', IVU: 172.0, USD: 83.5, EUR: 81.2, EGP: 62.0, Gold: 210.4 },
    { period: '2018', IVU: 215.8, USD: 76.2, EUR: 73.0, EGP: 31.5, Gold: 215.0 },
    { period: '2022', IVU: 289.4, USD: 68.4, EUR: 64.1, EGP: 20.1, Gold: 292.0 },
    { period: '2026', IVU: 382.5, USD: 59.8, EUR: 54.2, EGP: 7.4, Gold: 465.0 }
  ],
  '50Y': [
    { period: '1970', IVU: 100, USD: 100, EUR: 100, EGP: 100, Gold: 100 },
    { period: '1980', IVU: 280.0, USD: 48.2, EUR: 52.0, EGP: 65.0, Gold: 1420.0 },
    { period: '1990', IVU: 450.0, USD: 31.0, EUR: 35.2, EGP: 28.0, Gold: 1080.0 },
    { period: '2000', IVU: 620.0, USD: 23.5, EUR: 25.8, EGP: 14.2, Gold: 780.0 },
    { period: '2010', IVU: 1120.0, USD: 18.2, EUR: 19.5, EGP: 7.8, Gold: 3450.0 },
    { period: '2026', IVU: 2480.0, USD: 12.4, EUR: 13.1, EGP: 0.8, Gold: 7850.0 }
  ]
};

// Basket Asset Allocation
const BASKET_COMPONENTS = [
  { name: 'الذهب الخالص (Gold 24k)', percentage: 30, color: '#f59e0b', description: 'معدن الملاذ الآمن والغطاء الشرعي الأساسي' },
  { name: 'الفضة النقية (Pure Silver)', percentage: 10, color: '#94a3b8', description: 'معيار الدرهم الشرعي والتنوع المعدني' },
  { name: 'سلة العملات العالمية (SDR Basket)', percentage: 35, color: '#3b82f6', description: 'حقوق السحب الخاصة (USD, EUR, CNY, JPY, GBP)' },
  { name: 'سلة السلع الحيوية (Essential Commodities)', percentage: 25, color: '#10b981', description: 'الحبوب الغذائية، الطاقة، والمعادن الصناعية' },
];

export const IvuTrendsDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1Y' | '5Y' | '10Y' | '20Y' | '50Y'>('5Y');
  
  // Interactive Purchasing Power Calculator state
  const [initialCapital, setInitialCapital] = useState<number>(100000); // 100k SAR/USD
  const [inflationRate, setInflationRate] = useState<number>(6.5); // 6.5% annual inflation
  const [yearsHorizon, setYearsHorizon] = useState<number>(10);

  // Calculated Purchasing Power outcomes
  const fiatRemainingPurchasingPowerPct = Math.pow(1 - inflationRate / 100, yearsHorizon);
  const fiatRealValue = initialCapital * fiatRemainingPurchasingPowerPct;
  const fiatLossValue = initialCapital - fiatRealValue;
  
  // In IVU, nominal value grows by inflation factor to maintain 100% purchasing power
  const ivuNominalValueRequired = initialCapital / fiatRemainingPurchasingPowerPct;
  const wealthPreservedAmount = ivuNominalValueRequired - initialCapital;

  const currentChartData = useMemo(() => HISTORICAL_DATA[timeframe], [timeframe]);

  return (
    <div className="space-y-10">
      {/* Hero Header & Mission Statement */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>لوحة التتبع والنمو المباشر (IVU Real-time Index Dashboard)</span>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            تحديث حي ومباشر (Live Price Feed)
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <Scale className="w-8 h-8 text-amber-400 shrink-0" />
            محرك حفظ القوة الشرائية المنصفة (Purchasing Power Preservation Engine)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            تعتمد رؤية رسالة ووحدة القيمة الإسلامية (IVU) على إلغاء التآكل الهيكلي للقوة الشرائية الناجم عن التضخم والطباعة النقدية غير المغطاة. تعرض هذه اللوحة الأداء التراكمي الحي لمؤشر IVU مقارنة بالعملات الورقية العالمية الكبرى وسلة الذهب.
          </p>
        </div>

        {/* Live Ticker Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">سعر 1 IVU الحالي:</span>
            <span className="text-lg font-bold text-amber-400 font-mono">$1,590.25 USD</span>
            <span className="text-[10px] text-emerald-400 block font-mono">+0.12% (24h)</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">معدل الحفظ التراكمي:</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">99.85%</span>
            <span className="text-[10px] text-slate-400 block">صفر تآكل للقوة الشرائية</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">درجة أمان التضخم:</span>
            <span className="text-lg font-bold text-blue-400 font-mono">98.6 / 100</span>
            <span className="text-[10px] text-blue-300/80 block">Standard AAOIFI Class</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">التجاوب مع الذهب/السوق:</span>
            <span className="text-lg font-bold text-purple-400 font-mono">تنعيم لوجستي</span>
            <span className="text-[10px] text-purple-300/80 block">استقرار ممتاز من التقلب</span>
          </div>
        </div>
      </div>

      {/* Main Chart Section: IVU vs Fiat Currencies Growth Trend */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              مقارنة اتجاه نمو IVU وتدهور العملات الورقية (Index Performance Comparison)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              يُظهر المخطط كيف يحتفظ مؤشر IVU بقيمته التراكمية الحقيقية بينما تتراجع العملات الورقية بسبب التضخم
            </p>
          </div>

          {/* Timeframe Selector Buttons */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold gap-1">
            {(['1Y', '5Y', '10Y', '20Y', '50Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeframe === tf
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tf === '1Y' && 'سنة واحدة'}
                {tf === '5Y' && '5 سنوات'}
                {tf === '10Y' && '10 سنوات'}
                {tf === '20Y' && '20 سنة'}
                {tf === '50Y' && '50 سنة (1970-2026)'}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Main Line Chart */}
        <div className="h-80 sm:h-96 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentChartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  borderRadius: '0.75rem', 
                  color: '#f8fafc',
                  fontSize: '12px'
                }}
                formatter={(value: any, name: any) => {
                  const labels: Record<string, string> = {
                    IVU: 'مؤشر IVU الإسلامي',
                    USD: 'الدولار الأمريكي (USD)',
                    EUR: 'اليورو (EUR)',
                    EGP: 'الجنيه المصري (EGP)',
                    Gold: 'الذهب الخالص (Gold)'
                  };
                  return [`${Number(value).toFixed(1)} نقطة`, labels[name] || name];
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    IVU: 'وحدة IVU (حفظ القوة الشرائية)',
                    USD: 'الدولار الأمريكي',
                    EUR: 'اليورو الأوروبي',
                    EGP: 'الجنيه المصري',
                    Gold: 'الذهب الخالص'
                  };
                  return <span className="text-xs text-slate-300 font-medium px-2">{labels[value] || value}</span>;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="IVU" 
                stroke="#f59e0b" 
                strokeWidth={3.5} 
                dot={{ r: 4, fill: '#f59e0b' }} 
                activeDot={{ r: 7 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Gold" 
                stroke="#eab308" 
                strokeWidth={2} 
                strokeDasharray="4 4" 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="USD" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="EUR" 
                stroke="#8b5cf6" 
                strokeWidth={1.5} 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="EGP" 
                stroke="#ef4444" 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Dynamic Insight Banner */}
        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-300 font-bold block mb-1">نتيجة التحليل التراكمي ({timeframe}):</strong>
            <span>
              في حين تفقد العملات الورقية قدرتها الشرائية باستمرار نتيجة الطباعة النقدية (حيث فقد الدولار الأمريكي أكثر من 40% من قوته الشرائية في 20 سنة والجنيه أكثر من 92%)، يحافظ مؤشر IVU الهجين على مسار ثابت تصاعدي موازٍ لارتفاع تكاليف المعيشة دون الوقوع في التقلبات الحادة الشديدة التي يشهدها سعر الذهب منفردًا.
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns - Basket Composition & Interactive Purchasing Power Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Basket Asset Allocation & Smoothing Effect */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Layers className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">تكوين سلة IVU وآلية امتصاص الصدمات (Basket Specification)</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              تتركب وحدة IVU من خلطة هجينة مدروسة رياضياً تمنحها الاستقرار المتين وتمنع القفزات المفاجئة مع التحصين الكامل ضد التضخم.
            </p>

            {/* Recharts Pie Chart for Asset Allocation */}
            <div className="h-60 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={BASKET_COMPONENTS}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="percentage"
                  >
                    {BASKET_COMPONENTS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff', fontSize: '11px' }}
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2.5 pt-2">
            {BASKET_COMPONENTS.map((comp) => (
              <div key={comp.name} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: comp.color }}></span>
                  <div>
                    <span className="font-bold text-slate-200 block">{comp.name}</span>
                    <span className="text-[10px] text-slate-400">{comp.description}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{comp.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Purchasing Power Decay Simulator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              حاسبة حماية رأس المال من التضخم (Inflation Shield Calculator)
            </h3>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2.5 py-1 rounded-md font-mono">
              Simulator
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Input Capital */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">
                مبلغ الادخار أو القرض الأولي (بالعملة الورقية):
              </label>
              <input 
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Math.max(1000, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Input Inflation Rate slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>معدل التضخم السنوي التقديري:</span>
                <span className="text-amber-400 font-mono font-bold">{inflationRate}% سنوياً</span>
              </div>
              <input 
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input Horizon dropdown */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">
                المدة الزمنية (بالسنوات):
              </label>
              <select
                value={yearsHorizon}
                onChange={(e) => setYearsHorizon(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                <option value={3}>3 سنوات</option>
                <option value={5}>5 سنوات</option>
                <option value={10}>10 سنوات (عقد كامل)</option>
                <option value={15}>15 سنة</option>
                <option value={20}>20 سنة (جيل كامل)</option>
              </select>
            </div>

            {/* Results Comparison Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Fiat Scenario */}
              <div className="bg-slate-950 p-4 rounded-xl border border-red-900/30 space-y-2">
                <span className="text-[11px] font-bold text-red-400 block border-b border-slate-800 pb-1">
                  1. الاحتفاظ بالنقد الورقي
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">القيمة الحقيقية المتبقية:</span>
                  <span className="text-lg font-bold text-red-400 font-mono">
                    ${fiatRealValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <p className="text-[10px] text-red-300/80 leading-relaxed bg-red-950/20 p-2 rounded border border-red-900/20">
                  خسارة قدرها <strong className="font-mono text-red-400">${fiatLossValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> (-{((1 - fiatRemainingPurchasingPowerPct) * 100).toFixed(1)}%) من القدرة الشرائية!
                </p>
              </div>

              {/* IVU Scenario */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 block border-b border-slate-800 pb-1">
                  2. الربط بوحدة IVU الإسلامية
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">المبلغ المحدث عند السداد:</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    ${ivuNominalValueRequired.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-300/90 leading-relaxed bg-emerald-950/20 p-2 rounded border border-emerald-900/20">
                  تم حفظ القوة الشرائية بنسبة <strong className="font-mono text-emerald-400">100%</strong> وحماية الحقوق الشرعية كاملة.
                </p>
              </div>
            </div>

            {/* Final Verdict */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                تضمن آلية IVU التزام المدين بسداد نفس القيمة الحقيقية للدين دون أي زيادة ربوية مشروطة، طبقاً للمعيار الشرعي لـ AAOIFI.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
