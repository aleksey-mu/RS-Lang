const gemInnerHtml = `
  <div class="savannah-gem-move">
    <div class="savannah-gem-bg">
      <div class="savannah-gem-bg-inner"></div>
    </div>
    <div class="savannah-gem-img">
      <i class="savannah-gem-img-1 savannah-gem-imgs"></i>
      <i class="savannah-gem-img-2 savannah-gem-imgs"></i>
      <i class="savannah-gem-img-3 savannah-gem-imgs"></i>
      <i class="savannah-gem-img-4 savannah-gem-imgs"></i>
    </div>
  </div>
  <div class="savannah-gem-circle">
    <div class="savannah-gem-parts-3"></div>
    <div class="savannah-gem-parts-2"></div>
    <div class="savannah-gem-parts-1"></div>
  </div>
  <div>
    <div class="savannah-gem-point-1 savannah-gem-point"></div>
    <div class="savannah-gem-point-2 savannah-gem-point"></div>
    <div class="savannah-gem-point-3 savannah-gem-point"></div>
    <div class="savannah-gem-point-4 savannah-gem-point"></div>
    <div class="savannah-gem-point-5 savannah-gem-point"></div>
    <div class="savannah-gem-point-6 savannah-gem-point"></div>
    <div class="savannah-gem-point-7 savannah-gem-point"></div>
    <div class="savannah-gem-point-8 savannah-gem-point"></div>
    <div class="savannah-gem-point-9 savannah-gem-point"></div>
    <div class="savannah-gem-point-10 savannah-gem-point"></div>
  </div>`;

class SavannahGameFooter {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('savannah-game-footer', 'savannah-game-container');
    
    this.statusManagement = document.createElement('div');
    this.statusManagement.classList.add('savannah-status-management');

    this.gem = document.createElement('div');
    this.gem.classList.add('savannah-gem');

    this.statusBar = document.createElement('div');
    this.statusBar.classList.add('savannah-status-bar');

    this.container.appendChild(this.statusManagement);
    this.statusManagement.appendChild(this.gem);
    this.statusManagement.appendChild(this.statusBar);
  }

  render() {
    return this.container;
  }

  clearContainer() {
    [...this.container.childNodes].map((node) => node.remove());
  }

  renderGem() {
    this.gem.innerHTML = gemInnerHtml;
  }

  removeAnimationFromGem() {
    this.gem.querySelector('.savannah-gem-circle').setAttribute('style', 'opacity: 0;');
  }

  addAnimationToGem() {
    this.gem.querySelector('.savannah-gem-circle').removeAttribute('style');
  }

  renderStatusBar(percent = 0) {
    this.statusBar.removeAttribute('style');
    this.statusBar.setAttribute('style', `background: linear-gradient(to right, rgba(255,255,255, 1) ${percent}%, rgba(255,255,255, 0.2) ${percent}%);`);
  };

  renderKeyboardControlInfo() {
    this.container.innerHTML = '<div class="savannah-keyboard-info">Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ</div>';
  }
}

export default SavannahGameFooter;
