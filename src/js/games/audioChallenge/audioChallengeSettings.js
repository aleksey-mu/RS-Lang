import GetWords from "./getWords";
// import GamePage from "./createGamePage";

export default class ACgameSettings {
    constructor() {
        this.GetWords = new GetWords();
      // this.difficulty = 0;
    }

  init() {
    // document.addEventListener("DOMContentLoaded", () => {
      this.createSettingsModal();
      document
        .querySelector("#gameSettingsBtn")
        .addEventListener("click", (e) => {
          e.preventDefault();
          this.openModal();
        });
      this.ModalCloseBtn = document.querySelector(".modal__cross");
      this.ModalCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.closeModal();
      });
      this.ModalOverlay = document.querySelector(".ACoverlay");
      this.ModalOverlay.addEventListener("click", () => {
        this.closeModal();
      });
      this.applySettings();
    // });
  }

  createSettingsModal() {
    this.SettingsModal = document.createElement("div");
    this.SettingsModal.innerHTML = `<div class="ACsettingsModal ACmodal">   
<svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg"  
viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 
9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
<p class="modal__title">Настройки игры:</p>
<input type="checkbox" id="ACmodeSelect">
  <label for="ACmodeSelect">Использовать слова на изучении</label><br>
<div class="difficulty">
<p >Уровень сложности: </p>
<select class = "difficulty-level">
<option value = "1">1</option>
<option value = "2">2</option>
<option value = "3">3</option>
<option value = "4">4</option>
<option value = "5">5</option>
<option value = "6">6</option>
</select>
</div>
<div class="round">
<p>Раунд:</p>
<select class = "round-level">
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
<option>9</option>
<option>10</option>
<option>11</option>
<option>12</option>
<option>13</option>
<option>14</option>
<option>15</option>
<option>16</option>
<option>17</option>
<option>18</option>
<option>19</option>
<option>20</option>
<option>21</option>
<option>22</option>
<option>23</option>
<option>24</option>
<option>25</option>
<option>26</option>
<option>27</option>
<option>28</option>
<option>29</option>
<option>30</option>
</select>
</div>
<div>
<button id= "ACmodalApplyBtn">Применить</button>
</div>
</div>
<div class="ACoverlay AC-overlay-modal"></div>`;
    document.querySelector("body").append(this.SettingsModal);
  }

  getSelectedSettings() {
    this.DifficultySelect = document.querySelector("select.difficulty-level");
    this.DifficultySelect.addEventListener("change", () => {
      const indexSelected = this.DifficultySelect.selectedIndex;
      this.optionDifficulty = this.DifficultySelect.querySelectorAll("option")[
        indexSelected
      ].value;
    });
    this.RoundSelect = document.querySelector("select.round-level");
    this.RoundSelect.addEventListener("change", () => {
      const indexSelected = this.RoundSelect.selectedIndex;
      this.optionRound = this.RoundSelect.querySelectorAll("option")[
        indexSelected
      ].value;
    });

    if (typeof this.optionRound === "undefined") this.optionRound = 1;
    if (typeof this.optionDifficulty === "undefined") this.optionDifficulty = 1;
    this.round = this.optionRound;
    this.difficulty = this.optionDifficulty;
    // localStorage.setItem('round', this.round);
    // localStorage.setItem('difficulty', this.difficulty);
    // window.location.reload();
    // this.gameSettings = {
    //     round: this.round,
    //     difficulty: this.difficulty
    // };
     this.GetWords.getWordsSet(this.round, this.difficulty);
    // return this.gameSettings;
  }

  applySettings() {
    this.ApplyBtn = document.querySelector("#ACmodalApplyBtn");
    this.ACmodeSelect = document.querySelector("#ACmodeSelect");
    this.ApplyBtn.addEventListener("click", () => {
      //   e.preventDefault();
      if (this.ACmodeSelect.checked) {
        console.log("checkbox selected");
      } else {
        this.getSelectedSettings();
      }
    });
  }

  openModal() {
    this.ACmodalSettings = document.querySelector(".ACsettingsModal");
    this.ACoverlayModal = document.querySelector(".AC-overlay-modal");
    this.ACmodalSettings.classList.add("ModalActive");
    this.ACoverlayModal.classList.add("ModalActive");
  }

  closeModal() {
    this.ACmodalSettings.classList.remove("ModalActive");
    this.ACoverlayModal.classList.remove("ModalActive");
  }
}
