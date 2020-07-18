/* eslint-disable no-use-before-define */
import LoadingBar from '../helpers/loadingBar';
import userWordUpdate from '../helpers/userWordUpdate';
import wordsDictGetWord from './wordsDictGetWord';
import appProperties from '../appProperties';

function stopAudio() {
	const AUDIO_WORD = document.querySelector('#audioWord');
	const AUDIO_EXAMPLE = document.querySelector('#audioWordExample');
	const AUDIO_MEANING = document.querySelector('#audioWordMeaning');
	AUDIO_WORD.pause();
	AUDIO_EXAMPLE.pause();
	AUDIO_MEANING.pause();
}

function checkSettings() {
	const TRANSLATE = document.querySelector('.words-new-translate');
	const EXAMPLE = document.querySelector('.words-new-example');
	const MEANING = document.querySelector('.words-new-meaning');

	if (appProperties.wordHelpExample) {
		EXAMPLE.classList.remove('hidden');
	}
	if (appProperties.wordHelpTranslate) {
		TRANSLATE.classList.remove('hidden');
	}
	if (appProperties.wordHelpMeaning) {
		MEANING.classList.remove('hidden');
	}
}

function checkWord() {
	const INPUT_FIELD = document.querySelector('#wordInput');
	const userInput = INPUT_FIELD.value.toUpperCase();
	const word = appProperties.currentWordObject.word.toUpperCase();
	const userInputArray = userInput.split('');
	const wordArray = word.split('');
	const wordLength = word.length;

	appProperties.answerIsCorrect = userInput === word;

	let checkResult = '<div class="new-words-result-wrapper">';

	for (let i = 0; i < wordLength; i += 1) {
		if (userInputArray[i] === wordArray[i]) {
			checkResult += `<span class="new-words-correct_letter">${wordArray[i]}</span>`;
		} else {
			checkResult += `<span class="new-words-incorrect_letter">${wordArray[i]}</span>`;
		}
	}
	checkResult += `</div>`;
	console.log('Слово введено правильно?', appProperties.answerIsCorrect);
	return checkResult;
}

function checkInput() {
	const INPUT_WRAPPER = document.querySelector('.words-new-input-wrapper');
	const BTN_CHECK = document.querySelector('.words-btn-check_answer');
	const BTN_NEXT = document.querySelector('.words-dict-next__btn');

	BTN_CHECK.classList.add('hidden');
	BTN_NEXT.classList.remove('hidden');

	const checkWordHTML = checkWord();
	INPUT_WRAPPER.innerHTML = checkWordHTML;

	const wordAudioUrl = appProperties.currentWordObject.audio.replace(
		'files/',
		''
	);
	const wordAudioExampleUrl = appProperties.currentWordObject.audioExample.replace(
		'files/',
		''
	);
	const wordAudioMeaningUrl = appProperties.currentWordObject.audioMeaning.replace(
		'files/',
		''
	);

	const AUDIO_WORD = document.querySelector('#audioWord');
	const AUDIO_EXAMPLE = document.querySelector('#audioWordExample');
	const AUDIO_MEANING = document.querySelector('#audioWordMeaning');
	AUDIO_WORD.src = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordAudioUrl}`;
	AUDIO_EXAMPLE.src = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordAudioExampleUrl}`;
	AUDIO_MEANING.src = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordAudioMeaningUrl}`;

	AUDIO_WORD.play();
	AUDIO_WORD.addEventListener('ended', () => {
		if (appProperties.wordHelpMeaning) {
			AUDIO_MEANING.play();
		} else AUDIO_EXAMPLE.play();
	});
	AUDIO_MEANING.addEventListener('ended', () => {
		if (appProperties.wordHelpExample) {
			AUDIO_EXAMPLE.play();
		}
	});

	const TRANSCRIPTION = document.querySelector('.words-new-transcription');
	const EXAMPLE = document.querySelector('.words-new-example');
	const EXAMPLE_TRANSLATE = document.querySelector(
		'.words-new-example_translate'
	);
	const MEANING = document.querySelector('.words-new-meaning');
	const MEANING_TRANSLATE = document.querySelector(
		'.words-new-meaning_translate'
	);

	if (appProperties.wordHelpTranscription) {
		TRANSCRIPTION.classList.remove('hidden');
	}
	if (appProperties.wordHelpExample) {
		EXAMPLE.innerHTML = appProperties.currentWordObject.textExample;
		EXAMPLE_TRANSLATE.classList.remove('hidden');
	}
	if (appProperties.wordHelpMeaning) {
		MEANING.innerHTML = appProperties.currentWordObject.textMeaning;
		MEANING_TRANSLATE.classList.remove('hidden');
	}
}

function wordHide(word) {
	const wordLength = word.length;
	const placeHolder = '_';
	return placeHolder.repeat(wordLength);
}

async function wordsDictStart() {
	LoadingBar.show();
	stopAudio();

	const MAIN = document.querySelector('main');
	const dictWord = await wordsDictGetWord();
	console.log('wordObj', dictWord);

	appProperties.currentWordObject = dictWord;

	const { wordsCountAll } = appProperties;
	const { wordsTodayTrained } = appProperties;
	const todayNewProgress = Math.ceil((wordsTodayTrained / wordsCountAll) * 100);

	const wordEnglish = dictWord.word;
	const wordLength = wordEnglish.length;
	const { textExample } = dictWord;
	const { wordTranslate } = dictWord;
	const { transcription } = dictWord;
	const { textMeaning } = dictWord;
	const { textExampleTranslate } = dictWord;
	const { textMeaningTranslate } = dictWord;
	const { currentWordStudyStage } = appProperties;

	const wordImageUrl = dictWord.image.replace('files/', '');
	const wordPlaceholder = wordHide(wordEnglish);

	const textExamplePlaceholder = textExample.replace(
		new RegExp(wordEnglish, 'gi'),
		wordPlaceholder
	);
	const textMeaningPlaceholder = textMeaning.replace(
		new RegExp(wordEnglish, 'gi'),
		wordPlaceholder
	);

	MAIN.innerHTML = `
    <div class="words-dict-select-vocabulary__wrapper">
	<div class="words-dict-select-vocabulary__text">
		Выбор словаря:
	</div>
	<div class="words-dict-select-vocabulary__btns">
			<button type="submit" class="btn btn-primary words-dict-select-vocabulary__btn-normal">😁Обычные</button>
			<button type="submit" class="btn btn-primary words-dict-select-vocabulary__btn-hard">😈Сложные</button>
	</div>
