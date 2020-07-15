import StartScreenComponent from "./StartScreenComponent";

export default class PageGameSprintComponent {
  constructor() {
    this.root = document.createElement('div');
  }

  init() {
    this.root.className = 'game-sprint sprint-background';
    this.customizeToSprintGame();
    this.root.insertAdjacentElement('beforeend', new StartScreenComponent(0).init());
    return this.root;
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["customizeToSprintGame"] }] */
  customizeToSprintGame() {
    document.querySelector('.main').innerHTML = '';
    if(document.querySelector('.content h2')) {
      document.querySelector('.content h2').innerHTML ='';
    }
  }
}