import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Lightbulb, ArrowRight, Award } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playErrorBoing, playCelebrationFanfare } from '../utils/audioSynthesis';

export default function SceneQuiz({ onComplete, initialAnswers = {} }) {
  const { quiz } = birthdayConfig;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

  const handleSelectOption = (idx) => {
    if (isAnswerChecked && isCorrect) return; // already solved
    setSelectedOption(idx);
    setIsAnswerChecked(true);

    if (idx === currentQ.correctIndex) {
      setIsCorrect(true);
      playChime(659.25);
    } else {
      setIsCorrect(false);
      playErrorBoing();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setShowHint(false);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      playChime(523.25);
    } else {
      setIsQuizCompleted(true);
      playCelebrationFanfare();
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <HelpCircle size={16} />
        <span>{quiz.levelTitle}</span>
      </div>

      <h2 className="scene-title">How Well Do You Know Us? 🧩</h2>
      <p className="scene-subtitle">{quiz.subtitle}</p>

      {!isQuizCompleted ? (
        <div className="quiz-container">
          <div className="quiz-card glass-card">
            {/* Progress indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="quiz-counter">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => setShowHint(!showHint)}
                title="Need a clue?"
              >
                <Lightbulb size={16} />
                <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
              </button>
            </div>

            {/* Hint Box */}
            {showHint && (
              <div
                style={{
                  background: '#fffde7',
                  border: '1px solid #ffe082',
                  padding: '10px 16px',
                  borderRadius: 12,
                  fontSize: '0.92rem',
                  color: '#795548',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Lightbulb size={18} color="#f57f17" />
                <span><strong>Hint:</strong> {currentQ.hint}</span>
              </div>
            )}

            {/* Question Text */}
            <h3 className="quiz-question-text">{currentQ.question}</h3>

            {/* Multiple Choice Options */}
            <div className="quiz-options-list">
              {currentQ.options.map((opt, optIdx) => {
                let statusClass = '';
                if (isAnswerChecked && selectedOption === optIdx) {
                  statusClass = isCorrect ? 'correct' : 'wrong';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    className={`quiz-option-btn ${statusClass}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'rgba(240, 98, 146, 0.15)',
                        color: 'var(--rose-deep)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {isAnswerChecked && selectedOption === optIdx && (
                      isCorrect ? (
                        <CheckCircle2 size={22} color="#2e7d32" />
                      ) : (
                        <XCircle size={22} color="#c62828" />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Actions */}
            {isAnswerChecked && (
              <>
                <div className={`quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle2 size={24} />
                      <div>{currentQ.correctFeedback}</div>
                    </>
                  ) : (
                    <>
                      <XCircle size={24} />
                      <div>{currentQ.wrongFeedback}</div>
                    </>
                  )}
                </div>

                <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  {!isCorrect && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleRetry}
                    >
                      Try Again 🔄
                    </button>
                  )}
                  {isCorrect && (
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleNextQuestion}
                      id="next-quiz-btn"
                    >
                      <span>{currentIndex + 1 === totalQuestions ? 'Finish Quiz ✨' : 'Next Question'}</span>
                      <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Celebration Screen */
        <div className="quiz-card glass-card" style={{ textAlign: 'center', padding: '40px 24px', maxWidth: 560 }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>🎀✨</div>
          <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '2.5rem', color: 'var(--rose-deep)', marginBottom: 12 }}>
            {quiz.completionMessage}
          </h3>
          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-main)',
              fontStyle: 'italic',
              marginBottom: 28,
              lineHeight: 1.6
            }}
          >
            “{quiz.completionQuote}”
          </p>

          <button
            type="button"
            className="btn-primary"
            onClick={onComplete}
            id="unlock-level2-btn"
          >
            <span>Proceed to Level 2 💗</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
