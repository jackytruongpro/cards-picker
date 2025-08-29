// src/Card.js
import React from 'react';
import './Card.css';

const Card = ({ id, contentImage, coverImage, isFlipped, onFlip }) => {
  const handleClick = () => {
    // On ne retourne la carte que si elle n'est pas déjà retournée
    if (!isFlipped) {
      onFlip(id);
    }
  };

  return (
    <div className={`card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        {/* Face avant (visible par défaut) : la couverture */}
        <div 
          className="card-face card-face--front" 
          style={{ backgroundImage: `url(${coverImage})` }}
        >
        </div>
        {/* Face arrière (visible au clic) : l'illustration */}
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