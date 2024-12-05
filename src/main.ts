const captcha = document.querySelector('.captcha');

function generateCaptcha() {
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += '<tr>';
        for (let j = 0; j < 8; j++) {
            result += '<td class="cell"></td>';
        }
        result += '</tr>';
    }
    captcha!.innerHTML = result;
}

generateCaptcha();