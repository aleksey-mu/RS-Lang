export default async function wordsStudyRender() {
	const MAIN = document.querySelector('main');

	const wordsStudyHTML = `
	
		<div class="words-btn-wrapper">
			<button type="submit" class="btn btn-primary words-new-btn">🆕 Изучать новые слова</button>
			<button type="submit" class="btn btn-primary words-dict-btn">📕 Тренировать из моего словаря</button>
		</div>
		`;
	MAIN.innerHTML = wordsStudyHTML;
}
