const divcoin = document.getElementById("container-market-coins");
let span = document.querySelector("#olausuario");
let containersearch = document.querySelector("#container-search-result");
let divresult = document.querySelector("#result-coins");
let body = document.querySelector("body");
let nav = document.querySelector("nav");
let search = document.querySelector("#iptsearch");
let moeda = document.querySelectorAll("#moeda");
let containermarket = document.querySelector("#container-market");
let toggler = document.querySelectorAll("#toggler");
let offcanvas = document.querySelector("#offcanvas");
let offcanvasnavbar = document.querySelector("#offheader");
let offiptsearch = document.querySelector("#offiptsearch");
let exitmenu = document.querySelector("#exit-menu");
let color_mode = document.querySelector("#colormode");
let colormodeimg = document.querySelector(".colormodeimg");
let offcolormodeimg = document.querySelector(".offcolormodeimg");
let offresultsearch = document.querySelector("#off-result-search");
let offresultcoins = document.querySelector("#off-result-coins");
let apicoingecko =
  "https://api.coingecko.com/api/v3/search/trending?ids=bitcoin,ethereum&vs_currencies=usd&x_cg_demo_api_key=CG-ozPRxhRsgexhd931jJjUD8Ay";

let arrayusuarios = JSON.parse(localStorage.getItem('users'))
let usuariologado = JSON.parse(localStorage.getItem("usuariologado"));
let usuario
arrayusuarios.forEach(element => {
  if (element.email === usuariologado){
    usuario = element;
  }
})

let colorback = JSON.parse(localStorage.getItem("thememode"));
let pesquisa = false;

span.innerHTML = `Hello, ${usuario.nome.toUpperCase()}!`;

if (colorback == "white") {
  colormodeimg.src = "/images/moonblack.png";
  offcolormodeimg.src = "/images/moonblack.png"
  colorback = "white";
  body.style = `background-color: rgb(209, 209, 209);`;
  nav.style = `background: linear-gradient(180deg, rgb(255, 255, 255), rgb(230, 230, 230));`;
  search.style = `background-color: rgb(166, 166, 166);`;
  containermarket.style = `background-color: rgb(223, 223, 223);`;
  for (let i = 0; i < toggler.length; i++) {
    toggler[i].style = `background-color:  rgb(255, 199, 149)`;
  }
  offcanvas.style = `background-color: rgb(255, 255, 255);`;
  offcanvasnavbar.style = `background-color: rgb(217, 217, 217);`;
  offiptsearch.style = `background-color: rgb(166, 166, 166);`;
  exitmenu.style = `background-color: rgb(255, 255, 255); border: 2px solid rgb(181, 181, 181);`;
  for (let i = 0; i < moeda.length; i++) {
    moeda[i].style = `background-color: rgb(221, 221, 221);
  border-color:rgb(0, 0, 0);`;
  }
} else if (colorback == "dark") {
  colormodeimg.src = "/images/sunwhite.png";
  offcolormodeimg.src = "/images/sunwhite.png";
  colorback = "dark";
  body.style = `background-color: rgb(42, 42, 42);`;
  nav.style = `background-color:black;`;
  search.style = `background-color: rgb(72, 72, 72);`;
  containermarket.style = `background-color: rgb(42, 42, 42);`;
  for (let i = 0; i < toggler.length; i++) {
    toggler[i].style = `background-color: rgb(72, 72, 72);`;
  }
  offcanvas.style = `background-color: rgb(42, 42, 42);`;
  offcanvasnavbar.style = `background-color: rgb(0, 0, 0);`;
  offiptsearch.style = `background-color: rgb(72, 72, 72);`;
  exitmenu.style = `background-color: black; border: 2px solid rgb(64, 64, 64);`;
  for (let i = 0; i < moeda.length; i++) {
    moeda[i].style = `background-color:  rgb(80, 80, 80);`;
  }
}

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
      divresult.appendChild(newdivhot);

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
  } catch (erro) {
    console.log("erro" + erro);
  }
}
buscarquentes();

