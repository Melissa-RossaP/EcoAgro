const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const respostasProgramadas = [
  {
    chaves: ['o que é agronomia', 'agronomia'],
    resposta: 'Agronomia é a ciência que estuda como produzir alimentos e cuidar do solo, da água e das plantas de forma sustentável.'
  },
  {
    chaves: ['como ser mais sustentável', 'sustentabilidade'],
    resposta: 'Sustentabilidade no agro é usar água e solo com sabedoria, plantar de forma responsável e proteger a natureza.'
  },
  {
    chaves: ['água', 'agua'],
    resposta: 'A água é essencial para a plantação: usar irrigação inteligente e evitar desperdício ajuda o campo e o meio ambiente.'
  },
  {
    chaves: ['trator', 'máquina', 'maquina'],
    resposta: 'Um trator ajuda no preparo da terra, plantio e colheita. Ele torna o trabalho mais rápido e eficiente no campo.'
  },
  {
    chaves: ['agrotóxico', 'agrotoxicos', 'agrotóxicos'],
    resposta: 'Agrotóxicos controlam pragas, mas o ideal é usar soluções naturais sempre que possível para proteger a saúde e o solo.'
  }
];

function buscarResposta(mensagem) {
  const texto = mensagem.trim().toLowerCase();
  const item = respostasProgramadas.find((entry) =>
    entry.chaves.some((chave) => texto === chave || texto.includes(chave))
  );

  return item?.resposta ||
    'Ainda não sei responder isso. Escolha uma das perguntas rápidas ou pergunte algo sobre agronomia e sustentabilidade.';
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/route', (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem || typeof mensagem !== 'string' || !mensagem.trim()) {
    return res.status(400).json({ erro: 'Mensagem vazia' });
  }

  const resposta = buscarResposta(mensagem);
  return res.json({ resposta });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
