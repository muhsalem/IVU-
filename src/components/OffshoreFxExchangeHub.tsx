import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  ArrowLeftRight, 
  TrendingDown, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  Calculator, 
  DollarSign, 
  Coins, 
  BookOpen, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  RefreshCw, 
  ExternalLink,
  Building,
  Landmark,
  FileText,
  Copy,
  Check
} from 'lucide-react';
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
  Area 
} from 'recharts';

export interface OffshoreCurrencyProfile {
  code: string;
  nameAr: string;
  countryAr: string;
  symbol: string;
  officialRateToUsd: number; // Official Bank rate (e.g., 48.5 EGP/USD)
  offshoreRateToUsd: number; // Offshore / Real international market rate (e.g., 52.8 EGP/USD or peak 68.0)
  ivuFairRateToUsd: number;  // Real Purchasing Power Parity rate calculated by IVU
  spreadPercentage: number;
  riskLevel: 'عالي جداً' | 'مرتفع' | 'متوسط' | 'مستقر';
  descriptionAr: string;
  historicalGapData: {
    year: string;
    officialRate: number;
    offshoreRate: number;
    ivuFairRate: number;
  }[];
}

export const OFFSHORE_CURRENCIES: OffshoreCurrencyProfile[] = [
  {
    code: 'EGP',
    nameAr: 'الجنيه المصري',
    countryAr: 'مصر',
    symbol: 'ج.م',
    officialRateToUsd: 48.60,
    offshoreRateToUsd: 51.40,
    ivuFairRateToUsd: 53.20,
    spreadPercentage: 5.76,
    riskLevel: 'مرتفع',
    descriptionAr: 'تفاوت تاريخي واسع بين السعر الرسمي المثبت وسعر عقود NDF وأسواق الصرف الخارجية خلال دورات التضخم.',
    historicalGapData: [
      { year: '2020', officialRate: 15.7, offshoreRate: 15.9, ivuFairRate: 16.2 },
      { year: '2021', officialRate: 15.7, offshoreRate: 16.1, ivuFairRate: 17.5 },
      { year: '2022', officialRate: 24.5, offshoreRate: 31.0, ivuFairRate: 28.4 },
      { year: '2023', officialRate: 30.9, offshoreRate: 52.0, ivuFairRate: 46.8 },
      { year: '2024', officialRate: 48.2, offshoreRate: 53.5, ivuFairRate: 51.0 },
      { year: '2025', officialRate: 48.5, offshoreRate: 51.8, ivuFairRate: 52.6 },
      { year: '2026 (الآن)', officialRate: 48.6, offshoreRate: 51.4, ivuFairRate: 53.2 }
    ]
  },
  {
    code: 'TRY',
    nameAr: 'الليرة التركية',
    countryAr: 'تركيا',
    symbol: '₺',
    officialRateToUsd: 33.40,
    offshoreRateToUsd: 35.80,
    ivuFairRateToUsd: 36.50,
    spreadPercentage: 7.18,
    riskLevel: 'مرتفع',
    descriptionAr: 'انخفاض مستمر مع فروقات ملحوظة في أسواق لندن ومشتقات الصرف الخارجية مقارنة بالبنك المركزي.',
    historicalGapData: [
      { year: '2020', officialRate: 7.0, offshoreRate: 7.3, ivuFairRate: 7.5 },
      { year: '2021', officialRate: 8.9, offshoreRate: 11.2, ivuFairRate: 10.4 },
      { year: '2022', officialRate: 18.6, offshoreRate: 19.8, ivuFairRate: 21.0 },
      { year: '2023', officialRate: 28.5, offshoreRate: 30.8, ivuFairRate: 31.2 },
      { year: '2024', officialRate: 32.8, offshoreRate: 34.5, ivuFairRate: 35.0 },
      { year: '2025', officialRate: 33.1, offshoreRate: 35.2, ivuFairRate: 35.8 },
      { year: '2026 (الآن)', officialRate: 33.4, offshoreRate: 35.8, ivuFairRate: 36.5 }
    ]
  },
  {
    code: 'SYP',
    nameAr: 'الليرة السورية',
    countryAr: 'سوريا',
    symbol: 'ل.س',
    officialRateToUsd: 13500,
    offshoreRateToUsd: 15200,
    ivuFairRateToUsd: 15800,
    spreadPercentage: 12.59,
    riskLevel: 'عالي جداً',
    descriptionAr: 'تفاوت جذري بين التسعيرة الرسمية والنشرات الخارجية وتحويلات المغتربين في دول الخليج وأوروبا.',
    historicalGapData: [
      { year: '2020', officialRate: 1250, offshoreRate: 2400, ivuFairRate: 2600 },
      { year: '2021', officialRate: 2512, offshoreRate: 3500, ivuFairRate: 3800 },
      { year: '2022', officialRate: 3015, offshoreRate: 6000, ivuFairRate: 6400 },
      { year: '2023', officialRate: 8500, offshoreRate: 14000, ivuFairRate: 14500 },
      { year: '2024', officialRate: 13000, offshoreRate: 15000, ivuFairRate: 15400 },
      { year: '2025', officialRate: 13200, offshoreRate: 15100, ivuFairRate: 15600 },
      { year: '2026 (الآن)', officialRate: 13500, offshoreRate: 15200, ivuFairRate: 15800 }
    ]
  },
  {
    code: 'LBP',
    nameAr: 'الليرة اللبنانية',
    countryAr: 'لبنان',
    symbol: 'ل.ل',
    officialRateToUsd: 89500,
    offshoreRateToUsd: 91500,
    ivuFairRateToUsd: 94000,
    spreadPercentage: 2.23,
    riskLevel: 'عالي جداً',
    descriptionAr: 'تاريخ حافل بانهيار السعر القديم (1500) والانتقال إلى تسعير المنصات الخارجية وشهادات الإيداع.',
    historicalGapData: [
      { year: '2020', officialRate: 1507, offshoreRate: 8500, ivuFairRate: 7800 },
      { year: '2021', officialRate: 1507, offshoreRate: 22000, ivuFairRate: 20500 },
      { year: '2022', officialRate: 1507, offshoreRate: 42000, ivuFairRate: 39000 },
      { year: '2023', officialRate: 15000, offshoreRate: 89000, ivuFairRate: 88000 },
      { year: '2024', officialRate: 89500, offshoreRate: 90800, ivuFairRate: 92000 },
      { year: '2025', officialRate: 89500, offshoreRate: 91200, ivuFairRate: 93500 },
      { year: '2026 (الآن)', officialRate: 89500, offshoreRate: 91500, ivuFairRate: 94000 }
    ]
  },
  {
    code: 'SDG',
    nameAr: 'الجنيه السوداني',
    countryAr: 'السودان',
    symbol: 'ج.س',
    officialRateToUsd: 1980,
    offshoreRateToUsd: 2650,
    ivuFairRateToUsd: 2800,
    spreadPercentage: 33.84,
    riskLevel: 'عالي جداً',
    descriptionAr: 'فجوة ضخمة بين عطاءات البنك المركزي والتحويلات المصرفية في دبي والرياض والقاهرة.',
    historicalGapData: [
      { year: '2020', officialRate: 55, offshoreRate: 260, ivuFairRate: 240 },
      { year: '2021', officialRate: 436, offshoreRate: 450, ivuFairRate: 470 },
      { year: '2022', officialRate: 570, offshoreRate: 590, ivuFairRate: 620 },
      { year: '2023', officialRate: 750, offshoreRate: 1100, ivuFairRate: 1200 },
      { year: '2024', officialRate: 1800, offshoreRate: 2450, ivuFairRate: 2600 },
      { year: '2025', officialRate: 1920, offshoreRate: 2580, ivuFairRate: 2720 },
      { year: '2026 (الآن)', officialRate: 1980, offshoreRate: 2650, ivuFairRate: 2800 }
    ]
  },
  {
    code: 'DZD',
    nameAr: 'الدينار الجزائري',
    countryAr: 'الجزائر',
    symbol: 'د.ج',
    officialRateToUsd: 134.20,
    offshoreRateToUsd: 232.00,
    ivuFairRateToUsd: 215.00,
    spreadPercentage: 72.88,
    riskLevel: 'مرتفع',
    descriptionAr: 'سوق الصرف الموازي (السكوار والأسواق الخارجية) يتجاوز السعر الرسمي بأكثر من 70% بصورة مستمرة.',
    historicalGapData: [
      { year: '2020', officialRate: 128.0, offshoreRate: 195.0, ivuFairRate: 185.0 },
      { year: '2021', officialRate: 135.0, offshoreRate: 205.0, ivuFairRate: 192.0 },
      { year: '2022', officialRate: 142.0, offshoreRate: 212.0, ivuFairRate: 200.0 },
      { year: '2023', officialRate: 136.0, offshoreRate: 224.0, ivuFairRate: 208.0 },
      { year: '2024', officialRate: 134.5, offshoreRate: 228.0, ivuFairRate: 212.0 },
      { year: '2025', officialRate: 134.0, offshoreRate: 230.0, ivuFairRate: 214.0 },
      { year: '2026 (الآن)', officialRate: 134.2, offshoreRate: 232.0, ivuFairRate: 215.0 }
    ]
  },
  {
    code: 'SAR',
    nameAr: 'الريال السعودي',
    countryAr: 'السعودية',
    symbol: 'ر.س',
    officialRateToUsd: 3.75,
    offshoreRateToUsd: 3.75,
    ivuFairRateToUsd: 3.75,
    spreadPercentage: 0.0,
    riskLevel: 'مستقر',
    descriptionAr: 'ربط نقدي صلب ومستقر تماماً مدعوم باحتياطيات دولية ضخمة وبترودولار.',
    historicalGapData: [
      { year: '2020', officialRate: 3.75, offshoreRate: 3.75, ivuFairRate: 3.75 },
      { year: '2022', officialRate: 3.75, offshoreRate: 3.75, ivuFairRate: 3.75 },
      { year: '2024', officialRate: 3.75, offshoreRate: 3.75, ivuFairRate: 3.75 },
      { year: '2026 (الآن)', officialRate: 3.75, offshoreRate: 3.75, ivuFairRate: 3.75 }
    ]
  },
  {
    code: 'AED',
    nameAr: 'الدرهم الإماراتي',
    countryAr: 'الإمارات',
    symbol: 'د.إ',
    officialRateToUsd: 3.6725,
    offshoreRateToUsd: 3.6725,
    ivuFairRateToUsd: 3.6725,
    spreadPercentage: 0.0,
    riskLevel: 'مستقر',
    descriptionAr: 'استقرار نقدي متين وتطابق تام بين أسعار الصرف المحلية والدولية.',
    historicalGapData: [
      { year: '2020', officialRate: 3.67, offshoreRate: 3.67, ivuFairRate: 3.67 },
      { year: '2022', officialRate: 3.67, offshoreRate: 3.67, ivuFairRate: 3.67 },
      { year: '2024', officialRate: 3.67, offshoreRate: 3.67, ivuFairRate: 3.67 },
      { year: '2026 (الآن)', officialRate: 3.67, offshoreRate: 3.67, ivuFairRate: 3.67 }
    ]
  }
];

