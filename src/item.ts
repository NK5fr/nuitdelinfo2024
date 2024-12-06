import OpenButton from "./openButton.ts";

export default class Item {
    constructor(public openButton: OpenButton, public closeButton: HTMLButtonElement, public himself: HTMLDivElement) {
        this.openButton = openButton;
        this.closeButton = closeButton;
        this.himself = himself;

        openButton.himself.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            himself.style.display = himself.style.display == 'flex' ? 'none' : 'flex';
            console.log('clicked');
        });

        closeButton.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            himself.style.display = 'none';
        });
    }


}