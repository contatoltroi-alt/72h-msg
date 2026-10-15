import React, { useState } from 'react';
import { 
  BookOpen, Volume2, Play, Pause, ChevronDown, ChevronUp, 
  Copy, Check, Sparkles, Key, ArrowRight, ShieldCheck, Headphones 
} from 'lucide-react';
import { EDUCATIONAL_LESSONS, AUDIO_TRACKS } from '../data/protocolData';
import { AccessLevel } from '../types/protocol';
import { neuroAudio } from '../utils/audioSynthesizer';
import { CommunityWidget } from './CommunityWidget';
import { CentralDeScripts } from './CentralDeScripts';

interface HubTabProps {
  userName: string;
  accessLevel: AccessLevel;
  onOpenPaywall: () => void;
  onOpenAccessCode: () => void;
  onOpenPanicBreathing: () => void;
  initialPackageId?: string;
}

export const HubTab: React.FC<HubTabProps> = ({ 
  userName,
  accessLevel, 
  onOpenPaywall,
  onOpenAccessCode,
  onOpenPanicBreathing,
  initialPackageId,
}) => {
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>('lesson_1');
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleLesson = (id: string) => {
    setExpandedLessonId(expandedLessonId === id ? null : id);
  };

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
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Live Simulated Community Header */}
      <CommunityWidget
        variant="hub"
        onOpenPaywall={accessLevel === 'completo' ? () => {} : onOpenPaywall}
      />

      {/* 2. Central de Scripts — Acelerador 89% (Section 8) */}
      <CentralDeScripts
        userName={userName}
        accessLevel={accessLevel}
        onOpenPaywall={onOpenPaywall}
        onOpenPanicBreathing={onOpenPanicBreathing}
        initialPackageId={initialPackageId}
      />

      {/* 3. Educational Mini-Lessons Section (Free & In-Depth, 5 Lessons) */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Guías y Fundamentos Psicológicos
            </h3>
            <p className="text-[11px] text-slate-400">
              Educación científica para comprender el comportamiento humano
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {EDUCATIONAL_LESSONS.map((lesson) => {
            const isExpanded = expandedLessonId === lesson.id;
            return (
              <div
                key={lesson.id}
                className="rounded-2xl border border-white/5 bg-slate-950/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono-numbers font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {lesson.number}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">
                        {lesson.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {lesson.readTime} · {lesson.summary}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-white/5 text-xs text-slate-300 space-y-3 bg-slate-900/40 animate-in fade-in duration-200">
                    <p className="leading-relaxed text-slate-300">
                      {lesson.content.intro}
                    </p>

                    <div className="space-y-2.5 pt-1">
                      {lesson.content.points.map((pt, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                          <h5 className="font-bold text-slate-100 text-xs">
                            {pt.title}
                          </h5>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {pt.explanation}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/5 text-[11px] text-emerald-300 italic">
                      <strong>Conclusión:</strong> {lesson.content.conclusion}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Audio Interventions Section (Free Continuous Tones) */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Intervenciones de Audio Relajante
            </h3>
            <p className="text-[11px] text-slate-400">
              Frecuencias acústicas continuas para calmar la rumiación
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {AUDIO_TRACKS.map((track) => {
            const isCurrentPlaying = activeAudioId === track.id && isPlayingAudio;
            return (
              <div
                key={track.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isCurrentPlaying
                    ? 'bg-emerald-500/10 border-emerald-500/40 glow-green'
                    : 'bg-slate-950/60 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => toggleAudio(track.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                        isCurrentPlaying
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-white/10 text-white hover:bg-emerald-500/20 hover:text-emerald-300'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-100 truncate">
                        {track.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {track.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-numbers text-emerald-400 shrink-0">
                    {track.frequency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Discreet Code Activation Link (Section 1) */}
      <div className="pt-2 pb-4 text-center">
        {accessLevel === 'completo' ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Acceso Completo Activo</span>
          </div>
        ) : (
          <button
            onClick={onOpenAccessCode}
            className="min-h-[44px] px-3 text-xs text-slate-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 active:scale-95"
          >
            <Key className="w-3.5 h-3.5 text-slate-500 hover:text-amber-400" />
            <span className="underline">Ya tengo un código de acceso</span>
          </button>
        )}
      </div>
    </div>
  );
};
