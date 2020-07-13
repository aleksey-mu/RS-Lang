import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import gameInit from './games/speakIt/speakItInit';
import SavannahGame from '../components/savannah-game/game.js';

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
  const testWords1 = [];
  //   {
  //     id: 1,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 2,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 3,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 4,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 5,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 6,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 7,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 8,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 9,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 10,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 11,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  //   {
  //     id: 12,
  //     word: 'right',
  //     wordTranslate: 'tanslate',
  //   },
  // ];

  const savannahGame = new SavannahGame('#savannah-game', '#/training/savannah/', testWords1);

  const toMainPage = () => {
    window.location.hash = '/main/';
  }

  savannahGame.init();
  savannahGame.onGameClose(toMainPage);
}


const loadPage = {
	mainPage,
	wordsPage,
  trainSpeakItPage,
  trainingSavannahPage,
};

const router = new Router(loadPage);
router.init();
