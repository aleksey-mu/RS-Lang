export default class AboutUsPage {
	constructor() {
		this.PageContainer = document.querySelector('.main');
	}

	init() {
		this.clear();
		this.createPageStructure();
	}

	clear() {
		this.PageContainer.innerHTML = '';
		document.querySelector('.loading-bar').classList.add('hider');
	}

	createPageStructure() {
		this.TeamPageWrapper = document.createElement('div');
		this.TeamPageWrapper.setAttribute('class', 'team-page__wrapper');

		const teamPageTemplate = `<h2>Наша Команда:</h2>
        <div class="team-cards__container">
            <div class = "member__card">
                <img src="./img/AboutUs/boy.jpg" alt="" class="team-member__img">
                <div class ="team-member-name">
    <h3>Алексей(team-lead)</h3>
    <a href="https://github.com/aleksey-mu">@aleksey-mu</a>
    <h4>Москва</h4>
    </div>
    <div class="team-member-info">        
        <p><span>Вклад:</span>
        <ul>
        <li>Реализация мини-игры "SpeakIt"</li>
        <li>Изучение/тренировка</li>      
        <li>Архитектура</li>      
        <li>Регистрация</li>
        <li>Настройки</li>
        </ul>
        </p>
    </div>
            </div>
            <div class = "member__card">
            <img src="./img/AboutUs/nadia.jpg" alt="" class="team-member__img">
            <div class ="team-member-name">
    <h3>Надежда</h3>
    <a href="https://github.com/nadia-marchenko">@nadia-marchenko</a>
    <h4>Минск</h4>
    </div>
    <div class="team-member-info">        
        <p><span>Вклад:</span>
        <ul>
        <li>Реализация мини-игры "Спринт"</li>
        </ul>
        </p>
    </div>
        </div>
        <div class = "member__card">
        <img src="./img/AboutUs/boy.jpg" alt="" class="team-member__img">
        <div class ="team-member-name">
    <h3>Мерген</h3>
    <a href="https://github.com/skaltus">@skaltus</a>
    <h4>Элиста</h4>
    </div>
    <div class="team-member-info">        
        <p><span>Вклад:</span>
        <ul>
        <li>Реализация мини-игры "Саванна"</li>        
        <li>Реализация словаря</li>         
        </ul>
        </p>
    </div>
    </div>
    <div class = "member__card">
    <img src="./img/AboutUs/bulka.jpg" alt="" class="team-member__img">
    <div class ="team-member-name">
    <h3>Полина </h3>
    <a href="https://github.com/20Bulka20">@20Bulka20</a>
    <h4>Минск</h4>
    </div>
    <div class="team-member-info">        
        <p><span>Вклад:</span>
        <ul>
        <li>Header и Menu приложения</li>
        <li>Промо-страница</li>
        <li>Страница о команде</li>
        </ul>
        </p>
    </div>
</div>
<div class = "member__card">
<img src="./img/AboutUs/boy.jpg" alt="" class="team-member__img">
<div class ="team-member-name">
<h3>Григорий</h3>
<a href="https://github.com/grigory-m">@Grigory-m</a>
<h4>Минск</h4>
</div>
<div class="team-member-info">        
    <p><span>Вклад:</span>
    <ul>
    <li>Роутинг страниц</li>        
    </ul>
    </p>
</div>
</div>
<div class = "member__card">
<img src="./img/AboutUs/girl.jpg" alt="" class="team-member__img">
<div class ="team-member-name">
<h3>Валентина</h3>
<a href="https://github.com/walle-eva">@walle-eva</a>
<h4>Новосибирск</h4>
</div>
</div>					
        </div>`;
		this.TeamPageWrapper.innerHTML = teamPageTemplate;
		this.PageContainer.append(this.TeamPageWrapper);
	}
}
