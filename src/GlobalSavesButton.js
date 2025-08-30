// src/GlobalSavesButton.js
import React from 'react';
import './GlobalSavesButton.css';

const GlobalSavesButton = ({ onOpenSaves }) => {
  return (
    <button 
      className="global-saves-button" 
      onClick={onOpenSaves}
      title="Ouvrir mes tirages sauvegardés"
    >
      Mes Tirages
    </button>
  );
};

export default GlobalSavesButton;