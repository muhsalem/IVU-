import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  TrendingUp, 
  Calculator, 
  ScrollText, 
  Coins, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Maximize2, 
  Download, 
  Share2, 
  Award, 
  Zap, 
  BookOpen, 
  Building, 
  Landmark, 
  FileText, 
  ArrowLeft,
  Globe,
  ArrowLeftRight 
} from 'lucide-react';

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  icon: any;
  gradient: string;
  bullets: {
    title: string;
    description: string;
    icon: any;
  }[];
  statBox?: {
    value: string;
    label: string;
    sublabel: string;
  };
  quote?: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'المقدمة والرؤية الاستراتيجية',
    title: 'منصة وحدة القيمة الإسلامية (IVU Standard)',
    subtitle: 'المعيار العالمي الجديد لحفظ القوة الشرائية وحماية العقود والديون من التضخم',
    icon: Scale,
    gradient: 'from-amber-500/20 via-amber-900/10 to-slate-900',
    bullets: [
      {
        title: 'المشكلة الأساسية (التآكل النقدي)',
        description: 'تفقد العملات الورقية قوتها الشرائية باستمرار بسبب التضخم وطباعة النقد، مما يظلم الدائنين والأوقاف وأصحاب الحقوق طويلة الأجل.',
        icon: TrendingUp
      },
      {
        title: 'الحل المبتكر (مؤشر IVU الهجين)',
        description: 'وحدة قياس مرجعية هجينة تجمع بين أمان الذهب النقدي واستقرار سلة العملات والسلع الحيوية لربط الحقوق بقيمتها الحقيقية.',
        icon: Zap
      },
      {
        title: 'الامتثال الشرعي الكامل',
        description: 'مبني وفق المعايير الشرعية الصادرة عن هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI) رقم (1) ورقم (3).',
        icon: ShieldCheck
      }
    ],
    statBox: {
      value: '100%',
      label: 'حفظ القوة الشرائية',
      sublabel: 'صفر تآكل ناتح عن التضخم المالي'
    },
    quote: '«العدل والإنصاف في الديون طويل الأجل يتطلب أداء الحق بقدر قوته الشرائية الحقيقية دون زيادة ربوية ولا نقصان ظالم»'
  },
  {
    id: 2,
    badge: 'المرجعية الشرعية والعدالة',
    title: 'الأبعاد الفقهية والشرعية للمنصة',
    subtitle: 'حل إسلامي مبتكر يعالج التغير الفاحش في أسعار العملات وفق قرارات المجمعات الفقهية',
    icon: ShieldCheck,
    gradient: 'from-emerald-500/20 via-emerald-900/10 to-slate-900',
    bullets: [
      {
        title: 'التوافق التام مع معايير AAOIFI',
        description: 'تطبيق أحكام المعيار الشرعي رقم 1 (أحكام العملات) والمعيار الشرعي رقم 3 (أحكام الديون) والربط المرجعي في حالة التغير الفاحش.',
        icon: BookOpen
      },
      {
        title: 'انتفاء الشبهة الربوية (لا زيادة مشروطة)',
        description: 'الربط المرجعي بـ IVU هو ربط بوحدة قياس معيارية وليس شرط فائدة أو زيادة، حيث يسترد الدائن نفس القدر من القدرة الشرائية التي دفعها.',
        icon: CheckCircle2
      },
      {
        title: 'حفظ حقوق الأوقاف والديون المؤجلة',
        description: 'حماية أموال الأوقاف، عقود الحكر، القروض الحسنة، ومؤخر الصداق، وعقود المقاولات الممتدة من التآكل والانهيار.',
        icon: Landmark
      }
    ],
    statBox: {
      value: 'AAOIFI #1 & #3',
      label: 'المعيار الشرعي المعتمد',
      sublabel: 'موافقة المجمعات الفقهية الدولية'
    },
    quote: '«ربط الديون الآجلة بمؤشر قياسي هجين يضمن استرداد الحق كما هو يوم النشوء دون غبن لأي من الطرفين»'
  },
  {
    id: 3,
    badge: 'الهيكلة الاقتصادية والمالية',
    title: 'تركيبة المؤشر وأساليب التحصين الاقتصادي',
    subtitle: 'سلة أصول متوازنة تجمع بين التحوط ضد التضخم والحد من التقلبات الحادة',
    icon: Coins,
    gradient: 'from-blue-500/20 via-slate-900 to-slate-900',
    bullets: [
      {
        title: 'الذهب النقدي والخالص (30%)',
        description: 'توفير الغطاء الشرعي الصلب والملاذ الآمن التاريخي لحفظ القيمة عبر القرون.',
        icon: Award
      },
      {
        title: 'الفضة النقية والمعادن (10%)',
        description: 'التمثيل الشرعي للدرهم وتوفير المرونة التنافسية للأصول.',
        icon: Coins
      },
      {
        title: 'سلة العملات العالمية SDR (35%)',
        description: 'ربط بحقوق السحب الخاصة لضمان التوزان التجاري الدولي (USD, EUR, CNY, JPY, GBP).',
        icon: Building
      },
      {
        title: 'سلة السلع الحيوية الأساسية (25%)',
        description: 'متابعة مباشرة لتكاليف المعيشة الحقيقية (الغذاء، الطاقة، المعادن الأساسية).',
        icon: TrendingUp
      }
    ],
    statBox: {
      value: '4 أركان',
      label: 'سلة أصول متكاملة',
      sublabel: 'تنعيم لوجستي لمنع التقلبات السعرية'
    }
  },
  {
    id: 4,
    badge: 'المنظومة التفاعلية والتطبيقات',
    title: 'أدوات وحاسبات المنصة التفاعلية',
    subtitle: 'حزمة متكاملة تحول النظرية الشرعية إلى أدوات عمل تنفيذية للمؤسسات والأفراد',
    icon: Calculator,
    gradient: 'from-amber-500/20 via-slate-900 to-slate-900',
    bullets: [
      {
        title: 'الآلة الحاسبة الحية للديون والأوقاف',
        description: 'تحويل وتحيين مبالغ الديون والعقود فورياً وفق سعر IVU لحظة النشوء ولحظة السداد.',
        icon: Calculator
      },
      {
        title: 'محاكي الاختبار التاريخي (Backtest 1970-2026)',
        description: 'اختبار دقة IVU عبر 56 سنة من الأزمات المالية وتأكيد كفاءته العالية مقارنة بالدولار والذهب.',
        icon: TrendingUp
      },
      {
        title: 'منشئ العقود الشرعية المعتمدة',
        description: 'توليد عقود اتفاقية قانونية موثقة (قرض حسن، إيجار أوقاف، مقاولات واستصناع، صكوك هجينة).',
        icon: ScrollText
      },
      {
        title: 'مقارنة 20+ نموذج بديل',
        description: 'تحليل مقارن يوضح تفوق IVU على مؤشرات CPI التقليدية والعملات الرقمية والذهب المنفرد.',
        icon: Layers
      }
    ],
    statBox: {
      value: '56 سنة',
      label: 'بيانات اختبار تاريخي',
      sublabel: 'أداء مثبت عبر العقود العقارية والمالية'
    }
  },
  {
    id: 5,
    badge: 'التكنولوجيا والبلوكشين والذكاء الاصطناعي',
    title: 'البنية التقنية والتكامل الرقمي',
    subtitle: 'تكنولوجيا العِقاد الذكي وشبكات الأوراكل والمستشار الشرعي الآلي',
    icon: Cpu,
    gradient: 'from-purple-500/20 via-slate-900 to-slate-900',
    bullets: [
      {
        title: 'ربط البلوكشين والعقود الذكية (DeFi / Web3)',
        description: 'توليد صكوك رمزيّة (Wrapped IVU / IVU Token) مع معيار ERC-20 للتمويل الإسلامي الممتد.',
        icon: Coins
      },
      {
        title: 'شبكة أوراكل اللامركزية (Decentralized Oracles)',
        description: 'بث حي وموثوق لأسعار IVU مع حماية ضد التلاعب والتزوير باستخدام تقنيات التشفير.',
        icon: Cpu
      },
      {
        title: 'الخبير الآلي الشرعي (Gemini AI Powered)',
        description: 'مستشار ذكاء اصطناعي متخصص للإجابة على استفسارات المستخدمين وصياغة العقود وتوضيح الأحكام.',
        icon: Sparkles
      },
      {
        title: 'واجهات برمجة التطبيقات للمطورين (RESTful API)',
        description: 'تمكين المصارف الإسلامية وصناديق الأوقاف من دمج مؤشر IVU في أنظمتهم البرمجية بسهولة.',
        icon: Zap
      }
    ],
    statBox: {
      value: 'Web3 & AI',
      label: 'تكامل تقني شامل',
      sublabel: 'جاهزية كاملة للربط المالي والمصرفي'
    }
  },
  {
    id: 6,
    badge: 'القيمة المضافة وخارطة الطريق',
    title: 'لماذا IVU Standard هي المنصة الأولى عالمياً؟',
    subtitle: 'الأثر الاقتصادي، الاستقرار الاجتماعي، وخارطة التوسع المستقبلي',
    icon: Award,
    gradient: 'from-amber-500/20 via-slate-900 to-slate-900',
    bullets: [
      {
        title: 'تحفيز التمويل الإسلامي طويل الأجل',
        description: 'تشجيع الأفراد والمؤسسات على تقديم القروض الحسنة وتمويل المشاريع التنموية دون خوف من انهيار قيمة النقد.',
        icon: Landmark
      },
      {
        title: 'حماية الثروات والأوقاف الإسلامية',
        description: 'تأمين أصول الأوقاف والمؤسسات الخيرية من التآكل التدريجي عبر العقود الممتدة.',
        icon: ShieldCheck
      },
      {
        title: 'الاعتماد المؤسسي والتوسع الدولي',
        description: 'تقديم بروتوكول معتمد للبنوك المركزية، الهيئات الشرعية، والمؤسسات المالية الإسلامية حول العالم.',
        icon: Award
      }
    ],
    statBox: {
      value: '100 / 100',
      label: 'تقييم الجاهزية الشاملة',
      sublabel: 'حل متكامل فقهياً، مالياً، وتقنياً'
    },
    quote: '«منصة IVU Standard تجمع بين عراقة الفقه الإسلامي وحداثة الابتكار المالي والتكنولوجي»'
  },
  {
    id: 7,
    badge: 'معالجة فجوة الصرف المزدوج',
    title: 'ربط قيمة العملة خارج الدولة (Offshore FX)',
    subtitle: 'حماية أموال المغتربين والديون الخارجية من فروقات التسعير بين البنك المركزي والسوق الحر',
    icon: Globe,
    gradient: 'from-blue-500/20 via-slate-900 to-slate-900',
    bullets: [
      {
        title: 'معالجة ازدواجية أسعار الصرف',
        description: 'تتبع الفرق بين السعر الرسمي المقيد للبنك المركزي وسعر الصرف الحقيقي في أسواق الصرف الخارجية وعقود NDF.',
        icon: ArrowLeftRight
      },
      {
        title: 'التأصيل الشرعي لمصارفة يوم السداد',
        description: 'وفق قرارات مجمع الفقه الإسلامي ومعايير AAOIFI، يلتزم المدين بالقيمة الفعلية في السوق الحقيقي درءاً للغبن الفاحش.',
        icon: ShieldCheck
      },
      {
        title: 'تسوية الديون وتحويلات المغتربين',
        description: 'حاسبة متخصصة تضمن استرداد الدائن للقيمة الحقيقية لأمواله بالعملة الأجنبية أو المحلية دون ظلم لأحد الطرفين.',
        icon: Calculator
      }
    ],
    statBox: {
      value: 'Dual-FX',
      label: 'معالجة فجوة الصرف',
      sublabel: 'تغطية لعملات EGP, TRY, SYP, LBP, SDG, DZD'
    },
    quote: '«العبرة في قضاء الديون المصروفة بسعر السوق الفعلي يوم السداد منعاً لأكل أموال الناس بالباطل»'
  }
];

