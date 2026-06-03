let fontSizeMultiplier = 0;
const originalFontSizes = new Map();
let lendo = false;
let btnAcessibilidade;
let menuAcessibilidade;

document.addEventListener("DOMContentLoaded", () => {
    btnAcessibilidade = document.getElementById("btn-acessibilidade");
    menuAcessibilidade = document.getElementById("menu");

    inicializarAcessibilidade();

    btnAcessibilidade?.addEventListener("click", toggleMenu);
});

function inicializarAcessibilidade() {
    const contrasteSalvo = localStorage.getItem("contraste");
    const fonteSalva = localStorage.getItem("fontSizeMultiplier");

    if (contrasteSalvo === "ativo") {
        document.body.classList.add("contraste-ativo");
    }

    if (fonteSalva) {
        fontSizeMultiplier = parseInt(fonteSalva, 10);
        aplicarAumentoDeFonte(fontSizeMultiplier);
    }
}



function toggleMenu() {
    if (menuAcessibilidade) {
        menuAcessibilidade.classList.toggle('ativo');
        const isOpen = menuAcessibilidade.classList.contains('ativo');
        btnAcessibilidade?.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
}

document.addEventListener('click', (e) => {
    if (menuAcessibilidade && btnAcessibilidade) {
        if (!menuAcessibilidade.contains(e.target) && !btnAcessibilidade.contains(e.target)) {
            menuAcessibilidade.classList.remove('ativo');
            btnAcessibilidade.setAttribute("aria-expanded", "false");
        }
    }
});

function alterarContraste() {
    document.body.classList.toggle('contraste-ativo');

    const contrasteAtual =
        document.body.classList.contains('contraste-ativo')
            ? "ativo"
            : "inativo";

    localStorage.setItem("contraste", contrasteAtual);
}

function aumentarFonte() {
    if (fontSizeMultiplier < 5) {
        fontSizeMultiplier++;
        aplicarAumentoDeFonte(fontSizeMultiplier);
        localStorage.setItem("fontSizeMultiplier", fontSizeMultiplier);
    }
}

function diminuirFonte() {
    if (fontSizeMultiplier > -5) {
        fontSizeMultiplier--;
        aplicarAumentoDeFonte(fontSizeMultiplier);
        localStorage.setItem("fontSizeMultiplier", fontSizeMultiplier);
    }
}

function aplicarAumentoDeFonte(multiplicador) {
    document.querySelectorAll("body *").forEach(el => {
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

let gerandoConfetes = false;

function criarConfetes(event) {
    if (event) event.preventDefault();
    if (gerandoConfetes) return;

    gerandoConfetes = true;

    const intervaloConfete = setInterval(() => {
        const confete = document.createElement("div");
        confete.className = "confete";

        const cores = ["#80BB70", "#dcf5c0", "#a8ffbf", "#2d551d", "#FFD700", "#FF6B6B", "#4ECDC4"];

        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.left = (Math.random() * window.innerWidth) + "px";
        confete.style.top = "-10px";

        document.body.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 2500);

    }, 100);

    setTimeout(() => {
        clearInterval(intervaloConfete);
        gerandoConfetes = false;
    }, 5000);
}