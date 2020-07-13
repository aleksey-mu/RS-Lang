const defaultGameRounds = 10;
const defaultFakeWordsInRound = 3;
const defaultDifficulty = 0;
const defaultSettingsRound = 0;
const defaultMaxRound = 20;
const maxApiWordsPage = 5;
const maxApiWordsGroup = 29;
const apiWordsInGroup = 20;

const getRandomNumbers = (min, max, exceptions = [], count = 1) => {
  const result = []; 
  while (result.length < count) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!exceptions.some((e) => e === number)) {
      result.push(number); 
      exceptions.push(number);
    }
  }
  return result;
};

const getWordsFromApi = (page, group) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${group}&group=${page}`;
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then((data) => data.map((wordData) => {
    const { id, word, wordTranslate } = wordData;
    return { id, word, wordTranslate };
  }));
};

const getRandomFakeWords = (maxRound, difficulty = getRandomNumbers(0, maxApiWordsPage)[0], settingsRound = getRandomNumbers(0, maxApiWordsGroup)[0]) => {
  const requestsCount = Math.ceil(maxRound * defaultFakeWordsInRound / apiWordsInGroup);
  const randomGroups = getRandomNumbers(0, maxApiWordsGroup, [settingsRound], requestsCount);

  const requests = new Array(requestsCount).fill('')
    .map(() => {
      const group = randomGroups.pop();
      return getWordsFromApi(difficulty, group);
    });

  return Promise.all(requests)
    .then((data) => data.reduce((acc, el) => [...el, ...acc], []))
    .then((words) => words.reduce((acc, word) => {
      const lastElement = acc[acc.length - 1];
      if (acc.length >= maxRound && lastElement.length >= defaultFakeWordsInRound) return acc;
      if (lastElement.length < defaultFakeWordsInRound) lastElement.push(word);
      else acc.push([word]);
      return acc;
    }, [[]]));
};

const getGameLearnedWords = (learnedWords, maxRound) => {
  return getRandomFakeWords(maxRound)
    .then((words) => words.map((fakeWords, index) => {
      const { word, wordTranslate, id } = learnedWords[index];
      return [word, wordTranslate, fakeWords, id];
    }, []));
};

const getGameWordsByDifficultyAndRound = (settingsDifficulty, settingsRound, maxRound) => {
  const rightWords = getWordsFromApi(settingsDifficulty, settingsRound);
  const wrongWords = getRandomFakeWords(maxRound, settingsDifficulty, settingsRound);
  return Promise.all([rightWords, wrongWords]).then((data) => {
    const [right, wrong] = data;
    return right.map(({ word, wordTranslate, id }, index) => [word, wordTranslate, wrong[index], id]);
  });
};

class SavannahGameModel {
  constructor(locationHash, learnedWords) {
    this.locationHash = locationHash;
    this.settings = {
      learnedWords: learnedWords.slice(0, defaultMaxRound),
      isLearnedWordsEnough: learnedWords.length > defaultGameRounds,
      useLearnedWords: learnedWords.length > defaultGameRounds,
      difficulty: defaultDifficulty,
      round: defaultSettingsRound,
    }

    this.currentPageObservers = [];
    this.modalWindowObservers = [];
    this.isGameOpenObservers = [];
    this.currentLivesObservers = [];
    this.currentRoundObservers = [];
    this.currentRoundWordsObservers = [];
    this.lastAnswerStatusObservers = [];
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

  setGameWords() {
    return new Promise((resolve, reject) => {
      if (this.settings.useLearnedWords) {
        if (this.settings.learnedWords.length < defaultGameRounds) {
          reject(new Error('not enough words'));
        }
        this.maxRounds = this.settings.learnedWords.length;
        getGameLearnedWords(this.settings.learnedWords, this.maxRounds).then((words) => {
          this.gameWords = words;
          resolve(this.gameWords);
        }).catch((e) => {
          reject(e);
        });
      } else {
        this.maxRounds = apiWordsInGroup;
        getGameWordsByDifficultyAndRound(this.settings.difficulty, this.settings.round, this.maxRounds)
          .then((words) => {
            this.gameWords = words;
            resolve(this.gameWords);
          }).catch((e) => {
            reject(e);
          });
      }
    });
  }

  setCurrentLives(lives = 5) {
    this.currentLives = lives;
    if (this.currentLives <= 0) this.setGameResult('loss');
    this.currentLivesObservers.map((observer) =>observer(this.currentLives));
  }

  getCurrentLives() {
    return this.currentLives;
  }

  setLastAnswerStatus(value) {
    this.lastAnswerStatus = value;
    this.lastAnswerStatusObservers.map((observer) => observer(this.lastAnswerStatus, this.volume));
  }

  setCurrentRoundWords() {
    if (this.gameResult) return;
    if (this.gameWords.length === 0) {
      if (this.currentLives > 0) {
        this.setGameResult('win');
      }
      return;
    }
    const [right, translate, wrongs, id] = this.gameWords.pop();
    this.currentRoundWords = { right, translate, wrongs , id};
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
    this.gameResultObservers.map((observer) => observer(this.gameResult, this.volume));
    this.setCurrentPage('end');
    this.setModalWindow('statistics');
  }
}

export default SavannahGameModel;
