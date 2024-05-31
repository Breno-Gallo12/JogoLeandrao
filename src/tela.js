function TelaInicio(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

}

    TelaInicio.prototype = {

        //Desenha a tela inical do jogo

        desenhar: function () {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.context.fillStyle = "white";
            this.context.font = "30px Arial";
            this.context.fillText("Pressione ENTER para começar", 180, 250);
        },

    }
