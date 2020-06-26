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

const router = new Router({mainPage, wordsPage});
router.init();

document.getElementById('burg-nav').addEventListener('click', router.linkHandler.bind(router));
window.addEventListener('popstate', router.popstateHandler.bind(router));

window.addEventListener('load', () => {
  const path = window.location.hash.slice(1);
  router.nav(path);
});

