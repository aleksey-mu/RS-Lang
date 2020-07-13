export default class Helper {
  static async fetchPost(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  static getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  static answersToRussian(answer) {
    let str = '';
    if(answer === true) {
      str = 'Верно';
    } else {
      str = 'Неверно';
    }
    return str;
  }
}
