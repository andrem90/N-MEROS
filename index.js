let numeroAleatorio;
let tentativasRestantes;
let numerosEscolhidos;
let numeroAtual;
let digitosAcertados;

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 1000);
}

function inicializarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    tentativasRestantes = 7;
    numerosEscolhidos = [];
    numeroAtual = '';
    digitosAcertados = ['_', '_', '_'];
    atualizarInterface();
    exibirMensagem('Bem-vindo! Tente adivinhar o número.', '#ffffff');
}

function adicionarDigito(digito) {
    if (numeroAtual.length < 3) {
        numeroAtual += digito;
        atualizarInterface();
    }
}

function removerDigito() {
    numeroAtual = numeroAtual.slice(0, -1);
    atualizarInterface();
}

function confirmarNumero() {
    if (numeroAtual.length === 3 && tentativasRestantes > 0) {
        const numeroEscolhido = parseInt(numeroAtual);
        numerosEscolhidos.push(numeroEscolhido);
        tentativasRestantes--;

        atualizarDigitosAcertados(numeroEscolhido);

        if (numeroEscolhido === numeroAleatorio) {
            exibirMensagem('Parabéns! Acertou!', '#4CAF50');
        } else if (tentativasRestantes === 0) {
            exibirMensagem(`Perdeu. O número era ${numeroAleatorio}.`, '#F44336');
        } else {
            let dica = numeroEscolhido < numeroAleatorio ? 'maior' : 'menor';
            exibirMensagem(`Tente de Nvamente. O número é ${dica} que ${numeroEscolhido}. Tem ${tentativasRestantes} tentativa(s) restante(s).`, '#2196F3');
        }

        numeroAtual = '';
        atualizarInterface();
    }
}

function atualizarDigitosAcertados(numeroEscolhido) {
    const numeroAleatorioString = numeroAleatorio.toString().padStart(3, '0');
    const numeroEscolhidoString = numeroEscolhido.toString().padStart(3, '0');

    for (let i = 0; i < 3; i++) {
        if (numeroEscolhidoString[i] === numeroAleatorioString[i]) {
            digitosAcertados[i] = numeroEscolhidoString[i];
        }
    }
}

function exibirMensagem(texto, cor) {
    const mensagemElement = document.getElementById('mensagem');
    mensagemElement.textContent = texto;
    mensagemElement.style.color = cor;
}

function atualizarInterface() {
    document.getElementById('tentativas-restantes').textContent = tentativasRestantes;
    document.getElementById('numeros-escolhidos').textContent = `Números escolhidos: ${numerosEscolhidos.join(', ')}`;
    document.getElementById('numero-atual').textContent = `Número atual: ${numeroAtual}`;

    const digitosElements = document.querySelectorAll('#numero-secreto .digito');
    digitosElements.forEach((el, index) => {
        el.textContent = digitosAcertados[index];
    });

    const botoes = document.querySelectorAll('.numero-btn');
    botoes.forEach(botao => {
        botao.disabled = tentativasRestantes === 0 || numeroAtual.length >= 3;
    });

    document.getElementById('backspace').disabled = numeroAtual.length === 0;
    document.getElementById('enter').disabled = numeroAtual.length !== 3 || tentativasRestantes === 0;
}

function reiniciarJogo() {
    inicializarJogo();
}

document.querySelectorAll('.numero-btn').forEach(botao => {
    botao.addEventListener('click', () => adicionarDigito(botao.dataset.numero));
});

document.getElementById('backspace').addEventListener('click', removerDigito);
document.getElementById('enter').addEventListener('click', confirmarNumero);
document.getElementById('jogar-novamente').addEventListener('click', reiniciarJogo);

inicializarJogo();