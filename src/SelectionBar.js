// src/SelectionBar.js
import React from 'react';
import './SelectionBar.css';

const SelectionBar = ({ selectedCards, onCardClick, onOpenSlider, onSave, onOpenSaves, onReset }) => {
  return (
    <div className="selection-bar">
      <div className="selection-bar-header">
        <h2>Votre Sélection ({selectedCards.length})</h2>
        <div className="selection-bar-actions">
          <button onClick={onReset} className="action-button reset" disabled={selectedCards.length === 0}>
            Réinitialiser
          </button>
          <button onClick={() => onOpenSlider(0)} className="action-button" disabled={selectedCards.length === 0}>
            Agrandir
          </button>
          <button onClick={onSave} className="action-button primary" disabled={selectedCards.length === 0}>
            Sauvegarder
          </button>
          <button onClick={onOpenSaves} className="action-button secondary">
            Mes Tirages
          </button>
        </div>
      </div>
      <div className="selected-cards-container">
        {selectedCards.length > 0 ? (
          selectedCards.map((card, index) => (
            <div 
              key={`selected-${card.id}`} 
              className="selected-card" 
              style={{ backgroundImage: `url(${card.contentImage})` }}
              title={`Agrandir la carte ${card.id}`}
              onClick={() => onCardClick(card)}
            />
          ))
        ) : (
          <p className="empty-selection-text">Aucune carte sélectionnée. Cliquez sur une carte pour commencer.</p>
        )}
      </div>
    </div>
  );
};

export default SelectionBar;