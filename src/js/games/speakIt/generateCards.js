import getCardsSet from './getCardsSet';
import getTranslate from './getTranslate';
import getWordsForGames from '../../helpers/getWordsForGames';
import gameProps from './gameProps';

function checkIfAllLoaded() {
	const LOADING_ANIMATION_DOTS = document.querySelector('.sk-three-bounce');
	const notReadyArray = gameProps.loadedStates.filter(
		(state) => state === false
	);

	if (notReadyArray.length === 0) {
		LOADING_ANIMATION_DOTS.classList.add('hidden');
		gameProps.loadedStates = [false, false, false];
	}
}

async function cardsGenerator() {
	const CARDS_CONTAINER = document.querySelector('.cards-container');
	const START_BTN = document.querySelector('.start-btn');
	const IMAGE_CONTAINER = document.querySelector('.image-container');
	const LOADING_ANIMATION_DOTS = document.querySelector('.sk-three-bounce');
	const LOADING_ANIMATION_BAR = document.querySelector(
		'.loading-bar-animation'
	);
	const { isWordsFromDict } = gameProps;

	LOADING_ANIMATION_BAR.classList.remove('hidden');
	let cardsData;
	if (isWordsFromDict) {
		cardsData = await getWordsForGames();
	} else {
		cardsData = await getCardsSet();
	}

	CARDS_CONTAINER.innerHTML = '';

	console.log(cardsData);
	const cardsCountOnPage = 10;
	if (cardsData.length < cardsCountOnPage) {
		CARDS_CONTAINER.innerHTML = '<h3>Недостаточно слов для тренировки</h3>';
		START_BTN.classList.add('hidden');
	} else {
		for (let i = 0; i < cardsCountOnPage; i += 1) {
			const card = document.createElement('div');
			card.classList.add('word-card');

			let wordId;
			if (isWordsFromDict) {
				wordId = cardsData[i].wordId;
			} else {
				wordId = cardsData[i].id;
			}

			const engWord = cardsData[i].word;
			const { transcription } = cardsData[i];
			const wordPronunciation = cardsData[i].audio.replace('files/', '');
			const wordImage = cardsData[i].image.replace('files/', '');
			card.innerHTML = `
  		<div class="sound-icon"><i class="fas fa-volume-down"></i></div>
  		<div class="text-container">
    	<div class="eng-word" data-id="${wordId}">${engWord}</div>
   		<div class="eng-transcription">${transcription}</div>
  		</div>
		`;

			card.addEventListener('click', async (clickedCard) => {
				LOADING_ANIMATION_DOTS.classList.remove('hidden');

				if (gameProps.activeCard) {
					gameProps.activeCard.classList.remove('active-card');
				}
				gameProps.activeCard = clickedCard.target.closest('.word-card');
				gameProps.activeCard.classList.add('active-card');
				const audio = new Audio(
					`https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordPronunciation}`
				);
				audio.addEventListener('loadeddata', () => {
					audio.play();
					gameProps.loadedStates[0] = true;
					checkIfAllLoaded();
				});

				const imageUrl = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImage}`;
				const newImage = new Image();
				newImage.addEventListener('load', () => {
					IMAGE_CONTAINER.innerHTML = `
				<img class="word-image" src="https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImage}" alt="">
				`;
					gameProps.loadedStates[1] = true;
					checkIfAllLoaded();
				});
				newImage.src = imageUrl;

				await getTranslate(engWord);
				gameProps.loadedStates[2] = true;
				checkIfAllLoaded();
			});
			CARDS_CONTAINER.appendChild(card);
		}

		gameProps.cardsWords = document.querySelectorAll('.eng-word');
		START_BTN.classList.remove('hidden');
	}

	LOADING_ANIMATION_BAR.classList.add('hidden');
}

export default cardsGenerator;
