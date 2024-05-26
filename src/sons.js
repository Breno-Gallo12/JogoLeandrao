function Som(){

    this.musicaFundo = new Audio("../sons/musicaFundo.mp3");
    this.correndo = new Audio("../sons/correndo.mp3");
    this.ataque1 = new Audio("../sons/ataque1.mp3");
    this.ataque2 = new Audio("../sons/ataque2.mp3");
    this.morte = new Audio("../sons/morte.mp3");
    this.dano = new Audio("../sons/dano.mp3");
    this.pulo = new Audio("../sons/pulo.mp3");


}

Som.prototype = {

    reproduzirMusicaFundo: function() {
        this.musicaFundo.loop = true;
        this.musicaFundo.volume = 0.05; 
        this.musicaFundo.play();
    },
    
    pausarMusicaFundo: function() {
        this.musicaFundo.pause();
    },
    
    reproduzirCorrer: function() {
        this.correndo.loop = true
        this.correndo.volume = 1
        this.correndo.play();
    },

    pausarCorrer: function() {
        this.correndo.pause();
    },

    reproduzirAtaque1: function() {
        this.ataque1.volume = 0.3
        this.ataque1.play();
    },

    reproduzirAtaque2: function() {
        this.ataque2.volume = 0.3
        this.ataque2.play();
    },

    reproduzirMorte: function() {
        this.morte.volume = 0.1
        this.morte.play();
    },

    reproduzirDano: function() {
        this.dano.volume = 0.1
        this.dano.play();
    },

    reproduzirPulo: function() {
        this.pulo.volume = 0.1
        this.pulo.play();
    },


}
