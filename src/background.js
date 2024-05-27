function Background(context, canvasWidth, canvasHeight, jogador) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.movSpeed = 0;
    this.jogador = jogador

    this.images = [
        '../img/background/1.png',
        '../img/background/2.png',
        '../img/background/3.png',
        '../img/background/4.png',
        '../img/background/5.png',
        '../img/background/6.png',
        '../img/background/7.png',
        '../img/background/8.png'
    ].map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    this.solLayer = new Layer(this.context, this.images[0], 0.01, 0, this.canvasWidth, this.canvasHeight);  
    this.nuvemLayer = new Layer(this.context, this.images[1], 0.5, 10, this.canvasWidth, this.canvasHeight); 
    this.arvoreLayer = new Layer(this.context, this.images[2], -0.001, 15, this.canvasWidth, this.canvasHeight); 
    this.arvolelongeLayer = new Layer(this.context, this.images[3], 0, 5, this.canvasWidth, this.canvasHeight); 
    this.pedrasLayer = new Layer(this.context, this.images[4], 0, 40, this.canvasWidth, this.canvasHeight); 
    this.ambienteLayer = new Layer(this.context, this.images[5], -0.001, 15, this.canvasWidth, this.canvasHeight); 
    this.chaoLayer = new Layer(this.context, this.images[6], 0, 15, this.canvasWidth, this.canvasHeight);
    this.galhosLayer = new Layer(this.context, this.images[7], 0.1,0, this.canvasWidth, this.canvasHeight); 

    this.fundo = [this.solLayer, this.nuvemLayer, this.arvolelongeLayer, this.arvoreLayer, this.pedrasLayer, this.ambienteLayer, this.chaoLayer, this.galhosLayer];
}

class Layer {
    constructor(context, image, movSpeed, y_Position, canvasWidth, canvasHeight) {
        this.context = context;
        this.image = image;
        this.defaultSpeedModifier = movSpeed
        this.speedModifier = movSpeed;
        this.y = y_Position;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = 0;
        this.x2 = canvasWidth;
    }

    draw() {
        var ctx = this.context;
        ctx.drawImage(this.image, this.x, this.y, this.canvasWidth, this.canvasHeight);
        ctx.drawImage(this.image, this.x2, this.y, this.canvasWidth, this.canvasHeight);
    }

    update() {
        this.x -= this.speedModifier;
        this.x2 -= this.speedModifier;

        if (this.x < -this.canvasWidth) {
            this.x = this.canvasWidth - this.speedModifier + this.x2;
        }

        if (this.x2 < -this.canvasWidth) {
            this.x2 = this.canvasWidth - this.speedModifier + this.x;
        }
    }
}

Background.prototype = {
    desenhaBackground: function () {
        var ctx = this.context;
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        var maxSpeed = 4;
        var maxSol = 0.05;
        var maxArvore = 2.5
        var maxGeral = 3
        var jogador = this.jogador


        if (jogador.movingBack) {
            this.fundo.forEach(object => {
                if (object === this.solLayer) {
                    if (object.speedModifier < maxSol) { 
                        object.speedModifier += 0.001;
                    }
                }   
                else if (object === this.arvoreLayer) {
                    if (object.speedModifier < maxArvore) { 
                        object.speedModifier += 0.01;
                    } 
                }
                else if (object === this.arvolelongeLayer) {
                    if (object.speedModifier < maxArvore) { 
                        object.speedModifier += 0.03;
                    } 
                }
                else if (object === this.pedrasLayer) {
                    if (object.speedModifier < maxGeral) { 
                        object.speedModifier += 0.03;
                    } 
                }
                else if (object === this.ambienteLayer) {
                    if (object.speedModifier < maxGeral) { 
                        object.speedModifier += 0.05;
                    } 
                }
                else if (object === this.chaoLayer) {
                    if (object.speedModifier < maxGeral) { 
                        object.speedModifier += 0.01;
                    } 
                }
                else if (object === this.galhosLayer) {
                    if (object.speedModifier < maxGeral) { 
                        object.speedModifier += 0.1;
                    } 
                }
                else {
                    if (object.speedModifier < maxSpeed) {
                        object.speedModifier += 0.01;
                    }
                }
                object.update();
                object.draw();
            });
        } else {
            this.fundo.forEach(object => {
                object.speedModifier = object.defaultSpeedModifier;
                object.update();
                object.draw();
            });
        }
    }
};
