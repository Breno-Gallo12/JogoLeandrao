function Animacao(context,background,sons,jogador) {
    this.context = context;
    this.sprites = [];
    this.ligado = false;
    this.background = background
    this.sons = sons;
    this.jogador = jogador
}

Animacao.prototype.novoSprite = function (sprite) {
    this.sprites.push(sprite);
};

Animacao.prototype.ligar = function () {
    var animacao = this;
    var jogador = this.jogador

    if (!jogador.carregado) {
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

Animacao.prototype.proximoFrame = function () {
    if (!this.ligado) return
    this.limparTela();
    
    this.background.desenhaBackground();
    this.sons.reproduzirMusicaFundo();


    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].atualizar();
        this.sprites[i].desenhar();
    }

    var animacao = this;

    requestAnimationFrame(function () {
        animacao.proximoFrame();
    });
};

Animacao.prototype.limparTela = function () {
    var ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
