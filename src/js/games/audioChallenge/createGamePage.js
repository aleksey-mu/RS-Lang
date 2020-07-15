export default class GamePage {
  constructor() {
    this.gameContainer = document.querySelector(".main");
  }

  createGameElements(
    wordDetailsStorage,
    words,
    wordsImage,
    wordsPronanciation
  ) {
    this.gameContainer.classList.add("audioChallenge-game");
    this.ACgameContainer = document.createElement("div");
    this.ACgameContainer.setAttribute(
      "class",
      "audioChallenge-game__container"
    );

    this.gameHeader = document.createElement("div");
    this.gameHeader.setAttribute("class", "audioChallenge-game__header");
    this.createGameHeaderElem();
    this.ACgameContainer.append(this.gameHeader);

    this.createGameMainElem(
      wordDetailsStorage,
      words,
      wordsImage,
      wordsPronanciation
    );
    this.ACgameContainer.append(this.gameMain);
    this.gameContainer.append(this.ACgameContainer);

    this.wordSound();
    this.ACcloseGame();
  }

  createGameHeaderElem() {
    this.gameCloseBtn = document.createElement("button");
    this.gameCloseBtn.setAttribute("id", "gameCloseBtn");
    this.gameCloseBtn.innerHTML = `<span class = "
        glyphicon glyphicon-remove"></span>`;
    this.gameHeader.append(this.gameCloseBtn);
  }

  wordSound() {
    this.soundBtn = document.querySelector("#soundBtn");
    this.soundBtn.addEventListener("click", () => {
      this.audio.play();
    });
  }

  createGameMainElem(
    wordDetailsStorage,
    words,
    wordsImage,
    wordsPronanciation
  ) {
    document.querySelector(".main").classList.add("audioChallenge-game");
    this.gameMain = document.createElement("div");
    this.gameMain.setAttribute("class", "audioChallenge-game__main");

    console.log(wordDetailsStorage);
    let i = 0;

    this.audio = new Audio(
      `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordsPronanciation[i]}`
    );

    this.audio.addEventListener("loadeddata", () => {
      this.audio.play();
    });

    this.gameMainTemplate = ` <img src="https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordsImage[i]}" class = "audioChallenge-game__img " />
        <div>
          <button id ="soundBtn">
            <span class="glyphicon glyphicon-volume-up"></span>
          </button>
          <h3 class = "">${words[i]}</h3>
        </div>
        <div class="audioChallenge-answers__list">
          <ul class = "answers">
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
    i += 1;
    this.gameMain.innerHTML = this.gameMainTemplate;
  }

  async getData(data) {
    this.words = [];
    this.wordsImage = [];
    this.wordsPronanciation = [];
    data.forEach((element) => {
      this.words.push(element.word);
      this.wordsImage.push(element.image.replace("files/", ""));
      this.wordsPronanciation.push(element.audio.replace("files/", ""));
    });

    this.words.forEach(async (item) => {
      this.wordDetailsStorage = [];
      this.wordContent = await this.getWordDetalization(item);
      this.wordDetailsStorage.push([
        this.wordContent[0].text,
        this.wordContent[0].meanings[0].partOfSpeechCode,
        this.wordContent[0].meanings[0].translation.text,
      ]);
      // console.log(this.wordDetailsStorage);
     this.trtr = this.filtering(this.wordDetailsStorage);
     console.log(this.trtr);
    });
    
    this.createGameElements(
      // this.wordDetailsStorage,
      this.trtr,
      this.words,
      this.wordsImage,
      this.wordsPronanciation
    );
  }

  filtering(data) {
    this.sms = data.filter((item) => item[1] === "v");
    
    // return this.sms;
    // console.log(this.sms);
  }

  async getWordsSet(round, difficulty) {
    this.url = `https://afternoon-falls-25894.herokuapp.com/words?page=${
      round - 1
    }&group=${difficulty - 1}`;
    const res = await fetch(this.url);
    const json = await res.json();
    const recievedJSON = JSON.stringify(json, null, 1);
    const recievedData = JSON.parse(recievedJSON);
    this.getData(recievedData);
  }

  async getWordDetalization(word) {
    this.urlDetail = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}`;
    const rawResponse = await fetch(this.urlDetail);
    const content = await rawResponse.json();
    return content;
  }

  ACcloseGame() {
    this.gameCloseBtn = document.querySelector("#gameCloseBtn");
    this.gameCloseBtn.addEventListener("click", () => {
      document.querySelector(".main").classList.remove("audioChallenge-game");
      document.querySelector(".main").innerHTML = "";
      this.SettingsModal.remove();
    });
  }
}
