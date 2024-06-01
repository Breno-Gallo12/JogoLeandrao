var DIRECAO_ESQUERDA = 1;
var DIRECAO_DIREITA = 2;

function Jogador(
  context,
  teclado,
  animacao,
  sons,
  canvasWidth,
  canvasHeight,
  telaGameOver
) {
  this.context = context;
  this.teclado = teclado;
  this.animacao = animacao;
  this.nome = "Jogador 1";
  this.telaGameOver = telaGameOver;
  this.sons = sons;
  this.vida = 100;
  this.x = 100;
  this.y = 0;
  this.width = 155;
  this.height = 155;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.direcao = DIRECAO_DIREITA;
  this.velocidadeY = 0;
  this.pulando = false;
  this.corVida = "green";
  this.isMoving = false;
  this.movingEsquerda = false;
  this.movingDireita = false;
  this.atacando1 = false;
  this.atacando2 = false;
  this.morto = false;
  this.animaDano = false;
  this.animandoMorte = false;
  this.tempoAtaque1 = 30;
  this.tempoAtaque2 = 40;
  this.cooldownAtaque1 = 0;
  this.cooldownAtaque2 = 0;
  this.tempoRestanteAtaque1 = 0;
  this.tempoRestanteAtaque2 = 0;
  this.dano = 0;
  this.ultimoPulo = 0;
  this.vivo = true;
  this.venceu = false;

  // Constantes do chão com deslocamento vertical
  this.verticalOffset = 20; // Deslocamento para subir o jogador acima do chão
  this.groundHeight = canvasHeight - this.height - this.verticalOffset;

  // Código para carregar e configurar sprites
  this.spriteParado = new Image();
  this.spriteParado.src = "../img/Sprites/Idle.png?v=1";
  this.numSpritesIdle = 7;
  this.largSpriteIdle = this.spriteParado.width / this.numSpritesIdle;
  this.altSpriteIdle = this.spriteParado.height;
  this.frameIdle = 0;
  this.contadorIdle = 0;

  this.spriteCorrendo = new Image();
  this.spriteCorrendo.src = "../img/Sprites/Run.png?v=1";
  this.numSpritesCorrendo = 8;
  this.largSpriteCorrendo = this.spriteCorrendo.width / this.numSpritesCorrendo;
  this.altSpriteCorrendo = this.spriteCorrendo.height;
  this.frameCorrendo = 0;
  this.contadorCorrendo = 0;

  this.spritePulando = new Image();
  this.spritePulando.src = "../img/Sprites/Jump.png?v=1";
  this.numSpritesPulando = 9;
  this.largSpritePulando = this.spritePulando.width / this.numSpritesPulando;
  this.altSpritePulando = this.spritePulando.height;
  this.framePulando = 0;
  this.contadorPulando = 0;

  this.spriteAtaque1 = new Image();
  this.spriteAtaque1.src = "../img/Sprites/Attack_1.png?v=1";
  this.numSpritesAtaque1 = 5;
  this.largSpriteAtaque1 = this.spriteAtaque1.width / this.numSpritesAtaque1;
  this.altSpriteAtaque1 = this.spriteAtaque1.height;
  this.frameAtaque1 = 0;
  this.contadorAtaque1 = 0;

  this.spriteAtaque2 = new Image();
  this.spriteAtaque2.src = "../img/Sprites/Attack_2.png?v=1";
  this.numSpritesAtaque2 = 5;
  this.largSpriteAtaque2 = this.spriteAtaque2.width / this.numSpritesAtaque2;
  this.altSpriteAtaque2 = this.spriteAtaque2.height;
  this.frameAtaque2 = 0;
  this.contadorAtaque2 = 0;

  this.spriteMorre = new Image();
  this.spriteMorre.src = "../img/Sprites/Dead.png?v=1";
  this.numSpritesMorre = 5;
  this.largSpriteMorre = this.spriteMorre.width / this.numSpritesMorre;
  this.altSpriteMorre = this.spriteMorre.height;
  this.frameMorre = 0;
  this.contadorMorre = 0;

  this.spriteDano = new Image();
  this.spriteDano.src = "../img/Sprites/Hurt.png?v=1";
  this.numSpritesDano = 4;
  this.largSpriteDano = this.spriteDano.width / this.numSpritesDano;
  this.altSpriteDano = this.spriteDano.height;
  this.frameDano = 0;
  this.contadorDano = 0;

  this.spriteParado.onload = () => this.verificarSpritesCarregadas();
  this.spriteCorrendo.onload = () => this.verificarSpritesCarregadas();
  this.spritePulando.onload = () => this.verificarSpritesCarregadas();
  this.spriteAtaque1.onload = () => this.verificarSpritesCarregadas();
  this.spriteAtaque2.onload = () => this.verificarSpritesCarregadas();
  this.spriteMorre.onload = () => this.verificarSpritesCarregadas();
  this.spriteDano.onload = () => this.verificarSpritesCarregadas();

  this.spritesCarregadas = 0;
  this.totalSprites = 7;
  this.carregado = false;
}

