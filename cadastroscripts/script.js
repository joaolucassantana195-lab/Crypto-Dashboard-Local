//elementos da pagina
console.log("Hello,World!")
let inpname = document.querySelector("#inpname")
let inpemail = document.querySelector("#inpemail")
let inpsenha = document.querySelector("#inpsenha")
let inprepeat = document.querySelector("#inprepeat")
let form = document.querySelector("form")
let spnname = document.querySelector(".name")
let spnemail = document.querySelector(".email")
let spnsenha = document.querySelector(".senha")
let spnrepeat = document.querySelector(".repeat")
let body = document.querySelector("body")
let container = document.querySelector('#container')
let input = document.querySelectorAll(".form-control")
let color_mode = document.querySelector('#colormode')

//estados
let nomevalid = false
let emailvalid = false
let senhavalid = false
let repeatvalid = false
let thememode = JSON.parse(localStorage.getItem("thememode"))

let usuario = {
    nome:"",
    email:"",
    senha:""
}

let balance = {
    valor : 10000
}

let favoritos = []
let moedasadquiridas = []
let arrayusers = []
let allusers = JSON.parse(localStorage.getItem('users'))
if (allusers  != undefined && allusers != null){
    
}else{
    localStorage.setItem('users', JSON.stringify(arrayusers))
}


//funcoes
if (thememode == "white"){
        thememode = "white"
        body.style = `Background: linear-gradient(-45deg, rgba(255, 145, 0, 0.5), rgb(205, 205, 205));`
        container.style = `Background-color:rgb(255, 255, 255);border:2px solid rgb(201, 200, 200);`
        input.forEach((elemento) => {elemento.style = `Background-color:rgb(227, 227, 227); `});
        color_mode.src = "images/moonblack.png"
    }else if (thememode == "dark"){
        thememode = "dark"
        body.style = `Background: linear-gradient(150deg, rgb(100, 66, 0), rgba(23, 11, 0, 0.843));`
        container.style = `Background-color:rgb(59, 59, 59);`
        input.forEach((elemento) => {elemento.style = `Background-color:rgb(82, 82, 82)`});
        color_mode.src = "images/sunwhite.png"
    }else{
        thememode = "dark"
    }

async function gerarHash(senha, email) {
    const encoder = new TextEncoder()
    const password =  await window.crypto.subtle.importKey("raw", encoder.encode(senha), {name: "PBKDF2"}, false, ["deriveBits"])

    const hashbuffer = await window.crypto.subtle.deriveBits( {name: "PBKDF2", salt: encoder.encode(email), iterations: 100000, hash: "SHA-256"}, password, 256)

    return Array.from(new Uint8Array(hashbuffer)).map(b => b.toString(16).padStart(2, "0")).join("")
}

function validarnome(n){
    if (n == ""){
        spnname.textContent = `Digite um nome!`
    }else {
        nomevalid = true
        usuario.nome = n
    }

}

function validaremail(e){
let regemail = /^[a-zA-Z0-9._+!?*&%$#(){}]+@[a-zA-Z]+\.[A-Za-z]{2,}$/

if (e == ""){
    spnemail.textContent = `Digite um email!`
}else if (regemail.test(e) == false){
    spnemail.textContent = `Digite um email valido!`
}else{
    emailvalid = true
    usuario.email = e
}

}

async function validarsenha(s, em){
const regsenha = /^(?=.*[A-Z])(?=.*[a-z0-9])(?=.*[!#$@%^&*()_\-+={}|?><,."":;]).{8,}$/

if (s == ""){
    spnsenha.innerHTML = `Digite uma senha!`
}else if (regsenha.test(s) == false){
    spnsenha.textContent = `A senha deve conter pelo menos: 8 digitos, um caracter especial e uma letra maiuscula`
}else{
    const senhahash = await gerarHash(s, em)

    senhavalid = true

    usuario.senha = senhahash
}

}

function validarrepeat(repeat){
if (repeat == ""){
    spnrepeat.textContent = `Repita sua senha!`
}else if (repeat != inpsenha.value){
    spnrepeat.textContent = `A senha deve ser a mesma da anterior`
}else{
    repeatvalid = true
}

}

//eventos
form.addEventListener(`submit`, async (event) => {
    event.preventDefault()

    spnname.textContent = ``
    spnemail.textContent = ``
    spnsenha.textContent = ``
    spnrepeat.textContent = ``

    nomevalid = false
    emailvalid = false
    senhavalid = false
    repeatvalid = false

    validarnome(inpname.value)
    validaremail(inpemail.value)
    await validarsenha(inpsenha.value, inpemail.value)
    validarrepeat(inprepeat.value)

   if (emailvalid == false || senhavalid == false || repeatvalid == false || nomevalid == false){
     return
   }

     let localuser = JSON.parse(localStorage.getItem("users"))
     let emailusers = []

     console.log(localuser)

     if (typeof localuser != undefined && localuser != null && localuser != ""){

        for(let i = 0; i < localuser.length; i++){
            emailusers.push(localuser[i].email)

           } 
           console.log(inpemail.value)

           let verif = emailusers.findIndex(n => n === inpemail.value)

            if(verif !== -1){

                spnemail.innerHTML = "Endereco de email ja cadastrado!"

            }else{

                console.log("envio1")

                salvareenviar()

            }
        }else{

                console.log("envio2")

                salvareenviar()

        }
})

function salvareenviar(){
        localStorage.setItem("thememode", JSON.stringify(thememode))
        let users = localStorage.getItem("users")
        let usuarios = JSON.parse(users) || [];
        usuarios.push(usuario)
        localStorage.setItem("users", JSON.stringify(usuarios))
        localStorage.setItem(`balance: ${usuario.nome}`, JSON.stringify(balance))
        localStorage.setItem(`Favoritos: ${usuario.nome}`, JSON.stringify(favoritos))
        localStorage.setItem(`MoedasAdquiridas:${usuario.nome}`, JSON.stringify(moedasadquiridas))
        window.location.href = "login.html"
}

function colormode(e){
    localStorage.setItem('thememode', JSON.stringify("dark"))
    let target = e.target
    if (thememode == "dark"){
        thememode = "white"
        body.style = `Background: linear-gradient(-45deg, rgba(255, 145, 0, 0.5),rgb(205, 205, 205));`
        container.style = `Background-color:rgb(255, 255, 255);border:2px solid rgb(201, 200, 200);`
        input.forEach((elemento) => {elemento.style = `Background-color:rgb(227, 227, 227); `});
        target.src = "images/moonblack.png"
    }else if (thememode == "white"){
        thememode = "dark"
        body.style = `Background: linear-gradient(150deg, rgb(100, 66, 0), rgba(23, 11, 0, 0.843));`
        container.style = `Background-color:rgb(59, 59, 59);`
        input.forEach((elemento) => {elemento.style = `Background-color:rgb(82, 82, 82)`});
        target.src = "images/sunwhite.png"
    }
    if(thememode !== null){
        localStorage.setItem('thememode', JSON.stringify(thememode))
    }
    
}