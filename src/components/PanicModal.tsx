import React, { useState, useEffect } from 'react';
import { 
  AlertOctagon, X, Volume2, Play, Pause, HeartPulse, 
  RefreshCw, ArrowRight, ShieldAlert, Sparkles, Check, Sliders 
} from 'lucide-react';
import { AUDIO_TRACKS } from '../data/protocolData';
import { AccessLevel } from '../types/protocol';
import { neuroAudio } from '../utils/audioSynthesizer';

interface PanicModalProps {
  userName: string;
  accessLevel: AccessLevel;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHub: () => void;
  onNavigateToPackage4: () => void;
  onLogImpulse: (intensity: number, trigger: string, note?: string) => void;
}

export const PanicModal: React.FC<PanicModalProps> = ({
  userName,
  accessLevel,
  isOpen,
  onClose,
  onNavigateToHub,
  onNavigateToPackage4,
  onLogImpulse,
}) => {
  // 90s Guided Breathing
  const [breathingSecondsLeft, setBreathingSecondsLeft] = useState(90);
  const [isBreathingActive, setIsBreathingActive] = useState(true);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  
  // Audio player & Speech state
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaybackSeconds, setAudioPlaybackSeconds] = useState(0);
  const [speakingTrackId, setSpeakingTrackId] = useState<string | null>(null);

  // Journal form state
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [intensity, setIntensity] = useState(7);
  const [trigger, setTrigger] = useState('Vi su última conexión');
  const [journalNote, setJournalNote] = useState('');
  const [loggedSuccess, setLoggedSuccess] = useState(false);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setBreathingSecondsLeft(90);
      setIsBreathingActive(true);
      setBreathPhase('inhale');
      setLoggedSuccess(false);
      setShowJournalForm(false);
      neuroAudio.playAlertPing();
      neuroAudio.triggerVibration([100, 60, 100]);
    } else {
      document.body.style.overflow = '';
      neuroAudio.stopSoothingTrack();
      neuroAudio.stopSpeech();
      setIsPlayingAudio(false);
      setActiveAudioId(null);
      setSpeakingTrackId(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Breathing loop: 90 seconds
  useEffect(() => {
    if (!isOpen || !isBreathingActive || breathingSecondsLeft <= 0) return;

    const interval = setInterval(() => {
      setBreathingSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsBreathingActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isBreathingActive, breathingSecondsLeft]);

  // Rhythm cycle manager for 4s inhale -> 4s hold -> 6s exhale (14s total cycle)
  useEffect(() => {
    if (!isOpen || !isBreathingActive || breathingSecondsLeft <= 0) return;

    const cyclePos = (90 - breathingSecondsLeft) % 14;
    let nextPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';

    if (cyclePos < 4) {
      nextPhase = 'inhale';
    } else if (cyclePos < 8) {
      nextPhase = 'hold';
    } else {
      nextPhase = 'exhale';
    }

    if (nextPhase !== breathPhase) {
      setBreathPhase(nextPhase);
      neuroAudio.triggerVibration(80);
      if (nextPhase === 'inhale') {
        neuroAudio.playBreathingCue('inhale');
      } else if (nextPhase === 'exhale') {
        neuroAudio.playBreathingCue('exhale');
      }
    }
  }, [isOpen, isBreathingActive, breathingSecondsLeft, breathPhase]);

  // Audio playback counter
  useEffect(() => {
    if (!isPlayingAudio) return;
    const timer = setInterval(() => {
      setAudioPlaybackSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const toggleAudio = (trackId: string) => {
    if (activeAudioId === trackId && isPlayingAudio) {
      neuroAudio.stopSoothingTrack();
      setIsPlayingAudio(false);
    } else {
      const track = AUDIO_TRACKS.find((t) => t.id === trackId);
      const freq = track?.frequency.includes('528') ? 528 : track?.frequency.includes('639') ? 639 : 432;
      neuroAudio.startSoothingTrack(freq);
      setActiveAudioId(trackId);
      setIsPlayingAudio(true);
      setAudioPlaybackSeconds(0);
    }
  };

  const handleSpeakIntervention = (trackId: string, text: string) => {
    if (speakingTrackId === trackId) {
      neuroAudio.stopSpeech();
      setSpeakingTrackId(null);
    } else {
      setSpeakingTrackId(trackId);
      neuroAudio.speakSpanish(text, () => {
        setSpeakingTrackId(null);
      });
    }
  };

  const restartBreathing = () => {
    setBreathingSecondsLeft(90);
    setIsBreathingActive(true);
    setBreathPhase('inhale');
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    onLogImpulse(intensity, trigger, journalNote);
    setLoggedSuccess(true);
    setTimeout(() => {
      setShowJournalForm(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Bottom Sheet Container */}
      <div className="w-full max-w-[480px] max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border-t sm:border border-rose-500/30 shadow-2xl overflow-y-auto p-5 sm:p-6 text-left space-y-4 animate-in slide-in-from-bottom-8 duration-300 relative">
        {/* Drag handle affordance on mobile */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto -mt-1 mb-2 block sm:hidden" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
          <div className="flex items-center gap-2 text-rose-400">
            <HeartPulse className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest">
              Espacio de Contención de Impulso
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Main Experience: 90s Guided Breathing Animation with expanding circle */}
        <div className="rounded-3xl p-5 sm:p-6 bg-slate-950/80 border border-emerald-500/30 text-center space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">
              Regulación Nerviosa de 90 Segundos
            </span>
            <span className="text-xs font-mono-numbers text-slate-400">
              {breathingSecondsLeft > 0 ? `${breathingSecondsLeft}s` : '✓ Completado'}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-black text-white">
              Respira, {userName}. Todo va a estar bien.
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Sincroniza tu respiración con el círculo. La vibración táctil marca cada fase. Inhala 4s → Sostén 4s → Exhala 6s.
            </p>
          </div>

          {/* Breathing Animated Sphere */}
          <div className="relative h-44 flex items-center justify-center my-2">
            <div
              className={`absolute rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale'
                  ? 'w-40 h-40 bg-emerald-500/20 scale-125'
                  : breathPhase === 'hold'
                  ? 'w-40 h-40 bg-amber-500/20 scale-125'
                  : 'w-24 h-24 bg-rose-500/10 scale-90'
              }`}
            />
            <div
              className={`relative z-10 rounded-full flex flex-col items-center justify-center transition-all duration-1000 border-2 ${
                breathPhase === 'inhale'
                  ? 'w-32 h-32 bg-emerald-950/80 border-emerald-400 text-emerald-200 glow-green'
                  : breathPhase === 'hold'
                  ? 'w-32 h-32 bg-amber-950/80 border-amber-400 text-amber-200 glow-gold'
                  : 'w-24 h-24 bg-slate-900/90 border-slate-600 text-slate-300'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                {breathPhase === 'inhale'
                  ? 'Inhala'
                  : breathPhase === 'hold'
                  ? 'Sostén'
                  : 'Exhala'}
              </span>
              <span className="text-xl font-mono-numbers font-black mt-0.5">
                {breathingSecondsLeft}s
              </span>
              <span className="text-[9px] text-slate-400 uppercase tracking-tighter">
                {breathPhase === 'inhale' ? '4s por la nariz' : breathPhase === 'hold' ? '4s en calma' : '6s por la boca'}
              </span>
            </div>
          </div>

          {breathingSecondsLeft === 0 ? (
            <button
              onClick={restartBreathing}
              className="min-h-[44px] px-4 text-xs font-bold text-slate-200 hover:text-white bg-white/10 rounded-xl flex items-center justify-center gap-1.5 mx-auto active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Repetir ciclo de respiración</span>
            </button>
          ) : (
            <p className="text-[11px] text-slate-400">
              Inhala (4s) · Sostén (4s) · Exhala lento (6s)
            </p>
          )}

          {/* Quick Impulse Journal Trigger */}
          {!showJournalForm && !loggedSuccess && (
            <button
              onClick={() => setShowJournalForm(true)}
              className="min-h-[44px] flex items-center justify-center text-xs font-semibold text-amber-300 hover:text-amber-200 underline mx-auto active:scale-95"
            >
              + Registrar este impulso en mi Diario (Intensidad 1-10)
            </button>
          )}

          {/* Inline Journal Form */}
          {showJournalForm && !loggedSuccess && (
            <form onSubmit={handleSaveJournal} className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-left space-y-3 mt-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  Registro Rápido de Ansiedad
                </span>
                <span className="text-xs font-mono-numbers text-amber-400 font-bold">
                  Nivel {intensity}/10
                </span>
              </div>

              <div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  ¿Cuál fue el detonante?
                </label>
                <select
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="w-full min-h-[42px] px-3 rounded-xl bg-slate-950 border border-white/15 text-xs text-white"
                >
                  <option value="Vi su última conexión">Vi su última conexión</option>
                  <option value="Subió una historia o foto">Subió una historia o foto</option>
                  <option value="Me acordé de una fecha especial">Me acordé de una fecha especial</option>
                  <option value="La soledad de la noche">La soledad de la noche</option>
                  <option value="Miedo a que conozca a alguien">Miedo a que conozca a alguien</option>
                  <option value="Otro detonante">Otro detonante</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Nota breve (opcional)..."
                  value={journalNote}
                  onChange={(e) => setJournalNote(e.target.value)}
                  className="w-full min-h-[42px] px-3 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder:text-slate-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 min-h-[40px] py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs active:scale-95 transition-all"
                >
                  Guardar en mi Diario
                </button>
                <button
                  type="button"
                  onClick={() => setShowJournalForm(false)}
                  className="px-3 min-h-[40px] rounded-xl bg-white/5 text-slate-400 text-xs hover:text-white"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {loggedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>¡Impulso registrado con éxito! Tu templanza aumenta.</span>
            </div>
          )}
        </div>

        {/* 2. Empathetic Educational Text: Why impulse messaging destroys attraction */}
        <div className="rounded-3xl p-5 bg-slate-950/70 border border-white/10 space-y-2.5">
          <h3 className="text-sm font-bold text-slate-100">
            ¿Por qué escribir por impulso destruye la atracción?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cuando experimentamos la angustia del silencio, nuestro cerebro busca una recompensa inmediata para apagar el dolor. Creemos falsamente que un mensaje disipará la incomodidad, pero en realidad le traslada a ella el peso de calmar tu ansiedad.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Un texto enviado desde el desespero no comunica amor ni interés genuino: comunica que no puedes sostener tu propio eje. La atracción florece en la templanza y en la capacidad de darle al otro el espacio que pidió sin cobrarle una factura emocional.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Permite que pasen al menos unas horas. El 90% de los mensajes que parecían urgentes en la noche resultan vergonzosos al día siguiente con la mente descansada.
          </p>
        </div>

        {/* 3. Audio section: Intervenciones de Calma with SpeechSynthesis guidance */}
        <div className="rounded-3xl p-5 bg-slate-950/70 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>🎧 Intervenciones de Calma con Guía por Voz</span>
          </div>

          <div className="space-y-2.5">
            {AUDIO_TRACKS.map((track) => {
              const isCurrentPlaying = activeAudioId === track.id && isPlayingAudio;
              const isSpokenCurrent = speakingTrackId === track.id;

              return (
                <div
                  key={track.id}
                  className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                    isCurrentPlaying || isSpokenCurrent
                      ? 'bg-emerald-500/10 border-emerald-500/40 glow-green'
                      : 'bg-white/[0.03] border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button
                        onClick={() => toggleAudio(track.id)}
                        className={`min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                          isCurrentPlaying
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {isCurrentPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-200 truncate">
                          {track.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate">
                          {track.frequency} · {Math.floor(track.durationSeconds / 60)} min
                        </p>
                      </div>
                    </div>

                    {track.spokenGuidance && (
                      <button
                        onClick={() => handleSpeakIntervention(track.id, track.spokenGuidance!)}
                        className={`min-h-[38px] px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-all active:scale-95 ${
                          isSpokenCurrent
                            ? 'bg-amber-500 text-slate-950 animate-pulse'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                        }`}
                      >
                        <span>{isSpokenCurrent ? 'Pausar voz' : '🔊 Escuchar voz'}</span>
                      </button>
                    )}
                  </div>

                  {track.spokenGuidance && (
                    <p className="text-[11px] text-slate-300 italic bg-slate-900/60 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                      "{track.spokenGuidance}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Link directly to Paquete 4 (Escudo Anti-Frieza & 'Necesito Tiempo') */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-white">
              ¿Ella pidió tiempo o te dejó en visto?
            </h4>
            <p className="text-[11px] text-slate-400">
              Usa el Escudo de Madurez (Paquete 4) para desactivar la fricción sin humillarte.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onNavigateToPackage4();
            }}
            className="min-h-[42px] px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold shrink-0 flex items-center gap-1 active:scale-95 transition-all"
          >
            <span>Ver Paquete 4</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5. For basic users only: ONE small text link at the bottom (NO price) */}
        {accessLevel !== 'completo' && (
          <div className="pt-2 text-center pb-2">
            <button
              onClick={() => {
                onClose();
                onNavigateToHub();
              }}
              className="min-h-[44px] px-3 text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-medium underline active:scale-95"
            >
              <span>¿Necesitas las palabras exactas? → Herramientas</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
