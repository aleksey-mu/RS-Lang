const createWordTranslateElement = (word, listener) => {
  const wordElement = document.createElement('div');
  wordElement.classList.add('word-rus');
  wordElement.addEventListener('click', listener);

  const wordText = document.createElement('div');
  wordText.classList.add('word-text');
  wordText.innerText = word;

  wordElement.appendChild(wordText);
  return wordElement;
};

const shuffleElements = (elements) => {
  const newOrder = new Array(elements.length)
    .fill('').map((el, index) => index);

  for (let i = newOrder.length - 1; i > 0; i -= 1) {
    const pseudoRandom = Math.floor(Math.random()*(i + 1));
    [newOrder[pseudoRandom], newOrder[i]] = [newOrder[i], newOrder[pseudoRandom]];
  }

  return elements.map((el, index) => {
    el.setAttribute('style', `order: ${newOrder[index]};`);
    el.setAttribute('data-order', newOrder[index] + 1);
    return el;
  });
};

class SavannahGameWordsContainer {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('game-middle-container', 'savannah-game-container');
  }

  render() {
    return this.container;
  }

  clearContainer() {
    [...this.container.childNodes].map((node) => node.remove());
  }

  renderTranslateOptions(rightTranslate, wrongTranslates, rightAnswerListener, wrongAnswerListener) {
    this.clearContainer();

    const rightTranslateElement = createWordTranslateElement(rightTranslate, rightAnswerListener);
    const wrongTranslateElements = [...wrongTranslates].map(({ word }) => createWordTranslateElement(word, wrongAnswerListener));

    rightTranslateElement.setAttribute('data-answer', 'correct');
    wrongTranslateElements.map((el) => el.setAttribute('data-answer', 'wrong'));

    const shuffleTranslateElements = shuffleElements([rightTranslateElement, ...wrongTranslateElements]);

    shuffleTranslateElements.map((wordElement) => this.container.appendChild(wordElement));
  }

  renderStartScreen(startButtonListener, settingsButtonListener) {
    this.clearContainer();

    const startContainer = document.createElement('div');
    startContainer.classList.add('start-description');

    const startButton = document.createElement('div');
    startButton.classList.add('start-button');
    startButton.innerText = 'НАЧАТЬ';
    startButton.addEventListener('click', startButtonListener);

    const settingsButton = document.createElement('div');
    settingsButton.classList.add('settings-button');
    settingsButton.innerText = 'НАСТРОЙКИ';
    settingsButton.addEventListener('click', settingsButtonListener);

    const heading = document.createElement('div');
    heading.classList.add('heading');
    heading.innerText = 'САВАННА';

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerText = 'Тренировка Саванна проверяет словарный запас. \nПо умолчанию в игре используются изученные слова, но вы можете поменять это в настройках.';

    this.container.appendChild(startContainer);
    [heading, description, settingsButton, startButton].map((elements) => startContainer.appendChild(elements));
  }

  renderCountdown(countdownEndListener) {
    this.clearContainer();

    const defaultInterval = 1000;
    let countdownInitNumber = 3;
    const countdown = document.createElement('div');
    const countdownNumber = document.createElement('div');
    const countDownAnimation = document.createElement('div');
    const countdownHtml = `
      <div class="gem-parts-3"></div>
      <div class="gem-parts-2"></div>
      <div class="gem-parts-1"></div>`;

    countdown.classList.add('countdown');
    countdownNumber.classList.add('countdown-number');
    countDownAnimation.classList.add('gem-circle');
    countDownAnimation.innerHTML = countdownHtml;
    countDownAnimation.appendChild(countdownNumber);

    const intervalID = setInterval(() => {
      if (countdownInitNumber <= 0) {
        clearInterval(intervalID);
        countdownEndListener();
      }
      countdownNumber.innerText = countdownInitNumber;
      countdownInitNumber -= 1;
    }, defaultInterval);

    countdown.appendChild(countDownAnimation);
    this.container.appendChild(countdown);
  }

  renderLoading() {
    this.clearContainer();

    const countdown = document.createElement('div');
    const countdownNumber = document.createElement('div');
    const countDownAnimation = document.createElement('div');
    const countdownHtml = `
      <div class="gem-parts-3"></div>
      <div class="gem-parts-2"></div>
      <div class="gem-parts-1"></div>`;

    countdown.classList.add('countdown');
    countdownNumber.classList.add('countdown-number');
    countDownAnimation.classList.add('gem-circle');
    countDownAnimation.innerHTML = countdownHtml;
    countDownAnimation.appendChild(countdownNumber);

    countdown.appendChild(countDownAnimation);
    this.container.appendChild(countdown);
  }
}

export default SavannahGameWordsContainer;
