
var BotonIniciar = document.querySelector("#iniciar");



function dibujarTablero() {
    //Captura tablero y objeto pincel
    var tablero = document.querySelector("#tablero");
    var pincel = tablero.getContext("2d");
    
    //pinta Background en canvas
    pincel.fillStyle = "#ccc";
    pincel.fillRect(0, 0, 1200, 800);
    
    
}
