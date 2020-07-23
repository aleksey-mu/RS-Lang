import LoadingBar from './loadingBar';
import appProperties from '../appProperties';
import userWordUpdate from './userWordUpdate';

export default async function handleGameResult(gameResult) {
	LoadingBar.show();
	console.log(gameResult);
	await gameResult.forEach(async (word) => {
		appProperties.answerIsCorrect = word.isCorrectGuessed;
		appProperties.wordIdToGet = word.wordId;
		await userWordUpdate();
	});

	LoadingBar.hide();
}
