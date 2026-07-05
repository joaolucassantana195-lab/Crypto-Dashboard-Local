//elementos
let span = document.querySelector("#olausuario")
let h1 = document.querySelector("#titulo")
let iptgastar = document.querySelector("#iptgastar")
let iptreceber = document.querySelector("#iptreceber")
let droplist = document.querySelector("#drop-list")
let btndrop = document.querySelector("#btn-drop")
let btndroplast = document.querySelector("#btn-droplast")
let divcomprar = document.querySelector(".div-comprar")
let divvender = document.querySelector(".div-vender")
const ctx = document.getElementById('myChart')
let btn = document.createElement("button")
let botao = document.querySelector("#botao")
let spnerro = document.querySelector("#spnerro")
let spnsaldo = document.querySelector("#spnsaldo")
let containersearch = document.querySelector("#container-search-result")
let divresult = document.querySelector("#result-coins")
let body = document.querySelector("body")
let nav = document.querySelector("nav")
let search = document.querySelector("#iptsearch")
let toggler = document.querySelectorAll("#toggler")
let title = document.querySelector("#title")
let titlebuy = document.querySelector("#title-buy")
let titlesell = document.querySelector("#title-sell")
let intersection = document.querySelector("#intersection")
let offcanvas = document.querySelector("#offcanvas")
let offcanvasnavbar = document.querySelector("#offheader")
let offiptsearch = document.querySelector("#offiptsearch")
let offresultsearch = document.querySelector("#off-result-search");
let offresultcoins = document.querySelector("#off-result-coins");
let exitmenu = document.querySelector("#exit-menu")
let containerformbuy = document.querySelector('#container-form-buy')
let color_mode = document.querySelector('#colormode')
let colormodeimg = document.querySelector('.colormodeimg')
let offcolormodeimg = document.querySelector(".offcolormodeimg")
let containergrafico = document.querySelector("#graphic")
let apicoingecko = "https://api.coingecko.com/api/v3/search/trending?ids=bitcoin,ethereum&vs_currencies=usd&x_cg_demo_api_key=CG-ozPRxhRsgexhd931jJjUD8Ay"

//localStorage
let arrayusuarios = JSON.parse(localStorage.getItem('users'))
let usuariologado = JSON.parse(localStorage.getItem("usuariologado"));
let usuario
arrayusuarios.forEach(element => {
  if (element.email === usuariologado){
    usuario = element;
  }
})
let moedaclicada = localStorage.getItem("moeda-clicada")
let moedasad = localStorage.getItem(`MoedasAdquiridas:${usuario.nome}`)
let moedasadquiridas = JSON.parse(moedasad) || [];
let balance = JSON.parse(localStorage.getItem(`balance: ${usuario.nome}`))

//objetos
let dados = JSON.parse(moedaclicada)
let precos = []
let coingeko_url = `https://api.coingecko.com/api/v3/coins/${dados.moedaid}/market_chart?vs_currency=usd&days=1x-cg-demo-api-key:CG-ozPRxhRsgexhd931jJjUD8Ay`

//atribuicoes
h1.innerHTML = `Buy ${dados.nome}`
btndroplast.innerHTML = `${dados.symbol.toUpperCase()}`
botao.appendChild(btn)
btn.id = "btn-comprar"
btn.className = "btn btn-primary w-100 mt-4"
btn.innerHTML = `BUY`
span.innerHTML = `Hello, ${usuario.nome.toUpperCase()}!`
spnsaldo.innerHTML = `Available: R$${balance.valor.toFixed(2)}`

//estados
let operacao = "compra"
let colorback = JSON.parse(localStorage.getItem("thememode"))
let pesquisa = false

