// Define a função construtora Jogo
function Jogo(canvas) {
    // Inicializa o canvas
    this.canvas = canvas;
    // Obtém o contexto 2D do canvas
    this.context = canvas.getContext('2d');
    // Inicializa o teclado
    this.teclado = new Teclado(document);
    // Inicializa os sons
    this.sons = new Som();
    // Cria a tela de início
    this.telaInicio = new TelaInicio(this.context, this.canvas.width, this.canvas.height);
    // Cria a tela de game over
    this.telaGameOver = new TelaGameOver(this.context, this.canvas.width, this.canvas.height);
    // Cria o jogador 1
    this.jogador = new Jogador(this.context, this.teclado, this.animacao, this.sons, this.canvas.width, this.canvas.height, this.telaGameOver);
    // Cria o jogador 2
    this.jogador2 = new Jogador2(this.context, this.teclado, this.animacao, this.sons, this.canvas.width, this.canvas.height, this.telaGameOver);
    // Cria o background
    this.background = new Background(this.context, this.canvas.width, this.canvas.height, this.jogador, this.jogador2);
    // Cria a animação
    this.animacao = new Animacao(this.context, this.background, this.sons, this.jogador, this.jogador2, this.telaGameOver, this, this.canvas.width, this.canvas.height);
    // Define o estado do jogo como ativo
    this.gameState = true;
}

// Define os métodos do protótipo de Jogo
Jogo.prototype = {
    // Método para iniciar o jogo
    inicio: function () {
        // Desenha a tela de início
        this.telaInicio.desenhar();

        var enterPressionado = false;

        // Adiciona um listener para pressionar a tecla Enter
        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 13 && !enterPressionado) { 
                // Validação para apertas Enter apenas 1 vez
                enterPressionado = true;
                this.gameState = false;
                // Inicia o loop do jogo
                this.loopJogo();
            }
        }.bind(this));
    },

    // Método para o loop principal do jogo
    loopJogo: function () {
        // Verifica se o jogo está ativo e os jogadores não estão mortos
        if (this.gameState === false && !this.jogador.morto && !this.jogador2.morto) {
            // Inicia os jogadores
            this.jogador.iniciar();
            this.jogador2.iniciar();
            // Adiciona os jogadores à animação
            this.animacao.novoSprite(this.jogador);
            this.animacao.novoSprite(this.jogador2);
            // Liga a animação
            this.animacao.ligar();
        }
    },

    // Método para mostrar a tela de game over
    mostrarGameOver: function (perdedor, vencedor) {
        var espacoPressionado = false;

        // Desenha a tela de game over
        this.telaGameOver.desenhar(vencedor);
        // Desliga a animação
        this.animacao.desligar();
        
        // Adiciona um listener para pressionar a tecla Espaço
        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 32 && !espacoPressionado) { 
                // Validação para apertas Espaço apenas 1 vez
                espacoPressionado = true;
                // Reinicia o jogo
                this.reiniciarJogo();
            }
        }.bind(this)); // Bind this para o escopo correto
    },

    // Método para reiniciar o jogo
    reiniciarJogo: function() {
        // Reinicia a animação
        this.animacao.reiniciar();
    },
};
