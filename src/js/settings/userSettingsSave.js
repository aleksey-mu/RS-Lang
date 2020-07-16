import appProperties from '../appProperties';

export default async function sendSetting() {
	const saveSettings = async (settings) => {
		const INFO_FIELD = document.querySelector('.settings-info-field');
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

			INFO_FIELD.innerHTML = `
        <div class="settings-info-field-success">
            Сохранено!
        </div>
        `;
		} catch (error) {
			INFO_FIELD.innerHTML = `
        <div class="settings-info-field-error">
        ${error}
        </div>
        `;
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
			lastWordNumber: appProperties.lastWordNumber,
		},
	});
}
