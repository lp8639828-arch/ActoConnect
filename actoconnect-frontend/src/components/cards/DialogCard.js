import React, { useState, useEffect } from 'react';

const DialogCard = () => {
  const dialogues = [
    { actor: 'Shah Rukh Khan', dialogue: 'Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain...' },
    { actor: 'Amitabh Bachchan', dialogue: 'Don ko pakadna mushkil hi nahi, namumkin hai!' },
    { actor: 'Ranbir Kapoor', dialogue: 'Main udna chahta hoon, daudna chahta hoon, girna bhi chahta hoon...' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dialogues.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dialogues.length]);

  return (
    <div className="dialog-card fade-in">
      <h3>{dialogues[currentIndex].actor}</h3>
      <p>"{dialogues[currentIndex].dialogue}"</p>
    </div>
  );
};

export default DialogCard;