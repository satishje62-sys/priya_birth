import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, Unlock, ChevronUp, ChevronDown, Lightbulb, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playErrorBoing, playCelebrationFanfare, playSparkle } from '../utils/audioSynthesis';

export default function SceneVaultCode({ onComplete }) {
  const { vaultPuzzle } = birthdayConfig;
  const targetDigits = vaultPuzzle.targetCode.split('');

  // 4 digits on the lock dials
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [feedback, setFeedback] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showClues, setShowClues] = useState(true);

  // Increment or decrement dial
  const changeDigit = (index, delta) => {
    if (isUnlocked) return;
    playChime(400 + index * 50);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] + delta + 10) % 10;
      return next;
    });
    setFeedback(null);
  };

  // Check code
  const handleCheckCode = () => {
    const currentCode = digits.join('');
    if (currentCode === vaultPuzzle.targetCode) {
      setIsUnlocked(true);
      playCelebrationFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F5D58B', '#FFD6E7', '#F06292', '#E8DDFB', '#FFF9FC']
      });
    } else {
      playErrorBoing();
      // Provide Mastermind-style feedback
      const results = digits.map((digit, idx) => {
        const dStr = digit.toString();
        if (dStr === targetDigits[idx]) {
          return { status: 'correct', label: '🟢 Right number & spot!' };
        } else if (targetDigits.includes(dStr)) {
          return { status: 'misplaced', label: '🟡 Number exists in code, but different spot!' };
        } else {
          return { status: 'wrong', label: '⚪ Not in code' };
        }
      });

      setFeedback(results);
    }
  };

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Lock size={16} />
        <span>{vaultPuzzle.levelTitle}</span>
      </div>

      <h2 className="scene-title">The Secret Friendship Vault 🔐</h2>
      <p className="scene-subtitle">{vaultPuzzle.subtitle}</p>

      <div className="glass-card" style={{ maxWidth: 640, width: '100%', padding: '32px 24px', textAlign: 'center' }}>
        {/* Toggle Clues Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            onClick={() => setShowClues(!showClues)}
          >
            <Lightbulb size={16} />
            <span>{showClues ? 'Hide Clues' : 'Show Clues'}</span>
          </button>
        </div>

        {/* Clues Card */}
        {showClues && (
          <div
            style={{
              background: '#FFF9FC',
              border: '1.5px solid var(--blush-pink)',
              borderRadius: 16,
              padding: '16px 20px',
              textAlign: 'left',
              marginBottom: 24,
              animation: 'fadeInScene 0.3s ease'
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--rose-deep)', marginBottom: 10 }}>
              🧠 Deduction Clues:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {vaultPuzzle.clues.map((clue, idx) => (
                <div key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                  • {clue.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The 4-Dial Padlock Interface */}
        <div
          style={{
            background: 'linear-gradient(145deg, #ffd1e3, #fbb8d3)',
            borderRadius: 24,
            padding: '28px 16px',
            boxShadow: '0 16px 36px rgba(240, 98, 146, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
            border: '3px solid #ffffff',
            maxWidth: 440,
            margin: '0 auto 24px'
          }}
        >
          <div style={{ marginBottom: 14 }}>
            {isUnlocked ? (
              <Unlock size={44} color="#2e7d32" style={{ animation: 'bounceSubtle 0.8s ease' }} />
            ) : (
              <Lock size={44} color="var(--rose-deep)" />
            )}
          </div>

          {/* 4 Dials */}
          <div className="vault-dials-container">
            {digits.map((digit, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button
                  type="button"
                  className="icon-btn"
                  style={{ width: 34, height: 34 }}
                  onClick={() => changeDigit(idx, 1)}
                  disabled={isUnlocked}
                  title="Up"
                >
                  <ChevronUp size={20} />
                </button>

                <div className={`vault-dial-box ${isUnlocked ? 'unlocked' : ''}`}>
                  {digit}
                </div>

                <button
                  type="button"
                  className="icon-btn"
                  style={{ width: 34, height: 34 }}
                  onClick={() => changeDigit(idx, -1)}
                  disabled={isUnlocked}
                  title="Down"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Feedback Indicators */}
          {feedback && !isUnlocked && (
            <div style={{ marginTop: 18, background: '#ffffff', padding: '12px 14px', borderRadius: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.82rem', fontWeight: 600 }}>
                {feedback.map((item, fIdx) => (
                  <div key={fIdx} style={{ color: item.status === 'correct' ? '#2e7d32' : item.status === 'misplaced' ? '#e65100' : '#757575' }}>
                    Dial {fIdx + 1}: {item.status === 'correct' ? '🟢 Exact' : item.status === 'misplaced' ? '🟡 Swap' : '⚪ Nope'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {!isUnlocked ? (
          <div>
            <button
              type="button"
              className="btn-primary"
              onClick={handleCheckCode}
              id="try-vault-code-btn"
            >
              <Lock size={18} />
              <span>TEST COMBINATION 🔐</span>
            </button>
            <div style={{ marginTop: 12, fontSize: '0.84rem', color: 'var(--text-soft)' }}>
              {vaultPuzzle.hintText}
            </div>
          </div>
        ) : (
          <div style={{ animation: 'fadeInScene 0.5s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#2e7d32', fontWeight: 700, fontSize: '1.2rem', marginBottom: 14 }}>
              <CheckCircle2 size={26} />
              <span>{vaultPuzzle.solvedMessage}</span>
            </div>

            <div>
              <button
                type="button"
                className="btn-primary"
                onClick={onComplete}
                id="unlock-next-puzzle-btn"
              >
                <span>{vaultPuzzle.nextButtonText}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
