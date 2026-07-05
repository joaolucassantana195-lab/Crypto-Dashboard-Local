//elementos
let formsearch = document.querySelector("#formsearch");
let divresult = document.querySelector("#result-coins");
let eye = document.querySelector("#eye");
let span = document.querySelector("#olausuario");
let divfav = document.querySelector("#container-fav");
let divhot = document.querySelector("#container-hot");
let ctx = document.getElementById("myChart");
let divbalance = document.getElementById("value");
let tablebody = document.querySelector("#table-body");
let containersearch = document.querySelector("#container-search-result");
let offresultsearch = document.querySelector("#off-result-search");
let offresultcoins = document.querySelector("#off-result-coins");
let apicoingecko ="https://api.coingecko.com/api/v3/search/trending?ids=bitcoin,ethereum&vs_currencies=usd&x_cg_demo_api_key=CG-ozPRxhRsgexhd931jJjUD8Ay";
let body = document.querySelector("body");
let nav = document.querySelector("nav");
let search = document.querySelector("#iptsearch");
let moeda = document.querySelectorAll("#moeda");
let toggler = document.querySelectorAll("#toggler");
let table = document.querySelectorAll("#list");
let offcanvas = document.querySelector("#offcanvas");
let offcanvasnavbar = document.querySelector("#offheader");
let offiptsearch = document.querySelector("#offiptsearch");
let exitmenu = document.querySelector("#exit-menu");
let color_mode = document.querySelector("#colormode");
let colormodeimg = document.querySelector(".colormodeimg");
let offcolormodeimg = document.querySelector(".offcolormodeimg");

//localStorage
let arrayusuarios = JSON.parse(localStorage.getItem('users'))
let usuariologado = JSON.parse(localStorage.getItem("usuariologado"));
let usuario
arrayusuarios.forEach(element => {
  if (element.email === usuariologado){
    usuario = element;
  }
})

let moedasad = JSON.parse(localStorage.getItem(`MoedasAdquiridas:${usuario.nome}`));
let favs = JSON.parse(localStorage.getItem(`Favoritos: ${usuario.nome}`));
let balance = localStorage.getItem(`balance: ${usuario.nome}`);
let balancevalor = JSON.parse(balance);
let balancevalue = balancevalor.valor;
let dadosgrafico = [];
let valores = [];
let pesquisa = false;

//atribuicoes

divbalance.innerHTML = "R$" + balancevalue.toFixed(2);
span.innerHTML = `Hello ${usuario.nome.toUpperCase()}!`;

//estados
let visible = JSON.parse(localStorage.getItem("visible"));
let colorback = JSON.parse(localStorage.getItem("thememode"));
let divresulttext;

//verificar visibilidade
if (visible == false) {
  visible = false;
  eye.src = `images/closedeye.png`;
  divbalance.innerHTML = `R$------`;
} else if (visible == true) {
  visible = true;
  eye.src = `images/eye.png`;
  divbalance.innerHTML = `${balancevalor.valor.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})}`;
}

if (favs == "" || favs == null){
  let newdiv = document.createElement("div")
    newdiv.innerHTML = "It looks like you haven't favorited any tokens."
    divfav.appendChild(newdiv)

}

//verficar cor de fundo
if (colorback == "white") {
  colormodeimg.src = "images/moonblack.png";
  offcolormodeimg.src = "images/moonblack.png"
  colorback = "white";
  body.style = `background-color: rgb(209, 209, 209);`;
  nav.style = `background: linear-gradient(180deg, rgb(255, 255, 255), rgb(230, 230, 230));`;
  search.style = `background-color:rgb(166, 166, 166);`;
  offcanvas.style = `background-color: rgb(255, 255, 255);`;
  offcanvasnavbar.style = `background-color: rgb(217, 217, 217);`;
  offiptsearch.style = `background-color: rgb(166, 166, 166);`;
  exitmenu.style = `background-color: rgb(255, 255, 255); border: 2px solid rgb(181, 181, 181);`;

  for (let i = 0; i < toggler.length; i++) {
    toggler[i].style = `background-color: rgb(255, 199, 149);`;
  }
  for (let i = 0; i < table.length; i++) {
    table[i].className = `table`;
  }
  for (let i = 0; i < moeda.length; i++) {
    moeda[i].style = `background-color: rgb(221, 221, 221);
  border-color:rgb(111, 111, 111);`;
  }
} else if (colorback == "dark") {
  colormodeimg.src = "images/sunwhite.png";
  offcolormodeimg.src = "images/sunwhite.png"
  colorback = "dark";
  body.style = `background-color: rgb(42, 42, 42);`;
  nav.style = `background-color:black;`;
  search.style = `background-color: rgb(72, 72, 72);`;
  offcanvas.style = `background-color: rgb(42, 42, 42);`;
  offcanvasnavbar.style = `background-color: rgb(0, 0, 0);`;
  offiptsearch.style = `background-color: rgb(72, 72, 72);`;
  exitmenu.style = `background-color: black; border: 2px solid rgb(64, 64, 64);`;

  for (let i = 0; i < toggler.length; i++) {
    toggler[i].style = `background-color: rgb(72, 72, 72);`;
  }

  for (let i = 0; i < moeda.length; i++) {
    moeda[i].style = `background-color:  rgb(80, 80, 80);`;
  }
  for (let i = 0; i <= table.length; i++) {}
}


