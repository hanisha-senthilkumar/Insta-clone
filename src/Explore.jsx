import React, { useState } from 'react';

const EXPLORE_ITEMS = [
  {
    id: 101,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    likes: 1240,
    comments: 89,
    username: 'travel_boy',
    isReel: false
  },
  {
    id: 102,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
    likes: 3890,
    comments: 241,
    username: 'tokyo_vibes',
    isReel: true
  },
  {
    id: 103,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    likes: 890,
    comments: 42,
    username: 'travel_girl',
    isReel: false
  },
  {
    id: 104,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    likes: 4120,
    comments: 178,
    username: 'chef_nivin',
    isReel: false
  },
  {
    id: 105,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    likes: 2150,
    comments: 95,
    username: 'sophia_art',
    isReel: false
  },
  {
    id: 106,
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&auto=format&fit=crop&q=80',
    likes: 8900,
    comments: 512,
    username: 'golden_retriever_sam',
    isReel: true
  },
  {
    id: 107,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    likes: 1540,
    comments: 63,
    username: 'coffee_culture',
    isReel: false
  },
  {
    id: 108,
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&auto=format&fit=crop&q=80',
    likes: 6720,
    comments: 310,
    username: 'nature_lens',
    isReel: true
  },
  {
    id: 109,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
    likes: 3120,
    comments: 118,
    username: 'tech_insider',
    isReel: false
  }
];

const TRENDING_TAGS = ['#all', '#travel', '#photography', '#foodie', '#art', '#nature', '#tech', '#lifestyle'];

function Explore({ onSelectUser }) {
  const [selectedTag, setSelectedTag] = useState('#all');
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className="explore-container w-100" style={{ maxWidth: '870px', margin: '0 auto' }}>
      {/* Tags Filter Header */}
      <div className="explore-tags-bar d-flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none">
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag}
            className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold text-capitalize ${
              selectedTag === tag ? 'btn-dark' : 'btn-light border text-secondary'
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Explore Grid */}
      <div className="row g-2">
        {EXPLORE_ITEMS.map((item, idx) => (
          <div key={item.id} className="col-4">
            <div
              className="explore-grid-card position-relative overflow-hidden rounded-2"
              style={{ aspectRatio: '1 / 1', cursor: 'pointer', background: '#000' }}
              onClick={() => setPreviewImage(item.imageUrl)}
            >
              <img
                src={item.imageUrl}
                alt={`Explore ${item.username}`}
                className="w-100 h-100 object-fit-cover explore-img"
              />

              {item.isReel && (
                <div className="position-absolute top-0 end-0 m-2 text-white drop-shadow">
                  <i className="bi bi-play-btn-fill fs-5"></i>
                </div>
              )}

              {/* Hover Overlay with Likes & Comments */}
              <div className="explore-hover-overlay position-absolute inset-0 d-flex align-items-center justify-content-center gap-3 text-white fw-bold">
                <span><i className="bi bi-heart-fill me-1"></i> {item.likes.toLocaleString()}</span>
                <span><i className="bi bi-chat-fill me-1"></i> {item.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enlarged Image Preview Modal */}
      {previewImage && (
        <div className="modal-overlay" onClick={() => setPreviewImage(null)}>
          <div className="bg-white rounded-3 overflow-hidden shadow-lg p-3" style={{ maxWidth: '640px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-end mb-2">
              <button className="btn-close" onClick={() => setPreviewImage(null)}></button>
            </div>
            <img src={previewImage} alt="Explore preview" className="w-100 rounded object-fit-contain" style={{ maxHeight: '75vh' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
