import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Edit3, ShieldAlert, Zap } from 'lucide-react';
import { PHASE_FRAMEWORKS } from '../data/protocolData';
import { PhaseNumber } from '../types/protocol';

interface MessagePreparationModalProps {
  phase: PhaseNumber;
  isOpen: boolean;
  onClose: () => void;
  onOpenProtocolOffer: () => void;
}

export const MessagePreparationModal: React.FC<MessagePreparationModalProps> = ({
  phase,
  isOpen,
  onClose,
  onOpenProtocolOffer,
}) => {
  const [draftText, setDraftText] = useState('');
  const framework = PHASE_FRAMEWORKS[phase];

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[480px] max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border-t sm:border border-emerald-500/30 shadow-2xl overflow-y-auto p-5 sm:p-6 text-left space-y-4 animate-in slide-in-from-bottom-8 duration-300 relative">
        {/* Mobile drag handle */}
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
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-2">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Fase {framework.phase} · Método Completo</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white leading-tight">
            {framework.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {framework.subtitle}
          </p>
        </div>

        {/* Why Improvisation Fails */}
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200/90 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-rose-300">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>Por qué la improvisación suele fallar aquí:</span>
          </div>
          <p className="leading-relaxed">
            {framework.whyImprovisationFails}
          </p>
        </div>

        {/* The 3 Core Free Principles */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono-numbers">
            Los 3 Principios de Calibración:
          </span>

          {framework.principles.map((pr) => (
            <div
              key={pr.number}
              className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                  {pr.number}
                </span>
                <h4 className="font-bold text-slate-100">
                  {pr.title}
                </h4>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                {pr.description}
              </p>

              <div className="pt-1.5 border-t border-white/5 space-y-1 text-[11px]">
                <div className="text-emerald-300/90 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Efectivo:</strong> {pr.exampleDo}</span>
                </div>
                <div className="text-rose-300/80 flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span><strong>Evitar:</strong> {pr.exampleDont}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Scratchpad (font size 16px to prevent iOS auto-zoom) */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Borrador de Práctica:</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono-numbers">
              {draftText.length} caracteres
            </span>
          </div>

          <textarea
            rows={2}
            placeholder="Escribe aquí un borrador para probar cómo suena antes de enviar..."
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            className="w-full text-base sm:text-xs p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 resize-none font-normal"
          />
        </div>

        {/* The Natural Acceleration Bridge (No price, pure speed & precision offer) */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 via-slate-950 to-slate-950 border border-amber-500/30 space-y-3 pb-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            {framework.accelerationBridge.text}
          </p>

          <button
            onClick={() => {
              onClose();
              onOpenProtocolOffer();
            }}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>{framework.accelerationBridge.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
