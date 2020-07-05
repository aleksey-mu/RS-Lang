import GamePage from './createGamePage';

export default class AudioChallengeGame{

    constructor(){
        this.GamePage = new GamePage();
    }
    
    init(){
        this.GamePage.createGameElements();
    }
}

