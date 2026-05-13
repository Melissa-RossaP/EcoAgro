
const btnAcessibilidade = document.getElementById("btn-acessibilidade");
const menuAcessibilidade = document.getElementById("menu");

let fontSizeMultiplier = 0;
const originalFontSizes = new Map();


document.getElementById('btnTopo').addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
 });

function inicializarAcessibilidade() {

    const contraste = localStorage.getItem("contraste");
    const fonte = localStorage.getItem("fontSizeMultiplier");

    if (contraste === "ativo") {
        document.body.classList.add("contraste-ativo");
    }

    if (fonte) {
        fontSizeMultiplier = parseInt(fonte, 10);
        aplicarAumentoDeFonte(fontSizeMultiplier);
    }
}

btnAcessibilidade?.addEventListener("click", () => {

    menuAcessibilidade?.classList.toggle("ativo");

    const isOpen =
        menuAcessibilidade?.classList.contains("ativo");

    btnAcessibilidade?.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );
});

function alterarContraste() {

    document.body.classList.toggle("contraste-ativo");

    const contraste =
        document.body.classList.contains("contraste-ativo")
        ? "ativo"
        : "inativo";

    localStorage.setItem("contraste", contraste);
}

function aumentarFonte() {

    if (fontSizeMultiplier < 5) {

        fontSizeMultiplier++;

        aplicarAumentoDeFonte(fontSizeMultiplier);

        localStorage.setItem(
            "fontSizeMultiplier",
            fontSizeMultiplier
        );
    }
}

function diminuirFonte() {

    if (fontSizeMultiplier > -5) {

        fontSizeMultiplier--;

        aplicarAumentoDeFonte(fontSizeMultiplier);

        localStorage.setItem(
            "fontSizeMultiplier",
            fontSizeMultiplier
        );
    }
}

function aplicarAumentoDeFonte(multiplicador) {

    document.querySelectorAll("body *").forEach(el => {

        const computedSize =
            parseFloat(window.getComputedStyle(el).fontSize);

        let baseSize = originalFontSizes.get(el);

        if (!baseSize) {

            baseSize = computedSize;

            originalFontSizes.set(el, baseSize);
        }

        const novoTamanho =
            Math.max(10, baseSize + multiplicador * 2);

        el.style.fontSize = `${novoTamanho}px`;
    });
}


