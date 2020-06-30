const defaultGameRounds = 10;
const defaultDifficulty = 1;
const defaultSettingsRound = 1;

class SavannahGameModel {
  constructor(locationHash, learnedWords) {
    this.locationHash = locationHash;
    this.settings = {
      learnedWords,
      isLearnedWordsEnough: learnedWords > defaultGameRounds,
      useLearnedWords: learnedWords > defaultGameRounds,
      difficulty: defaultDifficulty,
      round: defaultSettingsRound,
    }

    this.currentPageObservers = [];
    this.modalWindowObservers = [];
    this.isGameOpenObservers = [];
    this.currentLivesObservers = [];
    this.currentRoundObservers = [];
    this.currentRoundWordsObservers = [];
    this.volumeObservers = [];
    this.gameResultObservers = [];
    this.statistics = {
      guessedWords: [],
      notGuessedWords: [],
    }
  }

  registerObserver(property, observer) {
    const observersPropertyName = `${property}Observers`;
    this[observersPropertyName].push(observer);
  }

  setCurrentPage(value) {
    if (this.currentPage === value) return;
    if (!value) return;
    this.currentPage = value;
    this.currentPageObservers.map((observer) =>observer(this.currentPage));
  }

  setModalWindow(value) {
    if (this.modalWindow === value) return;
    if (!value) return;
    this.modalWindow = value;
    this.modalWindowObservers.map((observer) =>observer(this.modalWindow));
  }

  setIsGameOpen(value) {
    if (this.isGameOpen === value) return;
    this.isGameOpen = value;
    this.isGameOpenObservers.map((observer) => observer(this.isGameOpen));
  }

  setGameWords(words) {
    this.gameWords = words;
    this.maxRounds = words.length;
  }

  setCurrentLives(lives = 5) {
    this.currentLives = lives;
    if (this.currentLives <= 0) this.setGameResult('loss');
    this.currentLivesObservers.map((observer) =>observer(this.currentLives));
  }

  getCurrentLives() {
    return this.currentLives;
  }

  setCurrentRoundWords() {
    if (this.gameResult) return;
    if (this.gameWords.length === 0) {
      if (this.currentLives > 0) {
        this.setGameResult('win');
      }
      return;
    }
    const [right, translate, wrongs] = this.gameWords.pop();
    this.currentRoundWords = { right, translate, wrongs };
    this.currentRoundWordsObservers.map((observer) =>observer(this.currentRoundWords));
  }

  setRound(round = 0) {
    if (this.gameResult) return;
    this.currentRound = round;
    this.currentRoundObservers.map((observer) =>observer((this.currentRound / this.maxRounds) * 100));
  }

  getRound() {
    return this.currentRound;
  }

  setVolume() {
    this.volume = this.volume === 'on' ? 'off' : 'on';
    this.volumeObservers.map((observer) => observer(this.volume));
  }

  setGameResult(value) {
    this.gameResult = value;
    this.gameResultObservers.map((observer) => observer(this.gameResult));
    this.setCurrentPage('end');
    this.setModalWindow('statistics');
  }
}

export default SavannahGameModel;
