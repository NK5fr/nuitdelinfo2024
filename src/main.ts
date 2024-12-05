import startCaptcha from "./captcha.ts";

const captcha = document.querySelector('.captcha');

const standardDimensions = {
    width: 1920,    
    height: 1080
};

startCaptcha(captcha!);

const content = document.querySelector('.content') as HTMLDivElement;

content.style.width = '100%';
content.style.height = '3000px';

const humanSchema = document.querySelector('.human-schema') as HTMLDivElement;

humanSchema.style.height = content.style.height;

document.addEventListener('click', (e: MouseEvent) => {
    const x = Math.round(e.x/standardDimensions.width * 100);
    const y = Math.round(e.y/standardDimensions.height * 100);
    console.log(x, y);
    console.log(window.scrollX, window.scrollY);
});
