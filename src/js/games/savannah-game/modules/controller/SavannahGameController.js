const defaultTimeout = 10000;
const defaultAfterAnswerDelay = 1000;

class SavannahGameController {
  constructor(model, view) {
    this.model = model
    this.view = view;

    this.closeGameButtonListeners = [];
    this.keyboardEvents = [];

    this.makeKeyboardListener('1');
    this.makeKeyboardListener('2');
    this.makeKeyboardListener('3');
    this.makeKeyboardListener('4');

    this.model.registerObserver('currentPage', this.view.getRenderPage(
      this.getToLoading(),
      this.getQuitButtonHandler(),
      this.getCountdownEndHandler(),
      this.getSettingsButtonHandler(),
      this.getLocationHashChecker(),
    ));
    this.model.registerObserver('modalWindow', this.view.getRenderModalWindow(
      this.getQuitButtonModalWindowHandler(),
      this.getCloseGameButtonHandler(),
      () => {},
      this.getSettingsCheckboxOnchange(),
      this.getSettingsDifficultyOnchande(),
      this.getSettingsRoundOnchange(),
      this.model.statistics,
      this.model.settings,
      this.model.gameResult,
    ));
    this.model.registerObserver('isGameOpen', this.view.getCloseGame(this.getLocationHashChecker()));
    this.model.registerObserver('isGameOpen', () => clearTimeout(this.answerTimeout));
    this.model.registerObserver('isGameOpen', this.view.getRemoveKeyboardControl(...this.keyboardEvents));
    this.model.registerObserver('currentLives', this.view.getRenderHealthBar());
    this.model.registerObserver('currentRound', this.view.getRenderStatusBar());
    this.model.registerObserver('currentRound', this.view.getRenderBackground());
    this.model.registerObserver('currentRound', this.getAnswerTimeoutHandler());
    this.model.registerObserver('currentRoundWords', this.view.getRenderWords(
      this.getRightAnswerHandler(),
      this.getWrongAnswerHandler(),
    ));
    this.model.registerObserver('volume', this.view.getRenderMusicButton(this.getMusicButtonHandler()));
    this.model.registerObserver('gameResult', () => clearTimeout(this.answerTimeout));
    this.model.registerObserver('gameResult', this.view.getPlayGameResultStatus());
    this.model.registerObserver('lastAnswerStatus', this.view.getPlayAnswerStatus());
    this.model.registerObserver('lastAnswerStatus', this.view.getRemoveDropElement());
    this.model.registerObserver('lastAnswerStatus', this.view.getAddAnimationToGem());
    this.model.registerObserver('currentRoundWords', this.view.getAddKeyboardControl(...this.keyboardEvents));
    this.model.registerObserver('lastAnswerStatus', this.view.getRemoveKeyboardControl(...this.keyboardEvents));
    this.model.registerObserver('lastAnswerStatus', this.view.getHighlightCorrectAnswer());
  }

  getToCountdown() {
    return () => {
      this.model.setCurrentPage('countdown');
    }
  }

  getToLoading() {
    return () => {
      this.model.setCurrentPage('loading');
      this.model.setGameWords().then(() => {
        this.model.setCurrentPage('countdown');
      });
    }
  }

  getQuitButtonHandler() {
    return () => {
      this.model.setModalWindow('close alert');
    }
  }

  makeKeyboardListener(digit) {
    const keyboardListener = (event) => {
      if (event.code === `Digit${digit}`) {
        const word = this.view.mainContainer.querySelector(`div[data-order="${digit}"]`);
        if (word.dataset.answer === 'correct') this.getRightAnswerHandler()();
        else this.getWrongAnswerHandler()();
      }
    };

    this.keyboardEvents.push(keyboardListener);
  }

  getCountdownEndHandler() {
    return () => {
      if (this.model.isGameOpen === false) return;
      this.model.setCurrentPage('round');
      this.model.setCurrentLives();
      this.model.setCurrentRoundWords();
      this.model.setRound();
      this.model.setVolume();
    }
  }

  getSettingsButtonHandler() {
    return () => {
      this.model.setModalWindow('settings');
    }
  }

  getQuitButtonModalWindowHandler() {
    return () => {
      this.model.setModalWindow('close');
    }
  }

  getCloseGameButtonHandler() {
    return () => {
      this.model.setIsGameOpen(false);
      this.closeGameButtonListeners.map((h) => h());
    }
  }

  getAnswerTimeoutHandler() {
    return () => {
      this.answerTimeout = setTimeout(() => {
        this.getWrongAnswerHandler()();
      }, defaultTimeout);
    }
  }

  getRightAnswerHandler() {
    return () => {
      clearTimeout(this.answerTimeout);
      this.model.statistics.guessedWords.push(this.model.currentRoundWords.wordObject);
      this.model.setRound(this.model.getRound() + 1);
      this.model.setLastAnswerStatus('right');
      setTimeout(() => {
        this.model.setCurrentRoundWords();
      }, defaultAfterAnswerDelay);
    }
  }

  getWrongAnswerHandler() {
    return () => {
      clearTimeout(this.answerTimeout);
      this.model.statistics.notGuessedWords.push(this.model.currentRoundWords.wordObject);
      this.model.setCurrentLives(this.model.getCurrentLives() - 1);
      this.model.setRound(this.model.getRound() + 1);
      this.model.setLastAnswerStatus('wrong');
      setTimeout(() => {
        this.model.setCurrentRoundWords();
      }, defaultAfterAnswerDelay);
    }
  }

  getMusicButtonHandler() {
    return () => {
      this.model.setVolume();
    }
  }

  getLocationHashChecker() {
    return () => {
      if (window.location.hash !== this.model.locationHash) {
        this.model.setIsGameOpen(false);
      }
    }
  }

  getSettingsCheckboxOnchange() {
    return (event) => {
      this.model.settings.useLearnedWords = event.target.checked;
    }
  }

  getSettingsDifficultyOnchande() {
    return (event) => {
      const options = [...event.target.childNodes];
      const value = parseInt(options[event.target.selectedIndex].value, 10) - 1;
      this.model.settings.difficulty = value;
    }
  }

  getSettingsRoundOnchange() {
    return (event) => {
      const options = [...event.target.childNodes];
      const value = parseInt(options[event.target.selectedIndex].value, 10) - 1;
      this.model.settings.round = value;
    }
  }

  init() {
    this.model.setCurrentPage('start');
  }

  onGameClose(func) {
    this.closeGameButtonListeners.push(func);
  }

  onGameEnd(func) {
    this.model.registerObserver('gameResult', () => {
      func(this.model.statistics);
    });
  }
}

export default SavannahGameController;
