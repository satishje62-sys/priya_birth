import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, ArrowRight, Eye, Gift, Key, CheckCircle2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import {
  playChime,
  playSparkle,
  playTypewriterClick,
  playErrorBoing,
  playCelebrationFanfare
} from '../utils/audioSynthesis';

export default function SceneHeartfeltLetter({ onComplete }) {
  const { heartfeltLetter, mysteryGift, birthdayName, senderName } = birthdayConfig;
  const [isOpened, setIsOpened] = useState(false);
  const [displayedParagraphs, setDisplayedParagraphs] = useState([]);
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinishedTyping, setIsFinishedTyping] = useState(false);

  // Mystery Gift Box state
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isGiftUnlocked, setIsGiftUnlocked] = useState(false);

  // Substitute HER_NAME and YOUR_NAME in letter paragraphs
  const rawParagraphs = heartfeltLetter.paragraphs.map((p) =>
    p.replace(/HER_NAME/g, birthdayName).replace(/YOUR_NAME/g, senderName)
  );

  const handleOpenLetter = () => {
    setIsOpened(true);
    playSparkle();
  };

  // Skip typing button
  const handleSkipTyping = () => {
    setDisplayedParagraphs(rawParagraphs);
    setIsFinishedTyping(true);
    playChime();
  };

  // Typewriter effect
  useEffect(() => {
    if (!isOpened || isFinishedTyping) return;

    if (currentParaIndex >= rawParagraphs.length) {
      setIsFinishedTyping(true);
      return;
    }

    const currentFullText = rawParagraphs[currentParaIndex];

    if (currentCharIndex < currentFullText.length) {
      const timer = setTimeout(() => {
        if (currentCharIndex % 4 === 0) {
          playTypewriterClick();
        }
        setCurrentCharIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedParagraphs((prev) => [...prev, currentFullText]);
        setCurrentParaIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [isOpened, currentParaIndex, currentCharIndex, isFinishedTyping, rawParagraphs]);

  // Mystery Key Select
  const handleSelectKey = (keyItem) => {
    setSelectedKeyId(keyItem.id);

    if (keyItem.isCorrect) {
      setIsGiftUnlocked(true);
      setFeedbackMessage(null);
      playCelebrationFanfare();
      confetti({
        particleCount: 120,
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
        <Mail size={16} />
        <span>{heartfeltLetter.levelTitle}</span>
      </div>

      <h2 className="scene-title">
        {!showGiftBox ? 'A Letter For You 🥹💌' : 'The Mystery Gift Box 🎁✨'}
      </h2>
      <p className="scene-subtitle">
        {!showGiftBox ? heartfeltLetter.subtitle : mysteryGift.subtitle}
      </p>

      {!isOpened ? (
        <div style={{ textAlign: 'center', margin: '30px auto' }}>
          <div
            className="wax-seal"
            style={{
              position: 'relative',
              top: 'auto',
              left: 'auto',
              transform: 'none',
              margin: '0 auto 20px',
              width: 84,
              height: 84
            }}
            onClick={handleOpenLetter}
            title="Click to break wax seal"
          >
            <Heart size={36} fill="#ffffff" color="#ffffff" />
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={handleOpenLetter}
            id="open-wax-seal-btn"
          >
            <Sparkles size={20} />
            <span>{heartfeltLetter.waxSealText}</span>
          </button>
        </div>
      ) : !showGiftBox ? (
        <div className="diary-container">
          <div className="glowing-heart-bg" />

          <div className="diary-sheet glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.4rem', color: 'var(--rose-deep)', fontWeight: 700 }}>
                From {senderName} with all my heart 🌸
              </span>
              {!isFinishedTyping && (
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={handleSkipTyping}
                  title="Reveal all text"
                >
                  <Eye size={14} />
                  <span>Read All</span>
                </button>
              )}
            </div>

            <div className="diary-text">
              {displayedParagraphs.map((para, idx) => (
                <p key={idx} style={{ marginBottom: 18 }}>
                  {para}
                </p>
              ))}

              {!isFinishedTyping && currentParaIndex < rawParagraphs.length && (
                <p style={{ marginBottom: 18 }}>
                  {rawParagraphs[currentParaIndex].slice(0, currentCharIndex)}
                  <span style={{ borderRight: '2px solid var(--rose-pink)', animation: 'flameFlicker 0.6s infinite' }}>&nbsp;</span>
                </p>
              )}

              {isFinishedTyping && (
                <div style={{ marginTop: 28, fontFamily: 'var(--font-hand)', fontSize: '1.8rem', color: 'var(--rose-deep)', lineHeight: 1.4 }}>
                  {heartfeltLetter.signature.replace(/YOUR BEST FRIEND/g, senderName)}
                </div>
              )}
            </div>

            {/* Transition to Mystery Gift Box */}
            {isFinishedTyping && (
              <div style={{ marginTop: 32, textAlign: 'center', animation: 'fadeInScene 0.5s ease' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    playSparkle();
                    setShowGiftBox(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  id="unlock-giftbox-btn"
                >
                  <Gift size={20} />
                  <span>{heartfeltLetter.nextButtonText}</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Mystery Gift Box Section */
        <div className="giftbox-container">
          {!isGiftUnlocked ? (
            <div className="glass-card" style={{ padding: '32px 24px' }}>
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
                    padding: '12px 16px',
                    color: '#c62828',
                    fontWeight: 600,
                    margin: '18px 0',
                    textAlign: 'center'
                  }}
                >
                  {feedbackMessage}
                </div>
              )}

              <div style={{ marginTop: 28, textAlign: 'center' }}>
                <p style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: 16 }}>
                  🗝️ Select the key that unlocks our gift:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mysteryGift.keys.map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      className={`key-btn ${selectedKeyId === k.id ? 'active' : ''}`}
                      onClick={() => handleSelectKey(k)}
                    >
                      <span style={{ fontSize: '1.4rem' }}>{k.icon}</span>
                      <span style={{ fontWeight: 700 }}>{k.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Unlocked Gift Voucher */
            <div className="unlocked-voucher glass-card" style={{ padding: '36px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 10 }}>🎉🎁✨</div>
              <span className="voucher-tag">{mysteryGift.giftCard.tag}</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--rose-deep)', margin: '14px 0' }}>
                {mysteryGift.giftCard.title}
              </h3>

              <div className="voucher-perks">
                {mysteryGift.giftCard.perks.map((perk, idx) => (
                  <div key={idx} className="perk-row">
                    <CheckCircle2 size={18} color="var(--rose-pink)" style={{ flexShrink: 0 }} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', margin: '22px 0 28px', fontSize: '0.98rem' }}>
                {mysteryGift.giftCard.note}
              </p>

              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  playSparkle();
                  onComplete();
                }}
                id="proceed-to-cake-btn"
                style={{ fontSize: '1.1rem', padding: '16px 36px' }}
              >
                <span>{mysteryGift.nextButtonText}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}