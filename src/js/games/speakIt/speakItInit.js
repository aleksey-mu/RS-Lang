/* eslint-disable no-restricted-globals */

import cardsGeneretor from './generateCards';
import appProperties from '../../appProperties';
import gameProps from './gameProps';

export default function gameInit() {
	const DIFFICULTYSELECTORS = document.querySelectorAll('.diff-selectors');
	const TRANSLATECONTAINER = document.querySelector('.translate-container');
	const TRANSLATEWRAPPER = document.querySelector('.translate-wrapper');
	const STARTBUTTON = document.querySelector('.start-btn');
	const RESULTBUTTON = document.querySelector('.result-btn');
	const RESULTMODAL = document.querySelector('.result-wrapper');
	const CLOSEMODAL = document.querySelector('.close-modal-btn button');
	const CORRECTSTACK = document.querySelector('.correct-words__words');
	const INCORRECTSTACK = document.querySelector('.incorrect-words__words');
	const INTROMODULE = document.querySelector('.intro-module');
	const INTROCLOSEBUTTON = document.querySelector('.intro-btn button');
	const NEWGAMEBUTTON = document.querySelector('.new-game-btn button');

	let turnMicOff = false;

	window.SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	// eslint-disable-next-line no-undef
	const recognition = new SpeechRecognition();
	recognition.interimResults = false;
	recognition.lang = 'en-US';

	// const getWords = async () => {
	// 	const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${wordsDifficulty}`;
	// 	const res = await fetch(url);
	// 	const json = await res.json();
	// 	const recievedJSON = JSON.stringify(json, null, 1);
	// 	const recievedData = JSON.parse(recievedJSON);
	// 	currentWordsSet = recievedData;
	// 	cardsGeneretor(recievedData);
	// };

	const init = () => {
		DIFFICULTYSELECTORS.forEach((selector) => {
			selector.addEventListener('click', (el) => {
				const activeDifficulty = el.target;
				appProperties.difficulty = activeDifficulty.innerText;
				console.log(appProperties.difficulty);

				cardsGeneretor();
			});
		});
		cardsGeneretor();
	};

	const resultChecking = () => {
		gameProps.cardsWords.forEach((card) => {
			const transcript = card
				.closest('.word-card')
				.querySelector('.eng-transcription').innerText;
			if (card.closest('.word-card').classList.contains('card-guessed')) {
				CORRECTSTACK.insertAdjacentHTML(
					'beforeend',
					`
      <div><i class="fas fa-check"></i><span class="result-word">${card.innerText} ${transcript}</span></div>
      `
				);
			} else {
				INCORRECTSTACK.insertAdjacentHTML(
					'beforeend',
					`
      <div><i class="fas fa-times"></i><span class="result-word">${card.innerText} ${transcript}</span></div>
      `
				);
			}
		});
	};

	recognition.addEventListener('result', (e) => {
		const transcript = Array.from(e.results)
			.map((result) => result[0])
			.map((result) => result.transcript)
			.join('')
			.toLowerCase();
		let isGameEnds = true;

		TRANSLATEWRAPPER.classList.remove('correct-word');
		TRANSLATECONTAINER.textContent = transcript;

		gameProps.cardsWords.forEach((card) => {
			if (card.innerText.toLowerCase() === transcript) {
				card.closest('.word-card').classList.add('card-guessed');
				TRANSLATEWRAPPER.classList.remove('incorrect-word');
				TRANSLATEWRAPPER.classList.add('correct-word');
			}
			if (!card.closest('.word-card').classList.contains('card-guessed')) {
				isGameEnds = false;
			}
		});

		if (!TRANSLATEWRAPPER.classList.contains('correct-word')) {
			TRANSLATEWRAPPER.classList.add('incorrect-word');
		}

		if (isGameEnds) {
			recognition.abort();
			RESULTMODAL.classList.add('result-active');
			resultChecking();
		}
	});

	STARTBUTTON.addEventListener('click', () => {
		STARTBUTTON.classList.add('hidden');
		RESULTBUTTON.classList.remove('hidden');
		turnMicOff = false;
		if (gameProps.activeCard) {
			gameProps.activeCard.classList.remove('active-card');
		}
		document
			.querySelector('.voice-wrapper')
			.classList.add('voice-wrapper-active');
		TRANSLATECONTAINER.innerText = '';
		recognition.addEventListener('end', () => {
			if (!turnMicOff) {
				recognition.start();
			}
		});
		recognition.start();
	});

	RESULTBUTTON.addEventListener('click', () => {
		turnMicOff = true;
		RESULTMODAL.classList.add('result-active');
		resultChecking();
	});

	INTROCLOSEBUTTON.addEventListener('click', () => {
		INTROMODULE.classList.add('intro-closed');
	});

	CLOSEMODAL.addEventListener('click', () => {
		RESULTMODAL.classList.remove('result-active');
		CORRECTSTACK.innerHTML = '';
		INCORRECTSTACK.innerHTML = '';
	});

	NEWGAMEBUTTON.addEventListener('click', () => {
		location.reload(false);
	});

	init();
}
