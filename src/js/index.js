import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import SavannahGame from '../components/savannah-game/game.js';

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

function mainPage() {
  document.querySelector('.container-fluid').style.background = 'yellow';
}
function wordsPage () {
  document.querySelector('.container-fluid').style.background = 'green';
}
function trainingSavannahPage () {
  const savannahGame = new SavannahGame('#savannah-game');
  savannahGame.init();
}

const loadPage = {
  mainPage,
  wordsPage,
  trainingSavannahPage,
}

const router = new Router(loadPage);
router.init();



