function Som(){
    // Inicializa os objetos de áudio com os arquivos de som correspondentes
    this.musicaFundo = new Audio("../sons/musicaFundo2.mp3");
    this.correndo = new Audio("../sons/correndo.mp3");
    this.correndo2 = new Audio("../sons/correndo2.mp3");
    this.ataque1 = new Audio("../sons/ataque1.mp3");
    this.ataque2 = new Audio("../sons/ataque2.mp3");
    this.morte = new Audio("../sons/morte.mp3");
    this.dano = new Audio("../sons/dano.mp3");
    this.pulo = new Audio("../sons/pulando2.mp3");
    this.pulo1 = new Audio("../sons/pulo.mp3");
    this.ataque3 = new Audio("../sons/ataque3.mp3");
    this.ataque4 = new Audio("../sons/ataque4.mp3");
    
}

Som.prototype = {
    // Reproduz a música de fundo em loop com volume reduzido
    reproduzirMusicaFundo: function() {
        this.musicaFundo.loop = true;
        this.musicaFundo.volume = 0.2; 
        this.musicaFundo.play();
    },
    
    // Pausa a reprodução da música de fundo
    pausarMusicaFundo: function() {
        this.musicaFundo.pause();
    },
    
    // Reproduz o som de corrida em loop com volume máximo
    reproduzirCorrer: function() {
        this.correndo.loop = true;
        this.correndo.volume = 1;
        this.correndo.play();
    },

    // Reproduz um segundo som de corrida em loop com volume máximo
    reproduzirCorrer2: function() {
        this.correndo2.loop = true;
        this.correndo2.volume = 1;
        this.correndo2.play();
    },

    // Pausa o som de corrida
    pausarCorrer: function() {
        this.correndo.pause();
    },

    // Pausa o segundo som de corrida
    pausarCorrer2: function() {
        this.correndo2.pause();
    },

    // Reproduz o som de ataque 1 com volume reduzido
    reproduzirAtaque1: function() {
        this.ataque1.volume = 0.3;
        this.ataque1.play();
    },

    // Reproduz o som de ataque 2 com volume reduzido
    reproduzirAtaque2: function() {
        this.ataque2.volume = 0.3;
        this.ataque2.play();
    },

    // Reproduz o som de morte com volume reduzido
    reproduzirMorte: function() {
        this.morte.volume = 0.1;
        this.morte.play();
    },

    // Reproduz o som de dano com volume reduzido
    reproduzirDano: function() {
        this.dano.volume = 0.1;
        this.dano.play();
    },

    // Reproduz o som de pulo com volume reduzido
    reproduzirPulo: function() {
        this.pulo.volume = 0.1;
        this.pulo.play();
    },

    // Reproduz o segundo som de pulo com volume reduzido
    reproduzirPulo1: function() {
        this.pulo1.volume = 0.1;
        this.pulo1.play();
    },

    reproduzirAtaque3: function() {
        this.ataque3.volume = 0.6
        this.ataque3.play();
    },

    reproduzirAtaque4: function() {
        this.ataque4.volume = 0.6;
        this.ataque4.play();
    },
}
