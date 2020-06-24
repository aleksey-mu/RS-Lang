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

  renderBasicElements(data) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalData = document.createElement('div');
    modalData.classList.add('modal-data');
    modalData.appendChild(data);

    modalContainer.appendChild(modalData);
    this.container.appendChild(modalContainer);

    return modalContainer;
  }

  renderSettings(okButtonListener) {
    this.clear();
    const data = document.createTextNode('Настройки');
    const modalContainer = this.renderBasicElements(data);
    modalContainer.appendChild(this.renderOkButton(okButtonListener, 'OK'));
    modalContainer.appendChild(this.renderCancelButton());
    modalContainer.appendChild(this.renderQuitButton());
    this.container.appendChild(modalContainer);
  }

  renderGameCloseAlert(okButtonListener) {
    this.clear();
    const data = document.createTextNode('Вы действительно хотите выйти?\nВесь прогресс не сохранится');
    const modalContainer = this.renderBasicElements(data);
    modalContainer.appendChild(this.renderOkButton(okButtonListener, 'ВЫХОД'));
    modalContainer.appendChild(this.renderCancelButton());
    modalContainer.appendChild(this.renderQuitButton());
    this.container.appendChild(modalContainer);
  }

  renderStatistics(okButtonListener) {
    this.clear();
    const data = document.createTextNode('Статистика');
    const modalContainer = this.renderBasicElements(data);
    modalContainer.appendChild(this.renderOkButton(okButtonListener, 'ВЫХОД'));
    this.container.appendChild(modalContainer);
  }
}

export default SavannahGameModalWindow;
