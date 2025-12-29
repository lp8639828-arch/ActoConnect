import React, { useState, useEffect } from 'react';

const DialogCarousel = () => {
  const quotes = [
    {
      text: "The best way to predict the future is to create it.",
      attribution: "Peter Drucker"
    },
    {
      text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
      attribution: "Steve Jobs"
    },
    {
      text: "The only way to do great work is to love what you do.",
      attribution: "Steve Jobs"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      attribution: "Steve Jobs"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      attribution: "Eleanor Roosevelt"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="dialog-carousel">
      <div className="dialog-quote">
        "{quotes[currentIndex].text}"
      </div>
      <div className="dialog-attribution">
        — {quotes[currentIndex].attribution}
      </div>
      <div className="carousel-dots">
        {quotes.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DialogCarousel;