// Exemple pour les mois (à adapter avec vos vrais noms de fichiers)
import janvierImg from './assets/images/cards/oracle/tea_leaf/card_illustration/january.jpg';
import februaryImg from './assets/images/cards/oracle/tea_leaf/card_illustration/february.jpg';
import marchImg from './assets/images/cards/oracle/tea_leaf/card_illustration/march.jpg';
import aprilImg from './assets/images/cards/oracle/tea_leaf/card_illustration/april.jpg';
import mayImg from './assets/images/cards/oracle/tea_leaf/card_illustration/may.jpg';
import juneImg from './assets/images/cards/oracle/tea_leaf/card_illustration/june.jpg';
import julyImg from './assets/images/cards/oracle/tea_leaf/card_illustration/july.jpg';
import augustImg from './assets/images/cards/oracle/tea_leaf/card_illustration/august.jpg';
import septemberImg from './assets/images/cards/oracle/tea_leaf/card_illustration/september.jpg';
import octoberImg from './assets/images/cards/oracle/tea_leaf/card_illustration/october.jpg';
import novemberImg from './assets/images/cards/oracle/tea_leaf/card_illustration/november.jpg';
import decemberImg from './assets/images/cards/oracle/tea_leaf/card_illustration/december.jpg';

// Exemple pour les sujets (à adapter avec vos vrais noms de fichiers)
import careerImg from './assets/images/cards/oracle/tea_leaf/card_illustration/career.jpg';
import marriageImg from './assets/images/cards/oracle/tea_leaf/card_illustration/marriage.jpg';
import happinessImg from './assets/images/cards/oracle/tea_leaf/card_illustration/happiness.jpg';
import loveImg from './assets/images/cards/oracle/tea_leaf/card_illustration/love.jpg';
import successImg from './assets/images/cards/oracle/tea_leaf/card_illustration/success.jpg';
import wealthImg from './assets/images/cards/oracle/tea_leaf/card_illustration/wealth.jpg';


const placeholderImages = [janvierImg, februaryImg, marchImg, aprilImg, mayImg, juneImg, julyImg, augustImg, septemberImg, octoberImg, novemberImg, decemberImg, careerImg, marriageImg, happinessImg, loveImg, successImg, wealthImg];


const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const subjectNames = ["Career", "Marriage", "Happiness", "Love", "Success", "Wealth"];

let cardIdCounter = 1;

// --- Jeu de cartes des MOIS ---
export const monthCards = monthNames.map((name, index) => ({
  id: cardIdCounter++,
  name: name,
  // Remplacer `placeholderImages[index]` par votre variable importée, ex: `janvierImg`
  contentImage: placeholderImages[index] 
}));

// --- Jeu de cartes des SUJETS ---
export const subjectCards = subjectNames.map((name, index) => ({
  id: cardIdCounter++,
  name: name,
  // Remplacer `placeholderImages[index]` par votre variable importée, ex: `careerImg`
  contentImage: placeholderImages[index]
}));