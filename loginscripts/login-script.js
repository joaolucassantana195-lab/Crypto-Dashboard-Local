//elementos do html
let form = document.querySelector("form")
let iptemail = document.querySelector("#login")
let iptpassword = document.querySelector("#password")
let spnemail = document.querySelector("#erroemail")
let spnpassword = document.querySelector("#erropassword")
let btn = document.querySelector("#btn-enviar")
let body = document.querySelector("body")
let container = document.querySelector('#container')
let input = document.querySelectorAll(".form-control")
let color_mode = document.querySelector('#colormode')
//Estados
let thememode = JSON.parse(localStorage.getItem("thememode"))
let resemail = false
let respassw = false

//objetos JSON
let localdata = localStorage.getItem("users")
let userobj = JSON.parse(localdata)

//funcoes de verificacao
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
    }

async function gerarHash(senha, email) {
    const encoder = new TextEncoder()
    const password =  await window.crypto.subtle.importKey("raw", encoder.encode(senha), {name: "PBKDF2"}, false, ["deriveBits"])

    const hashbuffer = await window.crypto.subtle.deriveBits( {name: "PBKDF2", salt: encoder.encode(email), iterations: 100000, hash: "SHA-256"}, password, 256)

    return Array.from(new Uint8Array(hashbuffer)).map(b => b.toString(16).padStart(2, "0")).join("")
}

function verificaremail(email){
 let emailreg = /^[a-zA-Z0-9.-_%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/
 let verif = userobj.findIndex(n => n.email === email)
 if(iptemail.value == ""){spnemail.innerHTML = `Digite um email.`}
 else if (emailreg.test(email) == false){spnemail.innerHTML = `Email invalido.`}
 else if (verif != -1){
    resemail = true
}else{
    spnemail.innerHTML = `Usuario nao encontrado`
}
}

async function verificarsenha(senha, em){
    const hashsenha = await gerarHash(senha, em)
    let verif = userobj.findIndex(n => n.senha === hashsenha)
 if (iptpassword.value == ""){spnpassword.innerHTML = `Digite uma senha.`}
 else if(senha.length < 8){spnpassword.innerHTML = `A senha deve conter no minimo 8 digitos.`}
 else if (verif == -1){spnpassword.innerHTML = `Senha incorreta!`}
 else if (verif != -1){respassw = true}
}

//eventos

form.addEventListener(`submit`, async (event) => {
    event.preventDefault()

    spnemail.innerHTML = ``
    spnpassword.innerHTML = ``
    resemail = false
    respassw = false
    verificaremail(iptemail.value)
    await verificarsenha(iptpassword.value, iptemail.value) 
    if(resemail == false || respassw == false){
        return
    }
        setTimeout(() => {
             window.location.href = "dashboard.html"
        }, 1000)
       
        localStorage.setItem('visible', JSON.stringify(true))
        localStorage.setItem('usuariologado', JSON.stringify(iptemail.value))
})

function colormode(e){
    e.preventDefault()
    let target = e.target
    if (thememode == "dark"){
        thememode = "white"
        body.style = `Background: linear-gradient(-45deg, rgba(255, 145, 0, 0.5), rgb(205, 205, 205));`
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
    localStorage.setItem('thememode', JSON.stringify(thememode))
}