import gameHTML from './speakIt-html';
import cardsGenerator from './generateCards';
import sendGameResults from './sendGameResults';
import appProperties from '../../appProperties';
import gameProps from './gameProps';

export default function gameInit() {
	const MAIN = document.querySelector('main');
	MAIN.innerHTML = gameHTML;

	const DIFFICULTY_SELECTORS = document.querySelectorAll(
		'.diff-selectors .btn-primary'
	);

	const DIFFICULTY_SELECTORS_CONTAINER = document.querySelectorAll(
		'.diff-selector-container'
	);
	const TRANSLATE_CONTAINER = document.querySelector('.translate-container');
	const TRANSLATE_WRAPPER = document.querySelector('.translate-wrapper');
	const START_BUTTON = document.querySelector('.start-btn');
	const RESULT_BUTTON = document.querySelector('.result-btn');
	const RESULT_MODAL = document.querySelector('.result-wrapper');
	const CORRECT_STACK = document.querySelector('.correct-words__words');
	const INCORRECT_STACK = document.querySelector('.incorrect-words__words');
	const INTRO_MODULE = document.querySelector('.intro-module');
	const INTRO_CLOSE_BUTTON = document.querySelector('.intro-btn button');
	const GAME_MAIN_SCREEN = document.querySelector('.game-speakit-main-wrapper');

	window.SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	// eslint-disable-next-line no-undef
	const recognition = new SpeechRecognition();
	recognition.interimResults = false;
	recognition.lang = 'en-US';

	function setEventListOnDiffSelector(element) {
		DIFFICULTY_SELECTORS.forEach((selector) => {
			selector.classList.remove('active');
		});

		const activeDifficulty = element.target;
		activeDifficulty.classList.add('active');
		appProperties.difficulty = activeDifficulty.innerText;
	}

	const init = () => {
		DIFFICULTY_SELECTORS.forEach((selector) => {
			selector.addEventListener('click', (element) => {
				setEventListOnDiffSelector(element);
				cardsGenerator();
			});
		});
		cardsGenerator();
	};

	const resultChecking = () => {
		gameProps.cardsWords.forEach((card) => {
			const wordTranscription = card
				.closest('.word-card')
				.querySelector('.eng-transcription').innerText;
			const wordText = card.innerText;

			if (card.closest('.word-card').classList.contains('card-guessed')) {
				CORRECT_STACK.insertAdjacentHTML(
					'beforeend',
					`
      <div><span class="result-word">${wordText} ${wordTranscription}</span></div>
      `
				);

				gameProps.gameResults.push({
					word: wordText,
					firstTimeGuessed: true,
				});
			} else {
				INCORRECT_STACK.insertAdjacentHTML(
					'beforeend',
					`
      <div><span class="result-word">${wordText} ${wordTranscription}</span></div>
      `
				);

				gameProps.gameResults.push({
					word: wordText,
					firstTimeGuessed: false,
				});
			}
		});

		if (INCORRECT_STACK.innerText === '') {
			INCORRECT_STACK.innerText = '-';
		}
		if (CORRECT_STACK.innerText === '') {
			CORRECT_STACK.innerText = '-';
		}
	};

	recognition.addEventListener('result', (e) => {
		const transcript = Array.from(e.results)
			.map((result) => result[0])
			.map((result) => result.transcript)
			.join('')
			.toLowerCase();
		let isGameEnds = true;

		TRANSLATE_WRAPPER.classList.remove('correct-word');
		TRANSLATE_CONTAINER.textContent = transcript;

		gameProps.cardsWords.forEach((card) => {
			if (card.innerText.toLowerCase() === transcript) {
				card.closest('.word-card').classList.add('card-guessed');
				TRANSLATE_WRAPPER.classList.remove('incorrect-word');
				TRANSLATE_WRAPPER.classList.add('correct-word');

				const audio = new Audio(`./audio/correct.mp3`);
				audio.play();
			}
			if (!card.closest('.word-card').classList.contains('card-guessed')) {
				isGameEnds = false;
			}
		});

		if (!TRANSLATE_WRAPPER.classList.contains('correct-word')) {
			TRANSLATE_WRAPPER.classList.add('incorrect-word');
		}

		if (isGameEnds) {
			gameProps.turnMicOff = true;
			recognition.abort();
			RESULT_MODAL.classList.add('result-active');
			resultChecking();
		}
	});

	START_BUTTON.addEventListener('click', () => {
		START_BUTTON.classList.add('hidden');
		RESULT_BUTTON.classList.remove('hidden');
		DIFFICULTY_SELECTORS_CONTAINER[0].remove();

		gameProps.turnMicOff = false;
		if (gameProps.activeCard) {
			gameProps.activeCard.classList.remove('active-card');
		}
		document
			.querySelector('.voice-wrapper')
			.classList.add('voice-wrapper-active');
		TRANSLATE_CONTAINER.innerText = '';
		recognition.addEventListener('end', () => {
			if (!gameProps.turnMicOff) {
				recognition.start();
			}
		});
		recognition.start();
	});

	RESULT_BUTTON.addEventListener('click', () => {
		gameProps.turnMicOff = true;
		recognition.abort();
		resultChecking();
		sendGameResults();

		RESULT_MODAL.classList.add('result-active');
		GAME_MAIN_SCREEN.innerHTML = '';
	});

	INTRO_CLOSE_BUTTON.addEventListener('click', () => {
		INTRO_MODULE.classList.add('intro-closed');
		GAME_MAIN_SCREEN.classList.remove('hidden');
	});

	init();
}
