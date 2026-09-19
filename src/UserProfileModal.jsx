import React, { useState } from 'react';

function UserProfileModal({ user, onClose, onFilterFeed, onPhotoClick }) {
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);
  const [followersCount, setFollowersCount] = useState(user?.followers || 120);
  const [activeTab, setActiveTab] = useState('posts');

  if (!user) return null;

  const handleToggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  const handleViewInFeed = () => {
    if (onFilterFeed) {
      onFilterFeed(user.username);
    }
    onClose();
  };

  const photos = user.photos || [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="user-profile-modal-card shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold fs-6">@{user.username}</span>
            {user.isVerified && (
              <i className="bi bi-patch-check-fill text-primary" title="Verified Account"></i>
            )}
          </div>
          <button className="btn btn-link p-0 text-dark" onClick={onClose}>
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="p-4 border-bottom">
          <div className="d-flex align-items-center gap-4 flex-wrap flex-sm-nowrap">
            {/* Avatar with Story Ring */}
            <div className="profile-modal-avatar-wrapper flex-shrink-0">
              <img
                src={user.profilePic}
                alt={user.username}
                className="profile-modal-avatar"
              />
            </div>

            {/* Details & Actions */}
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                <h5 className="mb-0 fw-bold">{user.username}</h5>
                {user.isVerified && (
                  <i className="bi bi-patch-check-fill text-primary"></i>
                )}

                <button
                  className={`btn btn-sm px-3 fw-semibold ms-sm-2 ${
                    isFollowing ? 'btn-outline-secondary' : 'btn-primary'
                  }`}
                  onClick={handleToggleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>

                <button
                  className="btn btn-sm btn-light border fw-semibold"
                  onClick={handleViewInFeed}
                  title="Filter main feed for this user's posts"
                >
                  <i className="bi bi-grid-fill me-1"></i> Feed
                </button>
              </div>

              {/* Stats Row */}
              <div className="d-flex gap-4 mb-3 text-secondary small">
                <div>
                  <strong className="text-dark">{photos.length || user.postsCount || 1}</strong> posts
                </div>
                <div>
                  <strong className="text-dark">{followersCount.toLocaleString()}</strong> followers
                </div>
                <div>
                  <strong className="text-dark">{(user.following || 150).toLocaleString()}</strong> following
                </div>
              </div>

              {/* Full Name & Bio */}
              <div>
                <div className="fw-bold small text-dark">{user.fullName || user.username}</div>
                {user.bio && (
                  <div
                    className="small text-muted mt-1"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {user.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex justify-content-center border-bottom bg-light">
          <button
            className={`btn btn-link text-decoration-none px-4 py-2 small fw-semibold d-flex align-items-center gap-2 ${
              activeTab === 'posts' ? 'border-top border-2 border-dark text-dark' : 'text-muted'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            <i className="bi bi-grid-3x3"></i> POSTS
          </button>
          <button
            className={`btn btn-link text-decoration-none px-4 py-2 small fw-semibold d-flex align-items-center gap-2 ${
              activeTab === 'tagged' ? 'border-top border-2 border-dark text-dark' : 'text-muted'
            }`}
            onClick={() => setActiveTab('tagged')}
          >
            <i className="bi bi-person-badge"></i> TAGGED
          </button>
        </div>

        {/* Photos Grid */}
        <div className="profile-photos-grid p-3">
          {photos.length > 0 ? (
            <div className="row g-2">
              {photos.map((url, idx) => (
                <div key={idx} className="col-4">
                  <div
                    className="profile-grid-item position-relative"
                    onClick={() => {
                      if (onPhotoClick) onPhotoClick(url);
                    }}
                  >
                    <img
                      src={url}
                      alt={`Post by ${user.username}`}
                      className="profile-grid-img w-100 h-100"
                    />
                    <div className="profile-grid-hover-overlay d-flex align-items-center justify-content-center gap-3 text-white">
                      <span><i className="bi bi-heart-fill me-1"></i> {240 + idx * 85}</span>
                      <span><i className="bi bi-chat-fill me-1"></i> {18 + idx * 7}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-camera display-4 d-block mb-2 text-secondary opacity-50"></i>
              <span>No Posts Yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;
