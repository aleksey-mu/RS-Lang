const defaultTimeout = 10000;
// const defaultAfterAnswerDelay = 1000;

class SavannahGameController {
  constructor(model, view) {
    this.model = model
    this.view = view;

    this.model.registerObserver('currentPage', this.view.getRenderPage(
      this.getToCountdown(),
      this.getQuitButtonHandler(),
      this.getCountdownEndHandler(),
      this.getSettingsButtonHandler(),
    ));
    this.model.registerObserver('modalWindow', this.view.getRenderModalWindow(
      this.getQuitButtonModalWindowHandler(),
      this.getCloseGameButtonHandler(),
      this.getSaveSettingsButtonHandler(),
      this.model.statistics,
      this.model.gameResult,
    ));
    this.model.registerObserver('isGameOpen', this.view.getCloseGame());
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
  }

  getToCountdown() {
    return () => {
      this.model.setCurrentPage('countdown');
      this.model.setGameWords([
        ['right', 'translate1', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate2', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate3', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate4', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate5', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate6', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate7', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate8', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate9', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate10', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate11', ['wrong', 'wrong', 'wrong']],
        ['right', 'translate12', ['wrong', 'wrong', 'wrong']],
      ]);
    }
  }

  getQuitButtonHandler() {
    return () => {
      this.model.setModalWindow('close alert');
    }
  }

  getCountdownEndHandler() {
    return () => {
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
    }
  }

  getSaveSettingsButtonHandler() {
    return () => {
      this.model.settings = '';
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
      this.model.statistics.guessedWords.push(this.model.currentRoundWords.translate);
      this.model.setRound(this.model.getRound() + 1);
      this.model.setCurrentRoundWords();
    }
  }

  getWrongAnswerHandler() {
    return () => {
      clearTimeout(this.answerTimeout);
      this.model.statistics.notGuessedWords.push(this.model.currentRoundWords.translate);
      this.model.setCurrentLives(this.model.getCurrentLives() - 1);
      this.model.setRound(this.model.getRound() + 1);
      this.model.setCurrentRoundWords();
    }
  }

  getMusicButtonHandler() {
    return () => {
      this.model.setVolume();
    }
  }
}

export default SavannahGameController;
