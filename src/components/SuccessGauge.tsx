import React from 'react';
import { TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { AccessLevel } from '../types/protocol';

interface SuccessGaugeProps {
  percentage: number;
  completedItemsCount: number;
  totalItemsCount: number;
  accessLevel: AccessLevel;
}

export const SuccessGauge: React.FC<SuccessGaugeProps> = ({
  percentage,
  completedItemsCount,
  totalItemsCount,
  accessLevel,
}) => {
  // SVG gauge constants
  const size = 170;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc angle from -210 deg to +30 deg (240 deg arc)
  const arcLength = circumference * (240 / 360);
  const strokeDashoffset = arcLength - (arcLength * (percentage / 100));

  const isCompleto = accessLevel === 'completo';

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 text-left relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 tracking-tight">
              Probabilidad de Éxito
            </h3>
            <p className="text-[11px] text-slate-400">
              Cálculo conductual según tu nivel de disciplina
            </p>
          </div>
        </div>

        <div className="text-[11px] font-mono-numbers text-slate-400">
          Checklist: {completedItemsCount}/{totalItemsCount}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 my-2">
        {/* Semi-circular Gauge Graphic */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg
            width={size}
            height={size * 0.72}
            viewBox={`0 0 ${size} ${size * 0.72}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="45%" stopColor="#F59E0B" />
                <stop offset="85%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#00FF87" />
              </linearGradient>
            </defs>
            {/* Background Arc */}
            <circle
              cx={size / 2}
              cy={size * 0.58}
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              transform={`rotate(-210 ${size / 2} ${size * 0.58})`}
            />
            {/* Value Arc */}
            <circle
              cx={size / 2}
              cy={size * 0.58}
              r={radius}
              fill="transparent"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-210 ${size / 2} ${size * 0.58})`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Metric inside */}
          <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black tracking-tight font-mono-numbers text-white">
              {percentage}%
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              {isCompleto ? 'Aceleración Activa' : 'Índice Actual'}
            </span>
          </div>
        </div>

        {/* Narrative & Subtle Hint */}
        <div className="flex-1 space-y-2 text-left">
          <p className="text-xs text-slate-300 leading-relaxed">
            {isCompleto
              ? 'Con tu Acelerador activo y la ejecución del checklist, operas en la máxima ventana de atracción neuroquímica.'
              : 'Cada acción de autocontrol completada en el checklist refuerza tu calma y eleva progresivamente tus probabilidades.'}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400/90 font-medium pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              {isCompleto
                ? '✅ Precisión quirúrgica activada (89%)'
                : 'Base de silencio: 54% + Disciplina diaria'}
            </span>
          </div>

          {/* Subtle Hint */}
          <div className="pt-1.5 border-t border-white/5">
            <p className="text-xs text-slate-400 italic">
              {isCompleto
                ? '"Tu marco de templanza y tus palabras exactas están calibrados al 89%."'
                : '"Los que dominan sus palabras llegan al 89%."'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
