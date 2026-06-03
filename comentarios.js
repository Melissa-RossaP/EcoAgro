import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    doc,
    increment
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaKey",
    authDomain: "comentariosecoagro.firebaseapp.com",
    projectId: "comentariosecoagro",
    storageBucket: "comentariosecoagro.firebasestorage.app",
    messagingSenderId: "938966924519",
    appId: "1:938966924519:web:e582f72204bdfb39367642"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const lista = document.getElementById("listaComentarios");

window.enviarComentario = async function () {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !mensagem) return alert("Preencha todos os campos.");

    try {
        await addDoc(collection(db, "comentarios"), {
            nome,
            mensagem,
            likes: 0,
            data: serverTimestamp()
        });

        document.getElementById("nome").value = "";
        document.getElementById("mensagem").value = "";
    } catch (erro) {
        console.error(erro);
        alert("Erro ao enviar comentário.");
    }
};

const q = query(collection(db, "comentarios"), orderBy("data", "desc"));

onSnapshot(q, (snapshot) => {
    lista.innerHTML = "";

    snapshot.forEach((d) => {
        const data = d.data();

        const div = document.createElement("div");
        div.classList.add("comentario", "fade-in");

        const nome = document.createElement("div");
        nome.classList.add("nome");
        nome.textContent = data.nome;

        const msg = document.createElement("p");
        msg.textContent = data.mensagem;

        const btn = document.createElement("button");
        btn.classList.add("like-btn");
        btn.textContent = `❤️ ${data.likes || 0}`;

        btn.addEventListener("click", async () => {
            const ref = doc(db, "comentarios", d.id);

            await updateDoc(ref, {
                likes: increment(1)
            });
        });

        div.appendChild(nome);
        div.appendChild(msg);
        div.appendChild(btn);

        lista.appendChild(div);
    });
});