/* eslint-disable no-use-before-define */
import LoadingBar from '../helpers/loadingBar';
import getNewWord from '../helpers/getNewWord';
import appProperties from '../appProperties';
import wordUserCreate from './wordUserCreate';

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

	let checkResult = '<div class="new-words-result-wrapper">';

	for (let i = 0; i < wordLength; i += 1) {
		if (userInputArray[i] === wordArray[i]) {
			checkResult += `<span class="new-words-correct_letter">${wordArray[i]}</span>`;
		} else {
			checkResult += `<span class="new-words-incorrect_letter">${wordArray[i]}</span>`;
		}
	}
	checkResult += `</div>`;
	console.log(checkResult);
	return checkResult;
}

function checkInput() {
	const INPUT_FIELD = document.querySelector('#wordInput');
	const INPUT_WRAPPER = document.querySelector('.words-new-input-wrapper');

	const BTN_CHECK = document.querySelector('.words-btn-check_answer');
	const BTN_KNOW = document.querySelector(
		'.words-new-select_word_category__know'
	);
	const BTN_NORMAL = document.querySelector(
		'.words-new-select_word_category__normal'
	);
	const BTN_HARD = document.querySelector(
		'.words-new-select_word_category__hard'
	);
	const BTN_DELETE = document.querySelector(
		'.words-new-select_word_category__delete'
	);
	const SELECT_CATEGORY_TEXT = document.querySelector(
		'.words-new-select_word_category__text'
	);
	INPUT_FIELD.blur();
	BTN_CHECK.classList.add('hidden');
	BTN_KNOW.classList.remove('hidden');
	BTN_NORMAL.classList.remove('hidden');
	BTN_HARD.classList.remove('hidden');
	BTN_DELETE.classList.remove('hidden');
	SELECT_CATEGORY_TEXT.classList.remove('hidden');

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

	const audioWord = new Audio(
		`https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordAudioUrl}`
	);
	const audioWordExample = new Audio(
		`https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordAudioExampleUrl}`
	);
	const audioWordMeaning = new Audio(
		`https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordAudioMeaningUrl}`
	);

	audioWord.play();
	audioWord.addEventListener('ended', () => {
		if (appProperties.wordHelpMeaning) {
			audioWordMeaning.play();
		} else audioWordExample.play();
	});
	audioWordMeaning.addEventListener('ended', () => {
		if (appProperties.wordHelpExample) {
			audioWordExample.play();
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

async function wordsNewStart() {
	LoadingBar.show();
	const MAIN = document.querySelector('main');
	const newWord = await getNewWord();

	appProperties.currentWordObject = newWord;

	const { wordsCountNew } = appProperties;
	const { wordsTodayLearned } = appProperties;
	const todayNewProgress = Math.ceil((wordsTodayLearned / wordsCountNew) * 100);

	const wordEnglish = newWord.word;
	const wordLength = wordEnglish.length;
	const { textExample } = newWord;
	const { wordTranslate } = newWord;
	const { transcription } = newWord;
	const { textMeaning } = newWord;
	const { textExampleTranslate } = newWord;
	const { textMeaningTranslate } = newWord;

	const wordImageUrl = newWord.image.replace('files/', '');
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
		<div class="words-new-wrapper">
	<div class="words-new-area">
		<div class="words-new-card">
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
		<div class="words-new-select_word_category__text hidden">
		Выберите категорию для слова:
		</div>
		<div class="words-new-select_word_category__btns">
			<button type="submit" class="btn btn-primary words-new-select_word_category__know hidden">Уже знаю</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__normal hidden">Обычное</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__hard hidden">Сложное</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__delete hidden">Удалить</button>

		</div>
		<div class="words-new-btn-check_answer">
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
        >${wordsTodayLearned}/${wordsCountNew}</div>
        </div>

		`;
	const PROGRESS_BAR = document.querySelector('.words-new-progress');
	if (appProperties.permissionToLearnMore) {
		PROGRESS_BAR.classList.add('hidden');
	}

	const INPUT_FIELD = document.querySelector('#wordInput');
	const BTN_KNOW = document.querySelector(
		'.words-new-select_word_category__know'
	);
	const BTN_NORMAL = document.querySelector(
		'.words-new-select_word_category__normal'
	);
	const BTN_HARD = document.querySelector(
		'.words-new-select_word_category__hard'
	);
	const BTN_DELETE = document.querySelector(
		'.words-new-select_word_category__delete'
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
	BTN_CHECK.addEventListener('click', () => {
		checkInput();
	});

	BTN_KNOW.addEventListener('click', async () => {
		await wordUserCreate('know');
		wordsNewPlay();
	});
	BTN_NORMAL.addEventListener('click', async () => {
		await wordUserCreate('normal');
		wordsNewPlay();
	});
	BTN_HARD.addEventListener('click', async () => {
		await wordUserCreate('hard');
		wordsNewPlay();
	});
	BTN_DELETE.addEventListener('click', async () => {
		await wordUserCreate('delete');
		wordsNewPlay();
	});

	LoadingBar.hide();
}

export default function wordsNewPlay() {
	const MAIN = document.querySelector('main');
	if (appProperties.wordsTodayLearned >= appProperties.wordsCountNew) {
		if (appProperties.permissionToLearnMore) {
			wordsNewStart();
		} else {
			MAIN.innerHTML = `
			<div class="study-info-wrapper">
			На сегодня все слова изучены! Хотите еще? &#128512;
			</div>
			<div class="study-new-start-wrapper">
			<button type="submit" class="btn btn-primary words-new-btn-start">
				Начать
			</button>
			<button type="submit" class="btn btn-primary words-new-btn-go_to_main">
			Главная страница
			</button>
			</div>
					`;
			const WORDS_NEW_MORE = document.querySelector('.words-new-btn-start');
			const WORDS_NEW_GO_TO_MAIN_PAGE = document.querySelector(
				'.words-new-btn-go_to_main'
			);

			WORDS_NEW_MORE.addEventListener('click', (eventInside) => {
				eventInside.preventDefault();
				appProperties.permissionToLearnMore = true;
				wordsNewStart();
			});

			WORDS_NEW_GO_TO_MAIN_PAGE.addEventListener('click', (eventInside) => {
				eventInside.preventDefault();
				window.location.hash = '/main/';
			});
		}
	} else {
		wordsNewStart();
	}
}
