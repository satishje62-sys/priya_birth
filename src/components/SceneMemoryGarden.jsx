import React, { useState, useEffect } from 'react';
import { Camera, ChevronLeft, ChevronRight, Play, Pause, Sparkles, Heart, ArrowRight, Lock, ZoomIn, X } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { playChime, playSparkle } from '../utils/audioSynthesis';

export default function SceneMemoryGarden({ onComplete }) {
  const { memoryGarden } = birthdayConfig;
  const allPhotos = memoryGarden.photos;
  const totalCount = allPhotos.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const [hasViewedAll, setHasViewedAll] = useState(false);
  const [viewedIndices, setViewedIndices] = useState(new Set([0]));
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle slideshow auto-advance
  useEffect(() => {
    let timer = null;
    if (isPlayingSlideshow) {
      timer = setInterval(() => {
        handleNext(true);
      }, 4000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingSlideshow, currentIndex]);

  // Track if she has browsed up to the secret final photo
  useEffect(() => {
    // If user has viewed all photos except the secret one (or reached the last one)
    if (viewedIndices.size >= totalCount - 1) {
      if (!hasViewedAll) {
        setHasViewedAll(true);
        playSparkle();
      }
    }
  }, [viewedIndices, totalCount, hasViewedAll]);

  const handleNext = (fromSlideshow = false) => {
    if (!fromSlideshow) setIsPlayingSlideshow(false);
    const nextIdx = (currentIndex + 1) % totalCount;
    setCurrentIndex(nextIdx);
    setViewedIndices((prev) => new Set([...prev, nextIdx]));
    playChime(523.25 + (nextIdx * 30));
  };

  const handlePrev = () => {
    setIsPlayingSlideshow(false);
    const prevIdx = (currentIndex - 1 + totalCount) % totalCount;
    setCurrentIndex(prevIdx);
    setViewedIndices((prev) => new Set([...prev, prevIdx]));
    playChime(500);
  };

  const handleJump = (idx) => {
    setIsPlayingSlideshow(false);
    // Don't allow jumping to secret photo if not yet unlocked
    if (idx === totalCount - 1 && !hasViewedAll) return;
    setCurrentIndex(idx);
    setViewedIndices((prev) => new Set([...prev, idx]));
    playChime(523.25);
  };

  const currentPhoto = allPhotos[currentIndex];
  const isSecretPhoto = currentIndex === totalCount - 1;

  return (
    <div className="scene-wrapper">
      <div className="scene-badge">
        <Camera size={16} />
        <span>{memoryGarden.levelTitle}</span>
      </div>

      <h2 className="scene-title">Our Little Memory Garden 🌸</h2>
      <p className="scene-subtitle">{memoryGarden.subtitle}</p>

      {/* Scrapbook Container */}
      <div className="scrapbook-container">
        <div className="polaroid-frame">
          {/* Washi tape header */}
          <div className="washi-tape" />

          {/* Photo frame */}
          <div
            className="polaroid-photo-wrapper"
            onClick={() => setIsZoomed(true)}
            style={{ cursor: 'zoom-in' }}
            title="Click to view full photo 🔍"
          >
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              className="polaroid-img"
              onError={(e) => {
                // Graceful fallback if image is missing
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#FFE4EF; color:#C2185B; padding:20px; text-align:center;">
                    <div style="font-size:48px; margin-bottom:12px;">📸✨</div>
                    <div style="font-family:'Caveat', cursive; font-size:1.8rem; font-weight:700;">${currentPhoto.title}</div>
                    <div style="font-size:0.95rem; margin-top:8px; opacity:0.8;">(Add your custom photo to /public/assets/)</div>
                  </div>
                `;
              }}
            />

            {/* Fairy light badge */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(255, 255, 255, 0.92)',
                padding: '4px 10px',
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--rose-deep)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              {currentPhoto.date}
            </div>

            {/* Zoom hint badge */}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                background: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                padding: '3px 8px',
                borderRadius: 14,
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                pointerEvents: 'none'
              }}
            >
              <ZoomIn size={12} />
              <span>Full View</span>
            </div>
          </div>

          {/* Polaroid Caption */}
          <div className="polaroid-caption">
            <h3 className="polaroid-title">{currentPhoto.title}</h3>
            <p className="polaroid-desc">“{currentPhoto.caption}”</p>
          </div>
        </div>

        {/* Secret Note Banner when unlocked */}
        {isSecretPhoto && hasViewedAll && (
          <div
            style={{
              background: '#FFF0F6',
              border: '2px solid #F8AFCB',
              borderRadius: 16,
              padding: '12px 18px',
              textAlign: 'center',
              marginTop: 18,
              fontSize: '0.96rem',
              color: 'var(--rose-deep)',
              fontWeight: 600,
              animation: 'fadeInScene 0.4s ease'
            }}
          >
            {memoryGarden.surprisePhotoNote}
          </div>
        )}

        {/* Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            padding: '0 10px'
          }}
        >
          {/* Prev button */}
          <button
            type="button"
            className="icon-btn"
            onClick={handlePrev}
            title="Previous Memory"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Timeline dots / thumbnails */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {allPhotos.map((item, idx) => {
              const isLocked = idx === totalCount - 1 && !hasViewedAll;
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleJump(idx)}
                  disabled={isLocked}
                  style={{
                    width: isActive ? 24 : 12,
                    height: 12,
                    borderRadius: 6,
                    background: isActive
                      ? 'var(--rose-pink)'
                      : isLocked
                      ? '#ddd'
                      : 'var(--blush-pink)',
                    border: 'none',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  title={isLocked ? 'Secret photo: view all memories first!' : item.title}
                />
              );
            })}
          </div>

          {/* Slideshow button */}
          <button
            type="button"
            className="icon-btn"
            onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
            title={isPlayingSlideshow ? 'Pause Slideshow' : 'Play Slideshow'}
            style={isPlayingSlideshow ? { background: '#ffd6e7', borderColor: '#f06292' } : {}}
          >
            {isPlayingSlideshow ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {/* Next button */}
          <button
            type="button"
            className="icon-btn"
            onClick={() => handleNext(false)}
            title="Next Memory"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Photo Counter */}
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: '0.88rem', color: 'var(--text-soft)', fontWeight: 600 }}>
          Memory {currentIndex + 1} of {totalCount}
        </div>

        {/* Unlock Next Level Button (Visible after she browsed) */}
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onComplete}
            id="unlock-level4-btn"
          >
            <Heart size={20} fill="#ffffff" />
            <span>{memoryGarden.nextButtonText}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {isZoomed && (
        <div
          className="lightbox-overlay"
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 5, 15, 0.88)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeInScene 0.25s ease'
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#ffffff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease'
            }}
            title="Close Full Photo"
          >
            <X size={24} />
          </button>

          {/* Full Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '92vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              style={{
                maxWidth: '90vw',
                maxHeight: '75vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 14,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                border: '3px solid rgba(255, 255, 255, 0.25)'
              }}
            />
            <div style={{ color: '#ffffff', textAlign: 'center', marginTop: 14 }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-hand)', color: '#FFD1E3' }}>
                {currentPhoto.title}
              </div>
              <div style={{ fontSize: '0.88rem', opacity: 0.85, marginTop: 4 }}>
                {currentPhoto.date} — “{currentPhoto.caption}”
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
