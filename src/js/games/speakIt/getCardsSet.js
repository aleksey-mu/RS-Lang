import gameProps from './gameProps';

export default async function getCardsSet() {
	const { wordGroup } = gameProps;
	const { wordRound } = gameProps;

	const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${
		wordRound - 1
	}&group=${wordGroup - 1}`;
	const res = await fetch(url);
	const json = await res.json();
	const recievedJSON = JSON.stringify(json, null, 1);
	const recievedData = JSON.parse(recievedJSON);
	return recievedData;
}