//funcao para buscar moedas quentes 
if (colorback == "white"){
  colormodeimg.src = "images/moonblack.png"
  offcolormodeimg.src = "images/moonblack.png"
  colorback = "white"
  body.style = `background-color: rgb(209, 209, 209);`
  nav.style = `background: linear-gradient(180deg, rgb(255, 255, 255), rgb(230, 230, 230));`
  search.style = `background-color: rgb(166, 166, 166);`
  for (let i = 0; i<toggler.length; i++){
    toggler[i].style = `background-color: rgb(255, 199, 149);`
  }
  
  title.style = `color: orange`
  intersection.style = `background-color: rgb(180, 180, 180);`
  iptgastar.style = `background-color: rgb(180, 180, 180); `
  iptreceber.style = `background-color: rgb(180, 180, 180); `
  offcanvas.style = `background-color: rgb(255, 255, 255);`
  offcanvasnavbar.style = `background-color: rgb(217, 217, 217);`
  offiptsearch.style = `background-color:rgb(166, 166, 166);`
  exitmenu.style = `background-color: rgb(255, 255, 255); border: 2px solid rgb(181, 181, 181);`
  containerformbuy.style = `background-color: rgb(255, 255, 255);`

  if (operacao == "compra"){
    titlebuy.style = `display: flex; 
    justify-content: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-bottom: none ;
    border-radius: 15px;
    border-top-right-radius: 34px;
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
    background-color: rgb(255, 255, 255);
    color: green;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
    titlesell.style = `display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 2px solid rgb(115, 115, 115);
    border-top-color: rgb(60, 60, 60);
    border-right-color: rgb(60, 60, 60);
    border-left: none;
    border-radius: 15px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius:0;
    border-top-left-radius: 0;
    color: black;
    width: 100%;
    background-color: rgb(180, 180, 180);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
  }else if (operacao == "venda"){
    titlebuy.style = `
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-top-color: rgb(60, 60, 60);
    border-left-color: rgb(60, 60, 60);
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius:25px;
    border-bottom-left-radius:0;
    background-color: rgb(180, 180, 180);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
    titlesell.style = ` 
    display: flex; 
    justify-content: center;
    border: 2px solid rgb(115, 115, 115);
    font-size: 30px;
    border-radius: 15px;
     border-left: none;
    border-bottom: none ;
    border-bottom-left-radius: 0;
    border-bottom-right-radius:0;
    border-top-left-radius: 34px;
    color: white;
    width: 100%;
    background-color: rgb(255, 255, 255);
    color: red;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
  }
  }else if (colorback == "dark"){
    colormodeimg.src = "images/sunwhite.png"
    offcolormodeimg.src = "images/sunwhite.png"
  colorback = "dark"
  body.style = `background-color: rgb(42, 42, 42);`
  nav.style = `background-color:black;`
  search.style = `background-color: rgb(72, 72, 72);`
   for (let i = 0; i<toggler.length; i++){
    toggler[i].style = `background-color: rgb(72, 72, 72);`
  }
  title.style = `color: orange`
  intersection.style = `background-color: black;`
  iptgastar.style = `background-color: rgb(72, 72, 72); `
  iptreceber.style = `background-color: rgb(72, 72, 72); `
  offcanvas.style = `background-color: rgb(42, 42, 42);`
  offcanvasnavbar.style = `background-color: rgb(0, 0, 0);`
  offiptsearch.style = `background-color: rgb(72, 72, 72);`
  exitmenu.style = `background-color: black; border: 2px solid rgb(64, 64, 64);`
  containerformbuy.style = `background-color:  rgb(42, 42, 42)`
  if (operacao == "compra"){
    titlebuy.style = `display: flex; 
    justify-content: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-bottom: none ;
    border-radius: 15px;
    border-top-right-radius: 34px;
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
    background-color:  rgb(42, 42, 42);
    color: green;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
    titlesell.style = `display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 2px solid rgb(115, 115, 115);
    border-top-color: rgb(60, 60, 60);
    border-right-color: rgb(60, 60, 60);
    border-left: none;
    border-radius: 15px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius:0;
    border-top-left-radius: 0;
    color: black;
    width: 100%;
    background-color: black;
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
  }else if(operacao == "venda"){
    titlebuy.style = `
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-top-color: rgb(60, 60, 60);
    border-left-color: rgb(60, 60, 60);
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius:25px;
    border-bottom-left-radius:0;
    background-color: black;
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
    titlesell.style = ` 
    display: flex; 
    justify-content: center;
    border: 2px solid rgb(115, 115, 115);
    font-size: 30px;
    border-radius: 15px;
     border-left: none;
    border-bottom: none ;
    border-bottom-left-radius: 0;
    border-bottom-right-radius:0;
    border-top-left-radius: 34px;
    color: white;
    width: 100%;
    background-color: rgb(42, 42, 42);
    color: red;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
  }
  }
