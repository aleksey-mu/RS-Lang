export default class ACgameSettings {
  init() {
    this.createSettingsModal();
    document.querySelector("#ACsetGameBtn").addEventListener("click", (e) => {
      e.preventDefault();

      this.openModal();
    });
    this.ModalCloseBtn = document.querySelector(".modal__cross");
    this.ModalCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeModal();
    });
    this.ModalOverlay = document.querySelector(".ACoverlay");
    this.ModalOverlay.addEventListener("click", () => {
      this.closeModal();
    });
  }

  createSettingsModal() {
    this.SettingsModal = document.createElement("div");
    this.SettingsModal.setAttribute("class", "Setmodal");
    this.SettingsModal.innerHTML = `<div class="ACsettingsModal ACmodal">   
<svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg"  
viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 
9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
<p class="modal__title">Настройки игры:</p>
<input type="checkbox" id="ACmodeSelect">
  <label for="ACmodeSelect">Использовать слова на изучении</label><br>
<div class="difficulty">
<p >Уровень сложности: </p>
<select id = "difficulty-level">
<option value = "1">1</option>
<option value = "2">2</option>
<option value = "3">3</option>
<option value = "4">4</option>
<option value = "5">5</option>
<option value = "6">6</option>
</select>
</div>
<div class="round">
<p>Раунд:</p>
<select id = "round-level">
<option  value = "1">1</option>
<option  value = "2">2</option>
<option  value = "3">3</option>
<option  value = "4">4</option>
<option  value = "5">5</option>
<option  value = "6">6</option>
<option  value = "7">7</option>
<option  value = "8">8</option>
<option  value = "9">9</option>
<option  value = "10">10</option>
<option  value = "11">11</option>
<option  value = "12">12</option>
<option  value = "13">13</option>
<option  value = "14">14</option>
<option  value = "15">15</option>
<option  value = "16">16</option>
<option  value = "17">17</option>
<option  value = "18">18</option>
<option  value = "19">19</option>
<option value = "20">20</option>
<option>21</option>
<option>22</option>
<option>23</option>
<option>24</option>
<option>25</option>
<option>26</option>
<option>27</option>
<option>28</option>
<option>29</option>
<option>30</option>
</select>
</div>
<div>
<button id= "ACmodalApplyBtn">Применить</button>
</div>
</div>
<div class="ACoverlay AC-overlay-modal"></div>`;
    document.querySelector("main").append(this.SettingsModal);
  }

  openModal() {
    this.ACmodalSettings = document.querySelector(".ACsettingsModal");
    this.ACoverlayModal = document.querySelector(".AC-overlay-modal");
    this.ACmodalSettings.classList.add("ModalActive");
    this.ACoverlayModal.classList.add("ModalActive");
  }

  closeModal() {
    this.ACmodalSettings.classList.remove("ModalActive");
    this.ACoverlayModal.classList.remove("ModalActive");
    // const a = document.querySelectorAll(".Setmodal");
    // const b = a.length;
    // while(b>1){
    // a[b -1].remove();
    // }
  }
}