async function buscarmoedas() {
  try {
    const buscarapi = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1hx_cg_demo_api_key=CG-ozPRxhRsgexhd931jJjUD8Ay",
    );
    const dadosapi = await buscarapi.json();
    let fav = JSON.parse(localStorage.getItem(`Favoritos: ${usuario.nome}`)) || [];
    for (let coin = 0; coin < dadosapi.length; coin++) {
      const id = dadosapi[coin].id;
      const simbolo = dadosapi[coin].symbol;
      const name = dadosapi[coin].name;
      const precoformatado = Number(dadosapi[coin].current_price).toFixed(8);
      const iconlink = dadosapi[coin].image;
      let img;
      let verif = fav.findIndex((f) => f.nome === name);
      if (verif == -1) {
        img = "/images/favorito.png";
      } else {
        img = "/images/favorito (1).png";
      }
      let newdivhot = document.createElement("div");
      divcoin.appendChild(newdivhot);
      newdivhot.innerHTML = ` 
            <div id="moeda">
           <span><img id="icone" onclick ="favoritar(event, '${name}', '${precoformatado}', '${simbolo}', '${iconlink}', '${id}')" src="${img}" width= "20px" height= "20px"></img></span>
           <a id="linkcoin" href="buypage.html" onclick="clicknamoeda(event,'${name}','${id}', '${simbolo}')">
            <div id="container-moeda">
            <img src=${iconlink} width= "20px" height= "20px"></img>
           <div class="nome">
           ${dadosapi[coin].name}
           </div>
           <div class = "symbol">
           ${dadosapi[coin].symbol.toUpperCase()}
           </div>
           <div class="preco">
           ${precoformatado}
           </div>
           </div>
           </div>
          </a>
          `;
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
           <div class="name">
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
    divcoin.appendChild(newdiv)
  }
}

buscarmoedas();

function favoritar(e, nome, preco, simbolo, iconlink, id) {
  const target = e.target;

  const moeda = {
    nome: nome,
    preco: preco,
    simbolo: simbolo,
    icone: iconlink,
    id: id,
  };

  let fav = JSON.parse(localStorage.getItem(`Favoritos: ${usuario.nome}`)) || [];

  let verif = fav.findIndex((f) => f.nome === moeda.nome);

  if (verif == -1) {
    fav.push(moeda);
    target.src = "/images/favorito (1).png";
  } else {
    fav.splice(verif, 1);
    target.src = "/images/favorito.png";
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

function colormode(e) {
  let target = e.target;
  if (colorback == "dark") {
    target.src = "/images/moonblack.png";
    offcolormodeimg.src = "/images/moonblack.png"
  colormodeimg.src = "/images/moonblack.png"
    colorback = "white";
    body.style = `background-color: rgb(209, 209, 209);`;
    nav.style = `background: linear-gradient(180deg, rgb(255, 255, 255), rgb(230, 230, 230));`;
    search.style = `background-color:rgb(171, 171, 171);`;
    containermarket.style = `background-color: rgb(223, 223, 223);`;
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].style = `background-color:  rgb(255, 199, 149)`;
    }
    offcanvas.style = `background-color: rgb(255, 255, 255);`;
    offcanvasnavbar.style = `background-color: rgb(217, 217, 217);`;
    offiptsearch.style = `background-color: rgb(217, 217, 217);`;
    exitmenu.style = `background-color: rgb(255, 255, 255); border: 2px solid rgb(181, 181, 181);`;
    for (let i = 0; i < moeda.length; i++) {
      moeda[i].style = `background-color: rgb(221, 221, 221);
  border-color:rgb(0, 0, 0);`;
    }
  } else if (colorback == "white") {
    target.src = "/images/sunwhite.png";
    offcolormodeimg.src = "/images/sunwhite.png"
    colormodeimg.src = "/images/sunwhite.png"
    colorback = "dark";
    body.style = `background-color: rgb(42, 42, 42);`;
    nav.style = `background-color:black;`;
    search.style = `background-color: rgb(72, 72, 72);`;
    containermarket.style = `background-color: rgb(42, 42, 42);`;
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].style = `background-color: rgb(72, 72, 72);`;
    }
    offcanvas.style = `background-color: rgb(42, 42, 42);`;
    offcanvasnavbar.style = `background-color: rgb(0, 0, 0);`;
    offiptsearch.style = `background-color: rgb(72, 72, 72);`;
    exitmenu.style = `background-color: black; border: 2px solid rgb(64, 64, 64);`;
    for (let i = 0; i < moeda.length; i++) {
      moeda[i].style = `background-color:  rgb(80, 80, 80);`;
    }
  }
  localStorage.setItem("thememode", JSON.stringify(colorback));
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
