import gameHTML from './speakIt-html';
import gameInit from './speakItInit';

const GAME_LINK = document.querySelector('.speak-it-start');
const BODY = document.querySelector('body');

GAME_LINK.addEventListener('click', () => {
	BODY.innerHTML = gameHTML;
	gameInit();
});
