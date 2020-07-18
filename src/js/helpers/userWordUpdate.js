import appProperties from '../appProperties';
import LoadingBar from './loadingBar';

export default async function userWordUpdate(answerIsCorrect) {
	LoadingBar.show();

	const word = appProperties.currentWordObject;
	const { wordId } = word;
	delete word.id;
	delete word.wordId;
	word.optional.repeatTime += 1;
	word.optional.lastStudy = Date.now();

	if (answerIsCorrect) {
		word.optional.studyStage += 1;
	}

	const maxStudyStage = 5;
	if (word.optional.studyStage === maxStudyStage) {
		word.optional.category = 'delete';
	}

	const token = appProperties.userToken;
	const { userId } = appProperties;
	const updateUserWord = async (wordObj) => {
		const rawResponse = await fetch(
			`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
			{
				method: 'PUT',
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(wordObj),
			}
		);
		const content = await rawResponse.json();

		console.log(content);
	};
	await updateUserWord(word);

	LoadingBar.hide();
}
