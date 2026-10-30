import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, RotateCcw, List, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { setMuteState, isMuted, musicBoxPlayer, birthdaySongPlayer, playChime } from '../utils/audioSynthesis';

export default function HeaderControls({
  currentLevel,
  completedLevels,
  onOpenLevelModal,
  onResetAdventure
}) {
  const [muted, setMuted] = useState(isMuted());
  const [musicActive, setMusicActive] = useState(false);

  useEffect(() => {
    const unsub1 = musicBoxPlayer.subscribe((active) => {
      setMusicActive(active || birthdaySongPlayer.isPlaying);
    });
    const unsub2 = birthdaySongPlayer.subscribe(({ isPlaying }) => {
      setMusicActive(isPlaying || musicBoxPlayer.isPlaying);
    });
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const levelNames = [
    'Invitation 💌',
    'Level 1: Vault 🔐',
    'Level 2: Puzzle 💗',
    'Level 3: Ribbon Flow 🎀',
    'Level 4: Memory Match 🃏',
    'Level 5: MindCraft ⛏️',
    'Level 6: Memories 🌸',
    'Level 7: Letter & Gift 🎁',
    'Level 8: Cake & Wish 🎂',
    'Level 9: Celebration 🎉',
    'Secret Ending ❤️'
  ];

  const toggleSound = () => {
    const nextState = !muted;
    setMuted(nextState);
    setMuteState(nextState);
    if (!nextState) {
      playChime();
    }
  };

  const toggleMusic = () => {
    if (birthdaySongPlayer.isPlaying) {
      birthdaySongPlayer.pause();
    } else if (birthdaySongPlayer.audio && birthdaySongPlayer.audio.currentTime > 0) {
      birthdaySongPlayer.play();
    } else if (musicBoxPlayer.isPlaying) {
      musicBoxPlayer.stop();
    } else {
      musicBoxPlayer.play();
    }
  };

  return (
    <header className="header-bar" role="banner">
      <div className="header-brand">
        <Sparkles size={22} className="spin-slow" />
        <span>For {birthdayConfig.birthdayName} 🎀</span>
      </div>

      {/* Progress Dots */}
      <div className="progress-track" title={`Stage: ${levelNames[currentLevel] || ''}`}>
        {levelNames.map((_, idx) => {
          const isCompleted = completedLevels.includes(idx);
          const isActive = currentLevel === idx;
          return (
            <div
              key={idx}
              className={`progress-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              title={levelNames[idx]}
            />
          );
        })}
      </div>

      {/* Action Controls */}
      <div className="header-actions">
        {/* Ambient Music Toggle */}
        <button
          type="button"
          onClick={toggleMusic}
          className="icon-btn"
          title={musicActive ? 'Pause Music Box' : 'Play Music Box'}
          aria-label={musicActive ? 'Pause Music Box' : 'Play Music Box'}
          style={musicActive ? { background: '#ffd6e7', borderColor: '#f06292' } : {}}
        >
          <Music size={18} />
        </button>

        {/* SFX Mute Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className="icon-btn"
          title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          aria-label={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Level Menu Button */}
        <button
          type="button"
          onClick={onOpenLevelModal}
          className="icon-btn"
          title="Scene Navigator"
          aria-label="Scene Navigator"
        >
          <List size={18} />
        </button>

        {/* Reset Adventure Button */}
        <button
          type="button"
          onClick={onResetAdventure}
          className="icon-btn"
          title="Reset Adventure"
          aria-label="Reset Adventure"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </header>
  );
}
