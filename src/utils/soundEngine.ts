'use client';
// Procedural Web Audio Engine for UI Sounds
// Generates sci-fi style clicks, swooshes, and hover bleeps without loading external media.

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private isInitialized = false;

  constructor() {}

  // Must be called upon first user interaction
  public init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        this.isInitialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  private ensureUnlocked() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Soft high-frequency "blip" for hover states
  public playHoverSound() {
    if (!this.audioCtx) return;
    this.ensureUnlocked();

    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    // Frequency sweep for UI crispness
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);

    // Amplitude envelope
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.04, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Deeper, punchier "click" confirming action
  public playClickSound() {
    if (!this.audioCtx) return;
    this.ensureUnlocked();

    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  // A whoosh/sweep combining filtered noise and a low sine wave for transitions
  public playSwooshSound() {
    if (!this.audioCtx) return;
    this.ensureUnlocked();

    const t = this.audioCtx.currentTime;
    const duration = 0.6;

    // 1. Synth sweep
    const osc = this.audioCtx.createOscillator();
    const oscGain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + duration);
    
    oscGain.gain.setValueAtTime(0, t);
    oscGain.gain.linearRampToValueAtTime(0.06, t + 0.1);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(oscGain);
    oscGain.connect(this.audioCtx.destination);
    osc.start(t);
    osc.stop(t + duration);

    // 2. Filtered noise
    const bufferSize = this.audioCtx.sampleRate * duration;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noiseource = this.audioCtx.createBufferSource();
    noiseource.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(8000, t);
    filter.frequency.exponentialRampToValueAtTime(800, t + duration);
    filter.Q.value = 1.2;

    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0, t);
    noiseGain.gain.linearRampToValueAtTime(0.03, t + 0.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noiseource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.audioCtx.destination);

    noiseource.start(t);
    noiseource.stop(t + duration);
  }
}

// Export a singleton instance
export const soundEngine = new SoundEngine();
