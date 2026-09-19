import React, { useEffect, useState } from 'react';
import fallbackData from '../db/db.json';
import { getUserProfile } from './usersData';

const QUICK_EMOJIS = ['❤️', '🔥', '👏', '🙌', '😍', '😂', '✨', '🐶'];

function Posts({
  addedPosts = [],
  feedFilter = null,
  onSelectUser,
  onClearFilter
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const [newComments, setNewComments] = useState({});
  const [animatingHeartId, setAnimatingHeartId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [activePostOptions, setActivePostOptions] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(fallbackData.posts || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Fetch /api/posts failed, using db.json fallback:', err);
        if (mounted) {
          setPosts(fallbackData.posts || []);
          setError(null);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Prepend externally created posts
  const allPosts = [...addedPosts, ...posts];

  // Filter posts if feedFilter is set
  const displayPosts = feedFilter
    ? allPosts.filter((p) => {
        const cleanQuery = feedFilter.toLowerCase().replace(/^@/, '');
        const matchesUser = p.username.toLowerCase().includes(cleanQuery);
        const matchesCaption = p.caption && p.caption.toLowerCase().includes(cleanQuery);
        return matchesUser || matchesCaption;
      })
    : allPosts;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  function openModal(src) {
    setModalSrc(src);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalSrc(null);
  }

  function focusCommentInput(postId) {
    const inputEl = document.getElementById(`comment-input-${postId}`);
    if (inputEl) {
      inputEl.focus();
      inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function toggleLike(id) {
    const isCurrentlyLiked = !!liked[id];
    setLiked((prev) => ({ ...prev, [id]: !isCurrentlyLiked }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: (p.likes || 0) + (isCurrentlyLiked ? -1 : 1) }
          : p
      )
    );
  }

  function handlePhotoDoubleClick(id) {
    if (!liked[id]) {
      toggleLike(id);
    }
    // Trigger big heart pop animation
    setAnimatingHeartId(id);
    setTimeout(() => {
      setAnimatingHeartId(null);
    }, 1000);
  }

  function toggleSave(id) {
    const isSaved = !saved[id];
    setSaved((prev) => ({ ...prev, [id]: isSaved }));
    showToast(isSaved ? 'Post saved to your collection.' : 'Post removed from your collection.');
  }

  function handleShare(p) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Post link copied to clipboard!');
  }

  function appendEmoji(postId, emoji) {
    setNewComments((prev) => ({
      ...prev,
      [postId]: (prev[postId] || '') + emoji
    }));
  }

  function handleCommentSubmit(id, e) {
    e.preventDefault();
    const commentText = (newComments[id] || '').trim();
    if (!commentText) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedComments = [
            ...(p.comments || []),
            {
              id: Date.now(),
              username: fallbackData?.profile?.username || 'hanisha_0510',
              text: commentText
            }
          ];
          return { ...p, comments: updatedComments };
        }
        return p;
      })
    );

    setNewComments((prev) => ({ ...prev, [id]: '' }));
    showToast('Comment posted!');
  }

  function handleDeleteComment(postId, commentId) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: (p.comments || []).filter((c) => c.id !== commentId)
          };
        }
        return p;
      })
    );
    showToast('Comment deleted');
  }

  function toggleCommentLike(commentId) {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  }

  function formatTimeAgo(dateStr) {
    if (!dateStr) return '1d';
    try {
      const diff = Date.now() - new Date(dateStr).getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours < 1) return 'JUST NOW';
      if (hours < 24) return `${hours} HOURS AGO`;
      const days = Math.floor(hours / 24);
      return `${days} DAYS AGO`;
    } catch {
      return '1D AGO';
    }
  }

  const handleUserClick = (username) => {
    if (onSelectUser) {
      onSelectUser(getUserProfile(username));
    }
  };

  if (loading && allPosts.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <div className="spinner-border text-secondary mb-2" role="status"></div>
        <span className="d-block small">Loading Instagram feed...</span>
      </div>
    );
  }

  if (error && allPosts.length === 0) {
    return (
      <div className="text-center text-danger py-4">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4 position-relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="ig-toast">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Feed Active Filter Banner */}
      {feedFilter && (
        <div className="feed-filter-bar d-flex align-items-center justify-content-between p-3 bg-light rounded-3 border">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-funnel-fill text-primary"></i>
            <span className="small">
              Showing results for: <strong>"{feedFilter}"</strong> ({displayPosts.length} post{displayPosts.length === 1 ? '' : 's'})
            </span>
          </div>
          <button
            className="btn btn-sm btn-outline-secondary py-1 px-3 fw-semibold"
            onClick={onClearFilter}
          >
            Clear filter ✕
          </button>
        </div>
      )}

      {displayPosts.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 border p-4">
          <i className="bi bi-search display-5 text-secondary opacity-50 d-block mb-3"></i>
          <h6 className="fw-bold mb-1">No posts found</h6>
          <p className="text-muted small mb-3">
            {feedFilter ? `No posts matched "${feedFilter}".` : 'No posts available.'}
          </p>
          {feedFilter && (
            <button
              className="btn btn-primary btn-sm px-4 fw-semibold"
              onClick={onClearFilter}
            >
              Show All Posts
            </button>
          )}
        </div>
      ) : (
        displayPosts.map((p) => {
          const isPostLiked = !!liked[p.id];
          const isPostSaved = !!saved[p.id];
          const commentInput = newComments[p.id] || '';
          const isPoppingHeart = animatingHeartId === p.id;

          return (
            <article key={p.id} className="post-article">
              {/* Post Header */}
              <div className="p-3 d-flex align-items-center justify-content-between">
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUserClick(p.username)}
                  title={`View @${p.username}'s profile`}
                >
                  <div className="story-avatar-container unseen" style={{ width: '40px', height: '40px' }}>
                    <img
                      src={p.profilePic}
                      alt={p.username}
                      className="story-avatar"
                      style={{ width: '34px', height: '34px' }}
                    />
                  </div>
                  <div>
                    <div className="post-header-user fw-semibold">{p.username}</div>
                  </div>
                </div>

                <button
                  className="btn btn-link p-0 text-dark border-0 bg-transparent"
                  aria-label="More options"
                  onClick={() => setActivePostOptions(p)}
                >
                  <i className="bi bi-three-dots"></i>
                </button>
              </div>

              {/* Post Image Container with Double Click Heart */}
              {p.imageUrl && (
                <div
                  className="post-image-wrap position-relative"
                  onDoubleClick={() => handlePhotoDoubleClick(p.id)}
                  title="Double click to like"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.caption || 'post'}
                    className="post-image"
                    onClick={() => openModal(p.imageUrl)}
                  />

                  {/* Pop Heart Animation */}
                  {isPoppingHeart && (
                    <div className="double-click-heart">
                      <i className="bi bi-heart-fill"></i>
                    </div>
                  )}
                </div>
              )}

              {/* Post Action Buttons */}
              <div className="p-3 pb-2">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="post-action-btn"
                      onClick={() => toggleLike(p.id)}
                      aria-label="Like post"
                    >
                      <i
                        className={`bi ${
                          isPostLiked
                            ? 'bi-heart-fill text-danger'
                            : 'bi-heart'
                        }`}
                      ></i>
                    </button>

                    <button
                      className="post-action-btn"
                      onClick={() => focusCommentInput(p.id)}
                      aria-label="Comment"
                    >
                      <i className="bi bi-chat"></i>
                    </button>

                    <button
                      className="post-action-btn"
                      onClick={() => handleShare(p)}
                      aria-label="Share"
                    >
                      <i className="bi bi-send"></i>
                    </button>
                  </div>

                  <button
                    className="post-action-btn"
                    onClick={() => toggleSave(p.id)}
                    aria-label="Save post"
                  >
                    <i
                      className={`bi ${
                        isPostSaved ? 'bi-bookmark-fill' : 'bi-bookmark'
                      }`}
                    ></i>
                  </button>
                </div>

                {/* Likes Count */}
                <div className="post-likes-count mb-1 fw-bold" style={{ fontSize: '0.9rem' }}>
                  {(p.likes || 0).toLocaleString()} likes
                </div>

                {/* Caption */}
                {p.caption && (
                  <div className="post-caption mb-2">
                    <span
                      className="fw-bold me-1 text-dark"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleUserClick(p.username)}
                    >
                      {p.username}
                    </span>
                    <span>{p.caption}</span>
                  </div>
                )}

                {/* Comments List with Delete & Like support */}
                {p.comments && p.comments.length > 0 && (
                  <div className="mt-2 d-flex flex-column gap-1 border-top pt-2">
                    {p.comments.length > 2 && (
                      <span
                        className="post-comments-count fw-semibold text-secondary mb-1"
                        style={{ fontSize: '0.85rem' }}
                        onClick={() => focusCommentInput(p.id)}
                      >
                        View all {p.comments.length} comments
                      </span>
                    )}

                    {p.comments.slice(-5).map((c) => {
                      const isCommentLiked = !!commentLikes[c.id];
                      return (
                        <div
                          key={c.id}
                          className="d-flex align-items-center justify-content-between py-1 small post-comment-row"
                        >
                          <div className="d-flex align-items-baseline gap-1 overflow-hidden me-2">
                            <span
                              className="fw-bold text-dark text-decoration-none flex-shrink-0"
                              style={{ cursor: 'pointer', fontSize: '0.86rem' }}
                              onClick={() => handleUserClick(c.username)}
                            >
                              {c.username}
                            </span>
                            <span className="text-secondary" style={{ fontSize: '0.85rem' }}>
                              {c.text}
                            </span>
                          </div>

                          <div className="d-flex align-items-center gap-2 flex-shrink-0 comment-actions-wrap">
                            <button
                              className="btn btn-link p-0 border-0 bg-transparent text-muted comment-icon-btn"
                              onClick={() => toggleCommentLike(c.id)}
                              title={isCommentLiked ? 'Unlike comment' : 'Like comment'}
                            >
                              <i
                                className={`bi ${
                                  isCommentLiked
                                    ? 'bi-heart-fill text-danger'
                                    : 'bi-heart'
                                }`}
                                style={{ fontSize: '11px' }}
                              ></i>
                            </button>

                            <button
                              className="btn btn-link p-0 border-0 bg-transparent text-muted comment-delete-btn"
                              onClick={() => handleDeleteComment(p.id, c.id)}
                              title="Delete comment"
                            >
                              <i className="bi bi-trash3" style={{ fontSize: '12px' }}></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Time Ago */}
                <div className="post-header-time mt-2 text-uppercase text-muted" style={{ fontSize: '0.72rem' }}>
                  {formatTimeAgo(p.createdAt)}
                </div>
              </div>

              {/* Quick Emoji Bar */}
              <div className="quick-emoji-bar px-3 pt-1 d-flex gap-2 border-top">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="quick-emoji-btn"
                    onClick={() => appendEmoji(p.id, emoji)}
                    title={`Add ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Add Comment Input */}
              <form
                className="comment-input-wrap d-flex align-items-center gap-2"
                onSubmit={(e) => handleCommentSubmit(p.id, e)}
              >
                <i className="bi bi-emoji-smile text-secondary fs-5"></i>
                <input
                  id={`comment-input-${p.id}`}
                  type="text"
                  placeholder="Add a comment…"
                  className="comment-input"
                  value={commentInput}
                  onChange={(e) =>
                    setNewComments((prev) => ({
                      ...prev,
                      [p.id]: e.target.value
                    }))
                  }
                />
                <button
                  type="submit"
                  className="comment-post-btn"
                  disabled={!commentInput.trim()}
                >
                  Post
                </button>
              </form>
            </article>
          );
        })
      )}

      {/* Post Options Modal (Three Dots) */}
      {activePostOptions && (
        <div className="modal-overlay" onClick={() => setActivePostOptions(null)}>
          <div
            className="bg-white rounded-4 overflow-hidden shadow-lg border"
            style={{ width: '320px', animation: 'scaleModal 0.15s ease forwards' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn w-100 py-3 text-danger fw-bold border-bottom rounded-0"
              onClick={() => {
                showToast(`Reported @${activePostOptions.username}`);
                setActivePostOptions(null);
              }}
            >
              Report
            </button>

            <button
              className="btn w-100 py-3 text-danger fw-bold border-bottom rounded-0"
              onClick={() => {
                showToast(`Unfollowed @${activePostOptions.username}`);
                setActivePostOptions(null);
              }}
            >
              Unfollow
            </button>

            <button
              className="btn w-100 py-3 text-dark border-bottom rounded-0"
              onClick={() => {
                handleShare(activePostOptions);
                setActivePostOptions(null);
              }}
            >
              Copy link
            </button>

            <button
              className="btn w-100 py-3 text-dark border-bottom rounded-0"
              onClick={() => {
                toggleSave(activePostOptions.id);
                setActivePostOptions(null);
              }}
            >
              {saved[activePostOptions.id] ? 'Remove from Saved' : 'Add to Saved'}
            </button>

            <button
              className="btn w-100 py-3 text-secondary rounded-0"
              onClick={() => setActivePostOptions(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Enlarged Image Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
          <div
            className="bg-white rounded-3 overflow-hidden shadow-lg p-3"
            style={{ maxWidth: '640px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-end mb-2">
              <button
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <img
              src={modalSrc}
              alt="Enlarged view"
              className="img-fluid rounded w-100"
              style={{ maxHeight: '75vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
