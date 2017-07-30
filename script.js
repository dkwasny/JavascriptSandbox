let canvas = document.getElementById('kwasCanvas');
let ctx = canvas.getContext('2d');

canvas.height = 1000;
canvas.width = 1000;

let items = [];

let randomRgb = function() {
	return Math.round(Math.random() * 255);
}

let moveItem = function(item) {
	let xChange = (Math.random() - 0.5) * 10;
	let yChange = (Math.random() - 0.5) * 10;
	item.x += xChange;
	item.y += yChange;
};
let changeItemColor = function(item) {
	item.r = randomRgb();
	item.g = randomRgb();
	item.b = randomRgb();
};

let updateItem = function() {
	for (let x of items) {
		moveItem(x);
		changeItemColor(x);
	}
}

let clickHandler = function() {
	let x = Math.random() * 1000;
	let y = Math.random() * 1000;
	let r = randomRgb();
	let g = randomRgb();
	let b = randomRgb();

	items.push(
		{
			x: x,
			y: y,
			r: r,
			g: g,
			b: b
		}
	);
};

let draw = function() {
	ctx.clearRect(0, 0, 1000, 1000);
	for(let x of items) {
		let rgbString = `rgb(${x.r},${x.g},${x.b})`;
		ctx.fillStyle = rgbString;
		ctx.fillText(
			'Move that mouse!',
			x.x,
			x.y,
			1000,
			1000
		);
	}
};

window.addEventListener('click', clickHandler);
window.addEventListener('mousemove', updateItem);
window.setInterval(draw, 16);
