import React, { useState, useEffect } from 'react';
import fallbackData from '../db/db.json';
import { getUserProfile } from './usersData';

function Suggestions({ onSelectUser }) {
  const [profile, setProfile] = useState(fallbackData.profile);
  const [suggestions, setSuggestions] = useState([]);
  const [followingMap, setFollowingMap] = useState({});

  useEffect(() => {
    let mounted = true;
    fetch('/api/suggestions')
      .then((res) => res.json())
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length > 0) {
          setSuggestions(data);
        } else if (mounted) {
          setSuggestions(fallbackData.suggestions || []);
        }
      })
      .catch(() => {
        if (mounted) {
          setSuggestions(fallbackData.suggestions || []);
        }
      });

    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data?.username) {
          setProfile(data);
        }
      })
      .catch(() => {
        // fallback profile already set
      });

    return () => {
      mounted = false;
    };
  }, []);

  const toggleFollow = (id) => {
    setFollowingMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleUserClick = (username) => {
    if (onSelectUser) {
      onSelectUser(getUserProfile(username));
    }
  };

  return (
    <div className="suggestions-container">
      {/* Current User Profile Switcher */}
      {profile && (
        <div className="current-user-card d-flex align-items-center justify-content-between mb-4">
          <div
            className="d-flex align-items-center gap-2 overflow-hidden flex-grow-1 me-2"
            style={{ cursor: 'pointer' }}
            onClick={() => handleUserClick(profile.username)}
            title={`View @${profile.username}'s profile`}
          >
            <img
              src={profile.profilePic}
              alt={profile.username}
              className="suggestion-avatar current-user-avatar flex-shrink-0"
            />
            <div className="user-info d-flex flex-column overflow-hidden">
              <span className="fw-semibold user-handle text-truncate">{profile.username}</span>
              <span className="text-muted small user-name text-truncate">{profile.fullName || profile.username}</span>
            </div>
          </div>
          <button
            className="btn btn-link p-0 text-decoration-none switch-btn fw-semibold flex-shrink-0"
            onClick={() => handleUserClick(profile.username)}
          >
            Switch
          </button>
        </div>
      )}

      {/* Suggested for you header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="fw-semibold text-secondary small">Suggested for you</span>
        <button className="btn btn-link p-0 text-decoration-none see-all-btn text-dark fw-semibold small flex-shrink-0">
          See All
        </button>
      </div>

      {/* Suggestions List */}
      <div className="suggestions-list d-flex flex-column gap-3 mb-4">
        {suggestions.map((user) => {
          const isFollowed = !!followingMap[user.id];
          return (
            <div
              key={user.id}
              className="suggestion-item d-flex align-items-center justify-content-between"
            >
              <div
                className="d-flex align-items-center gap-2 overflow-hidden flex-grow-1 me-2"
                style={{ cursor: 'pointer' }}
                onClick={() => handleUserClick(user.username)}
                title={`View @${user.username}'s profile`}
              >
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="suggestion-avatar flex-shrink-0"
                />
                <div className="suggestion-text d-flex flex-column overflow-hidden">
                  <span className="fw-semibold suggestion-username text-truncate">{user.username}</span>
                  <span className="text-muted suggestion-subtitle text-truncate">
                    {user.subtitle || 'Suggested for you'}
                  </span>
                </div>
              </div>
              <button
                className={`btn btn-link p-0 text-decoration-none follow-btn fw-semibold flex-shrink-0 ${
                  isFollowed ? 'following' : ''
                }`}
                onClick={() => toggleFollow(user.id)}
              >
                {isFollowed ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Instagram Legal & Meta Footer */}
      <footer className="instagram-footer">
        <div className="footer-links mb-3">
          <a href="#about">About</a> • <a href="#help">Help</a> • <a href="#press">Press</a> •{' '}
          <a href="#api">API</a> • <a href="#jobs">Jobs</a> • <a href="#privacy">Privacy</a> •{' '}
          <a href="#terms">Terms</a> • <a href="#locations">Locations</a> •{' '}
          <a href="#language">Language</a> • <a href="#meta-verified">Meta Verified</a>
        </div>
        <div className="footer-copyright text-uppercase">
          © 2026 Instagram from Meta
        </div>
      </footer>
    </div>
  );
}

export default Suggestions;