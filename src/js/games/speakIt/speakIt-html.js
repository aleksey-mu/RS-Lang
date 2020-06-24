const gameHTML = `
<div class="intro-module">

<div class="intro-text">Добро пожаловать в SpeakIt!</div>
<div class="intro-description"><h4>Цель этой игры — произнести в микрофон все слова, которые вы видите на экране. Нажмите кнопку "Cтарт", чтобы включить распознавание речи. В строке под изображением будет показываться, какое слово распозналось при произношении.</h4></div>
<div class="intro-description"><h4>Перед игрой Вы можете прослушать произношение слова, увидеть его перевод и визуализацию, нажав на карточку.</h4></div>
<div class="intro-btn"><button type="button" class="speak-it-start btn btn-primary">Начать</button></div>

</div>
<div class="diff-selector-container">
<div class="diff-selector-text">Выбор сложности:</div>

<div class="diff-selectors btn-group btn-group-toggle" data-toggle="buttons">
<label class="btn btn-primary active">
  <input type="radio" name="options" id="option1" autocomplete="off" checked=""> 1
</label>
<label class="btn btn-primary">
  <input type="radio" name="options" id="option2" autocomplete="off"> 2
</label>
<label class="btn btn-primary">
  <input type="radio" name="options" id="option3" autocomplete="off"> 3
</label>
<label class="btn btn-primary">
  <input type="radio" name="options" id="option4" autocomplete="off"> 4
</label>
<label class="btn btn-primary">
  <input type="radio" name="options" id="option5" autocomplete="off"> 5
</label>
<label class="btn btn-primary">
  <input type="radio" name="options" id="option6" autocomplete="off"> 6
</label>
</div>



</div>

<div class="image-container">
<img
class="word-image"
src="img/games/speakIt/blank.jpg"
alt="blank"
/>
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

<div class="result-wrapper">
<div class="correct-words__text">Words that you spoke correct:</div>
<div class="correct-words__words"></div>


<div class="incorrect-words__text">Words that you spoke incorrect:</div>
<div class="incorrect-words__words"></div>

<div class="close-modal-btn"><button>Continue</button></div>
<div class="new-game-btn"><button>New game</button></div>
</div>
`;

export default gameHTML;
