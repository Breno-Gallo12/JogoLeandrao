function TelaGameOver(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

}

TelaGameOver.prototype = {

    desenhar: function (vencedor, perdedor) {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.context.font = '36px Arial';
            this.context.fillStyle = 'red';
            this.context.textAlign = 'center';
            this.context.fillText('Game Over', this.context.canvas.width / 2, this.context.canvas.height / 2 - 60);
            this.context.fillStyle = 'white';
            this.context.fillText(vencedor.nome + ' venceu!', this.context.canvas.width / 2, this.context.canvas.height / 2);
            this.context.fillStyle = 'blue';
            this.context.fillText('Pressione Espaço para reiniciar', this.context.canvas.width / 2, this.context.canvas.height / 2 + 60);
        }
}
