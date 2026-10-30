import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Pickaxe, Sparkles, CheckCircle2, ArrowRight, Lightbulb, RotateCcw, Hammer, Shield, Radio, Crown } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playBlockPlaceSound, playCraftSuccessSound, playErrorBoing, playSparkle } from '../utils/audioSynthesis';

const INVENTORY_ITEMS = [
  { id: 'diamond', name: 'Friendship Diamond', icon: '💎', color: '#00e5ff', bg: '#e0f7fa' },
  { id: 'blossom', name: 'Blossom Block', icon: '🌸', color: '#f06292', bg: '#fce4ec' },
  { id: 'redstone', name: 'Redstone Energy', icon: '⚡', color: '#ff1744', bg: '#ffebee' },
  { id: 'honey', name: 'Sweet Honey', icon: '🍯', color: '#ffb300', bg: '#fff8e1' },
  { id: 'star', name: 'Star Sparkle', icon: '🌟', color: '#ffd600', bg: '#fffde7' },
  { id: 'obsidian', name: 'Trust Obsidian', icon: '💖', color: '#aa00ff', bg: '#f3e5f5' },
  { id: 'gold', name: 'Golden Ingot', icon: '👑', color: '#ffd700', bg: '#fff9c4' },
  { id: 'cake', name: 'Vanilla Sugar', icon: '🧁', color: '#ec407a', bg: '#f8bbd0' }
];

