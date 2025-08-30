// src/MonthModePanel.js
import React, { useState } from 'react';
import './MonthModePanel.css';

const MonthModePanel = ({ months, assignments, onReset, onSave, onViewMonth }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button 
        className={`panel-toggle-button ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* ✅ MODIFICATION ICI : Affiche un chevron gauche si ouvert, sinon l'icône du menu */}
        {isOpen ? '❮' : '☰'} 
      </button>
      <div className={`month-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="month-panel-header">
          <h3>Tirage Mensuel</h3>
        </div>
        <div className="month-panel-content">
          {months.map(month => (
            <div key={month} className="month-section">
              <div className="month-section-header">
                <h4>{month}</h4>
                <button 
                  className="view-month-button"
                  onClick={() => onViewMonth(assignments[month])}
                  disabled={!assignments[month] || assignments[month].length === 0}
                  title="Voir les cartes de ce mois en grand"
                >
                  Voir
                </button>
              </div>
              <div className="cards-display">
                {assignments[month] && assignments[month].length > 0 ? (
                  assignments[month].map(card => (
                    <div
                      key={card.id}
                      className="month-card-thumbnail"
                      style={{ backgroundImage: `url(${card.contentImage})` }}
                      title={card.name}
                    />
                  ))
                ) : (
                  <span className="no-card-placeholder">Vide</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="month-panel-actions">
          <button onClick={onReset}>Réinitialiser</button>
          <button onClick={onSave}>Sauvegarder</button>
        </div>
      </div>
    </>
  );
};

export default MonthModePanel;