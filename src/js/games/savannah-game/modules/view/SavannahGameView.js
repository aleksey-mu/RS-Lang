import SavannahGameHeader from './view-modules/SavannahGameHeader.js';
import SavannahGameFooter from './view-modules/SavannahGameFooter.js';
import SavannahGameMiddleContainer from './view-modules/SavannahGameWordsContainer.js';
import SavannahGameDropElement from './view-modules/SavannahGameDropElement.js';
import SavannahGameModalWindow from './view-modules/SavannahGameModalWindow.js';

const healthIconPath = '/img/games/savannah-game/health-icon.png';
const emptyHealtIconPath = '/img/games/savannah-game/health-icon.png';
const musicIconPath = '/img/games/savannah-game/music-icon.svg';
const musicOffIconPath = '/img/games/savannah-game/music-icon-off.svg';
const quitIconPath = '/img/games/savannah-game/quit-icon.svg';
const audioCorrectPath = '/audio/savannah-correct-answer.mp3';
const audioWrongPath = '/audio/savannah-wrong-answer.mp3';
const audioGongPath = '/audio/savannah-start.mp3';
const audioWinPath = '/audio/savannah-win.wav';
const audioLosePath = '/audio/savannah-lose.wav';

class SavannahGameView {
  constructor(selector) {
    this.mainContainer = document.querySelector(selector);
    [...this.mainContainer.childNodes].map((node) => node.remove());
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('savannah-game');
    this.mainContainer.appendChild(this.gameContainer);
  }

  clear() {
    [...this.gameContainer.childNodes].map((node) => node.remove());
  }

  renderBackground(offset = 100) {
    this.gameContainer.setAttribute('style', `background-position-y: ${offset}%;`);
  }

  /* eslint-disable class-methods-use-this */
  getRemoveKeyboardControl(...keyboardListeners) {
    return () => {
      keyboardListeners.map((l) => document.removeEventListener('keydown', l));
    }
  }

  /* eslint-disable class-methods-use-this */
  getAddKeyboardControl(...keyboardListeners) {
    return () => {
      keyboardListeners.map((l) => document.addEventListener('keydown', l));
    }
  }

  getHighlightCorrectAnswer() {
    return () => {
      const word = this.mainContainer.querySelector('div[data-answer="correct"]');
      if (word) word.classList.add('savannah-right-answer');
    }
  }

  renderGameElements(quitButtonHandler) {
    this.clear();
    this.gameHeader = new SavannahGameHeader(5, healthIconPath, emptyHealtIconPath, musicIconPath, musicOffIconPath, quitIconPath, quitButtonHandler);
    this.gameMiddleContainer = new SavannahGameMiddleContainer();
    this.gameFooter = new SavannahGameFooter();
    this.gameDropElement = new SavannahGameDropElement();

    [this.gameDropElement, this.gameHeader, this.gameMiddleContainer, this.gameFooter]
      .map((element) => this.gameContainer.appendChild(element.render()));
  }

  renderStartPage(startButtonHandler, settingButtonHandler, quitButtonHandler) {
    this.renderBackground();
    this.renderGameElements(quitButtonHandler);

    this.gameMiddleContainer.renderStartScreen(startButtonHandler, settingButtonHandler);
    this.gameHeader.renderQuitButton();
  }

  renderCountdownPage(quitButtonHandler, onCountdownEnd) {
    this.renderBackground();
    this.renderGameElements(quitButtonHandler);
    
    this.gameMiddleContainer.renderCountdown(onCountdownEnd);
    this.gameFooter.renderKeyboardControlInfo();
    this.gameHeader.renderQuitButton();
  }

  renderRoundPage(quitButtonHandler) {
    this.renderBackground();
    this.renderGameElements(quitButtonHandler);

    this.gameHeader.renderQuitButton();
    this.gameFooter.renderGem();
  }

  renderEndPage() {
    this.gameMiddleContainer.clearContainer();
    this.gameDropElement.clearContainer();
  }

  getRenderWords(rightAnswerHandler, wrongAnswerHandler) {
    return ({ right, translate, wrongs }) => {
      this.gameMiddleContainer.renderTranslateOptions(right, wrongs, rightAnswerHandler, wrongAnswerHandler);

      this.gameDropElement.render().remove();
      this.gameDropElement = new SavannahGameDropElement();
      this.gameContainer.prepend(this.gameDropElement.render());
      this.gameDropElement.renderDropElement(translate);

      this.gameFooter.removeAnimationFromGem();
    }
  }

