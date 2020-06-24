class SavannahGameController {
  constructor(model, view) {
    this.model = model
    this.view = view;

    this.model.registerObserver('currentPage', this.view.getRenderPage(
      this.getToCountdown(),
      this.getQuitButtonHandler(),
      () => {console.log('music')},
      this.getCountdownEndHandler(),
      this.getSettingsButtonHandler(),
    ));
    this.model.registerObserver('modalWindow', this.view.getRenderModalWindow(
      this.getQuitButtonModalWindowHandler(),
      this.getCloseGameButtonHandler(),
      this.getSaveSettingsButtonHandler(),
    ));
    this.model.registerObserver('isGameOpen', this.view.getCloseGame());
    this.model.registerObserver('currentLives', this.view.getRenderHealthBar());
    this.model.registerObserver('currentRound', this.view.getRenderStatusBar());
    this.model.registerObserver('currentRound', this.view.getRenderBackground());
    this.model.registerObserver('currentRoundWords', this.view.getRenderWords(
      this.getRightAnswerHandler(),
      this.getWrongAnswerHandler(),
    ));
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

  getRightAnswerHandler() {
    return () => {
      this.model.setCurrentRoundWords();
      this.model.setRound(this.model.getRound() + 1);
    }
  }

  getWrongAnswerHandler() {
    return () => {
      this.model.setCurrentLives(this.model.getCurrentLives() - 1);
      this.model.setCurrentRoundWords();
      this.model.setRound(this.model.getRound() + 1);
    }
  }
}

export default SavannahGameController;
