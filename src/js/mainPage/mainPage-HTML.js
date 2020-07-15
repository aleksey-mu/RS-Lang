const mainPageHTMLLogin = `

<div class="main-page-wrapper">
	<form>
		<div class="form-group">
			<label for="loginEmail">Email</label>
			<input type="email" class="form-control" id="loginEmail" placeholder="Email">

		</div>
		<div class="form-group">
			<label for="loginPassword">Пароль</label>
            <input type="password" class="form-control" id="loginPassword"  aria-describedby="passwordHelp" placeholder="Пароль">
            <small id="passwordHelp" class="form-text text-muted">Пароль должен содержать не менее 8 символов, как минимум одну прописную букву, одну заглавную букву, одну цифру и один спецсимвол.</small>
  </div>
		</div>

		<div class="main-info-field">

		</div>
		<div class="main-login-btn-wrapper">
			<button type="submit" class="btn btn-primary main-login-btn">Войти</button>
			<button type="submit" class="btn btn-primary main-register-btn">Зарегистрироваться</button>
		</div>

	</form>
</div>
`;

export default mainPageHTMLLogin;