export default function SceneMindCraft({ onComplete }) {
  const { mindcraft } = birthdayConfig;
  const recipes = mindcraft.recipes;

  const [activeRecipeIdx, setActiveRecipeIdx] = useState(0);
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [selectedItem, setSelectedItem] = useState(INVENTORY_ITEMS[0].id);
  const [craftedRecipeIds, setCraftedRecipeIds] = useState([]);
  const [lastCraftedModal, setLastCraftedModal] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const currentRecipe = recipes[activeRecipeIdx] || recipes[recipes.length - 1];

  // Check if grid currently matches the current recipe
  const checkRecipeMatch = () => {
    if (!currentRecipe) return false;
    const req = currentRecipe.requiredSlots;
    for (let i = 0; i < 9; i++) {
      if (req[i]) {
        if (grid[i] !== req[i]) return false;
      } else {
        if (grid[i] !== null) return false;
      }
    }
    return true;
  };

  const isMatched = checkRecipeMatch();
  const allCrafted = craftedRecipeIds.length === recipes.length;

  const handleSlotClick = (slotIdx) => {
    playBlockPlaceSound();
    setGrid((prev) => {
      const next = [...prev];
      if (next[slotIdx] === selectedItem) {
        // Toggle off if same item clicked
        next[slotIdx] = null;
      } else {
        next[slotIdx] = selectedItem;
      }
      return next;
    });
  };

  const handleClearGrid = () => {
    setGrid(Array(9).fill(null));
    playBlockPlaceSound();
  };

  // Brainstorm auto-fill helper
  const handleAutoBrainstorm = () => {
    playSparkle();
    const next = Array(9).fill(null);
    Object.entries(currentRecipe.requiredSlots).forEach(([idx, itemId]) => {
      next[Number(idx)] = itemId;
    });
    setGrid(next);
  };

  // Craft action
  const handleCraft = () => {
    if (!isMatched) {
      playErrorBoing();
      return;
    }

    playCraftSuccessSound();
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD6E7', '#F06292', '#F5D58B', '#00e5ff', '#E8DDFB']
    });

    const newlyCraftedId = currentRecipe.id;
    const updatedCrafted = Array.from(new Set([...craftedRecipeIds, newlyCraftedId]));
    setCraftedRecipeIds(updatedCrafted);
    setLastCraftedModal(currentRecipe.craftedItem);
    setGrid(Array(9).fill(null));
    setShowHint(false);

    if (activeRecipeIdx + 1 < recipes.length) {
      setActiveRecipeIdx((prev) => prev + 1);
    }
  };

  return (
    <div className="scene-wrapper mindcraft-wrapper">
      {/* Badge */}
      <div className="scene-badge">
        <Pickaxe size={16} />
        <span>{mindcraft.levelTitle}</span>
      </div>

      <h2 className="scene-title">The MindCraft Friendship Forge ⛏️🧠</h2>
      <p className="scene-subtitle">{mindcraft.subtitle}</p>

      {/* Crafted Progress Tracker */}
      <div className="mindcraft-progress-bar glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--rose-deep)' }}>
            Artifacts Forged: {craftedRecipeIds.length} / {recipes.length}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {allCrafted ? '✨ Master Architect Status!' : `Crafting: ${currentRecipe.title}`}
          </span>
        </div>
        <div className="mindcraft-track">
          {recipes.map((r, i) => {
            const done = craftedRecipeIds.includes(r.id);
            const active = activeRecipeIdx === i && !done;
            return (
              <div
                key={r.id}
                className={`mindcraft-track-step ${done ? 'done' : ''} ${active ? 'active' : ''}`}
                onClick={() => {
                  setActiveRecipeIdx(i);
                  setGrid(Array(9).fill(null));
                }}
                title={r.title}
              >
                <span>{i === 0 ? '🗿' : i === 1 ? '⚡' : '👑'}</span>
                <span>{done ? 'Crafted' : `Quest ${i + 1}`}</span>
              </div>
            );
          })}
        </div>
      </div>

      {!allCrafted ? (
        <div className="mindcraft-workbench glass-card">
          {/* Recipe Clue & Brainstorm Card */}
          <div className="recipe-clue-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Hammer size={18} color="var(--rose-pink)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--rose-deep)' }}>
                  {currentRecipe.title}
                </h3>
              </div>
              <span className="recipe-tag">{currentRecipe.craftedItem.tag}</span>
            </div>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-main)', marginBottom: 12, lineHeight: 1.5 }}>
              🧠 <strong>Brainstorm Riddle:</strong> “{currentRecipe.clue}”
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <button
                type="button"
                className="btn-text-pill"
                onClick={() => setShowHint(!showHint)}
                title="Show slot guidance"
              >
                <Lightbulb size={15} />
                <span>{showHint ? 'Hide Hint' : '💡 Brainstorm Hint'}</span>
              </button>

              <button
                type="button"
                className="btn-text-pill"
                onClick={handleAutoBrainstorm}
                title="Automatically place ingredients for this recipe"
              >
                <Sparkles size={15} />
                <span>Quick Auto-Fill ✨</span>
              </button>

              <button
                type="button"
                className="btn-text-pill"
                onClick={handleClearGrid}
                title="Clear 3x3 table"
              >
                <RotateCcw size={15} />
                <span>Clear Table</span>
              </button>
            </div>

            {showHint && (
              <div className="mindcraft-hint-banner">
                💡 <strong>Blueprint Guide:</strong> {currentRecipe.hint}
              </div>
            )}
          </div>

          {/* Minecraft 3x3 Table & Crafting Output */}
          <div className="crafting-arena">
            {/* 3x3 Grid */}
            <div className="crafting-grid-container">
              <div className="crafting-grid-header">3×3 CRAFTING TABLE</div>
              <div className="minecraft-grid">
                {grid.map((itemKey, idx) => {
                  const itemData = INVENTORY_ITEMS.find((it) => it.id === itemKey);
                  const isRequiredSlot = Boolean(currentRecipe.requiredSlots[idx]);
                  const shouldGuide = showHint && isRequiredSlot && !itemKey;

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`grid-slot ${shouldGuide ? 'guide-slot' : ''} ${itemKey ? 'has-item' : ''}`}
                      onClick={() => handleSlotClick(idx)}
                      title={`Slot ${idx + 1}: ${itemData ? itemData.name : 'Empty (Click to place)'}`}
                    >
                      {itemData ? (
                        <div className="slot-voxel-item">
                          <span className="item-icon">{itemData.icon}</span>
                          <span className="item-label-mini">{itemData.name.split(' ')[0]}</span>
                        </div>
                      ) : (
                        <span className="slot-number">{shouldGuide ? '⭐' : idx + 1}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Crafting Arrow */}
            <div className={`crafting-arrow ${isMatched ? 'arrow-active' : ''}`}>
              <div className="arrow-shaft" />
              <div className="arrow-head">➡️</div>
              {isMatched && <span className="arrow-sparkle">✨</span>}
            </div>

            {/* Output Slot */}
            <div className="crafting-output-container">
              <div className="crafting-grid-header">FORGE OUTPUT</div>
              <button
                type="button"
                className={`output-slot ${isMatched ? 'output-ready' : 'output-locked'}`}
                onClick={handleCraft}
                disabled={!isMatched}
                title={isMatched ? 'Click to claim crafted artifact!' : 'Recipe not yet matched'}
              >
                {isMatched ? (
                  <div className="output-preview">
                    <span className="output-icon">
                      {currentRecipe.id === 'totem' ? '🗿' : currentRecipe.id === 'beacon' ? '⚡' : '👑'}
                    </span>
                    <span className="output-craft-btn">CRAFT! ✨</span>
                  </div>
                ) : (
                  <div className="output-placeholder">
                    <span>🔒</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solve Recipe</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Block Hotbar / Inventory */}
          <div className="mindcraft-inventory">
            <div className="inventory-header">
              <span>⛏️ SELECT BLOCK TO PLACE:</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Click a block below, then click any table slot
              </span>
            </div>
            <div className="inventory-hotbar">
              {INVENTORY_ITEMS.map((item) => {
                const isSelected = selectedItem === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`hotbar-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      playBlockPlaceSound();
                      setSelectedItem(item.id);
                    }}
                    title={`Select ${item.name}`}
                  >
                    <span className="hotbar-icon">{item.icon}</span>
                    <span className="hotbar-label">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Victory Screen when all 3 artifacts are forged */
        <div className="mindcraft-victory glass-card">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: '3rem' }}>🏆💖⛏️</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--rose-deep)', marginTop: 10 }}>
              {mindcraft.successTitle}
            </h3>
            <p style={{ color: 'var(--text-main)', fontSize: '1.08rem', marginTop: 8, maxWidth: 540, margin: '8px auto 0' }}>
              {mindcraft.successMessage}
            </p>
          </div>

          <div className="crafted-artifacts-grid">
            {recipes.map((r) => (
              <div key={r.id} className="crafted-artifact-card">
                <div className="artifact-icon-large">
                  {r.id === 'totem' ? '🗿' : r.id === 'beacon' ? '⚡' : '👑'}
                </div>
                <h4 style={{ fontWeight: 800, color: 'var(--rose-deep)', fontSize: '1.05rem', marginBottom: 4 }}>
                  {r.craftedItem.name}
                </h4>
                <span className="recipe-tag" style={{ marginBottom: 8, display: 'inline-block' }}>
                  {r.craftedItem.tag}
                </span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {r.craftedItem.lore}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                playSparkle();
                onComplete();
              }}
              style={{ fontSize: '1.1rem', padding: '16px 40px' }}
            >
              <span>{mindcraft.nextButtonText}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Crafted Modal Popup */}
      {lastCraftedModal && (
        <div className="modal-overlay" onClick={() => setLastCraftedModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', maxWidth: 440 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>✨🎉</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--rose-deep)', marginBottom: 8 }}>
              {lastCraftedModal.name}
            </h3>
            <div style={{ display: 'inline-block', marginBottom: 14 }}>
              <span className="recipe-tag">{lastCraftedModal.tag}</span>
            </div>
            <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 24 }}>
              {lastCraftedModal.lore}
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setLastCraftedModal(null)}
              style={{ width: '100%' }}
            >
              <span>AWESOME! NEXT QUEST ✨</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