Jogador.prototype = {
  iniciar: function () {
    this.preloadSprites();
  },

  preloadSprites: function () {
    const imagens = [
      "../img/Sprites/Idle.png?v=1",
      "../img/Sprites/Run.png?v=1",
      "../img/Sprites/Jump.png?v=1",
      "../img/Sprites/Attack_1.png?v=1",
      "../img/Sprites/Attack_2.png?v=1",
      "../img/Sprites/Dead.png?v=1",
      "../img/Sprites/Hurt.png?v=1",
    ];

    // Contador para rastrear o número de imagens carregadas
    let imagensCarregadas = 0;

    // Função para verificar se todas as imagens foram carregadas
    const verificarCarregamento = () => {
      imagensCarregadas++;
      if (imagensCarregadas === imagens.length) {
      }
    };
    // Loop para pré-carregar cada imagem
    imagens.forEach((url) => {
      const imagem = new Image();
      imagem.onload = verificarCarregamento;
      imagem.src = url;
    });
  },

  verificarSpritesCarregadas: function () {
    this.spritesCarregadas++;
    if (this.spritesCarregadas === this.totalSprites) {
      this.carregado = true;
    } else {
      this.carregado = false;
    }
  },

  // Funções de movimentação

  moverEsquerda: function () {
    this.direcao = DIRECAO_ESQUERDA;
    this.x -= 5;
    this.isMoving = true;
    this.movingEsquerda = true;
  },

  moverDireita: function () {
    this.direcao = DIRECAO_DIREITA;
    this.x += 5;
    this.isMoving = true;
    this.movingDireita = true;
  },

  bugDireitaEsquerda: function () {
    this.x += 0;
    this.isMoving = false;
    this.movingDireita = false;
    this.movingEsquerda = false;
  },

  pular: function () {
    var agora = new Date().getTime();
    if (agora - this.ultimoPulo > 1000) {
      this.velocidadeY = -12;
      this.pulando = true;
      this.ultimoPulo = agora;
    }
  },

  gravidade: function () {
    this.y += this.velocidadeY;
    this.velocidadeY += 0.5;
  },

  pararPulo: function () {
    this.y = this.groundHeight;
    this.velocidadeY = 0;
    this.pulando = false;
  },

  atualizar: function () {
    // Movimento horizontal, ESQUERDA E DIREITA
    if (this.teclado.pressionada(A) && this.teclado.pressionada(D)) {
      this.bugDireitaEsquerda();
      this.sons.pausarCorrer2();
    } else if (this.teclado.pressionada(A) && this.x >= -50) {
      this.moverEsquerda();
      this.sons.reproduzirCorrer2();
    } else if (this.teclado.pressionada(D) && this.x <= 710) {
      this.moverDireita();
      this.sons.reproduzirCorrer2();
    } else {
      this.isMoving = false;
      this.movingDireita = false;
      this.movingEsquerda = false;
      this.sons.pausarCorrer2();
    }

    // Gerenciar ataques e cooldown
    if (
      (this.teclado.pressionada(W) || this.pulando) &&
      (this.teclado.pressionada(V) || this.teclado.pressionada(B))
    ) {
      this.pulando = true;
      this.atacando1 = false;
      this.atacando2 = false;
    } else if (this.teclado.pressionada(V) && this.teclado.pressionada(B)) {
      this.atacando1 = false;
      this.atacando2 = false;
    } else if (this.teclado.pressionada(V) && this.cooldownAtaque1 === 0) {
      this.iniciarAtaque1();
      this.sons.reproduzirAtaque1();
    } else if (this.teclado.pressionada(B) && this.cooldownAtaque2 === 0) {
      this.iniciarAtaque2();
      this.sons.reproduzirAtaque2();
    }
    if (
      ((this.teclado.pressionada(V) && this.cooldownAtaque1 === 0) ||
        (this.teclado.pressionada(B) && this.cooldownAtaque2 === 0)) &&
      (this.teclado.pressionada(SETA_DIREITA) ||
        this.teclado.pressionada(SETA_ESQUERDA))
    ) {
      this.isMoving = true;
      this.iniciarAtaque1();
      this.iniciarAtaque2();
    }

    // Atualizar cooldowns
    this.cooldown();

    // Pulo
    if (this.teclado.pressionada(W) && !this.pulando) {
      this.sons.reproduzirPulo();
      this.pular();
    }

    // Aplicar gravidade
    this.gravidade();

    // Checar se está no chão
    if (this.y >= this.groundHeight) {
      this.pararPulo();
    }

    // Checar vida
    if (this.vida <= 0) {
      this.vivo = false;
      return;
    }

    //Controle de animção morte
    if (this.animandoMorte) {
      if (this.frameMorre === this.numSpritesMorre - 1) {
        this.animandoMorte = false;
      }
      return;
    }
  },

  //Funções de ataques
  iniciarAtaque1: function () {
    if (!this.atacando2 && !this.pulando) {
      this.atacando1 = true;
      this.tempoRestanteAtaque1 = this.tempoAtaque1;
      this.cooldownAtaque1 = 350;
      this.dano = 5;
      this.isMoving = false;
    }
  },

  iniciarAtaque2: function () {
    if (!this.atacando1 && !this.pulando) {
      this.atacando2 = true;
      this.tempoRestanteAtaque2 = this.tempoAtaque2;
      this.cooldownAtaque2 = 3000;
      this.dano = 10;
      this.isMoving = false;
    }
  },

  //Gerencia coowdowns

  cooldown: function () {
    if (this.cooldownAtaque1 > 0)
      this.cooldownAtaque1 = this.cooldownAtaque1 - 5;
    if (this.cooldownAtaque2 > 0)
      this.cooldownAtaque2 = this.cooldownAtaque2 - 5;

    if (this.tempoRestanteAtaque1 > 0) {
      this.tempoRestanteAtaque1--;
      if (this.tempoRestanteAtaque1 === 0) this.atacando1 = false;
    }

    if (this.tempoRestanteAtaque2 > 0) {
      this.tempoRestanteAtaque2--;
      if (this.tempoRestanteAtaque2 === 0) this.atacando2 = false;
    }
  },

  //Verifica vida

  verificaVida: function () {
    this.morto = true;
    this.animandoMorte = true;
    this.frameMorre = 0;
    this.contadorMorre = 0;
    this.sons.reproduzirMorte();
  },

  //Função para receber dano

  tomaDano: function (habilidade) {
    if (!this.animaDano) {
      this.sons.reproduzirDano();
      this.animaDano = true;
      this.vida -= habilidade;
      setTimeout(() => {
        this.animaDano = false;
      }, 450);
    }
  },

  //Reseta variaveis, para reincialização do jogo

  resetar: function (canvasWidth, canvasHeight) {
    this.nome = "Jogador 1";
    this.vida = 100;
    this.x = 0;
    this.y = 0;
    this.width = 155;
    this.height = 155;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.velocidadeY = 0;
    this.pulando = false;
    this.corVida = "green";
    this.isMoving = false;
    this.movingEsquerda = false;
    this.movingDireita = false;
    this.atacando1 = false;
    this.atacando2 = false;
    this.morto = false;
    this.animaDano = false;
    this.animandoMorte = false;
    this.tempoAtaque1 = 30;
    this.tempoAtaque2 = 40;
    this.cooldownAtaque1 = 0;
    this.cooldownAtaque2 = 0;
    this.tempoRestanteAtaque1 = 0;
    this.tempoRestanteAtaque2 = 0;
    this.dano = 0;
    this.ultimoPulo = 0;
    this.vivo = true;
  },

  //Desenha sprite do jogador

  desenharJogador: function () {
    let sprite, numSprites, largSprite, altSprite, frame, contador;

    // Seleciona a spritesheet a ser apresentada com base no estado atual do jogador
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
    } else if (this.animaDano) {
      sprite = this.spriteDano;
      numSprites = this.numSpritesDano;
      largSprite = this.largSpriteDano;
      altSprite = this.altSpriteDano;
      frame = this.frameDano;
      contador = this.contadorDano;
    } else if (this.pulando) {
      sprite = this.spritePulando;
      numSprites = this.numSpritesPulando;
      largSprite = this.largSpritePulando;
      altSprite = this.altSpritePulando;
      frame = this.framePulando;
      contador = this.contadorPulando;
    } else if (this.animandoMorte) {
      sprite = this.spriteMorre;
      numSprites = this.numSpritesMorre;
      largSprite = this.largSpriteMorre;
      altSprite = this.altSpriteMorre;
      frame = this.frameMorre;
      contador = this.contadorMorre;
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

    // Salva o contexto do canvas para poder restaurá-lo mais tarde
    this.context.save();

    // Desenha o jogador no canvas, invertendo a direção se necessário
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

    // Desenha o jogador novamente se ele estiver pulando e atacando ao mesmo tempo
    if (this.pulando && (this.atacando1 || this.atacando2)) {
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

    // Restaura o contexto do canvas ao estado salvo anteriormente
    this.context.restore();

    // Atualiza o contador e o frame para a animação
    contador++;
    if (contador >= 10) {
      frame = (frame + 1) % numSprites;
      contador = 0;
    }

    // Atualiza o frame e o contador de acordo com o estado atual do jogador
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
    } else if (this.animaDano) {
      this.frameDano = frame;
      this.contadorDano = contador;
    } else if (this.animandoMorte) {
      this.frameMorre = frame;
      this.contadorMorre = contador;
    } else {
      this.frameIdle = frame;
      this.contadorIdle = contador;
    }
  },

  desenharBarraVida: function () {
    // Lógica para desenhar a barra de vida
    var textoVidaX = 16;
    var textoVidaY = this.context.canvas.height - 23;
    var barraVidaX = 15;
    var barraVidaY = this.context.canvas.height - 20;
    var barraVidaWidth = 30;
    var barraVidaHeight = 10;

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
  },

  desenharBarrasCooldown: function () {
    var cooldownBarWidth = 100;
    var cooldownBarHeight = 10;
    var cooldownBarX1 = 50;
    var cooldownBarY1 = 480;
    var cooldownBarX2 = 155;
    var cooldownBarY2 = 480;

    // Barra de cooldown para o ataque 1
    this.context.fillStyle = "grey";
    this.context.fillRect(
      cooldownBarX1,
      cooldownBarY1,
      cooldownBarWidth,
      cooldownBarHeight
    );
    if (this.cooldownAtaque1 > 0) {
      const cooldownWidth1 = (this.cooldownAtaque1 / 350) * cooldownBarWidth;
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
      const cooldownWidth2 = (this.cooldownAtaque2 / 3000) * cooldownBarWidth;
      this.context.fillStyle = "blue";
      this.context.fillRect(
        cooldownBarX2,
        cooldownBarY2,
        cooldownWidth2,
        cooldownBarHeight
      );
    }
  },

  //Chama todas a funções de desenho relacionada ao personagem

  desenhar: function () {
    this.desenharJogador();
    this.desenharBarraVida();
    this.desenharBarrasCooldown();
  },
};
