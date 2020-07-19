import gameProps from './gameProps';
import handleGameResult from '../../helpers/handleGameResult';

export default async function sendGameResults() {
	if (gameProps.isWordsFromDict) {
		await handleGameResult(gameProps.gameResults);
	}
	gameProps.gameResults = [];
}
