
// ============================
// variables
// ============================
let imgSource;
let imgWidth = 400;
let imgHeight = 400;

// Tile & Board configuration
let tiles = [];
let cols = 4;
let rows = 4;
let tileWidth, tileHeight;
let board = []; // for tracking the tiles
const blankTile = -1;
const easyShuffle = 10;
const hardShuffle = 1000;


// ============================
// Tile Constructor
// ============================
class Tile {
	constructor(i, img) {
		this.idx = i;
		this.img = img;
	}
}


// ============================
// Game Play Functions
// ============================
// swap two elements from the board array
function swap(idx1, idx2) {
	let temp = board[idx1];
	board[idx1] = board[idx2];
	board[idx2] = temp;
}

// finds the blank tile in board tracking arr
function findBlankTileIdx( ) {
	let blankTileIdx = board.findIndex(tile => tile === blankTile);
	return blankTileIdx;
}

// converts (tile row & col position) to (tile index in board arr)
function findTileIdx(tileRowPos, cols, tileColPos) {
	return (tileRowPos * cols) + tileColPos;
}

// converts (tile index in board arr) to (tile row & col position)
function findTilePosition(idx) {
	const tileRowPosition = Math.floor(idx / cols);
	const tileColPosition = idx % cols;
	return {
		row: tileRowPosition,
		col: tileColPosition
	};
}

function move(tileIdx) {
	let blankIdx = findBlankTileIdx();
	const isNeighbor = checkNeighbor(tileIdx, blankIdx);
	if (isNeighbor) {
		swap(tileIdx, blankIdx);
		checkSolved();
	}
}

// check if it is a valid piece to move
function checkNeighbor(tileIdx, blankIdx) {
	const tilePos = findTilePosition(tileIdx);
	const tileRowPos = tilePos.row;
	const tileColPos = tilePos.col;
	const blankPos = findTilePosition(blankIdx);
	const blankRowPos = blankPos.row;
	const blankColPos = blankPos.col;
	// checks if selected tile is not the same row or column as blank tile
	if (tileRowPos !== blankRowPos && tileColPos!== blankColPos) {
		return false;
	}
	// checks if selected tile is in a 1 row/col away (in either direction) from blank tile
	if (Math.abs(tileRowPos - blankRowPos) == 1 || Math.abs(tileColPos - blankColPos) == 1) {
		return true;
	}
	// if it's the same spot
	return false;
}


// ============================
// Shuffle Functions
// ============================
function shuffleTiles(numOfTimes) {
	for (let i = 0; i < numOfTimes; i++) {
		randomMove();
	}
}

// randomly move tile pieces used for shuffling board
function randomMove() {
	const randomizer = floor(random(10));
	const blankIdx = findBlankTileIdx();
	const blankPos = findTilePosition(blankIdx);
	const blankRowPos = blankPos.row;
	const blankColPos = blankPos.col;
	const lastRow = rows - 1;
	const lastCol = cols - 1;
	let tileRowPos = blankRowPos;
	let tileColPos = blankColPos;
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

// randomly generates a valid tile to move based on blank tile's position
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
// Win Game Functions
// ============================
function checkSolved() {
	for (let i = 0; i < board.length - 1; i++) {
		if (board[i] !== tiles[i].idx) {
			return false;
		}
	}
	console.log("SOLVED");
	noLoop();
}


// ============================
// P5.js Functions
// ============================
function preload() {
	imgSource = loadImage("images/native-princess.jpg");
}

function setup () {
	// canvas setup
	let canvas = createCanvas (imgWidth, imgHeight);
	canvas.parent('canvas-puzzle');
	frameRate(2); // 8 = slow, 24 = average (i think)
	// chop up source image into tiles
	tileWidth = width / cols;
	tileHeight = height / rows;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			// defines section of source image to be copied to a tile
			let x = j * tileWidth; // top coordinate for a tile
			let y = i * tileHeight; // left coordinate for a tile
			let idx = (i * cols) + j;
			let tileImage = createImage(tileWidth, tileHeight);
			// copies from image selection to destination
			tileImage.copy(imgSource, x, y, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
			let tile = new Tile(idx, tileImage);
			tiles.push(tile);
			board.push(idx);
		}
	}
	// create a blank tile
	tiles.pop();
	board.pop();
	board.push(blankTile);
	// shuffles board pieces
	shuffleTiles(easyShuffle);
}

function draw() {
	background(12);
	// draws each tile piece based on the board tracking array
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let x = j * tileWidth;
			let y = i * tileHeight;
			let idx = (i * cols) + j;
			let tileIndex = board[idx];
			if (tileIndex !== blankTile ) {
				let img = tiles[tileIndex].img;
				image(img, x, y);
			}
			// draw thin lines between tile pieces
			stroke(34);
			strokeWeight(2);
			noFill();
			rect(x, y, tileWidth, tileHeight);
		}
	}
}


// ============================
// Event Listener
// ============================
// move tile based on click
function mousePressed() {
	const tileRowPos = floor(mouseY / tileHeight);
	const tileColPos = floor(mouseX / tileWidth);
	const tileIdx = findTileIdx(tileRowPos, cols, tileColPos);
	move(tileIdx);
}
