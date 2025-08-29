// src/SavesPanel.js
import React from 'react';
import './SavesPanel.css';

// On récupère la nouvelle prop `onViewSession`
const SavesPanel = ({ isOpen, sessions, onClose, onLoad, onDelete, onViewSession }) => {
  return (
    <>
      <div 
        className={`saves-panel-backdrop ${isOpen ? 'is-visible' : ''}`}
        onClick={onClose}
      />
      <div className={`saves-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="saves-panel-header">
          <h3>Mes Tirages Sauvegardés</h3>
          <button className="close-panel-button" onClick={onClose}>×</button>
        </div>
        <div className="saves-list">
          {sessions.length > 0 ? (
            sessions.map(session => (
              <div key={session.id} className="save-item">
                <div className="save-item-info">
                  <strong className="save-item-name">{session.name}</strong>
                  <span className="save-item-details">
                    {session.date} ({session.cards.length} cartes)
                  </span>
                </div>

                {/* NOUVEAU : Conteneur pour les miniatures de cartes */}
                <div className="save-item-cards-scroller">
                  {session.cards.map(card => (
                    <div
                      key={card.id}
                      className="save-item-card-thumbnail"
                      style={{ backgroundImage: `url(${card.contentImage})` }}
                      title={card.name}
                    />
                  ))}
                </div>

                <div className="save-item-actions">
                  {/* NOUVEAU : Bouton "Voir" */}
                  <button onClick={() => onViewSession(session.cards)} className="view-button">Voir</button>
                  <button onClick={() => onLoad(session.id)} className="load-button">Charger</button>
                  <button onClick={() => onDelete(session.id)} className="delete-button">Supprimer</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-saves-text">Vous n'avez aucun tirage sauvegardé.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavesPanel;