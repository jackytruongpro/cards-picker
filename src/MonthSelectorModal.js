// src/MonthSelectorModal.js
import React, { useState } from 'react';
import './MonthSelectorModal.css';

const ALL_MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const MonthSelectorModal = ({ isOpen, onClose, onConfirm }) => {
  const [selected, setSelected] = useState([]);

  const handleCheckboxChange = (month) => {
    setSelected(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const handleConfirm = () => {
    if (selected.length > 0) {
      onConfirm(selected);
    } else {
      alert("Veuillez sélectionner au moins un mois.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="month-modal-backdrop">
      <div className="month-modal-content">
        <h2>Choisissez vos mois</h2>
        <div className="months-grid">
          {ALL_MONTHS.map(month => (
            <label key={month} className="month-checkbox-label">
              <input 
                type="checkbox"
                checked={selected.includes(month)}
                onChange={() => handleCheckboxChange(month)}
              />
              {month}
            </label>
          ))}
        </div>
        <button onClick={handleConfirm} className="confirm-button">Valider</button>
      </div>
    </div>
  );
};

export default MonthSelectorModal;