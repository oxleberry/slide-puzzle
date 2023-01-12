
// ============================
// Variables
// ============================
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
			swap(tileId, 15);
			console.log('board', board);
			updateBoard();
		});
	});
}


// ============================
// Game Play Functions
// ============================

// swap two elements from the board tracking array
function swap(idx1, idx2) {
	let temp = board[idx1];
	board[idx1] = board[idx2];
	board[idx2] = temp;
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
