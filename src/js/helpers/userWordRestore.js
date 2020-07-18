import appProperties from '../appProperties';
import LoadingBar from './loadingBar';
import userWordGet from './userWordGet';

export default async function userWordRestore() {
	LoadingBar.show();
	const wordId = appProperties.wordIdToRestore;

	const word = await userWordGet(wordId);
	console.log('wordGet', word);
	delete word.id;
	delete word.wordId;
	word.optional.category = 'normal';

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
