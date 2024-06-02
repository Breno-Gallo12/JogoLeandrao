function TelaInicio(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

}

TelaInicio.prototype = {
    desenhar: function() {
        var ctx = this.context;
        ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    }
};
