import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playCelebrationFanfare, playSparkle } from '../utils/audioSynthesis';

/**
 * Tile Types and their connections at 0 degrees rotation:
 * Sides: 0 = Top, 1 = Right, 2 = Bottom, 3 = Left
 */
const TILE_DEFINITIONS = {
  // Straight: connects Top (0) and Bottom (2)
  straight: [0, 2],
  // Corner: connects Top (0) and Right (1)
  corner: [0, 1],
  // T-shape: connects Left (3), Top (0), Right (1)
  tshape: [3, 0, 1],
  // Cross: connects all 4
  cross: [0, 1, 2, 3]
};

// Helper: rotate connections by rotation (0, 90, 180, 270 deg)
function getRotatedSides(type, rotation) {
  const base = TILE_DEFINITIONS[type] || [];
  const steps = Math.floor((rotation % 360) / 90);
  return base.map((side) => (side + steps) % 4);
}

// 3x3 Grid Initial Setup
// Solvable configuration layout:
const INITIAL_TILES = [
  // Row 0:
  { id: 0, r: 0, c: 0, type: 'corner', rotation: 90 }, // Solution: enters 3 (left), exits 2 (bottom) -> needs sides 3,2 (rotation 180)
  { id: 1, r: 0, c: 1, type: 'straight', rotation: 0 },
  { id: 2, r: 0, c: 2, type: 'corner', rotation: 0 },
  // Row 1:
  { id: 3, r: 1, c: 0, type: 'straight', rotation: 90 },
  { id: 4, r: 1, c: 1, type: 'corner', rotation: 90 },
  { id: 5, r: 1, c: 2, type: 'straight', rotation: 0 },
  // Row 2:
  { id: 6, r: 2, c: 0, type: 'corner', rotation: 270 },
  { id: 7, r: 2, c: 1, type: 'straight', rotation: 0 },
  { id: 8, r: 2, c: 2, type: 'corner', rotation: 180 }
];

