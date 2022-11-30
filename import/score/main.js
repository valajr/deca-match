const board_html = document.getElementsByClassName('tile');
let matches = [];
let round_score = 0;

function classifyMatches(match) {
    let continuous = false;
    let existent_match = [];
    let new_match = [];
    for(let i = 0; i < matches.length; i++) {
        for(let j = 0; j < match.length; j++) {
            if(matches[i].includes(match[j])) {
                existent_match = matches[i];
                if(continuous)
                    new_match = removeItem(new_match, match[j]);
                else
                    new_match = removeItem(match, match[j]);
                continuous = true;
            }
        }
    }
    if(continuous) {
        existent_match.push(...new_match);
        destroyTiles(new_match);
    }
    else {
        matches.push(match);
        destroyTiles(match);
    }
}

function identifyMatches() {
    let board = getTiles();

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            let atual = board[i][j];
            if(j > 1) {
                let prev_prev = board[i][j-2];
                let prev = board[i][j-1];

                if(atual == prev && prev == prev_prev) {
                    let pos = i*board[i].length + j;
                    classifyMatches([pos-2, pos-1, pos]);
                }
            }
            if(i > 1) {
                let prev = board[i-1][j];
                let prev_prev = board[i-2][j];

                if(atual === prev && prev === prev_prev) {
                    let pos = i*board[i].length + j;
                    classifyMatches([pos-2*board[i].length, pos-1*board[i].length, pos]);
                }
            }
        }
    }
}

function countScore() {
    identifyMatches();
    
    for(let i = 0; i < matches.length; i++) {
        switch(matches[i].length) {
            case 3:
                round_score += 30;
                break;
            case 4:
                round_score += 50;
                // createSpecial('line', matches[i]);
                break;
            case 5:
                round_score += 80;
                // createSpecial('bomb', matches[i]);
                break;
            default:
                round_score += (matches[i].length + 5)*10;
                // createSpecial('selector', matches[i]);
        }
    }

    if(matches.length)
        setTimeout(updateBoard, 1000);
    else {
        if(round_score) {
            attack('player', 'monster');
            blockBoard('-' + round_score);
            setTimeout(()=>{unlockBoard(); startTimer()}, 4400);
        }
        else {
            invalidMove();
            restartTimer();
        }
    }
}