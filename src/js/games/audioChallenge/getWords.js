import GamePage from "./createGamePage";

export default class GetWords{
    constructor(){
        this.GamePage = new GamePage();
    }
   
    async getWordsSet(round, difficulty) {           
        this.url = `https://afternoon-falls-25894.herokuapp.com/words?page=${round-1}&group=${
            difficulty - 1
        }`;
        const res = await fetch(this.url);
        const json = await res.json();
        const recievedJSON = JSON.stringify(json, null, 1);
        const recievedData = JSON.parse(recievedJSON);
        this.GamePage.createGameElements(recievedData);       
    }

    async getWordDetalization (word) {
        console.log(word);
        this.urlDetail = `https://dictionary.skyeng.ru/api/public/v1/words/search?search=${word}`;
        const rawResponse = await fetch(this.urlDetail);      
        const content = await rawResponse.json();      
        console.log(content);
        return content;
      };
      
      
}