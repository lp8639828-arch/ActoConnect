import React, { useState, useEffect } from 'react';
import './ActyAvatar.css';

const ActyAvatar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Namaste! Main Acty hoon. Aapki acting journey shuru karein?",
    "क्या आप नए ऑडिशन खोजना चाहते हैं?",
    "आपके लिए परफेक्ट रोल ढूंढने में मेरी मदद चाहिए?",
    "बॉलीवुड की दुनिया में आपका स्वागत है! 🎭"
  ];

  useEffect(() => {
    // Show avatar after 3 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotate messages every 8 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(messageInterval);
    };
  }, [messages.length]);

  if (!isVisible) return null;

  return (
    <div className="acty-avatar">
      <div className="avatar-dialog">
        <div className="dialog-bubble">
          <p>{messages[currentMessage]}</p>
          <div className="dialog-arrow"></div>
        </div>
      </div>
      <div className="avatar-image">
        <div className="avatar-face">
          <div className="avatar-eyes">👁️👁️</div>
          <div className="avatar-mouth">😊</div>
        </div>
        <div className="avatar-body">
          <div className="avatar-dress">👗</div>
        </div>
      </div>
      <div className="avatar-name">Acty</div>
    </div>
  );
};

export default ActyAvatar;