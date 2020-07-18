import userWordsSortCategory from '../helpers/userWordsSortCategory';
import getWordGetBy from '../helpers/getWordById';
import appProperties from '../appProperties';

export default async function wordsDictGetWord() {
	const wordsAll = await userWordsSortCategory();
	let words;
	if (appProperties.learnWordDictionary === 'normal') {
		words = wordsAll.normal;
	} else {
		words = wordsAll.hard;
	}

	words.sort((n1, n2) => n1.lastStudy - n2.lastStudy);

	appProperties.wordIdToGet = words[0].wordId;
	appProperties.currentWordStudyStage = words[0].studyStage;
	const wordObj = await getWordGetBy();
	return wordObj;
}
