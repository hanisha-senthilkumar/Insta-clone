import React, { useState, useEffect, useRef } from 'react';
import sidebarImg from './assets/sidebar img.jpg';
import fallbackData from '../db/db.json';
import { searchUsersAndTags, KNOWN_USERS, getUserProfile } from './usersData';

const DEMO_NOTIFICATIONS = [
  {
    id: 1,
    user: 'spider_adventures',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    action: 'liked your photo.',
    time: '12m'
  },
  {
    id: 2,
    user: 'chef_nivin',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    action: 'commented: "Stunning shot! 🌟"',
    time: '2h'
  },
  {
    id: 3,
    user: 'travel_queen',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    action: 'started following you.',
    time: '1d'
  }
];

const DEFAULT_RECENT = ['travel_boy', 'spider_adventures', 'chef_nivin', 'travel_queen'];

function Sidebar({ onCreateClick, onSelectUser, onFilterFeed, activeTab = 'home', setActiveTab }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('ig_recent_searches');
      return saved ? JSON.parse(saved) : DEFAULT_RECENT;
    } catch {
      return DEFAULT_RECENT;
    }
  });
  const [followedMap, setFollowedMap] = useState({});

  const searchInputRef = useRef(null);

  const profilePic =
    fallbackData?.profile?.profilePic ||
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80';

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [showSearch]);

  const saveRecent = (username) => {
    setRecentSearches((prev) => {
      const next = [username, ...prev.filter((u) => u !== username)].slice(0, 8);
      try {
        localStorage.setItem('ig_recent_searches', JSON.stringify(next));
      } catch (e) {
        // ignore storage errors
      }
      return next;
    });
  };

  const removeRecent = (e, username) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const next = prev.filter((u) => u !== username);
      try {
        localStorage.setItem('ig_recent_searches', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('ig_recent_searches');
    } catch (e) {
      // ignore
    }
  };

  const handleSelectUserAccount = (user) => {
    saveRecent(user.username);
    if (onSelectUser) {
      onSelectUser(user);
    }
    setShowSearch(false);
  };

  const handleSelectHashtag = (tag) => {
    if (onFilterFeed) {
      onFilterFeed(tag);
    }
    if (setActiveTab) setActiveTab('home');
    setShowSearch(false);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!searchQuery.trim()) return;

      const { users } = searchUsersAndTags(searchQuery);
      if (users.length > 0) {
        handleSelectUserAccount(users[0]);
      } else if (onFilterFeed) {
        onFilterFeed(searchQuery.trim());
        if (setActiveTab) setActiveTab('home');
        setShowSearch(false);
      }
    }
  };

  const toggleFollow = (e, username) => {
    e.stopPropagation();
    setFollowedMap((prev) => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  // Search Results
  const searchResults = searchQuery.trim()
    ? searchUsersAndTags(searchQuery)
    : { users: [], hashtags: [] };

  return (
    <aside className="sidebar-wrapper">
      <div>
        {/* Instagram Brand / Logo */}
        <div className="mb-1">
          <img
            src={sidebarImg}
            alt="Instagram"
            className="sidebar-logo"
            onClick={() => {
              if (onFilterFeed) onFilterFeed(null);
              if (setActiveTab) setActiveTab('home');
            }}
          />
        </div>

        {/* Main Navigation Items */}
        <nav className="d-flex flex-column gap-1 position-relative">
          <div
            className={`nav-link-item ${activeTab === 'home' && !showSearch ? 'active' : ''}`}
            onClick={() => {
              if (setActiveTab) setActiveTab('home');
              if (onFilterFeed) onFilterFeed(null);
              setShowSearch(false);
              setShowNotifications(false);
            }}
          >
            <i className="bi bi-house-door-fill"></i>
            <span>Home</span>
          </div>

          <div
            className={`nav-link-item ${showSearch ? 'active' : ''}`}
            onClick={() => {
              setShowSearch(!showSearch);
              setShowNotifications(false);
            }}
          >
            <i className="bi bi-search"></i>
            <span>Search</span>
          </div>

          <div
            className={`nav-link-item ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => {
              if (setActiveTab) setActiveTab('explore');
              setShowSearch(false);
              setShowNotifications(false);
            }}
          >
            <i className="bi bi-compass"></i>
            <span>Explore</span>
          </div>

          <div
            className={`nav-link-item ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => {
              if (setActiveTab) setActiveTab('reels');
              setShowSearch(false);
              setShowNotifications(false);
            }}
          >
            <i className="bi bi-play-btn"></i>
            <span>Reels</span>
          </div>

          <div
            className={`nav-link-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => {
              if (setActiveTab) setActiveTab('messages');
              setShowSearch(false);
              setShowNotifications(false);
            }}
          >
            <i className="bi bi-chat-dots"></i>
            <span>Messages</span>
          </div>

          <div
            className={`nav-link-item ${showNotifications ? 'active' : ''}`}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSearch(false);
            }}
          >
            <i className="bi bi-heart"></i>
            <span>Notifications</span>
          </div>

          <div className="nav-link-item" onClick={onCreateClick}>
            <i className="bi bi-plus-square"></i>
            <span>Create</span>
          </div>

          <div
            className="nav-link-item"
            onClick={() => {
              if (onSelectUser) {
                onSelectUser(fallbackData.profile || KNOWN_USERS.hanisha_0510);
              }
            }}
          >
            <img src={profilePic} alt="Profile" className="sidebar-avatar" />
            <span>Profile</span>
          </div>

          {/* Notifications Flyout Box */}
          {showNotifications && (
            <div className="sidebar-popover-panel shadow">
              <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                <span className="fw-bold fs-6">Notifications</span>
                <button
                  className="btn btn-link p-0 text-dark"
                  onClick={() => setShowNotifications(false)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="p-2 d-flex flex-column gap-2" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                <div className="text-muted small px-2 fw-semibold">This Week</div>
                {DEMO_NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="d-flex align-items-center gap-2 p-2 rounded hover-bg">
                    <img
                      src={n.avatar}
                      alt={n.user}
                      className="rounded-circle"
                      style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                    />
                    <div className="small flex-grow-1">
                      <span className="fw-semibold">{n.user} </span>
                      <span className="text-secondary">{n.action}</span>
                      <span className="text-muted ms-1" style={{ fontSize: '11px' }}>
                        {n.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Flyout Box */}
          {showSearch && (
            <div className="sidebar-popover-panel shadow search-popover-box">
              {/* Header with Title and Close Button */}
              <div className="p-3 border-bottom">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="fw-bold fs-5">Search</span>
                  <button
                    className="btn btn-link p-0 text-secondary"
                    onClick={() => setShowSearch(false)}
                    title="Close Search"
                  >
                    <i className="bi bi-x-lg fs-6"></i>
                  </button>
                </div>

                {/* Search Input Box */}
                <div className="position-relative">
                  <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search accounts or tags..."
                    className="form-control form-control-sm search-input-field ps-5 pe-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                  />
                  {searchQuery && (
                    <button
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y p-0 me-2 text-muted"
                      onClick={() => setSearchQuery('')}
                      title="Clear"
                    >
                      <i className="bi bi-x-circle-fill small"></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Search Panel Content Area */}
              <div className="search-popover-content">
                {searchQuery.trim() ? (
                  /* Active Search Results */
                  <div className="p-2">
                    {/* Filter Feed Action Bar */}
                    <div
                      className="d-flex align-items-center gap-2 p-2 rounded hover-bg mb-2 text-primary border-bottom pb-2"
                      onClick={() => {
                        if (onFilterFeed) onFilterFeed(searchQuery.trim());
                        setShowSearch(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="search-result-avatar-wrap d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-search"></i>
                      </div>
                      <div className="small flex-grow-1">
                        <div className="fw-semibold text-dark">
                          Filter Feed for "<strong>{searchQuery}</strong>"
                        </div>
                        <span className="text-muted" style={{ fontSize: '12px' }}>
                          View matching posts in main feed
                        </span>
                      </div>
                      <i className="bi bi-arrow-right text-muted small"></i>
                    </div>

                    {/* Matched Accounts */}
                    {searchResults.users.length > 0 && (
                      <div className="mb-2">
                        <div className="text-muted small px-2 py-1 fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                          Accounts ({searchResults.users.length})
                        </div>
                        {searchResults.users.map((user) => {
                          const isFollowed = followedMap[user.username] ?? user.isFollowing;
                          return (
                            <div
                              key={user.username}
                              className="search-result-item d-flex align-items-center gap-2 p-2 rounded hover-bg"
                              onClick={() => handleSelectUserAccount(user)}
                            >
                              <div className="position-relative flex-shrink-0">
                                <img
                                  src={user.profilePic}
                                  alt={user.username}
                                  className="rounded-circle border"
                                  style={{ width: '42px', height: '42px', objectFit: 'cover' }}
                                />
                              </div>

                              <div className="small flex-grow-1 overflow-hidden">
                                <div className="d-flex align-items-center gap-1">
                                  <span className="fw-bold text-dark text-truncate">{user.username}</span>
                                  {user.isVerified && (
                                    <i className="bi bi-patch-check-fill text-primary" style={{ fontSize: '11px' }}></i>
                                  )}
                                </div>
                                <div className="text-muted text-truncate" style={{ fontSize: '12px' }}>
                                  {user.fullName} {user.subtitle ? `• ${user.subtitle}` : ''}
                                </div>
                              </div>

                              <button
                                className={`btn btn-sm py-1 px-2 fw-semibold flex-shrink-0 ${
                                  isFollowed ? 'btn-light border text-dark' : 'btn-primary'
                                }`}
                                style={{ fontSize: '12px', borderRadius: '8px' }}
                                onClick={(e) => toggleFollow(e, user.username)}
                              >
                                {isFollowed ? 'Following' : 'Follow'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Matched Hashtags */}
                    {searchResults.hashtags.length > 0 && (
                      <div className="mt-2 border-top pt-2">
                        <div className="text-muted small px-2 py-1 fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                          Tags
                        </div>
                        {searchResults.hashtags.map((tagObj) => (
                          <div
                            key={tagObj.tag}
                            className="search-result-item d-flex align-items-center gap-2 p-2 rounded hover-bg"
                            onClick={() => handleSelectHashtag(tagObj.tag)}
                          >
                            <div
                              className="rounded-circle border d-flex align-items-center justify-content-center bg-light text-dark fw-bold"
                              style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}
                            >
                              #
                            </div>
                            <div className="small flex-grow-1">
                              <div className="fw-bold text-dark">{tagObj.tag}</div>
                              <div className="text-muted" style={{ fontSize: '12px' }}>
                                {tagObj.count}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Empty Query: Recent Searches Section */
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="fw-bold small text-dark">Recent</span>
                      {recentSearches.length > 0 && (
                        <button
                          className="btn btn-link p-0 text-primary text-decoration-none fw-semibold small"
                          onClick={clearAllRecent}
                          style={{ fontSize: '13px' }}
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {recentSearches.length > 0 ? (
                      <div className="d-flex flex-column gap-1">
                        {recentSearches.map((username) => {
                          const user = getUserProfile(username);
                          return (
                            <div
                              key={username}
                              className="d-flex align-items-center justify-content-between p-2 rounded hover-bg"
                              onClick={() => handleSelectUserAccount(user)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="d-flex align-items-center gap-2 overflow-hidden me-2">
                                <img
                                  src={user.profilePic}
                                  alt={username}
                                  className="rounded-circle flex-shrink-0"
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                                <div className="d-flex flex-column overflow-hidden small">
                                  <div className="d-flex align-items-center gap-1">
                                    <span className="fw-bold text-dark text-truncate">
                                      {user.username}
                                    </span>
                                    {user.isVerified && (
                                      <i className="bi bi-patch-check-fill text-primary" style={{ fontSize: '11px' }}></i>
                                    )}
                                  </div>
                                  <span className="text-muted text-truncate" style={{ fontSize: '12px' }}>
                                    {user.fullName || user.subtitle || 'Instagram user'}
                                  </span>
                                </div>
                              </div>

                              <button
                                className="btn btn-link p-0 text-muted"
                                onClick={(e) => removeRecent(e, username)}
                                title="Remove from recent"
                              >
                                <i className="bi bi-x-lg small"></i>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <i className="bi bi-search display-6 d-block mb-2 text-secondary opacity-50"></i>
                        <span className="small">No recent searches.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="d-flex flex-column gap-1 pt-1">
        <div className="nav-link-item">
          <i className="bi bi-threads"></i>
          <span>Threads</span>
        </div>
        <div className="nav-link-item">
          <i className="bi bi-list"></i>
          <span>More</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;