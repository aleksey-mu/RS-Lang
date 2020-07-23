export default class BurgerMenu {
	constructor() {
		this.burgmenu = document.getElementById('burger-menu');
		this.burgbtn = document.getElementById('burg-btn');
		this.burglinks = document.getElementById('burg-nav');
		this.burgOverlay = document.getElementById('overlay');
		this.logo = document.getElementById('logo');
	}

	init() {
		this.burgbtn.addEventListener('click', (event) => {
			event.preventDefault();
			this.switchMenu();
		});
		document.querySelectorAll('span.glyphicon-plus-sign').forEach((el) => {
			el.addEventListener('click', () => {
				el.parentElement
					.querySelector('ul.dropdown')
					.classList.toggle('burger-menu-dropdown-hider');
			});
		});

		this.burglinks.addEventListener('click', (ev) => {
			if (!ev.target.classList.contains('glyphicon-plus-sign')) {
				this.burglinks
					.querySelectorAll('a.burger-menu-link')
					.forEach(() => this.switchMenu());
			}
		});
		this.burgOverlay.addEventListener('click', () => this.switchMenu());
		this.logo.addEventListener('click', () => {
			window.location.hash = '/main/';
		});
	}

	switchMenu() {
		if (this.burgmenu.classList.contains('burger-menu-active')) {
			this.burgmenu.classList.remove('burger-menu-active');
			document
				.querySelector('.container-fluid')
				.classList.remove('.overflow-hider');
		} else {
			this.burgmenu.classList.add('burger-menu-active');
			document
				.querySelector('.container-fluid')
				.classList.add('.overflow-hider');
		}
	}
}
