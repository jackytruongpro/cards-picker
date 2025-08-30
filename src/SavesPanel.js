// src/SavesPanel.js
import React from 'react';
import './SavesPanel.css';

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
            sessions.map(session => {
              const isMonthSave = session.isMonthModeSave;
              const allCardsInSession = isMonthSave 
                ? Object.values(session.assignments).flat()
                : session.cards;

              if (!allCardsInSession) return null;
              const cardCount = allCardsInSession.length;

              return (
                <div key={session.id} className="save-item">
                  <div className="save-item-info">
                    <strong className="save-item-name">{session.name}</strong>
                    <div className="save-item-details">
                      <span>{session.date} ({cardCount} cartes)</span>
                      {isMonthSave && <span className="month-save-tag">Mensuel</span>}
                    </div>
                  </div>

                  {isMonthSave ? (
                    <div className="month-save-details">
                      {session.months.map(month => (
                        <div key={month} className="month-save-section">
                          <div className="month-save-header">
                            <h5 className="month-save-title">{month}</h5>
                            <button
                              className="view-month-save-button"
                              onClick={() => onViewSession(session.assignments[month])}
                              disabled={!session.assignments[month] || session.assignments[month].length === 0}
                            >
                              Voir
                            </button>
                          </div>
                          <div className="save-item-cards-scroller">
                            {session.assignments[month] && session.assignments[month].length > 0 ? (
                              session.assignments[month].map(card => (
                                <div
                                  key={card.id}
                                  className="save-item-card-thumbnail"
                                  style={{ backgroundImage: `url(${card.contentImage})` }}
                                  title={card.name}
                                />
                              ))
                            ) : (
                                <span className="no-card-placeholder-small">Vide</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="save-item-cards-scroller">
                      {allCardsInSession.map(card => (
                        <div
                          key={card.id}
                          className="save-item-card-thumbnail"
                          style={{ backgroundImage: `url(${card.contentImage})` }}
                          title={card.name}
                        />
                      ))}
                    </div>
                  )}

                  <div className="save-item-actions">
                    {!isMonthSave && (
                       <button onClick={() => onViewSession(allCardsInSession)} className="view-button">Voir</button>
                    )}
                    <button 
                      onClick={() => onLoad(session.id)} 
                      className="load-button"
                      title="Charger ce tirage"
                    >
                      Charger
                    </button>
                    <button onClick={() => onDelete(session.id)} className="delete-button">Supprimer</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-saves-text">Vous n'avez aucun tirage sauvegardé.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavesPanel;