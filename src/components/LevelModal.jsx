import React from 'react';
import { X, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export default function LevelModal({
  isOpen,
  onClose,
  currentLevel,
  completedLevels,
  onSelectLevel
}) {
  if (!isOpen) return null;

  const levels = [
    { id: 0, title: 'The Magical Invitation 💌', desc: 'A special delivery waiting to be opened' },
    { id: 1, title: 'Level 1: The Secret Vault 🔐', desc: 'Crack the 4-digit code using friendship deduction' },
    { id: 2, title: 'Level 2: The Secret Phrase 💗', desc: 'Unscramble our sacred friendship letters' },
    { id: 3, title: 'Level 3: Magical Ribbon Flow 🎀⚡', desc: 'Rotate tiles to connect our two hearts' },
    { id: 4, title: 'Level 4: Bestie Memory Match 🃏✨', desc: 'Flip and match 6 pairs of friendship tokens' },
    { id: 5, title: 'Level 5: MindCraft Brainstorm Lab 🧠⛏️', desc: 'Solve recipes & forge 3 legendary friendship artifacts' },
    { id: 6, title: 'Level 6: Our Memory Garden 🌸📸', desc: 'Digital polaroid scrapbook of our chapters' },
    { id: 7, title: 'Level 7: Heartfelt Letter & Gift Box 🥹🎁', desc: 'A personal handwritten letter and secret gift voucher' },
    { id: 8, title: 'Level 8: Birthday Cake & Wish 🎂🕯️', desc: 'Blow out the candles using mic or touch' },
    { id: 9, title: 'Level 9: Birthday Celebration 🎶🎉', desc: 'Fireworks, automatic music, confetti & memories' },
    { id: 10, title: 'Secret Ending: Friendship Promise 🌷❤️', desc: 'A timeless promise of lifelong friendship' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={20} color="var(--rose-pink)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--rose-deep)' }}>
              Adventure Chapters
            </h3>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            style={{ width: 34, height: 34 }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: '60vh', overflowY: 'auto', paddingRight: 4 }}>
          {levels.map((lvl) => {
            const isCompleted = completedLevels.includes(lvl.id);
            const isCurrent = currentLevel === lvl.id;
            const isAccessible = isCompleted || isCurrent || lvl.id <= Math.max(0, ...completedLevels) + 1;

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  if (isAccessible) {
                    onSelectLevel(lvl.id);
                    onClose();
                  }
                }}
                disabled={!isAccessible}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: isCurrent
                    ? '#FFE4EF'
                    : isCompleted
                    ? '#F8F9FA'
                    : '#FAF4F8',
                  border: isCurrent
                    ? '2px solid var(--rose-pink)'
                    : '1px solid rgba(240, 98, 146, 0.2)',
                  textAlign: 'left',
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  opacity: isAccessible ? 1 : 0.6,
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem', color: isCurrent ? 'var(--rose-deep)' : 'var(--text-main)' }}>
                    {lvl.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-soft)', marginTop: 2 }}>
                    {lvl.desc}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 12 }}>
                  {isCompleted && <CheckCircle2 size={18} color="#4caf50" />}
                  {isCurrent && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--rose-deep)', background: '#fff', padding: '2px 8px', borderRadius: 8 }}>
                      CURRENT
                    </span>
                  )}
                  {!isAccessible && <Lock size={16} color="#aaa" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
