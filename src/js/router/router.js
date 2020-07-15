export default class Router {
	constructor(controllers) {
		this.controllers = controllers;
		this.routes = {
			'/dictionary/:tag/': 'dictionaryPage',
			'/training/:tag/': 'trainingPage',
			'/training/:tag/:perPage/': 'trainingPage',
			'/training/:tag/:perPage/page/:page': 'trainingPage',
			'/training/:id': 'trainingPage',
			'/training/savannah/': 'trainingSavannahPage',
			'/training/speakit/': 'trainSpeakItPage',
			'/training/sprint/': 'trainingSprintGame',
			'': 'mainPage',
			'/main/': 'mainPage',
			'/promo/': 'promoPage',
			'/statistics/': 'statPage',
			'/settings/': 'settingsPage',
			'/team/': 'teamPage',
			'/words/': 'wordsPage',
		};
	}

	init() {
		this.routesData = [];
		Object.keys(this.routes).forEach((route) => {
			const methodName = this.routes[route];
			this.routesData.push({
				pattern: new RegExp(`^${route.replace(/:\w+/g, '(\\w+)')}$`),
				callback: this.controllers[methodName],
			});
		});
		document
			.getElementById('burg-nav')
			.addEventListener('click', this.linkHandler.bind(this));
		window.addEventListener('popstate', this.popstateHandler.bind(this));
		window.addEventListener('load', () => {
			const path = window.location.hash.slice(1);
			this.nav(path);
		});
	}

	nav(path) {
		let i = this.routesData.length;
		while (i > 0) {
			i -= 1;
			const args = path.match(this.routesData[i].pattern);
			if (args) {
				this.routesData[i].callback.apply(this, args.slice(1));
			}
		}
	}

	linkHandler(e) {
		if (e.target.tagName === 'A') {
			e.preventDefault();
			this.nav(e.target.href);
			window.location.hash = e.target.pathname;
		}
	}

	popstateHandler() {
		const path = window.location.hash.slice(1);
		this.nav(path);
	}
}
