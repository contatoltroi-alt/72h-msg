import React, { useState } from 'react';
import { Play, RotateCcw, Clock, Brain, Sparkles, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PHASES_DETAILED } from '../data/protocolData';
import { PhaseNumber } from '../types/protocol';

interface CountdownHeroProps {
  startTime: number | null;
  elapsedSeconds: number;
  currentPhase: PhaseNumber;
  onStart: () => void;
  onReset: () => void;
  onOpenPreparation: (phase: PhaseNumber) => void;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({
  startTime,
  elapsedSeconds,
  currentPhase,
  onStart,
  onReset,
  onOpenPreparation,
}) => {
  const [isReadingExpanded, setIsReadingExpanded] = useState(false);

  const TOTAL_SECONDS = 72 * 3600;
  const remainingSeconds = Math.max(0, TOTAL_SECONDS - elapsedSeconds);

  const hoursRemaining = Math.floor(remainingSeconds / 3600);
  const minutesRemaining = Math.floor((remainingSeconds % 3600) / 60);
  const secondsRemaining = Math.floor(remainingSeconds % 60);

  const phase = PHASES_DETAILED[currentPhase];
  const pad = (n: number) => String(n).padStart(2, '0');

  const getPhaseBadgeColor = () => {
    switch (currentPhase) {
      case 1:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 2:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 3:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    }
  };

  const getPhaseGlow = () => {
    switch (currentPhase) {
      case 1:
        return 'from-rose-500/15 via-slate-900 to-slate-950 border-rose-500/30';
      case 2:
        return 'from-amber-500/15 via-slate-900 to-slate-950 border-amber-500/30';
      case 3:
        return 'from-emerald-500/15 via-slate-900 to-slate-950 border-emerald-500/30';
    }
  };

  return (
    <div className={`rounded-3xl p-5 sm:p-6 bg-gradient-to-b ${getPhaseGlow()} border relative overflow-hidden transition-all duration-500 text-left space-y-4`}>
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-1.5 font-mono-numbers">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          Cronómetro Neuroquímico (72 Horas)
        </span>

        {startTime && (
          <button
            onClick={onReset}
            title="Reiniciar cronómetro"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {!startTime ? (
        <div className="text-center py-6 px-2 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center glow-green">
            <Brain className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Inicia el Cronómetro de 72 Horas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mt-1.5 leading-relaxed">
              El cerebro femenino atraviesa tres ventanas neuroquímicas tras un distanciamiento. Inicia tu protocolo para sincronizar tu estrategia paso a paso.
            </p>
          </div>

          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Iniciar Protocolo 72H</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Active Phase Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getPhaseBadgeColor()}`}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.colorHex }} />
              <span>Fase {phase.number}: {phase.title}</span>
              <span className="text-slate-400 font-normal">({phase.hoursRange})</span>
            </div>

            <div className="text-[11px] font-mono-numbers text-slate-400">
              {Math.min(72, (elapsedSeconds / 3600)).toFixed(1)}h / 72h transcurridas
            </div>
          </div>

          {/* Large Countdown Display */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-20 py-2.5 rounded-2xl bg-slate-950/80 border border-white/10 text-center font-mono-numbers text-3xl sm:text-4xl font-black text-white shadow-inner">
                {pad(hoursRemaining)}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Horas</span>
            </div>
            <span className="text-2xl font-bold text-slate-500 -mt-4">:</span>
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-20 py-2.5 rounded-2xl bg-slate-950/80 border border-white/10 text-center font-mono-numbers text-3xl sm:text-4xl font-black text-white shadow-inner">
                {pad(minutesRemaining)}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Minutos</span>
            </div>
            <span className="text-2xl font-bold text-slate-500 -mt-4">:</span>
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-20 py-2.5 rounded-2xl bg-slate-950/80 border border-white/10 text-center font-mono-numbers text-3xl sm:text-4xl font-black text-white shadow-inner">
                {pad(secondsRemaining)}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Segundos</span>
            </div>
          </div>

          {/* Multi-Segment 3-Phase Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="grid grid-cols-3 gap-1.5 h-2 w-full">
              <div className="h-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, (elapsedSeconds / (24 * 3600)) * 100))}%` }}
                />
              </div>
              <div className="h-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, ((elapsedSeconds - 24 * 3600) / (24 * 3600)) * 100))}%` }}
                />
              </div>
              <div className="h-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, ((elapsedSeconds - 48 * 3600) / (24 * 3600)) * 100))}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-[10px] font-mono-numbers text-slate-400 px-0.5">
              <span className={currentPhase === 1 ? 'text-rose-400 font-bold' : ''}>0h: Silencio</span>
              <span className={currentPhase === 2 ? 'text-amber-400 font-bold' : ''}>24h: Curiosidad</span>
              <span className={currentPhase === 3 ? 'text-emerald-400 font-bold' : ''}>48h: Reconexión</span>
              <span>72h</span>
            </div>
          </div>

          {/* Rich Educational Card for the Current Phase */}
          <div className="rounded-2xl p-4 sm:p-5 bg-slate-950/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-100">
                  Neuroquímica de Ella en Fase {phase.number}
                </h3>
              </div>
              <button
                onClick={() => setIsReadingExpanded(!isReadingExpanded)}
                className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>{isReadingExpanded ? 'Resumir' : 'Leer explicación completa'}</span>
                {isReadingExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-xs font-semibold text-amber-200/90 leading-snug">
              {phase.headline}
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p>{phase.paragraphs[0]}</p>
              
              {isReadingExpanded && (
                <div className="space-y-2.5 pt-1 animate-in fade-in duration-200">
                  <p>{phase.paragraphs[1]}</p>
                  <p>{phase.paragraphs[2]}</p>
                  <p>{phase.paragraphs[3]}</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-white/5 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300">
                <strong className="text-white">Conclusión táctica:</strong> {phase.keyTakeaway}
              </p>
            </div>
          </div>

          {/* THE GUIDED PROGRESSION BRIDGE: "Próximo Paso" Action Card */}
          <div className="rounded-2xl p-4 bg-gradient-to-r from-emerald-500/10 via-slate-950 to-slate-950 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{phase.nextStepCard.statusText}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {phase.nextStepCard.actionText}
            </p>

            <button
              onClick={() => onOpenPreparation(currentPhase)}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span>{phase.nextStepCard.buttonLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
