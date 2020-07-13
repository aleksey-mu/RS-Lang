import gameProps from './gameProps';

export default function sendGameResults() {
	console.log(gameProps.gameResults);
	gameProps.gameResults = [];
}
