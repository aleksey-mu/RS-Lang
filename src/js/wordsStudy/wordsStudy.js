import wordsStudyRender from './wordsStudyRender';
import wordsNewPlay from './wordsNewPlay';
import LoadingBar from '../helpers/loadingBar';

export default function wordsStudyInit() {
	LoadingBar.show();
	wordsStudyRender();

	const WORDS_NEW_BTN = document.querySelector('.words-new-btn');
	const WORDS_DICT_BTN = document.querySelector('.words-dict-btn');

	WORDS_NEW_BTN.addEventListener('click', (event) => {
		event.preventDefault();
		wordsNewPlay();
	});

	WORDS_DICT_BTN.addEventListener('click', (event) => {
		event.preventDefault();
	});
	LoadingBar.hide();
}
