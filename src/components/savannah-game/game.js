import View from './modules/view/SavannahGameView.js';
import Model from './modules/model/SavannahGameModel.js';
import Controller from './modules/controller/SavannahGameController.js';

class SavannahGame {
  constructor(selector) {
    this.game = new Controller(new Model(), new View(selector));
  }

  init() {
    this.game.init();
  }
}

export default SavannahGame;
