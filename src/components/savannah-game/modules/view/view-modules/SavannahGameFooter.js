const gemInnerHtml = `
  <div class="gem-move">
    <div class="gem-bg">
      <div class="gem-bg-inner"></div>
    </div>
    <div class="gem-img">
      <i class="gem-img-1 gem-imgs"></i>
      <i class="gem-img-2 gem-imgs"></i>
      <i class="gem-img-3 gem-imgs"></i>
      <i class="gem-img-4 gem-imgs"></i>
    </div>
  </div>
  <div class="gem-circle">
    <div class="gem-parts-3"></div>
    <div class="gem-parts-2"></div>
    <div class="gem-parts-1"></div>
  </div>
  <div>
    <div class="gem-point-1 gem-point"></div>
    <div class="gem-point-2 gem-point"></div>
    <div class="gem-point-3 gem-point"></div>
    <div class="gem-point-4 gem-point"></div>
    <div class="gem-point-5 gem-point"></div>
    <div class="gem-point-6 gem-point"></div>
    <div class="gem-point-7 gem-point"></div>
    <div class="gem-point-8 gem-point"></div>
    <div class="gem-point-9 gem-point"></div>
    <div class="gem-point-10 gem-point"></div>
  </div>`;

class SavannahGameFooter {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('game-footer', 'container');
    
    this.statusManagement = document.createElement('div');
    this.statusManagement.classList.add('status-management');

    this.gem = document.createElement('div');
    this.gem.classList.add('gem');

    this.statusBar = document.createElement('div');
    this.statusBar.classList.add('status-bar');

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

  renderStatusBar(percent = 0) {
    this.statusBar.removeAttribute('style');
    this.statusBar.setAttribute('style', `background: linear-gradient(to right, rgba(255,255,255, 1) ${percent}%, rgba(255,255,255, 0.2) ${percent}%);`);
  };

  renderKeyboardControlInfo() {
    this.container.innerHTML = '<div class="keyboard-info">Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ</div>';
  }
}

export default SavannahGameFooter;
