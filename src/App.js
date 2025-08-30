// src/App.js
import React, { useState, useEffect } from 'react';

// --- Import des Composants ---
import Card from './Card';
import SelectionBar from './SelectionBar';
import SavesPanel from './SavesPanel';
import CardDetailModal from './CardDetailModal';
import SliderModal from './SliderModal';
import MonthModeToggle from './MonthModeToggle';
import MonthSelectorModal from './MonthSelectorModal';
import MonthModePanel from './MonthModePanel';
import GlobalSavesButton from './GlobalSavesButton';
import AnimatedCard from './AnimatedCard';
import './App.css';

// --- Constantes et Fonctions Utilitaires ---

const CARD_COVER_IMAGE = '/images/cards/oracle/tea_leaf/card_cover/tea-leaf-cover.png';
const LOCAL_STORAGE_KEY = 'oracle_card_saves';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./assets/images/cards/oracle/tea_leaf/card_illustration', false, /\.(png|jpe?g|svg|jpg)$/));


// --- Composant Principal de l'Application ---

function App() {
  // --- ÉTATS DE L'APPLICATION ---

  // Données de base des cartes
  const [allPossibleCards, setAllPossibleCards] = useState([]);
  const [cardsOnGrid, setCardsOnGrid] = useState([]);
  
  // États pour le mode de tirage STANDARD
  const [standardSelectedCards, setStandardSelectedCards] = useState([]);
  const [savedSessions, setSavedSessions] = useState([]);

  // États pour le MODE MOIS
  const [isMonthMode, setIsMonthMode] = useState(false);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [monthCardAssignments, setMonthCardAssignments] = useState({});
  const [nextMonthIndex, setNextMonthIndex] = useState(0);

  // États pour l'interface (Modales, Panneaux, Animations)
  const [enlargedCard, setEnlargedCard] = useState(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);
  const [cardsForSlider, setCardsForSlider] = useState([]);
  const [isSavesPanelOpen, setIsSavesPanelOpen] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(null);


  // --- EFFETS (useEffect Hooks) ---

  // Initialisation des cartes au chargement
  useEffect(() => {
    const loadedCards = images.map((imagePath, index) => {
      const nameWithExtension = imagePath.split('/').pop();
      const name = nameWithExtension.split('.')[0];
      return { id: index + 1, name, contentImage: imagePath, coverImage: CARD_COVER_IMAGE };
    });
    setAllPossibleCards(loadedCards);
    setCardsOnGrid(shuffleArray(loadedCards));
  }, []);

  // Gestion de la persistance des sauvegardes
  useEffect(() => {
    try {
      const storedSaves = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSaves) setSavedSessions(JSON.parse(storedSaves));
    } catch (error) { console.error("Erreur chargement:", error); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedSessions));
    } catch (error) { console.error("Erreur sauvegarde:", error); }
  }, [savedSessions]);


  // --- GESTIONNAIRES D'ÉVÉNEMENTS (Handlers) ---

  const handleToggleMonthMode = (activated) => {
    setCardsOnGrid(prevCards => shuffleArray(prevCards));
    setIsMonthMode(activated);
    if (activated) {
      setStandardSelectedCards([]);
      setIsMonthSelectorOpen(true);
    } else {
      setSelectedMonths([]);
      setMonthCardAssignments({});
      setNextMonthIndex(0);
    }
  };

  const handleMonthSelectionConfirm = (months) => {
    setSelectedMonths(months);
    const initialAssignments = {};
    months.forEach(month => { initialAssignments[month] = []; });
    setMonthCardAssignments(initialAssignments);
    setIsMonthSelectorOpen(false);
    setNextMonthIndex(0);
  };

  const handleCardSelect = (cardId) => {
    const cardToAdd = allPossibleCards.find(card => card.id === cardId);
    if (!cardToAdd) return;

    if (isMonthMode) {
      if (selectedMonths.length === 0) return;
      const isAlreadyAssigned = Object.values(monthCardAssignments).flat().some(card => card.id === cardId);
      if (isAlreadyAssigned) return;

      const currentMonth = selectedMonths[nextMonthIndex];
      setMonthCardAssignments(prev => ({ ...prev, [currentMonth]: [...prev[currentMonth], cardToAdd] }));
      setNextMonthIndex(prevIndex => (prevIndex + 1) % selectedMonths.length);
    } else {
      if (!standardSelectedCards.find(card => card.id === cardId)) {
        setStandardSelectedCards(prev => [...prev, cardToAdd]);
      }
    }
  };

  const handleCardAnimation = (cardData) => {
    setAnimatingCard(cardData);
  };

  const handleMonthModeReset = () => {
    setCardsOnGrid(prevCards => shuffleArray(prevCards));
    const initialAssignments = {};
    selectedMonths.forEach(month => { initialAssignments[month] = []; });
    setMonthCardAssignments(initialAssignments);
    setNextMonthIndex(0);
  };

  const handleMonthModeSave = () => {
    const sessionName = prompt("Entrez un nom pour ce tirage mensuel :");
    if (sessionName === null || sessionName.trim() === "") return;
    const newSession = {
      id: Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      name: sessionName,
      isMonthModeSave: true,
      months: selectedMonths,
      assignments: monthCardAssignments,
    };
    setSavedSessions(prev => [newSession, ...prev]);
    alert("Tirage mensuel sauvegardé !");
  };

  const handleStandardReset = () => {
    setStandardSelectedCards([]);
    setCardsOnGrid(shuffleArray(cardsOnGrid));
  };

  const handleStandardSave = () => {
    if (standardSelectedCards.length === 0) return alert("Sélection vide.");
    const defaultName = `Tirage du ${new Date().toLocaleDateString('fr-FR')}`;
    const sessionName = prompt("Entrez un nom pour ce tirage :", defaultName);
    if (sessionName === null || sessionName.trim() === "") return;
    const newSession = { id: Date.now(), date: new Date().toLocaleString('fr-FR'), name: sessionName, cards: standardSelectedCards };
    setSavedSessions(prev => [newSession, ...prev]);
    alert(`Tirage "${sessionName}" sauvegardé !`);
  };

  const handleLoadSession = (sessionId) => {
    const sessionToLoad = savedSessions.find(s => s.id === sessionId);
    if (!sessionToLoad) return;

    if (sessionToLoad.isMonthModeSave) {
      setIsMonthMode(true);
      setSelectedMonths(sessionToLoad.months);
      setMonthCardAssignments(sessionToLoad.assignments);
      setStandardSelectedCards([]);
      setNextMonthIndex(0);
    } else {
      setIsMonthMode(false);
      setStandardSelectedCards(sessionToLoad.cards);
      setSelectedMonths([]);
      setMonthCardAssignments({});
      setNextMonthIndex(0);
    }
    setIsSavesPanelOpen(false);
  };
  
  const handleDeleteSession = (sessionId) => {
    if (window.confirm("Supprimer ce tirage ?")) {
      setSavedSessions(prev => prev.filter(s => s.id !== sessionId));
    }
  };

  const handleOpenSlider = (cardsToShow, startIndex = 0) => {
    if (cardsToShow && cardsToShow.length > 0) {
      setCardsForSlider(cardsToShow);
      setSliderStartIndex(startIndex);
      setIsSliderOpen(true);
    }
  };

  const displayedSelectedIds = isMonthMode
    ? Object.values(monthCardAssignments).flat().map(c => c.id)
    : standardSelectedCards.map(c => c.id);

    
  // --- RENDU JSX ---
  return (
    <div className="App">
      <GlobalSavesButton onOpenSaves={() => setIsSavesPanelOpen(true)} />

      {isMonthMode && selectedMonths.length > 0 && (
        <MonthModePanel 
          months={selectedMonths}
          assignments={monthCardAssignments}
          onReset={handleMonthModeReset}
          onSave={handleMonthModeSave}
          onViewMonth={handleOpenSlider}
        />
      )}

      <main className="main-content">
        <h1>Mon Tirage de Cartes</h1>
        <p>Cliquez sur une carte pour la révéler, puis sauvegardez votre tirage.</p>
        <MonthModeToggle 
          isChecked={isMonthMode} 
          onChange={handleToggleMonthMode} 
        />
        <div className="card-grid">
          {cardsOnGrid.map(card => (
            <Card 
              key={card.id} 
              {...card} 
              isFlipped={displayedSelectedIds.includes(card.id)} 
              onFlip={handleCardSelect}
              onAnimate={handleCardAnimation}
              isHidden={animatingCard?.id === card.id}
            />
          ))}
        </div>
      </main>

      <MonthSelectorModal
        isOpen={isMonthSelectorOpen}
        onClose={() => setIsMonthSelectorOpen(false)}
        onConfirm={handleMonthSelectionConfirm}
      />
      
      {!isMonthMode && (
        <SelectionBar 
          selectedCards={standardSelectedCards}
          onCardClick={setEnlargedCard}
          onOpenSlider={() => handleOpenSlider(standardSelectedCards, 0)}
          onSave={handleStandardSave}
          onReset={handleStandardReset}
        />
      )}
      
      <SavesPanel
        isOpen={isSavesPanelOpen}
        sessions={savedSessions}
        onClose={() => setIsSavesPanelOpen(false)}
        onLoad={handleLoadSession}
        onDelete={handleDeleteSession}
        onViewSession={handleOpenSlider}
      />

      {enlargedCard && <CardDetailModal card={enlargedCard} onClose={() => setEnlargedCard(null)} />}
      
      {isSliderOpen && (
        <SliderModal 
          cards={cardsForSlider} 
          startIndex={sliderStartIndex} 
          onClose={() => setIsSliderOpen(false)} 
        />
      )}

      {animatingCard && (
        <AnimatedCard 
          key={animatingCard.timestamp} 
          cardData={animatingCard}
          onAnimationEnd={() => setAnimatingCard(null)}
        />
      )}
    </div>
  );
}

export default App;