  getAddAnimationToGem() {
    return (value) => {
      if (value === 'right') this.gameFooter.addAnimationToGem();
    }
  }

  renderLoadingPage(quitButtonHandler) {
    this.renderBackground();
    this.renderGameElements(quitButtonHandler);
    
    this.gameMiddleContainer.renderLoading();
    this.gameFooter.renderKeyboardControlInfo();
    this.gameHeader.renderQuitButton();
  }

  getRenderBackground() {
    return (value) => {
      const newBackgoundPosition = 100 - value;
      this.gameContainer.setAttribute('style', `background-position-y: ${newBackgoundPosition}%;`);
    }
  }

  getRenderHealthBar() {
    return (value) => {
      this.gameHeader.renderHealthBar(value);
    }
  }

  getRenderStatusBar() {
    return (value) => {
      this.gameFooter.renderStatusBar(value);
    }
  }

  getRenderPage(startButtonHandler, quitButtonHandler, countdownHandler, settingButtonHandler, locationHashChecker) {
    return (value) => {
      switch (value) {
        case 'start':
          window.addEventListener('hashchange', locationHashChecker);
          this.renderStartPage(startButtonHandler, settingButtonHandler, quitButtonHandler);
          return;
        case 'countdown':
          this.playAudio(audioGongPath);
          this.renderCountdownPage(quitButtonHandler, countdownHandler);
          return;
        case 'round':
          this.renderRoundPage(quitButtonHandler);
          return;
        case 'end':
          this.renderEndPage();
          return;
        case 'loading':
          this.renderLoadingPage(quitButtonHandler);
          return;
        default:
          throw new Error('wrong page state');
      }
    }
  }

  renderModalWindow(quitModalWindowHandler) {
    this.modalWindow = new SavannahGameModalWindow(quitIconPath, quitModalWindowHandler);
    this.gameContainer.appendChild(this.modalWindow.render());
  }

  getRenderModalWindow(quitModalWindowHandler, gameCloseHandler, saveSettingsButtonHandler, settingsCheckboxHandler, settingsDifficultyHandler, settingsRoundHandler, statistics, settings, result) {
    return (value) => {
      switch (value) {
        case 'close alert':
          this.renderModalWindow(quitModalWindowHandler);
          this.modalWindow.renderGameCloseAlert(gameCloseHandler);
          this.modalWindow.show();
          return;
        case 'settings':
          this.renderModalWindow(quitModalWindowHandler);
          this.modalWindow.renderSettings(saveSettingsButtonHandler, settingsCheckboxHandler, settingsDifficultyHandler, settingsRoundHandler, settings);
          this.modalWindow.show();
          return;
        case 'statistics':
          this.renderModalWindow(quitModalWindowHandler);
          this.modalWindow.renderStatistics(gameCloseHandler, statistics, result);
          this.modalWindow.show();
          return;
        case 'close':
          this.modalWindow.hide();
          this.modalWindow.render().remove();
          return;
        default:
          throw new Error('wrong modal window state');
      }
    }
  }

  getRemoveDropElement() {
    return () => {
      this.gameDropElement.render().remove();
    }
  }

  getCloseGame(locationHashChecker) {
    return (value) => {
      if (value) return;
      this.clear();
      this.gameContainer.remove();
      window.removeEventListener('hashchange', locationHashChecker);
    }
  }

  playAudio(src) {
    this.audio = new Audio(src);
    this.audio.volume = 0.2;
    this.audio.play();
  }

  getPlayGameResultStatus() {
    const playMapping = {
      'win': () => this.playAudio(audioWinPath),
      'loss': () => this.playAudio(audioLosePath),
    }

    return (gameResult, musicStatus) => {
      switch (musicStatus) {
        case 'on':
          playMapping[gameResult]();
          return;
        case 'off':
          return;
        default:
          throw new Error('wrong music status');
      }
    }
  }

  getPlayAnswerStatus() {
    const playMapping = {
      'right': () => this.playAudio(audioCorrectPath),
      'wrong': () => this.playAudio(audioWrongPath),
    }

    return (value, musicStatus) => {
      switch (musicStatus) {
        case 'on':
          playMapping[value]();
          return;
        case 'off':
          return;
        default:
          throw new Error('wrong music status');
      }
    }
  }
  
  getRenderMusicButton(musicButtonHandler) {
    return (value) => {
      this.gameHeader.renderMusicButton(value, musicButtonHandler);
    }
  }
}

export default SavannahGameView;
