import mainPageHTMLLogin from './mainPage-HTML';
import userRegistration from './userRegistration';
import userGetSetting from '../settings/userSettingsGet';
import userLogin from './userLogin';
import loadMainPageStatus from './loadMainPageStatus';
import LoadingBar from '../helpers/loadingBar';
import appProperties from '../appProperties';

function inputCheck(userEmail, userPassword) {
	const regExpEmail = new RegExp(
		'^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
	);
	const regExpPassword = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[+\\-_@$!%*?&#.,;:\\[\\]{}])[A-Za-z\\d+\\-_@$!%*?&#.,;:\\[\\]{}]{8,}$'
	);

	console.log(
		'email check:',
		regExpEmail.test(String(userEmail).toLowerCase())
	);
	console.log('pass check:', regExpPassword.test(String(userPassword)));

	if (
		regExpEmail.test(String(userEmail).toLowerCase()) &&
		regExpPassword.test(String(userPassword))
	) {
		return true;
	}

	return false;
}

export default async function mainPageInit() {
	const MAIN = document.querySelector('main');
	if (appProperties.isUserAuthorized) {
		LoadingBar.show();
		await loadMainPageStatus();
		LoadingBar.hide();
	} else {
		MAIN.innerHTML = mainPageHTMLLogin;

		const REGISTER_BTN = document.querySelector('.main-register-btn');
		const LOGIN_BTN = document.querySelector('.main-login-btn');
		const INPUT_EMAIL = document.querySelector('#loginEmail');
		const INPUT_PASSWORD = document.querySelector('#loginPassword');
		const INFO_FIELD = document.querySelector('.main-info-field');

		REGISTER_BTN.addEventListener('click', async (event) => {
			event.preventDefault();
			LoadingBar.show();

			const userEmail = INPUT_EMAIL.value.toLowerCase();
			const userPassword = INPUT_PASSWORD.value;

			const isInputCorrect = inputCheck(userEmail, userPassword);

			if (isInputCorrect) {
				await userRegistration(userEmail, userPassword);
			} else {
				INFO_FIELD.innerHTML = `
            <div class="main-info-field-error">
                Проверьте формат введенных данных!
            </div>
            `;
			}
			LoadingBar.hide();
		});

		LOGIN_BTN.addEventListener('click', async (event) => {
			event.preventDefault();
			LoadingBar.show();

			const userEmail = INPUT_EMAIL.value.toLowerCase();
			const userPassword = INPUT_PASSWORD.value;

			await userLogin(userEmail, userPassword);
			await userGetSetting();
			loadMainPageStatus();
			LoadingBar.hide();
		});
	}
}
