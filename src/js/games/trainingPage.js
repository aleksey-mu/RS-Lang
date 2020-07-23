export default function trainingPageInit() {
	const MAIN = document.querySelector('main');
	MAIN.innerHTML = `
    <div class="training-select-wrapper">
    <div class="training-text">Выбирай игру:</div>
	<button type="submit" class="btn btn-primary training-speakit-btn">
		💬 SpeakIt
	</button>
	<button type="submit" class="btn btn-primary training-savannah-btn">
		🦓 Саванна
	</button>
	<button type="submit" class="btn btn-primary training-sprint-btn">
		🏃 Спринт
	</button>
</div>
    `;
	const SPEAKIT = document.querySelector('.training-speakit-btn');
	const SAVANNAH = document.querySelector('.training-savannah-btn');
	const SPRINT = document.querySelector('.training-sprint-btn');

	SPEAKIT.addEventListener('click', () => {
		window.location.hash = '/training/speakit/';
	});
	SAVANNAH.addEventListener('click', () => {
		window.location.hash = '/training/savannah/';
	});
	SPRINT.addEventListener('click', () => {
		window.location.hash = '/training/sprint/';
	});
}
