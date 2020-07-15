// import GetWords from "./getWords";
import GamePage from "./createGamePage";
// import ACgameSettings from "./audioChallengeSettings";

export default class AudioChallengeGame {
  constructor() {
    this.round = 1;
    this.difficulty = 1;
    // this.GetWords = new GetWords();
    // this.ACgameSettings = new ACgameSettings();
    this.GamePage = new GamePage();
  }

  init() {    
      this.gameWindow = document.querySelector(".main");
      this.gameWindow.innerHTML = "";
  
    // this.GetWords.getWordsSet(this.round, this.difficulty);
    // this.applySettings();
    // this.GamePage.createGameElements(this.round, this.difficulty);
    // this.GamePage.getWordsSet(this.round, this.difficulty);
    this.gameStartPage();
    this.ACstartGame();
  }

  gameStartPage(){
    this.StartGameSound = new Audio();
    this.StartGameSound.src = `./audio/ACStartGame.wav`;
  //  this.StartGameSound.addEventListener('loadeddata', () => {
      // let duration = audioElement.duration;
      // The duration variable now holds the duration (in seconds) of the audio clip 
       this.StartGameSound.play();
    // })
   

    this.ACstartPage = document.createElement('div');
    this.ACstartPage.setAttribute('class', 'ACstartPage');

    this.gameDiscription = document.createElement('p');
    this.gameDiscription.setAttribute('class', 'ACgameDiscription');

    this.gameDiscription.innerText = 'Добро пожаловать в игру АудиоВызов! После начала игры Вы услышите слово на английском. Ваша задача сопаставить услышанное слово с его переводом.'
    this.ACstartPage.append(this.gameDiscription);

    this.ACstartGameBtn = document.createElement('button');
    this.ACstartGameBtn.setAttribute('id', 'ACstartGameBtn');
    this.ACstartGameBtn.innerText = "Начать!"

    this.ACstartPage.append(this.ACstartGameBtn);

    this.gameWindow.append(this.ACstartPage);
  }

  ACstartGame(){
    this.ACstartGameBtn.addEventListener('click', () =>{
      this.GamePage.getWordsSet(this.round, this.difficulty);
    });
  }

}