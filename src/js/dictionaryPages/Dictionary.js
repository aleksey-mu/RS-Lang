class Dictionary {
  constructor(selector) {
    this.mainContainer = document.querySelector(selector);
    this.clearMainContainer();

    this.dictionaryPagesContainer = document.createElement('div');
    this.dictionaryPagesContainer.innerHTML = '<div class="dictionary-pages-heading">СЛОВАРЬ</div>';
    this.dictionaryPagesContainer.classList.add('dictionary-pages-container');

    this.dictionaryPageHeadingMenu = document.createElement('div');
    this.dictionaryPageHeadingMenu.classList.add('dictionary-page-heading-menu');
  
    this.dictionaryPagesContainer.appendChild(this.dictionaryPageHeadingMenu);
    this.mainContainer.appendChild(this.dictionaryPagesContainer);

    this.state = {
      currentPage: '',
    };
  }

  createPage(pageName) {
    const page = document.createElement('div');
    page.classList.add('dictionary-page-learned-words');

    this[pageName] = page;
    this.dictionaryPagesContainer.appendChild(this[pageName]);
  }

  createHeading(page, text, hash) {
    const heading = document.createElement('div');
    const headingLink = document.createElement('div');
    const headingName = `${page}Heading`;

    heading.classList.add('dictionary-page-heading');
    headingLink.classList.add('burger-menu-link');
    headingLink.innerHTML = `<a>${text}</a>`;

    headingLink.addEventListener('click', () => {
      window.location.hash = hash;
    });

    heading.appendChild(headingLink);
    this[headingName] = heading;
    this.dictionaryPageHeadingMenu.appendChild(this[headingName]);
  }

  clearMainContainer() {
    [...this.mainContainer.childNodes].map((node) => node.remove());
  }

  clearDictionaryPageHeadingMenu() {
    [...this.dictionaryPageHeadingMenu.childNodes].map((node) => node.remove());
  }

  setPage(page) {
    this.state.currentPage = page;
    this.render();
  }

  render() {
    const headingName = `${this.state.currentPage}Heading`;

    this.clearDictionaryPageHeadingMenu();

    this.createHeading('learningWords', 'НА ИЗУЧЕНИИ', '/dictionary/learning_words/');
    this.createHeading('complexWords', 'СЛОЖНЫЕ', '/dictionary/complex_words/');
    this.createHeading('deletedWords', 'УДАЛЕННЫЕ', '/dictionary/deleted_words/');

    this.createPage(this.state.currentPage);
  
    this[this.state.currentPage].innerText = 1;
    this[headingName].querySelector('.burger-menu-link > a').classList.add('dictionary-page-heading-menu-active');
  }
}

export default Dictionary;
