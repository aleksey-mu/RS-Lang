import appProperties from '../appProperties';
import getDateToday from '../helpers/getDateToday';
import sendSetting from '../settings/userSettingsSave';
import LoadingBar from '../helpers/loadingBar';

export default async function wordUserCreate(wordCategory) {
	LoadingBar.show();
	const token = appProperties.userToken;
	const createUserWord = async ({ userId, wordId, word }) => {
		const rawResponse = await fetch(
			`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
			{
				method: 'POST',
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(word),
			}
		);
		const content = await rawResponse.json();

		console.log(content);
	};

	const lastStudy = Date.now();
	const { wordTranslate } = appProperties.currentWordObject;
	const { audio } = appProperties.currentWordObject;
	const { word } = appProperties.currentWordObject;

	await createUserWord({
		userId: appProperties.userId,
		wordId: appProperties.currentWordObject.id,
		word: {
			difficulty: '-',
			optional: {
				category: wordCategory,
				repeatTime: 1,
				studyStage: 1,
				lastStudy,
				wordTranslate,
				audio,
				word,
				wordId: appProperties.currentWordObject.id,
			},
		},
	});

	appProperties.wordsTodayLearned += 1;
	appProperties.newWordNumber += 1;
	appProperties.lastDateStudying = getDateToday();
	await sendSetting();
	LoadingBar.hide();
}