async function buscarquentes(){
try{
    const buscarapi = await fetch(apicoingecko)
    const dadosapi = await buscarapi.json()
    for (let coin = 0; coin < dadosapi.coins.length; coin ++){
    const precoformatado = Number(dadosapi.coins[coin].item.data.price).toFixed(8)
    const iconlink = dadosapi.coins[coin].item.thumb
 
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
    async function allcoins(){
  try{
     const url = `https://api.coingecko.com/api/v3/coins/list`
     const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-ozPRxhRsgexhd931jJjUD8Ay'
      }
     }
  const reqapi = await fetch(url, options)
  const coinsapi = await reqapi.json()
  
  formsearch.addEventListener("input", (e) => {
    let iptvalue = e.target.value.toLowerCase()
    

    if (iptvalue.length <= 2) return [];

    const filtrarmoeda = coinsapi.filter((coin) => {return coin.name.toLowerCase().includes(iptvalue) || coin.symbol.toLowerCase().includes(iptvalue)}).sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(iptvalue);
      const bStarts = b.name.toLowerCase().startsWith(iptvalue);
      return aStarts === bStarts ? 0 : aStarts ? -1 : 1;
    }).slice(0, 100)

    if (filtrarmoeda.length === 0) {
    divresult.innerHTML = '<div class="list-group-item">Nenhum resultado...</div>';
    return;
  }
    divresult.innerHTML = filtrarmoeda.map(coin => `
      <a href="buypage.html" class="list-group-item list-group-item-action m-1" id="simple-list-item-1"><div id="moeda" onclick = "clicknamoeda(event,'${coin.name}','${coin.id}','${coin.symbol}')">
           <div class="nome">
           ${coin.name}
           </div>
           </div></a>` ).join('')
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
  }catch (erro){
    console.log("erro" + erro)
    let newdiv = document.createElement("div")
    newdiv.innerHTML = "Ops! An error occurred. Please refresh the page."
    divhot.appendChild(newdiv)
    offresultcoins.innerHTML = "Ops! An error occurred. Please refresh the page."
  }
}
allcoins()

} catch(erro){
    console.log("falha na requisicao")
    divresult.innerHTML = "Ops! An error occurred. Please refresh the page."
    offresultcoins.innerHTML = "Ops! An error occurred. Please refresh the page."
}
}

buscarquentes()

  function clicknamoeda(e, name, id, symbol){
    localStorage.removeItem("moeda-clicada")
    let moeda = {
      nome: name,
      moedaid: id,
      symbol: symbol
    }
    
    localStorage.setItem("moeda-clicada", JSON.stringify(moeda))
  }

//funcao para efetuar a operacao
function efetuarOperacao(tipo){
  console.log(moedasadquiridas)
  let valoratual = precos[precos.length-1][1]
  let gasto = Number(iptgastar.value)
  let receber = Number(iptreceber.innerHTML)
  let resultadocompra = (gasto / valoratual)/5
  let resultadovenda = (gasto * valoratual) * 5
 

  let values = {
    nome: dados.nome,
    quantidade: 0
  }

  let verif = moedasadquiridas.findIndex(n => n.nome === values.nome)

    if (tipo === "compra"){
    if (gasto < 5 || gasto > 50000){
      spnerro.innerHTML = "Insira um valor entre 5 - 50.000"
    }else{
      if(gasto > balance.valor || gasto < 0 ){
      spnerro.innerHTML = "Voce nao possui este valor!"
    }else{
      values.quantidade = resultadocompra
      balance.valor = balance.valor - gasto
      localStorage.setItem(`balance: ${usuario.nome}`, JSON.stringify(balance))
    if (verif == -1){
      moedasadquiridas.push(values)
      localStorage.setItem(`MoedasAdquiridas:${usuario.nome}`, JSON.stringify(moedasadquiridas))
    }else{
      moedasadquiridas[verif].quantidade = moedasadquiridas[verif].quantidade + values.quantidade
      localStorage.setItem(`MoedasAdquiridas:${usuario.nome}`, JSON.stringify(moedasadquiridas))
    }}
    }
  }else if (tipo === "venda"){
    if (gasto > moedasadquiridas[verif].quantidade || gasto <= 0){
      spnerro.innerHTML = "Voce nao tem essa quantidade!"
    }else{
      values.quantidade = resultadovenda
      balance.valor = balance.valor + receber
      localStorage.setItem(`balance: ${usuario.nome}`, JSON.stringify(balance))
      if (verif == -1){
      console.log("nao existe")
      spnerro.innerHTML = "voce nao possui esta moeda!"
      }else{
      if (gasto > moedasadquiridas[verif].quantidade){
        alert("Voce nao tem essa quantidade!")
      }else{
        console.log("existe")
      moedasadquiridas[verif].quantidade = moedasadquiridas[verif].quantidade - gasto
      localStorage.setItem(`MoedasAdquiridas:${usuario.nome}`, JSON.stringify(moedasadquiridas))
      spnsaldo.innerHTML = `Available: ${moedasadquiridas[verif].quantidade.toFixed(6)} ${dados.symbol}`
      if (moedasadquiridas[verif].quantidade <= 0 ){
      moedasadquiridas.splice(verif, 1)
      localStorage.setItem(`MoedasAdquiridas:${usuario.nome}`, JSON.stringify(moedasadquiridas))
  }
      }
    }
  }
  }
  }

