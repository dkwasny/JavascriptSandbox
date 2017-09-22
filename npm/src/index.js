import Engine from './engine.js';

let engine = new Engine('kwasDiv', 'kwasCanvas', 100, 100);

let square = {
    x: 0,
    y: 0,
    height: 5,
    width: 5,
    colorHex: '#c65d6d',
    draw: function(canvasHeight, canvasWidth, ctx, xMax, yMax) {
        ctx.fillStyle = this.colorHex;

        let sX = this.x * canvasWidth / xMax;
        let sY = this.y * canvasHeight / yMax;
        let sHeight = this.height * canvasHeight / yMax;
        let sWidth = this.width * canvasWidth / xMax;

        ctx.fillRect(sX, sY, sWidth, sHeight);
    }
};
engine.items.push(square);

let handleKeyPress = function(event) {
    let key = event.key;
    switch(key) {
    case 'ArrowLeft':
        square.x -= 0.5;
        break;
    case 'ArrowRight':
        square.x += 0.5;
        break;
    case 'ArrowUp':
        square.y -= 0.5;
        break;
    case 'ArrowDown':
        square.y += 0.5;
        break;
    case 'a':
        setRatio();
        break;
    }
};

let setRatio = function() {
    let input = prompt('New Aspect Ratio (w:h)');
    let [newW,newH] = input.split(':');
    engine.xRatio = newW;
    engine.yRatio = newH;
};

window.addEventListener('keydown', handleKeyPress);

engine.start();
