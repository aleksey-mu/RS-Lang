export default class PromoPage {
  constructor() {
    this.Main = document.querySelector(".main");
  }

  init() {
    this.clear();
    this.createPromoPage();
  }

  clear() {
    this.Main.innerHTML = "";
    document.querySelector(".loading-bar").classList.add("hider");
  }

  createPromoPage() {
    this.promoPageWrapper = document.createElement("div");
    this.promoPageWrapper.setAttribute("class", "promo-page__wrapper");
    this.wrapperTemp = `    
<div class="promo-header">
  <h2>
    Наслаждайся обучением с
    <span class="promo-logo"
      >EN-<span class="logo__letter-J">J</span>o<span
        class="logo__letter-Y"
        >y</span
      ></span
    >
  </h2>
</div>
<div class="promo-reason__block">
  <div class="promo-reason-confused">
    <p>
      11 лет изучения в школе, 5 лет в университете, а в голове
      осталось только «London is the capital of Great Britain»?
    </p>
    <span class="confused-img"></span>
  </div>

  <p>
    Если это про тебя, то не спеши вешать нос, так как у нас есть
    решение как расширить словарный запас без нудного сидения за
    партой и зубрёжки.
  </p>
  <p>
    Если же ты Гуру в английском, проверь себя и пройди без ошибок все
    уровни наших игр.
  </p>
</div>
<div class="promo-propose__block">
  <p>
    Хватит уныло ждать перевода любимых сериалов — расширяй границы и
    смотри в оригинале!
  </p>
  <p>
    <span class="question-img"></span>
    Играешь на европейском сервере, но не понимаешь и половины из
    разговоров своей команды — играй в наши мини-игры и пополняй свой
    словарный запас!
  </p>
  <p>
    Сидишь ли ты в очереди в поликлинику, едешь на работу/учебу или
    просто скучаешь — это приложение для тебя. Наши яркие
    увлекательные мини-игры не только поднимут настроение, но и
    помогут с запоминанием сложных слов.
    <span class="unicorn-img"></span>
  </p>
</div>
<div class="promo-game__block">
  <p class="promo-game__header">
    Смело переходи в раздел <span>«Тренировка»</span>, выбирай одну из
    наших игр и развлекайся!
  </p>
  <div class="promo-game__list">
    <div>
      <p>
          <span class="sonic-gif"></span>
        Переключи мозги в форсажный режим — сыграй в
        <span>«Спринт»</span>
      </p>
      
    </div>
    <div>
      <p>
        Не только тренировка произношения, но и наработка навыка
        скручивания языка в трубочку с игрой <span>«SpeakIt»</span>
      </p>
    </div>
    <div>
      <p>
        Защити территорию своего прайда от словарных хищников в
        <span>«Саванне»</span>
      </p>
    </div>
  </div>
</div>
<div class="promo-additional__block">
  <p>
    Раздел <span>«Настройки»</span>  поможет создать комфортные условия обучения
  </p>
  <p> <span>«Статистика»</span>  позволит следить за прогрессом</p>
  <span class="statistics-img"></span>
</div>
<div class="promo-aboutUs__block">
  <p>Хочешь познакомиться?</p>
  <p>Тогда кликай на раздел <span>«Наша Команда»</span></p>
</div>`;

    this.promoPageWrapper.innerHTML = this.wrapperTemp;
    this.Main.append(this.promoPageWrapper);
  }
}
