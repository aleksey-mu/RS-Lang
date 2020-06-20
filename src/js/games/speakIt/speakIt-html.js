const gameHTML = `
<div class="intro-module">
<div class="intro-text">Welcome to SpeakIt!</div>
<div class="intro-btn"><button>Click to start</button></div>
</div>
<div class="diff-selector-container">
<div class="diff-selector-text">Select difficulty:</div>
<div class="diff-selectors">
  <div class="diff-selector diff-active">1</div>
  <div class="diff-selector">2</div>
  <div class="diff-selector">3</div>
  <div class="diff-selector">4</div>
  <div class="diff-selector">5</div>
  <div class="diff-selector">6</div>
</div>
</div>

<div class="image-container">
<img class="word-image" src="img/blank.jpg" alt="">
</div>

<div class="voice-answer-wrapper">

  <div class="voice-wrapper">
      <div class="circle pulse"></div>
      <div class="circle"><i class="fas fa-microphone"></i><polygon points="40,30 65,50 40,70"></polygon></div>
  </div>
<div class="translate-container">Press card to see translate</div>

</div>

<div class="cards-container">
</div>

<div class="start-btn">
<button>Start</button>
</div>
<div class="result-btn">
<button>Result</button>
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
