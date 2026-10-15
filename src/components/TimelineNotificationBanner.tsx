import React from 'react';
import { X, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { TimeTriggeredNotification, AccessLevel } from '../types/protocol';

interface TimelineNotificationBannerProps {
  notification: TimeTriggeredNotification | null;
  accessLevel: AccessLevel;
  onDismiss: (id: string) => void;
  onActionClick: (notification: TimeTriggeredNotification) => void;
}

export const TimelineNotificationBanner: React.FC<TimelineNotificationBannerProps> = ({
  notification,
  accessLevel,
  onDismiss,
  onActionClick,
}) => {
  if (!notification) return null;

  return (
    <div className="relative mx-3.5 sm:mx-4 mt-2 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl shadow-black/40 text-left animate-in slide-in-from-top-3 duration-300">
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="text-lg leading-none shrink-0 mt-0.5" role="img" aria-label="icono">
            {notification.icon}
          </span>
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-xs font-bold text-white leading-tight">
                {notification.title}
              </h4>
              <span className="text-[9px] font-mono-numbers px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                {notification.triggerHour}h
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {notification.message}
            </p>
            {accessLevel === 'completo' ? (
              <p className="text-[10px] text-emerald-300 font-medium">
                ✅ Tus scripts exactos para este momento están listos en Herramientas.
              </p>
            ) : (
              <p className="text-[10px] text-amber-300/90 font-medium">
                💡 Consejo: Mantén la serenidad y revisa la guía antes de responder.
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => onDismiss(notification.id)}
          aria-label="Cerrar notificación"
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 shrink-0 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-mono-numbers">
          Hito de tiempo verificado
        </span>
        <button
          onClick={() => onActionClick(notification)}
          className="min-h-[36px] px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1 transition-all active:scale-95"
        >
          <span>{notification.actionText}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
