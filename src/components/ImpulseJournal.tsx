import React, { useState } from 'react';
import { BookOpen, Plus, Flame, Clock, Calendar, Check, AlertCircle } from 'lucide-react';
import { ImpulseLog } from '../types/protocol';

interface ImpulseJournalProps {
  logs: ImpulseLog[];
  onAddLog: (intensity: number, trigger: string, note?: string) => void;
}

const COMMON_TRIGGERS = [
  'Vi una foto o historia suya',
  'Es tarde en la noche / insomnio',
  'Me sentí solo / nostalgia repentina',
  'Amigos en común la mencionaron',
  'Encontré un recuerdo o mensaje viejo',
  'Impulso sin motivo aparente'
];

export const ImpulseJournal: React.FC<ImpulseJournalProps> = ({ logs, onAddLog }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [intensity, setIntensity] = useState<number>(7);
  const [selectedTrigger, setSelectedTrigger] = useState<string>(COMMON_TRIGGERS[0]);
  const [customNote, setCustomNote] = useState<string>('');
  const [justSaved, setJustSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLog(intensity, selectedTrigger, customNote.trim() || undefined);
    setCustomNote('');
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
      setIsFormOpen(false);
    }, 1200);
  };

  const averageIntensity = logs.length > 0 
    ? (logs.reduce((sum, l) => sum + l.intensity, 0) / logs.length).toFixed(1)
    : '0';

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 text-left space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Registro Terapéutico de Impulsos
            </h3>
            <p className="text-[11px] text-slate-400">
              Nombrar el impulso le quita poder fisiológico
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isFormOpen ? 'Cerrar' : 'Anotar'}</span>
        </button>
      </div>

      {/* Stats summary strip */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase font-medium">Impulsos Registrados</span>
          <p className="text-base font-black text-white font-mono-numbers mt-0.5">
            {logs.length}
          </p>
        </div>
        <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase font-medium">Intensidad Promedio</span>
          <p className="text-base font-black text-amber-300 font-mono-numbers mt-0.5">
            {averageIntensity} / 10
          </p>
        </div>
      </div>

      {/* Log Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-3.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200">Nivel de Urgencia / Ansiedad:</span>
            <span className={`font-mono-numbers font-black px-2 py-0.5 rounded text-xs ${
              intensity >= 8 ? 'bg-rose-500/20 text-rose-300' : intensity >= 5 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {intensity} / 10
            </span>
          </div>

          {/* Intensity Slider */}
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 px-1 font-mono-numbers">
            <span>1 (Bajo)</span>
            <span>5 (Moderado)</span>
            <span>10 (Desesperante)</span>
          </div>

          {/* Trigger Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-300 block">
              ¿Qué detonó las ganas de escribirle?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {COMMON_TRIGGERS.map((trig) => (
                <button
                  type="button"
                  key={trig}
                  onClick={() => setSelectedTrigger(trig)}
                  className={`text-left text-xs p-2 rounded-xl border transition-all ${
                    selectedTrigger === trig
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                      : 'bg-white/[0.03] border-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {trig}
                </button>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 block">
              Nota breve o pensamiento (opcional):
            </label>
            <input
              type="text"
              placeholder="Ej: Iba a preguntarle si ya cenó, pero recordé que debo esperar..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={justSaved}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            {justSaved ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>¡Impulso Procesado y Guardado!</span>
              </>
            ) : (
              <span>Guardar en Mi Diario de Impulsos</span>
            )}
          </button>
        </form>
      )}

      {/* Recent Logs List */}
      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-3 italic">
            Aún no has registrado impulsos. Cada vez que sientas ganas de escribirle, anótalo aquí antes de tocar el teclado.
          </p>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {logs.slice().reverse().map((log) => {
              const dateStr = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const dayStr = new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
              return (
                <div
                  key={log.id}
                  className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">
                      {log.trigger}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-numbers font-bold ${
                      log.intensity >= 8
                        ? 'bg-rose-500/20 text-rose-300'
                        : log.intensity >= 5
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      Intensidad {log.intensity}/10
                    </span>
                  </div>

                  {log.note && (
                    <p className="text-[11px] text-slate-400 italic">
                      "{log.note}"
                    </p>
                  )}

                  <div className="text-[10px] text-slate-500 font-mono-numbers pt-0.5">
                    {dayStr} · {dateStr}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
