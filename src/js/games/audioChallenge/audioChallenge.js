// import GetWords from "./getWords";
import GamePage from "./createGamePage";
import ACgameSettings from "./audioChallengeSettings";

export default class AudioChallengeGame {
  constructor() {
    // this.round = 1;
    // this.difficulty = 1;
    this.GamePage = new GamePage();
    this.ACgameSettings = new ACgameSettings();
  }

  init() {
    this.gameWindow = document.querySelector(".main");
    this.gameWindow.innerHTML = "";
    document.querySelector(".loading-bar").classList.add("hider");

    this.gameStartPage();
    this.ACgameSettings.init();
    this.ACstartGame();
    this.applySettings();
  }

  gameStartPage() {
    this.StartGameSound = new Audio();
    this.StartGameSound.src = `./audio/ACStartGame.wav`;
    //  this.StartGameSound.play();

    this.ACstartPage = document.createElement("div");
    this.ACstartPage.setAttribute("class", "ACstartPage");

    this.gameDiscription = document.createElement("p");
    this.gameDiscription.setAttribute("class", "ACgameDiscription");

    this.gameDiscription.innerText =
      "Добро пожаловать в игру АудиоВызов! После начала игры Вы услышите слово на английском. Ваша задача сопаставить услышанное слово с его переводом.";
    this.ACstartPage.append(this.gameDiscription);

    this.ACstartPageBtnContainer = document.createElement("div");
    this.ACstartPageBtnContainer.setAttribute("class", "ACstartPageBtns");
    this.ACstartGameBtn = document.createElement("button");
    this.ACstartGameBtn.setAttribute("id", "ACstartGameBtn");
    this.ACstartGameBtn.innerText = "Начать";
    this.ACSetGameBtn = document.createElement("button");
    this.ACSetGameBtn.setAttribute("id", "ACsetGameBtn");
    this.ACSetGameBtn.innerText = "Настройки";
    this.ACstartPageBtnContainer.append(this.ACSetGameBtn, this.ACstartGameBtn);

    this.ACstartPage.append(this.ACstartPageBtnContainer);

    this.gameWindow.append(this.ACstartPage);
  }

  ACstartGame() {
    this.ACstartGameBtn.addEventListener("click", () => {
      this.ACstartPage.remove();
      this.round = 1;
      this.difficulty = 1;
      this.GamePage.getWordsSet(this.round, this.difficulty);
    });
  }

  getSelectedSettings() {
    this.DifficultySelect = document.getElementById("difficulty-level");
    this.DifficultySelect.addEventListener("change", () => {
      const indexSelected = this.DifficultySelect.selectedIndex;
      this.optionDifficulty = this.DifficultySelect.querySelectorAll("option")[
        indexSelected
      ].value;
    });

    this.RoundSelect = document.getElementById("round-level");

    this.RoundSelect.addEventListener("change", () => {
      const indexSelected = this.RoundSelect.selectedIndex;
      this.optionRound = this.RoundSelect.querySelectorAll("option")[
        indexSelected
      ].value;
    });

    if (typeof this.optionRound === "undefined") this.optionRound = 1;
    if (typeof this.optionDifficulty === "undefined") this.optionDifficulty = 1;
    // document.addEventListener('DOMContentLoaded', () => {
    //   this.difficulty = document.getElementById('difficulty-level').value;
    //   this.round = document.getElementById('round-level').value;

    // });

    // this.round = this.optionRound;
    // this.difficulty = this.optionDifficulty;
    // if(typeof this.optionRound === "undefined" && typeof this.optionDifficulty !== "undefined"){
    //   this.GamePage.getWordsSet(1, this.optionDifficulty);
    // }else if(typeof this.optionRound !== "undefined" && typeof this.optionDifficulty === "undefined"){
    //   this.GamePage.getWordsSet(this.optionRound, 1);
    // }else if(typeof this.optionRound === "undefined" && typeof this.optionDifficulty === "undefined"){
    //   this.GamePage.getWordsSet(1, 1);
    // }else {
      this.GamePage.getWordsSet(this.optionRound, this.optionDifficulty);
    // }
  }

  applySettings() {
    this.ApplyBtn = document.querySelector("#ACmodalApplyBtn");
    this.ACmodeSelect = document.querySelector("#ACmodeSelect");
    this.ApplyBtn.addEventListener("click", () => {
      if (this.ACmodeSelect.checked) {
        console.log("checkbox selected");
      } else {
        this.getSelectedSettings();
      }
      this.ACstartPage.remove();

      this.ACgameSettings.closeModal();
    });
  }

  clear() {
    this.gameWindow.innerHTML = "";
  }
}
