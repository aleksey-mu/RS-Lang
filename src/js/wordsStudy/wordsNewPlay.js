import LoadingBar from '../helpers/loadingBar';
import getNewWord from '../helpers/getNewWord';
import appProperties from '../appProperties';

function checkSettings() {
	const TRANSLATE = document.querySelector('.words-new-translate');
	const EXAMPLE = document.querySelector('.words-new-example');
	const MEANING = document.querySelector('.words-new-meaning');
	const TRANSCRIPTION = document.querySelector('.words-new-transcription');

	if (!appProperties.wordHelpExample) {
		EXAMPLE.classList.add('hidden');
	}
	if (!appProperties.wordHelpTranslate) {
		TRANSLATE.classList.add('hidden');
	}
	if (!appProperties.wordHelpMeaning) {
		MEANING.classList.add('hidden');
	}
	if (!appProperties.wordHelpTranscription) {
		TRANSCRIPTION.classList.add('hidden');
	}
}

function checkInput() {
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
	BTN_CHECK.classList.add('hidden');
	BTN_KNOW.classList.remove('hidden');
	BTN_NORMAL.classList.remove('hidden');
	BTN_HARD.classList.remove('hidden');
	BTN_DELETE.classList.remove('hidden');
}

function wordHide(word) {
	const wordLength = word.length;
	const placeHolder = '_';
	return placeHolder.repeat(wordLength);
}

export default async function wordsNewPlay() {
	LoadingBar.show();
	const MAIN = document.querySelector('main');
	const newWord = await getNewWord();

	appProperties.currentWordObject = newWord;

	const wordEnglish = newWord.word;
	const wordLength = wordEnglish.length;
	const { textExample } = newWord;
	const { wordTranslate } = newWord;
	const { transcription } = newWord;
	const { textMeaning } = newWord;
	const { textExampleTranslate } = newWord;
	const { textMeaningTranslate } = newWord;
	// const wordAudio = newWord.audio.replace('files/', '');
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
			<div class="words-new-word hidden">${wordEnglish}</div>
			<div class="input-group words-new-input-wrapper">
	<input type="text" class="form-control" id="wordInput" name="wordInput" size="${wordLength}" maxlength="${wordLength}">
</div>
			
			<div class="words-new-transcription hidden">${transcription}</div>
						<div class="words-new-example">${textExamplePlaceholder}</div>
			<div class="words-new-meaning">${textMeaningPlaceholder}</div>

			<div class="words-new-translate hidden">${wordTranslate}</div>
			<div class="words-new-example_translate hidden">${textExampleTranslate}</div>
			<div class="words-new-meaning_translate hidden">${textMeaningTranslate}</div>
		</div>
		<div class="words-new-select_word_category__text"></div>
		<div class="words-new-select_word_category__btns">
			<button type="submit" class="btn btn-primary words-new-select_word_category__know hidden">Уже знаю</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__normal hidden">Обычное</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__hard hidden">Сложное</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__delete hidden">Удалить</button>

		</div>
		<div class="words-new-btn-check_answer">
			<button type="submit" class="btn btn-primary words-btn-check_answer">Показать слово</button>

		</div>
	</div>

	<div class="words-new-progress"></div>
</div>

		`;

	const INPUT_FIELD = document.querySelector('#wordInput');

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

	LoadingBar.hide();
}
