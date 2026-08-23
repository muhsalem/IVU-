export type ContractType = 
  | 'qard_hasan' // قرض حسن
  | 'debt' // دين مؤجل
  | 'salary' // راتب/عقد عمل
  | 'rent' // إيجار طويل الأجل
  | 'construction' // عقود مقاولات/استصناع
  | 'waqf' // حفظ أصول الأوقاف
  | 'zakat' // تقييم الزكاة والأنصبة
  | 'compensation' // تعويضات وإرث
  | 'international_trade'; // عقود دولية

export interface CurrencyOption {
  code: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
  rateToUsd: number; // base reference
}

export interface BasketComponent {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'metals' | 'currencies' | 'commodities' | 'purchasing_power';
  weight: number; // percentage, e.g. 35
  descriptionAr: string;
  rationaleAr: string;
  subComponents: {
    nameAr: string;
    subWeight: number;
    unit: string;
  }[];
}

export interface ValueModelComparison {
  id: string;
  nameAr: string;
  nameEn: string;
  type: string;
  shariahRating: 'High' | 'Medium' | 'Low' | 'Non-Compliant';
  stabilityScore: number; // 0-100
  inflationHedging: number; // 0-100
  liquidity: number; // 0-100
  prosAr: string[];
  consAr: string[];
  verdictAr: string;
}

export interface HistoricalDataPoint {
  year: number;
  label: string;
  ivuIndex: number;
  usdIndex: number;
  goldIndex: number;
  silverIndex: number;
  cpiIndex: number;
  sdrIndex: number;
  btcIndex?: number;
  eventAr?: string;
}

export interface CalculationResult {
  startDate: string;
  endDate: string;
  nominalAmount: number;
  currency: string;
  contractType: ContractType;
  
  // Adjusted values
  ivuValue: number;
  goldValue: number;
  cpiValue: number;
  currencyBasketValue: number;
  sdrValue: number;

  // Percentage shifts
  ivuChangePercent: number;
  inflationLossPercent: number;
  goldChangePercent: number;
  
  // Differentials
  ivuDifferenceAmount: number;
  cpiDifferenceAmount: number;
  goldDifferenceAmount: number;
  
  // Shariah recommendation
  shariahGuidanceAr: string;
  aaoifiReferenceAr: string;
  fairAdjustedAmount: number;
}

export interface ShariahRuling {
  topicAr: string;
  schoolViews: {
    hanafi: string;
    maliki: string;
    shafii: string;
    hanbali: string;
    contemporary: string;
  };
  aaoifiStandard: string;
  fiqhCouncilResolution: string;
  ivuAlignment: string;
}

export interface RiskFactor {
  categoryAr: string;
  titleAr: string;
  descriptionAr: string;
  severity: 'High' | 'Medium' | 'Low';
  mitigationStrategyAr: string;
}

export interface QuarterlyMilestone {
  quarterAr: string;
  titleAr: string;
  detailsAr: string[];
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

export interface RoadmapPhase {
  phaseNumber: number;
  titleAr: string;
  titleEn: string;
  timeframeAr: string;
  status: 'Completed' | 'Active' | 'Upcoming';
  progressPercent: number;
  kpiMetricsAr: { labelAr: string; valueAr: string }[];
  quarters: QuarterlyMilestone[];
  objectivesAr: string[];
  deliverablesAr: string[];
  partnersAr?: string[];
}

export interface ProjectEvaluationScore {
  categoryAr: string;
  categoryEn: string;
  score: number; // out of 100
  weight: number; // percentage
  strengthsAr: string[];
  improvementProposalsAr: string[];
}
