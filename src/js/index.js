import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import speakItInit from './games/speakIt/speakItInit';
import SavannahGame from './games/savannah-game/game';
import PageGameSprintComponent from './games/sprint/PageGameSprintComponent';

import wordsStudyInit from './wordsStudy/wordsStudy';
import settingsInit from './settings/settings';
import mainPageInit from './mainPage/mainPage';
import appProperties from './appProperties';
import {} from './helpers/loadingBar';
import initDictionaryPage from './dictionaryPages/initDictionaryPage';

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
function trainingSprintGame() {
	document
		.querySelector('.main')
		.insertAdjacentElement('beforeend', new PageGameSprintComponent().init());
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

function dictionaryLearningWordsPage() {
  const testGetLearningWords = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
      ]);
    }, 1000);
  });

  initDictionaryPage('learningWords', testGetLearningWords);
}

function dictionaryComplexWordsPage() {
  const testGetComplexWords = async () => {
    const data = new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            word: 'adventure',
            wordTranslate: 'приключение',
            lastStudy: '1594921769349',
            audio: 'files/02_0021.mp3'
          },
          {
            word: 'evil',
            wordTranslate: 'злой',
            lastStudy: '1594921769349',
            audio: 'files/02_0026.mp3'
          },
        ]);
      }, 1000);
    });
    return data;
  };


  initDictionaryPage('complexWords', testGetComplexWords);
}

function dictionaryDeletedWordsPage() {
  const testGetDeletedWords = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
                {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
        {
          word: 'adventure',
          wordTranslate: 'приключение',
          lastStudy: '1594921769349',
          audio: 'files/02_0021.mp3'
        },
        {
          word: 'evil',
          wordTranslate: 'злой',
          lastStudy: '1594921769349',
          audio: 'files/02_0026.mp3'
        },
      ]);
    }, 1000);
  });

  const testRestoreCard = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  initDictionaryPage('deletedWords', testGetDeletedWords, testRestoreCard);
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
