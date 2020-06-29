import View from './modules/view/SavannahGameView.js';
import Model from './modules/model/SavannahGameModel.js';
import Controller from './modules/controller/SavannahGameController.js';

class SavannahGame {
  constructor(selector, locationHash) {
    this.game = new Controller(new Model(locationHash), new View(selector));
  }

  init() {
    this.game.init();
  }

  onGameClose(func) {
    this.game.onGameClose(func);
  }
}

export default SavannahGame;
