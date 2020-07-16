import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import speakItInit from './games/speakIt/speakItInit';
import SavannahGame from './games/savannah-game/game';
import AboutUsPage from './AboutUs/AboutUs';
import wordsStudyInit from './wordsStudy/wordsStudy';
import settingsInit from './settings/settings';
import mainPageInit from './mainPage/mainPage';
import appProperties from './appProperties';
import {} from './helpers/loadingBar';

const MAIN_WRAPPER = document.querySelector('main');

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

function mainPage() {
	mainPageInit();
}

function trainingPage() {
	if (appProperties.isUserAuthorized) {
		MAIN_WRAPPER.innerHTML =
			'<span style="font-size:100px;">&#129298; training</span>';
	} else {
		mainPageInit();
	}
}
function trainSpeakItPage() {
	if (appProperties.isUserAuthorized) {
		speakItInit();
	} else {
		mainPageInit();
	}
}
function settingsPage() {
	if (appProperties.isUserAuthorized) {
		settingsInit();
	} else {
		mainPageInit();
	}
}
function promoPage() {
	MAIN_WRAPPER.innerHTML =
		'<span style="font-size:100px;">&#129298; promo</span>';
}
function teamPage() {
	const AboutUs = new AboutUsPage();
	AboutUs.init();
}
function statPage() {
	if (appProperties.isUserAuthorized) {
		MAIN_WRAPPER.innerHTML =
			'<span style="font-size:100px;">&#129298; stats</span>';
	} else {
		mainPageInit();
	}
}
function teamPage() {
	MAIN_WRAPPER.innerHTML =
		'<span style="font-size:100px;">&#129298; team</span>';
}
function wordsPage() {
	if (appProperties.isUserAuthorized) {
		wordsStudyInit();
	} else {
		mainPageInit();
	}
}
function trainingSavannahPage() {
	if (appProperties.isUserAuthorized) {
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
	} else {
		mainPageInit();
	}
}

const loadPage = {
	mainPage,
	wordsPage,
	trainingPage,
	trainSpeakItPage,
	trainingSavannahPage,
	settingsPage,
	promoPage,
	statPage,
	teamPage,
};

const router = new Router(loadPage);

router.init();
