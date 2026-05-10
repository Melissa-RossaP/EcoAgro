let plantado = false;
let regado = false;
let moedas = 0;
let itemSelecionado = null;

function iniciar(){
  document.getElementById('menu').style.display='none';

  const musica = document.getElementById('musica');
  musica.volume = 0.3;
  musica.play();
}

const seed = document.getElementById('seed');
const water = document.getElementById('water');
const vaso = document.getElementById('vaso');
const caixa = document.getElementById('caixa');
const msg = document.getElementById('msg');
const coins = document.getElementById('coins');

seed.addEventListener('dragstart', e=>{
  e.dataTransfer.setData('text','seed');
});

water.addEventListener('dragstart', e=>{
  e.dataTransfer.setData('text','water');
});

seed.addEventListener('click', ()=>{
  itemSelecionado = 'seed';
  msg.innerText = 'Semente selecionada. Clique no vaso';
});

water.addEventListener('click', ()=>{
  itemSelecionado = 'water';
  msg.innerText = 'Água selecionada. Clique no vaso';
});

vaso.addEventListener('dragover', e=>{
  e.preventDefault();
});

caixa.addEventListener('dragover', e=>{
  e.preventDefault();
});

function plantar(item){
  if(item === 'seed' && !plantado){
    plantado = true;
    vaso.innerHTML = `
    <div class="vaso-pixel">
      <div class="terra"></div>
      <div class="brotinho">
        <div class="mini-caule"></div>
        <div class="mini-folha folha1"></div>
        <div class="mini-folha folha2"></div>
      </div>
    </div>
    `;
    msg.innerText = 'Agora coloque água';
  }
  else if(item === 'water' && plantado && !regado){
    regado = true;
    vaso.innerHTML = `
    <div class="planta-crescida">
      <div class="planta">
        <div class="caule"></div>
        <div class="folha f1"></div>
        <div class="folha f2"></div>
        <div class="folha f3"></div>
        <div class="flor"></div>
      </div>
    </div>
    `;
    moedas += 10;
    coins.innerText = moedas;
    msg.innerText = 'Clique na caixa para vender';
  }
}

vaso.addEventListener('drop', e=>{
  e.preventDefault();
  const item = e.dataTransfer.getData('text');
  plantar(item);
});

vaso.addEventListener('click', ()=>{
  if(itemSelecionado){
    plantar(itemSelecionado);
    itemSelecionado = null;
  }
});

function vender(){
  if(regado){
    caixa.innerHTML = `
    <div class="caixa-pixel">
      <div class="planta-mini">🌸</div>
    </div>
    `;
    msg.innerText = 'Venda concluída! +10 moedas';
    verificarFinal();
    setTimeout(()=>{
      plantado = false;
      regado = false;
      vaso.innerHTML = `
      <div class="vaso-pixel">
        <div class="terra"></div>
      </div>
      `;
      caixa.innerHTML = `
      <div class="caixa-pixel"></div>
      `;
      msg.innerText = 'Arraste outra sementinha';
    },1500);
  }
}

caixa.addEventListener('drop', e=>{
  e.preventDefault();
  vender();
});

caixa.addEventListener('click', ()=>{
  vender();
});

function verificarFinal(){
  if(moedas >= 100){
    document.getElementById('final').style.display='flex';
  }
}

function reiniciarJogo(){
  moedas = 0;
  plantado = false;
  regado = false;
  coins.innerText = moedas;
  vaso.innerHTML = `
  <div class="vaso-pixel">
    <div class="terra"></div>
  </div>
  `;
  caixa.innerHTML = `
  <div class="caixa-pixel"></div>
  `;
  document.getElementById('final').style.display='none';
  msg.innerText = 'Arraste a sementinha para o vaso 🌱';
}

function escolherPlanta(tipo){
  plantaAtual = tipo;
  document.getElementById('loja').style.display='none';
  if(tipo === 'tomate'){
    msg.innerText = '🍅 Você desbloqueou tomates!';
  }
  else{
    msg.innerText = '🥬 Você desbloqueou alfaces!';
  }
}
