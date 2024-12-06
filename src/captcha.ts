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

function setCell(captcha:Element, content:string, className:string) {
    let i = Math.floor(Math.random() * 6);
    let j = Math.floor(Math.random() * 8);
    let cell = captcha.querySelector(`.position-${i}-${j}`);
    while(cell!.innerHTML !== '') {
        i = Math.floor(Math.random() * 6);
        j = Math.floor(Math.random() * 8);
        cell = captcha.querySelector(`.position-${i}-${j}`);
    }
    cell!.innerHTML = content;
    cell!.classList.add(className);
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
    if(neighbors(parseInt(x), parseInt(y), parseInt(i), parseInt(j)) && !cell.classList.contains('wall')) {
        shark!.innerHTML = '';
        shark!.classList.remove('shark');
        if(cell.classList.contains('exit')) win = true
        cell.innerHTML = '&#129416;';
        cell.classList.add('shark');
        count++;
    }
    if(win){
        const captchaDiv = document.querySelector('.captcha-div');
        captchaDiv!.innerHTML = '';
        const main = document.querySelector('.main');
        main!.setAttribute('style', 'display: flex');
        sessionStorage.setItem('captcha', 'true');
    }else if(count >= distance) {
        console.log(count, distance);
        startCaptcha(captcha);
    }
    const counter = document.querySelector('.captcha-div p');
    counter!.innerHTML = `Vous avez ${distance - count} coup pour réussir`;
};

function aStar() {
    const s = document.querySelector('.shark');
    const e = document.querySelector('.exit');

    // Coordonnées de départ et d'arrivée
    const start = {
        x: parseInt(s!.className.split(' ')[1].split('-')[1]),
        y: parseInt(s!.className.split(' ')[1].split('-')[2]),
        g: 0 // Coût pour arriver ici
    };
    const exit = {
        x: parseInt(e!.className.split(' ')[1].split('-')[1]),
        y: parseInt(e!.className.split(' ')[1].split('-')[2])
    };

    const queue = [start]; // File de priorité (ouverte)
    const visited = new Set<string>(); // Ensemble des positions visitées
    const directions = [
        { dx: -1, dy: 0 }, // Haut
        { dx: 1, dy: 0 },  // Bas
        { dx: 0, dy: -1 }, // Gauche
        { dx: 0, dy: 1 }   // Droite
    ];

    // Fonction heuristique : distance de Manhattan
    const heuristic = (x: number, y: number) => Math.abs(x - exit.x) + Math.abs(y - exit.y);

    while (queue.length > 0) {
        // Trier la file par priorité (g + h)
        queue.sort((a, b) => (a.g + heuristic(a.x, a.y)) - (b.g + heuristic(b.x, b.y)));

        const current = queue.shift(); // Extraire le noeud avec le plus petit coût

        if (!current) break; // Sécurité

        // Vérifier si on est à la sortie
        if (current.x === exit.x && current.y === exit.y) {
            return current.g; // Retourner le coût pour atteindre la sortie
        }

        // Ajouter la position actuelle aux visités
        visited.add(`${current.x},${current.y}`);

        // Ajouter les voisins valides
        for (const dir of directions) {
            const nx = current.x + dir.dx;
            const ny = current.y + dir.dy;

            // Vérifier si la position est valide
            if (
                nx >= 0 && nx < 6 && ny >= 0 && ny < 8 && // Limites du tableau
                !visited.has(`${nx},${ny}`) && // Non visité
                document.querySelector(`.position-${nx}-${ny}`)?.classList.contains('wall') === false // Pas un mur
            ) {
                queue.push({ x: nx, y: ny, g: current.g + 1 });
            }
        }
    }

    return -1;
}


const startCaptcha = (captcha:Element) => {
    count = 0;
    generateCaptcha(captcha);
    for (let i = 0; i < 10; i++) setCell(captcha, '&#8203;', 'wall');
    setCell(captcha, '&#129416;', 'shark');
    setCell(captcha, '&#128032;', 'exit');
    const counter = document.querySelector('.captcha-div p');
    distance = aStar();
    counter!.innerHTML = `Vous avez ${distance} coup pour réussir`;
    while(distance == -1) {
        generateCaptcha(captcha);
        for (let i = 0; i < 10; i++) setCell(captcha, '&#8203;', 'wall');
        setCell(captcha, '&#129416;', 'shark');
        setCell(captcha, '&#128032;', 'exit');
        distance = aStar();
        counter!.innerHTML = `Vous avez ${distance} coup pour réussir`;
    }
    const cells = captcha.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', (event:Event) => {
            event.preventDefault();

            move(captcha, cell);
        });
    });
}

export default startCaptcha;