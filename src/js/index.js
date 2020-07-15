import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import speakItInit from './games/speakIt/speakItInit';
import SavannahGame from './games/savannah-game/game';
import PageGameSprintComponent from './games/sprint/PageGameSprintComponent';
import settingsInit from './settings/settings';

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

function mainPage() {}
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

function trainingSprintGame() {
  document.querySelector('.main').insertAdjacentElement('beforeend', new PageGameSprintComponent().init());
}

const loadPage = {
	mainPage,
	wordsPage,
	trainSpeakItPage,
	trainingSavannahPage,
  settingsPage,
  trainingSprintGame,
};

const router = new Router(loadPage);
router.init();
