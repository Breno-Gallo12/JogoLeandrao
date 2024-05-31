// Declaração de constantes para identificar códigos de teclas
var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var SETA_CIMA = 38;
var Q = 81;
var W = 87;
var ESPACO = 32;
var A = 65;
var D = 68;
var V = 86;
var B = 66;
var n2 = 98;
var n3 = 99;

// Declaração do construtor Teclado
function Teclado(elemento) {
    this.elemento = elemento;

    // Arrays para acompanhar teclas pressionadas e teclas disparadas
    this.pressionadas = [];
    this.disparadas = [];
    this.funcoesDisparo = [];

    var teclado = this;

    // Adiciona ouvintes de evento para detectar pressionamento e soltura de teclas
    elemento.addEventListener('keydown', function (evento) {
        var tecla = evento.keyCode;
        teclado.pressionadas[tecla] = true;

        // Se houver uma função de disparo registrada para esta tecla e ela não foi disparada antes, chama a função
        if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
            teclado.disparadas[tecla] = true;
            teclado.funcoesDisparo[tecla]();
        }
    });

    elemento.addEventListener('keyup', function (evento) {
        // Marca a tecla como não pressionada e não disparada quando ela é solta
        teclado.pressionadas[evento.keyCode] = false;
        teclado.disparadas[evento.keyCode] = false;
    });
}

// Definição dos métodos do protótipo Teclado
Teclado.prototype = {
    // Verifica se uma tecla está atualmente pressionada
    pressionada: function (tecla) {
        return this.pressionadas[tecla];
    },

    // Registra uma função de callback a ser chamada quando uma tecla é disparada
    disparou: function (tecla, callback) {
        this.funcoesDisparo[tecla] = callback;
    }
}
