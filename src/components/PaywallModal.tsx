import React, { useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight, Zap, Gift, ShieldCheck } from 'lucide-react';
import { CHECKOUT_URL } from '../data/protocolData';

interface PaywallModalProps {
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  onUnlockCompleted: () => void;
  isUnlocked: boolean;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  userName,
  isOpen,
  onClose,
  onUnlockCompleted,
  isUnlocked,
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

  if (!isOpen) return null;

  const handleCheckout = () => {
    window.open(CHECKOUT_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[480px] max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border-t sm:border border-amber-500/40 shadow-2xl overflow-y-auto p-5 sm:p-6 text-left space-y-4 animate-in slide-in-from-bottom-8 duration-300 relative">
        {/* Drag handle affordance on mobile */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto -mt-1 mb-2 block sm:hidden" />

        {/* Ambient Top Glow */}
        <div className="absolute -top-16 inset-x-0 h-36 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button (44px+ touch area) */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Transformational Header */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Aceleración Estratégica</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
            De improvisar (54%) a precisión quirúrgica (89%)
          </h2>

          <p className="text-xs text-amber-200/90 italic font-medium">
            "Los hombres que recuperan a ella no improvisan."
          </p>
        </div>

        {/* Transformation Narrative */}
        <p className="text-xs text-slate-300 leading-relaxed">
          Ya tienes el método y la cronobiología completa de forma gratuita. El Protocolo de Mensajes te entrega la <strong className="text-white">ejecución exacta</strong>: más de 20 redacciones probadas para no dudar en ninguna palabra y actuar con total confianza.
        </p>

        {/* Included Execution Packages & 3 Bonuses (Single Column Mobile-Optimized) */}
        <div className="rounded-2xl p-4 bg-slate-950/80 border border-white/10 space-y-2.5 text-xs text-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block pb-1 border-b border-white/5">
            📦 4 Colecciones de Scripts de Precisión:
          </span>
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Paquete 1:</strong> Rompehielos de curiosidad y anclas nostálgicas</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Paquete 2:</strong> Respuestas de alto valor y escasez calibrada</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Paquete 3:</strong> Propuestas de micro-citas de bajo compromiso (15 min)</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Paquete 4:</strong> Escudo Anti-Frieza y respuestas a 'necesito tiempo'</span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block pt-2 pb-1 border-b border-white/5">
            🎁 3 Bonos Exclusivos Incluidos:
          </span>
          <div className="flex items-start gap-2.5 text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span><strong>Bono 1:</strong> Guía 'Qué NUNCA Decir' (La lista negra de frases fatales)</span>
          </div>
          <div className="flex items-start gap-2.5 text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span><strong>Bono 2:</strong> Análisis de Perfil de Mensajes y calibración de tono</span>
          </div>
          <div className="flex items-start gap-2.5 text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span><strong>Bono 3:</strong> Acceso al Grupo VIP (+1.500 hombres) para resolución de casos reales</span>
          </div>
        </div>

        {/* The Single Price Tag in the entire app */}
        <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
              Acceso Inmediato de Por Vida
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black font-mono-numbers text-white">$27 USD</span>
              <span className="text-xs text-slate-400 line-through">Normal $97</span>
            </div>
            <span className="text-[10px] text-amber-300/90 font-medium block mt-1">
              ⚡ Oferta exclusiva dentro de tu aplicación
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/40">
            Aceleración 89%
          </span>
        </div>

        {/* Primary Action Button (Minimum 48px height) */}
        <div className="space-y-2 pt-1 pb-2">
          <button
            onClick={handleCheckout}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all glow-gold"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>
              {userName
                ? `${userName}, acelera tu resultado – $27`
                : '⚡ DESBLOQUEAR TODO EL PROTOCOLO – $27'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Discreet Evaluation Toggle */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-slate-500">
              Evaluación / Modo desarrollador:
            </span>
            <button
              onClick={() => {
                onUnlockCompleted();
                onClose();
              }}
              className="min-h-[44px] px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center transition-colors active:scale-95 bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
            >
              ⚡ Simular Compra Exitosa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
