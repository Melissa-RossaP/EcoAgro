

const btnAcessibilidade = document.getElementById("btn-acessibilidade");
const menuAcessibilidade = document.getElementById("menu");
let fontSizeMultiplier = 0;
const originalFontSizes = new Map();

// Iniciar preferências salvas
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

// Toggle do menu de acessibilidade
btnAcessibilidade?.addEventListener("click", () => {
    menuAcessibilidade?.classList.toggle("ativo");
    const isOpen = menuAcessibilidade?.classList.contains("ativo");
    btnAcessibilidade?.setAttribute("aria-expanded", isOpen ? "true" : "false");
});


function alterarContraste() {
    document.body.classList.toggle("contraste-ativo");
    const contraste = document.body.classList.contains("contraste-ativo") ? "ativo" : "inativo";
    localStorage.setItem("contraste", contraste);
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


const chatWindow = document.getElementById("chatWindow");
const inputMensagem = document.getElementById("mensagem");
const chatMessages = document.getElementById("chatMessages");

// Abrir/fechar chat
function abrirChat() {
    if (!chatWindow) return;
    const isOpen = chatWindow.style.display === "flex";
    chatWindow.style.display = isOpen ? "none" : "flex";
    chatWindow.setAttribute("aria-hidden", isOpen ? "true" : "false");
}


inputMensagem?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        enviarMensagem();
    }
});

// Enviar msg
function enviarMensagem() {
    const texto = inputMensagem?.value.trim();

    if (!texto || !chatMessages) return;

    // Mensagem do user super ueau
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.setAttribute("role", "article");
    userMsg.textContent = texto;
    chatMessages.appendChild(userMsg);
    inputMensagem.value = "";

    // Resposta do bot com delay pq ele tem q ter uma demoradinha
    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.classList.add("message", "bot");
        botMsg.setAttribute("role", "article");
        botMsg.textContent = responderIA(texto);
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 700);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}



function corrigirQuiz() {

    //  confetes SEMPRE
    criarConfetesAnimado();

    // Som fofinho
    tocarSomFofo();

    let acertos = 0;
    const totalPerguntas = 15;

    // Respostas corretas
    const respostasCorretas = {
        q1: "c",
        q2: "c",
        q3: "c",
        q4: "c",
        q5: "c",
        q6: "c",
        q7: "c",
        q8: "c",
        q9: "c",
        q10: "c",
        q11: "c",
        q12: "c",
        q13: "c",
        q14: "c",
        q15: "c"
    };

    // Verificar ne
    for (let i = 1; i <= totalPerguntas; i++) {

        const resposta = document.querySelector(`input[name="q${i}"]:checked`);

        if (!resposta) {
            alert("⚠️ Responda todas as perguntas!");
            return;
        }

        if (resposta.value === respostasCorretas[`q${i}`]) {
            acertos++;
        }
    }

    const resultadoDiv = document.getElementById("resultadoQuiz");

    let mensagem = "";
    let emoji = "";
    let cor = "";

    if (acertos === 15) {

        mensagem = "🎉 Incrível! Você acertou tudo!";
        emoji = "🏆";
        cor = "#28a745";

    } else if (acertos >= 10) {

        mensagem = "🌟 Muito bom! Você manda bem!";
        emoji = "🌱";
        cor = "#ffc107";

    } else if (acertos >= 5) {

        mensagem = "📚 Você está aprendendo!";
        emoji = "🌿";
        cor = "#17a2b8";

    } else {

        mensagem = "💪 Continue estudando!";
        emoji = "🌍";
        cor = "#e74c3c";
    }

    resultadoDiv.innerHTML = `
        <div class="resultado-box">
            <p class="resultado-emoji">${emoji}</p>

            <p class="resultado-texto">
                ${mensagem}
            </p>

            <p class="resultado-pontos">
                Você acertou: ${acertos}/${totalPerguntas}
            </p>
        </div>
    `;

    resultadoDiv.style.borderColor = cor;
    resultadoDiv.style.backgroundColor = cor + "20";
}


