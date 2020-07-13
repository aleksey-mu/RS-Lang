import View from './modules/view/SavannahGameView.js';
import Model from './modules/model/SavannahGameModel.js';
import Controller from './modules/controller/SavannahGameController.js';

class SavannahGame {
  constructor(selector, locationHash, learnedWords = []) {
    this.game = new Controller(new Model(locationHash, learnedWords), new View(selector));
  }

  init() {
    this.game.init();
  }

  onGameClose(callback) {
    this.game.onGameClose(callback);
  }

  onGameEnd(callback) {
    this.game.onGameEnd(callback);
  }
}

export default SavannahGame;
