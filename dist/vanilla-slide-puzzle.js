
// ============================
// variables
// ============================
let imgSource;
let imgWidth = 400;
let imgHeight = 400;

let tiles = [];
let cols = 4;
let rows = 4;
let tileWidth, tileHeight;
let board = []; // for tracking the tiles


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
// P5.js Functions
// ============================
function preload() {
	imgSource = loadImage("images/native-princess.jpg");
}

function setup () {
	// canvas setup
	let canvas = createCanvas (imgWidth, imgHeight);
	canvas.parent('canvas-puzzle');
	frameRate(8); // 8 = slow, 24 = average (i think)
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
	console.log('board', board);
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
			let img = tiles[tileIndex].img;
			image(img, x, y);
			// draw thin lines between tile pieces
			stroke(34);
			strokeWeight(2);
			noFill();
			rect(x, y, tileWidth, tileHeight);
		}
	}
	noLoop();
}
