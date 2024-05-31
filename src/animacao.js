function Animacao(context, background, sons, jogador, jogador2, telaGameOver, jogo, canvasWidth, canvasHeight) {
    this.context = context;
    this.sprites = [];
    this.ligado = false;
    this.background = background
    this.sons = sons;
    this.jogador = jogador
    this.jogador2 = jogador2
    this.telaGameOver = telaGameOver
    this.jogo = jogo;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight
}

Animacao.prototype.novoSprite = function (sprite) {
    this.sprites.push(sprite);
};

Animacao.prototype.reiniciar = function () {
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
    var jogador2 = this.jogador2;

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

Animacao.prototype.verificarEstadoJogadores = function () {
    if (!this.jogador.vivo) {
        this.animacaoMorte(this.jogador, this.jogador2);
    } else if (!this.jogador2.vivo) {
        this.animacaoMorte(this.jogador2, this.jogador);
    }
};

Animacao.prototype.animacaoMorte = function (jogadorMorto, outroJogador) {
    var animacao = this;

    jogadorMorto.animandoMorte = true;

    setTimeout(function() {
        animacao.jogo.mostrarGameOver(jogadorMorto,outroJogador);
        animacao.sons.pausarMusicaFundo();
        animacao.sons.reproduzirGameOver();

    }, 2500); // Tempo de espera de 1 segundo (1000 milissegundos)


    setTimeout(function () {
        animacao.sons.pausarMusicaFundo();

        // Exibir a tela de game over
        animacao.jogo.mostrarGameOver(jogadorMorto, outroJogador);
    }, 800);
}

Animacao.prototype.verificarColisao = function(jogador1, jogador2) {
    var colisao = false;

    // Verifica se os retângulos que representam os jogadores se sobrepõem
    if (jogador1.x < jogador2.x + jogador2.width &&
        jogador1.x + jogador1.width-160 > jogador2.x &&
        jogador1.y < jogador2.y + jogador2.height &&
        jogador1.y + jogador1.height-160 > jogador2.y) {
        colisao = true;

        // Verifica se o jogador 1 está atacando
        if (jogador1.atacando1 || jogador1.atacando2) {
            // Aplica dano ao jogador 2
            jogador2.tomaDano(jogador1.dano);
        }

        if (jogador2.atacando1 || jogador2.atacando2) {
            // Aplica dano ao jogador 2
            jogador1.tomaDano(jogador2.dano);
        }
    }

    return colisao;
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

    var colisao = this.verificarColisao(this.jogador, this.jogador2);

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
