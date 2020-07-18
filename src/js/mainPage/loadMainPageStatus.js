import appProperties from '../appProperties';
import LoadingBar from '../helpers/loadingBar';

export default async function loadMainPageStatus() {
	LoadingBar.show();
	const MAIN = document.querySelector('main');

	const token = appProperties.userToken;
	const { userId } = appProperties;
	try {
		const rawResponse = await fetch(
			`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`,
			{
				method: 'GET',
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		const content = await rawResponse.json();
		console.log(content);
		const userWordsCount = content.length;
		const overallWordsCount = 3600;
		const userProgress = Number(
			((userWordsCount / overallWordsCount) * 100).toFixed(1)
		);

		const wordsStudyHTML = `
        <div class="main-status-wrapper">
		<div class="today-learned">Сегодня изучено слов: ${appProperties.wordsTodayLearned}</div>
		<div class="total-learned">Всего изучено слов: ${userWordsCount}/${overallWordsCount}</div>
        <div class="progress words-overall_progress">
        <div
            class="progress-bar"
            role="progressbar"
            style="width: ${userProgress}%; color: #e6b800;"
            aria-valuenow="${userProgress}"
            aria-valuemin="0"
            aria-valuemax="100"
        >${userProgress}%</div>
        </div>
        <div class="main-login-btn-wrapper">
            <button type="submit" class="btn btn-primary main-learn-btn">📚 Изучать слова!</button>
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
	} catch (error) {
		console.log('Ошибка доступа!');
	}
	LoadingBar.hide();
}
