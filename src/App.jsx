import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Suggestions from './Suggestions';
import CreatePostModal from './CreatePostModal';
import UserProfileModal from './UserProfileModal';
import Explore from './Explore';
import Reels from './Reels';
import Messages from './Messages';
import fallbackData from '../db/db.json';

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [addedPosts, setAddedPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [feedFilter, setFeedFilter] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const handlePostCreated = (newPost) => {
    setAddedPosts((prev) => [newPost, ...prev]);
    setActiveTab('home');
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleFilterFeed = (filterQuery) => {
    setFeedFilter(filterQuery);
    setActiveTab('home');
  };

  const handleClearFilter = () => {
    setFeedFilter(null);
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar
        onCreateClick={() => setIsCreateModalOpen(true)}
        onSelectUser={handleSelectUser}
        onFilterFeed={handleFilterFeed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <div className="content-grid">
            <div className="feed-column">
              <Feed
                addedPosts={addedPosts}
                feedFilter={feedFilter}
                onSelectUser={handleSelectUser}
                onClearFilter={handleClearFilter}
              />
            </div>
            <div className="suggestions-column">
              <Suggestions onSelectUser={handleSelectUser} />
            </div>
          </div>
        )}

        {activeTab === 'explore' && <Explore onSelectUser={handleSelectUser} />}

        {activeTab === 'reels' && <Reels onSelectUser={handleSelectUser} />}

        {activeTab === 'messages' && <Messages onSelectUser={handleSelectUser} />}
      </main>

      {/* User Profile Modal when any user or searched ID is clicked */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onFilterFeed={handleFilterFeed}
        />
      )}

      {/* Create New Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
        currentUser={fallbackData?.profile}
      />
    </div>
  );
}

export default App;