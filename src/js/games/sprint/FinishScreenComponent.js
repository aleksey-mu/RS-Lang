import Helper from "./Helper";

export default class FinishScreenComponent {
      constructor(score, words, translates, answers, sequenceOfQuestions, pointsStat) {
    this.root = document.createElement('div');
    this.score = score;
    this.words = words;
    this.translates = translates;
    this.answers = answers;
    this.sequenceOfQuestions = sequenceOfQuestions;
    this.pointsStat = pointsStat;
  }

  init() {
    this.root.className = 'stats';

    const STATS = `<h1 class="stats">Игра завершена!</h1>
                  <h2 class="stats">
                    <span class="glyphicon glyphicon-education" aria-hidden="true"></span> 
                    Вы набрали ${this.score} баллов (Точность: ${this.getAccuracy()}%)
                  </h2>
                  <h3 class="stats">
                  ✅ Верных ответов: ${this.getTrueAnswers()}, 
                  ❌ Ошибок: ${this.getFalseAnswers()}
                  </h3>
                  <h2 class="stats">История игры</h2>
                  <div class="table-responsive sprint-table-wrapper">
                    <table class="table table-condensed table-striped table-hover sprint-table">
                      <tr class="info head-table">
                        <td>Слово</td>
                        <td>Перевод</td>
                        <td>Ваш ответ</td>
                        <td>Баллы</td>
                      </tr>
                    </table>
                  </div>`;

    this.root.insertAdjacentHTML('beforeend', STATS);

    this.addAnswersToTable();
    return this.root;
  }

  getTrueAnswers() {
    return this.answers.filter(el => el === true).length;
  }

  getFalseAnswers() {
    return this.answers.filter(el => el === false).length;
  }

  getAccuracy() {
    return Math.ceil(this.getTrueAnswers() * 100 / this.answers.length);
  }

  addAnswersToTable() {
    for (let i = 0; i < this.words.length; i += 1) {
      const answersRow = `<tr>
                          <td>${this.words[i]}</td>
                          <td>${this.translates[i]}</td>
                          <td>
                            ${Helper.answersToRussian(this.sequenceOfQuestions[i])} 
                            ${this.showCorrectAnswerIcon(this.answers[i])}
                          </td>
                          <td>${this.pointsStat[i]}</td>
                        </tr>`;

    this.root.querySelector('.sprint-table').insertAdjacentHTML('beforeend', answersRow);
    }
  } 

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["showCorrectAnswerIcon"] }] */
  showCorrectAnswerIcon(rightAnswer) {
    let icon;
    if(rightAnswer === true) {
      icon = `<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>`;
    } else {
      icon = `<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>`;
    }
    return icon;
  }
}