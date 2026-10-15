import React, { useState, useEffect } from 'react';
import { 
  Zap, Sparkles, Filter, CheckCircle2, ArrowRight, 
  BookOpen, GraduationCap, History, Cpu, HeartPulse 
} from 'lucide-react';
import { SCRIPT_PACKAGES } from '../data/protocolData';
import { AccessLevel, ScriptMessage, SentScriptLogEntry } from '../types/protocol';
import { ScriptCard } from './ScriptCard';
import { MiniTrainingSection } from './MiniTrainingSection';
import { SentMessagesLog } from './SentMessagesLog';
import { ResponseSimulator } from './ResponseSimulator';

interface CentralDeScriptsProps {
  userName: string;
  accessLevel: AccessLevel;
  onOpenPaywall: () => void;
  onOpenPanicBreathing?: () => void;
  initialPackageId?: string;
}

export const CentralDeScripts: React.FC<CentralDeScriptsProps> = ({
  userName,
  accessLevel,
  onOpenPaywall,
  onOpenPanicBreathing,
  initialPackageId,
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || 'pkg_rompehielos'
  );

  // Active view for completo users: 'scripts' | 'training' | 'log' | 'simulator'
  const [completoView, setCompletoView] = useState<'scripts' | 'training' | 'log' | 'simulator'>('scripts');

  // Filter state for each package: packageId -> filterValue
  const [filters, setFilters] = useState<Record<string, string>>({
    pkg_rompehielos: 'dias_1_3',
    pkg_respuestas: 'curiosa',
    pkg_invitacion: 'amistoso',
    pkg_conflictos: 'espacio',
  });

  // Track used scripts in localStorage (persists)
  const [usedScriptIds, setUsedScriptIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('protocolo_used_scripts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return ['s1_1']; // default initial example
  });

  useEffect(() => {
    localStorage.setItem('protocolo_used_scripts', JSON.stringify(usedScriptIds));
  }, [usedScriptIds]);

  const isCompleto = accessLevel === 'completo';
  const totalScriptsCount = 22;
  const usedCount = Math.min(totalScriptsCount, usedScriptIds.length);

  const activePackage = SCRIPT_PACKAGES.find((p) => p.id === selectedPackageId) || SCRIPT_PACKAGES[0];
  const currentFilterValue = filters[activePackage.id] || activePackage.filterOptions[0]?.value;

  const handleSetFilter = (packageId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [packageId]: value,
    }));
  };

  // Filter scripts if completo or if filtering applies
  const displayedScripts = activePackage.scripts.filter((s) => {
    if (!isCompleto) {
      // In basic mode, show preview scripts + locked teaser cards
      return true;
    }
    // In completo mode, filter by the selected filter tag
    if (s.filterTag) {
      return s.filterTag === currentFilterValue;
    }
    return true;
  });

  // Track script usage when copied
  const handleScriptCopied = (script: ScriptMessage) => {
    if (!usedScriptIds.includes(script.id)) {
      setUsedScriptIds((prev) => [...prev, script.id]);
    }

    // Auto-record to Registro de Envíos
    const existingLogRaw = localStorage.getItem('protocolo_sent_scripts_log');
    let logs: SentScriptLogEntry[] = [];
    if (existingLogRaw) {
      try {
        logs = JSON.parse(existingLogRaw);
      } catch {
        logs = [];
      }
    }

    const newLog: SentScriptLogEntry = {
      id: `log_${Date.now()}`,
      scriptId: script.id,
      scriptTitle: script.title,
      packageNumber: activePackage.number,
      dateTimestamp: Date.now(),
      herResponse: 'pendiente',
      notes: 'Copiado para envío',
    };

    const updated = [newLog, ...logs.filter((l) => l.scriptId !== script.id)];
    localStorage.setItem('protocolo_sent_scripts_log', JSON.stringify(updated));
  };

  const handleSelectTargetScript = (targetScriptId: string) => {
    setCompletoView('scripts');
    for (const pkg of SCRIPT_PACKAGES) {
      const match = pkg.scripts.find((s) => s.id === targetScriptId);
      if (match) {
        setSelectedPackageId(pkg.id);
        if (match.filterTag) {
          handleSetFilter(pkg.id, match.filterTag);
        }
        break;
      }
    }
  };

  return (
    <div className="space-y-5 text-left">
      {/* COMPLETO HEADER WITH PROGRESS TRACKER */}
      {isCompleto ? (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-lg text-left space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base">⚡</span>
              <span className="text-xs font-black text-white">
                22 scripts desbloqueados · 4 módulos · 3 bonos
              </span>
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <span>✅ Incluido en tu compra</span>
            </div>
          </div>

          {/* Progress Tracker: "Scripts usados: X/22" */}
          <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950/70 border border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">
                Progreso de Ejecución:
              </span>
              <span className="text-emerald-400 font-black font-mono-numbers">
                Scripts usados: {usedCount}/{totalScriptsCount}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, (usedCount / totalScriptsCount) * 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400">
              {userName}, cada script utilizado queda registrado automáticamente en tu historial con su árbol de decisión.
            </p>
          </div>

          {/* Completo Navigation Pills */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-950/90 border border-white/10">
            {[
              { id: 'scripts', label: 'Scripts', icon: BookOpen },
              { id: 'training', label: 'Training', icon: GraduationCap },
              { id: 'log', label: 'Registro', icon: History },
              { id: 'simulator', label: 'Simulador', icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = completoView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCompletoView(tab.id as any)}
                  className={`min-h-[40px] py-1.5 px-1 rounded-xl text-center text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* BASICO ACCELERATION ACCESS BANNER (Subtle, no price) */
        <div 
          onClick={onOpenPaywall}
          className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-500/50 transition-all select-none group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black text-white">
                  Acelerador 89% — Central de Scripts (22 Guiones)
                </h4>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Aceleración
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Redacciones quirúrgicas para no dudar en ninguna palabra
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 shrink-0">
            <span>Acelerar</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      )}

      {/* COMPLETO EXCLUSIVE SUB-VIEWS */}
      {isCompleto && completoView === 'training' && (
        <MiniTrainingSection />
      )}

      {isCompleto && completoView === 'log' && (
        <SentMessagesLog onSelectTargetScript={handleSelectTargetScript} />
      )}

      {isCompleto && completoView === 'simulator' && (
        <ResponseSimulator onSelectTargetScript={handleSelectTargetScript} />
      )}

      {/* DEFAULT VIEW: SCRIPTS BROWSER */}
      {(!isCompleto || completoView === 'scripts') && (
        <div className="space-y-4">
          {/* Package Selector Tabs */}
          <div className="grid grid-cols-2 gap-2">
            {SCRIPT_PACKAGES.map((pkg) => {
              const isSelected = activePackage.id === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-md'
                      : 'bg-slate-950/60 border-white/5 text-slate-300 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Paquete {pkg.number}
                    </span>
                    {isCompleto && (
                      <span className="text-[9px] text-emerald-400 font-bold">
                        {pkg.scripts.length} scripts
                      </span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold leading-tight line-clamp-1">
                    {pkg.title.split(':')[1] || pkg.title}
                  </h5>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {pkg.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Package Details & Interactive Filter */}
          <div className="glass-panel rounded-3xl p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {activePackage.phase}
                </span>
                <h3 className="text-sm font-bold text-white">
                  {activePackage.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                {activePackage.subtitle}
              </p>
            </div>

            {/* Dynamic Filter Question */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>{activePackage.filterQuestion}</span>
              </div>

              {/* Filter options buttons */}
              <div className="flex flex-wrap gap-1.5">
                {activePackage.filterOptions.map((opt) => {
                  const isActive = currentFilterValue === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSetFilter(activePackage.id, opt.value)}
                      className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Script Cards List */}
            <div className="space-y-3 pt-1">
              {displayedScripts.map((script) => (
                <ScriptCard
                  key={script.id}
                  script={script}
                  accessLevel={accessLevel}
                  onOpenPaywall={onOpenPaywall}
                  onOpenPanicBreathing={onOpenPanicBreathing}
                  onSelectTargetScript={handleSelectTargetScript}
                  onCopied={() => handleScriptCopied(script)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
