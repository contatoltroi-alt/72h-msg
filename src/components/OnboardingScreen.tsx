import React, { useState } from 'react';
import { Shield, Sparkles, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { deriveNameFromEmail } from '../utils/nameHelper';

interface OnboardingScreenProps {
  onComplete: (email: string, name: string) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Basic format validation: must contain @ and a domain with at least 1 dot
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Por favor ingresa un correo electrónico válido (ej: tu@email.com)');
      return;
    }

    setError('');
    const derivedName = deriveNameFromEmail(trimmed);
    onComplete(trimmed, derivedName);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-[440px] rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-2xl text-center space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Brand Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-slate-950 shadow-xl shadow-emerald-500/25 glow-green">
          <Shield className="w-8 h-8 fill-slate-950 stroke-slate-950" />
        </div>

        {/* Title & Short Value Line */}
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
            <label className="text-xs font-bold text-slate-300 block">
              Tu correo electrónico
            </label>
            <input
              type="email"
              autoFocus
              required
              placeholder="ejemplo: carlos@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-medium"
            />
            {error && (
              <p className="text-[11px] text-rose-400 font-medium pl-1">
                {error}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 text-slate-950 font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98] transition-all glow-green"
          >
            <span>⚡ Empezar Mi Protocolo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Tiny reassurance text */}
        <div className="pt-2 border-t border-white/5 space-y-1">
          <p className="text-[11px] text-slate-400 font-medium">
            Sin contraseñas. Sin verificaciones. Acceso inmediato.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Tus datos se guardan únicamente en este dispositivo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
