import DictionaryPage from './Dictionary';
import LearningCard from './cards/LearningCard';
import DeletedCard from './cards/DeletedCards';
import loading from '../helpers/loadingBar';

const cardMapping = {
  'learningWords': LearningCard,
  'complexWords': LearningCard,
  'deletedWords': DeletedCard,
}

export default (page, getDataForCardFunction, restoreWordFunc) => {
  const dictionary = new DictionaryPage('.main');
  const CardClass = cardMapping[page];

  dictionary.hide();
  loading.show();

  getDataForCardFunction()
    .then((words) => words.map((word) => new CardClass(word, restoreWordFunc)))
    .then((cards) => {
      dictionary.setPage(page);
      dictionary.setCards(cards);
      loading.hide();
      dictionary.show();
    })
};
