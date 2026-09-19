import React, { useState } from 'react';

const CONVERSATIONS = [
  {
    id: 1,
    username: 'travel_boy',
    fullName: 'Aryan Sharma',
    profilePic: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 101, text: 'Hey Hanisha! Loved your recent sunset photo 🌅', sender: 'them', time: '10:30 AM' },
      { id: 102, text: 'Thanks Aryan! Where are you traveling to next?', sender: 'me', time: '10:32 AM' },
      { id: 103, text: 'Heading to Kyoto next week! Excited for mountain trails 🏔️', sender: 'them', time: '10:35 AM' }
    ]
  },
  {
    id: 2,
    username: 'spider_adventures',
    fullName: 'Peter Parker',
    profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 201, text: 'Check out this climbing spot in Yosemite!', sender: 'them', time: 'Yesterday' }
    ]
  },
  {
    id: 3,
    username: 'chef_nivin',
    fullName: 'Nivin Kapoor',
    profilePic: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 301, text: 'Sending you the secret pasta recipe later today 🍝', sender: 'them', time: '2d ago' }
    ]
  }
];

function Messages({ onSelectUser }) {
  const [activeChatId, setActiveChatId] = useState(1);
  const [chats, setChats] = useState(CONVERSATIONS);
  const [inputText, setInputText] = useState('');

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText.trim(),
      sender: 'me',
      time: 'Just now'
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );

    setInputText('');
  };

  return (
    <div className="messages-wrapper bg-white border rounded-4 shadow-sm d-flex overflow-hidden w-100" style={{ maxWidth: '870px', height: '620px', margin: '0 auto' }}>
      {/* Left Chat List Sidebar */}
      <div className="chat-list-pane border-end d-flex flex-column" style={{ width: '310px', minWidth: '280px' }}>
        {/* User Account Header */}
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <span className="fw-bold fs-6">hanisha_0510</span>
          <i className="bi bi-pencil-square fs-5 text-dark" style={{ cursor: 'pointer' }}></i>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto flex-grow-1 p-2 d-flex flex-column gap-1">
          <span className="px-2 py-1 text-muted small fw-bold">Messages</span>
          {chats.map((chat) => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            const isActive = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                className={`d-flex align-items-center gap-3 p-2 rounded-3 hover-bg ${
                  isActive ? 'bg-light fw-bold' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveChatId(chat.id)}
              >
                <img
                  src={chat.profilePic}
                  alt={chat.username}
                  className="rounded-circle object-fit-cover flex-shrink-0"
                  style={{ width: '48px', height: '48px' }}
                />
                <div className="d-flex flex-column overflow-hidden small">
                  <span className="fw-bold text-dark text-truncate">{chat.username}</span>
                  <span className="text-secondary text-truncate" style={{ fontSize: '0.8rem' }}>
                    {lastMsg ? lastMsg.text : 'Active now'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Active Conversation Pane */}
      <div className="chat-thread-pane flex-grow-1 d-flex flex-column">
        {activeChat ? (
          <>
            {/* Active Chat Header */}
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
              <div
                className="d-flex align-items-center gap-3"
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectUser && onSelectUser({ username: activeChat.username, profilePic: activeChat.profilePic })}
              >
                <img
                  src={activeChat.profilePic}
                  alt={activeChat.username}
                  className="rounded-circle object-fit-cover"
                  style={{ width: '38px', height: '38px' }}
                />
                <div className="d-flex flex-column">
                  <span className="fw-bold small text-dark">{activeChat.username}</span>
                  <span className="text-muted" style={{ fontSize: '11px' }}>Active now</span>
                </div>
              </div>
              <div className="d-flex gap-3 fs-5 text-secondary me-2">
                <i className="bi bi-telephone" style={{ cursor: 'pointer' }}></i>
                <i className="bi bi-camera-video" style={{ cursor: 'pointer' }}></i>
                <i className="bi bi-info-circle" style={{ cursor: 'pointer' }}></i>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-grow-1 p-3 overflow-y-auto d-flex flex-column gap-2 bg-light-subtle">
              {activeChat.messages.map((msg) => {
                const isMe = msg.sender === 'me';
                return (
                  <div
                    key={msg.id}
                    className={`d-flex ${isMe ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div
                      className={`p-3 rounded-4 small max-w-75 ${
                        isMe ? 'bg-primary text-white rounded-bottom-end-0' : 'bg-white border text-dark shadow-sm rounded-bottom-start-0'
                      }`}
                      style={{ maxWidth: '70%', fontSize: '0.88rem' }}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 border-top bg-white d-flex align-items-center gap-2">
              <i className="bi bi-emoji-smile fs-5 text-secondary" style={{ cursor: 'pointer' }}></i>
              <input
                type="text"
                placeholder="Message…"
                className="form-control form-control-sm rounded-pill bg-light border-0 px-3 py-2"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              {inputText.trim() ? (
                <button type="submit" className="btn btn-link p-0 fw-bold text-primary text-decoration-none">
                  Send
                </button>
              ) : (
                <i className="bi bi-heart fs-5 text-dark ms-1" style={{ cursor: 'pointer' }}></i>
              )}
            </form>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-muted">
            <i className="bi bi-chat-dots display-3 mb-2"></i>
            <span>Your Messages</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
