export function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.colorHex = '#c65d6d';
    this.hide = false;
    this.kill = false;
}
Rectangle.prototype.draw = function(engine) {
    let ctx = engine.ctx;
    ctx.fillStyle = this.colorHex;
    ctx.fillRect(
        engine.normalizeX(this.x),
        engine.normalizeY(this.y),
        engine.normalizeX(this.width),
        engine.normalizeY(this.height)
    );
};

export function Grid(x, y, width, height, numColumns, numRows, lineWidth) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.numColumns = numColumns;
    this.numRows = numRows;
    this.lineWidth = lineWidth;
    this.colorHex = '#c65d6d';
    this.hide = false;
    this.kill = false;
}
Grid.prototype.draw = function(engine) {
    let ctx = engine.ctx;
    let columnWidth = this.width / this.numColumns;
    let rowHeight = this.height / this.numRows;

    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    for (let i = 0; i <= this.numRows; i++) {
        let startX = engine.normalizeX(this.x);
        let startY = engine.normalizeY(this.y + (i * rowHeight));
        ctx.moveTo(startX, startY);
        ctx.lineTo(engine.normalizeX(this.x + this.width), startY);
    }
    for (let i = 0; i <= this.numColumns; i++) {
        let startX = engine.normalizeX(this.x + (i * columnWidth));
        let startY = engine.normalizeY(this.y);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, engine.normalizeY(this.y + this.height));
    }
    ctx.stroke();
};

export function Engine(divId, canvasId, xMax, yMax) {
    this.div = document.getElementById(divId);
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.xRatio = 16;
    this.yRatio = 9;
    this.xMax = xMax;
    this.yMax = yMax;
    this.refreshMs = 16;
    this.items = [];
    this.drawLoop = drawLoopFactory(this);

    this.start = function() {
        window.setInterval(this.drawLoop, this.refreshMs);
    };

    this.normalizeX = function(input) {
        return input * this.canvas.width / xMax;
    };
    this.normalizeY = function(input) {
        return input * this.canvas.height / yMax;
    };
}

let drawLoopFactory = function(engine) {
    return function() {
        let div = engine.div;
        let windowHeight = div.clientHeight;
        let windowWidth = div.clientWidth;

        let newCanvasHeight = 0;
        let newCanvasWidth = 0;
        
        let canvasXRatio = engine.xRatio;
        let canvasYRatio = engine.yRatio;

        let wGrowth = windowWidth / canvasXRatio;
        let hGrowth = windowHeight / canvasYRatio;

        if (wGrowth < hGrowth) {
            newCanvasWidth = windowWidth;
            newCanvasHeight = windowWidth * canvasYRatio / canvasXRatio;
        }
        else {
            newCanvasWidth = windowHeight * canvasXRatio / canvasYRatio;
            newCanvasHeight = windowHeight;
        }

        let canvas = engine.canvas;
        canvas.height = newCanvasHeight;
        canvas.width = newCanvasWidth;

        let ctx = engine.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let items = engine.items;
        for (let i = 0; i < items.length;) {
            let curr = items[i];
            if (curr.kill) {
                items.splice(i, 1);
            }
            else {
                if (!curr.hide) {
                    curr.draw(engine);
                }
                i++;
            }
        }
    };
};

