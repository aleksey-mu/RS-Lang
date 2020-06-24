/* eslint-disable no-loop-func */

import getCardsSet from './getCardsSet';
import getTranslate from './getTranslate';
import gameProps from './gameProps';

async function cardsGeneretor() {
	const CARDSCONTAINER = document.querySelector('.cards-container');
	const IMAGECONTAINER = document.querySelector('.image-container');

	const cardsData = await getCardsSet();

	CARDSCONTAINER.innerHTML = '';

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
			if (gameProps.activeCard) {
				gameProps.activeCard.classList.remove('active-card');
			}
			gameProps.activeCard = clickedCard.target.closest('.word-card');
			gameProps.activeCard.classList.add('active-card');
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

	gameProps.cardsWords = document.querySelectorAll('.eng-word');
}

export default cardsGeneretor;
