import React from 'react';
import Stories from './Stories';
import Posts from './Posts';

function Feed({
  addedPosts = [],
  feedFilter = null,
  onSelectUser,
  onClearFilter
}) {
  return (
    <div className="main-feed-wrapper">
      <Stories onSelectUser={onSelectUser} />
      <Posts
        addedPosts={addedPosts}
        feedFilter={feedFilter}
        onSelectUser={onSelectUser}
        onClearFilter={onClearFilter}
      />
    </div>
  );
}

export default Feed;