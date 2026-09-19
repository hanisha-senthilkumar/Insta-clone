import React, { useState, useEffect, useRef } from 'react';
import fallbackData from '../db/db.json';

function Stories() {
  const [stories, setStories] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);
  const timerRef = useRef(null);

  const currentUser = fallbackData.profile || {
    username: 'hanisha_01',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  };

  useEffect(() => {
    let mounted = true;
    fetch('/api/stories')
      .then((res) => res.json())
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length > 0) {
          setStories(data);
        } else if (mounted) {
          setStories(fallbackData.stories || []);
        }
      })
      .catch(() => {
        if (mounted) {
          setStories(fallbackData.stories || []);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Story playback timer
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    setProgress(0);
    const intervalTime = 50; // update every 50ms
    const totalDuration = 4500; // 4.5 seconds per story
    const step = (intervalTime / totalDuration) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story or close
          if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex((idx) => idx + 1);
            return 0;
          } else {
            closeStory();
            return 0;
          }
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeStoryIndex, isPaused, stories.length]);

  const openStory = (index) => {
    // Mark as seen
    setStories((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, hasUnseen: false } : s))
    );
    setActiveStoryIndex(index);
    setProgress(0);
    setIsPaused(false);
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextStory = (e) => {
    e?.stopPropagation();
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const prevStory = (e) => {
    e?.stopPropagation();
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  const scrollTray = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  return (
    <>
      {/* Story Tray */}
      <div className="stories-wrapper position-relative mb-4">
        {/* Left scroll button */}
        <button
          className="story-nav-btn story-nav-left"
          onClick={() => scrollTray('left')}
          aria-label="Previous stories"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="stories-tray d-flex align-items-center" ref={scrollContainerRef}>
          {/* Current User Story Item */}
          <div className="story-item text-center">
            <div className="story-avatar-container my-story position-relative">
              <img
                src={currentUser.profilePic}
                alt="Your story"
                className="story-avatar"
              />
              <span className="story-add-badge">
                <i className="bi bi-plus"></i>
              </span>
            </div>
            <span className="story-username">Your story</span>
          </div>

          {/* Other Users' Stories */}
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="story-item text-center"
              onClick={() => openStory(index)}
              role="button"
              tabIndex={0}
            >
              <div className={`story-avatar-container ${story.hasUnseen ? 'unseen' : 'seen'}`}>
                <img
                  src={story.profilePic}
                  alt={story.username}
                  className="story-avatar"
                />
              </div>
              <span className="story-username">{story.username}</span>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          className="story-nav-btn story-nav-right"
          onClick={() => scrollTray('right')}
          aria-label="Next stories"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Realistic Instagram Story Viewer Modal */}
      {activeStory && (
        <div
          className="story-viewer-backdrop"
          onClick={closeStory}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button top right */}
          <button
            className="story-viewer-close-btn"
            onClick={closeStory}
            aria-label="Close story"
          >
            <i className="bi bi-x-lg"></i>
          </button>

          {/* Instagram logo on top left */}
          <div className="story-viewer-brand">
            <span className="fw-semibold text-white">Instagram</span>
          </div>

          {/* Navigation Arrows */}
          {activeStoryIndex > 0 && (
            <button
              className="story-arrow-btn story-arrow-left"
              onClick={prevStory}
              aria-label="Previous story"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          )}

          {activeStoryIndex < stories.length - 1 && (
            <button
              className="story-arrow-btn story-arrow-right"
              onClick={nextStory}
              aria-label="Next story"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          )}

          {/* Story Container */}
          <div
            className="story-card-wrapper position-relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bars */}
            <div className="story-progress-container d-flex gap-1">
              {stories.map((s, idx) => (
                <div key={s.id} className="story-progress-bar-track flex-grow-1">
                  <div
                    className="story-progress-bar-fill"
                    style={{
                      width:
                        idx < activeStoryIndex
                          ? '100%'
                          : idx === activeStoryIndex
                          ? `${progress}%`
                          : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Top Bar */}
            <div className="story-header d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={activeStory.profilePic}
                  alt={activeStory.username}
                  className="story-header-avatar"
                />
                <span className="story-header-user fw-semibold text-white">
                  {activeStory.username}
                </span>
                <span className="story-header-time text-white-50 small">
                  {activeStory.time}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="story-icon-btn text-white"
                  onClick={() => setIsPaused(!isPaused)}
                  title={isPaused ? 'Play' : 'Pause'}
                >
                  <i className={`bi ${isPaused ? 'bi-play-fill' : 'bi-pause-fill'}`}></i>
                </button>
                <button className="story-icon-btn text-white">
                  <i className="bi bi-three-dots"></i>
                </button>
              </div>
            </div>

            {/* Story Media (Image) */}
            <div
              className="story-image-container"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                if (clickX < rect.width * 0.35) {
                  prevStory(e);
                } else {
                  nextStory(e);
                }
              }}
            >
              <img
                src={activeStory.storyImage}
                alt="Story preview"
                className="story-image"
              />
            </div>

            {/* Story Bottom Reply Bar */}
            <div className="story-footer d-flex align-items-center gap-3">
              <div className="story-reply-input-wrap flex-grow-1">
                <input
                  type="text"
                  placeholder={`Reply to ${activeStory.username}...`}
                  className="story-reply-input"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <button
                className="story-icon-btn text-white fs-5"
                title="Like story"
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.classList.toggle('text-danger');
                }}
              >
                <i className="bi bi-heart"></i>
              </button>
              <button className="story-icon-btn text-white fs-5" title="Share story">
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stories;