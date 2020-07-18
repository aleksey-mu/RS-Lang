import appProperties from '../appProperties';

function convertWordNumToDataBaseLocation(wordNum) {
	console.log('wordNum', wordNum);
	const wordsPerGroup = 600;
	const wordsPerPage = 20;

	const wordGroup = Math.floor(wordNum / wordsPerGroup);
	const wordPage = Math.floor(
		(wordNum - wordsPerGroup * wordGroup) / wordsPerPage
	);
	const wordPosition =
		wordNum - wordsPerGroup * wordGroup - wordsPerPage * wordPage;

	return {
		wordGroup,
		wordPage,
		wordPosition,
	};
}

export default async function getNewWord() {
	const newWordNumberFromBase = appProperties.newWordNumber;

	const lastWordLocation = convertWordNumToDataBaseLocation(
		newWordNumberFromBase
	);

	const { wordGroup } = lastWordLocation;
	const { wordPage } = lastWordLocation;
	const { wordPosition } = lastWordLocation;

	let word;

	try {
		const rawResponse = await fetch(
			`https://afternoon-falls-25894.herokuapp.com/words?group=${wordGroup}&page=${wordPage}&wordsPerPage=20`
		);
		const content = await rawResponse.json();

		word = content[wordPosition];
	} catch (error) {
		console.log(error);
	}

	return word;
}
