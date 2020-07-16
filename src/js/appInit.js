import appProperties from './appProperties';
import userGetSetting from './settings/userSettingsGet';
import LoadingBar from './helpers/loadingBar';

export default async function appInit() {
	const isUserAuthorized = localStorage.getItem('isUserAuthorized');
	if (isUserAuthorized) {
		LoadingBar.show();

		appProperties.isUserAuthorized = true;
		appProperties.userId = localStorage.getItem('userId');
		appProperties.userToken = localStorage.getItem('userToken');
		appProperties.userRefreshToken = localStorage.getItem('userRefreshToken');

		await userGetSetting();
		console.log('hi');
	}
	LoadingBar.hide();
}
