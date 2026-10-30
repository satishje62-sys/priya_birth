import React, { useState } from 'react';
import { Mail, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playSparkle, musicBoxPlayer, getAudioContext } from '../utils/audioSynthesis';

export default function SceneInvitation({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const { invitation } = birthdayConfig;

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      playSparkle();
      setIsOpen(true);
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      musicBoxPlayer.play();
    }
  };

  const handleBeginStory = () => {
    playChime();
    musicBoxPlayer.play();
    onComplete();
  };

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Sparkles size={16} />
        <span>{invitation.badge}</span>
      </div>

      <h1 className="scene-title">{invitation.heading}</h1>
      <p className="scene-subtitle">
        {invitation.subtext1}
        <br />
        <span style={{ color: 'var(--rose-pink)', fontWeight: 600 }}>
          {invitation.subtext2}
        </span>
      </p>

      {!isOpen ? (
        <div className="envelope-container" onClick={handleOpenEnvelope}>
          <div className="envelope" title="Click to open your surprise!">
            <div className="envelope-flap" />
            <div className="wax-seal">
              <Heart size={28} fill="#ffffff" color="#ffffff" />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleOpenEnvelope}
              id="open-surprise-btn"
            >
              <Mail size={20} />
              <span>{invitation.openButtonText}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="invitation-letter-card glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Heart size={22} fill="var(--rose-pink)" color="var(--rose-pink)" />
            <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.4rem', color: 'var(--rose-deep)' }}>
              A Personal Letter For You
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: '1.08rem',
              lineHeight: 1.7,
              color: 'var(--text-main)',
              whiteSpace: 'pre-wrap',
              marginBottom: 28
            }}
          >
            {invitation.envelopeLetter}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleBeginStory}
              id="start-story-btn"
            >
              <span>{invitation.startButtonText}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
