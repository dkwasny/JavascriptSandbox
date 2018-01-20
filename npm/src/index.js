import { Engine, Rectangle, Grid } from './engine.js';

let engine = new Engine('kwasDiv', 'kwasCanvas', 100, 100);

let square2 = new Rectangle(0, 0, 5, 5);
square2.x = 1;
let square = new Grid(0, 0, 10, 10, 3, 3, 1);
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
    case 'h':
        square.hide = !square.hide;
        break;
    case 'k':
        square.kill = true;
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
