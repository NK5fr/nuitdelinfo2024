import startCaptcha from "./captcha.ts";
import Item from "./item.ts";
import OpenButton from "./openButton.ts";
import textualArea from "./textualArea.ts";

const captcha = document.querySelector('.captcha');

const body = document.querySelector('body') as HTMLBodyElement;
body.style.height = '100vh';

const standardDimensions = {
    width: 1920,    
    height: 1080
};

const captchaIsDone = sessionStorage.getItem('captcha');
const main = document.querySelector('.main') as HTMLDivElement;

if (!captchaIsDone) {
    startCaptcha(captcha!);
} else {
    const captchaDiv = document.querySelector('.captcha-div');
    captchaDiv!.innerHTML = '';
    main!.style.display = 'flex';
    main!.style.height = '2000px';
}

body.style.height = '2000px';

document.addEventListener('click', (e: MouseEvent) => {
    const x = Math.round(e.x/standardDimensions.width * 100);
    const y = Math.round(e.y/standardDimensions.height * 100);
    console.log(x, y);
    console.log(window.scrollX, window.scrollY);
});

const btn1 = new OpenButton(document.querySelector('#btn1') as HTMLInputElement, [14, 16], [49, 52]);
const text1 = new textualArea(document.querySelector('#text1') as HTMLDivElement, [14, 19], [60, 87]);
new Item(btn1, document.querySelector('#text1 > .close') as HTMLButtonElement, text1);

const btn2 = new OpenButton(document.querySelector('#btn2') as HTMLInputElement, [35, 37], [52, 55]);
const text2 = new textualArea(document.querySelector('#text2') as HTMLDivElement, [35, 40], [70, 97]);
new Item(btn2, document.querySelector('#text2 > .close') as HTMLButtonElement, text2);

const btn3 = new OpenButton(document.querySelector('#btn3') as HTMLInputElement, [38, 40], [45, 48]);
const text3 = new textualArea(document.querySelector('#text3') as HTMLDivElement, [38, 43], [7, 34]);
new Item(btn3, document.querySelector('#text3 > .close') as HTMLButtonElement, text3);

const btn4 = new OpenButton(document.querySelector('#btn4') as HTMLInputElement, [52, 54], [45, 48]);
const text4 = new textualArea(document.querySelector('#text4') as HTMLDivElement, [52, 58], [7, 34]);
new Item(btn4, document.querySelector('#text4 > .close') as HTMLButtonElement, text4);

const btn5 = new OpenButton(document.querySelector('#btn5') as HTMLInputElement, [52, 54], [74, 77]);
const text5 = new textualArea(document.querySelector('#text5') as HTMLDivElement, [38, 44], [70, 97]);
new Item(btn5, document.querySelector('#text5 > .close') as HTMLButtonElement, text5);

const btn6 = new OpenButton(document.querySelector('#btn6') as HTMLInputElement, [44, 46], [49, 52]);
const text6 = new textualArea(document.querySelector('#text6') as HTMLDivElement, [39, 45], [60, 87]);
new Item(btn6, document.querySelector('#text6 > .close') as HTMLButtonElement, text6);

const btn7 = new OpenButton(document.querySelector('#btn7') as HTMLInputElement, [84, 86], [37, 40]);
const text7 = new textualArea(document.querySelector('#text7') as HTMLDivElement, [66, 71], [33, 60]);
new Item(btn7, document.querySelector('#text7 > .close') as HTMLButtonElement, text7);



