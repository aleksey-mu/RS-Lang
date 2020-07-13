class SavannahGameDropElement {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('drop-element', 'savannah-game-container', 'drop-animation');
  }

  clearContainer() {
    [...this.container.childNodes].map((node) => node.remove());
  }

  render() {
    return this.container;
  }

  renderDropElement(engWord) {
    this.clearContainer();

    const dropElement = document.createElement('div');
    dropElement.classList.add('word-eng');

    const dropElementText = document.createElement('div');
    dropElementText.classList.add('word-text');
    dropElementText.innerText = engWord;
    
    dropElement.appendChild(dropElementText);
    this.container.appendChild(dropElement);
  }
}

export default SavannahGameDropElement;
