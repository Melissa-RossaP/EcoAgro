
const btnAcessibilidade = document.getElementById("btn-acessibilidade");
const menuAcessibilidade = document.getElementById("menu");

let fontSizeMultiplier = 0;
const originalFontSizes = new Map();


document.getElementById('btnTopo')?.addEventListener('click', function() {
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

// VARIÁVEIS GLOBAIS: Mantenha estas linhas obrigatoriamente no topo do arquivo
const chatWindow = document.getElementById("chatWindow");
const inputMensagem = document.getElementById("mensagem");
const chatMessages = document.getElementById("chatMessages");
const chatOptions = document.getElementById("chatOptions");
const enviarBtn = chatWindow?.querySelector(".chat-input button");

const quickQuestions = [
    "O que é agronomia?",
    "Como ser mais sustentável?",
    "Por que a água é importante?",
    "Para que serve um trator?",
    "O que são agrotóxicos?",
    "Como proteger o solo?",
    "Qual a importância da biodiversidade?",
    "Como funciona a agricultura orgânica?",
    "O que é rotação de culturas?",
    "Como controlar pragas sem veneno?",
    "Como economizar água na lavoura?",
    "O que é agricultura de precisão?"
];

const visibleOptionCount = 5;
let visibleQuestionIndices = Array.from({ length: visibleOptionCount }, (_, i) => i);

function atualizarOpcoesRapidas() {
    if (!chatOptions) return;

    chatOptions.innerHTML = "<p class='options-title'>Perguntas rápidas:</p>";
    visibleQuestionIndices.forEach((questionIndex, buttonIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = quickQuestions[questionIndex];
        button.addEventListener("click", () => usarPerguntaRapida(quickQuestions[questionIndex], buttonIndex));
        chatOptions.appendChild(button);
    });
}

function proximaPerguntaRapida(optionIndex) {
    const usedIndices = new Set(visibleQuestionIndices);
    usedIndices.delete(visibleQuestionIndices[optionIndex]);

    const remaining = quickQuestions
        .map((_, index) => index)
        .filter((index) => !usedIndices.has(index));

    visibleQuestionIndices[optionIndex] = remaining.length > 0
        ? remaining[Math.floor(Math.random() * remaining.length)]
        : (visibleQuestionIndices[optionIndex] + 1) % quickQuestions.length;
}

const respostasProgramadas = [
    {
        chaves: ["o que é agronomia", "agronomia", "agro"],
        resposta: "Agronomia é a ciência que estuda como produzir alimentos e cuidar do solo, da água e das plantas de forma sustentável."
    },
    {
        chaves: ["como ser mais sustentável", "sustentabilidade", "sustentavel", "sustentável"],
        resposta: "Sustentabilidade no agro é usar água e solo com sabedoria, plantar de forma responsável e proteger a natureza."
    },
    {
        chaves: ["água", "agua", "solo", "terra", "plantio", "plantação", "plantacao"],
        resposta: "A água e o solo são essenciais para a agricultura. Usar irrigação e manejo corretos ajuda a cuidar da natureza e produzir mais."
    },
    {
        chaves: ["trator", "máquina", "maquina", "colheita"],
        resposta: "Um trator ajuda no preparo da terra, plantio e colheita. Ele torna o trabalho mais rápido e eficiente no campo."
    },
    {
        chaves: ["agrotóxico", "agrotoxicos", "agrotóxicos", "praga", "pragas"],
        resposta: "Agrotóxicos controlam pragas, mas o ideal é usar soluções naturais sempre que possível para proteger a saúde e o solo."
    },
    {
        chaves: ["robo", "robô", "amiguinho", "amigo"],
        resposta: "Eu sou o Agrozinho, seu robô amiguinho do agro. Posso ajudar com perguntas sobre agricultura, sustentabilidade e tecnologia."
    }
];

function obterRespostaProgramada(texto) {
    const pergunta = texto.trim().toLowerCase();
    if (!pergunta) {
        return "Digite uma pergunta ou escolha uma opção rápida para começar.";
    }

    const item = respostasProgramadas.find((entry) =>
        entry.chaves.some((chave) => pergunta === chave || pergunta.includes(chave))
    );

    return item?.resposta ||
        "Ainda não sei responder isso. Escolha uma das perguntas rápidas ou pergunte algo sobre agronomia e sustentabilidade.";
}

function adicionarMensagem(tipo, texto) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("message", tipo);
    mensagem.innerHTML = texto;
    chatMessages.appendChild(mensagem);
    return mensagem;
}

// Ouvinte para enviar a mensagem também ao pressionar a tecla Enter
inputMensagem?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        enviarMensagem();
    }
});

inputMensagem?.addEventListener("focus", () => {
    mostrarOpcoes();
});

inputMensagem?.addEventListener("blur", () => {
    setTimeout(() => {
        if (document.activeElement !== inputMensagem) {
            ocultarOpcoes();
        }
    }, 100);
});

enviarBtn?.addEventListener("click", () => {
    ocultarOpcoes();
});

function abrirChat() {
    if (!chatWindow) return;

    const estiloReal = window.getComputedStyle(chatWindow).display;

    if (estiloReal === "none") {
        chatWindow.style.display = "flex";
        chatWindow.setAttribute("aria-hidden", "false");

        if (chatMessages.children.length === 0) {
            adicionarMensagem('bot', 'Olá! Tudo bem? Sou o Agrozinho, seu robô amiguinho, como posso te ajudar?');
        }
        ocultarOpcoes();
    } else {
        chatWindow.style.display = "none";
        chatWindow.setAttribute("aria-hidden", "true");
    }
}

function mostrarOpcoes() {
    chatOptions?.classList.add('visible');
}

function ocultarOpcoes() {
    chatOptions?.classList.remove('visible');
}

async function enviarMensagem() {
    const texto = inputMensagem.value.trim();
    if (!texto) return;

    adicionarMensagem('user', texto);
    inputMensagem.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const typing = adicionarMensagem('bot', '🌱 Agrozinho está pensando...');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    await new Promise((resolve) => setTimeout(resolve, 400));

    typing.remove();

    const resposta = obterRespostaProgramada(texto);
    adicionarMensagem('bot', resposta);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    ocultarOpcoes();
}

function usarPerguntaRapida(pergunta, buttonIndex) {
    inputMensagem.value = pergunta;
    proximaPerguntaRapida(buttonIndex);
    atualizarOpcoesRapidas();
    enviarMensagem();
}

atualizarOpcoesRapidas();



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