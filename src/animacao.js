function Animacao(context,background,sons,jogador,jogador2,telaGameOver,jogo,canvasWidth,canvasHeight) {
    this.context = context;
    this.sprites = [];
    this.ligado = false;
    this.background = background
    this.sons = sons;
    this.jogador = jogador
    this.jogador2=jogador2
    this.telaGameOver = telaGameOver
    this.jogo = jogo;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight
}

Animacao.prototype.novoSprite = function (sprite) {
    this.sprites.push(sprite);
};

Animacao.prototype.reiniciar = function() {
    if (!this.ligado) {
        // Limpar a lista de sprites
        this.sprites = [];

        // Resetar os jogadores
        this.jogador.resetar(this.canvasWidth, this.canvasHeight);
        this.jogador2.resetar(this.canvasWidth, this.canvasHeight);

        // Adicionar os jogadores à lista de sprites
        this.novoSprite(this.jogador);
        this.novoSprite(this.jogador2);

        // Ligar a animação novamente
        this.ligar();
    }
};



Animacao.prototype.ligar = function () {
    var animacao = this;
    var jogador = this.jogador;
    var jogador2 =this.jogador2;

    if (!jogador.carregado && !jogador2.carregado) {
        setTimeout(function () {
            animacao.ligar();
        }, 100);
        return;
    }
    this.ligado = true;
    this.proximoFrame();
};


Animacao.prototype.desligar = function () {
    this.ligado = false;
};

Animacao.prototype.verificarEstadoJogadores = function() {
    if (!this.jogador.vivo) {
        this.animacaoMorte(this.jogador, this.jogador2);
    } else if (!this.jogador2.vivo) {
        this.animacaoMorte(this.jogador2, this.jogador);
    }
};

Animacao.prototype.animacaoMorte = function(jogadorMorto, outroJogador) {
    var animacao = this;

    jogadorMorto.animandoMorte = true;

    setTimeout(function() {
        animacao.sons.pausarMusicaFundo();

        // Exibir a tela de game over
        animacao.jogo.mostrarGameOver(jogadorMorto, outroJogador);
    }, 800); 
}


Animacao.prototype.proximoFrame = function () {
    if (!this.ligado) return
    this.limparTela();
    
    this.background.desenhaBackground();
    this.sons.reproduzirMusicaFundo();


    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].atualizar();
        this.sprites[i].desenhar();
    }

    this.verificarEstadoJogadores();

    var animacao = this;

    requestAnimationFrame(function () {
        animacao.proximoFrame();
    });
};

Animacao.prototype.limparTela = function () {
    var ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
