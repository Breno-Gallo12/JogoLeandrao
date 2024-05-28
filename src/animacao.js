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
    this.desligar();

    this.sprites = [];

    this.jogador.resetar(this.canvasWidth, this.canvasHeight);
    this.jogador2.resetar(this.canvasWidth, this.canvasHeight);

    this.novoSprite(this.jogador);
    this.novoSprite(this.jogador2);

    this.ligar();
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

    setTimeout(function() {
        animacao.jogo.mostrarGameOver(jogadorMorto,outroJogador);
        animacao.sons.pausarMusicaFundo();
    }, 2500); // Tempo de espera de 1 segundo (1000 milissegundos)

    this.desligar();
};

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
