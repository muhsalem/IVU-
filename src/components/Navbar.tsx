import React from 'react';
import { Scale, Sparkles, ShieldCheck, Calculator, LineChart, BookOpen, ScrollText, Layers, FileCode, Award, Coins, TrendingUp, Presentation, Globe, Cloud } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenAdvisor }) => {
  const navItems = [
    { id: 'calculator', labelAr: 'الآلة الحاسبة الحية', icon: Calculator, badgeAr: 'تفاعلي' },
    { id: 'google_drive', labelAr: 'سحابة Google Drive', icon: Cloud, badgeAr: 'Sync' },
    { id: 'offshore_fx', labelAr: 'سعر الصرف خارج الدولة', icon: Globe, badgeAr: 'Offshore FX' },
    { id: 'presentation', labelAr: 'العرض التقديمي للمنصة', icon: Presentation, badgeAr: 'سلايدات' },
    { id: 'trends_dashboard', labelAr: 'مؤشرات النمو والتضخم', icon: TrendingUp, badgeAr: 'مباشر' },
    { id: 'theory', labelAr: 'التشخيص النظري', icon: BookOpen },
    { id: 'comparison', labelAr: 'مقارنة 20+ نموذج', icon: Layers },
    { id: 'specification', labelAr: 'تصميم أوزان المؤشر', icon: Scale },
    { id: 'backtest', labelAr: 'المحاكاة التاريخية (1970-2026)', icon: LineChart },
    { id: 'shariah', labelAr: 'التقييم الشرعي والقانوني', icon: ShieldCheck },
    { id: 'contract', labelAr: 'صياغة العقود', icon: ScrollText },
    { id: 'crypto_blockchain', labelAr: 'العملات المشفرة والبلوكشين', icon: Coins, badgeAr: 'جديد' },
    { id: 'brand_roadmap', labelAr: 'الهوية والتقييم (/100)', icon: Award },
    { id: 'api_docs', labelAr: 'المطورون API', icon: FileCode }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Banner Ticker */}
      <div className="bg-slate-900 border-b border-slate-800/80 text-xs py-1.5 px-4 text-slate-300 flex items-center justify-between overflow-x-auto gap-4">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-amber-400">وحدة القيمة الإسلامية (IVU):</span>
          <span>1 IVU = 1,590.25 USD</span>
          <span className="text-emerald-400 font-mono text-[11px]">(+0.12% اليوم)</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-slate-400 text-[11px] whitespace-nowrap">
          <span>الذهب: $2,750.40/oz</span>
          <span>الفضة: $32.10/oz</span>
          <span>SDR: 1.34 USD</span>
          <span>التضخم المجمّع: 3.2%</span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px]">
            AAOIFI Compliant Standard
          </span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('calculator')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  IVU STANDARD
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">وحدة القيمة الإسلامية</p>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.labelAr}</span>
                  {item.badgeAr && (
                    <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1 rounded">
                      {item.badgeAr}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* AI Advisor Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span className="hidden sm:inline">الخبير الآلي الشرعي</span>
              <span className="sm:hidden">الخبير</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar (Scrollable) */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2.5 border-t border-slate-800/60 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.labelAr}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
