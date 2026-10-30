import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Laugh, Trophy, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playCelebrationFanfare } from '../utils/audioSynthesis';

export default function SceneFunnyChallenge({ onComplete }) {
  const { funnyChallenge } = birthdayConfig;
  const questions = funnyChallenge.questions;
  const totalQ = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectChoice = (choice) => {
    setChosenAnswer(choice);
    playChime(587.33);
  };

  const handleNext = () => {
    setChosenAnswer(null);
    if (currentIndex + 1 < totalQ) {
      setCurrentIndex((prev) => prev + 1);
      playChime(523.25);
    } else {
      setIsCompleted(true);
      playCelebrationFanfare();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F5D58B', '#F8AFCB', '#F06292', '#E8DDFB', '#FFE4EF']
      });
    }
  };

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Laugh size={16} />
        <span>{funnyChallenge.levelTitle}</span>
      </div>

      <h2 className="scene-title">The Bestie Chaos Challenge 😂</h2>
      <p className="scene-subtitle">{funnyChallenge.subtitle}</p>

      {!isCompleted ? (
        <div className="challenge-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--rose-pink)' }}>
              Challenge {currentIndex + 1} of {totalQ}
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 22, color: 'var(--text-main)', lineHeight: 1.4 }}>
            {currentQ.prompt}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {currentQ.choices.map((choice, idx) => {
              const isSelected = chosenAnswer?.text === choice.text;
              return (
                <button
                  key={idx}
                  type="button"
                  className="quiz-option-btn"
                  style={isSelected ? { borderColor: 'var(--rose-pink)', background: '#fff0f6' } : {}}
                  onClick={() => handleSelectChoice(choice)}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'rgba(240, 98, 146, 0.15)',
                      color: 'var(--rose-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ flex: 1 }}>{choice.text}</span>
                </button>
              );
            })}
          </div>

          {chosenAnswer && (
            <div
              style={{
                background: '#fff3e0',
                border: '1.5px solid #ffb74d',
                borderRadius: 16,
                padding: '16px 20px',
                marginTop: 20,
                fontSize: '1rem',
                color: '#e65100',
                fontWeight: 600,
                animation: 'fadeInScene 0.3s ease'
              }}
            >
              💬 {chosenAnswer.response}
            </div>
          )}

          {chosenAnswer && (
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleNext}
                id="next-challenge-btn"
              >
                <span>{currentIndex + 1 === totalQ ? 'Claim Official Trophy 🏆' : 'Next Chaos Question'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Trophy ceremony */
        <div className="challenge-card glass-card trophy-container">
          <div className="trophy-icon">🏆✨</div>
          <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '2.5rem', color: 'var(--rose-deep)', margin: '14px 0 8px' }}>
            {funnyChallenge.trophyTitle}
          </h3>

          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--rose-deep)',
              marginBottom: 10,
              lineHeight: 1.4
            }}
          >
            {funnyChallenge.trophyQuote}
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.5 }}>
            {funnyChallenge.trophySubtext}
          </p>

          <button
            type="button"
            className="btn-primary"
            onClick={onComplete}
            id="unlock-level5-btn"
          >
            <Heart size={20} fill="#ffffff" />
            <span>{funnyChallenge.nextButtonText}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
