import React, { useState } from 'react';
import { Coins, Cpu, Link as LinkIcon, ShieldCheck, ArrowLeftRight, FileCode, Zap, Layers, RefreshCw, CheckCircle2, AlertTriangle, Scale, Lock } from 'lucide-react';

export const CryptoBlockchainHub: React.FC = () => {
  // Simulator State
  const [loanIvuAmount, setLoanIvuAmount] = useState<number>(100); // 100 IVU
  const [usdtRate, setUsdtRate] = useState<number>(1590.25); // 1 IVU = 1590.25 USDT
  const [inflationRatePct, setInflationRatePct] = useState<number>(15); // 15% inflation
  const [durationMonths, setDurationMonths] = useState<number>(12);

  // Calculated values
  const initialUsdtValue = loanIvuAmount * usdtRate;
  // If inflation happens, 1 IVU USDT value increases by inflation % to preserve purchasing power
  const futureUsdtRate = usdtRate * (1 + inflationRatePct / 100);
  const futureIvuUsdtRepayment = loanIvuAmount * futureUsdtRate;
  const fiatNominalLossUsdt = initialUsdtValue; // If repaid fixed nominal USDT without IVU
  const purchasingPowerSavedUsdt = futureIvuUsdtRepayment - initialUsdtValue;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <Coins className="w-4 h-4" />
          <span>تكامل التقنيات المالية الحديثة والويب 3 (Web3 & Crypto Integration)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          ربط وحدة IVU بالعملات المشفرة، العقود الذكية، وشبكات الأوراكل
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          آلية دمج مؤشر IVU مع الأصول الرقمية والعملات المستقرة (USDT / USDC) والعقود الذكية عبر شبكات البلوكشين لحفظ القوة الشرائية للمعاملات المالية اللامركزية (DeFi) والتمويل الإسلامي الذكي.
        </p>
      </div>

      {/* 4 Core Integration Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg hover:border-amber-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/20">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-amber-300">1. العملات المستقرة المرمزة (IVU Token / Stablecoin)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            يمكن إصدار عملة مستقرة شرعية على شبكات البلوكشين (مثل Ethereum, Polygon, HAQQ) بحيث ترتبط قيمتها بـ 1 IVU. تضمن هذه العملة حماية مدخرات الأفراد والمؤسسات في عالم Web3 من التضخم المالي وتدهور العملات الورقية.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>1 Token (wIVU) = قيمة سلة الأصول الحقيقية (الذهب + العملات + السلع)</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg hover:border-amber-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-blue-300">2. مغذيات البيانات اللامركزية (Decentralized Oracles)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            ربط منصة IVU مع شبكات الأوراكل العالمية مثل Chainlink وPyth Network لسحب أسعار الذهب، الفضة، السلع الأساسية، ومؤشرات التضخم لحظياً، وحساب معادلة IVU الهجينة وتغذيتها للعقود الذكية أوتوماتيكياً.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-blue-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400 shrink-0" />
            <span>تحديث السعر على الشبكة (On-Chain Price Feed) بدقة متناهية وبدون تدخل بشري</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg hover:border-amber-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
            <LinkIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-emerald-300">3. العقود الذكية للتمويل الإسلامي (Islamic DeFi)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            برمجة عقود القروض الحسنة، المرابحة، والصكوك الوقفية على شبكة البلوكشين. يُسجل أصل الدين بوحدة IVU، ويتم احتساب القيمة المستحقة عند السداد بالـ USDT أو Crypto تلقائياً بناءً على القوة الشرائية المحدثة.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-emerald-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>تنفيذ شفاف وغير قابل للتلاعب أو التأخير في التسوية</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-lg hover:border-amber-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold border border-purple-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-purple-300">4. تسوية القروض بالرهن المشفر (Crypto Collateralized)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            يمكن للعميل رهن عملات مشفرة (مثل BTC أو ETH) بنسبة تغطية 150%، واقتراض عملات مستقرة (USDT) مقومة بوحدة IVU. يحفظ هذا النموذج للمقرض قيمة ماله الحقيقية وللمقترض إمكانية استعادة رهنه بالكامل.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-purple-300 flex items-center gap-2">
            <Scale className="w-4 h-4 text-purple-400 shrink-0" />
            <span>تلافي الفائدة الربوية مع حماية الدائن والمدين ضد تآكل القيمة</span>
          </div>
        </div>
      </div>

      {/* Interactive Web3 Crypto-Loan Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-amber-400" />
              محاكي التمويل الذكي بالعملات الرقمية (Crypto-Settled IVU Loan Simulator)
            </h3>
            <p className="text-xs text-slate-400">احسب كيف يحمي عقد IVU المربوط بالـ USDT قيمة الدين عند التسوية بالعملات المشفرة</p>
          </div>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-3 py-1 rounded-lg font-mono">
            Smart Contract Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-4 md:col-span-1 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                مبلغ القرض بوحدة IVU:
              </label>
              <input
                type="number"
                value={loanIvuAmount}
                onChange={(e) => setLoanIvuAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-amber-300 font-mono focus:border-amber-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500">القيمة الاسمية الأولية: ${(initialUsdtValue).toLocaleString()} USDT</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                سعر IVU الحالي بالـ USDT:
              </label>
              <input
                type="number"
                value={usdtRate}
                onChange={(e) => setUsdtRate(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>معدل التضخم/انخفاض العملة:</span>
                <span className="text-amber-400 font-mono font-bold">{inflationRatePct}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={inflationRatePct}
                onChange={(e) => setInflationRatePct(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                مدة العقد (بالأشهر):
              </label>
              <select
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                <option value={6}>6 أشهر</option>
                <option value={12}>12 شهراً (سنة)</option>
                <option value={24}>24 شهراً (سنتان)</option>
                <option value={36}>36 شهراً (3 سنوات)</option>
              </select>
            </div>
          </div>

          {/* Results Comparison Box */}
          <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Fixed Nominal USDT Loan */}
              <div className="bg-slate-950 p-5 rounded-xl border border-red-900/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-red-400">1. القرض التقليدي (USDT ثابت اسمياً)</span>
                  <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded">يتأثر بالتضخم</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block">المبلغ المستلم عند الاقتراض:</span>
                  <span className="text-lg font-bold text-white font-mono">${initialUsdtValue.toLocaleString(undefined, {maximumFractionDigits:2})} USDT</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block">المبلغ المسدد بعد {durationMonths} شهر:</span>
                  <span className="text-lg font-bold text-red-400 font-mono">${fiatNominalLossUsdt.toLocaleString(undefined, {maximumFractionDigits:2})} USDT</span>
                </div>
                <p className="text-[11px] text-red-300/80 leading-relaxed bg-red-950/20 p-2.5 rounded-lg border border-red-900/20">
                  خسارة المقرض في القوة الشرائية: <strong className="font-mono text-red-400">${purchasingPowerSavedUsdt.toLocaleString(undefined, {maximumFractionDigits:2})} USDT</strong> (-{inflationRatePct}%) بسبب التضخم المالي.
                </p>
              </div>

              {/* Option B: IVU Smart Contract Loan */}
              <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400">2. قرض IVU الذكي (مربوط بالمعيار)</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">محمي شرعياً</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block">المبلغ المستلم ({loanIvuAmount} IVU):</span>
                  <span className="text-lg font-bold text-white font-mono">${initialUsdtValue.toLocaleString(undefined, {maximumFractionDigits:2})} USDT</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block">المبلغ المسدد مع السعر المحدث ({loanIvuAmount} IVU):</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">${futureIvuUsdtRepayment.toLocaleString(undefined, {maximumFractionDigits:2})} USDT</span>
                </div>
                <p className="text-[11px] text-emerald-300/90 leading-relaxed bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/20">
                  تم حفظ القوة الشرائية بالكامل! سعر الـ IVU الجديد: <strong className="font-mono text-emerald-400">${futureUsdtRate.toFixed(2)} USDT</strong> لكل وحدة.
                </p>
              </div>
            </div>

            {/* Verdict Note */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">التطابق الشرعي في عقود Web3:</span>
                <span>
                  عندما يتم سداد الدين بالـ USDT وفق قيمة الـ IVU المحدثة لحظة السداد، يسترجع المقرض عين القوة الشرائية التي أقرضها دون زيادة ربوية أو نقصان ظالم، وهو ما نص عليه قرار مجمع الفقه الإسلامي الدولي المعيار رقم (3) و AAOIFI.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solidity Smart Contract Example */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">نموذج العقد الذكي بـ Solidity (Solidity Smart Contract Implementation)</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
            IVULoanIndexer.sol
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono text-slate-300">
          <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ChainlinkOracleInterface {
    function getLatestIVUPriceUSD() external view returns (uint256 price, uint8 decimals);
}

contract IVUShariahLoan {
    ChainlinkOracleInterface public immutable ivuOracle;
    
    struct Loan {
        address borrower;
        address lender;
        uint256 principalIVUAmount; // Amount in IVU units (e.g. 100 IVU)
        uint256 startTimestamp;
        bool isRepaid;
    }
    
    mapping(uint256 => Loan) public loans;
    uint256 public nextLoanId;
    
    event LoanCreated(uint256 indexed loanId, address borrower, uint256 ivuAmount);
    event LoanRepaid(uint256 indexed loanId, uint256 usdAmountSettled);

    constructor(address _oracleAddress) {
        ivuOracle = ChainlinkOracleInterface(_oracleAddress);
    }
    
    // Calculates exact USDT/USD amount required to settle loan today
    function getRequiredRepaymentInUSD(uint256 _loanId) public view returns (uint256 usdAmount) {
        Loan memory loan = loans[_loanId];
        require(!loan.isRepaid, "Loan already repaid");
        
        (uint256 latestIVUPrice, uint8 decimals) = ivuOracle.getLatestIVUPriceUSD();
        
        // Exact real-value repayment: (IVU Amount * Current IVU Price in USD)
        usdAmount = (loan.principalIVUAmount * latestIVUPrice) / (10 ** decimals);
    }
}`}</pre>
        </div>
      </div>

      {/* Comparison Matrix: Crypto Assets vs IVU */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          مقارنة IVU مع الأصول المشفرة الأخرى في حفظ القوة الشرائية
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-950 text-amber-400 border-b border-slate-800">
                <th className="p-3">الأصل / المعيار</th>
                <th className="p-3">طبيعة التغطية</th>
                <th className="p-3">استقرار القوة الشرائية</th>
                <th className="p-3">الموقف الشرعي</th>
                <th className="p-3">الحماية ضد التضخم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-850">
                <td className="p-3 font-bold text-amber-300">وحدة IVU Mapped Token</td>
                <td className="p-3">سلة هجينة (ذهب + فضة + عملات + سلع)</td>
                <td className="p-3 text-emerald-400 font-bold">عالي جداً (تنعيم لوجستي)</td>
                <td className="p-3 text-emerald-400">مطابق تماماً (AAOIFI)</td>
                <td className="p-3 text-emerald-400">تغطية كاملة (100%)</td>
              </tr>
              <tr className="hover:bg-slate-850">
                <td className="p-3 font-bold text-white">العملات المستقرة (USDT / USDC)</td>
                <td className="p-3">الدولار الأمريكي الورقي</td>
                <td className="p-3 text-amber-400">مستقر اسمياً (يتآكل بالإنفلاشن)</td>
                <td className="p-3 text-slate-300">جائز بمعايير الصرف</td>
                <td className="p-3 text-red-400">ضعيفة (تتآكل بـ 3-10% سنوياً)</td>
              </tr>
              <tr className="hover:bg-slate-850">
                <td className="p-3 font-bold text-white">العملات المشفرة (Bitcoin / ETH)</td>
                <td className="p-3">خوارزمية العرض والطلب اللامركزية</td>
                <td className="p-3 text-red-400">شديد التذبذب (Volatility high)</td>
                <td className="p-3 text-amber-300">محل خلاف في بعض أشكالها</td>
                <td className="p-3 text-amber-300">غير مضمونة قصيرة/متوسطة الأجل</td>
              </tr>
              <tr className="hover:bg-slate-850">
                <td className="p-3 font-bold text-white">الرموز المربوطة بالذهب (PAXG / XAUT)</td>
                <td className="p-3">معدن الذهب الصافي (100% Gold)</td>
                <td className="p-3 text-emerald-300">جيد جداً للذهب</td>
                <td className="p-3 text-emerald-400">مباح بشرط التقابض</td>
                <td className="p-3 text-amber-300">مرتفعة ولكن معرضة لتقلبات المعدن</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
