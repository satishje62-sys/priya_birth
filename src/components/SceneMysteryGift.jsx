import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Key, Sparkles, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playErrorBoing, playCelebrationFanfare, playSparkle } from '../utils/audioSynthesis';

export default function SceneMysteryGift({ onComplete }) {
  const { mysteryGift, birthdayName } = birthdayConfig;
  const [selectedKeyId, setSelectedKeyId] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isGiftUnlocked, setIsGiftUnlocked] = useState(false);

  const handleSelectKey = (keyItem) => {
    setSelectedKeyId(keyItem.id);

    if (keyItem.isCorrect) {
      setIsGiftUnlocked(true);
      setFeedbackMessage(null);
      playCelebrationFanfare();
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FFD6E7', '#F8AFCB', '#F06292', '#F5D58B', '#FFF9FC']
      });
    } else {
      setIsShaking(true);
      playErrorBoing();
      setFeedbackMessage(keyItem.hint || mysteryGift.wrongHint);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Gift size={16} />
        <span>{mysteryGift.levelTitle}</span>
      </div>

      <h2 className="scene-title">The Mystery Gift Box 🎁✨</h2>
      <p className="scene-subtitle">{mysteryGift.subtitle}</p>

      <div className="giftbox-container">
        {!isGiftUnlocked ? (
          <div className="glass-card" style={{ padding: '32px 24px' }}>
            {/* Clue box */}
            <div
              style={{
                background: '#FFF0F6',
                border: '1.5px solid var(--blush-pink)',
                borderRadius: 16,
                padding: '16px 20px',
                fontSize: '1.05rem',
                color: 'var(--rose-deep)',
                fontStyle: 'italic',
                fontWeight: 600,
                lineHeight: 1.5,
                marginBottom: 24
              }}
            >
              {mysteryGift.riddle}
            </div>

            {/* Giftbox illustration with ribbons */}
            <div className={`giftbox ${isShaking ? 'shaking' : ''}`}>
              <div className="giftbox-bow">🎀</div>
              <div className="giftbox-body">
                <div className="giftbox-ribbon-v" />
                <div className="giftbox-ribbon-h" />
              </div>
            </div>

            {feedbackMessage && (
              <div
                style={{
                  background: '#ffebee',
                  border: '1px solid #ef5350',
                  borderRadius: 14,
                  padding: '12px 18px',
                  color: '#c62828',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  margin: '16px auto',
                  maxWidth: 420,
                  animation: 'fadeInScene 0.3s ease'
                }}
              >
                {feedbackMessage}
              </div>
            )}

            {/* Key selection */}
            <p style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: 18, marginBottom: 12 }}>
              Choose the Key to Unlock:
            </p>

            <div className="keys-grid">
              {mysteryGift.keys.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  className="key-choice-btn"
                  onClick={() => handleSelectKey(k)}
                >
                  <span style={{ fontSize: 32 }}>{k.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {k.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Gift revealed card */
          <div className="glass-card" style={{ padding: '36px 26px', animation: 'fadeInScene 0.6s ease' }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🎀✨🎁</div>
            <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '2.4rem', color: 'var(--rose-deep)', marginBottom: 6 }}>
              {mysteryGift.correctHeading}
            </h3>

            {/* Personal Birthday Voucher / Certificate */}
            <div
              style={{
                background: 'linear-gradient(135deg, #FFF9FC 0%, #FFE4EF 100%)',
                border: '2px dashed var(--rose-pink)',
                borderRadius: 20,
                padding: '24px 20px',
                margin: '22px auto',
                maxWidth: 480,
                textAlign: 'left',
                boxShadow: '0 8px 24px rgba(240, 98, 146, 0.15)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span
                  style={{
                    background: 'var(--rose-pink)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: 12,
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}
                >
                  {mysteryGift.giftCard.tag}
                </span>
                <Sparkles size={18} color="var(--rose-pink)" />
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--rose-deep)', marginBottom: 14 }}>
                {mysteryGift.giftCard.title}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {mysteryGift.giftCard.perks.map((perk, pIdx) => (
                  <div key={pIdx} style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                    {perk}
                  </div>
                ))}
              </div>

              <div style={{ fontStyle: 'italic', fontSize: '0.98rem', color: 'var(--rose-deep)', borderTop: '1px solid rgba(240, 98, 146, 0.25)', paddingTop: 10, textAlign: 'center' }}>
                {mysteryGift.giftCard.note}
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.8rem', color: 'var(--rose-deep)', fontWeight: 700, margin: '14px 0 24px' }}>
              NOW, IT'S CAKE TIME! 🎂✨
            </p>

            <button
              type="button"
              className="btn-primary"
              onClick={onComplete}
              id="unlock-level7-btn"
            >
              <span>Bring Out The Birthday Cake 🎂</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
