class SavannahGameModel {
  constructor() {
    this.currentPageObservers = [];
    this.modalWindowObservers = [];
    this.isGameOpenObservers = [];
    this.currentLivesObservers = [];
    this.currentRoundObservers = [];
    this.currentRoundWordsObservers = [];
  }

  registerObserver(property, observer) {
    const observersPropertyName = `${property}Observers`;
    this[observersPropertyName].push(observer);
  }

  setCurrentPage(value) {
    if (this.currentPage === value) return;
    if (!value) return;
    this.currentPage = value;
    this.currentPageObservers.map((listener) =>listener(value));
  }

  setModalWindow(value) {
    if (this.modalWindow === value) return;
    if (!value) return;
    this.modalWindow = value;
    this.modalWindowObservers.map((listener) =>listener(value));
  }

  setIsGameOpen(value) {
    if (this.modalWindow === value) return;
    this.isGameOpen = value;
    this.isGameOpenObservers.map((listener) => listener(value));
  }

  setGameWords(words) {
    this.gameWords = words;
    this.maxRounds = words.length - 1;
  }

  setCurrentLives(lives = 5) {
    this.currentLives = lives;
    this.currentLivesObservers.map((listener) =>listener(lives));
  }

  getCurrentLives() {
    return this.currentLives;
  }

  setCurrentRoundWords() {
    this.currentRoundWords = this.gameWords.pop();
    this.currentRoundWordsObservers.map((listener) =>listener(this.currentRoundWords));
  }

  setRound(round = 0) {
    this.currentRound = round;
    this.currentRoundObservers.map((listener) =>listener((this.currentRound / this.maxRounds) * 100));
    console.log(this);
  }

  getRound() {
    return this.currentRound;
  }
}

export default SavannahGameModel;