// consultar dados na api
async function buscarquentes() {
  try {
    const buscarapi = await fetch(apicoingecko);
    const dadosapi = await buscarapi.json();
    for (let coin = 0; coin < dadosapi.coins.length; coin++) {
      const precoformatado = Number(
        dadosapi.coins[coin].item.data.price,
      ).toFixed(8);
      const iconlink = dadosapi.coins[coin].item.thumb;
      let newdivhot = document.createElement("div");
      divhot.appendChild(newdivhot);

      newdivhot.innerHTML = `
          <a href="buypage.html" onclick="clicknamoeda(event,'${dadosapi.coins[coin].item.name}','${dadosapi.coins[coin].item.id}','${dadosapi.coins[coin].item.symbol}')">
            <div id="moeda">
            <img src=${iconlink} width= "20px" height= "20px"></img>
           <div class="nome">
           ${dadosapi.coins[coin].item.name}
           </div>
           <div class = "symbol">
           ${dadosapi.coins[coin].item.symbol}
           </div>
           <div class="preco">
           ${precoformatado}
           </div>
           </div>
          </a>
          `;
      divresult.innerHTML += `
    <a href="buypage.html" class="list-group-item list-group-item-action m-1" id="simple-list-item-1"><div id="moeda" onclick = "clicknamoeda(event,'${dadosapi.coins[coin].item.name}','${dadosapi.coins[coin].item.id}','${dadosapi.coins[coin].item.symbol}')">
            <img src=${iconlink} width= "20px" height= "20px"></img>
           <div class="nome">
           ${dadosapi.coins[coin].item.name}
           </div>
           <div class = "symbol">
           ${dadosapi.coins[coin].item.symbol}
           </div>
           <div class="preco">
           ${precoformatado}
           </div>
           </div></a>`;
           offresultcoins.innerHTML += `
          <a href="buypage.html" class="list-group-item list-group-item-action m-1" id="simple-list-item-1"><div id="moeda" onclick = "clicknamoeda(event,'${dadosapi.coins[coin].item.name}','${dadosapi.coins[coin].item.id}','${dadosapi.coins[coin].item.symbol}')">
            <img src=${iconlink} width= "20px" height= "20px"></img>
           <div class="nome">
           ${dadosapi.coins[coin].item.name}
           </div>
           <div class = "symbol">
           ${dadosapi.coins[coin].item.symbol}
           </div>
           <div class="preco">
           ${precoformatado}
           </div>
           </div></a>`;
    }
      

    async function allcoins() {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/list`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-ozPRxhRsgexhd931jJjUD8Ay",
          },
        };
        const reqapi = await fetch(url, options);
        const coinsapi = await reqapi.json();

        formsearch.addEventListener("input", (e) => {
          let iptvalue = e.target.value.toLowerCase();

          if (iptvalue.length <= 2) return [];

          const filtrarmoeda = coinsapi
            .filter((coin) => {
              return (
                coin.name.toLowerCase().includes(iptvalue) ||
                coin.symbol.toLowerCase().includes(iptvalue)
              );
            })
            .sort((a, b) => {
              const aStarts = a.name.toLowerCase().startsWith(iptvalue);
              const bStarts = b.name.toLowerCase().startsWith(iptvalue);
              return aStarts === bStarts ? 0 : aStarts ? -1 : 1;
            })
            .slice(0, 100);
          console.log(filtrarmoeda);

          if (filtrarmoeda.length === 0) {
            divresult.innerHTML =
              '<div class="list-group-item">Nenhum resultado...</div>';
            return;
          }
          divresult.innerHTML = filtrarmoeda
            .map(
              (coin) => `
      <a href="buypage.html" class="list-group-item list-group-item-action m-1" id="simple-list-item-1"><div id="moeda" onclick = "clicknamoeda(event,'${coin.name}','${coin.id}','${coin.symbol}')">
           <div class="nome">
           ${coin.name}
           </div>
           </div></a>`,
            )
            .join("");
        });
        offiptsearch.addEventListener("input", (e) => {
          let iptvalue = e.target.value.toLowerCase();

          if (iptvalue.length <= 2) return [];

          const filtrarmoeda = coinsapi
            .filter((coin) => {
              return (
                coin.name.toLowerCase().includes(iptvalue) ||
                coin.symbol.toLowerCase().includes(iptvalue)
              );
            })
            .sort((a, b) => {
              const aStarts = a.name.toLowerCase().startsWith(iptvalue);
              const bStarts = b.name.toLowerCase().startsWith(iptvalue);
              return aStarts === bStarts ? 0 : aStarts ? -1 : 1;
            })
            .slice(0, 100);
          console.log(filtrarmoeda);

          if (filtrarmoeda.length === 0) {
            offresultsearch.innerHTML =
              '<div class="list-group-item">Nenhum resultado...</div>';
            return;
          }
          offresultsearch.innerHTML = filtrarmoeda
            .map(
              (coin) => `
      <a href="buypage.html" class="list-group-item list-group-item-action m-1" id="simple-list-item-1"><div id="moeda" onclick = "clicknamoeda(event,'${coin.name}','${coin.id}','${coin.symbol}')">
           <div class="name">
           ${coin.name}
           </div>
           </div></a>`,
            )
            .join("");
        });
      } catch (erro) {
        console.log("erro" + erro);
      }
    }
    allcoins();
  } catch (erro) {
    console.log("falha na requisicao");
    let newdiv = document.createElement("div")
    newdiv.innerHTML = "Ops! An error occurred. Please refresh the page."
    divresult.innerHTML = "Ops! An error occurred. Please refresh the page."
    divhot.appendChild(newdiv)


  }
}

buscarquentes();

function buscarFavoritos() {
  const moedasfav = localStorage.getItem(`Favoritos: ${usuario.nome}`);
  const dados = JSON.parse(moedasfav);
  for (let moeda = 0; moeda < dados.length; moeda++) {
    const nome = dados[moeda].nome;
    const preco = dados[moeda].preco;
    const simbolo = dados[moeda].simbolo;
    const id = dados[moeda].id;
    const icone = dados[moeda].icone;
    let newdiv = document.createElement("div");
    newdiv.id = `box-moeda${moeda}`;
    divfav.appendChild(newdiv);
    newdiv.innerHTML = ` 
            <div id="moeda">
           <span><img id="icone" onclick ="favoritar(event, '${nome}', '${preco}', '${simbolo}', '${icone}', '${moeda}')" src="images/favorito (1).png" width= "20px" height= "20px"></img></span>
           <a id="linkcoin" href="buypage.html" onclick="clicknamoeda(event,'${nome}','${id}','${simbolo}')">
            <div id="container-moeda">
            <img src= "${icone}" width= "20px" height= "20px"></img>
           <div class="nome">
           ${nome}
           </div>
           <div class = "symbol">
           ${simbolo.toUpperCase()}
           </div>
           <div class="preco">
           ${preco}
           </div>
           </div>
           </a>
           </div>
          `;
  }
}
buscarFavoritos();

function favoritar(e, nome, preco, simbolo, iconlink, count) {
  const target = e.target;

  const moeda = {
    nome: nome,
    preco: preco,
    simbolo: simbolo,
    icone: iconlink,
  };

  let fav = JSON.parse(localStorage.getItem(`Favoritos: ${usuario.nome}`));

  let verif = fav.findIndex((f) => f.nome === moeda.nome);

  if (verif == -1) {
    fav.push(moeda);
    target.src = "images/favorito (1).png";
  } else {
    fav.splice(verif, 1);
    target.src = "images/favorito.png";
    let divmoeda = document.querySelector(`#box-moeda${count}`);
    divmoeda.remove();
  }

  localStorage.setItem(`Favoritos: ${usuario.nome}`, JSON.stringify(fav));
}
function clicknamoeda(e, name, id, symbol) {
  localStorage.removeItem("moeda-clicada");
  let moeda = {
    nome: name,
    moedaid: id,
    symbol: symbol,
  };
  localStorage.setItem("moeda-clicada", JSON.stringify(moeda));
}

function exibirgrafico() {
  let soma = moedasad.reduce(
    (acumulador, valoratual) => acumulador + valoratual.quantidade,
    0,
  );
  for (let i = 0; i < moedasad.length; i++) {
    dadosgrafico.push(moedasad[i].nome);
    let calculo = (moedasad[i].quantidade * 100) / soma;
    valores.push(Number(calculo).toFixed(8));

    tablebody.innerHTML += `
    <tr id = "list" class="table table-dark">
      <td scope="row">${moedasad[i].nome}</td>
      <td>${valores[i]}%</td>
      <td class="table-active">${moedasad[i].quantidade.toFixed(8)}</td>
    </tr>
  `;
  }
}
exibirgrafico();

if (dadosgrafico == "") {
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Empty wallet"],
      datasets: [
        {
          label: "null",
          data: [1],
          borderWidth: 1,
          backgroundColor: ["rgb(84, 84, 84)"],
        },
      ],
    },
    options: {},
  });
} else {
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: dadosgrafico,
      datasets: [
        {
          label: "Percentual",
          data: valores,
          borderWidth: 2,
        },
      ],
    },
    options: {},
  });
}
eye.addEventListener("click", () => {
  if (visible == true) {
    visible = false;
    eye.src = `images/closedeye.png`;
    divbalance.innerHTML = `R$------`;
  } else if (visible == false) {
    visible = true;
    eye.src = `images/eye.png`;
    divbalance.innerHTML = `R$${balancevalor.valor.toFixed(2)}`;
  }
  localStorage.setItem("visible", JSON.stringify(visible));
});