async function enviarMensagem() {

    const texto = inputMensagem.value.trim();

    if (!texto) return;

    /* mensagem usuario */
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.innerHTML = texto;
    chatMessages.appendChild(userMsg);

    inputMensagem.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    /* digitando */
    const typing = document.createElement("div");
    typing.classList.add("message", "bot");
    typing.innerHTML = "🌱 Agrozinho está pensando...";
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        // CORREÇÃO AQUI: Chama a sua API interna em vez de chamar o Google direto
        // Ajuste o caminho abaixo dependendo de onde está sua pasta (ex: '/api/Agrozinho')
        const resposta = await fetch('/api/Agrozinho', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mensagem: texto // Envia a propriedade 'mensagem' que o route.js espera
            })
        });

        const data = await resposta.json();
        typing.remove();

        // Pega a propriedade 'resposta' devolvida pelo seu route.js
        const respostaIA = data.resposta || "🌱 Não consegui responder agora 😔";

        const botMsg = document.createElement("div");
        botMsg.classList.add("message", "bot");
        botMsg.innerHTML = respostaIA;
        chatMessages.appendChild(botMsg);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (erro) {
        console.log(erro);
        typing.remove();

        const erroDiv = document.createElement("div");
        erroDiv.classList.add("message", "bot");
        erroDiv.innerHTML = "⚠️ Erro ao falar com Agrozinho ";
        chatMessages.appendChild(erroDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}



function criarConfetes(event) {

    event?.preventDefault?.();

    for (let i = 0; i < 50; i++) {

        setTimeout(() => {

            const confete =
                document.createElement("div");

            confete.className = "confete";

            const cores = [
                "#80BB70",
                "#dcf5c0",
                "#a8ffbf",
                "#2d551d",
                "#FFD700",
                "#FF6B6B",
                "#4ECDC4"
            ];

            confete.style.backgroundColor =
                cores[
                    Math.floor(
                        Math.random() * cores.length
                    )
                ];

            confete.style.left =
                Math.random() * window.innerWidth + "px";

            confete.style.top = "-10px";

            document.body.appendChild(confete);

            let top = -10;

            let left =
                parseInt(confete.style.left);

            let velocidade =
                Math.random() * 3 + 2;

            let rotacao = 0;

            const intervalo = setInterval(() => {

                top += velocidade;

                left += Math.sin(top / 50) * 2;

                rotacao += Math.random() * 10;

                confete.style.top = top + "px";

                confete.style.left = left + "px";

                confete.style.transform =
                    `rotate(${rotacao}deg)`;

                if (top > window.innerHeight) {

                    clearInterval(intervalo);

                    confete.remove();
                }

            }, 20);

        }, i * 30);
    }
}

function criarConfetesAnimado() {

    for (let j = 0; j < 3; j++) {

        setTimeout(() => {

            criarConfetes();

        }, j * 500);
    }
}



function tocarSomFofo() {

    const audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    function tocarNota(freq, tempo) {

        const osc =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        osc.type = "triangle";

        osc.frequency.value = freq;

        osc.connect(gain);

        gain.connect(audioContext.destination);

        gain.gain.setValueAtTime(
            0.1,
            audioContext.currentTime
        );

        osc.start();

        osc.stop(
            audioContext.currentTime + tempo
        );
    }

    tocarNota(523.25, 0.15);

    setTimeout(() => {
        tocarNota(659.25, 0.15);
    }, 200);

    setTimeout(() => {
        tocarNota(783.99, 0.5);
    }, 450);
}


let lendo = false;

function lerTexto() {

    const botao =
        document.getElementById("botaoLeitura");

    if (lendo) {

        speechSynthesis.cancel();

        lendo = false;

        botao.innerText = "Ler";

        return;
    }

    const texto = document.body.innerText;

    const fala =
        new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";

    fala.rate = 1;

    lendo = true;

    botao.innerText = "Parar";

    fala.onend = () => {

        lendo = false;

        botao.innerText = "Ler";
    };

    speechSynthesis.speak(fala);
}


const titulo =
    document.querySelector(".title");

const somTrator = new Audio(
"https://cdn.pixabay.com/download/audio/2022/03/15/audio_8c6e7f9a13.mp3?filename=tractor-engine-6893.mp3"
);

titulo?.addEventListener("mouseenter", () => {

    somTrator.currentTime = 0;

    somTrator.volume = 0.5;

    somTrator.play();

    const rect =
        titulo.getBoundingClientRect();

    for (let i = 0; i < 12; i++) {

        const emoji =
            document.createElement("div");

        const emojis =
            ["🚜", "🌱", "🌾", "🍃"];

        emoji.innerText =
            emojis[
                Math.floor(
                    Math.random() * emojis.length
                )
            ];

        emoji.style.position = "fixed";

        emoji.style.left =
            rect.left + rect.width / 2 + "px";

        emoji.style.top =
            rect.top + rect.height / 2 + "px";

        emoji.style.fontSize =
            (Math.random() * 20 + 20) + "px";

        emoji.style.zIndex = "9999";

        emoji.style.pointerEvents = "none";

        document.body.appendChild(emoji);

        const destinoX =
            (Math.random() - 0.5) * 400;

        const destinoY =
            (Math.random() - 0.5) * 300;

        emoji.animate([

            {
                transform:
                    "translate(0,0) rotate(0deg)",

                opacity: 1
            },

            {
                transform:
                    `translate(${destinoX}px, ${destinoY}px)
                    rotate(${Math.random() * 720}deg)`,

                opacity: 0
            }

        ], {

            duration: 1800,

            easing:
                "cubic-bezier(.17,.67,.83,.67)"
        });

        setTimeout(() => {

            emoji.remove();

        }, 1800);
    }

    titulo.style.transform = "scale(1.08)";

    titulo.style.textShadow =
        "0 0 25px #80BB70";

    setTimeout(() => {

        titulo.style.transform = "scale(1)";

        titulo.style.textShadow = "none";

    }, 400);
});

if (titulo) {
    titulo.style.transition = "0.3s ease";
}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        inicializarAcessibilidade();

        setTimeout(() => {

            const splashScreen =
                document.getElementById(
                    "splash-screen"
                );

            if (splashScreen) {
                splashScreen.style.display =
                    "none";
            }

        }, 3000);

        const logoLink =
            document.querySelector(".logo a");

        logoLink?.addEventListener(
            "click",
            (e) => {

                criarConfetes(e);

            }
        );
    }
);