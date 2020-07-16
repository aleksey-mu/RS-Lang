import appProperties from '../appProperties';
import settingsHTML from './settings-HTML';
import sendSetting from './userSettingsSave';
import LoadingBar from '../helpers/loadingBar';

export default function settingsInit() {
	LoadingBar.show();
	const MAIN = document.querySelector('main');
	MAIN.innerHTML = settingsHTML;
	LoadingBar.hide();

	const SAVE_BTN = document.querySelector('.settings-save-btn');

	const WORDS_COUNT_NEW = document.querySelector('#wordsCountNew');
	const WORDS_COUNT_ALL = document.querySelector('#wordsCountAll');

	const WORD_HELP_MEANING = document.querySelector('#wordHelpMeaning');
	const WORD_HELP_TRANSLATE = document.querySelector('#wordHelpTranslate');
	const WORD_HELP_EXAMPLE = document.querySelector('#wordHelpExample');

	const WORD_HELP_TRANSCRIPTION_TRUE = document.querySelector(
		'#wordHelpTranscription-true'
	);
	const WORD_HELP_TRANSCRIPTION_FALSE = document.querySelector(
		'#wordHelpTranscription-false'
	);

	WORDS_COUNT_NEW.value = appProperties.wordsCountNew;
	WORDS_COUNT_ALL.value = appProperties.wordsCountAll;
	WORD_HELP_MEANING.checked = appProperties.wordHelpMeaning;
	WORD_HELP_TRANSLATE.checked = appProperties.wordHelpTranslate;
	WORD_HELP_EXAMPLE.checked = appProperties.wordHelpExample;
	WORD_HELP_TRANSCRIPTION_TRUE.checked = appProperties.wordHelpTranscription;
	WORD_HELP_TRANSCRIPTION_FALSE.checked = !appProperties.wordHelpTranscription;

	SAVE_BTN.addEventListener('click', async (event) => {
		event.preventDefault();
		LoadingBar.show();

		if (WORDS_COUNT_NEW.value > 50) {
			WORDS_COUNT_NEW.value = 50;
		} else if (WORDS_COUNT_NEW.value <= 0) {
			WORDS_COUNT_NEW.value = 1;
		}

		if (WORDS_COUNT_ALL.value > 50) {
			WORDS_COUNT_ALL.value = 50;
		} else if (WORDS_COUNT_ALL.value <= 0) {
			WORDS_COUNT_ALL.value = 1;
		}

		if (
			!WORD_HELP_TRANSLATE.checked &&
			!WORD_HELP_MEANING.checked &&
			!WORD_HELP_EXAMPLE.checked
		) {
			WORD_HELP_TRANSLATE.checked = true;
		}

		console.log('ДО', appProperties);
		appProperties.wordsCountNew = Number(WORDS_COUNT_NEW.value);
		appProperties.wordsCountAll = Number(WORDS_COUNT_ALL.value);
		appProperties.wordHelpMeaning = WORD_HELP_MEANING.checked;
		appProperties.wordHelpTranslate = WORD_HELP_TRANSLATE.checked;
		appProperties.wordHelpExample = WORD_HELP_EXAMPLE.checked;
		appProperties.wordHelpTranscription = WORD_HELP_TRANSCRIPTION_TRUE.checked;
		console.log('ПОСЛЕ', appProperties);

		await sendSetting();

		LoadingBar.hide();
	});
}
