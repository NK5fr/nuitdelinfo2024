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

const startCaptcha = (captcha:Element) => {
    generateCaptcha(captcha);
}

export default startCaptcha;