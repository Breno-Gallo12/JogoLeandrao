function TelaGameOver(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.image1 = new Image();
    this.image1.src = "../img/background/Jogador 1.png";
    this.image2 = new Image();
    this.image2.src = "../img/background/Jogador 2.png";
  
    this.imagesLoaded = 0;

    // Usando uma referência a 'this' para acessar a instância atual dentro da função de retorno do evento onload
    var self = this;
    this.image1.onload = function () {
        self.imagesLoaded++;
        if (self.imagesLoaded === 2 && self.vencedor) {
            self.desenhar(self.vencedor);
        }
    };
    this.image2.onload = function () {
        self.imagesLoaded++;
        if (self.imagesLoaded === 2 && self.vencedor) {
            self.desenhar(self.vencedor);
        }
    };
  }
  

  
  TelaGameOver.prototype = {
        // Método para definir o vencedor e desenhar a tela
        setVencedor: function (vencedor) {
            this.vencedor = vencedor;
            if (this.imagesLoaded === 2) {
                this.desenhar(vencedor);
            }
        },

    // Desenha a tela Gameover
    desenhar: function (vencedor) {
      var ctx = this.context;
      ctx.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      if (vencedor.nome === "Jogador 1") { // Corrige a comparação
        ctx.drawImage(this.image1, 0, 0, this.canvasWidth, this.canvasHeight);
      } else {
        ctx.drawImage(this.image2, 0, 0, this.canvasWidth, this.canvasHeight);
      }
    },
  };
  