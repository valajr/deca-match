const FRAMES = {
    'attack': 4,
    'attack_2': 6,
    'climb': 4,
    'death': 8,
    'hurt': 4,
    'idle': 4,
    'jump': 8,
    'pull': 6,
    'run': 6,
    'throw': 4,
    'walk': 6,
    'walk+attack': 6
}

const ANIMATION = {
    'monster': null,
    'player': null
}

function stopAnimation(robot) {
    if(robot === 'player')
        clearInterval(ANIMATION.player);
    else
        clearInterval(ANIMATION.monster);
}

function animation (robot, type) {
    stopAnimation(robot);
    let frameWidth = 32;
    let frames = FRAMES[type];
    let div = document.getElementById(robot);
    let frame = 0;
    div.style.backgroundImage = `url(import/imgs/${robot}_${type}.png)`;
    if(type !== 'attack')
        div.setAttribute('class', 'animation');
    div.classList.add(type);
    ANIMATION[robot] = setInterval(() => {
        let frameOffset = (++frame % frames) * -frameWidth;
        div.style.backgroundPosition = frameOffset +"px 0px";}, 100);
}

function returnBack(robot) {
    let div = document.getElementById(robot);
    animation(robot, 'walk');
    div.classList.add('back');
    setTimeout(() => {
        animation(robot, 'idle');
    }, 2000);
}

function attackEnemy(robot) {
    animation(robot, 'walk');
    setTimeout(() => {
        animation(robot, 'attack');
        if(robot === 'player') {
            animation('monster', 'hurt');
            setTimeout(() => {
                animation('monster', 'idle');
                returnBack(robot);
            }, 400);
        }
        else {
            animation('player', 'hurt');
            setTimeout(() => {
                animation('player', 'idle');
                returnBack(robot);
            }, 400);
        }
    }, 2000);
}