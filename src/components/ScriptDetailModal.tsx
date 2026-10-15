import React, { useEffect } from 'react';
import { X, Sparkles, ArrowRight, Zap, Target, ShieldCheck } from 'lucide-react';
import { ScriptMessage } from '../types/protocol';

interface ScriptDetailModalProps {
  script: ScriptMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onGetScript: () => void;
}

export const ScriptDetailModal: React.FC<ScriptDetailModalProps> = ({
  script,
  isOpen,
  onClose,
  onGetScript,
}) => {
  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !script) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[480px] max-h-[90dvh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border-t sm:border border-amber-500/30 shadow-2xl overflow-y-auto p-5 sm:p-6 text-left space-y-4 animate-in slide-in-from-bottom-8 duration-300 relative">
        {/* Drag handle affordance on mobile */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto -mt-1 mb-2 block sm:hidden" />

        {/* Close Button (44px+ touch area) */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
            <Target className="w-3 h-3 text-amber-400" />
            <span>Fórmula de Precisión Quirúrgica</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white leading-snug">
            {script.title}
          </h3>
        </div>

        {/* Objective & Context */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 space-y-2 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
              Objetivo Neuroquímico:
            </span>
            <p className="text-slate-200 mt-0.5 font-medium leading-relaxed">
              {script.objective}
            </p>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Momento Óptimo de Aplicación:
            </span>
            <p className="text-slate-300 mt-0.5 text-[11px] leading-relaxed">
              {script.context}
            </p>
          </div>
        </div>

        {/* Value Pitch */}
        <p className="text-xs text-slate-300 leading-relaxed">
          Esta redacción exacta está estructurada para desarmar la frialdad inicial sin arriesgar tu dignidad ni parecer necesitado. Forma parte del repertorio completo del Protocolo.
        </p>

        {/* Action Button */}
        <div className="pt-1 pb-2">
          <button
            onClick={() => {
              onClose();
              onGetScript();
            }}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Obtener este script y el repertorio completo →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
