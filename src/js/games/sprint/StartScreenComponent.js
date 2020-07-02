export default class StartScreenComponent {
  constructor() {
    this.root = document.createElement('div');
  }

  init() {
    this.root.className = 'start-screen-sprint';

    const CARD = `<div class="score">
                    <h3 class="center"><span class="glyphicon glyphicon-grain" aria-hidden="true"></span> Score: <span class="label label-default">200</span></h3>
                  </div>
                  <div class="container">
                      <div class="lp-countdown lp-countdown-md line col-sm-4 col-xs-12">
                        <div class="lp-countdown-block">
                          <div class="lp-countdown-counter">25</div>
                          <div class="lp-countdown-label">SECONDS</div>
                        </div>
                      </div>
                      <div class="card col-sm-5 col-xs-12" data-label="+ 20">
                        <div class="card__container">
                          <p class="card__body card-image">
                            <span class="glyphicon glyphicon glyphicon-road" aria-hidden="true"></span>
                          </p>
                          <h1 class="card__header">
                            play
                          </h1>
                          <h3 class="card__body">
                            играть
                          </h3>  
                          <div class="answer-buttons">
                            <button type="button" class="btn btn-danger" aria-haspopup="true" aria-expanded="false">
                              Неверно
                            </button>
                            <button type="button" class="btn btn-success" aria-haspopup="true" aria-expanded="false">
                              Верно
                            </button>
                          </div>
                        </div>
                      </div>
                  </div>`;

    this.root.insertAdjacentHTML('beforeend', CARD);

    return this.root;
  }
}