
// ============================
// Variables
// ============================

// tile & board configuration
const blankTile = 'tile-blank';
let cols = 4;
let rows = 4;
const easyShuffle = 10;
const hardShuffle = 1000;

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
function setup() {
	tileShuffle(easyShuffle); // easyShuffle or hardShuffle
	drawBoard();
}

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

// parameters: number
function tileShuffle(numOfTimes) {
	for (let i = 0; i < numOfTimes; i++) {
		randomMove();
	}
}

// parameters: number (top range for random generator)
// returns: number (randomly generated number)
function randomGenerator(range) {
	const randomNum = Math.floor(Math.random() * range);
	return randomNum;
};

// randomly move tile pieces based on blank tile's position, used for shuffling board
// updates board tracking array
function randomMove() {
	const blankIdx = findBlankTile();
	const blankPos = findTilePosition(blankIdx);
	const blankRowPos = blankPos.row;
	const blankColPos = blankPos.col;
	const lastRow = rows - 1;
	const lastCol = cols - 1;
	let tileRowPos = blankRowPos; // defaults to blank tile
	let tileColPos = blankColPos; // defaults to blank tile
	const randomizer = Math.floor(randomGenerator(10));
	// randomly move horizontally
	if (randomizer % 2 === 0) {
		tileRowPos = pickRandomTile(randomizer, blankRowPos, lastRow);
	// randomly move vertically
	} else {
		tileColPos = pickRandomTile(randomizer, blankColPos, lastCol);
	}
	const randomTileIdx = findTileIdx(tileRowPos, cols, tileColPos);
	swap(blankIdx, randomTileIdx);
}


// randomly chooses adjacent tile for swapping, used for shuffling board
// parameters: number, number, number (random number, tile (row/col) position, last row/col) position)
// returns: number (next tile position to swap tile with)
function pickRandomTile(randomVal, blankPos, lastEdgePos) {
	let tilePos;
	// if at ending edge, move up or left
	if (blankPos === lastEdgePos) {
		tilePos = blankPos - 1;
		// if at beginning edge, move down or right
	} else if (blankPos === 0) {
		tilePos = blankPos + 1;
	// inner pieces, move randomly
	} else {
		if (randomVal <= 4) {
			tilePos = blankPos + 1;
		} else {
			tilePos = blankPos - 1;
		}
	}
	return tilePos;
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

// converts (tile row & col position) to (board index)
// parameters: number, number, number (tile row position, number of columns, tile col position)
// returns: number (index in board array)
function findTileIdx(tileRowPos, cols, tileColPos) {
	return (tileRowPos * cols) + tileColPos;
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
		checkSolved();
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


// ============================
// Win Functions
// ============================
function checkSolved() {
	for (let i = 0; i < board.length-1; i++) {
		if (board[i] !== solvedBoard[i]) {
			return false;
		}
	}
	console.log("Solved");
}


// ============================
// Key pressed controls
// ============================
window.addEventListener('keydown', (event) => {
	if (event.defaultPrevented) {
		return; // do nothing if the event was already processed
	}
	const blankIdx = findBlankTile();
	let nextTileIdx;
	if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'k') {
	nextTileIdx = blankIdx - cols;
	} else if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'i') {
		nextTileIdx = blankIdx + cols;
	} else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'l') {
		nextTileIdx = blankIdx - 1;
	} else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'j') {
		nextTileIdx = blankIdx + 1;
	}
	move(nextTileIdx);
});


setup();
