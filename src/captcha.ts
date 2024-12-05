let count = 0;
let distance = 0;

function generateCaptcha(captcha:Element) {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += '<tr>';
        for (let j = 0; j < 8; j++) {
            result += `<td class="cell position-${i}-${j}"></td>`;
        }
        result += '</tr>';
    }
    captcha!.innerHTML = result;
}

function initShark(captcha:Element) {
    const i = Math.floor(Math.random() * 6);
    const j = Math.floor(Math.random() * 8);
    const cell = captcha.querySelector(`.position-${i}-${j}`);
    cell!.innerHTML = '&#129416;';
    cell!.classList.add('shark');
}

function initExit(captcha:Element) {
    const shark = captcha.querySelector('.shark');
    const x = shark!.className.split(' ')[1].split('-')[1];
    const y = shark!.className.split(' ')[1].split('-')[2];
    let i = Math.floor(Math.random() * 6);
    let j = Math.floor(Math.random() * 8);
    while(i == parseInt(x) && j == parseInt(y)) {
        i = Math.floor(Math.random() * 6);
        j = Math.floor(Math.random() * 8);
    }
    const cell = captcha.querySelector(`.position-${i}-${j}`);
    cell!.innerHTML = '&#128032;';
    cell!.classList.add('exit');
}

function neighbors(x:number, y:number, i:number, j:number) {
    return Math.abs(x - i) + Math.abs(y - j) === 1;
}

function move(captcha:Element, cell:Element) {
    const shark = captcha.querySelector('.shark');
    const i = shark!.className.split(' ')[1].split('-')[1];
    const j = shark!.className.split(' ')[1].split('-')[2];
    const x = cell.className.split(' ')[1].split('-')[1];
    const y = cell.className.split(' ')[1].split('-')[2];
    let win = false;
    if(neighbors(parseInt(x), parseInt(y), parseInt(i), parseInt(j))) {
        shark!.innerHTML = '';
        shark!.classList.remove('shark');
        if(cell.classList.contains('exit')) win = true
        cell.innerHTML = '&#129416;';
        cell.classList.add('shark');
        count++;
    }
    if(win){
        captcha.setAttribute('style', 'display: none');
        const main = document.querySelector('main');
        main?.setAttribute('style', 'display: block');
    }else if(count >= distance) {
        startCaptcha(captcha);
    }
};

function setDistance(captcha:Element) {
    const shark = captcha.querySelector('.shark');
    const i = shark!.className.split(' ')[1].split('-')[1];
    const j = shark!.className.split(' ')[1].split('-')[2];
    const exit = captcha.querySelector('.exit');
    const x = exit!.className.split(' ')[1].split('-')[1];
    const y = exit!.className.split(' ')[1].split('-')[2];
    distance = Math.abs(parseInt(x) - parseInt(i)) + Math.abs(parseInt(y) - parseInt(j));
}

const startCaptcha = (captcha:Element) => {
    count = 0;
    generateCaptcha(captcha);
    initShark(captcha);
    initExit(captcha);
    setDistance(captcha);
    const cells = captcha.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', (event:Event) => {
            event.preventDefault();
            console.log('clicked');
            move(captcha, cell);
        });
    });
}

export default startCaptcha;