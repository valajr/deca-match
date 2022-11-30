class Robot {
    constructor(hp, attack=10) {
        this.max_hp = hp;
        this.hp = hp;
        this.attack = attack;
    }
}

const ROBOTS = {
    'player': null,
    'monster': null
}

const FRAMES = {
    'attack': 4,
    'death': 8,
    'hurt': 4,
    'idle': 4,
    'walk': 6,
}

const ANIMATION = {
    'monster': null,
    'player': null
}

let LVL = 0;

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

function defeated(robot) {
    LVL++;
    animation(robot, 'death');
    if(robot === 'monster'){
        setTimeout(()=> {
            stopAnimation(robot);
            let div = document.getElementById(robot);
            div.style.backgroundImage = `url(import/imgs/empty.png)`;
            setTimeout(()=> {
                animation('player', 'walk');
                stopTimer();
                blockBoard();
                board.innerHTML = '';
                let player = document.getElementById('player');
                player.classList.add('wins');
                setTimeout(startGame, 2000);                
            }, 1300);
        }, 800);
    }
    else {
        location.reload();
    }
}

function attack(aggressor, victim) {
    animation(aggressor, 'walk');
    setTimeout(() => {
        animation(aggressor, 'attack');
        animation(victim, 'hurt');
        if(aggressor === 'player')
            ROBOTS.monster.hp -= round_score;
        else
            ROBOTS.player.hp -= ROBOTS.monster.attack;

        setTimeout(() => {
            animation(victim, 'idle');
            returnBack(aggressor);
            if(ROBOTS[victim].hp <= 0)
                defeated(victim);
        }, 400);
    }, 2000);
}

function enemyTurn() {
    attack('monster', 'player');
    
    blockBoard('ouch!');
    setTimeout(()=>{unlockBoard(); startTimer()}, 4400);
}

function createRpg() {
    if(LVL == 0)
        ROBOTS.player = new Robot(50);
    ROBOTS.monster = new Robot(2**(LVL + 5));

    animation('player', 'walk');
    let player = document.getElementById('player');
    player.classList.add('come');
    animation('monster', 'walk');
    let monster = document.getElementById('monster');
    monster.classList.add('come');

    setTimeout(() => {
        animation('player', 'idle');
        animation('monster', 'idle');
        
    }, 2000);
}

