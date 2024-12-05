import startCaptcha from "./captcha.ts";

const captcha = document.querySelector('.captcha');

startCaptcha(captcha!);

const humanSchema = document.querySelector('.human-schema');

document.addEventListener('resize', () => {
    humanSchema!.style.height = `${humanSchema!.scrollHeight}px`;
});