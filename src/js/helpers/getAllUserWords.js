import appProperties from '../appProperties';

export default async function getAllUserWords() {
	const token = appProperties.userToken;
	const { userId } = appProperties;
	let userWordsArr;
	try {
		const rawResponse = await fetch(
			`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`,
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
		userWordsArr = content;
	} catch (error) {
		console.log('Ошибка доступа!');
	}
	return userWordsArr;
}
