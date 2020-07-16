class LearningWordCard {
  constructor({ word, wordTranslate, lastStudy, audio }) {
    this.renderAudioButton(audio);
    this.word = document.createElement('div');
    this.word.classList.add('dictionary-page-card-word');
    this.word.innerText = word;
    this.wordTranslate = document.createElement('div');
    this.wordTranslate.classList.add('dictionary-page-card-word-translate');
    this.wordTranslate.innerText = wordTranslate;
    this.cardHeader = document.createElement('div');
    this.cardHeader.classList.add('dictionary-page-card-header');
    this.cardHeader.appendChild(this.audio);
    this.cardHeader.appendChild(this.word);
    this.cardHeader.appendChild(this.wordTranslate);

    this.renderDate(lastStudy);

    this.card = document.createElement('div');
    this.card.classList.add('dictionary-page-card');
    this.card.appendChild(this.cardHeader);
    this.card.appendChild(this.date);

    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('dictionary-page-card-container');
    this.cardContainer.appendChild(this.card);
  }

  renderDate(lastStudy) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dataString = new Date(Number(lastStudy)).toLocaleDateString('ru-RU', options);

    this.date = document.createElement('div');
    this.date.classList.add('dictionary-page-card-date');
    this.date.innerHTML = `<div class="dictionary-page-card-date-description">дата последнего повторения: ${dataString}</div>`;
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
      const state = this.audioButtonState === 'not-playing' ? 'playing' : 'not-playing';
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
