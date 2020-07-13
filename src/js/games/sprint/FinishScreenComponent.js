export default class FinishScreenComponent {
  constructor() {
    this.root = document.createElement('div');
  }

  init() {
    this.root.className = 'stats';

    const STATS = `<h1 class="stats">Игра завершена!</h1>
                  <h2 class="stats"><span class="glyphicon glyphicon-education" aria-hidden="true"></span> Вы набрали 100 баллов (Точность: 20%)</h2>
                  <h3 class="stats">
                  ✅ Верных ответов: 20, 
                  ❌ Ошибок: 3
                  </h3>
                  <button type="button" class="btn btn-primary btn-play-again" aria-haspopup="true" aria-expanded="false">
                    Играть еще раз
                  </button>
                  <h2 class="stats">История игры</h2>
                  <div class="table-responsive sprint-table-wrapper">
                    <table class="table table-condensed table-striped table-hover sprint-table">
                      <tr class="info">
                        <td>Слово</td>
                        <td>Перевод</td>
                        <td>Ваш ответ</td>
                        <td>Баллы</td>
                      </tr>
                      <tr>
                        <td>play</td>
                        <td>играть</td>
                        <td>Да</td>
                        <td>+10</td>
                      </tr>
                      <tr>
                        <td>play</td>
                        <td>играть</td>
                        <td>Да</td>
                        <td>+10</td>
                      </tr>
                    </table>
                  </div>`;

    this.root.insertAdjacentHTML('beforeend', STATS);

    return this.root;
  }
}