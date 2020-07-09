import GetWords from './getWords';
import ACgameSettings from "./audioChallengeSettings";
import GamePage from './createGamePage';

export default class AudioChallengeGame{

    constructor(){
        this.round = localStorage.getItem('round') || 1;
        this.difficulty = localStorage.getItem('difficulty') || 1;
        this.GetWords = new GetWords();
        this.ACgameSettings = new ACgameSettings();
        this.GamePage = new GamePage();
        
    }
    
    init(){
        this.GetWords.getWordsSet(this.round, this.difficulty);
        this.GamePage.createGameElements(this.round, this.difficulty);        
        this.ACgameSettings.init();
        // this.GamePage.createGameElements(this.round, this.difficulty);
    }
}

