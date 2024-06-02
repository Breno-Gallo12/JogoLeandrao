function TelaInicio(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.image = new Image();
    this.image.src = "../img/background/TelaInicial.png";

    // Usando uma referência a 'this' para acessar a instância atual dentro da função de retorno do evento onload
    var self = this;
    this.image.onload = function() {
        // Após o carregamento da imagem, chama o método desenhar
        self.desenhar();
    };
}

TelaInicio.prototype = {
    desenhar: function() {
        var ctx = this.context;
        ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    }
};