//FUNÇÃO DOS CONFETES pro QUIZZZ :D
function criarConfetesAnimado() {

    for (let i = 0; i < 120; i++) {

        const confete = document.createElement("div");

        confete.style.position = "fixed";
        confete.style.width = "10px";
        confete.style.height = "10px";
        confete.style.borderRadius = "50%";

        confete.style.left = Math.random() * window.innerWidth + "px";
        confete.style.top = "-20px";

        confete.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 50%)`;

        confete.style.zIndex = "9999";
        confete.style.pointerEvents = "none";

        document.body.appendChild(confete);

        const duracao = Math.random() * 3000 + 2000;

        confete.animate([
            {
                transform: "translateY(0px) rotate(0deg)",
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 100}px)
                rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: duracao,
            easing: "linear"
        });

        setTimeout(() => {
            confete.remove();
        }, duracao);
    }
}


//  SOM FOFISSSS :P
function tocarSomFofo() {

    const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();

    function tocarNota(freq, tempo) {

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = "triangle";
        osc.frequency.value = freq;

        osc.connect(gain);
        gain.connect(audioContext.destination);

        gain.gain.setValueAtTime(0.1, audioContext.currentTime);

        osc.start();

        osc.stop(audioContext.currentTime + tempo);
    }

    //  PA PA PAAAAA
    tocarNota(523.25, 0.15); // Do
    setTimeout(() => tocarNota(659.25, 0.15), 200); // Mi
    setTimeout(() => tocarNota(783.99, 0.5), 450); // Sol
}

function criarConfetes(event) {
    event?.preventDefault?.();
    
    // Criar 50 confetes
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confete = document.createElement("div");
            confete.className = "confete";
            
            const cores = ["#80BB70", "#dcf5c0", "#a8ffbf", "#2d551d", "#FFD700", "#FF6B6B", "#4ECDC4"];
            confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
            
            confete.style.left = Math.random() * window.innerWidth + "px";
            confete.style.top = "-10px";
            
            document.body.appendChild(confete);
            
            // Animar queda
            let top = -10;
            let left = parseInt(confete.style.left);
            let velocidade = Math.random() * 3 + 2;
            let rotacao = 0;
            
            const intervalo = setInterval(() => {
                top += velocidade;
                left += Math.sin(top / 50) * 2;
                rotacao += Math.random() * 10;
                
                confete.style.top = top + "px";
                confete.style.left = left + "px";
                confete.style.transform = `rotate(${rotacao}deg)`;
                
                if (top > window.innerHeight) {
                    clearInterval(intervalo);
                    confete.remove();
                }
            }, 20);
        }, i * 30);
    }
}

function criarConfetesAnimado() {
    // Criar mais confetes quando o quiz é acertado 100%
    for (let j = 0; j < 3; j++) {
        setTimeout(() => {
            criarConfetes();
        }, j * 500);
    }
}

// ========================================
// IA - RESPOSTAS INTELIGENTES
// ========================================

function responderIA(texto) {
    const textoNormalizado = texto.toLowerCase().trim();

    // Mapeamento de respostas
    const respostas = {
        "saudação": {
            palavras: ["oi", "olá", "opa", "e aí", "como vai", "tudo bem"],
            resposta: "Olá 👋! Como posso ajudar você com sustentabilidade?"
        },
        "agronomia": {
            palavras: ["agronomia", "agricultura", "plantio", "colheita", "lavoura"],
            resposta: "Agronomia conecta tecnologia, natureza e produção agrícola 🌾. Você quer saber mais?"
        },
        "sustentabilidade": {
            palavras: ["sustentabilidade", "sustentável", "eco", "ambiente", "planeta", "natureza"],
            resposta: "Sustentabilidade é essencial para preservar recursos naturais 🌍 e garantir um futuro melhor!"
        },
        "tecnologia": {
            palavras: ["tecnologia", "drone", "sensor", "ia", "inteligência artificial", "inovação"],
            resposta: "Drones, sensores e IA estão revolucionando a agricultura moderna 🚜!"
        },
        "despedida": {
            palavras: ["tchau", "até mais", "adeus", "até logo", "falou"],
            resposta: "Até mais! 👋 Volte sempre para conversar sobre sustentabilidade!"
        },
        "ajuda": {
            palavras: ["ajuda", "dúvida", "como funciona", "o que fazer", "pode me ajudar"],
            resposta: "Posso ajudar! 😊 Pergunte sobre agronomia, sustentabilidade ou tecnologia agrícola."
        }
    };

    // Verificar cada categoria de resposta
    for (const categoria in respostas) {
        const { palavras, resposta } = respostas[categoria];
        if (palavras.some(palavra => textoNormalizado.includes(palavra))) {
            return resposta;
        }
    }

    // Resposta padrão
    return "Que interessante! 🤖 Ainda tenho muito a aprender. Pode me fazer outra pergunta?";
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

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    inicializarAcessibilidade();
    
    // Remover splash screen após 3 segundos
    setTimeout(() => {
        const splashScreen = document.getElementById("splash-screen");
        if (splashScreen) {
            splashScreen.style.display = "none";
        }
    }, 3000);

    // Adicionar evento de confetes na logo
    const logoLink = document.querySelector(".logo a");
    logoLink?.addEventListener("click", (e) => {
        criarConfetes(e);
    });
});


/* =========================
   CONFETE MEGA FOFO 🌱✨
========================= */

function confeteVerde(x, y) {

    confetti({
        particleCount: 120,
        spread: 100,
        startVelocity: 40,
        scalar: 1.2,
        ticks: 120,
        gravity: 0.9,

        origin: { x, y },

        colors: [
            '#80BB70',
            '#A8D890',
            '#ffffff',
            '#FFD166',
            '#6ab04c'
        ]
    });

    setTimeout(() => {

        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: x - 0.03, y },
            colors: ['#ffffff', '#80BB70']
        });

        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: x + 0.03, y },
            colors: ['#FFD166', '#6ab04c']
        });

    }, 200);
}

/* =========================
   SIDEBAR + LOGO
========================= */

const sidebarItens = document.querySelectorAll('.sidebar a, .sidebar button');

sidebarItens.forEach(item => {

    item.addEventListener('click', () => {

        const rect = item.getBoundingClientRect();

        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confeteVerde(x, y);

    });

});

/* =========================
   TIMELINE
========================= */

const eventos = document.querySelectorAll('.evento');

eventos.forEach(evento => {

    evento.addEventListener('mouseenter', () => {

        const rect = evento.getBoundingClientRect();

        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confeteVerde(x, y);

        evento.style.transform = 'scale(1.03)';
        evento.style.transition = '0.3s ease';

        setTimeout(() => {
            evento.style.transform = 'scale(1)';
        }, 300);

    });

});

/* =========================
   TÍTULO ECOAGRO 🚜🌾
========================= */

const titulo = document.querySelector('.title');

/* cria audio */
const somTrator = new Audio(
'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8c6e7f9a13.mp3?filename=tractor-engine-6893.mp3'
);

titulo.addEventListener('mouseenter', () => {

    /* SOM */
    somTrator.currentTime = 0;
    somTrator.volume = 0.5;
    somTrator.play();

    /* CONFETE */
    const rect = titulo.getBoundingClientRect();

    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confeteVerde(x, y);

    /* EMOJIS 🚜🌱🌾 */
    for(let i = 0; i < 12; i++) {

        const emoji = document.createElement('div');

        const emojis = ['🚜','🌱','🌾','🍃'];

        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        emoji.style.position = 'fixed';
        emoji.style.left = rect.left + rect.width/2 + 'px';
        emoji.style.top = rect.top + rect.height/2 + 'px';

        emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';

        emoji.style.zIndex = '9999';
        emoji.style.pointerEvents = 'none';

        document.body.appendChild(emoji);

        const destinoX = (Math.random() - 0.5) * 400;
        const destinoY = (Math.random() - 0.5) * 300;

        emoji.animate([
            {
                transform: 'translate(0,0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${destinoX}px, ${destinoY}px) rotate(${Math.random()*720}deg)`,
                opacity: 0
            }
        ], {
            duration: 1800,
            easing: 'cubic-bezier(.17,.67,.83,.67)'
        });

        setTimeout(() => {
            emoji.remove();
        }, 1800);

    }

    /* ANIMAÇÃO NO TÍTULO */
    titulo.style.transform = 'scale(1.08)';
    titulo.style.textShadow = '0 0 25px #80BB70';

    setTimeout(() => {

        titulo.style.transform = 'scale(1)';
        titulo.style.textShadow = 'none';

    }, 400);

});

titulo.style.transition = '0.3s ease';