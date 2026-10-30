import React, { useMemo } from 'react';

export default function BackgroundEffects() {
  // Generate random petals
  const petals = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: `petal-${i}`,
      left: `${(i * 6.2 + Math.random() * 4)}%`,
      delay: `${(Math.random() * 8).toFixed(1)}s`,
      duration: `${(10 + Math.random() * 8).toFixed(1)}s`,
      scale: (0.7 + Math.random() * 0.6).toFixed(2),
    }));
  }, []);

  // Generate random floating hearts
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `heart-${i}`,
      left: `${(i * 8.3 + Math.random() * 4)}%`,
      delay: `${(Math.random() * 9).toFixed(1)}s`,
      duration: `${(12 + Math.random() * 8).toFixed(1)}s`,
      symbol: i % 3 === 0 ? '💗' : i % 3 === 1 ? '✨' : '🌸',
      fontSize: `${14 + (i % 3) * 6}px`
    }));
  }, []);

  return (
    <div className="particle-layer" aria-hidden="true">
      {/* Falling Cherry Blossom Petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="floating-petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `scale(${p.scale})`
          }}
        />
      ))}

      {/* Floating Hearts & Sparkles */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.fontSize
          }}
        >
          {h.symbol}
        </div>
      ))}
    </div>
  );
}
