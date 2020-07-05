import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import  AudioChallengeGame from './games/audioChallenge/audioChallenge';


const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

const myAudioChallengeGame = new AudioChallengeGame();
myAudioChallengeGame.init();