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

const gears = ['water', 'earth', 'fire', 'air'];

function blockBoard(message='') {
    let modal = document.getElementsByClassName('block-modal')[0];
    modal.style.display = 'block';
    modal.innerHTML = message;
}

function unlockBoard() {
    let modal = document.getElementsByClassName('block-modal')[0];
    modal.innerHTML = '';
    modal.style.display = 'none';
}

function createGear(pos, gear) {
    let img = createElementHTML('img', 'gear');
    img.src = `import/imgs/${gear}.png`;

    pos.innerHTML = '';
    pos.appendChild(img);
    pos.classList.remove('destroyed');
    pos.setAttribute('Element', gear);
}

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
            createGear(tile, gear);
            line.appendChild(tile);
            aux_line.push(gear);
        }
        board.appendChild(line);
        aux_board.push(aux_line);
    }
}

function updateBoard() {
    for(let i = 0; i < matches.length; i++) {
        for(let j = 0; j < matches[i].length; j++) {
            let board = getTiles();
            board_html[matches[i][j]].innerHTML = '';
            for(let k = -1; k < matches[i][j]; k+=board.length) {
                let pos = matches[i][j] - k -1;
                if(pos - board.length < 0)
                    createGear(board_html[pos], gears[getRandomInt(0, 3)]);
                else {
                    let upper_gear = board_html[pos - board.length].getAttribute('Element');
                    createGear(board_html[pos], upper_gear);
                }
            }
        }
    }
    matches = [];
    countScore();
}

function getTiles() {
    let lines = board.getElementsByClassName('line');
    let tiles = [];

    for(let i = 0; i < lines.length; i++) {
        let line_html = lines[i].getElementsByClassName('tile');
        let line = [];
        for(let j = 0; j < line_html.length; j++)
            line.push(line_html[j].getAttribute('Element'));
        tiles.push(line);
    }
    return tiles;
}

function destroyTiles(tiles) {
    for(let i = 0; i < tiles.length; i ++)
        board_html[tiles[i]].classList.add('destroyed');
}

function invalidMove() {
    blockBoard('Nope!');
    setTimeout(unlockBoard, 500);
}

function createSpecial(type, match) {
    let board = getTiles();
    let last_tile = last_move.x*board[0].length + last_move.y;
    let special_tile;

    if(match.includes(last_tile)) {
        special_tile = last_tile;
        last_tile = null;
    }
    else
        special_tile = match[getRandomInt(0, match.length - 1)];

    removeItem(match, special_tile);

    board_html[special_tile].innerHTML = type;
}

function dragElement(element) {
    let pos_init = new Position(0, 0);
    let pos_final = new Position(0, 0);
    let gear = createElementHTML('img', 'selected-gear');
    let side = null;
    let irregular = false;

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
        round_score = 0;
        let pos_atual = new Position(pos_init.x - e.clientX, pos_init.y - e.clientY);
        pos_final.x = element.offsetLeft - pos_atual.x;
        pos_final.y = element.offsetTop - pos_atual.y;

        gear.src = `import/imgs/${element.getAttribute('Element')}.png`;
        board.appendChild(gear);
        if(pos_final.x < element.offsetLeft - 25)
            dragLeft();
        else if(pos_final.x > element.offsetLeft + 25)
            dragRight();
        else if(pos_final.y < element.offsetTop - 25)
            dragUp();
        else if(pos_final.y > element.offsetTop + 25)
            dragDown();
        else{
            pos_final.x = element.offsetLeft + 16;
            pos_final.y = element.offsetTop + 16;
            side = new Position(0, 0);
            irregular = true;
        }

        gear.style.left = (pos_final.x) + "px";
        gear.style.top = (pos_final.y) + "px";
    }

    function dragLeft() {
        pos_final.x = element.offsetLeft - 49;
        pos_final.y = element.offsetTop  + 15;
        side = new Position(0, -1);
        irregular = false;
    }
    function dragRight() {
        pos_final.x = element.offsetLeft + 81;
        pos_final.y = element.offsetTop  + 15;
        side = new Position(0, 1);
        irregular = false;
    }
    function dragUp() {
        pos_final.x = element.offsetLeft + 15;
        pos_final.y = element.offsetTop  - 49;
        side = new Position(-1, 0);
        irregular = false;
    }
    function dragDown() {
        pos_final.x = element.offsetLeft + 15;
        pos_final.y = element.offsetTop  + 81;
        side = new Position(1, 0);
        irregular = false;
    }
  
    function closeDragElement() {
        if(!irregular) {
            let element_pos = Position.getPos(element.id);
            last_move = Position.sum(element_pos, side);
            let other_gear = document.getElementById(last_move.x + "-" + last_move.y);
            if(other_gear) {
                let aux = element.getAttribute('Element');
                element.setAttribute('Element', other_gear.getAttribute('Element'));
                other_gear.setAttribute('Element', aux);

                aux = element.firstElementChild.src;
                element.firstElementChild.src = other_gear.firstElementChild.src;
                other_gear.firstElementChild.src = aux;
            }
            gear.remove();
            stopTimer();
            countScore();
        }
        else {
            invalidMove();
            gear.remove();
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }
}