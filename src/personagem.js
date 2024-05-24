var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA = 2;

function Jogador(context, teclado, animacao, canvasWidth, canvasHeight) {
  this.context = context;
  this.teclado = teclado;
  this.animacao = animacao;
  this.vida = 100;
  this.x = 0;
  this.y = 0;
  this.width = 400;
  this.height = 400;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.direcao = DIRECAO_DIREITA;
  this.velocidadeY = 0;
  this.pulando = false;
  this.corVida = "green";
  this.isMoving = false;
  this.movingBack = false;
  this.atacando1 = false;
  this.atacando2 = false;
  this.tempoAtaque1 = 45;
  this.tempoAtaque2 = 40;
  this.cooldownAtaque1 = 0;
  this.cooldownAtaque2 = 0;
  this.tempoRestanteAtaque1 = 0;
  this.tempoRestanteAtaque2 = 0;

  // Constantes do chão com deslocamento vertical
  this.verticalOffset = -120; // Deslocamento para subir o jogador acima do chão
  this.groundHeight = canvasHeight - this.height - this.verticalOffset;

  // Código para carregar e configurar sprites
  this.spriteParado = new Image();
  this.spriteParado.src = "../img/Sprites/Idle.png";
  this.numSpritesIdle = 4;
  this.largSpriteIdle = this.spriteParado.width / this.numSpritesIdle;
  this.altSpriteIdle = this.spriteParado.height;
  this.frameIdle = 0;
  this.contadorIdle = 0;

  this.spriteCorrendo = new Image();
  this.spriteCorrendo.src = "../img/Sprites/Run.png";
  this.numSpritesCorrendo = 8;
  this.largSpriteCorrendo = this.spriteCorrendo.width / this.numSpritesCorrendo;
  this.altSpriteCorrendo = this.spriteCorrendo.height;
  this.frameCorrendo = 0;
  this.contadorCorrendo = 0;

  this.spritePulando = new Image();
  this.spritePulando.src = "../img/Sprites/Jump.png";
  this.numSpritesPulando = 2;
  this.largSpritePulando = this.spritePulando.width / this.numSpritesPulando;
  this.altSpritePulando = this.spritePulando.height;
  this.framePulando = 0;
  this.contadorPulando = 0;

  this.spriteAtaque1 = new Image();
  this.spriteAtaque1.src = "../img/Sprites/Attack1.png";
  this.numSpritesAtaque1 = 4;
  this.largSpriteAtaque1 = this.spriteAtaque1.width / this.numSpritesAtaque1;
  this.altSpriteAtaque1 = this.spriteAtaque1.height;
  this.frameAtaque1 = 0;
  this.contadorAtaque1 = 0;

  this.spriteAtaque2 = new Image();
  this.spriteAtaque2.src = "../img/Sprites/Attack2.png";
  this.numSpritesAtaque2 = 4;
  this.largSpriteAtaque2 = this.spriteAtaque2.width / this.numSpritesAtaque2;
  this.altSpriteAtaque2 = this.spriteAtaque2.height;
  this.frameAtaque2 = 0;
  this.contadorAtaque2 = 0;
}

