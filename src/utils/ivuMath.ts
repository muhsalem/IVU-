import { BasketComponent, CalculationResult, ContractType, CurrencyOption } from '../types';
import { HISTORICAL_BACKTEST_DATA } from '../data/historicalData';

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { code: 'USD', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$', rateToUsd: 1.0 },
  { code: 'SAR', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', rateToUsd: 3.75 },
  { code: 'AED', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ', rateToUsd: 3.67 },
  { code: 'KWD', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar', symbol: 'د.ك', rateToUsd: 0.31 },
  { code: 'QAR', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal', symbol: 'ر.ق', rateToUsd: 3.64 },
  { code: 'BHD', nameAr: 'دينار بحريني', nameEn: 'Bahraini Dinar', symbol: 'د.ب', rateToUsd: 0.376 },
  { code: 'OMR', nameAr: 'ريال عماني', nameEn: 'Omani Rial', symbol: 'ر.ع', rateToUsd: 0.385 },
  { code: 'EUR', nameAr: 'يورو أوروبي', nameEn: 'Euro', symbol: '€', rateToUsd: 0.92 },
  { code: 'EGP', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound', symbol: 'ج.م', rateToUsd: 48.5 },
  { code: 'JOD', nameAr: 'دينار أردني', nameEn: 'Jordanian Dinar', symbol: 'د.أ', rateToUsd: 0.709 },
  { code: 'TRY', nameAr: 'ليرة تركية', nameEn: 'Turkish Lira', symbol: '₺', rateToUsd: 33.2 },
  { code: 'GBP', nameAr: 'جنيه إسترليني', nameEn: 'British Pound', symbol: '£', rateToUsd: 0.78 }
];

export const DEFAULT_BASKET_COMPONENTS: BasketComponent[] = [
  {
    id: 'metals',
    nameAr: 'المعادن النفيضة والشرعية',
    nameEn: 'Monetary & Precious Metals',
    category: 'metals',
    weight: 35,
    descriptionAr: 'الذهب والفضة كمخزن تاريخي ذكي ومطابق للأصل النفيضي الفقهي.',
    rationaleAr: 'توفير غطاء حقيقي مادي يمنع الانهيار الاقتصادي ورابط مع نصاب الزكاة والديون.',
    subComponents: [
      { nameAr: 'الذهب المادي (Physical Gold)', subWeight: 28, unit: 'أونصة troy' },
      { nameAr: 'الفضة المادية (Physical Silver)', subWeight: 7, unit: 'أونصة troy' }
    ]
  },
  {
    id: 'currencies',
    nameAr: 'سلة العملات العالمية المتوازنة',
    nameEn: 'Balanced Fiat Currency Basket',
    category: 'currencies',
    weight: 30,
    descriptionAr: 'تنويع يضم أهم العملات الدولية والتجارية الأكثر استخداماً.',
    rationaleAr: 'توفير سيولة فورية وسهولة تسوية في المنظومة المصرفية الدولية والخليجية.',
    subComponents: [
      { nameAr: 'الدولار الأمريكي (USD)', subWeight: 12, unit: '$' },
      { nameAr: 'اليورو الأوروبي (EUR)', subWeight: 8, unit: '€' },
      { nameAr: 'الريال السعودي والدينار (SAR/GCC)', subWeight: 5, unit: 'ر.س' },
      { nameAr: 'الين واليوان الصيني (CNY/JPY)', subWeight: 5, unit: '¥' }
    ]
  },
  {
    id: 'commodities',
    nameAr: 'سلة السلع الأساسية والطاقة',
    nameEn: 'Essential Commodities & Energy',
    category: 'commodities',
    weight: 20,
    descriptionAr: 'المواد الاستراتيجية المغذية للحياة والإنتاج العالمي.',
    rationaleAr: 'حماية القوة الشرائية من ارتفاع أسعار الغذاء والطاقة والتصنيع.',
    subComponents: [
      { nameAr: 'الحبوب والأغذية الأساسية (Wheat & Staples)', subWeight: 10, unit: 'طن' },
      { nameAr: 'الطاقة والنفط الخام (Crude & Gas)', subWeight: 6, unit: 'برميل' },
      { nameAr: 'المعادن الصناعية (Copper & Steel)', subWeight: 4, unit: 'طن' }
    ]
  },
  {
    id: 'purchasing_power',
    nameAr: 'مؤشر أسعار المستهلك والقوة الشرائية',
    nameEn: 'CPI & Purchasing Power Parity',
    category: 'purchasing_power',
    weight: 15,
    descriptionAr: 'قياس التغير الفعلي في تكاليف المعيشة والخدمات الأساسية.',
    rationaleAr: 'ربط المؤشر مباشرة بالقدرة الشرائية الواقعية للمستهلكين والعمال.',
    subComponents: [
      { nameAr: 'مؤشر أسعار المستهلك الموزون (Weighted CPI)', subWeight: 10, unit: 'نقطة' },
      { nameAr: 'مؤشر تعادل القوة الشرائية الإقليمي (PPP Factor)', subWeight: 5, unit: 'معامل' }
    ]
  }
];

export function calculateIvuContractValue(params: {
  startDateYear: number;
  endDateYear: number;
  nominalAmount: number;
  currencyCode: string;
  contractType: ContractType;
  customWeights?: { metals: number; currencies: number; commodities: number; purchasing_power: number };
}): CalculationResult {
  const { startDateYear, endDateYear, nominalAmount, currencyCode, contractType, customWeights } = params;

  // Find historical records
  const startPoint = HISTORICAL_BACKTEST_DATA.find(p => p.year === startDateYear) || HISTORICAL_BACKTEST_DATA[0];
  const endPoint = HISTORICAL_BACKTEST_DATA.find(p => p.year === endDateYear) || HISTORICAL_BACKTEST_DATA[HISTORICAL_BACKTEST_DATA.length - 1];

  // Base indices calculation
  const ivuStart = startPoint.ivuIndex;
  const ivuEnd = endPoint.ivuIndex;
  
  // Apply custom weights if provided
  let effectiveIvuRatio = ivuEnd / ivuStart;
  if (customWeights) {
    const totalW = customWeights.metals + customWeights.currencies + customWeights.commodities + customWeights.purchasing_power;
    const wM = (customWeights.metals / totalW);
    const wC = (customWeights.currencies / totalW);
    const wCom = (customWeights.commodities / totalW);
    const wP = (customWeights.purchasing_power / totalW);

    const metalsRatio = (endPoint.goldIndex * 0.8 + endPoint.silverIndex * 0.2) / (startPoint.goldIndex * 0.8 + startPoint.silverIndex * 0.2);
    const currenciesRatio = (endPoint.sdrIndex) / (startPoint.sdrIndex);
    const commoditiesRatio = (endPoint.cpiIndex * 1.1) / (startPoint.cpiIndex * 1.1);
    const cpiRatio = endPoint.cpiIndex / startPoint.cpiIndex;

    effectiveIvuRatio = (metalsRatio * wM) + (currenciesRatio * wC) + (commoditiesRatio * wCom) + (cpiRatio * wP);
  }

  const goldRatio = endPoint.goldIndex / startPoint.goldIndex;
  const cpiRatio = endPoint.cpiIndex / startPoint.cpiIndex;
  const currencyBasketRatio = endPoint.sdrIndex / startPoint.sdrIndex;
  const sdrRatio = endPoint.sdrIndex / startPoint.sdrIndex;

  // Values in nominal units
  const ivuValue = nominalAmount * effectiveIvuRatio;
  const goldValue = nominalAmount * goldRatio;
  const cpiValue = nominalAmount * cpiRatio;
  const currencyBasketValue = nominalAmount * currencyBasketRatio;
  const sdrValue = nominalAmount * sdrRatio;

  // Percentage shifts
  const ivuChangePercent = ((effectiveIvuRatio - 1) * 100);
  const inflationLossPercent = Math.max(0, (1 - (startPoint.usdIndex / endPoint.usdIndex)) * 100);
  const goldChangePercent = ((goldRatio - 1) * 100);

  // Differences
  const ivuDifferenceAmount = ivuValue - nominalAmount;
  const cpiDifferenceAmount = cpiValue - nominalAmount;
  const goldDifferenceAmount = goldValue - nominalAmount;

  // Shariah guidance & fair adjustment per contract type
  let shariahGuidanceAr = '';
  let aaoifiReferenceAr = '';
  let fairAdjustedAmount = ivuValue;

  if (contractType === 'qard_hasan') {
    if (ivuChangePercent > 33) {
      shariahGuidanceAr = 'نظرًا لأن انخفاض القوة الشرائية للعملة تجاوز حد الغبن الفاحش (أكثر من 33%)، يوصى بشرعية بالصلح والتعديل بوحدة IVU لحفظ القوة الشرائية للدائن دون إضرار بالمدين وفق فتوى مصطفى الزرقا ومجمع الفقه قرار 115.';
    } else {
      shariahGuidanceAr = 'التغير يسير (أقل من 33%)، فالأصل الفقهي الاستمرار على السداد الاسمي استصحاباً للمثل، مع جواز التراضي على الربط بـ IVU كتقييم عادل.';
    }
    aaoifiReferenceAr = 'معيار AAOIFI رقم (3) الفقرة 4: إعادة القيمة عند الانهيار الفاحش للعملة.';
  } else if (contractType === 'rent' || contractType === 'salary') {
    shariahGuidanceAr = 'في عقود المنافع والأجور الممتدة، يجوز تماماً اشتراط تعديل الأجرة دورياً بناء على مؤشر IVU لرفع الجهالة وحفظ القيمة العادلة للطرفين.';
    aaoifiReferenceAr = 'معيار AAOIFI رقم (9) بشأن الإجارة: جواز الربط بمؤشر معلوم في الفترات المستقبلية.';
  } else if (contractType === 'construction') {
    shariahGuidanceAr = 'في عقود المقاولات والاستصناع طويلة الأجل، يعتبر تعديل القيمة وفق IVU واجباً نفعياً لتفادي توقف المشروع أو إفلاس المقاول بسبب تضخم أثمان المواد.';
    aaoifiReferenceAr = 'معيار AAOIFI رقم (11) بشأن الاستصناع: شرط التعديل بحسب تغير التكاليف الحقيقية.';
  } else if (contractType === 'waqf') {
    shariahGuidanceAr = 'يجب على ناظر الوقف تقييم أجور وأصول الوقف بوحدة IVU لمنع النقص الفاحش في ريع الوقف ومستحقيه عبر الأجيال.';
    aaoifiReferenceAr = 'معيار AAOIFI بشأن الوقف: وجوب حماية أصل الوقف ومستغلاته من التآكل.';
  } else {
    shariahGuidanceAr = 'تعديل هذا العقد بوحدة IVU يحقق القسط الكامل ويعيد ميزان القوة الشرائية الحقيقية بدقة متناهية.';
    aaoifiReferenceAr = 'معايير AAOIFI رقم (1) ورقم (19) للمقاصة والصلح.';
  }

  return {
    startDate: `${startDateYear}-01-01`,
    endDate: `${endDateYear}-12-31`,
    nominalAmount,
    currency: currencyCode,
    contractType,
    ivuValue,
    goldValue,
    cpiValue,
    currencyBasketValue,
    sdrValue,
    ivuChangePercent,
    inflationLossPercent,
    goldChangePercent,
    ivuDifferenceAmount,
    cpiDifferenceAmount,
    goldDifferenceAmount,
    shariahGuidanceAr,
    aaoifiReferenceAr,
    fairAdjustedAmount
  };
}

export function formatCurrencyNumber(val: number, currencySymbol: string = '$'): string {
  return `${new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 2 }).format(val)} ${currencySymbol}`;
}