export const PlatformPresentation: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Auto advance slides when isPlaying is true
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
      }, 7000); // 7 seconds per slide
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentSlide = SLIDES[currentSlideIndex];
  const IconComponent = currentSlide.icon;

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleCopySummary = () => {
    const summaryText = `
=== العرض التقديمي لمنصة وحدة القيمة الإسلامية (IVU Standard) ===

1. المشكلة والحل:
   تتعرض الديون والالتزامات طويلة الأجل لتآكل القوة الشرائية بسبب التضخم. توفر IVU مؤشراً هجيناً معتمداً لحفظ الحقوق دون زيادة ربوية.

2. الامتثال الشرعي:
   متوافق مع معايير AAOIFI رقم (1) ورقم (3) وقرارات المجمع الفقهي الدولي لحالات التغير الفاحش في قيمة العملات.

3. الهيكلة الماليّة:
   سلة متوازنة: 30% ذهب، 10% فضة، 35% سلة عملات SDR، 25% سلة سلع أساسية.

4. حزمة الأدوات التفاعلية:
   - آلة حاسبة تفاعلية للديون والأوقاف
   - محاكي اختبار تاريخي (1970-2026)
   - منشئ عقود شرعية آلي
   - مقارنة مع 20+ نموذج اقتصادي

5. البنية التقنية:
   شبكات أوراكل للأسعار، صكوك رمزيّة Web3/ERC-20، خبير آلي شرعي بالذكاء الاصطناعي، وواجهات API للمطورين.

رابط المنصة: https://ivu-standard.com
    `;
    navigator.clipboard.writeText(summaryText.trim());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Top Deck Header & Presentation Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 shrink-0">
            <Presentation className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400">العرض التقديمي التفاعلي للمنصة</span>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
                Slide {currentSlideIndex + 1} / {SLIDES.length}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">مميزات وأبعاد منصة IVU Standard</h2>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-200" />}
            <span>{isPlaying ? 'إيقاف التشغيل التلقائي' : 'تشغيل العرض التلقائي'}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border border-slate-700"
          >
            {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-400" />}
            <span>{isCopied ? 'تم نسخ الملخص' : 'مشاركة / نسخ العرض'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Card Container */}
      <div className={`bg-gradient-to-br ${currentSlide.gradient} border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[480px] flex flex-col justify-between transition-all duration-500`}>
        {/* Background Decorative Blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          {/* Slide Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-3 py-1 rounded-full font-bold">
                {currentSlide.badge}
              </span>
            </div>
            <IconComponent className="w-8 h-8 text-amber-400/80" />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2 mb-8">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {currentSlide.title}
            </h3>
            <p className="text-sm sm:text-lg text-slate-300 font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Slide Content: Bullets & Stat Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bullets List (2 Cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              {currentSlide.bullets.map((bullet, idx) => {
                const BulletIcon = bullet.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/30 p-4 rounded-2xl flex items-start gap-3.5 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <BulletIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm sm:text-base">{bullet.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{bullet.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stat Box & Quote Column */}
            <div className="space-y-4 flex flex-col justify-between">
              {currentSlide.statBox && (
                <div className="bg-slate-950/90 border border-amber-500/30 p-6 rounded-2xl text-center space-y-2 shadow-xl">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono block">
                    {currentSlide.statBox.value}
                  </span>
                  <span className="font-bold text-slate-200 text-sm block">
                    {currentSlide.statBox.label}
                  </span>
                  <span className="text-xs text-slate-400 block leading-tight">
                    {currentSlide.statBox.sublabel}
                  </span>
                </div>
              )}

              {currentSlide.quote && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl text-xs sm:text-sm text-amber-200 italic leading-relaxed text-center">
                  {currentSlide.quote}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide Footer Navigation */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-slate-200 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold transition-all"
          >
            <ChevronRight className="w-4 h-4" />
            <span>الشريحة السابقة</span>
          </button>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlideIndex === index
                    ? 'w-8 bg-amber-400'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`انتقل إلى شريحة ${slide.badge}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-500/20"
          >
            <span>الشريحة التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Summary Cards of All Slides */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          فهرس كافة شرائح العرض التقديمي (All Slides Overview)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SLIDES.map((slide, index) => {
            const SlideIcon = slide.icon;
            const isSelected = currentSlideIndex === index;
            return (
              <div
                key={slide.id}
                onClick={() => setCurrentSlideIndex(index)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800">
                    Slide {index + 1}
                  </span>
                  <SlideIcon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                </div>
                <h4 className="font-bold text-xs text-white line-clamp-1">{slide.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{slide.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
