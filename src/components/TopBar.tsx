import React from 'react';
import { Shield, HeartPulse, Wrench } from 'lucide-react';
import { PhaseNumber } from '../types/protocol';

interface TopBarProps {
  userName: string;
  isProtocolActive: boolean;
  currentPhase: PhaseNumber;
  isUnlocked: boolean;
  onOpenPanic: () => void;
  onToggleDevBar: () => void;
  onOpenProfile: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  userName,
  isProtocolActive,
  currentPhase,
  isUnlocked,
  onOpenPanic,
  onToggleDevBar,
  onOpenProfile,
}) => {
  const initial = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <header className="sticky top-0 z-40 bg-[#070b14] border-b border-white/10 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* User Greeting & Profile trigger */}
        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="Ver mi perfil"
        >
          {/* Avatar with initial */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
            {initial}
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-white tracking-tight">
                Hola, {userName} 👋
              </span>
              {isUnlocked && (
                <span className="px-1.5 py-0.2 rounded text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  PRO
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium">
              {isProtocolActive ? 'Tu protocolo está activo' : 'Tu protocolo te espera'}
            </span>
          </div>
        </div>

        {/* Right Actions: S.O.S Panic Button + Dev Toolbar Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenPanic}
            className="py-1.5 px-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 hover:bg-rose-500/25 active:scale-95 transition-all text-xs font-bold flex items-center gap-1.5 glow-red shadow-sm"
          >
            <HeartPulse className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="uppercase text-[11px] tracking-wide font-extrabold">S.O.S</span>
          </button>

          <button
            onClick={onToggleDevBar}
            title="Herramientas de simulación rápida"
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <Wrench className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
