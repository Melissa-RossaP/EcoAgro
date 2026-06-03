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
    doc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC0WFKpk24pwVy4PdrGR_WW-uAhNKg3Y7U",
    authDomain: "comentariosecoagro.firebaseapp.com",
    projectId: "comentariosecoagro",
    storageBucket: "comentariosecoagro.firebasestorage.app",
    messagingSenderId: "938966924519",
    appId: "1:938966924519:web:e582f72204bdfb39367642"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.enviarComentario = async function () {

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !mensagem) {
        alert("Preencha todos os campos.");
        return;
    }

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

const lista = document.getElementById("listaComentarios");

const q = query(collection(db, "comentarios"), orderBy("data", "desc"));

onSnapshot(q, (snapshot) => {

    lista.innerHTML = "";

    snapshot.forEach((d) => {

        const data = d.data();

        const div = document.createElement("div");
        div.classList.add("comentario", "fade-in");

        div.innerHTML = `
            <div class="nome">${data.nome}</div>
            <p>${data.mensagem}</p>

            <button class="like-btn" onclick="curtir('${d.id}', ${data.likes || 0})">
                ❤️ ${data.likes || 0}
            </button>
        `;

        lista.appendChild(div);
    });
});

window.curtir = async function (id, atual) {
    const ref = doc(db, "comentarios", id);

    try {
        await updateDoc(ref, {
            likes: atual + 1
        });
    } catch (e) {
        console.error("Erro ao curtir:", e);
    }
};