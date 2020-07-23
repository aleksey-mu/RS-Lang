import appProperties from '../appProperties';
import LoadingBar from './loadingBar';

export default async function userWordGet() {
	LoadingBar.show();
	const token = appProperties.userToken;
	const { userId } = appProperties;
	const wordId = appProperties.wordIdToGet;

	const rawResponse = await fetch(
		`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`,
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

	LoadingBar.hide();

	return content;
}
