import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle2, AlertCircle, Sparkles, ShieldAlert } from 'lucide-react';
import { ACCESS_CODE_VALID } from '../data/protocolData';
import { neuroAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeSuccess: () => void;
}

const MAX_FAILED_ATTEMPTS = 3;

export const AccessCodeModal: React.FC<AccessCodeModalProps> = ({
  isOpen,
  onClose,
  onCodeSuccess,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      const stored = sessionStorage.getItem('access_code_fails');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });

  const isLocked = failedAttempts >= MAX_FAILED_ATTEMPTS;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCode('');
      setError(null);
      setIsSuccess(false);
      try {
        const stored = sessionStorage.getItem('access_code_fails');
        if (stored) {
          const count = parseInt(stored, 10);
          setFailedAttempts(count);
          if (count >= MAX_FAILED_ATTEMPTS) {
            setError('Has superado el límite de intentos permitidos para esta sesión.');
          }
        }
      } catch {}
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    const cleanCode = code.trim().toUpperCase();

    if (!cleanCode) {
      setError('Por favor ingresa un código.');
      return;
    }

    if (cleanCode === ACCESS_CODE_VALID) {
      setIsSuccess(true);
      setError(null);
      try {
        sessionStorage.removeItem('access_code_fails');
        sessionStorage.removeItem('access_code_locked');
      } catch {}
      neuroAudio.playVictoryChime();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#F59E0B', '#00FF87']
        });
      } catch {}
      setTimeout(() => {
        onCodeSuccess();
        onClose();
      }, 1400);
    } else {
      const newFails = failedAttempts + 1;
      setFailedAttempts(newFails);
      try {
        sessionStorage.setItem('access_code_fails', String(newFails));
      } catch {}

      if (newFails >= MAX_FAILED_ATTEMPTS) {
        try {
          sessionStorage.setItem('access_code_locked', 'true');
        } catch {}
        setError('Has superado el límite de 3 intentos permitidos para esta sesión.');
      } else {
        const remaining = MAX_FAILED_ATTEMPTS - newFails;
        setError(`Código no válido. Intentos restantes: ${remaining}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[440px] rounded-t-3xl sm:rounded-3xl bg-slate-900 border-t sm:border border-amber-500/40 shadow-2xl p-5 sm:p-6 text-left space-y-4 animate-in slide-in-from-bottom-6 duration-300 relative">
        {/* Mobile handle */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto -mt-1 mb-2 block sm:hidden" />

        {/* Close Button (44px+ touch area) */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Key className="w-3 h-3 text-amber-400" />
            <span>Validación de Acceso</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Ingresar Código de Acceso
          </h3>
          <p className="text-xs text-slate-400">
            Si adquiriste el Protocolo con anterioridad o recibiste un código prioritario, ingrésalo aquí.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">
              ¡Acceso Completo Verificado!
            </h4>
            <p className="text-xs text-emerald-300">
              Desbloqueando tu Acelerador 89% y todos los paquetes...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            <div>
              <label htmlFor="accessCodeInput" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Código de Activación
              </label>
              <input
                id="accessCodeInput"
                type="text"
                value={code}
                disabled={isLocked}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(null);
                }}
                placeholder="Código de acceso"
                className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white font-mono-numbers text-sm uppercase placeholder:normal-case placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                autoCapitalize="characters"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {error && (
                <div className={`flex items-center gap-1.5 text-xs mt-1.5 ${isLocked ? 'text-amber-400' : 'text-rose-400'}`}>
                  {isLocked ? (
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  )}
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLocked}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Activar Acceso Completo</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
