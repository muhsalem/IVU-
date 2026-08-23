import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { IvuCalculator } from './components/IvuCalculator';
import { OffshoreFxExchangeHub } from './components/OffshoreFxExchangeHub';
import { PlatformPresentation } from './components/PlatformPresentation';
import { IvuTrendsDashboard } from './components/IvuTrendsDashboard';
import { TheoreticalDiagnosis } from './components/TheoreticalDiagnosis';
import { ModelComparison } from './components/ModelComparison';
import { IndexSpecification } from './components/IndexSpecification';
import { BacktestSimulator } from './components/BacktestSimulator';
import { ShariahLegalHub } from './components/ShariahLegalHub';
import { ContractGenerator } from './components/ContractGenerator';
import { CryptoBlockchainHub } from './components/CryptoBlockchainHub';
import { BrandAndRoadmap } from './components/BrandAndRoadmap';
import { ApiDocs } from './components/ApiDocs';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { Scale, Heart, ShieldCheck, Globe } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dir-rtl font-sans antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenAdvisor={() => setIsAdvisorOpen(true)} 
        />

        {/* Main Content Stage */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'calculator' && <IvuCalculator />}
          {activeTab === 'offshore_fx' && <OffshoreFxExchangeHub />}
          {activeTab === 'presentation' && <PlatformPresentation />}
          {activeTab === 'trends_dashboard' && <IvuTrendsDashboard />}
          {activeTab === 'theory' && <TheoreticalDiagnosis />}
          {activeTab === 'comparison' && <ModelComparison />}
          {activeTab === 'specification' && <IndexSpecification />}
          {activeTab === 'backtest' && <BacktestSimulator />}
          {activeTab === 'shariah' && <ShariahLegalHub />}
          {activeTab === 'contract' && <ContractGenerator />}
          {activeTab === 'crypto_blockchain' && <CryptoBlockchainHub />}
          {activeTab === 'brand_roadmap' && <BrandAndRoadmap />}
          {activeTab === 'api_docs' && <ApiDocs />}
        </main>
      </div>

      {/* Global AI Shariah Advisor Modal */}
      <AiAdvisorModal 
        isOpen={isAdvisorOpen} 
        onClose={() => setIsAdvisorOpen(false)} 
      />

      {/* Platform Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/20">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-200 text-sm block">وحدة القيمة الإسلامية (IVU Standard)</span>
                <span className="text-[11px] text-slate-400">المعيار العالمي لحفظ القوة الشرائية وتحقيق العدالة في العقود والديون</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <span className="flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                مطابق لمعايير AAOIFI رقم 1 و 3 و 19
              </span>
              <span className="flex items-center gap-1.5 text-[11px]">
                <Globe className="w-4 h-4 text-amber-400" />
                المجلس الاستشاري الاقتصادي العالمي
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>© 2026 Islamic Value Unit (IVU) Authority. جميع الحقوق محفوظة.</p>
            <p className="flex items-center gap-1">
              تم التطوير وفق أعلى معايير الاقتصاد النفيضي والرياضي لمنع الغبن وتحقيق القسط.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
