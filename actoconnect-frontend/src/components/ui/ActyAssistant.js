import React, { useState, useEffect } from 'react';
import './ActyAssistant.css';

const ActyAssistant = () => {
  const defaultMessages = [
    "Hello! Main Acty hoon 👋",
    "Aap audition search karna chahte ho?",
    "Profile complete karne me help chahiye?"
  ];

  const [openChat, setOpenChat] = useState(false);
  const [chatMessages, setChatMessages] = useState(defaultMessages);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggleChat = () => {
    setOpenChat(!openChat);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleQuickReply = (reply) => {
    let responseMessage = "";
    switch(reply) {
      case "Find Auditions":
        responseMessage = "Great! Let me show you the latest auditions...";
        break;
      case "Update Profile":
        responseMessage = "Profile update karne ke liye yahan click karo!";
        break;
      case "Contact Support":
        responseMessage = "Support team se connect kar raha hoon...";
        break;
      default:
        responseMessage = "How can I help you today?";
    }

    setChatMessages(prev => [...prev, `You: ${reply}`, `Acty: ${responseMessage}`]);
  };

  if (!isVisible) return null;

  return (
    <div className={`assistant-bubble ${openChat ? 'chat-open' : ''}`}>
      <div className="assistant-avatar" onClick={handleToggleChat}>
        <img
          src="https://openpeeps.com/images/characters/avatar-1.svg"
          alt="Acty Assistant"
          className="avatar-image"
        />
        <div className="headset">🎧</div>
      </div>

      {openChat && (
        <div className="chat-box">
          <div className="chat-header">
            <h4>Chat with Acty</h4>
            <button className="close-chat-btn" onClick={handleToggleChat}>×</button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className="chat-message">
                {message}
              </div>
            ))}
          </div>
          <div className="quick-replies">
            <button className="quick-reply-btn" onClick={() => handleQuickReply("Find Auditions")}>
              Find Auditions
            </button>
            <button className="quick-reply-btn" onClick={() => handleQuickReply("Update Profile")}>
              Update Profile
            </button>
            <button className="quick-reply-btn" onClick={() => handleQuickReply("Contact Support")}>
              Contact Support
            </button>
          </div>
        </div>
      )}

      <button className="close-btn" onClick={handleClose}>×</button>
    </div>
  );
};

export default ActyAssistant;