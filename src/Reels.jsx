import React, { useState, useEffect, useRef } from 'react';
import fallbackData from '../db/db.json';
import { getUserProfile } from './usersData';

function Reels({ onSelectUser }) {
  const [reels, setReels] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [likesCountMap, setLikesCountMap] = useState({});
  const [savedMap, setSavedMap] = useState({});
  const [followingMap, setFollowingMap] = useState({});
  const [activeCommentReelId, setActiveCommentReelId] = useState(null);
  const [reelComments, setReelComments] = useState({});
  const [newCommentInput, setNewCommentInput] = useState('');
  const [animatingHeartId, setAnimatingHeartId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    let mounted = true;
    fetch('/api/reels')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setReels(data);
        } else {
          setReels(fallbackData.reels || []);
        }
      })
      .catch(() => {
        if (mounted) {
          setReels(fallbackData.reels || []);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const currentReelsList = reels.length > 0 ? reels : fallbackData.reels || [];

  // IntersectionObserver to play active reel video on scroll
  useEffect(() => {
    if (!currentReelsList.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video');
          if (video) {
            if (entry.isIntersecting) {
              video.currentTime = 0;
              video.play().catch((err) => {
                console.log('Autoplay handled:', err);
              });
            } else {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    const slides = containerRef.current?.querySelectorAll('.reel-slide');
    if (slides) {
      slides.forEach((slide) => observer.observe(slide));
    }

    return () => observer.disconnect();
  }, [currentReelsList]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const toggleSound = (e) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid) {
        vid.muted = nextMuted;
        if (!nextMuted) {
          vid.volume = 1.0;
          vid.play().catch(() => {});
        }
      }
    });
    showToast(nextMuted ? 'Sound muted 🔇' : 'Sound ON 🔊');
  };

  const toggleLike = (id, baseLikes) => {
    const isCurrentlyLiked = !!likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isCurrentlyLiked }));
    setLikesCountMap((prev) => {
      const current = prev[id] !== undefined ? prev[id] : baseLikes;
      return { ...prev, [id]: current + (isCurrentlyLiked ? -1 : 1) };
    });
  };

  const handleVideoDoubleClick = (id, baseLikes) => {
    if (!likedMap[id]) {
      toggleLike(id, baseLikes);
    }
    setAnimatingHeartId(id);
    setTimeout(() => {
      setAnimatingHeartId(null);
    }, 900);
  };

  const toggleSave = (id) => {
    const isSaved = !savedMap[id];
    setSavedMap((prev) => ({ ...prev, [id]: isSaved }));
    showToast(isSaved ? 'Reel saved to collection' : 'Reel removed from collection');
  };

  const toggleFollow = (id) => {
    setFollowingMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Reel link copied to clipboard!');
  };

  const handleAddComment = (reelId, e) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      username: fallbackData?.profile?.username || 'hanisha_0510',
      text: newCommentInput.trim()
    };

    setReelComments((prev) => ({
      ...prev,
      [reelId]: [...(prev[reelId] || (reels.find((r) => r.id === reelId)?.comments || [])), newCommentObj]
    }));

    setNewCommentInput('');
    showToast('Comment posted!');
  };

  const handleUserClick = (username) => {
    if (onSelectUser) {
      onSelectUser(getUserProfile(username));
    }
  };

  return (
    <div className="reels-feed-wrapper d-flex justify-content-center align-items-center w-100 position-relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="ig-toast">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Snap Scroll Vertical Feed Container */}
      <div
        ref={containerRef}
        className="reels-snap-feed d-flex flex-column align-items-center"
        style={{
          width: '380px',
          height: 'calc(100vh - 50px)',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {currentReelsList.map((reel) => {
          const isLiked = !!likedMap[reel.id];
          const likesCount = likesCountMap[reel.id] !== undefined ? likesCountMap[reel.id] : reel.likes;
          const isSaved = !!savedMap[reel.id];
          const isFollowed = followingMap[reel.id] ?? reel.isFollowing;
          const isPoppingHeart = animatingHeartId === reel.id;
          const activeComments = reelComments[reel.id] || reel.comments || [];
          const isCommentDrawerOpen = activeCommentReelId === reel.id;

          return (
            <div
              key={reel.id}
              className="reel-slide position-relative w-100 rounded-4 overflow-hidden shadow-lg bg-black my-2 flex-shrink-0"
              style={{
                height: 'calc(100vh - 70px)',
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always'
              }}
            >
              {/* HTML5 Auto-playing Video */}
              <div
                className="w-100 h-100 position-relative"
                onDoubleClick={() => handleVideoDoubleClick(reel.id, reel.likes)}
                onClick={toggleSound}
              >
                <video
                  ref={(el) => (videoRefs.current[reel.id] = el)}
                  src={reel.videoUrl}
                  poster={reel.poster}
                  className="w-100 h-100 object-fit-cover"
                  loop
                  muted={isMuted}
                  playsInline
                />

                {/* Pop Heart Animation */}
                {isPoppingHeart && (
                  <div className="double-click-heart">
                    <i className="bi bi-heart-fill"></i>
                  </div>
                )}

                {/* Sound Banner Badge if Muted */}
                {isMuted && (
                  <div className="position-absolute top-50 start-50 translate-middle pointer-events-none bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill small fw-semibold d-flex align-items-center gap-2 shadow">
                    <i className="bi bi-volume-mute-fill fs-5"></i>
                    <span>Tap to Unmute Audio 🔊</span>
                  </div>
                )}
              </div>

              {/* Gradient Dark Overlay */}
              <div
                className="position-absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.25) 100%)'
                }}
              ></div>

              {/* Top Header: Reels Title & Audio Control */}
              <div className="position-absolute top-0 start-0 end-0 p-3 d-flex align-items-center justify-content-between text-white z-2">
                <span className="fw-bold fs-5">Reels</span>
                <button
                  className="btn btn-sm btn-dark bg-opacity-50 text-white rounded-pill px-3 border-0 d-flex align-items-center gap-1"
                  onClick={toggleSound}
                  title="Toggle Audio Sound"
                >
                  <i className={`bi ${isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
                  <span className="small ms-1">{isMuted ? 'Muted' : 'Sound ON'}</span>
                </button>
              </div>

              {/* Reel Bottom Left Info */}
              <div className="position-absolute bottom-0 start-0 p-3 text-white z-2" style={{ width: '78%' }}>
                {/* User Row */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  <img
                    src={reel.profilePic}
                    alt={reel.username}
                    className="rounded-circle border"
                    style={{ width: '38px', height: '38px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserClick(reel.username);
                    }}
                  />
                  <span
                    className="fw-bold me-1 small"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserClick(reel.username);
                    }}
                  >
                    {reel.username}
                  </span>
                  <button
                    className={`btn btn-sm py-0 px-2 rounded-pill fw-semibold ${
                      isFollowed ? 'btn-outline-light' : 'btn-primary'
                    }`}
                    style={{ fontSize: '11px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(reel.id);
                    }}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Caption */}
                <p className="small mb-2 text-light" style={{ fontSize: '0.85rem', lineHeight: '1.3' }}>
                  {reel.caption}
                </p>

                {/* Audio Track Title */}
                <div className="d-flex align-items-center gap-2 small text-light opacity-75">
                  <i className="bi bi-music-note-beamed"></i>
                  <span className="text-truncate" style={{ fontSize: '0.78rem' }}>
                    {reel.audio || `Original Audio - ${reel.username}`}
                  </span>
                </div>
              </div>

              {/* Right Action Sidebar */}
              <div className="position-absolute bottom-0 end-0 p-3 d-flex flex-column align-items-center gap-4 text-white z-2 pb-4">
                {/* Like Button */}
                <div className="d-flex flex-column align-items-center">
                  <button
                    className="post-action-btn text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(reel.id, reel.likes);
                    }}
                  >
                    <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-2`}></i>
                  </button>
                  <span className="small fw-semibold mt-1">{likesCount.toLocaleString()}</span>
                </div>

                {/* Comment Button */}
                <div className="d-flex flex-column align-items-center">
                  <button
                    className="post-action-btn text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCommentReelId(isCommentDrawerOpen ? null : reel.id);
                    }}
                  >
                    <i className="bi bi-chat fs-2"></i>
                  </button>
                  <span className="small fw-semibold mt-1">{activeComments.length || reel.commentsCount || 0}</span>
                </div>

                {/* Share Button */}
                <div className="d-flex flex-column align-items-center">
                  <button
                    className="post-action-btn text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                  >
                    <i className="bi bi-send fs-2"></i>
                  </button>
                </div>

                {/* Save Bookmark */}
                <div className="d-flex flex-column align-items-center">
                  <button
                    className="post-action-btn text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(reel.id);
                    }}
                  >
                    <i className={`bi ${isSaved ? 'bi-bookmark-fill text-white' : 'bi-bookmark'} fs-2`}></i>
                  </button>
                </div>

                {/* Spinning Disc */}
                <div className="spinning-disc border border-2 border-white rounded-circle overflow-hidden mt-1" style={{ width: '28px', height: '28px' }}>
                  <img src={reel.profilePic} alt="Disc" className="w-100 h-100 object-fit-cover" />
                </div>
              </div>

              {/* Reels Comment Drawer Sheet */}
              {isCommentDrawerOpen && (
                <div
                  className="reels-comment-drawer p-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
                    <span className="fw-bold small text-dark">Comments ({activeComments.length})</span>
                    <button
                      className="btn btn-link p-0 text-dark border-0"
                      onClick={() => setActiveCommentReelId(null)}
                    >
                      <i className="bi bi-x-lg fs-6"></i>
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="flex-grow-1 overflow-y-auto d-flex flex-column gap-2 mb-2" style={{ maxHeight: '220px' }}>
                    {activeComments.map((c) => (
                      <div key={c.id} className="d-flex align-items-start gap-2 small">
                        <span
                          className="fw-bold text-dark flex-shrink-0"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleUserClick(c.username)}
                        >
                          {c.username}:
                        </span>
                        <span className="text-secondary">{c.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Input */}
                  <form onSubmit={(e) => handleAddComment(reel.id, e)} className="d-flex align-items-center gap-2 border-top pt-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="form-control form-control-sm rounded-pill bg-light border-0 px-3"
                      value={newCommentInput}
                      onChange={(e) => setNewCommentInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-sm btn-link p-0 fw-bold text-primary text-decoration-none" disabled={!newCommentInput.trim()}>
                      Post
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reels;
