// Define a função construtora Background
function Background(context, canvasWidth, canvasHeight, jogador, jogador2) {
  // Inicializa o contexto, largura e altura do canvas
  this.context = context;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.movSpeed = 0; // Velocidade de movimento do background
  this.jogador = jogador;
  this.jogador2 = jogador2;

  // Carrega as imagens de background
  this.images = [
    "../img/background/1.png",
    "../img/background/2.png",
    "../img/background/3.png",
    "../img/background/4.png",
    "../img/background/5.png",
    "../img/background/6.png",
    "../img/background/7.png",
    "../img/background/8.png",
  ].map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  // Cria as camadas de background com diferentes velocidades de movimento
  this.solLayer = new Layer(this.context, this.images[0], 0.01, 0, this.canvasWidth, this.canvasHeight);
  this.nuvemLayer = new Layer(this.context, this.images[1], 0.5, 10, this.canvasWidth, this.canvasHeight);
  this.arvoreLayer = new Layer(this.context, this.images[2], 0.01, 15, this.canvasWidth, this.canvasHeight);
  this.arvolelongeLayer = new Layer(this.context, this.images[3], 0, 5, this.canvasWidth, this.canvasHeight);
  this.pedrasLayer = new Layer(this.context, this.images[4], 0, 40, this.canvasWidth, this.canvasHeight);
  this.ambienteLayer = new Layer(this.context, this.images[5], 0.01, 15, this.canvasWidth, this.canvasHeight);
  this.chaoLayer = new Layer(this.context, this.images[6], 0, 15, this.canvasWidth, this.canvasHeight);
  this.galhosLayer = new Layer(this.context, this.images[7], 0.1, 0, this.canvasWidth, this.canvasHeight);

  // Define a ordem das camadas de fundo
  this.fundo = [
    this.solLayer,
    this.nuvemLayer,
    this.arvolelongeLayer,
    this.arvoreLayer,
    this.pedrasLayer,
    this.ambienteLayer,
    this.chaoLayer,
    this.galhosLayer,
  ];
}

// Define a classe Layer
class Layer {
  constructor(context, image, movSpeed, y_Position, canvasWidth, canvasHeight) {
    // Inicializa os parâmetros da camada
    this.context = context;
    this.image = image;
    this.defaultSpeedModifier = movSpeed; // Velocidade padrão da camada
    this.speedModifier = movSpeed; // Velocidade atual da camada
    this.y = y_Position; // Posição vertical da camada
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = 0; // Posição horizontal inicial
    this.x2 = canvasWidth; // Posição horizontal inicial da segunda imagem
    this.z1 = 0; // Posição horizontal inicial (não utilizada)
    this.z2 = canvasWidth; // Posição horizontal inicial da segunda imagem (não utilizada)
  }

  // Desenha a camada
  draw() {
    var ctx = this.context;
    ctx.drawImage(this.image, this.x, this.y, this.canvasWidth, this.canvasHeight);
    ctx.drawImage(this.image, this.x2, this.y, this.canvasWidth, this.canvasHeight);
  }

  // Atualiza a posição da camada com base na direção do movimento
  update(direction) {
    this.x += this.speedModifier * direction;
    this.x2 += this.speedModifier * direction; 

    // Verifica se a imagem saiu da tela e ajusta a posição para criar um efeito de loop
    if (this.x > this.canvasWidth) {
      this.x = this.x2 - this.canvasWidth + this.speedModifier;
    } else if (this.x < -this.canvasWidth) {
      this.x = this.x2 + this.canvasWidth - this.speedModifier;
    }

    if (this.x2 > this.canvasWidth) {
      this.x2 = this.x - this.canvasWidth + this.speedModifier;
    } else if (this.x2 < -this.canvasWidth) {
      this.x2 = this.x + this.canvasWidth - this.speedModifier;
    }
  }
}

// Define os métodos do protótipo de Background
Background.prototype = {
  desenhaBackground: function () {
    var ctx = this.context;
    // Limpa a tela
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Define as velocidades máximas para diferentes camadas
    var maxSpeed = 4;
    var maxSol = 0.05;
    var maxArvore = 2.5;
    var maxGeral = 3;
    var jogador = this.jogador;
    var jogador2 = this.jogador2;
    var direction = 0;

    // Define a direção do movimento com base na movimentação dos jogadores
    if (jogador.movingEsquerda || jogador2.movingEsquerda) {
      direction = 1; // Move para a esquerda
    } else if (jogador.movingDireita || jogador2.movingDireita) {
      direction = -1; // Move para a direita
    }

    // Atualiza e desenha cada camada de fundo
    this.fundo.forEach((object) => {
      if (direction !== 0) {
        // Ajusta a velocidade das camadas com base na direção do movimento
        if (object === this.solLayer) {
          if (object.speedModifier < maxSol) {
            object.speedModifier += 0.001;
          }
        } else if (object === this.arvoreLayer) {
          if (object.speedModifier < maxArvore) {
            object.speedModifier += 0.01;
          }
        } else if (object === this.arvolelongeLayer) {
          if (object.speedModifier < maxArvore) {
            object.speedModifier += 0.03;
          }
        } else if (object === this.pedrasLayer) {
          if (object.speedModifier < maxGeral) {
            object.speedModifier += 0.03;
          }
        } else if (object === this.ambienteLayer) {
          if (object.speedModifier < maxGeral) {
            object.speedModifier += 0.05;
          }
        } else if (object === this.chaoLayer) {
          if (object.speedModifier < maxGeral) {
            object.speedModifier += 0.01;
          }
        } else if (object === this.galhosLayer) {
          if (object.speedModifier < maxGeral) {
            object.speedModifier += 0.1;
          }
        } else {
          if (object.speedModifier < maxSpeed) {
            object.speedModifier += 0.01;
          }
        }
        object.update(direction); 
        object.draw();
      } else {
        // Restaura a velocidade padrão das camadas
        object.speedModifier = object.defaultSpeedModifier;
        object.update(1);
        object.draw();
      }
    });
  },
};
