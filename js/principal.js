//-----Variables Globales y Elementos-----
var BotonIniciar = document.querySelector("#iniciar");
var BotonAgregar = document.querySelector("#agregar-palabra");
var PalabraAgregar = document.querySelector("#palabra");
var SeccionAgregar = document.querySelector(".seccion-nueva-palabra");
var ListaPalabras = ["PERRO", "AUTO", "CASA", "HOGAR", "AMOR", "ELEFANTE", "COMPUTADORA", "CAMARA", "ALEGRIA", "lIBRO", "PINTURA", "MOSQUITO"];
var PalabraSecreta = "";
var LetrasIncorrectas = [];
var LetrasCorrectas = [];
var CantidadErrores = 0;

//Captura tablero y pincel
var tablero = document.querySelector("#tablero");
var pincel = tablero.getContext("2d");

//-------Eventos-------
BotonIniciar.addEventListener("click", function() {
    
    //Por las dudas inicializamos variables
    PalabraSecreta = "";
    LetrasIncorrectas = [];
    LetrasCorrectas = [];
    CantidadErrores = 0;
    
    //Seteamos lo visual del tablero, hacemos invisible la seccion de agregar palabras
    document.querySelector("#contenedor-canvas").classList.remove("invisible");
    SeccionAgregar.classList.add("invisible");
    
    tablero.focus();
    dibujarTablero();
    
    //Definimos palabra secreta
    PalabraSecreta = getPalabraSecreta(ListaPalabras);
    
    console.log("Lista de palabras: " + ListaPalabras);
    console.log("Palabra secreta: " + PalabraSecreta);
    
    //Dibujamos Guiones
    dibujarGuiones(PalabraSecreta);
});

BotonAgregar.addEventListener("click", function() {
    var regexp = /^[a-zA-Z]+$/;
    var mayusculas = ((PalabraAgregar.value).trim()).toUpperCase();
    //Verifica que solo haya letras y que no contenga espacios
    if (regexp.test(mayusculas)) {
        if ( (ListaPalabras.indexOf(mayusculas) === -1) && (mayusculas != "") ){
        
            ListaPalabras.push(mayusculas);
        }
    }
    console.log("Lista de palabras: " + ListaPalabras);
    
});

document.addEventListener("keydown", function(event) {
    var letra = event.key.toUpperCase();
    //primero comprobamos que no hallamos perdido o ganado
    if (!(verificarVictoria(LetrasCorrectas) || verificarFinDeJuego(CantidadErrores))) {
        if (verificarTecla(letra)) {
            if(existeLetraEnPalabraSecreta(letra)) {
                dibujarLetraCorrecta(letra);
                if (verificarVictoria(LetrasCorrectas)) {ganar()}
                return;
            } else {
                dibujarLetraIncorrecta(letra);
                CantidadErrores += 1;
                dibujarAhorcado(CantidadErrores);
                if ( verificarFinDeJuego(CantidadErrores) ) {perder();}
                return;
            }
        }
    }
    return;
});

//-----Funciones------
function dibujarTablero() {
    
    //pinta Background en canvas
    pincel.fillStyle = "#eee";
    pincel.fillRect(0, 0, 1200, 800);
    pincel.strokeStyle = "black";
    pincel.lineWidth = 3;
    
    //Dibuja Horca
    pincel.beginPath();
    pincel.moveTo(150, 600); //Comienzo vertice triangulo
    pincel.lineTo(75, 650);
    pincel.lineTo(225, 650);
    pincel.lineTo(150,600); //Triangulo base terminado
    pincel.lineTo(150, 200); //mastil de la horca
    pincel.lineTo(300,200); //linea hacia la derecha
    pincel.lineTo(300, 280); //Linea HAcia abajo
    pincel.stroke();
    //--Fin de horca---
    
}

function getPalabraSecreta(ListaPalabras) {
    
    //Variable con un index aleatorio de 0 a el máximo index de ListaPalabras
    if (ListaPalabras.length > 0) {
        var IndexPalabra = Math.floor(Math.random() * (ListaPalabras.length));
    }

    return ListaPalabras[IndexPalabra].toUpperCase();
}