</div>


		<div class="words-new-wrapper">
	<div class="words-new-area">
        <div class="words-new-card">
            <div class="word-dict-study__stage-wrapper"><span class="word-dict-study__stage-text">Степень изучения слова:</span><span class="word-dict-study__stage">${currentWordStudyStage}/5</span></div>
			<div class="words-new-image"><img class="card-img" src="https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImageUrl}" alt="${wordEnglish}"></div>
			<div class="input-group words-new-input-wrapper">
	<input type="text" autocomplete="off" class="form-control" id="wordInput" name="wordInput" size="${wordLength}" maxlength="${wordLength}">
</div>
			<div class="words-new-translate hidden">${wordTranslate}</div>
			<div class="words-new-transcription hidden">${transcription}</div>

			<div class="words-new-meaning hidden">${textMeaningPlaceholder}</div>
			<div class="words-new-meaning_translate hidden">${textMeaningTranslate}</div>

			<div class="words-new-example hidden">${textExamplePlaceholder}</div>
			<div class="words-new-example_translate hidden">${textExampleTranslate}</div>
			
		</div>

		<div class="words-dict-next__wrapper">
			<button type="submit" class="btn btn-primary words-dict-next__btn hidden">Далее</button>
		</div>
		<div class="words-dict-btn-check_answer">
			<button type="submit" class="btn btn-primary words-btn-check_answer">🤔 Сдаюсь!</button>

		</div>
	</div>

	<div class="progress words-new-progress">
        <div
            class="progress-bar words-new-progress__scale"
            role="progressbar"
            style="width: ${todayNewProgress}%; color: #e6b800;"
            aria-valuenow="${todayNewProgress}"
            aria-valuemin="0"
            aria-valuemax="100"
        >${wordsTodayTrained}/${wordsCountAll}</div>
        </div>

		`;
	const PROGRESS_BAR = document.querySelector('.words-new-progress');
	if (appProperties.permissionToTrainMore) {
		PROGRESS_BAR.classList.add('hidden');
	}

	const INPUT_FIELD = document.querySelector('#wordInput');
	const BTN_NEXT = document.querySelector('.words-dict-next__btn');
	const BTN_NORMAL = document.querySelector(
		'.words-dict-select-vocabulary__btn-normal'
	);
	const BTN_HARD = document.querySelector(
		'.words-dict-select-vocabulary__btn-hard'
	);

	const wordImage = new Image();
	wordImage.onload = function preloadImg() {
		const IMAGE_CONTAINER = document.querySelector('.words-new-image');
		IMAGE_CONTAINER.src = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImageUrl}`;
	};
	wordImage.src = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImageUrl}`;

	checkSettings();
	INPUT_FIELD.focus();

	const BTN_CHECK = document.querySelector('.words-btn-check_answer');

	INPUT_FIELD.addEventListener('input', (event) => {
		if (event.target.value.length === wordLength) {
			checkInput();
		}
	});
	if (appProperties.learnWordDictionary === 'normal') {
		BTN_NORMAL.classList.add('active');
	} else {
		BTN_HARD.classList.add('active');
	}
	BTN_CHECK.addEventListener('click', () => {
		checkInput();
	});
	BTN_NEXT.addEventListener('click', async () => {
		await userWordUpdate();
		wordsDictPlay();
	});
	BTN_NORMAL.addEventListener('click', () => {
		appProperties.learnWordDictionary = 'normal';
		wordsDictPlay();
	});
	BTN_HARD.addEventListener('click', () => {
		appProperties.learnWordDictionary = 'hard';
		wordsDictPlay();
	});

	LoadingBar.hide();
}

export default function wordsDictPlay() {
	const MAIN = document.querySelector('main');
	if (appProperties.wordsTodayTrained >= appProperties.wordsCountAll) {
		if (appProperties.permissionToTrainMore) {
			wordsDictStart();
		} else {
			MAIN.innerHTML = `
			<div class="study-info-wrapper">
			На сегодня все слова тренированы! Хотите еще? &#128512;
			</div>
			<div class="study-new-start-wrapper">
			<button type="submit" class="btn btn-primary words-new-btn-start">
			🙋‍♂️ Да, конечно!
			</button>
			<button type="submit" class="btn btn-primary words-new-btn-go_to_main">
			🙅‍♂️ На сегодня хватит
			</button>
			</div>
					`;
			const WORDS_NEW_MORE = document.querySelector('.words-new-btn-start');
			const WORDS_NEW_GO_TO_MAIN_PAGE = document.querySelector(
				'.words-new-btn-go_to_main'
			);

			WORDS_NEW_MORE.addEventListener('click', (eventInside) => {
				eventInside.preventDefault();
				appProperties.permissionToTrainMore = true;
				wordsDictStart();
			});

			WORDS_NEW_GO_TO_MAIN_PAGE.addEventListener('click', (eventInside) => {
				eventInside.preventDefault();
				window.location.hash = '/main/';
			});
		}
	} else {
		wordsDictStart();
	}
}
