class LearningWordCard {
	constructor({
		word,
		wordTranslate,
		lastStudy,
		audio,
		wordId,
		studyStage,
		repeatTime,
		image,
	}) {
		this.renderImage(image);
		this.renderAudioButton(audio);
		this.wordId = wordId;
		this.word = document.createElement('div');
		this.word.classList.add('dictionary-page-card-word');
		this.word.innerText = word;
		this.wordTranslate = document.createElement('div');
		this.wordTranslate.classList.add('dictionary-page-card-word-translate');
		this.wordTranslate.innerText = wordTranslate;
		this.cardHeader = document.createElement('div');
		this.cardHeader.classList.add('dictionary-page-card-header');
		this.cardHeader.appendChild(this.audio);
		this.cardHeader.appendChild(this.image);
		this.cardHeader.appendChild(this.word);
		this.cardHeader.appendChild(this.wordTranslate);

		this.renderStudyStage(studyStage);
		this.renderTrainingTries(repeatTime);
		this.renderDate(lastStudy);

		this.card = document.createElement('div');
		this.card.classList.add('dictionary-page-card');
		this.card.appendChild(this.cardHeader);
		this.card.appendChild(this.stage);
		this.card.appendChild(this.repeat);
		this.card.appendChild(this.date);

		this.cardContainer = document.createElement('div');
		this.cardContainer.classList.add('dictionary-page-card-container');
		this.cardContainer.dataset.id = this.wordId;
		this.cardContainer.appendChild(this.card);
	}

	renderDate(lastStudy) {
		const options = {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		const dataString = new Date(Number(lastStudy)).toLocaleDateString(
			'ru-RU',
			options
		);

		this.date = document.createElement('div');
		this.date.classList.add('dictionary-page-card-date');
		this.date.innerHTML = `<div class="dictionary-page-card-date-description">Дата последнего повторения: ${dataString}</div>`;
	}

	renderStudyStage(studyStage) {
		const maxStage = 3;
		const currentStage =
			'●'.repeat(studyStage) + '○'.repeat(maxStage - studyStage);

		this.stage = document.createElement('div');
		this.stage.classList.add('dictionary-page-card-stage');
		this.stage.innerHTML = `<div class="dictionary-page-card-stage-description">Степень изучения: ${currentStage}</div>`;
	}

	renderImage(imageSrc) {
		const wordImagePath = imageSrc.replace('files/', '');
		const wordImageSrc = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordImagePath}`;
		this.image = document.createElement('div');
		this.image.classList.add('dictionary-page-card-image');
		this.image.innerHTML = `<div class="dictionary-page-card-image-wrapper"><img src="${wordImageSrc}" alt=""></div>`;
	}

	renderTrainingTries(repeatTime) {
		this.repeat = document.createElement('div');
		this.repeat.classList.add('dictionary-page-card-repeat');
		this.repeat.innerHTML = `<div class="dictionary-page-card-repeat-description">Тренировок: ${repeatTime}</div>`;
	}

	renderAudioButton(audio) {
		const wordPronanciation = audio.replace('files/', '');
		const audioUrl = `https://raw.githubusercontent.com/aleksey-mu/rslang-data/master/data/${wordPronanciation}`;

		this.audioFile = new Audio(audioUrl);
		this.audio = document.createElement('div');
		this.audio.classList.add('dictionary-page-card-audio');
		this.audioButton = document.createElement('div');
		this.audioButton.classList.add('dictionary-page-card-audio-play');
		this.setAudioButtonState('not-playing');

		this.audioFile.onended = () => this.setAudioButtonState('not-playing');
		this.audioButton.addEventListener('click', () => {
			const state =
				this.audioButtonState === 'not-playing' ? 'playing' : 'not-playing';
			this.setAudioButtonState(state);
		});

		this.audio.appendChild(this.audioButton);
	}

	setAudioButtonState(value) {
		this.audioButtonState = value;
		if (value === 'playing') {
			this.audioFile.play();
			this.audioButton.classList.remove('dictionary-page-card-audio-play');
			this.audioButton.classList.add('dictionary-page-card-audio-stop');
			return;
		}
		if (value === 'not-playing') {
			this.audioFile.pause();
			this.audioFile.currentTime = 0;
			this.audioButton.classList.remove('dictionary-page-card-audio-stop');
			this.audioButton.classList.add('dictionary-page-card-audio-play');
		}
	}

	render() {
		return this.cardContainer;
	}
}

export default LearningWordCard;
