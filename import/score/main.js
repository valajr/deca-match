const board_html = document.getElementsByClassName('tile');
let matches = [];

function classifyMatches(match) {
    let continuous = false;
    let exitent_match = [];
    let new_match = [];
    for(let i = 0; i < matches.length; i++) {
        for(let j = 0; j < match.length; j++) {
            if(matches[i].includes(match[j])) {
                exitent_match = matches[i];
                if(continuous)
                    new_match = removeItem(new_match, match[j]);
                else
                    new_match = removeItem(match, match[j]);
                continuous = true;
            }
        }
    }
    if(continuous)
        exitent_match.push(...new_match);
    else
        matches.push(match);
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
                    board_html[pos-2].style.backgroundColor = 'red';
                    board_html[pos-1].style.backgroundColor = 'red';
                    board_html[pos].style.backgroundColor = 'red';
                    classifyMatches([pos-2, pos-1, pos]);
                }
            }
            if(i > 1) {
                let prev = board[i-1][j];
                let prev_prev = board[i-2][j];

                if(atual === prev && prev === prev_prev) {
                    let pos = i*board[i].length + j;
                    board_html[pos-2*board[i].length].style.backgroundColor = 'red';
                    board_html[pos-1*board[i].length].style.backgroundColor = 'red';
                    board_html[pos].style.backgroundColor = 'red';
                    classifyMatches([pos-2*board[i].length, pos-1*board[i].length, pos]);
                }
            }
        }
    }
}

function createSpecial(type, match) {
    let board = getTiles();
    let last_tile = last_move.x*board.length + last_move.y;
    let special_tile;

    if(match.includes(last_tile))
        special_tile = last_tile;
    else
        special_tile = match[getRandomInt(0, match.length)];

    console.log(type, special_tile);
}

function countScore() {
    let round_score = 0;
    identifyMatches();
    
    console.log(matches);
    for(let i = 0; i < matches.length; i++) {
        switch(matches[i].length) {
            case 3:
                round_score += 3;
                break;
            case 4:
                round_score += 5;
                createSpecial('line', matches[i]);
                break;
            case 5:
                round_score += 8;
                createSpecial('bomb', matches[i]);
                break;
            default:
                round_score += matches[i].length + 5;
                createSpecial('selector', matches[i]);
        }
    }
}