function Animacao(context,background) {
    this.context = context;
    this.sprites = [];
    this.ligado = false;
    this.background = background
}

Animacao.prototype.novoSprite = function (sprite) {
    this.sprites.push(sprite);
};

Animacao.prototype.ligar = function () {
    this.ligado = true;
    this.proximoFrame();
};

Animacao.prototype.desligar = function () {
    this.ligado = false;
};

Animacao.prototype.proximoFrame = function () {
    if (!this.ligado) return;

    this.limparTela();
    
    this.background.desenhaBackground();

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
