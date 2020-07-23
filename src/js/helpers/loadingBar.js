class LoadingAnimationBar {
	constructor() {
		this.LOADING_ANIMATION_BAR = document.querySelector(
			'.loading-bar-animation'
		);
	}

	show() {
		this.LOADING_ANIMATION_BAR.classList.remove('hidden');
	}

	hide() {
		this.LOADING_ANIMATION_BAR.classList.add('hidden');
	}
}

const LoadingBar = new LoadingAnimationBar();

export default LoadingBar;
