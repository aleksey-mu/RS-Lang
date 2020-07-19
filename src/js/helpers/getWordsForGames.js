import userWordsSortCategory from './userWordsSortCategory';

export default async function getWordsForGames() {
	const wordsAll = await userWordsSortCategory();
	const words = [...wordsAll.hard, ...wordsAll.normal];

	words.sort((n1, n2) => n1.lastStudy - n2.lastStudy);

	return words;
}
