import appProperties from '../appProperties';
import LoadingBar from '../helpers/loadingBar';
import userWordsSortCategory from '../helpers/userWordsSortCategory';

export default async function loadMainPageStatus() {
	LoadingBar.show();
	const MAIN = document.querySelector('main');

	const userWords = await userWordsSortCategory();
	const userWordsStudying = userWords.normal.length + userWords.hard.length;
	const userWordsLearned = userWords.delete.length;
	const overallWordsCount = 3600;
	const userProgress = Number(
		((userWordsLearned / overallWordsCount) * 100).toFixed(1)
	);

	const wordsStudyHTML = `
        <div class="main-status-wrapper">
		<div class="today-learned">Сегодня изучено слов: ${appProperties.wordsTodayLearned}</div>
		<div class="today-learned">Сегодня тренировано слов: ${appProperties.wordsTodayTrained}</div>
		<div class="total-learned">Сейчас на изучении слов: ${userWordsStudying}</div>
		<div class="total-learned">Всего изучено слов: ${userWordsLearned}/${overallWordsCount}</div>
        <div class="progress words-overall_progress">
        <div
            class="progress-bar"
            role="progressbar"
            style="width: ${userProgress}%; color: #e6b800; font-size: 1.5rem;"
            aria-valuenow="${userProgress}"
            aria-valuemin="0"
            aria-valuemax="100"
        >${userProgress}%</div>
        </div>
        <div class="main-login-btn-wrapper">
            <button type="submit" class="btn btn-primary main-learn-btn">📚 Изучать/тренировать слова!</button>
            <button type="submit" class="btn btn-primary main-train-btn">🎮 Тренировать в играх!</button>
        </div>
        </div>

		`;
	MAIN.innerHTML = wordsStudyHTML;

	const LEARN_BTN = document.querySelector('.main-learn-btn');
	const TRAIN_BTN = document.querySelector('.main-train-btn');
	LEARN_BTN.addEventListener('click', (event) => {
		event.preventDefault();
		window.location.hash = '/words/';
	});
	TRAIN_BTN.addEventListener('click', (event) => {
		event.preventDefault();
		window.location.hash = '/training/';
	});

	LoadingBar.hide();
}
