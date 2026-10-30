/**
 * LocalStorage state persistence for the birthday adventure
 */

const STORAGE_KEY = 'birthday_adventure_state_v1';

export function loadSavedProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      currentLevel: typeof parsed.currentLevel === 'number' ? parsed.currentLevel : 0,
      completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [],
      quizAnswers: parsed.quizAnswers || {},
      letterPuzzleSolved: Boolean(parsed.letterPuzzleSolved),
      challengeAnswers: parsed.challengeAnswers || {},
      giftUnlocked: Boolean(parsed.giftUnlocked),
      candlesBlown: Boolean(parsed.candlesBlown),
      secretUnlocked: Boolean(parsed.secretUnlocked)
    };
  } catch (e) {
    console.warn('Failed to load saved progress:', e);
    return null;
  }
}

export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save progress to localStorage:', e);
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear progress:', e);
  }
}
