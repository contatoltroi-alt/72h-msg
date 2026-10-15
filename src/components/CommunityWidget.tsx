import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { COMMUNITY_ACTIVITIES, CommunityActivityEntry } from '../data/communityData';

interface CommunityWidgetProps {
  variant?: 'dashboard' | 'hub';
  onOpenPaywall: () => void;
}

export const CommunityWidget: React.FC<CommunityWidgetProps> = ({
  variant = 'dashboard',
  onOpenPaywall,
}) => {
  // Member counter fluctuating ±3 every 60s, base ~187, never below 170
  const [memberCount, setMemberCount] = useState<number>(() => {
    const saved = localStorage.getItem('protocolo_community_count');
    return saved ? Math.max(170, parseInt(saved, 10)) : 187;
  });

  // Current rotating activity index (every ~45s)
  const [activityIndex, setActivityIndex] = useState<number>(0);

  // Counter fluctuation effect (every 60s)
  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount((prev) => {
        // Delta between -3 and +3
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = Math.max(170, Math.min(215, prev + delta));
        localStorage.setItem('protocolo_community_count', String(next));
        return next;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Activity rotation effect (every 45s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % COMMUNITY_ACTIVITIES.length);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const currentActivity: CommunityActivityEntry = COMMUNITY_ACTIVITIES[activityIndex];

  const handleActivityClick = () => {
    if (currentActivity.isProtocolRelated) {
      onOpenPaywall();
    }
  };

  return (
    <div className={`text-left transition-all ${
      variant === 'hub'
        ? 'p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3'
        : 'p-3.5 sm:p-4 rounded-2xl glass-panel space-y-2.5'
    }`}>
      {/* Member Counter Header with Pulsing Green Dot */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">🔥</span>
          <span className="text-xs font-bold text-slate-100 tracking-tight">
            Comunidad Activa — <span className="text-emerald-400 font-mono-numbers">{memberCount}</span> en el protocolo esta semana
          </span>
        </div>

        {/* Live Pulsing Dot */}
        <div className="flex items-center gap-1.5 shrink-0" title="Actividad semanal verificada">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>

      {/* Single Rotating Activity Entry */}
      <div
        onClick={handleActivityClick}
        className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
          currentActivity.isProtocolRelated
            ? 'bg-amber-500/[0.05] border-amber-500/25 hover:border-amber-500/40 cursor-pointer active:scale-[0.99]'
            : 'bg-slate-950/60 border-white/5'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar with Initials */}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border ${currentActivity.avatarBg}`}>
            {currentActivity.initials}
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-200 leading-snug truncate">
              <strong className="text-white font-semibold">{currentActivity.userLabel}</strong>{' '}
              <span className="text-slate-300">{currentActivity.action}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-right">
          <span className="text-[10px] text-slate-400 font-mono-numbers">
            {currentActivity.timestampText}
          </span>
          {currentActivity.isProtocolRelated && (
            <ArrowRight className="w-3 h-3 text-amber-400" />
          )}
        </div>
      </div>
    </div>
  );
};
