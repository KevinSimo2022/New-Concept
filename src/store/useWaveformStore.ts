import { create } from "zustand";

interface WaveformState {
  amplitude: number;
  frequency: number;
  emissiveIntensity: number;
  scale: number;
  burst: boolean;
  setAmplitude: (v: number) => void;
  setFrequency: (v: number) => void;
  setEmissiveIntensity: (v: number) => void;
  setScale: (v: number) => void;
  setBurst: (v: boolean) => void;
  triggerPing: () => void;
}

export const useWaveformStore = create<WaveformState>((set) => ({
  amplitude: 1.0,
  frequency: 1.0,
  emissiveIntensity: 0.0,
  scale: 1.0,
  burst: false,

  setAmplitude: (v) => set({ amplitude: v }),
  setFrequency: (v) => set({ frequency: v }),
  setEmissiveIntensity: (v) => set({ emissiveIntensity: v }),
  setScale: (v) => set({ scale: v }),
  setBurst: (v) => set({ burst: v }),

  triggerPing: () => {
    // Web Audio API — 880Hz → 440Hz decay, 600ms (Phase 02 spec)
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // AudioContext blocked before user gesture — silent fail
    }

    // Animate the waveform: burst scale + emissive spike
    set({ burst: true, scale: 1.18, emissiveIntensity: 1.2 });
    setTimeout(() => set({ scale: 1.0, emissiveIntensity: 0.0, burst: false }), 700);
  },
}));
