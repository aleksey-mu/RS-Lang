import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';
import speakItInit from './games/speakIt/speakItInit';
import SavannahGame from './games/savannah-game/game';
import PageGameSprintComponent from './games/sprint/PageGameSprintComponent';
import settingsInit from './settings/settings';
import mainPageInit from './mainPage/mainPage';
import {} from './helpers/loadingBar';
import initDictionaryPage from './dictionaryPages/initDictionaryPage';

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
  const savannahGame = new SavannahGame('.main', '#/training/savannah/');

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

function trainingSprintGame() {
  document.querySelector('.main').insertAdjacentElement('beforeend', new PageGameSprintComponent().init());
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
	trainSpeakItPage,
	trainingSavannahPage,
  settingsPage,
  trainingSprintGame,
  dictionaryLearningWordsPage,
  dictionaryComplexWordsPage,
  dictionaryDeletedWordsPage,
};

const router = new Router(loadPage);
router.init();
