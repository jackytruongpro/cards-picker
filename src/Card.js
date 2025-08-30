// src/Card.js
import React, { useRef } from 'react';
import './Card.css';

const Card = ({ id, contentImage, coverImage, isFlipped, onFlip, onAnimate, isHidden }) => {
  const cardRef = useRef(null);

  const handleClick = () => {
    if (!isFlipped) {
      onFlip(id);
      const rect = cardRef.current.getBoundingClientRect();
      
      // ✅ MODIFICATION ICI : On ajoute un `timestamp` pour rendre chaque clic unique
      onAnimate({ id, contentImage, rect, timestamp: Date.now() });
    }
  };

  return (
    <div 
      ref={cardRef} 
      className={`card ${isFlipped ? 'is-flipped' : ''} ${isHidden ? 'is-hidden' : ''}`} 
      onClick={handleClick}
    >
      {/* ... (le reste du composant ne change pas) ... */}
      <div className="card-inner">
        <div 
          className="card-face card-face--front" 
          style={{ backgroundImage: `url(${coverImage})` }}
        >
        </div>
        <div 
          className="card-face card-face--back" 
          style={{ backgroundImage: `url(${contentImage})` }}
        >
        </div>
      </div>
    </div>
  );
};

export default Card;