import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X, CheckCircle2, ArrowRight, Play, Compass } from 'lucide-react';
import { neuroAudio } from '../utils/audioSynthesizer';

interface EncouragementModalProps {
  type: 'welcome' | 'phase1_done' | 'phase2_done' | 'milestone_phase1' | null;
  userName: string;
  onClose: () => void;
  onNavigateToHub: () => void;
  onStartProtocol?: () => void;
}

export const EncouragementModal: React.FC<EncouragementModalProps> = ({
  type,
  userName,
  onClose,
  onNavigateToHub,
  onStartProtocol,
}) => {
  useEffect(() => {
    if (!type) return;

    document.body.style.overflow = 'hidden';
    neuroAudio.playVictoryChime();

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#3B82F6', '#00FF87'],
      });
    } catch {
      // ignore
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [type]);

  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'welcome':
        return {
          badge: 'Bienvenida al Protocolo',
          title: `Bienvenido, ${userName}.`,
          body: 'Tu cronómetro de 72 horas está listo para empezar. Cada hora de silencio y autocontrol trabaja a nivel neuroquímico en la percepción de ella.',
          softHint: 'Tu protocolo personalizado te espera.',
          isWelcome: true,
        };
      case 'phase1_done':
        return {
          badge: 'Hito de 24 Horas Alcanzado',
          title: `🎯 ¡Excelente, ${userName}! Fase 1 completada.`,
          body: 'Has resistido la ventana de mayor ansiedad e impulsividad. Al mantenerte en silencio, el circuito de anticipación de ella no recibió la validación habitual y su orgullo comienza a ceder terreno a la curiosidad. Revisa tu guía de Fase 2 en el Hub.',
          softHint: '¿Sabrás qué decir exactamente? → Herramientas',
          isWelcome: false,
        };
      case 'phase2_done':
        return {
          badge: 'Hito de 48 Horas Alcanzado',
          title: `🎯 ¡Fase 2 completada, ${userName}! Comienza la Ventana de Reconexión.`,
          body: 'El cortisol defensivo en ella se ha estabilizado. Si se produce un contacto en las próximas 24 horas, su mente está predispuesta a valorar una interacción ligera y sin reproches.',
          softHint: '¿Listo para calibrar tus palabras? → Herramientas',
          isWelcome: false,
        };
      case 'milestone_phase1':
        return {
          badge: 'Disciplina Impecable',
          title: `¡Excelente, ${userName}! Ya completaste las micro-acciones de tu Fase 1.`,
          body: 'Tu compromiso con no invadir sus redes ni enviar mensajes impulsivos está protegiendo tu valor y dándole espacio genuino a la relación para respirar.',
          softHint: 'Continúa firme en tu protocolo diario.',
          isWelcome: false,
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[480px] max-h-[90dvh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border-t sm:border border-emerald-500/40 shadow-2xl overflow-y-auto p-5 sm:p-6 text-left space-y-4 animate-in slide-in-from-bottom-8 duration-300 relative">
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto -mt-1 mb-2 block sm:hidden" />

        {/* Close Button (44px+ touch area) */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{content.badge}</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white leading-snug">
              {content.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {content.body}
          </p>

          <div className="pt-2 border-t border-white/5 space-y-2 pb-2">
            {content.isWelcome ? (
              <button
                onClick={() => {
                  onClose();
                  if (onStartProtocol) onStartProtocol();
                }}
                className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all glow-green"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Iniciar Protocolo 72H</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToHub();
                  }}
                  className="min-h-[44px] text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1.5 transition-colors active:scale-95"
                >
                  <span>{content.softHint}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full min-h-[48px] py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold text-center transition-colors active:scale-[0.98]"
                >
                  Continuar con mi protocolo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
