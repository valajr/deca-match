const gears = ['blue', 'green', 'red', 'yellow'];

const test_matrix = [
    [1, 1, 1, 2, 2, 2, 3, 3],
    [1, 1, 2, 2, 3, 3, 4, 4], 
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 2, 2, 2, 3, 3],
    [1, 1, 2, 2, 3, 3, 4, 4],
    [1, 2, 3, 4, 5, 6, 7, 8],
    [0, 1, 2, 3, 4, 5, 6, 7]
];

let match_three = [
    [0, 1, 2], [0, 0, 0]
];

let match_four = [
    [0, 1, 2, 3], [0, 0, 0, 0]
];

let match_five = [
    [0, 1, 2, 3, 4], [0, 0, 0, 0, 0], [0, 1, 2, 2, 2]
];

let match_six = [
    [0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0], [0, 1, 2, 2, 2, 3]
];

let match_seven = [
    [0, 1, 2, 3, 4, 5, 6], [0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 2, 2, 3, 3]
];

function createBoard(rows, collumns) {
    let aux_board = [];
    for(let i = 0; i < rows; i++) {
        let line = createElementHTML('tr', 'line');
        let aux_line = [];
        for(let j = 0; j < collumns; j++) {
            let tile = createElementHTML('td', 'tile', `${i}-${j}`);
            let gear = gears[getRandomInt(0, 3)];
            let line_equal = false;

            if(j > 1) {
                let prev = aux_line[j-1];
                let prev_prev = aux_line[j-2];
                if(gear === prev && prev === prev_prev) {
                    let new_gears = removeItem(gears, gear);
                    gear = new_gears[getRandomInt(0, new_gears.length - 1)];
                    line_equal = true;
                }
            }
            if(i > 1) {
                let prev = aux_board[i-1][j];
                let prev_prev = aux_board[i-2][j];
                if(gear === prev && prev === prev_prev) {
                    let new_gears = removeItem(gears, gear);
                    if(line_equal)
                        new_gears = removeItem(gears, aux_line[j-1]);
                    gear = new_gears[getRandomInt(0, new_gears.length - 1)];
                }
            }
            tile.innerHTML = gear;
            line.appendChild(tile);
            aux_line.push(gear);
        }
        console.log(board);
        board.appendChild(line);
        aux_board.push(aux_line);
    }
}

function getTiles() {
    let tiles_html = board.getElementsByClassName('tile');
    let tiles = [];
    for(let i = 0; i < tiles_html.length; i++)
        tiles.push(tiles_html[i].innerHTML);
    return tiles;
}