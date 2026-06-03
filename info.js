
const btnAcessibilidade = document.getElementById("btn-acessibilidade"); 
const menuAcessibilidade = document.getElementById("menuAcessibilidade"); 

let fontSizeMultiplier = 0;
const originalFontSizes = new Map();
let lendo = false;

// INICIALIZAÇÃO: Roda assim que a página carrega para aplicar o que foi salvo
document.addEventListener("DOMContentLoaded", () => {
    inicializarAcessibilidade();
});

function inicializarAcessibilidade() {
    const contrasteSalvo = localStorage.getItem("contraste");
    const fonteSalva = localStorage.getItem("fontSizeMultiplier");

    if (contrasteSalvo === "ativo") {
        document.body.classList.add("contraste-ativo");
    }

    if (fonteSalva) {
        fontSizeMultiplier = parseInt(fonteSalva, 10);
        // Pequeno delay para garantir que o CSS da página terminou de carregar
        setTimeout(() => aplicarAumentoDeFonte(fontSizeMultiplier), 100);
    }
}


function toggleMenu() {
    if (menuAcessibilidade) {
        menuAcessibilidade.classList.toggle('ativo');
        const isOpen = menuAcessibilidade.classList.contains('ativo');
        btnAcessibilidade?.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
}

// Listener alternativo caso use o clique direto via ID do botão
btnAcessibilidade?.addEventListener("click", toggleMenu);

// ESCONDER MENU AO CLICAR FORA (Unificado e protegido contra erros)
document.addEventListener('click', (e) => {
    const botao = document.querySelector('.abnace') || btnAcessibilidade;

    if (menuAcessibilidade && botao) {
        if (!menuAcessibilidade.contains(e.target) && !botao.contains(e.target)) {
            menuAcessibilidade.classList.remove('ativo');
            btnAcessibilidade?.setAttribute("aria-expanded", "false");
        }
    }
});

function contraste() {
    document.body.classList.toggle('contraste-ativo');
    const contrasteAtual = document.body.classList.contains('contraste-ativo') ? "ativo" : "inativo";
    localStorage.setItem("contraste", contrasteAtual);
}

function aumentarFonte() {
    if (fontSizeMultiplier < 5) {
        fontSizeMultiplier++;
        aplicarAumentoDeFonte(fontSizeMultiplier);
        localStorage.setItem("fontSizeMultiplier", fontSizeMultiplier);
    }
}

function disminuirFonte() {
    if (fontSizeMultiplier > -5) {
        fontSizeMultiplier--;
        aplicarAumentoDeFonte(fontSizeMultiplier);
        localStorage.setItem("fontSizeMultiplier", fontSizeMultiplier);
    }
}

function aplicarAumentoDeFonte(multiplicador) {
    document.querySelectorAll("body *").forEach(el => {
        // Ignora elementos do próprio menu e tags de script/estilo
        if (menuAcessibilidade?.contains(el) || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;

        const computedSize = parseFloat(window.getComputedStyle(el).fontSize);
        let baseSize = originalFontSizes.get(el);

        if (!baseSize) {
            baseSize = computedSize;
            originalFontSizes.set(el, baseSize);
        }

        const novoTamanho = Math.max(10, baseSize + multiplicador * 2);
        el.style.fontSize = `${novoTamanho}px`;
    });
}

function lerTexto() {
    const botao = document.getElementById('botaoLeitura');

    if (lendo) {
        speechSynthesis.cancel();
        lendo = false;
        if (botao) botao.innerText = 'Ler';
        return;
    }

    const texto = document.body.innerText;
    const fala = new SpeechSynthesisUtterance(texto);

    fala.lang = 'pt-BR';
    fala.rate = 1;
    lendo = true;
    if (botao) botao.innerText = 'Parar';

    fala.onend = () => {
        lendo = false;
        if (botao) botao.innerText = 'Ler';
    };

    speechSynthesis.speak(fala);
}


const btnTopo = document.getElementById('btnTopo');

if (btnTopo) {
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
}

window.addEventListener('load', () => {
    const track = document.querySelector('.Fotos');
    if (!track) return;

    // Duplica as imagens para criar efeito infinito
    track.innerHTML += track.innerHTML;
    let position = 0;

    function animar() {
        position -= 1;

        if (position <= -(track.scrollWidth / 2)) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animar);
    }

    animar();
});

// ==========================================================================
// FUNÇÃO CONFETES
// ==========================================================================
function criarConfetes(event) {
    if (event) event.preventDefault();

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confete = document.createElement("div");
            confete.className = "confete";

            const cores = [
                "#80BB70", "#dcf5c0", "#a8ffbf", "#2d551d", 
                "#FFD700", "#FF6B6B", "#4ECDC4"
            ];

            confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
            confete.style.left = (Math.random() * window.innerWidth) + "px";
            confete.style.top = "-10px";

            document.body.appendChild(confete);

            setTimeout(() => {
                confete.remove();
            }, 3000);

        }, i * 50);
    }
}