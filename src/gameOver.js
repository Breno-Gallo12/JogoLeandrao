function TelaGameOver(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

}

TelaGameOver.prototype = {

    desenhar: function () {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.fillStyle = "white";
        this.context.font = "30px Arial";
        this.context.fillText("Game Over", 100, 200);
    },

    mostrarGameOver: function () {
        // Mostra a tela de Game Over
        this.desenhar();

        // Configura um ouvinte de evento para aguardar a tecla de espaço ser pressionada
        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 32) { // Código da tecla de espaço
                // Reinicia o jogo
                this.reiniciarJogo();
            }
        }.bind(this));
    },
    // Reinicia o jogo
    reiniciarJogo: function () {
        // Remove o ouvinte de evento da tecla de espaço
        document.removeEventListener("keydown");

        // Reinicia o jogo chamando o método inicio novamente
        this.inicio();
    }
}
