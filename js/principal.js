//-----Variables Globales y Elementos-----
var BotonIniciar = document.querySelector("#iniciar");
var ListaPalabras = ["PERRO", "AUTO", "CASA"];
var PalabraSecreta = "";
var LetrasIncorrectas = [];
var CantidadErrores = 0;

//Captura tablero y pincel
var tablero = document.querySelector("#tablero");
var pincel = tablero.getContext("2d");

//-------Eventos-------
BotonIniciar.addEventListener("click", function () {
    dibujarTablero();  
    PalabraSecreta = getPalabraSecreta(ListaPalabras);
    console.log("Palabra secreta creada y guardada: " + PalabraSecreta);
    dibujarGuiones(PalabraSecreta);
});

document.addEventListener("keydown", verificarTecla);

//-----Funciones------
function dibujarTablero() {
    
    //pinta Background en canvas
    pincel.fillStyle = "#ccc";
    pincel.fillRect(0, 0, 1200, 800);
    
    console.log("Tablero Dibujado");
}

function getPalabraSecreta(ListaPalabras) {
    
    //Variable con un index aleatorio de 0 a el máximo index de ListaPalabras
    if (ListaPalabras.length > 0) {
        var IndexPalabra = Math.floor(Math.random() * (ListaPalabras.length));
    }

    return ListaPalabras[IndexPalabra];
}

function dibujarGuiones(PalabraSecreta) {
    var x = 600;
    pincel.lineWidth = 3;
    pincel.strokeStyle = "#fff";
       
    for ( let palabra in PalabraSecreta) {
        pincel.beginPath();
        pincel.moveTo(x, 500);
        pincel.lineTo(x+50, 500);
        x += 70;
        pincel.stroke();
    }
    console.log("Guiones dibujados!");
}

function verificarTecla(event) {
    console.log(event.key);
    var letras = /^[a-zA-Z]$/;

    if (letras.test(event.key)){
        console.log("es una letra");
        return true;
    }
    console.log("no es letra");
    return false;
}

function dibujarLetraCorrecta(letra) {
    var arrayLetras = [];
    pincel.lineWidth = 3;
    pincel.fillStyle = "orange";
    pincel.font = "30px Arial";
    for (let LetraSecreta in PalabraSecreta) {
        if (letra === PalabraSecreta[LetraSecreta]) {
            arrayLetras.push(LetraSecreta);
        }
    }
    for (let indice in arrayLetras) {
        pincel.fillText(letra, (613+70*(arrayLetras[indice])), 490);
    }
    
}

function dibujarLetraIncorrecta(LetraIncorrecta){
    pincel.lineWidth = 3;
    pincel.fillStyle = "red";
    pincel.font = "30px Arial";
    var x = 600;
    //Si letra incorrecta no se encuentra ya dibujada entonces la agregamos al array
    console.log(LetrasIncorrectas.indexOf(LetraIncorrecta));
    if (LetrasIncorrectas.indexOf(LetraIncorrecta) === -1){
        console.log("Push!: " + LetraIncorrecta);
        LetrasIncorrectas.push(LetraIncorrecta);
    }
    
    //Dibujamos todas las letras del array
    LetrasIncorrectas.forEach(function(letra) {
        pincel.fillText(letra, x, 200);
        x += 30;
    });
}

function dibujarAhorcado(CantidadErrores) {
    
}