export default function SceneRibbonFlow({ onComplete }) {
  const { ribbonPuzzle, senderName, birthdayName } = birthdayConfig;

  // Tiles with random initial rotations so it requires puzzle solving!
  const [tiles, setTiles] = useState(() => {
    return [
      { id: 0, type: 'straight', rotation: 0 },     // connects L to R if rot=90
      { id: 1, type: 'straight', rotation: 0 },     // connects L to R if rot=90
      { id: 2, type: 'corner', rotation: 90 },      // connects L to B if rot=180
      { id: 3, type: 'straight', rotation: 0 },
      { id: 4, type: 'corner', rotation: 0 },       // connects T to R if rot=0
      { id: 5, type: 'straight', rotation: 90 },    // connects T to B if rot=0
      { id: 6, type: 'corner', rotation: 90 },
      { id: 7, type: 'corner', rotation: 270 },     // connects L to B if rot=180
      { id: 8, type: 'corner', rotation: 90 }       // connects T to R if rot=0
    ];
  });

  const [connectedPath, setConnectedPath] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  // Check path from Source (Left side of (0,0)) to Sink (Right side of (2,2))
  useEffect(() => {
    // Grid: row = Math.floor(idx / 3), col = idx % 3
    // Direction opposites: 0 (Top) <-> 2 (Bottom), 1 (Right) <-> 3 (Left)
    const opposite = [2, 3, 0, 1];
    const dRow = [-1, 0, 1, 0];
    const dCol = [0, 1, 0, -1];

    const visited = new Set();
    const path = [];

    // Start at tile (0, 0)
    const startTile = tiles[0];
    const startSides = getRotatedSides(startTile.type, startTile.rotation);

    // Source enters from side 3 (Left)
    if (!startSides.includes(3)) {
      setConnectedPath([]);
      return;
    }

    // Traverse
    let currR = 0, currC = 0, enterSide = 3;
    let reachedEnd = false;

    while (true) {
      const currIdx = currR * 3 + currC;
      visited.add(currIdx);
      path.push(currIdx);

      const tile = tiles[currIdx];
      const sides = getRotatedSides(tile.type, tile.rotation);

      if (!sides.includes(enterSide)) {
        break;
      }

      // Find exit side (the other side in this tile that isn't enterSide)
      const exitSides = sides.filter((s) => s !== enterSide);
      if (exitSides.length === 0) break;
      const exitSide = exitSides[0]; // primary path

      // Check if this reached the final destination: tile (2, 2) exiting right (side 1)
      if (currR === 2 && currC === 2 && exitSide === 1) {
        reachedEnd = true;
        break;
      }

      // Move to neighbor in exitSide direction
      const nextR = currR + dRow[exitSide];
      const nextC = currC + dCol[exitSide];

      if (nextR < 0 || nextR >= 3 || nextC < 0 || nextC >= 3) {
        break;
      }

      const nextIdx = nextR * 3 + nextC;
      if (visited.has(nextIdx)) {
        break; // loop
      }

      currR = nextR;
      currC = nextC;
      enterSide = opposite[exitSide];
    }

    setConnectedPath(path);

    if (reachedEnd && !isSolved) {
      setIsSolved(true);
      playCelebrationFanfare();
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD6E7', '#F06292', '#F5D58B', '#FFF9FC']
      });
    }
  }, [tiles, isSolved]);

  // Click to rotate tile by 90 degrees
  const handleRotate = (idx) => {
    if (isSolved) return;
    playChime(480 + idx * 30);
    setTiles((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        rotation: (next[idx].rotation + 90) % 360
      };
      return next;
    });
  };

  // Auto-solve / Hint
  const handleAutoSolve = () => {
    // Solved rotations for path: (0,0)[rot 90] -> (0,1)[rot 90] -> (0,2)[rot 180] -> (1,2)[rot 0] -> (2,2)[rot 0, but wait (2,2) exit right]
    // Simple 3-step path: (0,0)[rot 90: L-R] -> (0,1)[rot 90: L-R] -> (0,2)[rot 180: L-B] -> (1,2)[rot 0: T-B] -> (2,2) with rot 270 (T-R)
    setTiles([
      { id: 0, type: 'straight', rotation: 90 }, // L to R
      { id: 1, type: 'straight', rotation: 90 }, // L to R
      { id: 2, type: 'corner', rotation: 180 },  // L to B
      { id: 3, type: 'straight', rotation: 0 },
      { id: 4, type: 'corner', rotation: 0 },
      { id: 5, type: 'straight', rotation: 0 },    // T to B
      { id: 6, type: 'corner', rotation: 90 },
      { id: 7, type: 'straight', rotation: 90 },
      { id: 8, type: 'corner', rotation: 270 }   // T to R (exits right)
    ]);
    playSparkle();
  };

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Sparkles size={16} />
        <span>{ribbonPuzzle.levelTitle}</span>
      </div>

      <h2 className="scene-title">The Magical Ribbon Flow 🎀⚡</h2>
      <p className="scene-subtitle">{ribbonPuzzle.subtitle}</p>

      <div className="glass-card" style={{ maxWidth: 560, width: '100%', padding: '32px 24px', textAlign: 'center' }}>
        {/* Source & Target Hearts Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, padding: '0 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--rose-deep)', fontSize: '0.95rem' }}>
            <Heart size={20} fill="#f06292" color="#f06292" />
            <span>{senderName}</span>
          </div>

          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            onClick={handleAutoSolve}
            title="Hint to align ribbons"
          >
            <RotateCw size={14} />
            <span>Align Ribbons</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--rose-deep)', fontSize: '0.95rem' }}>
            <span>{birthdayName}</span>
            <Heart size={20} fill="#f06292" color="#f06292" />
          </div>
        </div>

        {/* 3x3 Ribbon Board */}
        <div className="ribbon-grid-board">
          {tiles.map((tile, idx) => {
            const isLit = connectedPath.includes(idx);
            return (
              <div
                key={tile.id}
                onClick={() => handleRotate(idx)}
                style={{
                  aspectRatio: '1 / 1',
                  background: isLit ? '#FFF0F6' : '#ffffff',
                  borderRadius: 16,
                  border: isLit ? '2.5px solid var(--rose-pink)' : '2px solid rgba(240, 98, 146, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isSolved ? 'default' : 'pointer',
                  position: 'relative',
                  boxShadow: isLit ? '0 0 16px rgba(240, 98, 146, 0.45)' : '0 4px 10px rgba(0,0,0,0.04)',
                  transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                }}
                title="Tap to rotate ribbon tile"
              >
                {/* Visual SVG of Ribbon with Rotation */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: `rotate(${tile.rotation}deg)`,
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg viewBox="0 0 100 100" style={{ width: '80%', height: '80%' }}>
                    {tile.type === 'straight' && (
                      <path
                        d="M 50 0 L 50 100"
                        stroke={isLit ? '#F06292' : '#F8AFCB'}
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                    )}
                    {tile.type === 'corner' && (
                      <path
                        d="M 50 0 Q 50 50 100 50"
                        fill="none"
                        stroke={isLit ? '#F06292' : '#F8AFCB'}
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                    )}
                    {tile.type === 'tshape' && (
                      <g>
                        <path
                          d="M 0 50 L 100 50"
                          stroke={isLit ? '#F06292' : '#F8AFCB'}
                          strokeWidth="18"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 50 0 L 50 50"
                          stroke={isLit ? '#F06292' : '#F8AFCB'}
                          strokeWidth="18"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                    {tile.type === 'cross' && (
                      <g>
                        <path d="M 50 0 L 50 100" stroke={isLit ? '#F06292' : '#F8AFCB'} strokeWidth="18" />
                        <path d="M 0 50 L 100 50" stroke={isLit ? '#F06292' : '#F8AFCB'} strokeWidth="18" />
                      </g>
                    )}
                    {/* Golden inner stitch line */}
                    {isLit && (
                      <circle cx="50" cy="50" r="6" fill="#F5D58B" />
                    )}
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <p style={{ fontSize: '0.86rem', color: 'var(--text-soft)', marginTop: 16 }}>
          💡 <em>Tap any square to rotate it 90°. Connect the ribbon from left to right!</em>
        </p>

        {/* Solved state */}
        {isSolved ? (
          <div style={{ marginTop: 24, animation: 'fadeInScene 0.5s ease' }}>
            <h3 style={{ fontFamily: 'var(--font-hand)', fontSize: '2.2rem', color: 'var(--rose-deep)', marginBottom: 8 }}>
              {ribbonPuzzle.successTitle}
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: 20 }}>
              {ribbonPuzzle.successMessage}
            </p>

            <button
              type="button"
              className="btn-primary"
              onClick={onComplete}
              id="unlock-next-match-btn"
            >
              <span>{ribbonPuzzle.nextButtonText}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 14, fontSize: '0.9rem', color: 'var(--rose-deep)', fontWeight: 600 }}>
            {connectedPath.length > 0
              ? `Connected Ribbon Segments: ${connectedPath.length} / 5`
              : 'Rotate the first tile to begin the connection!'}
          </div>
        )}
      </div>
    </div>
  );
}
