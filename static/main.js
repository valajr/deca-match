const board = document.getElementsByClassName('board')[0];

createBoard(8, 8);

let tiles = document.getElementsByClassName('tile');
for(let i = 0; i < tiles.length; i++)
    dragElement(tiles[i]);