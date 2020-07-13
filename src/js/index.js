import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import gameInit from './games/speakIt/speakItInit';

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

const loadPage = {
	mainPage,
	wordsPage,
	trainSpeakItPage,
};

const router = new Router(loadPage);
router.init();
