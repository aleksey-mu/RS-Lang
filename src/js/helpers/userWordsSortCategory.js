import getAllUserWords from './getAllUserWords';

export default async function userWordsSortCategory() {
	const userWordsArr = await getAllUserWords();
	console.log('userWords', userWordsArr);
	const userWordsSorted = {
		normal: [],
		hard: [],
		delete: [],
	};

	userWordsArr.forEach((word) => {
		switch (word.optional.category) {
			case 'normal':
				userWordsSorted.normal.push(word.optional);
				break;
			case 'hard':
				userWordsSorted.hard.push(word.optional);
				break;
			default:
				userWordsSorted.delete.push(word.optional);
		}
	});

	return userWordsSorted;
}
