import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playErrorBoing, playSparkle, playCelebrationFanfare } from '../utils/audioSynthesis';

const CARD_ITEMS = [
  { id: 'bow', icon: '🎀', label: 'Bestie Bow' },
  { id: 'strawberry', icon: '🍓', label: 'Sweet Berry' },
  { id: 'cake', icon: '🍰', label: 'Birthday Cake' },
  { id: 'camera', icon: '📸', label: 'Polaroid Shot' },
  { id: 'milkshake', icon: '🥤', label: 'Cafe Drink' },
  { id: 'teddy', icon: '🧸', label: 'Cozy Teddy' }
];

export default function SceneMemoryMatch({ onComplete }) {
  const { memoryMatch } = birthdayConfig;

  // Generate 12 cards (2 of each from CARD_ITEMS) shuffled
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [flipsCount, setFlipsCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  // Initialize and shuffle
  const initializeGame = () => {
    const deck = [...CARD_ITEMS, ...CARD_ITEMS].map((item, idx) => ({
      uniqueKey: `${item.id}-${idx}`,
      id: item.id,
      icon: item.icon,
      label: item.label
    }));

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setFlipsCount(0);
    setIsSolved(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Handle card click
  const handleCardClick = (idx) => {
    if (isLocked || isSolved) return;
    if (flippedIndices.includes(idx) || matchedIds.includes(cards[idx].id)) return;

    playChime(500 + idx * 30);
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);
    setFlipsCount((prev) => prev + 1);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.id === secondCard.id) {
        // MATCH!
        setTimeout(() => {
          playSparkle();
          setMatchedIds((prev) => {
            const next = [...prev, firstCard.id];
            if (next.length === CARD_ITEMS.length) {
              setIsSolved(true);
              playCelebrationFanfare();
              confetti({
                particleCount: 110,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#FFD6E7', '#F8AFCB', '#F06292', '#F5D58B', '#FFF9FC']
              });
            }
            return next;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 500);
      } else {
        // MISMATCH
        setTimeout(() => {
          playErrorBoing();
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  // Peek Hint: reveals unmatched cards for 1.2s
  const handlePeekHint = () => {
    if (isLocked || isSolved) return;
    playSparkle();
    const allUnmatched = cards
      .map((c, i) => (matchedIds.includes(c.id) ? null : i))
      .filter((i) => i !== null);

    setFlippedIndices(allUnmatched);
    setIsLocked(true);

    setTimeout(() => {
      setFlippedIndices([]);
      setIsLocked(false);
    }, 1200);
  };

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Sparkles size={16} />
        <span>{memoryMatch.levelTitle}</span>
      </div>

      <h2 className="scene-title">Bestie Memory Match 🃏✨</h2>
      <p className="scene-subtitle">{memoryMatch.subtitle}</p>

      <div className="glass-card" style={{ maxWidth: 640, width: '100%', padding: '30px 20px', textAlign: 'center' }}>
        {/* Controls & Score header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--rose-deep)' }}>
              Pairs: {matchedIds.length} / {CARD_ITEMS.length}
            </span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>
              Total Flips: {flipsCount}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              onClick={handlePeekHint}
              disabled={isLocked || isSolved}
              title="Peek at all cards"
            >
              <Eye size={14} />
              <span>Peek Hint</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              onClick={initializeGame}
              title="Reshuffle Deck"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 12-Card Grid (4 cols x 3 rows) */}
        <div className="memory-match-grid">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);

            return (
              <div
                key={card.uniqueKey}
                onClick={() => handleCardClick(idx)}
                style={{
                  aspectRatio: '3 / 4',
                  perspective: 800,
                  cursor: isFlipped ? 'default' : 'pointer',
                  userSelect: 'none'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Card Back (Face down) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #ffd6e7 0%, #f8afcb 100%)',
                      border: '2px solid #ffffff',
                      borderRadius: 14,
                      boxShadow: '0 4px 10px rgba(240, 98, 146, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(20px, 5vw, 26px)',
                      color: '#ffffff'
                    }}
                  >
                    🎀
                  </div>

                  {/* Card Front (Face up) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: isMatched ? '#E8F5E9' : '#ffffff',
                      border: isMatched ? '2px solid #66BB6A' : '2px solid var(--rose-pink)',
                      borderRadius: 14,
                      boxShadow: isMatched ? '0 0 12px rgba(102, 187, 106, 0.4)' : '0 4px 12px rgba(240, 98, 146, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 2px',
                      gap: 2
                    }}
                  >
                    <span style={{ fontSize: 'clamp(22px, 5.5vw, 32px)' }}>{card.icon}</span>
                    <span style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.68rem)', fontWeight: 700, textAlign: 'center', lineHeight: 1.1, color: isMatched ? '#2e7d32' : 'var(--text-main)' }}>
                      {card.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Solved Ceremony */}
        {isSolved ? (
          <div style={{ marginTop: 20, animation: 'fadeInScene 0.5s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#2e7d32', fontWeight: 800, fontSize: '1.25rem', marginBottom: 8 }}>
              <CheckCircle2 size={26} />
              <span>{memoryMatch.successTitle}</span>
            </div>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-main)', marginBottom: 20 }}>
              {memoryMatch.successMessage}
            </p>

            <button
              type="button"
              className="btn-primary"
              onClick={onComplete}
              id="unlock-memory-garden-btn"
            >
              <span>{memoryMatch.nextButtonText}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)' }}>
            💡 <em>Flip any 2 cards to find their matching pairs!</em>
          </p>
        )}
      </div>
    </div>
  );
}
