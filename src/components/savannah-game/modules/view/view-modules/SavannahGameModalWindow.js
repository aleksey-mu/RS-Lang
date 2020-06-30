class SavannahGameModalWindow {
  constructor(quitIconPath, quitButtonListener) {
    this.container = document.createElement('div');
    this.container.classList.add('modal-window', 'display-none');
    this.quitIconPath = quitIconPath;
    this.quitButtonListener = quitButtonListener;
  }

  render() {
    return this.container;
  }

  hide() {
    this.container.classList.add('display-none');
  }

  show() {
    this.container.classList.remove('display-none');
  }

  clear() {
    [...this.container.childNodes].map((node) => node.remove());
  }

  renderOkButton(okButtonListener, okButtonText) {
    const okButton = document.createElement('div');
    okButton.classList.add('ok-button');
    okButton.innerText = okButtonText;
    okButton.addEventListener('click', okButtonListener);
    okButton.addEventListener('click', this.quitButtonListener);
    return okButton;
  }

  renderCancelButton(quitButtonListener = this.quitButtonListener) {
    const cancelButton = document.createElement('div');
    cancelButton.classList.add('cancel-button');
    cancelButton.innerText = 'ОТМЕНА';
    cancelButton.addEventListener('click', quitButtonListener);
    return cancelButton;
  }

  renderQuitButton(quitButtonListener = this.quitButtonListener) {
    const quitButton = document.createElement('div');
    quitButton.classList.add('quit-button');
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
      }
    });
    this.checkboxLabel = document.createElement('label');
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
    this.diffcultyLabel.innerText = 'Сложность (выше - сложнее)';
    this.diffcultySelect = document.createElement('select');
    this.diffcultyLabel.appendChild(this.diffcultySelect);

    for (let i = 1; i <= diffculties; i += 1) {
      const option = document.createElement('option');
      option.innerText = i;
      if (i === settings.difficulty) option.setAttribute('selected', 'selected');
      this.diffcultySelect.appendChild(option);
    }

    this.diffcultySelect.addEventListener('change', difficultyHandler);
  }

  renderRoundSettings(settings, roundHandler) {
    const rounds = 30;

    this.roundLabel = document.createElement('label');
    this.roundLabel.innerText = 'Раунд';
    this.roundSelect = document.createElement('select');
    this.roundLabel.appendChild(this.roundSelect);

    for (let i = 1; i <= rounds; i += 1) {
      const option = document.createElement('option');
      option.innerText = i;
      if (i === settings.round) option.setAttribute('selected', 'selected');
      this.roundSelect.appendChild(option);
    }

    this.roundSelect.addEventListener('change', roundHandler);
  }

  renderSettingsData(settings, checkboxHandler, difficultyHandler, roundHandler) {
    this.modalDataHeading = document.createElement('div');
    this.modalDataHeading.classList.add('modal-data-heading');
    this.modalDataHeading.innerText = 'Настройки';

    this.renderCheckbox(settings, checkboxHandler)
    this.renderDifficultySettings(settings, difficultyHandler);
    this.renderRoundSettings(settings, roundHandler);

    this.difficultyAndRoundContainer = document.createElement('div');
    this.difficultyAndRoundContainer.appendChild(this.diffcultyLabel);
    this.difficultyAndRoundContainer.appendChild(this.roundLabel);

    if (!settings.isLearnedWordsEnough) {
      const modalDataAlert = document.createElement('div');
      modalDataAlert.classList.add('modal-data-alert');
      modalDataAlert.innerText = 'Вам не хватает изученных слов для игры';
      return [this.modalDataHeading, modalDataAlert, this.checkboxLabel, this.difficultyAndRoundContainer];
    }

    return [this.modalDataHeading, this.checkboxLabel, this.difficultyAndRoundContainer];
  }

  renderBasicElements(data) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalData = document.createElement('div');
    modalData.classList.add('modal-data');
    
    data.map((el) => modalData.appendChild(el));

    modalContainer.appendChild(modalData);
    this.container.appendChild(modalContainer);

    return modalContainer;
  }

  renderSettings(okButtonListener, checkboxHandler, difficultyHandler, roundHandler, settings) {
    console.log(settings);
    this.clear();
    const data = this.renderSettingsData(settings, checkboxHandler, difficultyHandler, roundHandler);
    const modalContainer = this.renderBasicElements(data);
    modalContainer.appendChild(this.renderOkButton(okButtonListener, 'OK'));
    modalContainer.appendChild(this.renderCancelButton());
    modalContainer.appendChild(this.renderQuitButton());
    this.container.appendChild(modalContainer);
  }

  renderGameCloseAlert(okButtonListener) {
    this.clear();
    const data = document.createTextNode('Вы действительно хотите выйти?\nВесь прогресс не сохранится');
    const modalContainer = this.renderBasicElements([data]);
    modalContainer.appendChild(this.renderOkButton(okButtonListener, 'ВЫХОД'));
    modalContainer.appendChild(this.renderCancelButton());
    modalContainer.appendChild(this.renderQuitButton());
    this.container.appendChild(modalContainer);
  }

  renderStatistics(okButtonListener, statistics, result) {
    console.log(statistics, result);
    this.clear();
    const data = document.createTextNode(`Статистика\nУгаданные слова: ${statistics.guessedWords}\nНеугаданные слова: ${statistics.notGuessedWords}\n Результат: ${result}`);
    const modalContainer = this.renderBasicElements([data]);
    modalContainer.appendChild(this.renderOkButton(okButtonListener, 'ВЫХОД'));
    this.container.appendChild(modalContainer);
  }
}

export default SavannahGameModalWindow;
