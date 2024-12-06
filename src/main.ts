import startCaptcha from "./captcha.ts";
import Item from "./item.ts";
import OpenButton from "./openButton.ts";

const captcha = document.querySelector('.captcha');

const standardDimensions = {
    width: 1920,    
    height: 1080
};

const captchaIsDone = sessionStorage.getItem('captcha');

if (!captchaIsDone) {
    startCaptcha(captcha!);
} else {
    const captchaDiv = document.querySelector('.captcha-div');
    captchaDiv!.innerHTML = '';
    const main = document.querySelector('.main');
    main!.setAttribute('style', 'display: flex');
}

const content = document.querySelector('.content') as HTMLDivElement;

content.style.width = '100%';
content.style.height = '2500px';

const humanSchema = document.querySelector('.human-schema') as HTMLDivElement;

humanSchema.style.height = content.style.height;

document.addEventListener('click', (e: MouseEvent) => {
    const x = Math.round(e.x/standardDimensions.width * 100);
    const y = Math.round(e.y/standardDimensions.height * 100);
    console.log(x, y);
    console.log(window.scrollX, window.scrollY);
});

new OpenButton(document.querySelector('#btn1') as HTMLInputElement, [30, 35], [49]);

new OpenButton(document.querySelector('#btn2') as HTMLInputElement, [25, 30], [25,30]);

new Item(document.querySelector('#btn1') as HTMLButtonElement, document.querySelector('.close') as HTMLButtonElement, document.querySelector('.first') as HTMLDivElement);

