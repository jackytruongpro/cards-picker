// src/SliderModal.js
import React, { useState, useEffect } from 'react';
import './Modal.css';

const SliderModal = ({ cards, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === cards.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  // Permet la navigation avec les flèches du clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content slider-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        
        {/* Flèche de navigation gauche */}
        <button className="slider-arrow prev" onClick={goToPrevious}>❮</button>
        
        <img 
          src={cards[currentIndex].contentImage} 
          alt={`Carte ${cards[currentIndex].id}`} 
          className="modal-image" 
        />

        {/* Flèche de navigation droite */}
        <button className="slider-arrow next" onClick={goToNext}>❯</button>

        <div className="slider-counter">{currentIndex + 1} / {cards.length}</div>
      </div>
    </div>
  );
};

export default SliderModal;