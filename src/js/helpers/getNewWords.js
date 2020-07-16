/* eslint-disable no-await-in-loop */
import appProperties from '../appProperties';

function consvertWordNumToDataBaseLocation(wordNum) {
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

export default async function getNewWords(wordsCount) {
	const lastWordNumberFromBase = appProperties.lastWordNumber;

	const lastWordLocation = consvertWordNumToDataBaseLocation(
		lastWordNumberFromBase
	);

	let { wordGroup } = lastWordLocation;
	let { wordPage } = lastWordLocation;
	const { wordPosition } = lastWordLocation;

	const wordsArray = [];

	try {
		while (wordsArray.length < wordsCount) {
			const rawResponse = await fetch(
				`https://afternoon-falls-25894.herokuapp.com/words?group=${wordGroup}&page=${wordPage}&wordsPerPage=20`
			);
			const content = await rawResponse.json();

			wordsArray.push(content.slice(wordPosition, wordsCount));
		}

		return wordsArray;
	} catch (error) {
		console.log(error);
	}

	return wordsArray;
}
