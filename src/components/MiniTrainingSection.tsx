import React, { useState } from 'react';
import { 
  GraduationCap, ChevronDown, ChevronUp, CheckCircle2, 
  ArrowRight, Clock, Eye, AlertTriangle, GitMerge, ShieldCheck 
} from 'lucide-react';
import { MINI_TRAINING_STEPS } from '../data/protocolData';
import { MiniTrainingStep } from '../types/protocol';

export const MiniTrainingSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const stepIcons = [
    <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    <Clock className="w-4 h-4 text-amber-400" />,
    <Eye className="w-4 h-4 text-sky-400" />,
    <AlertTriangle className="w-4 h-4 text-rose-400" />,
    <GitMerge className="w-4 h-4 text-emerald-400" />,
  ];

  const currentStep: MiniTrainingStep = MINI_TRAINING_STEPS[activeStepIndex] || MINI_TRAINING_STEPS[0];

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 text-left space-y-4 border border-emerald-500/20">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <span>Mini-Training: Domina tu Central</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Exclusivo
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Guía táctica en 5 pasos para no equivocarte en la ejecución
            </p>
          </div>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="grid grid-cols-5 gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/5">
        {MINI_TRAINING_STEPS.map((s, idx) => {
          const isSelected = activeStepIndex === idx;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`py-2 px-1 rounded-xl text-center transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider">Paso {s.step}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Card */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3.5 animate-in fade-in duration-200">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              {stepIcons[activeStepIndex]}
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {currentStep.title}
              </h4>
            </div>
            <p className="text-[11px] text-slate-400">
              {currentStep.subtitle}
            </p>
          </div>
        </div>

        {/* Golden Rule Callout */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs leading-relaxed font-medium">
          <strong className="text-amber-300 block mb-0.5">Regla de Oro:</strong>
          {currentStep.keyRule}
        </div>

        {/* Detailed Explanation */}
        <p className="text-xs text-slate-300 leading-relaxed">
          {currentStep.description}
        </p>

        {/* Step Checklist Items */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Acciones Clave:
          </span>
          <div className="space-y-1.5">
            {currentStep.checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagram Summary if present */}
        {currentStep.diagramSummary && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1.5 mt-2">
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">
              Flujo Quirúrgico Validado
            </span>
            <div className="text-xs font-mono-numbers font-black text-white bg-slate-950/70 p-2 rounded-lg border border-white/5">
              {currentStep.diagramSummary}
            </div>
          </div>
        )}

        {/* Next Step Nav Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none"
          >
            ← Paso Anterior
          </button>
          <span className="text-[10px] text-slate-500">
            {activeStepIndex + 1} de {MINI_TRAINING_STEPS.length}
          </span>
          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(MINI_TRAINING_STEPS.length - 1, prev + 1))}
            disabled={activeStepIndex === MINI_TRAINING_STEPS.length - 1}
            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
          >
            <span>Siguiente Paso</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
