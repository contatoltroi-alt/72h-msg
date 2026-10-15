import React, { useState, useEffect } from 'react';
import { X, User, Mail, Calendar, LogOut, Check, Edit2, Shield, Clock } from 'lucide-react';
import { PhaseNumber } from '../types/protocol';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  startTime: number | null;
  currentPhase: PhaseNumber;
  onUpdateUser: (newName: string, newEmail: string) => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  startTime,
  currentPhase,
  onUpdateUser,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onUpdateUser(name.trim(), email.trim());
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const formattedDate = startTime
    ? new Date(startTime).toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'No iniciado aún';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[480px] max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl bg-slate-900 border-t sm:border border-white/10 shadow-2xl overflow-y-auto p-5 sm:p-6 text-left space-y-4 animate-in slide-in-from-bottom-8 duration-300 relative">
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto -mt-1 mb-2 block sm:hidden" />

        {/* Close Button (44px+ touch area) */}
        <button
          onClick={onClose}
          aria-label="Cerrar perfil"
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Avatar & Title */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-emerald-500/20">
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 className="text-base font-black text-white">
              {userName}
            </h3>
            <p className="text-xs text-slate-400 truncate max-w-[220px]">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Status Strip */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              Inicio Protocolo
            </span>
            <p className="font-semibold text-slate-200 font-mono-numbers text-[11px] truncate">
              {formattedDate}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase font-medium flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              Fase Actual
            </span>
            <p className="font-bold text-emerald-400 text-[11px]">
              Fase {currentPhase} Activa
            </p>
          </div>
        </div>

        {/* Edit Form or Information Card */}
        {isEditing ? (
          <form onSubmit={handleSave} className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3.5 text-xs">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Nombre para saludos:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-base sm:text-xs p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Correo electrónico:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-base sm:text-xs p-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 min-h-[48px] py-2 px-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar cambios</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="min-h-[48px] px-4 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs active:scale-95 transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 block font-medium">
                Personalización de la App
              </span>
              <p className="text-slate-200">
                Los mensajes y recordatorios se adaptan a tu nombre.
              </p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="min-h-[44px] px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-xs font-semibold active:scale-95"
            >
              <Edit2 className="w-3 h-3 text-emerald-400" />
              <span>Editar</span>
            </button>
          </div>
        )}

        {savedSuccess && (
          <p className="text-center text-xs font-semibold text-emerald-400 animate-in fade-in">
            ✓ Datos actualizados correctamente
          </p>
        )}

        {/* Logout Button */}
        <div className="pt-2 border-t border-white/5 pb-2">
          <button
            onClick={() => {
              if (window.confirm('¿Deseas cerrar sesión? Esto te llevará de vuelta a la pantalla de bienvenida.')) {
                onLogout();
                onClose();
              }
            }}
            className="w-full min-h-[48px] py-3 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
