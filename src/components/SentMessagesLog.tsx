import React, { useState, useEffect } from 'react';
import { 
  History, Clock, CheckCircle2, MessageSquare, Trash2, 
  Sparkles, Plus, AlertCircle, ArrowRight 
} from 'lucide-react';
import { SentScriptLogEntry } from '../types/protocol';
import { SCRIPT_PACKAGES } from '../data/protocolData';

interface SentMessagesLogProps {
  onSelectTargetScript?: (targetScriptId: string) => void;
}

export const SentMessagesLog: React.FC<SentMessagesLogProps> = ({
  onSelectTargetScript,
}) => {
  const [entries, setEntries] = useState<SentScriptLogEntry[]>(() => {
    const saved = localStorage.getItem('protocolo_sent_scripts_log');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Default starter example to show immediate utility
    return [
      {
        id: 'log_init_1',
        scriptId: 's1_1',
        scriptTitle: 'Card 1.1 — El Ancla Nostálgica Neutra',
        packageNumber: 1,
        dateTimestamp: Date.now() - 3600000 * 5,
        herResponse: 'curiosa',
        notes: 'Respondió riéndose y recordando el lugar.',
      }
    ];
  });

  const [isAddingManual, setIsAddingManual] = useState(false);
  const [selectedScriptId, setSelectedScriptId] = useState('s1_1');

  useEffect(() => {
    localStorage.setItem('protocolo_sent_scripts_log', JSON.stringify(entries));
  }, [entries]);

  const handleUpdateResponse = (
    id: string, 
    newResponse: SentScriptLogEntry['herResponse']
  ) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, herResponse: newResponse } : e))
    );
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, notes } : e))
    );
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAddManualEntry = () => {
    let title = 'Script';
    let pkgNum = 1;
    for (const pkg of SCRIPT_PACKAGES) {
      const match = pkg.scripts.find((s) => s.id === selectedScriptId);
      if (match) {
        title = match.title;
        pkgNum = pkg.number;
        break;
      }
    }

    const newEntry: SentScriptLogEntry = {
      id: `sent_${Date.now()}`,
      scriptId: selectedScriptId,
      scriptTitle: title,
      packageNumber: pkgNum,
      dateTimestamp: Date.now(),
      herResponse: 'pendiente',
      notes: '',
    };

    setEntries((prev) => [newEntry, ...prev]);
    setIsAddingManual(false);
  };

  // Helper for recommendation
  const getRecommendation = (response: SentScriptLogEntry['herResponse']) => {
    switch (response) {
      case 'curiosa':
        return {
          text: 'Pasa al Script 2.1 tras 25 min de escasez calibrada.',
          targetScript: 's2_1',
        };
      case 'neutra':
        return {
          text: 'Aplica el Humor Desarmante (Script 2.3) o espera 24h.',
          targetScript: 's2_3',
        };
      case 'fria':
        return {
          text: 'Cierra con alto valor de inmediato: Script 2.5.',
          targetScript: 's2_5',
        };
      case 'visto':
        return {
          text: 'Aplica el Silencio de Oro (Script 4.3). No envíes nada en 72h.',
          targetScript: 's4_3',
        };
      case 'positiva':
        return {
          text: 'Propón el café de 15 min: Script 3.1. ¡Ventana abierta!',
          targetScript: 's3_1',
        };
      default:
        return {
          text: 'Espera su respuesta sin mirar la pantalla constantemente.',
        };
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 text-left space-y-4 border border-emerald-500/20">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <span>Registro de Envíos</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Auto-Guardado
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Historial de scripts utilizados y seguimiento de respuestas de ella
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingManual((prev) => !prev)}
          className="min-h-[36px] px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 flex items-center gap-1 shrink-0 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir</span>
        </button>
      </div>

      {/* Manual Add Card */}
      {isAddingManual && (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3 animate-in fade-in duration-200">
          <div className="text-xs font-bold text-white">
            Registrar nuevo envío manual:
          </div>
          <select
            value={selectedScriptId}
            onChange={(e) => setSelectedScriptId(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {SCRIPT_PACKAGES.map((pkg) => (
              <optgroup key={pkg.id} label={`Paquete ${pkg.number}: ${pkg.title}`}>
                {pkg.scripts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAddingManual(false)}
              className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddManualEntry}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-sm"
            >
              Guardar en Registro
            </button>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-3">
        {entries.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-dashed border-white/10 text-center space-y-1">
            <p className="text-xs text-slate-400">
              Aún no has registrado ningún envío.
            </p>
            <p className="text-[11px] text-slate-500">
              Al hacer clic en "Copiar" en cualquier script, se registrará aquí automáticamente.
            </p>
          </div>
        ) : (
          entries.map((entry) => {
            const rec = getRecommendation(entry.herResponse);
            const dateStr = new Date(entry.dateTimestamp).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={entry.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        Paquete {entry.packageNumber}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {entry.scriptTitle}
                      </h4>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
                    title="Eliminar registro"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Response Selector */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    ¿Cómo reaccionó ella?
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { key: 'pendiente', label: '⏳ En espera' },
                      { key: 'curiosa', label: '💚 Curiosa' },
                      { key: 'neutra', label: '😐 Neutra' },
                      { key: 'fria', label: '❄️ Fría' },
                      { key: 'visto', label: '👀 En visto' },
                      { key: 'positiva', label: '🎯 Positiva' },
                    ].map((opt) => {
                      const isSel = entry.herResponse === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleUpdateResponse(entry.id, opt.key as any)}
                          className={`min-h-[32px] px-2 py-1 rounded-xl text-[10px] font-bold transition-all ${
                            isSel
                              ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                              : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-white/5'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Smart Recommendation Card */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-emerald-300">
                    <strong className="text-white block text-[10px] uppercase tracking-wider">
                      Próximo Paso Sugerido:
                    </strong>
                    <span>{rec.text}</span>
                  </div>
                  {rec.targetScript && onSelectTargetScript && (
                    <button
                      onClick={() => onSelectTargetScript(rec.targetScript!)}
                      className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-[10px] font-bold text-emerald-300 border border-emerald-500/30 shrink-0 flex items-center gap-1"
                    >
                      <span>Ir</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>

                {/* Quick note input */}
                <div>
                  <input
                    type="text"
                    value={entry.notes || ''}
                    placeholder="Añade un apunte (ej. 'Mencionó que sale a las 6')..."
                    onChange={(e) => handleUpdateNotes(entry.id, e.target.value)}
                    className="w-full text-[11px] p-2 rounded-xl bg-slate-950/60 border border-white/5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-white/20"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
