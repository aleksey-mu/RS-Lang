import appProperties from '../appProperties';
import LoadingBar from './loadingBar';
import userWordGet from './userWordGet';
import getDateToday from './getDateToday';
import sendSetting from '../settings/userSettingsSave';

export default async function userWordUpdate() {
	LoadingBar.show();
	const { answerIsCorrect } = appProperties;
	const word = await userWordGet();
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

	appProperties.wordsTodayTrained += 1;
	appProperties.lastDateTraining = getDateToday();
	await sendSetting();

	LoadingBar.hide();
}
