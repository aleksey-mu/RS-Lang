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

export default async function wordsNewPlay() {
	LoadingBar.show();
	const MAIN = document.querySelector('main');
	const newWord = await getNewWord();

	appProperties.currentWordObject = newWord;

	const wordEnglish = newWord.word;
	const { textExample } = newWord;
	const { wordTranslate } = newWord;
	const { transcription } = newWord;
	const { textMeaning } = newWord;
	const { textExampleTranslate } = newWord;
	const { textMeaningTranslate } = newWord;
	// const wordAudio = newWord.audio.replace('files/', '');
	const wordImageUrl = newWord.image.replace('files/', '');

	MAIN.innerHTML = `
		<div class="words-new-wrapper">
	<div class="words-new-area">
		<div class="words-new-card">
			<div class="words-new-image"><img class="card-img" src="https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImageUrl}" alt="${wordEnglish}"></div>
			<div class="words-new-word">${wordEnglish}</div>
			<div class="words-new-transcription">${transcription}</div>
			<div class="words-new-example">${textExample}</div>
			<div class="words-new-meaning">${textMeaning}</div>

			<div class="words-new-translate">${wordTranslate}</div>
			<div class="words-new-example_translate">${textExampleTranslate}</div>
			<div class="words-new-meaning_translate">${textMeaningTranslate}</div>
		</div>
		<div class="words-new-select_word_category__text"></div>
		<div class="words-new-select_word_category__btns">
			<button type="submit" class="btn btn-primary words-new-select_word_category__know">Уже знаю</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__normal">Обычное</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__hard">Сложное</button>
			<button type="submit" class="btn btn-primary words-new-select_word_category__delete">Удалить</button>

		</div>
		<div class="words-new-btn-check_answer">
			<button type="submit" class="btn btn-primary words-btn-check_answer">Проверить</button>

		</div>
	</div>

	<div class="words-new-progress"></div>
</div>

		`;

	const wordImage = new Image();
	wordImage.onload = function preloadImg() {
		const IMAGE_CONTAINER = document.querySelector('.words-new-image');
		IMAGE_CONTAINER.src = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImageUrl}`;
	};
	wordImage.src = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImageUrl}`;

	checkSettings();

	const BTN_CHECK = document.querySelector('.words-btn-check_answer');

	BTN_CHECK.addEventListener('click', () => {});

	LoadingBar.hide();
}
