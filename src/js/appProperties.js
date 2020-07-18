const appProperties = {
	difficulty: 1,

	wordsCountNew: 10,
	wordsCountAll: 20,

	wordHelpMeaning: true,
	wordHelpTranslate: true,
	wordHelpExample: true,
	wordHelpTranscription: true,

	userId: null,
	userToken: null,
	userRefreshToken: null,
	isUserAuthorized: false,

	wordsTodayLearned: 0,
	wordsTodayTrained: 0,

	newWordNumber: 0,

	currentWordObject: null,

	lastDateStudying: 0,
	lastDateTraining: 0,

	permissionToLearnMore: false,
	permissionToTrainMore: false,

	wordIdToGet: null,

	learnWordDictionary: 'normal',
	answerIsCorrect: null,
	currentWordStudyStage: null,
};

export default appProperties;
