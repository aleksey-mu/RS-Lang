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
    // this.GetWords.getWordsSet(this.round, this.difficulty);
    // this.applySettings();
    // this.GamePage.createGameElements(this.round, this.difficulty);
    this.GamePage.getWordsSet(this.round, this.difficulty);
    // this.ACgameSettings.init();
  }

//   getSelectedSettings() {
//     this.DifficultySelect = document.querySelector("select.difficulty-level");
//     this.DifficultySelect.addEventListener("change", () => {
//       const indexSelected = this.DifficultySelect.selectedIndex;
//       this.optionDifficulty = this.DifficultySelect.querySelectorAll("option")[
//         indexSelected
//       ].value;
//     });
//     this.RoundSelect = document.querySelector("select.round-level");
//     this.RoundSelect.addEventListener("change", () => {
//       const indexSelected = this.RoundSelect.selectedIndex;
//       this.optionRound = this.RoundSelect.querySelectorAll("option")[
//         indexSelected
//       ].value;
//     });

//     if (typeof this.optionRound === "undefined") this.optionRound = 1;
//     if (typeof this.optionDifficulty === "undefined") this.optionDifficulty = 1;
//     this.round = this.optionRound;
//     this.difficulty = this.optionDifficulty;
//     // localStorage.setItem('round', this.round);
//     // localStorage.setItem('difficulty', this.difficulty);
//     // window.location.reload();
//     // this.gameSettings = {
//     //     round: this.round,
//     //     difficulty: this.difficulty
//     // };
//     this.GetWords.getWordsSet(this.round, this.difficulty);
//     // return this.gameSettings;
//   }

//   applySettings() {
//     this.ApplyBtn = document.querySelector("#ACmodalApplyBtn");
//     this.ACmodeSelect = document.querySelector("#ACmodeSelect");
//     this.ApplyBtn.addEventListener("click", () => {
//       this.clear();
//       //   e.preventDefault();
//       if (this.ACmodeSelect.checked) {
//         console.log("checkbox selected");
//       } else {
//         this.getSelectedSettings();
//       }
//     });
//   }

//   clear() {
//     this.gameWindow = document.querySelector(".content");
//     this.gameWindow.innerHTML = "";
//   }
}
