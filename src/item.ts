import OpenButton from "./openButton.ts";
import textualArea from "./textualArea.ts";

export default class Item {
    constructor(public openButton: OpenButton, public closeButton: HTMLButtonElement, public textual: textualArea) {
        this.openButton = openButton;
        this.closeButton = closeButton;
        this.textual = textual;

        openButton.himself.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            const previousActive = document.querySelector('.active');
            if (previousActive) {
                previousActive.classList.remove('active');
            } 
            textual.himself.classList.add('active');
        });

        closeButton.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            textual.himself.classList.remove('active');
        });
    }


}