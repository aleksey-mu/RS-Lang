import '../style/style.scss';
import BurgerMenu from './header/burgerMenu';
import PageGameSprintComponent from './games/sprint/PageGameSprintComponent';

const myBurgerMenu = new BurgerMenu();
myBurgerMenu.init();
document.querySelector('.container-fluid').insertAdjacentElement('beforeend', new PageGameSprintComponent().init());

