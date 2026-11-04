import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, X, ZoomIn } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playCelebrationFanfare, playSparkle } from '../utils/audioSynthesis';

export default function LevelRewardModal({
  isOpen,
  levelIndex,
  onProceed
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const rewardData = birthdayConfig.levelRewards && birthdayConfig.levelRewards[levelIndex];

  useEffect(() => {
    if (isOpen && rewardData) {
      setImgSrc(rewardData.photo || rewardData.fallbackPhoto);
      playCelebrationFanfare();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD6E7', '#F8AFCB', '#F06292', '#F5D58B', '#FFF9FC']
      });
    }
  }, [isOpen, levelIndex, rewardData]);

  if (!isOpen || !rewardData) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onProceed} role="dialog" aria-modal="true">
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 460,
            width: '94%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px 20px',
            textAlign: 'center',
            borderRadius: 24,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F9 100%)',
            border: '2px solid #F8AFCB',
            boxShadow: '0 16px 40px rgba(194, 24, 91, 0.22)',
            animation: 'fadeInScene 0.35s ease',
            position: 'relative'
          }}
        >
          {/* Top Close Button */}
          <button
            type="button"
            className="icon-btn"
            onClick={onProceed}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 32,
              height: 32,
              background: '#FFE4EF',
              color: 'var(--rose-deep)'
            }}
            title="Continue"
            aria-label="Continue"
          >
            <X size={16} />
          </button>

          {/* Header Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'linear-gradient(135deg, #FFD6E7 0%, #FFF0F6 100%)',
              color: 'var(--rose-deep)',
              border: '1.5px solid #F8AFCB',
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: 10
            }}
          >
            <Sparkles size={16} color="var(--rose-pink)" />
            <span>{rewardData.badge || `Level ${levelIndex} Complete! 🌸`}</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1.9rem',
              color: 'var(--rose-deep)',
              margin: '2px 0 10px',
              lineHeight: 1.15
            }}
          >
            {rewardData.title}
          </h3>

          {/* Polaroid Frame for the Unlocked Photo */}
          <div
            style={{
              background: '#ffffff',
              padding: '12px 12px 14px',
              borderRadius: 16,
              boxShadow: '0 8px 24px rgba(194, 24, 91, 0.12)',
              border: '1px solid #FFE4EF',
              margin: '8px auto 14px',
              maxWidth: 350,
              position: 'relative'
            }}
          >
            {/* Washi tape topper */}
            <div
              style={{
                width: 70,
                height: 18,
                background: 'rgba(248, 175, 203, 0.65)',
                margin: '-20px auto 8px',
                borderRadius: 2,
                transform: 'rotate(-2deg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            />

            <div
              style={{
                width: '100%',
                height: 'clamp(230px, 38vh, 310px)',
                borderRadius: 10,
                overflow: 'hidden',
                background: '#FFF5F8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'zoom-in',
                position: 'relative'
              }}
              onClick={() => setIsZoomed(true)}
              title="Click to view full photo 🔍"
            >
              <img
                src={imgSrc}
                alt={rewardData.title}
                onError={() => {
                  if (rewardData.fallbackPhoto && imgSrc !== rewardData.fallbackPhoto) {
                    setImgSrc(rewardData.fallbackPhoto);
                  }
                }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: 8
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: 12,
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <ZoomIn size={12} />
                <span>Full View</span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-main)',
                fontStyle: 'italic',
                marginTop: 12,
                lineHeight: 1.45,
                marginBottom: 2
              }}
            >
              {rewardData.caption}
            </p>
          </div>

          {/* Action Button */}
          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={onProceed}
              style={{ width: '100%', padding: '12px 20px', fontSize: '1rem' }}
            >
              <Heart size={18} fill="#ffffff" />
              <span>{rewardData.nextButtonText || 'PROCEED TO NEXT LEVEL 🎀'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Full Photo Zoom Lightbox */}
      {isZoomed && (
        <div
          className="modal-overlay"
          onClick={() => setIsZoomed(false)}
          style={{ zIndex: 120, background: 'rgba(20, 10, 15, 0.88)' }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="icon-btn"
              onClick={() => setIsZoomed(false)}
              style={{
                position: 'absolute',
                top: -42,
                right: 0,
                background: '#ffffff',
                color: '#333',
                width: 36,
                height: 36,
                borderRadius: '50%'
              }}
            >
              <X size={20} />
            </button>

            <img
              src={imgSrc}
              alt={rewardData.title}
              style={{
                maxWidth: '85vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

