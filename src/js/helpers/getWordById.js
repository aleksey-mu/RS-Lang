import appProperties from '../appProperties';

export default async function getWordGetBy() {
	const wordId = appProperties.wordIdToGet;
	const rawResponse = await fetch(
		`https://afternoon-falls-25894.herokuapp.com/words/${wordId}?noAssets=true`,
		{
			method: 'GET',
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	);
	const content = await rawResponse.json();

	console.log(content);

	return content;
}
