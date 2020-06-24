const getTranslate = async (wordToTranslate) => {
	const TRANSLATECONTAINER = document.querySelector('.translate-container');

	const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200426T175912Z.61d963be79af314f.417d6d47cee46a524c61888ce70f3e828bba5f03&text=${wordToTranslate}&lang=en-ru`;
	const res = await fetch(url);
	const json = await res.json();
	const word = json.text;
	[TRANSLATECONTAINER.innerText] = word;
};

export default getTranslate;
