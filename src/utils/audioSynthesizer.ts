// Web Audio API synthesizer for offline, zero-asset-failure audio experience

class NeuroAudioEngine {
  private ctx: AudioContext | null = null;
  private activeDroneOsc: OscillatorNode | null = null;
  private activeDroneGain: GainNode | null = null;
  private activeNoiseNode: AudioNode | null = null;
  private activeNoiseGain: GainNode | null = null;
  private breathingOsc: OscillatorNode | null = null;
  private breathingGain: GainNode | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Celebratory arpeggio on phase completions
  playVictoryChime() {
    try {
      const ctx = this.getContext();
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.0);
      });
    } catch {
      // AudioContext unavailable or autoplay blocked
    }
  }

  // Subtle warning or alert ping for time-triggered banners
  playAlertPing() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // AudioContext unavailable
    }
  }

  // Guided breathing cue tone (smooth 432 Hz harmonic pulse)
  playBreathingCue(type: 'inhale' | 'hold' | 'exhale') {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      if (this.breathingOsc) {
        try {
          this.breathingOsc.stop();
          this.breathingOsc.disconnect();
        } catch {
          // ignore
        }
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = type === 'inhale' ? 432 : type === 'hold' ? 528 : 340;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
      this.breathingOsc = osc;
    } catch {
      // ignore
    }
  }

  // Start soothing calming drone for SOS audio players
  startSoothingTrack(trackFreq: number = 432) {
    try {
      this.stopSoothingTrack();
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Base sine drone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(trackFreq, now);

      // Low frequency modulation for wave effect (0.15Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now);
      lfoGain.gain.setValueAtTime(0.05, now);
      lfo.connect(gain.gain);
      lfo.start(now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      this.activeDroneOsc = osc;
      this.activeDroneGain = gain;
    } catch {
      // ignore
    }
  }

  stopSoothingTrack() {
    try {
      if (this.activeDroneGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.activeDroneGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          if (this.activeDroneOsc) {
            this.activeDroneOsc.stop();
            this.activeDroneOsc.disconnect();
            this.activeDroneOsc = null;
          }
          this.activeDroneGain = null;
        }, 550);
      }
    } catch {
      this.activeDroneOsc = null;
      this.activeDroneGain = null;
    }
  }

  // SpeechSynthesis in calm Spanish for guided voice & script intent
  speakSpanish(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX'; // default to LatAm Spanish
      utterance.rate = 0.92; // calm, deliberate pace
      utterance.pitch = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find((v) => v.lang.startsWith('es-MX') || v.lang.startsWith('es-419') || v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  // Device tactile vibration
  triggerVibration(pattern: number | number[] = [100, 50, 100]) {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // ignore
    }
  }
}

export const neuroAudio = new NeuroAudioEngine();
