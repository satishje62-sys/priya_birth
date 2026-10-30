import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Mic, MicOff, Wind, Sparkles, Check, Heart, ArrowRight, ZoomIn, X, Crown, PartyPopper } from 'lucide-react';
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

      // 1st Confetti burst
      confetti({
        particleCount: 150,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#F5D58B', '#F8AFCB', '#F06292', '#FFF9FC', '#E8DDFB', '#FFD700']
      });

      // 2nd Confetti burst for grand celebration
      setTimeout(() => {
        confetti({
          particleCount: 75,
          angle: 60,
          spread: 70,
          origin: { x: 0.05, y: 0.65 },
          colors: ['#FFD700', '#F06292', '#FFF9FC']
        });
        confetti({
          particleCount: 75,
          angle: 120,
          spread: 70,
          origin: { x: 0.95, y: 0.65 },
          colors: ['#FFD700', '#F06292', '#FFF9FC']
        });
      }, 250);
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
            background: 'rgba(20, 10, 18, 0.72)',
            zIndex: 99,
            pointerEvents: 'none',
            animation: 'fadeInScene 0.4s ease'
          }}
        />
      )}

      {/* Scene Badge */}
      <div className="scene-badge">
        <Crown size={16} />
        <span>Level 8: The Birthday Cake & Royal Wish 🎂👑</span>
      </div>

      <h2 className="scene-title">Make a Magical Wish ✨</h2>
      <p className="scene-subtitle">
        {cake.instruction1}
        <br />
        <span style={{ color: 'var(--rose-pink)', fontWeight: 600 }}>{cake.instruction2}</span>
      </p>

      {/* Decorated Stage Container */}
      <div className="level8-decorated-wrapper">
        {/* Floating 3D Balloon Clusters on Left & Right */}
        <div className="floating-balloons-container">
          <div className="balloon-cluster left-cluster">
            <div className="balloon-3d b-rosegold">
              <div className="balloon-knot" />
              <div className="balloon-string" />
            </div>
            <div className="balloon-3d b-gold" style={{ marginTop: '-18px', marginLeft: '14px' }}>
              <div className="balloon-knot" />
              <div className="balloon-string" />
            </div>
          </div>
          <div className="balloon-cluster right-cluster">
            <div className="balloon-3d b-pearl">
              <div className="balloon-knot" />
              <div className="balloon-string" />
            </div>
            <div className="balloon-3d b-rosegold" style={{ marginTop: '-16px', marginRight: '14px' }}>
              <div className="balloon-knot" />
              <div className="balloon-string" />
            </div>
          </div>
        </div>

        {/* Stage Glass Card */}
        <div className="cake-stage glass-card" style={{ padding: '18px 18px 26px' }}>
          {/* Party Bunting & Fairy Lights Garland */}
          <div className="party-bunting-garland">
            <div className="garland-string" />
            <div className="bunting-flag flag-gold" />
            <div className="fairy-bulb" style={{ left: '16%' }} />
            <div className="bunting-flag flag-rose" style={{ animationDelay: '0.4s' }} />
            <div className="fairy-bulb" style={{ left: '32%', animationDelay: '0.6s' }} />
            <div className="bunting-flag flag-cream" style={{ animationDelay: '0.8s' }} />
            <div className="fairy-bulb" style={{ left: '50%', animationDelay: '1.1s' }} />
            <div className="bunting-flag flag-pink" style={{ animationDelay: '0.3s' }} />
            <div className="fairy-bulb" style={{ left: '68%', animationDelay: '0.3s' }} />
            <div className="bunting-flag flag-lilac" style={{ animationDelay: '0.7s' }} />
            <div className="fairy-bulb" style={{ left: '84%', animationDelay: '0.9s' }} />
            <div className="bunting-flag flag-gold" style={{ animationDelay: '1s' }} />
          </div>

          {/* Birthday Girl Photo above the cake */}
          <div className="cake-photo-card">
            {/* Royal Crown Plaque */}
            <div className="royal-crown-header">
              <Crown size={16} />
              <span>THE BIRTHDAY QUEEN — {birthdayName.toUpperCase()}</span>
              <Crown size={16} />
            </div>

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

              {/* Candlelight glow wash on photo */}
              <div className="candlelight-reflection" />

              <div className="cake-photo-badge">
                <Sparkles size={14} />
                <span>The Birthday Star 👑🎂</span>
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

          {/* The 3D Birthday Cake (Photo ke neeche cake) */}
          <div className={`cake-visual-3d ${isExtinguished ? 'candles-out' : 'candles-burning'}`}>
            {/* Candlelight glow halo on cake surface */}
            <div className="candlelight-halo" />

            {/* 3D Realistic Candles Row */}
            <div className="candles-row-3d">
              {candlesLit.map((isLit, idx) => (
                <div
                  key={idx}
                  className={`candle-3d ${isLit ? 'candle-lit' : 'candle-blown'}`}
                  onClick={() => handleCandleTap(idx)}
                  title={isLit ? 'Tap candle to blow it out! 💨' : 'Candle blown out!'}
                >
                  {/* Multi-layer 3D Flame */}
                  {isLit ? (
                    <div className="flame-container-3d">
                      <div className="flame-aura-3d" />
                      <div className="flame-outer-3d" />
                      <div className="flame-inner-3d" />
                      <div className="flame-core-3d" />
                    </div>
                  ) : (
                    <div className="smoke-container-3d">
                      <div className="smoke-wisp-3d s1" />
                      <div className="smoke-wisp-3d s2" />
                      <div className="wick-ember-3d" />
                    </div>
                  )}

                  {/* 3D Cotton Wick */}
                  <div className="candle-wick-3d" />

                  {/* 3D Melted Wax Rim */}
                  <div className="candle-wax-rim" />

                  {/* 3D Candy-Stripe Wax Cylinder */}
                  <div className="candle-body-3d" />
                </div>
              ))}
            </div>

            {/* Top Tier: Rich Vanilla & Strawberry Ganache */}
            <div className="cake-tier-3d tier-top">
              {/* Elliptical Top Surface */}
              <div className="tier-top-surface">
                {/* 3D Sculpted Strawberries */}
                <div className="cake-toppings-row">
                  {[0, 1, 2, 3].map((sIdx) => (
                    <div key={sIdx} className="strawberry-3d">
                      <div className="strawberry-calyx">
                        <span className="leaf l1" />
                        <span className="leaf l2" />
                        <span className="leaf l3" />
                      </div>
                      <div className="strawberry-berry">
                        <div className="strawberry-shine" />
                        <div className="seed-dot sd1" />
                        <div className="seed-dot sd2" />
                        <div className="seed-dot sd3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dripping Chocolate & Cream Ganache */}
              <div className="tier-dripping-glaze">
                <div className="drip d1" />
                <div className="drip d2" />
                <div className="drip d3" />
                <div className="drip d4" />
                <div className="drip d5" />
              </div>

              {/* Front Cylindrical Curve with Chocolate Plaque */}
              <div className="tier-front-cylinder">
                <div className="cake-chocolate-plaque">
                  <span className="plaque-sparkle">✨</span>
                  <span className="plaque-text">Happy Birthday Priya</span>
                  <span className="plaque-sparkle">✨</span>
                </div>
              </div>

              {/* Sugar Pearl Border */}
              <div className="pearl-piping-row">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="sugar-pearl" />
                ))}
              </div>
            </div>

            {/* Bottom Tier: Double Chocolate & Velvet Berry */}
            <div className="cake-tier-3d tier-bottom">
              {/* Elliptical Shelf of Bottom Tier */}
              <div className="tier-bottom-surface">
                {/* 3D White Chocolate Curls */}
                <div className="perimeter-decorations">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="choco-curl-3d" />
                  ))}
                </div>
              </div>

              {/* Berry Drips */}
              <div className="tier-dripping-glaze glaze-berry">
                <div className="drip d6" />
                <div className="drip d7" />
                <div className="drip d8" />
                <div className="drip d9" />
                <div className="drip d10" />
                <div className="drip d11" />
              </div>

              {/* Bottom Cylinder with Golden Fondant Ribbon */}
              <div className="tier-front-cylinder bottom-cylinder">
                <div className="fondant-gold-ribbon">
                  <div className="ribbon-bow-3d">
                    <div className="bow-loop left" />
                    <div className="bow-knot" />
                    <div className="bow-loop right" />
                  </div>
                </div>
              </div>

              {/* Golden Pearl Base Trim */}
              <div className="pearl-piping-row pearl-bottom-row">
                {Array.from({ length: 13 }).map((_, i) => (
                  <span key={i} className="sugar-pearl gold-pearl" />
                ))}
              </div>
            </div>

            {/* 3D Polished Gold Pedestal Stand */}
            <div className="cake-stand-3d">
              <div className="stand-plate-3d">
                <div className="plate-rim-highlight" />
              </div>
              <div className="stand-stem-3d" />
              <div className="stand-base-3d" />
              <div className="stand-shadow-3d" />
            </div>

            {/* Festive Table Mat with Confetti & Petals */}
            <div className="party-table-mat">
              <div className="table-confetti tc1" />
              <div className="table-confetti tc2" />
              <div className="table-confetti tc3" />
              <div className="table-confetti tc4" />
              <div className="table-petal tp1" />
              <div className="table-petal tp2" />
            </div>
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
            /* Grand 3D Celebration Crest when extinguished */
            showCelebrationBanner && (
              <div className="celebration-crest-3d">
                <div className="crown-emblem-wrap">
                  <Crown size={42} />
                </div>
                <h3 className="celebration-heading-3d">
                  {cake.wishTitle}
                </h3>
                <div className="celebration-name-banner">
                  HAPPY BIRTHDAY, {birthdayName.toUpperCase()}! 🎂👑✨
                </div>
                <p className="celebration-subtext-3d">
                  Your heartfelt wish has been carried to the stars! May this year bring endless happiness, vibrant laughter, and all the love you deserve!
                </p>

                <button
                  type="button"
                  className="btn-primary btn-gold"
                  onClick={onComplete}
                  id="start-celebration-btn"
                >
                  <Sparkles size={20} />
                  <span>Proceed to Grand Celebration! 🎶🎉</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            )
          )}
        </div>
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
