
// ============================
// variables
// ============================
let imgSource;
let imgWidth = 400;
let imgHeight = 400;


// ============================
// P5.js Functions
// ============================
function preload() {
	imgSource = loadImage("images/native-princess.jpg");
}

function setup () {
	let canvas = createCanvas (imgWidth, imgHeight);
	canvas.parent('canvas-puzzle');
	frameRate(8); // 8 = slow, 24 = average (i think)
}

function draw() {
	background(12);
	image(imgSource, 0, 0);
}