Jogador.prototype = {
  atualizar: function () {
    // Movimento horizontal, ESQUERDA E DIREITA
    if (
      this.teclado.pressionada(SETA_ESQUERDA) &&
      this.teclado.pressionada(SETA_DIREITA)
    ) {
      this.x += 0;
      this.isMoving = false;
      this.movingBack = false;
    } else if (this.teclado.pressionada(SETA_ESQUERDA) && this.x >= -177) {
      this.direcao = DIRECAO_ESQUERDA;
      this.x -= 5;
      this.x -= 5;
      this.isMoving = true;
      this.movingBack = false;
    } else if (this.teclado.pressionada(SETA_DIREITA) && this.x <= 582) {
      this.direcao = DIRECAO_DIREITA;
      this.x += 5;
      this.x += 6;
      this.isMoving = true;
      this.movingBack = true;
    } else {
      this.isMoving = false;
      this.movingBack = false;
    }

    // Gerenciar ataques com cooldown
    if (this.teclado.pressionada(Q) && this.cooldownAtaque1 === 0) {
      this.atacando1 = true;
      this.tempoRestanteAtaque1 = this.tempoAtaque1;
      this.cooldownAtaque1 = 5000;
    } else if (this.teclado.pressionada(W) && this.cooldownAtaque2 === 0) {
      this.atacando2 = true;
      this.tempoRestanteAtaque2 = this.tempoAtaque2;
      this.cooldownAtaque2 = 7000;
    }

    // Atualizar cooldowns
    if (this.cooldownAtaque1 > 0)
      this.cooldownAtaque1 = this.cooldownAtaque1 - 5;
    if (this.cooldownAtaque2 > 0)
      this.cooldownAtaque2 = this.cooldownAtaque2 - 5;

    // Diminuir tempo restante dos ataques
    if (this.tempoRestanteAtaque1 > 0) {
      this.tempoRestanteAtaque1--;
      if (this.tempoRestanteAtaque1 === 0) this.atacando1 = false;
    }

    if (this.tempoRestanteAtaque2 > 0) {
      this.tempoRestanteAtaque2--;
      if (this.tempoRestanteAtaque2 === 0) this.atacando2 = false;
    }

    // Pulo
    if (this.teclado.pressionada(SETA_CIMA) && !this.pulando) {
      this.velocidadeY = -12;
      this.pulando = true;
    }

    // Aplicar gravidade
    this.y += this.velocidadeY;
    this.velocidadeY += 0.5;

    // Checar se está no chão
    if (this.y >= this.groundHeight) {
      this.y = this.groundHeight;
      this.velocidadeY = 0;
      this.pulando = false;
    }

    // Checar vida
    if (this.vida <= 0) {
      this.morrer();
    }

    console.log(this.cooldownAtaque1);
    console.log(this.cooldownAtaque2);
  },

  morrer: function () {
    console.log("Game Over");
    this.vida = 100;
    this.x = 0;
    this.y = this.groundHeight;
  },

  desenhar: function () {
    let sprite, numSprites, largSprite, altSprite, frame, contador;

    if (this.atacando1) {
      sprite = this.spriteAtaque1;
      numSprites = this.numSpritesAtaque1;
      largSprite = this.largSpriteAtaque1;
      altSprite = this.altSpriteAtaque1;
      frame = this.frameAtaque1;
      contador = this.contadorAtaque1;
    } else if (this.atacando2) {
      sprite = this.spriteAtaque2;
      numSprites = this.numSpritesAtaque2;
      largSprite = this.largSpriteAtaque2;
      altSprite = this.altSpriteAtaque2;
      frame = this.frameAtaque2;
      contador = this.contadorAtaque2;
    } else if (this.pulando) {
      sprite = this.spritePulando;
      numSprites = this.numSpritesPulando;
      largSprite = this.largSpritePulando;
      altSprite = this.altSpritePulando;
      frame = this.framePulando;
      contador = this.contadorPulando;
    } else if (this.isMoving) {
      sprite = this.spriteCorrendo;
      numSprites = this.numSpritesCorrendo;
      largSprite = this.largSpriteCorrendo;
      altSprite = this.altSpriteCorrendo;
      frame = this.frameCorrendo;
      contador = this.contadorCorrendo;
    } else {
      sprite = this.spriteParado;
      numSprites = this.numSpritesIdle;
      largSprite = this.largSpriteIdle;
      altSprite = this.altSpriteIdle;
      frame = this.frameIdle;
      contador = this.contadorIdle;
    }

    this.context.save();

    if (this.direcao === DIRECAO_ESQUERDA) {
      this.context.scale(-1, 1);
      this.context.drawImage(
        sprite,
        frame * largSprite,
        0,
        largSprite,
        altSprite,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
    } else {
      this.context.drawImage(
        sprite,
        frame * largSprite,
        0,
        largSprite,
        altSprite,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    this.context.restore();

    contador++;
    if (contador >= 10) {
      frame = (frame + 1) % numSprites;
      contador = 0;
    }

    if (this.pulando) {
      this.framePulando = frame;
      this.contadorPulando = contador;
    } else if (this.atacando1) {
      this.frameAtaque1 = frame;
      this.contadorAtaque1 = contador;
    } else if (this.atacando2) {
      this.frameAtaque2 = frame;
      this.contadorAtaque2 = contador;
    } else if (this.isMoving) {
      this.frameCorrendo = frame;
      this.contadorCorrendo = contador;
    } else {
      this.frameIdle = frame;
      this.contadorIdle = contador;
    }

    // Desenhar barra de vida
    var textoVidaX = 16;
    var textoVidaY = this.context.canvas.height - 23;
    var barraVidaX = 15;
    var barraVidaY = this.context.canvas.height - 20;
    var barraVidaWidth = 30;
    var barraVidaHeight = 10;
    var cooldownBarWidth = 100;
    var cooldownBarHeight = 10;
    var cooldownBarX1 = 50;
    var cooldownBarY1 = 480;
    var cooldownBarX2 = 160;
    var cooldownBarY2 = 480;

    // Definir a cor da barra de vida com base na vida restante
    if (this.vida > 60) {
      this.corVida = "green";
    } else if (this.vida > 30) {
      this.corVida = "yellow";
    } else {
      this.corVida = "red";
    }

    this.context.fillStyle = this.corVida;
    this.context.font = "18px Impact, fantasy";
    this.context.fillText(this.vida, textoVidaX, textoVidaY);
    this.context.fillRect(
      barraVidaX,
      barraVidaY,
      barraVidaWidth,
      barraVidaHeight
    );

    // Barra de cooldown para o ataque 1
    this.context.fillStyle = "grey";
    this.context.fillRect(
      cooldownBarX1,
      cooldownBarY1,
      cooldownBarWidth,
      cooldownBarHeight
    );
    if (this.cooldownAtaque1 > 0) {
      const cooldownWidth1 = (this.cooldownAtaque1 / 5000) * cooldownBarWidth;
      this.context.fillStyle = "blue";
      this.context.fillRect(
        cooldownBarX1,
        cooldownBarY1,
        cooldownWidth1,
        cooldownBarHeight
      );
    }

    // Barra de cooldown para o ataque 2
    this.context.fillStyle = "grey";
    this.context.fillRect(
      cooldownBarX2,
      cooldownBarY2,
      cooldownBarWidth,
      cooldownBarHeight
    );
    if (this.cooldownAtaque2 > 0) {
      const cooldownWidth2 = (this.cooldownAtaque2 / 7000) * cooldownBarWidth;
      this.context.fillStyle = "blue";
      this.context.fillRect(
        cooldownBarX2,
        cooldownBarY2,
        cooldownWidth2,
        cooldownBarHeight
      );
    }
  },
};
