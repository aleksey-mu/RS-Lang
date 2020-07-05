export default class GamePage{

    constructor(){
        this.gameContainer = document.querySelector('.content');        
    }

    createGameElements(){
        this.gameContainer.classList.add('audioChallenge-game');
        this.gameHeader = document.createElement('div');
        this.gameHeader.setAttribute('class', 'audioChallenge-game__header');     
        this.createGameHeaderElem();
        this.gameContainer.append(this.gameHeader);
        this.createGameMainElem();
        this.gameContainer.append(this.gameMain);

    }

    createGameHeaderElem(){
        this.gameCloseBtn = document.createElement('button');
        this.gameCloseBtn.setAttribute('id', 'gameCloseBtn');
        this.gameCloseBtn.innerHTML = `<span class = "
        glyphicon glyphicon-remove"></span>`;

        this.gameSettingsBtn = document.createElement('button');
        this.gameSettingsBtn.setAttribute('id', 'gameSettingsBtn');
        this.gameSettingsBtn.innerHTML = `<span class = "glyphicon glyphicon-cog"></span>`;

        this.gameHeader.append(this.gameSettingsBtn);
        this.gameHeader.append(this.gameCloseBtn); 
             
    }

    createGameMainElem(){
        document.querySelector(".main").classList.add("audioChallenge-game");
        this.gameMain = document.createElement('div');
        this.gameMain.setAttribute('class', 'audioChallenge-game__main'); 
        this.gameMainTemplate = ` <img class = "audioChallenge-game__img hider" />
        <div>
          <button id ="soundBtn">
            <span class="glyphicon glyphicon-volume-up"></span>
          </button>
          <h3 class = "hider">Word</h3>
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

}