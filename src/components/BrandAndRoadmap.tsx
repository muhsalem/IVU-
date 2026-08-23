import React, { useState } from 'react';
import { BRAND_IDENTITY, RISK_MATRIX, ROADMAP_PHASES, EVALUATION_SCORES } from '../data/brandData';
import { Award, ShieldAlert, Map, Sparkles, CheckCircle2, Scale, Calendar, Target, Building2, Clock, ChevronRight, Layers } from 'lucide-react';

export const BrandAndRoadmap: React.FC = () => {
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'timeline' | 'quarters'>('quarters');

  const overallScore = Math.round(
    EVALUATION_SCORES.reduce((acc, curr) => acc + (curr.score * curr.weight) / 100, 0) * 10
  ) / 10;

  const activePhase = ROADMAP_PHASES.find(p => p.phaseNumber === selectedPhaseNum) || ROADMAP_PHASES[0];

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <Award className="w-4 h-4" />
          <span>الهوية المؤسسية وخارطة الطريق والتقييم الكمي الشامل</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          هوية مشروع IVU وخارطة الطريق الخمسية والتقييم الإجمالي (/100)
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          دليل الهوية البصرية والمصفوفة التنفيذية لإدارة المخاطر وخطة الإطلاق العالمي على مدى خمس سنوات مع التقييم الكمي الرقمي للمشروع.
        </p>
      </div>

      {/* Numerical Project Evaluation Scorecard */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              التقييم الكمي الرقمي لمشروع IVU من 100 درجة
            </h3>
            <p className="text-xs text-slate-400">تقييم شامل أعده الفريق المتخصص لجودة وجدوى المشروع ومسار التطوير</p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 px-5 py-3 rounded-2xl text-center self-start sm:self-auto">
            <span className="text-[10px] text-amber-400 font-semibold block">النتيجة الإجمالية الموزونة</span>
            <span className="text-3xl font-black text-amber-300 font-mono">{overallScore} / 100</span>
          </div>
        </div>

        {/* Score Breakdown Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVALUATION_SCORES.map((sc, idx) => (
            <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-xs text-slate-100">{sc.categoryAr}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{sc.categoryEn}</span>
                </div>
                <span className="text-base font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {sc.score}/100
                </span>
              </div>

              <div className="space-y-1 text-[11px]">
                <p className="text-emerald-400 font-semibold">نقاط القوة:</p>
                <ul className="text-slate-300 list-disc list-inside space-y-0.5">
                  {sc.strengthsAr.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 text-[11px] pt-1 border-t border-slate-800/80">
                <p className="text-amber-400 font-semibold">مقترحات للوصول لـ 98/100:</p>
                <ul className="text-slate-400 list-disc list-inside space-y-0.5">
                  {sc.improvementProposalsAr.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Identity Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" />
          الهوية المؤسسية ودليل الألوان والرؤية
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold block">الرؤية الاستراتيجية (Vision)</span>
            <p className="text-slate-200 leading-relaxed">{BRAND_IDENTITY.visionAr}</p>
          </div>

          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold block">الرسالة (Mission)</span>
            <p className="text-slate-200 leading-relaxed">{BRAND_IDENTITY.missionAr}</p>
          </div>
        </div>

        {/* Color Palette Display */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 block">لوحة الألوان الأساسية (Color Palette):</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BRAND_IDENTITY.colorPalette.map((col, i) => (
              <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="h-10 rounded-lg shadow-inner" style={{ backgroundColor: col.hex }}></div>
                <div className="text-[11px]">
                  <p className="font-bold text-slate-100">{col.nameAr}</p>
                  <p className="font-mono text-slate-400 text-[10px]">{col.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Analysis Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          مصفوفة تحليل المخاطر وآليات المعالجة والتحوط
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RISK_MATRIX.map((risk, idx) => (
            <div key={idx} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">{risk.categoryAr}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  risk.severity === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  مستوى الخطر: {risk.severity}
                </span>
              </div>

              <h4 className="font-bold text-xs text-slate-100">{risk.titleAr}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">{risk.descriptionAr}</p>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 bg-emerald-950/20 p-2.5 rounded-lg">
                <strong className="text-emerald-300 font-semibold">آلية التحوط والحل: </strong>
                {risk.mitigationStrategyAr}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 5-Year Comprehensive Roadmap */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Map className="w-6 h-6 text-amber-400" />
              خارطة الطريق التنفيذية الشاملة لـ 5 سنوات (2026 - 2030)
            </h3>
            <p className="text-xs text-slate-400">مراحل التنفيذ، الأهداف الربعية، المؤشرات الرقمية، والشركاء الاستراتيجيون</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setViewMode('quarters')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'quarters' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>التفاصيل الربعية والمؤشرات</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'timeline' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>المنظور الخماسي الشامل</span>
            </button>
          </div>
        </div>

        {/* Phase Navigation Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ROADMAP_PHASES.map((phase) => {
            const isSelected = phase.phaseNumber === selectedPhaseNum;
            return (
              <button
                key={phase.phaseNumber}
                onClick={() => setSelectedPhaseNum(phase.phaseNumber)}
                className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/20 to-slate-950 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono ${
                    phase.status === 'Active' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    المرحلة {phase.phaseNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{phase.timeframeAr}</span>
                </div>

                <p className="text-xs font-bold line-clamp-2 leading-snug">{phase.titleAr}</p>

                {/* Progress bar inside tab */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full transition-all duration-500 ${
                      phase.progressPercent === 100 ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${phase.progressPercent}%` }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed View for Active Phase */}
        {viewMode === 'quarters' ? (
          <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            {/* Active Phase Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-bold">
                    المرحلة {activePhase.phaseNumber}: {activePhase.timeframeAr}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                    activePhase.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    الحالة: {activePhase.status === 'Active' ? 'قيد التنفيذ النشط' : 'قادمة'}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white pt-1">{activePhase.titleAr}</h4>
                <p className="text-xs text-slate-400 font-mono">{activePhase.titleEn}</p>
              </div>

              {/* Progress Indicator */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl min-w-[200px] text-center space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span>نسبة الإنجاز:</span>
                  <span className="text-amber-400 font-mono">{activePhase.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-700"
                    style={{ width: `${activePhase.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* KPI Metrics for Active Phase */}
            {activePhase.kpiMetricsAr && activePhase.kpiMetricsAr.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  مؤشرات الأداء المستهدفة لهذه المرحلة (Target KPIs):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activePhase.kpiMetricsAr.map((kpi, idx) => (
                    <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                      <span className="text-[11px] text-slate-400 block">{kpi.labelAr}</span>
                      <span className="text-sm font-bold text-emerald-300 font-mono">{kpi.valueAr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quarterly Breakdown Cards Grid */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                المحطات التفصيلية لكل ربع سنة (Quarterly Milestones):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePhase.quarters.map((q, idx) => (
                  <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 font-mono">
                          {q.quarterAr}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          q.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          q.status === 'In Progress' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {q.status === 'Completed' ? 'مكتمل' : q.status === 'In Progress' ? 'قيد الإنجاز' : 'مستقبلي'}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-white">{q.titleAr}</h5>
                      <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                        {q.detailsAr.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners & Strategic Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
              <div className="space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800/60">
                <span className="font-bold text-amber-300 block">الأهداف الشاملة والمخرجات:</span>
                <p className="text-slate-300 font-semibold text-[11px]">الأهداف:</p>
                <ul className="text-slate-400 list-disc list-inside space-y-0.5 text-[11px]">
                  {activePhase.objectivesAr.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
                <p className="text-emerald-400 font-semibold text-[11px] pt-1">المخرجات المعتمَدة:</p>
                <ul className="text-slate-300 list-disc list-inside space-y-0.5 text-[11px]">
                  {activePhase.deliverablesAr.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>

              {activePhase.partnersAr && (
                <div className="space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800/60">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    الشركاء والمؤسسات المستهدفة:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activePhase.partnersAr.map((partner, i) => (
                      <span key={i} className="bg-slate-950 border border-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Timeline view of all 5 phases stacked */
          <div className="space-y-4">
            {ROADMAP_PHASES.map((phase) => (
              <div key={phase.phaseNumber} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <h4 className="font-bold text-sm text-amber-300">{phase.titleAr}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">{phase.titleEn}</p>
                  </div>
                  <span className="text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                    {phase.timeframeAr}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-300">الأهداف الرئيسية:</p>
                    <ul className="text-slate-400 list-disc list-inside space-y-0.5 text-[11px]">
                      {phase.objectivesAr.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-emerald-400">المخرجات المعتمَدة:</p>
                    <ul className="text-slate-300 list-disc list-inside space-y-0.5 text-[11px]">
                      {phase.deliverablesAr.map((del, i) => (
                        <li key={i}>{del}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

