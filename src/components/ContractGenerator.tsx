import React, { useState } from 'react';
import { ScrollText, Copy, Check, Printer, ShieldCheck, FileCheck, Building, Landmark, FileText } from 'lucide-react';

type ContractType = 'qard' | 'waqf' | 'construction' | 'sukuk';

interface ContractTemplate {
  id: ContractType;
  nameAr: string;
  defaultTitle: string;
  defaultFirstParty: string;
  defaultSecondParty: string;
  defaultAmount: string;
  defaultDuration: string;
  icon: any;
  generateText: (p: { title: string; firstParty: string; secondParty: string; amount: string; currency: string; duration: string }) => string;
}

export const ContractGenerator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ContractType>('qard');
  const [contractTitle, setContractTitle] = useState('عقد قرض حسن مع ربط مرجعي بوحدة IVU');
  const [firstParty, setFirstParty] = useState('شركة الاستثمار الوقفي العالمية (الدائن)');
  const [secondParty, setSecondParty] = useState('شركة الإعمار والتنمية (المدين)');
  const [amount, setAmount] = useState('500,000');
  const [currency, setCurrency] = useState('SAR (ريال سعودي)');
  const [durationYears, setDurationYears] = useState('5 سنوات');
  const [copied, setCopied] = useState(false);

  const templates: Record<ContractType, ContractTemplate> = {
    qard: {
      id: 'qard',
      nameAr: 'قرض حسن / دين ممتد',
      defaultTitle: 'عقد قرض حسن مع شرط ربط مرجعي بوحدة IVU',
      defaultFirstParty: 'المؤسسة الوقفية لحفظ المال (الدائن)',
      defaultSecondParty: 'شركة الأفق للمقاولات والتطوير (المدين)',
      defaultAmount: '500,000',
      defaultDuration: '5 سنوات',
      icon: FileCheck,
      generateText: ({ title, firstParty, secondParty, amount, currency, duration }) => `
بسم الله الرحمن الرحيم

الموضوع: ${title}

إنه في يوم الموافق [تاريخ اليوم]، اتفق الطرفان:
الطرف الأول: ${firstParty}
الطرف الثاني: ${secondParty}

تم الاتفاق بين الطرفين بكامل أهليتهما المعتبرة شرعاً وقانوناً على ما يلي:

البند الأول (مبلغ العقد):
قدم الطرف الأول للطرف الثاني قرضاً حسناً قدره (${amount}) ${currency}، وذلك لغرض التنمية والاستثمار الشرعي، لمدة قدرها (${duration}).

البند الثاني (شرط حفظ القوة الشرائية المرجعية - IVU Clause):
استناداً إلى معايير هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI) المعيار الشرعي رقم (1) ورقم (3) بشأن أحكام الديون والعملات، وقرار مجمع الفقه الإسلامي الدولي رقم 115، اتفق الطرفان بملء إرادتهما على ربط القيمة المرجعية المستحقة عند السداد بـ "وحدة القيمة الإسلامية (IVU)".

البند الثالث (آلية التقييم والسداد):
1. يتم توثيق القيمة المرجعية للمبلغ بتاريخ إنشاء العقد كالتالي:
   القيمة بوحدة IVU = المبلغ الاسمي ÷ سعر وحدة IVU يوم إنشاء العقد.
2. عند حلول أجل السداد، يلتزم الطرف الثاني بسداد القيمة الفعلية المعادلة لعدد وحدات IVU المسجلة بالعملة المعمول بها يوم السداد، وذلك حمايةً للقوة الشرائية للدائن ومنعاً للغبن والضرر.
3. في حال وجود تغير يسير في قيمة IVU (أقل من 10%) يتسامح الطرفان في استرداد القيمة الاسمية. أما في حال التغير الفاحش، فيتم الاعتماد الكلي على قيمة IVU الحسابية الصادرة عن منصة IVU Standard الرسمية.

البند الرابع (النزاعات والتسوية):
أي خلاف ينشأ عن تفسير أو تطبيق هذا العقد يتم تسويته ودياً وفق المبادئ الشرعية الإسلامية وحوكمة هيئة IVU الشرعية.

توقيع الطرف الأول: ................................
توقيع الطرف الثاني: ................................
شاهد أول: ................................
شاهد ثانٍ: ................................
`
    },
    waqf: {
      id: 'waqf',
      nameAr: 'عقد إيجار أوقاف طويل الأجل',
      defaultTitle: 'عقد حكر وإيجار أرض وقفية ممتد بوحدة IVU',
      defaultFirstParty: 'مجلس نظارة أوقاف الجامعة (المؤجر/الناظر)',
      defaultSecondParty: 'مجموعة الفنادق والمراكز التجارية (المستأجر)',
      defaultAmount: '1,200,000',
      defaultDuration: '20 سنة',
      icon: Landmark,
      generateText: ({ title, firstParty, secondParty, amount, currency, duration }) => `
بسم الله الرحمن الرحيم

الموضوع: ${title}

أُبرم هذا العقد بين كل من:
الطرف الأول (ناظر الوقف): ${firstParty}
الطرف الثاني (المستأجر): ${secondParty}

موضوع العقد: تأجير واستثمار العين الوقفية الموضحة بياناتها لأجل قدره (${duration}).

البند الأول (الأجرة السنوية الأساسية):
اتفق الطرفان على أن تكون الأجرة السنوية الأساسية بمبلغ قدره (${amount}) ${currency} للسنة الأولى.

البند الثاني (شرط حماية عين الوقف ورزق المستحقين):
نظراً لطول مدة العقد (${duration}) ولضمان عدم تآكل القيمة الحقيقية لريع الوقف بسبب التضخم وانخفاض القوة الشرائية، اتفق الطرفان على تعديل الأجرة السنوية دورياً وفق مؤشر "وحدة القيمة الإسلامية (IVU)".

البند الثالث (آلية Re-indexing السنوية):
تُحسب الأجرة للسنين اللاحقة بضرب عدد وحدات IVU المعكوسة في بداية العقد بسعر وحدة IVU المعلن رسمياً عند بداية كل سنة إيجارية جديدة.

توقيع ناظر الوقف: ................................
توقيع المستأجر: ................................
`
    },
    construction: {
      id: 'construction',
      nameAr: 'عقد مقاولات واستصناع',
      defaultTitle: 'عقد استصناع وتطوير عقاري مع تعديل التكلفة بوحدة IVU',
      defaultFirstParty: 'شركة التطوير العقاري المتقدمة (المالك)',
      defaultSecondParty: 'مؤسسة البناء والإنشاءات الحديثة (المقاول)',
      defaultAmount: '15,000,000',
      defaultDuration: '3 سنوات',
      icon: Building,
      generateText: ({ title, firstParty, secondParty, amount, currency, duration }) => `
بسم الله الرحمن الرحيم

الموضوع: ${title}

الطرف الأول: ${firstParty}
الطرف الثاني: ${secondParty}

البند الأول (نطاق العمل والقيمة الإجمالية):
يتعهد الطرف الثاني بتنفيذ مشروع التطوير العقاري بقيمة إجمالية تقديرية قدرها (${amount}) ${currency} خلال مدة تنفيدية قدرها (${duration}).

البند الثاني (معالجة تذبذب أسعار مواد البناء والتضخم):
تلافياً لتوقف المشروع بسبب ارتفاع أسعار الحديد والأسمنت والسلع الأساسية، اتفق الطرفان على أن تُدفع الدفعات الإنجازية المحددة في الجدول الزمني مقومة بوحدة IVU وفق سعرها يوم الاستحقاق.

البند الثالث (حفظ توازن العقد):
يضمن هذا الشرط عدم إرهاق المقاول في حال ارتفاع تكاليف المواد، ولا إرهاق المالك في حال انخفاضها، محققاً العدالة المطلوبة شرعاً.

توقيع المالك: ................................
توقيع المقاول: ................................
`
    },
    sukuk: {
      id: 'sukuk',
      nameAr: 'صكوك هجينة محمية',
      defaultTitle: 'إصدار صكوك استثمارية هجينة مربوطة بمؤشر IVU',
      defaultFirstParty: 'البنك الإسلامي للتنمية / صندوق الصكوك (المصدر)',
      defaultSecondParty: 'حملة الصكوك والمستثمرون المؤسسيون (المكتتبون)',
      defaultAmount: '100,000,000',
      defaultDuration: '10 سنوات',
      icon: FileText,
      generateText: ({ title, firstParty, secondParty, amount, currency, duration }) => `
بسم الله الرحمن الرحيم

الموضوع: ${title}

المصدر: ${firstParty}
المستثمرون: ${secondParty}

مواصفات الصكوك:
1. القيمة الاسمية للإصدار: (${amount}) ${currency}.
2. مدة الصكوك: (${duration}).
3. التقييم المرجعي: تُسجل الصكوك بقيمتها المعادلة بوحدة IVU يوم الاكتتاب.
4. التوزيعات والرد: يتم توزيع الأرباح الدورية وسداد القيمة الاسمية عند الانقضاء مع تعديل IVU لحفظ القوة الشرائية الحقيقية للمستثمرين.

توقيع المصدر: ................................
توقيع ممثل حملة الصكوك: ................................
`
    }
  };

  const handleSelectTemplate = (type: ContractType) => {
    setSelectedType(type);
    const tmpl = templates[type];
    setContractTitle(tmpl.defaultTitle);
    setFirstParty(tmpl.defaultFirstParty);
    setSecondParty(tmpl.defaultSecondParty);
    setAmount(tmpl.defaultAmount);
    setDurationYears(tmpl.defaultDuration);
  };

  const currentTemplate = templates[selectedType];
  const contractClauseText = currentTemplate.generateText({
    title: contractTitle,
    firstParty,
    secondParty,
    amount,
    currency,
    duration: durationYears
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(contractClauseText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <ScrollText className="w-4 h-4" />
          <span>منشئ العقود النموذجية المربوطة بـ IVU (Contract Template Engine)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          صياغة النماذج التعاقدية والشروط الشرعية المعتمدة
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          أداة لتوليد العقود الاتفاقية لحفظ الحقوق والديون والأوقاف والمقاولات مع تضمين شروط ربط IVU المتوافقة تماماً مع المعايير الشرعية رقم (1) ورقم (3) لـ AAOIFI.
        </p>
      </div>

      {/* Preset Contract Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.keys(templates) as ContractType[]).map((typeKey) => {
          const tmpl = templates[typeKey];
          const Icon = tmpl.icon;
          const isSelected = selectedType === typeKey;
          return (
            <button
              key={typeKey}
              onClick={() => handleSelectTemplate(typeKey)}
              className={`p-4 rounded-xl border text-right transition-all flex flex-col gap-2 ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
              </div>
              <span className="text-xs font-bold">{tmpl.nameAr}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="font-bold text-sm text-amber-300 border-b border-slate-800 pb-3">
            تخصيص بيانات العقد ({currentTemplate.nameAr})
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">عنوان العقد:</label>
              <input
                type="text"
                value={contractTitle}
                onChange={(e) => setContractTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">الطرف الأول (الدائن / المؤجر / المالك):</label>
              <input
                type="text"
                value={firstParty}
                onChange={(e) => setFirstParty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">الطرف الثاني (المدين / المستأجر / المقاول):</label>
              <input
                type="text"
                value={secondParty}
                onChange={(e) => setSecondParty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">المبلغ الاسمي:</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">العملة:</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-amber-500 focus:outline-none"
                >
                  <option value="SAR (ريال سعودي)">SAR (ريال سعودي)</option>
                  <option value="AED (درهم إماراتي)">AED (درهم إماراتي)</option>
                  <option value="USD (دولار أمريكي)">USD (دولار أمريكي)</option>
                  <option value="EUR (يورو)">EUR (يورو)</option>
                  <option value="USDT (تيزر)">USDT (عملة رقمية)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">المدة الزمانية:</label>
              <input
                type="text"
                value={durationYears}
                onChange={(e) => setDurationYears(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contract Preview Column */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                معاينة صيغة العقد الشرعي واللوائح (مطبوع)
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة العقد</span>
                </button>
              </div>
            </div>

            {/* Contract Paper Box */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-xl border border-slate-800 font-serif text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed shadow-inner">
              {contractClauseText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

