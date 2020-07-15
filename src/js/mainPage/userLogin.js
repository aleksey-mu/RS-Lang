import appProperties from '../appProperties';

export default async function userLogin(userEmail, userPassword) {
	const INFO_FIELD = document.querySelector('.main-info-field');

	const loginUser = async (user) => {
		try {
			const rawResponse = await fetch(
				'https://afternoon-falls-25894.herokuapp.com/signin',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user),
				}
			);
			const content = await rawResponse.json();

			console.log(content);

			appProperties.userRefreshToken = content.token;
			appProperties.userToken = content.refreshToken;
			appProperties.isUserAuthorized = true;
			console.log(appProperties);

			INFO_FIELD.innerHTML = `
        <div class="main-info-field-success">
        Вы вошли!
        </div>
        `;
		} catch (error) {
			console.log(error);
			INFO_FIELD.innerHTML = `
        <div class="main-info-field-error">
        Неправильная почта/пароль.
        </div>
        `;
		}
	};

	await loginUser({ email: userEmail, password: userPassword });
}
