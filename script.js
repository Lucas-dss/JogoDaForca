const titulo = document.getElementById("titulo");
const linha = document.getElementById("linha");
const palavra = document.getElementById("palavra");
const adivinhar = document.getElementById("adivinhar");
const labelChute = document.getElementById("labelChute");
const chute = document.getElementById("chute");
const botaoChutar = document.getElementById("botaoChutar");
const resultado = document.getElementById("resultado");
const reniciar = document.getElementById("reniciar");

// boneco
const cabeca = document.getElementById("cabeca");
const corpo = document.getElementById("corpo");
const bracoE = document.getElementById("bracoE");
const bracoD = document.getElementById("bracoD");
const pernaE = document.getElementById("pernaE");
const pernaD = document.getElementById("pernaD");

let boneco = [pernaD, pernaE, bracoD, bracoE, corpo, cabeca];

// variaveis para futuros eventos
var main = document.querySelector('main').style;
var body = document.querySelector('body').style;

var caveira = document.getElementById('caveira');
var caveira2 = document.getElementById('caveira2');
let caveiras = [caveira, caveira2];

// variaveis para musicas
const musica1 = new Audio("music/80 OR LESS [HILL.GYM].mp3");
const musica2 = new Audio("music/Cracked Empire [OM Mix].mp3");
const musica3 = new Audio("music/2017x Last Life Theme.mp3");
const musica4 = new Audio("music/Friends No More.mp3");

let musicas = [musica1, musica2, musica3, musica4];

let musicaAleatoria = musicas[Math.floor(Math.random() * musicas.length)];
var estaTocando = false;

// sistema do jogo
// 26 palavras no total
let palavras = ["dor", "mal", "tortura", "agonia", "aflicao", "angustia", "sofrimento", "crueldade", "amargura", "tormento", "estrela", "sofrer", 
    "vazio", "traicao", "cranio", "escapula", "umero", "clavicula", "costela", "radio", "femur", "tibia", "torax", "membro", "pescoco", "vertebra"];
// pega um valor inteiro aleatório com base na quantidade de palavras
let palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
let letrasAdivinhadas = [];
let tentativas = 6;
let erros = 0;

palavra.textContent = "_ ".repeat(palavraSecreta.length);
// evento de chutar uma letra
adivinhar.addEventListener("submit", function (event) {
    event.preventDefault();
    const letra = chute.value.toLowerCase();
    // Verifica se a letra é válida
    if (letrasAdivinhadas.includes(letra)) {
        resultado.textContent = "Você já tentou essa letra.";
    } else {
        // Adiciona a letra às letras adivinhadas
        letrasAdivinhadas.push(letra);
        // Verifica se a letra está na palavra secreta
        if (palavraSecreta.includes(letra)) {
            // Atualiza a palavra exibida
            palavra.textContent = palavraSecreta.split("").map(l => letrasAdivinhadas.includes(l) ? l : "_").join(" ");
            // se caso acabar todas as palavras
            if (!palavra.textContent.includes("_")) {
                musicaAleatoria.pause();
                body.fontFamily = "Times New Roman";
                titulo.textContent = "Bem-vindo ao Jogo da Forca!";
                linha.textContent = "(tente adivinhar a palavra secreta.)"
                resultado.textContent = "Parabéns! Você adivinhou a palavra ;).";
                reniciar.style.display = 'block';
                reniciar.style.fontFamily = 'Times New Roman';
                reniciar.style.backgroundColor = '#cfcf2d'
                adivinhar.style.display = 'none';
                labelChute.style.display = 'none';
                chute.style.display = 'none';
                botaoChutar.style.display = 'none';
                main.backgroundColor = 'rgb(255, 255, 255)';
                main.animation = 'tremendo 0s infinite';
                caveiras.forEach(img => img.style.filter = 'contrast(300%) brightness(300%) hue-rotate(310deg) saturate(400%) opacity(0)');
            }
        } else {
            tentativas--;
            erros++;
            if (tentativas === 1) {
                musicaAleatoria.volume = 0.2;
                musicaAleatoria.play();
                body.fontFamily = "QuietBrokenVoice";
                titulo.textContent = Math.floor(musicaAleatoria.duration);
                linha.textContent = "Boa sorte.";
                caveiras.forEach(img => img.style.animation = 'tremendo 1s infinite');
            }
            if (tentativas === 0) {
                musicaAleatoria.pause();
                body.fontFamily = "Times New Roman";
                titulo.textContent = "Bem-vindo ao Jogo da Forca!";
                linha.textContent = "(tente adivinhar a palavra secreta.)"
                resultado.textContent = "Fim de jogo. A palavra era: " + palavraSecreta;
                reniciar.style.display = 'block';
                reniciar.style.fontFamily = 'QuietBrokenVoice';
                adivinhar.style.display = 'none';
                labelChute.style.display = 'none';
                chute.style.display = 'none';
                botaoChutar.style.display = 'none';
                caveiras.forEach(img => img.style.animation = 'tremendo 0s infinite');
            } else {
                resultado.textContent = "Errou. Você tem mais: " + tentativas + " tentativa(s).";
                chute.value = "";
            }
            boneco[tentativas].style.display = 'block';
            main.backgroundColor = 'rgb(255, ' + 42.5 * tentativas + ', ' + 42.5 * tentativas + ')';
            main.animation = 'tremendo ' + (tentativas * tentativas) + '00ms infinite';
            caveiras.forEach(img => img.style.filter = 'contrast(300%) brightness(300%) hue-rotate(310deg) saturate(400%) opacity(' + 0.16 * erros + ')');
        }
    }
    chute.value = "";
});
// evento de reiniciar
reniciar.addEventListener("click", function (event) {
    event.preventDefault();

    chute.value = "";
    // volta o sistema do jogo
    palavras = ["dor", "mal", "tortura", "agonia", "aflicao", "angustia", "sofrimento", "crueldade", "amargura", "tormento", "estrela", "sofrer", 
    "vazio", "traicao", "cranio", "escapula", "umero", "clavicula", "costela", "radio", "femur", "tibia", "torax", "membro", "pescoco", "vertebra"];
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    letrasAdivinhadas = [];
    tentativas = 6;
    erros = 0;

    palavra.textContent = "_ ".repeat(palavraSecreta.length);

    // volta ao normal
    resultado.textContent = "";
    reniciar.style.display = 'none';
    reniciar.style.backgroundColor = '';
    adivinhar.style.display = 'flex';
    labelChute.style.display = 'block';
    chute.style.display = 'block';
    botaoChutar.style.display = 'block';
    main.backgroundColor = 'rgb(255, 255, 255)';
    main.animation = 'tremendo 0s infinite';
    caveiras.forEach(img => img.style.filter = 'contrast(300%) brightness(300%) hue-rotate(310deg) saturate(400%) opacity(0)');

    for (let i = 0; i <= tentativas; i++) {
        boneco[i].style.display = 'none'
    }

    musicaAleatoria = musicas[Math.floor(Math.random() * musicas.length)];

})
// funções para músicas
function togglePlay() {
    if (estaTocando) {
        musicaAleatoria.pause();
    } else {
        musicaAleatoria.play();
    }
}
musicaAleatoria.onplaying = function () {
    estaTocando = true;
}
musicaAleatoria.onpause = function () {
    musicaAleatoria.currentTime = 0;
    estaTocando = false;
}