//funcao para gerar os intervalos do grafico
function gerarultimosintervalos(quantidade = 15){

    const intervalos = []
    const atual = new Date()

    const minutosatuais = atual.getMinutes()
    const calculoresto = minutosatuais % 5
    atual.setMinutes(minutosatuais - calculoresto)
    atual.setSeconds(0)
    atual.setMilliseconds(0)

    for (let i=0; i< quantidade; i++){
      let horaformatada = atual.toLocaleTimeString('pt-BR',{
        hour: '2-digit',
        minute: '2-digit'
      })

      intervalos.push(horaformatada)

      atual.setMinutes(atual.getMinutes() -  5 )
    }

    return intervalos
  }

  //funcao assincrona que requisita os precos na api da Coingecko
  async function requisitarPrecos(){
    try{
      precos = []
      let buscarprecos = await fetch(coingeko_url)
      let dadosapi = await buscarprecos.json()
      
     
      let todosOsPrecos = dadosapi.prices;
      precos = todosOsPrecos.slice(-15);

      new Chart(ctx, {
      type: 'line',
      data: {
      labels: gerarultimosintervalos().reverse(),
      datasets: [{
        label: 'Price',
        data: precos,
        borderWidth: 3,
        backgroundColor: ["rgb(255, 170, 0)"],
        borderColor: ["rgb(255, 170, 0)"],
        borderWidth: [1],
        hoverRadius: [6],
      }]
      },
      options: {
      interaction:{
        mode:"nearest",
      },
      scales: {
        y: { 
        }
      }
    }
  })
    }
    catch{
      console.log("Falha na Requisicao!")
      let newdiv = document.createElement("div")
       newdiv.innerHTML = "Ops! An error occurred. Please refresh the page."
      containergrafico.appendChild(newdiv)
    }
  }
  requisitarPrecos()

  //funcao que requisita a api para pegar uma lista de 100 moedas
  async function buscarmoedas(){
  try{
    const buscarapi = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1hx_cg_demo_api_key=CG-ozPRxhRsgexhd931jJjUD8Ay")
    const dadosapi = await buscarapi.json()
    const BRL = {
      name:"BRL",
      symbol:"BRL"
    }
    const USD = {
      name: 'USD',
      symbol: 'USDT',
    }
    dadosapi.unshift(USD,BRL)
    
    let fav = JSON.parse(localStorage.getItem(`Favoritos: ${usuario.nome}`)) || []
    for (let coin = 0; coin < dadosapi.length; coin ++){
    const id = dadosapi[coin].id
    const simbolo = dadosapi[coin].symbol
    const name = dadosapi[coin].name
    let img
    let verif = fav.findIndex(f => f.nome === name)
    if (verif == -1){
        img = "images/favorito.png"
    }else{
        img = "images/favorito (1).png"
    }
    let newdivhot = document.createElement("div")
    droplist.appendChild(newdivhot)
    newdivhot.innerHTML = `
    <a href="#" class="list-group-item list-item-action" onclick= "clicklistcoin(event, '${simbolo}')"> ${dadosapi[coin].name}</a>`
    }
} catch(erro){
    console.log("falha na requisicao")
}
}

