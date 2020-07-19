import Helper from "./Helper";
import FinishScreenComponent from "./FinishScreenComponent";
import handleGameResult from '../../helpers/handleGameResult';

export default class StartScreenComponent {
  constructor(learningLevel) {
    this.learningLevel = learningLevel;
    this.root = document.createElement('div');
    this.timeLeft = 60;
    this.words = [];
    this.translates = [];
    this.answers = [];
    this.score = 0;
    this.sequenceOfQuestions = [];
    this.rightAnswersCounter = 0;
    this.pointsStat = [];
    this.pageNumber = 1;
    this.stats = [];
  }

  init() {
    this.root.className = 'start-screen-sprint';

    const CARD = `<div class="score">
                    <h3 class="center"><span class="glyphicon glyphicon-grain" aria-hidden="true"></span> Score: <span class="label label-default label-score">0</span></h3>
                  </div>
                  <div class="container">
                      <div class="lp-countdown lp-countdown-md line col-sm-4 col-xs-12">
                        <div class="lp-countdown-block">
                          <div class="lp-countdown-counter">60</div>
                          <div class="lp-countdown-label">SECONDS</div>
                        </div>
                      </div>
                      <div class="card col-sm-5 col-xs-12 current-point" data-label="0">
                        <div class="card__container">
                          <p class="card__body card-image">
                            <span class="icon-bird" aria-hidden="true"></span>
                          </p>
                          <h1 class="card__header"></h1>
                          <h3 class="card__body"></h3>  
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
    this.fetchWord(0, 0, this.pageNumber);

    this.changeCard();
    this.startTimer();

    return this.root;
  }

  async fetchWord(orderWord, orderTranslate, pageNumber) {
    const URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=${this.learningLevel}`;
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

  async verifyAnswer(answer, pageNumber) {
    const currentWord = this.root.querySelector('h1.card__header').innerHTML;
    const currentTranslate = this.root.querySelector('h3.card__body').innerHTML;
    const URL = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=${this.learningLevel}`;
    await Helper.fetchPost(URL)
      .then((content) => {
        if(content.filter((el) => el.word === currentWord)[0].wordTranslate === currentTranslate && answer === 'success') {
          this.root.querySelector('.card__container').classList.add('backlight-right-answer');
          setTimeout(() => {
            this.root.querySelector('.card__container').classList.remove('backlight-right-answer')
          }, 800);
          this.rightAnswersCounter += 1;
          this.changeCurrentPoint();
          this.saveStats(currentWord, currentTranslate, true, content.filter(el => el.word === currentWord)[0].id);
        }
        else if(content.filter((el) => el.word === currentWord)[0].wordTranslate !== currentTranslate && answer === 'danger') {
          this.root.querySelector('.card__container').classList.add('backlight-right-answer');
          setTimeout(() => {
            this.root.querySelector('.card__container').classList.remove('backlight-right-answer')
          }, 800);
          this.rightAnswersCounter += 1;
          this.changeCurrentPoint();
          this.saveStats(currentWord, currentTranslate, true, content.filter(el => el.word === currentWord)[0].id);
        }
        else {
          this.root.querySelector('.card__container').classList.add('backlight-wrong-answer');
          setTimeout(() => {
            this.root.querySelector('.card__container').classList.remove('backlight-wrong-answer')
          }, 800);
          this.rightAnswersCounter = 0;
          this.changeCurrentPoint();
          this.saveStats(currentWord, currentTranslate, false, content.filter(el => el.word === currentWord)[0].id);
        }
      })
      .catch((error) => {
        throw new Error(`${error}: Problems with API`);
      });
    }

  changeScore(n) {
    this.score += n;
    this.root.querySelector('.label-score').innerHTML = this.score;
    this.pointsStat.push(n);
  }

  changeCurrentPoint() {
    if(this.rightAnswersCounter < 4 && this.rightAnswersCounter !== 0) {
      this.root.querySelector('.current-point').dataset.label = '✅ + 10';
      this.changeScore(10);
    }
    if(this.rightAnswersCounter === 4) {
      this.root.querySelector('.current-point').dataset.label = '🔥 + 50';
      this.changeScore(50);
    }
    if(this.rightAnswersCounter > 4 && this.rightAnswersCounter !== 0) {
      this.root.querySelector('.current-point').dataset.label = '✅ + 20';
      this.changeScore(20);
    }
    if(this.rightAnswersCounter === 0) {
      this.root.querySelector('.current-point').dataset.label = '❌';
      this.changeScore(0);
    }
  }

  saveStats(currentWord, currentTranslate, answer, id) {
    this.words.push(currentWord);
    this.translates.push(currentTranslate);
    this.answers.push(answer);
    this.stats.push(
      {
        wordID: id,
        isCorrectGuessed: answer
      }
    );
  }

  changeCard() {
    let num = 0;
    this.root.onkeydown = (event) => {
      switch (event.keyCode) {
        case 37: {
          this.verifyAnswer('danger', this.pageNumber);
          const rand = Boolean(Math.round(Math.random()));
          if(rand === true) {
            this.fetchWord(num + 1, num + 1, this.pageNumber);
            num += 1;
          }
          else {
            this.fetchWord(num + 1, Helper.getRandomArbitrary(0, 20), this.pageNumber);
            num += 1;
          }
          this.sequenceOfQuestions.push(false);
        }
            break;
        case 39: {
            this.verifyAnswer('success', this.pageNumber);
            const rand = Boolean(Math.round(Math.random()));
            if(rand === true) {
              this.fetchWord(num + 1, num + 1, this.pageNumber);
              num += 1;
            }
            else {
              this.fetchWord(num + 1, Helper.getRandomArbitrary(0, 20), this.pageNumber);
              num += 1;
            }
            this.sequenceOfQuestions.push(true);
          }
            break;
        default:
            console.log('nothing');
            break;
      }
      if(num === 20) {
        this.pageNumber += 1;
        this.changeCard();
      }
    }
      this.root.querySelector('.btn-danger').onclick = () => {
        this.verifyAnswer('danger', this.pageNumber);
        const rand = Boolean(Math.round(Math.random()));
        if(rand === true) {
          this.fetchWord(num + 1, num + 1, this.pageNumber);
          num += 1;
        }
        else {
          this.fetchWord(num + 1, Helper.getRandomArbitrary(0, 20), this.pageNumber);
          num += 1;
        }
        this.sequenceOfQuestions.push(false);
        if(num === 20) {
          this.pageNumber += 1;
          this.changeCard();
        }
    }
    
    this.root.querySelector('.btn-success').onclick = () => {
      this.verifyAnswer('success', this.pageNumber);
      const rand = Boolean(Math.round(Math.random()));
      if(rand === true) {
        this.fetchWord(num + 1, num + 1, this.pageNumber);
        num += 1;
      }
      else {
        this.fetchWord(num + 1, Helper.getRandomArbitrary(0, 20), this.pageNumber);
        num += 1;
      }
      this.sequenceOfQuestions.push(true);
      if(num === 20) {
        this.pageNumber += 1;
        this.changeCard();
      }
    }
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["startTimer"] }] */
  startTimer() {
   const timer = setInterval(() => {
      this.timeLeft -= 1;
    if(this.timeLeft >= 0) {
      this.root.querySelector('.lp-countdown-counter').innerHTML = this.timeLeft;
    } else {
      clearInterval(timer);
      this.sendGameResult();
      this.gameOver();
    }
    }, 1000);
  }

  async sendGameResult() {
    await handleGameResult(this.stats);
  }

  gameOver() {
    this.score = this.root.querySelector('.label-score').innerHTML;
    this.hideGameCards();
    this.root.insertAdjacentElement('beforeend', 
      new FinishScreenComponent(
        this.score, 
        this.words, 
        this.translates, 
        this.answers, 
        this.sequenceOfQuestions, 
        this.pointsStat)
        .init());
  }

  hideGameCards() {
    this.root.innerHTML = '';
  }
}