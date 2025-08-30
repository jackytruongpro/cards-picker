// src/MonthModeToggle.js
import React from 'react';
import './MonthModeToggle.css';

const MonthModeToggle = ({ isChecked, onChange }) => {
  return (
    <div className="toggle-container">
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
      <span className="toggle-label">Mode Prévision Mensuelle</span>
    </div>
  );
};

export default MonthModeToggle;