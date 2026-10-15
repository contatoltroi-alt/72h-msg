import React, { useState } from 'react';
import { 
  Copy, Check, Volume2, VolumeX, Smartphone, ArrowRight, 
  Clock, ShieldAlert, Sparkles, CheckSquare, Target, HeartPulse 
} from 'lucide-react';
import { ScriptMessage, AccessLevel } from '../types/protocol';
import { neuroAudio } from '../utils/audioSynthesizer';

interface ScriptCardProps {
  script: ScriptMessage;
  accessLevel: AccessLevel;
  onOpenPaywall: () => void;
  onOpenPanicBreathing?: () => void;
  onSelectTargetScript?: (targetScriptId: string) => void;
  onCopied?: () => void;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({
  script,
  accessLevel,
  onOpenPaywall,
  onOpenPanicBreathing,
  onSelectTargetScript,
  onCopied,
}) => {
  const [copiedType, setCopiedType] = useState<'text' | 'whatsapp' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isUnlocked = accessLevel === 'completo' || script.isFreePreview;

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    neuroAudio.triggerVibration(50);
    setCopiedType('text');
    if (onCopied) {
      onCopied();
    }
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyWhatsApp = (text: string) => {
    // WhatsApp format: formatted text ready to paste
    const waText = text;
    navigator.clipboard.writeText(waText);
    neuroAudio.triggerVibration([50, 30, 50]);
    setCopiedType('whatsapp');
    if (onCopied) {
      onCopied();
    }
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      neuroAudio.stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      neuroAudio.speakSpanish(script.audioGuidanceText, () => {
        setIsSpeaking(false);
      });
    }
  };

  // Render text with highlighted [variables]
  const renderMessageWithVariables = (raw: string) => {
    const parts = raw.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span
            key={index}
            className="px-1.5 py-0.5 mx-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`p-4 rounded-2xl border transition-all text-left space-y-3.5 ${
      isUnlocked
        ? 'bg-slate-950/80 border-white/10'
        : 'bg-slate-950/50 border-white/5 hover:border-amber-500/25'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
              {script.title}
            </h4>
            {script.isFreePreview && accessLevel !== 'completo' && (
              <span className="px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Ejemplo
              </span>
            )}
            {accessLevel === 'completo' && (
              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                ✅ Desbloqueado
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            <strong>Objetivo:</strong> {script.objective}
          </p>
        </div>

        {/* Action button if locked */}
        {!isUnlocked && (
          <button
            onClick={onOpenPaywall}
            className="min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 flex items-center gap-1 shrink-0 transition-all active:scale-95"
          >
            <span>Obtener este script</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Unlocked content: message, buttons, decision trees, timing */}
      {isUnlocked ? (
        <div className="space-y-3 pt-1">
          {/* Calm-down prompt before Paquete 4 script */}
          {script.calmDownRequired && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-xs text-rose-200">
                <HeartPulse className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
                <span>Primero respira 60 segundos, después usa el script.</span>
              </div>
              {onOpenPanicBreathing && (
                <button
                  onClick={onOpenPanicBreathing}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-[10px] font-bold text-rose-200 border border-rose-500/30 shrink-0 transition-colors"
                >
                  Respirar ahora
                </button>
              )}
            </div>
          )}

          {/* Timing Instruction Card */}
          {script.timingInstruction && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{script.timingInstruction}</span>
            </div>
          )}

          {/* Script Text Box with [variables] */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-emerald-300 font-mono-numbers leading-relaxed selectable-text selection:bg-emerald-500/30">
            "{renderMessageWithVariables(script.message)}"
          </div>

          {/* Highlight Note if available */}
          {script.highlightNote && (
            <p className="text-[11px] text-amber-200/90 italic bg-amber-500/[0.04] p-2 rounded-lg border border-amber-500/15">
              💡 {script.highlightNote}
            </p>
          )}

          {/* Scientific Why it works */}
          <div className="space-y-0.5 text-[11px] text-slate-300">
            <p><strong>Por qué funciona:</strong> {script.whyItWorks}</p>
          </div>

          {/* Action Buttons: Copiar, Copiar para WhatsApp, ¿Cómo enviarlo? */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            {/* Copy button */}
            <button
              onClick={() => handleCopyText(script.message)}
              className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                copiedType === 'text'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
              }`}
            >
              {copiedType === 'text' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>📋 Copiar</span>
                </>
              )}
            </button>

            {/* Copy for WhatsApp */}
            <button
              onClick={() => handleCopyWhatsApp(script.message)}
              className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                copiedType === 'whatsapp'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {copiedType === 'whatsapp' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Listo WhatsApp!</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>📱 Copiar para WhatsApp</span>
                </>
              )}
            </button>

            {/* Audio Guidance / Vocal Tone */}
            <button
              onClick={handleToggleSpeech}
              className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                isSpeaking
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 animate-pulse'
                  : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Detener voz</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>🔊 ¿Cómo enviarlo?</span>
                </>
              )}
            </button>
          </div>

          {/* Posture Checklist (Paquete 3) */}
          {script.postureChecklist && script.postureChecklist.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 mt-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Checklist de Postura para el Encuentro:</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {script.postureChecklist.map((rule, idx) => (
                  <li key={idx} className="leading-snug">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Decision Tree Branches */}
          {script.decisionBranches && script.decisionBranches.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                🌳 Árbol de Decisión según la Reacción de Ella:
              </span>
              <div className="grid grid-cols-1 gap-2">
                {script.decisionBranches.map((branch) => (
                  <div
                    key={branch.id}
                    onClick={() => {
                      if (branch.targetScriptId && onSelectTargetScript) {
                        onSelectTargetScript(branch.targetScriptId);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                      branch.targetScriptId && onSelectTargetScript
                        ? 'bg-slate-900/70 border-white/10 hover:border-amber-500/30 cursor-pointer active:scale-[0.99]'
                        : 'bg-slate-900/40 border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-xs">
                        {branch.conditionLabel}
                      </span>
                      {branch.badge && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {branch.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      👉 {branch.recommendation}
                    </p>
                    {branch.targetScriptId && (
                      <span className="text-[10px] font-bold text-amber-400 mt-1 inline-flex items-center gap-1">
                        Ver script vinculado <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Free preview subtle upsell bridge for basic users */}
          {script.isFreePreview && accessLevel !== 'completo' && (
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-amber-500/[0.04] p-2.5 rounded-xl border border-amber-500/20">
              <span className="text-[11px] text-slate-300">
                ¿Te sirvió este ejemplo? Hay más de 20 redacciones probadas con sus árboles de decisión en el Acelerador 89%.
              </span>
              <button
                onClick={onOpenPaywall}
                className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline whitespace-nowrap self-start sm:self-auto"
              >
                Acelerar mi resultado →
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Locked teaser card (Value-framed, title + objective, no dead padlock) */
        <div 
          onClick={onOpenPaywall}
          className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-2 cursor-pointer hover:border-amber-500/30 transition-colors"
        >
          <span className="text-[11px] text-slate-300">
            Fórmula calibrada para no improvisar en este momento.
          </span>
          <span className="text-[11px] font-bold text-amber-400 shrink-0 flex items-center gap-1">
            <span>Ver fórmula</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      )}
    </div>
  );
};
