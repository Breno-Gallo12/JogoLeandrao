function Jogo(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.teclado = new Teclado(document);
    this.sons = new Som()
    this.telaInicio = new TelaInicio(this.context, this.canvas.width, this.canvas.height);
    this.telaGameOver = new TelaGameOver(this.context, this.canvas.width, this.canvas.height);
    this.jogador = new Jogador(this.context, this.teclado, this.animacao, this.sons, this.canvas.width, this.canvas.height,this.telaGameOver);
    this.jogador2 = new Jogador2(this.context, this.teclado, this.animacao, this.sons, this.canvas.width, this.canvas.height,this.telaGameOver);
    this.background = new Background(this.context, this.canvas.width, this.canvas.height, this.jogador);
    this.background = new Background(this.context, this.canvas.width, this.canvas.height, this.jogador2);
    this.animacao = new Animacao(this.context, this.background, this.sons, this.jogador);
    this.gameState = true;
    this.animacao = new Animacao(this.context, this.background, this.sons, this.jogador2);
    this.gameState = true;
}

Jogo.prototype = {
    inicio: function () {
        var primeiraVez = sessionStorage.getItem('primeiraVez');

        // Bug da sprite não carregar na primeira execução
        if (!primeiraVez) {
            sessionStorage.setItem('primeiraVez', 'false');
            setTimeout(function () {
                location.reload();
            }, 100);
        }

        this.telaInicio.desenhar();

        var enterPressionado = false;

        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 13 && !enterPressionado) {
                enterPressionado = true
                this.gameState = false;
                this.loopJogo();
            }
        }.bind(this));
    },

    loopJogo: function () {
        if (this.gameState === false && !this.jogador.morto){
            this.animacao.novoSprite(this.jogador);
            this.animacao.novoSprite(this.jogador2);
            this.animacao.ligar();
        } else if (this.jogador.morto === true) {
            this.telaGameOver.mostrarGameOver();
        }
        else {
            this.telaInicio.desenhar();
        }
    },
}
