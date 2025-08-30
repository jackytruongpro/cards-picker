// src/AnimatedCard.js
import React, { useState, useEffect } from 'react';
import './AnimatedCard.css';

const AnimatedCard = ({ cardData, onAnimationEnd }) => {
  const [animationState, setAnimationState] = useState('entering');

  useEffect(() => {
    // 1. Juste après l'affichage, on lance l'animation "zoom-in"
    const enterTimeout = setTimeout(() => {
      setAnimationState('active');
    }, 50); // Petit délai pour que la transition CSS s'applique

    // 2. Après un moment, on lance l'animation "zoom-out"
    const exitTimeout = setTimeout(() => {
      setAnimationState('leaving');
    }, 1500); // Durée pendant laquelle la carte reste agrandie

    // 3. Une fois l'animation de sortie terminée, on détruit le composant
    const endTimeout = setTimeout(() => {
      onAnimationEnd();
    }, 2000); // Doit être plus long que la durée de la transition CSS

    // Nettoyage des timers si le composant est détruit avant la fin
    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(endTimeout);
    };
  }, [onAnimationEnd]);

  if (!cardData || !cardData.rect) {
    return null;
  }

  // Styles de la carte animée
  const style = {
    // Position initiale : exactement là où se trouve la carte cliquée
    '--start-top': `${cardData.rect.top}px`,
    '--start-left': `${cardData.rect.left}px`,
    '--start-width': `${cardData.rect.width}px`,
    '--start-height': `${cardData.rect.height}px`,
    backgroundImage: `url(${cardData.contentImage})`,
  };

  return <div style={style} className={`animated-card ${animationState}`} />;
};

export default AnimatedCard;