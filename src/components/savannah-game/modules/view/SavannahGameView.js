import SavannahGameHeader from './view-modules/SavannahGameHeader.js';
import SavannahGameFooter from './view-modules/SavannahGameFooter.js';
import SavannahGameMiddleContainer from './view-modules/SavannahGameWordsContainer.js';
import SavannahGameDropElement from './view-modules/SavannahGameDropElement.js';
import SavannahGameModalWindow from './view-modules/SavannahGameModalWindow.js';

const healthIconPath = '/img/savannah-game/health-icon.png';
const emptyHealtIconPath = '/img/savannah-game/health-icon.png';
const musicIconPath = '/img/savannah-game/music-icon.svg';
const musicOffIconPath = '/img/savannah-game/music-icon-off.svg';
const quitIconPath = '/img/savannah-game/quit-icon.svg';

class SavannahGameView {
  constructor(selector) {
    this.gameContainer = document.querySelector(selector);
    this.gameContainer.classList.add('savannah-game');
  }

  clear() {
    [...this.gameContainer.childNodes].map((node) => node.remove());
  }

  renderBackground(offset = 100) {
    this.gameContainer.setAttribute('style', `background-position-y: ${offset}%;`);
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
    }
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

  getRenderPage(startButtonHandler, quitButtonHandler, countdownHandler, settingButtonHandler) {
    return (value) => {
      switch (value) {
        case 'start':
          this.renderStartPage(startButtonHandler, settingButtonHandler, quitButtonHandler);
          return;
        case 'countdown':
          this.renderCountdownPage(quitButtonHandler, countdownHandler);
          return;
        case 'round':
          this.renderRoundPage(quitButtonHandler);
          return;
        case 'end':
          this.renderEndPage();
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

  getRenderModalWindow(quitModalWindowHandler, gameCloseHandler, saveSettingsButtonHandler, statistics, result) {
    console.log(statistics, result);
    return (value) => {
      switch (value) {
        case 'close alert':
          this.renderModalWindow(quitModalWindowHandler);
          this.modalWindow.renderGameCloseAlert(gameCloseHandler);
          this.modalWindow.show();
          return;
        case 'settings':
          this.renderModalWindow(quitModalWindowHandler);
          this.modalWindow.renderSettings(saveSettingsButtonHandler);
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

  getCloseGame() {
    return (value) => {
      if (value) return;
      this.clear();
      this.gameContainer.classList.remove('savannah-game');
    }
  }
  
  getRenderMusicButton(musicButtonHandler) {
    return (value) => {
      this.gameHeader.renderMusicButton(value, musicButtonHandler);
    }
  }
}

export default SavannahGameView;
