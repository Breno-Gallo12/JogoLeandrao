// Define a função construtora Animacao
function Animacao(context, background, sons, jogador, jogador2, telaGameOver, jogo, canvasWidth, canvasHeight) {
    // Define o contexto do canvas
    this.context = context;
    // Inicializa a lista de sprites
    this.sprites = [];
    // Estado da animação, inicialmente desligada
    this.ligado = false;
    // Define o background
    this.background = background;
    // Define os sons
    this.sons = sons;
    // Define os jogadores
    this.jogador = jogador;
    this.jogador2 = jogador2;
    // Define a tela de game over
    this.telaGameOver = telaGameOver;
    // Define o jogo
    this.jogo = jogo;
    // Define a largura do canvas
    this.canvasWidth = canvasWidth;
    // Define a altura do canvas
    this.canvasHeight = canvasHeight;
}

// Adiciona um novo sprite à lista de sprites
Animacao.prototype.novoSprite = function (sprite) {
    this.sprites.push(sprite);
};

// Reinicia a animação
Animacao.prototype.reiniciar = function () {
    if (!this.ligado) {
        // Limpa a lista de sprites
        this.sprites = [];

        // Reseta os jogadores
        this.jogador.resetar(this.canvasWidth, this.canvasHeight);
        this.jogador2.resetar(this.canvasWidth, this.canvasHeight);

        // Adiciona os jogadores à lista de sprites
        this.novoSprite(this.jogador);
        this.novoSprite(this.jogador2);

        // Liga a animação novamente
        this.ligar();
    }
};

// Liga a animação
Animacao.prototype.ligar = function () {
    var animacao = this;
    var jogador = this.jogador;
    var jogador2 = this.jogador2;

    // Verifica se os jogadores estão carregados
    if (!jogador.carregado && !jogador2.carregado) {
        setTimeout(function () {
            animacao.ligar();
        }, 100);
        return;
    }
    // Define o estado da animação como ligado
    this.ligado = true;
    // Inicia o próximo frame da animação
    this.proximoFrame();
};

// Desliga a animação
Animacao.prototype.desligar = function () {
    this.ligado = false;
};

// Verifica o estado dos jogadores (se estão vivos ou mortos)
Animacao.prototype.verificarEstadoJogadores = function () {
    if (!this.jogador.vivo) {
        this.animacaoMorte(this.jogador, this.jogador2);
        this.jogador2.venceu = true;
    } else if (!this.jogador2.vivo) {
        this.animacaoMorte(this.jogador2, this.jogador);
        this.jogador.venceu = true;
    }
};

// Animação de morte do jogador
Animacao.prototype.animacaoMorte = function (jogadorMorto, outroJogador) {
    var animacao = this;

    // Define que o jogador está animando a morte
    jogadorMorto.animandoMorte = true;

    setTimeout(function() {
        animacao.jogo.mostrarGameOver(jogadorMorto,outroJogador);
        animacao.sons.pausarMusicaFundo();
        animacao.sons.reproduzirGameOver();

    }, 2500); // Tempo de espera de 1 segundo (1000 milissegundos)


    setTimeout(function () {
        // Pausa a música de fundo
        animacao.sons.pausarMusicaFundo();

        // Exibe a tela de game over
        animacao.jogo.mostrarGameOver(jogadorMorto, outroJogador);
    }, 800);
}

// Verifica a colisão entre os jogadores
Animacao.prototype.verificarColisao = function(jogador1, jogador2) {
    var colisao = false;

    // Verifica se os retângulos que representam os jogadores se sobrepõem
    if (jogador1.x < jogador2.x + jogador2.width &&
        jogador1.x + jogador1.width > jogador2.x &&
        jogador1.y < jogador2.y + jogador2.height &&
        jogador1.y + jogador1.height > jogador2.y) {
        colisao = true;

        // Verifica se o jogador 1 está atacando
        if (jogador1.atacando1 || jogador1.atacando2) {
            // Aplica dano ao jogador 2
            jogador2.tomaDano(jogador1.dano);
        }

        // Verifica se o jogador 2 está atacando
        if (jogador2.atacando1 || jogador2.atacando2) {
            // Aplica dano ao jogador 1
            jogador1.tomaDano(jogador2.dano);
        }
    }

    return colisao;
};

// Executa o próximo frame da animação
Animacao.prototype.proximoFrame = function () {
    if (!this.ligado) return;
    
    // Limpa a tela
    this.limparTela();

    // Desenha o background
    this.background.desenhaBackground();
    // Reproduz a música de fundo
    this.sons.reproduzirMusicaFundo();

    // Atualiza e desenha cada sprite na lista de sprites
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].atualizar();
        this.sprites[i].desenhar();
    }

    // Verifica colisão entre os jogadores
    var colisao = this.verificarColisao(this.jogador, this.jogador2);

    // Verifica o estado dos jogadores
    this.verificarEstadoJogadores();

    var animacao = this;

    // Solicita o próximo frame da animação
    requestAnimationFrame(function () {
        animacao.proximoFrame();
    });
};

// Limpa a tela
Animacao.prototype.limparTela = function () {
    var ctx = this.context;
    // Limpa o canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
