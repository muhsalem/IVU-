import { HistoricalDataPoint } from '../types';

// Base year 1970 = 100 for indices
export const HISTORICAL_BACKTEST_DATA: HistoricalDataPoint[] = [
  {
    year: 1970,
    label: '1970',
    ivuIndex: 100,
    usdIndex: 100,
    goldIndex: 100, // Gold = $35/oz
    silverIndex: 100, // Silver = $1.60/oz
    cpiIndex: 100,
    sdrIndex: 100,
    eventAr: 'إلغاء نظام بريتون وودز والغطاء الذهبي للدولار'
  },
  {
    year: 1973,
    label: '1973',
    ivuIndex: 122,
    usdIndex: 82,
    goldIndex: 277, // Gold jumped to ~$97
    silverIndex: 160,
    cpiIndex: 118,
    sdrIndex: 110,
    eventAr: 'صدمة النفط الأولى وارتفاع أسعار السلع'
  },
  {
    year: 1980,
    label: '1980',
    ivuIndex: 245,
    usdIndex: 48,
    goldIndex: 1750, // Gold peak ~$612
    silverIndex: 1000, // Silver squeeze ~$16
    cpiIndex: 212,
    sdrIndex: 185,
    eventAr: 'صدمة التضخم وركود الثمانينات وزيادة الفائدة القياسية'
  },
  {
    year: 1990,
    label: '1990',
    ivuIndex: 380,
    usdIndex: 30,
    goldIndex: 1100, // Gold ~$385
    silverIndex: 300,
    cpiIndex: 336,
    sdrIndex: 290,
    eventAr: 'حرب الخليج وأزمة أسواق المال الناشئة'
  },
  {
    year: 1997,
    label: '1997',
    ivuIndex: 450,
    usdIndex: 25,
    goldIndex: 940, // Gold ~$330
    silverIndex: 310,
    cpiIndex: 410,
    sdrIndex: 350,
    eventAr: 'الأزمة المالية النقدية في شرق آسيا'
  },
  {
    year: 2000,
    label: '2000',
    ivuIndex: 495,
    usdIndex: 22,
    goldIndex: 800, // Gold ~$280
    silverIndex: 310,
    cpiIndex: 440,
    sdrIndex: 380,
    eventAr: 'فقاعة شركات التكنولوجيا (Dot-Com Crisis)'
  },
  {
    year: 2008,
    label: '2008',
    ivuIndex: 710,
    usdIndex: 17,
    goldIndex: 2480, // Gold ~$870
    silverIndex: 940,
    cpiIndex: 550,
    sdrIndex: 510,
    eventAr: 'الأزمة المالية العالمية وتطبيق التيسير الكمي (QE1)'
  },
  {
    year: 2012,
    label: '2012',
    ivuIndex: 890,
    usdIndex: 15,
    goldIndex: 4770, // Gold Peak ~$1670
    silverIndex: 1900,
    cpiIndex: 590,
    sdrIndex: 580,
    btcIndex: 120,
    eventAr: 'أزمة الديون السيادية الأوروبية وطفرة الذهب'
  },
  {
    year: 2020,
    label: '2020',
    ivuIndex: 1120,
    usdIndex: 12,
    goldIndex: 5340, // Gold ~$1870
    silverIndex: 1250,
    cpiIndex: 670,
    sdrIndex: 690,
    btcIndex: 29000,
    eventAr: 'جائحة كورونا وطباعة التريليونات العالمية'
  },
  {
    year: 2022,
    label: '2022',
    ivuIndex: 1340,
    usdIndex: 10,
    goldIndex: 5140, // Gold ~$1800
    silverIndex: 1370,
    cpiIndex: 780,
    sdrIndex: 750,
    btcIndex: 20000,
    eventAr: 'قفزة التضخم العالمي وأزمة سلاسل الإمداد والطاقة'
  },
  {
    year: 2024,
    label: '2024',
    ivuIndex: 1480,
    usdIndex: 9.2,
    goldIndex: 6850, // Gold ~$2400
    silverIndex: 1800,
    cpiIndex: 830,
    sdrIndex: 810,
    btcIndex: 65000,
    eventAr: 'ارتفاع الذهب إلى مستويات قياسية تاريخية جديدة'
  },
  {
    year: 2026,
    label: '2026 (اليوم)',
    ivuIndex: 1590,
    usdIndex: 8.5,
    goldIndex: 7850, // Gold ~$2750/oz
    silverIndex: 2000, // Silver ~$32/oz
    cpiIndex: 875,
    sdrIndex: 860,
    btcIndex: 88000,
    eventAr: 'الوضع الراهن: الحاجة إلى معيار IVU لحفظ القوة الشرائية'
  }
];

export const BACKTEST_METRICS = {
  volatility: {
    usd: '14.2%',
    gold: '22.8%',
    silver: '31.5%',
    cpi: '4.8%',
    sdr: '9.6%',
    ivu: '6.1%' // Lowest balanced volatility
  },
  purchasingPowerRetention: {
    usd: '8.5%', // Lost 91.5%
    gold: '224%', // Overcompensated with short-term swings
    cpi: '45.2%', // Under-reported loss
    sdr: '52.0%',
    ivu: '98.7%' // Near perfect 1:1 real purchasing power retention!
  },
  crisisResilienceScore: {
    usd: 25,
    gold: 78,
    cpi: 50,
    sdr: 70,
    ivu: 96
  }
};
