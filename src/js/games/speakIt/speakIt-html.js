const gameHTML = `
<div class="intro-module">

<div class="intro-text">Добро пожаловать в SpeakIt!</div>
<div class="intro-description">Цель этой игры — произнести в микрофон все слова, которые вы видите на экране. Нажмите кнопку "Cтарт", чтобы включить распознавание речи. В строке под изображением будет показано, какое слово Вы произнесли.</div>
<div class="intro-description">Перед игрой Вы можете прослушать произношение слова, увидеть его перевод и визуализацию, нажав на карточку слова.</div>
<div class="intro-btn"><button type="button" class="speak-it-start btn btn-primary">Начать</button></div>

</div>

<div class="game-speakit-main-wrapper hidden">

<div class="diff-selector-container">

<div class="diff-selector-text">Выбор сложности:</div>

<div class="diff-selectors btn-group btn-group-toggle" data-toggle="buttons">
<button type="button" class="btn btn-primary active">1</button>
<button type="button" class="btn btn-primary">2</button>
<button type="button" class="btn btn-primary">3</button>
<button type="button" class="btn btn-primary">4</button>
<button type="button" class="btn btn-primary">5</button>
<button type="button" class="btn btn-primary">6</button>
</div>



</div>

<div class="image-container">
<img
class="word-image"
src="img/games/speakIt/blank.jpg"
alt="blank"
/>
</div>

<div class="loading-dots">
<div class="sk-three-bounce hidden">
  <div class="sk-bounce-1 sk-child"></div>
  <div class="sk-bounce-2 sk-child"></div>
  <div class="sk-bounce-3 sk-child"></div>
</div>
</div>

<div class="voice-answer-wrapper">

  <div class="voice-wrapper">
      <div class="circle pulse"></div>
      <div class="circle"><i class="fas fa-microphone"></i><polygon points="40,30 65,50 40,70"></polygon></div>
  </div>



<div class="translate-wrapper">
<div class="translate-container">Перевод слова</div>
</div>

</div>

<div class="cards-container">
</div>

<div class="start-btn">
<button class="btn btn-primary">Старт</button>
</div>
<div class="result-btn hidden">
<button class="btn btn-primary">Закончить</button>
</div>

</div>

<div class="result-wrapper">
<div class="correct-words__text"><i class="fas fa-check"></i>&nbsp; Правильно произнесенные слова:</div>
<div class="correct-words__words"></div>


<div class="incorrect-words__text"><i class="fas fa-times"></i>&nbsp; Нераспознанные слова:</div>
<div class="incorrect-words__words"></div>

<a href="/#/main/" class="btn btn-primary main-menu-btn">Главная страница</a>
</div>

</div>

`;

export default gameHTML;
