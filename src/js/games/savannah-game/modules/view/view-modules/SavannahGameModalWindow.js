class SavannahGameModalWindow {
  constructor(quitIconPath, quitButtonListener) {
    this.container = document.createElement('div');
    this.container.classList.add('savannah-modal-window', 'savannah-display-none');
    this.quitIconPath = quitIconPath;
    this.quitButtonListener = quitButtonListener;
  }

  render() {
    return this.container;
  }

  hide() {
    this.container.classList.add('savannah-display-none');
  }

  show() {
    this.container.classList.remove('savannah-display-none');
  }

  clear() {
    [...this.container.childNodes].map((node) => node.remove());
  }

  renderOkButton(okButtonListener, okButtonText) {
    const okButton = document.createElement('div');
    okButton.classList.add('savannah-ok-button', 'btn', 'btn-primary');
    okButton.innerText = okButtonText;
    okButton.addEventListener('click', okButtonListener);
    okButton.addEventListener('click', this.quitButtonListener);
    return okButton;
  }

  renderCancelButton(quitButtonListener = this.quitButtonListener) {
    const cancelButton = document.createElement('div');
    cancelButton.classList.add('savannah-cancel-button', 'btn', 'btn-primary');
    cancelButton.innerText = 'Отмена';
    cancelButton.addEventListener('click', quitButtonListener);
    return cancelButton;
  }

  renderQuitButton(quitButtonListener = this.quitButtonListener) {
    const quitButton = document.createElement('div');
    quitButton.classList.add('savannah-quit-button');
    quitButton.addEventListener('click', quitButtonListener);
    quitButton.appendChild(this.renderQuitIcon());
    return quitButton;
  }

  renderQuitIcon() {
    const quitIcon = document.createElement('img');

    quitIcon.setAttribute('src', this.quitIconPath);
    quitIcon.setAttribute('alt', 'quit icon');

    return quitIcon;
  }

  renderCheckbox(settings, checkboxHandler) {
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    this.checkbox.addEventListener('click', checkboxHandler);
    this.checkbox.addEventListener('click', (event) => {
      if (event.target.checked) {
        this.diffcultySelect.setAttribute('disabled', '');
        this.roundSelect.setAttribute('disabled', '');
        return;
      }
      this.diffcultySelect.removeAttribute('disabled', '');
      this.roundSelect.removeAttribute('disabled', '');
    });
    this.checkboxLabel = document.createElement('label');
    this.checkboxLabel.classList.add('savannah-modal-data-checkbox');
    this.checkboxLabel.innerText = 'Использовать изученные слова';
    this.checkboxLabel.prepend(this.checkbox);
    if (!settings.isLearnedWordsEnough) this.checkbox.setAttribute('disabled', '');
    if (settings.useLearnedWords) {
      this.checkbox.setAttribute('checked', '');
      this.diffcultySelect.setAttribute('disabled', '');
      this.roundSelect.setAttribute('disabled', '');
    }
  }

  renderDifficultySettings(settings, difficultyHandler) {
    const diffculties = 6;

    this.diffcultyLabel = document.createElement('label');
    this.diffcultyLabel.innerText = 'Сложность';
    this.diffcultyLabel.classList.add('savannah-modal-data-select');
    this.diffcultySelect = document.createElement('select');
    this.diffcultyLabel.appendChild(this.diffcultySelect);

    for (let i = 1; i <= diffculties; i += 1) {
      const option = document.createElement('option');
      option.innerText = i;
      if (i === settings.difficulty + 1) option.setAttribute('selected', 'selected');
      this.diffcultySelect.appendChild(option);
    }

    this.diffcultySelect.addEventListener('change', difficultyHandler);
  }

  renderRoundSettings(settings, roundHandler) {
    const rounds = 30;

    this.roundLabel = document.createElement('label');
    this.roundLabel.innerText = 'Раунд';
    this.roundLabel.classList.add('savannah-modal-data-select');
    this.roundSelect = document.createElement('select');
    this.roundLabel.appendChild(this.roundSelect);

    for (let i = 1; i <= rounds; i += 1) {
      const option = document.createElement('option');
      option.innerText = i;
      if (i === settings.round + 1) option.setAttribute('selected', 'selected');
      this.roundSelect.appendChild(option);
    }

    this.roundSelect.addEventListener('change', roundHandler);
  }

  renderSettingsData(settings, checkboxHandler, difficultyHandler, roundHandler) {
    this.modalDataHeading = document.createElement('div');
    this.modalDataHeading.classList.add('savannah-modal-data-heading');
    this.modalDataHeading.innerText = 'Настройки';

    this.renderDifficultySettings(settings, difficultyHandler);
    this.renderRoundSettings(settings, roundHandler);
    this.renderCheckbox(settings, checkboxHandler);

    if (!settings.isLearnedWordsEnough) {
      const modalDataAlert = document.createElement('div');
      modalDataAlert.classList.add('savannah-modal-data-alert');
      modalDataAlert.innerText = 'Вам не хватает изученных слов для игры';
      return [this.modalDataHeading, modalDataAlert, this.checkboxLabel, this.diffcultyLabel, this.roundLabel];
    }

    return [this.modalDataHeading, this.checkboxLabel, this.diffcultyLabel, this.roundLabel];
  }

  renderBasicElements(data) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('savannah-modal-container');

    const modalData = document.createElement('div');
    modalData.classList.add('savannah-modal-data');
    
    data.map((el) => modalData.appendChild(el));

    modalContainer.appendChild(modalData);
    this.container.appendChild(modalContainer);

    return modalContainer;
  }

  renderSettings(saveSettingsButtonHandler, checkboxHandler, difficultyHandler, roundHandler, settings) {
    this.clear();
    const data = this.renderSettingsData(settings, checkboxHandler, difficultyHandler, roundHandler);
    const modalContainer = this.renderBasicElements(data);
    modalContainer.appendChild(this.renderOkButton(saveSettingsButtonHandler, 'OK'));
    modalContainer.appendChild(this.renderQuitButton());
    this.container.appendChild(modalContainer);
  }

  renderGameCloseAlert(okButtonListener) {
    this.clear();
    const alert = document.createElement('div');
    const text = document.createTextNode('Вы действительно хотите выйти?\nВесь прогресс не сохранится');
    alert.classList.add('savannah-modal-data-quit-alert');
    alert.appendChild(text);

    const modalContainer = this.renderBasicElements([alert]);
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('savannah-modal-button-container');
    buttonContainer.appendChild(this.renderOkButton(okButtonListener, 'Выход'));
    buttonContainer.appendChild(this.renderCancelButton());

    modalContainer.appendChild(buttonContainer);
    modalContainer.appendChild(this.renderQuitButton());
    this.container.appendChild(modalContainer);
  }

  renderStatistics(okButtonListener, statistics) {
    this.clear();

    const statisticContainer = document.createElement('statistic');
    statisticContainer.classList.add('savannah-modal-data-statistic');
    const guessedContainer = document.createElement('div');
    guessedContainer.classList.add('savannah-modal-data-statistic-guessed');
    const notGuessedContainer = document.createElement('div');
    notGuessedContainer.classList.add('savannah-modal-data-statistic-not-guessed');
    statisticContainer.appendChild(notGuessedContainer);
    statisticContainer.appendChild(guessedContainer);

    const guessedHeading = document.createElement('div');
    guessedHeading.classList.add('savannah-modal-data-heading');
    const notGuessedHeading = document.createElement('div');
    notGuessedHeading.classList.add('savannah-modal-data-heading');
    guessedHeading.innerText = `Знаю: ${statistics.guessedWords.length}`;
    notGuessedHeading.innerText = `Ошибок: ${statistics.notGuessedWords.length}`;
    guessedContainer.appendChild(guessedHeading);
    notGuessedContainer.appendChild(notGuessedHeading);

    const createWordsContainer = (arrOfWords) => {
      const container = document.createElement('div');
      const words = arrOfWords.map(({ word, wordTranslate }) => {
        const domWord = document.createElement('div');
        domWord.innerText = `${word} - ${wordTranslate}`;
        return domWord;
      });
      words.map((word) => container.appendChild(word));
      return container;
    }

    guessedContainer.appendChild(createWordsContainer(statistics.guessedWords));
    notGuessedContainer.appendChild(createWordsContainer(statistics.notGuessedWords));
    
    const modalContainer = this.renderBasicElements([statisticContainer]);
    modalContainer.appendChild(this.renderOkButton(okButtonListener, 'Выход'));
    this.container.appendChild(modalContainer);
  }
}

export default SavannahGameModalWindow;
