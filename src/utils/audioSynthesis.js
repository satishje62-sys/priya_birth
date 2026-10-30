/**
 * Magical Web Audio Synthesizer & Blow Detection Engine
 * 100% self-contained: works even with zero external sound files!
 */

let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Global Mute / Volume state
let isSoundMuted = false;
let globalMasterVolume = 0.8;

export function setMuteState(muted) {
  isSoundMuted = muted;
}

export function isMuted() {
  return isSoundMuted;
}

export function setMasterVolume(vol) {
  globalMasterVolume = Math.max(0, Math.min(1, vol));
}

export function getMasterVolume() {
  return globalMasterVolume;
}

/**
 * Play a cute crystalline chime (positive / button click / success)
 */
export function playChime(freq = 587.33) {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

  gain.gain.setValueAtTime(0.25 * globalMasterVolume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.5);
}

/**
 * Play a gentle playful cartoon wobble/boing for wrong answers
 */
export function playErrorBoing() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(240, now);
  osc.frequency.linearRampToValueAtTime(150, now + 0.15);
  osc.frequency.linearRampToValueAtTime(120, now + 0.35);

  gain.gain.setValueAtTime(0.2 * globalMasterVolume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
}

/**
 * Play fairy sparkle cascade
 */
export function playSparkle() {
  if (isSoundMuted) return;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playChime(freq);
    }, idx * 60);
  });
}

/**
 * Play celebratory fanfare (Level clear / Trophy / Box opening)
 */
export function playCelebrationFanfare() {
  if (isSoundMuted) return;
  const chords = [
    { freq: 523.25, time: 0 },
    { freq: 659.25, time: 80 },
    { freq: 783.99, time: 160 },
    { freq: 1046.5, time: 240 },
    { freq: 1318.51, time: 360 },
    { freq: 1567.98, time: 500 }
  ];
  chords.forEach(({ freq, time }) => {
    setTimeout(() => {
      playChime(freq);
    }, time);
  });
}

/**
 * Play puff of air / extinguished candle sound using filtered noise
 */
export function playCandleBlowPuff() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.35);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3 * globalMasterVolume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
  noise.stop(ctx.currentTime + 0.4);
}

/**
 * Play gentle typewriter key click
 */
export function playTypewriterClick() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600 + Math.random() * 200, now);

  gain.gain.setValueAtTime(0.03 * globalMasterVolume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

/**
 * Play Minecraft block place "thud / snap" sound
 */
export function playBlockPlaceSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.08);

  gain.gain.setValueAtTime(0.32 * globalMasterVolume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * Play Minecraft crafting / level-up chime flourish
 */
export function playCraftSuccessSound() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const pitches = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  pitches.forEach((freq, idx) => {
    setTimeout(() => {
      if (isSoundMuted) return;
      const c = getAudioContext();
      if (!c) return;
      const now = c.currentTime;
      const osc = c.createOscillator();
      const osc2 = c.createOscillator();
      const gain = c.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.22 * globalMasterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.35);
      osc2.stop(now + 0.35);
    }, idx * 90);
  });
}

/**
 * ========================================================
 * SYNTHESIZED MUSIC BOX: "HAPPY BIRTHDAY" MELODY
 * Plays if user hasn't supplied a birthday song MP3
 * or as a soothing ambient melody!
 * ========================================================
 */
class MusicBoxBirthdayPlayer {
  constructor() {
    this.isPlaying = false;
    this.timeoutIds = [];
    this.currentLoop = null;
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isPlaying);
      } catch (e) {
        console.warn('Audio listener error:', e);
      }
    });
  }

  // Happy Birthday notes and note durations (beats)
  // [frequency in Hz, duration in beats]
  getNotes() {
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23,
          G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25,
          D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;

    return [
      // Line 1: Hap-py birth-day to you
      { note: G4, dur: 0.75 }, { note: G4, dur: 0.25 }, { note: A4, dur: 1.0 },
      { note: G4, dur: 1.0 }, { note: C5, dur: 1.0 }, { note: B4, dur: 2.0 },
      // Line 2: Hap-py birth-day to you
      { note: G4, dur: 0.75 }, { note: G4, dur: 0.25 }, { note: A4, dur: 1.0 },
      { note: G4, dur: 1.0 }, { note: D5, dur: 1.0 }, { note: C5, dur: 2.0 },
      // Line 3: Hap-py birth-day dear Bestie
      { note: G4, dur: 0.75 }, { note: G4, dur: 0.25 }, { note: G5, dur: 1.0 },
      { note: E5, dur: 1.0 }, { note: C5, dur: 1.0 }, { note: B4, dur: 1.0 }, { note: A4, dur: 1.5 },
      // Line 4: Hap-py birth-day to you!
      { note: F5, dur: 0.75 }, { note: F5, dur: 0.25 }, { note: E5, dur: 1.0 },
      { note: C5, dur: 1.0 }, { note: D5, dur: 1.0 }, { note: C5, dur: 2.5 }
    ];
  }

  playNote(freq, duration) {
    if (isSoundMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Music box uses fundamental + gentle harmonics
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // soft bell overtone

    // Bell/music-box envelope: sharp attack, gentle decay
    const attack = 0.01;
    const decay = duration * 0.9;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22 * globalMasterVolume, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + decay);
    osc2.stop(now + decay);
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const notes = this.getNotes();
    const tempo = 450; // ms per beat

    const playSequence = () => {
      let cumulativeTime = 0;
      notes.forEach((item) => {
        const id = setTimeout(() => {
          if (!this.isPlaying) return;
          this.playNote(item.note, item.dur * (tempo / 1000) * 1.5);
        }, cumulativeTime);
        this.timeoutIds.push(id);
        cumulativeTime += item.dur * tempo;
      });

      // Loop after full song + 1.5s pause
      const loopId = setTimeout(() => {
        if (this.isPlaying) {
          playSequence();
        }
      }, cumulativeTime + 1500);
      this.timeoutIds.push(loopId);
    };

    playSequence();
  }

  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
    this.notify();
  }
}

