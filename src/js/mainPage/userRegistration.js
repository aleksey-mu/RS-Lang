export default async function userRegistration(userEmail, userPassword) {
	const createUser = async (user) => {
		const INFO_FIELD = document.querySelector('.main-info-field');

		try {
			const rawResponse = await fetch(
				'https://afternoon-falls-25894.herokuapp.com/users',
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(user),
				}
			);
			if (!rawResponse.ok) {
				throw new Error('Такой пользователь уже зарегистрирован.');
			}
			const content = await rawResponse.json();
			console.log(content);
			INFO_FIELD.innerHTML = `
            <div class="main-info-field-success">
            Пользователь зарегистрирован! Можете войти.
            </div>
            `;
		} catch (error) {
			console.log(error);
			INFO_FIELD.innerHTML = `
            <div class="main-info-field-error">
            Такой пользователь уже зарегистрирован.
            </div>
            `;
		}
	};

	await createUser({ email: userEmail, password: userPassword });
}
