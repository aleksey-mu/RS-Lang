import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import gameInit from './games/speakIt/speakItInit';
import SavannahGame from './games/savannah-game/game';

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

function mainPage() {
	document.querySelector('main').innerHTML = '<h2>Main Page</h2>';
}
function wordsPage() {
	document.querySelector('.container-fluid').style.background = 'green';
}
function trainSpeakItPage() {
	gameInit();
}
function trainingSavannahPage() {
  const savannahGame = new SavannahGame('#savannah-game', '#/training/savannah/');

  const toMainPage = () => {
    window.location.hash = '/main/';
  }

  const getStatistic = (statistic) => {
    console.log(statistic);
  }

  savannahGame.init();
  savannahGame.onGameClose(toMainPage);
  savannahGame.onGameEnd(getStatistic);
}


const loadPage = {
	mainPage,
	wordsPage,
  trainSpeakItPage,
  trainingSavannahPage,
};

const router = new Router(loadPage);
router.init();
