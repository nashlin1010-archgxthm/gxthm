/**
 * Romantic Audio Engine:
 * Generates an emotional, soft romantic piano and ambient pad melody using Web Audio API,
 * and allows uploading a custom audio track (e.g. favorite relationship song).
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private intervalId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    // Lazy initialize on first interaction
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      hasCustomTrack: !!this.customAudioUrl,
    };
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomAudio(file: File) {
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
    }
    this.customAudioUrl = URL.createObjectURL(file);
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.customAudio = new Audio(this.customAudioUrl);
    this.customAudio.loop = true;
    this.customAudio.muted = this.isMuted;
    
    if (this.isPlaying) {
      this.stopSynthesizer();
      this.customAudio.play().catch(() => {});
    }
    this.notify();
  }

  public removeCustomAudio() {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
      this.customAudioUrl = null;
    }
    if (this.isPlaying) {
      this.startSynthesizer();
    }
    this.notify();
  }

  public start() {
    this.initContext();
    this.isPlaying = true;

    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
      this.customAudio.play().catch(() => {});
    } else {
      this.startSynthesizer();
    }
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopSynthesizer();
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    this.notify();
  }

  private stopSynthesizer() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Emotional, gentle acoustic piano/celeste arpeggiator in Eb major / C minor
  private startSynthesizer() {
    this.stopSynthesizer();
    if (!this.ctx) return;

    // Romantic slow arpeggio progression: Eb -> Bb -> Cm -> Ab
    const progressions = [
      // Eb chord arpeggios
      [311.13, 392.00, 466.16, 622.25],
      // Bb chord arpeggios
      [293.66, 349.23, 440.00, 587.33],
      // Cm chord arpeggios
      [261.63, 311.13, 392.00, 523.25],
      // Ab chord arpeggios
      [207.65, 261.63, 311.13, 415.30],
    ];

    let chordIndex = 0;
    let noteStep = 0;

    const playNextNote = () => {
      if (!this.isPlaying || this.isMuted || !this.ctx) return;

      const currentChord = progressions[chordIndex];
      const freq = currentChord[noteStep % currentChord.length];

      this.playPianoNote(freq);

      noteStep++;
      if (noteStep >= currentChord.length * 2) {
        noteStep = 0;
        chordIndex = (chordIndex + 1) % progressions.length;
      }
    };

    // Play first note immediately
    playNextNote();
    // Soft tempo: note every 850ms
    this.intervalId = window.setInterval(playNextNote, 850);
  }

  private playPianoNote(freq: number) {
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Gentle sine / triangle mix
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    // Low pass filter for soft romantic acoustic tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(1, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.8);
  }
}

export const romanticAudio = new RomanticAudioEngine();
