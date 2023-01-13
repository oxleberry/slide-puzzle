
// ============================
// Variables
// ============================

// tile & board configuration
const blankTile = 'tile-blank';
let cols = 4;
let rows = 4;

// board tiles
const solvedBoard = [
	'tile-1',
	'tile-2',
	'tile-3',
	'tile-4',
	'tile-5',
	'tile-6',
	'tile-7',
	'tile-8',
	'tile-9',
	'tile-10',
	'tile-11',
	'tile-12',
	'tile-13',
	'tile-14',
	'tile-15',
	'tile-blank'
];

// tracking the board tiles in play
let board = [...solvedBoard]; // will duplicate the original array

// Elements
let puzzle = document.querySelector('.puzzle-wrapper');


// ============================
// Setup Functions
// ============================

// display initial board
function drawBoard() {
	board.forEach((tileName, idx) => {
		let tile = document.createElement('button');
		tile.classList.add('tile');
		tile.classList.add(tileName);
		tile.setAttribute('id', idx);
		puzzle.appendChild(tile);
		// tile (button) event listener
		tile.addEventListener( 'click', (event) => {
			let tileId = tile.getAttribute('id');
			console.log('tileId', tileId);
			console.log('board', board);
			move(tileId);
		});
	});
}


// ============================
// Game Play Functions
// ============================
// returns: number (index number of 'tile-blank' from board array)
function findBlankTile() {
	const blankTileIdx = board.findIndex(tile => tile === blankTile);
	return blankTileIdx;
}

// converts (board index) to (tile row & col position)
// parameters: number (tile id or blank tile idx)
// returns: object (tilePosition.row, tilePosition.col)
function findTilePosition(id) {
	const tileRowPosition = Math.floor(id / cols);
	const tileColPosition = id % cols;
	return {
		row: tileRowPosition,
		col: tileColPosition
	};
}

// swap two elements from the board tracking array
function swap(idx1, idx2) {
	let temp = board[idx1];
	board[idx1] = board[idx2];
	board[idx2] = temp;
}

function move(tileId) {
	const blankIdx = findBlankTile();
	const isNeighbor = checkNeighbor(tileId, blankIdx);
	if (isNeighbor) {
		// move selected tile with blank tile
		swap(blankIdx, tileId);
		updateBoard();
	}
}

// check if it is a valid piece to move
function checkNeighbor(tileId, blankIdx) {
	// (for keyboard presses) checks if neightbor is outside of the board
	if (tileId < 0 || tileId > board.length - 1) {
		return false;
	}
	const tilePos = findTilePosition(tileId);
	const tileRowPos = tilePos.row;
	const tileColPos = tilePos.col;
	const blankPos = findTilePosition(blankIdx);
	const blankRowPos = blankPos.row;
	const blankColPos = blankPos.col;
	// checks if selected tile is not the same row or column as blank til
	if (tileRowPos !== blankRowPos && tileColPos!== blankColPos) {
		return false;
	}
	// checks if selected tile is in a 1 row/col away (in either direction) from blank tile
	if (Math.abs(tileRowPos - blankRowPos) == 1 || Math.abs(tileColPos - blankColPos) == 1) {
		return true;
	}
	// skips if it's the same spot
	return false;
}

// updated all buttons based on board tracking array
function updateBoard() {
	const tiles = document.querySelectorAll('.tile');
	tiles.forEach((tile, idx) => {
		tile.classList = 'tile';
		tile.classList.add(board[idx]);
	});
}


drawBoard();
