import Helper from "./Helper";
import * as ICONS from './Icons.json';
import FinishScreenComponent from "./FinishScreenComponent";

export default class StartScreenComponent {
  constructor() {
    this.root = document.createElement('div');
    this.timeLeft = 3;
  }

  init() {
    this.root.className = 'start-screen-sprint';

    const CARD = `<div class="score">
                    <h3 class="center"><span class="glyphicon glyphicon-grain" aria-hidden="true"></span> Score: <span class="label label-default label-score">0</span></h3>
                  </div>
                  <div class="container">
                      <div class="lp-countdown lp-countdown-md line col-sm-4 col-xs-12">
                        <div class="lp-countdown-block">
                          <div class="lp-countdown-counter">3</div>
                          <div class="lp-countdown-label">SECONDS</div>
                        </div>
                      </div>
                      <div class="card col-sm-5 col-xs-12 current-point" data-label="0">
                        <div class="card__container">
                          <p class="card__body card-image">
                            <span class="icon-bird" aria-hidden="true"></span>
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
    this.fetchWord(0, 0);

    this.changeCard();
    this.startTimer();

    return this.root;
  }

  async fetchWord(orderWord, orderTranslate) {
    const URL = `https://afternoon-falls-25894.herokuapp.com/words?page=1&group=0`;
    await Helper.fetchPost(URL)
      .then((content) => {
        this.addWord(content, orderWord)
        this.addTranslate(content, orderTranslate)
      })
      .catch((error) => {
        throw new Error(`${error}: Problems with API`);
      });
  }

  addWord(content, order) {
    this.root.querySelector('h1.card__header').innerHTML = content[order].word;
  }

  addTranslate(content, order) {
    this.root.querySelector('h3.card__body').innerHTML = content[order].wordTranslate;
  }

  async verifyAnswer(answer) {
    const currentWord = this.root.querySelector('h1.card__header').innerHTML;
    const currentTranslate = this.root.querySelector('h3.card__body').innerHTML;
    const URL = `https://afternoon-falls-25894.herokuapp.com/words?page=1&group=0`;
    await Helper.fetchPost(URL)
      .then((content) => {
        if(content.filter((el) => el.word === currentWord)[0].wordTranslate === currentTranslate && answer === 'success') {
          console.log(`True answer! currentWord: ${currentWord}, currentTranslate: ${currentTranslate}, 
            compare with ${content.filter((el) => el.word === currentWord)[0].wordTranslate}`);
          this.root.querySelector('.card__container').classList.add('backlight-right-answer');
          setTimeout(() => {
            this.root.querySelector('.card__container').classList.remove('backlight-right-answer')
          }, 800);
          this.changeScore();
          this.addPoint();
        }
        else if(content.filter((el) => el.word === currentWord)[0].wordTranslate !== currentTranslate && answer === 'danger') {
          console.log(`True answer! currentWord: ${currentWord}, currentTranslate: ${currentTranslate}, 
            compare with ${content.filter((el) => el.word === currentWord)[0].wordTranslate}`);
          this.root.querySelector('.card__container').classList.add('backlight-right-answer');
          setTimeout(() => {
            this.root.querySelector('.card__container').classList.remove('backlight-right-answer')
          }, 800);
          this.changeScore();
          this.addPoint();
        }
        else {
          console.log(`False answer! currentWord: ${currentWord}, currentTranslate: ${currentTranslate}, 
            compare with ${content.filter((el) => el.word === currentWord)[0].wordTranslate}`);
          this.root.querySelector('.card__container').classList.add('backlight-wrong-answer');
          setTimeout(() => {
            this.root.querySelector('.card__container').classList.remove('backlight-wrong-answer')
          }, 800);
          this.changeCurrentPoint();
        }
      })
      .catch((error) => {
        throw new Error(`${error}: Problems with API`);
      });
  }

  changeScore() {
    this.root.querySelector('.label-score').innerHTML = Number(this.root.querySelector('.label-score').innerHTML) + 20;
  }

  changeCurrentPoint() {
    this.root.querySelector('.current-point').dataset.label = '❌';
  }

  addPoint() {
    this.root.querySelector('.current-point').dataset.label = '✅ + 10';
  }


  changeCard() {
    let num = 0;
      this.root.querySelector('.btn-danger').onclick = () => {
        this.verifyAnswer('danger');
        const rand = Boolean(Math.round(Math.random()));
        if(rand === true) {
          this.fetchWord(num + 1, num + 1);
          num += 1;
        }
        else {
          this.fetchWord(num + 1, num + 2);
          num += 1;
        }
        this.changeIcon();
    }
    this.root.querySelector('.btn-success').onclick = () => {
      this.verifyAnswer('success');
      const rand = Boolean(Math.round(Math.random()));
      if(rand === true) {
        this.fetchWord(num + 1, num + 1);
        num += 1;
      }
      else {
        this.fetchWord(num + 1, num + 2);
        num += 1;
      }
      this.changeIcon();
    }

    if(num > 20) {
      console.log('Finish level');
    }
  }

  changeIcon() {
    const randomIcon = ICONS.iconName[Helper.getRandomArbitrary(0, ICONS.iconName.length)];
    console.log(Helper.getRandomArbitrary(0, ICONS.iconName.length));
    this.root.querySelector('.random-icon').className = this.root.querySelector('.random-icon').className
      .replace(new RegExp('glyphicon-[a-z-]{1,}'), `glyphicon-${randomIcon}`);
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["startTimer"] }] */
  startTimer() {
   const timer = setInterval(() => {
      this.timeLeft -= 1;
    if(this.timeLeft >= 0) {
      this.root.querySelector('.lp-countdown-counter').innerHTML = this.timeLeft;
    } else {
      clearInterval(timer);
      this.gameOver();
    }
    }, 1000);
  }

  gameOver() {
    this.hideGameCards();
    this.root.insertAdjacentElement('beforeend', new FinishScreenComponent().init());
  }

  hideGameCards() {
    this.root.innerHTML = '';
  }
}