import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { CHECKLIST_ITEMS, PHASES_DETAILED } from '../data/protocolData';
import { PhaseNumber } from '../types/protocol';

interface ChecklistSectionProps {
  checklist: Record<string, boolean>;
  currentPhase: PhaseNumber;
  onToggleItem: (id: string) => void;
  onMilestonePhase1Trigger: () => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  checklist,
  currentPhase,
  onToggleItem,
  onMilestonePhase1Trigger,
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<PhaseNumber | 'all'>(currentPhase);

  const items = selectedPhaseFilter === 'all'
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter((item) => item.phase === selectedPhaseFilter);

  const totalCompleted = CHECKLIST_ITEMS.filter((i) => checklist[i.id]).length;
  const totalItems = CHECKLIST_ITEMS.length;
  const overallPercentage = Math.round((totalCompleted / totalItems) * 100);

  // Check Phase 1 completion
  const phase1Items = CHECKLIST_ITEMS.filter((i) => i.phase === 1);
  const phase1DoneCount = phase1Items.filter((i) => checklist[i.id]).length;

  const handleToggle = (id: string) => {
    const isCurrentlyChecked = !!checklist[id];
    onToggleItem(id);

    // If checking an item in Phase 1 and that completes Phase 1, trigger encouraging milestone
    if (!isCurrentlyChecked) {
      const willBeCompletedCount = phase1DoneCount + (phase1Items.some((i) => i.id === id) ? 1 : 0);
      if (willBeCompletedCount === phase1Items.length) {
        onMilestonePhase1Trigger();
      }
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 text-left space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Protocolo de Hábitos 72H</span>
          </div>
          <h3 className="text-base font-extrabold text-white mt-0.5">
            Micro-Acciones de Autocontrol Diario
          </h3>
        </div>

        {/* Global Progress */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-300 font-mono-numbers">
              {totalCompleted}/{totalItems} ({overallPercentage}%)
            </span>
          </div>
          <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Segmented Phase Filter */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/5 overflow-x-auto">
        <button
          onClick={() => setSelectedPhaseFilter(1)}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            selectedPhaseFilter === 1
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Fase 1 (0–24h)
        </button>
        <button
          onClick={() => setSelectedPhaseFilter(2)}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            selectedPhaseFilter === 2
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Fase 2 (24–48h)
        </button>
        <button
          onClick={() => setSelectedPhaseFilter(3)}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            selectedPhaseFilter === 3
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Fase 3 (48–72h)
        </button>
        <button
          onClick={() => setSelectedPhaseFilter('all')}
          className={`py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            selectedPhaseFilter === 'all'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Todas
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = !!checklist[item.id];
          const phaseColor = PHASES_DETAILED[item.phase].colorHex;

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none active:scale-[0.99] ${
                isChecked
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-slate-900/60 border-white/5 hover:border-white/15 hover:bg-slate-900/80'
              }`}
            >
              <div className="pt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                ) : (
                  <div className="w-5 h-5 rounded-lg border-2 border-slate-600 flex items-center justify-center hover:border-slate-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-xs sm:text-sm font-medium leading-snug transition-colors ${
                  isChecked ? 'text-slate-200 line-through opacity-80' : 'text-slate-100'
                }`}>
                  {item.label}
                </p>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <span
                    className="font-bold uppercase tracking-wider text-[9px]"
                    style={{ color: phaseColor }}
                  >
                    Fase {item.phase}
                  </span>
                  <span>·</span>
                  <span>{item.category}</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-mono-numbers">+{item.points}% compostura</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