export const musicBoxPlayer = new MusicBoxBirthdayPlayer();

/**
 * ========================================================
 * BIRTHDAY SONG VOCAL AUDIO MANAGER (HTML5 Audio)
 * Manages the custom Birthday Song uploaded by the user
 * Plays across Level 8 (cake blown) and Level 9 (celebration)
 * ========================================================
 */
class BirthdaySongManager {
  constructor(src = '/assets/birthday-song.mp3') {
    this.src = src;
    this.audio = null;
    this.isPlaying = false;
    this.volume = 0.85;
    this.isMuted = false;
    this.listeners = new Set();
  }

  getAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio(this.src);
      this.audio.loop = true;
      this.audio.volume = this.isMuted ? 0 : this.volume;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
    }
    return this.audio;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({
      isPlaying: this.isPlaying,
      volume: this.volume,
      isMuted: this.isMuted
    });
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn({
          isPlaying: this.isPlaying,
          volume: this.volume,
          isMuted: this.isMuted
        });
      } catch (e) {}
    });
  }

  play() {
    // Stop the synthesized instrumental so the vocal song takes over cleanly
    musicBoxPlayer.stop();

    const audio = this.getAudio();
    if (!audio) return Promise.resolve();

    audio.volume = this.isMuted ? 0 : this.volume;
    return audio.play().then(() => {
      this.isPlaying = true;
      this.notify();
    }).catch((err) => {
      console.warn('Audio play request:', err);
    });
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.notify();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio && !this.isMuted) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.audio) {
      this.audio.volume = muted ? 0 : this.volume;
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
}

export const birthdaySongPlayer = new BirthdaySongManager();

/**
 * ========================================================
 * REAL-TIME MICROPHONE BLOW DETECTION ENGINE
 * ========================================================
 */
export class BlowDetector {
  constructor(onBlow, onVolumeLevel, onError) {
    this.onBlow = onBlow;
    this.onVolumeLevel = onVolumeLevel;
    this.onError = onError;
    this.stream = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.isListening = false;
    this.animFrameId = null;
    this.blowConsecutiveFrames = 0;
    this.requiredConsecutiveFrames = 3; // ~100-150ms of sustained blow
  }

  async start() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API not supported on this browser.');
      }

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.3;

      this.source = this.audioCtx.createMediaStreamSource(this.stream);
      this.source.connect(this.analyser);

      this.isListening = true;
      this.blowConsecutiveFrames = 0;
      this.processAudio();
    } catch (err) {
      console.warn('Microphone blow detection error:', err);
      if (this.onError) {
        this.onError(err);
      }
    }
  }

  processAudio() {
    if (!this.isListening || !this.analyser) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const timeData = new Uint8Array(bufferLength);
    const freqData = new Uint8Array(bufferLength);

    this.analyser.getByteTimeDomainData(timeData);
    this.analyser.getByteFrequencyData(freqData);

    // Calculate RMS volume
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      const val = (timeData[i] - 128) / 128;
      sum += val * val;
    }
    const rms = Math.sqrt(sum / bufferLength);

    // Blowing produces substantial low-frequency turbulence (first ~15 bins: 0 - 300Hz)
    let lowFreqSum = 0;
    const lowBins = Math.min(15, bufferLength);
    for (let i = 0; i < lowBins; i++) {
      lowFreqSum += freqData[i];
    }
    const avgLowFreq = lowFreqSum / lowBins;

    // Normalize volume indicator for UI (0 to 100)
    const normalizedLevel = Math.min(100, Math.round(rms * 250));
    if (this.onVolumeLevel) {
      this.onVolumeLevel(normalizedLevel);
    }

    // Threshold detection for blowing:
    // Low frequency energy > 115 AND RMS amplitude > 0.12
    const isBlowing = avgLowFreq > 110 && rms > 0.12;

    if (isBlowing) {
      this.blowConsecutiveFrames++;
      if (this.blowConsecutiveFrames >= this.requiredConsecutiveFrames) {
        this.stop();
        if (this.onBlow) {
          this.onBlow();
        }
        return;
      }
    } else {
      this.blowConsecutiveFrames = Math.max(0, this.blowConsecutiveFrames - 1);
    }

    this.animFrameId = requestAnimationFrame(() => this.processAudio());
  }

  stop() {
    this.isListening = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.source) {
      try {
        this.source.disconnect();
      } catch {
        // ignore
      }
      this.source = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      try {
        this.audioCtx.close();
      } catch {
        // ignore
      }
      this.audioCtx = null;
    }
  }
}
