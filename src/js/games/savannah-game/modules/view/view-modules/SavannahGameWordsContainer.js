const createWordTranslateElement = (word, listener) => {
  const wordElement = document.createElement('div');
  wordElement.classList.add('savannah-word-rus');
  wordElement.addEventListener('click', listener);

  const wordText = document.createElement('div');
  wordText.classList.add('savannah-word-text');
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
    const wordText = el.querySelector('.savannah-word-text');
    wordText.innerText = `${newOrder[index] + 1}. ${wordText.innerText}`;
    return el;
  });
};

class SavannahGameWordsContainer {
  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('savannah-game-middle-container', 'savannah-game-container');
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
    const wordsContainer = document.createElement('div');
    wordsContainer.classList.add('savannah-word-container');

    shuffleTranslateElements.map((wordElement) => wordsContainer.appendChild(wordElement));
    this.container.appendChild(wordsContainer);
  }

  renderStartScreen(startButtonListener, settingsButtonListener) {
    this.clearContainer();

    const startContainer = document.createElement('div');
    startContainer.classList.add('savannah-start-description');

    const startButton = document.createElement('div');
    startButton.classList.add('savannah-start-button', 'btn', 'btn-primary');
    startButton.innerText = 'Старт';
    startButton.addEventListener('click', startButtonListener);

    const settingsButton = document.createElement('div');
    settingsButton.classList.add('savannah-settings-button', 'btn', 'btn-primary');
    settingsButton.innerText = 'Настройки';
    settingsButton.addEventListener('click', settingsButtonListener);

    const heading = document.createElement('div');
    heading.classList.add('savannah-heading');
    heading.innerText = 'Добро пожаловать в САВАННУ!';

    const description = document.createElement('div');
    description.classList.add('savannah-description');
    description.innerText = 'Тренировка Саванна проверяет словарный запас. \nПо умолчанию в игре используются изученные слова, но вы можете поменять это в настройках.';

    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(settingsButton);
    buttonContainer.appendChild(startButton);

    this.container.appendChild(startContainer);
    [heading, description, buttonContainer].map((elements) => startContainer.appendChild(elements));
  }

  renderCountdown(countdownEndListener) {
    this.clearContainer();

    const defaultInterval = 1000;
    let countdownInitNumber = 3;
    const countdown = document.createElement('div');
    const countdownNumber = document.createElement('div');
    const countDownAnimation = document.createElement('div');
    const countdownHtml = `
      <div class="savannah-gem-parts-3"></div>
      <div class="savannah-gem-parts-2"></div>
      <div class="savannah-gem-parts-1"></div>`;

    countdown.classList.add('savannah-countdown');
    countdownNumber.classList.add('savannah-countdown-number');
    countDownAnimation.classList.add('savannah-gem-circle');
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
      <div class="savannah-gem-parts-3"></div>
      <div class="savannah-gem-parts-2"></div>
      <div class="savannah-gem-parts-1"></div>`;

    countdown.classList.add('savannah-countdown');
    countdownNumber.classList.add('savannah-countdown-number');
    countDownAnimation.classList.add('savannah-gem-circle');
    countDownAnimation.innerHTML = countdownHtml;
    countDownAnimation.appendChild(countdownNumber);

    countdown.appendChild(countDownAnimation);
    this.container.appendChild(countdown);
  }
}

export default SavannahGameWordsContainer;
