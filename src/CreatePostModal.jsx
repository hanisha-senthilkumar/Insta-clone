import React, { useState } from 'react';

const SAMPLE_PRESETS = [
  {
    name: 'Sunset Beach',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    caption: 'Chasing the endless horizon 🌅✨ #wanderlust'
  },
  {
    name: 'Mountain Lake',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    caption: 'Fresh alpine air and tranquil waters 🏔️🌲'
  },
  {
    name: 'Cozy Coffee',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    caption: 'Warm brew on a chilly morning ☕🍂'
  },
  {
    name: 'Neon City',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    caption: 'City lights and neon nights ⚡🌃 #cybercity'
  }
];

function CreatePostModal({ isOpen, onClose, onPostCreated, currentUser }) {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    const newPost = {
      id: Date.now(),
      username: currentUser?.username || 'hanisha_0510',
      profilePic: currentUser?.profilePic || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      imageUrl: imageUrl.trim(),
      caption: caption.trim(),
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    onPostCreated(newPost);
    setImageUrl('');
    setCaption('');
    setLocation('');
    onClose();
  };

  const applyPreset = (preset) => {
    setImageUrl(preset.url);
    if (!caption) setCaption(preset.caption);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="create-modal-header d-flex align-items-center justify-content-between p-3 border-bottom">
          <button className="btn btn-link p-0 text-dark" onClick={onClose}>
            <i className="bi bi-x-lg fs-5"></i>
          </button>
          <span className="fw-semibold">Create new post</span>
          <button
            className="btn btn-link p-0 fw-semibold text-primary text-decoration-none"
            onClick={handleSubmit}
            disabled={!imageUrl.trim()}
          >
            Share
          </button>
        </div>

        {/* Modal Body */}
        <div className="create-modal-body d-flex flex-column flex-md-row">
          {/* Left: Preview */}
          <div className="create-image-preview-pane d-flex flex-column align-items-center justify-content-center">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="create-preview-img" />
            ) : (
              <div className="text-center p-4 text-muted">
                <i className="bi bi-images display-3 mb-2 d-block text-secondary"></i>
                <p className="small mb-2">Enter an image URL below or choose a preset</p>
                <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
                  {SAMPLE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                      onClick={() => applyPreset(preset)}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Details Form */}
          <div className="create-details-pane p-3 d-flex flex-column">
            {/* User header */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src={currentUser?.profilePic}
                alt="Profile"
                className="rounded-circle"
                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
              />
              <span className="fw-semibold small">{currentUser?.username || 'hanisha_0510'}</span>
            </div>

            {/* Image URL input */}
            <div className="mb-3">
              <label className="form-label small text-muted mb-1">Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                className="form-control form-control-sm"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {/* Caption */}
            <div className="mb-3 flex-grow-1">
              <label className="form-label small text-muted mb-1">Write a caption...</label>
              <textarea
                rows="4"
                placeholder="Write a caption..."
                className="form-control form-control-sm"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-geo-alt text-muted"></i>
                </span>
                <input
                  type="text"
                  placeholder="Add location"
                  className="form-control border-start-0"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Preset Selector when image is selected */}
            {imageUrl && (
              <div className="mt-auto pt-2 border-top">
                <span className="text-muted small d-block mb-1">Quick Presets:</span>
                <div className="d-flex flex-wrap gap-1">
                  {SAMPLE_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      className="btn btn-xs btn-light border small text-muted"
                      onClick={() => applyPreset(p)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
