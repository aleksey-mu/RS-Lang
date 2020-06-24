/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */

import getCardsSet from './getCardsSet';
import appProperties from '../../appProperties';

export default function gameInit() {
	const CARDSCONTAINER = document.querySelector('.cards-container');
	const DIFFICULTYSELECTORS = document.querySelectorAll('.diff-selectors');
	const IMAGECONTAINER = document.querySelector('.image-container');
	const TRANSLATECONTAINER = document.querySelector('.translate-container');
	const STARTBUTTON = document.querySelector('.start-btn');
	const RESULTBUTTON = document.querySelector('.result-btn');
	const RESULTMODAL = document.querySelector('.result-wrapper');
	const CLOSEMODAL = document.querySelector('.close-modal-btn button');
	const CORRECTSTACK = document.querySelector('.correct-words__words');
	const INCORRECTSTACK = document.querySelector('.incorrect-words__words');
	const INTROMODULE = document.querySelector('.intro-module');
	const INTROCLOSEBUTTON = document.querySelector('.intro-btn button');
	const NEWGAMEBUTTON = document.querySelector('.new-game-btn button');

	let cardsWords = null;
	let activeCard = null;
	// let wordsDifficulty = 0;
	// let currentWordsSet = null;
	let turnMicOff = false;

	window.SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	// eslint-disable-next-line no-undef
	const recognition = new SpeechRecognition();
	recognition.interimResults = false;
	recognition.lang = 'en-US';

	const getTranslate = async (wordToTranslate) => {
		const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200426T175912Z.61d963be79af314f.417d6d47cee46a524c61888ce70f3e828bba5f03&text=${wordToTranslate}&lang=en-ru`;
		const res = await fetch(url);
		const json = await res.json();
		const word = json.text;
		[TRANSLATECONTAINER.innerText] = word;
	};

	async function cardsGeneretor() {
		// const cardsData = currentWordsSet;
		const cardsData = await getCardsSet();
		const cardsCountOnPage = 10;
		for (let i = 0; i < cardsCountOnPage; i += 1) {
			// console.log(cardsData[i])
			const card = document.createElement('div');
			card.classList.add('word-card');
			const engWord = cardsData[i].word;
			const { transcription } = cardsData[i];
			const wordPronanciation = cardsData[i].audio.replace('files/', '');
			const wordImage = cardsData[i].image.replace('files/', '');
			card.innerHTML = `
      <div class="sound-icon"><i class="fas fa-volume-down"></i></div>
      <div class="text-container">
        <div class="eng-word">${engWord}</div>
        <div class="eng-transcription">${transcription}</div>
      </div>
    `;
			card.addEventListener('click', (clickedCard) => {
				if (activeCard) {
					activeCard.classList.remove('active-card');
				}
				activeCard = clickedCard.target.closest('.word-card');
				activeCard.classList.add('active-card');
				const audio = new Audio(
					`https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordPronanciation}`
				);
				audio.play();
				getTranslate(engWord);
				IMAGECONTAINER.innerHTML = `
      <img class="word-image" src="https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImage}" alt="">
      `;
			});
			CARDSCONTAINER.appendChild(card);
		}

		cardsWords = document.querySelectorAll('.eng-word');
	}

	// const getWords = async () => {
	// 	const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${wordsDifficulty}`;
	// 	const res = await fetch(url);
	// 	const json = await res.json();
	// 	const recievedJSON = JSON.stringify(json, null, 1);
	// 	const recievedData = JSON.parse(recievedJSON);
	// 	currentWordsSet = recievedData;
	// 	cardsGeneretor(recievedData);
	// };

	// const init = () => {
	// 	DIFFICULTYSELECTORS.forEach((selector) => {
	// 		selector.addEventListener('click', (el) => {
	// 			activeDifficulty.classList.remove('diff-active');
	// 			activeDifficulty = el.target;
	// 			el.target.classList.add('diff-active');
	// 			CARDSCONTAINER.innerHTML = '';
	// 			cardsGeneretor();
	// 		});
	// 	});
	// 	cardsGeneretor();
	// };
	const init = () => {
		DIFFICULTYSELECTORS.forEach((selector) => {
			selector.addEventListener('click', (el) => {
				const activeDifficulty = el.target;
				appProperties.difficulty = activeDifficulty.innerText;
				console.log(appProperties.difficulty);
				CARDSCONTAINER.innerHTML = '';
				cardsGeneretor();
			});
		});
		cardsGeneretor();
	};

	const resultChecking = () => {
		cardsWords.forEach((card) => {
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
		TRANSLATECONTAINER.textContent = transcript;
		cardsWords.forEach((card) => {
			if (card.innerText.toLowerCase() === transcript) {
				card.closest('.word-card').classList.add('card-guessed');
			}
			if (!card.closest('.word-card').classList.contains('card-guessed')) {
				isGameEnds = false;
			}
		});

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
		if (activeCard) {
			activeCard.classList.remove('active-card');
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
