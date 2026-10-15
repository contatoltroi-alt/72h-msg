import React from 'react';
import { Wrench, FastForward, Unlock, Lock, RotateCcw, Sparkles, X, User } from 'lucide-react';

interface DevBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateJump: (hours: number) => void;
  isUnlocked: boolean;
  onTriggerModal: (type: 'welcome' | 'phase1_done' | 'phase2_done' | 'milestone_phase1') => void;
  onResetAll: () => void;
  currentElapsedHours: number;
}

export const DevBar: React.FC<DevBarProps> = ({
  isOpen,
  onClose,
  onSimulateJump,
  isUnlocked,
  onTriggerModal,
  onResetAll,
  currentElapsedHours,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-14 inset-x-3 sm:inset-x-auto sm:right-4 sm:w-96 z-50 animate-in slide-in-from-top-2 duration-200">
      <div className="rounded-2xl p-4 bg-slate-900 border border-white/20 shadow-2xl text-left space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-slate-200 text-xs font-bold">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>SIMULADOR DE TIEMPO & EVALUACIÓN</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Jump Buttons */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase text-slate-400 block font-mono-numbers">
            Saltar Tiempo (Actual: {currentElapsedHours.toFixed(1)}h)
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs font-mono-numbers">
            <button
              onClick={() => onSimulateJump(0)}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-center"
            >
              0h (Inicio)
            </button>
            <button
              onClick={() => onSimulateJump(4)}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-center"
            >
              4h
            </button>
            <button
              onClick={() => onSimulateJump(12)}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-center"
            >
              12h
            </button>
            <button
              onClick={() => onSimulateJump(24.1)}
              className="py-1.5 px-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center font-bold"
            >
              24h (Fin F1)
            </button>
            <button
              onClick={() => onSimulateJump(48.1)}
              className="py-1.5 px-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-center font-bold"
            >
              48h (Fin F2)
            </button>
            <button
              onClick={() => onSimulateJump(72)}
              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-center"
            >
              72h (Meta)
            </button>
          </div>
        </div>

        {/* Trigger Popups */}
        <div className="space-y-1.5 pt-1 border-t border-white/5">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">
            Probar Modales de Aliento
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => onTriggerModal('welcome')}
              className="py-1.5 px-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-center flex items-center justify-center gap-1"
            >
              <User className="w-3 h-3 text-emerald-400" />
              <span>Bienvenida</span>
            </button>
            <button
              onClick={() => onTriggerModal('phase1_done')}
              className="py-1.5 px-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-center flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Modal 24h</span>
            </button>
            <button
              onClick={() => onTriggerModal('phase2_done')}
              className="py-1.5 px-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-center flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Modal 48h</span>
            </button>
          </div>
        </div>

        {/* Read-Only Status (Unlocking only via ?access=protocolo or real code) */}
        <div className="pt-1 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-slate-300">
            Nivel de Acceso:
          </span>
          <span
            className={`py-1 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
              isUnlocked
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/10 text-slate-400 border border-white/10'
            }`}
          >
            {isUnlocked ? (
              <>
                <Unlock className="w-3 h-3 text-emerald-400" />
                <span>Completo (89%)</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Básico</span>
              </>
            )}
          </span>
        </div>

        {/* Reset All */}
        <div className="pt-2 border-t border-white/5">
          <button
            onClick={onResetAll}
            className="w-full py-1 text-center text-[11px] text-rose-400 hover:text-rose-300 flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restablecer todo (volver a Onboarding)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
