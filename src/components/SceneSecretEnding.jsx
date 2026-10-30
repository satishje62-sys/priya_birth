import React, { useState } from 'react';
import { Heart, Sparkles, RotateCcw, Camera } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playSparkle, playCelebrationFanfare, playChime } from '../utils/audioSynthesis';

export default function SceneSecretEnding({ onReplay, onJumpToGarden }) {
  const { secretEnding, birthdayName, senderName } = birthdayConfig;
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlockHeart = () => {
    setIsUnlocked(true);
    playCelebrationFanfare();
  };

  const formattedLetter = secretEnding.letterText
    .replace(/HER_NAME/g, birthdayName)
    .replace(/YOUR_NAME/g, senderName);

  return (
    <div className="scene-wrapper" style={{ textAlign: 'center' }}>
      <div className="scene-badge">
        <Sparkles size={16} />
        <span>A Final Secret 🌷</span>
      </div>

      <h2 className="scene-title">One Last Little Secret 💌</h2>
      <p className="scene-subtitle">{secretEnding.lockPrompt}</p>

      {!isUnlocked ? (
        <div style={{ margin: '30px auto' }}>
          <div
            className="secret-lock"
            onClick={handleUnlockHeart}
            title={secretEnding.unlockHint}
          >
            <Heart size={54} fill="#ffffff" color="#ffffff" />
          </div>

          <p style={{ marginTop: 18, fontSize: '1rem', color: 'var(--rose-deep)', fontWeight: 600 }}>
            {secretEnding.unlockHint}
          </p>

          <div style={{ marginTop: 24 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleUnlockHeart}
              id="unlock-heart-btn"
            >
              <Heart size={20} fill="#ffffff" />
              <span>Unlock Friendship Promise 💖</span>
            </button>
          </div>
        </div>
      ) : (
        /* The Unlocked Secret Letter */
        <div
          className="glass-card"
          style={{
            maxWidth: 620,
            margin: '20px auto',
            padding: '40px 32px',
            textAlign: 'left',
            animation: 'fadeInScene 0.7s ease',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Heart size={24} fill="var(--rose-pink)" color="var(--rose-pink)" />
            <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '2rem', color: 'var(--rose-deep)', margin: 0 }}>
              {secretEnding.letterTitle}
            </h3>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: '1.08rem',
              lineHeight: 1.8,
              color: 'var(--text-main)',
              whiteSpace: 'pre-wrap',
              marginBottom: 32
            }}
          >
            {formattedLetter}
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              justifyContent: 'center',
              borderTop: '1px solid rgba(240, 98, 146, 0.25)',
              paddingTop: 24
            }}
          >
            <button
              type="button"
              className="btn-primary"
              onClick={onReplay}
              id="replay-adventure-btn"
            >
              <RotateCcw size={18} />
              <span>{secretEnding.replayButtonText}</span>
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={onJumpToGarden}
              id="revisit-garden-btn"
            >
              <Camera size={18} />
              <span>{secretEnding.gardenButtonText}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
