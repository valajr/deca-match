function identifyMatches() {
    let board = getTiles();
    let board_html = document.getElementsByClassName('tile');

    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(j > 1) {
                let prev_prev = board[i][j-2];
                let prev = board[i][j-1];
                let atual = board[i][j];

                if(atual == prev && prev == prev_prev) {
                    let pos = i*board[i].length + j;
                    board_html[pos-2].style.backgroundColor = 'red';
                    board_html[pos-1].style.backgroundColor = 'red';
                    board_html[pos].style.backgroundColor = 'red';
                }
            }
        }
    }
}