function dibujarGuiones(PalabraSecreta) {
    var x = 400;
    pincel.lineWidth = 3;
    pincel.strokeStyle = "black";
       
    for ( let palabra in PalabraSecreta) {
        pincel.beginPath();
        pincel.moveTo(x, 600);
        pincel.lineTo(x+50, 600);
        x += 70;
        pincel.stroke();
    }
}

function verificarTecla(letra) {
    var letras = /^[a-zA-Z]$/;

    if (letras.test(letra)){
        return true;
    }
    return false;
}

function dibujarLetraCorrecta(letra) {
    pincel.lineWidth = 3;
    pincel.fillStyle = "blue";
    pincel.font = "30px Arial";
    
    //Agrega letra a array letras correctas
    for (let letraSecreta in PalabraSecreta) {
        if (letra === PalabraSecreta[letraSecreta]) {
            LetrasCorrectas[letraSecreta] = letra;
        }
    }
    
    for (let indice in LetrasCorrectas) {
        pincel.fillText(LetrasCorrectas[indice], (414 + 70*indice) , 585);
    }
    
}

function dibujarLetraIncorrecta(LetraIncorrecta){
    pincel.lineWidth = 3;
    pincel.fillStyle = "red";
    pincel.font = "30px Arial";
    var x = 550;
    
    //Si letra incorrecta no se encuentra ya dibujada entonces la agregamos al array
    if (LetrasIncorrectas.indexOf(LetraIncorrecta) === -1){
        LetrasIncorrectas.push(LetraIncorrecta);
    }
    
    //Dibujamos todas las letras del array
    LetrasIncorrectas.forEach(function(letra) {
        pincel.fillText(letra, x, 400);
        x += 30;
    });
}

function dibujarAhorcado(CantidadErrores) {
    pincel.lineWidth = 2;
    pincel.moveTo(300,280);
    switch(CantidadErrores) {
        
        case 0:
            break;
        case 1: //Cabeza
            pincel.beginPath();
            pincel.arc(300, 310, 30, 0, 2 * Math.PI);
            pincel.stroke();
            break;
        case 2: //Tronco
            pincel.beginPath();
            pincel.moveTo(300, 340);
            pincel.lineTo(300, 470);
            pincel.stroke();
            break;
        case 3: //Pie izquierdo
            pincel.beginPath();
            pincel.moveTo(300,470);
            pincel.lineTo(270, 520);
            pincel.stroke();
            break;
        case 4: //Pie Derecho
            pincel.beginPath();
            pincel.moveTo(300,470);
            pincel.lineTo(330, 520);
            pincel.stroke();
            break;
            break;
        case 5: //Mano Izquierda
            pincel.beginPath();
            pincel.moveTo(300, 360);
            pincel.lineTo(270, 410);
            pincel.stroke();
            break;
        case 6: //Mano Derecha
            pincel.beginPath();
            pincel.moveTo(300, 360);
            pincel.lineTo(330, 410);
            pincel.stroke();
            break;
    }
}

function existeLetraEnPalabraSecreta(letra){
    if ( !(PalabraSecreta.indexOf(letra) === -1)) {
        return true;
    }
    return false;
}

function verificarVictoria(arrayLetras) {
    letras = (arrayLetras.toString()).replace(/,/g , "");
    if (letras === PalabraSecreta) {
        return true;
    }
    return false;
}

function verificarFinDeJuego(errores) {
    if (errores < 6) {
        return false;
    }
    return true;
}

function ganar() {
    pincel.lineWidth = 3;
    pincel.fillStyle = "green";
    pincel.font = "30px Arial";
    pincel.fillText("¡Felicitaciones, has ganado!", 550, 280);
}

function perder() {
    pincel.lineWidth = 3;
    pincel.fillStyle = "red";
    pincel.font = "30px Arial";
    pincel.fillText("Lo siento, te quedaste sin intentos.", 550, 280);
}
