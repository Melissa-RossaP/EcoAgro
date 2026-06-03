import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
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

const lista = document.getElementById("listaComentarios");

window.enviarComentario = async function () {
    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !mensagem) {
        alert("Preencha todos os campos.");
        return;
    }

    await addDoc(collection(db, "comentarios"), {
        nome,
        mensagem,
        data: serverTimestamp()
    });

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
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

        div.appendChild(nome);
        div.appendChild(msg);

        lista.appendChild(div);
    });
});