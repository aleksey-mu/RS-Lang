import appProperties from '../appProperties';

export default async function sendSetting() {
	const saveSettings = async (settings) => {
		const token = appProperties.userToken;
		const { userId } = appProperties;
		console.log(userId, token);
		try {
			const rawResponse = await fetch(
				`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
				{
					method: 'PUT',
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(settings),
				}
			);
			const content = await rawResponse.json();

			console.log(content);
		} catch (error) {
			console.log(error);
		}
	};

	await saveSettings({
		wordsPerDay: appProperties.wordsCountNew,
		optional: {
			wordsCountAll: appProperties.wordsCountAll,
			wordHelpMeaning: appProperties.wordHelpMeaning,
			wordHelpTranslate: appProperties.wordHelpTranslate,
			wordHelpExample: appProperties.wordHelpExample,
			wordHelpTranscription: appProperties.wordHelpTranscription,
			newWordNumber: appProperties.newWordNumber,
			lastDateStudying: appProperties.lastDateStudying,
			wordsTodayLearned: appProperties.wordsTodayLearned,
		},
	});
}
