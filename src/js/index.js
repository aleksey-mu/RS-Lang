import Router from './router/router';

function mainPage() {
  document.body.style.background = 'lightblue';
}
function trainingPage () {
  document.body.style.background = 'yellow';
}

const router = new Router({mainPage, trainingPage});
router.init();


document.body.addEventListener('click', (e) => {
  router.linkHandler(e);
});
window.addEventListener('popstate', (e) => {
  router.popstateHandler(e);
});

window.addEventListener('load', () => {
  const path = window.location.hash.slice(1);
  router.nav(path);
});