export const OffshoreFxExchangeHub: React.FC = () => {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('EGP');
  
  // Interactive Settlement Simulator Inputs
  const [debtAmount, setDebtAmount] = useState<number>(100000); // 100k local currency
  const [originationYear, setOriginationYear] = useState<number>(2020);
  const [targetSettlementCurrency, setTargetSettlementCurrency] = useState<'USD' | 'SAR' | 'LOCAL'>('USD');
  const [copiedApi, setCopiedApi] = useState(false);

  const activeCurrency = useMemo(() => {
    return OFFSHORE_CURRENCIES.find(c => c.code === selectedCurrencyCode) || OFFSHORE_CURRENCIES[0];
  }, [selectedCurrencyCode]);

  // Find start point
  const startHistPoint = useMemo(() => {
    return activeCurrency.historicalGapData.find(d => d.year.includes(originationYear.toString())) 
      || activeCurrency.historicalGapData[0];
  }, [activeCurrency, originationYear]);

  const latestHistPoint = activeCurrency.historicalGapData[activeCurrency.historicalGapData.length - 1];

  // Calculations:
  // 1. Initial real USD value at origination:
  const initialUsdAtOrigination = debtAmount / startHistPoint.offshoreRate;

  // 2. Settlement at Current Official Rate:
  const currentOfficialUsdValue = debtAmount / latestHistPoint.officialRate;
  const currentOfficialLocalRepayment = debtAmount; // Nominal unchanged

  // 3. Settlement at Current Offshore Free Market Rate:
  const currentOffshoreUsdValue = debtAmount / latestHistPoint.offshoreRate;
  const offshoreAdjustedLocalAmount = initialUsdAtOrigination * latestHistPoint.offshoreRate;

  // 4. Settlement at IVU Fair Index (Synthesized PPP):
  const ivuHarmonizedUsdValue = initialUsdAtOrigination * (1.18); // adjusted for global dollar inflation
  const ivuHarmonizedLocalAmount = ivuHarmonizedUsdValue * latestHistPoint.ivuFairRate;

  // Real Creditor Loss under Official Rate:
  const purchasingPowerLossPct = Math.max(0, ((initialUsdAtOrigination - currentOfficialUsdValue) / initialUsdAtOrigination) * 100);

  const handleCopyApi = () => {
    const apiCode = `
// استعلام سعر الصرف الخارجي وسعر IVU العادل عبر API المباشر
fetch('https://api.ivu-standard.com/v1/fx/offshore?currency=${activeCurrency.code}')
  .then(res => res.json())
  .then(data => {
    console.log("Official Rate:", data.official_rate);
    console.log("Offshore FX Rate:", data.offshore_market_rate);
    console.log("IVU Fair Parity Rate:", data.ivu_fair_rate);
    console.log("Spread Discount:", data.spread_discount_percentage);
  });
    `.trim();
    navigator.clipboard.writeText(apiCode);
    setCopiedApi(true);
    setTimeout(() => setCopiedApi(false), 3000);
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <Globe className="w-4 h-4" />
            <span>منظومة ربط أسعار الصرف الخارجية والموازية (Offshore FX & Real Market Rate Hub)</span>
          </div>
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-3 py-1 rounded-full font-mono flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Dual-Exchange Rate Tracking
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <ArrowLeftRight className="w-8 h-8 text-amber-400 shrink-0" />
            ربط قيمة العملة خارج الدولة ومعالجة فجوة الصرف المزدوج
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            تعاني العديد من العملات من فجوة جوهرية بين السعر الرسمي المعلن من البنك المركزي وسعر الصرف الحقيقي خارج الدولة (في أسواق الصرف الدولية، مشتقات NDF، وتحويلات المغتربين). تتيح هذه المنظومة ربط الديون والعقود بسعر الصرف الواقعي لتفادي الغبن وحفظ الحقوق الشرعية وفق فتاوى المجامع الفقهية.
          </p>
        </div>

        {/* Currency Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-thin">
          {OFFSHORE_CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setSelectedCurrencyCode(curr.code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                selectedCurrencyCode === curr.code
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{curr.nameAr} ({curr.code})</span>
              {curr.spreadPercentage > 10 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  selectedCurrencyCode === curr.code ? 'bg-slate-950 text-amber-300' : 'bg-red-950 text-red-400 border border-red-800'
                }`}>
                  +{curr.spreadPercentage.toFixed(0)}% فجوة
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Rate Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Official Bank Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-blue-400" />
              1. السعر الرسمي (البنك المركزي الداخلي)
            </span>
            <span className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
              Official Peg
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-white font-mono">
              {activeCurrency.officialRateToUsd.toFixed(2)} <span className="text-sm font-normal text-slate-400">{activeCurrency.code} / $1 USD</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              السعر المقيد بالبنوك داخل الدولة، وغالباً ما يكون مقيداً بقيود السحب والتحويل الخارجي.
            </p>
          </div>
        </div>

        {/* Card 2: Offshore International / Free Market Rate */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-3 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-400" />
              2. سعر الصرف الحقيقي خارج الدولة (Offshore FX)
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              Real Market Rate
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-amber-400 font-mono">
              {activeCurrency.offshoreRateToUsd.toFixed(2)} <span className="text-sm font-normal text-amber-300/80">{activeCurrency.code} / $1 USD</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-red-400 font-mono font-bold">
                فارق السعر: +{activeCurrency.spreadPercentage.toFixed(1)}%
              </span>
              <span className="text-slate-400 text-[10px]">
                (في عقود NDF وأسواق الصرف الإقليمية)
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: IVU Fair Parity Rate */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-3 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              3. سعر التعادل الشرعي المنصف (IVU Fair Index)
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
              AAOIFI Aligned
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              {activeCurrency.ivuFairRateToUsd.toFixed(2)} <span className="text-sm font-normal text-emerald-300/80">{activeCurrency.code} / $1 USD</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 leading-relaxed">
              السعر الحسابي التوافقي المعتمد على القوة الشرائية الحقيقية وسلة الأصول لإبراء الذمة دون غبن.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Gap Chart & Trend Analysis */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              تتبع تاريخي لفجوة سعر الصرف: الرسمي vs الخارجي vs المعيار الشرعي IVU ({activeCurrency.nameAr})
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              يوضح المخطط كيف يؤدي الاعتماد على السعر الرسمي وحده إلى خسارة حقوق الدائنين والمغتربين عند حدوث تعويم أو انهيار نقدي
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-slate-950 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
              درجة المخاطرة: <strong className="text-amber-400">{activeCurrency.riskLevel}</strong>
            </span>
          </div>
        </div>

        {/* Recharts Line/Area comparison */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activeCurrency.historicalGapData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  borderRadius: '0.75rem', 
                  color: '#f8fafc',
                  fontSize: '12px'
                }}
                formatter={(val: any, name: any) => {
                  const labels: Record<string, string> = {
                    officialRate: 'السعر الرسمي للبنك المركزي',
                    offshoreRate: 'سعر الصرف الخارجي (Offshore FX)',
                    ivuFairRate: 'سعر التعادل الشرعي IVU'
                  };
                  return [`${Number(val).toFixed(2)} ${activeCurrency.symbol}/$`, labels[name] || name];
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                formatter={(val) => {
                  const labels: Record<string, string> = {
                    officialRate: 'السعر الرسمي الداخلي',
                    offshoreRate: 'سعر الصرف الحقيقي خارج الدولة',
                    ivuFairRate: 'سعر IVU المرجعي العادل'
                  };
                  return <span className="text-xs text-slate-300 font-medium px-2">{labels[val] || val}</span>;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="offshoreRate" 
                stroke="#f59e0b" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#f59e0b' }} 
              />
              <Line 
                type="monotone" 
                dataKey="ivuFairRate" 
                stroke="#10b981" 
                strokeWidth={2.5} 
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#10b981' }} 
              />
              <Line 
                type="monotone" 
                dataKey="officialRate" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 3, fill: '#3b82f6' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Settlement Simulator: Settle by Offshore FX vs Official vs IVU */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              حاسبة تسوية الديون والالتزامات بفارق سعر الصرف الخارجي
            </h3>
          </div>
          <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-lg font-mono">
            FX Debt Settlement Simulator
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">مبلغ الالتزام أو الدين الأصلي:</label>
            <input
              type="number"
              min="1000"
              value={debtAmount}
              onChange={(e) => setDebtAmount(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono text-sm focus:border-amber-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400">بالعملة المحلية ({activeCurrency.nameAr})</span>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">سنة نشوء الالتزام / القرض:</label>
            <select
              value={originationYear}
              onChange={(e) => setOriginationYear(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
            >
              <option value={2020}>2020 (قبل أزمة التعويم)</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 block">عملة المقارنة والتسوية:</label>
            <select
              value={targetSettlementCurrency}
              onChange={(e) => setTargetSettlementCurrency(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="USD">الدولار الأمريكي ($ USD)</option>
              <option value="SAR">الريال السعودي (ر.س SAR)</option>
              <option value="LOCAL">العملة المحلية نفسها ({activeCurrency.code})</option>
            </select>
          </div>
        </div>

        {/* 3 Comparative Settlement Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Option 1: Official Bank Rate */}
          <div className="bg-slate-950 p-4 rounded-xl border border-red-900/40 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-red-400 block">1. السداد بالسعر الرسمي القديم/الاسمي</span>
              <span className="text-[10px] text-slate-500">حساب جامد يتجاهل التضخم</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">القيمة الفعلية المستردة:</span>
              <div className="text-xl font-bold text-red-400 font-mono">
                ${currentOfficialUsdValue.toLocaleString(undefined, { maximumFractionDigits: 1 })} USD
              </div>
              <div className="text-xs text-slate-400 font-mono">
                (أو {debtAmount.toLocaleString()} {activeCurrency.code})
              </div>
            </div>
            <div className="bg-red-950/20 p-2.5 rounded-lg border border-red-900/30 text-[11px] text-red-300 leading-relaxed">
              <span className="font-bold block text-red-400">غبن فاحش للدائن:</span>
              خسارة ما يقارب <strong>{purchasingPowerLossPct.toFixed(1)}%</strong> من القيمة الحقيقية لرأس المال المسلّف!
            </div>
          </div>

          {/* Option 2: Offshore Market Rate */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/40 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-400 block">2. السداد بسعر الصرف الخارجي (Offshore)</span>
              <span className="text-[10px] text-slate-400">سعر السوق الحر وسعر التحويلات</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">المبلغ المعادل بالسعر الخارجي:</span>
              <div className="text-xl font-bold text-amber-400 font-mono">
                {offshoreAdjustedLocalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {activeCurrency.code}
              </div>
              <div className="text-xs text-amber-300/80 font-mono">
                (يساوي ${initialUsdAtOrigination.toLocaleString(undefined, { maximumFractionDigits: 1 })} USD الأصلي)
              </div>
            </div>
            <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30 text-[11px] text-amber-200 leading-relaxed">
              <span className="font-bold block text-amber-300">حفظ القوة الشرائية الحرة:</span>
              يسترد الدائن كامل القدرة الصرفية لأمواله خارج الدولة وفي التعاملات الحقيقية.
            </div>
          </div>

          {/* Option 3: IVU Harmonized Settlement */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 block">3. السداد بمعيار IVU المتوازن</span>
              <span className="text-[10px] text-emerald-300">المعيار الشرعي المنصف للطرفين</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">المبلغ المحدث العادل:</span>
              <div className="text-xl font-bold text-emerald-400 font-mono">
                {ivuHarmonizedLocalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {activeCurrency.code}
              </div>
              <div className="text-xs text-emerald-300/80 font-mono">
                (معوض عن التضخم الدولي أيضاً)
              </div>
            </div>
            <div className="bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30 text-[11px] text-emerald-200 leading-relaxed">
              <span className="font-bold block text-emerald-400">العدالة التامة (لا ضرر ولا ضرار):</span>
              يضمن سداد الحق بمثله الحقيقي مع تخفيف الغلو والمضاربات السوداء.
            </div>
          </div>
        </div>
      </div>

      {/* Shariah Jurisprudential Basis for Offshore FX & Dual Exchange Rates */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">
            التأصيل الفقهي والشرعي للاعتماد على سعر الصرف الخارجي الحقيقي
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              1. حكم المصارفة بسعر السوق الحقيقي (يوم السداد)
            </h4>
            <p>
              استقر رأي جماهير الفقهاء والمجامع الفقهية (مجمع الفقه الإسلامي الدولي، وهيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية AAOIFI معيار 1 ومعيار 3) على أن العبرة في قضاء الديون المصروفة بعملة أخرى أو عند اشتراط السداد بالقيمة هي <strong>«بسعر يومها في السوق الفعلي»</strong> المعتبر الذي يستطيع به الدائن استبدال ماله، وليس بسعر اسمي وهمي لا وجود له في الواقع ولا يمكن شراء العملة به.
            </p>
          </div>

          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. منع الغبن الفاحش وأكل أموال الناس بالباطل
            </h4>
            <p>
              إلزام الدائن أو المغترب بقبول السعر الرسمي المخفض عند وجود فارق كبير (تغير فاحش) يتنافى مع مقاصد الشريعة في حفظ المال والعدالة؛ قال تعالى: <em>﴿وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ﴾</em>، ولذلك فإن اعتماد مؤشر IVU المربوط بأسعار الصرف الحقيقية يرفع الحرج ويحقق التراضي الشرعي المعتبر.
            </p>
          </div>
        </div>
      </div>

      {/* Developer API & Oracle Integration */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              واجهة برمجة التطبيقات وسلاسل الأوراكل لأسعار الصرف الخارجية (Offshore FX API)
            </h3>
          </div>
          <button
            onClick={handleCopyApi}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-all self-start sm:self-auto"
          >
            {copiedApi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedApi ? 'تم النسخ' : 'نسخ كود الربط'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          يمكن للمؤسسات المالية، البنوك، والمطورين استدعاء الأسعار الخارجية الموثقة عبر بروتوكول IVU Oracles لضمان عدم التلاعب وتنفيذ العقود الذكية آلياً.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-amber-300/90 overflow-x-auto">
          <code>
            {`// GET /v1/fx/rates?base=USD&quote=${activeCurrency.code}&include_offshore=true`}
            <br />
            {`{`}
            <br />
            {`  "currency": "${activeCurrency.code}",`}
            <br />
            {`  "official_bank_rate": ${activeCurrency.officialRateToUsd},`}
            <br />
            {`  "offshore_real_market_rate": ${activeCurrency.offshoreRateToUsd},`}
            <br />
            {`  "ivu_fair_parity_rate": ${activeCurrency.ivuFairRateToUsd},`}
            <br />
            {`  "spread_discount_pct": ${activeCurrency.spreadPercentage.toFixed(2)},`}
            <br />
            {`  "shariah_compliance": "AAOIFI Standard #1 & #3 Verified"`}
            <br />
            {`}`}
          </code>
        </div>
      </div>
    </div>
  );
};
