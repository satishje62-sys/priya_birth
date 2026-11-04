import React, { useState, useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import HeaderControls from './components/HeaderControls';
import SceneInvitation from './components/SceneInvitation';
import SceneVaultCode from './components/SceneVaultCode';
import SceneLetterPuzzle from './components/SceneLetterPuzzle';
import SceneRibbonFlow from './components/SceneRibbonFlow';
import SceneMemoryMatch from './components/SceneMemoryMatch';
import SceneMindCraft from './components/SceneMindCraft';
import SceneMemoryGarden from './components/SceneMemoryGarden';
import SceneHeartfeltLetter from './components/SceneHeartfeltLetter';
import SceneBirthdayCake from './components/SceneBirthdayCake';
import SceneCelebration from './components/SceneCelebration';
import SceneSecretEnding from './components/SceneSecretEnding';
import LevelModal from './components/LevelModal';
import LevelRewardModal from './components/LevelRewardModal';
import { clearProgress } from './utils/storage';
import { playSparkle, musicBoxPlayer, birthdaySongPlayer, getAudioContext } from './utils/audioSynthesis';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [rewardLevel, setRewardLevel] = useState(null);

  // Always start from Level 1 (Magical Invitation) on fresh open or refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    clearProgress();
    birthdaySongPlayer.stop();
  }, []);

  // Global user interaction gesture to start instrumental music for levels 0 to 7
  useEffect(() => {
    const handleFirstGesture = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (currentLevel <= 7 && !birthdaySongPlayer.isPlaying) {
        musicBoxPlayer.play();
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
    };
  }, [currentLevel]);

  // Audio coordination across levels:
  // - Levels 0 to 7: Instrumental music box keeps playing
  // - Level 8: Stop instrumental for wishing; birthday song triggers on blow
  // - Level 9+: Birthday song continues playing
  useEffect(() => {
    if (currentLevel <= 7) {
      if (!birthdaySongPlayer.isPlaying) {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        musicBoxPlayer.play();
      }
    } else if (currentLevel === 8) {
      // Wishing stage: stop instrumental so wishing is intimate
      musicBoxPlayer.stop();
    } else if (currentLevel >= 9) {
      // Celebration: ensure birthday song is playing
      if (!birthdaySongPlayer.isPlaying) {
        birthdaySongPlayer.play();
      }
    }
  }, [currentLevel]);

  // Complete a stage and advance
  const handleStageComplete = (stageIdx) => {
    const nextCompleted = Array.from(new Set([...completedLevels, stageIdx]));
    setCompletedLevels(nextCompleted);

    // Show secret photo reward modal after levels 1, 2, 3, 4
    if (stageIdx >= 1 && stageIdx <= 4) {
      setRewardLevel(stageIdx);
    } else {
      const nextLevel = Math.min(10, stageIdx + 1);
      setCurrentLevel(nextLevel);
      playSparkle();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Proceed after viewing reward photo
  const handleProceedFromReward = () => {
    if (rewardLevel !== null) {
      const nextLevel = Math.min(10, rewardLevel + 1);
      setRewardLevel(null);
      setCurrentLevel(nextLevel);
      playSparkle();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Jump to specific level
  const handleSelectLevel = (levelIdx) => {
    setRewardLevel(null);
    setCurrentLevel(levelIdx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Full Reset
  const handleResetAdventure = () => {
    if (window.confirm('Would you like to restart the birthday adventure from the beginning? 🎀')) {
      clearProgress();
      birthdaySongPlayer.stop();
      musicBoxPlayer.stop();
      setRewardLevel(null);
      setCurrentLevel(0);
      setCompletedLevels([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Background Floating Petals & Hearts */}
      <BackgroundEffects />

      {/* Top Header & Progress */}
      <HeaderControls
        currentLevel={currentLevel}
        completedLevels={completedLevels}
        onOpenLevelModal={() => setIsLevelModalOpen(true)}
        onResetAdventure={handleResetAdventure}
      />

      {/* Active Scene */}
      <main id="main-content">
        {currentLevel === 0 && (
          <SceneInvitation onComplete={() => handleStageComplete(0)} />
        )}
        {currentLevel === 1 && (
          <SceneVaultCode onComplete={() => handleStageComplete(1)} />
        )}
        {currentLevel === 2 && (
          <SceneLetterPuzzle onComplete={() => handleStageComplete(2)} />
        )}
        {currentLevel === 3 && (
          <SceneRibbonFlow onComplete={() => handleStageComplete(3)} />
        )}
        {currentLevel === 4 && (
          <SceneMemoryMatch onComplete={() => handleStageComplete(4)} />
        )}
        {currentLevel === 5 && (
          <SceneMindCraft onComplete={() => handleStageComplete(5)} />
        )}
        {currentLevel === 6 && (
          <SceneMemoryGarden onComplete={() => handleStageComplete(6)} />
        )}
        {currentLevel === 7 && (
          <SceneHeartfeltLetter onComplete={() => handleStageComplete(7)} />
        )}
        {currentLevel === 8 && (
          <SceneBirthdayCake onComplete={() => handleStageComplete(8)} />
        )}
        {currentLevel === 9 && (
          <SceneCelebration onComplete={() => handleStageComplete(9)} />
        )}
        {currentLevel === 10 && (
          <SceneSecretEnding
            onReplay={() => {
              clearProgress();
              setCurrentLevel(0);
              setCompletedLevels([]);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onJumpToGarden={() => handleSelectLevel(6)}
          />
        )}
      </main>

      {/* Level Navigator Modal */}
      <LevelModal
        isOpen={isLevelModalOpen}
        onClose={() => setIsLevelModalOpen(false)}
        currentLevel={currentLevel}
        completedLevels={completedLevels}
        onSelectLevel={handleSelectLevel}
      />

      {/* Level Completion Photo Reward Modal */}
      <LevelRewardModal
        isOpen={rewardLevel !== null}
        levelIndex={rewardLevel}
        onProceed={handleProceedFromReward}
      />
    </div>
  );
}
