
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

// Display initial board
function drawBoard() {
	board.forEach((tileName, idx) => {
		let tile = document.createElement('button');
		tile.classList.add('tile');
		tile.classList.add(tileName);
		tile.setAttribute('id', idx);
		puzzle.appendChild(tile);
	});
}

drawBoard();
