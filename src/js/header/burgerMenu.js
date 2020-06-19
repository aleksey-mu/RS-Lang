export default class BurgerMenu {
    constructor() {
        this.burgmenu = document.getElementById('burger-menu');
        this.burgbtn = document.getElementById('burg-btn');
        this.burglinks = document.getElementById('burg-nav');
        this.burgOverlay = document.getElementById('overlay');
    }

    init() {        
        this.burgbtn.addEventListener('click', (event) => {
            event.preventDefault();          
            this.switchMenu();
        });
        this.burglinks.addEventListener('click', () => {
            this.burglinks.querySelectorAll('a').forEach(() => this.switchMenu());
        });
        this.burgOverlay.addEventListener('click', () => this.switchMenu());    
    }

    switchMenu() {        
        if (this.burgmenu.classList.contains('burger-menu-active')) {
            this.burgmenu.classList.remove('burger-menu-active');
            document.body.style.overflow = '';
        } else {
            this.burgmenu.classList.add('burger-menu-active');
            document.body.style.overflow = 'hidden';
        }
    }
}
