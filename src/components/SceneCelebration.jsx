import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart, ArrowRight, Music } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { musicBoxPlayer, birthdaySongPlayer, playChime, getAudioContext } from '../utils/audioSynthesis';

export default function SceneCelebration({ onComplete }) {
  const { celebration, birthdayName, photos, birthdaySong, memoryGarden } = birthdayConfig;

  const [isPlayingSong, setIsPlayingSong] = useState(birthdaySongPlayer.isPlaying);
  const [songVolume, setSongVolume] = useState(birthdaySongPlayer.volume);
  const [isSongMuted, setIsSongMuted] = useState(birthdaySongPlayer.isMuted);

  const fireworksCanvasRef = useRef(null);

  // Auto-trigger confetti bursts periodically
  useEffect(() => {
    // Initial big burst
    confetti({
      particleCount: 140,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FFD6E7', '#F8AFCB', '#F06292', '#F5D58B', '#FFF9FC']
    });

    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD6E7', '#F06292', '#F5D58B']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F8AFCB', '#E8DDFB', '#F5D58B']
      });
    }, 3500);

    return () => clearInterval(confettiInterval);
  }, []);

  // Fireworks canvas animation
  useEffect(() => {
    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = ['#FFD6E7', '#F8AFCB', '#F06292', '#F5D58B', '#E8DDFB', '#ffffff'];

    const createFirework = (x, y) => {
      const count = 35;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 3.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 2 + Math.random() * 2
        });
      }
    };

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      tick++;
      if (tick % 70 === 0) {
        createFirework(
          canvas.width * (0.2 + Math.random() * 0.6),
          canvas.height * (0.15 + Math.random() * 0.35)
        );
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= 0.016;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Toggle Birthday Song Play/Pause
  const handleToggleSong = () => {
    birthdaySongPlayer.toggle();
  };

  // Start Birthday Song automatically on Level 9 if not already playing
  useEffect(() => {
    if (!birthdaySongPlayer.isPlaying) {
      birthdaySongPlayer.play();
    }

    // Gesture unlock fallback if browser autoplay policy required interaction
    const unlockAutoPlay = () => {
      birthdaySongPlayer.play();
      window.removeEventListener('pointerdown', unlockAutoPlay);
      window.removeEventListener('keydown', unlockAutoPlay);
    };

    window.addEventListener('pointerdown', unlockAutoPlay, { once: true });
    window.addEventListener('keydown', unlockAutoPlay, { once: true });

    const unsubscribe = birthdaySongPlayer.subscribe(({ isPlaying, volume, isMuted }) => {
      setIsPlayingSong(isPlaying);
      setSongVolume(volume);
      setIsSongMuted(isMuted);
    });

    return () => {
      unsubscribe();
      window.removeEventListener('pointerdown', unlockAutoPlay);
      window.removeEventListener('keydown', unlockAutoPlay);
    };
  }, []);

  const collagePhotos = memoryGarden.photos || [];

  return (
    <div className="scene-wrapper celebration-container">
      {/* Background fireworks canvas */}
      <canvas ref={fireworksCanvasRef} className="fireworks-canvas" aria-hidden="true" />

      <div className="scene-badge" style={{ position: 'relative', zIndex: 10 }}>
        <Sparkles size={16} />
        <span>{celebration.levelTitle}</span>
      </div>

      {/* Hero Glowing Title */}
      <h1 className="celebration-title" style={{ position: 'relative', zIndex: 10 }}>
        {celebration.mainHeading.replace(/ANANYA/g, birthdayName.toUpperCase()).replace(/HER_NAME/g, birthdayName.toUpperCase())}
      </h1>

      <p
        className="scene-subtitle"
        style={{ fontSize: '1.25rem', color: 'var(--rose-deep)', fontWeight: 600, position: 'relative', zIndex: 10 }}
      >
        {celebration.subHeading}
      </p>

      {/* Birthday Song Player Card */}
      <div className="audio-player-card glass-card" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Music size={22} color="var(--rose-pink)" />
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
              {celebration.songPlayingText}
            </span>
          </div>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 10,
              background: 'rgba(240, 98, 146, 0.15)',
              color: 'var(--rose-deep)'
            }}
          >
            Special Birthday Track 🎶
          </span>
        </div>

        {/* Play / Pause main button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '14px 0' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={handleToggleSong}
            id="play-song-btn"
          >
            {isPlayingSong ? <Pause size={20} /> : <Play size={20} />}
            <span>{isPlayingSong ? celebration.pauseSongButton : celebration.playSongButton}</span>
          </button>

          {/* Mute button */}
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              birthdaySongPlayer.setMuted(!isSongMuted);
            }}
            title={isSongMuted ? 'Unmute' : 'Mute'}
          >
            {isSongMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Volume Slider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 10 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isSongMuted ? 0 : songVolume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              birthdaySongPlayer.setVolume(val);
              birthdaySongPlayer.setMuted(false);
            }}
            style={{ accentColor: 'var(--rose-pink)', width: 140 }}
          />
        </div>
      </div>

      {/* Friendship Photo Collage Grid */}
      <div style={{ position: 'relative', zIndex: 10, margin: '30px 0' }}>
        <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '2rem', color: 'var(--rose-deep)', marginBottom: 16 }}>
          Snapshots of Our Beautiful Journey 📸✨
        </h3>

        <div className="collage-grid">
          {collagePhotos.map((photo, pIdx) => (
            <div key={photo.id || pIdx} className="collage-item">
              <img src={photo.image} alt={photo.title} />
            </div>
          ))}
        </div>
      </div>

      {/* Next button -> Secret Ending */}
      <div style={{ position: 'relative', zIndex: 10, margin: '24px 0 10px' }}>
        <button
          type="button"
          className="btn-primary"
          onClick={onComplete}
          id="unlock-secret-ending-btn"
        >
          <Heart size={20} fill="#ffffff" />
          <span>{celebration.nextButtonText}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
