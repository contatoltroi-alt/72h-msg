import React, { useState } from 'react';
import { deriveNameFromEmail } from '../utils/nameHelper';

interface OnboardingScreenProps {
  onComplete: (email: string, name: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Purely synchronous format validation: must contain @ and a domain with at least 1 dot
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Por favor ingresa un correo electrónico válido (ej: tu@email.com)');
      return;
    }

    // Immediate visual feedback on the button
    setIsSubmitting(true);
    setError('');

    const derivedName = deriveNameFromEmail(trimmed);

    // Synchronous localStorage persistence with memory fallback
    try {
      localStorage.setItem('userEmail', trimmed);
      localStorage.setItem('userName', derivedName);
      localStorage.setItem('protocolo_72h_v3_userEmail', trimmed);
      localStorage.setItem('protocolo_72h_v3_userName', derivedName);
    } catch {
      // Continue in memory
    }

    // Immediately trigger state change in parent without waiting
    onComplete(trimmed, derivedName);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting - static CSS radial gradient (zero GPU blur penalty) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 60%), radial-gradient(circle at 50% 90%, rgba(245, 158, 11, 0.03) 0%, transparent 60%)'
        }}
      />

      {/* Main card - solid dark background, zero backdrop-filter */}
      <div className="w-full max-w-[440px] rounded-3xl p-6 sm:p-8 bg-[#0c1222] border border-white/10 shadow-2xl text-center space-y-6 relative z-10">
        {/* Brand Shield Icon (Inline SVG for zero boot dependency) */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
          <svg className="w-8 h-8 fill-slate-950 stroke-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>
        </div>

        {/* Title & Value Line */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Protocolo 72H
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
            Tu asistente de reconquista en tiempo real. Empieza tu protocolo en 30 segundos.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label htmlFor="mobile-login-email" className="text-xs font-bold text-slate-300 block">
              Tu correo electrónico
            </label>
            <input
              id="mobile-login-email"
              type="email"
              autoFocus
              required
              placeholder="ejemplo: carlos@gmail.com"
              value={email}
              disabled={isSubmitting}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors font-medium"
            />
            {error && (
              <p className="text-[11px] text-rose-400 font-medium pl-1">
                {error}
              </p>
            )}
          </div>

          {/* CTA Button with immediate visual feedback */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-5 rounded-2xl font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform ${
              isSubmitting 
                ? 'bg-emerald-400 text-slate-950 opacity-90' 
                : 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 text-slate-950 hover:brightness-105'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span>Iniciando Protocolo...</span>
              </>
            ) : (
              <>
                <span>⚡ Empezar Mi Protocolo</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Tiny reassurance text */}
        <div className="pt-2 border-t border-white/5 space-y-1">
          <p className="text-[11px] text-slate-400 font-medium">
            Sin contraseñas. Sin verificaciones. Acceso inmediato.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
            <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>Tus datos se guardan únicamente en este dispositivo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