buscarmoedas()
//adiciona o simbolo da moeda que esta na lista, no dropdown
function clicklistcoin(e, simbolo){
  let btndrop = document.querySelector("#btn-drop")
  btndrop.innerHTML = simbolo.toUpperCase()
}

//faz o calculo do valor digitado no input
iptgastar.addEventListener("input", (e) => {
  spnerro.textContent = ''
  if (operacao == "compra"){
  let gasto = Number(iptgastar.value)
  let valoratual = precos[precos.length-1][1]
  let resultado = (gasto / valoratual) / 5
  iptreceber.innerHTML = resultado.toFixed(8) || "0.00"
  }else if (operacao == "venda"){ 
  let gasto = Number(iptgastar.value)
  let valoratual = precos[precos.length-1][1]
  let resultado = (gasto * valoratual) * 5
  iptreceber.innerHTML = resultado.toFixed(2) || "0.00"
  }
})

//funcao de compra
divcomprar.addEventListener("click", ()=>{
  spnerro.textContent = ''
  operacao = "compra"
  btn.id = "btn-comprar"
  btn.className = "btn btn-primary w-100 mt-4"
  btn.innerHTML = `BUY`
  btndrop.innerHTML = "BRL"
  btndroplast.innerHTML = `${dados.symbol.toUpperCase()}`
  iptgastar.value = ``
  iptreceber.innerHTML = `0.00`
  spnsaldo.innerHTML = `Available: R$${balance.valor.toFixed(2)}`


 //estilizacao do titulo comprar e vender

 if (colorback == "dark"){
 let buytitle = document.querySelector("#title-buy")
 buytitle.style = ` 
    display: flex; 
    justify-content: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-bottom: none ;
    border-radius: 15px;
    border-top-right-radius: 34px;
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
    background-color: rgb(42, 42, 42);
    color: green;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;
    `

let selltitle = document.querySelector("#title-sell")
selltitle.style = `
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 2px solid rgb(115, 115, 115);
    border-top-color: rgb(60, 60, 60);
    border-right-color: rgb(60, 60, 60);
    border-left: none;
    border-radius: 15px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius:0;
    border-top-left-radius: 0;
    color: black;
    width: 100%;
    background-color: rgb(0, 0, 0);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;
`}else if (colorback == "white"){
  let buytitle = document.querySelector("#title-buy")
 buytitle.style = ` 
    display: flex; 
    justify-content: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-bottom: none ;
    border-radius: 15px;
    border-top-right-radius: 34px;
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
    background-color: rgb(255, 255, 255);
    color: green;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;
    `

let selltitle = document.querySelector("#title-sell")
selltitle.style = `
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 2px solid rgb(115, 115, 115);
    border-top-color: rgb(60, 60, 60);
    border-right-color: rgb(60, 60, 60);
    border-left: none;
    border-radius: 15px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius:0;
    border-top-left-radius: 0;
    color: black;
    width: 100%;
    background-color: rgb(180, 180, 180);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
}
})

//funcao de venda
divvender.addEventListener("click", ()=>{
  spnerro.textContent = ''
  operacao = "venda"
  btn.id = "btn-vender"
  btn.className = "btn btn-primary w-100 mt-4"
  btn.innerHTML = `SELL`
  btndrop.innerHTML = `${dados.symbol.toUpperCase()}`
  btndroplast.innerHTML = "BRL"
  iptgastar.value = ``
  iptreceber.innerHTML = `0.00`
  let verif = moedasadquiridas.findIndex(n => n.nome === dados.nome)
  if (verif != -1){
     spnsaldo.innerHTML = `Available: ${moedasadquiridas[verif].quantidade.toFixed(6)} ${dados.symbol}`
  }else{
      spnsaldo.innerHTML = `Available: 0.00`
  }
   
  
  
 


 //estilizacao do titulo comprar e vender
 if (colorback == "dark"){
 let buytitle = document.querySelector("#title-buy")
 buytitle.style = ` 
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-top-color: rgb(60, 60, 60);
    border-left-color: rgb(60, 60, 60);
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius:25px;
    border-bottom-left-radius:0;
    background-color: rgb(0, 0, 0);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;
`

let selltitle = document.querySelector("#title-sell")
selltitle.style = `
 display: flex; 
    justify-content: center;
    border: 2px solid rgb(115, 115, 115);
    font-size: 30px;
    border-radius: 15px;
     border-left: none;
    border-bottom: none ;
    border-bottom-left-radius: 0;
    border-bottom-right-radius:0;
    border-top-left-radius: 34px;
    color: white;
    width: 100%;
    background-color: rgb(42, 42, 42);
    color: red;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;
`}else if (colorback == "white"){
  let buytitle = document.querySelector("#title-buy")
 buytitle.style = ` 
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-top-color: rgb(60, 60, 60);
    border-left-color: rgb(60, 60, 60);
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius:25px;
    border-bottom-left-radius:0;
    background-color: rgb(180, 180, 180);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;
`

let selltitle = document.querySelector("#title-sell")
selltitle.style = `
 display: flex; 
    justify-content: center;
    border: 2px solid rgb(115, 115, 115);
    font-size: 30px;
    border-radius: 15px;
     border-left: none;
    border-bottom: none ;
    border-bottom-left-radius: 0;
    border-bottom-right-radius:0;
    border-top-left-radius: 34px;
    color: white;
    width: 100%;
    background-color: rgb(255, 255, 255);
    color: red;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
}
})

