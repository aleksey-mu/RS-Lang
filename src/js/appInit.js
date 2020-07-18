import appProperties from './appProperties';
import userGetSetting from './settings/userSettingsGet';
import userRefreshToken from './settings/userRefreshToken';
import LoadingBar from './helpers/loadingBar';
import getDateToday from './helpers/getDateToday';

export default async function appInit() {
	const isUserAuthorized = localStorage.getItem('isUserAuthorized');
	if (isUserAuthorized) {
		LoadingBar.show();

		const LOGOUT_BTN = document.querySelector('#Logout__button');
		LOGOUT_BTN.classList.remove('hidden');
		LOGOUT_BTN.addEventListener('click', () => {
			localStorage.clear();
			window.location.reload(false);
		});

		appProperties.isUserAuthorized = true;
		appProperties.userId = localStorage.getItem('userId');
		appProperties.userToken = localStorage.getItem('userToken');
		appProperties.userRefreshToken = localStorage.getItem('userRefreshToken');

		await userRefreshToken();
		await userGetSetting();

		const { lastDateStudying } = appProperties;
		const dateToday = getDateToday();
		if (lastDateStudying !== dateToday) {
			appProperties.wordsTodayLearned = 0;
		}

		console.log('hi');
	}
	LoadingBar.hide();
}
