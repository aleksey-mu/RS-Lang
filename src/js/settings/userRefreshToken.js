import appProperties from '../appProperties';

export default async function userRefreshToken() {
	const refreshUserToken = async () => {
		const refreshToken = appProperties.userRefreshToken;
		const { userId } = appProperties;
		try {
			const rawResponse = await fetch(
				`https://afternoon-falls-25894.herokuapp.com/users/${userId}/tokens`,
				{
					method: 'GET',
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${refreshToken}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			);
			const content = await rawResponse.json();

			appProperties.userToken = content.token;
			appProperties.userRefreshToken = content.refreshToken;

			localStorage.setItem('userToken', appProperties.userToken);
			localStorage.setItem('userRefreshToken', appProperties.userRefreshToken);
		} catch (error) {
			console.log(error);
			localStorage.clear();
			window.location.reload(false);
		}
	};

	await refreshUserToken();
}
