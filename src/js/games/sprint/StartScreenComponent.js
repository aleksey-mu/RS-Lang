import GameCardComponent from "./GameCardComponent";

export default class StartScreenComponent {
  constructor(learningLevel) {
    this.learningLevel = learningLevel;
    this.root = document.createElement('div');
  }

  init() {
    this.root.className = 'cards';

    const START_SCREEN = `<div class="container">
                              <div class="card col-sm-5 col-xs-12 col-sm-offset-3 current-point" data-label="Да/нет">
                                <div class="card__container">
                                  <p class="card__body card-image">
                                    <span class="icon-bird"></span>
                                  </p>
                                  <h2 class="card__header">
                                    Это правильный перевод слова?
                                  </h2>
                                  <h4 class="card__body">
                                    Быстро отвечайте "да" или "нет". У вас есть всего 60 секунд. За серию правильных ответов получайте дополнительные баллы.
                                  </h4> 
                                  <h4 class="card__body">Бейте собственные рекорды!</h4>
                                  <div class="start-button">
                                    <button type="button" class="btn btn-primary" aria-haspopup="true" aria-expanded="false">
                                      Старт
                                    </button>
                                  </div>
                                </div>
                              </div>
                          </div>`;

    this.root.insertAdjacentHTML('beforeend', START_SCREEN);
    this.startGame();

    return this.root;
  }

  startGame() {
    this.root.querySelector('.btn-primary').onclick = () => {
      this.hideStartScreen();
      this.root.insertAdjacentElement('beforeend', new GameCardComponent(this.learningLevel).init());
    }
  }

  hideStartScreen() {
    this.root.querySelector('.container').innerHTML = '';
  }
}