import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import Router from './router/router';

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();

function mainPage() {
  document.querySelector('.container-fluid').style.background = 'yellow';
}
function wordsPage () {
  document.querySelector('.container-fluid').style.background = 'green';
}

const loadPage = {
  mainPage,
  wordsPage,
}

const router = new Router(loadPage);
router.init();



