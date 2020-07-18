import LearningCard from './LearningCard';

class DeletedWords extends LearningCard {
  constructor(wordObject, asyncRestoreWordFunc) {
    super(wordObject);
    this.asyncRestoreWordFunc = asyncRestoreWordFunc;
  }

  renderDate(lastStudy) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dataString = new Date(Number(lastStudy)).toLocaleDateString('ru-RU', options);

    this.date = document.createElement('div');
    this.date.classList.add('dictionary-page-card-date');
    this.date.innerHTML = `<div class="dictionary-page-card-date-description">дата удаления: ${dataString}</div>`;

    this.restoreButton = document.createElement('div');
    this.restoreButton.classList.add('dictionary-page-card-restore-button', 'btn', 'btn-primary');
    this.restoreButton.innerText = 'Восстановить';
    this.restoreButton.addEventListener('click', () => {
      this.asyncRestoreWordFunc().then(() => {
        this.cardContainer.remove();
      });
    })
    this.date.appendChild(this.restoreButton);
  }
}

export default DeletedWords;
