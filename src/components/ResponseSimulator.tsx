import React, { useState } from 'react';
import { 
  Cpu, ArrowRight, CheckCircle2, AlertTriangle, 
  Sparkles, RefreshCw, Eye, ShieldAlert, HeartPulse 
} from 'lucide-react';
import { SCRIPT_PACKAGES } from '../data/protocolData';

interface ResponseSimulatorProps {
  onSelectTargetScript?: (targetScriptId: string) => void;
}

type SimulationReaction = 'positiva' | 'neutra' | 'fria' | 'visto' | 'reclamo';

export const ResponseSimulator: React.FC<ResponseSimulatorProps> = ({
  onSelectTargetScript,
}) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string>('s1_1');
  const [selectedReaction, setSelectedReaction] = useState<SimulationReaction>('positiva');

  // Locate current selected script
  let currentScript = SCRIPT_PACKAGES[0].scripts[0];
  for (const pkg of SCRIPT_PACKAGES) {
    const found = pkg.scripts.find((s) => s.id === selectedScriptId);
    if (found) {
      currentScript = found;
      break;
    }
  }

  // Simulation output logic
  const getSimulationResult = () => {
    switch (selectedReaction) {
      case 'positiva':
        return {
          neuroState: 'Dopamina en ascenso · Cortisol bajo · Efecto Zeigarnik positivo',
          rule: 'PROHIBIDO contestar de inmediato. La mayor trampa es parecer que estabas pegado a la pantalla.',
          action: 'Espera entre 25 y 45 minutos (escasez calibrada). Responde con la mitad del texto de ella usando la Calibración de Progreso Personal (Script 2.1).',
          targetScriptId: 's2_1',
          targetScriptTitle: 'Script 2.1 — Calibración de Progreso Personal',
          tag: 'Ventana Favorable',
          tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        };
      case 'neutra':
        return {
          neuroState: 'Defensiva moderada · Analizando intenciones · Evaluando si buscas algo',
          rule: 'No intentes sobre-explicar el chiste ni justificar por qué escribiste.',
          action: 'Aplica el Humor Desarmante (Script 2.3) o deja pasar 24 a 48 horas en silencio para que el ancla termine de asentarse.',
          targetScriptId: 's2_3',
          targetScriptTitle: 'Script 2.3 — El Humor Desarmante',
          tag: 'Calibración Neutral',
          tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        };
      case 'fria':
        return {
          neuroState: 'Resistencia activa · Amígdala en alerta · Mecanismo de distanciamiento',
          rule: 'CERO preguntas para indagar por qué contesta seca.',
          action: 'Aplica el Cierre Elegante de Alto Valor (Script 2.5). Despídete cordialmente antes de que ella te corte y mantén 7 días de silencio.',
          targetScriptId: 's2_5',
          targetScriptTitle: 'Script 2.5 — Cierre Elegante de Alto Valor',
          tag: 'Retirada Táctica',
          tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
        };
      case 'visto':
        return {
          neuroState: 'Testeo de tolerancia a la frustración · Inversión cero en la pantalla',
          rule: 'Cualquier texto adicional tras un visto equivale a suplicar atención.',
          action: 'Aplica la Regla de Oro (Script 4.3): Silencio absoluto durante mínimo 72 horas. Deja el teléfono y enfócate en tu checklist.',
          targetScriptId: 's4_3',
          targetScriptTitle: 'Script 4.3 — El Silencio ante el Visto',
          tag: 'Escudo Obligatorio',
          tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
        };
      case 'reclamo':
        return {
          neuroState: 'Pico agudo de cortisol reactivo · Memoria emocional negativa activada',
          rule: 'No te defiendas con lógica ni argumentos legales; la emoción no escucha lógica.',
          action: 'Aplica la Desescalada de Reclamo Pasado (Script 4.2). Acolchona con madurez y retira la resistencia de golpe.',
          targetScriptId: 's4_2',
          targetScriptTitle: 'Script 4.2 — Desescalada de Reclamo Pasado',
          tag: 'Acolchonamiento',
          tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
        };
    }
  };

  const result = getSimulationResult();

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 text-left space-y-4 border border-emerald-500/20">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <span>Simulador de Respuestas</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Sandbox Táctico
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Prueba escenarios y obtén la jugada exacta antes de que ella responda
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Script Selector */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          1. Selecciona el script que enviaste o enviarás:
        </label>
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
      </div>

      {/* Step 2: Reaction Options */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          2. ¿Qué respuesta simulada quieres evaluar?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {[
            { key: 'positiva', label: '💚 Positiva / Curiosa' },
            { key: 'neutra', label: '😐 Neutra / Ambigua' },
            { key: 'fria', label: '❄️ Fría / Monosílaba' },
            { key: 'visto', label: '👀 Dejó en Visto' },
            { key: 'reclamo', label: '⚡ Reclamo del Pasado' },
          ].map((item) => {
            const isSel = selectedReaction === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSelectedReaction(item.key as SimulationReaction)}
                className={`min-h-[36px] px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-left transition-all ${
                  isSel
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-950/70 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Instant Simulation Result Card */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3 animate-in fade-in duration-200">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Diagnóstico Neuroquímico Instantáneo
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${result.tagColor}`}>
            {result.tag}
          </span>
        </div>

        {/* State */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-slate-300 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{result.neuroState}</span>
        </div>

        {/* Golden rule callout */}
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-200 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{result.rule}</span>
        </div>

        {/* Recommended action */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            👉 Tu Próxima Jugada Exacta:
          </span>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {result.action}
          </p>

          {/* Link to target script */}
          {result.targetScriptId && onSelectTargetScript && (
            <div className="pt-2">
              <button
                onClick={() => onSelectTargetScript(result.targetScriptId)}
                className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <span>Ver {result.targetScriptTitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
