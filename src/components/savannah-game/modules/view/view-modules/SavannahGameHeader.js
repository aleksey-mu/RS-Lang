class SavannahGameHeader {
  constructor(healthAmount, healtIconPath = '', emptyHealthIconPath = '', musicIconPath = '', musicOffIconPath = ' ', quitIconPath = '', quitButtonListener) {
    this.healthAmount = healthAmount;
    this.healthIconMapping = {
      healtIconPath: {
        src: healtIconPath,
        alt: 'health',
        class: 'icon-unbroken',
      },
      emptyHealthIconPath: {
        src: emptyHealthIconPath,
        alt: 'empty-health',
        class: 'icon-broken',
      },
    }
    this.musicIconMapping = {
      on: {
        src: musicIconPath,
      },
      off: {
        src: musicOffIconPath,
      }
    }
    this.quitIconPath = quitIconPath;

    this.container = document.createElement('div');
    this.container.classList.add('game-header', 'savannah-game-container');

    this.leftPanel = document.createElement('div');
    this.leftPanel.classList.add('left-panel');

    this.rightPanel = document.createElement('div');
    this.rightPanel.classList.add('right-panel');

    this.musicButton = document.createElement('div');
    this.musicButton.classList.add('music-button');

    this.healtBar = document.createElement('div');
    this.healtBar.classList.add('health-bar');

    this.quitButton = document.createElement('div');
    this.quitButton.classList.add('quit-button');
    this.quitButton.addEventListener('click', quitButtonListener);


    this.container.appendChild(this.leftPanel);
    this.container.appendChild(this.rightPanel);
    this.leftPanel.appendChild(this.musicButton);
    this.rightPanel.appendChild(this.healtBar);
    this.rightPanel.appendChild(this.quitButton);
  }

  render() {
    return this.container;
  }

  renderMusicButton(volumeStatus, musicButtonHandler) {
    [...this.musicButton.childNodes].map((node) => node.remove());

    return new Promise((resolve, reject) => {
      const musicIcon = document.createElement('img');
      const musicIconPath = this.musicIconMapping[volumeStatus].src;
  
      musicIcon.setAttribute('src', musicIconPath);
      musicIcon.setAttribute('alt', 'music icon');
      musicIcon.addEventListener('click', musicButtonHandler);
  
      musicIcon.onload = () => {
        resolve(musicIcon)
      };
  
      musicIcon.onerror = () => {
        reject(new Error('cant load music icon'));
      };
    }).then((icon) => {
        this.musicButton.appendChild(icon);
    });
  }

  renderHealth(icon = 'healtIconPath') {
    return new Promise((resolve, reject) => {
      const health = document.createElement('div');
      const healthIcon = document.createElement('img');
      const iconPath = this.healthIconMapping[icon].src;
      const iconAlt = this.healthIconMapping[icon].alt;
      const iconClass = this.healthIconMapping[icon].class;

      health.appendChild(healthIcon);
      health.classList.add('health');
      healthIcon.classList.add(iconClass);
      healthIcon.setAttribute('src', iconPath);
      healthIcon.setAttribute('alt', iconAlt);

      healthIcon.onload = () => {
        resolve(health);
      };

      healthIcon.onerror = () => {
        reject(new Error('cant load health icon'));
      };
    });
  }

  clearHealthBar() {
    [...this.healtBar.childNodes].map((node) => node.remove());
  }

  renderHealthBar(currentHealth) {
    this.clearHealthBar();
    
    const healthLost = this.healthAmount - currentHealth;
    const renderHealths = new Array(this.healthAmount)
      .fill('')
      .map((el, index) => index < healthLost
        ? this.renderHealth('emptyHealthIconPath')
        : this.renderHealth('healtIconPath'));

    return Promise.all(renderHealths).then((healths) => {
      healths.map((health) => this.healtBar.appendChild(health));
    });
  }

  renderQuitButton() {
    return new Promise((resolve, reject) => {
      const quitIcon = document.createElement('img');

      quitIcon.setAttribute('src', this.quitIconPath);
      quitIcon.setAttribute('alt', 'quit icon');

      quitIcon.onload = () => {
        resolve(quitIcon)
      };

      quitIcon.onerror = () => {
        reject(new Error('cant load quit icon'));
      };
    }).then((icon) => {
      this.quitButton.appendChild(icon);
    });
  }
}

export default SavannahGameHeader;
