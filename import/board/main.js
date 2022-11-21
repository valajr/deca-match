class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static sum(a, b) {
        let x = parseInt(a.x) + b.x;
        let y = parseInt(a.y) + b.y;
        return new Position(x, y);
    }

    static getPos(id) {
        let separated_id = id.split("-");
        return new Position(separated_id[0], separated_id[1]);
    }
}

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
            tile.setAttribute('gearColor', gear);
            line.appendChild(tile);
            aux_line.push(gear);
        }
        board.appendChild(line);
        aux_board.push(aux_line);
    }
}

function getTiles() {
    let lines = board.getElementsByClassName('line');
    let tiles = [];

    for(let i = 0; i < lines.length; i++) {
        let line_html = lines[i].getElementsByClassName('tile');
        let line = [];
        for(let j = 0; j < line_html.length; j++)
            line.push(line_html[j].innerHTML);
        tiles.push(line);
    }
    return tiles;
}

function dragElement(element) {
    let pos_init = new Position(0, 0);
    let pos_final = new Position(0, 0);
    let gear = createElementHTML('p', 'gear', 'selected-gear');
    let side = null;

    element.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos_init.x = e.clientX;
        pos_init.y = e.clientY;
        document.onmousemove = elementDrag;
        document.onmouseup = closeDragElement;
    }
  
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        let pos_atual = new Position(pos_init.x - e.clientX, pos_init.y - e.clientY);
        pos_final.x = element.offsetLeft - pos_atual.x;
        pos_final.y = element.offsetTop - pos_atual.y;

        gear.innerHTML = element.innerHTML;
        board.appendChild(gear);
        if(pos_final.x < element.offsetLeft - 25) 
            dragLeft();
        else if(pos_final.x > element.offsetLeft + 25) 
            dragRight();
        else if(pos_final.y < element.offsetTop - 25) 
            dragUp();
        else if(pos_final.y > element.offsetTop + 25) 
            dragDown();

        gear.style.left = (pos_final.x) + "px";
        gear.style.top = (pos_final.y) + "px";
    }

    function dragLeft() {
        pos_final.x = element.offsetLeft - 49;
        pos_final.y = element.offsetTop  + 2;
        side = new Position(0, -1);
    }
    function dragRight() {
        pos_final.x = element.offsetLeft + 66;
        pos_final.y = element.offsetTop  + 2;
        side = new Position(0, 1);
    }
    function dragUp() {
        pos_final.x = element.offsetLeft + 11;
        pos_final.y = element.offsetTop  - 56;
        side = new Position(-1, 0);
    }
    function dragDown() {
        pos_final.x = element.offsetLeft + 11;
        pos_final.y = element.offsetTop  + 60;
        side = new Position(1, 0);
    }
  
    function closeDragElement() {
        let element_pos = Position.getPos(element.id);
        last_move = Position.sum(element_pos, side);
        let other_gear = document.getElementById(last_move.x + "-" + last_move.y);
        if(other_gear) {
            element.innerHTML = other_gear.innerHTML;
            other_gear.innerHTML = gear.innerHTML;
        }
        gear.remove();
        document.onmouseup = null;
        document.onmousemove = null;
    }
}