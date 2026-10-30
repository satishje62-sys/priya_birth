import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playSparkle, playCelebrationFanfare } from '../utils/audioSynthesis';

export default function SceneLetterPuzzle({ onComplete }) {
  const { letterPuzzle } = birthdayConfig;
  const target = letterPuzzle.targetPhrase.toUpperCase(); // "BEST FRIENDS FOREVER"

  // Split into words so we can layout cleanly
  // words: ["BEST", "FRIENDS", "FOREVER"]
  const words = target.split(' ');

  // Create an array of letters with their target index in the phrase (ignoring spaces)
  // Target phrase without spaces:
  const lettersOnly = target.replace(/\s+/g, '').split('');
  const totalLetters = lettersOnly.length;

  // State: current tile order (array of character strings)
  const [currentTiles, setCurrentTiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [hintCount, setHintCount] = useState(0);

  // Helper to shuffle an array
  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    // ensure it's not accidentally already solved
    if (copy.join('') === lettersOnly.join('')) {
      const temp = copy[0];
      copy[0] = copy[1];
      copy[1] = temp;
    }
    return copy;
  };

  // Initialize shuffled tiles
  useEffect(() => {
    setCurrentTiles(shuffle(lettersOnly));
  }, []);

  // Calculate correctly placed count
  const correctlyPlacedCount = currentTiles.reduce((acc, letter, idx) => {
    return letter === lettersOnly[idx] ? acc + 1 : acc;
  }, 0);

  const progressPercentage = Math.round((correctlyPlacedCount / totalLetters) * 100);

  // Check if solved whenever tiles change
  useEffect(() => {
    if (currentTiles.length > 0 && currentTiles.join('') === lettersOnly.join('')) {
      if (!isSolved) {
        setIsSolved(true);
        playCelebrationFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD6E7', '#F8AFCB', '#F06292', '#F5D58B', '#E8DDFB']
        });
      }
    }
  }, [currentTiles, isSolved, lettersOnly]);

  // Click / touch to swap handler
  const handleTileClick = (idx) => {
    if (isSolved) return;

    if (selectedIndex === null) {
      setSelectedIndex(idx);
      playChime(440);
    } else if (selectedIndex === idx) {
      setSelectedIndex(null);
    } else {
      // Swap tiles at selectedIndex and idx
      const updated = [...currentTiles];
      const temp = updated[selectedIndex];
      updated[selectedIndex] = updated[idx];
      updated[idx] = temp;

      setCurrentTiles(updated);
      setSelectedIndex(null);

      // Sound feedback
      if (updated[idx] === lettersOnly[idx] || updated[selectedIndex] === lettersOnly[selectedIndex]) {
        playSparkle();
      } else {
        playChime(523.25);
      }
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, idx) => {
    if (isSolved) return;
    e.dataTransfer.setData('text/plain', idx.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (isSolved) return;
    const fromIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(fromIdx) && fromIdx !== targetIdx) {
      const updated = [...currentTiles];
      const temp = updated[fromIdx];
      updated[fromIdx] = updated[targetIdx];
      updated[targetIdx] = temp;
      setCurrentTiles(updated);
      playChime(587.33);
    }
  };

  // Reset / Reshuffle
  const handleReset = () => {
    setIsSolved(false);
    setSelectedIndex(null);
    setCurrentTiles(shuffle(lettersOnly));
    playChime(392);
  };

  // Hint: correctly place the next incorrect tile
  const handleHint = () => {
    if (isSolved) return;
    const firstWrongIdx = currentTiles.findIndex((letter, idx) => letter !== lettersOnly[idx]);
    if (firstWrongIdx === -1) return;

    // Find where the correct letter currently is
    const targetLetter = lettersOnly[firstWrongIdx];
    const sourceIdx = currentTiles.findIndex((l, idx) => idx > firstWrongIdx && l === targetLetter);

    if (sourceIdx !== -1) {
      const updated = [...currentTiles];
      const temp = updated[firstWrongIdx];
      updated[firstWrongIdx] = updated[sourceIdx];
      updated[sourceIdx] = temp;

      setCurrentTiles(updated);
      setHintCount((prev) => prev + 1);
      playSparkle();
    }
  };

  // Render tiles grouped by words so it looks neat
  let letterOffsetCounter = 0;

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Sparkles size={16} />
        <span>{letterPuzzle.levelTitle}</span>
      </div>

      <h2 className="scene-title">The Secret Friendship Phrase 💗</h2>
      <p className="scene-subtitle">{letterPuzzle.subtitle}</p>

      <div className="puzzle-board glass-card">
        {/* Progress and controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--rose-pink)' }}>
              Letters Solved: {correctlyPlacedCount} / {totalLetters} ({progressPercentage}%)
            </span>
            <div style={{ width: 180, height: 8, background: '#f8d7e6', borderRadius: 4, marginTop: 4, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #F06292, #66BB6A)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              onClick={handleHint}
              disabled={isSolved}
              title="Autofill one letter"
            >
              <Lightbulb size={16} />
              <span>Hint</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              onClick={handleReset}
              title="Reshuffle letters"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-soft)', marginBottom: 20 }}>
          💡 <em>Tip: Tap two tiles to swap them, or drag and drop into position!</em>
        </p>

        {/* Word Groups & Letter Tiles */}
        <div className="letter-tiles-container">
          {words.map((word, wordIdx) => {
            const wordLetters = word.split('');
            const wordTileElements = wordLetters.map((_, i) => {
              const globalIdx = letterOffsetCounter++;
              const letter = currentTiles[globalIdx] || '';
              const isCorrectSlot = letter === lettersOnly[globalIdx];
              const isSelected = selectedIndex === globalIdx;

              return (
                <div
                  key={globalIdx}
                  className={`letter-tile ${isSelected ? 'selected' : ''} ${isCorrectSlot ? 'correct-slot' : ''}`}
                  onClick={() => handleTileClick(globalIdx)}
                  draggable={!isSolved}
                  onDragStart={(e) => handleDragStart(e, globalIdx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, globalIdx)}
                  title={`Tile #${globalIdx + 1}: ${letter}`}
                >
                  {letter}
                  {isCorrectSlot && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: '#4caf50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 9
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              );
            });

            return (
              <div key={wordIdx} className="puzzle-word-group">
                {wordTileElements}
              </div>
            );
          })}
        </div>

        {/* Solved celebration reveal */}
        {isSolved ? (
          <div style={{ marginTop: 28, animation: 'fadeInScene 0.5s ease', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#2e7d32', fontWeight: 700, fontSize: '1.2rem', marginBottom: 12 }}>
              <CheckCircle2 size={24} />
              <span>PUZZLE SOLVED! 🎀</span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.8rem',
                color: 'var(--rose-deep)',
                margin: '12px auto 24px',
                maxWidth: 520,
                lineHeight: 1.4
              }}
            >
              “{letterPuzzle.solvedMessage}”
            </p>

            <button
              type="button"
              className="btn-primary"
              onClick={onComplete}
              id="unlock-level3-btn"
            >
              <span>{letterPuzzle.nextButtonText}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 14, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Clue: {letterPuzzle.hintText}
          </div>
        )}
      </div>
    </div>
  );
}
