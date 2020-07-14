import appProperties from '../../appProperties';

export default async function getCardsSet() {
	const { difficulty } = appProperties;

	const url = `https://afternoon-falls-25894.herokuapp.com/words?page=1&group=${
		difficulty - 1
	}`;
	const res = await fetch(url);
	const json = await res.json();
	const recievedJSON = JSON.stringify(json, null, 1);
	const recievedData = JSON.parse(recievedJSON);
	return recievedData;
}
