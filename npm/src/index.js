import Engine from './engine.js';

let engine = new Engine('kwasDiv', 'kwasCanvas');

let square = {
    x: 0.5,
    y: 0.5,
    height: 0.25,
    width: 0.25,
    colorHex: '#c65d6d',
    draw: function(canvasHeight, canvasWidth, ctx) {
        ctx.fillStyle = this.colorHex;

        let sX = this.x * canvasWidth;
        let sY = this.y * canvasHeight;
        let sHeight = this.height * canvasHeight;
        let sWidth = this.width * canvasWidth;

        ctx.fillRect(sX, sY, sWidth, sHeight);
    }
};
engine.items.push(square);

let handleKeyPress = function(event) {
    let key = event.key;
    switch(key) {
    case 'ArrowLeft':
        square.x -= 0.01;
        break;
    case 'ArrowRight':
        square.x += 0.01;
        break;
    case 'ArrowUp':
        square.y -= 0.01;
        break;
    case 'ArrowDown':
        square.y += 0.01;
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