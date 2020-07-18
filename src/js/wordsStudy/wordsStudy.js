import wordsStudyRender from './wordsStudyRender';
import wordsNewPlay from './wordsNewPlay';
import wordsDictPlay from './wordsDictPlay';
import LoadingBar from '../helpers/loadingBar';

export default function wordsStudyInit() {
	LoadingBar.show();
	// window.location.hash = '/words/play/';
	wordsStudyRender();

	const WORDS_NEW_BTN = document.querySelector('.words-new-btn');
	const WORDS_DICT_BTN = document.querySelector('.words-dict-btn');

	WORDS_NEW_BTN.addEventListener('click', (event) => {
		event.preventDefault();
		wordsNewPlay();
	});

	WORDS_DICT_BTN.addEventListener('click', (event) => {
		event.preventDefault();
		wordsDictPlay();
	});
	LoadingBar.hide();
}
