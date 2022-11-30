const board = document.getElementsByClassName('board')[0];

animation('player', 'idle');
animation('monster', 'idle');
let timer;

createBoard(8, 8);
let tiles = document.getElementsByClassName('tile');
for(let i = 0; i < tiles.length; i++)
    dragElement(tiles[i]);

let last_move = null;

function startTimer(time=0) {
    let max = timer_bar.getAttribute('max');
    const TIMER_INTERVAL = 10;

    timer_bar.classList.remove('expired');
    timer_bar.setAttribute('value', 0);

    timer = setInterval(() => {
        if(time < max) {
            time += TIMER_INTERVAL;
            timer_bar.setAttribute('value', time);
        }
        else if(time == max) {
            timer_bar.classList.add('expired');
            enemyTurn();
            clearInterval(timer);
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(timer);
}

function restartTimer() {
    startTimer(timer_bar.getAttribute('value'));
}


let timer_bar = document.getElementById('timerBar');
startTimer();