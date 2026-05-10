// MENU ACESSIBILIDADE

function toggleMenu() {
    const menu = document.getElementById('menuAcessibilidade');
    menu.classList.toggle('ativo');
}



// AUMENTAR E DIMINUIR FONTE

let tamanhoFonteAtual = 1;

function aumentarFonte() {

    if (tamanhoFonteAtual < 1.8) {

        tamanhoFonteAtual += 0.1;
        document.body.style.fontSize = tamanhoFonteAtual + 'em';

    }

}

function diminuirFonte() {

    if (tamanhoFonteAtual > 0.8) {

        tamanhoFonteAtual -= 0.1;
        document.body.style.fontSize = tamanhoFonteAtual + 'em';

    }

}



// CONTRASTE

function contraste() {

    document.body.classList.toggle('contraste-ativo');

}



// LEITOR DE TEXTO

let lendo = false;

function lerTexto() {

    const botao = document.getElementById('botaoLeitura');

    if (lendo) {

        speechSynthesis.cancel();
        lendo = false;
        botao.innerText = 'Ler';

        return;

    }

    const texto = document.body.innerText;

    const fala = new SpeechSynthesisUtterance(texto);

    fala.lang = 'pt-BR';
    fala.rate = 1;

    lendo = true;

    botao.innerText = 'Parar';

    fala.onend = () => {

        lendo = false;
        botao.innerText = 'Ler';

    };

    speechSynthesis.speak(fala);

}



// BOTÃO VOLTAR TOPO

const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {

    if (window.scrollY > 300) {

        btnTopo.style.display = 'block';

    } else {

        btnTopo.style.display = 'none';

    }

});

btnTopo.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});



// CARROSSEL AUTOMÁTICO

window.addEventListener('load', () => {

    const track = document.querySelector('.Fotos');

    // duplica as imagens pra criar efeito infinito
    track.innerHTML += track.innerHTML;

    let position = 0;

    function animar() {

        position -= 1;

        // reinicia suavemente
        if (position <= -(track.scrollWidth / 2)) {

            position = 0;

        }

        track.style.transform = `translateX(${position}px)`;

        requestAnimationFrame(animar);

    }

    animar();

});



// ESCONDER MENU AO CLICAR FORA

document.addEventListener('click', (e) => {

    const menu = document.getElementById('menuAcessibilidade');

    const botao = document.querySelector('.abnace');

    if (!menu.contains(e.target) && !botao.contains(e.target)) {

        menu.classList.remove('ativo');

    }

});