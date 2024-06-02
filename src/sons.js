function Som(){
    this.musicaFundo = new Audio("../sons/musicaFundo.mp3");
    this.correndo = new Audio("../sons/correndo.mp3");
    this.correndo2 = new Audio("../sons/correndo2.mp3");
    this.correndot = new Audio("../sons/correndo.mp3");
    this.ataque1 = new Audio("../sons/ataque1.mp3");
    this.ataque2 = new Audio("../sons/ataque2.mp3");
    this.morte = new Audio("../sons/morte.mp3");
    this.dano = new Audio("../sons/dano.mp3");
    this.pulo = new Audio("../sons/pulando2.mp3");
    this.pulo1 = new Audio("../sons/pulo.mp3");
    this.pulo = new Audio("../sons/pulo.mp3");
    this.pulot = new Audio("../sons/pulo.mp3");
    this.gameOver = new Audio("../sons/gameOver.mp3")
}

Som.prototype = {
    pausarTudo : function(){    
        this.musicaFundo.pause();
        this.correndo.pause();
        this.correndo2.pause();
    },


    // Reproduz a música de fundo em loop com volume reduzido
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

    reproduzirCorrer2: function() {
        this.correndo2.loop = true
        this.correndo2.volume = 1
        this.correndo2.play();
    },

    // Pausa o som de corrida

    pausarCorrer: function() {
        this.correndo.pause();
    },

    pausarCorrer2: function() {
        this.correndo2.pause();
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

    reproduzirPulo1: function() {
        this.pulo1.volume = 0.1
        this.pulo1.play();
    },
    reproduzirPulot: function() {
        this.pulot.volume = 0.1
        this.pulot.play();
    },
    reproduzirGameOver: function() {
        this.gameOver.volume = 0.6
        this.gameOver.play();
    },


}
