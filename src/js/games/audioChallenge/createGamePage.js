// import GetWords from "./getWords";
import ACgameSettings from "./audioChallengeSettings";

export default class GamePage {
  constructor() {
    this.gameContainer = document.querySelector(".content");
    this.ACgameSettings = new ACgameSettings();
    // this.GetWords = new GetWords();
  }

  createGameElements(data) {
    this.gameContainer.classList.add("audioChallenge-game");
    this.gameHeader = document.createElement("div");
    this.gameHeader.setAttribute("class", "audioChallenge-game__header");
    this.createGameHeaderElem();
    this.gameContainer.append(this.gameHeader);
    this.createGameMainElem(data);
    this.gameContainer.append(this.gameMain);
    this.ACgameSettings.init();
    // this.applySettings();
   
  }

  createGameHeaderElem() {
    this.gameCloseBtn = document.createElement("button");
    this.gameCloseBtn.setAttribute("id", "gameCloseBtn");
    this.gameCloseBtn.innerHTML = `<span class = "
        glyphicon glyphicon-remove"></span>`;

    this.gameSettingsBtn = document.createElement("button");
    this.gameSettingsBtn.setAttribute("id", "gameSettingsBtn");
    this.gameSettingsBtn.innerHTML = `<span class = "glyphicon glyphicon-cog"></span>`;

    this.gameHeader.append(this.gameSettingsBtn);
    this.gameHeader.append(this.gameCloseBtn);
  }

  createGameMainElem(wordData) {
    document.querySelector(".main").classList.add("audioChallenge-game");
    this.gameMain = document.createElement("div");
    this.gameMain.setAttribute("class", "audioChallenge-game__main");
    this.Data = wordData;
    this.word = this.Data[0].word;
    console.log(this.Data[0].word);
    console.log(this.Data[0]);

    // this.wordDataDetail= this.getWordDetalization(this.word);
    // console.log(this.wordDataDetail.value);

    // this.wordDataDetail = this.GetWords.getWordDetalization(this.word);
    // this.GetWords.getWordDetalization(this.word);
    this.gameMainTemplate = ` <img src = "data:image/jpg;base64,${this.Data[0].image}" class = "audioChallenge-game__img " />
        <div>
          <button id ="soundBtn">
            <span class="glyphicon glyphicon-volume-up"></span>
          </button>
          <h3 class = "">${this.word}</h3>
        </div>
        <div class="audioChallenge-answers__list">
          <ul>
            <li><span>1</span>Sample</li>
            <li><span>2</span>Sample</li>
            <li><span>3</span>Sample</li>
            <li><span>4</span>Sample</li>
            <li><span>5</span>Sample</li>
          </ul>
        </div>
        <div>
            <button id="dontKnowBtn" class = "Next__btn">Не знаю</button>
            <button id="nextWordBtn" class = "Next__btn hider"><span class="glyphicon glyphicon-arrow-right"></span></button>
        </div>`;

    this.gameMain.innerHTML = this.gameMainTemplate;
    
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
      ].value;;
    });


    if (typeof this.optionRound === "undefined") this.optionRound = 1;
    if (typeof this.optionDifficulty === "undefined") this.optionDifficulty = 1;
    this.round = this.optionRound;
    this.difficulty = this.optionDifficulty; 
    
    this.getWordsSet(this.round, this.difficulty);
  }

  applySettings() {
    this.ApplyBtn = document.querySelector("#ACmodalApplyBtn");
    this.ACmodeSelect = document.querySelector("#ACmodeSelect");
    this.ApplyBtn.addEventListener("click", () => {
      // this.clear();
        // e.preventDefault();
      if (this.ACmodeSelect.checked) {
        console.log("checkbox selected");
      } else {
        this.getSelectedSettings();
      }
      // function stm() {
      //   this.ACgameSettings.closeModal();
      // }
      // const a = this.ACgameSettings.closeModal();

      // setTimeout(this.ACgameSettings.closeModal, 3000);
      this.ACgameSettings.closeModal();
    });
  }

  clear() {
    this.gameContainer.innerHTML="";
    
    // this.gameMain.remove();
    // this.gameWindow = document.querySelector(".content");
    // this.gameWindow.innerHTML = "";
  }

  async getWordsSet(round, difficulty) {           
    this.url = `https://afternoon-falls-25894.herokuapp.com/words?page=${round-1}&group=${
        difficulty - 1
    }`;
    const res = await fetch(this.url);
    const json = await res.json();
    const recievedJSON = JSON.stringify(json, null, 1);
    const recievedData = JSON.parse(recievedJSON);
    this.clear();
    this.createGameElements(recievedData); 
    

    this.applySettings();     
}

async getWordDetalization (word) {
    console.log(word);
    this.urlDetail = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}`;
    const rawResponse = await fetch(this.urlDetail);      
    const content = await rawResponse.json();   
    // const recievedJSON = JSON.stringify(content, null, 1);
    // const Data = JSON.parse(recievedJSON);   
    // console.log(Data);
    return content;
  };
  
  
 
}
