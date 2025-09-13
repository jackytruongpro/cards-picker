// src/CardExclusionModal.js
import React, { useState, useMemo, useEffect } from 'react';
import './CardExclusionModal.css';

const CardExclusionModal = ({ isOpen, onClose, onConfirm, allCards, initialExclusions, categoryMappings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [excludedIds, setExcludedIds] = useState(initialExclusions);

  // S'assure que si les exclusions initiales changent, l'état interne se met à jour.
  useEffect(() => {
    setExcludedIds(initialExclusions);
  }, [initialExclusions]);


  const { subjectCardIds, monthCardIds } = useMemo(() => {
    if (!allCards || !categoryMappings) return { subjectCardIds: [], monthCardIds: [] };
    
    const allSubjectNames = [...new Set(Object.values(categoryMappings.subjects).flat())];
    const allMonthNames = [...new Set(Object.values(categoryMappings.months).flat())];
    
    const sIds = allCards.filter(c => allSubjectNames.includes(c.name.toLowerCase())).map(c => c.id);
    const mIds = allCards.filter(c => allMonthNames.includes(c.name.toLowerCase())).map(c => c.id);
    
    return { subjectCardIds: sIds, monthCardIds: mIds };
  }, [allCards, categoryMappings]);

  const areSubjectsExcluded = subjectCardIds.length > 0 && subjectCardIds.every(id => excludedIds.includes(id));
  const areMonthsExcluded = monthCardIds.length > 0 && monthCardIds.every(id => excludedIds.includes(id));

  const handleToggleCategory = (category, shouldBeExcluded) => {
    const idsToToggle = category === 'subjects' ? subjectCardIds : monthCardIds;
    if (shouldBeExcluded) {
      setExcludedIds(prev => [...new Set([...prev, ...idsToToggle])]);
    } else {
      setExcludedIds(prev => prev.filter(id => !idsToToggle.includes(id)));
    }
  };

  const handleCheckboxChange = (cardId) => {
    setExcludedIds(prev => prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]);
  };

  const handleConfirm = () => { onConfirm(excludedIds); onClose(); };

  const filteredCards = useMemo(() => {
    return allCards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [allCards, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="exclusion-modal-backdrop" onClick={onClose}>
      <div className="exclusion-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Gérer les Cartes</h2>
        <p>Utilisez les interrupteurs pour exclure des groupes entiers, puis affinez dans la liste.</p>
        
        <div className="category-toggles">
          <label className="category-toggle-label">
            <input 
              type="checkbox"
              checked={areSubjectsExcluded}
              onChange={(e) => handleToggleCategory('subjects', e.target.checked)}
              disabled={subjectCardIds.length === 0}
            />
            Exclure les cartes "Sujets"
          </label>
          <label className="category-toggle-label">
            <input 
              type="checkbox"
              checked={areMonthsExcluded}
              onChange={(e) => handleToggleCategory('months', e.target.checked)}
              disabled={monthCardIds.length === 0}
            />
            Exclure les cartes "Mois"
          </label>
        </div>
        
        <input type="text" className="search-bar" placeholder="Rechercher une carte..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="cards-list">
          {filteredCards.map(card => (
            <label key={card.id} className="card-checkbox-label">
              <input type="checkbox" checked={!excludedIds.includes(card.id)} onChange={() => handleCheckboxChange(card.id)} />
              <span className="card-name">{card.name}</span>
            </label>
          ))}
        </div>
        <button onClick={handleConfirm} className="confirm-button">Sauvegarder les Exclusions</button>
      </div>
    </div>
  );
};

export default CardExclusionModal;