btn.addEventListener("click", (e)=>{
e.preventDefault()
if (operacao == "compra"){
  efetuarOperacao("compra")
   spnsaldo.innerHTML = `Available: R$${balance.valor.toFixed(2)}`
}else if(operacao == "venda"){
  efetuarOperacao("venda")
}
})

function colormode(e){
  let target = e.target
  if (colorback == "dark"){
  target.src = "images/moonblack.png"
  offcolormodeimg.src = "images/moonblack.png"
  colormodeimg.src = "images/moonblack.png"
  colorback = "white"
  body.style = `background-color: rgb(209, 209, 209);`
  nav.style = `background: linear-gradient(180deg, rgb(255, 255, 255), rgb(230, 230, 230));`
  search.style = `background-color:rgb(166, 166, 166);`
  for (let i = 0; i<toggler.length; i++){
    toggler[i].style = `background-color: rgb(255, 199, 149);`
  }
  
  title.style = `color: orange`
  intersection.style = `background-color: rgb(180, 180, 180);`
  iptgastar.style = `background-color: rgb(180, 180, 180); `
  iptreceber.style = `background-color: rgb(180, 180, 180); `
  offcanvas.style = `background-color: rgb(255, 255, 255);`
  offcanvasnavbar.style = `background-color: rgb(217, 217, 217);`
  offiptsearch.style = `background-color: rgb(166, 166, 166);`
  exitmenu.style = `background-color: rgb(255, 255, 255); border: 2px solid rgb(181, 181, 181);`
  containerformbuy.style = `background-color: rgb(255, 255, 255);`
  if (operacao == "compra"){
    titlebuy.style = `display: flex; 
    justify-content: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-bottom: none ;
    border-radius: 15px;
    border-top-right-radius: 34px;
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
    background-color: rgb(255, 255, 255);
    color: green;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
    titlesell.style = `display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 2px solid rgb(115, 115, 115);
    border-top-color: rgb(60, 60, 60);
    border-right-color: rgb(60, 60, 60);
    border-left: none;
    border-radius: 15px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius:0;
    border-top-left-radius: 0;
    color: black;
    width: 100%;
    background-color: rgb(180, 180, 180);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
  }else if (operacao == "venda"){
    titlebuy.style = `
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-top-color: rgb(60, 60, 60);
    border-left-color: rgb(60, 60, 60);
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius:25px;
    border-bottom-left-radius:0;
    background-color: rgb(180, 180, 180);
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
    titlesell.style = ` 
    display: flex; 
    justify-content: center;
    border: 2px solid rgb(115, 115, 115);
    font-size: 30px;
    border-radius: 15px;
     border-left: none;
    border-bottom: none ;
    border-bottom-left-radius: 0;
    border-bottom-right-radius:0;
    border-top-left-radius: 34px;
    color: white;
    width: 100%;
    background-color: rgb(255, 255, 255);
    color: red;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
  }
  }else if (colorback == "white"){
    target.src = "images/sunwhite.png"
    offcolormodeimg.src = "images/sunwhite.png"
    colormodeimg.src = "images/sunwhite.png"
  colorback = "dark"
  body.style = `background-color: rgb(42, 42, 42);`
  nav.style = `background-color:black;`
  search.style = `background-color: rgb(72, 72, 72);`
   for (let i = 0; i<toggler.length; i++){
    toggler[i].style = `background-color: rgb(72, 72, 72);`
  }
  title.style = `color: orange`
  intersection.style = `background-color: black;`
  iptgastar.style = `background-color: rgb(72, 72, 72); `
  iptreceber.style = `background-color: rgb(72, 72, 72); `
  offcanvas.style = `background-color: rgb(42, 42, 42);`
  offcanvasnavbar.style = `background-color: rgb(0, 0, 0);`
  offiptsearch.style = `background-color: rgb(72, 72, 72);`
  exitmenu.style = `background-color: black; border: 2px solid rgb(64, 64, 64);`
  containerformbuy.style = `background-color:  rgb(42, 42, 42)`
  if (operacao == "compra"){
    titlebuy.style = `display: flex; 
    justify-content: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-bottom: none ;
    border-radius: 15px;
    border-top-right-radius: 34px;
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
    background-color:  rgb(42, 42, 42);
    color: green;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
    titlesell.style = `display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 2px solid rgb(115, 115, 115);
    border-top-color: rgb(60, 60, 60);
    border-right-color: rgb(60, 60, 60);
    border-left: none;
    border-radius: 15px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius:0;
    border-top-left-radius: 0;
    color: black;
    width: 100%;
    background-color: black;
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
  }else if(operacao == "venda"){
    titlebuy.style = `
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 30px;
    width: 100%;
    border: 2px solid rgb(115, 115, 115);
    border-right: none;
    border-top-color: rgb(60, 60, 60);
    border-left-color: rgb(60, 60, 60);
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius:25px;
    border-bottom-left-radius:0;
    background-color: black;
    color: gray;
    font-weight: 200;
    font-size: 20px;
    transition:  font-size 0.05s ease-in-out;`
    titlesell.style = ` 
    display: flex; 
    justify-content: center;
    border: 2px solid rgb(115, 115, 115);
    font-size: 30px;
    border-radius: 15px;
     border-left: none;
    border-bottom: none ;
    border-bottom-left-radius: 0;
    border-bottom-right-radius:0;
    border-top-left-radius: 34px;
    color: white;
    width: 100%;
    background-color: rgb(42, 42, 42);
    color: red;
    font-weight: 600;
    transition:  font-size 0.2s ease-in-out;`
  }
  }
  localStorage.setItem('thememode', JSON.stringify(colorback))
}
function pesquisar(){
  pesquisa = false
  if(pesquisa == true){
    pesquisa = false

     containersearch.style = `display: none;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(42, 42, 42);;
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: white ;
   `
  }else if (pesquisa == false){
    pesquisa = true
    if(colorback == "white"){
     containersearch.style = `display: flex;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(221, 221, 221);
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: orange ;
   `
    }else{
       containersearch.style = `display: flex;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(42, 42, 42);;
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: orange ;
   `
    }
   
  }
}

  function fecharaba(){
  if (pesquisa == false){
    pesquisa = true
     containersearch.style = `display: none;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(42, 42, 42);;
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: white ;
   `
  }else{
    pesquisa = false
    return;
  }
}

function fecharaba(){
  if (pesquisa == false){
    pesquisa = true
     containersearch.style = `display: none;
    flex-direction: column;
   max-width: 60%;
   position: fixed;
   background-color: rgb(42, 42, 42);;
   max-height: 400px;
   border: 1px rgb(115, 115, 115) solid;
   color: white ;
   `
  }else{
    pesquisa = false
    return;
  }
}

function exit(){
 const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
const popover = new bootstrap.Popover('.popover-dismiss', {
  trigger: 'focus'
})
}

function limparesair(){
  localStorage.clear()
}