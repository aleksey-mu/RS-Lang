import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import speakItInit from './games/speakIt/speakItInit';
import SavannahGame from './games/savannah-game/game';
import trainingPageInit from './games/trainingPage';
import PageGameSprintComponent from './games/sprint/PageGameSprintComponent';
import userWordsSortCategory from './helpers/userWordsSortCategory';
import userWordRestore from './helpers/userWordRestore';
import AboutUsPage from './AboutUs/AboutUs';
import PromoPage from './promoPage/promoPage';
import wordsStudyInit from './wordsStudy/wordsStudy';
import settingsInit from './settings/settings';
import mainPageInit from './mainPage/mainPage';
import appProperties from './appProperties';
import initDictionaryPage from './dictionaryPages/initDictionaryPage';
import {} from './helpers/loadingBar';

const MAIN_WRAPPER = document.querySelector('main');

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

function mainPage() {
	mainPageInit();
}

function trainingPage() {
	if (!appProperties.isUserAuthorized) {
		mainPageInit();
	} else {
		trainingPageInit();
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
	const Promo = new PromoPage();
	Promo.init();
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
	const AboutUs = new AboutUsPage();
	AboutUs.init();
}
function wordsPage() {
	if (appProperties.isUserAuthorized) {
		wordsStudyInit();
	} else {
		mainPageInit();
	}
}
function trainingSprintGame() {
	document
		.querySelector('.main')
		.insertAdjacentElement('beforeend', new PageGameSprintComponent().init());
}
function trainingSavannahPage() {
	if (appProperties.isUserAuthorized) {
		const savannahGame = new SavannahGame('main', '#/training/savannah/');

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

function dictionaryLearningWordsPage() {
	if (appProperties.isUserAuthorized) {
		const getLearningWords = async () => {
			const data = await userWordsSortCategory();
			return data.normal;
		};

		initDictionaryPage('learningWords', getLearningWords);
	} else {
		mainPageInit();
	}
}

function dictionaryComplexWordsPage() {
	const getComplexWords = async () => {
		const data = await userWordsSortCategory();
		return data.hard;
	};
	initDictionaryPage('complexWords', getComplexWords);
}

function dictionaryDeletedWordsPage() {
	const getDeletedWords = async () => {
		const data = await userWordsSortCategory();
		return data.delete;
	};

	initDictionaryPage('deletedWords', getDeletedWords, userWordRestore);
}

const loadPage = {
	mainPage,
	wordsPage,
	trainingPage,
	trainSpeakItPage,
	trainingSavannahPage,
	settingsPage,
	trainingSprintGame,
	dictionaryLearningWordsPage,
	dictionaryComplexWordsPage,
	dictionaryDeletedWordsPage,
	promoPage,
	statPage,
	teamPage,
};

const router = new Router(loadPage);

router.init();
