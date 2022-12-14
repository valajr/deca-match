function startTimer(time=0) {
    let max = timer_bar.getAttribute('max');

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
            stopTimer();
        }
    }, 1000);
}
function restartTimer() {
    startTimer(timer_bar.getAttribute('value'));
}
function stopTimer() {
    clearInterval(timer);
}

function startGame() {
    createRpg();
    unlockBoard();
    stopTimer();
    setTimeout(() => {
        startTimer();
        createBoard(8, 8);
        let tiles = document.getElementsByClassName('tile');
        for(let i = 0; i < tiles.length; i++)
            dragElement(tiles[i]);
    }, 2000);
}

const timer_bar = document.getElementById('timerBar');
const TIMER_INTERVAL = 10;
let timer;
const board = document.getElementsByClassName('board')[0];
let last_move = null;

startGame();