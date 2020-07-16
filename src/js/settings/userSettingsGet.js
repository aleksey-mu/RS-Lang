import appProperties from '../appProperties';

export default async function getSetting() {
	const token = appProperties.userToken;
	const { userId } = appProperties;
	try {
		const rawResponse = await fetch(
			`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`,
			{
				method: 'GET',
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		const content = await rawResponse.json();

		console.log(content);

		appProperties.wordsCountNew = content.wordsPerDay;
		appProperties.wordsCountAll = content.optional.wordsCountAll;
		appProperties.wordHelpMeaning = content.optional.wordHelpMeaning;
		appProperties.wordHelpTranslate = content.optional.wordHelpTranslate;
		appProperties.wordHelpExample = content.optional.wordHelpExample;
		appProperties.wordHelpTranscription =
			content.optional.wordHelpTranscription;

		console.log(appProperties);
	} catch (error) {
		console.log(
			'Настройки на сервере не найдены, будут применены настройки по умолчанию.'
		);
	}
}
