// src/App.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import SelectionBar from './SelectionBar';
import SavesPanel from './SavesPanel';
import CardDetailModal from './CardDetailModal';
import SliderModal from './SliderModal';
import './App.css';

// --- Constantes et Fonctions Utilitaires ---

const CARD_COVER_IMAGE = '/images/cards/oracle/tea_leaf/card_cover/tea-leaf-cover.png';
const LOCAL_STORAGE_KEY = 'oracle_card_saves';

/**
 * Mélange un tableau en utilisant l'algorithme de Fisher-Yates.
 * @param {Array} array Le tableau à mélanger.
 * @returns {Array} Le tableau mélangé.
 */
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Importe dynamiquement tous les modules d'un dossier en utilisant Webpack.
 * @param {Function} r La fonction de contexte de Webpack (require.context).
 * @returns {Array} Un tableau de modules importés.
 */
function importAll(r) {
  return r.keys().map(r);
}

// On importe automatiquement toutes les images du dossier spécifié.
// Assurez-vous que le chemin est correct par rapport à l'emplacement de App.js.
const images = importAll(require.context('./assets/images/cards/oracle/tea_leaf/card_illustration', false, /\.(png|jpe?g|svg|jpg)$/));


// --- Composant Principal de l'Application ---

function App() {
  // --- États de l'application ---
  const [allPossibleCards, setAllPossibleCards] = useState([]); // Stocke la liste maîtresse de toutes les cartes
  const [cardsOnGrid, setCardsOnGrid] = useState([]); // Cartes actuellement affichées sur la grille
  const [selectedCards, setSelectedCards] = useState([]); // Cartes sélectionnées par l'utilisateur
  const [savedSessions, setSavedSessions] = useState([]); // Sessions de tirage sauvegardées
  
  // États pour l'interface utilisateur (modales, panneaux)
  const [enlargedCard, setEnlargedCard] = useState(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [sliderStartIndex, setSliderStartIndex] = useState(0);
  const [isSavesPanelOpen, setIsSavesPanelOpen] = useState(false);
  const [cardsForSlider, setCardsForSlider] = useState([]); // État dédié pour les cartes du slider


  // --- Effets de Bord (Hooks useEffect) ---

  // Effet pour charger et initialiser les cartes au premier rendu
  useEffect(() => {
    const loadedCards = images.map((imagePath, index) => {
      const nameWithExtension = imagePath.split('/').pop();
      const name = nameWithExtension.split('.')[0];
      
      return {
        id: index + 1,
        name: name,
        contentImage: imagePath,
        coverImage: CARD_COVER_IMAGE,
      };
    });
    
    setAllPossibleCards(loadedCards);
    setCardsOnGrid(shuffleArray(loadedCards));
  }, []);

  // Effet pour charger les sessions depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const storedSaves = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSaves) {
        setSavedSessions(JSON.parse(storedSaves));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des sauvegardes depuis le localStorage:", error);
    }
  }, []);

  // Effet pour sauvegarder les sessions dans le localStorage à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedSessions));
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des sauvegardes dans le localStorage:", error);
    }
  }, [savedSessions]);


  // --- Fonctions de Gestion des Actions ---

  /** Gère la sélection d'une nouvelle carte depuis la grille. */
  const handleCardSelect = (cardId) => {
    if (!selectedCards.find(card => card.id === cardId)) {
      const cardToAdd = allPossibleCards.find(card => card.id === cardId);
      if (cardToAdd) {
        setSelectedCards([...selectedCards, cardToAdd]);
      }
    }
  };
  
  /** Réinitialise la sélection actuelle et mélange à nouveau la grille de cartes. */
  const handleReset = () => {
    setSelectedCards([]);
    setCardsOnGrid(shuffleArray(cardsOnGrid));
  };

  /** Sauvegarde la session de tirage actuelle après avoir demandé un nom. */
  const handleSaveSession = () => {
    if (selectedCards.length === 0) {
      alert("Vous ne pouvez pas sauvegarder un tirage vide.");
      return;
    }
    const defaultName = `Tirage du ${new Date().toLocaleDateString('fr-FR')}`;
    const sessionName = prompt("Entrez un nom pour ce tirage :", defaultName);

    if (sessionName === null || sessionName.trim() === "") {
      alert("Sauvegarde annulée.");
      return;
    }

    const newSession = {
      id: Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      name: sessionName,
      cards: selectedCards,
    };
    setSavedSessions([newSession, ...savedSessions]);
    alert(`Tirage "${sessionName}" sauvegardé !`);
  };

  /** Charge une session de tirage depuis la liste des sauvegardes. */
  const handleLoadSession = (sessionId) => {
    const sessionToLoad = savedSessions.find(s => s.id === sessionId);
    if (sessionToLoad) {
      setSelectedCards(sessionToLoad.cards);
      setIsSavesPanelOpen(false);
    }
  };
  
  /** Supprime une session de tirage sauvegardée. */
  const handleDeleteSession = (sessionId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce tirage ?")) {
      setSavedSessions(savedSessions.filter(s => s.id !== sessionId));
    }
  };

  /** Ouvre le slider avec un jeu de cartes spécifique. */
  const handleOpenSlider = (cardsToShow, startIndex = 0) => {
    if (cardsToShow && cardsToShow.length > 0) {
      setCardsForSlider(cardsToShow);
      setSliderStartIndex(startIndex);
      setIsSliderOpen(true);
    }
  };

  // Calcule les IDs des cartes sélectionnées pour déterminer lesquelles retourner
  const selectedIds = selectedCards.map(card => card.id);


  // --- Rendu du Composant ---

  return (
    <div className="App">
      
      <main className="main-content">
        <h1>Mon Tirage de Cartes</h1>
        <p>Cliquez sur une carte pour la révéler, puis sauvegardez votre tirage.</p>
        <div className="card-grid">
          {cardsOnGrid.map(card => (
            <Card 
              key={card.id} 
              {...card} 
              isFlipped={selectedIds.includes(card.id)} 
              onFlip={handleCardSelect} 
            />
          ))}
        </div>
      </main>

      <SelectionBar 
        selectedCards={selectedCards}
        onCardClick={setEnlargedCard}
        onOpenSlider={() => handleOpenSlider(selectedCards, 0)}
        onSave={handleSaveSession}
        onOpenSaves={() => setIsSavesPanelOpen(true)}
        onReset={handleReset}
      />
      
      <SavesPanel
        isOpen={isSavesPanelOpen}
        sessions={savedSessions}
        onClose={() => setIsSavesPanelOpen(false)}
        onLoad={handleLoadSession}
        onDelete={handleDeleteSession}
        onViewSession={(cards) => handleOpenSlider(cards, 0)}
      />

      {enlargedCard && <CardDetailModal card={enlargedCard} onClose={() => setEnlargedCard(null)} />}
      
      {isSliderOpen && (
        <SliderModal 
          cards={cardsForSlider} 
          startIndex={sliderStartIndex} 
          onClose={() => setIsSliderOpen(false)} 
        />
      )}

    </div>
  );
}

export default App;