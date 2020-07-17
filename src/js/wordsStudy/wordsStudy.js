import wordsStudyRender from './wordsStudyRender';
import wordsNewPlay from './wordsNewPlay';
import LoadingBar from '../helpers/loadingBar';
import appProperties from '../appProperties';

export default function wordsStudyInit() {
	const MAIN = document.querySelector('main');

	LoadingBar.show();
	wordsStudyRender();

	const WORDS_NEW_BTN = document.querySelector('.words-new-btn');
	const WORDS_DICT_BTN = document.querySelector('.words-dict-btn');

	WORDS_NEW_BTN.addEventListener('click', (event) => {
		event.preventDefault();
		if (appProperties.wordsTodayLearned >= appProperties.wordsCountNew) {
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
				wordsNewPlay();
			});

			WORDS_NEW_GO_TO_MAIN_PAGE.addEventListener('click', (eventInside) => {
				eventInside.preventDefault();
				window.location.hash = '/main/';
			});
		} else {
			wordsNewPlay();
		}
	});

	WORDS_DICT_BTN.addEventListener('click', (event) => {
		event.preventDefault();
	});
	LoadingBar.hide();
}
