// src/Card.js
import React, { useRef } from 'react';
import './Card.css';

const Card = ({ id, contentImage, coverImage, isFlipped, onFlip, onAnimate, isHidden }) => {
  const cardRef = useRef(null);

  const handleClick = () => {
    if (!isFlipped) {
      onFlip(id);
      const rect = cardRef.current.getBoundingClientRect();
      
      // ✅ On envoie maintenant aussi la `coverImage`
      onAnimate({ id, contentImage, coverImage, rect, timestamp: Date.now() });
    }
  };

  return (
    <div 
      ref={cardRef} 
      className={`card ${isFlipped ? 'is-flipped' : ''} ${isHidden ? 'is-hidden' : ''}`} 
      onClick={handleClick}
    >
      <div className="card-inner">
        <div 
          className="card-face card-face--front" 
          style={{ backgroundImage: `url(${coverImage})` }}
        />
        <div 
          className="card-face card-face--back" 
          style={{ backgroundImage: `url(${contentImage})` }}
        />
      </div>
    </div>
  );
};

export default Card;