function colormode(e) {
  let target = e.target;

  if (colorback == "dark") {
    target.src = "images/moonblack.png";
    offcolormodeimg.src = "images/moonblack.png"
    colormodeimg.src = "images/moonblack.png"
    colorback = "white";
    body.style = `background-color: rgb(209, 209, 209);`;
    nav.style = `background: linear-gradient(180deg, rgb(255, 255, 255), rgb(230, 230, 230));`;
    search.style = `background-color: rgb(171, 171, 171);`;
    offcanvas.style = `background-color: rgb(255, 255, 255);`;
    offcanvasnavbar.style = `background-color: rgb(217, 217, 217);`;
    offiptsearch.style = `background-color: rgb(217, 217, 217);`;
    exitmenu.style = `background-color: rgb(255, 255, 255); border: 2px solid rgb(181, 181, 181);`;

    for (let i = 0; i < toggler.length; i++) {
      toggler[i].style = `background-color: rgb(255, 199, 149);`;
    }
    for (let i = 0; i < table.length; i++) {
      table[i].className = `table`;
    }
    for (let i = 0; i < moeda.length; i++) {
      moeda[i].style = `background-color: rgb(221, 221, 221);
  border-color:rgb(111, 111, 111);`;
    }
  } else if (colorback == "white") {
    target.src = "images/sunwhite.png";
    offcolormodeimg.src = "images/sunwhite.png"
    colormodeimg.src = "images/sunwhite.png"
    colorback = "dark";
    body.style = `background-color: rgb(42, 42, 42);`;
    nav.style = `background-color:black;`;
    search.style = `background-color: rgb(72, 72, 72);`;
    offcanvas.style = `background-color: rgb(42, 42, 42);`;
    offcanvasnavbar.style = `background-color: rgb(0, 0, 0);`;
    offiptsearch.style = `background-color: rgb(72, 72, 72);`;
    exitmenu.style = `background-color: black; border: 2px solid rgb(64, 64, 64);`;

    for (let i = 0; i < toggler.length; i++) {
      toggler[i].style = `background-color: rgb(72, 72, 72);`;
    }

    for (let i = 0; i < moeda.length; i++) {
      moeda[i].style = `background-color:  rgb(80, 80, 80);`;
    }
    for (let i = 0; i < table.length; i++) {}
  }
  localStorage.setItem("thememode", JSON.stringify(colorback));
}

function exit() {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]',
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl),
  );
  const popover = new bootstrap.Popover(".popover-dismiss", {
    trigger: "focus",
  });
}

function limparesair() {
  localStorage.clear();
}

function pesquisar() {
  pesquisa = false;
  if (pesquisa == true) {
    pesquisa = false;

    containersearch.style = `display: none;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(42, 42, 42);;
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: white ;
   `;
  } else if (pesquisa == false) {
    pesquisa = true;
    if (colorback == "white") {
      containersearch.style = `display: flex;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(221, 221, 221);
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: orange ;
   `;
    } else {
      containersearch.style = `display: flex;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(42, 42, 42);;
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: orange ;
   `;
    }
  }
}

function fecharaba() {
  if (pesquisa == false) {
    pesquisa = true;
    containersearch.style = `display: none;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(42, 42, 42);;
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: white ;
   `;
  } else {
    pesquisa = false;
    return;
  }
}
