export default function Engine(divId, canvasId) {
    this.div = document.getElementById(divId);
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.xRatio = 16;
    this.yRatio = 9;
    this.refreshMs = 16;
    this.items = [];
    this.drawLoop = drawLoopFactory(this);

    this.start = function() {
        window.setInterval(this.drawLoop, this.refreshMs);
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

        let height = canvas.height;
        let width = canvas.width;

        for (let item of engine.items) {
            item.draw(height, width, ctx);
        }
    }
};

