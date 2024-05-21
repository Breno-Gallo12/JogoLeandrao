var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA = 2;

function Jogador(context, teclado, animacao) {
    this.context = context;
    this.teclado = teclado;
    this.animacao = animacao;
    this.vida = 100;
    this.x = 0;
    this.y = 300;
    this.width = 500;  // Atualizado para 500
    this.height = 500; // Atualizado para 500
    this.direcao = DIRECAO_DIREITA;
    this.velocidadeY = 0;
    this.pulando = false;
    this.agachado = false;
    this.corVida = 'green';
    this.isMoving = false;

    // Sprites
    this.spriteParado = new Image();
    this.spriteParado.src = '../img/Sprites/Idle.png';
    this.numSpritesIdle = 4;
    this.largSpriteIdle = this.spriteParado.width / this.numSpritesIdle;
    this.altSpriteIdle = this.spriteParado.height;
    this.frameIdle = 0;
    this.contadorIdle = 0;

    this.spriteCorrendo = new Image();
    this.spriteCorrendo.src = '../img/Sprites/Run.png';
    this.numSpritesCorrendo = 6;
    this.largSpriteCorrendo = this.spriteCorrendo.width / this.numSpritesCorrendo;
    this.altSpriteCorrendo = this.spriteCorrendo.height;
    this.frameCorrendo = 0;
    this.contadorCorrendo = 0;
}

Jogador.prototype = {
    atualizar: function () {
        //ESQUERDA E DIREITA
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= 5;
            this.direcao = DIRECAO_ESQUERDA;
            this.isMoving = true;
        } else if (this.teclado.pressionada(SETA_DIREITA) &&
            this.x < this.context.canvas.width - this.width) {
            this.direcao = DIRECAO_DIREITA;
            this.x += 5;
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }

        //PULO E AGACHAR
        if (this.teclado.pressionada(SETA_CIMA) && !this.pulando) {
            this.velocidadeY = -12;
            this.pulando = true;
        }

        if (this.teclado.pressionada(SETA_BAIXO) && !this.pulando) {
            this.agachado = true;
        } else {
            this.agachado = false;
        }

        this.y += this.velocidadeY;
        this.velocidadeY += 0.5;

        if (this.y >= this.context.canvas.height - this.height) {
            this.y = this.context.canvas.height - this.height;
            this.velocidadeY = 0;
            this.pulando = false;
        }

        //LIMITE DE TELA
        if (this.x + this.width > this.context.canvas.width) {
            this.x = this.context.canvas.width - this.width;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        //MORRER
        if (this.vida <= 0) {
            this.morrer();
        }
    },

    morrer: function () {
        console.log("Game Over");
        this.vida = 100;
        this.x = 0;
        this.y = 300;
    },

    desenhar: function () {
        if (this.isMoving) {
            this.contadorCorrendo++;
            if (this.contadorCorrendo >= 5) {
                this.frameCorrendo = (this.frameCorrendo + 1) % this.numSpritesCorrendo;
                this.contadorCorrendo = 0;
            }
            var sprite = this.spriteCorrendo;
            var frameX = this.frameCorrendo * this.largSpriteCorrendo;
            var frameY = 0;
            var frameWidth = this.largSpriteCorrendo;
            var frameHeight = this.altSpriteCorrendo;
        } else {
            this.contadorIdle++;
            if (this.contadorIdle >= 10) {
                this.frameIdle = (this.frameIdle + 1) % this.numSpritesIdle;
                this.contadorIdle = 0;
            }
            var sprite = this.spriteParado;
            var frameX = this.frameIdle * this.largSpriteIdle;
            var frameY = 0;
            var frameWidth = this.largSpriteIdle;
            var frameHeight = this.altSpriteIdle;
        }

        var posX = this.direcao === DIRECAO_DIREITA ? this.x : this.x + this.width;
        var scaleX = this.direcao === DIRECAO_DIREITA ? 1 : -1;

        this.context.save();
        this.context.translate(posX, this.y);
        this.context.scale(scaleX, 1);
        this.context.drawImage(sprite, frameX, frameY, frameWidth, frameHeight, 0, 0, this.width, this.height);
        this.context.restore();

        // Desenhar barra de vida
        var textoVidaX = 16;
        var textoVidaY = this.context.canvas.height - 23;
        var barraVidaX = 15;
        var barraVidaY = this.context.canvas.height - 20;
        var barraVidaWidth = 30;
        var barraVidaHeight = 10;

        this.context.fillStyle = this.corVida;
        this.context.font = "18px Impact, fantasy";
        this.context.fillText(this.vida, textoVidaX, textoVidaY);
        this.context.fillRect(barraVidaX, barraVidaY, barraVidaWidth, barraVidaHeight);
    },
};