import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import speakItInit from './games/speakIt/speakItInit';
import SavannahGame from './games/savannah-game/game';
import settingsInit from './settings/settings';
import mainPageInit from './mainPage/mainPage';
import {} from './helpers/loadingBar';

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

function mainPage() {
	mainPageInit();
}
function wordsPage() {
	document.querySelector('.container-fluid').style.background = 'green';
}
function trainSpeakItPage() {
	speakItInit();
}
function settingsPage() {
	settingsInit();
}
function trainingSavannahPage() {
	const savannahGame = new SavannahGame(
		'#savannah-game',
		'#/training/savannah/'
	);

	const toMainPage = () => {
		window.location.hash = '/main/';
	};

	const getStatistic = (statistic) => {
		console.log(statistic);
	};

	savannahGame.init();
	savannahGame.onGameClose(toMainPage);
	savannahGame.onGameEnd(getStatistic);
}

const loadPage = {
	mainPage,
	wordsPage,
	trainSpeakItPage,
	trainingSavannahPage,
	settingsPage,
};

const router = new Router(loadPage);
router.init();
