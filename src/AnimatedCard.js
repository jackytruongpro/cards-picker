// src/AnimatedCard.js
import React, { useState, useEffect } from 'react';
import './AnimatedCard.css';

const AnimatedCard = ({ cardData, onAnimationEnd }) => {
  const [animationState, setAnimationState] = useState('entering');

  useEffect(() => {
    // 1. Lance l'animation "active" (zoom et retournement)
    const enterTimeout = setTimeout(() => {
      setAnimationState('active');
    }, 50);

    // 2. Lance l'animation de "départ" (retour à la place et à l'état initial)
    const exitTimeout = setTimeout(() => {
      setAnimationState('leaving');
    }, 1800); // On laisse un peu plus de temps pour admirer la carte

    // 3. Détruit le composant une fois l'animation terminée
    const endTimeout = setTimeout(() => {
      onAnimationEnd();
    }, 2300); // Durée totale de l'effet

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(endTimeout);
    };
  }, [onAnimationEnd]);

  if (!cardData || !cardData.rect) {
    return null;
  }

  // Styles pour la position et la taille de la carte animée
  const style = {
    '--start-top': `${cardData.rect.top}px`,
    '--start-left': `${cardData.rect.left}px`,
    '--start-width': `${cardData.rect.width}px`,
    '--start-height': `${cardData.rect.height}px`,
  };

  return (
    <div style={style} className={`animated-card-container ${animationState}`}>
      <div className="animated-card-inner">
        {/* Face avant (la couverture) */}
        <div 
          className="animated-card-face animated-card-front"
          style={{ backgroundImage: `url(${cardData.coverImage})` }}
        />
        {/* Face arrière (l'illustration) */}
        <div 
          className="animated-card-face animated-card-back"
          style={{ backgroundImage: `url(${cardData.contentImage})` }}
        />
      </div>
    </div>
  );
};

export default AnimatedCard;