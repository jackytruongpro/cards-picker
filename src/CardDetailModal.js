// src/CardDetailModal.js
import React from 'react';
import './Modal.css'; // On utilisera un fichier CSS commun pour les modales

const CardDetailModal = ({ card, onClose }) => {
  // Permet de fermer la modale en cliquant sur le fond
  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>×</button>
        <img src={card.contentImage} alt={`Carte ${card.id}`} className="modal-image" />
      </div>
    </div>
  );
};

export default CardDetailModal;