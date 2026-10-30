import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Wind, Sparkles, Check, Heart, ArrowRight, ZoomIn, X } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { BlowDetector, playCandleBlowPuff, playCelebrationFanfare, playSparkle, musicBoxPlayer, birthdaySongPlayer } from '../utils/audioSynthesis';

export default function SceneBirthdayCake({ onComplete }) {
  const { cake, birthdayName } = birthdayConfig;
  const candleCount = cake.candleCount || 6;

  // Track each candle's flame status (array of booleans, true = lit)
  const [candlesLit, setCandlesLit] = useState(Array(candleCount).fill(true));
  const [isMicListening, setIsMicListening] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [micError, setMicError] = useState(null);
  const [isDimmed, setIsDimmed] = useState(false);
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  const detectorRef = useRef(null);

  // Extinguish all candles at once (from blow detection or blow button)
  const extinguishAllCandles = () => {
    if (isExtinguished) return;

    if (detectorRef.current) {
      detectorRef.current.stop();
      detectorRef.current = null;
    }
    setIsMicListening(false);

    playCandleBlowPuff();
    setCandlesLit(Array(candleCount).fill(false));
    setIsExtinguished(true);

    // Stop instrumental music box immediately
    musicBoxPlayer.stop();

    // Dim screen for 1 second
    setIsDimmed(true);
    setTimeout(() => {
      setIsDimmed(false);
      setShowCelebrationBanner(true);
      playCelebrationFanfare();

      // Start custom Birthday Song MP3!
      birthdaySongPlayer.play();

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F5D58B', '#F8AFCB', '#F06292', '#FFF9FC', '#E8DDFB']
      });
    }, 1000);
  };

  // Toggle or start mic detection
  const startMicBlowing = () => {
    setMicError(null);

    if (isMicListening) {
      if (detectorRef.current) {
        detectorRef.current.stop();
        detectorRef.current = null;
      }
      setIsMicListening(false);
      return;
    }

    const detector = new BlowDetector(
      () => {
        // On blow detected!
        extinguishAllCandles();
      },
      (vol) => {
        setMicVolume(vol);
      },
      (err) => {
        setMicError('Could not access microphone. You can use the blow button or tap candles!');
        setIsMicListening(false);
      }
    );

    detectorRef.current = detector;
    detector.start();
    setIsMicListening(true);
  };

  // Tap individual candle to extinguish
  const handleCandleTap = (idx) => {
    if (!candlesLit[idx] || isExtinguished) return;

    playCandleBlowPuff();
    const updated = [...candlesLit];
    updated[idx] = false;
    setCandlesLit(updated);

    // Check if that was the last candle
    if (updated.every((lit) => !lit)) {
      extinguishAllCandles();
    }
  };

  // Cleanup mic detector on unmount
  useEffect(() => {
    return () => {
      if (detectorRef.current) {
        detectorRef.current.stop();
      }
    };
  }, []);

  return (
    <div className={`scene-wrapper ${isDimmed ? 'screen-dimmed' : ''}`} style={{ transition: 'opacity 0.6s ease' }}>
      {/* 1s Screen dim overlay */}
      {isDimmed && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 10, 18, 0.7)',
            zIndex: 99,
            pointerEvents: 'none',
            animation: 'fadeInScene 0.4s ease'
          }}
        />
      )}

      <div className="scene-badge">
        <Sparkles size={16} />
        <span>{cake.levelTitle}</span>
      </div>

      <h2 className="scene-title">Make a Birthday Wish 🎂</h2>
      <p className="scene-subtitle">
        {cake.instruction1}
        <br />
        <span style={{ color: 'var(--rose-pink)', fontWeight: 600 }}>{cake.instruction2}</span>
      </p>

      <div className="cake-stage glass-card" style={{ padding: '24px 20px' }}>
        {/* Birthday Girl Photo above the cake */}
        <div className="cake-photo-card">
          <div
            className="cake-photo-wrapper"
            onClick={() => setIsPhotoZoomed(true)}
            style={{ cursor: 'zoom-in' }}
            title="Click to view full photo 🔍"
          >
            <img
              src="/assets/priya-cake-wish.jpg"
              alt={`Birthday Girl ${birthdayName} with Cake`}
              className="cake-girl-photo"
            />
            <div className="cake-photo-badge">
              <Sparkles size={14} />
              <span>Birthday Star {birthdayName} 👑🎂</span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                padding: '3px 8px',
                borderRadius: 14,
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                pointerEvents: 'none'
              }}
            >
              <ZoomIn size={12} />
              <span>Full View</span>
            </div>
          </div>
          <p className="cake-photo-tagline">
            “Close your eyes, make a silent wish, and blow the candles... 🕯️✨”
          </p>
        </div>

        {/* The 2-Tier Birthday Cake with Candles (Photo ke neeche cake) */}
        <div className="cake-visual">
          {/* Candles Row */}
          <div className="candles-row">
            {candlesLit.map((isLit, idx) => (
              <div
                key={idx}
                className="candle"
                onClick={() => handleCandleTap(idx)}
                title={isLit ? 'Tap candle to blow it out!' : 'Candle blown out!'}
              >
                <div className="candle-wick" />
                {isLit ? (
                  <div className="candle-flame" />
                ) : (
                  <div className="smoke-wisp" />
                )}
              </div>
            ))}
          </div>

          {/* Top Tier */}
          <div className="cake-tier-top">
            <div className="cake-frosting-drips" />
            <div className="cake-strawberries">
              <span>🍓</span>
              <span>🤍</span>
              <span>🍓</span>
              <span>🤍</span>
              <span>🍓</span>
            </div>
          </div>

          {/* Bottom Tier */}
          <div className="cake-tier-bottom">
            <div className="cake-frosting-drips" />
            <div className="cake-strawberries" style={{ top: -10 }}>
              <span>🌸</span>
              <span>🍓</span>
              <span>🌸</span>
              <span>🍓</span>
              <span>🌸</span>
              <span>🍓</span>
              <span>🌸</span>
            </div>
          </div>

          {/* Cake Stand */}
          <div className="cake-stand" />
          <div className="cake-stand-base" />
        </div>

        {/* Real-time mic blowing indicator */}
        {isMicListening && (
          <div style={{ textAlign: 'center', margin: '14px 0', animation: 'fadeInScene 0.3s ease' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--rose-deep)' }}>
              Listening for your blow... Breath Meter:
            </span>
            <div className="mic-meter-bar" style={{ margin: '8px auto' }}>
              <div className="mic-meter-fill" style={{ width: `${micVolume}%` }} />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>
              Blow directly toward your microphone now! 💨
            </p>
          </div>
        )}

        {/* Mic Error Banner if denied */}
        {micError && (
          <div
            style={{
              background: '#fff3e0',
              border: '1px solid #ffb74d',
              borderRadius: 12,
              padding: '10px 14px',
              fontSize: '0.88rem',
              color: '#e65100',
              margin: '12px auto',
              maxWidth: 420
            }}
          >
            {micError}
          </div>
        )}

        {/* Controls: Mic & Tap Buttons */}
        {!isExtinguished ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              {/* Mic Blow Button */}
              <button
                type="button"
                className="btn-primary"
                onClick={startMicBlowing}
                style={isMicListening ? { background: 'linear-gradient(135deg, #e91e63, #c2185b)' } : {}}
                id="mic-blow-btn"
              >
                {isMicListening ? <MicOff size={20} /> : <Mic size={20} />}
                <span>{isMicListening ? 'STOP MICROPHONE' : cake.blowMicButtonText}</span>
              </button>

              {/* Tap / Click Blow Button Fallback */}
              <button
                type="button"
                className="btn-secondary"
                onClick={extinguishAllCandles}
                id="tap-blow-btn"
              >
                <Wind size={20} />
                <span>{cake.blowTapButtonText}</span>
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)' }}>
              💡 <em>You can also tap each individual candle directly to blow them out!</em>
            </p>

            {/* Privacy note */}
            <p style={{ fontSize: '0.78rem', color: 'var(--text-soft)', maxWidth: 440, textAlign: 'center', lineHeight: 1.4 }}>
              {cake.privacyNote}
            </p>
          </div>
        ) : (
          /* Celebration Banner when extinguished */
          showCelebrationBanner && (
            <div style={{ marginTop: 20, textAlign: 'center', animation: 'fadeInScene 0.6s ease' }}>
              <div style={{ fontSize: 48, marginBottom: 6 }}>🌸✨🕯️</div>
              <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '2.4rem', color: 'var(--rose-deep)', marginBottom: 6 }}>
                {cake.wishTitle}
              </h3>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--rose-deep)', marginBottom: 24 }}>
                HAPPY BIRTHDAY, {birthdayName.toUpperCase()}! 🎂💗
              </p>

              <button
                type="button"
                className="btn-primary btn-gold"
                onClick={onComplete}
                id="start-celebration-btn"
              >
                <Sparkles size={20} />
                <span>Start The Birthday Celebration! 🎶🎉</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )
        )}
      </div>

      {/* Lightbox / Fullscreen Modal for Priya's Cake Photo */}
      {isPhotoZoomed && (
        <div
          className="lightbox-overlay"
          onClick={() => setIsPhotoZoomed(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 5, 15, 0.88)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeInScene 0.25s ease'
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPhotoZoomed(false);
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#ffffff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
            title="Close Full Photo"
          >
            <X size={24} />
          </button>

          {/* Full Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '92vw',
              maxHeight: '82vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/assets/priya-cake-wish.jpg"
              alt="Birthday Girl Priya with Birthday Cake"
              style={{
                maxWidth: '90vw',
                maxHeight: '76vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 14,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                border: '3px solid rgba(255, 255, 255, 0.25)'
              }}
            />
            <div style={{ color: '#ffffff', textAlign: 'center', marginTop: 14 }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-hand)', color: '#FFD1E3' }}>
                Happy Birthday, {birthdayName}! 🎂👑
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.85, marginTop: 4 }}>
                “May all your sweetest wishes, dreams, and joy come true!” 🌸✨
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
